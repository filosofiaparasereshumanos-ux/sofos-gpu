const { chromium } = require('playwright');
const S = '/tmp/claude-0/-home-user-sofos-gpu/0d6e0aee-100c-5a3a-a348-9b7bd95f50c2/scratchpad/';
(async () => {
  const b = await chromium.launch({ proxy: { server: process.env.HTTPS_PROXY, bypass: 'localhost,127.0.0.1' }, args: ['--ignore-certificate-errors', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const errs = [];
  const mk = async (tag, look) => {
    const ctx = await b.newContext({ viewport: { width: 432, height: 768 } }); const p = await ctx.newPage();
    await ctx.route('https://cdn.jsdelivr.net/npm/three@0.160.0/**', (r) => r.fulfill({ path: S + 'npmtest/node_modules/three/' + r.request().url().split('three@0.160.0/')[1], contentType: 'application/javascript' }));
    p.on('pageerror', (e) => errs.push(tag + ': ' + e.message));
    await p.goto('http://localhost:8765/index.html#debug', { waitUntil: 'domcontentloaded', timeout: 180000 });
    await p.waitForFunction(() => document.getElementById('loading').style.display === 'none', null, { timeout: 500000 });
    await p.evaluate((look) => { localStorage.setItem('odisea-razon.avatar', JSON.stringify(look)); const d = window.__dbg; d.G.settings.mundo = true; d.G.settings.voices = false; d.G.settings.quality = 'low'; d.Juntos.asked = true; d.Juntos.welcomed = true; d.G.guideMet = new Set([...Array(30).keys()]); }, look);
    return p;
  };
  const P = [await mk('A', { r: 1, s: 1, h: 3, t: 0, n: 'Valentina' }), await mk('B', { r: 3, s: 4, h: 0, t: 0, n: 'Matías' }), await mk('C', { r: 6, s: 0, h: 4, t: 0, n: 'Camila' })];
  const [A, B, C] = P;
  for (let i = 0; i < 3; i++) await P[i].evaluate((i) => { const d = window.__dbg; d.startEra(1, true); d.enterEra(); d.G.state = 'play'; d.player.pos.set(i * 6 - 6, 0, 26); d.player.yaw = 0; }, i);
  for (const p of P) await p.waitForFunction(() => /2 viajeros aquí/.test(document.getElementById('mp-badge').textContent), null, { timeout: 60000 });
  await A.waitForFunction(() => !document.getElementById('mp-tor').hidden, null, { timeout: 20000 });
  console.log('botón de torneo visible en A'); await A.evaluate(() => document.querySelectorAll('#toasts > *').forEach((t) => t.remove())); await A.screenshot({ path: S + 't-boton.png' });
  await A.evaluate(() => document.getElementById('mp-tor').click());
  for (const p of [B, C]) { await p.waitForFunction(() => !document.getElementById('mp-inv').hidden, null, { timeout: 15000 }); }
  console.log('invitación en B:', (await B.textContent('#mp-inv-t')).slice(0, 70));
  await B.evaluate(() => document.getElementById('mp-yes').click()); await C.evaluate(() => document.getElementById('mp-yes').click());
  await A.waitForTimeout(2500);
  console.log('diag A:', await A.evaluate(() => { const T = window.__dbg.Torneo.T; return T ? JSON.stringify([...T.P]) + ' host=' + T.host + ' yo=' + window.__dbg.Juntos.id + ' R=' + [...window.__dbg.Juntos.R.keys()] : 'sin T'; }));
  console.log('diag B:', await B.evaluate(() => { const T = window.__dbg.Torneo.T; return (T ? 'T host=' + T.host : 'sin T') + ' estado=' + window.__dbg.G.state + ' inv=' + JSON.stringify(window.__dbg.Juntos.inv) + ' joined=' + (typeof MRT !== 'undefined' ? MRT.joined : '?'); }));
  await A.waitForFunction(() => /Empezar ya/.test(document.getElementById('mpd-a').textContent), null, { timeout: 15000 });
  console.log('sala de A:', await A.textContent('#mpd-q')); await A.screenshot({ path: S + 't-sala.png' });
  await A.evaluate(() => document.querySelector('#mpd-a button').click());
  const round = async (r) => {
    await A.waitForTimeout(4000);
    for (const [n, p] of [['A', A], ['B', B], ['C', C]]) console.log('diag', n, await p.evaluate(() => { const T = window.__dbg.Torneo.T; return T ? `r=${T.r} i=${T.i} host=${T.host === window.__dbg.Juntos.id} botones=${document.querySelectorAll('#mpd-a button.sl-pa').length} n=${document.getElementById('mpd-n').textContent} q=${document.getElementById('mpd-q').textContent.slice(0, 50)}` : 'sin T · estado ' + window.__dbg.G.state; }));
    for (const p of P) await p.waitForFunction((r) => { const T = window.__dbg.Torneo.T; return T && T.r === r && T.i === 0 && document.querySelectorAll('#mpd-a button.sl-pa').length >= 2; }, r, { timeout: 30000 });
    if (r === 0) { console.log('tesis:', await A.textContent('#mpd-q')); await B.screenshot({ path: S + 't-tesis.png' }); }
    // A y B eligen la razón buena, C una falacia
    for (let i = 0; i < 3; i++) { const p = P[i]; await p.evaluate((i) => document.querySelectorAll('#mpd-a button')[i % 2].click(), i); await p.waitForFunction(() => window.__dbg.Torneo.T.i === 1 && window.__dbg.Torneo.T.rz, null, { timeout: 10000 });
      await p.evaluate((i) => { const T = window.__dbg.Torneo.T; let k = T.rz.findIndex((x) => x.k === (i < 2 ? 'b' : 'f')); if (k < 0) k = 0; document.querySelectorAll('#mpd-a button')[k].click(); }, i); }
    try { for (const p of P) await p.waitForFunction(() => /Vota la mejor razón|Voto enviado/.test(document.getElementById('mpd-n').textContent), null, { timeout: 30000 }); }
    catch (e) { for (const [n, p] of [['A', A], ['B', B], ['C', C]]) console.log('FALLO', n, await p.evaluate(() => { const T = window.__dbg.Torneo.T, J = window.__dbg.Juntos; return `r=${T.r} i=${T.i} ans=${T.ans ? [...T.ans.keys()] : '-'} P=${[...T.P.keys()]} R=${[...J.R.keys()]} on=${J.on} n=${document.getElementById('mpd-n').textContent}`; })); throw e; }
    if (r === 0) { console.log('opciones de voto en C:', await C.evaluate(() => document.querySelectorAll('#mpd-a button').length)); await C.screenshot({ path: S + 't-voto.png' }); }
    for (const p of P) await p.evaluate(() => { const b = document.querySelector('#mpd-a button.sl-pa'); if (b) b.click(); });
    for (const p of P) await p.waitForFunction((r) => /Resultado/.test(document.getElementById('mpd-n').textContent) && document.querySelectorAll('.mpd-card').length === 3, r, { timeout: 40000 });
    console.log('ronda', r + 1, '→', await A.evaluate(() => [...document.querySelectorAll('.mpd-card b')].map((x) => x.textContent).join(' | ')));
    if (r === 0) await A.screenshot({ path: S + 't-ronda.png' });
  };
  await round(0);
  for (let k = 0; k < 4; k++) { await A.waitForTimeout(5000); console.log('tras', (k + 1) * 5, 's:', await A.evaluate(() => { const T = window.__dbg.Torneo.T; return T ? `r=${T.r} i=${T.i} done=${Object.keys(T.done)} n=${document.getElementById('mpd-n').textContent}` : 'sin T ' + window.__dbg.G.state; })); }
  await round(1);
  for (const [n, p] of [['A', A], ['B', B], ['C', C]]) console.log(n + ':', await p.textContent('#mpd-q'), '|', await p.evaluate(() => localStorage.getItem('odisea-razon.logros')));
  await C.screenshot({ path: S + 't-final.png' });
  await A.evaluate(() => document.querySelector('#mpd-a button.btn').click()); console.log('A tras cerrar:', await A.evaluate(() => window.__dbg.G.state + ' T=' + window.__dbg.Torneo.T));
  console.log('errores', errs); await b.close();
})();
