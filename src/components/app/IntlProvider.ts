// This is optional but highly recommended

import { createIntlCache, createIntl, IntlShape, IntlCache } from 'react-intl';
import { atom, selector } from 'recoil';

import { atomFactory } from '~~/providers/recoilFactory';

// since it prevents memory leak
let cache: IntlCache | undefined = undefined;
let intlRoot: IntlShape | undefined = undefined;

export const getIntlRoot = (locale = 'en'): IntlShape => {
   if (cache == undefined) cache = createIntlCache();

   if (intlRoot == undefined || intlRoot.locale !== locale) {
      intlRoot = createIntl(
         {
            locale: locale,
            defaultLocale: 'en',
         },
         cache
      );
   }

   return intlRoot;
};

export const intlLocaleAtom = atomFactory<string>('intlLocale', 'en');

export const intlProviderAtom = atom<IntlShape>({
   key: 'intlProvider',
   default: selector({
      key: 'intlProvider/default',
      get: (param) => getIntlRoot(param.get(intlLocaleAtom)),
   }),
});
