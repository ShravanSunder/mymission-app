import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';
import macrosPlugin from 'vite-plugin-babel-macros';
// import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [reactRefresh(), tsconfigPaths(), macrosPlugin()],
   esbuild: {
      jsxInject: `import React from 'react'`,
      //jsx
      // jsxFactory: ``,
      // jsxInject: `import React from 'react; import {jsx} from '@emotion/react'`,
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
