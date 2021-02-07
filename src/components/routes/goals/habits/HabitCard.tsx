import { Card, Tooltip, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useMemo } from 'react';
import emojiRegexRGI from 'emoji-regex';
import tw from 'twin.macro';
import { css } from '@emotion/react';

import { TwemojiImage } from '~~/components/common/Twemoji';
import { HabitMeter } from '~~/components/routes/goals/habits/HabitMeter';
import { CardLayout } from '~~/components/layout/CardLayout';
import { HabitProgress } from '~~/components/routes/goals/habits/HabitProgress';

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

   return (
      <Tooltip title="dsfdsfjsdflkdsjflfdjfsdj lsdjfldsfjjfdsjf" placement="bottom">
         <Card>
            <CardLayout className="p-2">
               <div className="grid grid-flow-row auto-rows-min grid-cols-1 sm:grid-cols-3 ">
                  <div className="content-between p-2 pb-0 grid auto-rows-min grid-cols-1 gap-1 sm:hidden justify-items-center">
                     <Typography variant="h4" className="text-center">
                        {title}
                     </Typography>
                     <Typography variant="caption" className="text-center">
                        {schedule}
                     </Typography>
                  </div>
                  <div
                     className="relative border-l-8 border-r-8 border-transparent sm:p-1 sm:border-0 place-self-center box-border grid row-span-3 sm:row-span-3"
                     css={{ paddingTop: '100%', width: '100%', height: 0 }}>
                     <div className="absolute w-full h-full place-self-center place-items-center grid">
                        <HabitMeter numberOfSegments={3} size={90}></HabitMeter>
                     </div>
                     <div className="absolute w-full h-full place-self-center place-items-center grid">
                        <HabitProgress progress={33} size={90}></HabitProgress>
                     </div>
                     <div className="absolute flex justify-center w-full h-full">
                        <TwemojiImage text={safeEmoji} size={50}></TwemojiImage>
                     </div>
                  </div>
                  <div className="flex-col justify-between hidden p-2 sm:flex sm:col-start-2 sm:row-start-1 sm:col-span-2 sm:row-span-3">
                     <Typography variant="h4">{title}</Typography>
                     <Typography className="hidden md:inline-block" variant="body2">
                        {subtitle}
                     </Typography>
                     <Typography variant="caption">{schedule}</Typography>
                  </div>
               </div>
            </CardLayout>
         </Card>
      </Tooltip>
   );
};
