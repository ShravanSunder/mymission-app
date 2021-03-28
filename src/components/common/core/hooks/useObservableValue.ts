import { BehaviorSubject, Observable } from 'rxjs';
import { useObservable, useObservableState } from 'observable-hooks';
import { useCallback } from 'react';

/**
 * returns
 * 1. observable$
 * 2. value: the current value of observable$
 * 3. push: a callback to push a new value to the observable$
 */
export type ObservableWithValue<T> = { observable$: Observable<T>; value: T; push: (newState: T) => void; obs?: () => Observable<T> };

/**
 * Creates and returns an @see ObservableWithValue from initial value
 * @param initValue
 */
export const useObservableValue = <T>(initValue: T): ObservableWithValue<T> => {
   const observable$ = useObservable<T>(() => new BehaviorSubject(initValue));
   const value = useObservableState(observable$, initValue);
   const push = useCallback((newValue: T) => (observable$ as BehaviorSubject<T>).next(newValue), [observable$]);

   return { observable$, push, value };
};
