import * as React from 'react';
import { Twemoji, Props } from 'react-emoji-render';
import { css } from '@emotion/react';
import tw from 'twin.macro';

interface TwemojiImageProps extends Props {
   height?: string;
}

export const TwemojiImage = (props: TwemojiImageProps): JSX.Element => {
   const height = props.height != undefined ? props.height + ' !important' : props.height;
   const margin = props.height != undefined ? '0 !important' : '';

   return (
      <div
         className="w-full h-full p-2 bg-transparent box-border"
         css={[
            {
               img: { display: 'inline', height: height, margin: margin, width: height, backgroundColor: 'transparent' },
               span: { display: 'grid', width: '100%', height: '100%', placeItems: 'center', backgroundColor: 'transparent' },
            },
         ]}>
         <Twemoji options={props.options} svg={props.svg ?? true} props={props.props} text={props.text} />
      </div>
   );
};

interface TwemojiProps extends Props {
   fontSize?: number;
}

export const TwemojiInline = (props: TwemojiProps): JSX.Element => {
   return (
      <Twemoji
         options={props.options}
         svg={props.svg ?? true}
         props={props.props}
         onlyEmojiClassName={props.onlyEmojiClassName}
         text={props.text}
         css={{ img: { display: 'inline' }, ...(props.fontSize && { fontsize: props.fontSize }) }}
      />
   );
};
