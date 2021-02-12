import '~~/styles/css/tailwind-base.css';
import '~~/styles/css/tailwind-components.css';
import '~~/styles/css/tailwind-utilities.css';
import '~~/styles/css/app.css';

import React, { Suspense } from 'react';
import ThemeProvider from '~~/components/app/ThemeProvider';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { MainAppLayout } from '../layout/MainAppLayout';
import { ErrorBoundary, ErrorFallback } from '~~/components/common/ErrorFallback';

const RootRoutes = (): JSX.Element => {
   return (
      <ThemeProvider>
         <BrowserRouter>
            <Suspense fallback={<div></div>}>
               <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Routes>
                     <Route path="/" element={<MainAppLayout></MainAppLayout>} />
                     <Route path="/users/*" element={<div>users path</div>}></Route>
                     <Route path="/noworkie/:id" element={<div>dsfsdfsdf</div>}></Route>
                     <Route path="/*" element={<div>notfound</div>} />
                  </Routes>
               </ErrorBoundary>
            </Suspense>
         </BrowserRouter>
      </ThemeProvider>
   );
};

export default RootRoutes;
