import { map } from 'rxjs/operators';

export const getValuesOfEnum = <TEnum>(enumeration: Record<string, string | number>): TEnum[] => {
   return (Object.keys(enumeration)
      .filter((key) => {
         if (typeof key === 'string' && Number.isNaN(parseInt(key)) && typeof enumeration[key] === 'string') return true;
         else if (typeof key === 'string' && typeof enumeration[key] === 'number') return true;
         else return false;
      })
      .map((key) => enumeration[key])
      .filter((k) => {
         if (typeof k === 'number' && k >= 0) return true;
         else if (typeof k === 'string' && !(parseInt(k) >= 0)) return true;
         else return false;
      }) as unknown) as TEnum[];
};

export const getKeysOfEnum = <TEnum>(enumeration: Record<string, string | number>): TEnum[] => {
   return (Object.keys(enumeration).filter((key) => {
      if (typeof key === 'string' && Number.isNaN(parseInt(key)) && typeof enumeration[key] === 'string') return true;
      else if (typeof key === 'string' && typeof enumeration[key] === 'number') return true;
      else return false;
   }) as unknown) as TEnum[];
};

export const isEnum = <TEnum>(enumeration: TEnum, value: unknown): boolean => {
   return Object.values(enumeration).includes(value);
};
