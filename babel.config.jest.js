const babelOptions = require('./babel.config.json');

babelOptions.presets.push('@babel/preset-typescript');

// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = require('babel-jest').createTransformer(babelOptions);

const data = require('ts-jest').createTransformer();
