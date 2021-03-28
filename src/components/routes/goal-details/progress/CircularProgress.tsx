import { useMemo } from 'react';
import tw from 'twin.macro';
import { clamp } from '~~/helpers';

const tempColor = 'text-red-200';

interface ICircularProgressProps {
   /**
    * progress in % from 0 to 100%
    */
   progress: number;
   thickness?: number;
   /**
    * the width and height in % from 0 to 100%
    */
   size: number;
   color?: string;
}
export const CircularProgress = ({ progress, thickness = 3.6, size = 80 }: ICircularProgressProps): JSX.Element => {
   const progresss = useMemo(() => {
      const SIZE = 44;
      const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
      const strokeDash: number = circumference;
      const sizeStr = size.toFixed(1) + '%';
      const strokeOffset: number = clamp((100 - progress) / 100, 0, 1) * strokeDash;

      return (
         <div className="box-border" css={{ width: sizeStr }}>
            <svg viewBox="22 22 44 44" overflow="overlay" css={[{ transform: 'rotate(-91deg)' }, tw`${tempColor}`]}>
               <circle
                  cx="44"
                  cy="44"
                  r="19.75"
                  fill="none"
                  css={{
                     strokeDasharray: strokeDash.toFixed(1),
                     strokeWidth: thickness,
                     strokeDashoffset: strokeOffset.toFixed(1),
                     stroke: 'currentcolor',
                  }}></circle>
            </svg>
         </div>
      );
   }, [progress, size, thickness]);

   return <>{progresss}</>;
};
