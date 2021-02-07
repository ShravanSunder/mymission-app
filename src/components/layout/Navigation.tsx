import React from 'react';
// import { IconButton } from '@material-ui/core';
// import tw from 'twin.macro';
import { NavButton } from './NavButton';

export const NavigationRight = (): JSX.Element => {
   return (
      <div className="flex flex-col w-10 h-full pt-2 pb-2 rounded-2xl elevation-2 box-border">
         <NavButton></NavButton>
         <NavButton></NavButton>
         <NavButton></NavButton>
         <NavButton></NavButton>
         <NavButton></NavButton>
      </div>
   );
};

export const NavigationBottom = (): JSX.Element => {
   return (
      <div className="h-10 pt-2 pb-2 rounded-lg grid fill-parent elevation-2 grid-cols-5 grid-row-1">
         <NavButton></NavButton>
         <NavButton></NavButton>
         <NavButton></NavButton>
         <NavButton></NavButton>
         <NavButton></NavButton>
      </div>
   );
};
