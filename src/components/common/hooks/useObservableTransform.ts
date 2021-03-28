import { identity, Observable } from 'rxjs';
import { useObservableCallback, useObservableState, useSubscription } from 'observable-hooks';
import { useEffect } from 'react';
import { ObservableWithValue } from './useObservableValue';

export type TOperator<T1> = (o1$: Observable<T1>, ...otherObservables$: [Observable<any>]) => Observable<T1>;
/**
 * Creates and returns an ObservableWithState from initalValue
 * The observable has a operator applied to it.
 * @param initValue
 * @param otherObservables$ second observable input to the operator
 * @param operator Accepts two arguments, 1. the current observable, 2. second input observable
 */

export const useObservableTransform = <T1>(initValue: T1, operator: TOperator<T1>, ...otherObservables$: [Observable<any>]): ObservableWithValue<T1> => {
   const [push, observable$] = useObservableCallback<T1>((event$) => operator(event$, ...otherObservables$));
   const value = useObservableState(observable$, initValue);

   useEffect(() => {
      push(initValue);
      console.log('effect transform');
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useSubscription(observable$, (e) => console.log(e));

   return { observable$: observable$, push: push, value };
};
