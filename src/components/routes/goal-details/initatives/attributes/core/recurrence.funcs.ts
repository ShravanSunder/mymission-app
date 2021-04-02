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

export const availableTargetRange = (period: RecurrenceAggregationPeriods, duration: RecurrenceDurationTypes): number => {
   let result: number | undefined = undefined;
   if (period === RecurrenceAggregationPeriods.PerDay) {
      result = daysToRecurrenceTypeMap.get(duration);
   } else if (period === RecurrenceAggregationPeriods.PerWeek) {
      result = weeksToRecurrenceTypeMap.get(duration);
   } else if (period === RecurrenceAggregationPeriods.PerMonth) {
      result = monthsToRecurrenceTypeMap.get(duration);
   }

   if (duration === RecurrenceDurationTypes.PerNumberOfDays) {
      result = 90;
   } else if (duration === RecurrenceDurationTypes.PerNumberOfWeeks) {
      result = 52;
   } else if (duration === RecurrenceDurationTypes.PerNumberOfMonths) {
      result = 12;
   }

   if (result != undefined) return result;
   throw new Exception(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid, { period, duration });
};
