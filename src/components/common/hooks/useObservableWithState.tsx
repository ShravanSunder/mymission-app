import { identity, merge, Observable, pipe, combineLatest, BehaviorSubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { useObservable, useObservableCallback, useObservableState, useSubscription } from 'observable-hooks';
import { useEffect } from 'react';

/**
 * returns
 * 1. an observable of a value
 * 2. the current state
 * 3. next function set next value
 */
export type ObservableWithValue<T> = { observable$: Observable<T>; value: T; push: (newState: T) => void };

/**
 * Returns an ObservableWithState from initial value
 * @param initValue
 */
export const useObservableWithValue = <T1,>(initValue: T1): ObservableWithValue<T1> => {
   const [push, pushObservable$] = useObservableCallback<T1>(identity);
   const value = useObservableState(pushObservable$, initValue);

   useEffect(() => {
      push(initValue);
   }, [push, pushObservable$]);

   return { observable$: pushObservable$, push, value };
};

export type TOperator<T1, T2> = (o1$: Observable<T1>, o2$: Observable<T2>) => Observable<T1>;

/**
 * Returns an ObservableWithState from initalValue
 * It the observable is transformed with an operator and adjacent state
 * @param initValue
 * @param input$
 * @param operator
 */
export const useObservableWithTransform = <T1, T2>(initValue: T1, input$: Observable<T2>, operator: TOperator<T1, T2>): ObservableWithValue<T1> => {
   const [pushState, pushObservable$] = useObservableCallback<T1>((event$) => operator(event$, input$));
   const value = useObservableState(pushObservable$, initValue);

   useEffect(() => {
      pushState(initValue);
   }, [pushState, pushObservable$, pushObservable$, input$]);

   return { observable$: pushObservable$, push: pushState, value };
};
