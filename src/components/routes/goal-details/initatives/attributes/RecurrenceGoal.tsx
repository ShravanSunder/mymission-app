import { faCalendarAlt, faCalendarPlus, faCalendarWeek, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { EventNote } from '@material-ui/icons';
import { FC, Fragment, ReactNode, useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { SubjectWithValue } from '~~/components/common/core/hooks/useSubjectValue';
import { CommonPopover } from '~~/components/common/CommonPopover';
import { IDisplayText } from '~~/models/IDisplayText';
import { muiIconCss } from '~~/helpers/muiIconCss';
import { formatGoalForDisplay } from './core/recurrence.facade';
import { availableDurations } from './core/recurrence.funcs';
import { RecurrenceAggregationPeriods, RecurrenceDurationTypes } from './core/recurrence.types';
import { DaysOfWeek } from './core/schedule.types';

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
      return <EventNote css={muiIconCss}></EventNote>;
   }
};

export const RecurrenceGoal: FC<IRecurrenceGoalProps> = (props) => {
   /**
    * TODO: replace colors
    */
   const tempColorSelectedDay = 'bg-gray-200';
   const intl = useIntl();
   const [selectedDuration, setSelectedDuration] = useState<ReactNode>(<div></div>);

   const handleSelectedDuration = (m: RecurrenceDurationTypes, text: IDisplayText) => {
      const selected = (
         <ListItem>
            <ListItemAvatar>
               <Avatar>
                  <DurationIcons duration={m}></DurationIcons>
               </Avatar>
            </ListItemAvatar>
            <ListItemText primary={text.primary} />
         </ListItem>
      );
      setSelectedDuration(selected);
   };

   useEffect(() => {
      const text = formatGoalForDisplay(intl, props.aggregationPeriod.value, props.durationType.value);
      handleSelectedDuration(props.durationType.value, text);
   }, [intl, props.aggregationPeriod.value, props.durationType.value]);

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
                        <Avatar>
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
            <CommonPopover selected={selectedDuration}>
               <List>{durationList}</List>
            </CommonPopover>
         </div>
         {/* <div className="w-full overflow-hidden overflow-y-auto grid grid-cols-1 max-h-80">
            <PickTarget {...props}></PickTarget>
         </div> */}
      </>
   );
};
