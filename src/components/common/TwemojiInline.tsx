import { FC } from 'react';
import { Twemoji, Props } from 'react-emoji-render';

export interface TwemojiInlineProps extends Props {
   fontSize?: number;
}

/**
 * ⚠ use the lazy version, the it makes the load time better.
 * @param props
 */

const TwemojiInline: FC<TwemojiInlineProps> = (props: TwemojiInlineProps) => {
   return (
      <Twemoji
         options={props.options}
         svg={props.svg ?? true}
         props={props.props}
         onlyEmojiClassName={props.onlyEmojiClassName}
         text={props.text}
         css={{
            display: 'inline-block',
            span: { display: 'inline-block' },
            img: { display: 'inline-block' },
            ...(props.fontSize && { fontsize: props.fontSize }),
         }}
      />
   );
};

export default TwemojiInline;
