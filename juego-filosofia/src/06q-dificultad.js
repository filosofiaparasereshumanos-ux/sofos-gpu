// ============================================================================
//  DIFICULTAD DE LOS DEBATES: Fácil, Normal y Difícil cambian de verdad las
//  preguntas, no solo el tiempo.
//  · Fácil: las preguntas sobre la idea central de cada pensador, tres opciones,
//    más tiempo, menos argumentos para convencerlo y menos daño al fallar.
//  · Normal: todas las preguntas del pensador, cuatro opciones.
//  · Difícil: los detalles de su vida y obra, más preguntas nuevas sobre él
//    generadas con los datos del juego (su gran idea, cómo se le conoce, cuándo
//    vivió, qué obra escribió, si vivió antes o después que otro), poco tiempo,
//    más argumentos y más daño. Da más puntos.
//  Todas las preguntas de un debate son sobre el pensador con quien debates.
//  El Oráculo, los retos con enlace y la trivia en vivo no cambian: todos deben
//  responder las mismas preguntas para poder comparar.
// ============================================================================
const DIF = {
  facil: { name: 'Fácil', opts: 3, time: 34, conv: [2, 4, 5], dmg: 0.6, pts: 0.8 },
  normal: { name: 'Normal', opts: 4, time: 26, conv: [3, 5, 7], dmg: 1, pts: 1 },
  dificil: { name: 'Difícil', opts: 4, time: 17, conv: [4, 6, 8], dmg: 1.4, pts: 1.5 },
};
const Dif = {
  k() { return DIF[G.settings.trialDiff] ? G.settings.trialDiff : 'normal'; },
  c() { return DIF[this.k()]; },
  dmg() { return this.c().dmg; }, pts() { return this.c().pts; },
  // preguntas de detalle biográfico o de dato: van a Difícil
  DETAIL: /nació|naciste|ciudad|isla|país|año|edad|niñ|hij[oa]|herman|madre|padre|espos|muri|cárcel|desterr|disc[ií]pulo|maestro de|cuántos|cuántas|qué otro|qué emperador|qué rey|qué satélite|qué barco|qué premio|apodo|llamaron|nombre/i,
  split(q) {
    const core = [], detail = [];
    q.forEach((x, i) => ((i < Math.ceil(q.length * 0.55) && !this.DETAIL.test(x.q)) || (i === 0) ? core : detail).push(x));
    while (core.length < 3 && detail.length) core.push(detail.shift());
    while (detail.length < 3 && core.length > 3) detail.unshift(core.pop());
    return { core, detail };
  },
  all() { return ERAS.flatMap((e, ei) => e.sages.map((s) => ({ s, ei }))); },
  pickWrong(list, n, not) { return shuffle(list.filter((x) => !not.includes(x))).slice(0, n); },
  // ---- preguntas nuevas, correctas por construcción, siempre sobre el pensador con quien debates
  gen(s, ei, kind) {
    const A = this.all(), out = [];
    const others = A.filter((x) => x.s.id !== s.id);
    const uniq = (list, not) => [...new Set(list.filter((x) => x && !not.includes(x)))];
    // su gran idea
    if (s.concept) out.push({ q: `¿Cuál es la gran idea de ${s.short}?`, a: [s.concept.name, ...this.pickWrong(uniq(others.filter((x) => x.ei !== ei && x.s.concept).map((x) => x.s.concept.name), [s.concept.name]), kind === 'facil' ? 2 : 3, [s.concept.name])], e: s.concept.text.split('. ')[0] + '.' });
    if (kind === 'facil') return out;
    // cómo lo llaman
    if (s.epithet) out.push({ q: `¿Cómo se conoce a ${s.short}?`, a: [s.epithet, ...this.pickWrong(uniq(others.map((x) => x.s.epithet), [s.epithet]), 3, [s.epithet])], e: `${s.name}: ${s.epithet}.` });
    // cuándo vivió
    if (s.dates) out.push({ q: `¿Cuándo vivió ${s.short}?`, a: [s.dates, ...this.pickWrong(uniq(others.map((x) => x.s.dates), [s.dates]), 3, [s.dates])], e: `${s.name} vivió ${s.dates}.` });
    // sus libros
    for (const b of (typeof BOOKS !== 'undefined' ? BOOKS.flat() : []).filter((b) => b.author === s.id).slice(0, 2)) {
      const titles = uniq((typeof BOOKS !== 'undefined' ? BOOKS.flat() : []).filter((x) => x.author !== s.id).map((x) => x.title), [b.title]);
      out.push({ q: `¿Qué obra escribió ${s.short}?`, a: [b.title, ...this.pickWrong(titles, 3, [b.title])], e: `${b.title} (${b.year}), de ${b.by}.` });
    }
    // quién vivió antes, comparándolo con alguien de otra época
    if (typeof Tiempo !== 'undefined') {
      const me = Tiempo.parse(s.dates || ''); const cand = others.filter((x) => x.ei !== ei).map((x) => ({ x, t: Tiempo.parse(x.s.dates || '') })).filter((y) => y.t && me && Math.abs(y.t[0] - me[0]) > 150);
      for (const y of shuffle(cand).slice(0, 1)) out.push({ q: `¿${s.short} vivió antes o después que ${y.x.s.short}?`, a: [y.t[0] > me[0] ? 'Antes' : 'Después', y.t[0] > me[0] ? 'Después' : 'Antes', 'En el mismo año', 'Nunca existió'], e: `${s.short}: ${s.dates}. ${y.x.s.short}: ${y.x.s.dates}.` });
    }
    return out;
  },
  pool(sage) {
    const k = this.k(); if (sage._difK === k && sage._difQ) return sage._difQ;
    const d = sage.data, ei = Math.max(0, ERAS.findIndex((e) => e.sages.includes(d))); const { core, detail } = this.split(d.q || []);
    // solo preguntas sobre este pensador: las suyas, las de sus libros y las que se generan con sus datos
    const books = (typeof BOOKS !== 'undefined' ? BOOKS.flat() : []).filter((b) => b.author === d.id && b.q).map((b) => ({ ...b.q, place: b.title }));
    let qs;
    if (k === 'facil') qs = [...core, ...this.gen(d, ei, 'facil')];
    else if (k === 'dificil') qs = [...detail, ...books, ...this.gen(d, ei, 'dificil')];
    else qs = [...d.q, ...books];
    qs = qs.filter((q) => q && q.a && q.a.length >= 3 && new Set(q.a).size === q.a.length);
    sage._difK = k; sage._difQ = qs; sage._difOrder = shuffle([...qs.keys()]); sage._difPtr = 0;
    return qs;
  },
};
// el pensador pide su siguiente pregunta según la dificultad
Sage.prototype.nextQuestion = function () {
  const qs = Dif.pool(this);
  if (this._difPtr >= this._difOrder.length) { this._difOrder = shuffle([...qs.keys()]); this._difPtr = 0; }
  return qs[this._difOrder[this._difPtr++]];
};
{ // argumentos para convencerlo, tiempo y opciones
  const start0 = Duel.start.bind(Duel), ask0 = Duel.ask.bind(Duel);
  Duel.start = function (s) {
    const c = Dif.c(); const m = s.boss ? (s.data.final ? c.conv[2] : c.conv[1]) : c.conv[0];
    if (s._difConvK !== Dif.k()) { if (s.conv === s.maxConv || s.conv > m) s.conv = m; s.maxConv = m; s._difConvK = Dif.k(); }
    start0(s);
  };
  Duel.ask = function () {
    ask0(); const c = Dif.c();
    this.maxTime = Math.max(12, c.time - G.eraIdx * (Dif.k() === 'facil' ? 0.2 : 0.4) - (this.sage.boss ? 3 : 0)); this.time = this.maxTime; this.lastTick = Math.ceil(this.time);
    $('#d-qnum').textContent += ` · ${c.name}`;
    if (c.opts < 4) { const btns = $('#d-answers').children; const wrong = this.opts.map((o, i) => (o.ok ? -1 : i)).filter((i) => i >= 0); shuffle(wrong); for (const i of wrong.slice(0, 4 - c.opts)) { btns[i].hidden = true; btns[i].disabled = true; } let n = 0; for (const b of btns) if (!b.hidden) b.querySelector('.k').textContent = 'ABCD'[n++]; }
  };
}
// selector visible en la elección de época
{
  const box = document.createElement('div'); box.className = 'dif-pick'; box.innerHTML = '<span>Dificultad de los debates</span><div class="seg" id="tv-diff"><button data-v="facil">Fácil</button><button data-v="normal">Normal</button><button data-v="dificil">Difícil</button></div><small id="tv-diff-s"></small>';
  const h = document.querySelector('#travel h2'); if (h) h.after(box);
  const paint = () => { document.querySelectorAll('#tv-diff button').forEach((b) => b.classList.toggle('on', b.dataset.v === Dif.k()));
    const t = { facil: 'Preguntas sobre las grandes ideas, tres opciones y más tiempo.', normal: 'Todas las preguntas de cada pensador, cuatro opciones.', dificil: 'Detalles, libros, fechas y pensadores de otras épocas. Poco tiempo y más puntos.' }; $('#tv-diff-s').textContent = t[Dif.k()]; };
  document.querySelectorAll('#tv-diff button').forEach((b) => b.addEventListener('click', () => { G.settings.trialDiff = b.dataset.v; saveSettings(); syncSettings(); paint(); Audio.click(); }));
  document.querySelectorAll('#s-diff button').forEach((b) => b.addEventListener('click', () => setTimeout(paint, 0)));
  paint();
}
