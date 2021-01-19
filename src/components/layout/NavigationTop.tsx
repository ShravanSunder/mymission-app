import React from 'react';
import { IconButton } from '@material-ui/core';
import clsx from 'clsx';
import { Alarm as AlarmIcon } from '@material-ui/icons';

export const NavigationTop = (): JSX.Element => {
   return (
      <div className="flex flex-grow-0 w-full bg-pink-100 h-14 rounded-md ">
         <div className="w-12 grid grid-cols-1 h-14">
            <div className="place-self-center">
               <IconButton classes={{ root: clsx('text-red-400') }} color="primary" aria-label="add an alarm" size="medium">
                  <AlarmIcon />
               </IconButton>
            </div>
         </div>
         <div className="w-12 grid grid-cols-1 h-14">
            <div className="place-self-center">
               <IconButton classes={{ root: clsx('text-red-400') }} color="primary" aria-label="add an alarm" size="medium">
                  <AlarmIcon />
               </IconButton>
            </div>
         </div>
         <div className="w-12 grid grid-cols-1 h-14">
            <div className="place-self-center">
               <IconButton classes={{ root: clsx('text-red-400') }} color="primary" aria-label="add an alarm" size="medium">
                  <AlarmIcon />
               </IconButton>
            </div>
         </div>
         <div className="w-12 grid grid-cols-1 h-14">
            <div className="place-self-center">
               <IconButton classes={{ root: clsx('text-red-400') }} color="primary" aria-label="add an alarm" size="medium">
                  <AlarmIcon />
               </IconButton>
            </div>
         </div>
      </div>
   );
};
