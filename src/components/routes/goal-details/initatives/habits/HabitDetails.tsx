import { Typography } from '@material-ui/core';
import React from 'react';
import tw from 'twin.macro';
import { ICommonProps } from '~~/components/common/ICommonProps';
import { TwemojiImage } from '~~/components/common/Twemoji';
import { useSafeEmoji } from '~~/components/hooks/useSafeEmoji';

const tempColorIcon = 'border-red-200 bg-red-100';

export const HabitDetails: React.FC<ICommonProps> = () => {
   const emoji = '🍵';
   const safeEmoji: string = useSafeEmoji(emoji);

   const size = 20;

   return (
      <div className="flex flex-col justify-start w-full h-full">
         <div className="relative flex justify-center w-full p-4 ">
            <div className="w-20 h-20 border-4 rounded-full" css={tw`${tempColorIcon}`}>
               <TwemojiImage text={safeEmoji} size={70}></TwemojiImage>
            </div>
         </div>
         <div className="relative flex w-full p-4 rounded-lg justify-items-stretch"></div>
      </div>
   );
};
