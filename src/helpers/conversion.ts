export const getAsNumber = (value: unknown): number | undefined => {
   if (typeof value === 'number') return value;
   return undefined;
};

export const getAsNumberArray = (values: unknown[]): number[] | undefined => {
   if (
      values.some((v) => {
         if (getAsNumber(v) == undefined) return true;

         return false;
      })
   ) {
      return undefined;
   }

   return (values as unknown) as number[];
};

export const getAsEnum = <TEnum>(enumeration: Record<string, string | number>, value: unknown): TEnum | undefined => {
   if (Object.values(enumeration).includes(value as string | number)) return value as TEnum;
   return undefined;
};

export const getAsEnumArray = <TEnum>(enumeration: Record<string, string | number>, values: unknown[]): TEnum[] | undefined => {
   if (
      values.some((v) => {
         if (!Object.values(enumeration).includes(v as string | number)) return true;

         return false;
      })
   ) {
      return undefined;
   }

   return (values as unknown) as TEnum[];
};
