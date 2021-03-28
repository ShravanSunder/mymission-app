import dayjs from 'dayjs';
import { DaysOfWeek, DaysOfWeekList } from './schedule.types';

export const daysOfWeekToString = (target: DaysOfWeek[]): string => {
   /**
    * if there are 6 of the days, we want to output the range as a string
    * ie. if only sunday is not selected:
    *    mon - sat
    */
   if (new Set(target).size === 6) {
      const daysOfWeek = DaysOfWeekList;
      const dayNotPresent = daysOfWeek.find((f) => !target.includes(f));
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

/**
 * checks if the target has all the days of the week
 * @param target
 * @returns
 */
export const isEveryDayOfWeek = (target: DaysOfWeek[]): boolean => {
   if (target.length < 7) return false;

   const daysOfWeek = DaysOfWeekList;
   return daysOfWeek.every((e) => target.includes(e));
};
