import { DaysOfWeek } from './scheduleDefinitions';
import dayjs from 'dayjs';

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
   PerQuarter = 'quarter',
}
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
   Weekly = 'week',
   Monthly = 'month',
   Quarterly = 'quarter',
}

export const recurrenceToNumberOfDaysMap: Map<RecurrenceDurationTypes, number> = new Map([
   [RecurrenceDurationTypes.Weekly, 7],
   [RecurrenceDurationTypes.Monthly, 31],
   [RecurrenceDurationTypes.Quarterly, 90],
]);

export const DaysOfWeekToString = (target: DaysOfWeek[]): string => {
   return target
      .sort()
      .map((m) => dayjs().day(m).format('dd'))
      .join(' ');
};
