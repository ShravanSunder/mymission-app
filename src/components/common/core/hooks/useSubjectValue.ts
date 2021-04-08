import { useObservable, useObservableEagerState } from 'observable-hooks';
import { useCallback } from 'react';
import { Subject, BehaviorSubject } from 'rxjs';

export type TNewValueFunc<T> = (oldValue: T) => T;

/**
 * returns
 * 1. subject$: stream
 * 2. value: the current value of observable$
 * 3. push: a callback to push a new value to the observable$
 */
export type SubjectWithValue<T> = {
   /**
    * the subject (observable)
    */
   subject$: BehaviorSubject<T>;
   /**
    * current value of observable, updated in the next render cycle after the observable updates
    */
   value: T;
   /**
    * push a new value into observable
    */
   next: (newValue: T | TNewValueFunc<T>) => void;
};

/**
 * Creates and returns an @see ObservableWithValue from initial value
 * @param initValue
 */
export const useSubjectValue = <T>(initValue: T): SubjectWithValue<T> => {
   const subject$ = useObservable<T>(() => new BehaviorSubject(initValue)) as BehaviorSubject<T>;

   const push = useCallback(
      (newValue: T | TNewValueFunc<T>) => {
         if (typeof newValue === 'function') {
            const result = (newValue as TNewValueFunc<T>)(subject$.getValue());
            (subject$ as Subject<T>).next(result);
         } else {
            (subject$ as Subject<T>).next(newValue);
         }
      },
      [subject$]
   );

   const value = useObservableEagerState(subject$);

   return { subject$, next: push, value };
};
