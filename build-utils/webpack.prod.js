const path = require('path');
const Dotenv = require('dotenv-webpack');
const { InjectManifest } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const constants = require('./constants');

const iconSrc = path.resolve(__dirname, '..', './public/assets/icon.png');
const pwaManifestConfig = {
   name: title,
   short_name: constants.name,
   description: constants.name,
   background_color: '#ffffff',
   crossorigin: 'use-credentials',
   icons: [
      {
         src: iconSrc,
         sizes: [96, 128, 192, 256, 384, 512],
      },
   ],
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
            },
         },
         {
            loader: 'esbuild-loader',
            options: {
               loader: 'tsx',
               target: envTargets,
               jsxFactory: '_jsx',
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
      new MiniCssExtractPlugin({
         filename: '[name].[contenthash].css',
         chunkFilename: '[id].[contenthash].css',
      }),
      new WebpackPwaManifest(pwaManifestConfig),
   ],
   devServer: {
      contentBase: path.resolve(__dirname, '..', './dist'),
   },
   //devtool: 'none', // 'source-map',
   module: {
      rules: moduleRules,
   },
   output: {
      path: path.resolve(__dirname, '..', './build'),
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[chunkhash].js',
   },
   optimization: {
      minimize: true,
      removeAvailableModules: true,
      removeEmptyChunks: true,
   },
   optimization: {
      minimizer: new ESBuildMinifyPlugin({
         target: constants.envTargets,
         css: true,
         minifyWhitespace: true,
      }),
      runtimeChunk: 'single',
      moduleIds: 'deterministic',
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
