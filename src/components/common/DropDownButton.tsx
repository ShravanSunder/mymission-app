import { Typography, Button } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { FC, MouseEvent } from 'react';

interface IDropDownButtonProps {
   title: string;
   handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const DropDownButton: FC<IDropDownButtonProps> = (props) => (
   <div className="flex m-2 border-1 rounded-md">
      <Typography className="flex-grow p-2 pl-4 border-l-1" variant="body1">
         {props.title}
      </Typography>
      <div className="flex-grow-0 border-1"></div>
      <Button size="small" className="flex-grow-0" onClick={(event) => props.handleClick(event)}>
         <ArrowDropDown />
      </Button>
   </div>
);
