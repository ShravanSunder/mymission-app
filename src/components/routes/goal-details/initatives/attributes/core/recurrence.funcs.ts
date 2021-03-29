import { Exception, ExceptionTypes } from '~~/models/Exception';
import { RecurrenceAggregationPeriods, RecurrenceDurationTypes } from './recurrence.types';

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
   } else {
      throw new Exception(ExceptionTypes.Schedule_RecurrenceAggregationPeriods, { period });
   }
};
