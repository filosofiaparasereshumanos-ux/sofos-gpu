// ============================================================================
//  VISTA EN TERCERA PERSONA Y MAPA DEL MUNDO
//  · Vista: la cámara se coloca detrás de tu personaje (se ve su espalda), más
//    alta y con más campo de visión, para ver mejor lo que hay que explorar y
//    marear menos. Se cambia con el botón 👁 (se recuerda la elección).
//  · Mapa: un plano del mundo con pensadores, lugares, libros y ciudadanos. Tocas
//    uno y apareces a su lado, o vas caminando. Pensado para moverse sin esfuerzo.
// ============================================================================
const Vista = {
  KEY: 'odisea-razon.vista3',
  T: { on: 'Vista: detrás de tu personaje', off: 'Vista: en primera persona', b3: 'Vista', map: 'Mapa' },
  on: true, fig: null, ls: '', ph: 0,
  init() { const v = store.get(this.KEY, null); this.on = v === null ? true : !!v; },
  toggle() { this.on = !this.on; store.set(this.KEY, this.on); toast(this.on ? this.T.on : this.T.off); this.paint(); },
  paint() { const b = document.getElementById('b-vista'); if (b) { b.classList.toggle('on', this.on); b.querySelector('b').textContent = this.on ? '🧍' : '👁'; } },
  active() { return this.on && world && G.state === 'play' && !(world.cave && world.cave.in); },
  ensureFig() {
    let ls = '0,2,0,0'; try { ls = Juntos.lookStr(); } catch (e) { /* sin avatar */ }
    if (this.fig && this.ls === ls && this.fig.group.parent === scene) return;
    if (this.fig) scene.remove(this.fig.group);
    const f = buildFigure(avLook(avParse(ls)), 0xffffff); f.halo.visible = false; scene.add(f.group); this.fig = f; this.ls = ls;
  },
  // se aplica solo al dibujar: la lógica del juego sigue usando la cámara de los ojos
  before() {
    if (!this.active()) { if (this.fig) this.fig.group.visible = false; return null; }
    this.ensureFig(); const f = this.fig; f.group.visible = true;
    const now = performance.now(); const dt = Math.min(0.05, ((now - (this.t0 || now)) / 1000) || 0.016); this.t0 = now;
    const hs = Math.hypot(player.vel.x, player.vel.z); this.ph += dt * (hs > 0.4 ? Math.min(12, 4 + hs) : 0);
    // el cuerpo gira hacia donde camina (de perfil al ir de lado, de frente al retroceder); quieto, conserva su orientación
    if (this.by === undefined) this.by = player.yaw;
    if (hs > 0.3) { const want = Math.atan2(-player.vel.x, -player.vel.z); let d = want - this.by; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; this.by += d * Math.min(1, dt * 14); this.lean = d; }
    else this.lean = (this.lean || 0) * 0.9;
    f.group.position.set(player.pos.x, player.pos.y, player.pos.z); f.group.rotation.set(0, this.by + Math.PI, 0); f.group.rotation.z = Math.max(-0.12, Math.min(0.12, -(this.lean || 0) * 0.15)) * Math.min(1, hs / 4);
    const sw = hs > 0.4 ? Math.sin(this.ph) : 0; f.armL.rotation.x = sw * 0.55; f.armR.rotation.x = -sw * 0.55; f.group.position.y += Math.abs(sw) * 0.05;
    const save = { p: camera.position.clone(), rx: camera.rotation.x, fov: camera.fov };
    const D = 3.3, H = 1.05; const bx = Math.sin(player.yaw), bz = Math.cos(player.yaw);
    let x = player.pos.x + bx * D, z = player.pos.z + bz * D;
    const B = world.zoneIn ? world.zoneIn.b : ARENA; x = clamp(x, B.x0 + 0.3, B.x1 - 0.3); z = clamp(z, B.z0 + 0.3, B.z1 - 0.3);
    camera.position.set(x, player.pos.y + 1.68 + H, z); camera.rotation.x = Math.min(0.5, player.pitch - 0.2);
    camera.fov = save.fov + 6; camera.updateProjectionMatrix();
    // la lámpara de primera persona se esconde (su luz sigue alumbrando)
    for (const c of lamp.children) if (!c.isLight) { c.userData._v = c.visible; c.visible = false; }
    return save;
  },
  after(save) {
    if (!save) return;
    camera.position.copy(save.p); camera.rotation.x = save.rx; camera.fov = save.fov; camera.updateProjectionMatrix();
    for (const c of lamp.children) if (!c.isLight && c.userData._v !== undefined) { c.visible = c.userData._v; delete c.userData._v; }
  },
};
const MapaMundo = {
  T: {
    title: 'Mapa de este mundo', hint: 'Toca un lugar o un pensador para ir allí.', sages: 'Pensadores', places: 'Lugares', books: 'Libros', people: 'Ciudadanos', portal: 'El portal',
    go: 'Aparecer aquí', walk: 'Ir caminando', you: 'Tú', done: '✓', close: 'Cerrar', boss: 'maestro',
  },
  items() {
    const out = [];
    for (const s of sages) out.push({ k: 'sage', n: s.data.short, sub: s.boss ? this.T.boss : (s.data.epithet || ''), x: s.pos.x, z: s.pos.z, done: s.state === 'defeated', col: (typeof Escuelas !== 'undefined' && Escuelas.of(s.data.id) || {}).c || '#ffd36a', ic: (typeof Escuelas !== 'undefined' && Escuelas.of(s.data.id) || {}).i || '' });
    for (const p of world.pois || []) if (p.at) out.push({ k: 'poi', n: p.name, x: p.at[0], z: p.at[1], done: !!p.found });
    for (const b of world.books || []) if (b.at) out.push({ k: 'book', n: b.title, x: b.at[0], z: b.at[1], done: false });
    for (const c of citizens) { const P = c.pos || (c.group && c.group.position); if (P) out.push({ k: 'npc', n: c.npc.name, sub: c.npc.role || '', x: P.x, z: P.z }); }
    if (world.portal && world.portal.open) { const P = world.portal.group.position; out.push({ k: 'portal', n: this.T.portal, x: P.x, z: P.z }); }
    return out;
  },
  build() {
    if (document.getElementById('wmap')) return;
    const el = document.createElement('div'); el.id = 'wmap'; el.hidden = true;
    el.innerHTML = '<div class="wm-card"><div class="wm-top"><div><div class="eyebrow"></div><h3></h3><p></p></div><button class="ls-x" id="wm-x" aria-label="✕">✕</button></div><div class="wm-body"><canvas id="wm-cv"></canvas><div class="wm-list"></div></div></div>';
    document.body.appendChild(el); el.querySelector('#wm-x').addEventListener('click', () => this.close());
    el.querySelector('#wm-cv').addEventListener('click', (e) => this.tap(e));
  },
  open() {
    if (!world || G.state !== 'play') return; if (world.zoneIn || (world.cave && world.cave.in)) return toast('El mapa se usa en la plaza principal de cada mundo.');
    this.build(); const el = document.getElementById('wmap'); el.querySelector('.eyebrow').textContent = `${ERAS[world.idx].num} · ${ERAS[world.idx].name}`;
    el.querySelector('h3').textContent = this.T.title; el.querySelector('p').textContent = this.T.hint;
    this.list = this.items(); Panel.open('wmap'); this.draw(); this.paintList(); Audio.click && Audio.click();
  },
  close() { Panel.close('wmap'); },
  // de coordenadas del mundo a la pantalla (la entrada abajo, el portal arriba)
  geo() { const cv = document.getElementById('wm-cv'); const W = cv.width, H = cv.height, B = ARENA; const s = Math.min(W / (B.x1 - B.x0 + 4), H / (B.z1 - B.z0 + 4)); return { cv, W, H, s, X: (x) => W / 2 + x * s, Y: (z) => H / 2 + (z - (B.z0 + B.z1) / 2) * s }; },
  draw() {
    const cv = document.getElementById('wm-cv'); const r = cv.getBoundingClientRect(); const dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr);
    const { W, H, s, X, Y } = this.geo(); const c = cv.getContext('2d'); const B = ARENA; const acc = ERAS[world.idx] && world.theme && world.theme.accent ? '#' + world.theme.accent.toString(16).padStart(6, '0') : '#d6a84a';
    c.fillStyle = '#120e09'; c.fillRect(0, 0, W, H);
    c.fillStyle = 'rgba(214,168,74,0.08)'; c.strokeStyle = 'rgba(214,168,74,0.6)'; c.lineWidth = 2 * dpr; c.beginPath(); c.roundRect ? c.roundRect(X(B.x0), Y(B.z0), (B.x1 - B.x0) * s, (B.z1 - B.z0) * s, 14 * dpr) : c.rect(X(B.x0), Y(B.z0), (B.x1 - B.x0) * s, (B.z1 - B.z0) * s); c.fill(); c.stroke();
    // el camino central
    c.strokeStyle = acc; c.globalAlpha = 0.35; c.lineWidth = 10 * dpr; c.setLineDash([]); c.beginPath(); c.moveTo(X(0), Y(B.z1 - 1)); c.lineTo(X(0), Y(B.z0 + 3)); c.stroke(); c.globalAlpha = 1;
    const R = Math.max(9, 11 * dpr);
    for (const it of this.list) {
      const x = X(it.x), y = Y(it.z); c.lineWidth = 2.5 * dpr;
      if (it.k === 'sage') { c.fillStyle = it.done ? '#ffd36a' : 'rgba(20,14,8,0.9)'; c.strokeStyle = it.col; c.beginPath(); c.arc(x, y, R * 1.25, 0, Math.PI * 2); c.fill(); c.stroke(); c.fillStyle = it.done ? '#1a1006' : '#fff'; c.font = `bold ${Math.round(R * 1.1)}px Georgia`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(it.done ? '✓' : it.n[0], x, y + 1); }
      else if (it.k === 'poi') { c.fillStyle = it.done ? '#ffd36a' : '#8a6a2a'; c.beginPath(); c.moveTo(x, y - R); c.lineTo(x + R, y); c.lineTo(x, y + R); c.lineTo(x - R, y); c.closePath(); c.fill(); }
      else if (it.k === 'book') { c.font = `${Math.round(R * 1.6)}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('📖', x, y); }
      else if (it.k === 'npc') { c.fillStyle = '#9fc8e8'; c.beginPath(); c.arc(x, y, R * 0.55, 0, Math.PI * 2); c.fill(); }
      else if (it.k === 'portal') { c.strokeStyle = '#9ae8ff'; c.lineWidth = 4 * dpr; c.beginPath(); c.arc(x, y, R * 1.4, 0, Math.PI * 2); c.stroke(); }
      if (it.k === 'sage' || it.k === 'portal' || (it.k === 'poi' && W / dpr > 520)) { c.font = `${Math.round(R * 1.05)}px Georgia`; c.textAlign = it.x > 0.5 ? 'right' : 'left'; c.textBaseline = 'middle'; c.fillStyle = 'rgba(255,240,210,0.95)'; c.shadowColor = '#000'; c.shadowBlur = 4 * dpr; const lx = x + (it.x > 0.5 ? -1 : 1) * R * 1.8; const nm = it.k === 'sage' ? it.n : it.n.length > 22 ? it.n.slice(0, 21) + '…' : it.n; c.fillText(nm, lx, y); c.shadowBlur = 0; }
    }
    // tú: una flecha que apunta hacia donde miras
    const px = X(player.pos.x), py = Y(player.pos.z); c.save(); c.translate(px, py); c.rotate(-player.yaw + Math.PI); c.fillStyle = '#4ae08a'; c.strokeStyle = '#fff'; c.lineWidth = 2 * dpr;
    c.beginPath(); c.moveTo(0, R * 1.6); c.lineTo(R, -R); c.lineTo(0, -R * 0.4); c.lineTo(-R, -R); c.closePath(); c.fill(); c.stroke(); c.restore();
  },
  paintList() {
    const box = document.querySelector('#wmap .wm-list'); box.innerHTML = '';
    const groups = [['sage', this.T.sages], ['poi', this.T.places], ['book', this.T.books], ['npc', this.T.people], ['portal', '']];
    for (const [k, t] of groups) {
      const L = this.list.filter((x) => x.k === k); if (!L.length) continue;
      if (t) { const h = document.createElement('h4'); h.textContent = t; box.appendChild(h); }
      for (const it of L) {
        const row = document.createElement('div'); row.className = 'wm-row' + (it.done ? ' done' : ''); if (it.col) row.style.setProperty('--c', it.col);
        row.innerHTML = '<span class="wm-n"><b></b><small></small></span><button class="wm-go"></button><button class="wm-walk"></button>';
        row.querySelector('b').textContent = (it.done ? '✓ ' : '') + (it.ic ? it.ic + ' ' : '') + it.n; row.querySelector('small').textContent = it.sub || '';
        row.querySelector('.wm-go').textContent = this.T.go; row.querySelector('.wm-walk').textContent = this.T.walk;
        row.querySelector('.wm-go').addEventListener('click', () => this.go(it, false)); row.querySelector('.wm-walk').addEventListener('click', () => this.go(it, true));
        box.appendChild(row);
      }
    }
  },
  tap(e) {
    const { cv, X, Y } = this.geo(); const r = cv.getBoundingClientRect(); const k = cv.width / r.width; const mx = (e.clientX - r.left) * k, my = (e.clientY - r.top) * k;
    let best = null, bd = 40 * k; for (const it of this.list) { const d = Math.hypot(X(it.x) - mx, Y(it.z) - my); if (d < bd) { bd = d; best = it; } }
    if (best) this.go(best, false);
  },
  // aparecer al lado (o caminar hasta allí), mirando hacia el destino
  go(it, walk) {
    Audio.click && Audio.click(); this.close();
    const off = 2.6; let dx = Math.abs(it.x) < 1.5 ? 0 : (it.x > 0 ? -off : off), dz = Math.abs(it.x) < 1.5 ? off : 0.6;
    const tx = clamp(it.x + dx, ARENA.x0 + 1, ARENA.x1 - 1), tz = clamp(it.z + dz, ARENA.z0 + 1, ARENA.z1 - 1);
    if (walk) { setTimeout(() => { input.walk = { x: tx, z: tz, t: 40 }; input.auto = false; }, 120); return; }
    const fade = document.createElement('div'); fade.className = 'wm-fade'; document.body.appendChild(fade);
    setTimeout(() => {
      player.pos.set(tx, player.pos.y, tz); player.vel.set(0, 0, 0); player.yaw = Math.atan2(-(it.x - tx), -(it.z - tz)); player.pitch = 0;
      fade.classList.add('out'); setTimeout(() => fade.remove(), 500);
    }, 220);
  },
};
{
  Vista.init();
  // envolver el dibujo: la cámara se aleja solo mientras se dibuja el cuadro
  let busy = false;
  const wrap = (obj, name) => { const f0 = obj[name].bind(obj); obj[name] = function (...a) { if (busy) return f0(...a); busy = true; let s = null; try { s = Vista.before(); return f0(...a); } finally { Vista.after(s); busy = false; } }; };
  wrap(composer, 'render'); wrap(renderer, 'render');
  // botones grandes a la izquierda: vista y mapa
  const mk = (id, ico, label, fn) => { const b = document.createElement('button'); b.id = id; b.className = 'hud-big'; b.hidden = true; b.innerHTML = '<b></b><span></span>'; b.querySelector('b').textContent = ico; b.querySelector('span').textContent = label; b.setAttribute('aria-label', label); b.addEventListener('click', (e) => { e.stopPropagation(); fn(); }); document.body.appendChild(b); return b; };
  mk('b-mapa', '🗺️', Vista.T.map, () => MapaMundo.open());
  mk('b-vista', '🧍', Vista.T.b3, () => Vista.toggle()); Vista.paint();
  setInterval(() => { const show = G.state === 'play' && !!world; for (const id of ['b-mapa', 'b-vista']) { const b = document.getElementById(id); if (b && b.hidden === show) b.hidden = !show; } }, 300);
  window.addEventListener('keydown', (e) => { if (G.state !== 'play' || e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return; if (e.key === 'm' || e.key === 'M') MapaMundo.open(); if (e.key === 'v' || e.key === 'V') Vista.toggle(); });
  window.addEventListener('resize', () => { const el = document.getElementById('wmap'); if (el && !el.hidden) MapaMundo.draw(); });
  const st = document.createElement('style');
  st.textContent = '.hud-big{position:absolute;z-index:31;right:max(10px,var(--sar,0px));width:58px;height:58px;border-radius:16px;border:1.5px solid var(--gold,#d6a84a);background:rgba(10,8,5,.78);color:#ffe2a0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;cursor:pointer;font-family:var(--body,Georgia);box-shadow:0 4px 14px rgba(0,0,0,.5)}'
    + '.hud-big b{font-size:1.45rem;line-height:1}.hud-big span{font-size:.68rem;letter-spacing:.04em}.hud-big.on{background:rgba(60,44,12,.9)}'
    + '#b-mapa{top:calc(max(8px,var(--sat,0px)) + 120px)}#b-vista{top:calc(max(8px,var(--sat,0px)) + 186px)}'
    + 'body.touch #b-mapa{top:calc(var(--sat,0px) + 150px)}body.touch #b-vista{top:calc(var(--sat,0px) + 216px)}'
    + '#wmap{position:fixed;inset:0;z-index:66;background:rgba(6,4,2,.86);display:flex;align-items:center;justify-content:center;padding:max(10px,var(--sat,0px)) 10px max(10px,var(--sab,0px))}#wmap[hidden]{display:none}'
    + '.wm-card{width:min(980px,100%);height:min(94vh,100%);background:#1a140c;border:1.5px solid rgba(214,168,74,.6);border-radius:18px;display:flex;flex-direction:column;overflow:hidden}'
    + '.wm-top{display:flex;justify-content:space-between;align-items:flex-start;padding:12px 14px 6px;gap:10px}.wm-top h3{margin:2px 0;font-family:var(--display);font-weight:normal;color:#ffe2a0;font-size:1.3rem}.wm-top p{margin:0;color:#e8dcc0;font-size:1rem}'
    + '.wm-body{flex:1;display:flex;gap:10px;padding:0 12px 12px;min-height:0}#wm-cv{flex:1.1;min-width:0;height:100%;border-radius:12px;cursor:pointer;touch-action:manipulation}'
    + '.wm-list{flex:1;overflow-y:auto;min-width:0}.wm-list h4{margin:10px 0 4px;font-family:var(--display);font-weight:normal;color:#d6a84a;letter-spacing:.12em;font-size:.85rem;text-transform:uppercase}'
    + '.wm-row{display:flex;align-items:center;gap:6px;padding:7px 8px;border-radius:10px;margin:4px 0;background:rgba(255,255,255,.04);border-left:4px solid var(--c,rgba(214,168,74,.5))}.wm-row.done{opacity:.75}'
    + '.wm-n{flex:1;min-width:0;display:flex;flex-direction:column}.wm-n b{font-weight:normal;color:#fff;font-size:1.02rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.wm-n small{color:#c8b890;font-size:.8rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
    + '.wm-go,.wm-walk{flex:0 0 auto;border-radius:10px;padding:9px 10px;font:inherit;font-size:.86rem;cursor:pointer}.wm-go{background:linear-gradient(#ffe8b0,#d9a24a);color:#1a1006;border:0}.wm-walk{background:transparent;color:#ffe2a0;border:1px solid rgba(214,168,74,.6)}'
    + '@media (max-aspect-ratio:1/1){.wm-body{flex-direction:column}#wm-cv{flex:0 0 46%;height:auto;width:100%}.wm-list{flex:1}}'
    + '.wm-fade{position:fixed;inset:0;z-index:90;background:#000;opacity:0;animation:wmIn .2s forwards;pointer-events:none}.wm-fade.out{animation:wmOut .45s forwards}@keyframes wmIn{to{opacity:1}}@keyframes wmOut{from{opacity:1}to{opacity:0}}';
  document.head.appendChild(st);
}
if (location.hash === '#debug') { window.__vista = Vista; window.__wmap = MapaMundo; }
