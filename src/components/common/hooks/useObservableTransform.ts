import { identity, Observable } from 'rxjs';
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

export const useObservableTransform = <T1>(initValue: T1, operator: TOperator<T1>, ...otherObservables$: [Observable<any>]): ObservableWithValue<T1> => {
   const [push, observable$] = useObservableCallback<T1>((push$) => push$.pipe(startWith(initValue)));
   const transform$ = useObservable(() => operator(observable$, ...otherObservables$));
   const value = useObservableState(observable$, initValue);

   return { observable$: transform$, push: push, value };
};
