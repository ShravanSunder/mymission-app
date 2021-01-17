import React from 'react';
import { Grid, IconButton, Typography } from '@material-ui/core';
import clsx from 'clsx';

import tw, { css } from 'twin.macro';
// import {css} from '@emotion/react'

import { Alarm as AlarmIcon } from '@material-ui/icons';

const text = `November kicks off the holiday season with high expectations for a cozy and festive time of year. However, for many this time of year is tinged with sadness, anxiety, or depression. Certainly, major depression or a severe anxiety disorder benefits most from professional help. But what about those who just feel lost or overwhelmed or down at this time of year? Research (and common sense) suggests that one aspect of the Thanksgiving season can actually lift the spirits, and it's built right into the holiday — expressing gratitude.

The word gratitude is derived from the Latin word gratia, which means grace, graciousness, or gratefulness (depending on the context). In some ways gratitude encompasses all of these meanings. Gratitude is a thankful appreciation for what an individual receives, whether tangible or intangible. With gratitude, people acknowledge the goodness in their lives. In the process, people usually recognize that the source of that goodness lies at least partially outside themselves. As a result, gratitude also helps people connect to something larger than themselves as individuals — whether to other people, nature, or a higher power.

In positive psychology research, gratitu...`;

const toolbarHeight = css(tw`h-14`);
const panelHeight = css({ height: 'calc(100vh - 4.7rem)' });

const SideQuickAccess = () => {
   return <div className={clsx('w-full h-full bg-purple-300 rounded-md')}></div>;
};

const Sidebar = () => {
   return <div className={clsx('h-full flex-grow bg-purple-200 rounded-md ')}></div>;
};

const MainView = () => {
   return (
      <div className="w-full h-full">
         <div className="flex flex-col items-stretch flex-grow w-full h-full rounded-md">
            <div css={[toolbarHeight, tw`flex items-center flex-grow-0 w-full  h-14 rounded-md`]}>
               <div className="flex items-center flex-grow h-full bg-yellow-100  pl-0.5 rounded-md"></div>
               <div className="flex items-center flex-none h-14">
                  <IconButton color="primary" aria-label="add an alarm">
                     <AlarmIcon />
                  </IconButton>
               </div>
            </div>
            <div css={[panelHeight, tw`flex flex-grow flex-shrink w-full overflow-y-auto bg-green-200  rounded-md`]}>
               <div className="flex-grow flex-shrink p-3 bg-green-300">
                  <Typography> {text}</Typography>
               </div>
               <div className="flex-grow flex-shrink p-3 bg-green-300">
                  <Typography> {text}</Typography>
               </div>
            </div>
         </div>
      </div>
   );
};

const NavigationTop = () => {
   return (
      <div className="flex flex-grow-0 w-full bg-pink-100 h-14 rounded-md space-x-3">
         <div className="w-12 grid grid-cols-1 h-14">
            <div className="place-self-center">
               <IconButton classes={{ root: clsx('text-red-400') }} color="primary" aria-label="add an alarm" size="medium">
                  <AlarmIcon />
               </IconButton>
            </div>
         </div>
         <div className="flex items-center flex-none h-14">
            <IconButton color="primary" aria-label="add an alarm" size="medium">
               <AlarmIcon />
            </IconButton>
         </div>
         <div className="flex items-center flex-none h-14">
            <IconButton color="primary" aria-label="add an alarm" size="medium">
               <AlarmIcon />
            </IconButton>
         </div>
         <div className="flex items-center flex-none h-14">
            <IconButton color="primary" aria-label="add an alarm" size="medium">
               <AlarmIcon />
            </IconButton>
         </div>
      </div>
   );
};

export const Screen1 = (): JSX.Element => {
   // const classes = useStyles();
   return (
      <div css={{ height: '100vh', width: '100wh' }}>
         <Grid container spacing={0} className={'min-h-full max-h-full'}>
            <Grid item xs={12} sm={5} lg={5} className={'min-h-full max-h-full'}>
               <div className={clsx('p-2 flex bg-red-50 h-full')}>
                  <div className={clsx('flex-grow flex h-full bg-purple-100 rounded-md')}>
                     <div className="flex flex-col items-stretch flex-grow h-full rounded-md">
                        <div css={[toolbarHeight, tw`flex-grow-0  w-full h-14 rounded-md`]}>
                           <NavigationTop></NavigationTop>
                        </div>
                        <div css={[panelHeight, tw`flex w-full bg-blue-50 rounded-md`]}>
                           <div className={clsx('w-12 h-full flex-grow-0 rounded-md')}>
                              <SideQuickAccess></SideQuickAccess>
                           </div>
                           <div className={clsx('h-full flex-grow  bg-purple-200 rounded-md ')}>
                              <Sidebar></Sidebar>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </Grid>
            <Grid item xs={12} sm={7} lg={7} className={'min-h-full max-h-full'}>
               <div className={clsx('p-2 pl-1 flex bg-purple-50 h-full')}>
                  <div className={clsx('w-full h-full bg-green-100  rounded-md')}>
                     <MainView></MainView>
                  </div>
               </div>
            </Grid>
         </Grid>
      </div>
   );
};
