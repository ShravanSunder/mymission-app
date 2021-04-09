import {
   daysToRecurrenceTypeMap,
   monthsToRecurrenceTypeMap,
   RecurrenceRepetitionAggregation,
   RecurrenceRepetitionType,
   weeksToRecurrenceTypeMap,
} from './recurrence.types';

/**
 * this function returns valid durations for a period
 * @param period
 * @returns
 */
export const availableDurations = (period: RecurrenceRepetitionAggregation): RecurrenceRepetitionType[] => {
   if (period === RecurrenceRepetitionAggregation.PerDay) {
      return [
         RecurrenceRepetitionType.SpecificDaysOfWeek,
         RecurrenceRepetitionType.Weekly,
         RecurrenceRepetitionType.Monthly,
         RecurrenceRepetitionType.Quarterly,
         RecurrenceRepetitionType.PerNumberOfDays,
      ];
   } else if (period === RecurrenceRepetitionAggregation.PerWeek) {
      return [RecurrenceRepetitionType.Monthly, RecurrenceRepetitionType.Quarterly, RecurrenceRepetitionType.SpecificWeeksOfMonth];
   } else if (period === RecurrenceRepetitionAggregation.PerMonth) {
      return [RecurrenceRepetitionType.Quarterly, RecurrenceRepetitionType.SpecificMonthsOfYear];
   }

   return [];
};

/**
 * this funciton returns valid targets for period/duration that involve a range of numbers
 * @param period
 * @param duration
 * @returns
 */
export const availableNumericTargetRange = (period: RecurrenceRepetitionAggregation, duration: RecurrenceRepetitionType): [number, number] => {
   let result2: number | undefined = undefined;
   let result1 = 1;
   if (period === RecurrenceRepetitionAggregation.PerDay) {
      result2 = daysToRecurrenceTypeMap.get(duration);
   } else if (period === RecurrenceRepetitionAggregation.PerWeek) {
      result2 = weeksToRecurrenceTypeMap.get(duration);
   } else if (period === RecurrenceRepetitionAggregation.PerMonth) {
      result2 = monthsToRecurrenceTypeMap.get(duration);
   }

   if (duration === RecurrenceRepetitionType.SpecificWeeksOfMonth) {
      result1 = 1;
      result2 = 4;
   }

   if (duration === RecurrenceRepetitionType.PerNumberOfDays) {
      result1 = 2;
      result2 = 15;
   }

   if (result2 != undefined) return [result1, result2];

   return [0, 0];
};
