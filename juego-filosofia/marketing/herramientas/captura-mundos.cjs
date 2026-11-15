// Vuelos de cámara cinematográficos por varios mundos (para tráileres). Funciona con index.html o index-en.html.
// Uso: node captura-mundos.cjs <url del juego> <carpeta de salida> [ruta a three] [ids de mundos separados por coma]
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const [URL, OUT, THREE, IDS] = process.argv.slice(2);
const FPS = 12; const LIST = (IDS || 'sumer,atenas,islam,mexicas,japon,renacimiento,incas,belleza,biblia,cosmos').split(',');
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const ctx = await b.newContext({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }); const p = await ctx.newPage();
  await ctx.addInitScript(() => { try { localStorage.setItem('odisea-razon.guia-inicial', '1'); } catch (e) {} });
  if (THREE) await ctx.route('https://cdn.jsdelivr.net/npm/three@0.160.0/**', (r) => r.fulfill({ path: THREE + r.request().url().split('three@0.160.0/')[1], contentType: 'application/javascript' }));
  await ctx.route('https://fonts.googleapis.com/**', (r) => r.abort());
  await p.goto(URL + '#debug'); await p.waitForFunction(() => document.getElementById('loading').style.display === 'none', null, { timeout: 600000 });
  await p.evaluate(() => { const d = window.__dbg; d.G.settings.voices = false; d.G.settings.mundo = false; if (d.Juntos) { d.Juntos.asked = true; d.Juntos.askMundo = () => {}; } d.G.guideMet = new Set([...Array(80).keys()]); });
  const hide = () => p.evaluate(() => { for (const id of ['mp-badge', 'b-foto', 'agora', 'achv', 'toasts', 'hud', 'touch', 'mp-inv', 'mp-triv']) { const e = document.getElementById(id); if (e) e.style.display = 'none'; } });
  let shot = 0;
  for (const id of LIST) {
    await p.evaluate((id) => { const d = window.__dbg; d.startEra(d.ERAS.findIndex((e) => e.id === id), true); document.getElementById('b-enter').click(); }, id);
    await p.waitForTimeout(5500); await hide();
    const dir = path.join(OUT, String(++shot).padStart(2, '0') + '-' + id); fs.mkdirSync(dir, { recursive: true });
    for (let k = 0; k < 20; k++) {
      await p.evaluate((k) => { const d = window.__dbg; const t = k / 19; const side = (k % 2) * 0; d.player.pos.set(Math.sin(t * 1.4 - 0.7) * 6, d.player.pos.y, 26 - t * 12); d.player.yaw = -Math.sin(t * 1.4 - 0.7) * 0.35; d.player.pitch = 0.1 - t * 0.06; d.input.auto = false; d.input.walk = null; }, k);
      await p.waitForTimeout(1000 / FPS); await p.screenshot({ path: path.join(dir, String(k).padStart(4, '0') + '.jpg'), type: 'jpeg', quality: 88 });
    }
    console.log(id);
  }
  await b.close();
})();
