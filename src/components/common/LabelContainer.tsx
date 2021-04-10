import { Typography } from '@material-ui/core';
import { FC, MouseEvent, ReactNode, useMemo } from 'react';

import { ICommonProps } from '~~/components/common/ICommonProps';
import { TwemojiInlineLazy } from '~~/components/common/TwemojiLazy';
import { combine } from '~~/helpers/string';

interface ILabelContainer extends ICommonProps {
   icon?: string | ReactNode;
   title: string;
   onClick?: (event: MouseEvent) => void;
}

export const LabelContainer: FC<ILabelContainer> = (props) => {
   const icon = useMemo(() => {
      if (props.icon == undefined) {
         return null;
      } else if (typeof props.icon == 'string') {
         return (
            <Typography className="flex-grow-0 pl-4 pr-4 text-gray-300 bg-transparent box-border" variant="body1">
               <TwemojiInlineLazy text={props.icon}></TwemojiInlineLazy>
            </Typography>
         );
      } else {
         return (
            <Typography className="flex-grow-0 w-12 pl-4 pr-4 text-gray-300 bg-transparent box-border grid" variant="body1">
               {props.icon}
            </Typography>
         );
      }
   }, [props.icon]);

   return (
      <div className={combine('flex content-center border-1 rounded-md box-border', props.className)} onClick={props.onClick}>
         <Typography className="flex-grow p-2 pl-4" variant="body1">
            {props.title}
         </Typography>
         {icon}
         <div className="flex bg-gray-200 border-l-1">{props.children}</div>
      </div>
   );
};
