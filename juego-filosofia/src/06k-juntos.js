// ============================================================================
//  EXPLORAR JUNTOS: un grupo con código en el que cada jugador ve a los demás
//  (su avatar y su apodo) cuando están en la misma época. Al encontrarse, uno
//  puede desafiar al otro a un duelo de tres preguntas. Sin chat: solo apodos,
//  posiciones y respuestas, por un canal de Supabase Realtime que no se guarda.
// ============================================================================
const MRT = Object.assign(Object.create(RT), { ws: null, hb: null, handlers: {}, joined: false, want: false, tries: 0, ref: 0, topic: '' });
const JUNTOS_KEY = 'odisea-juntos';
const JUNTOS_LOOKS = [[0x3a6ab8, 0xf0d0a0], [0xb83a4a, 0x2a1a10], [0x3a9a5a, 0x8a5a2a], [0xc8962a, 0x1a1a1a], [0x7a4ab8, 0xd8b070], [0x2a9aa8, 0x4a2a1a], [0xd86a2a, 0x2a2a2a], [0xa83a8a, 0x6a4a2a]];
const Juntos = {
  on: false, code: '', id: '', name: '', R: new Map(), sendT: 0, last: null, near: null, duel: null, inv: null,
  hash(s) { let h = 7; for (const c of s) h = (Math.imul(h, 31) + c.charCodeAt(0)) >>> 0; return h; },
  // ---------------------------------------------------------------- grupo
  start(code, name) {
    this.code = code; this.name = name; this.on = true;
    try { this.id = sessionStorage.getItem('odisea-juntos-id') || Sala.rid(8); sessionStorage.setItem('odisea-juntos-id', this.id); sessionStorage.setItem(JUNTOS_KEY, JSON.stringify({ code, name })); } catch (e) { this.id = this.id || Sala.rid(8); }
    MRT.connect('mundo-' + code, {
      pos: (d) => this.rPos(d), adios: (d) => this.drop(d.id),
      reto: (d) => this.rReto(d), acepta: (d) => this.rAcepta(d), rechaza: (d) => { if (d.to === this.id && this.duel && this.duel.wait) { this.duel = null; $('#mp-meet').hidden = true; toast(`${d.name} no quiso el duelo esta vez.`); } },
      dres: (d) => this.rRes(d),
    }, (s) => { this.paintBadge(s); if (s === 'ok') this.sendT = 0; });
    this.paintBadge('connecting');
  },
  stop() {
    if (!this.on) return; MRT.send('adios', { id: this.id }); MRT.close(); this.on = false;
    for (const id of [...this.R.keys()]) this.drop(id);
    try { sessionStorage.removeItem(JUNTOS_KEY); } catch (e) { /* nada */ }
    $('#mp-badge').hidden = true; $('#mp-meet').hidden = true; $('#mpd').hidden = true;
  },
  resume() { try { const s = JSON.parse(sessionStorage.getItem(JUNTOS_KEY) || 'null'); if (s && s.code && Sala.ok()) this.start(s.code, s.name); } catch (e) { /* nada */ } },
  paintBadge(s) {
    const b = $('#mp-badge'); b.hidden = !this.on; if (!this.on) return;
    const n = [...this.R.values()].filter((r) => r.e === G.eraIdx).length, all = this.R.size;
    b.textContent = s === 'reconnect' || s === 'connecting' ? `👥 Grupo ${this.code} · conectando…` : s === 'error' ? `👥 Grupo ${this.code} · sin conexión` : `👥 ${this.code} · ${n} aquí${all > n ? ` · ${all - n} en otras épocas` : ''}`;
  },
  // ---------------------------------------------------------------- avatares
  avatar(id, name) {
    const [robe, hair] = JUNTOS_LOOKS[this.hash(id) % JUNTOS_LOOKS.length];
    const fig = buildFigure({ robe, robe2: 0x2a2620, skin: [0xc49372, 0x8a5a3a, 0xe0b090, 0x6a4028][this.hash(id + 'p') % 4], hair, beard: false, hat: 'none', acc: 'none' }, 0xffffff);
    fig.halo.visible = false; const g = new THREE.Group(); g.add(fig.group);
    const l = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture(name, 'jugador'), transparent: true, depthWrite: false, toneMapped: false })); l.scale.set(2.2, 0.55, 1); l.position.y = 2.75; g.add(l);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.45, 0.6, 24), new THREE.MeshBasicMaterial({ color: robe, transparent: true, opacity: 0.8, side: THREE.DoubleSide, toneMapped: false })); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.04; g.add(ring);
    scene.add(g); return { g, fig };
  },
  rPos(d) {
    const id = String(d.id || ''); if (!/^[A-Za-z0-9]{6,12}$/.test(id) || id === this.id) return;
    let r = this.R.get(id); const name = Sala.clean(d.n) || 'Jugador';
    if (!r) { r = { ...this.avatar(id, name), name, x: d.x, y: d.y, z: d.z, yaw: d.r, tx: d.x, ty: d.y, tz: d.z, tyaw: d.r }; this.R.set(id, r); if (d.e === G.eraIdx) toast(`👥 ${name} está en esta época contigo.`); }
    const wasHere = r.e === G.eraIdx; r.e = d.e; r.zone = d.zn || ''; r.tx = +d.x || 0; r.ty = +d.y || 0; r.tz = +d.z || 0; r.tyaw = +d.r || 0; r.seen = performance.now(); r.st = d.s;
    if (!wasHere && r.e === G.eraIdx) { r.x = r.tx; r.y = r.ty; r.z = r.tz; }
    this.paintBadge('ok');
  },
  drop(id) { const r = this.R.get(id); if (!r) return; scene.remove(r.g); r.g.traverse((o) => { if (o.geometry) o.geometry.dispose(); }); this.R.delete(id); this.paintBadge('ok'); },
  frame(dt) {
    if (!this.on) return;
    const playing = G.state === 'play' && world && world.idx === G.eraIdx;
    // enviar mi posición (4 veces por segundo al moverme; cada 3 s si estoy quieto)
    this.sendT -= dt; const p = player.pos; const moved = !this.last || Math.hypot(p.x - this.last[0], p.z - this.last[1]) > 0.15 || Math.abs(player.yaw - this.last[2]) > 0.1;
    if (MRT.joined && this.sendT <= 0 && (moved || this.sendT < -3)) {
      MRT.send('pos', { id: this.id, n: this.name, e: G.eraIdx, x: +p.x.toFixed(2), y: +p.y.toFixed(2), z: +p.z.toFixed(2), r: +player.yaw.toFixed(2), zn: world && world.zoneIn ? world.zoneIn.id : world && world.cave && world.cave.in ? 'cueva' : '', s: playing ? 1 : 0 });
      this.sendT = 0.25; this.last = [p.x, p.z, player.yaw];
    }
    const now = performance.now(); let best = null, bd = 3.2; const myZone = world && world.zoneIn ? world.zoneIn.id : world && world.cave && world.cave.in ? 'cueva' : '';
    for (const [id, r] of this.R) {
      if (now - r.seen > 12000) { this.drop(id); continue; }
      const vis = r.e === G.eraIdx && r.zone === myZone && !!world; r.g.visible = vis; if (!vis) continue;
      const k = Math.min(1, dt * 8); const step = Math.hypot(r.tx - r.x, r.tz - r.z);
      r.x += (r.tx - r.x) * k; r.y += (r.ty - r.y) * k; r.z += (r.tz - r.z) * k;
      let dy = r.tyaw - r.yaw; while (dy > Math.PI) dy -= Math.PI * 2; while (dy < -Math.PI) dy += Math.PI * 2; r.yaw += dy * k;
      r.g.position.set(r.x, r.y, r.z); r.fig.group.rotation.y = r.yaw + Math.PI; r.ph = (r.ph || 0) + dt * (step > 0.05 ? 9 : 0);
      r.fig.group.position.y = Math.abs(Math.sin(r.ph)) * 0.06; r.fig.armL.rotation.x = Math.sin(r.ph) * 0.5; r.fig.armR.rotation.x = -Math.sin(r.ph) * 0.5;
      const dd = Math.hypot(r.x - p.x, r.z - p.z); if (playing && r.st && dd < bd) { bd = dd; best = id; }
    }
    if (best !== this.near) { this.near = best; const b = $('#mp-meet'); if (best && !this.duel) { b.hidden = false; b.textContent = `⚔ Desafiar a ${this.R.get(best).name} a un duelo`; } else if (!this.duel) b.hidden = true; }
  },
  // ---------------------------------------------------------------- duelo de 3 preguntas
  pool() {
    const out = []; for (const s of ERAS[G.eraIdx].sages) for (const q of s.q || []) if (q && q.a && q.a.length === 4) out.push({ q: q.q, a: q.a, e: q.e || '', who: s.short });
    return out;
  },
  pick(seed) { // las mismas tres preguntas para los dos, a partir de una semilla
    const P = this.pool(); const r = mulberry32(seed); const idx = P.map((_, i) => i); for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
    return idx.slice(0, 3).map((i) => { const q = P[i]; const o = q.a.map((t, k) => ({ t, ok: k === 0 })); for (let k = 3; k > 0; k--) { const j = Math.floor(r() * (k + 1)); [o[k], o[j]] = [o[j], o[k]]; } return { ...q, o }; });
  },
  challenge() {
    const id = this.near; const r = id && this.R.get(id); if (!r || this.duel) return;
    const seed = (Math.random() * 1e9) | 0; this.duel = { wait: true, foe: id, foeName: r.name, seed, e: G.eraIdx };
    MRT.send('reto', { from: this.id, name: this.name, to: id, seed, e: G.eraIdx });
    const b = $('#mp-meet'); b.textContent = `Esperando a ${r.name}…`; Audio.click();
    setTimeout(() => { if (this.duel && this.duel.wait && this.duel.seed === seed) { this.duel = null; b.hidden = true; this.near = null; toast(`${r.name} no respondió al desafío.`); } }, 15000);
  },
  rReto(d) {
    if (d.to !== this.id) return; if (this.duel || G.state !== 'play' || d.e !== G.eraIdx) { MRT.send('rechaza', { from: this.id, to: d.from, name: this.name }); return; }
    this.inv = d; $('#mp-inv-t').textContent = `${Sala.clean(d.name) || 'Alguien'} te desafía a un duelo de tres preguntas sobre esta época.`; $('#mp-inv').hidden = false; Audio.gong && Audio.gong(); buzz([20, 40, 20]);
    clearTimeout(this.invT); this.invT = setTimeout(() => this.answerInv(false), 12000);
  },
  answerInv(yes) {
    const d = this.inv; if (!d) return; this.inv = null; $('#mp-inv').hidden = true; clearTimeout(this.invT);
    if (!yes || G.state !== 'play') { MRT.send('rechaza', { from: this.id, to: d.from, name: this.name }); return; }
    MRT.send('acepta', { from: this.id, to: d.from, seed: d.seed }); this.begin(d.from, Sala.clean(d.name) || 'Rival', d.seed);
  },
  rAcepta(d) { if (d.to !== this.id || !this.duel || !this.duel.wait || d.seed !== this.duel.seed) return; this.begin(this.duel.foe, this.duel.foeName, d.seed); },
  begin(foe, foeName, seed) {
    this.duel = { foe, foeName, seed, qs: this.pick(seed), i: 0, ok: 0, ms: 0, mine: null, theirs: null };
    G.state = 'place'; unlockPointer(); input.keys = {}; input.walk = null; input.auto = false; $('#hud').hidden = true; $('#touch').hidden = true; $('#mp-meet').hidden = true;
    $('#mpd-vs').textContent = `${this.name} contra ${foeName}`; $('#mpd').hidden = false; Audio.mode = 'duel'; this.ask();
  },
  ask() {
    const D = this.duel; const q = D.qs[D.i]; D.t0 = performance.now(); D.answered = false;
    $('#mpd-n').textContent = `Pregunta ${D.i + 1} de 3 · ${q.who}`; $('#mpd-q').textContent = q.q; $('#mpd-msg').textContent = '';
    const box = $('#mpd-a'); box.innerHTML = '';
    q.o.forEach((o, k) => { const b = document.createElement('button'); b.className = 'sl-pa'; b.style.setProperty('--c', SALA_COLORS[k]); b.innerHTML = `<b>${'ABCD'[k]}</b><span></span>`; b.querySelector('span').textContent = o.t; b.addEventListener('click', () => this.answer(k)); box.appendChild(b); });
    clearInterval(D.timer); D.timer = setInterval(() => { const l = 15 - (performance.now() - D.t0) / 1000; $('#mpd-bar').style.transform = `scaleX(${Math.max(0, l / 15)})`; if (l <= 0) this.answer(-1); }, 100);
  },
  answer(k) {
    const D = this.duel; if (!D || D.answered) return; D.answered = true; clearInterval(D.timer);
    const q = D.qs[D.i]; const ok = k >= 0 && q.o[k].ok; D.ms += Math.min(15000, performance.now() - D.t0); if (ok) D.ok++;
    [...$('#mpd-a').children].forEach((b, j) => b.classList.add(q.o[j].ok ? 'pick' : 'dim'));
    $('#mpd-msg').textContent = ok ? '✓ ¡Correcto!' : k < 0 ? '⏱ Se acabó el tiempo' : '✗ No era esa'; if (ok) Audio.correct(); else Audio.wrong();
    setTimeout(() => { if (!this.duel) return; if (++D.i < 3) this.ask(); else { D.mine = [D.ok, Math.round(D.ms)]; MRT.send('dres', { from: this.id, to: D.foe, seed: D.seed, ok: D.ok, ms: D.mine[1] }); this.result(); } }, 1300);
  },
  rRes(d) { const D = this.duel; if (!D || d.to !== this.id || d.seed !== D.seed) return; D.theirs = [d.ok | 0, d.ms | 0]; this.result(); },
  result() {
    const D = this.duel; if (!D.mine) return;
    if (!D.theirs) { $('#mpd-q').textContent = `Acertaste ${D.mine[0]} de 3. Esperando a ${D.foeName}…`; $('#mpd-a').innerHTML = ''; $('#mpd-n').textContent = ''; $('#mpd-msg').textContent = '';
      clearTimeout(D.wt); D.wt = setTimeout(() => { if (this.duel === D && !D.theirs) { D.theirs = [-1, 0]; this.result(); } }, 40000); return; }
    clearTimeout(D.wt); const [a, at] = D.mine, [b, bt] = D.theirs;
    const win = b < 0 || a > b || (a === b && at < bt), tie = b >= 0 && a === b && at === bt;
    $('#mpd-n').textContent = 'Resultado';
    $('#mpd-q').textContent = b < 0 ? `${D.foeName} se fue del duelo. ¡Ganas tú!` : tie ? `¡Empate! Los dos acertaron ${a} de 3.` : win ? `¡Ganaste! Tú: ${a} de 3 · ${D.foeName}: ${b} de 3${a === b ? ' (fuiste más rápido)' : ''}.` : `Ganó ${D.foeName}: ${b} de 3 contra tus ${a} de 3${a === b ? ' (fue más rápido)' : ''}. ¡La próxima!`;
    $('#mpd-a').innerHTML = ''; const pts = win && !tie ? 300 : tie ? 100 : 50; addScore(pts); popup(`+${pts}<small>duelo en grupo</small>`, 'up');
    if (win && !tie) { achieve('juntos'); Audio.victory && Audio.victory(); }
    const c = document.createElement('button'); c.className = 'btn primary'; c.textContent = 'Seguir explorando'; c.addEventListener('click', () => this.close()); $('#mpd-a').appendChild(c);
  },
  close() {
    const D = this.duel; if (D) clearInterval(D.timer); this.duel = null; $('#mpd').hidden = true; this.near = null; Audio.mode = 'calm';
    if (G.state === 'place') { G.state = 'play'; $('#hud').hidden = false; if (IS_TOUCH) $('#touch').hidden = false; lockPointer(); updateHud(); }
  },
  // ---------------------------------------------------------------- desde la pantalla «En vivo»
  create() { const name = Sala.clean($('#sl-name').value); if (!name) return toast('Escribe tu apodo (2 a 16 letras).'); this.enter(Sala.rid(4), name, true); },
  join() {
    const code = ($('#sl-code').value || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4); const name = Sala.clean($('#sl-name').value);
    if (code.length !== 4) return toast('El código del grupo tiene 4 letras o números.'); if (!name) return toast('Escribe tu apodo (2 a 16 letras).');
    this.enter(code, name, false);
  },
  enter(code, name, made) {
    this.stop(); this.start(code, name);
    $('#sl-jcode').textContent = code; $('#sl-jmsg').textContent = made ? 'Comparte este código con tus amigos. Cuando estén en la misma época que tú, verán sus avatares y podrán desafiarse a duelos.' : `Estás en el grupo ${code}. Ve a cualquier época: si alguien del grupo está ahí, lo verás.`;
    Sala.setView('jready');
  },
};
// el bucle propio de los avatares remotos (independiente del juego)
{ let t0 = performance.now(); const loop = () => { const t = performance.now(); const dt = Math.min(0.1, (t - t0) / 1000); t0 = t; try { Juntos.frame(dt); } catch (e) { console.warn(e); } requestAnimationFrame(loop); }; requestAnimationFrame(loop); }
on('#mp-meet', () => Juntos.challenge());
on('#mp-yes', () => Juntos.answerInv(true));
on('#mp-no', () => Juntos.answerInv(false));
on('#mp-badge', () => { if (confirm(`¿Salir del grupo ${Juntos.code}?`)) { Juntos.stop(); toast('Saliste del grupo.'); } });
on('#sl-jnew', () => Juntos.create());
on('#sl-jjoin', () => Juntos.join());
on('#sl-jgo', () => openTravel('title'));
window.addEventListener('pagehide', () => { if (Juntos.on) MRT.send('adios', { id: Juntos.id }); });
setTimeout(() => Juntos.resume(), 1500);
