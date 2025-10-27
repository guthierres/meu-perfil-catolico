const CACHE_NAME = 'catolid-v2';
const RUNTIME_CACHE = 'catolid-runtime-v2';

// 🛑 CORREÇÃO 1: Removido '/' e '/index.html' para aplicar estratégia Network-First no fetch.
const STATIC_ASSETS = [
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
          // O 'install' agora só armazena os ativos estáticos remanescentes.
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

  // Ignora requisições que não são http/https (como 'chrome-extension:')
  if (!url.protocol.startsWith('http')) {
      return;
  }

  if (request.method !== 'GET') {
    return;
  }

  // 1. 🥇 NOVA ESTRATÉGIA: Network-First com Fallback para o INDEX.HTML e a raiz ('/')
  // Isso força o SW a buscar a versão mais recente na rede e só usa o cache como fallback OFFLINE.
  // Isso resolve a "página em branco" na atualização.
  if (url.origin === location.origin && (url.pathname === '/' || url.pathname === '/index.html')) {
      event.respondWith(
          // Tenta a rede, se falhar, retorna o index.html do cache (o que foi instalado inicialmente)
          fetch(request).catch(() => caches.match('/index.html'))
      );
      return;
  }
    
  // 2. Estratégia: Cache-First para Assets Estáticos (Same Origin)
  // Agora só inclui os manifestos e ícones.
  if (url.origin === location.origin && STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
                // CORREÇÃO: Verifica se a resposta é válida (não 404/500) antes de armazenar
                if (networkResponse.ok) {
                    cache.put(request, networkResponse.clone());
                }
                return networkResponse;
            });
        });
      })
    );
    return;
  }

  // 3. Estratégia: Network-First para Outras Requisições Same-Origin (Scripts, Styles, etc.)
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
          // Fallback para o cache em caso de falha de rede
          return caches.match(request);
        })
    );
    return;
  }

  // 4. Estratégia: Network-Only com Fallback (sem cache inicial, para Supabase)
  if (url.hostname.includes('supabase.co')) {
    event.respondWith(
      fetch(request).catch(() => caches.match(request))
    );
    return;
  }

  // 5. Estratégia: Stale-While-Revalidate (com Timeout) para Outras APIs Cross-Origin
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          const cachedDate = new Date(cachedResponse.headers.get('date'));
          const now = Date.now();
          // Verifica se o cache expirou
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
          // Se a rede falhar, retorna o cache antigo
            if (cachedResponse) {
              return cachedResponse;
            }
            throw new Error('Network unavailable');
          });
      })
  );
});

// --- Evento 'message' (Permanece inalterado) ---
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
