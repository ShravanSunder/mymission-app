import React from 'react';
import tw from 'twin.macro';
import { NavigationTop } from './NavigationTop';
import { toolbarHeight, panelHeight } from './MainLayout';
import { SideQuickAccess, Sidebar } from './Sidebar';

export const LeftPane = (): JSX.Element => {
   return (
      <div className="flex flex-col items-stretch flex-grow w-full h-full rounded-md">
         <div css={[toolbarHeight, tw`flex-grow-0 overflow-hidden w-full h-14 rounded-md`]}>
            <NavigationTop></NavigationTop>
         </div>
         <div css={[panelHeight, tw`flex flex-grow `]}>
            <Sidebar></Sidebar>
         </div>
      </div>
   );
};
