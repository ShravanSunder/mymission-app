export const GetValues = <T1>(enumeration: Record<string, string | number>): T1[] => {
   return (Object.keys(enumeration)
      .map((key) => enumeration[key])
      .filter((k) => {
         if (typeof k === 'number' && k > 0) return true;
         else if (typeof k === 'string' && !(parseInt(k) >= 0)) return true;
         else return false;
      }) as unknown) as T1[];
};
