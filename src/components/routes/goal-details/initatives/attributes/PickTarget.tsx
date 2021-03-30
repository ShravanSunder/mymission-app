import { css } from '@emotion/react';
import { IconButton, Typography } from '@material-ui/core';
import { FC, MouseEvent, ReactNode, useMemo } from 'react';
import tw from 'twin.macro';
import { daysToRecurrenceTypeMap } from './core/recurrence.types';
import { DaysOfWeek } from './core/schedule.types';
import { IRecurrenceGoalProps } from './RecurrenceGoal';

interface ITargetItemProps {
   target: number | DaysOfWeek[];
   index: number;
   handleChange: (event: MouseEvent<HTMLElement> | null, newValue: number | null) => void;
}

const TargetItem: FC<ITargetItemProps> = (props) => {
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

export const PickTarget: FC<IRecurrenceGoalProps> = (props) => {
   /**
    * todo: replace colors
    */
   const tempColorSelectedDay = 'bg-gray-200';

   const handleChange = (event: MouseEvent<HTMLElement> | null, newValue: number | null) => {
      if (newValue) {
         props.target.push(newValue);
      }
   };

   let days: ReactNode[] | null = null;
   const availableDays = daysToRecurrenceTypeMap.get(props.durationType.value);
   if (availableDays != null && availableDays > 0) {
      const resultDays: ReactNode[] = [];
      for (let i = 1; i <= availableDays; i++) {
         const target = <TargetItem target={props.target.value} key={i} index={i} handleChange={handleChange} />;
         resultDays.push(target);
      }
      days = resultDays;
   }

   return <div className="flex flex-wrap content-center place-self-center justify-items-start">{days}</div>;
};
