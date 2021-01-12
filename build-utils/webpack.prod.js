const path = require('path');
const Dotenv = require('dotenv-webpack');
const { InjectManifest } = require('workbox-webpack-plugin');

const moduleRules = [
   {
      test: /\.[tj]sx?$/,
      exclude: [/node_modules/, /\.test\.[tj]sx?$/, /\.stories\.tsx?$/],
      use: [
         {
            loader: require.resolve('babel-loader'),
         },
         {
            loader: 'ts-loader',
            options: {
               transpileOnly: true,
               configFile: path.resolve(__dirname, '..', 'tsconfig.json'),
            },
         },
      ],
   },
];

module.exports = {
   mode: 'production',
   plugins: [
      new Dotenv({
         path: path.resolve(__dirname, '..', './.env.production'),
      }),
      new InjectManifest({
         swSrc: path.resolve(__dirname, '..', './src/sw.js'),
         maximumFileSizeToCacheInBytes: 500 * 1000, //500kb
         exclude: [/node_modules/, /\.test\.tsx?$/, /\.stories\.tsx?$/],
      }),
   ],
   devServer: {
      contentBase: path.resolve(__dirname, '..', './dist'),
   },
   //devtool: 'source-map',
   module: {
      rules: moduleRules,
   },
   output: {
      path: path.resolve(__dirname, '..', './build'),
      filename: '[name].[contenthash].js',
   },
   optimization: {
      minimize: true,
      removeAvailableModules: true,
      removeEmptyChunks: true,
   },
};
