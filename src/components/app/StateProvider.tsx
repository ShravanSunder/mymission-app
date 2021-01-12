import { reduxStore } from '~~/providers/reduxStore';
import { Provider } from 'react-redux';
import React from 'react';
import { ErrorBoundary, ErrorFallback } from '~~/components/common/ErrorFallback';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '~~/providers/reduxRoot';

export const MainLayout = React.lazy(() => import('~~/components/layout/MainLayout'));

export const StateProvider = (): JSX.Element => {
   return (
      <Provider store={reduxStore}>
         <ErrorBoundary FallbackComponent={ErrorFallback}>
            <ConnectedRouter history={history}>
               <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <MainLayout />
               </ErrorBoundary>
            </ConnectedRouter>
         </ErrorBoundary>
      </Provider>
   );
};
export default StateProvider;
