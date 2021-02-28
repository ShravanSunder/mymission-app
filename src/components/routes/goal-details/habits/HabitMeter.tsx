import React from 'react';
import { TwemojiImage } from '~~/components/common/Twemoji';
import { CircularProgressSegments as CircularProgressSegments } from '~~/components/routes/goal-details/progress/CircularProgressSegments';
import { CircularProgress } from '~~/components/routes/goal-details/progress/CircularProgress';
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
            <CircularProgressSegments numberOfSegments={numberOfSegments} size={size}></CircularProgressSegments>
         </div>
         <div className="absolute w-full h-full place-self-center place-items-center grid">
            <CircularProgress progress={progress} size={size}></CircularProgress>
         </div>
         <div className="absolute flex justify-center w-full h-full">
            <TwemojiImage text={safeEmoji} size={size / 2.1}></TwemojiImage>
         </div>
      </div>
   );
};
