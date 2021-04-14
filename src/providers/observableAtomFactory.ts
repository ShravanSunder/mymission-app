import { atom, errorSelector, RecoilValueReadOnly, selector } from 'recoil';
import { BehaviorSubject, Subject } from 'rxjs';
import { Doc } from 'yjs';

import { TNewValueFunc } from '~~/components/common/core/hooks/state/useSubjectValue';
import { getReferenceMap } from '~~/providers/atomFactoryState';

/**
 * returns
 * 1. subject$: stream
 * 2. value: the current value of observable$
 * 3. push: a callback to push a new value to the observable$
 */
export type RecoilSubject<T> = {
   /**
    * the subject (observable)
    */
   getSubject: () => BehaviorSubject<T>;
   /**
    * push a new value into observable
    */
   next: (newValue: T | TNewValueFunc<T>) => void;
};

export const observableAtomFactory = <T>(key: string, initalValue: T): RecoilValueReadOnly<RecoilSubject<T>> => {
   const recoilAtom = atom<RecoilSubject<T>>({
      key: `${key}-atom`,
      default: errorSelector('Attempt to use Atom before initialization'),
      effects_UNSTABLE: [
         ({ setSelf, trigger }) => {
            if (trigger === 'get') {
               const newSubject$ = new BehaviorSubject<T>(initalValue);
               getReferenceMap().set(key, newSubject$);

               const next = (newValue: T | TNewValueFunc<T>) => {
                  if (typeof newValue === 'function') {
                     const result = (newValue as TNewValueFunc<T>)(newSubject$.getValue());
                     (newSubject$ as Subject<T>).next(result);
                  } else {
                     (newSubject$ as Subject<T>).next(newValue);
                  }
               };

               setSelf({ getSubject: () => getReferenceMap().get(key) as BehaviorSubject<T>, next });
            }
            return () => {
               const subject$ = getReferenceMap().get(key) as BehaviorSubject<T>;
               subject$.complete();
               getReferenceMap().delete(key);
            };
         },
      ],
   });

   const recoilSelector = selector<RecoilSubject<T>>({
      key: `${key}-selector`,
      get: ({ get }) => {
         const atom = get(recoilAtom);
         return atom;
      },
   });

   return recoilSelector;
};
