import { css } from '@emotion/react';
import { Button, Typography } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { FC, MouseEvent } from 'react';
import tw from 'twin.macro';

import { ICommonProps } from '~~/components/common/ICommonProps';
import { combine } from '~~/helpers/string';

interface ILabelContainer extends ICommonProps {
   title: string;
   onClick?: (event: MouseEvent) => void;
}

export const LabelContainer: FC<ILabelContainer> = (props) => {
   return (
      <div className={combine('flex border-1 rounded-md box-border', props.className)} onClick={props.onClick}>
         <Typography className="flex-grow p-2 pl-4 pr-4" variant="body1">
            {props.title}
         </Typography>
         <div className="flex bg-gray-200 border-l-1">{props.children}</div>
      </div>
   );
};
