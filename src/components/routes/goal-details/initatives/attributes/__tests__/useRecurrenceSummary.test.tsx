import { RecurrenceAggregationPeriods, RecurrenceDurationTypes } from '../recurrenceDefinitions';
import { useRecurrenceSummary } from '../useRecurrenceSummary';
import { renderHook } from '@testing-library/react-hooks';
import { HookWrapper, IntlWrapper } from '~~/test-utils/testing-library/wrappers';
import { render } from '@testing-library/react';
import { HabitDetails } from '../../habits/HabitDetails';
import { DaysOfWeek } from '../scheduleDefinitions';

describe('routes=>goal-details=>initatives [useReccurenceSummary]', () => {
   describe('Where aggregationPeriod is a day', () => {
      const aggregationPeriod = RecurrenceAggregationPeriods.PerDay;
      it('When duration is weekly, then you get day per week', () => {
         const target = 10;
         const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Weekly, target), { wrapper: HookWrapper });

         expect(result.current).toBe(`${target} days/week`);
      });

      it('When duration is weekly and target is singular, then you get day per week', () => {
         const target = 1;

         const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Weekly, target), { wrapper: HookWrapper });

         expect(result.current).toBe(`${target} day/week`);
      });
      it('When duration is monthly, then you get day per month', () => {
         const target = 10;
         const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Monthly, target), { wrapper: HookWrapper });

         expect(result.current).toBe(`${target} days/month`);
      });

      it('When duration is monthly and target is singular, then you get day per month', () => {
         const target = 1;

         const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Monthly, target), { wrapper: HookWrapper });

         expect(result.current).toBe(`${target} day/month`);
      });

      it('When duration is specific days of the week, then you get the days of the week', () => {
         const target: DaysOfWeek[] = [DaysOfWeek.Friday, DaysOfWeek.Monday];

         const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.SpecificDaysOfWeek, target), {
            wrapper: HookWrapper,
         });

         expect(result.current).toBe(`Mon Fri`);
      });

      it('When duration is specificDaysOfWeek with all the days, then you get every day', () => {
         const target: DaysOfWeek[] = [
            DaysOfWeek.Friday,
            DaysOfWeek.Monday,
            DaysOfWeek.Tuesday,
            DaysOfWeek.Wednesday,
            DaysOfWeek.Thursday,
            DaysOfWeek.Friday,
            DaysOfWeek.Saturday,
            DaysOfWeek.Sunday,
         ];

         const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.SpecificDaysOfWeek, target), {
            wrapper: HookWrapper,
         });

         expect(result.current).toBe(`Every day`);
      });

      it('When duration is specificDaysOfWeek with 6 of 7 days , then you get a range', () => {
         // target1: missing sunday
         const target1: DaysOfWeek[] = [
            DaysOfWeek.Monday,
            DaysOfWeek.Tuesday,
            DaysOfWeek.Wednesday,
            DaysOfWeek.Thursday,
            DaysOfWeek.Friday,
            DaysOfWeek.Saturday,
         ];

         const { result: result1 } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.SpecificDaysOfWeek, target1), {
            wrapper: HookWrapper,
         });

         expect(result1.current).toBe(`Mon - Sat`);

         // target2: missing monday
         const target2: DaysOfWeek[] = [
            DaysOfWeek.Tuesday,
            DaysOfWeek.Wednesday,
            DaysOfWeek.Thursday,
            DaysOfWeek.Friday,
            DaysOfWeek.Saturday,
            DaysOfWeek.Sunday,
         ];

         const { result: result2 } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.SpecificDaysOfWeek, target2), {
            wrapper: HookWrapper,
         });

         expect(result2.current).toBe(`Tue - Sun`);

         // target3: missing saturday
         const target3: DaysOfWeek[] = [DaysOfWeek.Monday, DaysOfWeek.Tuesday, DaysOfWeek.Wednesday, DaysOfWeek.Thursday, DaysOfWeek.Friday, DaysOfWeek.Sunday];

         const { result: result3 } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.SpecificDaysOfWeek, target3), {
            wrapper: HookWrapper,
         });

         expect(result3.current).toBe(`Sun - Fri`);

         // target2: missing friday
         const target4: DaysOfWeek[] = [
            DaysOfWeek.Monday,
            DaysOfWeek.Tuesday,
            DaysOfWeek.Wednesday,
            DaysOfWeek.Thursday,
            DaysOfWeek.Saturday,
            DaysOfWeek.Sunday,
         ];

         const { result: result4 } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.SpecificDaysOfWeek, target4), {
            wrapper: HookWrapper,
         });

         expect(result4.current).toBe(`Sat - Thu`);
      });
   });
});
