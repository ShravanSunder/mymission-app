import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';

import { getKeysOfEnum, getValuesOfEnum } from '~~/helpers/enums';
dayjs.extend(weekday);

/**
 * Match the Dayjs standard
 */
export enum DaysOfWeek {
   Sunday = 0,
   Monday = 1,
   Tuesday = 2,
   Wednesday = 3,
   Thursday = 4,
   Friday = 5,
   Saturday = 6,
}

/**
 * Match the Dayjs standard
 */
export enum MonthsOfYear {
   January = 0,
   Febuary = 1,
   March = 2,
   April = 3,
   May = 4,
   June = 5,
   July = 6,
   August = 7,
   September = 8,
   October = 9,
   Novermber = 10,
   December = 11,
}

export const daysOfWeekList: DaysOfWeek[] = getValuesOfEnum<DaysOfWeek>(DaysOfWeek);
export const monthsOfYearList: MonthsOfYear[] = getValuesOfEnum<MonthsOfYear>(MonthsOfYear);
export const weeksOfMonthList: number[] = [1, 2, 3, 4];

/**
 * Map of @DaysOfWeek to Day of week name (3 characters)
 */
export const daysOfWeekToShortCodeMap: Map<DaysOfWeek, string> = new Map(
   daysOfWeekList.map((d) => [
      d,
      dayjs()
         .day((d as unknown) as number)
         .format('ddd'),
   ]) as any
);

/**
 * Map of @DaysOfWeek to Day of week name (3 characters)
 */
export const monthsOfYearToShortCodeMap: Map<DaysOfWeek, string> = new Map(
   monthsOfYearList.map((d) => [
      d,
      dayjs()
         .month((d as unknown) as number)
         .format('MMM'),
   ]) as any
);

/**
 * Map of @weeksOfMonthList
 */
export const weeksOfMonthMap: Map<number, string> = new Map(weeksOfMonthList.map((d) => [d, d.toString()]) as any);

export enum QuartersOfYear {
   Q1 = 1,
   Q2 = 2,
   Q3 = 3,
   Q4 = 4,
}
