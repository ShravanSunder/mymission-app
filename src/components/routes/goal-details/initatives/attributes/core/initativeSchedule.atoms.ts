import { nanoid } from 'nanoid';
import { DefaultValue, selector, selectorFamily } from 'recoil';

import { intlProviderAtom } from '~~/components/app/IntlProvider';
import { defaultInitativeRecurrence, IInitativeRecurrence } from '~~/components/routes/goal-details/initatives/attributes/core/initativeSchedule.types';
import {
   formatRecurrenceGoalForDisplay,
   formatRepetitionForDisplay,
   formatTargetCategoryForDisplay,
   formatTargetGoalForDisplay,
} from '~~/components/routes/goal-details/initatives/attributes/core/recurrence.facade';
import { transformRepetition, transformTarget } from '~~/components/routes/goal-details/initatives/attributes/core/recurrence.transforms';
import { atomFactory } from '~~/providers/recoilFactory';

export const initativeRecurrenceAtom = atomFactory<IInitativeRecurrence>('IInitativeRecurrence', defaultInitativeRecurrence(), (params) => {
   params.onSet((newValue, oldValue) => {
      if (newValue instanceof DefaultValue || oldValue instanceof DefaultValue) return;
      const transformed = { ...newValue };

      if (newValue.period !== oldValue.period) {
         transformed.repetition = transformRepetition(newValue.repetition, newValue.period);
      }
      if (transformed.target !== oldValue.target) {
         transformed.target = transformTarget(transformed.target, transformed.repetition, transformed.period);
      }

      params.setSelf(transformed);
   });
});

export const initativeRecurrenceSelector = selectorFamily({
   key: nanoid(),
   get: (prop: keyof IInitativeRecurrence) => ({ get }) => get(initativeRecurrenceAtom)[prop],
});

export const formatRecurrenceGoalForDisplaySelector = selector({
   key: nanoid(),
   get: ({ get }) => {
      return formatRecurrenceGoalForDisplay(get(intlProviderAtom), get(initativeRecurrenceAtom));
   },
});

export const formatRepetitionForDisplaySelector = selector({
   key: nanoid(),
   get: ({ get }) => {
      return formatRepetitionForDisplay(get(intlProviderAtom), get(initativeRecurrenceAtom));
   },
});

export const formatTargetGoalForDisplaySelector = selector({
   key: nanoid(),
   get: ({ get }) => {
      return formatTargetGoalForDisplay(get(intlProviderAtom), get(initativeRecurrenceAtom));
   },
});

export const formatTargetCategoryForDisplaySelector = selector({
   key: nanoid(),
   get: ({ get }) => {
      return formatTargetCategoryForDisplay(get(intlProviderAtom), get(initativeRecurrenceAtom).targetCategory);
   },
});
