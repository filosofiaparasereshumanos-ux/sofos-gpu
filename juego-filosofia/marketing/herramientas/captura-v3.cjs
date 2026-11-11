// Vídeo «Así se juega»: tomas largas y continuas del juego real: captura del juego real fotograma a
// fotograma con reloj virtual (30 fps). Uso: node captura-v2.cjs <salida> <toma1,toma2,...>
const { chromium } = require('playwright'); const fs = require('fs');
const NM = '/tmp/claude-0/-home-user-sofos-gpu/0d6e0aee-100c-5a3a-a348-9b7bd95f50c2/scratchpad/npmtest/node_modules/three/';
const OUT = process.argv[2]; const ONLY = (process.argv[3] || '').split(',').filter(Boolean);
const ALL = [...Array(22).keys()];
// ---------- las tomas (largas, para un vídeo con pocos cortes)
const SHOTS = [];
const SOC = `const s = d.sages.find((x) => x.data.id === 'socrates'); window.__s = s; window.__sd = s.pos.x < 0 ? 1 : -1;`;
// 1 · elegir una época
SHOTS.push({ name: 'chooser2', n: 150, title: true, setup: `document.getElementById('b-play').click();`,
  frame: `const sc = [...document.querySelectorAll('#travel, #travel *')].find((n) => n.scrollHeight > n.clientHeight + 80 && getComputedStyle(n).overflowY !== 'visible') || document.getElementById('travel'); const k2 = Math.max(0, (k - 0.15) / 0.85); sc.scrollTop = (sc.scrollHeight - sc.clientHeight) * 0.6 * k2 * k2 * (3 - 2 * k2);` });
// 2 · caminar por el mundo (con los controles a la vista)
SHOTS.push({ name: 'walk', era: 1, n: 230, hud: true, setup: SOC,
  frame: `const s = window.__s, sd = window.__sd; const x0 = 0, z0 = 33, x1 = s.pos.x + sd * 6.5, z1 = s.pos.z + 1.2; const px = x0 + (x1 - x0) * e_ * e_, pz = z0 + (z1 - z0) * e_; d.player.pos.set(px, 0, pz);
    const look = Math.atan2(-(s.pos.x - px), -(s.pos.z - pz)); d.player.yaw = look * e_ + Math.sin(k * 5) * 0.22 * (1 - e_); d.player.pitch = 0.05 - 0.03 * e_;
    const j = document.querySelector('#touch .stick, #joy, #touch .joy'); if (j) j.classList.add('on');` });
// 3 · acercarse y hablar con el pensador
SHOTS.push({ name: 'talk', era: 1, n: 50, extra: 190, setup: SOC + `d.player.pos.set(s.pos.x + window.__sd * 6.5, 0, s.pos.z + 1.2);`,
  frame: `const s = window.__s, sd = window.__sd; const px = s.pos.x + sd * (6.5 - 3.7 * e_), pz = s.pos.z + 1.2 - 1.0 * e_; d.player.pos.set(px, 0, pz); d.player.yaw = Math.atan2(-(s.pos.x - px), -(s.pos.z - pz)); d.player.pitch = 0.04;`,
  at: { 56: `d.G.state = 'play'; d.tryInteract();`, 120: `const b = [...document.querySelectorAll('#tk-ops button')].find((x) => /gran idea/.test(x.textContent)); if (b) b.click();` },
  after: `d.Talk.close();` });
// 4 · diálogo socrático con tiempos más largos
SHOTS.push({ name: 'dialog2', era: 1, n: 170, setup: `const s = d.sages.find((x) => x.data.id === 'platon'); d.player.pos.set(s.pos.x + (s.pos.x < 0 ? 2.6 : -2.6), 0, s.pos.z); d.player.yaw = s.pos.x < 0 ? Math.PI / 2 : -Math.PI / 2; d.player.pitch = 0.08; d.G.state = 'play'; d.Talk.open(s); [...document.querySelectorAll('#tk-ops button')].find((x) => /Dialoguemos/.test(x.textContent)).click();`,
  at: { 55: `[...document.querySelectorAll('#tk-ops button')][1].click();`, 105: `const T = d.Talk; const w = T.dlg.p.razones.find((r) => r.k === 'b'); [...document.querySelectorAll('#tk-ops button')].find((x) => x.textContent === w.t).click();` },
  after: `d.Talk.close();` });
