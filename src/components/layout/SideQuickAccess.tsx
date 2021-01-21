import React from 'react';
import { GoalCard } from '../goals/GoalCard';

export const SideQuickAccess = (): JSX.Element => {
   return <div className={'w-full h-full bg-purple-300 rounded-md'}></div>;
};

export const Sidebar = (): JSX.Element => {
   return (
      <div className={'h-full flex-grow bg-purple-200 rounded-md '}>
         <GoalCard></GoalCard>
      </div>
   );
};
