const babelOptions = require('./babel.config.js');

if (babelOptions.presets == null) {
   babelOptions.presets = [];
}

babelOptions.presets = babelOptions.presets.concat([
   '@babel/preset-env',
   ['@babel/preset-react', { runtime: 'automatic', importSource: '@emotion/react' }],
   '@babel/preset-typescript',
]);

// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = require('babel-jest').createTransformer(babelOptions);
