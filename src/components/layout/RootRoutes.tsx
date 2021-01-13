import '~~/styles/css/tailwind-base.css';
import '~~/styles/css/tailwind-components.css';
import '~~/styles/css/tailwind-utilities.css';

import React, { Suspense } from 'react';
import { Box, createStyles, Grid, makeStyles, Paper } from '@material-ui/core';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
import MaterialProvider from '~~/components/app/MaterialProvider';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

const useStyles = makeStyles(() =>
   createStyles({
      root: {
         backgroundColor: red[50],
      },
   })
);

const Trial = () => {
   const classes = useStyles();
   return (
      <Box width={'100wh'} height={'100vh'}>
         <Grid container spacing={0}>
            <Grid item xs={12} sm={5} md={4} lg={4}>
               <Box className={classes.root} height={'100vh'}></Box>
            </Grid>
            <Grid item xs={12} sm={7} md={8} lg={8}>
               <Box className={classes.root} height={'100vh'}></Box>
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
               <Route path="/" element={<Trial></Trial>} />
               <Route path="/users/*" element={<div>users path</div>}></Route>
               <Route path="/noworkie/:id" element={<div>dsfsdfsdf</div>}></Route>
            </Routes>
         </BrowserRouter>
      </MaterialProvider>
   );
};

export default RootRoutes;
