import { css } from '@emotion/react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slider from '@material-ui/core/Slider';
import { FC } from 'react';

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

/**
 * Created for main app root suspense.  It was necessary to get the mui5-alpha emotion
 * injection order working properly.  Works with @see StyledEngineProvider in @see StateRoot
 * Details:
 * Emotion mui styles and app emotion styles are not being merged. There could be multiple
 * emotion instances and therefore multiple classes per element.  So injection order is present
 *
 */
export const AppRootLoading: FC = () => {
   return (
      <div>
         <LinearProgress variant="query"></LinearProgress>
         <LinearProgress variant="query" css={css({ backgroundColor: 'lavender' })}></LinearProgress>
      </div>
   );
};
