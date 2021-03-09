import { Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import { TwemojiInline } from '~~/components/common/Twemoji';
import { RecurrenceTypes, recurrenceToDisplayString, recurrenceToNumberOfDaysMap, DaysOfWeek } from './scheduleDefinitions';

export interface IInitativeCycleDurationProps {
   recurrenceType?: RecurrenceTypes;
}
export const InitativeCycleDurationSummary: React.FC<IInitativeCycleDurationProps> = (props) => {
   const summary = useMemo(() => {
      // if (recurrenceToNumberOfDaysMap.has(props.recurrenceType)) {
      //    return recurrenceToDisplayString(props.recurrenceType, props.recurrenceSchedule as number);
      // } else {
      //    // Todo:finish me
      //    return '';
      // }
      return '';
   }, [props.recurrenceType]);

   return (
      <div
         className="w-full select-none grid grid-row-3 "
         css={{
            gridTemplateColumns: 'auto 1fr 1fr ',
         }}>
         <div className="w-full rounded-full">
            <TwemojiInline text="📅"></TwemojiInline>
         </div>
         <Typography className="pl-2 capitalize">
            <strong>Days</strong>
         </Typography>
         <Typography className="pr-2 text-right justify-self-end">{summary}</Typography>
      </div>
   );
};

export const InitativeCycle: React.FC<IInitativeCycleDurationProps> = (props) => {
   return (
      <div className="w-full overflow-hidden overflow-y-auto grid grid-cols-1 max-h-80">
         <div className="">{props.recurrenceType}</div>
      </div>
   );
};
