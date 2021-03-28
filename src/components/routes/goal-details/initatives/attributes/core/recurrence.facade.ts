import { IntlShape } from 'react-intl';
import { Exception, ExceptionTypes } from '~~/models/Exception';
import { IDisplayText } from '~~/models/IDisplayText';
import { RecurrenceAggregationPeriods, RecurrenceDurationTypes } from './recurrence.types';
import { daysOfWeekToString, isEveryDayOfWeek } from './schedule.funcs';
import { DaysOfWeek } from './schedule.types';

/**
 * function to get a display string that represents the recurrence
 * @param aggregationPeriod
 * @param durationType
 * @param target
 */

export const formatRecurrenceSummaryForDisplay = (
   intl: IntlShape,
   aggregationPeriod: RecurrenceAggregationPeriods,
   durationType: RecurrenceDurationTypes,
   target: number | DaysOfWeek[]
): IDisplayText => {
   if (aggregationPeriod === RecurrenceAggregationPeriods.PerDay) {
      if (
         typeof target === 'number' &&
         (durationType === RecurrenceDurationTypes.Weekly ||
            durationType === RecurrenceDurationTypes.Monthly ||
            durationType === RecurrenceDurationTypes.Quarterly)
      ) {
         return {
            primary: intl.formatMessage(
               {
                  defaultMessage: '{target} {target, plural, one {day} other {days}}/{durationType}',
               },
               { target, durationType }
            ),
            secondary: '',
         };
      } else if (durationType === RecurrenceDurationTypes.SpecificDaysOfWeek && Array.isArray(target)) {
         if (isEveryDayOfWeek(target)) {
            return {
               primary: intl.formatMessage({
                  defaultMessage: 'Every day',
               }),
               secondary: '',
            };
         } else {
            const selectedWeekdays = daysOfWeekToString(target);
            return {
               primary: selectedWeekdays,
               secondary: '',
            };
         }
      } else if (durationType === RecurrenceDurationTypes.PerNumberOfDays && typeof target == 'number') {
         if (target > 1) {
            return {
               primary: intl.formatMessage(
                  {
                     defaultMessage: 'Every {target} days',
                  },
                  { target }
               ),
               secondary: '',
            };
         }
      }
   } else if (aggregationPeriod === RecurrenceAggregationPeriods.PerWeek) {
      if (typeof target === 'number' && durationType === RecurrenceDurationTypes.Monthly && target <= 4) {
         return {
            primary: intl.formatMessage(
               {
                  defaultMessage: '{target} {target, plural, one {week} other {weeks}}/{durationType}',
               },
               { target, durationType }
            ),
            secondary: '',
         };
      } else if (typeof target === 'number' && durationType === RecurrenceDurationTypes.Quarterly && target <= 13) {
         return {
            primary: intl.formatMessage(
               {
                  defaultMessage: '{target} {target, plural, one {week} other {weeks}}/{durationType}',
               },
               { target, durationType }
            ),
            secondary: '',
         };
      } else if (durationType === RecurrenceDurationTypes.PerNumberOfWeeks && typeof target == 'number') {
         if (target > 1) {
            return {
               primary: intl.formatMessage(
                  {
                     defaultMessage: 'Every {target} weeks',
                  },
                  { target }
               ),
               secondary: '',
            };
         } else {
            return {
               primary: intl.formatMessage(
                  {
                     defaultMessage: 'Times a week',
                  },
                  { target, durationType }
               ),
               secondary: '',
            };
         }
      }
   } else if (aggregationPeriod === RecurrenceAggregationPeriods.PerMonth) {
      if (typeof target === 'number' && durationType === RecurrenceDurationTypes.Quarterly && target <= 3) {
         return {
            primary: intl.formatMessage(
               {
                  defaultMessage: '{target} {target, plural, one {month} other {months}}/{durationType}',
               },
               { target, durationType }
            ),
            secondary: '',
         };
      } else if (durationType === RecurrenceDurationTypes.PerNumberOfMonths && typeof target == 'number') {
         if (target > 1) {
            return {
               primary: intl.formatMessage(
                  {
                     defaultMessage: 'Every {target} months',
                  },
                  { target }
               ),
               secondary: '',
            };
         } else {
            return {
               primary: intl.formatMessage(
                  {
                     defaultMessage: 'Times a month',
                  },
                  { target, durationType }
               ),
               secondary: '',
            };
         }
      }
   }

   throw new Exception(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid, { durationType, aggregationPeriod, target });
};

