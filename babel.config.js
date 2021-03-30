module.exports = function (api) {
   api.cache(true);
   return {
      presets: [['@babel/preset-react', { runtime: 'automatic' }], '@babel/preset-env'],
      plugins: [
         '@emotion',
         'babel-plugin-macros',
         [
            'formatjs',
            {
               idInterpolationPattern: '[sha512:contenthash:base64:6]',
               ast: true,
            },
         ],
      ],
   };
};
