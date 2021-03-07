import React, { useEffect, useMemo, useState } from 'react';
import * as dayjs from 'dayjs';
import { IconButton, ButtonBase, ToggleButton, ToggleButtonGroup, Typography } from '@material-ui/core';

import tw from 'twin.macro';
import CheckIcon from '@material-ui/icons/Check';
import { css } from '@emotion/react';
import { RecurrenceTypes, DaysOfWeek, recurrenceToNumberOfDaysMap } from './scheduleDefinitions';

const tempColorSelectedDay = 'bg-gray-200';

export interface IScheduleRecurrenceProps {
   /**
    * The type of repetition.  ie Days per week, days per month
    */
   recurrence: RecurrenceTypes;
   /**
    * Number: Number of times per repetition.
    * Days of Week:  When repetition type is SpecificDaysOfWeek, it can be an DaysOfWeek[]
    */
   currentSchedule: number | DaysOfWeek[];
}

const SchedulePerPeriod: React.FC<IScheduleRecurrenceProps> = ({ recurrence, currentSchedule }) => {
   const [selectedNumberOfDays, setSelectedNumberOfDays] = useState<number>();

   useEffect(() => {
      setSelectedNumberOfDays(currentSchedule as number);
   }, [currentSchedule]);

   const handleChange = (event: React.MouseEvent<HTMLElement> | null, newValue: number | null) => {
      if (newValue) {
         setSelectedNumberOfDays(newValue);
      }
   };

   let days: React.ReactNode[] | null = null;

   const availableDays = recurrenceToNumberOfDaysMap.get(recurrence);
   if (availableDays != null && availableDays > 0) {
      const result: React.ReactNode[] = [];

      for (let i = 1; i <= availableDays; i++) {
         let selectStyle = css();
         if (selectedNumberOfDays === i) {
            selectStyle = css(tw`${tempColorSelectedDay} shadow-sm`);
         }

         result.push(
            <div css={selectStyle} key={i} className="rounded-full w-11 h-11">
               <IconButton className="" value={i} onClick={() => handleChange(null, i)}>
                  <Typography className="w-5 h-5" variant="subtitle2">
                     {i}
                  </Typography>
               </IconButton>
            </div>
         );
      }

      days = result;
   }

   return (
      <div className="w-full overflow-hidden overflow-y-auto grid max-h-80">
         <div className="flex flex-wrap content-center w-full h-full place-self-center justify-items-start">{days}</div>{' '}
      </div>
   );
};

export const ScheduleRecurrence: React.FC<IScheduleRecurrenceProps> = (props) => {
   return <SchedulePerPeriod {...props}></SchedulePerPeriod>;
};
