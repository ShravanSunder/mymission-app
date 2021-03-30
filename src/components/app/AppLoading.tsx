import { css } from '@emotion/react';
import Slider from '@material-ui/core/Slider';
import { LinearProgress } from '@material-ui/core';

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
         {/* <LinearProgress css={css({ backgroundColor: 'red' })}></LinearProgress> */}
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

export const AppLoading = () => {
   return (
      <div>
         <LinearProgress></LinearProgress>
         <LinearProgress css={css({ backgroundColor: 'grey' })}></LinearProgress>
      </div>
   );
};
