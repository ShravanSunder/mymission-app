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
      <Card className="flex-grow p-1 m-1 border-gray-500 shadow-md elevation-2 border-1 rounded-md">
         <div className="w-full h-full grid grid-rows-1" css={{ gridTemplateColumns: 'minmax(auto, 6rem) auto' }}>
            <HabitMeter css={[tw`place-self-center `]} numberOfSegments={numberOfSegments} size={size} progress={progress} safeEmoji={safeEmoji}></HabitMeter>
            <div className="flex flex-col justify-between w-full h-full p-2">
               <Typography variant="h4">{title}</Typography>
               <Typography variant="body2">{subtitle}</Typography>
               <Typography variant="caption">{schedule}</Typography>
            </div>
         </div>
      </Card>
   );
};
