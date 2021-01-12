module.exports = {
   purge: {
      enabled: true, //process.env.NODE_ENV === 'production',
      content: ['./src/**/*.{jsx,tsx,html}', './src/index.html'],
   },
   darkMode: 'class', // or 'media' or 'class'
   important: false,
};
