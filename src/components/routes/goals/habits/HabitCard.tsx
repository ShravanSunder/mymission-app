import { Card, Tooltip, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useMemo } from 'react';
import emojiRegexRGI from 'emoji-regex';
import tw from 'twin.macro';
import { css } from '@emotion/react';

import { CardLayout } from '~~/components/layout/CardLayout';
import { HabitMeter } from './HabitMeter';

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

   const numberOfSegments = 3;
   const progress = 33;
   const size = 90;

   return (
      <Card>
         <CardLayout className="p-2">
            <div className="grid grid-flow-row auto-rows-min grid-cols-1 sm:grid-cols-3 ">
               <div
                  className="relative p-1 border-0 border-transparent place-self-center box-border grid row-span-3"
                  css={{ paddingTop: '100%', width: '100%', height: 0 }}>
                  <HabitMeter numberOfSegments={numberOfSegments} size={size} progress={progress} safeEmoji={safeEmoji}></HabitMeter>
               </div>
               <div className="flex flex-col justify-between p-2 col-start-2 row-start-1 col-span-2 row-span-3">
                  <Typography variant="h4">{title}</Typography>
                  <Typography className="" variant="body2">
                     {subtitle}
                  </Typography>
                  <Typography variant="caption">{schedule}</Typography>
               </div>
            </div>
         </CardLayout>
      </Card>
   );
};
