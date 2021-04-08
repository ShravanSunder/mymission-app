import { Typography } from '@material-ui/core';
import { FC, useState, MouseEvent } from 'react';
import { useIntl } from 'react-intl';

import { formatRepetitionAggregationForUnits, formatRecurrenceGoalForDisplay, formatGoalTargetCountForDisplay } from './core/recurrence.facade';

import { DropDownContainer, toggleGroup } from '~~/components/common/DropDownContainer';
import { LabelWithStepper } from '~~/components/common/LabelWithStepper';
import { IRecurrenceObservables } from '~~/components/routes/goal-details/initatives/attributes/core/useInitiativeSchedule';
import { RecurrenceGoalTarget } from '~~/components/routes/goal-details/initatives/attributes/RecurrenceGoalTarget';

/**
 * see @IRecurrenceObservables for detailed comments on props
 */
export type IRecurrenceGoalProps = IRecurrenceObservables;

export const RecurrenceGoal: FC<IRecurrenceGoalProps> = (props) => {
   /**
    * TODO: replace colors
    */
   // const tempColorSelectedDay = 'bg-gray-200';
   const intl = useIntl();

   const targetValue = formatGoalTargetCountForDisplay(intl, props.period.value, props.repetition.value, props.goalTarget.value, props.goalTargetCount.value);

   const handleStepperClick = (event: MouseEvent, action: 'add' | 'remove'): void => {
      switch (action) {
         case 'add':
            props.goalTargetCount.next((value) => value + 1);
            break;
         case 'remove':
            props.goalTargetCount.next((value) => (value > 1 ? value - 1 : 1));
      }
   };

   return (
      <>
         <div className="w-full p-1 overflow-hidden overflow-y-auto grid grid-cols-1 max-h-80">
            <Typography variant="h4" className="p-2 text-center">
               {intl.formatMessage({ defaultMessage: 'What do you want to acheive?' })}
            </Typography>
         </div>
         <div className="p-1"></div>
         <LabelWithStepper className="m-2 " title={targetValue.primary} handleClick={handleStepperClick}></LabelWithStepper>
      </>
   );
};
