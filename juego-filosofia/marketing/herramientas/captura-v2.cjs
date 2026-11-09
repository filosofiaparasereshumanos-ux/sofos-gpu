// Tráiler II («el primer juego educativo completo»): captura del juego real fotograma a
// fotograma con reloj virtual (30 fps). Uso: node captura-v2.cjs <salida> <toma1,toma2,...>
const { chromium } = require('playwright'); const fs = require('fs');
const NM = '/tmp/claude-0/-home-user-sofos-gpu/0d6e0aee-100c-5a3a-a348-9b7bd95f50c2/scratchpad/npmtest/node_modules/three/';
const OUT = process.argv[2]; const ONLY = (process.argv[3] || '').split(',').filter(Boolean);
const ALL = [...Array(21).keys()];
// ---------- las tomas
const SHOTS = [];
SHOTS.push({ name: 'title', n: 24, title: true });
SHOTS.push({ name: 'chooser', n: 64, title: true, setup: `document.getElementById('b-play').click();`,
  frame: `const sc = [...document.querySelectorAll('#travel, #travel *')].find((n) => n.scrollHeight > n.clientHeight + 80 && getComputedStyle(n).overflowY !== 'visible') || document.getElementById('travel'); const k2 = Math.max(0, (k - 0.25) / 0.75); sc.scrollTop = (sc.scrollHeight - sc.clientHeight) * 0.55 * k2 * k2 * (3 - 2 * k2);` });
for (const e of ALL) SHOTS.push({ name: 'w' + String(e).padStart(2, '0'), era: e, n: 42,
  frame: `const s = ${e % 2 ? 1 : -1}; d.player.pos.set(1.0 - 0.6 * e_, 0, 33 - 15 * e_); d.player.yaw = s * (0.28 - 0.5 * e_); d.player.pitch = 0.05;` });
SHOTS.push({ name: 'duel', era: 1, n: 75, setup: `const s = d.sages.find((x) => x.data.id === 'socrates'); d.player.pos.set(s.pos.x + (s.pos.x < 0 ? 3 : -3), 0, s.pos.z + 1); d.player.yaw = Math.atan2(-(s.pos.x - d.player.pos.x), -(s.pos.z - d.player.pos.z)); d.Duel.start(s);`,
  at: { 32: `const D = d.Duel; D.askedAt = 0; D.answer(D.opts.findIndex((o) => o.ok));` }, after: `d.Duel.close();` });
SHOTS.push({ name: 'dialog', era: 1, n: 105, setup: `const s = d.sages.find((x) => x.data.id === 'platon'); d.player.pos.set(s.pos.x + (s.pos.x < 0 ? 2.6 : -2.6), 0, s.pos.z); d.player.yaw = s.pos.x < 0 ? Math.PI / 2 : -Math.PI / 2; d.player.pitch = 0.08; d.G.state = 'play'; d.Talk.open(s); [...document.querySelectorAll('#tk-ops button')].find((x) => /Dialoguemos/.test(x.textContent)).click();`,
  at: { 28: `[...document.querySelectorAll('#tk-ops button')][1].click();`, 52: `const T = d.Talk; const w = T.dlg.p.razones.find((r) => r.k === 'f'); [...document.querySelectorAll('#tk-ops button')].find((x) => x.textContent === w.t).click();` },
  after: `d.Talk.close();` });
SHOTS.push({ name: 'cave1', era: 1, n: 60, setup: `const W = d.world; d.G.state = 'play'; d.player.pos.set(W.caveMouth.x, 0, W.caveMouth.z); window.__step(4);`,
  frame: `d.player.pos.set(90, 6, 23.5 - 4 * e_); d.player.yaw = 0; d.player.pitch = -0.32 + 0.1 * e_;` });
SHOTS.push({ name: 'cave2', era: 1, n: 95, setup: `const W = d.world; d.G.state = 'play'; d.player.pos.set(W.caveMouth.x, 0, W.caveMouth.z); window.__step(4);`,
  frame: `d.player.pos.set(100 - 3 * e_, 0, -2.5 - 3 * e_); d.player.yaw = 0.95 - 0.55 * e_; d.player.pitch = 0.1;` });
