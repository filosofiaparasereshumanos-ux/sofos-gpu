// Tomas para el vídeo «Así se juega» (vertical) con la interfaz actual: portada, elección de época,
// paseo, conversación, lección ilustrada, debate, orbe, falacia, planetario e Inicio.
// Uso: node captura-asi-se-juega.cjs <url del juego> <carpeta de salida> [ruta a three]
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const [URL, OUT, THREE] = process.argv.slice(2);
const FPS = 12;
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const ctx = await b.newContext({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }); const p = await ctx.newPage();
  if (THREE) await ctx.route('https://cdn.jsdelivr.net/npm/three@0.160.0/**', (r) => r.fulfill({ path: THREE + r.request().url().split('three@0.160.0/')[1], contentType: 'application/javascript' }));
  await p.goto(URL + '#debug'); await p.waitForFunction(() => document.getElementById('loading').style.display === 'none', null, { timeout: 600000 });
  await p.evaluate(() => { const d = window.__dbg; d.G.guideMet = new Set([...Array(80).keys()]); d.G.settings.voices = false; });
  const hide = () => p.evaluate(() => { for (const id of ['mp-badge', 'b-foto', 'agora', 'achv', 'toasts']) { const e = document.getElementById(id); if (e) e.style.display = 'none'; } });
  let shot = 0;
  const rec = async (name, n, step) => { const dir = path.join(OUT, String(++shot).padStart(2, '0') + '-' + name); fs.mkdirSync(dir, { recursive: true });
    for (let k = 0; k < n; k++) { if (step) await p.evaluate(step, k); await p.waitForTimeout(1000 / FPS); await p.screenshot({ path: path.join(dir, String(k).padStart(4, '0') + '.jpg'), type: 'jpeg', quality: 88 }); }
    console.log(name, n); };
  const era = async (i) => { await p.evaluate((i) => { const d = window.__dbg; d.startEra(i, true); d.enterEra(); }, i); await p.waitForTimeout(5000);
    await p.evaluate(() => document.querySelectorAll('button').forEach((b) => { if (/jugar solo/i.test(b.textContent)) b.click(); })); await hide();
    await p.evaluate(() => { const d = window.__dbg; d.G.state = 'play'; }); };
  // 1 · la portada
  await rec('portada', 30);
  // 2 · elegir época
  await p.evaluate(() => document.getElementById('b-play').click()); await p.waitForTimeout(900);
  await rec('epocas', 36, (k) => { const s = document.getElementById('travel'); s.scrollTop = k * 30; });
  // 3 · pasear por Atenas hacia Sócrates
  await era(1);
  const soc = await p.evaluate(() => { const s = window.__dbg.sages.find((x) => x.data.id === 'socrates'); return { x: s.pos.x, z: s.pos.z }; });
  await rec('caminar', 50, (k) => { const d = window.__dbg; const s = d.sages.find((x) => x.data.id === 'socrates'); const t = k / 49; const x0 = 0, z0 = 30; const x = x0 + (s.pos.x - x0) * t * 0.85, z = z0 + (s.pos.z + 1 - z0) * t * 0.85; d.player.pos.set(x, 0, z); d.player.yaw = Math.atan2(-(s.pos.x - x), -(s.pos.z - z)); d.player.pitch = -0.02; });
  // 4 · hablar con Sócrates
  await p.evaluate(() => { const d = window.__dbg; const s = d.sages.find((x) => x.data.id === 'socrates'); const side = Math.sign(s.pos.x) || 1; d.player.pos.set(s.pos.x - side * 2.6, 0, s.pos.z); d.tryInteract(); });
  await rec('hablar', 30);
  // 5 · su lección ilustrada
  await p.evaluate(() => { const b = [...document.querySelectorAll('#tk-ops button')].find((x) => /lección/.test(x.textContent)); b && b.click(); }); await p.waitForTimeout(800);
  await rec('leccion', 36);
  await p.evaluate(() => { const x = document.getElementById('ls-close'); x && x.click(); window.__dbg.G.state = 'play'; });
  // 6 · el debate: elegir argumento y acertar
  await p.evaluate(() => { const d = window.__dbg; const s = d.sages.find((x) => x.data.id === 'socrates'); document.getElementById('lesson').hidden = true; d.G.state = 'play'; d.Duel.start(s); }); await p.waitForTimeout(1200); await hide();
  await p.evaluate(() => { const b = document.querySelectorAll('#d-cards .argc')[0]; b && b.click(); });
  await rec('debate', 20, () => { const D = window.__dbg.Duel; D.time = D.maxTime; });
  await p.evaluate(() => { const D = window.__dbg.Duel; D.answer(D.opts.findIndex((o) => o.ok)); });
  await rec('acierto', 22);
  await p.evaluate(() => window.__dbg.Duel.close());
  // 7 · un orbe de sabiduría
  await p.evaluate(() => { const d = window.__dbg; d.G.state = 'play'; const o = d.world.orbes.find((x) => x.kind === 'air'); window.__o = o; d.player.pos.set(o.x + 2.6, 0, o.z + 2.6); d.player.yaw = Math.atan2(2.6, 2.6); d.player.pitch = 0.16; });
  await rec('orbe', 24, (k) => { if (k === 10) { const d = window.__dbg; d.player.pos.set(window.__o.x, 0, window.__o.z); d.input.jumpReq = true; } });
  await p.evaluate(() => { const b = document.querySelector('#xp-ops button'); if (b) b.click(); });
  // 8 · cazar una falacia en el mercado de los sofistas
  await era(await p.evaluate(() => window.__dbg.ERAS.findIndex((e) => e.id === 'falacias')));
  await p.evaluate(() => { const d = window.__dbg; const sp = d.world.spots.filter((s) => s.verb === 'Analizar' || s.verb === 'Analyze')[0]; d.player.pos.set(sp.x, 0, sp.z); sp.act(); });
  await rec('falacia', 24);
  await p.evaluate(() => { const n = window.__dbg.world.falState[0].f.n; const b = [...document.querySelectorAll('#xp-ops button')].find((x) => x.textContent === n); b && b.click(); }); await p.waitForTimeout(500);
  await rec('cazada', 18);
  await p.evaluate(() => { const b = document.querySelector('#xp-ops button'); if (b) b.click(); });
  // 9 · el planetario
  await era(await p.evaluate(() => window.__dbg.ERAS.findIndex((e) => e.id === 'cosmos')));
  await p.evaluate(() => { const d = window.__dbg; const Z = d.ZONES.find((z) => z.id === 'planetario'); d.player.pos.set(Z.mouth.x, 0, Z.mouth.z); }); await p.waitForTimeout(2500);
  await rec('planetario', 40, (k) => { const d = window.__dbg; const a = -0.3 + k * 0.014, R = 24 - k * 0.1; const x = -200 + Math.sin(a) * R, z = -10 + Math.cos(a) * R; d.player.pos.set(x, 0, z); d.player.yaw = Math.atan2(x + 200, z + 10); d.player.pitch = 0.1; });
  // 10 · Inicio: colecciones y atlas
  await p.goto(URL + '#debug'); await p.waitForFunction(() => document.getElementById('loading').style.display === 'none', null, { timeout: 600000 });
  await rec('inicio', 30, (k) => { const s = document.getElementById('title'); if (s) s.scrollTop = k * 18; });
  await b.close();
})();
