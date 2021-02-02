import { Card, CircularProgress, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import { TwemojiImage } from './Twemoji';
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
      <Card className="grid fill-parent">
         <div className="grid fill-parent grid-cols-3 grid-rows-3">
            <div className="relative p-1 box-border grid row-span-3" style={{ paddingTop: '100%', width: '100%', height: 0 }}>
               <div className="absolute w-full h-full place-items-center grid">
                  <div className="box-border" style={{ width: '80%', height: '80%' }}>
                     <HabitMeter numberOfSegments={3}></HabitMeter>
                  </div>
               </div>
               <div className="absolute flex justify-center w-full h-full">
                  <TwemojiImage text={safeEmoji} height="60%"></TwemojiImage>
               </div>
            </div>
            <div className="grid col-span-2 row-span-3">
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
