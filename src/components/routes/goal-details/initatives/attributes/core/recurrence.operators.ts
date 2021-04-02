import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TTransform } from '~~/components/common/core/hooks/useSubjectTransform';
import { availableTargetRange } from '~~/components/routes/goal-details/initatives/attributes/core/recurrence.funcs';
import { RecurrenceAggregationPeriods, RecurrenceDurationTypes } from './recurrence.types';
import { DaysOfWeek, DaysOfWeekList } from './schedule.types';

export const transformDuration = (durationType: RecurrenceDurationTypes, aggregationPeriod: RecurrenceAggregationPeriods): RecurrenceDurationTypes => {
   console.log('updateDuration');
   if (aggregationPeriod === RecurrenceAggregationPeriods.PerDay) {
      switch (durationType) {
         case RecurrenceDurationTypes.PerNumberOfWeeks:
         case RecurrenceDurationTypes.PerNumberOfMonths:
            return RecurrenceDurationTypes.PerNumberOfDays;
      }
   } else if (aggregationPeriod === RecurrenceAggregationPeriods.PerWeek) {
      switch (durationType) {
         case RecurrenceDurationTypes.SpecificDaysOfWeek:
         case RecurrenceDurationTypes.PerNumberOfDays:
         case RecurrenceDurationTypes.PerNumberOfMonths:
         case RecurrenceDurationTypes.Weekly:
            return RecurrenceDurationTypes.PerNumberOfWeeks;
      }
   } else if (aggregationPeriod === RecurrenceAggregationPeriods.PerMonth) {
      switch (durationType) {
         case RecurrenceDurationTypes.SpecificDaysOfWeek:
         case RecurrenceDurationTypes.PerNumberOfDays:
         case RecurrenceDurationTypes.PerNumberOfMonths:
         case RecurrenceDurationTypes.Weekly:
         case RecurrenceDurationTypes.Monthly:
            return RecurrenceDurationTypes.PerNumberOfMonths;
      }
   }
   return durationType;
};

export const transformTarget = (
   target: DaysOfWeek[] | number,
   duration: RecurrenceDurationTypes,
   period: RecurrenceAggregationPeriods
): DaysOfWeek[] | number => {
   console.log('updateTarget');

   let result: number | undefined;

   if (
      typeof target !== 'number' &&
      (duration === RecurrenceDurationTypes.Weekly || duration === RecurrenceDurationTypes.Monthly || duration === RecurrenceDurationTypes.Quarterly)
   ) {
      result = 1;
   } else if (
      duration === RecurrenceDurationTypes.PerNumberOfDays ||
      duration === RecurrenceDurationTypes.PerNumberOfWeeks ||
      duration === RecurrenceDurationTypes.PerNumberOfMonths
   ) {
      const available: number = availableTargetRange(period, duration)[1];
      if (target > available) {
         result = available;
      }
   } else if (period === RecurrenceAggregationPeriods.PerDay) {
      if (duration === RecurrenceDurationTypes.SpecificDaysOfWeek) {
         if (typeof target === 'number' || !Array.isArray(target)) {
            return [DaysOfWeek.Monday];
         } else if (Array.isArray(target)) {
            return target.filter((t) => DaysOfWeekList.includes(t));
         }
      } else if (
         duration === RecurrenceDurationTypes.Weekly ||
         duration === RecurrenceDurationTypes.Monthly ||
         duration === RecurrenceDurationTypes.Quarterly
      ) {
         const available: number = availableTargetRange(period, duration)[1];
         if (target > available) {
            result = available;
         }
      }
   } else if (period === RecurrenceAggregationPeriods.PerWeek) {
      if (duration === RecurrenceDurationTypes.Monthly || duration === RecurrenceDurationTypes.Quarterly) {
         const available: number = availableTargetRange(period, duration)[1];
         if (target > available) {
            result = available;
         }
      }
   } else if (period === RecurrenceAggregationPeriods.PerMonth) {
      if (duration === RecurrenceDurationTypes.Quarterly) {
         const available: number = availableTargetRange(period, duration)[1];
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

export const targetOperator: TTransform<number | DaysOfWeek[]> = (
   target$: Observable<number | DaysOfWeek[]>,
   duration$: Observable<any>,
   period$: Observable<any>
) => combineLatest([target$, duration$, period$]).pipe(map(([target, duration, period]) => transformTarget(target, duration, period)));
