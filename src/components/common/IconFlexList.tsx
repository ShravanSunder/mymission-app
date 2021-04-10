import { css } from '@emotion/react';
import { IconButton, Typography } from '@material-ui/core';
import React, { FC, ReactElement, useMemo, useEffect, useRef, ReactNode } from 'react';
import tw from 'twin.macro';

import { ICommonProps } from '~~/components/common/ICommonProps';
import { combine } from '~~/helpers/string';

export interface IconFlexItemProps<T extends number | string | Record<string, any>> {
   selected: T[];
   index: T;
   display: string | ReactNode;
   handleChange: (newValue: T) => void;
}
export const IconFlexItem = <T extends number | string | Record<string, any>>(props: IconFlexItemProps<T>): ReactElement | null => {
   const targetRef = useRef<HTMLElement | null>(null);

   useEffect(() => {
      if (props.selected.includes(props.index)) {
         if (targetRef != null && targetRef.current != null) targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
   }, [props.index, props.selected]);

   return useMemo(() => {
      // TODO: replace color
      const tempColorSelectedDay = 'bg-gray-200';
      let selectBackgroundStyle = css();
      let boldStyle = css();
      if (props.selected.includes(props.index)) {
         selectBackgroundStyle = css([tw`${tempColorSelectedDay} shadow-sm font-semibold border-1`, { ariaSelected: 'true' }]);
         boldStyle = css(tw`font-bold`);
      }
      const i = (props.index as unknown) as string | number;

      return (
         <div css={[selectBackgroundStyle, tw`grid grid-flow-row`]} key={i} className="rounded-full w-11 h-11" ref={targetRef as any}>
            <IconButton
               css={[tw`grid grid-rows-1 grid-cols-1 justify-items-center align-middle p-0`, { 'MuiIconButton-label': { backgroundColor: 'red' } }]}
               value={`${props.index.toString()}`}
               onClick={() => props.handleChange(props.index)}>
               <Typography css={[tw`text-center min-w-5 place-items-center`, boldStyle]} variant="body2">
                  {props.display}
               </Typography>
            </IconButton>
         </div>
      );
   }, [props]);
};
export const IconFlexList: FC<ICommonProps> = (props) => {
   return (
      <div className={combine('flex flex-wrap content-center w-full place-self-center justify-items-start', props.className)} role="listbox">
         {props.children}
      </div>
   );
};
