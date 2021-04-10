import { Typography } from '@material-ui/core';
import { FC, MouseEvent } from 'react';
import { useIntl } from 'react-intl';

import { formatGoalTargetCountForDisplay } from './core/recurrence.facade';

import { IconFlexItem, IconFlexItemProps, IconFlexItemProps, IconFlexList } from '~~/components/common/IconFlexList';
import { LabelWithStepper } from '~~/components/common/LabelWithStepper';
import { HabitGoalCategory, HabitGoalCategoryList } from '~~/components/routes/goal-details/initatives/attributes/core/recurrence.types';
import { IRecurrenceObservables } from '~~/components/routes/goal-details/initatives/attributes/core/useInitiativeSchedule';

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

   const items = HabitGoalCategoryList.map((m) => {
      const itemProps: IconFlexItemProps<HabitGoalCategory> = {
         selected: [HabitGoalCategory.PositiveCount],
         index: m,
         display: m.substr(0, 1),
         handleChange: (newValue: HabitGoalCategory) => {},
      };
      return <IconFlexItem {...itemProps} key={m}></IconFlexItem>;
   });

   return (
      <div className="w-full p-1 overflow-hidden overflow-y-auto grid grid-cols-1">
         <div className="w-full p-1">
            <Typography variant="h4" className="p-2 text-center">
               {intl.formatMessage({ defaultMessage: 'What do you want to acheive?' })}
            </Typography>
         </div>
         <IconFlexList>{items}</IconFlexList>
         <LabelWithStepper className="m-2 " title={targetValue.primary} handleClick={handleStepperClick}></LabelWithStepper>
      </div>
   );
};
