importScripts('./cache-polyfill.js');

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('airhorner').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './index.html?homescreen=1',
        './?homescreen=1',
        './styles/main.css',
        './scripts/main.min.js',
        './sounds/airhorn.mp3',
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url)
  // Tells the browser to evaluate the resulte of the 
  // event in the future
  e.respondWith(
    // Takes the current web request that triggered the 
    // fetch event and looks in the cache for a resource
    // that matches.  The match is performed by looking at 
    // the URL string.  The match methoe returns a promise 
    // that resolves even if the file is not found in the cache
    caches.match(e.request)
          .then(res => res || fetch(e.request))
  )
});