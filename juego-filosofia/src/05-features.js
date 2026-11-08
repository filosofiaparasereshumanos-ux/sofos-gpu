// ============================================================================
//  LOGROS
// ============================================================================
const ACH_KEY = 'odisea-razon.logros', STATS_KEY = 'odisea-razon.stats', ALIAS_KEY = 'odisea-razon.alias', DAILY_KEY = 'odisea-razon.oraculo';
const ACH = [
  { id: 'primer', i: 'Α', n: 'Primer diálogo', d: 'Vence a tu primer filósofo en un duelo.' },
  { id: 'tabano', i: 'Σ', n: 'El tábano', d: 'Vence a Sócrates en su propio terreno.' },
  { id: 'caverna', i: 'Π', n: 'Fuera de la caverna', d: 'Vence a Platón y mira el sol.' },
  { id: 'perfecto', i: 'Μ', n: 'Mayéutica perfecta', d: 'Gana un duelo sin fallar ninguna pregunta.' },
  { id: 'veloz', i: 'Ν', n: 'Intuición intelectual', d: 'Acierta una pregunta en menos de 3 segundos.' },
  { id: 'racha4', i: 'Λ', n: 'Rayo de razón', d: 'Encadena 10 aciertos seguidos (racha ×4).' },
  { id: 'sincomodin', i: 'Ω', n: 'Autarquía', d: 'Vence a un maestro final sin usar comodines.' },
  { id: 'logos', i: 'Θ', n: 'Fiel al Logos', d: 'Completa una época sin perder la razón.' },
  { id: 'discipulo', i: 'Μ', n: 'Discípulo', d: 'Escucha completa la lección de un filósofo.' },
  { id: 'academia', i: 'Α', n: 'La Academia', d: 'Escucha 10 lecciones distintas.' },
  { id: 'liceo', i: 'Λ', n: 'El Liceo completo', d: 'Escucha todas las lecciones de la odisea.' },
  { id: 'conversador', i: 'Χ', n: 'Buen conversador', d: 'Habla con 10 filósofos distintos.' },
  { id: 'socratico', i: 'Ϙ', n: 'Espíritu socrático', d: 'Hazles 5 preguntas libres a los filósofos.' },
  { id: 'explorador', i: 'Ξ', n: 'Explorador', d: 'Descubre 8 lugares.' },
  { id: 'ciudadano', i: 'Π', n: 'Vida en la polis', d: 'Escucha hasta el final a 8 ciudadanos.' },
  { id: 'honesto', i: 'Δ', n: 'La lámpara de Diógenes', d: 'Encuentra al ser humano honesto que buscaba Diógenes.' },
  { id: 'encargos', i: 'Ε', n: 'Discípulo diligente', d: 'Cumple 10 encargos de los filósofos.' },
  { id: 'primera', i: 'Ι', n: 'A la primera', d: 'Resuelve 5 encargos sin equivocarte ni una vez.' },
  { id: 'lector', i: 'Β', n: 'Primer lector', d: 'Estudia tu primer libro y responde su pregunta.' },
  { id: 'biblioteca', i: 'Λ', n: 'Ratón de biblioteca', d: 'Estudia 5 libros.' },
  { id: 'alejandria', i: 'Ω', n: 'La Biblioteca de Alejandría', d: 'Estudia todos los libros de la odisea.' },
  { id: 'pensadoras', i: 'Φ', n: 'Ellas también pensaron', d: 'Gana el debate a 4 filósofas distintas.' },
  { id: 'nuestra', i: 'Ñ', n: 'Nuestra América', d: 'Comprende las ideas de los cinco pensadores de América Latina.' },
  { id: 'mundo1', i: 'Ш', n: 'Primer viaje', d: 'Vence a un maestro de las sabidurías del mundo.' },
  { id: 'mundo', i: 'Ⴟ', n: 'Ubuntu', d: 'Vence a los seis maestros de las sabidurías del mundo.' },
  { id: 'viajero', i: 'Ω', n: 'Viajero del tiempo', d: 'Descubre todos los lugares de todas las épocas.' },
  { id: 'kant', i: 'Κ', n: 'Sapere aude', d: 'Completa la odisea venciendo a Paulo Freire, el último maestro.' },
  { id: 'rey', i: 'Β', n: 'Rey filósofo', d: 'Termina la odisea con el rango más alto.' },
  { id: 'erudito', i: 'Ψ', n: 'Erudito', d: 'Comprende todos los conceptos del códice.' },
  { id: 'oraculo', i: 'Δ', n: 'Consultante', d: 'Completa un Oráculo de Delfos diario.' },
  { id: 'pitia', i: 'Ἀ', n: 'Elegido de Apolo', d: 'Acierta las 10 preguntas del oráculo.' },
];
const Stats = {
  d: store.get(STATS_KEY, {}),
  add(k, n = 1) { this.d[k] = (this.d[k] || 0) + n; store.set(STATS_KEY, this.d); return this.d[k]; },
};
const achQueue = []; let achBusy = false;
function achieve(id) {
  const got = new Set(store.get(ACH_KEY, [])); if (got.has(id)) return;
  got.add(id); store.set(ACH_KEY, [...got]);
  const a = ACH.find((x) => x.id === id); if (!a) return;
  achQueue.push(a); if (!achBusy) nextAch();
  updateLogrosCount();
}
function nextAch() {
  const a = achQueue.shift(); const el = $('#achv'); if (!a) { achBusy = false; el.hidden = true; return; }
  achBusy = true; $('#achv-i').textContent = a.i; $('#achv-n').textContent = a.n; $('#achv-d').textContent = a.d;
  el.hidden = true; void el.offsetWidth; el.hidden = false;
  Music.sting('achievement'); Audio.pickup(); buzz([20, 40, 20]);
  setTimeout(nextAch, 4100);
}
function updateLogrosCount() { const n = store.get(ACH_KEY, []).length; $('#b-logros-n').textContent = `${n}/${ACH.length}`; }
function renderLogros() {
  const got = new Set(store.get(ACH_KEY, [])); const grid = $('#l-grid'); grid.innerHTML = '';
  for (const a of ACH) {
    const ok = got.has(a.id); const c = document.createElement('div'); c.className = 'cc ach' + (ok ? '' : ' locked');
    const ic = document.createElement('div'); ic.className = 'ach-icon'; ic.textContent = ok ? a.i : '?';
    const tx = document.createElement('div'); const h = document.createElement('h4'); h.textContent = a.n; const p = document.createElement('p'); p.textContent = a.d;
    tx.append(h, p); c.append(ic, tx); grid.appendChild(c);
  }
  $('#l-count').textContent = `${got.size} de ${ACH.length} logros · ${Stats.d.kills || 0} sombras disipadas en total`;
}

