// ============================================================================
//  ¿QUÉ DIRÍA…? Una pregunta de hoy, respondida a la vez por pensadores de
//  épocas y culturas distintas (con la IA de Claude, en la versión publicada).
// ============================================================================
const QD_QUESTIONS = [
  '¿Qué opinas de las redes sociales?', '¿Qué es la felicidad?', '¿Deberíamos temer a la inteligencia artificial?', '¿Es justo que haya ricos y pobres?',
  '¿Qué deberíamos hacer frente al cambio climático?', '¿Para qué sirve estudiar?', '¿Qué es un buen amigo?', '¿Está bien mentir alguna vez?',
  '¿Tienen derechos los animales?', '¿Qué es el amor?', '¿Hay que obedecer siempre las leyes?', '¿Qué es la libertad?',
  '¿Tiene sentido la vida?', '¿Por qué tenemos miedo a la muerte?', '¿Qué es más importante: ser feliz o ser bueno?', '¿Cómo debería ser la escuela ideal?',
  '¿Es bueno pasar tantas horas con el móvil?', '¿Qué significa ser una buena persona?', '¿Puede una máquina pensar?', '¿Qué es la belleza?',
  '¿Hay que perdonar siempre?', '¿Somos iguales mujeres y hombres?', '¿Qué le debemos a las generaciones futuras?', '¿Es posible conocer la verdad?',
  '¿Qué hacemos con la soledad?', '¿Para qué sirve la filosofía?', '¿Qué es la justicia?', '¿Cómo deberíamos tratar a los migrantes?',
  '¿Existe el destino o somos libres?', '¿Qué haría con un millón de euros un sabio?',
];
const QD_KEY = 'odisea-razon.quediria';
const QD = {
  picks: [], busy: false, ctl: null, last: null, from: 'title',
  all() { return ERAS.flatMap((e, ei) => e.sages.map((s) => ({ s, ei }))); },
  find(id) { return this.all().find((x) => x.s.id === id); },
  todayQuestion() { return QD_QUESTIONS[(Oracle.number() % QD_QUESTIONS.length + QD_QUESTIONS.length) % QD_QUESTIONS.length]; },
  // cuatro voces variadas: épocas y culturas distintas, al menos una mujer si es posible
  surprise() {
    const byEra = shuffle([...ERAS.keys()]).slice(0, 4);
    let picks = byEra.map((ei) => ({ s: ERAS[ei].sages[Math.floor(Math.random() * ERAS[ei].sages.length)], ei }));
    const women = ['teano', 'hipatia', 'hildegarda', 'pizan', 'beauvoir', 'arendt', 'sorjuana', 'castellanos', 'macuilxochitzin', 'janequeo', 'machi', 'banzhao', 'gargi', 'maathai'];
    if (!picks.some((p) => women.includes(p.s.id))) { const w = shuffle(women.map((id) => this.find(id)).filter((x) => x && !picks.slice(0, 3).some((p) => p.ei === x.ei)))[0]; if (w) picks[3] = w; }
    picks.sort((a, b) => a.ei - b.ei);
    this.picks = picks; this.renderPicks();
  },
  open(question, from = 'title') {
    this.from = from; G.prevScreen = from;
    if (!this.picks.length) this.surprise(); else this.renderPicks();
    $('#qd-in').value = question || ''; $('#qd-out').innerHTML = ''; $('#qd-share').hidden = true; $('#qd-list').hidden = true;
    $('#qd-sugg').innerHTML = '';
    const today = this.todayQuestion();
    for (const q of [today, ...shuffle(QD_QUESTIONS.filter((x) => x !== today)).slice(0, 4)]) {
      const b = document.createElement('button'); b.className = 'chip' + (q === today ? ' today' : ''); b.textContent = (q === today ? 'Pregunta de hoy · ' : '') + q;
      b.addEventListener('click', () => { Audio.click(); $('#qd-in').value = q; }); $('#qd-sugg').appendChild(b);
    }
    show('qd');
    $('#qd-note').textContent = AI.fn ? '' : 'Esta función usa la IA de Claude en la versión publicada del juego. Si no está disponible, cada pensador responderá con su idea central.';
  },
  renderPicks() {
    const box = $('#qd-picks'); box.innerHTML = '';
    for (const p of this.picks) {
      const c = document.createElement('span'); c.className = 'pick'; c.innerHTML = '<b></b><small></small><button aria-label="Quitar">✕</button>';
      c.querySelector('b').textContent = p.s.short; c.querySelector('small').textContent = ERAS[p.ei].name;
      c.querySelector('button').addEventListener('click', () => { Audio.click(); this.picks = this.picks.filter((x) => x !== p); this.renderPicks(); });
      box.appendChild(c);
    }
    $('#qd-add').textContent = this.picks.length >= 4 ? 'Cambiar pensadores' : 'Elegir pensadores';
  },
  renderList() {
    const box = $('#qd-list'); box.innerHTML = ''; box.hidden = false;
    ERAS.forEach((e, ei) => {
      const h = document.createElement('h4'); h.textContent = `${e.num} · ${e.name}`; box.appendChild(h);
      const row = document.createElement('div'); row.className = 'qd-row';
      for (const s of e.sages) {
        const on = this.picks.some((p) => p.s === s);
        const b = document.createElement('button'); b.className = 'chip' + (on ? ' on' : ''); b.textContent = s.short;
        b.addEventListener('click', () => {
          Audio.click();
          if (on) this.picks = this.picks.filter((p) => p.s !== s); else if (this.picks.length < 4) this.picks.push({ s, ei }); else return toast('Puedes elegir hasta cuatro pensadores.');
          this.renderPicks(); this.renderList();
        });
        row.appendChild(b);
      }
      box.appendChild(row);
    });
  },
  card(p) {
    const c = document.createElement('article'); c.className = 'qd-card';
    c.innerHTML = '<header><span class="medal"></span><div><h4></h4><small></small></div></header><p class="qd-text thinking">Pensando…</p><footer><button class="mini-b qd-lesson">Escuchar su lección</button></footer>';
    c.querySelector('.medal').textContent = p.s.short[0]; c.querySelector('h4').textContent = p.s.name; c.querySelector('small').textContent = `${ERAS[p.ei].name} · ${p.s.dates}`;
    c.querySelector('.qd-lesson').addEventListener('click', () => { Audio.init(); this.stop(); Lesson.open(p.s, null); });
    return c;
  },
  rules(q) {
    const who = this.picks.map((p) => `[[${p.s.id}]] ${p.s.name} (${p.s.dates}; ${ERAS[p.ei].name}). Su idea central: ${p.s.concept.name}: ${p.s.concept.text}`).join('\n');
    return `Eres el guionista de un juego educativo de filosofía para estudiantes y público general. Un visitante hace esta pregunta: «${q}».\n\n` +
      `Responde como lo harían los siguientes pensadores, cada uno en primera persona, en español, con su propio estilo y fiel a lo que históricamente pensó y vivió. ` +
      `Si el tema es posterior a su época, que razone desde sus ideas y lo diga con naturalidad (por ejemplo: «en mi tiempo no existía…, pero…»). ` +
      `Cada respuesta debe tener entre 45 y 75 palabras, sin listas ni títulos, y terminar con una idea clara que haga pensar. Que las respuestas sean distintas entre sí; si sus ideas chocan, que se note, incluso que alguno responda a otro. ` +
      `No inventes citas literales ni datos: si no hay información fiable, que hablen desde su pensamiento general. Si alguien habla como portavoz de una tradición (por ejemplo, la machi o el kimche), que hable en nombre de esa tradición, no como una persona concreta. ` +
      `Si la pregunta es ofensiva, violenta o no tiene que ver, que reconduzcan con amabilidad hacia una pregunta filosófica.\n\n` +
      `Formato obligatorio: para cada pensador, una línea con su marca exacta (por ejemplo [[socrates]]) y debajo su respuesta. No escribas nada más.\n\nPensadores:\n${who}`;
  },
  parse(text) { const out = {}; const re = /\[\[([a-z0-9_]+)\]\]\s*/g; let m, last = null, idx = 0; while ((m = re.exec(text))) { if (last) out[last] = text.slice(idx, m.index).trim(); last = m[1]; idx = re.lastIndex; } if (last) out[last] = text.slice(idx).trim(); return out; },
  async ask() {
    const q = $('#qd-in').value.replace(/\s+/g, ' ').trim().slice(0, 240);
    if (!q) { $('#qd-in').focus(); return toast('Escribe una pregunta o elige una de las sugerencias.'); }
    if (!this.picks.length) this.surprise();
    if (this.busy) return;
    $('#qd-list').hidden = true;
    const out = $('#qd-out'); out.innerHTML = ''; $('#qd-share').hidden = true;
    const qh = document.createElement('h3'); qh.className = 'qd-q'; qh.textContent = '«' + q + '»'; out.appendChild(qh);
    const cards = {}; for (const p of this.picks) { cards[p.s.id] = this.card(p); out.appendChild(cards[p.s.id]); }
    out.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const fill = (map, final) => {
      for (const p of this.picks) { const t = map[p.s.id]; const el = cards[p.s.id].querySelector('.qd-text'); if (t) { el.textContent = t; el.classList.remove('thinking'); } else if (final) { el.textContent = this.fallback(p); el.classList.remove('thinking'); } }
    };
    const fn = await AI.get();
    this.last = { q, picks: [...this.picks], answers: {} };
    if (!fn || !AI.ok) { const map = {}; for (const p of this.picks) map[p.s.id] = this.fallback(p); fill(map, true); this.last.answers = map; this.done(); return; }
    this.busy = true; $('#qd-go').disabled = true; $('#qd-go').textContent = 'Pensando…';
    this.ctl = new AbortController();
    try {
      const { text } = await fn([{ role: 'user', content: this.rules(q) }], { modelTier: 'quick', cache: false, signal: this.ctl.signal, onText: ({ text: t }) => fill(this.parse(t), false) });
      const map = this.parse(text); fill(map, true); this.last.answers = map;
      const n = Stats.add('quediria'); achieve('quediria'); if (n >= 10) achieve('quediria10');
      const hist = store.get(QD_KEY, []); hist.unshift({ q, ids: this.picks.map((p) => p.s.id), t: Date.now() }); store.set(QD_KEY, hist.slice(0, 30));
    } catch (e) {
      if (e && e.code === 'not_granted') AI.ok = false;
      const map = {}; for (const p of this.picks) map[p.s.id] = this.fallback(p); fill(map, true); this.last.answers = map;
      if (e && e.code !== 'cancelled') toast(e && e.code === 'rate_limited' ? 'Demasiadas preguntas seguidas: espera un momento.' : 'No he podido consultar a los pensadores ahora: te muestro su idea central.');
    } finally { this.busy = false; $('#qd-go').disabled = false; $('#qd-go').textContent = 'Preguntar a los pensadores'; this.done(); }
  },
  fallback(p) { return `No puedo pensar tu pregunta ahora mismo, pero esta es mi idea central: ${p.s.concept.name}. ${p.s.concept.text}`; },
  done() {
    const L = this.last; if (!L) return;
    const cut = (t) => { t = String(t || '').replace(/\s+/g, ' '); return t.length > 150 ? t.slice(0, 147).replace(/\s\S*$/, '') + '…' : t; };
    $('#qd-sharetext').value = `¿Qué dirían los filósofos? «${L.q}»\n\n` + L.picks.map((p) => `${p.s.short}: «${cut(L.answers[p.s.id])}»`).join('\n\n') + `\n\nPregúntales tú en Odisea de la Razón:\nhttps://claude.ai/artifact/5C4Rz4jpDYiEaEYcdbUJew`;
    $('#qd-share').hidden = false; $('#qd-sharebtn').textContent = navigator.share ? 'Compartir estas respuestas' : 'Copiar para compartir';
  },
  stop() { if (this.ctl) this.ctl.abort(); },
};
$('#qd-go').addEventListener('click', () => { Audio.init(); Audio.click(); QD.ask(); });
$('#qd-in').addEventListener('keydown', (e) => { e.stopPropagation(); if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); QD.ask(); } });
$('#qd-dice').addEventListener('click', () => { Audio.click(); QD.surprise(); if (!$('#qd-list').hidden) QD.renderList(); });
$('#qd-add').addEventListener('click', () => { Audio.click(); if ($('#qd-list').hidden) QD.renderList(); else $('#qd-list').hidden = true; });
$('#qd-sharebtn').addEventListener('click', () => shareOrCopy($('#qd-sharetext').value, $('#qd-sharebtn'), $('#qd-sharetext')));
$('#qd-back').addEventListener('click', () => { Audio.click(); QD.stop(); show(QD.from === 'oracle-end' ? 'oracle-end' : 'title'); });
on('#b-qd', () => QD.open('', 'title'));
on('#b-oqd', () => QD.open(QD.todayQuestion(), 'oracle-end'));
