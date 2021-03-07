/**
 * Match the Dayjs standard
 */

import { map } from 'rxjs/operators';
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

export enum RecurrenceTypes {
   'DaysPerWeek',
   'SpecificDaysOfWeek',
   'DaysPerMonth',
   'PerCustomNumberOfDays',
   'DaysPerQuarter',
}

export const recurrenceToNumberOfDaysMap: Map<RecurrenceTypes, number> = new Map([
   [RecurrenceTypes.DaysPerWeek, 7],
   [RecurrenceTypes.DaysPerMonth, 31],
   [RecurrenceTypes.DaysPerQuarter, 90],
]);

export const recurrenceToDisplayString = (recurrence: RecurrenceTypes, data: number): string => {
   const recurrenceToDisplayMap: Map<RecurrenceTypes, string> = new Map([
      [RecurrenceTypes.DaysPerWeek, `${data} days/week`],
      [RecurrenceTypes.DaysPerMonth, `${data} days/month`],
      [RecurrenceTypes.DaysPerQuarter, `${data} days/quarter`],
   ]);

   const result = recurrenceToDisplayMap.get(recurrence);

   if (result) return result;
   else throw createException(ExceptionTypes.Schedule_RecurrenceUseIsInvalid, { recurrence });
};
