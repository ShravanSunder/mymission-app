import { faCalendarAlt, faCalendarPlus, faCalendarWeek, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EventNote } from '@material-ui/icons';
import { FC } from 'react';

import { RecurrenceRepetitionType } from './core/recurrence.types';

import { muiIconCss } from '~~/helpers/muiIconCss';

export const RepetitionIcons: FC<{ duration: RecurrenceRepetitionType }> = (props) => {
   if (props.duration === RecurrenceRepetitionType.Weekly) {
      return <FontAwesomeIcon fixedWidth={true} className="w-full h-full" icon={faCalendarWeek} />;
   } else if (props.duration === RecurrenceRepetitionType.SpecificDaysOfWeek) {
      return <FontAwesomeIcon fixedWidth={true} className="w-full h-full" icon={faCalendarPlus} />;
   } else if (props.duration === RecurrenceRepetitionType.Monthly) {
      return <FontAwesomeIcon fixedWidth={true} className="w-full h-full" icon={faCalendarAlt} />;
   } else if (props.duration === RecurrenceRepetitionType.Quarterly) {
      return <FontAwesomeIcon fixedWidth={true} className="w-full h-full" icon={faThLarge} />;
   } else {
      return <EventNote css={muiIconCss}></EventNote>;
   }
};
