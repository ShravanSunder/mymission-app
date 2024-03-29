const defaultTheme = require('tailwindcss/defaultTheme');

//defaultTheme.screens.sm = '600px';

module.exports = {
   purge: ['./src/**/*.{jsx,tsx,html,js,ts}', './public/**/*.html'],
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
         xs: { min: '0px', max: '679px' },
         sm: '700px',
         md: '820px',
         lg: '960px',
         xl: '1280px',
         '2xl': '1920px',
      },
      extend: {
         /**
          *  added the default spacing values to max width
          * @param theme
          */
         maxWidth: (theme) => ({
            ...theme('spacing'),
         }),
         minWidth: (theme) => ({
            ...theme('spacing'),
         }),
         backgroundColor: ['group-focus'],
         borderWidth: {
            1: '1px',
         },
      },
   },
   variants: {
      extend: {
         // ...
         borderWidth: ['hover', 'focus'],
      },
   },
};
