// ============================================================================
//  DEBATES ENTRE PENSADORES, MISIONES DIARIAS Y LÍNEA DE TIEMPO
// ============================================================================
// ventanas que se abren tanto desde la portada como en mitad del juego
const Panel = {
  from: {},
  open(id) {
    this.from[id] = G.state === 'play';
    if (this.from[id]) { G.state = 'place'; unlockPointer(); input.keys = {}; input.walk = null; input.auto = false; $('#hud').hidden = true; $('#touch').hidden = true; }
    $('#' + id).hidden = false;
  },
  close(id) {
    $('#' + id).hidden = true; Voice.stop();
    if (this.from[id] && G.state === 'place') { this.from[id] = false; G.state = 'play'; $('#hud').hidden = false; if (IS_TOUCH) $('#touch').hidden = false; lockPointer(); updateHud(); }
  },
};
const SAGE_BY_ID = () => { const m = {}; ERAS.forEach((e, i) => e.sages.forEach((s) => { m[s.id] = { d: s, era: e, idx: i }; })); return m; };

// ---------------------------------------------------------------- debates entre pensadores
for (const v of VERSUS) if (v.eje) { const S = SAGE_BY_ID(); MAPA_REGLAS.push(['vs-' + v.id, 'Me convence ' + S[v.a].d.short, v.eje, v.va], ['vs-' + v.id, 'Me convence ' + S[v.b].d.short, v.eje, v.vb]); }
const Versus = {
  v: null, i: 0, gen: 0,
  of(id) { return VERSUS.find((v) => v.a === id || v.b === id); },
  voted(v) { const x = (store.get(XP_KEY, {}) || {})['vs-' + v.id]; return x && x.el && x.el.length ? x.el[x.el.length - 1] : ''; },
  open() { Panel.open('vs'); this.list(); },
  close() { this.gen++; Panel.close('vs'); },
  list() {
    this.gen++; Voice.stop(); const S = SAGE_BY_ID(); $('#vs-list').hidden = false; $('#vs-play').hidden = true;
    const box = $('#vs-items'); box.innerHTML = '';
    for (const v of VERSUS) {
      const b = document.createElement('button'); b.className = 'vs-item'; const done = this.voted(v);
      b.innerHTML = '<i class="medal"></i><span><b></b><small></small></span><i class="medal"></i>';
      const ms = b.querySelectorAll('.medal'); setMedal(ms[0], v.a, S[v.a].d.short[0]); setMedal(ms[1], v.b, S[v.b].d.short[0]);
      b.querySelector('b').textContent = `${S[v.a].d.short} y ${S[v.b].d.short}`; b.querySelector('small').textContent = (done ? '✓ ' : '') + v.q;
      b.addEventListener('click', () => { Audio.click(); this.play(v); }); box.appendChild(b);
    }
    const n = VERSUS.filter((v) => this.voted(v)).length; $('#vs-count').textContent = `${n} de ${VERSUS.length} debates vistos`;
  },
  play(v) {
    if ($('#vs').hidden) Panel.open('vs');
    this.v = v; this.i = 0; const S = SAGE_BY_ID(); this.A = S[v.a].d; this.B = S[v.b].d;
    $('#vs-list').hidden = true; $('#vs-play').hidden = false; $('#vs-q').textContent = v.q;
    setMedal($('#vs-ma'), v.a, this.A.short[0]); setMedal($('#vs-mb'), v.b, this.B.short[0]); $('#vs-na').textContent = this.A.short; $('#vs-nb').textContent = this.B.short;
    $('#vs-vote').hidden = true; $('#vs-end').hidden = true; $('#vs-next').hidden = false; $('#vs-back').hidden = false; this.turn();
  },
  turn() {
    const gen = ++this.gen; const [who, text] = this.v.turns[this.i]; const d = who === 'a' ? this.A : this.B;
    $('#vs-sa').classList.toggle('on', who === 'a'); $('#vs-sb').classList.toggle('on', who === 'b');
    $('#vs-who').textContent = d.short; $('#vs-text').textContent = text; $('#vs-step').textContent = `${this.i + 1} de ${this.v.turns.length}`;
    $('#vs-next').textContent = this.i < this.v.turns.length - 1 ? 'Siguiente' : '¿Quién te convence?';
    // frase a frase, con la voz de cada pensador
    const parts = narrSplit(text); let k = 0;
    const say = () => { if (gen !== this.gen) return; if (k >= parts.length) return setTimeout(() => { if (gen === this.gen) this.next(true); }, 700); Voice.utter(parts[k++], { data: d, boss: !!d.boss }, 1, say); };
    say();
  },
  next(auto) {
    if (this.i < this.v.turns.length - 1) { this.i++; this.turn(); return; }
    if (auto && !$('#vs-vote').hidden) return;
    this.gen++; Voice.stop(); $('#vs-sa').classList.remove('on'); $('#vs-sb').classList.remove('on');
    $('#vs-who').textContent = ''; $('#vs-text').textContent = 'Escuchaste a los dos. No hay respuesta correcta: ¿quién te convence más?'; $('#vs-step').textContent = '';
    $('#vs-next').hidden = true; const box = $('#vs-vote'); box.hidden = false; box.innerHTML = '';
    for (const [label, pick] of [[this.A.short, this.A.short], [this.B.short, this.B.short], ['Los dos tienen parte de razón', '']]) {
      const b = document.createElement('button'); b.className = 'btn' + (pick ? ' primary' : ' ghost'); b.textContent = pick ? `Me convence ${label}` : label; b.addEventListener('click', () => { Audio.click(); this.vote(pick); }); box.appendChild(b);
    }
  },
  vote(pick) {
    const v = this.v; const first = !this.voted(v);
    xpRecord('vs-' + v.id, `Debate: ${this.A.short} y ${this.B.short}`, pick ? 'Me convence ' + pick : 'Los dos tienen parte de razón');
    if (pick && v.eje && typeof mapaAviso === 'function') mapaAviso(v.eje);
    $('#vs-vote').hidden = true; $('#vs-back').hidden = true; const end = $('#vs-end'); end.hidden = false;
    $('#vs-end-t').textContent = (pick ? `Elegiste a ${pick}. ` : 'Elegiste quedarte con algo de cada uno. ') + v.cierre;
    if (first) { try { addScore(60); } catch (e) { /* fuera de una partida */ } toast('+60 sabiduría · tu elección quedó en el Cuaderno y mueve tu mapa filosófico.'); }
    achieve('versus'); if (VERSUS.every((x) => this.voted(x))) achieve('versus8'); Mision.hit('versus');
  },
};
on('#b-versus', () => Versus.open());
on('#vs-x', () => Versus.close());
on('#vs-back', () => Versus.list());
on('#vs-next', () => Versus.next(false));
on('#vs-more', () => Versus.list());
on('#vs-done', () => Versus.close());

