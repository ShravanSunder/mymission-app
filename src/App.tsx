/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { lazy, StrictMode, Suspense } from 'react';
import StateRoot from './components/app/StateRoot';
import { ErrorBoundary, ErrorFallback } from './components/common/ErrorFallback';
import { EventNote } from '@material-ui/icons';
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';

import Slider from '@material-ui/core/Slider';

import { Avatar } from '@material-ui/core';

const AppRoot = lazy(() => import('~~/components/app/AppRoot'));

export const App = (): JSX.Element => {
   return (
      <StrictMode>
         <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<div>fallback</div>}>
               <StateRoot>{AppRoot}</StateRoot>
            </Suspense>
         </ErrorBoundary>
      </StrictMode>
      // <StyledEngineProvider injectFirst={false}>
      //    <div>
      //       <Slider defaultValue={30} />
      //       <Slider
      //          defaultValue={30}
      //          css={css({
      //             color: '#20b2aa',

      //             ':hover': {
      //                color: '#2e8b57',
      //             },
      //          })}
      //       />
      //       <Avatar css={css({ color: 'pink' })}>
      //          <div>
      //             <EventNote
      //                css={css({
      //                   width: '1.5em',
      //                   height: '1.5em',
      //                })}></EventNote>
      //          </div>
      //       </Avatar>
      //    </div>
      // </StyledEngineProvider>
   );
};
