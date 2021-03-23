import { useEffect, ReactNode, MouseEvent, FC } from 'react';
import { daysToRecurrenceTypeMap } from './recurrenceDefinitions';
import { css } from '@emotion/react';
import tw from 'twin.macro';
import { IconButton, Typography } from '@material-ui/core';
import { IRecurrenceDurationProps } from './RecurrenceDuration';

export const tempColorSelectedDay = 'bg-gray-200';

export const PickPeriod: FC<IRecurrenceDurationProps> = (props) => {
   useEffect(() => {
      props.setRecurrenceSchedule(props.target as number);
   }, [props.target]);

   const handleChange = (event: MouseEvent<HTMLElement> | null, newValue: number | null) => {
      if (newValue) {
         props.setRecurrenceSchedule(newValue);
      }
   };

   let days: ReactNode[] | null = null;

   const availableDays = daysToRecurrenceTypeMap.get(props.durationType);
   if (availableDays != null && availableDays > 0) {
      const result: ReactNode[] = [];

      for (let i = 1; i <= availableDays; i++) {
         let selectStyle = css();
         if (props.target === i) {
            selectStyle = css(tw`${tempColorSelectedDay} shadow-sm`);
         }

         result.push(
            <div css={selectStyle} key={i} className="rounded-full w-11 h-11">
               <IconButton className="" value={i} onClick={() => handleChange(null, i)}>
                  <Typography className="w-5 h-5" variant="subtitle2">
                     {i}
                  </Typography>
               </IconButton>
            </div>
         );
      }

      days = result;
   }

   return <div className="flex flex-wrap content-center w-full h-full place-self-center justify-items-start">{days}</div>;
};
