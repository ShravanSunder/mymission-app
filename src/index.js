// @ts-nocheck

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { registerServiceWorker } from './serviceworker/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('app'));

// if ('serviceWorker' in navigator) {
//    // eslint-disable-next-line
//    window.addEventListener('load', () => registerServiceWorker());
// }
