const muiPlugins = [
   [
      'babel-plugin-transform-imports',
      {
         '@material-ui/core': {
            transform: '@material-ui/core/${member}',
            preventFullImport: true,
         },
         '@material-ui/icons': {
            transform: '@material-ui/icons/${member}',
            preventFullImport: true,
         },
      },
   ],
];

module.exports = function (api) {
   api.cache(false);
   return {
      presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic', importSource: '@emotion/react' }]],
      plugins: [
         //...muiPlugins,
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
