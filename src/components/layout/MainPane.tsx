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
         <div className="flex-grow grid grid-cols-2 fill-parent">
            <GoalTimeline />
            <InitiativeDetails />
         </div>
      </div>
   );
};

// export const OldLeftPane = (): JSX.Element => {
//    return (
//       <div className="flex flex-col items-stretch flex-grow fill-parent rounded-md">
//          <div css={[toolbarHeight, tw`flex-grow-0 overflow-hidden w-full h-14 rounded-md`]}>
//             <NavigationTop></NavigationTop>
//          </div>
//          <div css={[panelHeight, tw`flex flex-grow `]}>
//             <Sidebar></Sidebar>
//          </div>
//       </div>
//    );
// };
