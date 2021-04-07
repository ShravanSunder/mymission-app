import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RecurrenceAggregationPeriods, RecurrenceRepetitionType, TRecurrenceGoalTargetType } from './recurrence.types';
import { DaysOfWeek, daysOfWeekList, MonthsOfYear, monthsOfYearList } from './schedule.types';

import { TTransform } from '~~/components/common/core/hooks/useSubjectTransform';
import { availableNumericTargetRange } from '~~/components/routes/goal-details/initatives/attributes/core/recurrence.funcs';
import { getAsNumberArray } from '~~/helpers/conversion';

export const transformDuration = (durationType: RecurrenceRepetitionType, aggregationPeriod: RecurrenceAggregationPeriods): RecurrenceRepetitionType => {
   if (aggregationPeriod === RecurrenceAggregationPeriods.PerDay) {
      switch (durationType) {
         case RecurrenceRepetitionType.SpecificWeeksOfMonth:
         case RecurrenceRepetitionType.SpecificMonthsOfYear:
            return RecurrenceRepetitionType.SpecificDaysOfWeek;
      }
   } else if (aggregationPeriod === RecurrenceAggregationPeriods.PerWeek) {
      switch (durationType) {
         case RecurrenceRepetitionType.SpecificDaysOfWeek:
         case RecurrenceRepetitionType.SpecificMonthsOfYear:
            return RecurrenceRepetitionType.SpecificWeeksOfMonth;
         case RecurrenceRepetitionType.PerNumberOfDays:
         case RecurrenceRepetitionType.Weekly:
            return RecurrenceRepetitionType.Monthly;
      }
   } else if (aggregationPeriod === RecurrenceAggregationPeriods.PerMonth) {
      switch (durationType) {
         case RecurrenceRepetitionType.SpecificDaysOfWeek:
         case RecurrenceRepetitionType.SpecificWeeksOfMonth:
            return RecurrenceRepetitionType.SpecificMonthsOfYear;
         case RecurrenceRepetitionType.PerNumberOfDays:
         case RecurrenceRepetitionType.Weekly:
         case RecurrenceRepetitionType.Monthly:
            return RecurrenceRepetitionType.Quarterly;
      }
   }
   return durationType;
};

export const transformTarget = (
   target: TRecurrenceGoalTargetType,
   duration: RecurrenceRepetitionType,
   period: RecurrenceAggregationPeriods
): TRecurrenceGoalTargetType => {
   console.log('updateTarget');

   let result: number | undefined;

   if (
      typeof target !== 'number' &&
      (duration === RecurrenceRepetitionType.Weekly || duration === RecurrenceRepetitionType.Monthly || duration === RecurrenceRepetitionType.Quarterly)
   ) {
      result = 1;
   } else if (duration === RecurrenceRepetitionType.PerNumberOfDays) {
      const availableArray: number[] = availableNumericTargetRange(period, duration);
      if (target > availableArray[1]) {
         result = availableArray[1];
      } else if (target < availableArray[0]) {
         result = availableArray[0];
      }
   } else if (period === RecurrenceAggregationPeriods.PerDay) {
      if (duration === RecurrenceRepetitionType.SpecificDaysOfWeek) {
         if (typeof target === 'number') {
            return [DaysOfWeek.Monday];
         } else if (Array.isArray(target)) {
            return (target as DaysOfWeek[]).filter((t) => daysOfWeekList.includes(t));
         }
      } else if (
         duration === RecurrenceRepetitionType.Weekly ||
         duration === RecurrenceRepetitionType.Monthly ||
         duration === RecurrenceRepetitionType.Quarterly
      ) {
         const available: number = availableNumericTargetRange(period, duration)[1];
         if (target > available) {
            result = available;
         }
      }
   } else if (period === RecurrenceAggregationPeriods.PerWeek) {
      if (duration === RecurrenceRepetitionType.SpecificWeeksOfMonth) {
         const availableArray: number[] = availableNumericTargetRange(period, duration);
         if (typeof target === 'number') {
            return [availableArray[1]];
         } else {
            const tempTarget = getAsNumberArray(target);
            if (tempTarget == undefined || target.some((t) => t < availableArray[0] && t < availableArray[1])) {
               return [availableArray[1]];
            } else {
               return target;
            }
         }
      }
      if (duration === RecurrenceRepetitionType.Monthly || duration === RecurrenceRepetitionType.Quarterly) {
         const available: number = availableNumericTargetRange(period, duration)[1];
         if (target > available) {
            result = available;
         }
      }
   } else if (period === RecurrenceAggregationPeriods.PerMonth) {
      if (duration === RecurrenceRepetitionType.SpecificMonthsOfYear) {
         if (typeof target === 'number') {
            return [MonthsOfYear.January];
         } else if (Array.isArray(target)) {
            return (target as MonthsOfYear[]).filter((t) => monthsOfYearList.includes(t));
         }
      }
      if (duration === RecurrenceRepetitionType.Quarterly) {
         const available: number = availableNumericTargetRange(period, duration)[1];
         if (target > available) {
            result = available;
         }
      }
   }

   if (typeof target === 'number' && target <= 0 && duration !== RecurrenceRepetitionType.SpecificDaysOfWeek) {
      result = 1;
   }

   return result ?? target;
};

export const durationOperator: TTransform<RecurrenceRepetitionType> = (duration$, period$) =>
   combineLatest([duration$, period$]).pipe(map(([duration, period]) => transformDuration(duration, period)));

export const targetOperator: TTransform<TRecurrenceGoalTargetType> = (
   target$: Observable<TRecurrenceGoalTargetType>,
   duration$: Observable<any>,
   period$: Observable<any>
) => combineLatest([target$, duration$, period$]).pipe(map(([target, duration, period]) => transformTarget(target, duration, period)));
