import { RecurrenceAggregationPeriods, RecurrenceDurationType, TRecurrenceTarget } from './recurrence.types';
import { DaysOfWeek } from './schedule.types';
import { SubjectWithValue, useSubjectValue } from '~~/components/common/core/hooks/useSubjectValue';
import { useSubjectTransform, SubjectWithTransform } from '~~/components/common/core/hooks/useSubjectTransform';
import { durationOperator, targetOperator } from './recurrence.operators';
import { duration } from 'dayjs';

export interface IRecurrenceObservables {
   /**
    * Number: Number of times per repetition.
    * Days of Week:  When repetition type is SpecificDaysOfWeek, it can be an DaysOfWeek[]
    */
   period: SubjectWithValue<RecurrenceAggregationPeriods>;
   /**
    * The type of repetition.  ie Days per week, days per month
    */
   duration: SubjectWithTransform<RecurrenceDurationType>;
   /**
    * Number: Number of times per repetition.
    * Days of Week:  When repetition type is SpecificDaysOfWeek, it can be an DaysOfWeek[]
    */
   target: SubjectWithTransform<TRecurrenceTarget>;
   // repetitions: SubjectWithValue<number>;
}

export const useInitiativeSchedule = (): IRecurrenceObservables => {
   const period = useSubjectValue<RecurrenceAggregationPeriods>(RecurrenceAggregationPeriods.PerDay);
   const duration = useSubjectTransform<RecurrenceDurationType>(RecurrenceDurationType.Weekly, durationOperator, period.subject$);
   const target = useSubjectTransform<TRecurrenceTarget>(5, targetOperator, duration.subject$, period.subject$);
   // const repetitions = useSubjectValue<number>(1);

   return { period, duration, target };
};
