import { useObservable, useObservableEagerState } from 'observable-hooks';
import { useCallback } from 'react';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { SubjectWithValue, TNewValueFunc } from '~~/components/common/core/hooks/useSubjectValue';
import { Exception } from '~~/models/Exception';

export type TTransform<T1> = (o1$: Observable<T1>, ...otherObservables$: Observable<any>[]) => Observable<T1>;

export type TOperator<T1, T2> = (o1$: Observable<T1>, ...otherObservables$: Observable<any>[]) => Observable<T1>;

/**
 * returns
 * 1. subject$: operator transformed stream
 * 2. value: the current value of observable$
 * 3. push: a callback to push a new value to the observable$
 */
export type SubjectWithTransform<T> = SubjectWithValue<T> & {
   /**
    * the source stream for the subject
    */
   source$: BehaviorSubject<T>;
};

/**
 * Creates and returns an ObservableWithState from initalValue
 * The observable has a operator applied to it.
 * @param initValue
 * @param otherObservables$ second observable input to the operator
 * @param operator Accepts two arguments, 1. the current observable, 2. second input observable
 */

export const useSubjectTransform = <T>(initValue: T, operator: TTransform<T>, ...otherObservables$: Observable<any>[]): SubjectWithTransform<T> => {
   if (operator.length - 1 !== otherObservables$.length) {
      console.log(operator, otherObservables$);
      throw new Error('useSubjectTransform: invalid arguments match between operator and observable');
   }

   const source$ = useObservable<T>(() => new BehaviorSubject(initValue)) as BehaviorSubject<T>;
   const subject$ = useObservable(() => {
      const b$ = new BehaviorSubject(initValue);
      operator(source$, ...otherObservables$).subscribe(b$);
      return b$;
   }, [source$]) as BehaviorSubject<T>;

   const push = useCallback(
      (newValue: T | TNewValueFunc<T>) => {
         if (typeof newValue === 'function') {
            // 📝NOTE: uses transformed subject$ instead of source$ as input
            const result = (newValue as TNewValueFunc<T>)(subject$.getValue());
            (source$ as Subject<T>).next(result);
         } else {
            (source$ as Subject<T>).next(newValue);
         }
      },
      [source$, subject$]
   );

   const value = useObservableEagerState(subject$);

   return { subject$, next: push, source$, value };
};
