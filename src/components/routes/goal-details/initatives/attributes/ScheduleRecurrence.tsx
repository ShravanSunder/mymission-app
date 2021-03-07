import React, { useMemo } from 'react';
import * as dayjs from 'dayjs';
import { ButtonBase, ToggleButton, ToggleButtonGroup } from '@material-ui/core';

import CheckIcon from '@material-ui/icons/Check';
import { RecurrenceTypes, DaysOfWeek } from './scheduleDefinitions';
import { ScheduleDaysPerPeriod } from './ScheduleDaysPerPeriod';

export interface IScheduleRecurrenceProps {
   /**
    * The type of repetition.  ie Days per week, days per month
    */
   recurrenceType: RecurrenceTypes;
   /**
    * Number: Number of times per repetition.
    * Days of Week:  When repetition type is SpecificDaysOfWeek, it can be an DaysOfWeek[]
    */
   recurrenceSchedule: number | DaysOfWeek[];

   setRecurrence: React.Dispatch<React.SetStateAction<RecurrenceTypes>>;
   setRecurrenceSchedule: React.Dispatch<React.SetStateAction<number | DaysOfWeek[]>>;
}

export const ScheduleRecurrence: React.FC<IScheduleRecurrenceProps> = (props) => {
   return <ScheduleDaysPerPeriod {...props}></ScheduleDaysPerPeriod>;
};
