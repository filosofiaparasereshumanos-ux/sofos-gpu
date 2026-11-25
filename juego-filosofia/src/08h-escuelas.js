// ============================================================================
//  ESCUELAS FILOSÓFICAS: cada pensador lleva el color y el emblema de su escuela
//  o corriente (estoicos, epicúreos, existencialistas…). Al vencer a todos los de
//  una escuela se gana su medalla. Hay un panel con el avance de cada escuela.
//  Los datos (escuelas y a qué escuela pertenece cada uno) están en 08h-escuelas-datos.js.
// ============================================================================
const Escuelas = {
  T: {
    title: 'Escuelas filosóficas', menu: '🏅 Escuelas y medallas', sub: 'Cada pensador pertenece a una escuela o corriente. Vence a todos los de una escuela para ganar su medalla.',
    prog: (a, b) => `${a} de ${b}`, medals: (a, b) => `Medallas: ${a} de ${b}`, school: 'Escuela', got: '¡Medalla ganada!', where: 'en', next: (a) => `Te faltan ${a} para la medalla`,
    win: (m, n) => `🏅 ${m}: conociste a toda la escuela de ${n}`, all: 'Todas', mine: 'Ganadas', go: 'Ir a su mundo',
  },
  of(id) { const k = ESCUELAS.map[id]; return k ? ESCUELAS.schools.find((s) => s.id === k) : null; },
  members(k) { const out = []; ERAS.forEach((e, ei) => e.sages.forEach((s) => { if (ESCUELAS.map[s.id] === k && !out.some((x) => x.d.id === s.id)) out.push({ d: s, ei }); })); return out; },
  beaten() {
    const set = new Set(); const m = store.get(ERA_PROG_KEY, {}) || {}; for (const k in m) for (const id of m[k] || []) set.add(id);
    try { for (const s of sages) if (s.state === 'defeated') set.add(s.data.id); } catch (e) { /* sin mundo */ }
    return set;
  },
  status() { const b = this.beaten(); return ESCUELAS.schools.map((s) => { const mem = this.members(s.id); const got = mem.filter((x) => b.has(x.d.id)).length; return { s, mem, got, done: mem.length > 0 && got === mem.length }; }); },
  chip(d) {
    const s = this.of(d.id); if (!s) return null;
    const c = document.createElement('span'); c.className = 'esc-chip'; c.style.setProperty('--c', s.c); c.textContent = `${s.i} ${s.n}`; c.title = s.d;
    c.addEventListener('click', (e) => { e.stopPropagation(); this.open(s.id); }); return c;
  },
  paintChip(sel, d) { const box = document.querySelector(sel); if (!box) return; box.querySelectorAll('.esc-chip').forEach((x) => x.remove()); const c = d && this.chip(d); if (c) box.appendChild(c); },
  // al vencer: ¿se completó alguna escuela?
  check() {
    for (const st of this.status()) if (st.done && !new Set(store.get(ACH_KEY, [])).has('esc-' + st.s.id)) { achieve('esc-' + st.s.id); }
  },
  // emblema flotante sobre cada pensador en el mundo 3D
  badge(s) {
    const e = this.of(s.data.id); if (!e || s._esc) return; s._esc = true;
    const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d');
    x.fillStyle = 'rgba(12,10,16,0.75)'; x.beginPath(); x.arc(64, 64, 58, 0, Math.PI * 2); x.fill();
    x.lineWidth = 9; x.strokeStyle = e.c; x.beginPath(); x.arc(64, 64, 54, 0, Math.PI * 2); x.stroke();
    x.font = '64px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(e.i, 64, 70);
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false }));
    sp.scale.set(0.5, 0.5, 1); sp.position.set(-1.38, s.label.position.y + 0.02, 0); s.group.add(sp);
  },
  build() {
    if (document.getElementById('esc')) return;
    const el = document.createElement('div'); el.id = 'esc'; el.className = 'nb'; el.hidden = true;
    el.innerHTML = '<div class="nb-card esc-card" role="dialog"><button class="ls-x pn-x" id="esc-x" aria-label="✕">✕</button><div class="eyebrow"></div><h3 class="esc-h"></h3><p class="esc-p"></p><div class="esc-f"></div><div class="esc-list"></div></div>';
    el.querySelector('.eyebrow').textContent = this.T.title; document.body.appendChild(el);
    el.querySelector('#esc-x').addEventListener('click', () => this.close());
  },
  open(focus) {
    this.build(); const el = document.getElementById('esc'); const st = this.status(); const won = st.filter((x) => x.done).length;
    el.querySelector('.esc-h').textContent = this.T.medals(won, st.length); el.querySelector('.esc-p').textContent = this.T.sub;
    const f = el.querySelector('.esc-f'); f.innerHTML = '';
    for (const x of st) { const m = document.createElement('span'); m.className = 'esc-med' + (x.done ? ' on' : ''); m.style.setProperty('--c', x.s.c); m.textContent = x.s.i; m.title = x.s.m; m.addEventListener('click', () => { const t = el.querySelector('#esc-' + x.s.id); if (t) { t.scrollIntoView({ behavior: 'smooth', block: 'center' }); t.classList.add('flash'); setTimeout(() => t.classList.remove('flash'), 1200); } }); f.appendChild(m); }
    const list = el.querySelector('.esc-list'); list.innerHTML = ''; const b = this.beaten();
    for (const x of st.sort((a, c) => (c.done - a.done) || (c.got / (c.mem.length || 1)) - (a.got / (a.mem.length || 1)))) {
      const card = document.createElement('div'); card.className = 'esc-sch' + (x.done ? ' done' : ''); card.id = 'esc-' + x.s.id; card.style.setProperty('--c', x.s.c);
      card.innerHTML = '<div class="esc-top"><b class="esc-ico"></b><div><h4></h4><small></small></div><span class="esc-n"></span><button class="esc-vz" aria-label="🔊">🔊</button></div><p class="esc-d"></p><div class="esc-bar"><i></i></div><div class="esc-mem"></div>';
      card.querySelector('.esc-ico').textContent = x.s.i; card.querySelector('h4').textContent = x.s.n; card.querySelector('small').textContent = x.done ? '🏅 ' + x.s.m : x.s.m;
      card.querySelector('.esc-n').textContent = this.T.prog(x.got, x.mem.length); card.querySelector('.esc-vz').addEventListener('click', () => { Voice.stop(); Voice.utter(x.s.d, null); }); card.querySelector('.esc-d').textContent = x.s.d;
      card.querySelector('.esc-bar i').style.width = (x.mem.length ? (x.got / x.mem.length) * 100 : 0) + '%';
      const mem = card.querySelector('.esc-mem');
      for (const m of x.mem) { const p = document.createElement('span'); p.className = 'esc-p1' + (b.has(m.d.id) ? ' on' : ''); p.textContent = (b.has(m.d.id) ? '✓ ' : '') + m.d.short; p.title = `${m.d.name} · ${ERAS[m.ei].num} · ${ERAS[m.ei].name}`; mem.appendChild(p); }
      list.appendChild(card);
    }
    Panel.open('esc');
    if (focus) setTimeout(() => { const t = el.querySelector('#esc-' + focus); if (t) { t.scrollIntoView({ block: 'center' }); t.classList.add('flash'); setTimeout(() => t.classList.remove('flash'), 1400); } }, 60);
  },
  close() { Voice.stop(); Panel.close('esc'); },
};
// las medallas de cada escuela son logros
for (const s of ESCUELAS.schools) ACH.push({ id: 'esc-' + s.id, i: s.i, n: s.m, d: `Vence a todos los pensadores de la escuela: ${s.n}.` });
{
  // emblema de la escuela en la conversación y en el debate
  const o0 = Talk.open.bind(Talk); Talk.open = function (sage) { o0(sage); Escuelas.paintChip('#talk .who', this.npc ? null : this.data); };
  const on0 = Talk.openNpc && Talk.openNpc.bind(Talk); if (on0) Talk.openNpc = function (...a) { const r = on0(...a); Escuelas.paintChip('#talk .who', null); return r; };
  const d0 = Duel.start.bind(Duel); Duel.start = function (s) { d0(s); Escuelas.paintChip('#duel .who', s && s.data); };
  // al vencer, revisar si se completó una escuela
  const w0 = Duel.win.bind(Duel); Duel.win = function () { w0(); setTimeout(() => { try { saveProgress(); } catch (e) { /* nada */ } Escuelas.check(); }, 400); };
  // emblemas flotantes en el mundo
  setInterval(() => { if (world && sages.length) for (const s of sages) if (!s._esc && s.label) Escuelas.badge(s); }, 600);
  // botones: en «Más opciones» de la portada y en la pausa
  const more = document.getElementById('t-more'); const lg = document.getElementById('b-logros');
  if (more) { const b = document.createElement('button'); b.className = 'mini-b'; b.id = 'b-escuelas'; b.textContent = Escuelas.T.menu; b.addEventListener('click', () => { Audio.click && Audio.click(); Escuelas.open(); }); more.insertBefore(b, lg ? lg.nextSibling : null); }
  const pc = document.getElementById('b-pcodex'); if (pc) { const b = document.createElement('button'); b.className = 'btn'; b.id = 'b-pescuelas'; b.textContent = Escuelas.T.menu; b.addEventListener('click', () => { Audio.click && Audio.click(); Escuelas.open(); }); pc.after(b); }
  // si ya se habían completado escuelas antes de esta función, se reconocen al empezar
  setTimeout(() => { try { const got = new Set(store.get(ACH_KEY, [])); for (const st of Escuelas.status()) if (st.done && !got.has('esc-' + st.s.id)) { got.add('esc-' + st.s.id); } store.set(ACH_KEY, [...got]); updateLogrosCount(); } catch (e) { /* nada */ } }, 1500);
  const st = document.createElement('style');
  st.textContent = '.esc-chip{display:inline-block;margin-top:6px;padding:3px 12px;border-radius:999px;font-size:.82rem;line-height:1.5;color:#fff;background:color-mix(in srgb,var(--c) 30%,rgba(10,8,14,.7));border:1.5px solid var(--c);cursor:pointer;font-family:var(--body,Georgia)}'
    + '#esc{z-index:66}.esc-card{max-height:92vh;overflow-y:auto;max-width:640px}.esc-h{font-family:var(--display);font-weight:normal;color:#ffe2a0;margin:2px 34px 4px 0}.esc-p{color:#e8dcc0;line-height:1.45;margin:0 0 10px}'
    + '.esc-f{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}.esc-med{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;font-size:1.15rem;background:rgba(255,255,255,.05);border:2px solid rgba(255,255,255,.15);filter:grayscale(1);opacity:.45;cursor:pointer}.esc-med.on{filter:none;opacity:1;border-color:var(--c);box-shadow:0 0 12px var(--c);background:color-mix(in srgb,var(--c) 28%,transparent)}'
    + '.esc-sch{border:1.5px solid color-mix(in srgb,var(--c) 55%,transparent);border-left:6px solid var(--c);border-radius:14px;padding:10px 12px;margin:10px 0;background:linear-gradient(120deg,color-mix(in srgb,var(--c) 14%,transparent),rgba(10,8,14,.4));transition:box-shadow .3s}.esc-sch.flash{box-shadow:0 0 0 3px var(--c)}.esc-sch.done{box-shadow:0 0 18px color-mix(in srgb,var(--c) 45%,transparent)}'
    + '.esc-top{display:flex;align-items:center;gap:10px}.esc-ico{font-size:1.6rem;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;background:color-mix(in srgb,var(--c) 30%,rgba(0,0,0,.4));border:2px solid var(--c);flex:0 0 46px}.esc-top h4{margin:0;font-family:var(--display);font-weight:normal;color:#fff;font-size:1.08rem}.esc-top small{color:#e8d8b0}.esc-n{margin-left:auto;font-size:.9rem;color:#fff;white-space:nowrap}.esc-vz{flex:0 0 auto;width:36px;height:36px;border-radius:50%;border:1px solid var(--c);background:rgba(0,0,0,.3);color:#fff;cursor:pointer;font-size:1rem}'
    + '.esc-d{margin:6px 0;color:#e8dcc0;font-size:.9rem;line-height:1.4}.esc-bar{height:6px;border-radius:6px;background:rgba(255,255,255,.1);overflow:hidden}.esc-bar i{display:block;height:100%;background:var(--c)}'
    + '.esc-mem{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}.esc-p1{font-size:.8rem;padding:2px 9px;border-radius:999px;background:rgba(255,255,255,.06);color:#b8ab90;border:1px solid rgba(255,255,255,.12)}.esc-p1.on{color:#fff;background:color-mix(in srgb,var(--c) 35%,transparent);border-color:var(--c)}';
  document.head.appendChild(st);
}
if (location.hash === '#debug') window.__esc = Escuelas;
