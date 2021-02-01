import { Card, CardMedia, CircularProgress, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import tw, { css } from 'twin.macro';
import { PieChart, TPiceChartData } from '../../common/PieChart';
import { TimelineIcon } from './TimelineIcon';
import { TwemojiInline } from './Twemoji';

interface HabitCircleParams {
   numberOfSegments: number;
   thickness?: number;
}

const HabitCircle = ({ numberOfSegments, thickness = 3.6 }: HabitCircleParams): JSX.Element => {
   const segments = useMemo(() => {
      const arc: number = 360 / numberOfSegments;
      const segments: number[] = [];
      for (let i = 0; i < numberOfSegments; i++) {
         segments.push(arc * i);
      }

      const SIZE = 44;
      const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
      const strokeDash: number[] = [circumference / numberOfSegments - 1, 1];

      return (
         <span
            className="absolute w-11/12 text-gray-300 MuiCircularProgress-root MuiCircularProgress-determinate "
            role="progressbar"
            style={{ width: '82%', height: '82%', transform: 'rotate(-90deg)' }}>
            <svg className="MuiCircularProgress-svg" viewBox="22 22 44 44">
               <circle
                  className="MuiCircularProgress-circle MuiCircularProgress-circleDeterminate"
                  cx="44"
                  cy="44"
                  r="19.75"
                  fill="none"
                  style={{ strokeDasharray: strokeDash.map((m) => m.toFixed(2)).join(', '), strokeWidth: thickness, strokeDashoffset: -1 }}></circle>
            </svg>
         </span>
      );
   }, [numberOfSegments]);

   return <>{segments}</>;
};

const Habit = (): JSX.Element => {
   const emoji = '🏃🏾‍♀️';

   const s = 'A new habit 😂😂';

   return (
      <Card className="flex flex-grow fill-parent">
         <div className="flex fill-parent">
            <div
               className="relative flex flex-col items-center justify-around flex-shrink-0 w-20 p-1 fill-parent-vertical"
               css={[{ fontSize: '2rem', width: '5rem' }]}>
               <TwemojiInline text={'🏃🏾‍♀️'}></TwemojiInline>
               <HabitCircle numberOfSegments={3}></HabitCircle>
               <CircularProgress
                  variant="determinate"
                  className="absolute w-11/12 text-red-300 delay-500"
                  value={10}
                  style={{ width: '80%', height: '80%' }}></CircularProgress>
            </div>
            <div className="flex-grow">
               <div className="pt-2 pb-2 grid gap-1 grid-flow-row" css={[{ gridTemplateRows: '1fr min-content' }]}>
                  <Typography variant="body2">{s}</Typography>
               </div>
            </div>
         </div>
      </Card>
   );
};

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
            <Habit></Habit>
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
