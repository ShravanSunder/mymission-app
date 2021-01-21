/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const title = 'Boilerpate-PWA';
const fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2'];

console.log('------------------------------------------------------');
console.log('------------------------------------------------------');
console.log('------------------------------------------------------');

/**
 * Use the webpack.development.js file if possible instead
 */
const isDev = process.env.NODE_ENV !== 'production';

const moduleRules = [
   {
      test: /\.css$/i,
      use: [
         isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
         {
            loader: 'css-loader',
            options: {
               // Run `postcss-loader` on each CSS `@import`, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
               // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
               importLoaders: 1,
               // Automatically enable css modules for files satisfying `/\.module\.\w+$/i` RegExp.
               modules: { auto: true },
            },
         },
         {
            loader: 'postcss-loader',
         },
      ],
      exclude: /node_modules/,
   },
   {
      test: new RegExp(`.(${fileExtensions.join('|')})$`),
      loader: 'file-loader',
      options: {
         name: '[path][name].[ext]',
      },
      exclude: /node_modules/,
   },
];

module.exports = {
   entry: path.resolve(__dirname, '..', './src/index.js'),
   module: {
      rules: moduleRules,
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
                  return `vendor.npm.${packageName.replace('@', '_')}`;
               },
            },
         },
      },
   },
};
