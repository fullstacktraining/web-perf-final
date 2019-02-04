workbox.precaching.precacheAndRoute(self.__precacheManifest);

const cloudinaryPlugin = {
  requestWillFetch: async ({ request }) => {
    if (/\.jpg$|.png$|.gif$|.webp$/.test(request.url)) {
      const url = request.url.split('/');
      const insertIndex = url.indexOf('upload');
      let newPart;
      const format = 'f_auto';
      switch ((navigator && navigator.connection) ? navigator.connection.effectiveType : '') {
        case '4g':
          newPart = 'q_auto:good'; // q_auto === q_auto:good
        break;
  
        case '3g':
          newPart = 'q_auto:eco';
        break;
  
        case'2g':
        case 'slow-2g':
          newPart = 'q_auto:low';
        break;
  
        default:
          newPart = 'q_auto:best';
        break;
      }
      url.splice(insertIndex + 1, 0, `${newPart},${format}`);
      const finalUrl = url.join('/');
      const newUrl = new URL(finalUrl);
      return new Request(newUrl.href, { headers: request.headers });
    }
  }
};

const cloudinaryVideoCapturePlugin = {
  requestWillFetch: async ({ request }) => {
    console.log('video image caching');
    if (/\.jpg$/.test(request.url)) {
      const url = request.url.split('/');
      const insertIndex = url.indexOf('upload');
      const format = 'f_auto';
      const quality = 'q_auto';
      url.splice(insertIndex + 1, 0, `${quality},${format}`);
      const finalUrl = url.join('/');
      const newUrl = new URL(finalUrl);
      return new Request(newUrl.href, { headers: request.headers });
    }
  }
};

workbox.routing.registerRoute(
  new RegExp('^https:\/\/res\.cloudinary\.com\/.*\/video\/upload\/.+[j][p][g]'),
  workbox.strategies.staleWhileRevalidate()
);