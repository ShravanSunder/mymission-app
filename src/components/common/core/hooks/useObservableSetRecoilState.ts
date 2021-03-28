import { useSubscription } from 'observable-hooks';
import { RecoilState, useSetRecoilState } from 'recoil';
import { Observable } from 'rxjs';

/**
 * Sets recoil state based on a observable's stream
 * @param observable$
 * @param atom recoil state
 */
export const useObservableSetRecoilState = <T1>(observable$: Observable<T1>, atom: RecoilState<T1>): void => {
   const setRecoilState = useSetRecoilState(atom);
   useSubscription(observable$, (value) => setRecoilState(value));
};
