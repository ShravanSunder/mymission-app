import React from 'react';
import { IconButton, useTheme } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';

/**
 * Button used for Navigation.  An iconButton with centering div
 */
export const TimelineIcon = (): JSX.Element => {
   const theme = useTheme();

   return (
      <div className="items-center  overflow-hidden grid rounded-2xl">
         <IconButton
            style={{
               paddingTop: theme.spacing(1),
               paddingRight: theme.spacing(1),
               paddingLeft: theme.spacing(1),
               paddingBottom: theme.spacing(1),
            }}>
            <HomeIcon style={{ fontSize: theme.typography.h5.fontSize }} />
         </IconButton>
      </div>
   );
};
