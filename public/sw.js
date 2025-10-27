const CACHE_NAME = 'catolid-v2';
const RUNTIME_CACHE = 'catolid-runtime-v2';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/icon-192.png',
  '/icon-512.png'
];

const API_CACHE_DURATION = 5 * 60 * 1000;

// --- Evento 'install' ---
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { cache: 'reload' })));
      })
      .then(() => self.skipWaiting())
  );
});

// --- Evento 'activate' ---
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// --- Evento 'fetch' com a Correção de Protocolo ---
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 🛑 CORREÇÃO APLICADA: Ignora requisições que não são http/https (como 'chrome-extension:')
  if (!url.protocol.startsWith('http')) {
      return;
  }

  if (request.method !== 'GET') {
    return;
  }

  // 1. Estratégia: Cache-First para Assets Estáticos (Same Origin)
  if (url.origin === location.origin && STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // 2. Estratégia: Network-First para Outras Requisições Same-Origin
  if (url.origin === location.origin) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            return caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, networkResponse.clone());
              return networkResponse;
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // 3. Estratégia: Network-Only com Fallback (sem cache inicial, para Supabase)
  if (url.hostname.includes('supabase.co')) {
    event.respondWith(
      fetch(request).catch(() => caches.match(request))
    );
    return;
  }

  // 4. Estratégia: Stale-While-Revalidate (com Timeout) para Outras APIs Cross-Origin
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          const cachedDate = new Date(cachedResponse.headers.get('date'));
          const now = Date.now();
          if (now - cachedDate.getTime() < API_CACHE_DURATION) {
            return cachedResponse;
          }
        }
        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse.ok) {
              return caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(request, networkResponse.clone());
                return networkResponse;
              });
            }
            return networkResponse;
          })
          .catch(() => {
            if (cachedResponse) {
              return cachedResponse;
            }
            throw new Error('Network unavailable');
          });
      })
  );
});

// --- Evento 'message' ---
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});
