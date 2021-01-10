import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { registerServiceWorker } from './workbox/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('app'));

if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => registerServiceWorker());
}
