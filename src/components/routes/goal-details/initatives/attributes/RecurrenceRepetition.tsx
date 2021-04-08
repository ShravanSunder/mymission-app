import { faCalendarAlt, faCalendarDay, faCalendarWeek } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { useObservableState, useSubscription } from 'observable-hooks';
import React, { FC, Fragment, useState } from 'react';
import { useIntl } from 'react-intl';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { formatRecurrenceGoalForDisplay, formatRepetitionAggregationForDisplay, formatRepetitionForDisplay } from './core/recurrence.facade';
import { RecurrenceRepetitionAggregationList, RecurrenceRepetitionAggregation, RecurrenceRepetitionType } from './core/recurrence.types';

import { DropDownContainer, toggleGroup } from '~~/components/common/DropDownContainer';
import { availableDurations } from '~~/components/routes/goal-details/initatives/attributes/core/recurrence.funcs';
import { IRecurrenceObservables } from '~~/components/routes/goal-details/initatives/attributes/core/useInitiativeSchedule';
import { DurationIcons } from '~~/components/routes/goal-details/initatives/attributes/DurationIcons';
import { RecurrenceGoalTarget } from '~~/components/routes/goal-details/initatives/attributes/RecurrenceGoalTarget';
import { defaultIDisplayText, IDisplayText } from '~~/models/IDisplayText';

/**
 * see @IRecurrenceObservables for detailed comments on props
 */
export type IRecurrenceRepetitionProps = IRecurrenceObservables;

const AggregationIcons: FC<{ period: RecurrenceRepetitionAggregation }> = (props) => {
   if (props.period === RecurrenceRepetitionAggregation.PerDay) {
      return <FontAwesomeIcon fixedWidth={true} className="w-full h-full" icon={faCalendarDay} />;
   } else if (props.period === RecurrenceRepetitionAggregation.PerWeek) {
      return <FontAwesomeIcon fixedWidth={true} className="w-full h-full" icon={faCalendarWeek} />;
   } else if (props.period === RecurrenceRepetitionAggregation.PerMonth) {
      return <FontAwesomeIcon fixedWidth={true} className="w-full h-full" icon={faCalendarAlt} />;
   } else {
      return null;
   }
};

export const RecurrenceRepetition: FC<IRecurrenceRepetitionProps> = (props) => {
   const intl = useIntl();

   const [selectedPeriodText] = useObservableState(
      () => props.period.subject$.pipe(map((period) => formatRepetitionAggregationForDisplay(intl, period))),
      () => defaultIDisplayText()
   );
   const [selectedDurationText] = useObservableState<IDisplayText>(
      () =>
         combineLatest([props.period.subject$, props.repetition.subject$, props.goalTarget.subject$]).pipe(
            map(([period, duration, target]) => formatRepetitionForDisplay(intl, period, duration, target))
         ),
      defaultIDisplayText()
   );

   const [showPeriodDropDown, setShowPeriodDropDown] = useState(false);
   useSubscription(props.period.subject$, () => {
      setShowPeriodDropDown(false);
   });
   const [showDurationDropDown, setShowDurationDropDown] = useState(false);
   useSubscription(props.repetition.source$, () => setShowDurationDropDown(false));
   const [showTargetDropDown, setShowTargetDropDown] = useState(false);

   const goalValue = formatRecurrenceGoalForDisplay(intl, props.period.value, props.repetition.value, props.goalTarget.value, props.goalTargetCount.value);

   const periods = (
      <List>
         {RecurrenceRepetitionAggregationList.map((m: RecurrenceRepetitionAggregation, i: number) => {
            const text = formatRepetitionAggregationForDisplay(intl, m);
            const handleClick = () => {
               props.period.next(m);
            };

            return (
               <ListItem key={m.toString() + i.toString()} selected={m === props.period.value} button onClick={() => handleClick()}>
                  <ListItemAvatar>
                     <Avatar>
                        <AggregationIcons period={m}></AggregationIcons>
                     </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={text.primary} secondary={text.description} />
               </ListItem>
            );
         })}
      </List>
   );

   // const goalValue = formatRecurrenceGoalForDisplay(intl, props.period.value, props.duration.value, props.target.value);

   // const periodUnits = formatAggregationPeriodForUnits(intl, props.period.value).toLowerCase();

   const durationList = (
      <List className="elevation-2">
         {availableDurations(props.period.value)
            .sort()
            .map((m: RecurrenceRepetitionType, i: number) => {
               const text = formatRepetitionForDisplay(intl, props.period.value, m, props.goalTarget.value);
               const handleClick = () => {
                  props.repetition.next(m);
               };

               return (
                  <Fragment key={i}>
                     <ListItem key={i} selected={m === props.repetition.value} onClick={() => handleClick()} button>
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
      <div className="w-full p-1 overflow-hidden overflow-y-auto grid grid-cols-1">
         <div className="w-full p-1">
            <Typography variant="h4" className="text-center">
               {intl.formatMessage({ defaultMessage: 'How you want to count your habit?' })}
            </Typography>
         </div>
         <DropDownContainer
            show={showPeriodDropDown}
            toggle={() => toggleGroup(setShowPeriodDropDown, [setShowDurationDropDown, setShowTargetDropDown])}
            className="m-2"
            selectedItemText={selectedPeriodText.primary}>
            {periods}
         </DropDownContainer>
         <div className="w-full p-1 pt-4">
            <Typography variant="h4" className="text-center">
               {intl.formatMessage({ defaultMessage: 'What is your intention to practice your habit?' })}
            </Typography>
         </div>
         <DropDownContainer
            show={showDurationDropDown}
            toggle={() => toggleGroup(setShowDurationDropDown, [setShowPeriodDropDown, setShowTargetDropDown])}
            className="m-2"
            selectedItemText={selectedDurationText.primary}>
            {durationList}
         </DropDownContainer>

         <DropDownContainer
            show={showTargetDropDown}
            toggle={() => toggleGroup(setShowTargetDropDown, [setShowDurationDropDown, setShowPeriodDropDown])}
            className="m-2 "
            selectedItemText={goalValue.primary}>
            <div className="w-full p-2 overflow-hidden overflow-y-auto grid grid-cols-1 max-h-56 box-border">
               {showTargetDropDown && <RecurrenceGoalTarget {...props}></RecurrenceGoalTarget>}
            </div>
         </DropDownContainer>
      </div>
   );
};
