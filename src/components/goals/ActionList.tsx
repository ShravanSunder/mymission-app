import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Button, CardActionArea, CardActions, CardHeader } from '@material-ui/core';

import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import tw from 'twin.macro';

const MonthScrubber = () => {
   return (
      <div className="w-full h-full overflow-hidden rounded-l-lg">
         <div
            css={[
               tw`w-full h-full`,
               { flex: '1 1 auto', overflow: 'auto', overflowScrolling: 'touch', WebkitOverflowScrolling: 'touch', WebkitScrollbar: { display: 'none' } },
            ]}>
            <div className="w-full h-12">Jan</div>
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
