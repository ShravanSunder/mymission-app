import React from 'react';
import { Box, createStyles, Fab, Grid, IconButton, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { purple, red } from '@material-ui/core/colors';

import { Alarm as AlarmIcon } from '@material-ui/icons';

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
   return <div></div>;
};
const Sidebar = () => {
   return <div></div>;
};
const MainView = () => {
   return (
      <div className="w-full h-full">
         <div className="flex flex-col items-stretch flex-grow w-full h-full rounded-md">
            <div className="flex flex-grow-0 w-full border-2 border-green-200 h-14 rounded-md p-0.5">
               <div className="flex-grow h-full bg-green-100 border-2 border-green-200 rounded-md"></div>
               <div className="flex-none h-14">
                  <IconButton color="primary" aria-label="add an alarm" size="medium">
                     <AlarmIcon />
                  </IconButton>
               </div>
            </div>
            <div className="flex-grow w-full bg-green-200 border-2 border-blue-300 min rounded-md"></div>
         </div>
      </div>
   );
};
const Navigation = () => {
   return (
      <div className="flex flex-grow-0 w-full border-2 border-green-200 h-14 rounded-md p-0.5">
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

export const Screen1 = () => {
   const classes = useStyles();
   return (
      <Box width={'100wh'} height={'100vh'}>
         <Grid container spacing={0}>
            <Grid item xs={12} sm={5} lg={5}>
               <Box className={clsx('p-2 flex', classes.left)} height={'100vh'}>
                  <div className={clsx('flex-grow flex ml-1 h-full bg-purple-100 border-2 border-purple-400 rounded-md')}>
                     <div className={clsx('w-10 h-full flex-grow-0 mr-1 bg-purple-100 border-2 border-purple-400 rounded-md')}>
                        <SideAccess></SideAccess>
                     </div>
                     <div className="flex flex-col items-stretch flex-grow h-full rounded-md">
                        <div className="flex-grow-0 w-full border-blue-50 h-14 p-0.5 rounded-md">
                           <Navigation></Navigation>
                        </div>
                        <div className="flex-grow w-full border-2 border-blue-300 bg-blue-50 min rounded-md">
                           <Sidebar></Sidebar>
                        </div>
                     </div>
                  </div>
               </Box>
            </Grid>
            <Grid item xs={12} sm={7} lg={7}>
               <Box className={clsx('p-2 flex', classes.right)} height={'100vh'}>
                  <div className={clsx('w-full h-full mr-1 bg-green-50 border-2 border-green-400 rounded-md')}>
                     <MainView></MainView>
                  </div>
               </Box>
            </Grid>
         </Grid>
      </Box>
   );
};
