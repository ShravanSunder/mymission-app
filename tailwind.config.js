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
};
