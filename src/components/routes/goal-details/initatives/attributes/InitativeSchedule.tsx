import { Accordion, AccordionDetails, AccordionSummary, IconButton } from '@material-ui/core';
import { useState, FC } from 'react';
import tw from 'twin.macro';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { DaysOfWeek } from './scheduleDefinitions';
import { daysToRecurrenceTypeMap, RecurrenceAggregationPeriods, RecurrenceDurationTypes } from './recurrenceDefinitions';
import { RecurrenceSchedule } from './RecurrenceSchedule';
import { ScheduleAccordionSummary } from './ScheduleAccordionSummary';
import { useRecurrenceSummary } from './useRecurrenceSummary';

const tempColorIcons = 'bg-gray-200';

export const InitativeSchedule: FC = (props) => {
   const [recurrenceDuration, setRecurrence] = useState<RecurrenceDurationTypes>(RecurrenceDurationTypes.Monthly);
   const [recurrenceTarget, setRecurrenceSchedule] = useState<number | DaysOfWeek[]>(5);
   const [recurrenceAggregationPeriod, setRecurrenceAggregationPeriod] = useState(RecurrenceAggregationPeriods.PerDay);

   const scheduleSummaryName = 'Days';
   let scheduleSummaryValue = '';
   if (daysToRecurrenceTypeMap.has(recurrenceDuration)) {
      scheduleSummaryValue = useRecurrenceSummary(recurrenceAggregationPeriod, recurrenceDuration, recurrenceTarget);
   }
   return (
      <div className="w-full">
         <Accordion className="w-full h-full">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <ScheduleAccordionSummary summaryName={scheduleSummaryName} summaryValue={scheduleSummaryValue}></ScheduleAccordionSummary>
            </AccordionSummary>
            <AccordionDetails></AccordionDetails>
         </Accordion>
         <Accordion className="w-full h-full">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <ScheduleAccordionSummary summaryName={scheduleSummaryName} summaryValue={scheduleSummaryValue}></ScheduleAccordionSummary>
            </AccordionSummary>
            <AccordionDetails>
               <RecurrenceSchedule
                  recurrenceSchedule={recurrenceTarget}
                  recurrenceType={recurrenceDuration}
                  setRecurrence={setRecurrence}
                  setRecurrenceSchedule={setRecurrenceSchedule}></RecurrenceSchedule>
            </AccordionDetails>
         </Accordion>
      </div>
   );
};
