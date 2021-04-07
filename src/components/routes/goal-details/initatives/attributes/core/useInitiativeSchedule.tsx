import { durationOperator, targetOperator } from './recurrence.operators';
import { RecurrenceAggregationPeriods, RecurrenceRepetitionType, TRecurrenceGoalTargetType } from './recurrence.types';

import { SubjectWithTransform, useSubjectTransform } from '~~/components/common/core/hooks/useSubjectTransform';
import { SubjectWithValue, useSubjectValue } from '~~/components/common/core/hooks/useSubjectValue';

export interface IRecurrenceObservables {
   /**
    * Number: Number of times per repetition.
    * Days of Week:  When repetition type is SpecificDaysOfWeek, it can be an DaysOfWeek[]
    */
   period: SubjectWithValue<RecurrenceAggregationPeriods>;
   /**
    * The type of repetition.  ie Days per week, days per month
    */
   repetition: SubjectWithTransform<RecurrenceRepetitionType>;
   /**
    * Number: Number of times per repetition.
    * Days of Week:  When repetition type is SpecificDaysOfWeek, it can be an DaysOfWeek[]
    */
   goalTarget: SubjectWithTransform<TRecurrenceGoalTargetType>;

   /**
    *
    */
   goalTargetCount: SubjectWithValue<number>;
}

export const useInitiativeSchedule = (): IRecurrenceObservables => {
   const period = useSubjectValue<RecurrenceAggregationPeriods>(RecurrenceAggregationPeriods.PerDay);
   const repetition = useSubjectTransform<RecurrenceRepetitionType>(RecurrenceRepetitionType.Weekly, durationOperator, period.subject$);
   const goalTarget = useSubjectTransform<TRecurrenceGoalTargetType>(5, targetOperator, repetition.subject$, period.subject$);
   const goalTargetCount = useSubjectValue<number>(1);

   return { period, repetition, goalTarget, goalTargetCount };
};
