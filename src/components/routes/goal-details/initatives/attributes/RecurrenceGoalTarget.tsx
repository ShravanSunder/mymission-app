import { FC } from 'react';

import { IconFlexItem, IconFlexList } from '../../../../common/IconFlexList';

import { RecurrenceRepetitionType, TRecurrenceGoalTargetType } from './core/recurrence.types';
import { DaysOfWeek, daysOfWeekToShortCodeMap, MonthsOfYear, monthsOfYearToShortCodeMap, weeksOfMonthMap } from './core/schedule.types';
import { IRecurrenceGoalProps } from './RecurrenceGoal';

import { availableNumericTargetRange } from '~~/components/routes/goal-details/initatives/attributes/core/recurrence.funcs';

const RecurrenceTargetInternal: FC<IRecurrenceGoalProps> = (props) => {
   if (
      props.repetition.value !== RecurrenceRepetitionType.SpecificDaysOfWeek &&
      props.repetition.value !== RecurrenceRepetitionType.SpecificMonthsOfYear &&
      props.repetition.value !== RecurrenceRepetitionType.SpecificWeeksOfMonth
   ) {
      const handleChange = (newValue: number) => {
         if (newValue != undefined) {
            props.goalTarget.next(newValue);
         }
      };

      const availbleTargetRange = availableNumericTargetRange(props.period.value, props.repetition.value);
      const targetNumbers = Array.from(Array(availbleTargetRange[1] + 1).keys()).filter((n) => n > 0);
      const targetValue = props.goalTarget.value as number;

      return (
         <>
            {targetNumbers.map((k: number) => (
               // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
               <IconFlexItem selected={[targetValue]} key={k} index={k} display={k.toString()} handleChange={handleChange} />
            ))}
         </>
      );
   } else {
      const handleChange = <T extends DaysOfWeek | MonthsOfYear | number>(newValue: T) => {
         if (newValue != undefined) {
            const data = props.goalTarget.subject$.getValue() as T[];
            if (data.includes(newValue)) {
               props.goalTarget.next(data.filter((f) => f !== newValue) as TRecurrenceGoalTargetType);
            } else {
               props.goalTarget.next([...data, newValue] as TRecurrenceGoalTargetType);
            }
         }
      };

      const targetValues = props.goalTarget.value as DaysOfWeek[] | MonthsOfYear[] | number[];
      let map: Map<DaysOfWeek | MonthsOfYear, string>;
      switch (props.repetition.value) {
         case RecurrenceRepetitionType.SpecificDaysOfWeek:
            map = daysOfWeekToShortCodeMap;
            break;
         case RecurrenceRepetitionType.SpecificMonthsOfYear:
            map = monthsOfYearToShortCodeMap;
            break;
         case RecurrenceRepetitionType.SpecificWeeksOfMonth:
            map = weeksOfMonthMap;
            break;
      }

      return (
         <>
            {Array.from(map.keys()).map((k: DaysOfWeek | MonthsOfYear | number) => {
               const display = map.get(k) ?? '';
               return <IconFlexItem selected={targetValues} key={k} index={k} display={display} handleChange={handleChange} />;
            })}
         </>
      );
   }
};

export const RecurrenceGoalTarget: FC<IRecurrenceGoalProps> = (props) => {
   /**
    * todo: replace colors
    */
   // const tempColorSelectedDay = 'bg-gray-200';

   const targetRange = <RecurrenceTargetInternal {...props}></RecurrenceTargetInternal>;
   return <IconFlexList className="p-1 rounded-lg bg-gray-50">{targetRange}</IconFlexList>;
};
