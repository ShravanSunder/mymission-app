/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ProvidePlugin } = require('webpack');

const constants = require('./constants');

const isDev = process.env.NODE_ENV !== 'production';
require('dotenv').config({ path: `../.env.${process.env.NODE_ENV}` });

console.log('------------------------------------------------------');
console.log('Evironment: isDev', process.env.NODE_ENV, isDev);
console.log('------------------------------------------------------');

/**
 * used with .dev and .prod files
 */

const moduleRules = [
   {
      test: /\.(css|pcss)$/i,
      use: [
         // isDev ? 'style-loader' : MiniCssExtractPlugin.loader
         MiniCssExtractPlugin.loader,
         { loader: 'css-loader', options: { importLoaders: 2 } },
         {
            loader: 'postcss-loader',
            options: {
               sourceMap: false,
            },
         },
         {
            loader: 'esbuild-loader',
            options: {
               loader: 'css',
               target: constants.targetEnv,
               minify: isDev ? false : true,
               sourcemap: false,
            },
         },
      ],
      exclude: /node_modules/,
   },
   {
      test: new RegExp(`.(${constants.assetExtensions.join('|')})$`),
      type: 'asset/resource',
      exclude: /node_modules/,
   },
];

module.exports = {
   entry: path.resolve(__dirname, '..', './src/index.js'),
   module: {
      rules: moduleRules,
   },
   stats: 'minimal',
   infrastructureLogging: {
      level: 'warn',
   },
   resolve: {
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
      alias: {
         '~~': path.resolve(__dirname, '..', 'src'),
      },
   },
   plugins: [
      new ESLintPlugin({ cache: true }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
         title: constants.title,
         template: path.resolve(__dirname, '..', './src/index.html'),
      }),
      new ProvidePlugin({
         React: 'react',
         _jsx: ['@emotion/react', 'jsx'],
      }),
   ],
   performance: {
      // maxEntrypointSize: 512000,
      // maxAssetSize: 512000,
   },
};
