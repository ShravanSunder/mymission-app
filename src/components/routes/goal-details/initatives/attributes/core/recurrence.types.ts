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
export enum RecurrenceRepetitionType {
   /**
    * Allowed Periods: days
    */
   SpecificDaysOfWeek = '0_SpecificDaysOfWeek',
   /**
    * Allowed Periods: week
    */
   SpecificWeeksOfMonth = '1_SpecificWeeksOfMonth',
   /**
    * Allowed Periods: month
    */
   SpecificMonthsOfYear = '2_SpecificMonthsOfYear',
   /**
    * Allowed Periods: day
    */
   Weekly = '3_Weekly',
   /**
    * Allowed Periods: day, week
    */
   Monthly = '4_Monthly',
   /**
    * Allowed Periods: day, week, month
    */
   Quarterly = '5_Quarterly',
   /**
    * Allowed Periods: days
    */
   PerNumberOfDays = '6_PerNumberOfDays',
}

/**
 * Type of goal,
 * - number / repetion
 * - specific days of week
 * - specific months of year
 * - specific numbers of array.  Currenty used by Week# per month
 */
export type TRecurrenceGoalTargetType = number | DaysOfWeek[] | MonthsOfYear[] | number[];

export const RecurrenceDurationList: RecurrenceRepetitionType[] = getValuesOfEnum<RecurrenceRepetitionType>(RecurrenceRepetitionType);

export const daysToRecurrenceTypeMap: Map<RecurrenceRepetitionType, number> = new Map([
   [RecurrenceRepetitionType.Weekly, 7],
   [RecurrenceRepetitionType.Monthly, Math.floor(dayjs.duration({ months: 1 }).asDays())],
   [RecurrenceRepetitionType.Quarterly, Math.floor(dayjs.duration({ months: 3 }).asDays())],
]);

export const weeksToRecurrenceTypeMap: Map<RecurrenceRepetitionType, number> = new Map([
   [RecurrenceRepetitionType.Monthly, Math.floor(dayjs.duration({ months: 1 }).asWeeks())],
   [RecurrenceRepetitionType.Quarterly, Math.floor(dayjs.duration({ months: 3 }).asWeeks())],
]);

export const monthsToRecurrenceTypeMap: Map<RecurrenceRepetitionType, number> = new Map([
   [RecurrenceRepetitionType.Quarterly, Math.floor(dayjs.duration({ months: 3 }).asMonths())],
]);
