import { FC } from 'react';
import tw from 'twin.macro';

import { InitativeSchedule } from '../attributes/InitativeSchedule';

import { ICommonProps } from '~~/components/common/ICommonProps';
import { TwemojiImageLazy } from '~~/components/common/TwemojiLazy';
import { TrendChart } from '~~/components/routes/goal-details/charts/TrendChart';

const tempColorIcon = 'border-red-200 bg-red-100';

export const HabitDetails: FC<ICommonProps> = () => {
   const emoji = '🍵';

   const dataPoints = [
      { x: 'Dec', y: 20 },
      { x: '2021', y: 10 },
      { x: 'Feb', y: 15 },
      { x: 'Mar', y: 0 },
   ];
   return (
      <div className="flex flex-col justify-start w-full h-full max-w-md">
         <div className="relative flex justify-center w-full p-4 ">
            <div className="w-20 h-20 border-4 rounded-full" css={tw`${tempColorIcon}`}>
               <TwemojiImageLazy text={emoji} size={70}></TwemojiImageLazy>
            </div>
         </div>
         <div className="relative flex w-full p-4 rounded-md justify-items-stretch">
            <InitativeSchedule></InitativeSchedule>
         </div>
         <div className="relative flex w-full p-4 h-80 justify-items-stretch">
            <TrendChart title={'Habit name'} dataPoints={dataPoints}></TrendChart>
         </div>
      </div>
   );
};
