import { Typography } from '@material-ui/core';
import { FC, ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { TwemojiInlineLazy } from '~~/components/common/TwemojiLazy';

interface IScheduleAccordionSummary {
   icon: string;
   summaryName: string;
   summaryValue: string | ReactNode;
}

export const ScheduleSummary: FC<IScheduleAccordionSummary> = (props) => {
   // for test
   // const { formatMessage } = useIntl();
   // const data = formatMessage({ defaultMessage: 'sdfsdfdsfdfds {count}' }, { count: 1 });
   // console.log(data);
   return (
      <div
         className="items-center w-full select-none grid grid-row-3"
         css={{
            gridTemplateColumns: 'auto 1fr auto',
         }}>
         <Typography variant="h3" className="w-full rounded-full">
            <TwemojiInlineLazy text={props.icon}></TwemojiInlineLazy>
         </Typography>
         <Typography variant="h3" className="pl-2 capitalize">
            {props.summaryName}
         </Typography>
         <Typography variant="body1" className="pr-2 text-right justify-self-end">
            {props.summaryValue}
         </Typography>
      </div>
   );
};
