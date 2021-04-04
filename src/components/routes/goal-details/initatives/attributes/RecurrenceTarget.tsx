import { css } from '@emotion/react';
import { IconButton, Typography } from '@material-ui/core';
import { FC, MouseEvent, ReactNode, useEffect, useMemo, useRef } from 'react';
import tw from 'twin.macro';
import { availableNumericTargetRange } from '~~/components/routes/goal-details/initatives/attributes/core/recurrence.funcs';
import { RecurrenceDurationTypes } from './core/recurrence.types';
import { DaysOfWeek, daysOfWeekToShortCodeMap } from './core/schedule.types';
import { IRecurrenceGoalProps } from './RecurrenceGoal';

interface ITargetDaysItemProps {
   targetDays: DaysOfWeek[];
   index: DaysOfWeek;
   display: string;
   handleChange: (newValue: number) => void;
}

const TargetDaysItem: FC<ITargetDaysItemProps> = (props) => {
   const tempColorSelectedDay = 'bg-gray-200';
   const index = props.index;

   // return useMemo(() => {
   let selectBackgroundStyle = css();
   let boldStyle = css();
   if (props.targetDays.includes(index)) {
      selectBackgroundStyle = css([tw`${tempColorSelectedDay} shadow-sm font-semibold border-1`, { ariaSelected: 'true' }]);
      boldStyle = css(tw`font-bold`);
   }

   return (
      <div css={selectBackgroundStyle} key={index} className="rounded-full w-11 h-11">
         <IconButton className="" value={props.display} onClick={() => props.handleChange(index)}>
            <Typography className="w-5 h-5" variant="subtitle2" css={boldStyle}>
               {props.display[0]}
            </Typography>
         </IconButton>
      </div>
   );
   // }, [props, index]);
};

interface ITargetRangeItemProps {
   selectedTarget: number;
   index: number;
   handleChange: (newValue: number) => void;
}

const TargetRangeItem: FC<ITargetRangeItemProps> = (props) => {
   const tempColorSelectedDay = 'bg-gray-200';
   const index = props.index;
   const targetRef = useRef<HTMLElement | null>(null);

   useEffect(() => {
      if (props.selectedTarget === index) {
         if (targetRef != null && targetRef.current != null) targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
   }, [props.selectedTarget, index, targetRef]);

   return useMemo(() => {
      let selectBackgroundStyle = css();
      let boldStyle = css();
      if (props.selectedTarget === index) {
         selectBackgroundStyle = css([tw`${tempColorSelectedDay} shadow-sm font-semibold border-1`, { ariaSelected: 'true' }]);
         boldStyle = css(tw`font-bold`);
      }

      return (
         <div css={selectBackgroundStyle} key={index} className="rounded-full w-11 h-11" ref={targetRef as any}>
            <IconButton className="" value={index} onClick={() => props.handleChange(index)}>
               <Typography className="w-5 h-5" variant="subtitle2" css={boldStyle}>
                  {index}
               </Typography>
            </IconButton>
         </div>
      );
   }, [props, index]);
};

const TargetRange: FC<IRecurrenceGoalProps> = (props) => {
   if (props.durationType.value !== RecurrenceDurationTypes.SpecificDaysOfWeek) {
      const handleChange = (newValue: number) => {
         if (newValue != undefined) {
            props.target.next(newValue);
         }
      };

      const availbleTargetRange = availableNumericTargetRange(props.aggregationPeriod.value, props.durationType.value);
      const targetRange = props.target.value as number;

      let result: ReactNode[] | null = null;

      if (availbleTargetRange != null && availbleTargetRange[1] > 0) {
         const resultDays: ReactNode[] = [];
         for (let i = availbleTargetRange[0]; i <= availbleTargetRange[1]; i++) {
            const target = <TargetRangeItem selectedTarget={targetRange} key={i} index={i} handleChange={handleChange} />;
            resultDays.push(target);
         }
         result = resultDays;
      }
      return <>{result}</>;
   } else {
      const handleChange = (newValue: DaysOfWeek) => {
         if (newValue != undefined) {
            const data = props.target.subject$.getValue() as DaysOfWeek[];
            if (data.includes(newValue)) {
               props.target.next(data.filter((f) => f !== newValue));
            } else {
               props.target.next([...data, newValue]);
            }
         }
      };

      const targetDays = props.target.value as DaysOfWeek[];
      console.log(daysOfWeekToShortCodeMap);

      return (
         <>
            {Array.from(daysOfWeekToShortCodeMap.keys()).map((k) => (
               // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
               <TargetDaysItem targetDays={targetDays} key={k} index={k} display={daysOfWeekToShortCodeMap.get(k)!} handleChange={handleChange} />
            ))}
         </>
      );
   }
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
