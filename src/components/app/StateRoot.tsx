import { reduxStore } from '~~/providers/reduxStore';
import { Provider } from 'react-redux';
import React, { Suspense } from 'react';
import { ErrorBoundary, ErrorFallback } from '~~/components/common/ErrorFallback';
import { RecoilRoot } from 'recoil';

const AppRoot = React.lazy(() => import('~~/components/app/AppRoot'));

/**
 * Currently deciding between redux and recoil.
 * Will be using observable-hooks (rxjs) for local state, see readme
 * @param props
 */
const StateRoot: React.FC = () => {
   return (
      <Provider store={reduxStore}>
         <RecoilRoot>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
               <Suspense fallback={<div></div>}>
                  <AppRoot />
               </Suspense>
            </ErrorBoundary>
         </RecoilRoot>
      </Provider>
   );
};
export default StateRoot;
