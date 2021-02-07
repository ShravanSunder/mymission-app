const defaultTheme = require('tailwindcss/defaultTheme');

//defaultTheme.screens.sm = '600px';

module.exports = {
   purge: ['./src/**/*.{jsx,tsx,html}', './src/index.html'],
   // purge: {
   //    enabled: false,
   //    content: ['./src/**/*.{jsx,tsx,html}', './src/index.html'],
   // },
   darkMode: 'class', // or 'media' or 'class'
   important: false,
   corePlugins: {
      //preflight: false,
   },
   plugins: [
      require('@tailwindcss/typography'),
      require('tailwindcss-elevation')(['responsive']),
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/line-clamp'),
   ],
   theme: {
      /**
       * a copy of breakpoints from theme.ts
       * keep them in sync
       */
      screens: {
         xs: 0,
         sm: 600,
         md: 768,
         lg: 960,
         xl: 1280,
         '2xl': 1920,
      },
   },
};
