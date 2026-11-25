// Tomas para el corto «Condenaron a Sócrates a muerte. ¿Tú qué harías?» (vertical): el juicio de Sócrates
// (acusación de Meleto, la defensa, el jurado de 500 votando, la pena, la cárcel y la cicuta).
// Uso: node captura-corto-juicio.cjs <url del juego> <carpeta de salida> [ruta a three]
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
  await p.evaluate(() => { const d = window.__dbg; d.G.settings.voices = false; for (const id of ['mp-badge', 'agora', 'achv', 'toasts']) { const e = document.getElementById(id); if (e) e.style.display = 'none'; } });
  let shot = 0;
  const rec = async (name, n, step) => { const dir = path.join(OUT, String(++shot).padStart(2, '0') + '-' + name); fs.mkdirSync(dir, { recursive: true });
    for (let k = 0; k < n; k++) { if (step) await p.evaluate(step, k); await p.waitForTimeout(1000 / FPS); await p.screenshot({ path: path.join(dir, String(k).padStart(4, '0') + '.jpg'), type: 'jpeg', quality: 88 }); }
    console.log(name, n); };
  // el 3D de la portada se congela detrás del panel para grabar más rápido
  await p.evaluate(() => { const r = window.__dbg.renderer; r.render = () => {}; const J = window.__juicio; J.open(); J.gen = 99; });
  const J = (fn) => p.evaluate(fn);
  // 1 · la acusación de Meleto
  await J(() => { const J = window.__juicio; J.show(window.__juicioD.acusacion.who, window.__juicioD.acusacion.say, 'Siguiente', () => {}); });
  await rec('acusacion', 36);
  // 2 · la defensa: tres respuestas, eliges la de Sócrates
  await J(() => { const J = window.__juicio; J.ask(window.__juicioD.defensa[0], () => {}); });
  await rec('defensa', 36);
  await J(() => { const J = window.__juicio; J.pick(window.__juicioD.defensa[0].opts.find((o) => o.k === 'socratico'), () => {}); });
  await p.waitForTimeout(300);
  await J(() => { const J = window.__juicio; if (J.nextFn) { const f = J.nextFn; f(); } });
  await rec('reaccion', 30);
  // 3 · el jurado de 500 vota: 280 culpable, 220 inocente
  await J(() => { const J = window.__juicio; J.show('narr', J.T.vote + '…', null); J.count(280, 220, null, () => J.show('narr', window.__juicioD.veredicto.culpable, null)); });
  await rec('votacion', 44);
  // 4 · la pena: ¿qué propones?
  await J(() => { const J = window.__juicio; J.jury(true, 280, 220); J.ask(window.__juicioD.pena, () => {}); });
  await rec('pena', 36);
  // 5 · la condena: 360 a muerte
  await J(() => { const J = window.__juicio; J.show('narr', J.T.vote + '…', null); J.count(360, 140, [J.T.death, J.T.alt], () => J.show('narr', window.__juicioD.sentencia.muerte, null)); });
  await rec('muerte', 44);
  // 6 · la cárcel: Critón le ofrece huir
  await J(() => { const J = window.__juicio; J.jury(false); J.ask(window.__juicioD.carcel, () => {}); });
  await rec('carcel', 34);
  // 7 · la cicuta y el final
  await J(() => { const J = window.__juicio; J.show('socrates', window.__juicioD.final[1].say, null); });
  await rec('gallo', 30);
  await J(() => { const J = window.__juicio; J.path = ['socratico', 'socratico', 'socratico', 'socratico', 'socratico', 'socratico']; J.coh = 6; J.end('cicuta'); });
  await rec('final', 34, (k) => { const c = document.querySelector('#juicio .nb-card'); if (c) c.scrollTop = 0; });
  await b.close();
})();
