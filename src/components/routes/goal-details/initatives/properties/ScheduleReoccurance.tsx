import React, { useEffect, useMemo, useState } from 'react';
import * as dayjs from 'dayjs';
import { IconButton, ButtonBase, ToggleButton, ToggleButtonGroup, Typography } from '@material-ui/core';

import tw from 'twin.macro';
import CheckIcon from '@material-ui/icons/Check';
import { css } from '@emotion/react';

const tempColorSelectedDay = 'bg-gray-200';

/**
 * Match the Dayjs standard
 */
export enum DaysOfWeek {
   Sunday = 0,
   Monday = 1,
   Tuesday = 2,
   Wednesday = 3,
   Thursday = 4,
   Friday = 5,
   Saturday = 6,
}

export enum QuartersOfYear {
   Q1 = 1,
   Q2 = 2,
   Q3 = 3,
   Q4 = 4,
}

export enum ReoccurrenceTypes {
   'DaysPerWeek',
   'SpecificDaysOfWeek',
   'DaysPerMonth',
   'PerCustomNumberOfDays',
   'DaysPerQuarter',
}

interface IScheduleReoccurrenceProps {
   reoccurrence: ReoccurrenceTypes;
   currentSchedule: number | DaysOfWeek[];
}

export const DaysMap: Map<ReoccurrenceTypes, number> = new Map([
   [ReoccurrenceTypes.DaysPerWeek, 7],
   [ReoccurrenceTypes.DaysPerMonth, 31],
   [ReoccurrenceTypes.DaysPerQuarter, 90],
]);

const SchedulePerPeriod: React.FC<IScheduleReoccurrenceProps> = ({ reoccurrence, currentSchedule }) => {
   const [selectedNumberOfDays, setSelectedNumberOfDays] = useState<number>();

   useEffect(() => {
      setSelectedNumberOfDays(currentSchedule as number);
   }, [currentSchedule]);

   const handleChange = (event: React.MouseEvent<HTMLElement> | null, newValue: number | null) => {
      if (newValue) {
         setSelectedNumberOfDays(newValue);
      }
   };

   let days: React.ReactNode[] | null = null;

   const availableDays = DaysMap.get(reoccurrence);
   if (availableDays != null && availableDays > 0) {
      const result: React.ReactNode[] = [];

      for (let i = 1; i <= availableDays; i++) {
         let selectStyle = css();
         if (selectedNumberOfDays === i) {
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

   return (
      <div className="w-full overflow-hidden overflow-y-auto grid max-h-80">
         <div className="flex flex-wrap content-center w-full h-full place-self-center justify-items-start">{days}</div>{' '}
      </div>
   );
};

export const ScheduleReoccurance: React.FC<IScheduleReoccurrenceProps> = (props) => {
   return <SchedulePerPeriod {...props}></SchedulePerPeriod>;
};
