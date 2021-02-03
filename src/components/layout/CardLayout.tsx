import React from 'react';
import { ILayoutProps, getLayoutProps } from './layoutProps';

export const CardLayout = (props: ILayoutProps): JSX.Element => {
   const { cssProp, classNameProp } = getLayoutProps(props);

   return (
      <div css={cssProp} className={'flex-grow border-gray-500 shadow-md elevation-2 border-1 fill-parent rounded-md' + classNameProp}>
         {props.children}
      </div>
   );
};
