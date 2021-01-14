import { reduxStore } from '~~/providers/reduxStore';
import { Provider } from 'react-redux';
import React, { Suspense } from 'react';
import { ErrorBoundary, ErrorFallback } from '~~/components/common/ErrorFallback';

const MainLayout = React.lazy(() => import('~~/components/layout/RootRoutes'));

const StateProvider = (): JSX.Element => {
   return (
      <Provider store={reduxStore}>
         <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<div></div>}>
               <MainLayout />
            </Suspense>
         </ErrorBoundary>
      </Provider>
   );
};
export default StateProvider;
