import { Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import emojiRegexRGI from 'emoji-regex';
import tw from 'twin.macro';
import { css } from '@emotion/react';

import { TwemojiImage } from '~~/components/common/Twemoji';
import { HabitMeter } from '~~/components/routes/goals/habits/HabitMeter';
import { CardLayout } from '~~/components/layout/CardLayout';

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

   return (
      <CardLayout>
         <div className="grid grid-flow-row auto-rows-min grid-cols-1 sm:grid-cols-3 grid-rows-2">
            <div className="relative p-1 box-border grid row-span-2 sm:row-span-3" css={{ paddingTop: '100%', width: '100%', height: 0 }}>
               <div className="absolute w-full h-full place-self-center place-items-center grid">
                  <HabitMeter numberOfSegments={3} size={80}></HabitMeter>
               </div>
               <div className="absolute flex justify-center w-full h-full">
                  <TwemojiImage text={safeEmoji} size={50}></TwemojiImage>
               </div>
            </div>
            <div className="flex-col justify-between p-2 row-start-3 col-start-1 sm:flex sm:col-start-2 sm:row-start-1 sm:col-span-2 sm:row-span-3">
               <Typography variant="h6">{title}</Typography>
               <Typography className="hidden md:inline-block" variant="body1">
                  {subtitle}
               </Typography>
               <Typography variant="caption">{schedule}</Typography>
            </div>
         </div>
      </CardLayout>
   );
};
