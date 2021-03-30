import { FC, lazy, Suspense } from 'react';

import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary, ErrorFallback } from '~~/components/common/ErrorFallback';
import { css } from '@emotion/react';
import { StyleInjectTry, AppLoading } from '~~/components/app/AppLoading';

/**
 * Currently deciding between redux and recoil.
 * Will be using observable-hooks (rxjs) for local state, see readme
 * @param props
 */
const StateRoot: FC = (props) => {
   const style = css({ color: 'red' });
   console.log(style);
   return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
         <RecoilRoot>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
               <StyledEngineProvider injectFirst={false}>
                  <Suspense fallback={<AppLoading />}>{props.children}</Suspense>
               </StyledEngineProvider>
            </ErrorBoundary>
         </RecoilRoot>
      </ErrorBoundary>
   );
};
export default StateRoot;
