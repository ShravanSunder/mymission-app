import { Button, createStyles, makeStyles, ThemeProvider } from '@material-ui/core';

import { grey, green, red, yellow } from '@material-ui/core/colors';
import React, { useMemo, useState } from 'react';

import { SnackbarProvider } from 'notistack';
import { createAppTheme } from 'Monkey/styles/theme';

const useStyles = makeStyles(() => {
   const snackbarRoot = {
      color: `${grey[700]}!important`,
      maxWidth: 280,
      zIndex: 1000,
   };

   return createStyles({
      info: { backgroundColor: `${grey[200]}!important`, ...snackbarRoot },
      success: { backgroundColor: `${green[50]}!important`, ...snackbarRoot },
      error: { backgroundColor: `${red[100]}!important`, ...snackbarRoot },
      warning: {
         backgroundColor: `${yellow[50]}!important`,
         ...snackbarRoot,
      },
   });
});

const Layout = (): JSX.Element => {
   return (
      <div className="flex items-center max-w-sm p-6 mx-auto bg-white shadow-md rounded-xl space-x-4">
         <div className="flex-shrink-0">
            <div>demo</div>
         </div>
      </div>
   );
};

export const MainLayout = (): JSX.Element => {
   const classes = useStyles();
   const notistackRef = React.createRef() as any;
   const onClickDismiss = (key: string | number) => () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      notistackRef?.current?.closeSnackbar(key);
   };

   const [isDark] = useState<boolean>(true);

   const theme = useMemo(() => {
      return createAppTheme(isDark);
   }, [isDark]);

   return (
      <ThemeProvider theme={theme}>
         <SnackbarProvider
            ref={notistackRef}
            action={(key) => <Button onClick={onClickDismiss(key)}>Dismiss</Button>}
            classes={{
               variantSuccess: classes.success,
               variantError: classes.error,
               variantWarning: classes.warning,
               variantInfo: classes.info,
            }}
            autoHideDuration={1200}
            maxSnack={2}
            dense
            preventDuplicate
            transitionDuration={{ enter: 200, exit: 50 }}
            variant="info"
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'center',
            }}>
            <Layout />
         </SnackbarProvider>
      </ThemeProvider>
   );
};
