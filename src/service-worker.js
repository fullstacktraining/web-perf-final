workbox.precaching.precacheAndRoute([]);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('cloudinary-video-images').then(c => c.add('/'))
  )
})

const cloudinaryPlugin = {
  requestWillFetch: async ({ request }) => {
    console.log('requesting', request.url);
    if (/\.mp4$/.test(request.url)) {
      console.log('requesting', request.url);
      let url = request.url.split('.');
      console.log(url);
      

      const newUrl = new URL(request.url);
      return new Request(newUrl.href, { headers: request.headers });
    }
  },
};

workbox.routing.registerRoute(
  new RegExp('^https://res\.cloudinary\.com'),
  
  workbox.strategies.cacheFirst({
    cacheName: 'cloudinary-video-images',
    plugins: [
      cloudinaryPlugin,
      new workbox.cacheableResponse.Plugin({statuses: [ 200 ]}),
      new workbox.rangeRequests.Plugin(),
    ],
  })
);
