import * as React from 'react';
import { Twemoji, Props } from 'react-emoji-render';

interface TwemojiImageProps extends Props {
   /**
    * the width and height in % from 0 to 100%
    */
   size?: number;
}

export const TwemojiImage = (props: TwemojiImageProps): JSX.Element => {
   const height: string = props.size != undefined ? `${props.size.toFixed(1)}% !important` : `100%`;
   const margin = props.size != undefined ? '0 !important' : '';

   return (
      <div
         className="w-full h-full p-1 pb-2 bg-transparent box-border"
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
