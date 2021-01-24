import * as React from 'react';

import { MonthScrubber } from './MonthScrubber';

export const ActionList = (): JSX.Element => {
   return (
      <div className="flex rounded-l-lg fill-parent">
         <div className="flex-shrink-0 w-12 h-full">
            <MonthScrubber></MonthScrubber>
         </div>
         <div className="flex-grow w-full h-full bg-purple-500"></div>
      </div>
   );
};
