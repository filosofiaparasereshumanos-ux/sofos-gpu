// ============================================================================
//  RECORRIDO NARRADO: el juego se juega solo, como un audiolibro con imágenes.
//  Viaja por las épocas en orden cronológico; en cada una el guía da la
//  bienvenida, la cámara camina hasta cada pensador, que cuenta su lección con
//  su voz, y visita los lugares para descubrir. Pensado para escuchar mientras
//  se hace ejercicio o se descansa: botones grandes, subtítulos y pantalla
//  encendida. Modo «resumen» (más corto) o «completo».
// ============================================================================
const Recorrido = {
  T: {
    card: 'Recorrido narrado', cardS: 'El juego se juega solo: escucha la historia de la filosofía mientras caminas, corres o descansas',
    h: '🎧 Recorrido narrado', sub: 'Como un audiolibro con imágenes: el guía te recibe en cada mundo, cada pensador te cuenta su historia con su voz y visitas los lugares. No tienes que tocar nada.',
    from: 'Empezar en', cont: (n) => `Continuar donde quedé (${n})`, first: 'Desde el principio (Sumer)', mode: 'Duración',
    modes: [['resumen', 'Resumen', 'unos 6 minutos por mundo'], ['completo', 'Completo', 'unos 15 minutos por mundo']],
    go: '▶ Empezar el recorrido', close: 'Cerrar', narr: 'Narrador', guide: 'El guía', place: 'Lugar para descubrir',
    pause: 'Pausa', play: 'Seguir', skip: 'Saltar', nextEra: 'Mundo siguiente', exit: 'Salir', end: '¡Has terminado el recorrido por todas las épocas!',
    era: (n, name) => `Época ${n} · ${name}`, tip: 'Consejo: deja la pantalla encendida. Si la bloqueas, el teléfono puede pausar el sonido.',
  },
  KEY: 'odisea-razon.recorrido',
  on: false, paused: false, gen: 0, steps: [], si: 0, mode: 'resumen', ci: 0,
  // ---------------------------------------------------------------- panel para elegir
  build() {
    if (document.getElementById('rc')) return;
    const el = document.createElement('div'); el.id = 'rc'; el.className = 'nb'; el.hidden = true;
    el.innerHTML = '<div class="nb-card rc-card" role="dialog"><button class="ls-x pn-x" id="rc-x" aria-label="✕">✕</button><h3 class="rc-h"></h3><p class="rc-s"></p><label class="rc-l rc-lf"></label><select id="rc-from"></select><div class="rc-l rc-lm"></div><div class="rc-modes"></div><p class="rc-tip"></p><div class="btns"><button class="btn primary" id="rc-go"></button></div></div>';
    document.body.appendChild(el);
    el.querySelector('.rc-h').textContent = this.T.h; el.querySelector('.rc-s').textContent = this.T.sub; el.querySelector('.rc-lf').textContent = this.T.from; el.querySelector('.rc-lm').textContent = this.T.mode; el.querySelector('.rc-tip').textContent = this.T.tip;
    el.querySelector('#rc-go').textContent = this.T.go;
    el.querySelector('#rc-x').addEventListener('click', () => Panel.close('rc'));
    el.querySelector('#rc-go').addEventListener('click', () => { Audio.click && Audio.click(); const ci = +el.querySelector('#rc-from').value; Panel.close('rc'); this.start(ci); });
  },
  order() { return CHRONO.filter((i) => ERAS[i]); },
  open() {
    this.build(); Audio.init && Audio.init(); const el = document.getElementById('rc'); const O = this.order(); const s = store.get(this.KEY, {}) || {};
    this.mode = s.mode || 'resumen';
    const sel = el.querySelector('#rc-from'); sel.innerHTML = '';
    if (s.ci > 0 && s.ci < O.length) { const o = document.createElement('option'); o.value = s.ci; o.textContent = this.T.cont(ERAS[O[s.ci]].name); sel.appendChild(o); }
    O.forEach((idx, ci) => { const o = document.createElement('option'); o.value = ci; o.textContent = ci === 0 ? this.T.first : `${ci + 1}. ${ERAS[idx].name}`; sel.appendChild(o); });
    const box = el.querySelector('.rc-modes'); box.innerHTML = '';
    for (const [k, t, d] of this.T.modes) { const b = document.createElement('button'); b.className = 'rc-m' + (k === this.mode ? ' on' : ''); b.innerHTML = '<b></b><small></small>'; b.querySelector('b').textContent = t; b.querySelector('small').textContent = d; b.addEventListener('click', () => { this.mode = k; box.querySelectorAll('.rc-m').forEach((x) => x.classList.toggle('on', x === b)); }); box.appendChild(b); }
    Panel.open('rc');
  },
  // ---------------------------------------------------------------- recorrido
  start(ci) {
    this.on = true; this.paused = false; this.ci = ci; this.voices0 = G.settings.voices; G.settings.voices = true;
    store.set(this.KEY, { ci, mode: this.mode }); this.bar(true); keepAwake();
    clearInterval(this.hpT); this.hpT = setInterval(() => { if (!this.on) return clearInterval(this.hpT); G.hp = G.maxHp; input.auto = false; input.walk = null; input.keys = {}; }, 200);
    this.goEra(true);
  },
  goEra(first) {
    const O = this.order(); if (this.ci >= O.length) { this.say(null, this.T.narr, this.T.end, () => this.stop()); return; }
    const idx = O[this.ci]; store.set(this.KEY, { ci: this.ci, mode: this.mode }); const g = ++this.gen;
    if (first && G.state === 'play' && G.eraIdx === idx) { this.arrive(g); return; }
    if (G.state === 'play' || G.state === 'paused') { G.travelFrom = 'pause'; G.explore = true; } else { G.travelFrom = 'title'; G.explore = false; }
    hideAll(); travelTo(idx);
    const t0 = performance.now();
    const wait = () => { if (g !== this.gen || !this.on) return;
      if (G.state === 'intro') { const b = document.getElementById('b-enter'); if (b) b.click(); }
      if (G.state === 'play' && G.eraIdx === idx) return setTimeout(() => this.arrive(g), 1200);
      if (performance.now() - t0 > 60000) return this.stop(); setTimeout(wait, 400); };
    setTimeout(wait, 600);
  },
  arrive(g) {
    if (g !== this.gen || !this.on) return; const idx = G.eraIdx, e = ERAS[idx]; const O = this.order();
    $('#hud').hidden = true; $('#touch').hidden = true; this.bar(true); this.setEra(this.T.era(this.ci + 1 + '/' + O.length, e.name));
    const short = this.mode === 'resumen'; const S = [];
    // 1 · el guía da la bienvenida
    const gd = (NPCS[idx] || []).find((n) => n.greeter);
    if (gd) S.push((nx) => { const c = citizens.find((x) => x.npc && x.npc.greeter); const gx = c ? c.pos.x : gd.at[0], gz = c ? c.pos.z : gd.at[1]; this.walkTo(gx, gz - 3, gx, gz, () => this.sayAll({ npc: { id: gd.id, npc: { female: false } } }, this.T.guide, gd.lines, nx)); });
    // 2 · cada pensador cuenta su lección (el maestro de la época, al final)
    const list = [...sages].sort((a, b) => (a.boss ? 1 : 0) - (b.boss ? 1 : 0) || b.pos.z - a.pos.z);
    for (const s of list) {
      const d = s.data; const L = (LESSONS[d.id] && LESSONS[d.id].length ? LESSONS[d.id] : [d.intro]).filter(Boolean);
      const parts = short ? L.slice(0, 2) : L;
      S.push((nx) => { const dx = s.pos.x < -0.5 ? 2.8 : s.pos.x > 0.5 ? -2.8 : 0, dz = Math.abs(s.pos.x) < 0.5 ? (s.boss ? 4.4 : 3) : 0.4;
        this.walkTo(s.pos.x + dx, s.pos.z + dz, s.pos.x, s.pos.z, () => this.sayAll(s, d.short || d.name, parts, nx)); });
    }
    // 3 · los lugares para descubrir
    const pois = ((world && world.pois) || []).slice(0, short ? 2 : 99);
    for (const p of pois) S.push((nx) => this.walkTo(p.at[0] + 1.6, p.at[1] + 2.2, p.at[0], p.at[1], () => this.sayAll(null, p.name, short ? [`${p.name}. ${p.text}`] : [`${p.name}. ${p.text}`, p.fact], nx)));
    // 4 · al mundo siguiente
    S.push(() => { this.ci++; this.goEra(false); });
    this.steps = S; this.si = 0; this.run();
  },
  run() {
    if (!this.on || this.paused) return; const g = this.gen; const f = this.steps[this.si]; if (!f) return;
    f(() => { if (g !== this.gen || !this.on) return; this.si++; this.run(); });
  },
  // la cámara camina suave hasta (x, z) mirando a (fx, fz)
  walkTo(x, z, fx, fz, cb) {
    const g = this.gen; const p0 = { x: player.pos.x, z: player.pos.z }; const dist = Math.hypot(x - p0.x, z - p0.z); const D = Math.min(4200, 900 + dist * 110); const t0 = performance.now();
    const yaw1 = Math.atan2(-(fx - x), -(fz - z)); const yaw0 = player.yaw; let dy = yaw1 - yaw0; while (dy > Math.PI) dy -= Math.PI * 2; while (dy < -Math.PI) dy += Math.PI * 2;
    const place = (k) => { const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; const px = p0.x + (x - p0.x) * e, pz = p0.z + (z - p0.z) * e;
      let y = player.pos.y; try { const gr = groundAt(world, px, pz, player.pos.y + 3); if (gr) y = gr.top; } catch (er) { /* suelo plano */ }
      input.auto = false; input.walk = null; player.pos.set(px, y, pz); if (player.vel) player.vel.set(0, 0, 0); player.yaw = yaw0 + dy * Math.min(1, k * 1.6); if ('pitch' in player) player.pitch = 0.04; };
    if (document.hidden || dist < 0.3) { place(1); setTimeout(() => { if (g === this.gen) cb(); }, 50); return; }
    const step = () => { if (g !== this.gen || !this.on) return; if (this.paused) { requestAnimationFrame(step); return; } const k = Math.min(1, (performance.now() - t0) / D); place(k); if (k < 1) requestAnimationFrame(step); else cb(); };
    requestAnimationFrame(step);
  },
  sayAll(who, name, parts, cb) { let k = 0; const nx = () => { if (k >= parts.length) return cb(); const t = parts[k++]; this.say(who, name, t, nx); }; nx(); },
  say(who, name, text, cb) {
    const g = this.gen; this.sub(name, text, who); this.cur = [who, name, text, cb];
    Voice.utter(text, who, 1, () => { if (g === this.gen && !this.paused) setTimeout(() => { if (g === this.gen && !this.paused) cb && cb(); }, 450); });
  },
  // ---------------------------------------------------------------- controles
  togglePause() {
    if (!this.on) return; this.paused = !this.paused; this.gen++; Voice.stop();
    if (!this.paused) { const c = this.cur; if (c) { const [who, name, text, cb] = c; const g = this.gen; this.say(who, name, text, () => { if (g === this.gen) cb && cb(); }); } else this.run(); }
    this.paintBar();
  },
  skip() { if (!this.on) return; this.gen++; Voice.stop(); this.paused = false; this.si++; this.cur = null; this.paintBar(); this.run(); },
  nextEra() { if (!this.on) return; Voice.stop(); this.paused = false; this.cur = null; this.ci++; this.goEra(false); this.paintBar(); },
  stop() {
    this.on = false; this.paused = false; this.gen++; Voice.stop(); this.bar(false); G.settings.voices = this.voices0 !== undefined ? this.voices0 : G.settings.voices;
    if (G.state === 'play') { $('#hud').hidden = false; if (IS_TOUCH) $('#touch').hidden = false; }
  },
  bar(show) {
    document.body.classList.toggle('rc-on', !!show);
    let b = document.getElementById('rc-bar');
    if (!b) {
      b = document.createElement('div'); b.id = 'rc-bar';
      b.innerHTML = '<div class="rc-era"></div><div class="rc-sub"><b></b><p></p></div><div class="rc-ctl"><button data-a="p"></button><button data-a="s"></button><button data-a="n"></button><button data-a="x"></button></div>';
      (document.getElementById('app') || document.body).appendChild(b);
      b.querySelector('.rc-ctl').addEventListener('click', (e) => { const x = e.target.closest('button'); if (!x) return; Audio.click && Audio.click(); ({ p: () => this.togglePause(), s: () => this.skip(), n: () => this.nextEra(), x: () => this.stop() })[x.dataset.a](); });
    }
    b.hidden = !show; if (show) this.paintBar();
  },
  paintBar() { const b = document.getElementById('rc-bar'); if (!b) return; const [p, s, n, x] = b.querySelectorAll('.rc-ctl button'); p.textContent = this.paused ? '▶ ' + this.T.play : '⏸ ' + this.T.pause; s.textContent = '⏭ ' + this.T.skip; n.textContent = '🌍 ' + this.T.nextEra; x.textContent = '✕ ' + this.T.exit; },
  setEra(t) { const e = document.querySelector('#rc-bar .rc-era'); if (e) e.textContent = t; },
  sub(name, text) { const b = document.getElementById('rc-bar'); if (!b) return; b.querySelector('.rc-sub b').textContent = name; b.querySelector('.rc-sub p').textContent = text; },
  card() {
    if (document.getElementById('rc-tcard')) return; const anchor = document.getElementById('lib-card') || document.getElementById('sem-card') || document.getElementById('fr-dia'); if (!anchor) return;
    const c = document.createElement('button'); c.id = 'rc-tcard'; c.innerHTML = '<b>🎧</b><span><strong></strong><small></small></span>';
    c.querySelector('strong').textContent = this.T.card; c.querySelector('small').textContent = this.T.cardS;
    anchor.before(c); c.addEventListener('click', () => { Audio.click && Audio.click(); this.open(); });
  },
};
// mientras dura el recorrido: la voz sigue aunque se apague un momento la pantalla, y no aparece la pausa
{
  const st0 = Voice.stop.bind(Voice);
  Voice.stop = function () { if (Recorrido.on && document.hidden) return; return st0(); };
  document.addEventListener('visibilitychange', () => {
    if (!Recorrido.on) return;
    if (document.hidden) { setTimeout(() => { try { Audio.ctx && Audio.ctx.resume(); } catch (e) { /* nada */ } }, 60); }
    else { if (G.state === 'paused') { hideAll(); G.state = 'play'; } $('#hud').hidden = true; $('#touch').hidden = true; keepAwake(); }
  });
  // durante el recorrido no se abren conversaciones ni avisos de lugares por acercarse
  const to0 = Talk.open.bind(Talk); Talk.open = function (x) { if (Recorrido.on) return; return to0(x); };
  const tn0 = Talk.openNpc.bind(Talk); Talk.openNpc = function (x) { if (Recorrido.on) return; return tn0(x); };
  const pl0 = Places.open.bind(Places); Places.open = function (x) { if (Recorrido.on) return; return pl0(x); };
  // un toque en la pausa también ofrece el recorrido
  const btns = document.getElementById('b-pcodex') && document.getElementById('b-pcodex').parentNode;
  if (btns) { const b = document.createElement('button'); b.className = 'btn'; b.id = 'b-precorrido'; b.textContent = '🎧 ' + Recorrido.T.card; b.addEventListener('click', () => { Audio.click && Audio.click(); Recorrido.open(); }); btns.insertBefore(b, btns.firstChild); }
  setTimeout(() => Recorrido.card(), 120);
  const st = document.createElement('style');
  st.textContent = 'body.rc-on #mp-badge,body.rc-on #b-foto,body.rc-on #mp-triv,body.rc-on #mp-tor,body.rc-on #agora{display:none !important}#rc{z-index:67}.rc-h{font-family:var(--display);font-weight:normal;color:#ffe2a0;margin:2px 34px 6px 0;font-size:1.3rem}.rc-s{color:#f3e6c4;line-height:1.5}.rc-l{display:block;margin:12px 0 6px;color:#d8b25a;font-size:.8rem;letter-spacing:.12em;text-transform:uppercase}'
    + '#rc-from{width:100%;padding:10px;border-radius:10px;background:#120c06;color:#fff4dc;border:1px solid var(--line);font:inherit}.rc-modes{display:grid;grid-template-columns:1fr 1fr;gap:8px}.rc-m{display:flex;flex-direction:column;padding:10px;border-radius:12px;border:1px solid var(--line);background:rgba(255,255,255,.04);color:#fff4dc;font:inherit;cursor:pointer;text-align:left}.rc-m.on{border-color:#ffd36a;background:rgba(255,211,106,.14)}.rc-m small{color:#cdbb95}.rc-tip{font-size:.8rem;color:#bfae8e;margin:10px 0 4px}'
    + '#rc-bar{position:absolute;left:0;right:0;bottom:0;z-index:40;padding:10px max(12px,var(--sar,0px)) calc(12px + var(--sab,0px)) max(12px,var(--sal,0px));background:linear-gradient(transparent,rgba(8,5,2,.88) 22%);color:#fff4dc;font-family:var(--body,Georgia)}#rc-bar[hidden]{display:none}'
    + '.rc-era{font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;color:#d8b25a;margin-bottom:4px}.rc-sub b{display:block;font-family:var(--display);font-weight:normal;color:#ffe2a0;font-size:1.05rem}.rc-sub p{margin:4px 0 10px;font-size:1.02rem;line-height:1.45;max-height:7.4em;overflow:auto}'
    + '.rc-ctl{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.rc-ctl button{padding:12px 4px;border-radius:12px;border:1px solid rgba(216,178,90,.6);background:rgba(40,26,8,.85);color:#fff4dc;font:inherit;font-size:.86rem;cursor:pointer}'
    + '#rc-tcard{display:flex;align-items:center;gap:10px;width:min(440px,92vw);margin:8px auto 0;padding:9px 14px;border-radius:12px;border:1px solid var(--gold,#d8b25a);background:linear-gradient(150deg,rgba(30,60,80,.85),rgba(10,20,30,.9));color:#eef6ff;font-family:var(--body,Georgia);text-align:left;cursor:pointer}#rc-tcard b{font-size:1.5rem}#rc-tcard span{display:flex;flex-direction:column}#rc-tcard small{color:#cfe0ee}';
  document.head.appendChild(st);
}
if (location.hash === '#debug') window.__rc = Recorrido;
