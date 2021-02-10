import React, { useCallback, useRef, useState } from 'react';
// import tw from 'twin.macro';
import { GoalTimeline } from '../routes/goals/GoalTimeline';
import { GoalTitleCard } from '../routes/goals/GoalTitleCard';
import { Button, SwipeableDrawer, useMediaQuery, useTheme } from '@material-ui/core';
import tw from 'twin.macro';
import { css } from '@emotion/react';
import { HabitDetails } from '../routes/goals/habits/HabitDetails';
import { cssMq } from '~~/styles/theme';

interface IPane2 {
   open: boolean;
   toggleDrawer: (open: boolean) => void;
   containerRef: React.RefObject<HTMLDivElement>;
   children?: React.ReactNode | React.ReactNodeArray;
}

const DetailsDrawer = ({ open, containerRef, toggleDrawer, children }: IPane2) => {
   // This is used only for the example
   const container: HTMLDivElement | null = containerRef.current;

   return (
      <SwipeableDrawer
         css={{ '.MuiPaper-root': css([tw`bg-transparent shadow-none w-11/12 box-border h-full`]) }}
         disableBackdropTransition={true}
         container={container}
         anchor="right"
         open={open}
         hideBackdrop={true}
         onClose={() => toggleDrawer(false)}
         onOpen={() => toggleDrawer(true)}
         // swipeAreaWidth={drawerBleeding}
         disableSwipeToOpen={false}
         ModalProps={{
            keepMounted: true,
         }}>
         <div className="flex w-full h-full pt-16 pb-16 overflow-hidden rounded-xl ">
            <div className="flex-grow w-full h-full overflow-hidden rounded-xl">{children}</div>
         </div>
      </SwipeableDrawer>
   );
};

export const ContentLayout = (): JSX.Element => {
   const theme = useTheme();
   const isSizeMd = useMediaQuery(theme.breakpoints.up('sm'));
   const containerRef = useRef<HTMLDivElement>(null);
   const [openDetails, setOpenDetails] = useState(false);

   const toggleDrawer = useCallback((value: boolean) => setOpenDetails(value), [setOpenDetails]);

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
         </div>
         <div className="relative row-start-2 fill-parent">
            <div className="grid fill-parent" css={mainGrid} ref={containerRef}>
               {mainContent}
               {detailContent}
               {/* {isSizeMd && detailContent}
               {!isSizeMd && (
                  <DetailsDrawer containerRef={containerRef} open={openDetails} toggleDrawer={toggleDrawer}>
                     {detailContent}
                  </DetailsDrawer>
               )} */}
            </div>
         </div>
      </div>
   );
};
