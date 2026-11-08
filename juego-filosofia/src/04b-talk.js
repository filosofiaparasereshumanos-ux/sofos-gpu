// ============================================================================
//  CONVERSACIONES CON LOS FILÓSOFOS Y LUGARES PARA DESCUBRIR
// ============================================================================
const TALK_KEY = 'odisea-razon.charlas', PLACES_KEY = 'odisea-razon.lugares';
const AI = { fn: null, tried: false, ok: true,
  async get() {
    if (this.tried) return this.fn; this.tried = true;
    try { if (window.claude && typeof window.claude.use === 'function') this.fn = await window.claude.use('sample'); } catch (e) { this.fn = null; }
    return this.fn;
  },
};
AI.get(); // se resuelve en segundo plano

const Talk = {
  sage: null, data: null, part: 1, turns: [], busy: false, ctl: null,
  open(sage) {
    this.sage = sage; this.data = sage.data; this.part = 1; this.turns = [];
    G.state = 'talk'; unlockPointer(); input.fire = false; input.auto = false; input.keys = {}; input.walk = null;
    $('#hud').hidden = true; $('#touch').hidden = true; Duel.sage = sage; sage.gesture = 1;
    $('#tk-medal').textContent = this.data.short[0]; $('#tk-name').textContent = this.data.name; $('#tk-meta').textContent = `${this.data.epithet} · ${this.data.dates}`;
    $('#tk-ask').hidden = true; $('#talk').hidden = false;
    const talked = new Set(store.get(TALK_KEY, [])); const first = !talked.has(this.data.id); talked.add(this.data.id); store.set(TALK_KEY, [...talked]);
    if (talked.size >= 10) achieve('conversador');
    this.say(first ? this.greeting() : 'Me alegra verte de nuevo. ¿De qué quieres que hablemos?');
    this.options();
    Lesson.duck && Lesson.duck(true);
  },
  greeting() {
    const d = this.data;
    if (this.sage.state === 'defeated') return `Ya me venciste en buena lid. Aun así, sigo encantado de conversar contigo.`;
    if (this.sage.state === 'sealed') return `${d.intro} Antes de debatir conmigo, habla con los demás pensadores de esta época.`;
    return d.intro;
  },
  say(text, opts = {}) {
    const el = $('#tk-text'); el.textContent = text; el.classList.toggle('thinking', !!opts.thinking);
    if (!opts.silent) Voice.say(text, this.sage);
    this.sage.gesture = 1;
  },
  options() {
    const s = this.sage, d = this.data; const parts = LESSONS[d.id] || [];
    const ops = [];
    ops.push(['¿Quién eres?', () => this.say(parts[0] || d.intro)]);
    ops.push(['¿Cuál es tu gran idea?', () => this.say(`Mi idea central se resume así: ${d.concept.name}. ${d.concept.text}`)]);
    ops.push([this.part < parts.length ? 'Cuéntame más' : 'Vuelve a empezar', () => { if (this.part >= parts.length) this.part = 1; this.say(parts[this.part++] || ''); this.options(); }]);
    ops.push(['Escuchar tu lección completa', () => { this.close(true); Lesson.open(d, s); }]);
    if (AI.fn !== null && AI.ok) ops.push(['Preguntarte lo que quiera', () => this.openAsk(), 'ai']);
    if (s.state === 'idle') ops.push([s.boss ? 'Te desafío: soy digno de ti' : 'Te desafío a un debate', () => { this.close(true); Duel.start(s); }, 'duel']);
    ops.push(['Adiós', () => this.close(), 'bye']);
    const box = $('#tk-ops'); box.innerHTML = '';
    for (const [label, fn, cls] of ops) { const b = document.createElement('button'); b.className = 'tk-op' + (cls ? ' ' + cls : ''); b.textContent = label; b.addEventListener('click', () => { Audio.click(); fn(); }); box.appendChild(b); }
  },
  openAsk() {
    $('#tk-ask').hidden = false; const inp = $('#tk-in'); inp.value = ''; inp.focus({ preventScroll: true });
    $('#tk-hint').textContent = `Escribe tu pregunta para ${this.data.short}. Te responderá en personaje con la IA de Claude.`;
  },
  rules() {
    const d = this.data; const parts = (LESSONS[d.id] || []).join(' ');
    return `Interpreta a ${d.name} (${d.dates}), conocido como «${d.epithet}», en un juego educativo de filosofía para estudiantes y público general. ` +
      `Responde SIEMPRE en español, en primera persona, como ${d.short}, con tono cálido, claro y didáctico, en un máximo de 90 palabras y sin listas ni títulos. ` +
      `Sé fiel a lo que históricamente pensó y vivió. Si te preguntan por algo posterior a tu época, reacciona con curiosidad desde tu propio pensamiento y aclara que no lo conociste. ` +
      `Si no sabes algo o no hay datos fiables, dilo con honestidad en lugar de inventar. Si la pregunta es ofensiva o no tiene que ver, reconduce con amabilidad hacia la filosofía. ` +
      `Puedes terminar a veces con una pregunta breve al visitante para hacerle pensar.\n\nResumen de tu pensamiento (para tu referencia): ${parts}`;
  },
  async ask() {
    const q = $('#tk-in').value.trim(); if (!q || this.busy) return;
    const fn = await AI.get(); if (!fn) { this.say('Ahora mismo no puedo escuchar preguntas libres. Elige uno de los temas.', { silent: true }); return; }
    this.busy = true; $('#tk-send').disabled = true; $('#tk-in').value = '';
    this.turns.push({ role: 'user', content: q });
    const turns = this.turns.slice(-7); if (turns[0].role !== 'user') turns.shift();
    const input = turns.map((t, i) => (i === 0 ? { role: 'user', content: this.rules() + '\n\nPregunta del visitante: ' + t.content } : t));
    $('#tk-you').textContent = 'Tú: ' + q; this.say('Pensando…', { silent: true, thinking: true });
    this.ctl = new AbortController();
    try {
      const { text } = await fn(input, { modelTier: 'quick', cache: false, signal: this.ctl.signal, onText: ({ text }) => { $('#tk-text').textContent = text; $('#tk-text').classList.remove('thinking'); } });
      this.turns.push({ role: 'assistant', content: text }); this.say(text);
      const n = Stats.add('preguntas'); if (n >= 5) achieve('socratico');
    } catch (e) {
      const msg = { not_granted: 'Sin tu permiso para usar a Claude no puedo responder preguntas libres. Elige uno de los temas.', rate_limited: 'Demasiadas preguntas seguidas: espera un momento y vuelve a intentarlo.', cancelled: '' }[e && e.code];
      if (e && e.code === 'not_granted') AI.ok = false;
      if (msg !== '') this.say(msg || 'No he podido pensar una respuesta ahora. Inténtalo de nuevo en un momento.', { silent: true });
      this.turns.pop(); this.options();
    } finally { this.busy = false; $('#tk-send').disabled = false; }
  },
  close(keepState) {
    if (this.ctl) this.ctl.abort(); Voice.stop(); $('#talk').hidden = true; $('#tk-you').textContent = '';
    if (Lesson.duck) Lesson.duck(false);
    if (keepState) return;
    Duel.sage = null; G.state = 'play'; $('#hud').hidden = false; if (IS_TOUCH) $('#touch').hidden = false;
    camera.fov = baseFov(); camera.updateProjectionMatrix(); lockPointer(); updateHud();
  },
  update(dt) { Lesson.sage = this.sage; Lesson.update(dt); },
};
$('#tk-send').addEventListener('click', () => Talk.ask());
$('#tk-in').addEventListener('keydown', (e) => { e.stopPropagation(); if (e.key === 'Enter') { e.preventDefault(); Talk.ask(); } });
$('#tk-x').addEventListener('click', () => { Audio.click(); Talk.close(); });

