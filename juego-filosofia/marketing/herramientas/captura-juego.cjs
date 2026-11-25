// Captura de juego real fotograma a fotograma con reloj virtual (30 fps exactos).
const { chromium } = require('playwright'); const fs = require('fs');
const NM = '/tmp/claude-0/-home-user-sofos-gpu/0d6e0aee-100c-5a3a-a348-9b7bd95f50c2/scratchpad/npmtest/node_modules/three/';
const PLAN = JSON.parse(process.argv[2]); const OUT = __dirname + '/frames/';
(async () => {
  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const ctx = await browser.newContext({ viewport: { width: 432, height: 768 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    const rNow = performance.now.bind(performance), rRAF = window.requestAnimationFrame.bind(window);
    let virt = false, vt = 0, q = [];
    performance.now = () => (virt ? vt : rNow());
    window.requestAnimationFrame = (cb) => (virt ? (q.push(cb), q.length) : rRAF(cb));
    window.__virt = () => { vt = rNow(); virt = true; };
    window.__step = (n) => { for (let i = 0; i < n; i++) { vt += 1000 / 30; const c = q.splice(0); c.forEach((f) => f(vt)); } };
    window.claude = { use: async (n) => (n === 'sample' ? async (input, o) => { const t = '¿La felicidad? Amigo mío, no está en el oro ni en la fama, sino en un alma bien ordenada. ¿Has examinado tú qué es lo que de verdad deseas?'; if (o && o.onText) o.onText({ text: t }); return { text: t }; } : null) };
  });
  await page.route('https://cdn.jsdelivr.net/npm/three@0.160.0/**', (r) => r.fulfill({ path: NM + r.request().url().split('three@0.160.0/')[1], contentType: 'application/javascript' }));
  await page.route('https://fonts.googleapis.com/**', (r) => r.abort());
  await page.goto('http://localhost:8765/index.html#debug');
  await page.waitForFunction(() => document.getElementById('loading').style.display === 'none', null, { timeout: 90000 });
  await page.evaluate(() => { window.__dbg.G.settings.quality = 'high'; window.__virt(); });
  for (const sh of PLAN) {
    fs.mkdirSync(OUT + sh.name, { recursive: true });
    if (sh.era !== undefined) {
      await page.evaluate((e) => { const d = window.__dbg; d.startEra(e, true); d.enterEra(); }, sh.era);
      await page.evaluate(() => window.__step(45));
    }
    await page.evaluate((hud) => { document.getElementById('hud').hidden = !hud; document.getElementById('touch').hidden = true; }, !!sh.hud);
    if (sh.travel) await page.evaluate(() => { window.__dbg.G.state = 'title'; document.getElementById('b-travel').click(); window.__step(20); });
    for (let f = 0; f < sh.n; f++) {
      const k = f / Math.max(1, sh.n - 1); const e = k * k * (3 - 2 * k);
      await page.evaluate(([sh, k, e]) => {
        const d = window.__dbg;
        if (sh.target && k === 0) {
          const w = d.world; let o;
          if (sh.target === 'book') o = w.books[sh.ti || 0]; else if (sh.target === 'citizen') o = d.citizens[sh.ti || 0]; else o = d.sages.find((x) => x.data.id === sh.target);
          const p = o.at ? { x: o.at[0], z: o.at[1] } : (o.pos || o.mesh.position);
          const a = sh.ang || 0; const dx = Math.sin(a), dz = Math.cos(a);
          const yaw = Math.atan2(dx, dz);
          window.__tgp = [p.x + dx * (sh.from || 7), p.z + dz * (sh.from || 7), p.x + dx * (sh.to || 2.6), p.z + dz * (sh.to || 2.6), yaw - 0.15, yaw, -0.08];
        }
        if (sh.target) sh.path = window.__tgp;
        if (sh.path) { const [x0, z0, x1, z1, y0, y1] = sh.path; d.input.walk = null; d.player.pos.set(x0 + (x1 - x0) * e, 0, z0 + (z1 - z0) * e); d.player.yaw = y0 + (y1 - y0) * e; d.player.pitch = sh.path[6] || 0; }
        if (sh.travel) { const l = document.querySelector('#travel .tv-list') || document.querySelector('#travel'); const sc = [...document.querySelectorAll('#travel *')].find((n) => n.scrollHeight > n.clientHeight + 50 && getComputedStyle(n).overflowY !== 'visible') || document.scrollingElement; sc.scrollTop = e * sh.travel; }
        window.__step(1);
      }, [sh, k, e]);
      if (sh.talkAt !== undefined && f === sh.talkAt) await page.evaluate(() => { const d = window.__dbg; d.tryInteract ? d.tryInteract() : document.getElementById('t-act').click(); });
      await page.screenshot({ path: `${OUT}${sh.name}/${String(f).padStart(4, '0')}.png` });
    }
    let f0 = sh.n;
    if (sh.interact) await page.evaluate(() => window.__dbg.tryInteract());
    if (sh.duel) await page.evaluate((id) => { const d = window.__dbg; const s = d.sages.find((x) => x.data.id === id); d.Duel.start(s); }, sh.duel);
    for (let f = 0; f < (sh.extra || 0); f++) {
      if (sh.duel && f === sh.answerAt) await page.evaluate(() => { const D = window.__dbg.Duel; D.askedAt = 0; D.answer(D.opts.findIndex((o) => o.ok)); });
      await page.evaluate(() => window.__step(1));
      await page.screenshot({ path: `${OUT}${sh.name}/${String(f0 + f).padStart(4, '0')}.png` });
    }
    if (sh.duel) await page.evaluate(() => window.__dbg.Duel.close());
    if (sh.interact) await page.evaluate(() => { for (const id of ['tk-x', 'ls-x', 'bk-x']) { const b = document.getElementById(id); if (b && b.offsetParent) b.click(); } document.querySelectorAll('.ls-x').forEach((b) => b.offsetParent && b.click()); });
    console.log('ok', sh.name);
  }
  await browser.close();
})();
