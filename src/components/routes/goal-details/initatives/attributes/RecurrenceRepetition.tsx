import { faCalendarAlt, faCalendarDay, faCalendarWeek } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, duration, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { useObservableState, useSubscription } from 'observable-hooks';
import React, { FC, Fragment, useState } from 'react';
import { useIntl } from 'react-intl';
import { combineLatest } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
import { SubjectWithTransform } from '~~/components/common/core/hooks/useSubjectTransform';
import { SubjectWithValue } from '~~/components/common/core/hooks/useSubjectValue';
import { DropDownContainer, toggleGroup } from '~~/components/common/DropDownContainer';
import { availableDurations } from '~~/components/routes/goal-details/initatives/attributes/core/recurrence.funcs';
import { DurationIcons } from '~~/components/routes/goal-details/initatives/attributes/DurationIcons';
import { defaultIDisplayText, IDisplayText } from '~~/models/IDisplayText';
import {
   formatAggregationPeriodForDisplay,
   formatAggregationPeriodForUnits,
   formatDurationForDisplay,
   formatRecurrenceGoalForDisplay,
} from './core/recurrence.facade';
import { RecurrenceAggregationPeriodList, RecurrenceAggregationPeriods, RecurrenceDurationType, TRecurrenceTarget } from './core/recurrence.types';

/**
 * see @IRecurrenceObservables for detailed comments on props
 */
export interface IRecurrenceAggregationPeriodProps {
   period: SubjectWithValue<RecurrenceAggregationPeriods>;
   duration: SubjectWithTransform<RecurrenceDurationType>;
   target: SubjectWithTransform<TRecurrenceTarget>;
}

const AggregationIcons: FC<{ period: RecurrenceAggregationPeriods }> = (props) => {
   if (props.period === RecurrenceAggregationPeriods.PerDay) {
      return <FontAwesomeIcon fixedWidth={true} className="w-full h-full" icon={faCalendarDay} />;
   } else if (props.period === RecurrenceAggregationPeriods.PerWeek) {
      return <FontAwesomeIcon fixedWidth={true} className="w-full h-full" icon={faCalendarWeek} />;
   } else if (props.period === RecurrenceAggregationPeriods.PerMonth) {
      return <FontAwesomeIcon fixedWidth={true} className="w-full h-full" icon={faCalendarAlt} />;
   } else {
      return null;
   }
};

export const RecurrenceAggregationPeriod: FC<IRecurrenceAggregationPeriodProps> = (props) => {
   const intl = useIntl();

   const [selectedPeriodText] = useObservableState(
      () => props.period.subject$.pipe(map((period) => formatAggregationPeriodForDisplay(intl, period))),
      () => defaultIDisplayText()
   );
   const [selectedDurationText] = useObservableState<IDisplayText>(
      () =>
         combineLatest([props.period.subject$, props.duration.subject$, props.target.subject$]).pipe(
            map(([period, duration, target]) => formatDurationForDisplay(intl, period, duration, target))
         ),
      defaultIDisplayText()
   );

   const [showPeriodDropDown, setShowPeriodDropDown] = useState(false);
   useSubscription(props.period.subject$, () => setShowPeriodDropDown(false));
   const [showDurationDropDown, setShowDurationDropDown] = useState(false);
   useSubscription(props.duration.source$, () => setShowDurationDropDown(false));

   const periods = (
      <List>
         {RecurrenceAggregationPeriodList.map((m: RecurrenceAggregationPeriods, i: number) => {
            const text = formatAggregationPeriodForDisplay(intl, m);
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
      <div className="w-full p-1 overflow-hidden overflow-y-auto grid grid-cols-1 max-h-96">
         <Typography variant="h4" className="text-center">
            {intl.formatMessage({ defaultMessage: 'How you want to count your habits?' })}
         </Typography>
         <div className="p-1"></div>
         <DropDownContainer
            show={showPeriodDropDown}
            toggle={() => toggleGroup(setShowPeriodDropDown, setShowDurationDropDown)}
            className="m-2"
            selectedItemText={selectedPeriodText.primary}>
            {periods}
         </DropDownContainer>
         <DropDownContainer
            show={showDurationDropDown}
            toggle={() => toggleGroup(setShowDurationDropDown, setShowPeriodDropDown)}
            className="m-2"
            selectedItemText={selectedDurationText.primary}>
            {durationList}
         </DropDownContainer>
      </div>
   );
};
