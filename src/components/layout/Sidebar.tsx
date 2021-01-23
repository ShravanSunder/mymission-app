import React from 'react';
import { AreaScroll } from '../goals/AreaScroll';
import { GoalSelectedCard } from '../goals/GoalSelectedCard';
import { GoalListItem } from '../goals/GoalListItem';
import { ActionList } from '../goals/ActionList';

export const SideQuickAccess = (): JSX.Element => {
   return <div className={'w-full h-full bg-purple-300 rounded-md'}></div>;
};

export const Sidebar = (): JSX.Element => {
   return (
      <div className={'h-full w-full flex-grow bg-purple-200 rounded-md '}>
         <GoalSelectedCard></GoalSelectedCard>
         <ActionList></ActionList>
      </div>
   );
};
