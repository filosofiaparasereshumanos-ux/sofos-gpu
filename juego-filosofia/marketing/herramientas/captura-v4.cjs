// Vídeo «Así se juega»: tomas largas y continuas del juego real: captura del juego real fotograma a
// fotograma con reloj virtual (30 fps). Uso: node captura-v2.cjs <salida> <toma1,toma2,...>
const { chromium } = require('playwright'); const fs = require('fs');
const NM = '/tmp/claude-0/-home-user-sofos-gpu/0d6e0aee-100c-5a3a-a348-9b7bd95f50c2/scratchpad/npmtest/node_modules/three/';
const OUT = process.argv[2]; const ONLY = (process.argv[3] || '').split(',').filter(Boolean);
const ALL = [...Array(22).keys()];
// ---------- las tomas del vídeo v10
const SHOTS = [];
// recorridos cortos por muchos mundos (para el arranque rápido)
const FLY = [22, 23, 26, 29, 28, 31, 30, 24, 19, 21, 1, 12];
FLY.forEach((era, i) => SHOTS.push({ name: 'fly' + String(i).padStart(2, '0'), era, n: 48, setup: `if (d.world.agora) d.world.agora.g.visible = false;`,
  frame: `const z = 31 - 13 * e_; const x = ${i % 2 ? 2.2 : -2.2} * (1 - e_); d.player.pos.set(x, 0, z); d.player.yaw = ${i % 2 ? -0.18 : 0.18} * (1 - e_) + Math.sin(k * 3) * 0.04; d.player.pitch = 0.12 - 0.06 * e_;` }));
// Diógenes en su tinaja
SHOTS.push({ name: 'diogenes', era: 2, n: 110, setup: `const s = d.sages.find((x) => x.data.id === 'diogenes'); window.__s = s; window.__sd = Math.sign(s.pos.x);`,
  frame: `const s = window.__s, sd = window.__sd; const D = 9.5 - 4.5 * e_; const px = s.pos.x - sd * D, pz = s.pos.z + 1.2 + 2.5 * (1 - e_); d.player.pos.set(px, 0, pz); d.player.yaw = Math.atan2(-(s.pos.x + sd * 0.8 - px), -(s.pos.z - pz)); d.player.pitch = 0.02;` });
// saltar para alcanzar un orbe (con los controles táctiles a la vista)
SHOTS.push({ name: 'orbe', era: 25, n: 46, extra: 150, hud: true, setup: `const o = d.world.orbes.find((x) => x.kind === 'air'); window.__o = o; d.player.pos.set(o.x, 0, o.z + 6); d.player.yaw = 0; d.player.pitch = 0.2; d.G.state = 'play';`,
  frame: `const o = window.__o; d.player.pos.set(o.x, 0, o.z + 6 - 5.7 * e_); d.player.vel.set(0, 0, 0); d.player.yaw = 0; d.player.pitch = 0.2 + 0.12 * e_;`,
  at: { 50: `d.input.jumpReq = true;`, 150: `const q = d.Orbes.last; const bs = [...document.querySelectorAll('#xp-ops button')]; const b = bs.find((x) => q && x.textContent === q.a[0]) || bs[0]; if (b) b.click();` } });
// la estrella fugaz deja caer un orbe dorado
SHOTS.push({ name: 'estrella', era: 22, n: 130, setup: `d.player.pos.set(0, 0, 14); d.player.vel.set(0, 0, 0); d.player.yaw = 0; d.player.pitch = 0.28; d.G.state = 'play';`,
  frame: `d.player.pos.set(0, 0, 14); d.player.yaw = 0; d.player.pitch = 0.3 - 0.18 * e_;`,
  at: { 4: `d.world._starT = 0.001;` } });
// duelo de ideas entre dos pensadores
SHOTS.push({ name: 'versus', era: 29, n: 170, title: true,
  setup: `const V = d.Versus; const v = d.VERSUS.find((x) => x.id === 'turing-descartes'); V.play(v); V.gen++;`,
  at: { 60: `const V = d.Versus; V.next(false); V.gen++;`, 115: `const V = d.Versus; V.next(false); V.gen++;` },
  after: `d.Versus.close();` });
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
  await page.addStyleTag({ content: '#mp-badge, #b-foto { display: none !important; }' });
  await page.evaluate(() => { const d = window.__dbg; d.G.settings.quality = 'high'; d.G.settings.mundo = false; d.G.settings.voices = false; d.Juntos.asked = true; d.Juntos.welcomed = true; d.G.guideMet = new Set([...Array(60).keys()]); window.__virt(); });
  const run = (code, k = 0, e = 0, f = 0) => page.evaluate(([code, k, e, f]) => { const d = window.__dbg; new Function('d', 'k', 'e_', 'f', code)(d, k, e, f); }, [code, k, e, f]);
  for (const sh of SHOTS) {
    if (ONLY.length && !ONLY.includes(sh.name)) continue;
    const dir = `${OUT}/${sh.name}/`; fs.mkdirSync(dir, { recursive: true }); console.log('toma', sh.name);
    if (sh.era !== undefined) {
      await page.evaluate((e) => { const d = window.__dbg; d.G.guideMet = new Set([...Array(60).keys()]); d.startEra(e, true); d.enterEra(); }, sh.era);
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
