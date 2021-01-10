export const registerServiceWorker = async () => {
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

   wb.addEventListener('waiting', (event) => {
      console.log(`A new service worker has installed, but it can't activate` + `until all tabs running the current version have fully unloaded.`);
   });

   wb.register().then(null, (err) => {
      console.error('🛑 ServiceWorker registration failed!!!', err);
   });

   wb.addEventListener('message', (event) => {
      if (event.data.type === 'CACHE_UPDATED') {
         const { updatedURL } = event.data.payload;

         console.log(`A newer version of ${updatedURL} is available!`);
      }
   });

   wb.addEventListener('activated', (event) => {
      // Get the current page URL + all resources the page loaded.
      const urlsToCache = [location.href, ...performance.getEntriesByType('resource').map((r) => r.name)];
      // Send that list of URLs to your router in the service worker.
      wb.messageSW({
         type: 'CACHE_URLS',
         payload: { urlsToCache },
      });
   });
};
