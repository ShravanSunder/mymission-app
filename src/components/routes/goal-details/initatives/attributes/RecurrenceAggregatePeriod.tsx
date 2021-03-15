import { useMemo } from 'react';

import { DaysOfWeek } from './scheduleDefinitions';
import { RecurrenceAggregationPeriods, RecurrenceDurationTypes, daysToRecurrenceTypeMap } from './recurrenceDefinitions';

export const tempColorSelectedDay = 'bg-gray-200';

/**
 * @see IRecurrenceAggregatePeriodProps
 */
export interface IRecurrenceAggregatePeriodSummaryProps {
   aggregationPeriod: RecurrenceAggregationPeriods;
}

export interface IRecurrenceAggregatePeriodProps {
   /**
    * The type of repetition.  ie Days per week, days per month
    */
   recurrenceType: RecurrenceDurationTypes;
   /**
    * Number: Number of times per repetition.
    * Days of Week:  When repetition type is SpecificDaysOfWeek, it can be an DaysOfWeek[]
    */
   RecurrenceAggregatePeriod: number | DaysOfWeek[];

   setRecurrence: React.Dispatch<React.SetStateAction<RecurrenceDurationTypes>>;
   setRecurrenceAggregatePeriod: React.Dispatch<React.SetStateAction<number | DaysOfWeek[]>>;
}

export const RecurrenceAggregatePeriod: React.FC<IRecurrenceAggregatePeriodProps> = (props) => {
   return (
      <div className="w-full overflow-hidden overflow-y-auto grid grid-cols-1 max-h-80">
         <div className="">{props.recurrenceType}</div>
      </div>
   );
};
