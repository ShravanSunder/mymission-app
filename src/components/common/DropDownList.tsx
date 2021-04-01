import { List } from '@material-ui/core';
import { FC } from 'react';

interface IDropDownList {
   text: string;
}

export const DropDownList: FC<IDropDownList> = (props) => {
   return <List>{props.children}</List>;
};
