import { RecurrenceAggregationPeriods, RecurrenceDurationTypes } from './recurrenceTypes';
import { DaysOfWeek } from './scheduleTypes';
import { ObservableWithValue, useObservableValue } from '~~/components/common/hooks/useObservableValue';
import { useObservableTransform, TOperator } from '~~/components/common/hooks/useObservableTransform';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { updateDuration } from './recurrenceLogic';
import { useSubscription } from 'observable-hooks';

export interface IRecurrenceObservables {
   aggregationPeriod: ObservableWithValue<RecurrenceAggregationPeriods>;
   durationType: ObservableWithValue<RecurrenceDurationTypes>;
   target: ObservableWithValue<number | DaysOfWeek[]>;
}

export const useRecurrenceObservables = (): IRecurrenceObservables => {
   const aggregationPeriod = useObservableValue<RecurrenceAggregationPeriods>(RecurrenceAggregationPeriods.PerDay);

   const durationOperator: TOperator<RecurrenceDurationTypes> = (o1$, o2$) => o2$.pipe(map((x) => RecurrenceDurationTypes.Monthly));
   const durationType = useObservableTransform<RecurrenceDurationTypes>(RecurrenceDurationTypes.Weekly, durationOperator, aggregationPeriod.observable$);

   useSubscription(durationType.observable$, (e) => console.log(e));

   const target = useObservableValue<number | DaysOfWeek[]>(5);

   return { aggregationPeriod, durationType, target };
};
