import * as React from 'react';
import { Button, ButtonBase, CardActionArea, CardActions, CardHeader, IconButton } from '@material-ui/core';

import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import tw from 'twin.macro';
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';

interface IMonthParams {
   monthAbreviation: string;
}

const Month = (params: IMonthParams) => {
   return (
      <div className="w-full h-12">
         <ButtonBase css={tw`w-full h-12`}>
            <div className="relative flex items-center justify-center w-full h-full font-mono border-2 border-transparent justify-items-center">
               <div css={[tw`pt-3`, { fontVariant: 'small-caps' }]}>
                  <strong>{params.monthAbreviation}</strong>
               </div>

               <CalendarTodayTwoToneIcon css={tw`h-full w-full absolute`}></CalendarTodayTwoToneIcon>
            </div>
         </ButtonBase>
      </div>
   );
};

const MonthScrubber = () => {
   return (
      <div className="w-full h-full overflow-hidden rounded-l-lg">
         <div
            css={[
               tw`w-full h-full`,
               { flex: '1 1 auto', overflow: 'auto', overflowScrolling: 'touch', WebkitOverflowScrolling: 'touch', WebkitScrollbar: { display: 'none' } },
            ]}>
            <Month monthAbreviation={'Jan'}></Month>
            <div className="w-full h-12">feb</div>
            <div className="w-full h-12">feb</div>
            <div className="w-full h-12">feb</div>
            <div className="w-full h-12">feb</div>
            <div className="w-full h-12">feb</div>
            <div className="w-full h-12">feb</div>
            <div className="w-full h-12">feb</div>
            <div className="w-full h-12">April</div>
         </div>
      </div>
   );
};

export const ActionList = (): JSX.Element => {
   return (
      <div className="flex w-full h-full rounded-l-lg">
         <div className="flex-shrink-0 w-12 h-full">
            <MonthScrubber></MonthScrubber>
         </div>
         <div className="flex-grow w-full h-full bg-purple-500"></div>
      </div>
   );
};
