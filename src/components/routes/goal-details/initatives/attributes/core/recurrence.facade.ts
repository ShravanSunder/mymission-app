import { IntlShape } from 'react-intl';

import { RecurrenceRepetitionAggregation, RecurrenceRepetitionType, TRecurrenceGoalTargetType } from './recurrence.types';
import { daysOfWeekToString, isEveryDayOfWeek, isEveryMonthOfYear, isEveryWeekOfMonth, monthsOfYearToString, weeksOfMonthToString } from './schedule.funcs';
import { DaysOfWeek, MonthsOfYear } from './schedule.types';

import { availableNumericTargetRange } from '~~/components/routes/goal-details/initatives/attributes/core/recurrence.funcs';
import { getAsEnumArray, getAsNumber, getAsNumberArray } from '~~/helpers/conversion';
import { Exception, ExceptionTypes } from '~~/models/Exception';
import { IDisplayText } from '~~/models/IDisplayText';

export const formatRepetitionAggregationForUnits = (intl: IntlShape, period: RecurrenceRepetitionAggregation, count = 1): string => {
   switch (period) {
      case RecurrenceRepetitionAggregation.PerDay:
         return intl.formatMessage({ defaultMessage: '{count, plural, one {Day} other {Days}}' }, { count });
      case RecurrenceRepetitionAggregation.PerWeek:
         return intl.formatMessage({ defaultMessage: '{count, plural, one {Week} other {Weeks}}' }, { count });
      case RecurrenceRepetitionAggregation.PerMonth:
         return intl.formatMessage({ defaultMessage: '{count, plural, one {Month} other {Months}}' }, { count });
   }
};

