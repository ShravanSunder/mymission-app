import { reduxStore } from '~~/providers/reduxStore';
import { Provider } from 'react-redux';
import { Suspense, FC, lazy } from 'react';
import { ErrorBoundary, ErrorFallback } from '~~/components/common/ErrorFallback';
import { RecoilRoot } from 'recoil';
import RecoilizeDebugger from 'recoilize';

const AppRoot = lazy(() => import('~~/components/app/AppRoot'));

const isDev = process.env.NODE_ENV === 'development';
console.log(`isDev=${isDev.toString()}`);

/**
 * Currently deciding between redux and recoil.
 * Will be using observable-hooks (rxjs) for local state, see readme
 * @param props
 */
const StateRoot: FC = () => {
   return (
      <RecoilRoot>
         <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<div></div>}>
               <AppRoot />
            </Suspense>
         </ErrorBoundary>
      </RecoilRoot>
   );
};
export default StateRoot;
