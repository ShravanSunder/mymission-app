import {
   RecurrenceRepetitionAggregation,
   RecurrenceRepetitionType,
   TRecurrenceTargetType,
   RecurrenceGoalCategoryType,
} from '~~/components/routes/goal-details/initatives/attributes/core/recurrence.types';

export interface IInitativeRecurrence {
   /**
    * Number: Number of times per repetition.
    * Days of Week:  When repetition type is SpecificDaysOfWeek, it can be an DaysOfWeek[]
    */
   period: RecurrenceRepetitionAggregation;
   /**
    * The type of repetition.  ie Days per week, days per month
    */
   repetition: RecurrenceRepetitionType;
   /**
    * represents the goal target
    */
   target: TRecurrenceTargetType;

   /**
    * A number that represents the amount of times you aim to do the task
    */
   targetGoal: number;

   /**
    *
    */
   targetCategory: RecurrenceGoalCategoryType;
}

export const defaultInitativeRecurrence = (): IInitativeRecurrence => {
   return {
      period: RecurrenceRepetitionAggregation.PerDay,
      repetition: RecurrenceRepetitionType.Weekly,
      target: 2,
      targetGoal: 1,
      targetCategory: RecurrenceGoalCategoryType.PositiveTarget,
   };
};
