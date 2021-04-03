import { MonoTypeOperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';

export const logError = <T>(e: T): void => {
   // console.error('Subscription Error: ', e);
   console.error(`%[Subscription logError]`, 'background: #E91E63; color: #fff; padding: 3px; font-size: 9px;', e);
};

export const logDebug = <T>(e: T): void => {
   // console.log('Subscription Log: ', e);
   console.log(`%c[Subscription logDebug]`, 'background: #009688; color: #fff; padding: 3px; font-size: 9px;', e);
};

export const logWarning = <T>(e: T): void => {
   // console.warn('Subscription Log: ', e);
   console.warn(`%c[Subscription logWarning]`, 'background: #009688; color: #fff; padding: 3px; font-size: 9px;', e);
};

export const debug = <T>(tag: string): MonoTypeOperatorFunction<T> => {
   return tap({
      next(value: T) {
         console.log(`%c[${tag}: Next]`, 'background: #009688; color: #fff; padding: 3px; font-size: 9px;', value);
      },
      error(error: T) {
         console.log(`%[${tag}: Error]`, 'background: #E91E63; color: #fff; padding: 3px; font-size: 9px;', error);
      },
      complete() {
         console.log(`%c[${tag}]: Complete`, 'background: #00BCD4; color: #fff; padding: 3px; font-size: 9px;');
      },
   });
};
