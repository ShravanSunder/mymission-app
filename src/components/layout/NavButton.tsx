import { IconButton, Tooltip } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Home as HomeIcon } from '@material-ui/icons';

/**
 * Button used for Navigation.  An iconButton with centering div
 */
export const NavButton = (): JSX.Element => {
   const theme = useTheme();
   const tooltipName = 'this is a tooltip';

   return (
      <Tooltip title={tooltipName} placement="bottom">
         <div className="items-center m-1 overflow-hidden grid rounded-md">
            <IconButton
               style={{
                  paddingTop: theme.spacing(1),
                  paddingRight: theme.spacing(0.5),
                  paddingLeft: theme.spacing(0.5),
                  paddingBottom: theme.spacing(1),
               }}>
               <HomeIcon style={{ fontSize: theme.typography.h3.fontSize?.toString() }} />
            </IconButton>
         </div>
      </Tooltip>
   );
};
