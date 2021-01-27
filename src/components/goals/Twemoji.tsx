import { Typography, TypographyProps } from '@material-ui/core';
import * as React from 'react';
import { Twemoji, Props as TwemojiProps } from 'react-emoji-render';

// interface TwemojiInlineProps extends TwemojiProps {
//    fontSize?: string;
// }

export const TwemojiInline = (props: TwemojiProps): JSX.Element => {
   return <Twemoji css={{ img: { display: 'inline' } }} />;
};
