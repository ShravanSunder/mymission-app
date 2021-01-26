import * as React from 'react';
import { ResponsivePie, PieCustomLayerProps } from '@nivo/pie';
import { LinearGradientDef, PatternDotsDef, Theme as NivoTheme } from '@nivo/core';

import { useTheme } from '@material-ui/core';

export type TPiceChartData = {
   id: string | number;
   value: number;
};

export interface IPieChartParams {
   data: TPiceChartData[];
}

const CenteredMetric = ({ dataWithArc, centerX, centerY }: PieCustomLayerProps<TPiceChartData>) => {
   const theme = useTheme();

   const total = dataWithArc
      .filter((f) => f.id === 'done')
      .map((m) => m.value)
      .reduce((accumulator, value) => accumulator + value);

   return (
      <text
         x={centerX}
         y={centerY}
         textAnchor="middle"
         dominantBaseline="central"
         style={{ ...theme.typography.subtitle2, opacity: 0.66, cursor: 'default', userSelect: 'none' }}>
         {total}
      </text>
   );
};

export const PieChart = ({ data }: IPieChartParams): JSX.Element => {
   const theme = useTheme();

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
      <div className="flex-shrink-0 w-12 h-12 overflow-hidden border-0 rounded-full -p-1" css={[{ borderColor: theme.palette.text.secondary }]}>
         <ResponsivePie
            data={data}
            theme={graphTheme}
            innerRadius={0.5}
            padAngle={0}
            cornerRadius={1}
            colors={{ scheme: 'pastel1' }}
            borderWidth={1}
            borderColor={{
               from: 'color',
               modifiers: [['opacity', 0.8]],
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
            layers={['slices', 'sliceLabels', 'radialLabels', 'legends', CenteredMetric]}></ResponsivePie>
      </div>
   );
};