export const formatRepetitionForUnits = (intl: IntlShape, duration: RecurrenceRepetitionType, count = 1): string => {
   switch (duration) {
      case RecurrenceRepetitionType.PerNumberOfDays:
      case RecurrenceRepetitionType.SpecificDaysOfWeek:
         return intl.formatMessage({ defaultMessage: '{count, plural, one {Day} other {Days}}' }, { count });
      case RecurrenceRepetitionType.Weekly:
      case RecurrenceRepetitionType.SpecificWeeksOfMonth:
         return intl.formatMessage({ defaultMessage: '{count, plural, one {Week} other {Weeks}}' }, { count });
      case RecurrenceRepetitionType.Monthly:
      case RecurrenceRepetitionType.SpecificMonthsOfYear:
         return intl.formatMessage({ defaultMessage: '{count, plural, one {Month} other {Months}}' }, { count });
      case RecurrenceRepetitionType.Quarterly:
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
   period: RecurrenceRepetitionAggregation,
   duration: RecurrenceRepetitionType,
   target: TRecurrenceGoalTargetType,
   targetCount: number
): IDisplayText => {
   const numericTargetRange = availableNumericTargetRange(period, duration);

   if (duration === RecurrenceRepetitionType.SpecificWeeksOfMonth && Array.isArray(target)) {
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
      if (duration === RecurrenceRepetitionType.PerNumberOfDays) {
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
         const periodUnits = formatRepetitionAggregationForUnits(intl, period, target).toLowerCase();
         const durationUnits = formatRepetitionForUnits(intl, duration, 1).toLowerCase();
         return {
            primary: intl.formatMessage(
               {
                  defaultMessage: '{target} {periodUnits}/{durationUnits}',
               },
               { target, durationUnits, periodUnits }
            ),
         };
      } else if (target === numericTargetRange[1]) {
         const periodUnits = formatRepetitionAggregationForUnits(intl, period, 1).toLowerCase();
         const durationUnits = formatRepetitionForUnits(intl, duration, 1).toLowerCase();
         return {
            primary: intl.formatMessage(
               {
                  defaultMessage: 'Every {periodUnits} of the {durationUnits}',
               },
               { periodUnits, durationUnits }
            ),
         };
      }
   } else if (period === RecurrenceRepetitionAggregation.PerDay) {
      if (duration === RecurrenceRepetitionType.SpecificDaysOfWeek && Array.isArray(target)) {
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
   } else if (duration === RecurrenceRepetitionType.SpecificMonthsOfYear && Array.isArray(target)) {
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

export const formatRepetitionAggregationForDisplay = (intl: IntlShape, period: RecurrenceRepetitionAggregation): IDisplayText => {
   if (period === RecurrenceRepetitionAggregation.PerDay) {
      return {
         primary: intl.formatMessage({ defaultMessage: 'Daily Habits' }),
         description: intl.formatMessage({ defaultMessage: 'Count your habits over a period of a day' }),
         alternate: intl.formatMessage({ defaultMessage: 'Day' }),
      };
   } else if (period === RecurrenceRepetitionAggregation.PerWeek) {
      return {
         primary: intl.formatMessage({ defaultMessage: 'Weekly Habits' }),
         description: intl.formatMessage({ defaultMessage: 'Count your habits over a period of a week' }),
         alternate: intl.formatMessage({ defaultMessage: 'Week' }),
      };
   } else if (period === RecurrenceRepetitionAggregation.PerMonth) {
      return {
         primary: intl.formatMessage({ defaultMessage: 'Monthly Habits' }),
         description: intl.formatMessage({ defaultMessage: 'Count your habits over of a month' }),
         alternate: intl.formatMessage({ defaultMessage: 'Month' }),
      };
   } else {
      throw new Exception(ExceptionTypes.Schedule_RecurrenceAggregationPeriods, { period });
   }
};

export const formatRepetitionForDisplay = (
   intl: IntlShape,
   period: RecurrenceRepetitionAggregation,
   duration: RecurrenceRepetitionType,
   target: TRecurrenceGoalTargetType
): IDisplayText => {
   if (duration === RecurrenceRepetitionType.PerNumberOfDays) {
      const tempTarget: number = getAsNumber(target) ?? 2;
      const durationText = formatRepetitionForUnits(intl, duration, 2).toLowerCase();
      return {
         primary: intl.formatMessage({ defaultMessage: 'Alternate {durationText}' }, { durationText, tempTarget }),
         alternate: intl.formatMessage({ defaultMessage: 'Every {tempTarget} {durationText}' }, { durationText, tempTarget }),
      };
   } else if (duration === RecurrenceRepetitionType.SpecificDaysOfWeek) {
      return {
         primary: intl.formatMessage({ defaultMessage: 'Specific days of the week' }),
      };
   } else if (duration === RecurrenceRepetitionType.SpecificWeeksOfMonth) {
      return {
         primary: intl.formatMessage({ defaultMessage: 'Specific weeks of the month' }),
      };
   } else if (duration === RecurrenceRepetitionType.SpecificMonthsOfYear) {
      return {
         primary: intl.formatMessage({ defaultMessage: 'Specific months of the year' }),
      };
   } else if (
      period === RecurrenceRepetitionAggregation.PerDay ||
      period === RecurrenceRepetitionAggregation.PerWeek ||
      period === RecurrenceRepetitionAggregation.PerMonth
   ) {
      const periodText = formatRepetitionAggregationForUnits(intl, period, 2).toLowerCase();
      const durationText = formatRepetitionForUnits(intl, duration, 1).toLowerCase();

      return {
         primary: intl.formatMessage({ defaultMessage: 'Number of {periodText} per {durationText}' }, { periodText, durationText }),
      };
   }

   throw new Exception(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid, { period, duration });
};

export const formatGoalTargetCountForDisplay = (
   intl: IntlShape,
   period: RecurrenceRepetitionAggregation,
   duration: RecurrenceRepetitionType,
   target: TRecurrenceGoalTargetType,
   targetCount: number
): IDisplayText => {
   const periodText = formatRepetitionAggregationForUnits(intl, period, 1).toLowerCase();

   return {
      primary: intl.formatMessage(
         { defaultMessage: '{targetCount} {targetCount, plural, one {time} other {times}}/{periodText}' },
         { periodText, targetCount }
      ),
   };

   throw new Exception(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid, { duration, target, targetCount });
};
