import { CardMedia } from '@material-ui/core';
import React from 'react';
import tw, { css } from 'twin.macro';
import { TimelineIcon } from './TimelineIcon';
import { HabitCard } from './HabitCard';

export const GoalTimelineItem = (): JSX.Element => {
   const firstItem = false;
   const lastItem = true;

   return (
      <div
         css={[
            css`
               ${tw`grid m-1 w-full max-h-20 box-border`}
               grid-template-columns: 2.5rem auto
            `,
         ]}>
         <div className="relative flex flex-col flex-shrink-0 w-8 justify-items-center fill-parent-vertical">
            <div className="self-center grid place-items-center">
               <div className="h-2 bg-gray-500 w-0.5 justify-self-center"></div>
            </div>
            <div className="grid place-items-center">
               <TimelineIcon></TimelineIcon>
            </div>
            <div className="flex-grow grid place-items-center ">
               <div className="h-full bg-gray-500 w-0.5 justify-self-center"></div>
            </div>
         </div>
         <div className="flex-grow border-gray-500 shadow-md elevation-2 border-1 fill-parent rounded-md">
            <HabitCard
               emoji={'🏃🏾‍♀️🏃🏾‍♀️🏃🏾‍♀️'}
               title="I'd like to run every day"
               subtitle="i love to run and running is in my soul and stuff"
               schedule="2 times a week"></HabitCard>
         </div>
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
