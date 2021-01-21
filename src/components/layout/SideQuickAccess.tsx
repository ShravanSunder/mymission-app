import React from 'react';
import { AreaScroll } from '../goals/AreaScroll';
import { GoalCard } from '../goals/GoalCard';

export const SideQuickAccess = (): JSX.Element => {
   return <div className={'w-full h-full bg-purple-300 rounded-md'}></div>;
};

export const Sidebar = (): JSX.Element => {
   return (
      <div className={'h-full w-full flex-grow bg-purple-200 rounded-md '}>
         <AreaScroll></AreaScroll>
         <GoalCard></GoalCard>
      </div>
   );
};
