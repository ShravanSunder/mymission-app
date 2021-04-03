import { css } from '@emotion/react';
import { Button, Collapse, Typography } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { useSubscription } from 'observable-hooks';
import { Dispatch, FC, MouseEvent, SetStateAction, useState } from 'react';
import { Observable } from 'rxjs';
import tw from 'twin.macro';
import { ICommonProps } from '~~/components/common/ICommonProps';
import { combine } from '~~/helpers/string';
import { Exception, ExceptionTypes } from '~~/models/Exception';

interface IDropDownButtonProps extends ICommonProps {
   title: string;
   handleClick: (event: MouseEvent) => void;
   showing?: boolean;
}

/**
 * Helper that allows you to only have one dropDown in a group open.   For toggle parameter of @DropDownButton and accepts SetState function from @useState hook.
 * @param setState the current dropdown to change state
 * @param setGroupStateOff other dropdowns to close when current is open, can be ignored
 */
export const toggleGroup = (setState: Dispatch<SetStateAction<boolean>>, ...setGroupStateOff: Dispatch<SetStateAction<boolean>>[]): void => {
   if (setGroupStateOff.some((set) => set === setState)) throw new Exception(ExceptionTypes.General_InvalidArguments, { setState, setGroupStateOff });

   setState((value) => {
      if (!value) setGroupStateOff.forEach((set) => set(false));
      return !value;
   });
};

export const DropDownButton: FC<IDropDownButtonProps> = (props) => {
   const rotate = props.showing ? css({ transform: 'rotate(0deg)', transition: '500ms' }) : css({ transform: 'rotate(90deg)', transition: '500ms' });

   return (
      <div
         className={combine('flex border-1 rounded-md box-border', props.className)}
         css={props.showing ? css({}) : css(tw`bg-gradient-to-r from-transparent to-gray-50`)}>
         <Typography className="flex-grow p-2 pl-4 pr-4" variant="body1">
            {props.title}
         </Typography>
         <div className="flex flex-grow-0  w-10 bg-gray-200 border-l-1">
            <Button className=" w-10 min-w-0 " onClick={(event: MouseEvent) => props.handleClick(event)}>
               <ArrowDropDown css={rotate} />
            </Button>
         </div>
      </div>
   );
};

interface IDropDownContainerProps extends ICommonProps {
   selectedItemText: string;
   show: boolean;
   /**
    * Use @toggleGroup to control a group of buttons
    */
   toggle: () => void;
}

export const DropDownContainer: FC<IDropDownContainerProps> = (props) => {
   return (
      <div className={props.className}>
         <DropDownButton className="elevation-2" showing={props.show} title={props.selectedItemText} handleClick={() => props.toggle()}></DropDownButton>
         <Collapse in={props.show}>{<div className="border-2 box-border rounded-md">{props.children}</div>}</Collapse>
      </div>
   );
};
