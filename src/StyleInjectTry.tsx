import { css } from '@emotion/react';
import React from 'react';
import { EventNote } from '@material-ui/icons';
import Slider from '@material-ui/core/Slider';
import { Avatar } from '@material-ui/core';

export const StyleInjectTry = ({ text = 'default' }) => {
   return (
      <div>
         {text}
         <Slider defaultValue={30} />
         <Slider
            defaultValue={30}
            css={css({
               color: 'red',
            })}
         />
         {/* <Avatar css={css({ color: 'pink' })}>
            <div>
               <EventNote
                  css={css({
                     width: '2em',
                     height: '2em',
                  })}></EventNote>
            </div>
         </Avatar> */}
      </div>
   );
};
