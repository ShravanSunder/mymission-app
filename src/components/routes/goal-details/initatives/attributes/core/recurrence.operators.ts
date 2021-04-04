import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TTransform } from '~~/components/common/core/hooks/useSubjectTransform';
import { availableNumericTargetRange } from '~~/components/routes/goal-details/initatives/attributes/core/recurrence.funcs';
import { RecurrenceAggregationPeriods, RecurrenceDurationTypes, TRecurrenceTarget } from './recurrence.types';
import { DaysOfWeek, daysOfWeekList, MonthsOfYear, monthsOfYearList } from './schedule.types';

export const transformDuration = (durationType: RecurrenceDurationTypes, aggregationPeriod: RecurrenceAggregationPeriods): RecurrenceDurationTypes => {
   if (aggregationPeriod === RecurrenceAggregationPeriods.PerDay) {
      switch (durationType) {
         case RecurrenceDurationTypes.SpecificWeeksOfMonth:
         case RecurrenceDurationTypes.SpecificMonthsOfYear:
            return RecurrenceDurationTypes.SpecificDaysOfWeek;
      }
   } else if (aggregationPeriod === RecurrenceAggregationPeriods.PerWeek) {
      switch (durationType) {
         case RecurrenceDurationTypes.SpecificDaysOfWeek:
         case RecurrenceDurationTypes.SpecificMonthsOfYear:
            return RecurrenceDurationTypes.SpecificWeeksOfMonth;
         case RecurrenceDurationTypes.PerNumberOfDays:
         case RecurrenceDurationTypes.Weekly:
            return RecurrenceDurationTypes.Monthly;
      }
   } else if (aggregationPeriod === RecurrenceAggregationPeriods.PerMonth) {
      switch (durationType) {
         case RecurrenceDurationTypes.SpecificDaysOfWeek:
         case RecurrenceDurationTypes.SpecificWeeksOfMonth:
            return RecurrenceDurationTypes.SpecificMonthsOfYear;
         case RecurrenceDurationTypes.PerNumberOfDays:
         case RecurrenceDurationTypes.Weekly:
         case RecurrenceDurationTypes.Monthly:
            return RecurrenceDurationTypes.Quarterly;
      }
   }
   return durationType;
};

export const transformTarget = (target: TRecurrenceTarget, duration: RecurrenceDurationTypes, period: RecurrenceAggregationPeriods): TRecurrenceTarget => {
   console.log('updateTarget');

   let result: number | undefined;

   if (
      typeof target !== 'number' &&
      (duration === RecurrenceDurationTypes.Weekly || duration === RecurrenceDurationTypes.Monthly || duration === RecurrenceDurationTypes.Quarterly)
   ) {
      result = 1;
   } else if (duration === RecurrenceDurationTypes.PerNumberOfDays) {
      const availableArray: number[] = availableNumericTargetRange(period, duration);
      if (target > availableArray[1]) {
         result = availableArray[1];
      } else if (target < availableArray[0]) {
         result = availableArray[0];
      }
   } else if (period === RecurrenceAggregationPeriods.PerDay) {
      if (duration === RecurrenceDurationTypes.SpecificDaysOfWeek) {
         if (typeof target === 'number') {
            return [DaysOfWeek.Monday];
         } else if (Array.isArray(target)) {
            return (target as DaysOfWeek[]).filter((t) => daysOfWeekList.includes(t));
         }
      } else if (
         duration === RecurrenceDurationTypes.Weekly ||
         duration === RecurrenceDurationTypes.Monthly ||
         duration === RecurrenceDurationTypes.Quarterly
      ) {
         const available: number = availableNumericTargetRange(period, duration)[1];
         if (target > available) {
            result = available;
         }
      }
   } else if (period === RecurrenceAggregationPeriods.PerWeek) {
      if (duration === RecurrenceDurationTypes.SpecificWeeksOfMonth) {
         const availableArray: number[] = availableNumericTargetRange(period, duration);
         if (target > availableArray[1] || target < availableArray[0]) {
            result = availableArray[1];
         }
      }
      if (duration === RecurrenceDurationTypes.Monthly || duration === RecurrenceDurationTypes.Quarterly) {
         const available: number = availableNumericTargetRange(period, duration)[1];
         if (target > available) {
            result = available;
         }
      }
   } else if (period === RecurrenceAggregationPeriods.PerMonth) {
      if (duration === RecurrenceDurationTypes.SpecificMonthsOfYear) {
         if (typeof target === 'number') {
            return [MonthsOfYear.January];
         } else if (Array.isArray(target)) {
            return (target as MonthsOfYear[]).filter((t) => monthsOfYearList.includes(t));
         }
      }
      if (duration === RecurrenceDurationTypes.Quarterly) {
         const available: number = availableNumericTargetRange(period, duration)[1];
         if (target > available) {
            result = available;
         }
      }
   }

   if (typeof target === 'number' && target <= 0 && duration !== RecurrenceDurationTypes.SpecificDaysOfWeek) {
      result = 1;
   }

   return result ?? target;
};

export const durationOperator: TTransform<RecurrenceDurationTypes> = (duration$, period$) =>
   combineLatest([duration$, period$]).pipe(map(([duration, period]) => transformDuration(duration, period)));

export const targetOperator: TTransform<TRecurrenceTarget> = (target$: Observable<TRecurrenceTarget>, duration$: Observable<any>, period$: Observable<any>) =>
   combineLatest([target$, duration$, period$]).pipe(map(([target, duration, period]) => transformTarget(target, duration, period)));
