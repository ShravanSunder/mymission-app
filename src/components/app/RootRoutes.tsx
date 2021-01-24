import '~~/styles/css/tailwind-base.css';
import '~~/styles/css/tailwind-components.css';
import '~~/styles/css/tailwind-utilities.css';
import '~~/styles/css/app.css';

import React, { Suspense } from 'react';
import MaterialProvider from '~~/components/app/MaterialProvider';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Screen1 } from '../layout/MainLayout';
import { ErrorBoundary, ErrorFallback } from '~~/components/common/ErrorFallback';

const RootRoutes = (): JSX.Element => {
   return (
      <MaterialProvider>
         <BrowserRouter>
            <Suspense fallback={<div></div>}>
               <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Routes>
                     <Route path="/" element={<Screen1></Screen1>} />
                     <Route path="/users/*" element={<div>users path</div>}></Route>
                     <Route path="/noworkie/:id" element={<div>dsfsdfsdf</div>}></Route>
                     <Route path="/*" element={<div>notfound</div>} />
                  </Routes>
               </ErrorBoundary>
            </Suspense>
         </BrowserRouter>
      </MaterialProvider>
   );
};

export default RootRoutes;
