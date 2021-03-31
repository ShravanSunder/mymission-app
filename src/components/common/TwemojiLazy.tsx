import { lazy, FC, Suspense } from 'react';

import { TwemojiImageProps } from './TwemojiImage';
import { TwemojiInlineProps } from './TwemojiInline';

const TwemojiImage = lazy(() => import('./TwemojiImage'));

export const TwemojiImageLazy: FC<TwemojiImageProps> = (props) => {
   return (
      <Suspense fallback={<div></div>}>
         <TwemojiImage {...props}></TwemojiImage>
      </Suspense>
   );
};

const TwemojiInline = lazy(() => import('./TwemojiInline'));

export const TwemojiInlineLazy: FC<TwemojiInlineProps> = (props) => {
   return (
      <Suspense fallback={<div></div>}>
         <TwemojiInline {...props}></TwemojiInline>
      </Suspense>
   );
};
