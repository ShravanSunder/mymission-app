import { Button, Theme, ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import { FC, useMemo, useState, createRef } from 'react';
import { SnackbarProvider } from 'notistack';
import { createAppTheme } from '~~/styles/theme';
// eslint-disable-next-line import/no-extraneous-dependencies
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';
import { grey, green, red, yellow } from '@material-ui/core/colors';
import { ThemeProvider as EmotionThemeProvider, CacheProvider } from '@emotion/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import createCache from '@emotion/cache';
import { StyleInjectTry } from '~~/components/app/AppRootLoading';

// const snackbarStyles = () => {
//    const snackbarRoot = {
//       color: `${grey[700]}!important`,
//       maxWidth: 280,
//       zIndex: 1000,
//    };

//    return {
//       info: { backgroundColor: `${grey[200]}!important`, ...snackbarRoot },
//       success: { backgroundColor: `${green[50]}!important`, ...snackbarRoot },
//       error: { backgroundColor: `${red[100]}!important`, ...snackbarRoot },
//       warning: {
//          backgroundColor: `${yellow[50]}!important`,
//          ...snackbarRoot,
//       },
//    };
// };

const ThemeProvider: FC = ({ children }) => {
   // const notistackRef = createRef() as any;
   // const onClickDismiss = (key: string | number) => () => {
   //    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
   //    notistackRef?.current?.closeSnackbar(key);
   // };
   // // const classes = snackbarStyles();

   const [isDark] = useState<boolean>(false);

   const theme: Theme = useMemo(() => {
      return createAppTheme(isDark);
   }, [isDark]);

   return (
      <>
         <EmotionThemeProvider theme={theme}>
            <MuiThemeProvider theme={theme}>
               {/* <SnackbarProvider
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
                  }}> */}
               {children}
               {/* </SnackbarProvider> */}
            </MuiThemeProvider>
         </EmotionThemeProvider>
      </>
   );
};

export default ThemeProvider;