SHOTS.push({ name: 'sisifo', era: 7, zone: 'sisifo', n: 85, setup: `const Z = d.ZONES.find((z) => z.id === 'sisifo'); Z.s.B.z = -21.2; Z.s.B.st = 'roll'; Z.s.B.v = 0; Z.s.n = 0; d.player.pos.set(163, 0, 18); d.player.yaw = 0.12; d.player.pitch = 0.3;` });
SHOTS.push({ name: 'giges', era: 1, zone: 'giges', n: 80, setup: `d.player.pos.set(-90, 0, 12); d.player.yaw = 0; const sp = d.world.spots.find((s) => s.label === 'El anillo de oro'); sp.act(); document.querySelector('#xp-ops button').click();`,
  frame: `d.player.pos.set(-90 + 3 * e_, 0, 12 - 16 * e_); d.player.yaw = -0.25 * e_; d.player.pitch = 0.02;`, after: `const Z = d.ZONES.find((z) => z.id === 'giges'); if (Z.s.inv) Z.s.invFn(false);` });
SHOTS.push({ name: 'desc', era: 5, zone: 'descartes', n: 170, setup: `d.player.pos.set(90, 0, 12.6); d.player.yaw = 0; d.player.pitch = -0.04;`,
  at: Object.fromEntries([[18, 'El palo en el agua'], [55, 'La cama'], [92, 'El espejo'], [132, 'La vela']].map(([f, l]) => [f, `const sp = d.world.spots.find((s) => s.label === '${l}'); sp.act(); document.querySelector('#xp-ops button').click(); d.player.pos.set(90, 0, 12.6); d.player.yaw = 0;`])),
  frame: `d.player.pos.set(90, 0, 12.6 - 1.5 * e_); d.player.yaw = 0; d.player.pitch = -0.04;` });
SHOTS.push({ name: 'mariposa', era: 12, zone: 'mariposa', n: 80, setup: ``,
  frame: `const Z = d.ZONES.find((z) => z.id === 'mariposa'); const P = Z.s.pads; const t = Math.min(P.length - 1.001, e_ * (P.length - 1)); const i = Math.floor(t), u = t - i; const a = P[i], b = P[i + 1]; d.player.pos.set(a.x + (b.x - a.x) * u + 1.5, a.top + (b.top - a.top) * u + 1.4, a.z + (b.z - a.z) * u + 5); d.player.vel.set(0, 0, 0); d.player.yaw = 0.15; d.player.pitch = -0.22;` });
SHOTS.push({ name: 'book', era: 18, n: 40, setup: `const b = d.world.books[0]; window.__bk = b; d.player.pos.set(b.at[0] - 6, 0, b.at[1] + 2);`, frame: `const b = window.__bk; d.player.pos.set(b.at[0] - 6 + 4.6 * e_, 0, b.at[1] + 2 - 1.6 * e_); d.player.yaw = Math.atan2(-(b.at[0] - d.player.pos.x), -(b.at[1] - d.player.pos.z)); d.player.pitch = -0.05;`,
  extra: 55, interactEnd: true });

// enfrentamientos: te acercas al avatar del pensador, debate y lo vences (estallido de luz sobre el avatar)
for (const [id, era, boss] of [['socrates', 1], ['hipatia', 2], ['laozi', 12], ['sorjuana', 8], ['enheduanna', 15], ['pachacutec', 10, true]]) {
  const A = 34 + (boss ? 86 : 0);
  SHOTS.push({ name: 'vs_' + id, era, n: 34, extra: A - 34 + 44 + 62,
    setup: `const s = d.sages.find((x) => x.data.id === '${id}'); window.__s = s; window.__side = s.pos.x < -0.5 ? 1 : s.pos.x > 0.5 ? -1 : 0;`,
    frame: `const s = window.__s, sd = window.__side; const D = 11 - ${boss ? 5.2 : 7.2} * e_; const px = s.pos.x + (sd ? sd * D : 0.8), pz = s.pos.z + (sd ? 0.9 : D); d.player.pos.set(px, 0, pz); d.player.yaw = Math.atan2(-(s.pos.x - px), -(s.pos.z - pz)); d.player.pitch = 0.07 + 0.06 * e_;`,
    at: { 34: `d.Duel.start(window.__s);`, [A + 22]: `const D = d.Duel; D.answer(D.opts.findIndex((o) => o.ok));`, [A + 44]: `window.__s.conv = 0; d.Duel.next();` },
    after: `document.getElementById('concept').hidden = true; d.Duel.close(); d.G.state = 'play';` });
}
// cruzar el arco-portal y pasar a la siguiente época
SHOTS.push({ name: 'portal', era: 1, n: 64, extra: 90,
  setup: `const P = d.world.portal; P.open = true; P.k = 1; window.__P = P.group.position.clone(); d.player.pos.set(window.__P.x, 0, window.__P.z + 15); d.player.yaw = 0; d.player.pitch = 0.16;`,
  frame: `if (d.G.state === 'play' && d.world.idx === 1) { const P = window.__P; d.player.pos.set(P.x + 0.4 * Math.sin(k * 3), 0, P.z + 15 - 14.2 * e_); d.player.yaw = 0; d.player.pitch = 0.16 - 0.08 * e_; }`,
  at: { 140: `if (d.G.state === 'intro') d.enterEra();` } });
