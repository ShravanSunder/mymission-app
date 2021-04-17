import { nanoid } from 'nanoid';
import { atom, AtomEffect, GetRecoilValue, RecoilState, RecoilValue, RecoilValueReadOnly, selector } from 'recoil';

export const atomFactory = <T>(key: string = nanoid(), defaultValue: T, ...effect: ReadonlyArray<AtomEffect<T>>): RecoilState<T> => {
   return atom({ key: key, default: defaultValue, effects_UNSTABLE: effect.length == 0 ? undefined : effect });
};

export const selectorFactory = <T>(key: string = nanoid(), getFunc: (get: GetRecoilValue) => T | Promise<T> | RecoilValue<T>): RecoilValueReadOnly<T> => {
   return selector({
      key: key,
      get: ({ get }) => getFunc(get),
   });
};