// 5 · el ágora: la pregunta del día
SHOTS.push({ name: 'agora', era: 1, n: 70, extra: 130,
  setup: `const a = d.world.agora; window.__a = a; const era = d.ERAS[1].id; const ult = [['Camila', '6,0,4,2', 1], ['Diego', '4,3,1,3', 1], ['Sofía', '8,1,2,1', -1], ['Tomás', '5,2,0,0', 1], ['Antonia', '0,4,5,2', -1]].map(([apodo, aspecto, voto], i) => ({ jugador: 'Ghost00' + i, apodo, aspecto, voto })); d.Agora.data[era] = { si: 14, no: 9, ids: ult.map((u) => u.jugador), ult }; d.Agora.ghosts(d.world); a.key = ''; d.Agora.paint(d.world); d.Agora.fetch = () => Promise.resolve();`,
  frame: `const a = window.__a; d.player.pos.set(a.at[0] + 0.3 - 1.5 * (1 - e_), 0, a.at[1] + 9.5 - 6.9 * e_); d.player.yaw = 0.12 * (1 - e_); d.player.pitch = 0.05;`,
  at: { 76: `d.G.state = 'play'; d.Agora.open(1);`, 150: `const b = document.querySelector('#xp-ops button'); if (b) b.click();` },
  after: `document.getElementById('xp').hidden = true; d.G.state = 'play';` });
// 6 · en línea: viajeros sentados escuchando a Sócrates y uno que se acerca a retarte
const FAKE = `const J = d.Juntos; J.on = true; J.mode = 'publico'; J.net = 'ok'; J.myId(); const s = window.__s;
  [['MatiasX2', 'Matías', '3,4,0,4'], ['CamiZ003', 'Camila', '6,0,4,2'], ['DiegoQ04', 'Diego', '4,3,1,3'], ['SofiaQ05', 'Sofía', '8,1,2,1']].forEach(([id, n, l], i) => J.rPos({ id, n, l, e: 1, x: s.pos.x + window.__sd * 3, y: 0, z: s.pos.z + i - 1.5, r: 0, zn: '', s: 0, ls: s.data.id }));`;
SHOTS.push({ name: 'online', era: 1, n: 200, online: true, setup: SOC + FAKE + `window.__step(40);`,
  frame: `${FAKE} const s = window.__s, sd = window.__sd; const D = 13 - 5.5 * e_; const px = s.pos.x + sd * D, pz = s.pos.z + 3.2 - 2.4 * e_; d.player.pos.set(px, 0, pz); d.player.yaw = Math.atan2(-(s.pos.x + sd * 1.5 - px), -(s.pos.z - pz)); d.player.pitch = 0.03;`,
  at: { 70: `d.Juntos.rEmo({ id: 'CamiZ003', k: 3 });`, 120: `d.Juntos.rEmo({ id: 'MatiasX2', k: 0 });` } });
