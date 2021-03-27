import { RecurrenceAggregationPeriods, RecurrenceDurationTypes } from './recurrenceDefinitions';
import { DaysOfWeek } from './scheduleDefinitions';
import { ObservableWithValue, useObservableValue } from '~~/components/common/hooks/useObservableValue';
import { useObservableTransform, TOperator } from '~~/components/common/hooks/useObservableTransform';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { useObservableRecoilState } from '~~/components/common/hooks/useObservableRecoilState';
import { useEffect } from 'react';

export interface IRecurrenceObservables {
   aggregationPeriod: ObservableWithValue<RecurrenceAggregationPeriods>;
   durationType: ObservableWithValue<RecurrenceDurationTypes>;
   target: ObservableWithValue<number | DaysOfWeek[]>;
}

const updateDuration = (durationType: RecurrenceDurationTypes, aggregationPeriod: RecurrenceAggregationPeriods): RecurrenceDurationTypes => {
   return RecurrenceDurationTypes.Monthly;
};

const tryBlah = atom<string>({
   key: 'todoListState',
   default: '',
});

export const useRecurrenceObservables = (): IRecurrenceObservables => {
   const [text, setText] = useRecoilState(tryBlah);

   useEffect(() => {
      setText(RecurrenceAggregationPeriods.PerMonth);
   }, []);

   const aggregationPeriod = useObservableValue<RecurrenceAggregationPeriods>(RecurrenceAggregationPeriods.PerDay);

   // const tryStuff = useObservableRecoilState<RecurrenceAggregationPeriods>(tryBlah);

   // const data = useRecoilValue(tryBlah);

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
