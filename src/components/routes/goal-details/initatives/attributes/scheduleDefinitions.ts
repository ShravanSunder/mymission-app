/**
 * Match the Dayjs standard
 */

import { createException, ExceptionTypes } from '~~/models/Exception';

export enum DaysOfWeek {
   Sunday = 0,
   Monday = 1,
   Tuesday = 2,
   Wednesday = 3,
   Thursday = 4,
   Friday = 5,
   Saturday = 6,
}

export enum QuartersOfYear {
   Q1 = 1,
   Q2 = 2,
   Q3 = 3,
   Q4 = 4,
}

export enum CycleDurationTypes {
   PerDay = 'day',
   PerWeek = 'week',
   PerMonth = 'month',
   PerQuarter = 'quarter',
}

export enum RecurrenceTypes {
   SpecificDaysOfWeek,
   TotalPerDay,
   TotalPerWeek,
   TotalPerMonth,
   TotalPerQuarter,
   PerNumberOfDays,
}

export const recurrenceToNumberOfDaysMap: Map<RecurrenceTypes, number> = new Map([
   [RecurrenceTypes.DaysPerWeek, 7],
   [RecurrenceTypes.DaysPerMonth, 31],
   [RecurrenceTypes.DaysPerQuarter, 90],
]);

export const recurrenceToDisplayString = (cycleDuration: CycleDurationTypes, recurrence: RecurrenceTypes, data: number): string => {
   const recurrenceToDisplayMap: Map<RecurrenceTypes, string> = new Map([
      [RecurrenceTypes.PerNumberOfDays, `Every ${data} days`],
      [RecurrenceTypes.TotalPerMonth, `${data} times a ${cycleDuration}`],
      [RecurrenceTypes.totalper, `${data} times a month`],
      [RecurrenceTypes.TotalPerMonth, `${data} times a quarter`],
   ]);

   const result = recurrenceToDisplayMap.get(recurrence);

   if (result) return result;
   else throw createException(ExceptionTypes.Schedule_RecurrenceUseIsInvalid, { recurrence });
};
