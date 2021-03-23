import { from, Observable, observable, of, Subject } from 'rxjs';
import { map, switchMap, startWith, catchError } from 'rxjs/operators';
import { Dispatch, SetStateAction, useState } from 'react';
import { RecurrenceAggregationPeriods, RecurrenceDurationTypes } from './recurrenceDefinitions';
import { DaysOfWeek } from './scheduleDefinitions';
import { useRecoilState } from 'recoil';
import { pluckFirst, useObservable, useObservableState } from 'observable-hooks';
import { useRecurrenceSummary } from './useRecurrenceSummary';

/**
 * returns
 * 1. an observable of a value
 * 2. the current state
 */
export type ObservableWithState<T> = { observable$: Observable<T>; state: T };

/**
 * Returns an observable from initial state and current state
 * @param value
 */
const useCreateObservable = <T,>(value: T): ObservableWithState<T> => {
   const observable$ = useObservable(pluckFirst, [value]);
   const state = useObservableState(observable$, value);

   return { observable$, state };
};

export interface IRecurrenceObservables {
   aggregationPeriod: ObservableWithState<RecurrenceAggregationPeriods>;
   durationType: ObservableWithState<RecurrenceDurationTypes>;
   target: ObservableWithState<number | DaysOfWeek[]>;
}

export const useInitiativeScheduleRecurrenceObservables = (): IRecurrenceObservables => {
   return {
      aggregationPeriod: useCreateObservable(RecurrenceAggregationPeriods.PerDay),
      durationType: useCreateObservable<RecurrenceDurationTypes>(RecurrenceDurationTypes.Monthly),
      target: useCreateObservable<number | DaysOfWeek[]>(5),
   };
};
