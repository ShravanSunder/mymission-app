import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useObservableState } from 'observable-hooks';
import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { formatTargetGoalForDisplay, formatRecurrenceGoalForDisplay, formatRepetitionAggregationForDisplay } from './core/recurrence.facade';
import { IRecurrenceObservables, useInitiativeSchedule } from './core/useInitiativeSchedule';
import { RecurrenceRepetition as RecurrenceRepetition } from './RecurrenceRepetition';
import { RecurrenceTarget } from './RecurrenceTarget';
import { ScheduleSummary } from './ScheduleSummary';

import { useControlledAccordion } from '~~/components/common/core/hooks/useControlledAccordion';
import { IDisplayText, defaultIDisplayText } from '~~/models/IDisplayText';

export const InitativeSchedule: FC = () => {
   /**
    * TODO: replace color
    */
   const tempColorIcons = 'bg-gray-200';

   const getAccordionProps = useControlledAccordion();
   const intl = useIntl();

   const state: IRecurrenceObservables = useInitiativeSchedule();
   const aggregationValue = { primary: '' }; // formatRepetitionAggregationForDisplay(intl, state.period.value);

   const periodName = intl.formatMessage({ defaultMessage: 'Habit Repetition' });

   const goalName = intl.formatMessage({ defaultMessage: 'Goal' });
   const [goalValue] = useObservableState<IDisplayText>(
      () =>
         combineLatest([state.period.subject$, state.repetition.subject$, state.target.subject$, state.targetGoal.subject$]).pipe(
            map(([period, duration, target, targetGoal]) => formatRecurrenceGoalForDisplay(intl, period, duration, target, targetGoal))
         ),
      defaultIDisplayText()
   );

   console.log('initativeSchedule', goalValue);

   const [targetValue] = useObservableState<IDisplayText>(
      () =>
         combineLatest([
            state.period.subject$,
            state.repetition.subject$,
            state.target.subject$,
            state.targetGoal.subject$,
            state.targetCategory.subject$,
         ]).pipe(
            map(([period, duration, target, targetGoal, targetGoalCategory]) =>
               formatTargetGoalForDisplay(intl, period, duration, target, targetGoal, targetGoalCategory)
            )
         ),
      defaultIDisplayText()
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
