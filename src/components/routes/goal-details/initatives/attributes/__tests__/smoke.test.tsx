import { screen, render } from '@testing-library/react';
import React from 'react';

import { ScheduleSummary } from '~~/components/routes/goal-details/initatives/attributes/ScheduleSummary';
import { IntlWrapper } from '~~/testing/utils/wrappers';

it('smoke test does render', () => {
   const { asFragment } = render(<ScheduleSummary icon="😀" summaryName="name" summaryValue="sdljfdsjfdskfjs"></ScheduleSummary>, {
      wrapper: IntlWrapper,
   });

   expect(asFragment()).toMatchSnapshot();
   screen.debug();
});
