import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TOperator } from '~~/components/common/core/hooks/useSubjectTransform';
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
   durationType: RecurrenceDurationTypes,
   aggregationPeriod: RecurrenceAggregationPeriods
): DaysOfWeek[] | number => {
   console.log('updateTarget');

   if (
      typeof target !== 'number' &&
      (durationType === RecurrenceDurationTypes.Weekly ||
         durationType === RecurrenceDurationTypes.Monthly ||
         durationType === RecurrenceDurationTypes.Quarterly)
   ) {
      return 1;
   } else if (durationType === RecurrenceDurationTypes.PerNumberOfDays) {
      if (target > 365) {
         target = 365;
      }
   } else if (durationType === RecurrenceDurationTypes.PerNumberOfWeeks) {
      if (target > 52) {
         target = 52;
      }
   } else if (durationType === RecurrenceDurationTypes.PerNumberOfMonths) {
      if (target > 12) {
         target = 12;
      }
   } else if (aggregationPeriod === RecurrenceAggregationPeriods.PerDay) {
      if (durationType === RecurrenceDurationTypes.SpecificDaysOfWeek) {
         if (typeof target === 'number' || !Array.isArray(target)) {
            return [DaysOfWeek.Monday];
         } else if (Array.isArray(target)) {
            return target.filter((t) => DaysOfWeekList.includes(t));
         }
      } else if (durationType === RecurrenceDurationTypes.Weekly) {
         if (target > 7) {
            return 7;
         }
      } else if (durationType === RecurrenceDurationTypes.Monthly) {
         if (target > 31) {
            return 31;
         }
      } else if (durationType === RecurrenceDurationTypes.Quarterly) {
         if (target > 90) {
            return 90;
         }
      }
   } else if (aggregationPeriod === RecurrenceAggregationPeriods.PerWeek) {
      if (durationType === RecurrenceDurationTypes.Monthly) {
         if (target > 4) {
            return 4;
         }
      } else if (durationType === RecurrenceDurationTypes.Quarterly) {
         if (target > 13) {
            return 13;
         }
      }
   } else if (aggregationPeriod === RecurrenceAggregationPeriods.PerMonth) {
      if (durationType === RecurrenceDurationTypes.Quarterly) {
         if (target > 3) {
            return 3;
         }
      }
   }

   if (typeof target === 'number' && target <= 0 && durationType !== RecurrenceDurationTypes.SpecificDaysOfWeek) {
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
