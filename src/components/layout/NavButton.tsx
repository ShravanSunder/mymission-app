import React from 'react';
import { IconButton, useTheme } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';

/**
 * Button used for Navigation.  An iconButton with centering div
 */
export const NavButton = (): JSX.Element => {
   const theme = useTheme();

   return (
      <div className="items-center m-1 overflow-hidden grid rounded-md">
         <IconButton
            style={{
               paddingTop: theme.spacing(1),
               paddingRight: theme.spacing(0.5),
               paddingLeft: theme.spacing(0.5),
               paddingBottom: theme.spacing(1),
            }}>
            <HomeIcon style={{ fontSize: theme.typography.h5.fontSize?.toString() }} />
         </IconButton>
      </div>
   );
};
