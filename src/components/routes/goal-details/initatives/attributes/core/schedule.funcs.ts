import dayjs from 'dayjs';
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
         return `${dayjs().weekday(last).format('ddd')} - ${dayjs().weekday(first).format('ddd')}`;
      }
   }

   return target
      .sort()
      .map((m) => dayjs().weekday(m).format('ddd'))
      .join(' ');
};

export const monthsOfYearToString = (target: MonthsOfYear[]): string => {
   /**
    * if there are 11, we want to output the range as a string
    * ie. if only december is not selected:
    *    jan - nov
    */
   if (new Set(target).size === 11) {
      const dayNotPresent = monthsOfYearList.find((f) => !target.includes(f));
      if (dayNotPresent != undefined) {
         const first: MonthsOfYear = (dayNotPresent - 1) % 12;
         const last: MonthsOfYear = (dayNotPresent + 1) % 12;
         return `${dayjs().month(last).format('ddd')} - ${dayjs().month(first).format('ddd')}`;
      }
   }

   return target
      .sort()
      .map((m) => dayjs().month(m).format('MMM'))
      .join(' ');
};

export const weeksOfMonthToString = (target: number[]): string => {
   return target
      .sort()
      .map((m) => m)
      .join(', ');
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
