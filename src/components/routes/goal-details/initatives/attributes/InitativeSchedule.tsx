import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import { formatAggregationPeriodForDisplay, formatRecurrenceGoalForDisplay, formatDurationForDisplay } from './core/recurrence.facade';
import { IRecurrenceObservables, useRecurrenceObservables } from './core/useInitiativeSchedule';
import { RecurrenceAggregationPeriod } from './RecurrenceAggregationPeriod';
import { RecurrenceGoal } from './RecurrenceGoal';
import { ScheduleSummary } from './ScheduleSummary';
import { useControlledAccordion } from '~~/components/common/core/hooks/useControlledAccordion';

export const InitativeSchedule: FC = () => {
   /**
    * TODO: replace color
    */
   const tempColorIcons = 'bg-gray-200';

   const getAccordionProps = useControlledAccordion();
   const intl = useIntl();

   const recurrenceState: IRecurrenceObservables = useRecurrenceObservables();
   const aggregationName = intl.formatMessage({ defaultMessage: 'Habit counting' });
   const aggregationValue = formatAggregationPeriodForDisplay(intl, recurrenceState.aggregationPeriod.value);

   const goalName = intl.formatMessage({ defaultMessage: 'Goal' });
   const goalValue = formatRecurrenceGoalForDisplay(
      intl,
      recurrenceState.aggregationPeriod.value,
      recurrenceState.durationType.value,
      recurrenceState.target.value
   );

   const data = formatDurationForDisplay(intl, recurrenceState.aggregationPeriod.value, recurrenceState.durationType.value, recurrenceState.target.value);

   console.log(data);

   const aggregateAccordion = (
      <Accordion {...getAccordionProps('aggregateAccordion')}>
         <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2a-header">
            <ScheduleSummary icon={'📅'} summaryName={aggregationValue.primary} summaryValue={aggregationValue.alternate ?? ''}></ScheduleSummary>
         </AccordionSummary>
         <AccordionDetails>
            <RecurrenceAggregationPeriod aggregationPeriod={recurrenceState.aggregationPeriod}></RecurrenceAggregationPeriod>
         </AccordionDetails>
      </Accordion>
   );

   const goalAccordion = (
      <Accordion {...getAccordionProps('goalAccordion')}>
         <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2a-header">
            <ScheduleSummary icon={'🎯'} summaryName={goalName} summaryValue={goalValue.primary}></ScheduleSummary>
         </AccordionSummary>
         <AccordionDetails>
            <RecurrenceGoal
               aggregationPeriod={recurrenceState.aggregationPeriod}
               target={recurrenceState.target}
               durationType={recurrenceState.durationType}></RecurrenceGoal>
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
