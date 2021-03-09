import { Accordion, AccordionDetails, AccordionSummary, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import tw from 'twin.macro';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { RecurrenceTypes, DaysOfWeek } from './scheduleDefinitions';
import { ScheduleRecurrence, ScheduleRecurrenceSummary } from './ScheduleRecurrence';
import { InitativeCycleDurationSummary } from './InitativeCycleDuration';

const tempColorIcons = 'bg-gray-200';

export const InitativeSchedule: React.FC = (props) => {
   const [recurrence, setRecurrence] = useState<RecurrenceTypes>(RecurrenceTypes.DaysPerMonth);
   const [recurrenceSchedule, setRecurrenceSchedule] = useState<number | DaysOfWeek[]>(5);

   return (
      <div className="w-full">
         <Accordion className="w-full h-full">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <InitativeCycleDurationSummary></InitativeCycleDurationSummary>
            </AccordionSummary>
            <AccordionDetails>
               <ScheduleRecurrence
                  recurrenceSchedule={recurrenceSchedule}
                  recurrenceType={recurrence}
                  setRecurrence={setRecurrence}
                  setRecurrenceSchedule={setRecurrenceSchedule}></ScheduleRecurrence>
            </AccordionDetails>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <ScheduleRecurrenceSummary recurrenceSchedule={recurrenceSchedule} recurrenceType={recurrence}></ScheduleRecurrenceSummary>
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
