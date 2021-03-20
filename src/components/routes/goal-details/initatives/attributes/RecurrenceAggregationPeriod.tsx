import { useMemo, FC } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';

import { DaysOfWeek } from './scheduleDefinitions';
import { RecurrenceAggregationPeriods, RecurrenceDurationTypes, daysToRecurrenceTypeMap, RecurrenceAggregationPeriodList } from './recurrenceDefinitions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarWeek, faCalendarDay, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

export const tempColorSelectedDay = 'bg-gray-200';

export interface IRecurrenceAggregationPeriodProps {
   /**
    * Number: Number of times per repetition.
    * Days of Week:  When repetition type is SpecificDaysOfWeek, it can be an DaysOfWeek[]
    */
   aggregationPeriod: RecurrenceAggregationPeriods;
   setAggregationPeriod: React.Dispatch<React.SetStateAction<RecurrenceAggregationPeriods>>;
}

const AggregationIcons: FC<{ period: RecurrenceAggregationPeriods }> = (props) => {
   if (props.period === RecurrenceAggregationPeriods.PerDay) {
      return <FontAwesomeIcon fixedWidth={true} className="w-full h-full" icon={faCalendarDay} />;
   } else if (props.period === RecurrenceAggregationPeriods.PerWeek) {
      return <FontAwesomeIcon icon={faCalendarWeek} />;
   } else if (props.period === RecurrenceAggregationPeriods.PerMonth) {
      return <FontAwesomeIcon icon={faCalendarAlt} />;
   } else {
      return null;
   }
};

export const RecurrenceAggregationPeriod: FC<IRecurrenceAggregationPeriodProps> = (props) => {
   const listData = (
      <>
         {RecurrenceAggregationPeriodList.map((m: RecurrenceAggregationPeriods, i: number) => {
            return (
               <ListItem key={m.toString() + i.toString()}>
                  <ListItemAvatar>
                     <Avatar>
                        <AggregationIcons period={m}></AggregationIcons>
                     </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={m} secondary="" />
               </ListItem>
            );
         })}
      </>
   );

   return (
      <div className="w-full overflow-hidden overflow-y-auto grid grid-cols-1 max-h-80">
         <div className="">{props.aggregationPeriod}</div>
         <List>{listData}</List>
      </div>
   );
};
