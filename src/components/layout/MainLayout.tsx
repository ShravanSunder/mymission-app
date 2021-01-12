import '~~/styles/css/tailwind-base.css';
import '~~/styles/css/tailwind-components.css';
import '~~/styles/css/tailwind-utilities.css';

import React, { Suspense } from 'react';
import { Box, createStyles, Grid, makeStyles, Paper } from '@material-ui/core';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
import MaterialProvider from '../app/MaterialProvider';
import { Redirect, Route, Switch } from 'react-router';

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
      <Box>
         <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={5} lg={4}>
               <Box>
                  <Paper className={classes.root}>Sideframe</Paper>
               </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={7} lg={8}>
               <Box width={10}>
                  <Paper className={classes.root}>Main View</Paper>
               </Box>
            </Grid>
         </Grid>
      </Box>
   );
};

const MainLayout = (): JSX.Element => {
   return (
      <MaterialProvider>
         <div>
            <Switch>
               <Route exact path="/" render={() => <Trial></Trial>} />
               <Route path="/trial">
                  <Trial></Trial>
               </Route>
               <Route path="/noworkie/:id">
                  <div>dsfsdfsdf</div>
               </Route>
               <Route render={() => <Trial></Trial>} />
            </Switch>
         </div>
      </MaterialProvider>
   );
};

export default MainLayout;
