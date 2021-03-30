import { useObservable, useObservableState } from 'observable-hooks';
import { useCallback } from 'react';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Exception } from '~~/models/Exception';
import { SubjectWithValue } from './useSubjectValue';

export type TOperator<T1> = (o1$: Observable<T1>, ...otherObservables$: Observable<any>[]) => Observable<T1>;

/**
 * returns
 * 1. subject$
 * 2. value: the current value of observable$
 * 3. push: a callback to push a new value to the observable$
 */
export type SubjectWithTransform<T> = SubjectWithValue<T> & {
   /**
    * the source stream for the subject
    */
   source$: Subject<T>;
};

/**
 * Creates and returns an ObservableWithState from initalValue
 * The observable has a operator applied to it.
 * @param initValue
 * @param otherObservables$ second observable input to the operator
 * @param operator Accepts two arguments, 1. the current observable, 2. second input observable
 */

export const useSubjectTransform = <T>(initValue: T, operator: TOperator<T>, ...otherObservables$: Observable<any>[]): SubjectWithTransform<T> => {
   if (operator.length - 1 !== otherObservables$.length) {
      console.log(operator, otherObservables$);
      throw new Error('useSubjectTransform: invalid arguments match between operator and observable');
   }

   const source$ = useObservable<T>(() => new BehaviorSubject(initValue));
   const transform$ = useObservable(() => operator(source$, ...otherObservables$));
   const value = useObservableState(transform$, initValue);
   const push = useCallback((newValue: T) => (source$ as BehaviorSubject<T>).next(newValue), [source$]);

   return { subject$: transform$ as Subject<T>, push, value, source$: source$ as Subject<T> };
};
