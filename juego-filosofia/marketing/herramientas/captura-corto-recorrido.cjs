// Tomas para el corto del «Recorrido narrado» (vertical): la tarjeta de la portada, el panel para elegir
// y el recorrido real andando solo por varios mundos (guía, pensadores con subtítulos, viaje entre épocas).
// Uso: node captura-corto-recorrido.cjs <url del juego> <carpeta de salida> [ruta a three]
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const [URL, OUT, THREE] = process.argv.slice(2);
const FPS = 12;
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const ctx = await b.newContext({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }); const p = await ctx.newPage();
  await ctx.addInitScript(() => { try { localStorage.setItem('odisea-razon.guia-inicial', '1'); } catch (e) {} });
  if (THREE) await ctx.route('https://cdn.jsdelivr.net/npm/three@0.160.0/**', (r) => r.fulfill({ path: THREE + r.request().url().split('three@0.160.0/')[1], contentType: 'application/javascript' }));
  await ctx.route('https://fonts.googleapis.com/**', (r) => r.abort());
  await p.goto(URL + '#debug'); await p.waitForFunction(() => document.getElementById('loading').style.display === 'none', null, { timeout: 600000 });
  await p.evaluate(() => { const d = window.__dbg; d.G.settings.mundo = false; if (d.Juntos) { d.Juntos.asked = true; d.Juntos.askMundo = () => {}; } for (const id of ['mp-badge', 'agora', 'achv', 'toasts', 'b-foto', 'mp-inv']) { const e = document.getElementById(id); if (e) e.style.display = 'none'; } });
  let shot = 0;
  const rec = async (name, n, step) => { const dir = path.join(OUT, String(++shot).padStart(2, '0') + '-' + name); fs.mkdirSync(dir, { recursive: true });
    for (let k = 0; k < n; k++) { if (step) await p.evaluate(step, k); await p.waitForTimeout(1000 / FPS); await p.screenshot({ path: path.join(dir, String(k).padStart(4, '0') + '.jpg'), type: 'jpeg', quality: 88 }); }
    console.log(name, n); };
  // 1 · la tarjeta en la portada
  await rec('portada', 24, (k) => { const c = document.getElementById('rc-tcard'); const sc = [...document.querySelectorAll('*')].find((e) => e.scrollHeight > e.clientHeight + 50 && getComputedStyle(e).overflowY !== 'visible' && e.contains(c)) || document.scrollingElement; sc.scrollTop = Math.max(0, c.offsetTop - 300); if (k > 8) { c.style.transform = `scale(${1 + 0.04 * Math.sin((k - 8) / 2)})`; c.style.boxShadow = '0 0 40px rgba(140,200,255,.9)'; } });
  // 2 · el panel para elegir
  await p.evaluate(() => window.__rc.open()); await p.waitForTimeout(500);
  await rec('panel', 22);
  // 3 · el recorrido: la voz sale con el reloj (sin audio en la grabación) y la escena avanza sola
  await p.evaluate(() => { const rc = window.__rc; rc.say = function (who, name, text, cb) { this.sub(name, text); this.cur = [who, name, text, cb]; const g = this.gen; setTimeout(() => { if (g === this.gen && !this.paused) cb && cb(); }, 4200); }; document.getElementById('rc').hidden = true; });
  const tour = async (id, name, steps) => {
    await p.evaluate((id) => { const rc = window.__rc; const O = rc.order(); const ci = O.indexOf(window.__dbg.ERAS.findIndex((e) => e.id === id)); if (rc.on) { rc.ci = ci; rc.goEra(false); } else { rc.mode = 'resumen'; rc.start(ci); } }, id);
    await p.waitForFunction((id) => { const d = window.__dbg; return d.G.state === 'play' && d.ERAS[d.G.eraIdx].id === id && window.__rc.steps.length && window.__rc.si >= 0; }, id, { timeout: 90000 });
    await p.waitForTimeout(1500);
    for (let s = 0; s < steps; s++) { await rec(name + '-' + s, 36); if (s < steps - 1) await p.evaluate(() => window.__rc.skip()); }
  };
  await tour('sumer', 'sumer', 2);
  await tour('atenas', 'atenas', 2);
  await tour('biblia', 'biblia', 1);
  await tour('cosmos', 'cosmos', 1);
  await b.close();
})();
