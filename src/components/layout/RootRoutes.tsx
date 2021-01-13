import '~~/styles/css/tailwind-base.css';
import '~~/styles/css/tailwind-components.css';
import '~~/styles/css/tailwind-utilities.css';

import React, { Suspense } from 'react';
import { Box, createStyles, Grid, makeStyles, Paper } from '@material-ui/core';
import clsx from 'clsx';
import { purple, red } from '@material-ui/core/colors';
import MaterialProvider from '~~/components/app/MaterialProvider';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

const useStyles = makeStyles(() =>
   createStyles({
      root: {
         backgroundColor: red[50],
         border: 10,
         borderColor: red[200],
      },
      left: {
         backgroundColor: red[100],
      },
      right: {
         backgroundColor: purple[100],
      },
   })
);

const Screen1 = () => {
   const classes = useStyles();
   return (
      <Box width={'100wh'} height={'100vh'}>
         <Grid container spacing={0}>
            <Grid item xs={12} sm={5} lg={5}>
               <Box className={clsx('p-2 flex', classes.left)} height={'100vh'}>
                  <div className={clsx('w-10 h-full mr-1 bg-purple-100 border-2 border-purple-400')}></div>
                  <div className={clsx('flex-grow ml-1 h-full bg-purple-100 border-2 border-purple-400')}>
                     <div className="flex flex-col items-stretch w-full h-full">
                        <div className="flex-grow-0 w-full h-12 bg-blue-200 border-2 border-blue-300"></div>
                        <div className="flex-grow w-full bg-blue-200 border-2 border-blue-300 min"></div>
                     </div>
                  </div>
               </Box>
            </Grid>
            <Grid item xs={12} sm={7} lg={7}>
               <Box className={clsx('p-2 flex', classes.right)} height={'100vh'}>
                  <div className={clsx('w-full h-full mr-1 bg-green-100 border-2 border-green-400')}></div>
               </Box>
            </Grid>
         </Grid>
      </Box>
   );
};

const RootRoutes = (): JSX.Element => {
   return (
      <MaterialProvider>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Screen1></Screen1>} />
               <Route path="/users/*" element={<div>users path</div>}></Route>
               <Route path="/noworkie/:id" element={<div>dsfsdfsdf</div>}></Route>
            </Routes>
         </BrowserRouter>
      </MaterialProvider>
   );
};

export default RootRoutes;
