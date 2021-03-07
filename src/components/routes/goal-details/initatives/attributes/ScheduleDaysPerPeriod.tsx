import React, { useEffect, useState } from 'react';
import { IconButton, Typography } from '@material-ui/core';
import tw from 'twin.macro';
import { css } from '@emotion/react';
import { recurrenceToNumberOfDaysMap } from './scheduleDefinitions';
import { IScheduleRecurrenceProps } from './ScheduleRecurrence';

const tempColorSelectedDay = 'bg-gray-200';

export const ScheduleDaysPerPeriod: React.FC<IScheduleRecurrenceProps> = ({ recurrenceType, recurrenceSchedule, setRecurrenceSchedule }) => {
   useEffect(() => {
      setRecurrenceSchedule(recurrenceSchedule as number);
   }, [recurrenceSchedule]);

   const handleChange = (event: React.MouseEvent<HTMLElement> | null, newValue: number | null) => {
      if (newValue) {
         setRecurrenceSchedule(newValue);
      }
   };

   let days: React.ReactNode[] | null = null;

   const availableDays = recurrenceToNumberOfDaysMap.get(recurrenceType);
   if (availableDays != null && availableDays > 0) {
      const result: React.ReactNode[] = [];

      for (let i = 1; i <= availableDays; i++) {
         let selectStyle = css();
         if (recurrenceSchedule === i) {
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
