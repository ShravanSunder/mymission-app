import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { SubjectWithValue } from '~~/components/common/core/hooks/useSubjectValue';
import { formatGoalForDisplay } from './core/recurrence.facade';
import { RecurrenceAggregationPeriods, RecurrenceDurationList, RecurrenceDurationTypes } from './core/recurrence.types';
import { DaysOfWeek } from './core/schedule.types';
import { PickTarget as PickTarget } from './PickTarget';

export interface IRecurrenceGoalProps {
   /**
    * Number: Number of times per repetition.
    * Days of Week:  When repetition type is SpecificDaysOfWeek, it can be an DaysOfWeek[]
    */
   aggregationPeriod: SubjectWithValue<RecurrenceAggregationPeriods>;
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

const AggregationIcons: FC<{ duration: RecurrenceDurationTypes }> = (props) => {
   if (props.duration === RecurrenceDurationTypes.Weekly) {
      return <FontAwesomeIcon fixedWidth={true} className="w-full h-full" icon={faCalendarWeek} />;
   } else {
      return <FontAwesomeIcon fixedWidth={true} className="w-full h-full" icon={faCalendarWeek} />;
   }
};

export const RecurrenceGoal: FC<IRecurrenceGoalProps> = (props) => {
   /**
    * TODO: replace colors
    */
   const tempColorSelectedDay = 'bg-gray-200';

   const intl = useIntl();

   const durationList = (
      <>
         {RecurrenceDurationList.map((m: RecurrenceDurationTypes, i: number) => {
            const text = formatGoalForDisplay(intl, props.aggregationPeriod.value, m);
            const handleClick = () => {
               props.durationType.push(m);
            };

            return (
               <>
                  <ListItem key={m.toString() + i.toString()} selected={m === props.durationType.value} onClick={() => handleClick()}>
                     <ListItemAvatar>
                        <Avatar>{/* <DurationIcons period={m}></DurationIcons> */}</Avatar>
                     </ListItemAvatar>
                     <ListItemText primary={text.primary} />
                  </ListItem>
               </>
            );
         })}
      </>
   );

   return (
      <>
         <div className="w-full overflow-hidden overflow-y-auto grid grid-cols-1 max-h-80">
            <Typography variant="h4" className="text-center">
               {intl.formatMessage({ defaultMessage: 'What is your target goal?' })}
            </Typography>
            <List>{durationList}</List>
         </div>
         {/* <div className="w-full overflow-hidden overflow-y-auto grid grid-cols-1 max-h-80">
            <PickTarget {...props}></PickTarget>
         </div> */}
      </>
   );
};
