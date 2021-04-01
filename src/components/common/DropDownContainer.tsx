import { Button, Collapse, List, Typography } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { FC, MouseEvent, useState } from 'react';
import { ICommonProps } from '~~/components/common/ICommonProps';
import { combine } from '~~/helpers/string';

interface IDropDownButtonProps extends ICommonProps {
   title: string;
   handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const DropDownButton: FC<IDropDownButtonProps> = (props) => (
   <div className={combine('flex border-1 rounded-md box-border', props.className)}>
      <Typography className="flex-grow p-2 pl-4 pr-4 border-l-1" variant="body1">
         {props.title}
      </Typography>
      <div className="flex-grow-0 border-1"></div>
      <Button className="flex-grow-0 w-10 min-w-0" onClick={(event) => props.handleClick(event)}>
         <ArrowDropDown />
      </Button>
   </div>
);

interface IDropDownContainerProps extends ICommonProps {
   selectedItemText: string;
}

export const DropDownContainer: FC<IDropDownContainerProps> = (props) => {
   const [showDuration, setShowDuration] = useState(false);

   return (
      <div className={props.className}>
         <DropDownButton title={props.selectedItemText} handleClick={() => setShowDuration((value) => !value)}></DropDownButton>
         <Collapse in={showDuration}>
            <div className="border-2 box-border rounded-md">{props.children}</div>
         </Collapse>
      </div>
   );
};
