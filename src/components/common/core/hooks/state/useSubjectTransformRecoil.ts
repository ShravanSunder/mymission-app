import { useObservable, useObservableEagerState, useObservableState, useSubscription } from 'observable-hooks';
import { useCallback } from 'react';
import { useRecoilState, atom, RecoilState, RecoilValueReadOnly, useRecoilValue, useRecoilCallback } from 'recoil';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { SubjectWithValue, TNewValueFunc } from '~~/components/common/core/hooks/state/useSubjectValue';
import { Exception } from '~~/models/Exception';
import { RecoilSubject } from '~~/providers/observableAtomFactory';

export type TTransform<T1> = (o1$: Observable<T1>, ...otherObservables$: Observable<any>[]) => Observable<T1>;

export type TOperator<T1, T2> = (o1$: Observable<T1>, ...otherObservables$: Observable<any>[]) => Observable<T1>;

/**
 * returns
 * 1. subject$: operator transformed stream
 * 2. value: the current value of observable$
 * 3. push: a callback to push a new value to the observable$
 */
export type SubjectWithTransform<T> = SubjectWithValue<T> & {
   /**
    * the source stream for the subject
    */
   source$: BehaviorSubject<T>;
};

/**
 * Creates and returns an ObservableWithState from initalValue
 * The observable has a operator applied to it.
 * @param initValue
 * @param otherObservables$ second observable input to the operator
 * @param operator Accepts two arguments, 1. the current observable, 2. second input observable
 */

export const useSubjectTransformRecoil = <T>(
   atom: RecoilValueReadOnly<RecoilSubject<T>>,
   operator: TTransform<T>,
   ...otherObservables$: Observable<any>[]
): SubjectWithTransform<T> => {
   if (operator.length - 1 !== otherObservables$.length) {
      console.log(operator, otherObservables$);
      throw new Error('useSubjectTransform: invalid arguments match between operator and observable');
   }

   const recoilState = useRecoilValue(atom);
   useRecoilCallback(({ snapshot }) => async () => {
      await snapshot.getPromise(atom);
   });

   // todo: it doens't make sense to send this to the recoil state
   const subject$ = useObservable(() => operator(recoilState.getSubject, ...otherObservables$)) as BehaviorSubject<T>;
   // const value = useObservableState(subject$, recoilState);

   useSubscription(subject$, (v) => console.log('triggered', v));

   return { subject$, next: recoilState.next, source$: recoilState.getSubject };
};
