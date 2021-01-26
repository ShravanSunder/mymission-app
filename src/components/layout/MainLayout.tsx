import React from 'react';

import tw from 'twin.macro';
import { css } from '@emotion/react';

import { MainPane } from './MainPane';
import { NavigationRight } from './Navigation';

export const toolbarHeight = css([{ label: 'toolbarHeight' }, tw`h-14`]);
export const panelHeight = css({ height: 'calc(100vh - 4.7rem)', label: 'panelHeight' });

export const DesktopLayout = (): JSX.Element => {
   // const classes = useStyles();
   return (
      <div css={[{ height: '100vh', width: '100vw', overflow: 'hidden' }, tw`flex space-x-2 box-border p-2`]}>
         <div css={[tw`flex flex-shrink-0 flex-grow-0 w-10`, 'fill-parent-vertical']}>
            <NavigationRight></NavigationRight>
         </div>
         <div className={' flex flex-grow fill-parent-vertical'}>
            <MainPane></MainPane>
         </div>
      </div>
   );
};

// export const OldDesktopLayout = (): JSX.Element => {
//    // const classes = useStyles();
//    return (
//       <div css={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
//          <Grid container spacing={0} className={'min-h-full max-h-full fill-parent'}>
//             <Grid item xs={12} sm={5} md={4} lg={3} className={'min-h-full max-h-full '}>
//                <div css={['p-2 flex bg-red-50 h-full fill-parent']}>
//                   <LeftPane></LeftPane>
//                </div>
//             </Grid>
//             <Grid item xs={12} sm md lg className={'min-h-full max-h-full fill-parent'}>
//                <div className={'p-2 pl-1 flex bg-purple-50 fill-parent'}>
//                   <RightPane></RightPane>
//                </div>
//             </Grid>
//          </Grid>
//       </div>
//    );
// };
