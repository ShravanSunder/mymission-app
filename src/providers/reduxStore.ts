import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, compose } from 'redux';
import { rootReducer, history } from './reduxRoot';
import { routerMiddleware } from 'connected-react-router';

console.log('Redux store configuration loading');

declare global {
   interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
   }
}

const composeEnhancers = (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const epicMiddleware = createEpicMiddleware();
const middleware = getDefaultMiddleware().concat(logger, epicMiddleware, routerMiddleware(history));

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const enhancers = composeEnhancers(applyMiddleware(...middleware));
// @ts-ignore
export const reduxStore = configureStore({
   reducer: rootReducer,
   // enhancers: process.env.NODE_ENV !== 'production' ? enhancers : applyMiddleware(...middleware),
   // devTools: process.env.NODE_ENV !== 'production',
});

export default reduxStore;
