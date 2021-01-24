import { reduxStore } from '~~/providers/reduxStore';
import { Provider } from 'react-redux';
import React, { Suspense } from 'react';
import { ErrorBoundary, ErrorFallback } from '~~/components/common/ErrorFallback';
import { IntlProvider } from 'react-intl';

const MainLayout = React.lazy(() => import('~~/components/app/RootRoutes'));

const StateProvider = (): JSX.Element => {
   return (
      <Provider store={reduxStore}>
         <ErrorBoundary FallbackComponent={ErrorFallback}>
            <IntlProvider locale={navigator.language}>
               <Suspense fallback={<div></div>}>
                  <MainLayout />
               </Suspense>
            </IntlProvider>
         </ErrorBoundary>
      </Provider>
   );
};
export default StateProvider;
