// @ts-nocheck
/* eslint-disable @typescript-eslint/no-floating-promises */

// import { registerServiceWorker } from './serviceworker/registerServiceWorker.ts';
(async () => {
   // dynamic imports for code splitting
   const ReactDOM = await import('react-dom');
   const { App } = await import('./App');

   // concurrent mode
   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
   // ReactDOM.unstable_createRoot(document.getElementById('app')).render(<App />);

   // legacy mode
   ReactDOM.render(<App />, document.getElementById('app'));
})();

if ('serviceWorker' in navigator) {
   // eslint-disable-next-line
   //window.addEventListener('load', () => registerServiceWorker());
}
