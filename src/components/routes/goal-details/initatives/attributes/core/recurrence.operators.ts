import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TOperator } from '~~/components/common/core/hooks/useSubjectTransform';
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

   if (
      typeof target !== 'number' &&
      (duration === RecurrenceDurationTypes.Weekly || duration === RecurrenceDurationTypes.Monthly || duration === RecurrenceDurationTypes.Quarterly)
   ) {
      return 1;
   } else if (
      duration === RecurrenceDurationTypes.PerNumberOfDays ||
      duration === RecurrenceDurationTypes.PerNumberOfWeeks ||
      duration === RecurrenceDurationTypes.PerNumberOfMonths
   ) {
      const available = availableTargetRange(period, duration);
      if (target > available) {
         target = available;
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
         const available = availableTargetRange(period, duration);
         if (target > available) {
            target = available;
         }
      }
   } else if (period === RecurrenceAggregationPeriods.PerWeek) {
      if (duration === RecurrenceDurationTypes.Monthly || duration === RecurrenceDurationTypes.Quarterly) {
         const available = availableTargetRange(period, duration);
         if (target > available) {
            target = available;
         }
      }
   } else if (period === RecurrenceAggregationPeriods.PerMonth) {
      if (duration === RecurrenceDurationTypes.Quarterly) {
         const available = availableTargetRange(period, duration);
         if (target > available) {
            target = available;
         }
      }
   }

   if (typeof target === 'number' && target <= 0 && duration !== RecurrenceDurationTypes.SpecificDaysOfWeek) {
      target = 1;
   }

   return target;
};

export const durationOperator: TOperator<RecurrenceDurationTypes> = (duration$, period$) =>
   combineLatest([duration$, period$]).pipe(map(([duration, period]) => transformDuration(duration, period)));

export const targetOperator: TOperator<number | DaysOfWeek[]> = (
   target$: Observable<number | DaysOfWeek[]>,
   duration$: Observable<any>,
   period$: Observable<any>
) => combineLatest([target$, duration$, period$]).pipe(map(([target, duration, period]) => transformTarget(target, duration, period)));
