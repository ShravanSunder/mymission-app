import { RecurrenceAggregationPeriods, RecurrenceDurationTypes } from './recurrenceTypes';
import { DaysOfWeek } from './scheduleTypes';
import { ObservableWithValue, useObservableValue } from '~~/components/common/hooks/useObservableValue';
import { useObservableTransform, TOperator } from '~~/components/common/hooks/useObservableTransform';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { updateDuration, updateTarget } from './recurrenceLogic';
import { useSubscription } from 'observable-hooks';

export interface IRecurrenceObservables {
   aggregationPeriod: ObservableWithValue<RecurrenceAggregationPeriods>;
   durationType: ObservableWithValue<RecurrenceDurationTypes>;
   target: ObservableWithValue<number | DaysOfWeek[]>;
}

const durationOperator: TOperator<RecurrenceDurationTypes> = (o1$, o2$) =>
   combineLatest([o1$, o2$]).pipe(map(([state1, state2]) => updateDuration(state1, state2)));

const targetOperator: TOperator<number | DaysOfWeek[]> = (o1$, o2$) => combineLatest([o1$, o2$]).pipe(map(([state1, state2]) => updateTarget(state1, state2)));

export const useRecurrenceObservables = (): IRecurrenceObservables => {
   const aggregationPeriod = useObservableValue<RecurrenceAggregationPeriods>(RecurrenceAggregationPeriods.PerDay);

   const durationType = useObservableTransform<RecurrenceDurationTypes>(RecurrenceDurationTypes.Weekly, durationOperator, aggregationPeriod.observable$);

   // const target = useObservableValue<number | DaysOfWeek[]>(5);
   const target = useObservableTransform<number | DaysOfWeek[]>(5, targetOperator, durationType.observable$);

   // useSubscription(durationType.observable$, (e) => console.log(e));
   // useSubscription(aggregationPeriod.observable$, (e) => console.log(e));
   useSubscription(target.observable$, (e) => console.log(e));

   return { aggregationPeriod, durationType, target };
};
