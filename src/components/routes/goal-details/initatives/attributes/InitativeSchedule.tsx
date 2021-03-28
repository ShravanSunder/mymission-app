import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import { formatAggregationText, formatRecurrenceSummary, formatGoalText } from './core/recurrence.facade';
import { IRecurrenceObservables, useRecurrenceObservables } from './core/useInitiativeSchedule';
import { RecurrenceAggregationPeriod } from './RecurrenceAggregationPeriod';
import { RecurrenceGoal } from './RecurrenceGoal';
import { ScheduleSummary } from './ScheduleSummary';

export const InitativeSchedule: FC = () => {
   /**
    * TODO: replace color
    */
   const tempColorIcons = 'bg-gray-200';

   const intl = useIntl();

   const recurrenceState: IRecurrenceObservables = useRecurrenceObservables();
   const aggregationName = intl.formatMessage({ defaultMessage: 'Habit counting' });
   const aggregationValue = formatAggregationText(intl, recurrenceState.aggregationPeriod.value);

   const goalName = intl.formatMessage({ defaultMessage: 'Goal' });
   const goalValue = formatRecurrenceSummary(intl, recurrenceState.aggregationPeriod.value, recurrenceState.durationType.value, recurrenceState.target.value);

   const data = formatGoalText(intl, recurrenceState.aggregationPeriod.value, recurrenceState.durationType.value, recurrenceState.target.value);

   console.log(data);

   const aggregateAccordion = (
      <Accordion>
         <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2a-header">
            <ScheduleSummary icon={'📅'} summaryName={aggregationName} summaryValue={aggregationValue.primary}></ScheduleSummary>
         </AccordionSummary>
         <AccordionDetails>
            <RecurrenceAggregationPeriod aggregationPeriod={recurrenceState.aggregationPeriod}></RecurrenceAggregationPeriod>
         </AccordionDetails>
      </Accordion>
   );

   const goalAccordion = (
      <Accordion>
         <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2a-header">
            <ScheduleSummary icon={'🎯'} summaryName={goalName} summaryValue={goalValue.primary}></ScheduleSummary>
         </AccordionSummary>
         <AccordionDetails>
            <RecurrenceGoal target={recurrenceState.target} durationType={recurrenceState.durationType}></RecurrenceGoal>
         </AccordionDetails>
      </Accordion>
   );
   return (
      <div className="w-full">
         {aggregateAccordion}
         {goalAccordion}
      </div>
   );
};
