import { reduxStore } from '~~/providers/reduxStore';
import { Provider } from 'react-redux';
import React, { Suspense } from 'react';
import { ErrorBoundary, ErrorFallback } from '~~/components/common/ErrorFallback';
import { IntlProvider } from 'react-intl';
import { RecoilRoot } from 'recoil';
import { recoilRootState } from '~~/providers/recoilRootState';

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
               <IntlProvider locale={navigator.language}>
                  <Suspense fallback={<div></div>}>
                     <AppRoot />
                  </Suspense>
               </IntlProvider>
            </ErrorBoundary>
         </RecoilRoot>
      </Provider>
   );
};
export default StateRoot;
