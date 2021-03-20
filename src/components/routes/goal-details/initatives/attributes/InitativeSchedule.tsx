import { Accordion, AccordionDetails, AccordionSummary, IconButton } from '@material-ui/core';
import { useState, FC } from 'react';
import tw from 'twin.macro';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { DaysOfWeek } from './scheduleDefinitions';
import { daysToRecurrenceTypeMap, RecurrenceAggregationPeriods, RecurrenceDurationTypes } from './recurrenceDefinitions';
import { RecurrenceDuration } from './RecurrenceDuration';
import { ScheduleAccordionSummary } from './ScheduleAccordionSummary';
import { useRecurrenceSummary } from './useRecurrenceSummary';
import { RecurrenceAggregationPeriod } from './RecurrenceAggregationPeriod';

const tempColorIcons = 'bg-gray-200';

export const InitativeSchedule: FC = (props) => {
   const [recurrenceDuration, setRecurrence] = useState<RecurrenceDurationTypes>(RecurrenceDurationTypes.Monthly);
   const [recurrenceTarget, setRecurrenceSchedule] = useState<number | DaysOfWeek[]>(5);
   const [recurrenceAggregationPeriod, setRecurrenceAggregationPeriod] = useState(RecurrenceAggregationPeriods.PerDay);

   const durationSummaryName = 'Days';
   let durationSummaryValue = '';
   if (daysToRecurrenceTypeMap.has(recurrenceDuration)) {
      durationSummaryValue = useRecurrenceSummary(recurrenceAggregationPeriod, recurrenceDuration, recurrenceTarget);
   }

   return (
      <div className="w-full">
         <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2a-header">
               <ScheduleAccordionSummary summaryName={durationSummaryName} summaryValue={durationSummaryValue}></ScheduleAccordionSummary>
            </AccordionSummary>
            <AccordionDetails>
               <RecurrenceAggregationPeriod
                  aggregationPeriod={recurrenceAggregationPeriod}
                  setAggregationPeriod={setRecurrenceAggregationPeriod}></RecurrenceAggregationPeriod>
            </AccordionDetails>
         </Accordion>
         <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2a-header">
               {/* <ScheduleAccordionSummary summaryName={durationSummaryName} summaryValue={durationSummaryValue}></ScheduleAccordionSummary> */}
            </AccordionSummary>
            <AccordionDetails>
               <RecurrenceDuration
                  recurrenceSchedule={recurrenceTarget}
                  recurrenceType={recurrenceDuration}
                  setRecurrence={setRecurrence}
                  setRecurrenceSchedule={setRecurrenceSchedule}></RecurrenceDuration>
            </AccordionDetails>
         </Accordion>
      </div>
   );
};
