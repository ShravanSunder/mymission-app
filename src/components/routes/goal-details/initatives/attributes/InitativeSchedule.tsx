import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { formatRecurrenceGoalForDisplay, formatRepetitionAggregationForDisplay, formatTargetGoalForDisplay } from './core/recurrence.facade';
import { useInitiativeSchedule } from './core/useInitiativeSchedule';
import { RecurrenceRepetition as RecurrenceRepetition } from './RecurrenceRepetition';
import { RecurrenceTarget } from './RecurrenceTarget';
import { ScheduleSummary } from './ScheduleSummary';

import { useControlledAccordion } from '~~/components/common/core/hooks/useControlledAccordion';
import { IInitativeRecurrence } from '~~/components/routes/goal-details/initatives/attributes/core/initativeSchedule.types';
import { TAtomState } from '~~/models/TRecoilState';

export const InitativeSchedule: FC = () => {
   /**
    * TODO: replace color
    */
   const tempColorIcons = 'bg-gray-200';

   const getAccordionProps = useControlledAccordion();
   const intl = useIntl();

   const state: TAtomState<IInitativeRecurrence> = useInitiativeSchedule();

   const periodName = intl.formatMessage({ defaultMessage: 'Habit Repetition' });
   const goalName = intl.formatMessage({ defaultMessage: 'Goal' });

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
