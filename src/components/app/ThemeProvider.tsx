import { Button, Theme, ThemeProvider as MuiThemeProvider, createStyles, makeStyles } from '@material-ui/core';
import React, { FunctionComponent, useMemo, useState } from 'react';
import { SnackbarProvider } from 'notistack';
import { createAppTheme } from '~~/styles/theme';
import { StylesProvider } from '@material-ui/core/styles';
import { grey, green, red, yellow } from '@material-ui/core/colors';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';

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

const ThemeProvider: FunctionComponent = ({ children }) => {
   const classes = useStyles();
   const notistackRef = React.createRef() as any;
   const onClickDismiss = (key: string | number) => () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      notistackRef?.current?.closeSnackbar(key);
   };

   const [isDark] = useState<boolean>(false);

   const theme: Theme = useMemo(() => {
      return createAppTheme(isDark);
   }, [isDark]);

   return (
      <StylesProvider injectFirst>
         <MuiThemeProvider theme={theme}>
            <EmotionThemeProvider theme={theme}>
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
                  {children}
               </SnackbarProvider>
            </EmotionThemeProvider>
         </MuiThemeProvider>
      </StylesProvider>
   );
};

export default ThemeProvider;
