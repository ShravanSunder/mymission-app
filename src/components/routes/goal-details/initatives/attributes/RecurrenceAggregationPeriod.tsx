import { faCalendarAlt, faCalendarDay, faCalendarWeek } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import { SubjectWithValue } from '~~/components/common/core/hooks/useSubjectValue';
import { formatAggregationPeriodForDisplay } from './core/recurrence.facade';
import { RecurrenceAggregationPeriodList, RecurrenceAggregationPeriods } from './core/recurrence.types';

export interface IRecurrenceAggregationPeriodProps {
   /**
    * Number: Number of times per repetition.
    * Days of Week:  When repetition type is SpecificDaysOfWeek, it can be an DaysOfWeek[]
    */
   aggregationPeriod: SubjectWithValue<RecurrenceAggregationPeriods>;
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

   const periods = (
      <>
         {RecurrenceAggregationPeriodList.map((m: RecurrenceAggregationPeriods, i: number) => {
            const text = formatAggregationPeriodForDisplay(intl, m);
            const handleClick = () => {
               props.aggregationPeriod.push(m);
            };

            return (
               <ListItem key={m.toString() + i.toString()} selected={m === props.aggregationPeriod.value} button onClick={() => handleClick()}>
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
            {intl.formatMessage({ defaultMessage: 'How you want to count your habits?' })}
         </Typography>
         <List>{periods}</List>
      </div>
   );
};
