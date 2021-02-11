import { Card, CardActionArea, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import tw from 'twin.macro';
import { TwemojiInline } from '~~/components/common/Twemoji';
import { useSafeEmoji } from '~~/components/hooks/useSafeEmoji';

interface IProjectCardProps {
   emoji: string;
}

export const ProjectCard = (props: IProjectCardProps): JSX.Element => {
   const safeEmoji: string = useSafeEmoji(props.emoji);

   return (
      <Card className="flex-grow m-1 border-gray-500 shadow-md elevation-2 border-1 rounded-md ">
         <CardActionArea className="fill-parent">
            <div className="p-2 fill-parent grid gap-2" css={{ gridTemplateColumns: 'minmax(auto, 6rem) auto', gridTemplateRows: 'min-content auto auto' }}>
               <Typography variant="h4" className="p-2 col-start-2 row-start-1 box-border">
                  Make a new app project
               </Typography>
               {/* <Typography variant="body2" className="p-2 col-start-1 row-start-1 row-span-2 box-border">
                  <p>
                     <TwemojiInline text="✔" /> 20/40
                  </p>
                  <p>
                     <TwemojiInline text="🚩" /> 3/5
                  </p>
                  <p>
                     <TwemojiInline text="📅" /> June 40
                  </p>
               </Typography> */}
               {/* <div className="flex justify-start pt-1 pb-1 pl-2 pr-2 align-middle fill-parent col-start-1 row-start-3 col-span-2">
                  <div className="flex-grow h-2 bg-green-300"></div>
               </div> */}
               <div className="p-1 pl-2 pr-2 col-start-1 col-span-2 row-start-3 row-span-1 box-border grid grid-rows-1 grid-cols-3">
                  <Typography variant="caption">
                     <TwemojiInline text="✔" /> 20/40
                  </Typography>
                  <Typography variant="caption">
                     <TwemojiInline text="🚩" /> 3/5
                  </Typography>
                  <Typography variant="caption">
                     <TwemojiInline text="📅" /> June 40
                  </Typography>
               </div>
            </div>
         </CardActionArea>
      </Card>
   );
};
