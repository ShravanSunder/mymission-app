import { useTheme } from '@material-ui/core/styles';
import { ResponsiveLine, Datum } from '@nivo/line';
import { FC } from 'react';

import { ErrorBoundary, ErrorFallback } from '~~/components/common/ErrorFallback';


interface ITrendChartProps {
   title: string;
   dataPoints: Datum[];
}

export const TrendChart: FC<ITrendChartProps> = ({ title, dataPoints }) => {
   const theme = useTheme();
   const data = [
      {
         id: title,
         color: '#e8c1a0',
         data: dataPoints,
      },
   ];
   const tickConfig = {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
   };
   return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
         <div className="flex w-full h-full overflow-hidden" css={[{ borderColor: theme.palette.text.secondary }]}>
            <ResponsiveLine
               data={data}
               margin={{ top: 50, right: 30, bottom: 60, left: 50 }}
               xScale={{ type: 'point' }}
               yScale={{ type: 'linear', min: 0, max: 'auto', stacked: true, reverse: false }}
               yFormat=" >-.2f"
               gridYValues={[10, 20, 30, 40]}
               axisTop={null}
               lineWidth={5}
               axisRight={null}
               axisBottom={{ ...tickConfig, orient: 'bottom' }}
               axisLeft={{ ...tickConfig, orient: 'left' }}
               enableArea={true}
               enableGridX={false}
               pointSize={4}
               pointColor={{ theme: 'background' }}
               pointBorderWidth={6}
               pointBorderColor={{ from: 'serieColor' }}
               pointLabelYOffset={-12}
               isInteractive={false}
               legends={[]}
            />
         </div>
      </ErrorBoundary>
   );
};
