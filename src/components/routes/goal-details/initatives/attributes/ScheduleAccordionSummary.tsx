import { FC } from 'react';

import { Typography } from '@material-ui/core';
import { TwemojiInline } from '~~/components/common/Twemoji';

interface IScheduleAccordionSummary {
   summaryName: string;
   summaryValue: string;
}

export const ScheduleAccordionSummary: FC<IScheduleAccordionSummary> = (props) => {
   return (
      <div
         className="w-full select-none grid grid-row-3 "
         css={{
            gridTemplateColumns: 'auto 1fr 1fr',
         }}>
         <div className="w-full rounded-full">
            <TwemojiInline text="📅"></TwemojiInline>
         </div>
         <Typography className="pl-2 capitalize">
            <strong>{props.summaryName}</strong>
         </Typography>
         <Typography className="pr-2 text-right justify-self-end">{props.summaryValue}</Typography>
      </div>
   );
};
