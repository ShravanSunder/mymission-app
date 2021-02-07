import React from 'react';
import { TwemojiImage } from '~~/components/common/Twemoji';
import { HabitRequirement as HabitRequirement } from '~~/components/routes/goals/habits/HabitRequirement';
import { HabitProgress } from '~~/components/routes/goals/habits/HabitProgress';
import tw from 'twin.macro';

interface IHabitMeterProps {
   numberOfSegments: number;
   size: number;
   progress: number;
   safeEmoji: string;
   className?: string;
}
export const HabitMeter = ({ numberOfSegments, size, progress, safeEmoji, className }: IHabitMeterProps): JSX.Element => {
   return (
      <div className={className ?? ''} css={[tw`box-border grid row-span-3 relative`, { paddingTop: '100%', width: '100%', height: 0 }]}>
         <div className="absolute w-full h-full place-self-center place-items-center grid">
            <HabitRequirement numberOfSegments={numberOfSegments} size={size}></HabitRequirement>
         </div>
         <div className="absolute w-full h-full place-self-center place-items-center grid">
            <HabitProgress progress={progress} size={size}></HabitProgress>
         </div>
         <div className="absolute flex justify-center w-full h-full">
            <TwemojiImage text={safeEmoji} size={size / 1.9}></TwemojiImage>
         </div>
      </div>
   );
};
