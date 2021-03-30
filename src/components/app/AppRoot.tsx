import { css } from '@emotion/react';

import '~~/styles/css/tailwind-base.css';
import '~~/styles/css/tailwind-components.css';
import '~~/styles/css/tailwind-utilities.css';
import '~~/styles/css/app.css';

import { Suspense, FC } from 'react';
import ThemeProvider from '~~/components/app/ThemeProvider';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { MainAppLayout } from '~~/components/layout/MainAppLayout';
import { ErrorBoundary, ErrorFallback } from '~~/components/common/ErrorFallback';
import { IntlProvider } from 'react-intl';
// import { StyleInjectTry } from '~~/StyleInjectTry';
// import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';

/**
 * App Root that also has the Root Routes required for navigation
 * Intatiates ThemeProvider as well as a Suspense and Errorboundary
 * @see ThemeProvider
 */
const AppRoot: FC = () => {
   return (
      <>
         {/* <StyledEngineProvider injectFirst={false}>
            <StyleInjectTry css={css({ color: 'red' })}></StyleInjectTry> */}
         <ThemeProvider>
            <BrowserRouter>
               <IntlProvider locale="en" defaultLocale="en">
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                     <Suspense fallback={<div></div>}>
                        <Routes>
                           <Route path="/" element={<MainAppLayout></MainAppLayout>} />
                           <Route path="/users/*" element={<div>test users path</div>}></Route>
                           <Route path="/noworkie/:id" element={<div>test not workie</div>}></Route>
                           <Route path="/*" element={<div>notfound</div>} />
                        </Routes>
                     </Suspense>
                  </ErrorBoundary>
               </IntlProvider>
            </BrowserRouter>
         </ThemeProvider>
         {/* </StyledEngineProvider> */}
      </>
   );
};

export default AppRoot;
