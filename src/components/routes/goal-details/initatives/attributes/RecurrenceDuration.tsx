import { FC, SetStateAction, Dispatch } from 'react';

import { DaysOfWeek } from './scheduleDefinitions';
import { RecurrenceDurationTypes } from './recurrenceDefinitions';
import { PickPeriod } from './PickPeriod';
import { SubjectWithState } from './useInitiativeSchedule';

export interface IRecurrenceDurationProps {
   /**
    * The type of repetition.  ie Days per week, days per month
    */
   durationType: SubjectWithState<RecurrenceDurationTypes>;
   /**
    * Number: Number of times per repetition.
    * Days of Week:  When repetition type is SpecificDaysOfWeek, it can be an DaysOfWeek[]
    */
   target: SubjectWithState<number | DaysOfWeek[]>;
}

export const RecurrenceDuration: FC<IRecurrenceDurationProps> = (props) => {
   /**
    * TODO: replace colors
    */
   const tempColorSelectedDay = 'bg-gray-200';

   return (
      <div className="w-full overflow-hidden overflow-y-auto grid grid-cols-1 max-h-80">
         <div className="">{props.durationType}</div>
         <PickPeriod {...props}></PickPeriod>;
      </div>
   );
};
