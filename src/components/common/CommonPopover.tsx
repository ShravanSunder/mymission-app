import { FC, ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { IDisplayText } from '~~/models/IDisplayText';

interface ICommonPopover {
   selected: ReactNode;
}

export const CommonPopover: FC<ICommonPopover> = (props) => {
   return (
      <PopupState variant="popover" popupId="demo-popup-popover">
         {(popupState) => (
            <div className="">
               <div className="w-full" {...bindTrigger(popupState)}>
                  {props.selected}
               </div>
               <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'center',
                  }}
                  transformOrigin={{
                     vertical: 'top',
                     horizontal: 'center',
                  }}>
                  <div>{props.children}</div>
               </Popover>
            </div>
         )}
      </PopupState>
   );
};
