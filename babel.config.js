module.exports = function (api) {
   api.cache(true);
   return {
      plugins: [
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
