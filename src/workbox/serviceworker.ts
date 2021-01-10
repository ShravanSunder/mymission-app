import { precacheAndRoute } from 'workbox-precaching';
import { offlineFallback, pageCache } from 'workbox-recipes';

console.log('registered service-worker.ts');

// Use with precache injection
// @ts-ignore
// eslint-disable-next-line
precacheAndRoute(self.__WB_MANIFEST);

offlineFallback();

pageCache();