// ---------- lugares
const Places = {
  poi: null,
  found() { return new Set(store.get(PLACES_KEY, [])); },
  open(poi) {
    this.poi = poi; G.state = 'place'; unlockPointer(); input.keys = {}; input.auto = false; input.walk = null;
    $('#hud').hidden = true; $('#touch').hidden = true;
    $('#pl-era').textContent = `${ERAS[world.idx].num} · ${ERAS[world.idx].name}`;
    $('#pl-name').textContent = poi.name; $('#pl-text').textContent = poi.text; $('#pl-fact').textContent = poi.fact;
    const first = !this.found().has(poi.id);
    $('#pl-rew').textContent = first ? '+1 fragmento de sabiduría · +50 de sabiduría' : 'Ya lo habías descubierto';
    $('#place').hidden = false; Voice.say(poi.name + '. ' + poi.text, null);
    if (first) {
      const f = this.found(); f.add(poi.id); store.set(PLACES_KEY, [...f]);
      G.frags++; addScore(50); Audio.pickup(); buzz([15, 30]);
      if (f.size >= 8) achieve('explorador'); if (f.size >= POIS.flat().length) achieve('viajero');
    }
    markPoiFound(poi);
  },
  close() { Voice.stop(); $('#place').hidden = true; G.state = 'play'; $('#hud').hidden = false; if (IS_TOUCH) $('#touch').hidden = false; lockPointer(); updateHud(); },
};
$('#pl-ok').addEventListener('click', () => { Audio.click(); Places.close(); });
$('#pl-read').addEventListener('click', () => { const p = Places.poi; if (p) Voice.utter ? Voice.utter(p.text + ' ' + p.fact, null, 1, null) : Voice.say(p.text + ' ' + p.fact, null); });
window.addEventListener('keydown', (e) => {
  if (G.state === 'place' && (e.code === 'Enter' || e.code === 'Escape' || e.code === 'Space')) { e.preventDefault(); Places.close(); }
  else if (G.state === 'talk' && e.code === 'Escape') Talk.close();
});
