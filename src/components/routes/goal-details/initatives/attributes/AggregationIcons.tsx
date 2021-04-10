import { faCalendarAlt, faCalendarDay, faCalendarWeek } from '@fortawesome/free-solid-svg-icons';
import React, { FC } from 'react';

import { RecurrenceRepetitionAggregation } from './core/recurrence.types';

import { lazier } from '~~/components/common/utils/lazier';

const [FontAwesomeIcon] = lazier(() => import(/*  webpackChunkName: "fortawesome-react" */ '@fortawesome/react-fontawesome'), 'FontAwesomeIcon');

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
