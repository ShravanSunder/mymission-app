import { FC } from 'react';
import tw from 'twin.macro';

import { ICommonProps } from '~~/components/common/ICommonProps';
import { TwemojiImageLazy } from '~~/components/common/TwemojiLazy';
import { CircularProgress } from '~~/components/routes/goal-details/progress/CircularProgress';
import { CircularProgressSegments } from '~~/components/routes/goal-details/progress/CircularProgressSegments';

interface IHabitMeterProps {
   numberOfSegments: number;
   size: number;
   progress: number;
   emoji: string;
}
export const HabitMeter: FC<IHabitMeterProps & ICommonProps> = ({ numberOfSegments, size, progress, emoji, className }) => {
   return (
      <div className={className ?? ''} css={[tw`box-border grid row-span-3 relative`, { paddingTop: '100%', width: '100%', height: 0 }]}>
         <div className="absolute w-full h-full place-self-center place-items-center grid">
            <CircularProgressSegments numberOfSegments={numberOfSegments} size={size}></CircularProgressSegments>
         </div>
         <div className="absolute w-full h-full place-self-center place-items-center grid">
            <CircularProgress progress={progress} size={size}></CircularProgress>
         </div>
         <div className="absolute flex justify-center w-full h-full">
            <TwemojiImageLazy text={emoji} size={size / 2.1}></TwemojiImageLazy>
         </div>
      </div>
   );
};
