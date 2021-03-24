import { BehaviorSubject, from, Observable, observable, of, Subject } from 'rxjs';
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
export type SubjectWithState<T> = { subject$: BehaviorSubject<T>; state: T };

/**
 * Returns an observable from initial state and current state
 * @param value
 */
const useCreateSubject = <T1,>(value: T1): SubjectWithState<T1> => {
   const observable$ = useObservable(pluckFirst, [value]);
   const state = useObservableState(observable$, value);

   return { subject$: observable$ as BehaviorSubject<T1>, state };
};

export interface IRecurrenceObservables {
   aggregationPeriod: SubjectWithState<RecurrenceAggregationPeriods>;
   durationType: SubjectWithState<RecurrenceDurationTypes>;
   target: SubjectWithState<number | DaysOfWeek[]>;
}

export const useInitiativeScheduleRecurrenceObservables = (): IRecurrenceObservables => {
   return {
      aggregationPeriod: useCreateSubject<RecurrenceAggregationPeriods>(RecurrenceAggregationPeriods.PerDay),
      durationType: useCreateSubject<RecurrenceDurationTypes>(RecurrenceDurationTypes.Monthly),
      target: useCreateSubject<number | DaysOfWeek[]>(5),
   };
};
