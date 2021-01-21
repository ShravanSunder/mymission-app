import React from 'react';
import { Grid } from '@material-ui/core';

import tw, { css } from 'twin.macro';
// import {css} from '@emotion/react'

import { LeftPane } from './LeftPane';
import { RightPane } from './RightPane';

export const text = `November kicks off the holiday season with high expectations for a cozy and festive time of year. However, for many this time of year is tinged with sadness, anxiety, or depression. Certainly, major depression or a severe anxiety disorder benefits most from professional help. But what about those who just feel lost or overwhelmed or down at this time of year? Research (and common sense) suggests that one aspect of the Thanksgiving season can actually lift the spirits, and it's built right into the holiday — expressing gratitude.

The word gratitude is derived from the Latin word gratia, which means grace, graciousness, or gratefulness (depending on the context). In some ways gratitude encompasses all of these meanings. Gratitude is a thankful appreciation for what an individual receives, whether tangible or intangible. With gratitude, people acknowledge the goodness in their lives. In the process, people usually recognize that the source of that goodness lies at least partially outside themselves. As a result, gratitude also helps people connect to something larger than themselves as individuals — whether to other people, nature, or a higher power.

In positive psychology research, gratitu...`;

export const toolbarHeight = css([{ label: 'toolbarHeight' }, tw`h-14`]);
export const panelHeight = css({ height: 'calc(100vh - 4.7rem)', label: 'panelHeight' });

export const Screen1 = (): JSX.Element => {
   // const classes = useStyles();
   return (
      <div css={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
         <Grid container spacing={0} className={'min-h-full max-h-full w-full'}>
            <Grid item xs={12} sm={5} md={4} lg={3} className={'min-h-full max-h-full '}>
               <div className={'p-2 flex bg-red-50 h-full w-full overflow-hidden'}>
                  <LeftPane></LeftPane>
               </div>
            </Grid>
            <Grid item xs={12} sm md lg className={'min-h-full max-h-full w-full'}>
               <div className={'p-2 pl-1 flex bg-purple-50 h-full w-full overflow-hidden'}>
                  <RightPane></RightPane>
               </div>
            </Grid>
         </Grid>
      </div>
   );
};
