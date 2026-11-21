// Tomas para el corto «¿Le ganarías un debate a Sócrates?» (vertical): «Debate tú» con Sócrates
// (pregunta, una falacia atrapada, un argumento sólido y el veredicto) y un vuelo rápido por tres mundos.
// Uso: node captura-corto-socrates.cjs <url del juego> <carpeta de salida> [ruta a three]
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
  await p.evaluate(() => { const d = window.__dbg; d.G.settings.voices = false; d.G.settings.mundo = false; });
  const hide = () => p.evaluate(() => { for (const id of ['mp-badge', 'b-foto', 'agora', 'achv', 'toasts', 'sem-card']) { const e = document.getElementById(id); if (e) e.style.display = 'none'; } });
  let shot = 0;
  const rec = async (name, n, step) => { const dir = path.join(OUT, String(++shot).padStart(2, '0') + '-' + name); fs.mkdirSync(dir, { recursive: true });
    for (let k = 0; k < n; k++) { if (step) await p.evaluate(step, k); await p.waitForTimeout(1000 / FPS); await p.screenshot({ path: path.join(dir, String(k).padStart(4, '0') + '.jpg'), type: 'jpeg', quality: 88 }); }
    console.log(name, n); };
  const era = async (id) => { await p.evaluate((id) => { const d = window.__dbg; d.G.settings.mundo = false; d.startEra(d.ERAS.findIndex((e) => e.id === id), true); document.getElementById('b-enter').click(); }, id); await p.waitForTimeout(5000); await hide();
    await p.evaluate(() => { document.getElementById('hud').hidden = true; document.getElementById('touch').hidden = true; }); };
  // 1 · Atenas: la cámara se acerca a Sócrates
  await era('atenas');
  const S = await p.evaluate(() => { const s = window.__dbg.sages.find((x) => x.data.id === 'socrates'); return s ? { x: s.pos.x, z: s.pos.z } : null; });
  if (S) await rec('atenas', 36, (k) => { const d = window.__dbg; const s = d.sages.find((x) => x.data.id === 'socrates'); const t = k / 35; const x = s.pos.x + (s.pos.x < 0 ? 1 : -1) * (7 - 4.6 * t), z = s.pos.z + 3 - 1.5 * t; d.player.pos.set(x, d.player.pos.y, z); d.player.yaw = Math.atan2(-(s.pos.x - x), -(s.pos.z - z)); d.player.pitch = 0.05; });
  // 2 · «Debate tú» con Sócrates
  await p.evaluate(() => { const P = window.__datos.POSTURAS.find((x) => x.id === 'socrates'); window.__postura.open(P); }); await p.waitForTimeout(900); await hide();
  await rec('pregunta', 40);
  await p.evaluate(() => { const o = window.__postura.P.rounds[0].opts.find((x) => x.k === 'falacia'); window.__postura.pick(o); }); await p.waitForTimeout(400);
  await rec('falacia', 44, (k) => { const c = document.querySelector('#vs .vs-card'); if (c && k > 8) c.scrollTop = c.scrollHeight; });
  await p.evaluate(() => window.__postura.next()); await p.waitForTimeout(600);
  await rec('ronda2', 24);
  await p.evaluate(() => { const o = window.__postura.P.rounds[1].opts.find((x) => x.k === 'bueno'); window.__postura.pick(o); }); await p.waitForTimeout(400);
  await rec('bueno', 44, (k) => { const c = document.querySelector('#vs .vs-card'); if (c && k > 8) c.scrollTop = c.scrollHeight; });
  await p.evaluate(() => { const Po = window.__postura; for (let i = 2; i < Po.P.rounds.length; i++) { Po.next(); Po.pick(Po.P.rounds[i].opts.find((x) => x.k === 'bueno')); } Po.next(); }); await p.waitForTimeout(800);
  await rec('veredicto', 40, (k) => { const c = document.querySelector('#vs .vs-card'); if (c) c.scrollTop = 0; });
  await p.evaluate(() => { try { window.__dbg.Versus.close(); } catch (e) {} });
  // 3 · ráfaga de mundos
  for (const id of ['biblia', 'belleza', 'cosmos']) {
    await era(id);
    await rec('mundo-' + id, 18, (k) => { const d = window.__dbg; d.player.pos.set(Math.sin(k / 9) * 2, d.player.pos.y, 20 - k * 0.45); d.player.yaw = Math.sin(k / 12) * 0.3; d.player.pitch = 0.06; });
  }
  await b.close();
})();
