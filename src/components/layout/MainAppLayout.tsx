import React from 'react';

import tw from 'twin.macro';
import { css } from '@emotion/react';

import { ContentLayout as ContentLayout } from './ContentLayout';
import { NavigationBottom, NavigationRight } from './Navigation';
import { Theme, useMediaQuery, useTheme } from '@material-ui/core';

export const toolbarHeight = css([{ label: 'toolbarHeight' }, tw`h-14`]);
export const panelHeight = css({ height: 'calc(100vh - 4.7rem)', label: 'panelHeight' });

interface IAppLayoutProps {
   mainView: React.ReactNode;
}

const AppSm = (prop: IAppLayoutProps): JSX.Element => {
   return (
      <div className="w-full h-full grid grid-cols-2 gap-2 grid-rows-1 fill-parent" css={[{ gridTemplateColumns: 'min-content auto' }]}>
         <div className="p-1 fill-parent">
            <NavigationRight></NavigationRight>
         </div>
         <div className="fill-parent">{prop.mainView}</div>
      </div>
   );
};

const AppXs = (prop: IAppLayoutProps): JSX.Element => {
   return (
      <div className="w-full h-full grid grid-cols-1 gap-2 grid-rows-2 fill-parent" css={[{ gridTemplateRows: 'auto min-content' }]}>
         <div className="fill-parent">{prop.mainView}</div>
         <div className="p-1 fill-parent">
            <NavigationBottom></NavigationBottom>
         </div>
      </div>
   );
};

export const MainAppLayout = (): JSX.Element => {
   // const classes = useStyles();

   const theme: Theme = useTheme();
   const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

   const mainView = <ContentLayout></ContentLayout>;
   // const appSX = <AppXs mainView={mainView}></AppXs>;
   // const appSm = <AppSm mainView={mainView}></AppSm>;

   return (
      <div css={[{ height: '100vh', width: '100vw', overflow: 'hidden' }]} className="p-1 grid grid-rows-1 grid-cols-1 box-border">
         {!isDesktop && (
            <>
               <div className="w-full h-full grid grid-cols-1 gap-2 grid-rows-2 fill-parent" css={[{ gridTemplateRows: 'auto min-content' }]}>
                  <div className="fill-parent">{mainView}</div>
                  <div className="p-1 fill-parent">
                     <NavigationBottom></NavigationBottom>
                  </div>
               </div>
            </>
         )}
         {isDesktop && (
            <>
               <div className="w-full h-full grid grid-cols-2 gap-2 grid-rows-1 fill-parent" css={[{ gridTemplateColumns: 'min-content auto' }]}>
                  <div className="p-1 fill-parent">
                     <NavigationRight></NavigationRight>
                  </div>
                  <div className="fill-parent">{mainView}</div>
               </div>
            </>
         )}
      </div>
   );
};
