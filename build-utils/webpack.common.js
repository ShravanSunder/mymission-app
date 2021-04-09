/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ProvidePlugin } = require('webpack');

const title = 'MyMission';
const fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2'];

const isDev = process.env.NODE_ENV !== 'production';
require('dotenv').config({ path: `../.env.${process.env.NODE_ENV}` });

console.log('------------------------------------------------------');
console.log('Evironment: isDev', process.env.NODE_ENV, isDev);
console.log('------------------------------------------------------');

/**
 * Use the webpack.development.js file if possible instead
 */

const moduleRules = [
   {
      test: /\.css$/i,
      use: [
         isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
         { loader: 'css-loader', options: { importLoaders: 1 } },
         {
            loader: 'postcss-loader',
            options: {
               sourceMap: false,
               // postcssOptions: {
               //    plugins: () => [postcssPresetEnv(/* pluginOptions */)],
               // },
            },
         },
      ],
      exclude: /node_modules/,
   },
   {
      test: new RegExp(`.(${fileExtensions.join('|')})$`),
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
         title: title,
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
   optimization: {
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
