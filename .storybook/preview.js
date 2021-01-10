import '@storybook/addon-console';

import { addDecorator } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';

import { withPerformance } from 'storybook-addon-performance';
addDecorator(withPerformance);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));

//export all decorators required for storyshots
//export const decorators = [withConsole];
export const parameters = {
   actions: { argTypesRegex: '^on[A-Z].*' },
};
