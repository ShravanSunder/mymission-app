import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import tw from 'twin.macro';
import { Alarm as AlarmIcon } from '@material-ui/icons';
import { toolbarHeight, panelHeight } from '../MainAppLayout';

export const text = `November kicks off the holiday season with high expectations for a cozy and festive time of year. However, for many this time of year is tinged with sadness, anxiety, or depression. Certainly, major depression or a severe anxiety disorder benefits most from professional help. But what about those who just feel lost or overwhelmed or down at this time of year? Research (and common sense) suggests that one aspect of the Thanksgiving season can actually lift the spirits, and it's built right into the holiday — expressing gratitude.

The word gratitude is derived from the Latin word gratia, which means grace, graciousness, or gratefulness (depending on the context). In some ways gratitude encompasses all of these meanings. Gratitude is a thankful appreciation for what an individual receives, whether tangible or intangible. With gratitude, people acknowledge the goodness in their lives. In the process, people usually recognize that the source of that goodness lies at least partially outside themselves. As a result, gratitude also helps people connect to something larger than themselves as individuals — whether to other people, nature, or a higher power.

In positive psychology research, gratitu...`;

export const RightPane = (): JSX.Element => {
   return (
      <div className="fill-parent">
         <div className="flex flex-col items-stretch flex-grow fill-parent rounded-md">
            <div css={[toolbarHeight, tw`flex items-center flex-grow-0 w-full  h-14 rounded-md`]}>
               <div className="flex items-center flex-grow h-full bg-yellow-100  pl-0.5 rounded-md"></div>
               <div className="flex items-center flex-none h-14">
                  <IconButton color="primary" aria-label="add an alarm">
                     <AlarmIcon />
                  </IconButton>
               </div>
            </div>
            <div css={[panelHeight, tw`flex flex-grow flex-shrink w-full overflow-y-auto bg-green-200  rounded-md`]}>
               <div className="p-3">
                  <Typography> {text}</Typography>
               </div>
               <div className="p-3">
                  <Typography> {text}</Typography>
               </div>
            </div>
         </div>
      </div>
   );
};
