import React, { StrictMode, Suspense } from 'react';
import StateProvider from './components/app/StateProvider';
import { ErrorBoundary, ErrorFallback } from './components/common/ErrorFallback';

// const StateProvider = React.lazy(() => import('~~/components/app/StateProvider'));

export const App = (): JSX.Element => {
   return (
      <StrictMode>
         <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<div>fallback</div>}>
               <StateProvider></StateProvider>
            </Suspense>
         </ErrorBoundary>
      </StrictMode>
   );
};
