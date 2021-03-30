/** @jsxImportSource @emotion/react */
import { faCalendarWeek, faCalendarPlus, faCalendarAlt, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { EventNote } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import React, { FC, Fragment } from 'react';
import { useIntl } from 'react-intl';
import { SubjectWithValue } from '~~/components/common/core/hooks/useSubjectValue';
import { formatGoalForDisplay } from './core/recurrence.facade';
import { RecurrenceAggregationPeriods, RecurrenceDurationList, RecurrenceDurationTypes } from './core/recurrence.types';
import { DaysOfWeek } from './core/schedule.types';
import { PickTarget } from './PickTarget';
import { availableDurations } from './core/recurrence.funcs';
import { css } from 'twin.macro';

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

const DurationIcons: FC<{ duration: RecurrenceDurationTypes }> = (props) => {
   if (props.duration === RecurrenceDurationTypes.Weekly) {
      return <FontAwesomeIcon fixedWidth={true} className="w-full h-full" icon={faCalendarWeek} />;
   } else if (props.duration === RecurrenceDurationTypes.SpecificDaysOfWeek) {
      return <FontAwesomeIcon fixedWidth={true} className="w-full h-full" icon={faCalendarPlus} />;
   } else if (props.duration === RecurrenceDurationTypes.Monthly) {
      return <FontAwesomeIcon fixedWidth={true} className="w-full h-full" icon={faCalendarAlt} />;
   } else if (props.duration === RecurrenceDurationTypes.Quarterly) {
      return <FontAwesomeIcon fixedWidth={true} className="w-full h-full" icon={faThLarge} />;
   } else {
      return (
         <div>
            <EventNote css={css({ width: '1.5em', height: '1.5em' })}></EventNote>
         </div>
      );
   }
};

export const RecurrenceGoal: FC<IRecurrenceGoalProps> = (props) => {
   /**
    * TODO: replace colors
    */
   const tempColorSelectedDay = 'bg-gray-200';

   const intl = useIntl();

   // todo this list depends on what's allowed by aggregation date
   const durationList = (
      <>
         {availableDurations(props.aggregationPeriod.value).map((m: RecurrenceDurationTypes, i: number) => {
            const text = formatGoalForDisplay(intl, props.aggregationPeriod.value, m);
            const handleClick = () => {
               props.durationType.push(m);
            };

            return (
               <Fragment key={i}>
                  <ListItem key={i} selected={m === props.durationType.value} onClick={() => handleClick()} button>
                     <ListItemAvatar>
                        <Avatar css={css({ height: '1rem', width: '1rem' })}>
                           <DurationIcons duration={m}></DurationIcons>
                        </Avatar>
                     </ListItemAvatar>
                     <ListItemText primary={text.primary} />
                  </ListItem>
               </Fragment>
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
