import { Accordion, AccordionDetails, AccordionSummary, IconButton, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import tw from 'twin.macro';
import { TwemojiInline } from '~~/components/common/Twemoji';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Calendar from 'react-calendar';
import { IScheduleRecurrenceProps, ScheduleRecurrence } from './ScheduleRecurrence';
import { RecurrenceTypes, recurrenceToDisplayString, recurrenceToNumberOfDaysMap } from './scheduleDefinitions';

const tempColorIcons = 'bg-gray-200';

const InitiativeScheduleSummary: React.FC<IScheduleRecurrenceProps> = (props) => {
   const summary = useMemo(() => {
      if (recurrenceToNumberOfDaysMap.has(props.recurrence)) {
         return recurrenceToDisplayString(props.recurrence, props.currentSchedule as number);
      } else {
         // Todo:finish me
         return '';
      }
   }, []);

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

export const InitativeSchedule: React.FC = (props) => {
   const currentSchedule = 5;
   const recurrence = RecurrenceTypes.DaysPerMonth;

   return (
      <div className="w-full">
         <Accordion className="w-full h-full">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <InitiativeScheduleSummary currentSchedule={currentSchedule} recurrence={recurrence}></InitiativeScheduleSummary>
            </AccordionSummary>
            <AccordionDetails>
               <ScheduleRecurrence currentSchedule={currentSchedule} recurrence={recurrence}></ScheduleRecurrence>
            </AccordionDetails>
         </Accordion>
      </div>
   );
};
