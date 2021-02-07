import { CardMedia } from '@material-ui/core';
import React from 'react';
import { GoalTimelineItem } from '~~/components/routes/goals/GoalTimelineItem';

export const GoalTimeline = (): JSX.Element => {
   return (
      <div className="flex flex-col content-start fill-parent box-border">
         <div className="flex-none w-full box-border">
            <GoalTimelineItem></GoalTimelineItem>
            <GoalTimelineItem></GoalTimelineItem>
            <GoalTimelineItem></GoalTimelineItem>
         </div>
      </div>
   );
};
