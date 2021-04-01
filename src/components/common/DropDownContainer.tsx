import { css } from '@emotion/react';
import { Button, Collapse, Typography } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { FC, MouseEvent, useState } from 'react';
import tw from 'twin.macro';
import { ICommonProps } from '~~/components/common/ICommonProps';
import { combine } from '~~/helpers/string';

interface IDropDownButtonProps extends ICommonProps {
   title: string;
   handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
   showing?: boolean;
}

export const DropDownButton: FC<IDropDownButtonProps> = (props) => {
   const rotate = props.showing ? css({ transform: 'rotate(180deg)', transition: '500ms' }) : css({ transform: 'rotate(0deg)', transition: '500ms' });

   return (
      <div className={combine('flex border-1 rounded-md box-border', props.className)} css={props.showing ? css(tw`bg-gray-50`) : css({})}>
         <Typography className="flex-grow p-2 pl-4 pr-4" variant="body1">
            {props.title}
         </Typography>
         <div className="flex flex-grow-0  w-10 bg-gray-200 border-l-1">
            <Button className=" w-10 min-w-0 " onClick={(event) => props.handleClick(event)}>
               <ArrowDropDown css={rotate} />
            </Button>
         </div>
      </div>
   );
};

interface IDropDownContainerProps extends ICommonProps {
   selectedItemText: string;
}

export const DropDownContainer: FC<IDropDownContainerProps> = (props) => {
   const [show, setShow] = useState(false);

   return (
      <div className={props.className}>
         <DropDownButton showing={show} title={props.selectedItemText} handleClick={() => setShow((value) => !value)}></DropDownButton>
         <Collapse in={show}>{show && <div className="border-2 box-border rounded-md">{props.children}</div>}</Collapse>
      </div>
   );
};
