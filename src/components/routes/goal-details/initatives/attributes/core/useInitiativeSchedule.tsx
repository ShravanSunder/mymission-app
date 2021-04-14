import { useSubscription } from 'observable-hooks';
import { useRecoilState, useRecoilValue } from 'recoil';
import * as Y from 'yjs';

import { repetitionOperator, targetOperator } from './recurrence.operators';
import {
   RecurrenceGoalCategoryType,
   RecurrenceRepetitionAggregation,
   RecurrenceRepetitionType,
   TRecurrenceTargetType as TRecurrenceTargetType,
} from './recurrence.types';

import { useSubjectFromRecoil } from '~~/components/common/core/hooks/state/useSubjectFromRecoil';
import { SubjectWithTransform, useSubjectTransform } from '~~/components/common/core/hooks/state/useSubjectTransform';
import { useSubjectTransformRecoil } from '~~/components/common/core/hooks/state/useSubjectTransformRecoil';
import { SubjectWithValue, useSubjectValue } from '~~/components/common/core/hooks/state/useSubjectValue';
import { logDebug } from '~~/components/common/core/subscriptions';
import {
   source,
   periodAtom,
   targetAtom,
   repetitionAtom,
   targetGoalAtom,
   targetCategoryAtom,
} from '~~/components/routes/goal-details/initatives/attributes/atoms/testatom';

export interface IRecurrenceObservables {
   /**
    * Number: Number of times per repetition.
    * Days of Week:  When repetition type is SpecificDaysOfWeek, it can be an DaysOfWeek[]
    */
   period: SubjectWithValue<RecurrenceRepetitionAggregation>;
   /**
    * The type of repetition.  ie Days per week, days per month
    */
   repetition: SubjectWithTransform<RecurrenceRepetitionType>;
   /**
    * represents the goal target
    */
   target: SubjectWithTransform<TRecurrenceTargetType>;

   /**
    * A number that represents the amount of times you aim to do the task
    */
   targetGoal: SubjectWithValue<number>;

   /**
    *
    */
   targetCategory: SubjectWithValue<RecurrenceGoalCategoryType>;
}

export const useInitiativeSchedule = (): IRecurrenceObservables => {
   // const [doc] = useRecoilState(yjsDocState);
   const [sourceStuff, setSourceStuff] = useRecoilState(source);
   // const [];
   // const subject = useRecoilValue(subjectTest);

   const period = useSubjectFromRecoil<RecurrenceRepetitionAggregation>(periodAtom);

   const repetition = useSubjectTransformRecoil<RecurrenceRepetitionType>(repetitionAtom, repetitionOperator, period.subject$);
   const target = useSubjectTransformRecoil<TRecurrenceTargetType>(targetAtom, targetOperator, repetition.subject$, period.subject$);
   const targetGoal = useSubjectFromRecoil<number>(targetGoalAtom);
   const targetCategory = useSubjectFromRecoil<RecurrenceGoalCategoryType>(targetCategoryAtom);

   // useSubscription(period.subject$, logDebug);
   useSubscription(repetition.subject$, logDebug);
   useSubscription(target.subject$, logDebug);
   // useSubscription(targetGoal.subject$, logDebug);
   // useSubscription(targetCategory.subject$, logDebug);

   useSubscription(repetition.source$, logDebug);
   useSubscription(target.source$, logDebug);

   return { period: period, repetition, target, targetGoal, targetCategory };
};
