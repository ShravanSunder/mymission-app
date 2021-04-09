import { screen, render } from '@testing-library/react';
import React from 'react';

import { ScheduleSummary } from '~~/components/routes/goal-details/initatives/attributes/ScheduleSummary';

it('does render', () => {
   const { asFragment } = render(<ScheduleSummary icon="😀" summaryName="name" summaryValue="sdljfdsjfdskfjs"></ScheduleSummary>);

   expect(asFragment()).toMatchSnapshot();
});
