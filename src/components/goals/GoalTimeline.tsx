import * as React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import tw, { css } from 'twin.macro';
import { TimelineIcon } from './NavButton';

export const GoalTimelineItem = (): JSX.Element => {
   const itemStyle = css([tw`flex mt-2 mb-2 w-full max-h-20`]);

   return (
      <div css={itemStyle}>
         <div className="flex-shrink-0 w-16 bg-blue-100 fill-parent-vertical">
            <div className="grid place-items-center">
               <TimelineIcon></TimelineIcon>
            </div>
         </div>
         <div className="flex-grow bg-purple-100 fill-parent">1</div>
      </div>
   );
};

export const GoalTimeline = (): JSX.Element => {
   return (
      <div className="flex items-stretch content-start fill-parent box-border">
         <GoalTimelineItem></GoalTimelineItem>
      </div>
   );
};
