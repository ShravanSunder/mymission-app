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

export const DaysOfWeekList = Object.values(DaysOfWeek).filter((f) => typeof f !== 'string') as DaysOfWeek[];

export enum QuartersOfYear {
   Q1 = 1,
   Q2 = 2,
   Q3 = 3,
   Q4 = 4,
}
