import { FC, Dispatch, SetStateAction } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@material-ui/core';

import { RecurrenceAggregationPeriods, RecurrenceAggregationPeriodList } from './recurrenceDefinitions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarWeek, faCalendarDay, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useAggregationText } from './useAggregationText';
import { ObservableWithState } from '../../../../common/hooks/useObservableWithState';

export interface IRecurrenceAggregationPeriodProps {
   /**
    * Number: Number of times per repetition.
    * Days of Week:  When repetition type is SpecificDaysOfWeek, it can be an DaysOfWeek[]
    */
   aggregationPeriod: ObservableWithState<RecurrenceAggregationPeriods>;
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
   const getAggregationText = useAggregationText();

   const periods = (
      <>
         {RecurrenceAggregationPeriodList.map((m: RecurrenceAggregationPeriods, i: number) => {
            const text = getAggregationText(m);
            const handleClick = () => {
               props.aggregationPeriod.pushState(m);
            };

            return (
               <ListItem key={m.toString() + i.toString()} selected={m === props.aggregationPeriod.state} button onClick={() => handleClick()}>
                  <ListItemAvatar>
                     <Avatar>
                        <AggregationIcons period={m}></AggregationIcons>
                     </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={text.primary} secondary={text.secondary} />
               </ListItem>
            );
         })}
      </>
   );

   return (
      <div className="w-full overflow-hidden overflow-y-auto grid grid-cols-1 max-h-80">
         <Typography variant="h4" className="text-center">
            How you want to count your habits?
         </Typography>
         <List>{periods}</List>
      </div>
   );
};
