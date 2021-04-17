import { useObservable } from 'observable-hooks';
import { useCallback, useEffect } from 'react';
import { RecoilState, useRecoilState } from 'recoil';
import { BehaviorSubject, Subject } from 'rxjs';

import { SubjectWithValue, useSubjectValue } from './useSubjectValue';

/**
 * Create an observable from recoil state.  Updates flow form recoil state into the
 * observable.
 * - push updates the recoil state which then flows into the observable.
 * - value reflects the current recoil value
 * @template T1 observable type
 * @param atom recoil state.  typically output of atom.
 */
// export const useSubjectFromRecoil = <T>(atom: RecoilState<T>): SubjectWithValue<T> => {
//    const [recoilState, setRecoilState] = useRecoilState(atom);
//    const data = useSubjectValue<T>(recoilState);
// };
