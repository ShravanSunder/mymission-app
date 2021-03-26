import { identity, merge, Observable, pipe, combineLatest, BehaviorSubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { useObservable, useObservableCallback, useObservableState, useSubscription } from 'observable-hooks';
import { useEffect } from 'react';

/**
 * returns
 * 1. an observable of a value
 * 2. the current state
 */

export type ObservableWithState<T> = { observable$: Observable<T>; state: T; next: (newState: T) => void };

/**
 * Returns an observable from initial state and current state
 * @param value
 */
export const useObservableWithState = <T1,>(value: T1): ObservableWithState<T1> => {
   const [pushState, observable$] = useObservableCallback<T1>(() => new BehaviorSubject(value));
   const state = useObservableState(observable$, value);

   return { observable$, next: pushState, state };
};

export type TOperator<T1, T2> = (o1$: Observable<T1>, o2$: Observable<T2>) => Observable<T1>;

/**
 * Returns an observable from initial state and current state
 * @param value
 */
export const useTransformedObservableWithState = <T1, T2>(value: T1, input$: Observable<T2>, operator: TOperator<T1, T2>): ObservableWithState<T1> => {
   const [pushState, observable$] = useObservableCallback<T1>(() => new BehaviorSubject(value));
   const combinedObservable$ = useObservable<T1>(() => operator(observable$, input$));
   const state = useObservableState(combinedObservable$, value);

   return { observable$: combinedObservable$, next: pushState, state };
};
