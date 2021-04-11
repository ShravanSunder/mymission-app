import { repetitionOperator, targetOperator } from './recurrence.operators';
import {
   RecurrenceGoalCategoryType,
   RecurrenceRepetitionAggregation,
   RecurrenceRepetitionType,
   TRecurrenceGoalTargetType as TRecurrenceTargetType,
} from './recurrence.types';

import { SubjectWithTransform, useSubjectTransform } from '~~/components/common/core/hooks/useSubjectTransform';
import { SubjectWithValue, useSubjectValue, useSubjectValue } from '~~/components/common/core/hooks/useSubjectValue';

export interface IRecurrenceObservables {
   /**
    * Number: Number of times per repetition.
    * Days of Week:  When repetition type is SpecificDaysOfWeek, it can be an DaysOfWeek[]
    */
   period: SubjectWithValue<RecurrenceRepetitionAggregation>;
   /**
    * The type of repetition.  ie Days per week, days per month
    */
   repetition: SubjectWithTransform<RecurrenceRepetitionType>;
   /**
    * represents the goal target
    */
   target: SubjectWithTransform<TRecurrenceTargetType>;

   /**
    * A number that represents the amount of times you aim to do the task
    */
   targetGoal: SubjectWithValue<number>;

   /**
    *
    */
   targetCategory: SubjectWithValue<RecurrenceGoalCategoryType>;
}

export const useInitiativeSchedule = (): IRecurrenceObservables => {
   const period = useSubjectValue<RecurrenceRepetitionAggregation>(RecurrenceRepetitionAggregation.PerDay);
   const repetition = useSubjectTransform<RecurrenceRepetitionType>(RecurrenceRepetitionType.Weekly, repetitionOperator, period.subject$);
   const target = useSubjectTransform<TRecurrenceTargetType>(5, targetOperator, repetition.subject$, period.subject$);
   const targetGoal = useSubjectValue<number>(1);
   const targetCategory = useSubjectValue<RecurrenceGoalCategoryType>(RecurrenceGoalCategoryType.PositiveTarget);

   return { period, repetition, target, targetGoal, targetCategory };
};
