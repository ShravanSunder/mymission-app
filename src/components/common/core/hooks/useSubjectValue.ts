import { Subject, BehaviorSubject } from 'rxjs';
import { useObservable, useObservableState } from 'observable-hooks';
import { useCallback } from 'react';

/**
 * returns
 * 1. subject$
 * 2. value: the current value of observable$
 * 3. push: a callback to push a new value to the observable$
 */
export type SubjectWithValue<T> = {
   /**
    * the subject (observable)
    */
   subject$: Subject<T>;
   /**
    * latest value of observable
    */
   value: T;
   /**
    * push a new value into observable
    */
   push: (newValue: T) => void;
};

/**
 * Creates and returns an @see ObservableWithValue from initial value
 * @param initValue
 */
export const useSubjectValue = <T>(initValue: T): SubjectWithValue<T> => {
   const observable$ = useObservable<T>(() => new BehaviorSubject(initValue));
   const value = useObservableState(observable$, initValue);
   const push = useCallback((newValue: T) => (observable$ as Subject<T>).next(newValue), [observable$]);

   return { subject$: observable$ as Subject<T>, push, value };
};
