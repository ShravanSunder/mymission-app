import { Card, CardMedia, Typography } from '@material-ui/core';
import * as React from 'react';
import tw, { css } from 'twin.macro';
import { PieChart, TPiceChartData } from './PieChart';
import { TimelineIcon } from './TimelineIcon';

export const GoalTimelineItem = (): JSX.Element => {
   const itemStyle = css([tw`flex m-2 w-full max-h-20 box-border`]);

   const data: TPiceChartData[] = [
      {
         id: 'done',
         value: 10,
      },
      {
         id: 'notDone',
         value: 90,
      },
   ];

   return (
      <div css={itemStyle}>
         <div className="flex-shrink-0 w-10 fill-parent-vertical">
            <div className="grid place-items-center">
               <TimelineIcon></TimelineIcon>
            </div>
         </div>
         <div className="flex-grow border-gray-500 shadow-md elevation-2 border-1 fill-parent rounded-md">
            <Card className="flex flex-grow fill-parent">
               <div className="flex fill-parent">
                  <div className="flex flex-col items-center justify-around flex-shrink-0 w-20 p-1 fill-parent-vertical">
                     <PieChart data={data}></PieChart>
                     <div className="flex-grow-0 pl-2 pr-2 overflow-hidden truncate">
                        <Typography variant="caption">3 this</Typography>
                     </div>
                  </div>
                  <div className="flex flex-grow" css={[tw`bg-red-100`]}></div>
               </div>
            </Card>
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
