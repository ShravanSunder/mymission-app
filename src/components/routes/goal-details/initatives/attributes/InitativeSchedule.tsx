import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { formatTargetGoalForDisplay, formatRecurrenceGoalForDisplay, formatRepetitionAggregationForDisplay } from './core/recurrence.facade';
import { IRecurrenceObservables, useInitiativeSchedule } from './core/useInitiativeSchedule';
import { RecurrenceRepetition as RecurrenceRepetition } from './RecurrenceRepetition';
import { RecurrenceTarget } from './RecurrenceTarget';
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
   const aggregationValue = formatRepetitionAggregationForDisplay(intl, state.period.value);

   const periodName = intl.formatMessage({ defaultMessage: 'Habit Repetition' });

   const goalName = intl.formatMessage({ defaultMessage: 'Goal' });
   const goalValue = formatRecurrenceGoalForDisplay(intl, state.period.value, state.repetition.value, state.target.value, state.targetGoal.value);
   const targetValue = formatTargetGoalForDisplay(
      intl,
      state.period.value,
      state.repetition.value,
      state.target.value,
      state.targetGoal.value,
      state.targetCategory.value
   );

   // const goalSummary = (
   //    <div css={tw`grid grid-cols-2`}>
   //       <div>
   //          {'📅'}
   //          {goalValue.primary}
   //       </div>
   //       <div>
   //          {'🔢'}
   //          {targetValue.primary}
   //       </div>
   //    </div>
   // );

   const aggregateAccordion = (
      <Accordion {...getAccordionProps('aggregateAccordion')}>
         <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2a-header">
            <ScheduleSummary icon={'📅'} summaryName={aggregationValue.primary} summaryValue={goalValue.alternate ?? goalValue.primary}></ScheduleSummary>
         </AccordionSummary>
         <AccordionDetails>
            <RecurrenceRepetition {...state}></RecurrenceRepetition>
         </AccordionDetails>
      </Accordion>
   );

   const goalAccordion = (
      <Accordion {...getAccordionProps('goalAccordion')}>
         <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2a-header">
            <ScheduleSummary icon={'🎯'} summaryName={goalName} summaryValue={targetValue.primary}></ScheduleSummary>
         </AccordionSummary>
         <AccordionDetails>
            <RecurrenceTarget {...state}></RecurrenceTarget>
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
