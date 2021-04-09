import { defineConfig } from 'vite';
import eslint from '@rollup/plugin-eslint';
//import eslintPlugin from 'vite-plugin-eslint';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';
import macrosPlugin from 'vite-plugin-babel-macros';
// import { VitePWA } from 'vite-plugin-pwa'
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
//import * from "@formatjs/intl/"

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
      tsconfigPaths(),
      macrosPlugin(),
      {
         ...eslint(),
         enforce: 'pre',
      },
      getBabelOutputPlugin({
         plugins: [
            'formatjs',
            {
               idInterpolationPattern: '[sha512:contenthash:base64:6]',
               ast: true,
            },
         ],
      }),
      {
         name: 'inject-emotion',
         // @ts-ignore
         transform(src, id) {
            if (/\.tsx?\b/.test(id)) {
               return { code: `import React from 'react'; ` + src };
            }
         },
      },
      reactRefresh(),
   ],
   esbuild: {
      jsxFactory: `_jsx`,
      //jsx
      // jsxFactory: ``,
      jsxInject: `import { jsx as _jsx } from '@emotion/react'`,
   },
   define: {
      'process.env': process.env,
      global: 'window', // fix for packages that support both node and browser
   },
   resolve: {
      alias: [
         {
            find: /^@material-ui\/icons\/(.*)/,
            replacement: '@material-ui/icons/esm/$1',
         },
      ],
   },
   // optimizeDeps: {
   //    include: ['@material-ui/core', '@material-ui/icons', '@material-ui/styles'],
   // },
});
