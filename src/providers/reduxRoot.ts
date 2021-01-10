/* eslint-disable @typescript-eslint/no-unsafe-return */
import { combineReducers } from '@reduxjs/toolkit';
import { combineEpics } from 'redux-observable';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const reducers = {
   router: connectRouter(history),
};
export const rootReducer = combineReducers(reducers);
export type RootState = ReturnType<typeof rootReducer>;

export const rootEpic = combineEpics([]);
