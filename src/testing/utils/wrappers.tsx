import { FC } from 'react';
import { IntlProvider } from 'react-intl';

export const HookWrapper: FC = (props) => {
   return (
      <IntlProvider locale="en" defaultLocale="en">
         {props.children}
      </IntlProvider>
   );
};

export const IntlWrapper: FC = (props) => {
   return (
      <IntlProvider locale="en" defaultLocale="en">
         {props.children}
      </IntlProvider>
   );
};
