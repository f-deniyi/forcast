const staticForcast = "Forcast";
const assets = ["/", "./css/style.css", "./js/script.js", "./img/sunny1.png", "./app.js"];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticForcast).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});

