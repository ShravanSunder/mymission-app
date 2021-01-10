// import { registerRoute } from 'workbox-routing';
// import { CacheFirst, NetworkFirst } from 'workbox-strategies';
// import { ExpirationPlugin } from 'workbox-expiration';

// registerRoute(({ request }) => request.destination === 'image', new CacheFirst({ cacheName: 'images' }));

// registerRoute(
//    /(\/$|\/\?.*$)/,
//    new NetworkFirst({
//       cacheName: 'pages-cache',
//       plugins: [
//          new ExpirationPlugin({
//             maxAgeSeconds: 1 * 24 * 60 * 60, // 1 Days
//          }),
//       ],
//    })
// );
