// Tomas para el corto «¿Quién sabe más: tú o tus amigos?» (vertical): la tarjeta del torneo en la portada,
// la elección de asientos, la mesa que se llena, la invitación por WhatsApp, dos preguntas y el podio.
// La mesa se simula en un solo navegador (los amigos son asientos de prueba que responden solos).
// Uso: node captura-corto-torneo.cjs <url del juego> <carpeta de salida> [ruta a three]
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const [URL, OUT, THREE] = process.argv.slice(2);
const FPS = 12;
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const ctx = await b.newContext({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }); const p = await ctx.newPage();
  await ctx.addInitScript(() => { try { localStorage.setItem('odisea-razon.guia-inicial', '1'); localStorage.setItem('odisea-juntos-id', 'TUAB12CD'); } catch (e) {} });
  if (THREE) await ctx.route('https://cdn.jsdelivr.net/npm/three@0.160.0/**', (r) => r.fulfill({ path: THREE + r.request().url().split('three@0.160.0/')[1], contentType: 'application/javascript' }));
  await ctx.route('https://fonts.googleapis.com/**', (r) => r.abort());
  await p.goto(URL + '#debug'); await p.waitForFunction(() => document.getElementById('loading').style.display === 'none', null, { timeout: 600000 });
  await p.evaluate(() => { const d = window.__dbg; d.G.settings.voices = false; for (const id of ['mp-badge', 'agora', 'achv', 'toasts']) { const e = document.getElementById(id); if (e) e.style.display = 'none'; } });
  let shot = 0;
  const rec = async (name, n, step) => { const dir = path.join(OUT, String(++shot).padStart(2, '0') + '-' + name); fs.mkdirSync(dir, { recursive: true });
    for (let k = 0; k < n; k++) { if (step) await p.evaluate(step, k); await p.waitForTimeout(1000 / FPS); await p.screenshot({ path: path.join(dir, String(k).padStart(4, '0') + '.jpg'), type: 'jpeg', quality: 88 }); }
    console.log(name, n); };
  // 1 · la portada: se baja hasta la tarjeta del torneo, que brilla
  const y0 = await p.evaluate(() => { const c = document.getElementById('tp-tcard'); const sc = c.closest('.screen, section, #title') || document.scrollingElement; return { top: c.getBoundingClientRect().top }; });
  await rec('portada', 30, (k) => { const c = document.getElementById('tp-tcard'); const sc = [...document.querySelectorAll('*')].find((e) => e.scrollHeight > e.clientHeight + 50 && getComputedStyle(e).overflowY !== 'visible' && e.contains(c)) || document.scrollingElement; sc.scrollTop = Math.min(k, 18) / 18 * (c.offsetTop - 260); if (k > 20) { c.style.transform = `scale(${1 + 0.04 * Math.sin((k - 20) / 2)})`; c.style.boxShadow = '0 0 40px rgba(255,211,106,.9)'; } });
  // 2 · elegir la mesa (sin conexión real: la mesa se dibuja en local). El 3D se congela para grabar más rápido.
  await p.evaluate(() => { const r = window.__dbg.renderer; r.render0 = r.render; r.render = () => {}; });
  await p.evaluate(() => { const T = window.__dbg.Trivia; T.canOpen = () => true; T.allDefault = true; T.stages = () => ['Final']; document.getElementById('title') && (document.getElementById('title').hidden = true); T.setup(); });
  await rec('mesa', 26);
  // 3 · la mesa se llena con los amigos
  await p.evaluate(() => { const T = window.__dbg.Trivia; T.open(4, true); clearInterval(T.T.beat); clearTimeout(T.T.t1); });
  const AM = [['SOFIA111', 'Sofía'], ['MATEO222', 'Mateo'], ['VALEN333', 'Valentina']];
  await rec('llena', 48, (k) => { const T = window.__dbg.Trivia; const AM = [['SOFIA111', 'Sofía'], ['MATEO222', 'Mateo'], ['VALEN333', 'Valentina']]; const n = Math.min(3, Math.floor(k / 12)); let ch = false;
    for (let i = 0; i < n; i++) if (!T.T.seats.includes(AM[i][0])) { T.T.seats[i + 1] = AM[i][0]; T.T.names[AM[i][0]] = AM[i][1]; ch = true; }
    if (ch) T.lobby(); });
  // 4 · la invitación por WhatsApp
  await p.evaluate(() => { const b = [...document.querySelectorAll('#mpd-a .btn')].find((x) => /WhatsApp/.test(x.textContent)); b && b.click(); });
  await rec('whatsapp', 24);
  await p.evaluate(() => { document.querySelectorAll('.cp-x').forEach((x) => x.click()); });
  // 5 · dos preguntas: los amigos responden solos, tú aciertas rápido
  await p.evaluate(() => { const T = window.__dbg.Trivia; T.start(); });
  await rec('prepara', 20);
  await p.waitForFunction(() => window.__dbg.Trivia.T && window.__dbg.Trivia.T.qi === 0, null, { timeout: 15000 });
  const qrec = async (name) => {
    await rec(name, 54, (k) => { const Tv = window.__dbg.Trivia, T = Tv.T; if (!T || !T.ans) return; const q = Tv.qs[T.gi]; const ok = q.o.findIndex((x) => x.ok);
      if (k === 10) T.ans.set('SOFIA111', { k: ok, ms: 5200 }); if (k === 14) T.ans.set('MATEO222', { k: (ok + 1) % 4, ms: 6100 }); if (k === 16) T.ans.set('VALEN333', { k: ok, ms: 7400 });
      if (k === 20) document.querySelectorAll('#mpd-a .sl-pa')[ok].click(); });
  };
  await qrec('pregunta1');
  await p.waitForFunction(() => window.__dbg.Trivia.T && window.__dbg.Trivia.T.qi === 1 && window.__dbg.Trivia.T.revd !== 1 * 1 + 0 - 0 + 0 && document.querySelectorAll('#mpd-a .sl-pa.ok').length === 0, null, { timeout: 20000 }).catch(() => {});
  await qrec('pregunta2');
  // 6 · el podio
  await p.evaluate(() => { const Tv = window.__dbg.Trivia; clearTimeout(Tv.T.t1); Tv.hostEndStage(); });
  await p.waitForTimeout(600);
  await rec('podio', 40);
  // 7 · cultura general: el museo
  await p.evaluate(() => { const r = window.__dbg.renderer; if (r.render0) r.render = r.render0; });
  await p.evaluate(() => { try { window.__dbg.Trivia.leave(''); } catch (e) {} window.__museo ? window.__museo.open() : document.getElementById('mu-tcard').click(); });
  await p.waitForTimeout(1500);
  await rec('museo', 30, (k) => { const c = document.querySelector('#mu .mu-card'); if (c) c.scrollTop = k * 14; });
  await b.close();
})();
