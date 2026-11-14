// Tomas para el vídeo «Novedades» (vertical): mercado de los sofistas, cazador de falacias, bestiario,
// debate con golpe crítico, planetario, ficha de planeta, atlas y calendario cósmico.
// Uso: node captura-novedades.cjs <url del juego> <carpeta de salida> [ruta a three]
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const [URL, OUT, THREE] = process.argv.slice(2);
const FPS = 12;
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const ctx = await b.newContext({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }); const p = await ctx.newPage();
  if (THREE) await ctx.route('https://cdn.jsdelivr.net/npm/three@0.160.0/**', (r) => r.fulfill({ path: THREE + r.request().url().split('three@0.160.0/')[1], contentType: 'application/javascript' }));
  await p.goto(URL + '#debug'); await p.waitForFunction(() => document.getElementById('loading').style.display === 'none', null, { timeout: 600000 });
  await p.evaluate(() => { localStorage.setItem('odisea-razon.peso', '40'); const d = window.__dbg; d.G.guideMet = new Set([...Array(80).keys()]); d.G.settings.voices = false; });
  const hide = () => p.evaluate(() => { for (const id of ['mp-badge', 'b-foto', 'agora', 'achv', 'toasts']) { const e = document.getElementById(id); if (e) e.style.display = 'none'; } });
  let shot = 0;
  // graba n fotogramas; step(k) mueve la escena antes de cada foto
  const rec = async (name, n, step) => { const dir = path.join(OUT, String(++shot).padStart(2, '0') + '-' + name); fs.mkdirSync(dir, { recursive: true });
    for (let k = 0; k < n; k++) { if (step) await p.evaluate(step, k); await p.waitForTimeout(1000 / FPS); await p.screenshot({ path: path.join(dir, String(k).padStart(4, '0') + '.jpg'), type: 'jpeg', quality: 88 }); }
    console.log(name, n); };
  const era = async (i) => { await p.evaluate((i) => { const d = window.__dbg; d.startEra(i, true); d.enterEra(); }, i); await p.waitForTimeout(5000);
    await p.evaluate(() => document.querySelectorAll('button').forEach((b) => { if (/jugar solo/i.test(b.textContent)) b.click(); })); await hide();
    await p.evaluate(() => { const d = window.__dbg; d.G.state = 'play'; document.getElementById('hud').hidden = true; document.getElementById('touch').hidden = true; }); };
  const F = await p.evaluate(() => ({ fal: window.__dbg.ERAS.findIndex((e) => e.id === 'falacias'), cos: window.__dbg.ERAS.findIndex((e) => e.id === 'cosmos') }));
  // 1 · el mercado: la cámara avanza entre los puestos
  await era(F.fal);
  await rec('mercado', 60, (k) => { const d = window.__dbg; d.player.pos.set(Math.sin(k / 20) * 1.5, 0, 32 - k * 0.32); d.player.yaw = Math.sin(k / 30) * 0.25; d.player.pitch = 0.08; });
  // 2 · un pregón tramposo y la falacia cazada
  await p.evaluate(() => { const d = window.__dbg; const sp = d.world.spots.filter((s) => s.verb === 'Analizar' || s.verb === 'Analyze')[0]; d.player.pos.set(sp.x, 0, sp.z); sp.act(); });
  await rec('pregon', 30);
  await p.evaluate(() => { const n = window.__dbg.world.falState[0].f.n; const b = [...document.querySelectorAll('#xp-ops button')].find((x) => x.textContent === n); b.click(); });
  await p.waitForTimeout(500); await rec('cazada', 30);
  await p.evaluate(() => { const b = document.querySelector('#xp-ops button'); if (b) b.click(); });
  // 3 · el bestiario ilustrado
  await p.evaluate(() => { document.getElementById('b-falacias').click(); }); await p.waitForTimeout(500);
  await p.evaluate(() => { const its = [...document.querySelectorAll('.fa-it')]; [1, 9, 13].forEach((i) => its[i] && (its[i].open = true)); });
  await rec('bestiario', 40, (k) => { const c = document.querySelector('#fa .nb-card') || document.getElementById('fa'); c.scrollTop = k * 22; });
  await p.evaluate(() => document.getElementById('fa-x').click());
  // 4 · debate: cuerda, cartas y golpe crítico
  await p.evaluate(() => { const d = window.__dbg; localStorage.setItem('odisea-razon.debilidades', JSON.stringify({ gorgias: { w: 1 } })); const s = d.sages.find((x) => x.data.id === 'gorgias'); const side = Math.sign(s.pos.x) || 1; d.player.pos.set(s.pos.x - side * 2.8, 0, s.pos.z); d.G.streak = 6; d.Duel.start(s); });
  await p.waitForTimeout(1500); await hide();
  await p.evaluate(() => { const b = [...document.querySelectorAll('#d-cards .argc')].find((x) => x.dataset.c === 'pregunta'); b && b.click(); });
  await rec('debate', 18, () => { const D = window.__dbg.Duel; D.time = D.maxTime; });
  await p.evaluate(() => { const D = window.__dbg.Duel; D.time = D.maxTime; D.answer(D.opts.findIndex((o) => o.ok)); });
  await rec('critico', 26);
  await p.evaluate(() => window.__dbg.Duel.close());
  // 5 · el planetario
  await era(F.cos);
  await p.evaluate(() => { const d = window.__dbg; const Z = d.ZONES.find((z) => z.id === 'planetario'); d.player.pos.set(Z.mouth.x, 0, Z.mouth.z); }); await p.waitForTimeout(2500);
  await p.evaluate(() => { document.getElementById('hud').hidden = true; document.getElementById('touch').hidden = true; });
  await rec('planetario', 72, (k) => { const d = window.__dbg; const a = -0.6 + k * 0.014, R = 26 - k * 0.08; const x = -200 + Math.sin(a) * R, z = -10 + Math.cos(a) * R; d.player.pos.set(x, 0, z); d.player.yaw = Math.atan2(x + 200, z + 10); d.player.pitch = 0.1; });
  // 6 · ficha de Saturno
  await p.evaluate(() => { const d = window.__dbg; const sp = d.world.spots.find((s) => /Saturn/.test(s.label)); d.player.pos.set(sp.x, 0, sp.z + 3); sp.act(); });
  await rec('saturno', 30);
  await p.evaluate(() => { const b = document.querySelector('#xp-ops button'); if (b) b.click(); });
  // 7 · el atlas: de la Tierra al universo observable
  await p.evaluate(() => { window.__dbg.Cosmos ? 0 : 0; document.getElementById('b-cosmos').click(); }); await p.waitForTimeout(600);
  await rec('atlas', 64, (k) => { if (k % 8 === 7) document.getElementById('cs-out').click(); });
  // 8 · el calendario cósmico
  await p.evaluate(() => document.querySelector('#cs-tabs button[data-t=calendario]').click()); await p.waitForTimeout(400);
  await rec('calendario', 36, (k) => { const c = document.querySelector('#cs .nb-card') || document.getElementById('cs'); c.scrollTop = k * 26; });
  await b.close();
})();
