import React from 'react';
import { IconButton } from '@material-ui/core';
import clsx from 'clsx';
// import tw from 'twin.macro';
import { NavButton } from './NavButton';

import { Alarm as AlarmIcon } from '@material-ui/icons';

export const NavigationTop = (): JSX.Element => {
   return (
      <div className="flex flex-grow-0 w-full overflow-auto bg-pink-100 h-14 rounded-md ">
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

export const NavigationRight = (): JSX.Element => {
   return (
      <div className="flex flex-col pt-2 pb-2 rounded-2xl fill-parent elevation-2">
         <NavButton></NavButton>
         <NavButton></NavButton>
         <NavButton></NavButton>
         <NavButton></NavButton>
      </div>
   );
};
