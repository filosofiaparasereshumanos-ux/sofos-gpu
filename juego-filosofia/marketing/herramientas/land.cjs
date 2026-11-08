const { chromium } = require('playwright');
const NM = '/tmp/claude-0/-home-user-sofos-gpu/0d6e0aee-100c-5a3a-a348-9b7bd95f50c2/scratchpad/npmtest/node_modules/three/';
const OUT = __dirname + '/';
(async () => {
  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const ctx = await browser.newContext({ viewport: { width: 960, height: 600 }, deviceScaleFactor: 1.5 });
  const page = await ctx.newPage();
  await page.route('https://cdn.jsdelivr.net/npm/three@0.160.0/**', (r) => r.fulfill({ path: NM + r.request().url().split('three@0.160.0/')[1], contentType: 'application/javascript' }));
  await page.route('https://fonts.googleapis.com/**', (r) => r.abort());
  await page.goto('http://localhost:8765/index.html#debug');
  await page.waitForFunction(() => document.getElementById('loading').style.display === 'none', null, { timeout: 90000 });
  const shot = async (era, name, x, z, yaw) => {
    await page.evaluate((era) => { const d = window.__dbg; d.startEra(era, true); d.enterEra(); d.G.settings.quality = 'high'; }, era);
    await page.waitForTimeout(3000);
    await page.evaluate(([x, z, yaw]) => { const d = window.__dbg; d.input.walk = null; d.player.pos.set(x, 0, z); d.player.yaw = yaw; document.getElementById('hud').hidden = true; document.getElementById('touch').hidden = true; }, [x, z, yaw]);
    await page.waitForTimeout(1800); await page.screenshot({ path: OUT + 'l-' + name + '.png' });
  };
  // yaw 0 = mirando hacia -z (hacia el jefe/portal)
  const list = [[1,'athens',0,30,0],[1,'athens2',-4,8,0.6],[7,'contemp',0,30,0],[9,'latam',0,30,0],[10,'mexicas',0,30,0],[11,'incas',0,30,0],[13,'china',0,30,0],[14,'india',0,30,0],[15,'africa',0,30,0]];
  for (const l of list) { try { await shot(...l); } catch (e) { console.log(l[1], e.message); } }
  await browser.close();
})();
