import { lazy, StrictMode, Suspense } from 'react';
import StateRoot from './components/app/StateRoot';
import { ErrorBoundary, ErrorFallback } from './components/common/ErrorFallback';

const AppRoot = lazy(() => import('~~/components/app/AppRoot'));

export const App = (): JSX.Element => {
   return (
      <StrictMode>
         <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<div>fallback</div>}>
               <StateRoot>{AppRoot}</StateRoot>
            </Suspense>
         </ErrorBoundary>
      </StrictMode>
   );
};
