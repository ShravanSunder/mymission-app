export const clamp = (value: number, min: number, max: number): number => {
   console.log(Math.max(min, Math.min(value, max)));
   return Math.max(min, Math.min(value, max));
};
