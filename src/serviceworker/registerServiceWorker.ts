export const registerServiceWorker = async (): Promise<void> => {
   const { Workbox } = await import('workbox-window');
   const { addWorkboxEvents } = await import('./addWorkboxEvents');

   const wb = new Workbox('/sw.js');

   try {
      addWorkboxEvents(wb);

      wb.register().then(null, (err) => {
         console.error('🛑 ServiceWorker registration failed!!!', err);
      });
   } catch (error: any) {
      console.log(error);
   }
};
