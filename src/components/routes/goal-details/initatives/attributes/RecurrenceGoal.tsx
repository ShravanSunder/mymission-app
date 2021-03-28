import React, { FC } from 'react';

import { DaysOfWeek } from './core/schedule.types';
import { RecurrenceDurationList, RecurrenceDurationTypes } from './core/recurrence.types';
import { PickTarget as PickTarget } from './PickTarget';
import { SubjectWithValue } from '~~/components/common/core/hooks/useSubjectValue';
import { Typography, List } from '@material-ui/core';

export interface IRecurrenceGoalProps {
   /**
    * The type of repetition.  ie Days per week, days per month
    */
   durationType: SubjectWithValue<RecurrenceDurationTypes>;
   /**
    * Number: Number of times per repetition.
    * Days of Week:  When repetition type is SpecificDaysOfWeek, it can be an DaysOfWeek[]
    */
   target: SubjectWithValue<number | DaysOfWeek[]>;
}

export const RecurrenceGoal: FC<IRecurrenceGoalProps> = (props) => {
   /**
    * TODO: replace colors
    */
   const tempColorSelectedDay = 'bg-gray-200';

   const duration = <></>;

   // {
   //    RecurrenceDurationList.map((m: RecurrenceDurationTypes, i: number) => {
   //       const text = formatSumm(intl, m);
   //       const handleClick = () => {
   //          props.aggregationPeriod.push(m);
   //       };

   //       return (
   //          <ListItem key={m.toString() + i.toString()} selected={m === props.aggregationPeriod.value} button onClick={() => handleClick()}>
   //             <ListItemAvatar>
   //                <Avatar>
   //                   <AggregationIcons period={m}></AggregationIcons>
   //                </Avatar>
   //             </ListItemAvatar>
   //             <ListItemText primary={text.primary} secondary={text.secondary} />
   //          </ListItem>
   //       );
   //    });
   // }

   return (
      <>
         <div className="w-full overflow-hidden overflow-y-auto grid grid-cols-1 max-h-80">
            <Typography variant="h4" className="text-center">
               How you want to count your habits?
            </Typography>
            <List>{duration}</List>
         </div>
         <div className="w-full overflow-hidden overflow-y-auto grid grid-cols-1 max-h-80">
            <PickTarget {...props}></PickTarget>
         </div>
      </>
   );
};
