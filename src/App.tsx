import React, { StrictMode, Suspense } from 'react';
import { ErrorBoundary, ErrorFallback } from './components/common/ErrorFallback';

const StateProviders = React.lazy(() => import('~~/components/app/StateProvider'));

export const App = (): JSX.Element => {
   return (
      <StrictMode>
         <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<div>loading...</div>}>
               <StateProviders></StateProviders>
            </Suspense>
         </ErrorBoundary>
      </StrictMode>
   );
};
