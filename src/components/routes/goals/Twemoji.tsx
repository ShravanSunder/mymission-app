import * as React from 'react';
import { Twemoji, Props } from 'react-emoji-render';

interface TwemojiProps extends Props {
   fontSize?: number;
}

export const TwemojiInline = (props: TwemojiProps): JSX.Element => {
   const className: string = props.className ?? '';

   return (
      <Twemoji
         className={className}
         options={props.options}
         svg={props.svg ?? true}
         props={props.props}
         onlyEmojiClassName={props.onlyEmojiClassName}
         text={props.text}
         css={{ img: { display: 'inline' } }}
      />
   );
};
