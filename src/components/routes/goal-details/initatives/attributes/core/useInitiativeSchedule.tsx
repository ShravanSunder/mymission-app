import { RecurrenceAggregationPeriods, RecurrenceDurationTypes, TRecurrenceTarget } from './recurrence.types';
import { DaysOfWeek } from './schedule.types';
import { SubjectWithValue, useSubjectValue } from '~~/components/common/core/hooks/useSubjectValue';
import { useSubjectTransform, SubjectWithTransform } from '~~/components/common/core/hooks/useSubjectTransform';
import { durationOperator, targetOperator } from './recurrence.operators';

export interface IRecurrenceObservables {
   aggregationPeriod: SubjectWithValue<RecurrenceAggregationPeriods>;
   durationType: SubjectWithTransform<RecurrenceDurationTypes>;
   target: SubjectWithTransform<TRecurrenceTarget>;
}

export const useRecurrenceObservables = (): IRecurrenceObservables => {
   const aggregationPeriod = useSubjectValue<RecurrenceAggregationPeriods>(RecurrenceAggregationPeriods.PerDay);
   const durationType = useSubjectTransform<RecurrenceDurationTypes>(RecurrenceDurationTypes.Weekly, durationOperator, aggregationPeriod.subject$);
   const target = useSubjectTransform<TRecurrenceTarget>(5, targetOperator, durationType.subject$, aggregationPeriod.subject$);

   return { aggregationPeriod, durationType, target };
};
