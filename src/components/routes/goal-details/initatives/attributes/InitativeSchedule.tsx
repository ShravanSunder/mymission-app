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
import { IRecurrenceObservables, useRecurrenceObservables } from './useInitiativeSchedule';
import { useSubscription } from 'observable-hooks';

export const InitativeSchedule: FC = (props) => {
   const intl = useIntl();
   const getAggregationText = useAggregationText();

   /**
    * TODO: replace color
    */
   const tempColorIcons = 'bg-gray-200';

   const recurrenceState: IRecurrenceObservables = useRecurrenceObservables();

   // const durationSummaryValue = useRecurrenceSummary(intl, recurrenceState.aggregationPeriod.state, recurrenceState.durationType.state, recurrenceState.target.state);

   const aggregationName = intl.formatMessage({ defaultMessage: 'Habit counting' });
   const aggregationValue = getAggregationText(recurrenceState.aggregationPeriod.value);

   // useSubscription(recurrenceState.aggregationPeriod.observable$, (e) => console.log(e));

   const aggregateAccordion = (
      <Accordion>
         <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2a-header">
            <ScheduleAccordionSummary summaryName={aggregationName} summaryValue={aggregationValue.primary}></ScheduleAccordionSummary>
         </AccordionSummary>
         <AccordionDetails>
            <RecurrenceAggregationPeriod aggregationPeriod={recurrenceState.aggregationPeriod}></RecurrenceAggregationPeriod>
         </AccordionDetails>
      </Accordion>
   );

   const durationAccordion = (
      <Accordion>
         <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2a-header"></AccordionSummary>
         <AccordionDetails>
            <RecurrenceDuration target={recurrenceState.target} durationType={recurrenceState.durationType}></RecurrenceDuration>
         </AccordionDetails>
      </Accordion>
   );
   return (
      <div className="w-full">
         {aggregateAccordion}
         {/* {durationAccordion} */}
      </div>
   );
};
