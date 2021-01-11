import { createStyles, makeStyles } from '@material-ui/core';

import { grey, green, red, yellow } from '@material-ui/core/colors';
import React from 'react';

export const useStyles = makeStyles(() => {
   const snackbarRoot = {
      color: `${grey[700]}!important`,
      maxWidth: 280,
      zIndex: 1000,
   };

   return createStyles({
      info: { backgroundColor: `${grey[200]}!important`, ...snackbarRoot },
      success: { backgroundColor: `${green[50]}!important`, ...snackbarRoot },
      error: { backgroundColor: `${red[100]}!important`, ...snackbarRoot },
      warning: {
         backgroundColor: `${yellow[50]}!important`,
         ...snackbarRoot,
      },
   });
});

export const MainLayout = (): JSX.Element => {
   return (
      <>
         <div className="grid grid-cols-3 gap-4">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
         </div>
         <div className="flex items-center max-w-sm p-6 mx-auto bg-white shadow-md rounded-xl space-x-4">
            <div className="flex-shrink-0">
               <div>demo</div>
            </div>
         </div>
      </>
   );
};
