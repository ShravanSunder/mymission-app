import { identity, Observable } from 'rxjs';
import { useObservableCallback, useObservableState, useSubscription } from 'observable-hooks';
import { useEffect } from 'react';
import { ObservableWithValue } from './useObservableValue';
import { RecoilState, useRecoilState, useSetRecoilState } from 'recoil';

export type TOperator<T1, T2> = (o1$: Observable<T1>, o2$: Observable<T2>) => Observable<T1>;
/**
 * Creates and returns an ObservableWithState from initalValue
 * The observable has a operator applied to it.
 * @param initValue
 * @param second$ second observable input to the operator
 * @param operator Accepts two arguments, 1. the current observable, 2. second input observable
 */

export const useObservableTransform = <T1, T2>(initValue: T1, second$: Observable<T2>, operator: TOperator<T1, T2>): ObservableWithValue<T1> => {
   const [push, observable$] = useObservableCallback<T1>((event$) => operator(event$, second$));
   const value = useObservableState(observable$, initValue);

   useEffect(() => {
      push(initValue);
   }, [push, observable$, second$]);
      console.log('effect transform');
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return { observable$: observable$, push: push, value };
};
