import { RecurrenceAggregationPeriods, RecurrenceDurationTypes } from './recurrenceDefinitions';
import { DaysOfWeek } from './scheduleDefinitions';
import { ObservableWithValue, useObservableWithTransform, useObservableWithValue, TOperator } from '~~/components/common/hooks/useObservableWithState';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

export interface IRecurrenceObservables {
   aggregationPeriod: ObservableWithValue<RecurrenceAggregationPeriods>;
   durationType: ObservableWithValue<RecurrenceDurationTypes>;
   target: ObservableWithValue<number | DaysOfWeek[]>;
}

const updateDuration = (durationType: RecurrenceDurationTypes, aggregationPeriod: RecurrenceAggregationPeriods): RecurrenceDurationTypes => {
   return RecurrenceDurationTypes.Monthly;
};

export const useRecurrenceObservables = (): IRecurrenceObservables => {
   const aggregationPeriod = useObservableWithValue<RecurrenceAggregationPeriods>(RecurrenceAggregationPeriods.PerDay);

   const durationOperator: TOperator<RecurrenceDurationTypes, RecurrenceAggregationPeriods> = (o1$, o2$) =>
      combineLatest([o1$, o2$]).pipe(map(([state1, state2]) => updateDuration(state1, state2)));

   const durationType = useObservableWithTransform<RecurrenceDurationTypes, RecurrenceAggregationPeriods>(
      RecurrenceDurationTypes.Weekly,
      aggregationPeriod.observable$,
      durationOperator
   );
   const target = useObservableWithValue<number | DaysOfWeek[]>(5);

   return { aggregationPeriod, durationType, target };
};
