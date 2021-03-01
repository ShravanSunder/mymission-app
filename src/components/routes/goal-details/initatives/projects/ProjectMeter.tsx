import React from 'react';
import { TwemojiImage } from '~~/components/common/Twemoji';
import { CircularProgressSegments } from '~~/components/routes/goal-details/progress/CircularProgressSegments';
import tw from 'twin.macro';
import { CircularProgress } from '~~/components/routes/goal-details/progress/CircularProgress';
import { CircularMilestoneSegments } from '../../progress/CircularMilestoneSegments';
import { ICommonProps } from '~~/components/common/ICommonProps';

interface IProjectMeterProps {
   numberOfSegments: number;
   numberOfMilestones: number;
   size: number;
   progress: number;
   milestonesCompleted: number;
   safeEmoji: string;
}
export const ProjectMeter: React.FC<IProjectMeterProps & ICommonProps> = ({
   numberOfSegments,
   size,
   numberOfMilestones,
   progress,
   safeEmoji,
   milestonesCompleted,
   className,
}) => {
   const milestoneProgress = (milestonesCompleted / numberOfMilestones) * 100;

   return (
      <div className={className ?? ''} css={[tw`box-border grid row-span-3 relative`, { paddingTop: '100%', width: '100%', height: 0 }]}>
         <div className="absolute w-10/12 h-10/12 place-self-center place-items-center grid">
            <CircularMilestoneSegments numberOfMilestones={numberOfMilestones} size={size}></CircularMilestoneSegments>
         </div>
         <div className="absolute w-10/12 h-10/12 place-self-center place-items-center grid">
            <CircularProgress progress={milestoneProgress} size={size} color={'#98FB98'}></CircularProgress>
         </div>
         <div className="absolute w-full h-full place-self-center place-items-center grid">
            <CircularProgressSegments numberOfSegments={numberOfSegments} size={size}></CircularProgressSegments>
         </div>
         <div className="absolute w-full h-full place-self-center place-items-center grid">
            <CircularProgress progress={progress} size={size}></CircularProgress>
         </div>

         <div className="absolute flex justify-center w-full h-full">
            <TwemojiImage text={safeEmoji} size={size / 2.3}></TwemojiImage>
         </div>
      </div>
   );
};
