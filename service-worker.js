/**
 * install assets
 */
const baseCache = [
  '/',
  '/css/styles.css',
  '/data/restaurants.json',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/index.html',
  '/restaurant.html'
];

/**
 * install
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('app-cache')
    .then((cache) => {
      return cache.addAll(baseCache);
    })
    .catch((response) => {
      console.log(response);
    })
  );
});

/**
 * fetch
 */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
    .then((response) => {
      return caches.open('app-cache')
      .then((cache) => {
        cache.put(event.request.url, response.clone());
        return response;
      })
    })
    .catch(()=>{
      return caches.match(event.request);
    })
  )
});
