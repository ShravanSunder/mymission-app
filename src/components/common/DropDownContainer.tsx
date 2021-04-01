import { Button, Collapse, List, Typography } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { FC, MouseEvent, useState } from 'react';

interface IDropDownButtonProps {
   title: string;
   handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const DropDownButton: FC<IDropDownButtonProps> = (props) => (
   <div className="flex m-2 border-1 rounded-md box-border">
      <Typography className="flex-grow p-2 pl-4 pr-4 border-l-1" variant="body1">
         {props.title}
      </Typography>
      <div className="flex-grow-0 border-1"></div>
      <Button className="flex-grow-0 w-10 min-w-0" onClick={(event) => props.handleClick(event)}>
         <ArrowDropDown />
      </Button>
   </div>
);

interface IDropDownContainerProps {
   title: string;
}

export const DropDownContainer: FC<IDropDownContainerProps> = (props) => {
   const [showDuration, setShowDuration] = useState(false);

   return (
      <>
         <DropDownButton title={props.title} handleClick={() => setShowDuration((value) => !value)}></DropDownButton>
         <div className="p-1"></div>
         <Collapse in={showDuration}>{props.children}</Collapse>
      </>
   );
};
