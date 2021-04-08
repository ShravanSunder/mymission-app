import { css } from '@emotion/react';
import { Button, ButtonGroup, Typography } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { FC, MouseEvent } from 'react';
import tw from 'twin.macro';

import { ICommonProps } from '~~/components/common/ICommonProps';
import { LabelContainer } from '~~/components/common/LabelContainer';
import { combine } from '~~/helpers/string';

interface ILabelWithStepperProps extends ICommonProps {
   title: string;
   handleClick: (event: MouseEvent, action: 'add' | 'remove') => void;
   showing?: boolean;
}

export const LabelWithStepper: FC<ILabelWithStepperProps> = (props) => {
   return (
      <LabelContainer className={props.className} css={[props.showing ? css({}) : css(tw`bg-gradient-to-r from-transparent to-gray-50`)]} title={props.title}>
         <div className="flex flex-grow-0 bg-gray-200 ">
            <ButtonGroup color="primary" variant="text" disableElevation aria-label="Numeric incrementor and decrementor group">
               <Button disableElevation className="w-10 min-w-0" onClick={(event: MouseEvent) => props.handleClick(event, 'remove')}>
                  <RemoveIcon />
               </Button>
               <Button className="w-10 min-w-0 " onClick={(event: MouseEvent) => props.handleClick(event, 'add')}>
                  <AddIcon />
               </Button>
            </ButtonGroup>
         </div>
      </LabelContainer>
   );
};
