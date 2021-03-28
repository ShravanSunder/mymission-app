import { FC } from 'react';

import { DaysOfWeek } from './core/schedule.types';
import { RecurrenceDurationTypes } from './core/recurrence.types';
import { PickPeriod } from './PickPeriod';
import { ObservableWithValue } from '../../../../common/core/hooks/useObservableValue';

export interface IRecurrenceDurationProps {
   /**
    * The type of repetition.  ie Days per week, days per month
    */
   durationType: ObservableWithValue<RecurrenceDurationTypes>;
   /**
    * Number: Number of times per repetition.
    * Days of Week:  When repetition type is SpecificDaysOfWeek, it can be an DaysOfWeek[]
    */
   target: ObservableWithValue<number | DaysOfWeek[]>;
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