// ---------- captura
(async () => {
  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const ctx = await browser.newContext({ viewport: { width: 432, height: 768 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage(); page.setDefaultTimeout(180000); page.on('pageerror', (e) => console.log('ERROR', e.message));
  await page.addInitScript(() => {
    const rNow = performance.now.bind(performance), rRAF = window.requestAnimationFrame.bind(window);
    let virt = false, vt = 0, q = [];
    performance.now = () => (virt ? vt : rNow());
    window.requestAnimationFrame = (cb) => (virt ? (q.push(cb), q.length) : rRAF(cb));
    window.__virt = () => { vt = rNow(); virt = true; };
    window.__step = (n) => { for (let i = 0; i < n; i++) { vt += 1000 / 30; const c = q.splice(0); c.forEach((f) => f(vt)); } };
  });
  await page.route('https://cdn.jsdelivr.net/npm/three@0.160.0/**', (r) => r.fulfill({ path: NM + r.request().url().split('three@0.160.0/')[1], contentType: 'application/javascript' }));
  await page.goto('http://localhost:8765/index.html#debug');
  await page.waitForFunction(() => document.getElementById('loading').style.display === 'none', null, { timeout: 120000 });
  await page.waitForTimeout(1500);
  await page.evaluate(() => { const d = window.__dbg; d.G.settings.quality = 'high'; d.G.guideMet = new Set([...Array(21).keys()]); window.__virt(); });
  const run = (code, k = 0, e = 0, f = 0) => page.evaluate(([code, k, e, f]) => { const d = window.__dbg; new Function('d', 'k', 'e_', 'f', code)(d, k, e, f); }, [code, k, e, f]);
  for (const sh of SHOTS) {
    if (ONLY.length && !ONLY.includes(sh.name)) continue;
    const dir = `${OUT}/${sh.name}/`; fs.mkdirSync(dir, { recursive: true }); console.log('toma', sh.name);
    if (sh.era !== undefined) {
      await page.evaluate((e) => { const d = window.__dbg; d.G.guideMet = new Set([...Array(21).keys()]); d.startEra(e, true); d.enterEra(); }, sh.era);
      await page.evaluate(() => window.__step(50));
      await page.evaluate(() => { const d = window.__dbg; for (const c of d.citizens) if (c.npc.greeter) c.group.visible = false; d.G.state = 'play'; });
    }
    if (sh.zone) { await page.evaluate((id) => { const d = window.__dbg; const Z = d.ZONES.find((z) => z.id === id); d.G.state = 'play'; d.player.pos.set(Z.mouth.x, 0, Z.mouth.z); }, sh.zone); await page.evaluate((id) => { const d = window.__dbg; const Z = d.ZONES.find((z) => z.id === id); for (let i = 0; i < 60 && d.world.zoneIn !== Z; i++) { d.G.state = 'play'; d.player.pos.set(Z.mouth.x, 0, Z.mouth.z); window.__step(1); } }, sh.zone); }
    await page.evaluate((title) => { document.getElementById('hud').hidden = true; document.getElementById('touch').hidden = true; if (!title) document.getElementById('toasts').innerHTML = ''; }, !!sh.title);
    if (sh.setup) await run(sh.setup);
    const N = sh.n + (sh.extra || 0);
    for (let f = 0; f < N; f++) {
      const k = Math.min(1, f / Math.max(1, sh.n - 1)); const e = k * k * (3 - 2 * k);
      if (sh.at && sh.at[f]) await run(sh.at[f], k, e, f);
      if (sh.interactEnd && f === sh.n) await page.evaluate(() => window.__dbg.tryInteract());
      if (sh.frame && f < sh.n) await run(sh.frame, k, e, f);
      await page.evaluate((title) => { document.getElementById('toasts').style.display = 'none'; if (!title) { document.getElementById('hud').hidden = true; document.getElementById('touch').hidden = true; } window.__step(1); }, !!sh.title);
      await page.screenshot({ path: `${dir}${String(f).padStart(4, '0')}.png` });
    }
    if (sh.after) await run(sh.after);
    await page.evaluate(() => { const d = window.__dbg; if (d.world && d.world.zoneIn) d.world.zoneIn = null; for (const id of ['tk-x', 'ls-x', 'bk-x']) { const b = document.getElementById(id); if (b && b.offsetParent) b.click(); } document.getElementById('xp').hidden = true; d.Talk && d.Talk.close && d.Talk.close(); });
  }
  await browser.close();
})();
