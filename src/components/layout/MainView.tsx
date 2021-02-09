import React, { useMemo, useRef, useState } from 'react';
// import tw from 'twin.macro';
import { GoalTimeline } from '../routes/goals/GoalTimeline';
import { InitiativeDetails } from '../routes/goals/InitiativeDetails';
import { GoalTitleCard } from '../routes/goals/GoalTitleCard';
import { Button, SwipeableDrawer, useMediaQuery, useTheme } from '@material-ui/core';
import tw from 'twin.macro';
import { css } from '@emotion/react';

interface IPane2 {
   open: boolean;
   toggleDrawer: (open: boolean) => void;
   containerRef: React.RefObject<HTMLDivElement>;
}

const Pane2 = ({ open, toggleDrawer }: IPane2) => {
   // This is used only for the example
   const container: (() => Element) | undefined = window !== undefined ? () => window.document.body as Element : undefined;

   const drawerBleeding = 56;

   return (
      <SwipeableDrawer
         css={{ '.MuiPaper-root': css([tw`bg-transparent shadow-none w-10/12 box-border h-full`]) }}
         container={container}
         anchor="right"
         open={open}
         hideBackdrop={false}
         onClose={() => toggleDrawer(false)}
         onOpen={() => toggleDrawer(true)}
         // swipeAreaWidth={drawerBleeding}
         disableSwipeToOpen={false}
         ModalProps={{
            keepMounted: true,
         }}>
         <div className="flex w-full h-full pt-20 pb-20 overflow-hidden bg-transparent rounded-lg">
            <div className="flex-grow w-full h-full bg-red-100"></div>
         </div>
      </SwipeableDrawer>
   );
};

export const ContentLayout = (): JSX.Element => {
   const theme = useTheme();
   const isSizeMd = useMediaQuery(theme.breakpoints.up('md'));
   const [showPane2, setShowPane2] = useState<boolean>(true);
   const containerRef = useRef<HTMLDivElement>(null);

   const [openDetails, setOpenDetails] = useState(true);
   const detailsVisible = useMemo(() => showPane2 || isSizeMd, [showPane2, isSizeMd]);

   return (
      <div className="grid grid-rows-2 fill-parent" css={{ gridTemplateRows: 'auto 1fr' }}>
         <div className="row-start-1 max-h-32">
            <GoalTitleCard></GoalTitleCard>
         </div>
         <div>
            <Button onClick={() => setOpenDetails(!openDetails)}>click me</Button>
         </div>
         <div className="relative row-start-2 fill-parent">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 fill-parent" css={{ gridTemplateRows: '1fr' }} ref={containerRef}>
               <GoalTimeline />
               <Pane2 containerRef={containerRef} open={openDetails} toggleDrawer={(value: boolean) => setOpenDetails(value)}></Pane2>
               <div className="bg-blue-100 fill-parent"></div>
            </div>
         </div>
      </div>
   );
};
