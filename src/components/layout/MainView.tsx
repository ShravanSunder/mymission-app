import React from 'react';
// import tw from 'twin.macro';
import { GoalTimeline } from '../routes/goals/GoalTimeline';
import { InitiativeDetails } from '../routes/goals/InitiativeDetails';
import { GoalTitleCard } from '../routes/goals/GoalTitleCard';

export const MainPane = (): JSX.Element => {
   return (
      <div className="flex flex-col fill-parent">
         <div className="flex-grow-0 m-1">
            <GoalTitleCard></GoalTitleCard>
         </div>
         <div className="flex-grow grid grid-cols-1 fill-parent">
            <GoalTimeline />
         </div>
      </div>
   );
};
