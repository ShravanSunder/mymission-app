import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { formatAggregationPeriodForDisplay, formatRecurrenceGoalForDisplay } from './core/recurrence.facade';
import { IRecurrenceObservables, useInitiativeSchedule } from './core/useInitiativeSchedule';
import { RecurrenceGoal } from './RecurrenceGoal';
import { RecurrenceRepetition as RecurrenceRepetition } from './RecurrenceRepetition';
import { ScheduleSummary } from './ScheduleSummary';

import { useControlledAccordion } from '~~/components/common/core/hooks/useControlledAccordion';

export const InitativeSchedule: FC = () => {
   /**
    * TODO: replace color
    */
   const tempColorIcons = 'bg-gray-200';

   const getAccordionProps = useControlledAccordion();
   const intl = useIntl();

   const state: IRecurrenceObservables = useInitiativeSchedule();
   const aggregationValue = formatAggregationPeriodForDisplay(intl, state.period.value);

   const periodName = intl.formatMessage({ defaultMessage: 'Habit Repetition' });
   const goalName = intl.formatMessage({ defaultMessage: 'Goal' });
   const goalValue = formatRecurrenceGoalForDisplay(intl, state.period.value, state.repetition.value, state.goalTarget.value);

   const repetitions = intl.formatMessage({ defaultMessage: 'Goal' });

   const aggregateAccordion = (
      <Accordion {...getAccordionProps('aggregateAccordion')}>
         <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2a-header">
            <ScheduleSummary icon={'📅'} summaryName={periodName} summaryValue={aggregationValue.primary}></ScheduleSummary>
         </AccordionSummary>
         <AccordionDetails>
            <RecurrenceRepetition {...state}></RecurrenceRepetition>
         </AccordionDetails>
      </Accordion>
   );

   const goalAccordion = (
      <Accordion {...getAccordionProps('goalAccordion')}>
         <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2a-header">
            <ScheduleSummary icon={'🎯'} summaryName={goalName} summaryValue={goalValue.primary}></ScheduleSummary>
         </AccordionSummary>
         <AccordionDetails>
            <RecurrenceGoal {...state}></RecurrenceGoal>
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
