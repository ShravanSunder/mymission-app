import { Card, CardActionArea, Typography } from '@material-ui/core';
import React from 'react';
import tw from 'twin.macro';

import { HabitMeter } from './HabitMeter';
import { useSafeEmoji } from '~~/components/hooks/useSafeEmoji';

interface IHabitCardProps {
   emoji: string;
   title: string;
   subtitle: string;
   schedule: string;
}

export const HabitCard = ({ emoji, title, subtitle, schedule }: IHabitCardProps): JSX.Element => {
   const safeEmoji: string = useSafeEmoji(emoji);

   const numberOfSegments = 3;
   const progress = 33;
   const size = 90;

   return (
      <Card className="flex-grow m-1 border-gray-500 shadow-md elevation-2 border-1 rounded-md ">
         <div className="fill-parent grid grid-rows-1" css={{ gridTemplateColumns: 'minmax(auto, 6rem) auto' }}>
            <CardActionArea className="p-2 fill-parent place-self-center rounded-md">
               <HabitMeter
                  css={[tw`place-self-center`, { composes: 'fill-parent' }]}
                  numberOfSegments={numberOfSegments}
                  size={size}
                  progress={progress}
                  safeEmoji={safeEmoji}></HabitMeter>
            </CardActionArea>
            <CardActionArea className="p-2 fill-parent place-self-center">
               <div className="flex flex-col justify-between w-full h-full p-2">
                  <Typography variant="h4">{title}</Typography>
                  <Typography variant="body2">{subtitle}</Typography>
                  <Typography variant="caption">{schedule}</Typography>
               </div>
            </CardActionArea>
         </div>
      </Card>
   );
};
