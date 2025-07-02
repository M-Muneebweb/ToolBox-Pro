
self.addEventListener('install', function (event) {
  console.log('✅ Service worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  console.log('✅ Service worker activated');
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).catch(() => new Response("Offline mode is on"))
  );
});
