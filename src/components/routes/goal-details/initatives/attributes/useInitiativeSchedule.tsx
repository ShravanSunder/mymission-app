import { RecurrenceAggregationPeriods, RecurrenceDurationTypes } from './recurrenceDefinitions';
import { DaysOfWeek } from './scheduleDefinitions';
import { ObservableWithState, useTransformedObservableWithState, useObservableWithState, TOperator } from '~~/components/common/hooks/useObservableWithState';
import { useObservable, useSubscription } from 'observable-hooks';
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
      o1$.pipe(map((state1) => RecurrenceDurationTypes.Monthly));

   // const durationType = useObservableWithState<RecurrenceDurationTypes>(RecurrenceDurationTypes.Weekly);

   // const data$ = useObservable(() => durationOperator(durationType.observable$, aggregationPeriod.observable$));

   // useSubscription(data$, (e) => console.log('data' + ((e as unknown) as string)));

   const durationType = useTransformedObservableWithState<RecurrenceDurationTypes, RecurrenceAggregationPeriods>(
      RecurrenceDurationTypes.Weekly,
      aggregationPeriod.observable$,
      durationOperator
   );
   const target = useObservableWithState<number | DaysOfWeek[]>(5);

   useSubscription(aggregationPeriod.observable$, () => durationType.next(RecurrenceDurationTypes.Weekly));

   useSubscription(aggregationPeriod.observable$, (e) => console.log('aggre' + e));
   useSubscription(durationType.observable$, (e) => console.log('duration' + ((e as unknown) as string)));

   return { aggregationPeriod, durationType, target };
};
