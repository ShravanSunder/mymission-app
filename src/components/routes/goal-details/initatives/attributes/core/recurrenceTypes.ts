import { DaysOfWeek } from './scheduleTypes';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import duration from 'dayjs/plugin/duration';

dayjs.extend(weekday);
dayjs.extend(duration);

/**
 * The period for which you are aggregating (counting) your habit?
 * - most common: total count for the day (aggregate over a day)
 * - aggregate over a week
 * - aggregate over a month
 * - aggegate over a quarter
 */
export enum RecurrenceAggregationPeriods {
   PerDay = 'day',
   PerWeek = 'week',
   PerMonth = 'month',
}

export const RecurrenceAggregationPeriodList = [
   RecurrenceAggregationPeriods.PerDay,
   RecurrenceAggregationPeriods.PerWeek,
   RecurrenceAggregationPeriods.PerMonth,
];

/**
 * How long is the duration of time over which you are tracking your habit
 * for example?
 * - Number of successfull days a week?
 * - Number of successfull days a month
 * - Number of successful weeks a month?
 */
export enum RecurrenceDurationTypes {
   SpecificDaysOfWeek,
   PerNumberOfDays,
   PerNumberOfWeeks,
   PerNumberOfMonths,
   Weekly = 'week',
   Monthly = 'month',
   Quarterly = 'quarter',
}

export const daysToRecurrenceTypeMap: Map<RecurrenceDurationTypes, number> = new Map([
   [RecurrenceDurationTypes.Weekly, 7],
   [RecurrenceDurationTypes.Monthly, dayjs.duration({ months: 1 }).asDays()],
   [RecurrenceDurationTypes.Quarterly, dayjs.duration({ months: 3 }).asDays()],
]);

export const weeksToRecurrenceTypeMap: Map<RecurrenceDurationTypes, number> = new Map([
   [RecurrenceDurationTypes.Monthly, dayjs.duration({ months: 1 }).asWeeks()],
   [RecurrenceDurationTypes.Quarterly, dayjs.duration({ months: 3 }).asWeeks()],
]);

export const monthsToRecurrenceTypeMap: Map<RecurrenceDurationTypes, number> = new Map([
   [RecurrenceDurationTypes.Quarterly, dayjs.duration({ months: 3 }).asMonths()],
]);

/**
 * checks if the target has all the days of the week
 * @param target
 * @returns
 */
export const isEveryDayOfWeek = (target: DaysOfWeek[]): boolean => {
   if (target.length < 7) return false;

   const daysOfWeek = Object.values(DaysOfWeek).filter((f) => typeof f !== 'string') as DaysOfWeek[];
   return daysOfWeek.every((e) => target.includes(e));
};

export const daysOfWeekToString = (target: DaysOfWeek[]): string => {
   /**
    * if there are 6 of the days, we want to output the range as a string
    * ie. if only sunday is not selected:
    *    mon - sat
    */
   if (new Set(target).size === 6) {
      const daysOfWeek = Object.values(DaysOfWeek).filter((f) => typeof f !== 'string') as DaysOfWeek[];
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