// ---------------------------------------------------------------- misiones diarias y racha
const MISION_KEY = 'odisea-razon.misiones';
const MISIONES = [
  ['duelo', 'Vence a un pensador en un debate', 1], ['dialogo', 'Supera un diálogo socrático («Dialoguemos»)', 1], ['leccion', 'Escucha una lección completa', 1],
  ['lugar', 'Descubre dos lugares', 2], ['agora', 'Vota en la pregunta del día de una época', 1], ['libro', 'Estudia un libro y responde su pregunta', 1],
  ['xp', 'Vive un experimento filosófico', 1], ['foto', 'Sácate una foto con un pensador', 1], ['cuaderno', 'Escribe una respuesta en tu cuaderno', 1],
  ['versus', 'Mira un debate entre pensadores y elige', 1], ['oraculo', 'Consulta al Oráculo de hoy', 1],
];
// logros que cuentan como avance de una misión (achieve se llama cada vez, no solo la primera)
const MISION_LOGRO = { primer: 'duelo', dialogo: 'dialogo', discipulo: 'leccion', agora: 'agora', lector: 'libro', foto: 'foto', cuaderno: 'cuaderno',
  sisifo: 'xp', giges: 'xp', teseo: 'xp', cogito: 'xp', rio: 'xp', mariposa: 'xp', tranvia: 'xp', china: 'xp', maquina: 'xp', escalera: 'xp', salida: 'xp' };
