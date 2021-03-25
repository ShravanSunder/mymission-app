import { RecurrenceAggregationPeriods, RecurrenceDurationTypes } from './recurrenceDefinitions';
import { DaysOfWeek } from './scheduleDefinitions';
import { ObservableWithState, useObservableWithState } from '~~/components/common/hooks/useObservableWithState';

export interface IRecurrenceObservables {
   aggregationPeriod: ObservableWithState<RecurrenceAggregationPeriods>;
   durationType: ObservableWithState<RecurrenceDurationTypes>;
   target: ObservableWithState<number | DaysOfWeek[]>;
}

export const useInitiativeScheduleRecurrenceObservables = (): IRecurrenceObservables => {
   return {
      aggregationPeriod: useObservableWithState<RecurrenceAggregationPeriods>(RecurrenceAggregationPeriods.PerDay),
      durationType: useObservableWithState<RecurrenceDurationTypes>(RecurrenceDurationTypes.Monthly),
      target: useObservableWithState<number | DaysOfWeek[]>(5),
   };
};
