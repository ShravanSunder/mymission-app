import dayjs from 'dayjs';
import { array } from 'yup/lib/locale';
import { partitionToContiguousSections } from '~~/helpers/algorithms';
import { DaysOfWeek, daysOfWeekList, MonthsOfYear, monthsOfYearList } from './schedule.types';

export const daysOfWeekToString = (target: DaysOfWeek[]): string => {
   /**
    * if there are 6 of the days, we want to output the range as a string
    * ie. if only sunday is not selected:
    *    mon - sat
    */
   if (new Set(target).size === 6) {
      const dayNotPresent = daysOfWeekList.find((f) => !target.includes(f));
      if (dayNotPresent != undefined) {
         const first: DaysOfWeek = (dayNotPresent - 1) % 7;
         const last: DaysOfWeek = (dayNotPresent + 1) % 7;
         return `${dayjs().weekday(last).format('ddd')}-${dayjs().weekday(first).format('ddd')}`;
      }
   }

   return target
      .sort()
      .map((m) => dayjs().weekday(m).format('ddd'))
      .join(' ');
};

export const monthsOfYearToString = (target: MonthsOfYear[]): string => {
   const contiguousSections = partitionToContiguousSections(target, monthsOfYearList);

   const result: string[] = [];
   contiguousSections.forEach((value, key) => {
      if (value === key) {
         result.push(dayjs().month(value).format('MMM'));
      } else {
         result.push(dayjs().month(value).format('MMM') + '-' + dayjs().month(key).format('MMM'));
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
