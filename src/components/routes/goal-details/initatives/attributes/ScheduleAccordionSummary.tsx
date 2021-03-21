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
            gridTemplateColumns: 'auto 1fr auto',
         }}>
         <Typography variant="h3" className="w-full rounded-full">
            <TwemojiInline text="📅"></TwemojiInline>
         </Typography>
         <Typography variant="h3" className="pl-2 capitalize">
            {props.summaryName}
         </Typography>
         <Typography variant="h3" className="pr-2 text-right justify-self-end">
            {props.summaryValue}
         </Typography>
      </div>
   );
};
