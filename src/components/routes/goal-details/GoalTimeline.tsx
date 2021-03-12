import { GoalTimelineItem } from '~~/components/routes/goal-details/GoalTimelineItem';
import { HabitCard } from './initatives/habits/HabitCard';
import { ProjectCard } from '~~/components/routes/goal-details/initatives/projects/ProjectCard';

export const GoalTimeline = (): JSX.Element => {
   return (
      <div className="flex flex-col content-start container-fill-viewport-full box-border">
         <div className="flex-none w-full box-border">
            <GoalTimelineItem>
               <HabitCard
                  emoji={'🏃🏾‍♀️'}
                  title="I'd like to run"
                  subtitle="i love to run and running is in my soul and stuff"
                  schedule="2 times a week"></HabitCard>
            </GoalTimelineItem>
            <GoalTimelineItem>
               <HabitCard
                  emoji={'🤹🏾‍♀️'}
                  title="I'd like to juggle "
                  subtitle="i love to run and running is in my soul and stuff"
                  schedule="2 times a week"></HabitCard>
            </GoalTimelineItem>
            <GoalTimelineItem>
               <HabitCard
                  emoji={'🙀'}
                  title="I'd like to throw cats"
                  subtitle="i love to run and running is in my soul and stuff"
                  schedule="2 times a week"></HabitCard>
            </GoalTimelineItem>
            <GoalTimelineItem>
               <ProjectCard emoji={'🐒'} title="Project 1" subtitle="Lets have a great project" schedule="something"></ProjectCard>
            </GoalTimelineItem>
         </div>
      </div>
   );
};
