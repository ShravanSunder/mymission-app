import { ReactNode, RefObject, ReactNodeArray } from 'react';
import { SwipeableDrawer } from '@material-ui/core';
import tw from 'twin.macro';
import { css } from '@emotion/react';

export interface IDetailsDrawerProps {
   open: boolean;
   setDrawerOpen: (open: boolean, checkForUnsavedEdits: boolean) => void;
   containerRef: RefObject<HTMLDivElement>;
   children?: ReactNode | ReactNodeArray;
}

export const DetailsDrawer = ({ open, containerRef, setDrawerOpen, children }: IDetailsDrawerProps): JSX.Element => {
   const container: HTMLDivElement | null = containerRef.current;

   /**
    * TODO: replace color
    */
   const tempColorDrawerBackground = 'bg-gray-100';

   return (
      <SwipeableDrawer
         className="app-drawer"
         css={{ '.MuiDrawer-paper': css([tw`bg-transparent shadow-none w-11/12 box-border h-full`]) }}
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
            <div className="flex flex-grow-0 flex-shrink-0 w-full h-16" onClick={() => setDrawerOpen(false, true)}></div>
            <div className="flex-grow w-full h-full overflow-x-hidden overflow-y-auto rounded-l-lg rounded-r-sm bg" css={tw`${tempColorDrawerBackground}`}>
               {children}
            </div>
            <div className="flex flex-grow-0 flex-shrink-0 w-full h-16" onClick={() => setDrawerOpen(false, true)}></div>
         </div>
      </SwipeableDrawer>
   );
};
