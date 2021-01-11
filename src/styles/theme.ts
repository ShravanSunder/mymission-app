import { createMuiTheme, responsiveFontSizes, Theme } from '@material-ui/core/styles';

// declare module '@material-ui/core/styles/createMuiTheme' {
//    interface Theme {
//       status: {
//          danger: React.CSSProperties['color'];
//       };
//    }
//    interface ThemeOptions {
//       status: {
//          danger: React.CSSProperties['color'];
//       };
//    }
// }

// declare module '@material-ui/core/styles/createPalette' {
//    interface Palette {
//       // fabBackground: Palette['primary'];
//    }
//    interface PaletteOptions {
//       // fabBackground: PaletteOptions['primary'];
//    }
// }

export const createAppTheme = (isDark: boolean): Theme => {
   const background: string = isDark ? '#2f3437' : '#ffffff';

   const theme = createMuiTheme({
      palette: {
         type: isDark ? 'dark' : 'light',
      },
      typography: {
         fontFamily: ['sans-serif'].join(','),
         fontSize: 12,
      },
      spacing: 12,
      overrides: {
         MuiTooltip: {
            tooltipPlacementTop: {
               position: 'relative',
               top: 9,
            },
            tooltipPlacementBottom: {
               position: 'relative',
               top: -9,
            },
         },
         MuiPaper: {
            root: {
               backgroundColor: background,
            },
         },
      },
      props: {
         MuiPopover: {
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
   });
   return responsiveFontSizes(theme);
};
