import React, { useMemo } from 'react';

interface HabitMeterParams {
   numberOfSegments: number;
   thickness?: number;
   /**
    * the width and height in % from 0 to 100%
    */
   size: number;
}
export const HabitMeter = ({ numberOfSegments, thickness = 3.6, size = 80 }: HabitMeterParams): JSX.Element => {
   const segments = useMemo(() => {
      const SIZE = 44;
      const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
      const strokeDash: number[] = [circumference / numberOfSegments - 2, 2];
      const sizeStr = size.toFixed(1) + '%';

      return (
         <div className="box-border" css={{ width: sizeStr, height: sizeStr }}>
            <span className="text-gray-300 " role="progressbar" css={{ width: '100%', paddingTop: '100%', transform: 'rotate(-90deg)' }}>
               <svg viewBox="22 22 44 44" overflow="overlay">
                  <circle
                     cx="44"
                     cy="44"
                     r="19.75"
                     fill="none"
                     css={{
                        strokeDasharray: strokeDash.map((m) => m.toFixed(2)).join(', '),
                        strokeWidth: thickness,
                        strokeDashoffset: -1,
                        stroke: 'currentcolor',
                     }}></circle>
               </svg>
            </span>
         </div>
      );
   }, [numberOfSegments, thickness]);

   return <>{segments}</>;
};
