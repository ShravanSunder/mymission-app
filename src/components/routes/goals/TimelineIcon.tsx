import React, { useState } from 'react';
import { useTheme, ToggleButton } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';

/**
 * Button used for Navigation.  An iconButton with centering div
 */
export const TimelineIcon = (): JSX.Element => {
   const theme = useTheme();
   const [selected, setSelected] = useState(false);

   return (
      <div className="items-center overflow-hidden grid rounded-2xl">
         <ToggleButton
            value="check"
            selected={selected}
            style={{
               paddingTop: theme.spacing(0.5),
               paddingRight: theme.spacing(0.5),
               paddingLeft: theme.spacing(0.5),
               paddingBottom: theme.spacing(0.5),
            }}
            onChange={() => {
               setSelected(!selected);
            }}>
            <HomeIcon style={{ fontSize: theme.typography.h4.fontSize }} />
         </ToggleButton>
      </div>
   );
};