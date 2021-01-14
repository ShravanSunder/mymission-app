import React from 'react';
import { Box, createStyles, Fab, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { purple, red } from '@material-ui/core/colors';

import { Alarm as AlarmIcon } from '@material-ui/icons';

const text = `November kicks off the holiday season with high expectations for a cozy and festive time of year. However, for many this time of year is tinged with sadness, anxiety, or depression. Certainly, major depression or a severe anxiety disorder benefits most from professional help. But what about those who just feel lost or overwhelmed or down at this time of year? Research (and common sense) suggests that one aspect of the Thanksgiving season can actually lift the spirits, and it's built right into the holiday — expressing gratitude.

The word gratitude is derived from the Latin word gratia, which means grace, graciousness, or gratefulness (depending on the context). In some ways gratitude encompasses all of these meanings. Gratitude is a thankful appreciation for what an individual receives, whether tangible or intangible. With gratitude, people acknowledge the goodness in their lives. In the process, people usually recognize that the source of that goodness lies at least partially outside themselves. As a result, gratitude also helps people connect to something larger than themselves as individuals — whether to other people, nature, or a higher power.

In positive psychology research, gratitu...`;

const useStyles = makeStyles(() =>
   createStyles({
      root: {
         backgroundColor: red[50],
         border: 10,
         borderColor: red[200],
      },
      left: {
         backgroundColor: red[50],
      },
      right: {
         backgroundColor: purple[50],
      },
   })
);
const SideAccess = () => {
   return <div className={clsx('w-full h-full border-4 bg-purple-300 rounded-md')}></div>;
};

const Sidebar = () => {
   return <div className={clsx('h-full flex-grow border-4  bg-purple-200 rounded-md ')}></div>;
};

const MainView = () => {
   return (
      <div className="w-full h-full">
         <div className="flex flex-col items-stretch flex-grow w-full h-full rounded-md">
            <div className="flex flex-grow-0 w-full border-4 border-green-200 h-14 rounded-md">
               <div className="flex items-center flex-grow h-full bg-yellow-100 border-4 pl-0.5 rounded-md">
                  <Typography variant="h3">This is a title and i made it really really long</Typography>
               </div>
               <div className="flex-none h-14">
                  <IconButton color="primary" aria-label="add an alarm" size="medium">
                     <AlarmIcon />
                  </IconButton>
               </div>
            </div>
            <div className="flex flex-grow flex-shrink w-full overflow-y-auto bg-green-200 border-4 border-blue-300 min rounded-md">
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
const Navigation = () => {
   return (
      <div className="flex flex-grow-0 w-full bg-pink-200 border-4 border-pink-200 h-14 rounded-md">
         <IconButton classes={{ root: clsx('text-red-400') }} color="primary" aria-label="add an alarm" size="medium">
            <AlarmIcon />
         </IconButton>
         <IconButton color="primary" aria-label="add an alarm" size="medium">
            <AlarmIcon />
         </IconButton>
         <IconButton color="primary" aria-label="add an alarm" size="medium">
            <AlarmIcon />
         </IconButton>
         <IconButton color="primary" aria-label="add an alarm" size="medium">
            <AlarmIcon />
         </IconButton>
      </div>
   );
};

export const Screen1 = (): JSX.Element => {
   const classes = useStyles();
   return (
      <Box width={'100wh'} height={'100vh'}>
         <Grid container spacing={0} className={'min-h-full max-h-full'}>
            <Grid item xs={12} sm={5} lg={5} className={'min-h-full max-h-full'}>
               <Box className={clsx('p-2 flex', classes.left)} height={'100%'}>
                  <div className={clsx('flex-grow flex h-full bg-purple-100 rounded-md')}>
                     <div className="flex flex-col items-stretch flex-grow h-full rounded-md">
                        <div className="flex-grow-0 w-full h-14 rounded-md">
                           <Navigation></Navigation>
                        </div>
                        <div className="flex flex-grow w-full bg-blue-50 rounded-md">
                           <div className={clsx('w-12 h-full flex-grow-0 rounded-md')}>
                              <SideAccess></SideAccess>
                           </div>
                           <div className={clsx('h-full flex-grow  bg-purple-200 rounded-md ')}>
                              <Sidebar></Sidebar>
                           </div>
                        </div>
                     </div>
                  </div>
               </Box>
            </Grid>
            <Grid item xs={12} sm={7} lg={7} className={'min-h-full max-h-full'}>
               <Box className={clsx('p-2 pl-1 flex', classes.right)} height={'100%'}>
                  <div className={clsx('w-full h-full bg-green-100  rounded-md')}>
                     <MainView></MainView>
                  </div>
               </Box>
            </Grid>
         </Grid>
      </Box>
   );
};
