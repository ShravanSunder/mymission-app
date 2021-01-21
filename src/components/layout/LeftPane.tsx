import React from 'react';
import tw from 'twin.macro';
import { NavigationTop } from './NavigationTop';
import { toolbarHeight, panelHeight } from './MainLayout';
import { SideQuickAccess, Sidebar } from './SideQuickAccess';

export const LeftPane = (): JSX.Element => {
   return (
      <div className="flex flex-col items-stretch flex-grow w-full h-full rounded-md">
         <div css={[toolbarHeight, tw`flex-grow-0 overflow-hidden w-full h-14 rounded-md`]}>
            <NavigationTop></NavigationTop>
         </div>
         <div css={[panelHeight, tw`flex w-full bg-blue-50 rounded-md`]}>
            <div className={'flex w-12 h-full flex-grow-0 flex-shrink-0 rounded-md'}>
               <SideQuickAccess></SideQuickAccess>
            </div>
            <div className={'h-full flex-grow w-full overflow-hidden  bg-purple-200 rounded-md '}>
               <Sidebar></Sidebar>
            </div>
         </div>
      </div>
   );
};
