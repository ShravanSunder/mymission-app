import { useObservableCallback } from 'observable-hooks';
import { useEffect } from 'react';
import { RecoilState, useRecoilState } from 'recoil';
import { identity } from 'rxjs';
import { ObservableWithValue } from './useObservableValue';

/**
 * Create an observable from recoil state.  Updates flow form recoil state into the
 * observable.
 * - push updates the recoil state which then flows into the observable.
 * - value reflects the current recoil value
 * @template T1 observable type
 * @param atom recoil state.  typically output of atom.
 */
export const useObservableRecoilState = <T1>(atom: RecoilState<T1>): ObservableWithValue<T1> => {
   const [recoilState, setRecoilState] = useRecoilState(atom);
   const [push, pushObservable$] = useObservableCallback<T1>(identity);

   useEffect(() => push(recoilState), [recoilState, push]);

   return { observable$: pushObservable$, push: (value: T1) => setRecoilState(value), value: recoilState };
};
