import { createMuiTheme, responsiveFontSizes, Theme } from '@material-ui/core/styles';

export const createAppTheme = (isDark: boolean): Theme => {
   const background: string = isDark ? '#2f3437' : '#ffffff';

   const theme = createMuiTheme({
      palette: {
         mode: isDark ? 'dark' : 'light',
      },
      typography: {
         fontSize: 12,
         // fontFamily: ['sans-serif'].join(','),
      },
      spacing: (factor: number) => `${0.5 * factor}rem`,
      components: {
         MuiPopover: {
            defaultProps: {
               // anchorOrigin: {
               //    vertical: 'bottom',
               //    horizontal: 'left',
               // },
               // transformOrigin: {
               //    vertical: 'top',
               //    horizontal: 'left',
               // },
            },
         },
         MuiTooltip: {
            styleOverrides: {
               tooltipPlacementTop: {
                  position: 'relative',
                  top: 9,
               },
               tooltipPlacementBottom: {
                  position: 'relative',
                  top: -9,
               },
            },
         },
         MuiPaper: {
            styleOverrides: {
               root: {
                  backgroundColor: background,
               },
            },
         },
      },
   });
   return responsiveFontSizes(theme);
};
