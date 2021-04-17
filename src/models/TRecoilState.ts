import { SetterOrUpdater } from 'recoil';

export type TAtomState<T> = {
   get: T;
   set: SetterOrUpdater<T>;
};

export const createState = <T>(param: [T, SetterOrUpdater<T>]): TAtomState<T> => {
   return {
      get: param[0],
      set: param[1],
   };
};
