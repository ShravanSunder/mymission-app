import { FC } from 'react';
import { Twemoji, Props } from 'react-emoji-render';


import { useFirstEmoji } from './core/hooks/useFirstEmoji';

export interface TwemojiImageProps extends Props {
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
const TwemojiImage: FC<TwemojiImageProps> = (props) => {
   const height: string = props.size != undefined ? `${props.size.toFixed(1)}% !important` : `100%`;
   const margin = props.size != undefined ? '0 !important' : '';

   const safeEmoji = useFirstEmoji(props.text ?? '');

   return (
      <div
         className="w-full h-full p-1 bg-transparent box-border"
         css={[
            {
               img: { display: 'inline', height: height, margin: margin, width: height, backgroundColor: 'transparent' },
               span: { display: 'grid', width: '100%', height: '100%', placeItems: 'center', backgroundColor: 'transparent' },
            },
         ]}>
         <Twemoji options={props.options} svg={props.svg ?? true} props={props.props} text={safeEmoji} />
      </div>
   );
};

export default TwemojiImage;
