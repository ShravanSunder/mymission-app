import '~~/styles/css/tailwind-base.pcss';
import '~~/styles/css/tailwind-components.pcss';
import '~~/styles/css/tailwind-utilities.pcss';
import '~~/styles/css/app.pcss';

import React, { Suspense, FC } from 'react';
import { IntlProvider, RawIntlProvider } from 'react-intl';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { getIntlRoot, intlLocaleAtom, intlProviderAtom } from '~~/components/app/IntlProvider';
import ThemeProvider from '~~/components/app/ThemeProvider';
import { ErrorBoundary, ErrorFallback } from '~~/components/common/ErrorFallback';
import { MainAppLayout } from '~~/components/layout/MainAppLayout';

/**
 * App Root that is called by @see StateRoot.  It contains routes required for navigation
 * Intatiates @see ThemeProvider as well as a Suspense and Errorboundary
 * @see ThemeProvider
 */
const AppRoot: FC = () => {
   const intlLocaleValue = useRecoilValue(intlLocaleAtom);
   const intlProviderValue = useRecoilValue(intlProviderAtom);

   return (
      <ThemeProvider>
         <RawIntlProvider value={intlProviderValue} key={intlLocaleValue}>
            <BrowserRouter>
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
            </BrowserRouter>
         </RawIntlProvider>
      </ThemeProvider>
   );
};

export default AppRoot;
