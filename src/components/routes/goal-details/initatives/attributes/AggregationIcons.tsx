import { css } from '@emotion/react';
import { faCalendarAlt, faCalendarDay, faCalendarWeek } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import tw from 'twin.macro';

import { RecurrenceRepetitionAggregation } from './core/recurrence.types';

import { ICommonProps } from '~~/components/common/ICommonProps';

export const AggregationIcons: FC<{ period: RecurrenceRepetitionAggregation } & ICommonProps> = (props) => {
   if (props.period === RecurrenceRepetitionAggregation.PerDay) {
      return <FontAwesomeIcon fixedWidth={true} className={props.className} css={css(tw`w-full h-full`)} icon={faCalendarDay} />;
   } else if (props.period === RecurrenceRepetitionAggregation.PerWeek) {
      return <FontAwesomeIcon fixedWidth={true} className={props.className} css={css(tw`w-full h-full`)} icon={faCalendarWeek} />;
   } else if (props.period === RecurrenceRepetitionAggregation.PerMonth) {
      return <FontAwesomeIcon fixedWidth={true} className={props.className} css={css(tw`w-full h-full`)} icon={faCalendarAlt} />;
   } else {
      return null;
   }
};
