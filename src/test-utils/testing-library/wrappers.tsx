import React from 'react';
import { IntlProvider } from 'react-intl';

export const HookWrapper: React.FC = (props) => {
   return (
      <IntlProvider locale="en" defaultLocale="en">
         {props.children}
      </IntlProvider>
   );
};
