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
       * don't use xs in tailwind, system assumes mobile first
       * tailwind requires px
       */
      screens: {
         xs: { min: '0px', max: '599px' },
         sm: '600px',
         md: '740px',
         lg: '960px',
         xl: '1280px',
         '2xl': '1920px',
      },
      extend: {
         // ...
         maxWidth: {
            '2xs': '16rem',
            12: '12rem',
            10: '10rem',
            8: '8rem',
            6: '6rem',
            5: '5rem',
            4: '4rem',
            3: '3rem',
            2: '2rem',
            1: '1rem',
         },
      },
   },
};
