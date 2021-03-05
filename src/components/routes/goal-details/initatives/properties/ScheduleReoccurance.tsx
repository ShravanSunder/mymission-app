import React, { useEffect, useMemo, useState } from 'react';
import * as dayjs from 'dayjs';
import { Typography } from '@material-ui/core';

/**
 * Match the Dayjs standard
 */
enum DaysOfWeek {
   Sunday = 0,
   Monday = 1,
   Tuesday = 2,
   Wednesday = 3,
   Thursday = 4,
   Friday = 5,
   Saturday = 6,
}

enum QuartersOfYear {
   Q1 = 1,
   Q2 = 2,
   Q3 = 3,
   Q4 = 4,
}

enum ReoccurrenceTypes {
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

const DaysMap: Map<ReoccurrenceTypes, number> = new Map([
   [ReoccurrenceTypes.DaysPerWeek, 7],
   [ReoccurrenceTypes.DaysPerMonth, 31],
   [ReoccurrenceTypes.DaysPerQuarter, 90],
]);

const SchedulePerPeriod: React.FC<IScheduleReoccurrenceProps> = ({ reoccurrence, currentSchedule }) => {
   const [numberOfDays, setNumberOfDays] = useState<number>();

   useEffect(() => {
      setNumberOfDays(currentSchedule as number);
   }, [currentSchedule]);

   const data = useMemo(() => {
      if (numberOfDays && numberOfDays > 0) {
         const availableDays = DaysMap.get(reoccurrence);

         for (let i = 0; i < numberOfDays; i++) {
            return (
               <div className="rounded-full m-0.5">
                  <Typography variant="body2">{i}</Typography>
               </div>
            );
         }
      }
   }, [reoccurrence, numberOfDays]);

   return <div className="flex justify-items-start">{data}</div>;
};

export const ScheduleReoccurance: React.FC<IScheduleReoccurrenceProps> = (props) => {
   return <SchedulePerPeriod {...props}></SchedulePerPeriod>;
};
