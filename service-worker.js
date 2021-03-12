//** note: Every time you make changes to the service worker, navigate to the Application tab in Chrome DevTools, select Clear Storage, and then click on "Clear site data". Make sure that the unregister service workers checkbox is selected. If you don't check that box, the browser may try to use an outdated service worker.

const APP_PREFIX = 'FoodFest-';     
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

//define which files we'd like to cache
const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
  ];


//we use the self keyword to instantiate listeners on the service worker. The context of self here refers to the service worker object
self.addEventListener('install', function (e){

    //We use caches.open to find the specific cache by name, then add every file in the FILES_TO_CACHE array to the cache
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
          console.log('installing cache : ' + CACHE_NAME)
          return cache.addAll(FILES_TO_CACHE)
        })
      )
})

self.addEventListener('activate', function(e) {
    e.waitUntil(
      caches.keys().then(function(keyList) {
        let cacheKeeplist = keyList.filter(function(key) {
          return key.indexOf(APP_PREFIX);
        });
        cacheKeeplist.push(CACHE_NAME);
  
        return Promise.all(
          keyList.map(function(key, i) {
            if (cacheKeeplist.indexOf(key) === -1) {
              console.log('deleting cache : ' + keyList[i]);
              return caches.delete(keyList[i]);
            }
          })
        );
      })
    );
  });

//Here, we listen for the fetch event, log the URL of the requested resource, and then begin to define how we will respond to the request.
//Notice that we're using a method on the event object called respondWith to intercept the fetch request
//In the code that we'll be writing next, the following lines will check to see if the request is stored in the cache or not. If it is stored in the cache, e.respondWith will deliver the resource directly from the cache; otherwise the resource will be retrieved normally.

self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
    e.respondWith(
        //First, we use .match() to determine if the resource already exists in caches. If it does, we'll log the URL to the console with a message and then return the cached resource, using the following code:
      caches.match(e.request).then(function (request) {
        if (request) { // if cache is available, respond with cache
          console.log('responding with cache : ' + e.request.url)
          return request
        } else {       // if there are no cache, try fetching request
          console.log('file is not cached, fetching : ' + e.request.url)
          return fetch(e.request)
        }
  
        // You can omit if/else for console.log & put one line below like this too.
        // return request || fetch(e.request)
      })
    )
  })