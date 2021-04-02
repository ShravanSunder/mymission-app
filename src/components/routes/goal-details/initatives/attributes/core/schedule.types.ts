/**
 * Match the Dayjs standard
 */

import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
dayjs.extend(weekday);

export enum DaysOfWeek {
   Sunday = 0,
   Monday = 1,
   Tuesday = 2,
   Wednesday = 3,
   Thursday = 4,
   Friday = 5,
   Saturday = 6,
}

export const DaysOfWeekList = Object.values(DaysOfWeek).filter((f) => typeof f !== 'string') as DaysOfWeek[];

/**
 * Map of @DaysOfWeek to Day of week name (3 characters)
 */
export const daysOfWeekToShortCodeMap: Map<DaysOfWeek, string> = new Map(DaysOfWeekList.map((d) => [d, dayjs().day(d).format('ddd')]) as any);

export enum QuartersOfYear {
   Q1 = 1,
   Q2 = 2,
   Q3 = 3,
   Q4 = 4,
}
