const path = require('path');
const Dotenv = require('dotenv-webpack');
const { InjectManifest } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const title = 'Boilerpate-PWA';
const name = 'Boilerpate-PWA with React|Redux|Workbox';
const description = 'Boilerpate-PWA';

const iconSrc = path.resolve(__dirname, '..', './assets/icon.png');
const pwaManifestConfig = {
   name: title,
   short_name: name,
   description: description,
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
      new MiniCssExtractPlugin({
         filename: '[name].[contenthash].css',
         chunkFilename: '[id].[contenthash].css',
      }),
      new WebpackPwaManifest(pwaManifestConfig),
      //new FaviconsWebpackPlugin(iconSrc),
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
