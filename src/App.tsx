import { lazy, StrictMode, Suspense } from 'react';
// import StateRoot from './components/app/StateRoot';
import { ErrorBoundary, ErrorFallback } from './components/common/ErrorFallback';

const isDev = process.env.NODE_ENV === 'development';
console.log(`isDev=${isDev.toString()}`);

const StateRoot = lazy(() => import('./components/app/StateRoot'));

export const App = (): JSX.Element => {
   return (
      <StrictMode>
         <Suspense fallback={<div></div>}>
            <StateRoot></StateRoot>
         </Suspense>
      </StrictMode>
   );
};
