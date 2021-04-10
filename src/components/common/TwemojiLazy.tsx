import React, { FC, Suspense } from 'react';

import { TwemojiImageProps, TwemojiInlineProps } from './TwemojiInternal';

import { lazier } from '~~/components/common/utils/lazier';

const TwemojiImage = lazier(() => import(/* webpackChunkName: "TwemojiInternal" */ './TwemojiInternal'), 'TwemojiImage');

const TwemojiInline = lazier(() => import(/* webpackChunkName: "TwemojiInternal" */ './TwemojiInternal'), 'TwemojiInline');

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
