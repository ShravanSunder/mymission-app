import { WorkboxMessageEvent } from 'workbox-window/utils/WorkboxEvent';

export const registerServiceWorker = async (): Promise<void> => {
   const { Workbox } = await import('workbox-window');

   const wb = new Workbox('/sw.js');

   wb.addEventListener('activated', (event) => {
      // `event.isUpdate` will be true if another version of the service
      // worker was controlling the page when this version was registered.
      if (!event.isUpdate) {
         console.log('Service worker activated for the first time!');

         // If your service worker is configured to precache assets, those
         // assets should all be available now.
      }
   });

   wb.addEventListener('waiting', () => {
      console.log("A new service worker has installed, but it can't activate until all tabs running the current version have fully unloaded.");
   });

   wb.register().then(null, (err) => {
      console.error('🛑 ServiceWorker registration failed!!!', err);
   });

   wb.addEventListener('message', (event: WorkboxMessageEvent) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (event.data?.type === 'CACHE_UPDATED') {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
         const { updatedURL } = event.data?.payload;

         console.log(`A newer version of ${updatedURL as string} is available!`);
      }
   });

   wb.addEventListener('activated', () => {
      // Get the current page URL + all resources the page loaded.
      const urlsToCache = [location.href, ...performance.getEntriesByType('resource').map((r) => r.name)];
      // Send that list of URLs to your router in the service worker.
      wb.messageSW({
         type: 'CACHE_URLS',
         payload: { urlsToCache },
      }).catch(null);
   });
};
