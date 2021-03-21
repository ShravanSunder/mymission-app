import { Accordion, AccordionDetails, AccordionSummary, IconButton } from '@material-ui/core';
import { useState, FC } from 'react';
import tw from 'twin.macro';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { DaysOfWeek } from './scheduleDefinitions';
import { RecurrenceAggregationPeriods, RecurrenceDurationTypes } from './recurrenceDefinitions';
import { RecurrenceDuration } from './RecurrenceDuration';
import { ScheduleAccordionSummary } from './ScheduleAccordionSummary';
import { useRecurrenceSummary } from './useRecurrenceSummary';
import { RecurrenceAggregationPeriod } from './RecurrenceAggregationPeriod';
import { useIntl } from 'react-intl';
import { useAggregationText } from './useAggregationText';

const tempColorIcons = 'bg-gray-200';

export const InitativeSchedule: FC = (props) => {
   const { formatMessage } = useIntl();
   const getAggregationText = useAggregationText();

   const [recurrenceAggregationPeriod, setRecurrenceAggregationPeriod] = useState(RecurrenceAggregationPeriods.PerDay);

   const aggregationName = formatMessage({ defaultMessage: 'Habit counting' });
   const aggregationValue = getAggregationText(recurrenceAggregationPeriod);

   const aggregateAccordion = (
      <Accordion>
         <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2a-header">
            <ScheduleAccordionSummary summaryName={aggregationName} summaryValue={aggregationValue.primary}></ScheduleAccordionSummary>
         </AccordionSummary>
         <AccordionDetails>
            <RecurrenceAggregationPeriod
               aggregationPeriod={recurrenceAggregationPeriod}
               setAggregationPeriod={setRecurrenceAggregationPeriod}></RecurrenceAggregationPeriod>
         </AccordionDetails>
      </Accordion>
   );

   const [recurrenceDuration, setRecurrence] = useState<RecurrenceDurationTypes>(RecurrenceDurationTypes.Monthly);
   const [recurrenceTarget, setRecurrenceSchedule] = useState<number | DaysOfWeek[]>(5);
   const durationSummaryValue = useRecurrenceSummary(recurrenceAggregationPeriod, recurrenceDuration, recurrenceTarget);

   const durationAccordion = (
      <Accordion>
         <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2a-header"></AccordionSummary>
         <AccordionDetails>
            <RecurrenceDuration
               recurrenceSchedule={recurrenceTarget}
               recurrenceType={recurrenceDuration}
               setRecurrence={setRecurrence}
               setRecurrenceSchedule={setRecurrenceSchedule}></RecurrenceDuration>
         </AccordionDetails>
      </Accordion>
   );
   return (
      <div className="w-full">
         {aggregateAccordion}
         {durationAccordion}
      </div>
   );
};
