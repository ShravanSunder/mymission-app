import { FC } from 'react';
import { TwemojiImageLazy } from '~~/components/common/TwemojiLazy';
import { CircularProgressSegments } from '~~/components/routes/goal-details/progress/CircularProgressSegments';
import tw from 'twin.macro';
import { CircularProgress } from '~~/components/routes/goal-details/progress/CircularProgress';
import { CircularMilestoneSegments } from '~~/components/routes/goal-details/progress/CircularMilestoneSegments';
import { ICommonProps } from '~~/components/common/ICommonProps';

interface IProjectMeterProps {
   numberOfSegments: number;
   numberOfMilestones: number;
   size: number;
   progress: number;
   milestonesCompleted: number;
   emoji: string;
}
export const ProjectMeter: FC<IProjectMeterProps & ICommonProps> = ({
   numberOfSegments,
   size,
   numberOfMilestones,
   progress,
   emoji,
   milestonesCompleted,
   className,
}) => {
   const milestoneProgress = (milestonesCompleted / (numberOfMilestones + 1)) * 100;

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
            <TwemojiImageLazy text={emoji} size={size / 2.3}></TwemojiImageLazy>
         </div>
      </div>
   );
};
