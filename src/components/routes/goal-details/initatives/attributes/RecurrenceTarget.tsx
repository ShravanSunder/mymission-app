import { css } from '@emotion/react';
import { IconButton, Typography } from '@material-ui/core';
import { FC, MouseEvent, ReactNode, useMemo } from 'react';
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

   return useMemo(() => {
      let selectStyle = css();
      if (props.target === index) {
         selectStyle = css(tw`${tempColorSelectedDay} shadow-sm`);
      }

      return (
         <div css={selectStyle} key={index} className="rounded-full w-11 h-11">
            <IconButton className="" value={index} onClick={() => props.handleChange(null, index)}>
               <Typography className="w-5 h-5" variant="subtitle2">
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

   const availbleTargetRange = useMemo(() => availableTargetRange(props.aggregationPeriod.value, props.durationType.value), [
      props.aggregationPeriod.value,
      props.durationType.value,
   ]);

   let result: ReactNode[] | null = null;

   if (availbleTargetRange != null && availbleTargetRange > 0) {
      const resultDays: ReactNode[] = [];
      for (let i = 1; i <= availbleTargetRange; i++) {
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

   return <div className="flex flex-wrap content-center place-self-center justify-items-start">{targetRange}</div>;
};
