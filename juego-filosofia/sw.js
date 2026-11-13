// Service worker de Odisea de la Razón: la app abre sin conexión.
// Página: red primero (para recibir novedades) y copia guardada si no hay red.
// Imágenes, voces, biblioteca 3D y fuentes: se guardan la primera vez que se usan.
const V = 'odisea-v55';
const CORE = ['./', './index.html', './index-en.html', './manifest.webmanifest', './img/icon-192.png', './img/icon-512.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(V).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET' || r.headers.has('range')) return; // la música en streaming va directa a la red
  const u = new URL(r.url);
  const page = r.mode === 'navigate' || u.pathname.endsWith('/index.html') || u.pathname.endsWith('/index-en.html');
  if (page) {
    e.respondWith(fetch(r).then((res) => { const cp = res.clone(); caches.open(V).then((c) => c.put(r, cp)); return res; })
      .catch(() => caches.match(r).then((m) => m || caches.match('./index.html'))));
    return;
  }
  const ok = u.origin === location.origin || /cdn\.jsdelivr\.net|fonts\.(googleapis|gstatic)\.com/.test(u.hostname);
  if (!ok) return;
  e.respondWith(caches.match(r).then((m) => m || fetch(r).then((res) => {
    if (res.ok || res.type === 'opaque') { const cp = res.clone(); caches.open(V).then((c) => c.put(r, cp)); }
    return res;
  })));
});
