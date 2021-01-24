import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import tw from 'twin.macro';
import { Alarm as AlarmIcon } from '@material-ui/icons';
import { toolbarHeight, panelHeight, text } from './MainLayout';

export const RightPane = (): JSX.Element => {
   return (
      <div className="fill-parent">
         <div className="flex flex-col items-stretch flex-grow fill-parent rounded-md">
            <div css={[toolbarHeight, tw`flex items-center flex-grow-0 w-full  h-14 rounded-md`]}>
               <div className="flex items-center flex-grow h-full bg-yellow-100  pl-0.5 rounded-md"></div>
               <div className="flex items-center flex-none h-14">
                  <IconButton color="primary" aria-label="add an alarm">
                     <AlarmIcon />
                  </IconButton>
               </div>
            </div>
            <div css={[panelHeight, tw`flex flex-grow flex-shrink w-full overflow-y-auto bg-green-200  rounded-md`]}>
               <div className="p-3">
                  <Typography> {text}</Typography>
               </div>
               <div className="p-3">
                  <Typography> {text}</Typography>
               </div>
            </div>
         </div>
      </div>
   );
};
