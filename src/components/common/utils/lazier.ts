/**
 * Improvement on top of React.lazy() that allows lazy rendering of named imports
 * Usage:
 *
 *  -- alternative to import { primary } from './Button'
 *  const PrimaryButton = lazier(() => import('./Button'), 'primary');
 *
 *  -- get the default import
 *  lazier(() => import('./Button'), 'default');
 *
 *  -- or
 *  lazier(() => import('./Button'));
 *
 */
// @ts-check
import * as React from 'react';

type LazyNamed = (
   importPromise: () => Promise<{
      [name: string]: any;
   }>,
   ...name: string[]
) => React.LazyExoticComponent<React.ComponentType<any>>[];

/**
 * @param {() => Promise<*>} thenable
 * @param {String} name
 */
export const lazier: LazyNamed = (thenable, ...name) => {
   const lazyExports = name.map((n) =>
      React.lazy(() => {
         return thenable().then((mod) => ({ default: mod[n] }));
      })
   );
   return lazyExports;
};
