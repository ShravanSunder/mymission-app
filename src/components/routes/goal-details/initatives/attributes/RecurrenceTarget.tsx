import { css } from '@emotion/react';
import { IconButton, Typography } from '@material-ui/core';
import { FC, MouseEvent, ReactNode, useEffect, useMemo, useRef } from 'react';
import tw from 'twin.macro';
import { availableTargetRange } from '~~/components/routes/goal-details/initatives/attributes/core/recurrence.funcs';
import { daysToRecurrenceTypeMap, RecurrenceAggregationPeriods } from './core/recurrence.types';
import { DaysOfWeek } from './core/schedule.types';
import { IRecurrenceGoalProps } from './RecurrenceGoal';

interface ITargetRangeItemProps {
   target: number | DaysOfWeek[];
   index: number;
   handleChange: (event: MouseEvent<HTMLElement> | null, newValue: number | null) => void;
}

const TargetRangeItem: FC<ITargetRangeItemProps> = (props) => {
   const tempColorSelectedDay = 'bg-gray-200';
   const index = props.index;
   const targetRef = useRef<HTMLElement | null>(null);

   useEffect(() => {
      if (props.target === index) {
         if (targetRef != null && targetRef.current != null) targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
   }, [props.target, index, targetRef]);

   return useMemo(() => {
      let selectBackgroundStyle = css();
      let boldStyle = css();
      if (props.target === index) {
         selectBackgroundStyle = css([tw`${tempColorSelectedDay} shadow-sm font-semibold border-1`, { ariaSelected: 'true' }]);
         boldStyle = css(tw`font-bold`);
      }

      return (
         <div css={selectBackgroundStyle} key={index} className="rounded-full w-11 h-11" ref={targetRef as any}>
            <IconButton className="" value={index} onClick={() => props.handleChange(null, index)}>
               <Typography className="w-5 h-5" variant="subtitle2" css={boldStyle}>
                  {index}
               </Typography>
            </IconButton>
         </div>
      );
   }, [props, index]);
};

const TargetRange: FC<IRecurrenceGoalProps> = (props) => {
   const handleChange = (event: MouseEvent<HTMLElement> | null, newValue: number | null) => {
      if (newValue) {
         props.target.push(newValue);
      }
   };

   props.aggregationPeriod.subject$;
   const availbleTargetRange = useMemo(() => availableTargetRange(props.aggregationPeriod.value, props.durationType.value), [
      props.aggregationPeriod.value,
      props.durationType.value,
   ]);

   let result: ReactNode[] | null = null;

   if (availbleTargetRange != null && availbleTargetRange[1] > 0) {
      const resultDays: ReactNode[] = [];
      for (let i = availbleTargetRange[0]; i <= availbleTargetRange[1]; i++) {
         const target = <TargetRangeItem target={props.target.value} key={i} index={i} handleChange={handleChange} />;
         resultDays.push(target);
      }
      result = resultDays;
   }
   return <>{result}</>;
};

export const RecurrenceTarget: FC<IRecurrenceGoalProps> = (props) => {
   /**
    * todo: replace colors
    */
   const tempColorSelectedDay = 'bg-gray-200';

   const targetRange = <TargetRange {...props}></TargetRange>;

   return (
      <div className="flex flex-wrap content-center w-full p-1 rounded-lg place-self-center justify-items-start bg-gray-50" role="listbox">
         {targetRange}
      </div>
   );
};
