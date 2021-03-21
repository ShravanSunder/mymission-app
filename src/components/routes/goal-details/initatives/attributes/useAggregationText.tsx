import { RecurrenceAggregationPeriods } from './recurrenceDefinitions';
import { Exception, ExceptionTypes } from '~~/models/Exception';
import { useIntl } from 'react-intl';

type TUseAggregationText = (
   period: RecurrenceAggregationPeriods
) => {
   /**
    * primary description
    */
   primary: string;
   /**
    * secondary description
    */
   secondary: string;
};
export const useAggregationText = (): TUseAggregationText => {
   const { formatMessage } = useIntl();

   const getAggregationText: TUseAggregationText = (period) => {
      if (period === RecurrenceAggregationPeriods.PerDay) {
         return {
            primary: formatMessage({ defaultMessage: 'Daily' }),
            secondary: formatMessage({ defaultMessage: 'Count your habits daily, x times a day' }),
         };
      } else if (period === RecurrenceAggregationPeriods.PerWeek) {
         return {
            primary: formatMessage({ defaultMessage: 'Weekly' }),
            secondary: formatMessage({ defaultMessage: 'Count your habits weekly, x times a week' }),
         };
      } else if (period === RecurrenceAggregationPeriods.PerMonth) {
         return {
            primary: formatMessage({ defaultMessage: 'Monthly' }),
            secondary: formatMessage({ defaultMessage: 'Count your habits monthly, x times a month' }),
         };
      } else {
         throw new Exception(ExceptionTypes.Schedule_RecurrenceAggregationPeriods);
      }
   };

   return getAggregationText;
};
