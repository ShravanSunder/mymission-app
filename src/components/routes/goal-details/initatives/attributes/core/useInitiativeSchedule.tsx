import { RecurrenceAggregationPeriods, RecurrenceDurationTypes } from './recurrence.types';
import { DaysOfWeek } from './schedule.types';
import { SubjectWithValue, useSubjectValue } from '~~/components/common/core/hooks/useSubjectValue';
import { useSubjectTransform } from '~~/components/common/core/hooks/useSubjectTransform';
import { durationOperator, targetOperator } from './recurrence.operators';

export interface IRecurrenceObservables {
   aggregationPeriod: SubjectWithValue<RecurrenceAggregationPeriods>;
   durationType: SubjectWithValue<RecurrenceDurationTypes>;
   target: SubjectWithValue<number | DaysOfWeek[]>;
}

export const useRecurrenceObservables = (): IRecurrenceObservables => {
   const aggregationPeriod = useSubjectValue<RecurrenceAggregationPeriods>(RecurrenceAggregationPeriods.PerDay);
   const durationType = useSubjectTransform<RecurrenceDurationTypes>(RecurrenceDurationTypes.Weekly, durationOperator, aggregationPeriod.subject$);
   const target = useSubjectTransform<number | DaysOfWeek[]>(5, targetOperator, durationType.subject$, aggregationPeriod.subject$);

   return { aggregationPeriod, durationType, target };
};
