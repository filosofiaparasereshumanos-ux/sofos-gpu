// ============================================================================
//  ESCUCHAR JUNTOS: cuando un viajero escucha la lección de un pensador, los
//  demás lo ven sentado frente a él, como en la Academia. Quien se acerca puede
//  sentarse también. Al terminar, cada uno elige qué le deja la lección y ve qué
//  eligieron los demás.
// ============================================================================
const Escucha = {
  votes: {}, told: new Set(), lastLs: '',
  // el pensador cuya lección estoy escuchando en el mundo
  mine() { return G.state === 'lesson' && Lesson.from === 'world' && Lesson.sage && !Lesson.book ? Lesson.data.id : ''; },
  sage(id) { return typeof sages !== 'undefined' && sages.find((s) => s.data.id === id); },
  // viajeros (visibles) que escuchan a ese pensador ahora
  listeners(id) { const out = []; for (const [rid, r] of Juntos.R) if (r.lec === id && r.e === G.eraIdx) out.push([rid, r]); return out.sort((a, b) => (a[0] < b[0] ? -1 : 1)); },
  // asiento k de n en un semicírculo frente al pensador
  seat(s, k, n) {
    const yaw = s.baseYaw || 0, a = yaw + (n === 1 ? 0.45 : -0.95 + (1.9 * k) / (n - 1)); const R = s.boss ? 3.6 : 2.7;
    return [s.pos.x + Math.sin(a) * R, s.pos.z + Math.cos(a) * R];
  },
  before() {
    if (!Juntos.on) return;
    const ls = this.mine(); if (ls !== this.lastLs) { this.lastLs = ls; Juntos.sendT = 0; Juntos.last = null; }
    const by = {}; for (const [rid, r] of Juntos.R) if (r.lec && r.e === G.eraIdx) (by[r.lec] = by[r.lec] || []).push(rid);
    for (const id of Object.keys(by)) {
      const s = this.sage(id); if (!s) continue; const ids = by[id].sort(); const n = Math.min(ids.length, 8);
      ids.forEach((rid, k) => { const r = Juntos.R.get(rid); const [x, z] = this.seat(s, k % n, n); r.tx = x; r.tz = z; r.ty = s.pos.y || 0; r.tyaw = Math.atan2(-(s.pos.x - x), -(s.pos.z - z)); r.sit = true;
        const key = rid + id; if (!this.told.has(key) && G.state === 'play') { this.told.add(key); toast(`📖 ${r.name} se sentó a escuchar a ${s.data.short}. Acércate y elige «Lección» para escuchar juntos.`); } });
    }
  },
  after() {
    for (const r of Juntos.R.values()) {
      const lab = r.lab || (r.lab = r.g.children.find((o) => o.isSprite && o !== r.bub));
      if (r.lec && r.sit && r.g.visible) { r.fig.group.position.y = -0.46; r.fig.armL.rotation.x = -0.5; r.fig.armR.rotation.x = -0.5; }
      if (!r.lec) r.sit = false;
      // el apodo de quien está sentado justo delante no debe tapar la vista
      if (lab) lab.visible = !(r.sit && Math.hypot(r.x - camera.position.x, r.z - camera.position.z) < 3.4);
    }
    // en mi lección: quién escucha conmigo
    const el = $('#ls-with'); if (!el) return; const id = this.mine(); const L = id ? this.listeners(id) : [];
    const txt = L.length ? `👥 Escuchan contigo: ${L.map(([, r]) => r.name).join(', ')}` : ''; if (el.textContent !== txt) { el.textContent = txt; el.hidden = !txt; }
  },
  // -------- al terminar la lección: ¿qué te deja?
  options(d) {
    const D = typeof DIALOGOS !== 'undefined' && DIALOGOS[d.id];
    if (D && D.posturas && D.posturas.length >= 2) return { q: `${d.short} sostiene: «${D.tesis}» ¿Qué piensas tú?`, ops: D.posturas.map((p) => p.t) };
    return { q: `¿Qué te deja la lección de ${d.short}?`, ops: ['Me convence: pienso parecido', 'No me convence: lo veo de otro modo', 'Me deja con dudas: quiero pensarlo más'] };
  },
  ask() {
    const d = Lesson.data; const o = this.options(d); const rew = $('#ls-reward');
    const wrap = document.createElement('div'); wrap.className = 'lj'; rew.appendChild(wrap);
    const p = document.createElement('p'); p.className = 'bq-q'; p.textContent = o.q; wrap.appendChild(p);
    const box = document.createElement('div'); box.className = 'bq-ops'; wrap.appendChild(box);
    const res = document.createElement('div'); res.className = 'lj-res'; wrap.appendChild(res); this.panel = { id: d.id, res, o };
    o.ops.forEach((t, k) => { const b = document.createElement('button'); b.className = 'tk-op ans'; b.textContent = t; box.appendChild(b);
      b.addEventListener('click', () => { if (box.dataset.done) return; box.dataset.done = '1'; [...box.children].forEach((x, j) => { x.disabled = true; x.classList.toggle('good', j === k); });
        Audio.correct(); this.choose(d, k); }); });
  },
  choose(d, k) {
    const v = (this.votes[d.id] = this.votes[d.id] || {}); v[Juntos.myId()] = { n: 'Tú', k, t: Date.now(), me: true };
    if (Juntos.on) MRT.send('lec', { id: Juntos.myId(), n: Juntos.myName(), sg: d.id, k });
    this.paint();
  },
  rLec(d) {
    const id = String(d.id || ''); const r = Juntos.R.get(id); if (!r || id === Juntos.id) return; const sg = String(d.sg || '').slice(0, 24); const k = d.k | 0; if (k < 0 || k > 3) return;
    (this.votes[sg] = this.votes[sg] || {})[id] = { n: r.name, k, t: Date.now() }; this.paint();
    const mine = this.votes[sg][Juntos.myId()]; if (mine && Date.now() - mine.t < 900000) { achieve('escuchar'); if (!mine.paid) { mine.paid = true; addScore(30); popup('+30<small>escucharon juntos</small>', 'up'); } }
  },
  paint() {
    const P = this.panel; if (!P || !P.res.isConnected) return; const v = this.votes[P.id] || {}; const now = Date.now(); P.res.innerHTML = '';
    const list = Object.values(v).filter((x) => now - x.t < 900000); if (!list.some((x) => x.me)) return;
    const others = list.filter((x) => !x.me);
    P.o.ops.forEach((t, k) => { const who = list.filter((x) => x.k === k); if (!who.length) return; const row = document.createElement('p'); row.className = 'lj-row'; const b = document.createElement('b'); b.textContent = who.map((x) => x.n).join(', ') + ': '; row.appendChild(b); row.appendChild(document.createTextNode(t)); P.res.appendChild(row); });
    const note = document.createElement('p'); note.className = 'lj-note';
    note.textContent = others.length ? 'No hay respuesta correcta. ¿Por qué eligieron distinto? Búscalos y rétalos a un debate.' : Juntos.on ? 'Cuando otros viajeros terminen esta lección, aquí verás qué eligieron.' : 'Si escuchas esta lección junto a otros viajeros, aquí verás qué eligió cada uno.';
    P.res.appendChild(note);
  },
};
{ const f0 = Juntos.frame; Juntos.frame = function (dt) { try { Escucha.before(); } catch (e) { /* nada */ } f0.call(this, dt); try { Escucha.after(); } catch (e) { /* nada */ } }; }
{ const fin0 = Lesson.finish; Lesson.finish = function () { fin0.call(this); if (!this.book && this.done) { try { Escucha.ask(); } catch (e) { console.warn(e); } } }; }
