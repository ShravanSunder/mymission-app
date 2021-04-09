// import { css } from '@emotion/react';
import { Button, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useCallback, useRef, useState } from 'react';

// import tw from 'twin.macro';
import { GoalTimeline } from '../routes/goal-details/GoalTimeline';
import { GoalTitleCard } from '../routes/goal-details/GoalTitleCard';
import { HabitDetails } from '../routes/goal-details/initatives/habits/HabitDetails';

import { DetailsDrawer } from './DetailsDrawer';

import { cssMq } from '~~/styles/theme';

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
      <div className="grid container-fill-viewport-full " css={{ gridTemplateRows: 'min-content 1fr' }}>
         <div className="row-start-1 max-h-32">
            <GoalTitleCard></GoalTitleCard>
            <Button onClick={() => setDrawerOpen(true)}>Drawer</Button>
         </div>

         <div className="relative row-start-2 container-fill-viewport-full ">
            <div className="container-fill-viewport-full grid" css={mainGrid} ref={containerRef}>
               {mainContent}
               {isTwoColumnLayout && <div className="container-fill-viewport-full">{detailContent}</div>}
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
