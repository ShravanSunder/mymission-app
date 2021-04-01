import { lazy, StrictMode, Suspense, FC } from 'react';
import { ErrorBoundary, ErrorFallback } from './components/common/ErrorFallback';
import _jsxDev from 'react/jsx-runtime';

const isDev = process.env.NODE_ENV === 'development';
console.log(`isDev=${isDev.toString()}`);

const StateRoot = lazy(() => import('./components/app/StateRoot'));

export const App: FC = () => {
   return (
      <StrictMode>
         <Suspense fallback={<div></div>}>
            <StateRoot></StateRoot>
         </Suspense>
      </StrictMode>
   );
};
