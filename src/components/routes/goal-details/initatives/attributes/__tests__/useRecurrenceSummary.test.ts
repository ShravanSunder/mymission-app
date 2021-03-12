import { RecurrenceAggregationPeriods, RecurrenceDurationTypes } from '../recurrenceDefinitions';
import { useRecurrenceSummary } from '../useRecurrenceSummary';
import { renderHook } from '@testing-library/react-hooks';
import { HookWrapper } from '~~/test-utils/testing-library/wrappers';

describe('routes=>goal-details=>initatives [useReccurenceSummary]', () => {
   describe('Where aggregationPeriod is a day', () => {
      const aggregationPeriod = RecurrenceAggregationPeriods.PerDay;
      it('When duration is weekly then you get days per week', () => {
         const target = 10;
         const result = renderHook(() => useRecurrenceSummary(aggregationPeriod, RecurrenceDurationTypes.Weekly, target), { wrapper: HookWrapper });

         expect(result).toBe(`${target} days/week`);
      });
   });
});
