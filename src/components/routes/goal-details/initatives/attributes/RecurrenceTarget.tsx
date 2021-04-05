import { css } from '@emotion/react';
import { IconButton, Typography } from '@material-ui/core';
import { FC, ReactNode, useEffect, useMemo, useRef } from 'react';
import { map } from 'rxjs/operators';
import tw from 'twin.macro';
import { availableNumericTargetRange } from '~~/components/routes/goal-details/initatives/attributes/core/recurrence.funcs';
import { RecurrenceDurationTypes, TRecurrenceTarget } from './core/recurrence.types';
import { DaysOfWeek, daysOfWeekToShortCodeMap, MonthsOfYear, monthsOfYearToShortCodeMap, weeksOfMonthMap } from './core/schedule.types';
import { IRecurrenceGoalProps } from './RecurrenceGoal';

interface ITargetItemProps<T extends DaysOfWeek | MonthsOfYear | number> {
   selected: T[];
   index: T;
   display: string;
   handleChange: (newValue: number) => void;
}

const TargetItem: FC<ITargetItemProps<DaysOfWeek | MonthsOfYear | number>> = (props) => {
   const tempColorSelectedDay = 'bg-gray-200';
   const index = props.index;
   const targetRef = useRef<HTMLElement | null>(null);

   useEffect(() => {
      if (props.selected.includes(index)) {
         if (targetRef != null && targetRef.current != null) targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
   }, [index, props.selected]);

   // return useMemo(() => {
   let selectBackgroundStyle = css();
   let boldStyle = css();
   if (props.selected.includes(index)) {
      selectBackgroundStyle = css([tw`${tempColorSelectedDay} shadow-sm font-semibold border-1`, { ariaSelected: 'true' }]);
      boldStyle = css(tw`font-bold`);
   }

   return (
      <div css={[selectBackgroundStyle, tw`grid grid-flow-row`]} key={index} className="rounded-full w-11 h-11" ref={targetRef as any}>
         <IconButton className="grid grid-rows-1 grid-cols-1 justify-items-center" value={props.display} onClick={() => props.handleChange(index)}>
            <Typography className="h-5 text-center min-w-5" variant="subtitle2" css={boldStyle}>
               {props.display}
            </Typography>
         </IconButton>
      </div>
   );
   // }, [props, index]);
};

const RecurrenceTargetInternal: FC<IRecurrenceGoalProps> = (props) => {
   if (
      props.durationType.value !== RecurrenceDurationTypes.SpecificDaysOfWeek &&
      props.durationType.value !== RecurrenceDurationTypes.SpecificMonthsOfYear &&
      props.durationType.value !== RecurrenceDurationTypes.SpecificWeeksOfMonth
   ) {
      const handleChange = (newValue: number) => {
         if (newValue != undefined) {
            props.target.next(newValue);
         }
      };

      const availbleTargetRange = availableNumericTargetRange(props.aggregationPeriod.value, props.durationType.value);
      const targetNumbers = Array.from(Array(availbleTargetRange[1] + 1).keys()).filter((n) => n > 0);
      const targetValue = props.target.value as number;

      return (
         <>
            {targetNumbers.map((k: number) => (
               // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
               <TargetItem selected={[targetValue]} key={k} index={k} display={k.toString()} handleChange={handleChange} />
            ))}
         </>
      );
   } else {
      const handleChange = <T extends DaysOfWeek | MonthsOfYear | number>(newValue: T) => {
         if (newValue != undefined) {
            const data = props.target.subject$.getValue() as T[];
            if (data.includes(newValue)) {
               props.target.next(data.filter((f) => f !== newValue) as TRecurrenceTarget);
            } else {
               props.target.next([...data, newValue] as TRecurrenceTarget);
            }
         }
      };

      const targetValues = props.target.value as DaysOfWeek[] | MonthsOfYear[] | number[];
      let map: Map<DaysOfWeek | MonthsOfYear, string>;
      switch (props.durationType.value) {
         case RecurrenceDurationTypes.SpecificDaysOfWeek:
            map = daysOfWeekToShortCodeMap;
            break;
         case RecurrenceDurationTypes.SpecificMonthsOfYear:
            map = monthsOfYearToShortCodeMap;
            break;
         case RecurrenceDurationTypes.SpecificWeeksOfMonth:
            map = weeksOfMonthMap;
            break;
      }

      return (
         <>
            {Array.from(map.keys()).map((k: DaysOfWeek | MonthsOfYear | number) => {
               const display = map.get(k) ?? '';
               return <TargetItem selected={targetValues} key={k} index={k} display={display} handleChange={handleChange} />;
            })}
         </>
      );
   }
};

export const RecurrenceTarget: FC<IRecurrenceGoalProps> = (props) => {
   /**
    * todo: replace colors
    */
   const tempColorSelectedDay = 'bg-gray-200';

   const targetRange = <RecurrenceTargetInternal {...props}></RecurrenceTargetInternal>;

   return (
      <div className="flex flex-wrap content-center w-full p-1 rounded-lg place-self-center justify-items-start bg-gray-50" role="listbox">
         {targetRange}
      </div>
   );
};