const Mision = {
  day(off = 0) { const d = new Date(Date.now() + off * 864e5); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; },
  st() { let s = store.get(MISION_KEY, null); if (!s || typeof s !== 'object') s = { day: '', n: {}, full: false, streak: 0, last: '' }; if (s.day !== this.day()) { s.day = this.day(); s.n = {}; s.full = false; } return s; },
  streak(s = this.st()) { return s.last === this.day() || s.last === this.day(-1) ? s.streak : 0; },
  today() { // tres misiones distintas, las mismas para todos ese día
    const r = mulberry32(Juntos.hash('m' + this.day())); const idx = MISIONES.map((_, i) => i); for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
    return idx.slice(0, 3).map((i) => MISIONES[i]);
  },
  hit(type) {
    const s = this.st(); const m = this.today().find((x) => x[0] === type); if (!m || (s.n[type] || 0) >= m[2]) return;
    s.n[type] = (s.n[type] || 0) + 1; const T = this.today(); const done = T.filter((x) => (s.n[x[0]] || 0) >= x[2]).length;
    if (s.n[type] >= m[2]) { try { addScore(80); } catch (e) { /* fuera de una partida */ } toast(`🎯 Misión cumplida: ${m[1]} (${done} de 3) · +80`); }
    if (done === 3 && !s.full) {
      s.full = true; s.streak = s.last === this.day(-1) ? s.streak + 1 : 1; s.last = this.day();
      try { addScore(200); } catch (e) { /* fuera de una partida */ }
      setTimeout(() => toast(`🔥 ¡Las tres misiones de hoy! +200 · Racha: ${s.streak} ${s.streak === 1 ? 'día' : 'días'}. Vuelve mañana para seguirla.`), 1200);
      achieve('mision'); if (s.streak >= 3) achieve('racha3'); if (s.streak >= 7) achieve('racha7');
    }
    store.set(MISION_KEY, s); this.paint();
  },
  paint() {
    const s = this.st(); const T = this.today(); const done = T.filter((x) => (s.n[x[0]] || 0) >= x[2]).length; const k = this.streak(s);
    const b = $('#b-mis-s'); if (b) b.textContent = `${done} de 3 hoy${k ? ` · 🔥 ${k} ${k === 1 ? 'día' : 'días'}` : ''}`;
    const box = $('#mis-items'); if (!box || $('#mis').hidden) return; box.innerHTML = '';
    for (const [type, text, n] of T) { const ok = (s.n[type] || 0) >= n; const r = document.createElement('div'); r.className = 'mis-row' + (ok ? ' ok' : ''); r.innerHTML = '<i></i><span></span><small></small>'; r.querySelector('i').textContent = ok ? '✓' : '○'; r.querySelector('span').textContent = text; r.querySelector('small').textContent = n > 1 ? `${Math.min(n, s.n[type] || 0)}/${n}` : '+80'; box.appendChild(r); }
    $('#mis-streak').textContent = k ? `🔥 Racha: ${k} ${k === 1 ? 'día seguido' : 'días seguidos'}.${s.full ? ' Hoy ya está completo: vuelve mañana.' : ' Completa las tres de hoy para no perderla.'}` : 'Completa las tres misiones para empezar una racha. A los 3 y a los 7 días seguidos ganas una túnica y un accesorio para tu avatar.';
  },
  open() { Panel.open('mis'); this.paint(); },
};
{ const a0 = achieve; achieve = function (id) { a0(id); try { const t = MISION_LOGRO[id]; if (t) Mision.hit(t); } catch (e) { /* nada */ } }; }
on('#b-mis', () => Mision.open());
on('#mis-x', () => Panel.close('mis'));
setTimeout(() => Mision.paint(), 700);

