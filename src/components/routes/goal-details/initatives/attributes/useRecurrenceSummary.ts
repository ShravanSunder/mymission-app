import { useIntl } from 'react-intl';
import { createException, ExceptionTypes } from '~~/models/Exception';
import { DaysOfWeek } from './scheduleDefinitions';
import { RecurrenceAggregationPeriods, RecurrenceDurationTypes, DaysOfWeekToString } from './recurrenceDefinitions';

/**
 * Hook to get a display string that represents the recurrence
 * TODO: move to seperate file, make a test
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
         // naive logic to know its all days of the week
         if (target.length === 7) {
            return intl.formatMessage({
               defaultMessage: 'Every day',
            });
         } else {
            const selectedWeekdays = DaysOfWeekToString(target);
            return selectedWeekdays;
         }
      } else if (durationType === RecurrenceDurationTypes.PerNumberOfDays && typeof target == 'number') {
         return intl.formatMessage(
            {
               defaultMessage: 'Every {target} days',
            },
            { target }
         );
      }
   } else if (aggregationPeriod === RecurrenceAggregationPeriods.PerWeek) {
      if (typeof target === 'number' && (durationType === RecurrenceDurationTypes.Monthly || durationType === RecurrenceDurationTypes.Quarterly)) {
         return intl.formatMessage(
            {
               defaultMessage: '{target} {target, plural, one {week} other {weeks}}/{durationType}',
            },
            { target, durationType }
         );
      } else if (durationType === RecurrenceDurationTypes.PerNumberOfWeeks && typeof target == 'number') {
         return intl.formatMessage(
            {
               defaultMessage: 'Every {target} weeks',
            },
            { target }
         );
      }
   } else if (aggregationPeriod === RecurrenceAggregationPeriods.PerMonth) {
      if (typeof target === 'number' && durationType === RecurrenceDurationTypes.Quarterly) {
         return intl.formatMessage(
            {
               defaultMessage: '{target} {target, plural, one {month} other {months}}/{durationType}',
            },
            { target, durationType }
         );
      }
   }

   throw createException(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid, { recurrence: durationType });
};
