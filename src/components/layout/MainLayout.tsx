import '~~/styles/css/tailwind-base.css';
import '~~/styles/css/tailwind-components.css';
import '~~/styles/css/tailwind-utilities.css';
import React from 'react';
import { MaterialProvider } from './MaterialProvider';
import { createStyles, Grid, makeStyles, Paper, Theme } from '@material-ui/core';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         backgroundColor: red[200],
      },
   })
);

export const MainLayout = (): JSX.Element => {
   const classes = useStyles();

   return (
      <MaterialProvider>
         <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={3}>
               <Paper className={classes.root}>xs=12 jjjsm=6 md=3</Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
               <Paper className={classes.root}>xs=12jjjjdf sm=6 md=3</Paper>
            </Grid>
         </Grid>
      </MaterialProvider>
   );
};
