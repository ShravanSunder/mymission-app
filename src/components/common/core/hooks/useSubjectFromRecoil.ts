import { useObservable } from 'observable-hooks';
import { useCallback, useEffect } from 'react';
import { RecoilState, useRecoilState } from 'recoil';
import { BehaviorSubject, Subject } from 'rxjs';
import { SubjectWithValue } from './useSubjectValue';

/**
 * Create an observable from recoil state.  Updates flow form recoil state into the
 * observable.
 * - push updates the recoil state which then flows into the observable.
 * - value reflects the current recoil value
 * @template T1 observable type
 * @param atom recoil state.  typically output of atom.
 */
export const useSubjectFromRecoil = <T>(atom: RecoilState<T>): SubjectWithValue<T> => {
   const [recoilState, setRecoilState] = useRecoilState(atom);
   const observable$ = useObservable<T>(() => new BehaviorSubject(recoilState));
   const next = useCallback((newValue: T) => (observable$ as BehaviorSubject<T>).next(newValue), [observable$]);

   useEffect(() => next(recoilState), [next, recoilState]);

   return { subject$: observable$ as Subject<T>, push: (value: T) => setRecoilState(value), value: recoilState };
};
