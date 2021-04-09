import { lazy, FC, Suspense } from 'react';

import { TwemojiImageProps } from './TwemojiImage';
import { TwemojiInlineProps } from './TwemojiInline';

const TwemojiImage = lazy(() => import(/* webpackChunkName: "TwemojiImage" */ './TwemojiImage'));
const TwemojiInline = lazy(() => import(/* webpackChunkName: "TwemojiInline" */ './TwemojiInline'));

export const TwemojiImageLazy: FC<TwemojiImageProps> = (props) => {
   return (
      <Suspense fallback={<div></div>}>
         <TwemojiImage {...props}></TwemojiImage>
      </Suspense>
   );
};

export const TwemojiInlineLazy: FC<TwemojiInlineProps> = (props) => {
   return (
      <Suspense fallback={<div></div>}>
         <TwemojiInline {...props}></TwemojiInline>
      </Suspense>
   );
};
