import dayjs from 'dayjs';
import { array } from 'yup/lib/locale';
import { partitionToContiguousSections } from '~~/helpers/algorithms';
import { DaysOfWeek, daysOfWeekList, MonthsOfYear, monthsOfYearList } from './schedule.types';

export const daysOfWeekToString = (target: DaysOfWeek[]): string => {
   const dateFn = (value: DaysOfWeek) => dayjs().weekday(value);
   const result: string[] = [];
   const contiguousSections = partitionToContiguousSections(target, daysOfWeekList);
   contiguousSections.forEach((value, key) => {
      if (value === key) {
         result.push(dateFn(value).format('ddd'));
      } else {
         result.push(dateFn(value).format('ddd') + '-' + dateFn(key).format('ddd'));
      }
   });

   return result.join('  ');
};

export const monthsOfYearToString = (target: MonthsOfYear[]): string => {
   const dateFn = (value: MonthsOfYear) => dayjs().month(value);
   const result: string[] = [];
   const contiguousSections = partitionToContiguousSections(target, monthsOfYearList);
   contiguousSections.forEach((value, key) => {
      if (value === key) {
         result.push(dateFn(value).format('MMM'));
      } else {
         result.push(dateFn(value).format('MMM') + '-' + dateFn(key).format('MMM'));
      }
   });

   return result.join('  ');
};

export const weeksOfMonthToString = (target: number[]): string => {
   const contiguousSections = partitionToContiguousSections(target, [1, 2, 3, 4]);

   const result: string[] = [];
   contiguousSections.forEach((value, key) => {
      if (value === key) {
         result.push(value.toString());
      } else {
         result.push(`${value}-${key}`);
      }
   });

   return result.join('  ');
};

/**
 * checks if the target has all the days of the week
 * @param target
 * @returns
 */
export const isEveryDayOfWeek = (target: DaysOfWeek[]): boolean => {
   if (target.length < 7) return false;

   return daysOfWeekList.every((e) => target.includes(e));
};

/**
 * checks if the target has all the days of the week
 * @param target
 * @returns
 */
export const isEveryMonthOfYear = (target: MonthsOfYear[]): boolean => {
   if (target.length < 12) return false;

   return monthsOfYearList.every((e) => target.includes(e));
};

/**
 * checks if the target has all the days of the week
 * @param target
 * @returns
 */
export const isEveryWeekOfMonth = (target: number[]): boolean => {
   if (target.length < 4) return false;

   return [1, 2, 3, 4].every((e) => target.includes(e));
};
