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
         fontSize: 10,
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

   // Check app.css for theme typography.
   // the values are based on tailwind
   theme.typography.h1 = {
      ...theme.typography.h1,
      fontSize: '2.25rem',
      // lineHeight: '2.5rem',
      lineHeight: '1.1',
   };

   theme.typography.h2 = {
      ...theme.typography.h3,
      fontSize: '1.875rem',
      // lineHeight: '2.25rem',
      lineHeight: '1.2',
   };
   theme.typography.h3 = {
      ...theme.typography.h4,
      fontSize: '1.5rem',
      // lineHeight: '2rem',
      lineHeight: '1.3',
   };
   theme.typography.h4 = {
      ...theme.typography.h6,
      fontSize: '1.125rem',
      // lineHeight: '1.5rem',
      lineHeight: '1.33',
   };
   theme.typography.body1 = {
      ...theme.typography.body1,
      fontSize: '1rem',
      // lineHeight: '1.5rem',
      lineHeight: '1.5',
   };
   theme.typography.body2 = {
      ...theme.typography.body2,
      fontSize: '0.875rem',
      // lineHeight: '1.25rem',
      lineHeight: '1.42',
   };
   theme.typography.subtitle1 = {
      ...theme.typography.subtitle1,
      fontSize: '1rem',
      // lineHeight: '1.5rem',
      lineHeight: '1.5',
   };
   theme.typography.subtitle2 = {
      ...theme.typography.subtitle2,
      fontSize: '0.875rem',
      // lineHeight: '1.25rem',
      lineHeight: '1.42',
   };
   theme.typography.caption = {
      ...theme.typography.caption,
      fontSize: '0.75rem',
      // lineHeight: '1rem',
      lineHeight: '1.33',
   };

   return responsiveFontSizes(theme, { factor: 1.75, breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'] });
};
