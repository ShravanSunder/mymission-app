import { css } from '@emotion/react';
import { faCalendarAlt, faCalendarPlus, faCalendarWeek, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { EventNote } from '@material-ui/icons';
import { FC } from 'react';
import tw from 'twin.macro';

import { RecurrenceRepetitionType } from './core/recurrence.types';

import { ICommonProps } from '~~/components/common/ICommonProps';
import { lazier } from '~~/components/common/utils/lazier';
import { muiIconCss } from '~~/helpers/muiIconCss';

const [FontAwesomeIcon] = lazier(() => import(/*  webpackChunkName: "fortawesome-react" */ '@fortawesome/react-fontawesome'), 'FontAwesomeIcon');

export const RepetitionIcons: FC<{ repetition: RecurrenceRepetitionType } & ICommonProps> = (props) => {
   if (props.repetition === RecurrenceRepetitionType.Weekly) {
      return <FontAwesomeIcon fixedWidth={true} className={props.className} css={css(tw`w-full h-full place-items-center`)} icon={faCalendarWeek} />;
   } else if (props.repetition === RecurrenceRepetitionType.SpecificDaysOfWeek) {
      return <FontAwesomeIcon fixedWidth={true} className={props.className} css={css(tw`w-full h-full place-items-center`)} icon={faCalendarPlus} />;
   } else if (props.repetition === RecurrenceRepetitionType.Monthly) {
      return <FontAwesomeIcon fixedWidth={true} className={props.className} css={css(tw`w-full h-full place-items-center`)} icon={faCalendarAlt} />;
   } else if (props.repetition === RecurrenceRepetitionType.Quarterly) {
      return <FontAwesomeIcon fixedWidth={true} className={props.className} css={css(tw`w-full h-full place-items-center`)} icon={faThLarge} />;
   } else {
      return <EventNote className={props.className} css={muiIconCss}></EventNote>;
   }
};
