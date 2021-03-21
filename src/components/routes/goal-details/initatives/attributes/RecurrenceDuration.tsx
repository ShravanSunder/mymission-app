import { FC, SetStateAction, Dispatch } from 'react';

import { DaysOfWeek } from './scheduleDefinitions';
import { RecurrenceDurationTypes } from './recurrenceDefinitions';
import { PickPeriod } from './PickPeriod';

export const tempColorSelectedDay = 'bg-gray-200';

export interface IRecurrenceDurationProps {
   /**
    * The type of repetition.  ie Days per week, days per month
    */
   recurrenceType: RecurrenceDurationTypes;
   /**
    * Number: Number of times per repetition.
    * Days of Week:  When repetition type is SpecificDaysOfWeek, it can be an DaysOfWeek[]
    */
   recurrenceSchedule: number | DaysOfWeek[];

   setRecurrence: Dispatch<SetStateAction<RecurrenceDurationTypes>>;
   setRecurrenceSchedule: Dispatch<SetStateAction<number | DaysOfWeek[]>>;
}

export const RecurrenceDuration: FC<IRecurrenceDurationProps> = (props) => {
   return (
      <div className="w-full overflow-hidden overflow-y-auto grid grid-cols-1 max-h-80">
         <div className="">{props.recurrenceType}</div>
         <PickPeriod {...props}></PickPeriod>;
      </div>
   );
};
