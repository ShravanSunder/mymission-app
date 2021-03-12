import { Accordion, AccordionDetails, AccordionSummary, IconButton, Typography } from '@material-ui/core';
import { FC } from 'react';
import tw from 'twin.macro';
import { TwemojiInline } from '~~/components/common/Twemoji';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Calendar from 'react-calendar';

const tempColorIcons = 'bg-gray-200';

const InitiativeScheduleSummary = () => (
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
      <Typography className="pr-2 text-right justify-self-end">9 days/fortnight</Typography>
   </div>
);

export const InitativeSchedule: FC = (params) => {
   return (
      <div className="w-full">
         <Accordion className="w-full h-full">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <InitiativeScheduleSummary></InitiativeScheduleSummary>
            </AccordionSummary>
            <AccordionDetails>
               <Calendar
                  selectRange={true}
                  defaultView={'year'}
                  formatShortWeekday={(locale, date) => ''}
                  showNeighboringMonth={false}
                  value={[new Date('2021-03-01'), new Date('2021-03-03')]}></Calendar>
            </AccordionDetails>
         </Accordion>
      </div>
   );
};
