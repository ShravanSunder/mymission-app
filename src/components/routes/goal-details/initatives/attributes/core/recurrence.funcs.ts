import { DaysOfWeek } from '~~/components/routes/goal-details/initatives/attributes/core/schedule.types';
import { Exception, ExceptionTypes } from '~~/models/Exception';
import {
   daysToRecurrenceTypeMap,
   monthsToRecurrenceTypeMap,
   RecurrenceAggregationPeriods,
   RecurrenceDurationTypes,
   weeksToRecurrenceTypeMap,
} from './recurrence.types';

export const availableDurations = (period: RecurrenceAggregationPeriods): RecurrenceDurationTypes[] => {
   if (period === RecurrenceAggregationPeriods.PerDay) {
      return [
         RecurrenceDurationTypes.SpecificDaysOfWeek,
         RecurrenceDurationTypes.Weekly,
         RecurrenceDurationTypes.Monthly,
         RecurrenceDurationTypes.Quarterly,
         RecurrenceDurationTypes.PerNumberOfDays,
      ];
   } else if (period === RecurrenceAggregationPeriods.PerWeek) {
      return [RecurrenceDurationTypes.Monthly, RecurrenceDurationTypes.Quarterly, RecurrenceDurationTypes.PerNumberOfWeeks];
   } else if (period === RecurrenceAggregationPeriods.PerMonth) {
      return [RecurrenceDurationTypes.Quarterly, RecurrenceDurationTypes.PerNumberOfMonths];
   }

   throw new Exception(ExceptionTypes.Schedule_RecurrenceAggregationPeriods, { period });
};

export const availableTargetRange = (period: RecurrenceAggregationPeriods, duration: RecurrenceDurationTypes): [number, number] => {
   let result2: number | undefined = undefined;
   let result1 = 1;
   if (period === RecurrenceAggregationPeriods.PerDay) {
      result2 = daysToRecurrenceTypeMap.get(duration);
   } else if (period === RecurrenceAggregationPeriods.PerWeek) {
      result2 = weeksToRecurrenceTypeMap.get(duration);
   } else if (period === RecurrenceAggregationPeriods.PerMonth) {
      result2 = monthsToRecurrenceTypeMap.get(duration);
   }

   if (duration === RecurrenceDurationTypes.PerNumberOfDays) {
      result1 = 2;
      result2 = 90;
   } else if (duration === RecurrenceDurationTypes.PerNumberOfWeeks) {
      result1 = 2;
      result2 = 52;
   } else if (duration === RecurrenceDurationTypes.PerNumberOfMonths) {
      result1 = 2;
      result2 = 12;
   }

   if (result2 != undefined) return [result1, result2];
   throw new Exception(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid, { period, duration });
};
