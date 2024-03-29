import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { Theme } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { FC, useMemo, useState } from 'react';

import { createAppTheme } from '~~/styles/theme';

// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies

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
   );
};

export default ThemeProvider;
