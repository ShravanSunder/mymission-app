import React from 'react';
import { ICssProps, getCssProps } from '~~/components/common/cssProps';

/**
 * TODO: delete
 * @param props
 */
export const CardLayout = (props: ICssProps): JSX.Element => {
   const { cssProp, classNameProp } = getCssProps(props);

   return (
      <div css={cssProp} className={'flex-grow border-gray-500 border-1 fill-parent rounded-md' + classNameProp}>
         {props.children}
      </div>
   );
};
