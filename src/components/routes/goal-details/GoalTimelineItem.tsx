import { css } from '@emotion/react';
import { FC } from 'react';
import tw from 'twin.macro';

import { TimelineIcon } from './TimelineIcon';

import { ICommonProps } from '~~/components/common/ICommonProps';

interface TimelineStreamProps {
   showTopConnector: boolean;
   showBottomConnect: boolean;
}

const TimelineStream = (props: TimelineStreamProps): JSX.Element => {
   return (
      <div className={'relative flex flex-col flex-shrink-0 w-6 justify-items-center container-viewport-fill-only-vertical'}>
         <div className="self-center grid place-items-center">
            <div className="h-4 w-0.5 justify-self-center" css={props.showTopConnector ? tw`bg-gray-400` : {}}></div>
         </div>
         <div className="grid place-items-center">
            <TimelineIcon></TimelineIcon>
         </div>
         <div className="flex-grow grid place-items-center ">
            <div className="h-full w-0.5 justify-self-center" css={props.showTopConnector ? tw`bg-gray-400` : {}}></div>
         </div>
      </div>
   );
};

interface IGoalTimelineItemProps {
   showTopConnector?: boolean;
   showBottomConnect?: boolean;
}

export const GoalTimelineItem: FC<IGoalTimelineItemProps & ICommonProps> = ({ showTopConnector = true, showBottomConnect = true, children, className }) => {
   const timelineGridStyle = [
      css`
         ${tw`grid w-full box-border`}
         grid-template-columns: 2rem auto
      `,
      { minWidth: '20rem' },
   ];

   return (
      <div className={className} css={timelineGridStyle}>
         <TimelineStream showTopConnector={showTopConnector} showBottomConnect={showBottomConnect}></TimelineStream>
         <div className="pt-2 pb-2 pl-1 pr-2">{children}</div>
      </div>
   );
};
