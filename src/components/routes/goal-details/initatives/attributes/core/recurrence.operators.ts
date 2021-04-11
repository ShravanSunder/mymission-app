import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RecurrenceRepetitionAggregation, RecurrenceRepetitionType, TRecurrenceGoalTargetType } from './recurrence.types';
import { DaysOfWeek, daysOfWeekList, MonthsOfYear, monthsOfYearList } from './schedule.types';

import { TTransform } from '~~/components/common/core/hooks/useSubjectTransform';
import { availableNumericTargetRange } from '~~/components/routes/goal-details/initatives/attributes/core/recurrence.funcs';
import { getAsNumberArray } from '~~/helpers/conversion';

export const transformDuration = (repetition: RecurrenceRepetitionType, aggregation: RecurrenceRepetitionAggregation): RecurrenceRepetitionType => {
   if (aggregation === RecurrenceRepetitionAggregation.PerDay) {
      switch (repetition) {
         case RecurrenceRepetitionType.SpecificWeeksOfMonth:
         case RecurrenceRepetitionType.SpecificMonthsOfYear:
            return RecurrenceRepetitionType.SpecificDaysOfWeek;
      }
   } else if (aggregation === RecurrenceRepetitionAggregation.PerWeek) {
      switch (repetition) {
         case RecurrenceRepetitionType.SpecificDaysOfWeek:
         case RecurrenceRepetitionType.SpecificMonthsOfYear:
            return RecurrenceRepetitionType.SpecificWeeksOfMonth;
         case RecurrenceRepetitionType.PerNumberOfDays:
         case RecurrenceRepetitionType.Weekly:
            return RecurrenceRepetitionType.Monthly;
      }
   } else if (aggregation === RecurrenceRepetitionAggregation.PerMonth) {
      switch (repetition) {
         case RecurrenceRepetitionType.SpecificDaysOfWeek:
         case RecurrenceRepetitionType.SpecificWeeksOfMonth:
            return RecurrenceRepetitionType.SpecificMonthsOfYear;
         case RecurrenceRepetitionType.PerNumberOfDays:
         case RecurrenceRepetitionType.Weekly:
         case RecurrenceRepetitionType.Monthly:
            return RecurrenceRepetitionType.Quarterly;
      }
   }
   return repetition;
};

export const transformTarget = (
   target: TRecurrenceGoalTargetType,
   repetition: RecurrenceRepetitionType,
   aggregation: RecurrenceRepetitionAggregation
): TRecurrenceGoalTargetType => {
   console.log('updateTarget');

   let result: number | undefined;

   if (
      typeof target !== 'number' &&
      (repetition === RecurrenceRepetitionType.Weekly || repetition === RecurrenceRepetitionType.Monthly || repetition === RecurrenceRepetitionType.Quarterly)
   ) {
      result = 1;
   } else if (repetition === RecurrenceRepetitionType.PerNumberOfDays) {
      const availableArray: number[] = availableNumericTargetRange(aggregation, repetition);
      if (target > availableArray[1]) {
         result = availableArray[1];
      } else if (target < availableArray[0]) {
         result = availableArray[0];
      }
   } else if (aggregation === RecurrenceRepetitionAggregation.PerDay) {
      if (repetition === RecurrenceRepetitionType.SpecificDaysOfWeek) {
         if (typeof target === 'number') {
            return [DaysOfWeek.Monday];
         } else if (Array.isArray(target)) {
            return (target as DaysOfWeek[]).filter((t) => daysOfWeekList.includes(t));
         }
      } else if (
         repetition === RecurrenceRepetitionType.Weekly ||
         repetition === RecurrenceRepetitionType.Monthly ||
         repetition === RecurrenceRepetitionType.Quarterly
      ) {
         const available: number = availableNumericTargetRange(aggregation, repetition)[1];
         if (target > available) {
            result = available;
         }
      }
   } else if (aggregation === RecurrenceRepetitionAggregation.PerWeek) {
      if (repetition === RecurrenceRepetitionType.SpecificWeeksOfMonth) {
         const availableArray: number[] = availableNumericTargetRange(aggregation, repetition);
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
      if (repetition === RecurrenceRepetitionType.Monthly || repetition === RecurrenceRepetitionType.Quarterly) {
         const available: number = availableNumericTargetRange(aggregation, repetition)[1];
         if (target > available) {
            result = available;
         }
      }
   } else if (aggregation === RecurrenceRepetitionAggregation.PerMonth) {
      if (repetition === RecurrenceRepetitionType.SpecificMonthsOfYear) {
         if (typeof target === 'number') {
            return [MonthsOfYear.January];
         } else if (Array.isArray(target)) {
            return (target as MonthsOfYear[]).filter((t) => monthsOfYearList.includes(t));
         }
      }
      if (repetition === RecurrenceRepetitionType.Quarterly) {
         const available: number = availableNumericTargetRange(aggregation, repetition)[1];
         if (target > available) {
            result = available;
         }
      }
   }

   if (typeof target === 'number' && target <= 0 && repetition !== RecurrenceRepetitionType.SpecificDaysOfWeek) {
      result = 1;
   }

   return result ?? target;
};

export const repetitionOperator: TTransform<RecurrenceRepetitionType> = (repetition$, period$) =>
   combineLatest([repetition$, period$]).pipe(map(([repetition, period]) => transformDuration(repetition, period)));

export const targetOperator: TTransform<TRecurrenceGoalTargetType> = (
   target$: Observable<TRecurrenceGoalTargetType>,
   repetition$: Observable<RecurrenceRepetitionType>,
   aggregation$: Observable<RecurrenceRepetitionAggregation>
) => combineLatest([target$, repetition$, aggregation$]).pipe(map(([target, repetition, aggregation]) => transformTarget(target, repetition, aggregation)));

export const targetGoalOperator: TTransform<TRecurrenceGoalTargetType> = (
   target$: Observable<TRecurrenceGoalTargetType>,
   repetition$: Observable<RecurrenceRepetitionType>,
   aggregation$: Observable<RecurrenceRepetitionAggregation>
) => combineLatest([target$, repetition$, aggregation$]).pipe(map(([target, duration, period]) => transformTarget(target, duration, period)));
