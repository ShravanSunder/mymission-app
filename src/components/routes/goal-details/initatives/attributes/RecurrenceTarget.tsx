import { Typography } from '@material-ui/core';
import { useObservableState } from 'observable-hooks';
import React, { FC, MouseEvent } from 'react';
import { useIntl } from 'react-intl';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import tw from 'twin.macro';

import { formatTargetCategoryForDisplay, formatTargetGoalForDisplay } from './core/recurrence.facade';

import { IconFlexItem, IconFlexItemProps, IconFlexList } from '~~/components/common/IconFlexList';
import { LabelWithStepper } from '~~/components/common/LabelWithStepper';
import { TwemojiInlineLazy } from '~~/components/common/TwemojiLazy';
import { RecurrenceGoalCategoryType, habitCategoryList } from '~~/components/routes/goal-details/initatives/attributes/core/recurrence.types';
import { IRecurrenceObservables } from '~~/components/routes/goal-details/initatives/attributes/core/useInitiativeSchedule';
import { IDisplayText, defaultIDisplayText } from '~~/models/IDisplayText';

/**
 * see @IRecurrenceObservables for detailed comments on props
 */
export type IRecurrenceTargetProps = IRecurrenceObservables;

const TargetCategory: FC<IRecurrenceTargetProps> = (props) => {
   const intl = useIntl();

   const items = habitCategoryList.map((m) => {
      const category = formatTargetCategoryForDisplay(intl, m);
      const itemProps: IconFlexItemProps<RecurrenceGoalCategoryType> = {
         selected: [props.targetCategory.value],
         index: m,
         display: <TwemojiInlineLazy text={category.emoji} grayscale></TwemojiInlineLazy>,
         handleChange: (newValue: RecurrenceGoalCategoryType) => {
            props.targetCategory.next(newValue);
         },
      };
      return <IconFlexItem {...itemProps} key={m}></IconFlexItem>;
   });

   return (
      <div className="w-full grid grid-row-1 grid-col-1 justify-items-center">
         <IconFlexList>{items}</IconFlexList>
      </div>
   );
};

export const RecurrenceTarget: FC<IRecurrenceTargetProps> = (props) => {
   /**
    * TODO: replace colors
    */
   // const tempColorSelectedDay = 'bg-gray-200';
   const intl = useIntl();

   const [targetValue] = useObservableState<IDisplayText>(
      () =>
         combineLatest([
            props.period.subject$,
            props.repetition.subject$,
            props.target.subject$,
            props.targetGoal.subject$,
            props.targetCategory.subject$,
         ]).pipe(
            map(([period, duration, target, targetGoal, targetGoalCategory]) =>
               formatTargetGoalForDisplay(intl, period, duration, target, targetGoal, targetGoalCategory)
            )
         ),
      defaultIDisplayText()
   );

   const handleStepperClick = (event: MouseEvent, action: 'add' | 'remove'): void => {
      switch (action) {
         case 'add':
            props.targetGoal.next((value) => value + 1);
            break;
         case 'remove':
            props.targetGoal.next((value) => (value > 1 ? value - 1 : 1));
      }
   };

   return (
      <div className="w-full p-1 overflow-hidden overflow-y-auto grid grid-cols-1">
         <div className="w-full p-1">
            <Typography variant="h4" className="p-2 text-center">
               {intl.formatMessage({ defaultMessage: 'What do you want to acheive?' })}
            </Typography>
         </div>
         <TargetCategory {...props}></TargetCategory>
         <LabelWithStepper className="m-2 " title={targetValue.primary} handleClick={handleStepperClick}></LabelWithStepper>
      </div>
   );
};
