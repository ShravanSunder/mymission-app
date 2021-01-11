import { Button, Theme, ThemeProvider } from '@material-ui/core';
import React, { FunctionComponent, useMemo, useState } from 'react';
import { SnackbarProvider } from 'notistack';
import { createAppTheme } from 'Monkey/styles/theme';
import { useStyles } from './MainLayout';

export const MaterialProvider: FunctionComponent = ({ children }) => {
   const classes = useStyles();
   const notistackRef = React.createRef() as any;
   const onClickDismiss = (key: string | number) => () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      notistackRef?.current?.closeSnackbar(key);
   };

   const [isDark] = useState<boolean>(true);

   const theme: Theme = useMemo(() => {
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
            {children}
         </SnackbarProvider>
      </ThemeProvider>
   );
};
