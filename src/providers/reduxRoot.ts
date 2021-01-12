/* eslint-disable @typescript-eslint/no-unsafe-return */
import { combineReducers } from '@reduxjs/toolkit';
import { combineEpics } from 'redux-observable';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { catchError } from 'rxjs/operators';

export const history = createBrowserHistory();

const reducers = {
   router: connectRouter(history),
};
export const rootReducer = combineReducers(reducers);
export type RootState = ReturnType<typeof rootReducer>;

const epics: [] = [];
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const rootEpic = (action$: any, store$: any, dependencies: any) =>
   combineEpics(...epics)(action$, store$, dependencies).pipe(
      catchError((error, source) => {
         console.error(error);
         return source;
      })
   );
