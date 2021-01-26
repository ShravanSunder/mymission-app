import * as React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { LinearGradientDef, PatternDotsDef, Theme as NivoTheme } from '@nivo/core';
import { useTheme } from '@material-ui/core';

export type TPiceChartData = {
   id: string | number;
   value: number;
};

export interface IPieChartParams {
   data: TPiceChartData[];
}

export const PieChart = ({ data }: IPieChartParams): JSX.Element => {
   const theme = useTheme();

   // const gradient: LinearGradientDef = {
   //    id: 'gradientA',
   //    type: 'linearGradient',
   //    colors: [
   //       { offset: 0, color: 'inherit', opacity: 0.9 },
   //       { offset: 100, color: 'inherit', opacity: 0.1 },
   //    ],
   // };

   const donePattern: PatternDotsDef = {
      id: 'donePattern',
      type: 'patternDots',
      size: 1,
      padding: 0,
      stagger: true,
      background: '#ffffff00',
      color: '#24ff14',
   };

   const doneMatch = {
      match: { id: 'done' },
      id: 'donePattern',
   };

   const notDonePattern: PatternDotsDef = {
      id: 'notDonePattern',
      type: 'patternDots',
      size: 2,
      padding: 0,
      stagger: true,
      background: '#ffffff00',
      color: '#ddf3dd',
   };

   const notDoneMatch = {
      match: { id: 'notDone' },
      id: 'notDonePattern',
   };

   const graphTheme: NivoTheme = {
      background: '#ffffff00',
      textColor: theme.palette.text.primary,
      fontSize: 6, // theme.typography.subtitle1.fontSize,
   };

   return (
      <ResponsivePie
         data={data}
         theme={graphTheme}
         innerRadius={0.5}
         padAngle={0}
         cornerRadius={2}
         colors={{ scheme: 'pastel1' }}
         borderWidth={1}
         borderColor={{
            from: 'color',
            modifiers: [
               ['brighter', 0.2],
               ['opacity', 0.5],
            ],
         }}
         enableRadialLabels={false}
         radialLabelsSkipAngle={10}
         radialLabelsTextColor="#333333"
         radialLabelsLinkColor={{ from: 'color' }}
         enableSliceLabels={false}
         sliceLabelsSkipAngle={10}
         sliceLabelsTextColor="#333333"
         isInteractive={false}
         defs={[donePattern, notDonePattern]}
         fill={[doneMatch, notDoneMatch]}
      />
   );
};
