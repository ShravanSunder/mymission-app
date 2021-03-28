import { css } from '@emotion/react';
import { IconButton, Typography } from '@material-ui/core';
import { FC, MouseEvent, ReactNode } from 'react';
import tw from 'twin.macro';
import { daysToRecurrenceTypeMap } from './core/recurrence.types';
import { IRecurrenceDurationProps } from './RecurrenceDuration';

export const PickPeriod: FC<IRecurrenceDurationProps> = (props) => {
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
         let selectStyle = css();
         if (props.target.value === i) {
            selectStyle = css(tw`${tempColorSelectedDay} shadow-sm`);
         }

         resultDays.push(
            <div css={selectStyle} key={i} className="rounded-full w-11 h-11">
               <IconButton className="" value={i} onClick={() => handleChange(null, i)}>
                  <Typography className="w-5 h-5" variant="subtitle2">
                     {i}
                  </Typography>
               </IconButton>
            </div>
         );
      }

      days = resultDays;
   }

   return <div className="flex flex-wrap content-center w-full h-full place-self-center justify-items-start">{days}</div>;
};
