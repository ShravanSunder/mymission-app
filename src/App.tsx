import React, { lazy, StrictMode, Suspense } from 'react';
import StateRoot from './components/app/StateRoot';
import { ErrorBoundary, ErrorFallback } from './components/common/ErrorFallback';

const isDev = process.env.NODE_ENV === 'development';
console.log(`isDev=${isDev.toString()}`);

const AppRootLazy = lazy(() => import('~~/components/app/AppRoot'));

export const App = (): JSX.Element => {
   return (
      <StrictMode>
         <StateRoot>
            <AppRootLazy />
         </StateRoot>
      </StrictMode>
   );
};
