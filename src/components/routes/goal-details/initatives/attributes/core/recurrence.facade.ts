import { IntlShape } from 'react-intl';
import { availableNumericTargetRange } from '~~/components/routes/goal-details/initatives/attributes/core/recurrence.funcs';
import { getAsEnum, getAsEnumArray, getAsNumber, getAsNumberArray } from '~~/helpers/conversion';
import { isEnum } from '~~/helpers/enums';
import { Exception, ExceptionTypes } from '~~/models/Exception';
import { IDisplayText } from '~~/models/IDisplayText';
import { RecurrenceAggregationPeriods, RecurrenceDurationType, TRecurrenceTarget } from './recurrence.types';
import { daysOfWeekToString, isEveryDayOfWeek, isEveryMonthOfYear, isEveryWeekOfMonth, monthsOfYearToString, weeksOfMonthToString } from './schedule.funcs';
import { DaysOfWeek, MonthsOfYear, monthsOfYearList } from './schedule.types';

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

export const formatDurationForUnits = (intl: IntlShape, duration: RecurrenceDurationType, count = 1): string => {
   switch (duration) {
      case RecurrenceDurationType.PerNumberOfDays:
      case RecurrenceDurationType.SpecificDaysOfWeek:
         return intl.formatMessage({ defaultMessage: '{count, plural, one {Day} other {Days}}' }, { count });
      case RecurrenceDurationType.Weekly:
      case RecurrenceDurationType.SpecificWeeksOfMonth:
         return intl.formatMessage({ defaultMessage: '{count, plural, one {Week} other {Weeks}}' }, { count });
      case RecurrenceDurationType.Monthly:
      case RecurrenceDurationType.SpecificMonthsOfYear:
         return intl.formatMessage({ defaultMessage: '{count, plural, one {Month} other {Months}}' }, { count });
      case RecurrenceDurationType.Quarterly:
         return intl.formatMessage({ defaultMessage: '{count, plural, one {Quarter} other {Quarters}}' }, { count });
   }
};

/**
 * function to get a display string that represents the recurrence
 * @param period
 * @param duration
 * @param target
 */

export const formatRecurrenceGoalForDisplay = (
   intl: IntlShape,
   period: RecurrenceAggregationPeriods,
   duration: RecurrenceDurationType,
   target: TRecurrenceTarget
): IDisplayText => {
   const numericTargetRange = availableNumericTargetRange(period, duration);

   if (duration === RecurrenceDurationType.SpecificWeeksOfMonth && Array.isArray(target)) {
      const tempTarget = getAsNumberArray(target) ?? [];
      if (isEveryWeekOfMonth(tempTarget)) {
         return {
            primary: intl.formatMessage({
               defaultMessage: 'Every week of the month',
            }),
         };
      } else {
         const selectedWeeks = weeksOfMonthToString(tempTarget);
         return {
            primary: intl.formatMessage(
               {
                  defaultMessage: 'Weeks {selectedWeeks} of the month',
               },
               { selectedWeeks }
            ),
            description: '',
         };
      }
   } else if (typeof target === 'number' && numericTargetRange[1] != 0 && numericTargetRange[0] != 0) {
      if (duration === RecurrenceDurationType.PerNumberOfDays) {
         if (target > 1) {
            return {
               primary: intl.formatMessage(
                  {
                     defaultMessage: 'Every {target} days',
                  },
                  { target }
               ),
            };
         }
      } else if (target < numericTargetRange[1]) {
         const periodUnits = formatAggregationPeriodForUnits(intl, period, target).toLowerCase();
         const durationUnits = formatDurationForUnits(intl, duration, 1).toLowerCase();
         return {
            primary: intl.formatMessage(
               {
                  defaultMessage: '{target} {periodUnits}/{durationUnits}',
               },
               { target, durationUnits, periodUnits }
            ),
         };
      } else if (target === numericTargetRange[1]) {
         const periodUnits = formatAggregationPeriodForUnits(intl, period, 1).toLowerCase();
         const durationUnits = formatDurationForUnits(intl, duration, 1).toLowerCase();
         return {
            primary: intl.formatMessage(
               {
                  defaultMessage: 'Every {periodUnits} of the {durationUnits}',
               },
               { periodUnits, durationUnits }
            ),
         };
      }
   } else if (period === RecurrenceAggregationPeriods.PerDay) {
      if (duration === RecurrenceDurationType.SpecificDaysOfWeek && Array.isArray(target)) {
         const tempTarget = getAsEnumArray<DaysOfWeek>(DaysOfWeek, target) ?? [];
         if (isEveryDayOfWeek(tempTarget)) {
            return {
               primary: intl.formatMessage({
                  defaultMessage: 'Every day',
               }),
            };
         } else {
            const selectedWeekdays = daysOfWeekToString(tempTarget);
            return {
               primary: intl.formatMessage(
                  {
                     defaultMessage: '{selectedWeekdays}',
                  },
                  { selectedWeekdays }
               ),
            };
         }
      }
   } else if (duration === RecurrenceDurationType.SpecificMonthsOfYear && Array.isArray(target)) {
      const tempTarget = getAsEnumArray<MonthsOfYear>(MonthsOfYear, target) ?? [];
      if (isEveryMonthOfYear(tempTarget)) {
         return {
            primary: intl.formatMessage({
               defaultMessage: 'Every month',
            }),
         };
      } else {
         const selectedMonths = monthsOfYearToString(tempTarget);
         return {
            primary: intl.formatMessage(
               {
                  defaultMessage: '{selectedMonths}',
               },
               { selectedMonths }
            ),
         };
      }
   }

   throw new Exception(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid, { durationType: duration, aggregationPeriod: period, target });
};

