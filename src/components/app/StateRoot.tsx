import { css, jsx } from '@emotion/react/macro';
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';
import { FC, lazy, Suspense } from 'react';
import { RecoilRoot } from 'recoil';

import { AppRootLoading } from '~~/components/app/AppRootLoading';
import { ErrorBoundary, ErrorFallback } from '~~/components/common/ErrorFallback';

const AppRootLazy = lazy(() => import(/* webpackChunkName: "AppRoot" */ '~~/components/app/AppRoot'));

/**
 * Using Reocil with observable-hooks (rxjs) for local state, see readme.
 * It has a suspense and app loading that circumvents issues with emotion-mui style injection
 * see @see AppRootLoading for more details
 */
const StateRoot: FC = () => {
   const style = css({ color: 'red' });
   console.log(style);
   return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
         <RecoilRoot>
            <StyledEngineProvider injectFirst={false}>
               <Suspense fallback={<AppRootLoading />}>
                  <AppRootLazy />
               </Suspense>
            </StyledEngineProvider>
         </RecoilRoot>
      </ErrorBoundary>
   );
};
export default StateRoot;
