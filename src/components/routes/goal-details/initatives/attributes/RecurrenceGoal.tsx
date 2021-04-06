import { Avatar, Fade, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { useSubscription } from 'observable-hooks';
import { FC, Fragment, useState } from 'react';
import { useIntl } from 'react-intl';
import { combineLatest } from 'rxjs';
import { SubjectWithTransform } from '~~/components/common/core/hooks/useSubjectTransform';
import { SubjectWithValue } from '~~/components/common/core/hooks/useSubjectValue';
import { DropDownContainer, toggleGroup } from '~~/components/common/DropDownContainer';
import { RecurrenceTarget } from '~~/components/routes/goal-details/initatives/attributes/RecurrenceTarget';
import { getAsNumber } from '~~/helpers/conversion';
import { formatAggregationPeriodForUnits, formatDurationForDisplay, formatRecurrenceGoalForDisplay } from './core/recurrence.facade';
import { availableDurations } from './core/recurrence.funcs';
import { RecurrenceAggregationPeriods, RecurrenceDurationType, TRecurrenceTarget } from './core/recurrence.types';
import { DaysOfWeek } from './core/schedule.types';
import { DurationIcons } from './DurationIcons';

/**
 * see @IRecurrenceObservables for detailed comments on props
 */
export interface IRecurrenceGoalProps {
   period: SubjectWithValue<RecurrenceAggregationPeriods>;
   duration: SubjectWithTransform<RecurrenceDurationType>;
   target: SubjectWithTransform<TRecurrenceTarget>;
}

export const RecurrenceGoal: FC<IRecurrenceGoalProps> = (props) => {
   /**
    * TODO: replace colors
    */
   const tempColorSelectedDay = 'bg-gray-200';
   const intl = useIntl();
   const [selectedDurationText, setSelectedDurationText] = useState<string>('');
   const [showDurationDropDown, setShowDurationDropDown] = useState(false);
   const [showTargetDropDown, setShowTargetDropDown] = useState(false);

   const updateDurationText = (duration: RecurrenceDurationType, target: TRecurrenceTarget) => {
      const text = formatDurationForDisplay(intl, props.period.value, duration, target);
      setSelectedDurationText(text.primary);
   };

   useSubscription(props.duration.source$, () => setShowDurationDropDown(false));
   useSubscription(combineLatest([props.duration.subject$, props.target.subject$]), ([duration, target]) => updateDurationText(duration, target));

   const goalValue = formatRecurrenceGoalForDisplay(intl, props.period.value, props.duration.value, props.target.value);

   const periodUnits = formatAggregationPeriodForUnits(intl, props.period.value).toLowerCase();

   const durationList = (
      <List className="elevation-2">
         {availableDurations(props.period.value)
            .sort()
            .map((m: RecurrenceDurationType, i: number) => {
               const text = formatDurationForDisplay(intl, props.period.value, m, props.target.value);
               const handleClick = () => {
                  props.duration.next(m);
               };

               return (
                  <Fragment key={i}>
                     <ListItem key={i} selected={m === props.duration.value} onClick={() => handleClick()} button>
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
         <div className="w-full p-2 overflow-hidden overflow-y-auto grid grid-cols-1 max-h-80">
            <Typography variant="h4" className="p-2 text-center">
               {intl.formatMessage({ defaultMessage: 'What is your target goal?' })}
            </Typography>
            <Typography variant="body1" className="p-1">
               {intl.formatMessage({ defaultMessage: 'What is your goal to meet for success?  How often do you want to hit your goal? ' }, { periodUnits })}
            </Typography>
         </div>
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
