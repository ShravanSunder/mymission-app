import { identity, Observable } from 'rxjs';
import { useObservableCallback, useObservableState } from 'observable-hooks';

/**
 * returns
 * 1. an observable of a value
 * 2. the current state
 */

export type ObservableWithState<T> = { observable$: Observable<T>; state: T; pushState: (newState: T) => void };
/**
 * Returns an observable from initial state and current state
 * @param value
 */
export const useObservableWithState = <T1,>(value: T1): ObservableWithState<T1> => {
   const [pushState, observable$] = useObservableCallback<T1>(identity);
   const state = useObservableState(observable$, value);

   return { observable$, pushState: pushState, state };
};
