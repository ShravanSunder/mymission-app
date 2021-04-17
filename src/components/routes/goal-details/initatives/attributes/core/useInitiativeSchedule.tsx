import { useRecoilState } from 'recoil';

import { initativeRecurrenceAtom } from '~~/components/routes/goal-details/initatives/attributes/core/initativeSchedule.atoms';
import { IInitativeRecurrence } from '~~/components/routes/goal-details/initatives/attributes/core/initativeSchedule.types';
import {
   formatRecurrenceGoalForDisplay,
   formatTargetGoalForDisplay,
   formatRepetitionAggregationForDisplay,
} from '~~/components/routes/goal-details/initatives/attributes/core/recurrence.facade';
import { createState, TAtomState } from '~~/models/TRecoilState';

export const useInitiativeSchedule = (): TAtomState<IInitativeRecurrence> => {
   const param = useRecoilState(initativeRecurrenceAtom);

   const goalValue = formatRecurrenceGoalForDisplay(intl, state.period.value, state.repetition.value, state.target.value, state.targetGoal.value);
   const targetValue = formatTargetGoalForDisplay(
      intl,
      state.period.value,
      state.repetition.value,
      state.target.value,
      state.targetGoal.value,
      state.targetCategory.value
   );

   const aggregationValue = formatRepetitionAggregationForDisplay(intl, state.period.value);

   return createState(param);
};
e;
