import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TTransform } from '~~/components/common/core/hooks/useSubjectTransform';
import { availableNumericTargetRange } from '~~/components/routes/goal-details/initatives/attributes/core/recurrence.funcs';
import { getAsNumberArray } from '~~/helpers/conversion';
import { RecurrenceAggregationPeriods, RecurrenceDurationType, TRecurrenceTarget } from './recurrence.types';
import { DaysOfWeek, daysOfWeekList, MonthsOfYear, monthsOfYearList } from './schedule.types';

export const transformDuration = (durationType: RecurrenceDurationType, aggregationPeriod: RecurrenceAggregationPeriods): RecurrenceDurationType => {
   if (aggregationPeriod === RecurrenceAggregationPeriods.PerDay) {
      switch (durationType) {
         case RecurrenceDurationType.SpecificWeeksOfMonth:
         case RecurrenceDurationType.SpecificMonthsOfYear:
            return RecurrenceDurationType.SpecificDaysOfWeek;
      }
   } else if (aggregationPeriod === RecurrenceAggregationPeriods.PerWeek) {
      switch (durationType) {
         case RecurrenceDurationType.SpecificDaysOfWeek:
         case RecurrenceDurationType.SpecificMonthsOfYear:
            return RecurrenceDurationType.SpecificWeeksOfMonth;
         case RecurrenceDurationType.PerNumberOfDays:
         case RecurrenceDurationType.Weekly:
            return RecurrenceDurationType.Monthly;
      }
   } else if (aggregationPeriod === RecurrenceAggregationPeriods.PerMonth) {
      switch (durationType) {
         case RecurrenceDurationType.SpecificDaysOfWeek:
         case RecurrenceDurationType.SpecificWeeksOfMonth:
            return RecurrenceDurationType.SpecificMonthsOfYear;
         case RecurrenceDurationType.PerNumberOfDays:
         case RecurrenceDurationType.Weekly:
         case RecurrenceDurationType.Monthly:
            return RecurrenceDurationType.Quarterly;
      }
   }
   return durationType;
};

export const transformTarget = (target: TRecurrenceTarget, duration: RecurrenceDurationType, period: RecurrenceAggregationPeriods): TRecurrenceTarget => {
   console.log('updateTarget');

   let result: number | undefined;

   if (
      typeof target !== 'number' &&
      (duration === RecurrenceDurationType.Weekly || duration === RecurrenceDurationType.Monthly || duration === RecurrenceDurationType.Quarterly)
   ) {
      result = 1;
   } else if (duration === RecurrenceDurationType.PerNumberOfDays) {
      const availableArray: number[] = availableNumericTargetRange(period, duration);
      if (target > availableArray[1]) {
         result = availableArray[1];
      } else if (target < availableArray[0]) {
         result = availableArray[0];
      }
   } else if (period === RecurrenceAggregationPeriods.PerDay) {
      if (duration === RecurrenceDurationType.SpecificDaysOfWeek) {
         if (typeof target === 'number') {
            return [DaysOfWeek.Monday];
         } else if (Array.isArray(target)) {
            return (target as DaysOfWeek[]).filter((t) => daysOfWeekList.includes(t));
         }
      } else if (duration === RecurrenceDurationType.Weekly || duration === RecurrenceDurationType.Monthly || duration === RecurrenceDurationType.Quarterly) {
         const available: number = availableNumericTargetRange(period, duration)[1];
         if (target > available) {
            result = available;
         }
      }
   } else if (period === RecurrenceAggregationPeriods.PerWeek) {
      if (duration === RecurrenceDurationType.SpecificWeeksOfMonth) {
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
      if (duration === RecurrenceDurationType.Monthly || duration === RecurrenceDurationType.Quarterly) {
         const available: number = availableNumericTargetRange(period, duration)[1];
         if (target > available) {
            result = available;
         }
      }
   } else if (period === RecurrenceAggregationPeriods.PerMonth) {
      if (duration === RecurrenceDurationType.SpecificMonthsOfYear) {
         if (typeof target === 'number') {
            return [MonthsOfYear.January];
         } else if (Array.isArray(target)) {
            return (target as MonthsOfYear[]).filter((t) => monthsOfYearList.includes(t));
         }
      }
      if (duration === RecurrenceDurationType.Quarterly) {
         const available: number = availableNumericTargetRange(period, duration)[1];
         if (target > available) {
            result = available;
         }
      }
   }

   if (typeof target === 'number' && target <= 0 && duration !== RecurrenceDurationType.SpecificDaysOfWeek) {
      result = 1;
   }

   return result ?? target;
};

export const durationOperator: TTransform<RecurrenceDurationType> = (duration$, period$) =>
   combineLatest([duration$, period$]).pipe(map(([duration, period]) => transformDuration(duration, period)));

export const targetOperator: TTransform<TRecurrenceTarget> = (target$: Observable<TRecurrenceTarget>, duration$: Observable<any>, period$: Observable<any>) =>
   combineLatest([target$, duration$, period$]).pipe(map(([target, duration, period]) => transformTarget(target, duration, period)));
