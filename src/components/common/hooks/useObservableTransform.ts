import { BehaviorSubject, identity, Observable } from 'rxjs';
import { useObservable, useObservableCallback, useObservableState, useSubscription } from 'observable-hooks';
import { useEffect } from 'react';
import { ObservableWithValue } from './useObservableValue';
import { startWith } from 'rxjs/operators';

export type TOperator<T1> = (o1$: Observable<T1>, ...otherObservables$: [Observable<any>]) => Observable<T1>;
/**
 * Creates and returns an ObservableWithState from initalValue
 * The observable has a operator applied to it.
 * @param initValue
 * @param otherObservables$ second observable input to the operator
 * @param operator Accepts two arguments, 1. the current observable, 2. second input observable
 */

export const useObservableTransform = <T>(initValue: T, operator: TOperator<T>, ...otherObservables$: [Observable<any>]): ObservableWithValue<T> => {
   const observable$ = useObservable<T>(() => new BehaviorSubject(initValue));
   const transform$ = useObservable(() => operator(observable$, ...otherObservables$));
   const value = useObservableState(transform$, initValue);
   const push = (newValue: T) => (observable$ as BehaviorSubject<T>).next(newValue);

   return { observable$: transform$, push, value };
};
