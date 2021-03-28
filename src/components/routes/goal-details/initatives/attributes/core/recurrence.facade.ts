import { IntlShape } from 'react-intl';
import { Exception, ExceptionTypes } from '~~/models/Exception';
import { IUiText } from '../../../../../../models/IUiText';
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
): IUiText => {
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

export const formatAggregationText = (intl: IntlShape, period: RecurrenceAggregationPeriods): IUiText => {
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

export const formatGoalText = (
   intl: IntlShape,
   period: RecurrenceAggregationPeriods,
   duration: RecurrenceDurationTypes,
   target: number | DaysOfWeek[]
): IUiText => {
   const periodText = intl.formatMessage({ defaultMessage: '{period, select, day {Days} week {Weeks} month {Months} }' }, { period });

   if (duration === RecurrenceDurationTypes.Weekly || duration === RecurrenceDurationTypes.Monthly || duration === RecurrenceDurationTypes.Quarterly) {
      return {
         primary: intl.formatMessage({ defaultMessage: '{periodText} per {duration}' }, { periodText, duration }),
         secondary: intl.formatMessage(
            { defaultMessage: 'How many {periodText} a {duration} is your goal?' },
            { periodText: periodText.toLowerCase(), duration }
         ),
      };
   } else if (
      typeof target === 'number' &&
      (duration === RecurrenceDurationTypes.PerNumberOfDays ||
         duration === RecurrenceDurationTypes.PerNumberOfMonths ||
         duration === RecurrenceDurationTypes.PerNumberOfWeeks)
   ) {
      return {
         primary: intl.formatMessage({ defaultMessage: 'Every {target} other {duration}' }, { periodText, duration, target }),
         secondary: intl.formatMessage({ defaultMessage: 'How often is your goal?' }, { duration }),
      };
   } else if (Array.isArray(target) && duration === RecurrenceDurationTypes.SpecificDaysOfWeek) {
      return {
         primary: intl.formatMessage({ defaultMessage: 'Specific days of the week?' }),
         secondary: intl.formatMessage({ defaultMessage: 'Which days of the week is your goal?' }, { duration }),
      };
   } else {
      throw new Exception(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid, { period, duration, target });
   }
};
