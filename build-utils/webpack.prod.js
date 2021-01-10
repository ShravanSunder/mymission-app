const path = require('path');
const Dotenv = require('dotenv-webpack');
const { InjectManifest } = require('workbox-webpack-plugin');

const moduleRules = [
   {
      test: /\.(js|jsx|)$/,
      use: ['babel-loader'],
      exclude: [/node_modules/, /\.test\.tsx?$/, /\.stories\.tsx?$/],
   },
   {
      test: /\.(ts|tsx)$/,
      exclude: [/node_modules/, /\.test\.tsx?$/, /\.stories\.tsx?$/],
      use: ['ts-loader'],
      options: { transpileOnly: true },
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
   devtool: 'source-map',
   module: {
      rules: moduleRules,
   },
   optimization: {
      minimize: true,
      removeAvailableModules: true,
      removeEmptyChunks: true,
      splitChunks: {
         cacheGroups: {
            vendor: {
               test: /[\\/]node_modules[\\/]/,
               name: 'vendors',
               chunks: 'all',
            },
         },
      },
   },
};
