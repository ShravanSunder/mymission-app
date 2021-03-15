import { RecurrenceAggregationPeriods, RecurrenceDurationTypes } from '../recurrenceDefinitions';
import { useRecurrenceSummary } from '../useRecurrenceSummary';
import { renderHook } from '@testing-library/react-hooks';
import { HookWrapper, IntlWrapper } from '~~/test-utils/testing-library/wrappers';
import { DaysOfWeek } from '../scheduleDefinitions';
import { Exception, ExceptionTypes } from '~~/models/Exception';

describe('routes > goal-details', () => {
   describe('> initatives [useReccurenceSummary]', () => {
      describe('Where aggregationPeriod is a day', () => {
         const aggregationPeriod = RecurrenceAggregationPeriods.PerDay;

         it('When duration is weekly, then you get day per week', () => {
            const target = 10;
            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Weekly, target), { wrapper: HookWrapper });

            expect(result.current).toBe(`${target} days/week`);
         });

         it('When duration is weekly and target is 1, then you get day per week', () => {
            const target = 1;

            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Weekly, target), { wrapper: HookWrapper });

            expect(result.current).toBe(`${target} day/week`);
         });
         it('When duration is monthly, then you get day per month', () => {
            const target = 10;
            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Monthly, target), { wrapper: HookWrapper });

            expect(result.current).toBe(`${target} days/month`);
         });

         it('When duration is monthly and target is 1, then you get day per month', () => {
            const target = 1;

            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Monthly, target), { wrapper: HookWrapper });

            expect(result.current).toBe(`${target} day/month`);
         });

         it('When duration is quarterly, then you get day per quarter', () => {
            const target = 10;
            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Quarterly, target), { wrapper: HookWrapper });

            expect(result.current).toBe(`${target} days/quarter`);
         });

         it('When duration is quarter and target is 1, then you get day per quarter', () => {
            const target = 1;

            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Quarterly, target), { wrapper: HookWrapper });

            expect(result.current).toBe(`${target} day/quarter`);
         });

         it('When duration is specific days of the week, then you get the days of the week', () => {
            const target: DaysOfWeek[] = [DaysOfWeek.Friday, DaysOfWeek.Monday];

            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.SpecificDaysOfWeek, target), {
               wrapper: HookWrapper,
            });

            expect(result.current).toBe(`Mon Fri`);
         });

         it('When duration is PerNumberOfDays, then you get every x days', () => {
            const target = 10;
            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.PerNumberOfDays, target), {
               wrapper: HookWrapper,
            });

            expect(result.current).toBe(`Every ${target} days`);
         });

         it('When duration is PerNumberOfWeeks, then you get an ⚠ exception', () => {
            const target = 10;
            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.PerNumberOfWeeks, target), {
               wrapper: HookWrapper,
            });

            expect(() => result.current).toThrow(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid);
         });

         it('When duration is specificDaysOfWeek & all the days, then you get every day', () => {
            const target: DaysOfWeek[] = [
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

         it('When duration is specificDaysOfWeek with and missing sunday, then you get a range', () => {
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
         });

         it('When duration is specificDaysOfWeek & missing monday, then you get a range', () => {
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
         });

         it('When duration is specificDaysOfWeek and missing satruday, then you get a range', () => {
            // target3: missing saturday
            const target3: DaysOfWeek[] = [
               DaysOfWeek.Monday,
               DaysOfWeek.Tuesday,
               DaysOfWeek.Wednesday,
               DaysOfWeek.Thursday,
               DaysOfWeek.Friday,
               DaysOfWeek.Sunday,
            ];

            const { result: result3 } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.SpecificDaysOfWeek, target3), {
               wrapper: HookWrapper,
            });

            expect(result3.current).toBe(`Sun - Fri`);
         });

         it('When duration is specificDaysOfWeek and missing friday, then you get a range', () => {
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

      describe('Where aggregationPeriod is a week', () => {
         const aggregationPeriod = RecurrenceAggregationPeriods.PerWeek;

         it('When duration is day, then you get an ⚠ exception', () => {
            const target = 10;
            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Weekly, target), { wrapper: HookWrapper });

            expect(() => result.current).toThrow(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid);
         });

         it('When duration is weekly, then you get an ⚠ exception', () => {
            const target = 1;

            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Weekly, target), { wrapper: HookWrapper });

            expect(() => result.current).toThrow(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid);
         });
         it('When duration is monthly & target <=4, then you get weeks per month', () => {
            const target = 4;
            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Monthly, target), { wrapper: HookWrapper });

            expect(result.current).toBe(`${target} weeks/month`);
         });
         it('When duration is monthly & target is out of bounds, then you get an ⚠ exception', () => {
            const target = 10;
            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Monthly, target), { wrapper: HookWrapper });

            expect(() => result.current).toThrow(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid);
         });

         it('When duration is monthly & target is 1, then you get week per month', () => {
            const target = 1;

            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Monthly, target), { wrapper: HookWrapper });

            expect(result.current).toBe(`${target} week/month`);
         });

         it('When duration is quarterly & target <=13, then you get weeks per quarter', () => {
            const target = 13;
            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Quarterly, target), { wrapper: HookWrapper });

            expect(result.current).toBe(`${target} weeks/quarter`);
         });

         it('When duration is quarterly & target is out of bounds, then you get an ⚠ exception', () => {
            const target = 14;
            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Quarterly, target), { wrapper: HookWrapper });

            expect(() => result.current).toThrow(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid);
         });

         it('When duration is quarterly & target is 1, then you get week per quarter', () => {
            const target = 1;

            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Quarterly, target), { wrapper: HookWrapper });

            expect(result.current).toBe(`${target} week/quarter`);
         });

         it('When duration is PerNumberOfDays, then you get an ⚠ exception', () => {
            const target = 10;
            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.PerNumberOfDays, target), {
               wrapper: HookWrapper,
            });

            expect(() => result.current).toThrow(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid);
         });

         it('When duration is PerNumberOfWeeks, then you get every x weeks', () => {
            const target = 10;
            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.PerNumberOfWeeks, target), {
               wrapper: HookWrapper,
            });

            expect(result.current).toBe(`Every ${target} weeks`);
         });

         it('When duration is PerNumberOfWeeks & target is 1, then you get times a week', () => {
            const target = 1;
            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.PerNumberOfWeeks, target), {
               wrapper: HookWrapper,
            });

            expect(result.current).toBe(`Times a week`);
         });
      });

      describe('Where aggregationPeriod is a month', () => {
         const aggregationPeriod = RecurrenceAggregationPeriods.PerMonth;

         it('When duration is day, then you get an ⚠ exception', () => {
            const target = 10;
            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Weekly, target), { wrapper: HookWrapper });

            expect(() => result.current).toThrow(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid);
         });

         it('When duration is weekly, then you get an ⚠ exception', () => {
            const target = 1;

            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Weekly, target), { wrapper: HookWrapper });

            expect(() => result.current).toThrow(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid);
         });

         it('When duration is monthly, then you get an ⚠ exception', () => {
            const target = 1;

            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Monthly, target), { wrapper: HookWrapper });

            expect(() => result.current).toThrow(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid);
         });

         it('When duration is quarterly & target <=3, then you get months per quarter', () => {
            const target = 3;
            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Quarterly, target), { wrapper: HookWrapper });

            expect(result.current).toBe(`${target} months/quarter`);
         });

         it('When duration is quarterly & target is out of bounds, then you get an ⚠ exception', () => {
            const target = 4;
            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Quarterly, target), { wrapper: HookWrapper });

            expect(() => result.current).toThrow(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid);
         });

         it('When duration is quarterly & target is 1, then you get month per quarter', () => {
            const target = 1;

            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Quarterly, target), { wrapper: HookWrapper });

            expect(result.current).toBe(`${target} month/quarter`);
         });

         it('When duration is PerNumberOfDays, then you get an ⚠ exception', () => {
            const target = 10;
            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.PerNumberOfDays, target), {
               wrapper: HookWrapper,
            });

            expect(() => result.current).toThrow(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid);
         });

         it('When duration is PerNumberOfWeeks, then you get an ⚠ exception', () => {
            const target = 10;
            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.PerNumberOfWeeks, target), {
               wrapper: HookWrapper,
            });

            expect(() => result.current).toThrow(ExceptionTypes.Schedule_RecurrenceConfigurationIsInvalid);
         });

         it('When duration is PerNumberOfMonths, then you get every x months', () => {
            const target = 10;
            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.PerNumberOfMonths, target), {
               wrapper: HookWrapper,
            });

            expect(result.current).toBe(`Every ${target} months`);
         });

         it('When duration is PerNumberOfMonths & target is 1, then you get times a week', () => {
            const target = 1;
            const { result } = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.PerNumberOfMonths, target), {
               wrapper: HookWrapper,
            });

            expect(result.current).toBe(`Times a month`);
         });
      });
   });
});
