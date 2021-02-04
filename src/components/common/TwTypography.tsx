import React from 'react';
import tw from 'twin.macro';
import { ICssProps, getCssProps } from '~~/components/common/cssProps';

interface ITwTypographyProps extends ICssProps {
   variant: 'section' | 'title' | 'body1' | 'body2' | 'caption';
}

export const TwTypography = (props: ITwTypographyProps): JSX.Element => {
   const { cssProp, classNameProp } = getCssProps(props);

   let textSize = ' overflow-ellipsis break-words ';
   switch (props.variant) {
      case 'title':
         textSize += ' text-2xl font-bold';
         break;
      case 'body1':
         textSize += ' text-lg';
         break;
      case 'body2':
         textSize += ' text-base';
         break;
      case 'caption':
         textSize += ' text-xs font-light tracking wide';
         break;
   }

   return (
      <div role="document" css={[cssProp, tw`${textSize}`]} className={'ordinal tabular-nums diagonal-fractions' + classNameProp}>
         {props.children}
      </div>
   );
};
