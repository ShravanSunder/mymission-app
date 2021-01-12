// @ts-nocheck
/* eslint-disable @typescript-eslint/no-floating-promises */

import React from 'react';
import { registerServiceWorker } from './serviceworker/registerServiceWorker';

(async () => {
   // dynamic imports for code splitting
   const ReactDOM = await import('react-dom');
   const { App } = await import('./App');
   ReactDOM.render(<App />, document.getElementById('app'));
})();

if ('serviceWorker' in navigator) {
   // eslint-disable-next-line
   window.addEventListener('load', () => registerServiceWorker());
}