SHOTS.push({ name: 'meet', era: 1, n: 110, extra: 70, online: true, hud: true,
  setup: `const J = d.Juntos; J.on = true; J.mode = 'publico'; J.net = 'ok'; J.myId(); d.player.pos.set(0, 0, 30); d.player.yaw = 0; d.player.pitch = 0.04; d.G.state = 'play';`,
  frame: `const J = d.Juntos; const z = 19 + 8.3 * e_; J.rPos({ id: 'ValenT01', n: 'Valentina', l: '1,1,3,5', e: 1, x: 0.5, y: 0, z, r: Math.PI, zn: '', s: 1 }); J.rPos({ id: 'TomasZ07', n: 'Tomás', l: '5,2,0,3', e: 1, x: -4.5 + 2 * e_, y: 0, z: 21 + 2 * e_, r: 2.4, zn: '', s: 1 });`,
  at: { 60: `d.Juntos.rEmo({ id: 'ValenT01', k: 0 });`, 112: `const J = d.Juntos; for (const r of J.R.values()) r.seen = performance.now(); J.rEmo({ id: 'ValenT01', k: 2 });`, 150: `const J = d.Juntos; for (const r of J.R.values()) r.seen = performance.now();` },
  after: `d.Juntos.stop();` });
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
  await page.evaluate(() => { const d = window.__dbg; d.G.settings.quality = 'high'; d.G.settings.mundo = false; d.G.settings.voices = false; d.Juntos.asked = true; d.Juntos.welcomed = true; d.G.guideMet = new Set([...Array(30).keys()]); window.__virt(); });
  const run = (code, k = 0, e = 0, f = 0) => page.evaluate(([code, k, e, f]) => { const d = window.__dbg; new Function('d', 'k', 'e_', 'f', code)(d, k, e, f); }, [code, k, e, f]);
  for (const sh of SHOTS) {
    if (ONLY.length && !ONLY.includes(sh.name)) continue;
    const dir = `${OUT}/${sh.name}/`; fs.mkdirSync(dir, { recursive: true }); console.log('toma', sh.name);
    if (sh.era !== undefined) {
      await page.evaluate((e) => { const d = window.__dbg; d.G.guideMet = new Set([...Array(30).keys()]); d.startEra(e, true); d.enterEra(); }, sh.era);
      await page.evaluate(() => window.__step(50));
      await page.evaluate(() => { const d = window.__dbg; for (const c of d.citizens) if (c.npc.greeter) c.group.visible = false; d.G.state = 'play'; });
    }
    if (sh.zone) { await page.evaluate((id) => { const d = window.__dbg; const Z = d.ZONES.find((z) => z.id === id); d.G.state = 'play'; d.player.pos.set(Z.mouth.x, 0, Z.mouth.z); }, sh.zone); await page.evaluate((id) => { const d = window.__dbg; const Z = d.ZONES.find((z) => z.id === id); for (let i = 0; i < 60 && d.world.zoneIn !== Z; i++) { d.G.state = 'play'; d.player.pos.set(Z.mouth.x, 0, Z.mouth.z); window.__step(1); } }, sh.zone); }
    await page.evaluate((title) => { if (!title) { document.getElementById('hud').hidden = true; document.getElementById('touch').hidden = true; document.getElementById('toasts').innerHTML = ''; } }, !!sh.title || !!sh.hud);
    if (sh.setup) await run(sh.setup);
    const N = sh.n + (sh.extra || 0);
    for (let f = 0; f < N; f++) {
      const k = Math.min(1, f / Math.max(1, sh.n - 1)); const e = k * k * (3 - 2 * k);
      if (sh.at && sh.at[f]) await run(sh.at[f], k, e, f);
      if (sh.interactEnd && f === sh.n) await page.evaluate(() => window.__dbg.tryInteract());
      if (sh.frame && f < sh.n) await run(sh.frame, k, e, f);
      await page.evaluate((title) => { document.getElementById('toasts').style.display = 'none'; if (!title) { document.getElementById('hud').hidden = true; document.getElementById('touch').hidden = true; } window.__step(1); }, !!sh.title || !!sh.hud);
      await page.screenshot({ path: `${dir}${String(f).padStart(4, '0')}.png` });
    }
    if (sh.after) await run(sh.after);
    await page.evaluate(() => { const d = window.__dbg; if (d.world && d.world.zoneIn) d.world.zoneIn = null; for (const id of ['tk-x', 'ls-x', 'bk-x']) { const b = document.getElementById(id); if (b && b.offsetParent) b.click(); } document.getElementById('xp').hidden = true; d.Talk && d.Talk.close && d.Talk.close(); });
  }
  await browser.close();
})();
