import React from 'react';
import { GoalSelectedCard } from '../goals/GoalSelectedCard';
import { ActionList } from '../goals/ActionList';

export const SideQuickAccess = (): JSX.Element => {
   return <div className={'w-full h-full bg-purple-300 rounded-md'}></div>;
};

export const Sidebar = (): JSX.Element => {
   return (
      <div className={'flex flex-col fill-parent flex-grow bg-purple-200 rounded-md'}>
         <GoalSelectedCard></GoalSelectedCard>
         <ActionList></ActionList>
      </div>
   );
};
