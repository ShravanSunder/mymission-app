import { css } from '@emotion/react';
import { Button, Collapse, Typography } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { useSubscription } from 'observable-hooks';
import { Dispatch, FC, MouseEvent, SetStateAction, useState } from 'react';
import { Observable } from 'rxjs';
import tw from 'twin.macro';
import { ICommonProps } from '~~/components/common/ICommonProps';
import { combine } from '~~/helpers/string';

interface IDropDownButtonProps extends ICommonProps {
   title: string;
   handleClick: (event: MouseEvent) => void;
   showing?: boolean;
}

export const DropDownButton: FC<IDropDownButtonProps> = (props) => {
   const rotate = props.showing ? css({ transform: 'rotate(180deg)', transition: '500ms' }) : css({ transform: 'rotate(0deg)', transition: '500ms' });

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
   setShow: Dispatch<SetStateAction<boolean>>;
}

export const DropDownContainer: FC<IDropDownContainerProps> = (props) => {
   return (
      <div className={props.className}>
         <DropDownButton
            className="elevation-2"
            showing={props.show}
            title={props.selectedItemText}
            handleClick={() => props.setShow((value) => !value)}></DropDownButton>
         <Collapse in={props.show}>{props.show && <div className="border-2 box-border rounded-md">{props.children}</div>}</Collapse>
      </div>
   );
};
