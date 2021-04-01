import { Card, CardActionArea, Typography } from '@material-ui/core';
import tw from 'twin.macro';
import { TwemojiInlineLazy } from '~~/components/common/TwemojiLazy';
import { ProjectMeter } from '~~/components/routes/goal-details/initatives/projects/ProjectMeter';

interface IProjectCardProps {
   emoji: string;
   title: string;
   subtitle: string;
   schedule: string;
}

export const ProjectCard = ({ emoji, title, subtitle, schedule }: IProjectCardProps): JSX.Element => {
   const numberOfMilestones = 4;
   const numberOfSegments = 33;
   const progress = 15;
   const size = 90;
   const milestonesCompleted = 1;

   return (
      <Card className="flex-grow m-1 border-gray-500 shadow-md elevation-2 rounded-md ">
         <CardActionArea className="container-fill-viewport-full ">
            <div
               className="p-2 container-fill-viewport-full grid gap-1"
               css={{ gridTemplateColumns: 'minmax(auto, 6rem) auto', gridTemplateRows: 'min-content auto auto' }}>
               <div className="container-fill-viewport-full grid row-start-1 col-start-1 col-span-2" css={{ gridTemplateColumns: 'minmax(auto, 6rem) auto' }}>
                  <ProjectMeter
                     className="container-fill-viewport-full "
                     css={[tw`place-self-center`]}
                     numberOfSegments={numberOfSegments}
                     numberOfMilestones={numberOfMilestones}
                     milestonesCompleted={milestonesCompleted}
                     size={size}
                     progress={progress}
                     emoji={emoji}></ProjectMeter>
                  <div className="flex flex-col justify-between w-full h-full p-2">
                     <Typography variant="h4">{title}</Typography>
                     <Typography variant="body2">{subtitle}</Typography>
                     <Typography variant="caption">{schedule}</Typography>
                  </div>
               </div>
               <div
                  className="pl-2 pr-2 justify-evenly justify-items-center pb-0.5 col-start-1 col-span-2 row-start-3 row-span-1 box-border grid grid-rows-1 grid-cols-3"
                  css={{ gridTemplateRows: 'auto auto auto' }}>
                  <Typography variant="caption">
                     <TwemojiInlineLazy text="✔" /> 20/40
                  </Typography>
                  <Typography variant="caption">
                     <TwemojiInlineLazy text="🚩" /> {`${milestonesCompleted}/${numberOfMilestones}`}
                  </Typography>
                  <Typography variant="caption">
                     <TwemojiInlineLazy text="📅" /> June 40
                  </Typography>
               </div>
            </div>
         </CardActionArea>
      </Card>
   );
};
