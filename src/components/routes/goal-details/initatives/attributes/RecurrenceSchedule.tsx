import React, { useMemo } from 'react';

import { DaysOfWeek } from './scheduleDefinitions';
import { RecurrenceAggregationPeriods, RecurrenceDurationTypes, daysToRecurrenceTypeMap } from './recurrenceDefinitions';
import { useRecurrenceSummary } from './useRecurrenceSummary';
import { Typography } from '@material-ui/core';
import { TwemojiInline } from '~~/components/common/Twemoji';
import { PickPeriod } from './PickPeriod';

export const tempColorSelectedDay = 'bg-gray-200';

export interface IRecurrenceScheduleProps {
   /**
    * The type of repetition.  ie Days per week, days per month
    */
   recurrenceType: RecurrenceDurationTypes;
   /**
    * Number: Number of times per repetition.
    * Days of Week:  When repetition type is SpecificDaysOfWeek, it can be an DaysOfWeek[]
    */
   recurrenceSchedule: number | DaysOfWeek[];

   setRecurrence: React.Dispatch<React.SetStateAction<RecurrenceDurationTypes>>;
   setRecurrenceSchedule: React.Dispatch<React.SetStateAction<number | DaysOfWeek[]>>;
}

export const RecurrenceSchedule: React.FC<IRecurrenceScheduleProps> = (props) => {
   return (
      <div className="w-full overflow-hidden overflow-y-auto grid grid-cols-1 max-h-80">
         <div className="">{props.recurrenceType}</div>
         <PickPeriod {...props}></PickPeriod>;
      </div>
   );
};