export const formatAggregationPeriodForDisplay = (intl: IntlShape, period: RecurrenceAggregationPeriods): IDisplayText => {
   if (period === RecurrenceAggregationPeriods.PerDay) {
      return {
         primary: intl.formatMessage({ defaultMessage: 'Daily' }),
         secondary: intl.formatMessage({ defaultMessage: 'Count your habits over a day, x/day' }),
      };
   } else if (period === RecurrenceAggregationPeriods.PerWeek) {
      return {
         primary: intl.formatMessage({ defaultMessage: 'Weekly' }),
         secondary: intl.formatMessage({ defaultMessage: 'Count your habits over a week, x/week' }),
      };
   } else if (period === RecurrenceAggregationPeriods.PerMonth) {
      return {
         primary: intl.formatMessage({ defaultMessage: 'Monthly' }),
         secondary: intl.formatMessage({ defaultMessage: 'Count your habits over a month, x/month' }),
      };
   } else {
      throw new Exception(ExceptionTypes.Schedule_RecurrenceAggregationPeriods, { period });
   }
};

export const formatAggregationPeriodForUnits = (intl: IntlShape, period: RecurrenceAggregationPeriods, count = 1): string => {
   switch (period) {
      case RecurrenceAggregationPeriods.PerDay:
         return intl.formatMessage({ defaultMessage: '{count, plural, one {Day} other {Days}}' }, { count });
      case RecurrenceAggregationPeriods.PerWeek:
         return intl.formatMessage({ defaultMessage: '{count, plural, one {Week} other {Weeks}}' }, { count });
      case RecurrenceAggregationPeriods.PerMonth:
         return intl.formatMessage({ defaultMessage: '{count, plural, one {Month} other {Months}}' }, { count });
   }
};

export const formatDurationForUnits = (intl: IntlShape, period: RecurrenceDurationTypes, count = 1): string => {
   switch (period) {
      case RecurrenceDurationTypes.Weekly:
      case RecurrenceDurationTypes.PerNumberOfWeeks:
      case RecurrenceDurationTypes.SpecificDaysOfWeek:
         return intl.formatMessage({ defaultMessage: '{count, plural, one {Week} other {Weeks}}' }, { count });
      case RecurrenceDurationTypes.Monthly:
      case RecurrenceDurationTypes.PerNumberOfMonths:
         return intl.formatMessage({ defaultMessage: '{count, plural, one {Month} other {Months}}' }, { count });
      case RecurrenceDurationTypes.PerNumberOfDays:
         return intl.formatMessage({ defaultMessage: '{count, plural, one {Day} other {Days}}' }, { count });
      case RecurrenceDurationTypes.Quarterly:
         return intl.formatMessage({ defaultMessage: '{count, plural, one {Quarter} other {Quarters}}' }, { count });
   }
};

export const formatGoalForDisplay = (intl: IntlShape, period: RecurrenceAggregationPeriods, duration: RecurrenceDurationTypes): IDisplayText => {
   const periodText = formatAggregationPeriodForUnits(intl, period);
   const durationText = formatDurationForUnits(intl, duration).toLowerCase();

   if (duration === RecurrenceDurationTypes.Weekly || duration === RecurrenceDurationTypes.Monthly || duration === RecurrenceDurationTypes.Quarterly) {
      return {
         primary: intl.formatMessage({ defaultMessage: '{periodText} per {durationText}' }, { periodText, durationText }),
         secondary: intl.formatMessage(
            { defaultMessage: 'How many {periodText} a {durationText} is your goal?' },
            { periodText: periodText.toLowerCase(), durationText }
         ),
      };
   } else if (
      duration === RecurrenceDurationTypes.PerNumberOfDays ||
      duration === RecurrenceDurationTypes.PerNumberOfMonths ||
      duration === RecurrenceDurationTypes.PerNumberOfWeeks
   ) {
      const tempTarget = 2;
      return {
         primary: intl.formatMessage({ defaultMessage: 'Every {tempTarget} other {durationText}' }, { durationText, tempTarget }),
         secondary: intl.formatMessage({ defaultMessage: 'How often is your goal?' }),
      };
   } else if (duration === RecurrenceDurationTypes.SpecificDaysOfWeek) {
      return {
         primary: intl.formatMessage({ defaultMessage: 'Specific days of the week?' }),
         secondary: intl.formatMessage({ defaultMessage: 'Which days of the week is your goal?' }),
      };
   } else {
      throw new Exception(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid, { period, duration });
   }
};