// ============================================================================
//  SALÓN DE LA FAMA (base de datos compartida del artefacto, si está disponible)
// ============================================================================
const Fame = {
  db: null, user: null, uid: null, ready: false, writable: true, tab: 'daily', chain: Promise.resolve(),
  async init() {
    try {
      if (!window.claude || typeof window.claude.use !== 'function') return;
      const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
      this.db = db; this.user = user; this.uid = user ? await user.id() : null; this.ready = !!(db && this.uid);
      if (this.ready && user.can) { const w = await user.can('data.write'); if (w === false) this.writable = false; }
      if (!$('#fame').hidden) this.render();
    } catch (e) { this.ready = false; }
  },
  alias() { return String(store.get(ALIAS_KEY, '') || '').slice(0, 22); },
  save(patch) {
    if (!this.ready || !this.writable) return Promise.resolve(false);
    // una escritura cada vez sobre el mismo documento
    this.chain = this.chain.then(async () => {
      const ref = this.db.doc('fama/' + this.uid);
      try {
        const snap = await ref.get(); const base = snap.exists ? { ...snap.data() } : {};
        await ref.set(Object.assign(base, patch, { alias: this.alias(), t: Date.now() })); return true;
      } catch (e) { if (e && e.code === 'invalid_argument') this.writable = false; return false; }
    });
    return this.chain;
  },
  submitDaily(r) { return this.save({ dailyDate: r.date, dailyScore: r.score, dailyCorrect: r.correct, dailyGrid: r.grid }); },
  async submitOdyssey(score, rankName, acc) {
    const best = store.get('odisea-razon.best', 0); if (score > best) store.set('odisea-razon.best', score);
    if (!this.ready) return;
    try { const snap = await this.db.doc('fama/' + this.uid).get(); const prev = snap.exists ? snap.data().best || 0 : 0; if (score <= prev) return; } catch (e) { return; }
    this.save({ best: score, bestRank: rankName, bestAcc: acc });
  },
  async load(tab) {
    const col = this.db.collection('fama');
    const q = tab === 'daily' ? col.where('dailyDate', '==', Oracle.today()).orderBy('dailyScore', 'desc').limit(30) : col.where('best', '>', 0).orderBy('best', 'desc').limit(30);
    return Promise.race([q.get(), new Promise((_, rej) => setTimeout(() => rej({ code: 'timeout' }), 10000))]);
  },
  async render() {
    const list = $('#f-list'), note = $('#f-note'); list.innerHTML = '';
    document.querySelectorAll('#f-tabs button').forEach((b) => b.classList.toggle('on', b.dataset.v === this.tab));
    $('#f-alias').value = this.alias();
    const mine = this.tab === 'daily' ? store.get(DAILY_KEY, {})[Oracle.today()] : null;
    const localBest = store.get('odisea-razon.best', 0);
    if (!this.ready) {
      const li = document.createElement('li'); li.className = 'empty';
      li.textContent = this.tab === 'daily' ? (mine ? `Tu resultado de hoy: ${mine.correct}/10 · ${mine.score.toLocaleString('es-ES')} de sabiduría` : 'Aún no has consultado al oráculo hoy.') : (localBest ? `Tu mejor odisea: ${localBest.toLocaleString('es-ES')} de sabiduría` : 'Completa la odisea para entrar en el salón.');
      list.appendChild(li);
      note.textContent = 'El ranking compartido funciona en la versión publicada en claude.ai, con tu cuenta. Aquí se muestran tus marcas en este dispositivo.';
      return;
    }
    note.textContent = this.writable ? (this.tab === 'daily' ? 'Las preguntas del oráculo son las mismas para todos hoy. Mañana, nuevas.' : 'Las mejores puntuaciones de la odisea completa.') : 'Puedes ver el ranking, pero tu acceso a esta página no permite publicar puntuaciones.';
    const loading = document.createElement('li'); loading.className = 'empty'; loading.textContent = 'Consultando los anales…'; list.appendChild(loading);
    let snap;
    try { snap = await this.load(this.tab); } catch (e) { loading.textContent = 'No se pudo cargar el ranking ahora. Inténtalo en un momento.'; return; }
    list.innerHTML = '';
    const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    if (!rows.length) { const li = document.createElement('li'); li.className = 'empty'; li.textContent = this.tab === 'daily' ? 'Nadie ha consultado al oráculo hoy todavía. ¡Sé el primero!' : 'Nadie ha completado la odisea todavía.'; list.appendChild(li); return; }
    let names = {}; try { names = await this.user.profiles(rows.filter((r) => !r.alias).map((r) => r.id)); } catch (e) { /* sin nombres */ }
    rows.forEach((r, i) => {
      const li = document.createElement('li'); li.className = (i < 3 ? 'top' + (i + 1) : '') + (r.id === this.uid ? ' me' : '');
      const n = document.createElement('span'); n.className = 'n'; n.textContent = i + 1;
      const who = document.createElement('span'); who.className = 'who'; who.textContent = String(r.alias || (names[r.id] && names[r.id].name) || 'Pensador anónimo').slice(0, 22);
      const sub = document.createElement('small'); sub.textContent = this.tab === 'daily' ? `${r.dailyCorrect ?? '?'}/10 ${typeof r.dailyGrid === 'string' ? r.dailyGrid : ''}` : String(r.bestRank || ''); who.appendChild(sub);
      const sc = document.createElement('span'); sc.className = 'sc'; sc.textContent = Number(this.tab === 'daily' ? r.dailyScore : r.best || 0).toLocaleString('es-ES');
      li.append(n, who, sc); list.appendChild(li);
    });
  },
};
document.querySelectorAll('#f-tabs button').forEach((b) => b.addEventListener('click', () => { Fame.tab = b.dataset.v; Fame.render(); }));
$('#f-save').addEventListener('click', () => {
  const v = $('#f-alias').value.replace(/\s+/g, ' ').trim().slice(0, 22); store.set(ALIAS_KEY, v); Audio.click();
  if (Fame.ready) Fame.save({}).then(() => Fame.render()); toast(v ? `Te llamarán «${v}».` : 'Nombre borrado.');
});

