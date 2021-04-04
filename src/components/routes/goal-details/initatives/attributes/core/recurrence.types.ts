import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import weekday from 'dayjs/plugin/weekday';
import { DaysOfWeek, MonthsOfYear } from '~~/components/routes/goal-details/initatives/attributes/core/schedule.types';
import { getKeysOfEnum, getValuesOfEnum } from '~~/helpers/enums';

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
   PerDay = 'PerDay',
   PerWeek = 'PerWeek',
   PerMonth = 'PerMonth',
}

export const RecurrenceAggregationPeriodList = getValuesOfEnum<RecurrenceAggregationPeriods>(RecurrenceAggregationPeriods);

/**
 * How long is the duration of time over which you are tracking your habit
 * for example? See @availableDurations for details
 * - Number of successfull days a week?
 * - Number of successfull days a month
 * - Number of successful weeks a month?
 */
export enum RecurrenceDurationTypes {
   /**
    * Allowed Periods: day
    */
   Weekly = 'Weekly',
   /**
    * Allowed Periods: day, week
    */
   Monthly = 'Monthly',
   /**
    * Allowed Periods: day, week, month
    */
   Quarterly = 'Quarterly',
   /**
    * Allowed Periods: days
    */
   SpecificDaysOfWeek = 'SpecificDaysOfWeek',
   /**
    * Allowed Periods: week
    */
   SpecificWeeksOfMonth = 'SpecificWeeksOfMonth',
   /**
    * Allowed Periods: month
    */
   SpecificMonthsOfYear = 'SpecificMonthsOfYear',
   /**
    * Allowed Periods: days
    */
   PerNumberOfDays = 'PerNumberOfDays',
}

export type TRecurrenceTarget = number | DaysOfWeek[] | MonthsOfYear[];

export const RecurrenceDurationList: RecurrenceDurationTypes[] = getValuesOfEnum<RecurrenceDurationTypes>(RecurrenceDurationTypes);

export const daysToRecurrenceTypeMap: Map<RecurrenceDurationTypes, number> = new Map([
   [RecurrenceDurationTypes.Weekly, 7],
   [RecurrenceDurationTypes.Monthly, Math.floor(dayjs.duration({ months: 1 }).asDays())],
   [RecurrenceDurationTypes.Quarterly, Math.floor(dayjs.duration({ months: 3 }).asDays())],
]);

export const weeksToRecurrenceTypeMap: Map<RecurrenceDurationTypes, number> = new Map([
   [RecurrenceDurationTypes.Monthly, Math.floor(dayjs.duration({ months: 1 }).asWeeks())],
   [RecurrenceDurationTypes.Quarterly, Math.floor(dayjs.duration({ months: 3 }).asWeeks())],
]);

export const monthsToRecurrenceTypeMap: Map<RecurrenceDurationTypes, number> = new Map([
   [RecurrenceDurationTypes.Quarterly, Math.floor(dayjs.duration({ months: 3 }).asMonths())],
]);
