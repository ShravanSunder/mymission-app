import { createMuiTheme, responsiveFontSizes, Theme } from '@material-ui/core/styles';
import { BreakpointValues } from '@material-ui/core/styles/createBreakpoints';
import facepaint from 'facepaint';

declare module '@material-ui/core/styles' {
   interface BreakpointOverrides {
      xs: true; // removes the `xs` breakpoint
      sm: true;
      md: true;
      lg: true;
      xl: true;
      '2xl': true;
   }

   interface ThemeOverrides {
      j: true;
   }
}

type TBreakpoints = { [index: string]: number };
const breakpointsList: TBreakpoints = {
   xs: 0,
   sm: 640,
   md: 768,
   lg: 960,
   xl: 1280,
   '2xl': 1920,
};

const bpMediaQueries = Object.keys(breakpointsList).map((key) => `@media (min-width: ${breakpointsList[key].toFixed(0)}px)`);
export const cssMq = facepaint(bpMediaQueries);

export const createAppTheme = (isDark: boolean): Theme => {
   const background: string = isDark ? '#2f3437' : '#ffffff';

   const theme = createMuiTheme({
      palette: {
         mode: isDark ? 'dark' : 'light',
      },
      breakpoints: {
         values: breakpointsList as BreakpointValues,
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
