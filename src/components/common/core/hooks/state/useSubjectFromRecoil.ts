import { useObservable } from 'observable-hooks';
import { useCallback, useEffect } from 'react';
import { RecoilState, RecoilValueReadOnly, useRecoilState, useRecoilValue } from 'recoil';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { SubjectWithValue } from '~~/components/common/core/hooks/state/useSubjectValue';
import { RecoilSubject } from '~~/providers/observableAtomFactory';

/**
 * Create an observable from recoil state.  Updates flow form recoil state into the
 * observable.
 * - push updates the recoil state which then flows into the observable.
 * - value reflects the current recoil value
 * @template T1 observable type
 * @param atom recoil state.  typically output of atom.
 */
export const useSubjectFromRecoil = <T>(atom: RecoilValueReadOnly<RecoilSubject<T>>): SubjectWithValue<T> => {
   const recoilState = useRecoilValue(atom);
   const subject$ = recoilState.getSubject();
   // const subject$ = useObservable((input$: Observable<[T]>) => input$.pipe(map(([value]) => value)), [recoilState]) as BehaviorSubject<T>;

   return { subject$, next: recoilState.next };
};
