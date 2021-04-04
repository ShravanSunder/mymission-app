import { faCalendarAlt, faCalendarPlus, faCalendarWeek, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Fade, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { EventNote } from '@material-ui/icons';
import { useSubscription } from 'observable-hooks';
import { FC, Fragment, useState } from 'react';
import { useIntl } from 'react-intl';
import { combineLatest } from 'rxjs';
import { SubjectWithTransform } from '~~/components/common/core/hooks/useSubjectTransform';
import { SubjectWithValue } from '~~/components/common/core/hooks/useSubjectValue';
import { DropDownContainer, toggleGroup } from '~~/components/common/DropDownContainer';
import { RecurrenceTarget } from '~~/components/routes/goal-details/initatives/attributes/RecurrenceTarget';
import { getAsNumber } from '~~/helpers/conversion';
import { muiIconCss } from '~~/helpers/muiIconCss';
import { formatAggregationPeriodForUnits, formatDurationForDisplay, formatRecurrenceSummaryForDisplay } from './core/recurrence.facade';
import { availableDurations } from './core/recurrence.funcs';
import { RecurrenceAggregationPeriods, RecurrenceDurationTypes, TRecurrenceTarget } from './core/recurrence.types';
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
   durationType: SubjectWithTransform<RecurrenceDurationTypes>;
   /**
    * Number: Number of times per repetition.
    * Days of Week:  When repetition type is SpecificDaysOfWeek, it can be an DaysOfWeek[]
    */
   target: SubjectWithTransform<TRecurrenceTarget>;
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
   const [selectedDurationText, setSelectedDurationText] = useState<string>('');
   const [showDurationDropDown, setShowDurationDropDown] = useState(false);
   const [showTargetDropDown, setShowTargetDropDown] = useState(false);

   const updateDurationText = (duration: RecurrenceDurationTypes, target: TRecurrenceTarget) => {
      const text = formatDurationForDisplay(intl, props.aggregationPeriod.value, duration, target);
      setSelectedDurationText(text.primary);
   };

   useSubscription(props.durationType.source$, () => setShowDurationDropDown(false));
   useSubscription(combineLatest([props.durationType.subject$, props.target.subject$]), ([duration, target]) => updateDurationText(duration, target));

   const goalValue = formatRecurrenceSummaryForDisplay(intl, props.aggregationPeriod.value, props.durationType.value, props.target.value);

   const periodUnits = formatAggregationPeriodForUnits(intl, props.aggregationPeriod.value);

   // todo this list depends on what's allowed by aggregation date
   const durationList = (
      <List className="elevation-2">
         {availableDurations(props.aggregationPeriod.value).map((m: RecurrenceDurationTypes, i: number) => {
            const text = formatDurationForDisplay(intl, props.aggregationPeriod.value, m, props.target.value);
            const handleClick = () => {
               props.durationType.next(m);
            };

            return (
               <Fragment key={i}>
                  <ListItem key={i} selected={m === props.durationType.value} onClick={() => handleClick()} button>
                     <ListItemAvatar>
                        <Avatar>
                           <DurationIcons duration={m}></DurationIcons>
                        </Avatar>
                     </ListItemAvatar>
                     <ListItemText primary={text.alternate ?? text.primary} />
                  </ListItem>
               </Fragment>
            );
         })}
      </List>
   );

   return (
      <>
         <div className="w-full overflow-hidden overflow-y-auto grid grid-cols-1 max-h-80">
            <Typography variant="h4" className="text-center">
               {intl.formatMessage({ defaultMessage: 'What is your target goal?' })}
            </Typography>
            <Typography variant="body1" className="">
               {intl.formatMessage({ defaultMessage: 'How often do you want have a successful {periodUnits}' }, { periodUnits })}
            </Typography>
         </div>
         <div className="p-1"></div>
         <DropDownContainer
            show={showDurationDropDown}
            toggle={() => toggleGroup(setShowDurationDropDown, setShowTargetDropDown)}
            className="m-2"
            selectedItemText={selectedDurationText}>
            {durationList}
         </DropDownContainer>
         <DropDownContainer
            show={showTargetDropDown}
            toggle={() => toggleGroup(setShowTargetDropDown, setShowDurationDropDown)}
            className="m-2"
            selectedItemText={goalValue.primary}>
            <div className="w-full p-2 overflow-hidden overflow-y-auto grid grid-cols-1 max-h-56 box-border">
               {showTargetDropDown && <RecurrenceTarget {...props}></RecurrenceTarget>}
            </div>
         </DropDownContainer>
      </>
   );
};
