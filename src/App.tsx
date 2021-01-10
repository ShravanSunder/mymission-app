import './styles/css/tailwind-base.css';
import './styles/css/tailwind-components.css';
import './styles/css/tailwind-utilities.css';

import { reduxStore } from './providers/reduxStore';
import { Provider } from 'react-redux';

import React, { StrictMode } from 'react';

import { ErrorBoundary, ErrorFallback } from './components/common/ErrorFallback';
import { MainLayout } from './components/layout/MainLayout';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './providers/reduxRoot';

export const App = (): JSX.Element => {
   return (
      <StrictMode>
         <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Provider store={reduxStore}>
               <ConnectedRouter history={history}>
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                     <MainLayout />
                  </ErrorBoundary>
               </ConnectedRouter>
            </Provider>
         </ErrorBoundary>
      </StrictMode>
   );
};
