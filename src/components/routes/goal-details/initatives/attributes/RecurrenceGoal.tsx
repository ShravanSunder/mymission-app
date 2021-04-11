import { Typography } from '@material-ui/core';
import React, { FC, MouseEvent } from 'react';
import { useIntl } from 'react-intl';
import tw from 'twin.macro';

import { formatGoalCategoryForDisplay, formatGoalTargetCountForDisplay } from './core/recurrence.facade';

import { IconFlexItem, IconFlexItemProps, IconFlexList } from '~~/components/common/IconFlexList';
import { LabelWithStepper } from '~~/components/common/LabelWithStepper';
import { TwemojiInlineLazy } from '~~/components/common/TwemojiLazy';
import { RecurrenceGoalCategory, habitCategoryList } from '~~/components/routes/goal-details/initatives/attributes/core/recurrence.types';
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

   const items = habitCategoryList.map((m) => {
      const category = formatGoalCategoryForDisplay(intl, m);
      const itemProps: IconFlexItemProps<RecurrenceGoalCategory> = {
         selected: [RecurrenceGoalCategory.PositiveTarget],
         index: m,
         display: <TwemojiInlineLazy text={category.emoji} grayscale></TwemojiInlineLazy>,
         handleChange: (newValue: RecurrenceGoalCategory) => {},
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
         <div className="w-full grid grid-row-1 grid-col-1 justify-items-center">
            <IconFlexList>{items}</IconFlexList>
         </div>
         <LabelWithStepper className="m-2 " title={targetValue.primary} handleClick={handleStepperClick}></LabelWithStepper>
      </div>
   );
};
