import { faCalendarAlt, faCalendarDay, faCalendarWeek } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

import { RecurrenceRepetitionAggregation } from './core/recurrence.types';

export const AggregationIcons: FC<{ period: RecurrenceRepetitionAggregation }> = (props) => {
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
