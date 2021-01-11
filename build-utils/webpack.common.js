/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const title = 'Boilerpate-PWA';
const name = 'Boilerpate-PWA with React|Redux|Workbox';
const description = 'Boilerpate-PWA';
const fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2'];

const pwaManifestConfig = {
   name: title,
   short_name: name,
   description: description,
   background_color: '#ffffff',
   crossorigin: 'use-credentials',
   icons: [
      {
         src: path.resolve('assets/icon.png'),
         sizes: [96, 128, 192, 256, 384, 512],
      },
   ],
};

const moduleRules = [
   {
      test: /\.css$/,
      use: [
         {
            loader: 'style-loader',
         },
         { loader: 'css-loader', options: { importLoaders: 1 } },

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
      new ESLintPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
         title: title,
         template: path.resolve(__dirname, '..', './src/index.html'),
      }),
      new WebpackPwaManifest(pwaManifestConfig),
      new FaviconsWebpackPlugin('assets/icon.png'),
   ],
   output: {
      path: path.resolve(__dirname, '..', 'dist'),
      filename: '[name].[contenthash].js',
   },
   optimization: {
      runtimeChunk: 'single',
      moduleIds: 'deterministic',
   },
};
