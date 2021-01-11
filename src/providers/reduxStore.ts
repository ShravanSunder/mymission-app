import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, compose } from 'redux';
import { rootReducer, history } from './reduxRoot';
import { routerMiddleware } from 'connected-react-router';

console.log('Redux store configuration loading');

const epicMiddleware = createEpicMiddleware();
const middleware = getDefaultMiddleware().concat(logger, epicMiddleware, routerMiddleware(history));

// @ts-ignore
export const reduxStore = configureStore({
   reducer: rootReducer,
   middleware: middleware,
   devTools: process.env.NODE_ENV !== 'production',
});

export default reduxStore;
