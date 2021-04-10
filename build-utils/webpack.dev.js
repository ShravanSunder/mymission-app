const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const constants = require('./constants');

const cache = {
   //type: 'memory',
   type: 'filesystem',
   cacheLocation: path.resolve(__dirname, '.cache'),
   // idleTimeout: 10000,
   idleTimeoutForInitialStore: 10000,
};

const moduleRules = [
   {
      test: /\.[tj]sx?$/,
      exclude: [/node_modules/, /\.test\.[tj]sx?$/, /\.stories\.tsx?$/],
      use: [
         {
            loader: require.resolve('babel-loader'),
            options: {
               cacheCompression: false,
               cacheDirectory: true,
               plugins: [require.resolve('react-refresh/babel')],
            },
         },
         {
            loader: 'esbuild-loader',
            options: {
               loader: 'tsx',
               target: constants.targetEnv,
               jsxFactory: '_jsx',
            },
         },
      ],
   },
];

module.exports = {
   mode: 'development',
   stats: 'minimal',
   // infrastructureLogging: {
   //    level: 'verbose',
   // },
   cache: cache,
   bail: false,
   target: 'web', // here because https://github.com/webpack/webpack-dev-server/issues/2758
   plugins: [
      new Dotenv({
         path: path.resolve(__dirname, '..', './.env.development'),
      }),
      new webpack.EvalSourceMapDevToolPlugin({
         exclude: [/vendor\..*.js/],
      }),
      new MiniCssExtractPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
   ],
   output: {
      path: path.resolve(__dirname, '..', './dist'),
      filename: '[name].js',
      chunkFilename: '[name].js',
      publicPath: '/',
   },
   devServer: {
      contentBase: path.resolve(__dirname, '..', './dist'),
      hot: true,
      overlay: false,
      noInfo: true,
      publicPath: '/',
      historyApiFallback: true,
      port: 7035,
      // writeToDisk: true,
      stats: 'errors-only',
   },
   devtool: 'eval-cheap-module-source-map', // 'eval-source-map',
   module: {
      rules: moduleRules,
   },
   optimization: {
      minimize: false,
      chunkIds: 'named',
      splitChunks: {
         cacheGroups: {
            vendor: {
               test: /([/\/])?node_modules([/\/])?/,
               name(module) {
                  // get the name. E.g. node_modules/packageName/not/this/part.js
                  // or node_modules/packageName
                  const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                  // npm package names are URL-safe, but some servers don't like @ symbols
                  return `vendor.${packageName.replace('@', '_')}`;
               },
            },
         },
      },
   },
};

//remember webpack dev server errors are caused by chokdair FSWatch.  you have to wrap the lib code in a try catch directly
