import '~~/styles/css/tailwind-base.css';
import '~~/styles/css/tailwind-components.css';
import '~~/styles/css/tailwind-utilities.css';
import '~~/styles/css/app.css';

import { Suspense, FC } from 'react';
import ThemeProvider from '~~/components/app/ThemeProvider';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { MainAppLayout } from '../layout/MainAppLayout';
import { ErrorBoundary, ErrorFallback } from '~~/components/common/ErrorFallback';

/**
 * App Root that also has the Root Routes required for navigation
 * Intatiates ThemeProvider as well as a Suspense and Errorboundary
 * @see ThemeProvider
 */
const AppRoot: FC = () => {
   return (
      <ThemeProvider>
         <BrowserRouter>
            <Suspense fallback={<div></div>}>
               <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Routes>
                     <Route path="/" element={<MainAppLayout></MainAppLayout>} />
                     <Route path="/users/*" element={<div>test users path</div>}></Route>
                     <Route path="/noworkie/:id" element={<div>test not workie</div>}></Route>
                     <Route path="/*" element={<div>notfound</div>} />
                  </Routes>
               </ErrorBoundary>
            </Suspense>
         </BrowserRouter>
      </ThemeProvider>
   );
};

export default AppRoot;
