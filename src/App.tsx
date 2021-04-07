import { lazy, StrictMode, Suspense, FC } from 'react';

const isDev = process.env.NODE_ENV === 'development';

const StateRoot = lazy(() => import(/* webpackChunkName: "StateRoot" */ './components/app/StateRoot'));

export const App: FC = () => {
   return (
      <StrictMode>
         <Suspense fallback={<div></div>}>
            <StateRoot></StateRoot>
         </Suspense>
      </StrictMode>
   );
};
