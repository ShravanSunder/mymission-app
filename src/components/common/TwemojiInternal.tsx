import { FC } from 'react';
import { Twemoji, Props } from 'react-emoji-render';

import { useFirstEmoji } from './core/hooks/useFirstEmoji';

import { ICommonProps } from '~~/components/common/ICommonProps';

export interface TwemojiImageProps extends Props, ICommonProps {
   /**
    * the width and height in % from 0 to 100%
    */
   size?: number;
}

/**
 * ⚠ use the lazy version, the it makes the load time better.
 * useSafeEmoji is large for bundle size as well
 * @param props
 */
export const TwemojiImage: FC<TwemojiImageProps> = (props) => {
   const height: string = props.size != undefined ? `${props.size.toFixed(1)}% !important` : `100%`;
   const margin = props.size != undefined ? '0 !important' : '';

   const safeEmoji = useFirstEmoji(props.text ?? '');

   return (
      <span
         className="w-full h-full p-1 bg-transparent box-border"
         css={[
            {
               img: { display: 'inline', height: height, margin: margin, width: height, backgroundColor: 'transparent' },
               span: { display: 'grid', width: '100%', height: '100%', placeItems: 'center', backgroundColor: 'transparent' },
            },
         ]}>
         <Twemoji options={props.options} svg={props.svg ?? true} props={props.props} text={safeEmoji} />
      </span>
   );
};

export interface TwemojiInlineProps extends Props {
   fontSize?: number;
   grayscale?: boolean;
}

/**
 * ⚠ use the lazy version, the it makes the load time better.
 * @param props
 */

export const TwemojiInline: FC<TwemojiInlineProps> = ({ grayscale = false, ...rest }: TwemojiInlineProps) => {
   const props = { ...rest, grayscale };

   // todo: replace later with tw`filter grayscale` when supported by tailwind and twin
   const grayscaleStyle = grayscale
      ? {
           filter: 'grayscale(0.6)',
        }
      : {};

   return (
      <Twemoji
         options={props.options}
         svg={props.svg ?? true}
         props={props.props}
         onlyEmojiClassName={props.onlyEmojiClassName}
         text={props.text ?? ''}
         css={{
            display: 'inline-block',
            ...grayscaleStyle,
            span: { display: 'inline-block', ...grayscaleStyle },
            img: { display: 'inline-block', ...grayscaleStyle },
            ...(props.fontSize && { fontsize: props.fontSize }),
         }}
      />
   );
};
