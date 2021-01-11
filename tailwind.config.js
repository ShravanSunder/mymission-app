module.exports = {
   purge: {
      enabled: process.env.NODE_ENV === 'production',
      content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html', './src/index.html'],
   },
   darkMode: 'class', // or 'media' or 'class'
   important: false,
};
