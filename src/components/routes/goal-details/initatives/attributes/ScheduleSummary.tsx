import { FC } from 'react';

import { Typography } from '@material-ui/core';
import { TwemojiInlineLazy } from '~~/components/common/TwemojiLazy';

interface IScheduleAccordionSummary {
   icon: string;
   summaryName: string;
   summaryValue: string;
}

export const ScheduleSummary: FC<IScheduleAccordionSummary> = (props) => {
   return (
      <div
         className="w-full select-none grid grid-row-3 "
         css={{
            gridTemplateColumns: 'auto 1fr auto',
         }}>
         <Typography variant="h3" className="w-full rounded-full">
            <TwemojiInlineLazy text={props.icon}></TwemojiInlineLazy>
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
