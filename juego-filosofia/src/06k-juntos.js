// ============================================================================
//  MUNDO ABIERTO (como un mundo compartido): al entrar en una época, cada
//  jugador aparece en el mundo público de esa época y ve a los demás que estén
//  ahí, con su avatar y su apodo. Pueden saludarse con gestos (sin chat) y, al
//  encontrarse, retarse a un duelo de preguntas o a un debate filosófico.
//  También hay grupos privados con código (para una clase o un grupo de amigos).
//  Los mensajes viajan por Supabase Realtime y no se guardan.
// ============================================================================
const MRT = Object.assign(Object.create(RT), { ws: null, hb: null, handlers: {}, joined: false, want: false, tries: 0, ref: 0, topic: '' });
const JUNTOS_KEY = 'odisea-juntos', AVATAR_KEY = 'odisea-razon.avatar';
const AV_ROBES = [0x3a6ab8, 0xb83a4a, 0x3a9a5a, 0xc8962a, 0x7a4ab8, 0x2a9aa8, 0xd86a2a, 0xa83a8a, 0xe8e0d0, 0x2a2a2a, 0xf0c848, 0x8a1a2a];
const AV_SKINS = [0xf0d0b0, 0xe0b090, 0xc49372, 0xa0704a, 0x8a5a3a, 0x5a3820];
const AV_HAIRS = [0x1a1410, 0x4a2a1a, 0x8a5a2a, 0xd8b070, 0xb83a2a, 0xe8e8e8, 0x3a5ab8];
// [forma, nombre, logro que lo desbloquea]
const AV_HATS = [['none', 'Sin nada'], ['longhair', 'Pelo largo'], ['braids', 'Trenzas'], ['cap', 'Gorro'], ['turban', 'Turbante', 'explorador'], ['laurel', 'Laurel', 'tabano'], ['hood', 'Capucha', 'salida'], ['beret', 'Boina', 'dialogo'], ['wig', 'Peluca', 'cogito'], ['mitre', 'Mitra', 'lector']];
const AV_ROBE_LOCK = { 10: 'agora', 11: 'juntos' }; // túnicas especiales
const EMOTES = ['👋', '👍', '❓', '💡', '😂', '👏'];
const MUTE_KEY = 'odisea-razon.silenciados';
const Juntos = {
  on: false, mode: '', code: '', chan: '', id: '', name: '', R: new Map(), sendT: 0, last: null, near: null, duel: null, inv: null, emoT: 0, wantT: 0,
  hash(s) { let h = 7; for (const c of s) h = (Math.imul(h, 31) + c.charCodeAt(0)) >>> 0; return h; },
  myId() { if (!this.id) { try { this.id = localStorage.getItem('odisea-juntos-id') || Sala.rid(8); localStorage.setItem('odisea-juntos-id', this.id); } catch (e) { this.id = Sala.rid(8); } } return this.id; },
  look() { const d = { r: this.hash(this.myId()) % AV_ROBES.length, s: 2, h: 0, t: 0, n: '' }; try { return { ...d, ...(JSON.parse(localStorage.getItem(AVATAR_KEY) || 'null') || {}) }; } catch (e) { return d; } },
  myName() { const l = this.look(); return Sala.clean(l.n) || Sala.clean((typeof Fame !== 'undefined' && Fame.alias()) || '') || 'Viajero ' + (this.hash(this.myId()) % 9000 + 1000); },
  lookStr(l = this.look()) { return [l.r, l.s, l.h, l.t].join(','); },
  publicOn() { return Sala.ok() && G.settings.mundo === true; },
  // silenciar: no vuelves a ver ni recibir nada de ese viajero en este aparato
  muted() { if (!this._mu) { try { this._mu = new Set(JSON.parse(localStorage.getItem(MUTE_KEY) || '[]')); } catch (e) { this._mu = new Set(); } } return this._mu; },
  mute(id) { const m = this.muted(); m.add(id); try { localStorage.setItem(MUTE_KEY, JSON.stringify([...m].slice(-200))); } catch (e) { /* nada */ } const r = this.R.get(id); this.drop(id); this.near = null; this.paintMeet(); toast(`🔇 Silenciaste a ${r ? r.name : 'ese viajero'}: ya no lo verás ni recibirás sus gestos o retos.`); },
  unmuteAll() { this._mu = new Set(); try { localStorage.removeItem(MUTE_KEY); } catch (e) { /* nada */ } this.paintAvatar(); toast('Ya no tienes viajeros silenciados.'); },
  // la primera vez se pregunta antes de entrar al mundo público
  askMundo() {
    if (this.inv || this.asked) return; this.asked = true; this.inv = { ask: true };
    $('#mp-inv-t').textContent = '🌍 ¿Quieres entrar al mundo abierto? Verás a otros viajeros que estén en esta época (solo su apodo y su avatar) y ellos te verán a ti. Podrán saludarse con gestos y retarse a duelos o debates. No hay chat. Puedes cambiarlo cuando quieras en Ajustes.';
    $('#mp-yes').textContent = 'Sí, entrar'; $('#mp-no').textContent = 'Ahora no'; $('#mp-inv').hidden = false;
  },
  // ---------------------------------------------------------------- conexión: grupo privado o mundo público de la época
  connect(chan) {
    for (const id of [...this.R.keys()]) this.drop(id);
    this.chan = chan; this.on = true; this.name = this.myName();
    MRT.connect(chan, {
      pos: (d) => this.rPos(d), adios: (d) => this.drop(d.id), emo: (d) => this.rEmo(d),
      reto: (d) => this.rReto(d), acepta: (d) => this.rAcepta(d), rechaza: (d) => { if (d.to === this.id && this.duel && this.duel.wait) { this.duel = null; this.paintMeet(); toast(`${d.name} no quiso esta vez.`); } },
      dres: (d) => this.rRes(d), lec: (d) => { if (typeof Escucha !== 'undefined') Escucha.rLec(d); },
    }, (s) => { this.net = s; this.paintBadge(); if (s === 'ok') this.sendT = 0; });
    this.net = 'connecting'; this.paintBadge();
  },
  start(code) { this.mode = 'grupo'; this.code = code; try { sessionStorage.setItem(JUNTOS_KEY, JSON.stringify({ code })); } catch (e) { /* nada */ } this.connect('mundo-' + code); },
  stop(keepPublic) {
    if (this.on) { MRT.send('adios', { id: this.id }); MRT.close(); }
    for (const id of [...this.R.keys()]) this.drop(id);
    this.on = false; this.chan = '';
    if (!keepPublic) { this.mode = ''; this.code = ''; try { sessionStorage.removeItem(JUNTOS_KEY); } catch (e) { /* nada */ } }
    $('#mp-badge').hidden = true; $('#mp-meet').hidden = true; $('#mpd').hidden = true; $('#mp-emo').hidden = true; $('#mp-emobar').hidden = true;
  },
  resume() { try { const s = JSON.parse(sessionStorage.getItem(JUNTOS_KEY) || 'null'); if (s && s.code && Sala.ok()) this.start(s.code); } catch (e) { /* nada */ } },
  // el mundo público sigue a la época en que estás (y se apaga en los menús)
  autoPublic(dt) {
    if (this.mode === 'grupo') return;
    const inEra = !!world && world.idx === G.eraIdx && ['play', 'talk', 'place', 'lesson', 'duel', 'victory', 'concept', 'paused'].includes(G.state);
    if (inEra && G.state === 'play' && G.settings.mundo === undefined && Sala.ok()) this.askMundo();
    const want = this.publicOn() && inEra ? 'mundo-pub-' + ERAS[G.eraIdx].id : '';
    if (want === this.chan) { this.wantT = 0; return; }
    this.wantT += dt; if (this.wantT < (want ? 1 : 6)) return; this.wantT = 0;
    if (!want) { this.stop(); return; }
    this.mode = 'publico'; this.connect(want);
    if (!this.welcomed) { this.welcomed = true; setTimeout(() => toast('🌍 Estás en el mundo abierto: verás a otros viajeros de esta época. Puedes cambiar tu avatar en «En vivo» o desactivarlo en Ajustes.'), 1500); }
  },
  paintBadge() {
    const b = $('#mp-badge'); b.hidden = !this.on; if (!this.on) return;
    const n = [...this.R.values()].filter((r) => r.e === G.eraIdx).length;
    const tag = this.mode === 'grupo' ? `👥 Grupo ${this.code}` : '🌍 Mundo abierto';
    b.textContent = this.net === 'reconnect' || this.net === 'connecting' ? `${tag} · conectando…` : this.net === 'error' ? `${tag} · sin conexión` : `${tag} · ${n} ${n === 1 ? 'viajero' : 'viajeros'} aquí`;
    $('#mp-emo').hidden = !(G.state === 'play');
  },
  // ---------------------------------------------------------------- avatares
  avatar(id, name, ls) {
    const [r, s, h, t] = String(ls || '').split(',').map((x) => x | 0);
    const robe = AV_ROBES[r % AV_ROBES.length] ?? AV_ROBES[0], hat = (AV_HATS[t] || AV_HATS[0])[0];
    const fig = buildFigure({ robe, robe2: 0x2a2620, skin: AV_SKINS[s] ?? AV_SKINS[2], hair: AV_HAIRS[h] ?? AV_HAIRS[0], beard: false, hat, acc: 'none' }, 0xffffff);
    fig.halo.visible = false; const g = new THREE.Group(); g.add(fig.group);
    const l = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture(name, this.mode === 'grupo' ? 'de tu grupo' : 'viajero'), transparent: true, depthWrite: false, toneMapped: false })); l.scale.set(2.2, 0.55, 1); l.position.y = 2.75; g.add(l);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.45, 0.6, 24), new THREE.MeshBasicMaterial({ color: robe, transparent: true, opacity: 0.8, side: THREE.DoubleSide, toneMapped: false })); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.04; g.add(ring);
    scene.add(g); return { g, fig };
  },
  rPos(d) {
    const id = String(d.id || ''); if (!/^[A-Za-z0-9]{6,12}$/.test(id) || id === this.id || this.muted().has(id)) return;
    let r = this.R.get(id); const name = Sala.clean(d.n) || 'Viajero'; const ls = String(d.l || '0,2,0,0').slice(0, 16);
    if (r && (r.ls !== ls || r.name !== name)) { this.drop(id); r = null; }
    if (!r) { if (this.R.size >= 60) return; r = { ...this.avatar(id, name, ls), name, ls, x: d.x, y: d.y, z: d.z, yaw: d.r, tx: d.x, ty: d.y, tz: d.z, tyaw: d.r }; this.R.set(id, r); if (d.e === G.eraIdx && G.state === 'play') toast(`👋 ${name} ha llegado a esta época.`); }
    const wasHere = r.e === G.eraIdx; r.e = d.e; r.v = d.v > 0 ? 1 : d.v < 0 ? -1 : 0; r.lec = /^[a-z0-9_-]{2,24}$/.test(String(d.ls || '')) ? d.ls : ''; r.zone = d.zn || ''; r.tx = +d.x || 0; r.ty = +d.y || 0; r.tz = +d.z || 0; r.tyaw = +d.r || 0; r.seen = performance.now(); r.st = d.s;
    if (!wasHere && r.e === G.eraIdx) { r.x = r.tx; r.y = r.ty; r.z = r.tz; }
    this.paintBadge();
  },
  drop(id) { const r = this.R.get(id); if (!r) return; scene.remove(r.g); r.g.traverse((o) => { if (o.geometry) o.geometry.dispose(); }); this.R.delete(id); this.paintBadge(); },
  // ---------------------------------------------------------------- gestos (sin texto libre)
  emote(k) {
    if (!this.on || performance.now() - this.emoT < 1500) return; this.emoT = performance.now();
    MRT.send('emo', { id: this.id, k }); $('#mp-emobar').hidden = true; popup(EMOTES[k], 'up'); Audio.click();
  },
  rEmo(d) {
    const r = this.R.get(String(d.id || '')); const k = d.k | 0; if (!r || k < 0 || k >= EMOTES.length) return;
    if (r.bub) r.g.remove(r.bub);
    const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d');
    x.fillStyle = 'rgba(255,250,235,0.95)'; x.beginPath(); x.arc(64, 58, 50, 0, Math.PI * 2); x.fill(); x.beginPath(); x.moveTo(52, 100); x.lineTo(64, 124); x.lineTo(76, 100); x.fill();
    x.font = '64px serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(EMOTES[k], 64, 62);
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false, toneMapped: false })); sp.scale.set(0.9, 0.9, 1); sp.position.y = 3.5; r.g.add(sp); r.bub = sp; r.bubT = 3;
  },
  frame(dt) {
    this.autoPublic(dt);
    if (!this.on) return;
    const playing = G.state === 'play' && world && world.idx === G.eraIdx;
    // mi posición: 3 veces por segundo al moverme, cada 4 s si estoy quieto
    this.sendT -= dt; const p = player.pos; const moved = !this.last || Math.hypot(p.x - this.last[0], p.z - this.last[1]) > 0.15 || Math.abs(player.yaw - this.last[2]) > 0.12;
    if (MRT.joined && this.sendT <= 0 && (moved || this.sendT < -4)) {
      this.name = this.myName();
      MRT.send('pos', { id: this.myId(), n: this.name, l: this.lookStr(), e: G.eraIdx, x: +p.x.toFixed(2), y: +p.y.toFixed(2), z: +p.z.toFixed(2), r: +player.yaw.toFixed(2), zn: world && world.zoneIn ? world.zoneIn.id : world && world.cave && world.cave.in ? 'cueva' : '', s: playing ? 1 : 0, v: typeof Agora !== 'undefined' ? Agora.mine(G.eraIdx) : 0, ls: typeof Escucha !== 'undefined' ? Escucha.mine() : '' });
      this.sendT = 0.33; this.last = [p.x, p.z, player.yaw];
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
      if (r.bub) { r.bubT -= dt; r.bub.position.y = 3.5 + Math.sin(now / 200) * 0.05; if (r.bubT <= 0) { r.g.remove(r.bub); r.bub = null; } }
      const dd = Math.hypot(r.x - p.x, r.z - p.z); if (playing && r.st && dd < bd) { bd = dd; best = id; }
    }
    if (best !== this.near) { this.near = best; this.paintMeet(); }
    const emo = $('#mp-emo'); if (emo.hidden === playing) emo.hidden = !playing;
  },
  paintMeet() {
    const b = $('#mp-meet'); const r = this.near && this.R.get(this.near);
    if (this.duel && this.duel.wait) return;
    b.hidden = !(r && !this.duel); if (r) $('#mp-meet-t').textContent = `Te encuentras con ${r.name}:`;
  },
  // ---------------------------------------------------------------- retos al encontrarse: duelo de preguntas o debate
  pool() { const out = []; for (const s of ERAS[G.eraIdx].sages) for (const q of s.q || []) if (q && q.a && q.a.length === 4) out.push({ q: q.q, a: q.a, e: q.e || '', who: s.short }); return out; },
  pick(seed) {
    const P = this.pool(); const r = mulberry32(seed); const idx = P.map((_, i) => i); for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
    return idx.slice(0, 3).map((i) => { const q = P[i]; const o = q.a.map((t, k) => ({ t, ok: k === 0 })); for (let k = 3; k > 0; k--) { const j = Math.floor(r() * (k + 1)); [o[k], o[j]] = [o[j], o[k]]; } return { ...q, o }; });
  },
  thesis(seed) { // un diálogo socrático de un pensador de esta época (o de cualquiera, si la época no tiene)
    const here = ERAS[G.eraIdx].sages.filter((s) => DIALOGOS[s.id]); const all = ERAS.flatMap((e) => e.sages).filter((s) => DIALOGOS[s.id]);
    const list = here.length ? here : all; const s = list[seed % list.length]; return { s, D: DIALOGOS[s.id] };
  },
  challenge(kind) {
    const id = this.near; const r = id && this.R.get(id); if (!r || this.duel) return;
    const seed = (Math.random() * 1e9) | 0; this.duel = { wait: true, kind, foe: id, foeName: r.name, seed, e: G.eraIdx };
    MRT.send('reto', { from: this.id, name: this.name, to: id, seed, e: G.eraIdx, kind });
    $('#mp-meet-t').textContent = `Esperando a ${r.name}…`; Audio.click();
    setTimeout(() => { if (this.duel && this.duel.wait && this.duel.seed === seed) { this.duel = null; this.near = null; this.paintMeet(); toast(`${r.name} no respondió.`); } }, 15000);
  },
  rReto(d) {
    if (d.to !== this.id) return;
    const from = String(d.from || ''); const now = performance.now(); const log = (this.retoLog = this.retoLog || new Map()); const t = (log.get(from) || []).filter((x) => now - x < 120000); t.push(now); log.set(from, t);
    if (this.muted().has(from) || t.length > 3) { MRT.send('rechaza', { from: this.id, to: d.from, name: this.name }); return; } // silenciado o demasiado insistente if (this.duel || this.inv || G.state !== 'play' || d.e !== G.eraIdx) { MRT.send('rechaza', { from: this.id, to: d.from, name: this.name }); return; }
    this.inv = d; const who = Sala.clean(d.name) || 'Alguien';
    $('#mp-inv-t').textContent = d.kind === 'd' ? `${who} te invita a un debate filosófico: los dos tomarán postura sobre una tesis y darán su mejor razón.` : `${who} te desafía a un duelo de tres preguntas sobre esta época.`;
    $('#mp-inv').hidden = false; Audio.gong && Audio.gong(); buzz([20, 40, 20]);
    clearTimeout(this.invT); this.invT = setTimeout(() => this.answerInv(false), 15000);
  },
  answerInv(yes) {
    const d = this.inv; if (!d) return; this.inv = null; $('#mp-inv').hidden = true; clearTimeout(this.invT);
    if (d.ask) { $('#mp-yes').textContent = '¡Acepto!'; $('#mp-no').textContent = 'Ahora no'; G.settings.mundo = !!yes; saveSettings(); syncSettings(); this.welcomed = !yes; if (!yes) toast('Puedes entrar al mundo abierto cuando quieras desde Ajustes.'); return; }
    if (!yes || G.state !== 'play') { MRT.send('rechaza', { from: this.id, to: d.from, name: this.name }); return; }
    MRT.send('acepta', { from: this.id, to: d.from, seed: d.seed }); this.begin(d.from, Sala.clean(d.name) || 'Rival', d.seed, d.kind === 'd' ? 'd' : 'q');
  },
  rAcepta(d) { if (d.to !== this.id || !this.duel || !this.duel.wait || d.seed !== this.duel.seed) return; this.begin(this.duel.foe, this.duel.foeName, d.seed, this.duel.kind); },
  begin(foe, foeName, seed, kind) {
    this.duel = { kind, foe, foeName, seed, i: 0, ok: 0, ms: 0, mine: null, theirs: null };
    G.state = 'place'; unlockPointer(); input.keys = {}; input.walk = null; input.auto = false; $('#hud').hidden = true; $('#touch').hidden = true; $('#mp-meet').hidden = true; $('#mp-emobar').hidden = true;
    $('#mpd-vs').textContent = `${this.name} y ${foeName}`; $('#mpd').hidden = false; Audio.mode = 'duel';
    if (kind === 'd') { const t = this.thesis(seed); Object.assign(this.duel, t, { pts: 0 }); this.dStep(); } else { this.duel.qs = this.pick(seed); this.ask(); }
  },
  timer(sec, onEnd) { const D = this.duel; D.t0 = performance.now(); clearInterval(D.timer); D.timer = setInterval(() => { const l = sec - (performance.now() - D.t0) / 1000; $('#mpd-bar').style.transform = `scaleX(${Math.max(0, l / sec)})`; if (l <= 0) { clearInterval(D.timer); onEnd(); } }, 100); },
  buttons(list, fn) {
    const box = $('#mpd-a'); box.innerHTML = '';
    list.forEach((t, k) => { const b = document.createElement('button'); b.className = 'sl-pa'; b.style.setProperty('--c', SALA_COLORS[k % 4]); b.innerHTML = `<b>${'ABCD'[k]}</b><span></span>`; b.querySelector('span').textContent = t; b.addEventListener('click', () => fn(k)); box.appendChild(b); });
  },
  // -------- duelo de preguntas
  ask() {
    const D = this.duel; const q = D.qs[D.i]; D.answered = false;
    $('#mpd-n').textContent = `Pregunta ${D.i + 1} de 3 · ${q.who}`; $('#mpd-q').textContent = q.q; $('#mpd-msg').textContent = '';
    this.buttons(q.o.map((o) => o.t), (k) => this.answer(k)); this.timer(15, () => this.answer(-1));
  },
  answer(k) {
    const D = this.duel; if (!D || D.answered) return; D.answered = true; clearInterval(D.timer);
    const q = D.qs[D.i]; const ok = k >= 0 && q.o[k].ok; D.ms += Math.min(15000, performance.now() - D.t0); if (ok) D.ok++;
    [...$('#mpd-a').children].forEach((b, j) => b.classList.add(q.o[j].ok ? 'pick' : 'dim'));
    $('#mpd-msg').textContent = ok ? '✓ ¡Correcto!' : k < 0 ? '⏱ Se acabó el tiempo' : '✗ No era esa'; if (ok) Audio.correct(); else Audio.wrong();
    setTimeout(() => { if (!this.duel) return; if (++D.i < 3) this.ask(); else this.finish({ ok: D.ok }); }, 1300);
  },
  // -------- debate filosófico: postura, razón y respuesta a la objeción, con la misma tesis para los dos
  dStep() {
    const D = this.duel; D.answered = false; $('#mpd-msg').textContent = '';
    const P = (D.D.posturas || [])[D.post];
    if (D.i === 0) { $('#mpd-n').textContent = `Tesis de ${D.s.short}`; $('#mpd-q').textContent = `«${D.D.tesis}» ¿Qué piensas tú?`; this.buttons(D.D.posturas.map((p) => p.t), (k) => this.dPick(k)); }
    else if (D.i === 1) { D.rz = shuffle(P.razones.slice()); $('#mpd-n').textContent = 'Tu mejor razón'; $('#mpd-q').textContent = `Tu postura: ${P.t} ¿Por qué?`; this.buttons(D.rz.map((r) => r.t), (k) => this.dPick(k)); }
    else { D.rs = shuffle(P.respuestas.slice()); $('#mpd-n').textContent = `${D.s.short} te objeta`; $('#mpd-q').textContent = P.objecion; this.buttons(D.rs.map((r) => r.t), (k) => this.dPick(k)); }
    this.timer(40, () => this.dPick(-1));
  },
  dPick(k) {
    const D = this.duel; if (!D || D.answered) return; D.answered = true; clearInterval(D.timer); D.ms += Math.min(40000, performance.now() - D.t0);
    const val = (r) => (r.k === 'b' ? 2 : r.k === 'f' ? -1 : 0);
    if (D.i === 0) { D.post = k < 0 ? 0 : k; }
    else if (D.i === 1) { D.raz = k < 0 ? null : D.rz[k]; if (D.raz) D.pts += val(D.raz); }
    else { D.resp = k < 0 ? null : D.rs[k]; if (D.resp) D.pts += val(D.resp); }
    Audio.click();
    if (++D.i < 3) this.dStep();
    else { const P = D.D.posturas[D.post]; this.finish({ ok: D.pts, post: P.t, raz: D.raz ? D.raz.t : '', rk: D.raz ? D.raz.k : '', rf: (D.raz && D.raz.f) || '', resp: D.resp ? D.resp.t : '', xk: D.resp ? D.resp.k : '', xf: (D.resp && D.resp.f) || '' }); }
  },
  finish(res) {
    const D = this.duel; D.mine = { ...res, ms: Math.round(D.ms) };
    MRT.send('dres', { from: this.id, to: D.foe, seed: D.seed, ...D.mine }); this.result();
  },
  rRes(d) { const D = this.duel; if (!D || d.to !== this.id || d.seed !== D.seed) return; D.theirs = { ok: d.ok | 0, ms: d.ms | 0, post: String(d.post || '').slice(0, 300), raz: String(d.raz || '').slice(0, 400), rk: String(d.rk || ''), rf: String(d.rf || '').slice(0, 60), resp: String(d.resp || '').slice(0, 400), xk: String(d.xk || ''), xf: String(d.xf || '').slice(0, 60) }; this.result(); },
  result() {
    const D = this.duel; if (!D.mine) return;
    if (!D.theirs) { $('#mpd-q').textContent = `Listo. Esperando a ${D.foeName}…`; $('#mpd-a').innerHTML = ''; $('#mpd-n').textContent = ''; $('#mpd-msg').textContent = '';
      clearTimeout(D.wt); D.wt = setTimeout(() => { if (this.duel === D && !D.theirs) { D.theirs = { ok: -9, ms: 0 }; this.result(); } }, 60000); return; }
    clearTimeout(D.wt); const a = D.mine, b = D.theirs; const gone = b.ok === -9;
    const win = gone || a.ok > b.ok || (a.ok === b.ok && a.ms < b.ms), tie = !gone && a.ok === b.ok && a.ms === b.ms;
    $('#mpd-n').textContent = 'Resultado'; const box = $('#mpd-a'); box.innerHTML = '';
    if (D.kind === 'd') {
      $('#mpd-q').textContent = gone ? `${D.foeName} se fue del debate. ¡Ganas tú!` : a.ok === b.ok ? '¡Empate en la calidad de las razones!' : win ? '¡Razonaste mejor en este debate!' : `${D.foeName} razonó mejor esta vez. ¡Mira sus razones!`;
      const tag = (k, f) => (k === 'b' ? '✓ buena' : k === 'f' ? `✗ falacia${f ? ': ' + f : ''}` : k === 'd' ? '· débil' : '· sin responder');
      for (const [who, x] of [['Tú', a], [D.foeName, b]]) { if (x.ok === -9) continue; const c = document.createElement('div'); c.className = 'mpd-card';
        c.innerHTML = '<b></b><p class="p"></p><p></p><p></p>'; c.querySelector('b').textContent = who; c.querySelector('.p').textContent = x.post || '';
        c.children[2].textContent = `Razón (${tag(x.rk, x.rf)}): ${x.raz || '—'}`; c.children[3].textContent = `Respuesta a la objeción (${tag(x.xk, x.xf)}): ${x.resp || '—'}`; box.appendChild(c); }
    } else {
      $('#mpd-q').textContent = gone ? `${D.foeName} se fue del duelo. ¡Ganas tú!` : tie ? `¡Empate! Los dos acertaron ${a.ok} de 3.` : win ? `¡Ganaste! Tú: ${a.ok} de 3 · ${D.foeName}: ${b.ok} de 3${a.ok === b.ok ? ' (fuiste más rápido)' : ''}.` : `Ganó ${D.foeName}: ${b.ok} de 3 contra tus ${a.ok} de 3${a.ok === b.ok ? ' (fue más rápido)' : ''}. ¡La próxima!`;
    }
    const pts = win && !tie ? 300 : tie ? 150 : 60; addScore(pts); popup(`+${pts}<small>${D.kind === 'd' ? 'debate' : 'duelo'} con otro viajero</small>`, 'up');
    if (win && !tie) { achieve('juntos'); Audio.victory && Audio.victory(); }
    const c = document.createElement('button'); c.className = 'btn primary'; c.textContent = 'Seguir explorando'; c.addEventListener('click', () => this.close()); box.appendChild(c);
  },
  close() {
    const D = this.duel; if (D) clearInterval(D.timer); this.duel = null; $('#mpd').hidden = true; this.near = null; Audio.mode = 'calm';
    if (G.state === 'place') { G.state = 'play'; $('#hud').hidden = false; if (IS_TOUCH) $('#touch').hidden = false; lockPointer(); updateHud(); }
  },
  // ---------------------------------------------------------------- mi avatar
  paintAvatar() {
    const l = this.look(); const box = $('#av-opts'); if (!box) return; box.innerHTML = ''; const got = new Set(store.get(ACH_KEY, []));
    const row = (label, list, key, render) => { const r = document.createElement('div'); r.className = 'av-row'; const t = document.createElement('span'); t.textContent = label; r.appendChild(t);
      list.forEach((v, i) => { const need = key === 't' ? v[2] : key === 'r' ? AV_ROBE_LOCK[i] : null; const locked = need && !got.has(need); const b = document.createElement('button'); b.className = 'av-chip' + (l[key] === i ? ' on' : '') + (locked ? ' lock' : ''); render(b, v); if (locked) { b.textContent = (key === 't' ? v[1] + ' ' : '') + '🔒'; b.setAttribute('aria-label', 'Bloqueado'); }
        b.addEventListener('click', () => { if (locked) { const a = ACH.find((x) => x.id === need); return toast(`🔒 Se desbloquea con el logro «${a ? a.n : need}»: ${a ? a.d : ''}`); } const n = this.look(); n[key] = i; this.saveLook(n); }); r.appendChild(b); }); box.appendChild(r); };
    const sw = (b, v) => { b.style.background = '#' + v.toString(16).padStart(6, '0'); };
    row('Túnica', AV_ROBES, 'r', sw); row('Piel', AV_SKINS, 's', sw); row('Pelo', AV_HAIRS, 'h', sw); row('Cabeza', AV_HATS, 't', (b, v) => { b.textContent = v[1]; b.classList.add('txt'); });
    $('#av-name').value = l.n || ''; $('#av-name').placeholder = this.myName();
    $('#sl-mundo').textContent = G.settings.mundo === true ? 'Mundo abierto: activado (toca para desactivar)' : 'Mundo abierto: desactivado (toca para activar)';
    const n = this.muted().size; $('#av-unmute').hidden = !n; $('#av-unmute').textContent = `Quitar el silencio a ${n} ${n === 1 ? 'viajero' : 'viajeros'}`;
  },
  saveLook(n) { try { localStorage.setItem(AVATAR_KEY, JSON.stringify(n)); } catch (e) { /* nada */ } this.last = null; this.sendT = 0; this.paintAvatar(); Audio.click(); },
  // ---------------------------------------------------------------- grupos privados desde la pantalla «En vivo»
  create() { const name = Sala.clean($('#sl-name').value); if (name) this.saveLook({ ...this.look(), n: name }); this.enter(Sala.rid(4), true); },
  join() {
    const code = ($('#sl-code').value || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4); const name = Sala.clean($('#sl-name').value);
    if (code.length !== 4) return toast('El código del grupo tiene 4 letras o números.'); if (name) this.saveLook({ ...this.look(), n: name });
    this.enter(code, false);
  },
  enter(code, made) {
    this.stop(); this.start(code);
    $('#sl-jcode').textContent = code; $('#sl-jmsg').textContent = made ? 'Comparte este código con tu clase o tus amigos. Solo quienes tengan el código se verán entre sí, en cualquier época.' : `Estás en el grupo ${code}. Ve a cualquier época: si alguien del grupo está ahí, lo verás.`;
    Sala.setView('jready');
  },
};
// el bucle propio de los avatares remotos (independiente del juego)
{ let t0 = performance.now(); const loop = () => { const t = performance.now(); const dt = Math.min(0.1, (t - t0) / 1000); t0 = t; try { Juntos.frame(dt); } catch (e) { console.warn(e); } requestAnimationFrame(loop); }; requestAnimationFrame(loop); }
on('#mp-meet-q', () => Juntos.challenge('q'));
on('#mp-meet-d', () => Juntos.challenge('d'));
on('#mp-meet-m', () => { const r = Juntos.near && Juntos.R.get(Juntos.near); if (r && confirm(`¿Silenciar a ${r.name}? Dejarás de verlo y no recibirás sus gestos ni sus retos.`)) Juntos.mute(Juntos.near); });
on('#av-unmute', () => Juntos.unmuteAll());
on('#mp-yes', () => Juntos.answerInv(true));
on('#mp-no', () => Juntos.answerInv(false));
on('#mp-emo', () => { $('#mp-emobar').hidden = !$('#mp-emobar').hidden; });
EMOTES.forEach((e, k) => { const b = document.createElement('button'); b.textContent = e; b.setAttribute('aria-label', 'Gesto ' + e); b.addEventListener('click', (ev) => { ev.stopPropagation(); Juntos.emote(k); }); $('#mp-emobar').appendChild(b); });
on('#mp-badge', () => { if (Juntos.mode === 'grupo') { if (confirm(`¿Salir del grupo ${Juntos.code} y volver al mundo abierto?`)) { Juntos.stop(); toast('Saliste del grupo.'); } } else if (confirm('¿Desactivar el mundo abierto? Dejarás de ver a otros viajeros (puedes volver a activarlo en Ajustes).')) { G.settings.mundo = false; saveSettings(); syncSettings(); Juntos.stop(); } });
on('#sl-jnew', () => Juntos.create());
on('#sl-jjoin', () => Juntos.join());
on('#sl-jgo', () => openTravel('title'));
on('#sl-mundo', () => { G.settings.mundo = G.settings.mundo !== true; saveSettings(); syncSettings(); Juntos.paintAvatar(); });
on('#av-save', () => { const n = Sala.clean($('#av-name').value); if ($('#av-name').value && !n) return toast('Elige un apodo de 2 a 16 letras, sin palabras ofensivas.'); Juntos.saveLook({ ...Juntos.look(), n }); toast('Avatar guardado.'); });
$('#b-sala').addEventListener('click', () => setTimeout(() => Juntos.paintAvatar(), 50));
window.addEventListener('pagehide', () => { if (Juntos.on) MRT.send('adios', { id: Juntos.id }); });
setTimeout(() => Juntos.resume(), 1500);
