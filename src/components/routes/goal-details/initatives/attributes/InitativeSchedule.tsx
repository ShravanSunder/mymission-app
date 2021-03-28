import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import { formatAggregationText, formatRecurrenceSummary } from './core/recurrence.facade';
import { IRecurrenceObservables, useRecurrenceObservables } from './core/useInitiativeSchedule';
import { RecurrenceAggregationPeriod } from './RecurrenceAggregationPeriod';
import { RecurrenceDuration } from './RecurrenceDuration';
import { ScheduleAccordionSummary } from './ScheduleAccordionSummary';

export const InitativeSchedule: FC = () => {
   const intl = useIntl();

   /**
    * TODO: replace color
    */
   const tempColorIcons = 'bg-gray-200';

   const recurrenceState: IRecurrenceObservables = useRecurrenceObservables();

   const durationSummaryValue = formatRecurrenceSummary(
      intl,
      recurrenceState.aggregationPeriod.value,
      recurrenceState.durationType.value,
      recurrenceState.target.value
   );

   const aggregationName = intl.formatMessage({ defaultMessage: 'Habit counting' });
   const aggregationValue = formatAggregationText(intl, recurrenceState.aggregationPeriod.value);

   // / useSubscription(recurrenceState.aggregationPeriod.observable$, (e) => console.log(e));

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
