import { DaysOfWeek } from '~~/components/routes/goal-details/initatives/attributes/core/schedule.types';
import { Exception, ExceptionTypes } from '~~/models/Exception';
import {
   daysToRecurrenceTypeMap,
   monthsToRecurrenceTypeMap,
   RecurrenceAggregationPeriods,
   RecurrenceDurationTypes,
   weeksToRecurrenceTypeMap,
} from './recurrence.types';

/**
 * this function returns valid durations for a period
 * @param period
 * @returns
 */
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
      return [RecurrenceDurationTypes.Monthly, RecurrenceDurationTypes.Quarterly, RecurrenceDurationTypes.SpecificWeeksOfMonth];
   } else if (period === RecurrenceAggregationPeriods.PerMonth) {
      return [RecurrenceDurationTypes.Quarterly, RecurrenceDurationTypes.SpecificMonthsOfYear];
   }

   return [];
};

/**
 * this funciton returns valid targets for period/duration that involve a range of numbers
 * @param period
 * @param duration
 * @returns
 */
export const availableNumericTargetRange = (period: RecurrenceAggregationPeriods, duration: RecurrenceDurationTypes): [number, number] => {
   let result2: number | undefined = undefined;
   let result1 = 1;
   if (period === RecurrenceAggregationPeriods.PerDay) {
      result2 = daysToRecurrenceTypeMap.get(duration);
   } else if (period === RecurrenceAggregationPeriods.PerWeek) {
      result2 = weeksToRecurrenceTypeMap.get(duration);
   } else if (period === RecurrenceAggregationPeriods.PerMonth) {
      result2 = monthsToRecurrenceTypeMap.get(duration);
   }

   if (duration === RecurrenceDurationTypes.SpecificWeeksOfMonth) {
      result1 = 1;
      result2 = 4;
   }

   if (duration === RecurrenceDurationTypes.PerNumberOfDays) {
      result1 = 2;
      result2 = 15;
   }

   if (result2 != undefined) return [result1, result2];

   return [0, 0];
};
