import React from 'react';
import { GoalTimelineItem } from '~~/components/routes/goal-details/GoalTimelineItem';
import { HabitCard } from './habits/HabitCard';
import { ProjectCard } from '~~/components/routes/goal-details/projects/ProjectCard';

export const GoalTimeline = (): JSX.Element => {
   return (
      <div className="flex flex-col content-start fill-parent box-border">
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
               <ProjectCard emoji={'🐒'}></ProjectCard>
            </GoalTimelineItem>
         </div>
      </div>
   );
};
