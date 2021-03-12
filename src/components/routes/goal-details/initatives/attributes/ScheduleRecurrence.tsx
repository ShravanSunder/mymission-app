import React, { useEffect, useMemo } from 'react';

import { DaysOfWeek } from './scheduleDefinitions';
import { RecurrenceAggregationPeriods, RecurrenceDurationTypes, recurrenceToNumberOfDaysMap } from './recurrenceDefinitions';
import { useRecurrenceSummary } from './useRecurrenceSummary';
import { css } from '@emotion/react';
import tw from 'twin.macro';
import { IconButton, Typography } from '@material-ui/core';
import { TwemojiInline } from '~~/components/common/Twemoji';

const tempColorSelectedDay = 'bg-gray-200';

/**
 * @see IScheduleRecurrenceProps
 */

export interface IScheduleRecurrenceSummaryProps {
   recurrenceAggregationPeriod: RecurrenceAggregationPeriods;
   recurrenceDuration: RecurrenceDurationTypes;
   recurrenceSchedule: number | DaysOfWeek[];
}
export const ScheduleRecurrenceSummary: React.FC<IScheduleRecurrenceSummaryProps> = (props) => {
   const summary = useMemo(() => {
      if (recurrenceToNumberOfDaysMap.has(props.recurrenceDuration)) {
         return useRecurrenceSummary(props.recurrenceAggregationPeriod, props.recurrenceDuration, props.recurrenceSchedule as number);
      } else {
         // Todo:finish me
         return '';
      }
   }, [props.recurrenceDuration, props.recurrenceSchedule]);

   return (
      <div
         className="w-full select-none grid grid-row-3 "
         css={{
            gridTemplateColumns: 'auto 1fr 1fr ',
         }}>
         <div className="w-full rounded-full">
            <TwemojiInline text="📅"></TwemojiInline>
         </div>
         <Typography className="pl-2 capitalize">
            <strong>Days</strong>
         </Typography>
         <Typography className="pr-2 text-right justify-self-end">{summary}</Typography>
      </div>
   );
};

export interface IScheduleRecurrenceProps {
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

const PickPeriod: React.FC<IScheduleRecurrenceProps> = (props) => {
   useEffect(() => {
      props.setRecurrenceSchedule(props.recurrenceSchedule as number);
   }, [props.recurrenceSchedule]);

   const handleChange = (event: React.MouseEvent<HTMLElement> | null, newValue: number | null) => {
      if (newValue) {
         props.setRecurrenceSchedule(newValue);
      }
   };

   let days: React.ReactNode[] | null = null;

   const availableDays = recurrenceToNumberOfDaysMap.get(props.recurrenceType);
   if (availableDays != null && availableDays > 0) {
      const result: React.ReactNode[] = [];

      for (let i = 1; i <= availableDays; i++) {
         let selectStyle = css();
         if (props.recurrenceSchedule === i) {
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

   return <div className="flex flex-wrap content-center w-full h-full place-self-center justify-items-start">{days}</div>;
};

export const ScheduleRecurrence: React.FC<IScheduleRecurrenceProps> = (props) => {
   return (
      <div className="w-full overflow-hidden overflow-y-auto grid grid-cols-1 max-h-80">
         <div className="">{props.recurrenceType}</div>
         <PickPeriod {...props}></PickPeriod>;
      </div>
   );
};
