import React from 'react';
import tw, { css } from 'twin.macro';
import { TimelineIcon } from './TimelineIcon';
import { HabitCard } from '~~/components/routes/goals/habits/HabitCard';

interface TimelineStreamProps {
   showTopConnector: boolean;
   showBottomConnect: boolean;
}

const TimelineStream = (props: TimelineStreamProps): JSX.Element => {
   return (
      <div className={'relative flex flex-col flex-shrink-0 w-6 justify-items-center fill-parent-vertical'}>
         <div className="self-center grid place-items-center">
            <div className="h-2 w-0.5 justify-self-center" css={props.showTopConnector ? tw`bg-gray-400` : {}}></div>
         </div>
         <div className="grid place-items-center">
            <TimelineIcon></TimelineIcon>
         </div>
         <div className="flex-grow grid place-items-center ">
            <div className="h-full w-0.5 justify-self-center" css={props.showTopConnector ? tw`bg-gray-400` : {}}></div>
         </div>
      </div>
   );
};

interface GoalTimelineItemProps {
   showTopConnector?: boolean;
   showBottomConnect?: boolean;
}

export const GoalTimelineItem = ({ showTopConnector = true, showBottomConnect = true }: GoalTimelineItemProps): JSX.Element => {
   const timelineGridStyle = [
      css`
         ${tw`grid w-full box-border p-2`}
         grid-template-columns: 2rem auto
      `,
      { maxWidth: '24rem', minWidth: '8rem' },
   ];

   return (
      <div css={timelineGridStyle}>
         <TimelineStream showTopConnector={showTopConnector} showBottomConnect={showBottomConnect}></TimelineStream>
         <HabitCard
            emoji={'🏃🏾‍♀️'}
            title="I'd like to run every day"
            subtitle="i love to run and running is in my soul and stuff"
            schedule="2 times a week"></HabitCard>
      </div>
   );
};
