import { useMemo } from 'react';
import tw from 'twin.macro';

const tempColor = 'text-gray-500';

interface ICircularMilestoneSegmentsProps {
   numberOfMilestones: number;
   thickness?: number;
   /**
    * the width and height in % from 0 to 100%
    */
   size: number;
}

/**
 * The marks in circlular progress that show milestones
 * @param param0
 */
export const CircularMilestoneSegments = ({ numberOfMilestones, thickness = 3.6, size = 80 }: ICircularMilestoneSegmentsProps): JSX.Element => {
   const segments = useMemo(() => {
      const SIZE = 44;
      const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
      const strokeDash: number[] = [2, circumference / (numberOfMilestones + 1) - 2];
      const sizeStr = size.toFixed(1) + '%';

      return (
         <div className="box-border" css={{ width: sizeStr }}>
            <svg viewBox="22 22 44 44" overflow="overlay" css={[{ transform: 'rotate(-93deg)' }, tw`${tempColor}`]}>
               <circle
                  cx="44"
                  cy="44"
                  r="19.75"
                  fill="none"
                  css={{
                     strokeDasharray: strokeDash.map((m) => m.toFixed(2)).join(', '),
                     strokeWidth: thickness,
                     strokeDashoffset: 2,
                     stroke: 'currentcolor',
                  }}></circle>
            </svg>
         </div>
      );
   }, [numberOfMilestones, thickness]);

   return <>{segments}</>;
};
