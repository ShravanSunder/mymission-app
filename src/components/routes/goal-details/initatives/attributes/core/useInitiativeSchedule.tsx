import { RecurrenceAggregationPeriods, RecurrenceDurationTypes } from './recurrence.types';
import { DaysOfWeek } from './schedule.types';
import { SubjectWithValue, useSubjectValue } from '~~/components/common/core/hooks/useSubjectValue';
import { useSubjectTransform, TOperator } from '~~/components/common/core/hooks/useSubjectTransform';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { updateDuration, updateTarget } from './recurrence.operators';
import { useSubscription } from 'observable-hooks';

export interface IRecurrenceObservables {
   aggregationPeriod: SubjectWithValue<RecurrenceAggregationPeriods>;
   durationType: SubjectWithValue<RecurrenceDurationTypes>;
   target: SubjectWithValue<number | DaysOfWeek[]>;
}

const durationOperator: TOperator<RecurrenceDurationTypes> = (o1$, o2$) =>
   combineLatest([o1$, o2$]).pipe(map(([state1, state2]) => updateDuration(state1, state2)));

const targetOperator: TOperator<number | DaysOfWeek[]> = (o1$, o2$) => combineLatest([o1$, o2$]).pipe(map(([state1, state2]) => updateTarget(state1, state2)));

export const useRecurrenceObservables = (): IRecurrenceObservables => {
   const aggregationPeriod = useSubjectValue<RecurrenceAggregationPeriods>(RecurrenceAggregationPeriods.PerDay);
   const durationType = useSubjectTransform<RecurrenceDurationTypes>(RecurrenceDurationTypes.Weekly, durationOperator, aggregationPeriod.subject$);
   const target = useSubjectTransform<number | DaysOfWeek[]>(5, targetOperator, durationType.subject$);

   return { aggregationPeriod, durationType, target };
};
