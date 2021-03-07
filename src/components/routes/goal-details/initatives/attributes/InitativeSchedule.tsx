import { Accordion, AccordionDetails, AccordionSummary, IconButton, Typography } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import tw from 'twin.macro';
import { TwemojiInline } from '~~/components/common/Twemoji';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ScheduleRecurrence } from './ScheduleRecurrence';
import { RecurrenceTypes, recurrenceToDisplayString, recurrenceToNumberOfDaysMap, DaysOfWeek } from './scheduleDefinitions';

const tempColorIcons = 'bg-gray-200';

/**
 * @see IScheduleRecurrenceProps
 */
export interface IInitiativeScheduleSummaryProps {
   recurrenceType: RecurrenceTypes;
   recurrenceSchedule: number | DaysOfWeek[];
}

const InitiativeScheduleSummary: React.FC<IInitiativeScheduleSummaryProps> = (props) => {
   const summary = useMemo(() => {
      if (recurrenceToNumberOfDaysMap.has(props.recurrenceType)) {
         return recurrenceToDisplayString(props.recurrenceType, props.recurrenceSchedule as number);
      } else {
         // Todo:finish me
         return '';
      }
   }, [props.recurrenceType, props.recurrenceSchedule]);

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
   const [recurrence, setRecurrence] = useState<RecurrenceTypes>(RecurrenceTypes.DaysPerMonth);
   const [recurrenceSchedule, setRecurrenceSchedule] = useState<number | DaysOfWeek[]>(5);

   return (
      <div className="w-full">
         <Accordion className="w-full h-full">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <InitiativeScheduleSummary recurrenceSchedule={recurrenceSchedule} recurrenceType={recurrence}></InitiativeScheduleSummary>
            </AccordionSummary>
            <AccordionDetails>
               <ScheduleRecurrence
                  recurrenceSchedule={recurrenceSchedule}
                  recurrenceType={recurrence}
                  setRecurrence={setRecurrence}
                  setRecurrenceSchedule={setRecurrenceSchedule}></ScheduleRecurrence>
            </AccordionDetails>
         </Accordion>
      </div>
   );
};