// ============================================================================
//  EL ORÁCULO DE DELFOS: reto diario de 10 preguntas, igual para todos
// ============================================================================
const Oracle = {
  qs: [], i: 0, score: 0, streak: 0, best: 0, grid: [], time: 0, maxTime: 15, answered: true, practice: false, askedAt: 0, correct: 0,
  today() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; },
  label(ds) { const [y, m, d] = ds.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }); },
  build(ds) {
    let h = 2166136261; for (const ch of ds + 'delfos') { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
    const r = mulberry32(h >>> 0); const picks = [];
    ERAS.forEach((e, ei) => { const s = e.sages[Math.floor(r() * e.sages.length)]; picks.push({ s, ei }); });
    const rest = []; ERAS.forEach((e, ei) => e.sages.forEach((s) => { if (!picks.some((p) => p.s === s)) rest.push({ s, ei }); }));
    shuffle(rest, r); picks.push(...rest.slice(0, 4));
    picks.sort((a, b) => a.ei - b.ei || ERAS[a.ei].sages.indexOf(a.s) - ERAS[b.ei].sages.indexOf(b.s));
    this.qs = picks.map(({ s, ei }) => { const q = s.q[Math.floor(r() * s.q.length)]; const opts = shuffle(q.a.map((t, k) => ({ t, ok: k === 0 })), r); return { s, ei, q, opts }; });
  },
  open() {
    G.prevScreen = 'title'; const ds = this.today(); const done = store.get(DAILY_KEY, {})[ds];
    $('#o-date').textContent = 'Consulta del ' + this.label(ds);
    const box = $('#o-done');
    if (done) {
      box.hidden = false; box.innerHTML = '';
      const t = document.createElement('div'); t.className = 'grid-emoji'; t.style.marginTop = '0'; t.textContent = done.grid;
      const p = document.createElement('p'); p.style.margin = '8px 0 0'; p.textContent = `Hoy ya consultaste al oráculo: ${done.correct}/10 · ${done.score.toLocaleString('es-ES')} de sabiduría. Vuelve mañana para nuevas preguntas.`;
      box.append(t, p); $('#b-ostart').textContent = 'Practicar otra vez (no puntúa)';
    } else { box.hidden = true; $('#b-ostart').textContent = 'Consultar al oráculo'; }
    show('oracle');
  },
  start() {
    const ds = this.today(); this.practice = !!store.get(DAILY_KEY, {})[ds];
    this.build(ds); this.i = 0; this.score = 0; this.streak = 0; this.best = 0; this.grid = []; this.correct = 0;
    hideAll(); G.state = 'oracle'; Audio.mode = 'duel';
    const d = $('#duel'); d.classList.add('oracle'); d.hidden = false;
    $('#duel .conv .lbl').textContent = 'Oráculo';
    Voice.say('Conócete a ti mismo. Responde, consultante.');
    this.ask();
  },
  ask() {
    const it = this.qs[this.i]; const e = ERAS[it.ei];
    this.answered = false; this.time = this.maxTime; this.askedAt = performance.now(); this.lastTick = 99;
    $('#d-medal').textContent = it.s.short[0]; $('#d-name').textContent = it.s.name; $('#d-meta').textContent = `${e.num} · ${it.s.epithet} · ${it.s.dates}`;
    $('#d-say').textContent = '«' + it.s.intro + '»';
    $('#d-qnum').textContent = `Pregunta ${this.i + 1} de ${this.qs.length}`;
    $('#d-q').textContent = it.q.q;
    const box = $('#d-answers'); box.innerHTML = '';
    it.opts.forEach((o, k) => {
      const b = document.createElement('button'); b.className = 'ans'; b.innerHTML = `<span class="k">${'ABCD'[k]}</span><span></span>`; b.lastChild.textContent = o.t;
      b.addEventListener('click', () => this.answer(k)); box.appendChild(b);
    });
    $('#d-explain').hidden = true; $('#d-next').hidden = true; this.renderTop();
  },
  renderTop() {
    $('#d-conv').innerHTML = this.qs.map((_, k) => `<i class="pip ${k < this.grid.length ? (this.grid[k] === '🟥' || this.grid[k] === '⬛' ? 'ko' : 'ok') : 'next'}"></i>`).join('');
    const m = this.mult(); const st = $('#d-streak'); st.className = 'streak' + (m > 1 ? ' hot' : '');
    st.innerHTML = `<span class="oscore">${this.score.toLocaleString('es-ES')}</span>${this.streak > 0 ? ` · racha ${this.streak}${m > 1 ? ` <b>×${m}</b>` : ''}` : ''}`;
  },
  mult() { return this.streak >= 7 ? 4 : this.streak >= 5 ? 3 : this.streak >= 3 ? 2 : 1; },
  answer(k) {
    if (this.answered || G.state !== 'oracle') return;
    this.answered = true; const it = this.qs[this.i]; const ok = k >= 0 && it.opts[k].ok;
    [...$('#d-answers').children].forEach((b, j) => { b.disabled = true; if (it.opts[j].ok) b.classList.add('right'); else if (j === k) b.classList.add('wrong'); else b.classList.add('dimmed'); });
    if (ok) {
      const fast = this.time > this.maxTime * 0.6; this.streak++; this.best = Math.max(this.best, this.streak); this.correct++;
      const pts = (100 + Math.ceil(this.time * 10)) * this.mult(); this.score += pts; this.grid.push(fast ? '🟨' : '🟩');
      popup(`+${pts}${this.mult() > 1 ? `<small>racha ×${this.mult()}</small>` : fast ? '<small>¡veloz!</small>' : ''}`, 'up'); Audio.correct(); buzz(25);
      if (this.maxTime - this.time < 3) achieve('veloz');
    } else {
      this.grid.push(k < 0 ? '⬛' : '🟥'); this.streak = 0; Audio.wrong(); buzz([50, 40, 80]); G.hurtFx = 0.6;
    }
    const ex = $('#d-explain'); ex.innerHTML = `<b>${ok ? 'Correcto' : k < 0 ? 'Se acabó el tiempo' : 'Respuesta correcta'}</b>`;
    if (!ok) ex.append(document.createTextNode(it.opts.find((o) => o.ok).t + '. ')); if (it.q.e) ex.append(document.createTextNode(it.q.e));
    ex.hidden = false; this.renderTop();
    const nb = $('#d-next'); nb.hidden = false; nb.textContent = this.i + 1 >= this.qs.length ? 'Ver la respuesta del oráculo' : 'Siguiente pregunta';
    if (!IS_TOUCH) nb.focus({ preventScroll: true });
  },
  next() { if (!this.answered || G.state !== 'oracle') return; this.i++; if (this.i >= this.qs.length) this.finish(); else this.ask(); },
  key(e) {
    if (e.repeat) return;
    const n = { Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3, Numpad1: 0, Numpad2: 1, Numpad3: 2, Numpad4: 3, KeyA: 0, KeyB: 1, KeyC: 2, KeyD: 3 }[e.code];
    if (n !== undefined && performance.now() - this.askedAt > 500) this.answer(n);
    if ((e.code === 'Enter' || e.code === 'Space' || e.code === 'NumpadEnter') && this.answered) { e.preventDefault(); this.next(); }
  },
  update(dt) {
    if (this.answered) return;
    this.time -= dt; const k = Math.max(0, this.time / this.maxTime);
    const tb = $('#d-timer'); tb.style.transform = `scaleX(${k})`; tb.classList.toggle('urgent', this.time < 4);
    $('#d-time').textContent = Math.max(0, Math.ceil(this.time));
    if (this.time < 4 && Math.ceil(this.time) !== this.lastTick) { this.lastTick = Math.ceil(this.time); Audio.tick(); }
    if (this.time <= 0) this.answer(-1);
  },
  verdict() {
    const c = this.correct;
    if (c === 10) return ['Elegido de Apolo', 'Perfecto. La Pitia guarda silencio ante ti.'];
    if (c >= 8) return ['Sabio de Delfos', 'Pocos mortales responden así al oráculo.'];
    if (c >= 6) return ['Filósofo', 'Buen juicio. El oráculo asiente.'];
    if (c >= 4) return ['Aprendiz', 'Sabes que no sabes: es un buen comienzo.'];
    return ['Habitante de la caverna', 'Las sombras te confunden hoy. Mañana, otra oportunidad.'];
  },
  finish() {
    const ds = this.today(); const gridStr = this.grid.join('');
    $('#duel').hidden = true; $('#duel').classList.remove('oracle'); $('#duel .conv .lbl').textContent = 'Convicción';
    G.state = 'title'; Audio.mode = 'calm'; Audio.victory(); Music.sting('victory');
    const [title, msg] = this.verdict();
    const res = { date: ds, score: this.score, correct: this.correct, grid: gridStr, streak: this.best };
    if (!this.practice) { const all = store.get(DAILY_KEY, {}); all[ds] = res; store.set(DAILY_KEY, all); Fame.submitDaily(res); Stats.add('oracles'); }
    achieve('oraculo'); if (this.correct === 10) achieve('pitia');
    $('#oe-eye').textContent = this.practice ? 'Práctica · no cuenta para el ranking' : 'El oráculo ha hablado · ' + this.label(ds);
    $('#oe-title').textContent = title; $('#oe-grid').textContent = gridStr; $('#oe-msg').textContent = msg;
    $('#oe-stats').innerHTML = `<div><b>${this.correct}/10</b><span>Aciertos</span></div><div><b>${this.score.toLocaleString('es-ES')}</b><span>Sabiduría</span></div><div><b>${this.best}</b><span>Mejor racha</span></div>`;
    $('#oe-share').value = `Odisea de la Razón · Oráculo de Delfos\n${this.label(ds)}\n${gridStr}\n${this.correct}/10 · ${this.score.toLocaleString('es-ES')} de sabiduría · «${title}»\n¿Puedes superarme? https://claude.ai/artifact/5C4Rz4jpDYiEaEYcdbUJew`;
    G.prevScreen = 'title'; show('oracle-end'); refreshTitleExtras();
  },
};
$('#b-oshare').addEventListener('click', () => {
  const ta = $('#oe-share'); const text = ta.value; const done = () => { $('#b-oshare').textContent = '¡Copiado! Pégalo donde quieras'; Audio.pickup(); };
  const fallback = () => { ta.focus(); ta.select(); try { if (document.execCommand('copy')) done(); else $('#b-oshare').textContent = 'Selecciona el texto y cópialo'; } catch (e) { $('#b-oshare').textContent = 'Selecciona el texto y cópialo'; } };
  try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback); else fallback(); } catch (e) { fallback(); }
});
function refreshTitleExtras() {
  const done = store.get(DAILY_KEY, {})[Oracle.today()]; const b = $('#b-oracle');
  b.classList.toggle('fresh', !done);
  $('#b-oracle-s').textContent = done ? `Hoy: ${done.grid} · ${done.score.toLocaleString('es-ES')}` : '10 preguntas · las mismas para todos';
  updateLogrosCount();
}
on('#b-oracle', () => Oracle.open());
on('#b-ostart', () => Oracle.start());
on('#b-ofame', () => { Fame.tab = 'daily'; openSub('fame'); Fame.render(); });
on('#b-ofame2', () => { Fame.tab = 'daily'; openSub('fame'); Fame.render(); });
on('#b-omenu', () => titleScreen());
on('#b-fame', () => { openSub('fame'); Fame.render(); });
on('#b-logros', () => { openSub('logros'); renderLogros(); });

// ============================================================================
//  ARRANQUE
// ============================================================================
boot().then(() => { refreshTitleExtras(); Fame.init(); });
