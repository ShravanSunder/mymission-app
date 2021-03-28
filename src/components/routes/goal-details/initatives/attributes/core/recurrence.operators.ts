import { RecurrenceAggregationPeriods, RecurrenceDurationTypes } from './recurrence.types';
import { DaysOfWeek, DaysOfWeekList } from './schedule.types';

export const updateDuration = (durationType: RecurrenceDurationTypes, aggregationPeriod: RecurrenceAggregationPeriods): RecurrenceDurationTypes => {
   console.log('updateDuration');
   if (aggregationPeriod === RecurrenceAggregationPeriods.PerDay) {
      switch (durationType) {
         case RecurrenceDurationTypes.PerNumberOfWeeks:
         case RecurrenceDurationTypes.PerNumberOfMonths:
            return RecurrenceDurationTypes.PerNumberOfDays;
      }
   } else if (aggregationPeriod === RecurrenceAggregationPeriods.PerWeek) {
      switch (durationType) {
         case RecurrenceDurationTypes.SpecificDaysOfWeek:
         case RecurrenceDurationTypes.PerNumberOfDays:
         case RecurrenceDurationTypes.PerNumberOfMonths:
         case RecurrenceDurationTypes.Weekly:
            return RecurrenceDurationTypes.PerNumberOfWeeks;
      }
   } else if (aggregationPeriod === RecurrenceAggregationPeriods.PerMonth) {
      switch (durationType) {
         case RecurrenceDurationTypes.SpecificDaysOfWeek:
         case RecurrenceDurationTypes.PerNumberOfDays:
         case RecurrenceDurationTypes.PerNumberOfMonths:
         case RecurrenceDurationTypes.Weekly:
         case RecurrenceDurationTypes.Monthly:
            return RecurrenceDurationTypes.PerNumberOfMonths;
      }
   }
   return durationType;
};

export const updateTarget = (target: DaysOfWeek[] | number, durationType: RecurrenceDurationTypes): DaysOfWeek[] | number => {
   console.log('updateTarget');
   if (durationType === RecurrenceDurationTypes.SpecificDaysOfWeek) {
      if (typeof target === 'number' || !Array.isArray(target)) {
         return [DaysOfWeek.Monday];
      } else if (Array.isArray(target)) {
         return target.filter((t) => DaysOfWeekList.includes(t));
      }
   } else if (durationType === RecurrenceDurationTypes.Weekly) {
      if (typeof target !== 'number' || (target > 7 && target < 1)) {
         return 0;
      }
   } else if (durationType === RecurrenceDurationTypes.Monthly) {
      if (typeof target !== 'number' || (target > 31 && target < 1)) {
         return 0;
      }
   } else if (durationType === RecurrenceDurationTypes.Quarterly) {
      if (typeof target !== 'number' || (target > 90 && target < 1)) {
         return 0;
      }
   } else if (durationType === RecurrenceDurationTypes.PerNumberOfDays) {
      if (target > 365) {
         target = 365;
      }
   } else if (durationType === RecurrenceDurationTypes.PerNumberOfWeeks) {
      if (target > 52) {
         target = 52;
      }
   } else if (durationType === RecurrenceDurationTypes.PerNumberOfMonths) {
      if (target > 12) {
         target = 12;
      }
   }
   return target;
};
