import { css } from '@emotion/react';
import { Button } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { FC, MouseEvent } from 'react';
import tw from 'twin.macro';

import { ICommonProps } from '~~/components/common/ICommonProps';
import { LabelContainer } from '~~/components/common/LabelContainer';

interface ILabelWithButtonProps extends ICommonProps {
   title: string;
   handleClick: (event: MouseEvent) => void;
   showing?: boolean;
}

export const LabelWithButton: FC<ILabelWithButtonProps> = (props) => {
   const rotate = props.showing ? css({ transform: 'rotate(0deg)', transition: '500ms' }) : css({ transform: 'rotate(90deg)', transition: '500ms' });

   return (
      <LabelContainer
         className={props.className}
         css={[props.showing ? css({}) : css(tw`bg-gradient-to-r from-transparent to-gray-50`)]}
         title={props.title}
         onClick={props.handleClick}>
         <div className="flex flex-grow-0 w-10 bg-gray-200 border-l-1 box-border">
            <Button css={tw`w-10 min-w-0`}>
               <ArrowDropDown css={rotate} />
            </Button>
         </div>
      </LabelContainer>
   );
};
