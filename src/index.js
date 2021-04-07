// @ts-nocheck
/* eslint-disable @typescript-eslint/no-floating-promises */

// import { registerServiceWorker } from './serviceworker/registerServiceWorker.ts';
(async () => {
   // dynamic imports for code splitting
   const ReactDOM = await import(/* webpackChunkName: "react-dom" */ 'react-dom');
   // const React = await import('react');
   const { App } = await import(/* webpackChunkName: "App" */ './App');

   // concurrent mode
   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
   // ReactDOM.unstable_createRoot(document.getElementById('app')).render(<App />);

   // legacy mode
   const root = document.getElementById('root');
   ReactDOM.render(<App />, root);

   if ('serviceWorker' in navigator) {
      // const registerServiceWorker = await import(/* webpackChunkName: "registerServiceWorker" */ './serviceworker/registerServiceWorker.ts');
      // eslint-disable-next-line
      //window.addEventListener('load', () => registerServiceWorker());
   }
})();
