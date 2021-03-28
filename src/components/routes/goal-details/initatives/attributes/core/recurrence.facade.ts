import { IntlShape } from 'react-intl';
import { Exception, ExceptionTypes } from '~~/models/Exception';
import { RecurrenceAggregationPeriods, RecurrenceDurationTypes } from './recurrence.types';
import { daysOfWeekToString, isEveryDayOfWeek } from './schedule.funcs';
import { DaysOfWeek } from './schedule.types';

/**
 * function to get a display string that represents the recurrence
 * @param aggregationPeriod
 * @param durationType
 * @param target
 */

export const formatRecurrenceSummary = (
   intl: IntlShape,
   aggregationPeriod: RecurrenceAggregationPeriods,
   durationType: RecurrenceDurationTypes,
   target: number | DaysOfWeek[]
): string => {
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

export const formatAggregationText = (
   intl: IntlShape,
   period: RecurrenceAggregationPeriods
): {
   /**
    * primary description
    */
   primary: string;
   /**
    * secondary description
    */
   secondary: string;
} => {
   if (period === RecurrenceAggregationPeriods.PerDay) {
      return {
         primary: intl.formatMessage({ defaultMessage: 'Daily' }),
         secondary: intl.formatMessage({ defaultMessage: 'Count your habits daily, x times a day' }),
      };
   } else if (period === RecurrenceAggregationPeriods.PerWeek) {
      return {
         primary: intl.formatMessage({ defaultMessage: 'Weekly' }),
         secondary: intl.formatMessage({ defaultMessage: 'Count your habits weekly, x times a week' }),
      };
   } else if (period === RecurrenceAggregationPeriods.PerMonth) {
      return {
         primary: intl.formatMessage({ defaultMessage: 'Monthly' }),
         secondary: intl.formatMessage({ defaultMessage: 'Count your habits monthly, x times a month' }),
      };
   } else {
      throw new Exception(ExceptionTypes.Schedule_RecurrenceAggregationPeriods);
   }
};
