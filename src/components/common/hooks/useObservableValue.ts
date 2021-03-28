import { identity, Observable } from 'rxjs';
import { useObservableCallback, useObservableState } from 'observable-hooks';
import { useEffect } from 'react';
import { startWith } from 'rxjs/operators';

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
export const useObservableValue = <T1>(initValue: T1): ObservableWithValue<T1> => {
   const [push, observable$] = useObservableCallback<T1>((push$) => push$.pipe(startWith(initValue)));
   const value = useObservableState(observable$, initValue);

   return { observable$, push, value };
};
