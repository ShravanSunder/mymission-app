import { useMemo, FC } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';

import { RecurrenceAggregationPeriods, RecurrenceAggregationPeriodList } from './recurrenceDefinitions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarWeek, faCalendarDay, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Exception, ExceptionTypes } from '~~/models/Exception';
import { useIntl } from 'react-intl';

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
      return <FontAwesomeIcon fixedWidth={true} className="w-full h-full" icon={faCalendarWeek} />;
   } else if (props.period === RecurrenceAggregationPeriods.PerMonth) {
      return <FontAwesomeIcon fixedWidth={true} className="w-full h-full" icon={faCalendarAlt} />;
   } else {
      return null;
   }
};

type TUseAggregationText = (
   period: RecurrenceAggregationPeriods
) => {
   primary: string;
   secondary: string;
};

const useAggregationText = (): TUseAggregationText => {
   const { formatMessage } = useIntl();

   const getAggregationText: TUseAggregationText = (period) => {
      if (period === RecurrenceAggregationPeriods.PerDay) {
         return {
            primary: formatMessage({ defaultMessage: 'Daily' }),
            secondary: formatMessage({ defaultMessage: 'Count your habits daily: x times a day' }),
         };
      } else if (period === RecurrenceAggregationPeriods.PerWeek) {
         return {
            primary: formatMessage({ defaultMessage: 'Weekly' }),
            secondary: formatMessage({ defaultMessage: 'Count your habits weekly: x times a week' }),
         };
      } else if (period === RecurrenceAggregationPeriods.PerMonth) {
         return {
            primary: formatMessage({ defaultMessage: 'Monthly' }),
            secondary: formatMessage({ defaultMessage: 'Count your habits monthy: x times a month' }),
         };
      } else {
         throw new Exception(ExceptionTypes.Schedule_RecurrenceAggregationPeriods);
      }
   };

   return getAggregationText;
};

export const RecurrenceAggregationPeriod: FC<IRecurrenceAggregationPeriodProps> = (props) => {
   const getAggregationText = useAggregationText();

   const listData = (
      <>
         {RecurrenceAggregationPeriodList.map((m: RecurrenceAggregationPeriods, i: number) => {
            const text = getAggregationText(m);
            return (
               <ListItem key={m.toString() + i.toString()}>
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
         <div className="">How you want to count your habits?</div>
         <List>{listData}</List>
      </div>
   );
};
