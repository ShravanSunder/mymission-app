import { Collapse } from '@material-ui/core';
import { Dispatch, FC, SetStateAction } from 'react';

import { ICommonProps } from '~~/components/common/ICommonProps';
import { LabelWithButton } from '~~/components/common/LabelWithButton';
import { Exception, ExceptionTypes } from '~~/models/Exception';

/**
 * Helper that allows you to only have one dropDown in a group open.   For toggle parameter of @DropDownButton and accepts SetState function from @useState hook.
 *
 * ⚠ NOTE: order of params matter
 * @param setState the current dropdown to change state
 * @param setGroupStateOff other dropdowns to close when current is open, can be ignored
 */
export const toggleGroup = (setState: Dispatch<SetStateAction<boolean>>, setGroupStateOff: Dispatch<SetStateAction<boolean>>[]): void => {
   if (setGroupStateOff.some((set) => set === setState)) throw new Exception(ExceptionTypes.General_InvalidArguments, { setState, setGroupStateOff });

   setState((value) => {
      if (!value) setGroupStateOff.forEach((set) => set(false));
      return !value;
   });
};

interface IDropDownContainerProps extends ICommonProps {
   selectedItemText: string;
   show: boolean;
   /**
    * Use @toggleGroup to control a group of dropdowns together
    * use any callback otherwise to toggle the dropdown
    */
   toggle: () => void;
}

export const DropDownContainer: FC<IDropDownContainerProps> = (props) => {
   return (
      <div className={props.className}>
         <LabelWithButton showing={props.show} title={props.selectedItemText} handleClick={() => props.toggle()}></LabelWithButton>
         <Collapse in={props.show}>{<div className="border-2 box-border rounded-md">{props.children}</div>}</Collapse>
      </div>
   );
};
