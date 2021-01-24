import * as React from 'react';
import { ButtonBase } from '@material-ui/core';
import tw from 'twin.macro';
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';
import { FormattedDate } from 'react-intl';

interface IMonthParams {
   month: number;
}
/**
 * A component that renders a button containing svg icon and month short name
 * in the middle of a calendar
 * @param params month as 1-12 based integer
 */
const Month = (params: IMonthParams) => {
   const dateForIntl = '2020-' + params.month.toString() + '-05';

   return (
      <div className="w-full h-12 mt-1 mb-1">
         <ButtonBase css={tw`w-full h-12 hover:shadow-md  hover:border-transparent`}>
            <div className="relative flex items-center justify-center font-mono border-2 border-transparent m-0.5 fill-parent justify-items-center">
               <div css={[tw`pt-2 text-opacity-90`, { fontVariant: 'small-caps' }]}>
                  <strong>
                     <FormattedDate value={dateForIntl} month="short" />
                  </strong>
               </div>

               <CalendarTodayTwoToneIcon css={tw`h-full w-full absolute opacity-70`}></CalendarTodayTwoToneIcon>
            </div>
         </ButtonBase>
      </div>
   );
};

export const MonthScrubber = () => {
   return (
      <div className="rounded-l-lg fill-parent">
         <div
            css={[
               tw`w-full h-full pt-2 pb-2 overflow-auto`,
               { flex: '1 1 auto', overflow: 'auto', overflowScrolling: 'touch', WebkitOverflowScrolling: 'touch', WebkitScrollbar: { display: 'none' } },
            ]}>
            <Month month={1}></Month>
            <Month month={2}></Month>
            <Month month={3}></Month>
            <Month month={4}></Month>
            <Month month={5}></Month>
            <Month month={6}></Month>
            <Month month={7}></Month>
            <Month month={8}></Month>
            <Month month={9}></Month>
            <Month month={10}></Month>
            <Month month={11}></Month>
            <Month month={12}></Month>
         </div>
      </div>
   );
};
