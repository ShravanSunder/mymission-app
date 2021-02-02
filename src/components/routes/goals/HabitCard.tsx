import { Card, CircularProgress, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import { TwemojiInline } from './Twemoji';
import emojiRegexRGI from 'emoji-regex';
import { HabitMeter } from './HabitMeter';
import tw from 'twin.macro';

interface HabitCardProps {
   emoji: string;
   title: string;
   subtitle: string;
   schedule: string;
}
export const HabitCard = ({ emoji, title, subtitle, schedule }: HabitCardProps): JSX.Element => {
   const safeEmoji: string = useMemo((): string => {
      if (emoji?.length > 0) {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-call
         const regex: RegExp = emojiRegexRGI();
         const [result] = emoji.matchAll(regex);
         return result?.[0] ?? '';
      }
      return '';
   }, [emoji]);
   console.log([...emoji]);

   // <TwemojiInline text={safeEmoji}></TwemojiInline>

   return (
      <Card className="flex flex-grow fill-parent">
         <div className="flex fill-parent">
            <div
               className="relative flex flex-col items-center justify-around flex-shrink-0 w-20 p-2 box-border fill-parent-vertical"
               css={[{ fontSize: '2rem', width: '5rem' }]}>
               <div className="w-full h-full box-border">
                  <HabitMeter numberOfSegments={3}></HabitMeter>
               </div>
               <div css={[tw`absolute flex-grow-0 flex flex-col w-full h-full`]}>
                  <div className="grid place-items-center" css={[{ height: '5rem' }]}>
                     <TwemojiInline text={safeEmoji}></TwemojiInline>
                  </div>
                  <div className="flex-grow w-full h-full"></div>
               </div>
            </div>
            <div className="flex-grow">
               <div className="p-2 grid gap-1 grid-flow-row" css={[{ gridTemplateRows: '1fr min-content' }]}>
                  <Typography variant="h6">{title}</Typography>
                  <Typography variant="body1">{subtitle}</Typography>
                  <Typography variant="caption">{schedule}</Typography>
               </div>
            </div>
         </div>
      </Card>
   );
};
