const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

const cache = {
   //type: 'memory',
   type: 'filesystem',
   cacheLocation: path.resolve(__dirname, '.cache'),
   store: 'pack',
   buildDependencies: {
      // This makes all dependencies of this file - build dependencies
      config: [__filename],
      // By default webpack and loaders are build dependencies
   },
};

const moduleRules = [
   {
      test: /\.[tj]sx?$/,
      exclude: [/node_modules/, /\.test\.[tj]sx?$/, /\.stories\.tsx?$/],
      use: [
         {
            loader: require.resolve('babel-loader'),
            options: {
               cacheDirectory: true,
               // ... other options
               plugins: [
                  // ... other plugins
                  require.resolve('react-refresh/babel'),
               ].filter(Boolean),
            },
         },
         {
            loader: 'ts-loader',
            options: { transpileOnly: true },
         },
      ],
   },
];

module.exports = {
   mode: 'development',
   cache: cache,
   plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new Dotenv({
         path: path.resolve(__dirname, '..', './.env.development'),
      }),
      new webpack.EvalSourceMapDevToolPlugin({
         exclude: ['vendor.js'],
      }),
      new ReactRefreshWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin({
         eslint: {
            files: './src/**/*.{ts,tsx,js,jsx}',
         },
      }),
      new InjectManifest({
         swSrc: path.resolve(__dirname, '../src/sw.js'),
         maximumFileSizeToCacheInBytes: 50 * 1000 * 1000, //50mb,
         exclude: [/node_modules/, /\.test\.tsx?$/, /\.stories\.tsx?$/],
      }),
   ],
   devServer: {
      contentBase: path.resolve(__dirname, '..', './dist'),
      hot: true,
   },
   devtool: 'eval-source-map',
   module: {
      rules: moduleRules,
   },
   optimization: {
      minimize: false,
      chunkIds: 'named',
   },
};
