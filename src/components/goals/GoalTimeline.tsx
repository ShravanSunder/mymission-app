import * as React from 'react';
import EditIcon from '@material-ui/icons/Edit';

import { Chrono } from 'react-chrono';
import { TimelineItemModel } from 'react-chrono/dist/models/TimelineItemModel';

const items: TimelineItemModel[] = [
   {
      title: 'May 1940',
      cardTitle: 'Dunkirk',
      cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
   },
   {
      title: 'May 19409',
      cardTitle: 'Dunkirk',
      cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
   },
];

export const GoalTimeline = (): JSX.Element => {
   return (
      <div className="flex bg-blue-100 fill-parent box-border">
         <div className="flex-grow fill-parent"></div>
      </div>
   );
};