// ---------------------------------------------------------------- línea de tiempo
const TL_ROWS = [
  ['Grecia y Roma', ['presocraticos', 'atenas', 'helenismo']], ['Europa', ['medieval', 'renacimiento', 'modernidad', 'xix', 'contemporanea', 'vikingos']],
  ['Mesopotamia, Persia e islam', ['sumer', 'persia', 'islam']], ['India, China y Japón', ['india', 'china', 'japon']], ['África', ['africa']],
  ['América', ['latinoamerica', 'mexicas', 'incas', 'mapuche']], ['Poesía y ciencia', ['poetas', 'ciencia']], ['Fe y duda', ['ateos', 'teistas']], ['Pensadoras y justicia', ['pensadoras', 'justicia']], ['Místicos', ['misticos']], ['Mente y Tierra', ['mente', 'tierra']], ['Números', ['numeros']], ['Arte y pueblos', ['belleza', 'pueblos']], ['Cuidados', ['cuidado']], ['Falacias', ['falacias']], ['Cosmos', ['cosmos']],
];
const Tiempo = {
  list: null, sel: null,
  roman(s) { const V = { I: 1, V: 5, X: 10, L: 50 }; let n = 0; for (let i = 0; i < s.length; i++) { const a = V[s[i]], b = V[s[i + 1]] || 0; n += a < b ? -a : a; } return n; },
  // «c. 535 – 475 a.C.», «siglo VI a.C.», «1596 – 1650»… → [nacimiento, muerte] (negativo = a. C.)
  parse(t) {
    const bc = (x) => /a\.\s?C\./.test(x); const parts = t.split('–').map((x) => x.trim()); const lastBc = bc(parts[parts.length - 1]);
    const one = (x, i) => {
      const neg = bc(x) || (lastBc && !/d\.\s?C\./.test(x)); const c = x.match(/siglo\s+([IVXL]+)/i);
      if (c) { const n = this.roman(c[1].toUpperCase()); return neg ? [-n * 100, -(n - 1) * 100] : [(n - 1) * 100, n * 100]; }
      const m = x.match(/\d{1,4}/); if (!m) return null; const y = +m[0] * (neg ? -1 : 1); return [y, y];
    };
    const a = one(parts[0], 0); if (!a) return null; const b = parts[1] ? one(parts[1], 1) : null;
    if (b) return [a[0], b[1]]; if (a[0] !== a[1]) return a; return [a[0], a[0] + 60];
  },
  x(y) { const seg = [[-2750, 0.1], [-800, 0.9], [500, 0.45], [1400, 1.5], [2030, 0]]; let px = 30; for (let i = 0; i < seg.length - 1; i++) { const [y0, k] = seg[i], y1 = seg[i + 1][0]; if (y <= y0) break; px += (Math.min(y, y1) - y0) * k; } return px; },
  label(y) { return y < 0 ? `${-y} a. C.` : String(y); },
  build() {
    if (this.list) return; this.list = [];
    ERAS.forEach((e, idx) => { const row = TL_ROWS.findIndex((r) => r[1].includes(e.id)); if (row < 0) return; for (const d of e.sages) { const span = this.parse(d.dates || ''); if (span) this.list.push({ d, era: e, idx, row, a: span[0], b: span[1] }); } });
    this.list.sort((p, q) => p.a - q.a);
    const W = this.x(2030) + 40; const body = $('#tl-body'); body.innerHTML = ''; body.style.width = W + 'px';
    const axis = document.createElement('div'); axis.className = 'tl-axis'; body.appendChild(axis);
    for (const y of [-2500, -1500, -700, -600, -500, -400, -300, -200, -100, 1, 100, 200, 300, 400, 600, 800, 1000, 1200, 1400, 1500, 1600, 1700, 1800, 1900, 2000]) { const t = document.createElement('span'); t.style.left = this.x(y) + 'px'; t.textContent = this.label(y); axis.appendChild(t); const ln = document.createElement('i'); ln.className = 'tl-line'; ln.style.left = this.x(y) + 'px'; body.appendChild(ln); }
    TL_ROWS.forEach(([name], r) => {
      const row = document.createElement('div'); row.className = 'tl-row'; const h = document.createElement('b'); h.className = 'tl-rname'; h.textContent = name; row.appendChild(h);
      const lanes = [];
      for (const p of this.list.filter((q) => q.row === r)) {
        const x0 = this.x(p.a), w = Math.max(84, p.d.short.length * 7.4 + 34); let lane = lanes.findIndex((end) => end + 6 < x0); if (lane < 0) { lane = lanes.length; lanes.push(0); } lanes[lane] = x0 + w;
        const c = document.createElement('button'); c.className = 'tl-chip'; c.style.left = x0 + 'px'; c.style.top = 22 + lane * 30 + 'px'; c.style.width = w + 'px'; c.innerHTML = '<i class="medal"></i><span></span>';
        setMedal(c.querySelector('.medal'), p.d.id, p.d.short[0]); c.querySelector('span').textContent = p.d.short; c.addEventListener('click', () => { Audio.click(); this.pick(p); }); p.el = c; row.appendChild(c);
        const bar = document.createElement('i'); bar.className = 'tl-life'; bar.style.left = x0 + 'px'; bar.style.top = 22 + lane * 30 + 26 + 'px'; bar.style.width = Math.max(4, this.x(p.b) - x0) + 'px'; row.appendChild(bar);
      }
      row.style.height = 30 + Math.max(1, lanes.length) * 30 + 'px'; body.appendChild(row);
    });
  },
  open() { Panel.open('tl'); this.build(); if (!this.sel) { const p = this.list.find((q) => q.d.id === 'socrates') || this.list[0]; this.pick(p, true); } },
  pick(p, scroll) {
    this.sel = p; const same = this.list.filter((q) => q !== p && q.a <= p.b && q.b >= p.a);
    for (const q of this.list) { q.el.classList.toggle('on', q === p); q.el.classList.toggle('same', same.includes(q)); q.el.classList.toggle('dim', q !== p && !same.includes(q)); }
    setMedal($('#tl-medal'), p.d.id, p.d.short[0]); $('#tl-name').textContent = p.d.name; $('#tl-meta').textContent = `${p.d.dates} · ${p.era.name}`;
    const other = same.filter((q) => q.row !== p.row); const near = same.filter((q) => q.row === p.row);
    const fmt = (L) => { const g = new Map(); for (const q of L.slice(0, 9)) g.set(q.era.name, [...(g.get(q.era.name) || []), q.d.short]); return [...g].map(([era, names]) => `${names.join(', ')} (${era})`).join('; '); };
    $('#tl-same').textContent = other.length ? `Al mismo tiempo, en otros lugares del mundo: ${fmt(other)}.` : near.length ? `En su misma época y región: ${fmt(near)}.` : 'No hay en el juego otro pensador de su mismo tiempo.';
    if (scroll) { const sc = $('#tl-scroll'); sc.scrollLeft = Math.max(0, this.x(p.a) - sc.clientWidth / 2 + 40); sc.scrollTop = Math.max(0, p.el.parentNode.offsetTop + p.el.offsetTop - sc.clientHeight / 2); }
    achieve('tiempo');
  },
  lesson() { const p = this.sel; if (!p) return; const inPlay = Panel.from.tl; Panel.close('tl'); if (!inPlay) Lesson.open(p.d, null); else toast(`Busca a ${p.d.short} en «${p.era.name}» para escuchar su lección.`); },
};
on('#b-tiempo', () => Tiempo.open());
on('#tl-x', () => Panel.close('tl'));
on('#tl-lesson', () => Tiempo.lesson());
for (const id of ['vs', 'mis', 'tl']) window.addEventListener('keydown', (e) => { if (e.code === 'Escape' && !$('#' + id).hidden) { e.stopPropagation(); if (id === 'vs') Versus.close(); else Panel.close(id); } }, true);
