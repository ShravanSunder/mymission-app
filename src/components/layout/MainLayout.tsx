import '~~/styles/css/tailwind-base.css';
import '~~/styles/css/tailwind-components.css';
import '~~/styles/css/tailwind-utilities.css';

import React from 'react';
import { Box, createStyles, Grid, makeStyles, Paper } from '@material-ui/core';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';

const MaterialProvider = React.lazy(() => import('~~/components/app/MaterialProvider'));

export const useStyles = makeStyles(() =>
   createStyles({
      root: {
         backgroundColor: red[50],
      },
   })
);

const MainLayout = (): JSX.Element => {
   const classes = useStyles();
   const string = 'test-';

   return (
      <MaterialProvider>
         <Box>
            <Grid container spacing={1}>
               <Grid item xs={12} sm={6} md={5} lg={4}>
                  <Paper className={classes.root}>Sideframe</Paper>
               </Grid>
               <Grid item xs={12} sm={6} md={7} lg={8}>
                  <Paper className={classes.root}>Main View</Paper>
               </Grid>
            </Grid>
         </Box>
      </MaterialProvider>
   );
};

export default MainLayout;
