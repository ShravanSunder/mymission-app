import React, { useCallback, useRef, useState } from 'react';
// import tw from 'twin.macro';
import { GoalTimeline } from '../routes/goal-details/GoalTimeline';
import { GoalTitleCard } from '../routes/goal-details/GoalTitleCard';
import { Button, SwipeableDrawer, useMediaQuery, useTheme } from '@material-ui/core';
import tw from 'twin.macro';
import { css } from '@emotion/react';
import { HabitDetails } from '../routes/goal-details/habits/HabitDetails';
import { cssMq } from '~~/styles/theme';

interface IPane2 {
   open: boolean;
   setDrawerOpen: (open: boolean, checkForUnsavedEdits: boolean) => void;
   containerRef: React.RefObject<HTMLDivElement>;
   children?: React.ReactNode | React.ReactNodeArray;
}

const DetailsDrawer = ({ open, containerRef, setDrawerOpen, children }: IPane2) => {
   // This is used only for the example
   const container: HTMLDivElement | null = containerRef.current;

   return (
      <SwipeableDrawer
         css={{ '.MuiPaper-root': css([tw`bg-transparent shadow-none w-11/12 box-border h-full`]) }}
         disableBackdropTransition={false}
         container={container}
         anchor="right"
         open={open}
         hideBackdrop={true}
         onBackdropClick={() => setDrawerOpen(false, true)}
         onClose={() => setDrawerOpen(false, false)}
         onOpen={() => setDrawerOpen(true, false)}
         disableSwipeToOpen={false}
         ModalProps={{
            keepMounted: true,
         }}>
         <div className="flex flex-col w-full h-full overflow-hidden bg-transparent">
            <div className="flex flex-grow-0 flex-shrink-0 w-full h-16" onClick={() => setDrawerOpen(false, true)}>
               {/* spacer */}
            </div>
            <div className="flex-grow w-full h-full overflow-hidden rounded-lg">{children}</div>
            <div className="flex flex-grow-0 flex-shrink-0 w-full h-16" onClick={() => setDrawerOpen(false, true)}>
               {/* spacer */}
            </div>
         </div>
      </SwipeableDrawer>
   );
};

export const ContentLayout = (): JSX.Element => {
   const theme = useTheme();
   const isSizeMd = useMediaQuery(theme.breakpoints.up('sm'));
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
      <div className="grid grid-rows-2 fill-parent" css={{ gridTemplateRows: 'auto 1fr' }}>
         <div className="row-start-1 max-h-32">
            <GoalTitleCard></GoalTitleCard>
            <Button onClick={() => setDrawerOpen(true)}>Drawer</Button>
         </div>

         <div className="relative row-start-2 fill-parent">
            <div className="grid fill-parent" css={mainGrid} ref={containerRef}>
               {mainContent}
               {isSizeMd && detailContent}
               {!isSizeMd && (
                  <DetailsDrawer containerRef={containerRef} open={openDetails} setDrawerOpen={setDrawerOpen}>
                     {detailContent}
                  </DetailsDrawer>
               )}
            </div>
         </div>
      </div>
   );
};
