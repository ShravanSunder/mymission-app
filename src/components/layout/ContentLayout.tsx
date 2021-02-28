import React, { useCallback, useRef, useState } from 'react';
// import tw from 'twin.macro';
import { GoalTimeline } from '../routes/goal-details/GoalTimeline';
import { GoalTitleCard } from '../routes/goal-details/GoalTitleCard';
import { Button, useMediaQuery, useTheme } from '@material-ui/core';
import { css } from '@emotion/react';
import { HabitDetails } from '../routes/goal-details/habits/HabitDetails';
import { cssMq } from '~~/styles/theme';
import { DetailsDrawer } from './DetailsDrawer';

export const ContentLayout = (): JSX.Element => {
   const theme = useTheme();
   const isTwoColumnLayout = useMediaQuery(theme.breakpoints.up('sm'));
   const containerRef = useRef<HTMLDivElement>(null);
   const [openDetails, setOpenDetails] = useState(true);

   const setDrawerOpen = useCallback(
      (value: boolean, checkForUnsavedEdits = false) => {
         if (checkForUnsavedEdits) {
            // check for unsaved edits first
         }

         setOpenDetails(value);
      },
      [setOpenDetails]
   );

   const mainContent = (
      <div className="">
         <GoalTimeline />
      </div>
   );
   const detailContent = <HabitDetails></HabitDetails>;

   const mainGrid = css([
      cssMq({
         gridTemplateColumns: ['1fr 0', '9fr 11fr', 'fit-content(24rem) 1fr', 'fit-content(28rem) 1fr'],
      }),
   ]);

   return (
      <div className="grid fill-parent" css={{ gridTemplateRows: 'min-content 1fr' }}>
         <div className="row-start-1 max-h-32">
            <GoalTitleCard></GoalTitleCard>
            <Button onClick={() => setDrawerOpen(true)}>Drawer</Button>
         </div>

         <div className="relative row-start-2 fill-parent">
            <div className="w-full h-full overflow-x-hidden overflow-y-auto grid" css={mainGrid} ref={containerRef}>
               {mainContent}
               {isTwoColumnLayout && detailContent}
               {!isTwoColumnLayout && (
                  <DetailsDrawer containerRef={containerRef} open={openDetails} setDrawerOpen={setDrawerOpen}>
                     {detailContent}
                  </DetailsDrawer>
               )}
            </div>
         </div>
      </div>
   );
};
