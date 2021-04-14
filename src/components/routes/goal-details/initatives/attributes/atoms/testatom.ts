import { atom, atomFamily, constSelector, errorSelector, selector } from 'recoil';
import { BehaviorSubject, of } from 'rxjs';
import { trigger } from 'swr';
import { Doc } from 'yjs';

import {
   RecurrenceGoalCategoryType,
   RecurrenceRepetitionAggregation,
   RecurrenceRepetitionType,
   TRecurrenceTargetType,
} from '~~/components/routes/goal-details/initatives/attributes/core/recurrence.types';
import { observableAtomFactory } from '~~/providers/observableAtomFactory';

export const yjsDocState = atom<Doc>({
   key: 'yjsDocState',
   default: errorSelector('Attempt to use Atom before initialization'),
   effects_UNSTABLE: [
      ({ onSet, setSelf, trigger }) => {
         // Initialize atom value to the remote storage state
         if (trigger === 'get') {
            // Avoid expensive initialization
            setSelf(new Doc()); // Call synchronously to initialize
         }
         onSet((newID) => {
            console.debug('Current user ID:', newID);
         });
      },
   ],
});

export const source = atom<number>({
   key: 'todoListState',
   default: 5,
   // effects_UNSTABLE: [
   //    ({ onSet, setSelf, trigger }) => {
   //       // Initialize atom value to the remote storage state
   //       if (trigger === 'get') {
   //          // Avoid expensive initialization
   //          setSelf(new Doc()); // Call synchronously to initialize
   //       }
   //       onSet((newID) => {
   //          console.debug('Current user ID:', newID);
   //       });
   //    },
   // ],
});

export const trailAtom = observableAtomFactory('RecurrenceRepetitionAggregation', RecurrenceRepetitionAggregation.PerDay);

export const periodAtom = observableAtomFactory('RecurrenceRepetitionAggregation', RecurrenceRepetitionAggregation.PerDay);

export const repetitionAtom = observableAtomFactory('RecurrenceRepetitionType', RecurrenceRepetitionType.Monthly);

export const targetAtom = observableAtomFactory<TRecurrenceTargetType>('TRecurrenceTargetType', 5);

export const targetGoalAtom = observableAtomFactory('targetGoalAtom', 1);

export const targetCategoryAtom = observableAtomFactory('targetCategoryAtom', RecurrenceGoalCategoryType.PositiveTarget);
