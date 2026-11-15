// Vuelos de cámara cinematográficos por varios mundos (para tráileres). Funciona con index.html o index-en.html.
// Uso: node captura-mundos.cjs <url del juego> <carpeta de salida> [ruta a three] [ids de mundos separados por coma]
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const [URL, OUT, THREE, IDS] = process.argv.slice(2);
const FPS = 30; const LIST = (IDS || 'sumer,atenas,islam,mexicas,japon,renacimiento,incas,belleza,biblia,cosmos').split(',');
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const ctx = await b.newContext({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }); const p = await ctx.newPage();
  await ctx.addInitScript(() => { // reloj virtual: el juego avanza exactamente 1/30 s entre fotos (movimiento parejo)
    const rNow = performance.now.bind(performance), rRAF = window.requestAnimationFrame.bind(window); let virt = false, vt = 0, q = [];
    performance.now = () => (virt ? vt : rNow()); window.requestAnimationFrame = (cb) => (virt ? (q.push(cb), q.length) : rRAF(cb));
    window.__virt = () => { vt = rNow(); virt = true; }; window.__step = (n) => { for (let i = 0; i < n; i++) { vt += 1000 / 30; const c = q.splice(0); c.forEach((f) => f(vt)); } };
  });
  await ctx.addInitScript(() => { try { localStorage.setItem('odisea-razon.guia-inicial', '1'); } catch (e) {} });
  if (THREE) await ctx.route('https://cdn.jsdelivr.net/npm/three@0.160.0/**', (r) => r.fulfill({ path: THREE + r.request().url().split('three@0.160.0/')[1], contentType: 'application/javascript' }));
  await ctx.route('https://fonts.googleapis.com/**', (r) => r.abort());
  await p.goto(URL + '#debug'); await p.waitForFunction(() => document.getElementById('loading').style.display === 'none', null, { timeout: 600000 });
  await p.evaluate(() => { const d = window.__dbg; d.G.settings.voices = false; d.G.settings.mundo = false; if (d.Juntos) { d.Juntos.asked = true; d.Juntos.askMundo = () => {}; } d.G.guideMet = new Set([...Array(80).keys()]); });
  const hide = () => p.evaluate(() => { for (const id of ['mp-badge', 'b-foto', 'agora', 'achv', 'toasts', 'hud', 'touch', 'mp-inv', 'mp-triv']) { const e = document.getElementById(id); if (e) e.style.display = 'none'; } });
  let shot = 0;
  for (const id of LIST) {
    await p.evaluate((id) => { const d = window.__dbg; d.startEra(d.ERAS.findIndex((e) => e.id === id), true); document.getElementById('b-enter').click(); }, id);
    await p.evaluate(() => { if (!window.__vOn) { window.__virt(); window.__vOn = 1; } window.__step(90); }); await hide();
    const dir = path.join(OUT, String(++shot).padStart(2, '0') + '-' + id); fs.mkdirSync(dir, { recursive: true });
    for (let k = 0; k < 26; k++) {
      // la cámara gira despacio alrededor de un pensador del mundo, a la altura de su cara
      await p.evaluate((k) => { const d = window.__dbg; const L = d.sages.filter((s) => !s.boss); const s = L[Math.min(L.length - 1, 1)] || d.sages[0]; const t = k / 25;
        const side = s.pos.x < 0 ? 1 : -1; const a = side * (0.25 + t * 0.7) - (side < 0 ? Math.PI : 0); const R = 2.0 - t * 0.45;
        const x = s.pos.x + Math.cos(a) * R * side * -1 + side * 0.0, z = s.pos.z + 1.2 + Math.sin(t * 1.2) * 0.8;
        const px = s.pos.x + side * R * Math.cos(0.5 - t * 0.6), pz = s.pos.z + R * Math.sin(0.5 - t * 0.6) + 0.6;
        d.player.pos.set(px, d.player.pos.y, pz); d.player.yaw = Math.atan2(-(s.pos.x - px), -(s.pos.z - pz)); d.player.pitch = 0.1; d.input.auto = false; d.input.walk = null; }, k);
      await p.evaluate(() => window.__step(1)); await p.screenshot({ path: path.join(dir, String(k).padStart(4, '0') + '.jpg'), type: 'jpeg', quality: 88 });
    }
    console.log(id);
  }
  await b.close();
})();
