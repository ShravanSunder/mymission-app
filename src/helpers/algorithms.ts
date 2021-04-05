import { MonthsOfYear } from '~~/components/routes/goal-details/initatives/attributes/core/schedule.types';

/**
 * This functions partitions an array that represents a selection to contiguous lists
 * @param currentSelection array of current selection
 * @param sortedFullList the full list that is sorted
 * @returns A Map<T, T>  The key is the end of the contiguous selection and the value is the beginning. If value == key this section is not contiguous to any other part.
 */
export const partitionToContiguousSections = <T>(currentSelection: T[], sortedFullList: T[]): Map<T, T> => {
   const data = new Map<T, T>();
   sortedFullList.forEach((f, i) => {
      if (currentSelection.includes(f)) {
         if (data.has(sortedFullList[i - 1])) {
            data.set(f, data.get(sortedFullList[i - 1])!);
            data.delete(sortedFullList[i - 1]);
         } else {
            data.set(f, f);
         }
      }
   });
   return data;
};
