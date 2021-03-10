import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import { rootReducer } from './reduxRootState';

console.log('Redux store configuration loading');

const middleware = getDefaultMiddleware().concat(logger);

// @ts-ignore
export const reduxStore = configureStore({
   reducer: rootReducer,
   middleware: middleware,
   devTools: process.env.NODE_ENV !== 'production',
});

export default reduxStore;
