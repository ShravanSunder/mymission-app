module.exports = {
   purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html', './src/index.html'],
   presets: [],
   plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography'), require('tailwindcss-children')],
   darkMode: false, // or 'media' or 'class'
   theme: {
      extend: {
         colors: {
            gray: colors.coolGray,
            blue: colors.lightBlue,
            red: colors.rose,
            pink: colors.fuchsia,
         },
         fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
         },
         extend: {
            spacing: {
               128: '32rem',
               144: '36rem',
            },
            borderRadius: {
               '4xl': '2rem',
            },
         },
      },
   },
   variants: {
      extend: {},
   },
   important: false,
};
