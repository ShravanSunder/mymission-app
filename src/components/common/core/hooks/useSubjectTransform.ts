import { useObservable, useObservableState } from 'observable-hooks';
import { useCallback } from 'react';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SubjectWithValue } from './useSubjectValue';

export type TOperator<T1> = (o1$: Observable<T1>, ...otherObservables$: [Observable<any>]) => Observable<T1>;
/**
 * Creates and returns an ObservableWithState from initalValue
 * The observable has a operator applied to it.
 * @param initValue
 * @param otherObservables$ second observable input to the operator
 * @param operator Accepts two arguments, 1. the current observable, 2. second input observable
 */

export const useSubjectTransform = <T>(initValue: T, operator: TOperator<T>, ...otherObservables$: [Observable<any>]): SubjectWithValue<T> => {
   const observable$ = useObservable<T>(() => new BehaviorSubject(initValue));
   const transform$ = useObservable(() => operator(observable$, ...otherObservables$));
   const value = useObservableState(transform$, initValue);
   const push = useCallback((newValue: T) => (observable$ as BehaviorSubject<T>).next(newValue), [observable$]);

   return { subject$: transform$ as Subject<T>, push, value };
};
