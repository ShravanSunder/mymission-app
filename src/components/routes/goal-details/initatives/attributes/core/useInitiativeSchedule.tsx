import { RecurrenceAggregationPeriods, RecurrenceDurationTypes } from './recurrenceTypes';
import { DaysOfWeek } from './scheduleTypes';
import { ObservableWithValue, useObservableValue } from '~~/components/common/hooks/useObservableValue';
import { useObservableTransform, TOperator } from '~~/components/common/hooks/useObservableTransform';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { updateDuration } from './recurrenceLogic';

export interface IRecurrenceObservables {
   aggregationPeriod: ObservableWithValue<RecurrenceAggregationPeriods>;
   durationType: ObservableWithValue<RecurrenceDurationTypes>;
   target: ObservableWithValue<number | DaysOfWeek[]>;
}

export const useRecurrenceObservables = (): IRecurrenceObservables => {
   const aggregationPeriod = useObservableValue<RecurrenceAggregationPeriods>(RecurrenceAggregationPeriods.PerDay);

   const durationOperator: TOperator<RecurrenceDurationTypes, RecurrenceAggregationPeriods> = (o1$, o2$) =>
      combineLatest([o1$, o2$]).pipe(map(([state1, state2]) => updateDuration(state1, state2)));
   const durationType = useObservableTransform<RecurrenceDurationTypes, RecurrenceAggregationPeriods>(
      RecurrenceDurationTypes.Weekly,
      aggregationPeriod.observable$,
      durationOperator
   );

   const target = useObservableValue<number | DaysOfWeek[]>(5);

   return { aggregationPeriod, durationType, target };
};
