import { grey } from '@material-ui/core/colors';
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

const modifyComponents = (theme: Theme, background: string) => {
   theme.components = {
      MuiPopover: {
         defaultProps: {
            anchorOrigin: {
               vertical: 'bottom',
               horizontal: 'left',
            },
            transformOrigin: {
               vertical: 'top',
               horizontal: 'left',
            },
         },
      },
      MuiTooltip: {
         styleOverrides: {
            tooltip: {
               backgroundColor: '#f5f5f599',
               color: grey[900],
               fontSize: 9,
               boxShadow: theme.shadows[1],
            },
            tooltipPlacementTop: {
               position: 'relative',
               top: 9,
               left: 9,
            },
            tooltipPlacementBottom: {
               position: 'relative',
               top: -9,
               left: 9,
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
   };
};

const modifyTypography = (theme: Theme) => {
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
};

type TBreakpoints = { [index: string]: number };
/**
 * a copy of the breakpoints from tailwind config.
 * keep them in sync
 */
export const breakpointsList: TBreakpoints = {
   xs: 0,
   sm: 600,
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
   });

   // Check app.css for theme typography.
   // the values are based on tailwind
   modifyTypography(theme);

   modifyComponents(theme, background);

   return responsiveFontSizes(createMuiTheme(theme), { factor: 1.75, breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'] });
};