export const formatAggregationPeriodForDisplay = (intl: IntlShape, period: RecurrenceAggregationPeriods): IDisplayText => {
   if (period === RecurrenceAggregationPeriods.PerDay) {
      return {
         primary: intl.formatMessage({ defaultMessage: 'Daily Habits' }),
         description: intl.formatMessage({ defaultMessage: 'Count your habits over a period of a day' }),
         alternate: intl.formatMessage({ defaultMessage: 'Day' }),
      };
   } else if (period === RecurrenceAggregationPeriods.PerWeek) {
      return {
         primary: intl.formatMessage({ defaultMessage: 'Weekly Habits' }),
         description: intl.formatMessage({ defaultMessage: 'Count your habits over a period of a week' }),
         alternate: intl.formatMessage({ defaultMessage: 'Week' }),
      };
   } else if (period === RecurrenceAggregationPeriods.PerMonth) {
      return {
         primary: intl.formatMessage({ defaultMessage: 'Monthly Habits' }),
         description: intl.formatMessage({ defaultMessage: 'Count your habits over of a month' }),
         alternate: intl.formatMessage({ defaultMessage: 'Month' }),
      };
   } else {
      throw new Exception(ExceptionTypes.Schedule_RecurrenceAggregationPeriods, { period });
   }
};

export const formatDurationForDisplay = (
   intl: IntlShape,
   period: RecurrenceAggregationPeriods,
   duration: RecurrenceDurationType,
   target: TRecurrenceTarget
): IDisplayText => {
   if (duration === RecurrenceDurationType.PerNumberOfDays) {
      const tempTarget: number = getAsNumber(target) ?? 2;
      const durationText = formatDurationForUnits(intl, duration, 2).toLowerCase();
      return {
         primary: intl.formatMessage({ defaultMessage: 'Alternate {durationText}' }, { durationText, tempTarget }),
         alternate: intl.formatMessage({ defaultMessage: 'Every {tempTarget} {durationText}' }, { durationText, tempTarget }),
      };
   } else if (duration === RecurrenceDurationType.SpecificDaysOfWeek) {
      return {
         primary: intl.formatMessage({ defaultMessage: 'Specific days of the week' }),
      };
   } else if (duration === RecurrenceDurationType.SpecificWeeksOfMonth) {
      return {
         primary: intl.formatMessage({ defaultMessage: 'Specific weeks of the month' }),
      };
   } else if (duration === RecurrenceDurationType.SpecificMonthsOfYear) {
      return {
         primary: intl.formatMessage({ defaultMessage: 'Specific months of the year' }),
      };
   } else if (
      period === RecurrenceAggregationPeriods.PerDay ||
      period === RecurrenceAggregationPeriods.PerWeek ||
      period === RecurrenceAggregationPeriods.PerMonth
   ) {
      const periodText = formatAggregationPeriodForUnits(intl, period, 2).toLowerCase();
      const durationText = formatDurationForUnits(intl, duration, 1).toLowerCase();

      return {
         primary: intl.formatMessage({ defaultMessage: 'Number of {periodText} per {durationText}' }, { periodText, durationText }),
      };
   }

   throw new Exception(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid, { period, duration });
};
