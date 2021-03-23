import { useIntl } from 'react-intl';
import { Exception, ExceptionTypes } from '~~/models/Exception';
import { DaysOfWeek } from './scheduleDefinitions';
import { RecurrenceAggregationPeriods, RecurrenceDurationTypes, daysOfWeekToString, isEveryDayOfWeek, daysToRecurrenceTypeMap } from './recurrenceDefinitions';

/**
 * Hook to get a display string that represents the recurrence
 * @param aggregationPeriod
 * @param durationType
 * @param target
 */

export const useRecurrenceSummary = (
   aggregationPeriod: RecurrenceAggregationPeriods,
   durationType: RecurrenceDurationTypes,
   target: number | DaysOfWeek[]
): string => {
   const intl = useIntl();

   if (aggregationPeriod === RecurrenceAggregationPeriods.PerDay) {
      if (
         typeof target === 'number' &&
         (durationType === RecurrenceDurationTypes.Weekly ||
            durationType === RecurrenceDurationTypes.Monthly ||
            durationType === RecurrenceDurationTypes.Quarterly)
      ) {
         return intl.formatMessage(
            {
               defaultMessage: '{target} {target, plural, one {day} other {days}}/{durationType}',
            },
            { target, durationType }
         );
      } else if (durationType === RecurrenceDurationTypes.SpecificDaysOfWeek && Array.isArray(target)) {
         if (isEveryDayOfWeek(target)) {
            return intl.formatMessage({
               defaultMessage: 'Every day',
            });
         } else {
            const selectedWeekdays = daysOfWeekToString(target);
            return selectedWeekdays;
         }
      } else if (durationType === RecurrenceDurationTypes.PerNumberOfDays && typeof target == 'number') {
         if (target > 1) {
            return intl.formatMessage(
               {
                  defaultMessage: 'Every {target} days',
               },
               { target }
            );
         }
      }
   } else if (aggregationPeriod === RecurrenceAggregationPeriods.PerWeek) {
      if (typeof target === 'number' && durationType === RecurrenceDurationTypes.Monthly && target <= 4) {
         return intl.formatMessage(
            {
               defaultMessage: '{target} {target, plural, one {week} other {weeks}}/{durationType}',
            },
            { target, durationType }
         );
      } else if (typeof target === 'number' && durationType === RecurrenceDurationTypes.Quarterly && target <= 13) {
         return intl.formatMessage(
            {
               defaultMessage: '{target} {target, plural, one {week} other {weeks}}/{durationType}',
            },
            { target, durationType }
         );
      } else if (durationType === RecurrenceDurationTypes.PerNumberOfWeeks && typeof target == 'number') {
         if (target > 1) {
            return intl.formatMessage(
               {
                  defaultMessage: 'Every {target} weeks',
               },
               { target }
            );
         } else {
            return intl.formatMessage(
               {
                  defaultMessage: 'Times a week',
               },
               { target, durationType }
            );
         }
      }
   } else if (aggregationPeriod === RecurrenceAggregationPeriods.PerMonth) {
      if (typeof target === 'number' && durationType === RecurrenceDurationTypes.Quarterly && target <= 3) {
         return intl.formatMessage(
            {
               defaultMessage: '{target} {target, plural, one {month} other {months}}/{durationType}',
            },
            { target, durationType }
         );
      } else if (durationType === RecurrenceDurationTypes.PerNumberOfMonths && typeof target == 'number') {
         if (target > 1) {
            return intl.formatMessage(
               {
                  defaultMessage: 'Every {target} months',
               },
               { target }
            );
         } else {
            return intl.formatMessage(
               {
                  defaultMessage: 'Times a month',
               },
               { target, durationType }
            );
         }
      }
   }

   throw new Exception(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid, { durationType, aggregationPeriod, target });
};
