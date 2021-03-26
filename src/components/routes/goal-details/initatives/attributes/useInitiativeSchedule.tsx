import { RecurrenceAggregationPeriods, RecurrenceDurationTypes } from './recurrenceDefinitions';
import { DaysOfWeek } from './scheduleDefinitions';
import { ObservableWithState, useTransformedObservableWithState, useObservableWithState, TOperator } from '~~/components/common/hooks/useObservableWithState';
import { useSubscription } from 'observable-hooks';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

export interface IRecurrenceObservables {
   aggregationPeriod: ObservableWithState<RecurrenceAggregationPeriods>;
   durationType: ObservableWithState<RecurrenceDurationTypes>;
   target: ObservableWithState<number | DaysOfWeek[]>;
}

const updateDuration = (durationType: RecurrenceDurationTypes, aggregationPeriod: RecurrenceAggregationPeriods): RecurrenceDurationTypes => {
   // if (aggregationPeriod === RecurrenceAggregationPeriods.PerDay) {
   // }
   return RecurrenceDurationTypes.Monthly;
};

export const useRecurrenceObservables = (): IRecurrenceObservables => {
   const aggregationPeriod = useObservableWithState<RecurrenceAggregationPeriods>(RecurrenceAggregationPeriods.PerDay);

   const durationOperator: TOperator<RecurrenceDurationTypes, RecurrenceAggregationPeriods> = (o1$, o2$) =>
      combineLatest([o1$, o2$]).pipe(map(([state1, state2]) => updateDuration(state1, state2)));

   // const durationType = useObservableWithState<RecurrenceDurationTypes>(RecurrenceDurationTypes.Weekly);

   const durationType = useTransformedObservableWithState<RecurrenceDurationTypes, RecurrenceAggregationPeriods>(
      RecurrenceDurationTypes.Weekly,
      aggregationPeriod.observable$,
      durationOperator
   );
   const target = useObservableWithState<number | DaysOfWeek[]>(5);

   useSubscription(aggregationPeriod.observable$, (e) => console.log(e));
   useSubscription(durationType.observable$, (e) => console.log(e));

   return { aggregationPeriod, durationType, target };
};
