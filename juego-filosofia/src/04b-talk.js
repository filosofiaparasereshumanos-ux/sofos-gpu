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

const QUEST_KEY = 'odisea-razon.encargos';
const questDone = (id) => store.get(QUEST_KEY, []).includes(id);
// ¿qué falta para poder responder al encargo?
function questNeeds(q) {
  const era = world ? world.idx : G.eraIdx; const out = [];
  const found = Places.found();
  for (const id of (q.needs && q.needs.pois) || []) { const p = (POIS[era] || []).find((x) => x.id === id) || POIS.flat().find((x) => x.id === id); out.push({ ok: found.has(id), label: 'Descubre <b>' + (p ? p.name : id) + '</b>' }); }
  for (const id of (q.needs && q.needs.npcs) || []) { const n = NPCS.flat().find((x) => x.id === id); out.push({ ok: n ? npcDone(n) : true, label: 'Escucha hasta el final a <b>' + (n ? n.name : id) + '</b>' + (n ? ', ' + n.role : '') + (n && !npcDone(n) ? ` (${Math.min(npcHeard(id), n.lines.length)}/${n.lines.length})` : '') }); }
  return out;
}
const Talk = {
  sage: null, data: null, npc: null, part: 1, anec: 0, turns: [], busy: false, ctl: null, mode: 'main',
  begin(who) {
    this.sage = who; this.turns = []; this.mode = 'main';
    G.state = 'talk'; unlockPointer(); input.fire = false; input.auto = false; input.keys = {}; input.walk = null;
    $('#hud').hidden = true; $('#touch').hidden = true; Duel.sage = who; who.gesture = 1;
    $('#tk-ask').hidden = true; $('#tk-quest').hidden = true; $('#tk-you').textContent = ''; $('#talk').hidden = false;
    Lesson.duck && Lesson.duck(true);
    Narr.prefetch(Voice.spk(who));
  },
  open(sage) {
    this.npc = null; this.data = sage.data; this.part = 1; this.anec = 0;
    this.begin(sage);
    setMedal($('#tk-medal'), this.data.id, this.data.short[0]); $('#tk-name').textContent = this.data.name; $('#tk-meta').textContent = `${this.data.epithet} · ${this.data.dates}`;
    const talked = new Set(store.get(TALK_KEY, [])); const first = !talked.has(this.data.id); talked.add(this.data.id); store.set(TALK_KEY, [...talked]);
    if (talked.size >= 10) achieve('conversador');
    this.say(first ? this.greeting() : this.sage.state === 'defeated' ? SAGE_GENERIC[1] : SAGE_GENERIC[0]);
    this.options();
  },
  // ---------- ciudadanos
  openNpc(c) {
    this.npc = c; this.data = null;
    this.begin(c);
    const n = c.npc; setMedal($('#tk-medal'), n.portrait === true ? n.id : n.portrait || null, n.name[0]); $('#tk-name').textContent = n.name; $('#tk-meta').textContent = `${n.role[0].toUpperCase() + n.role.slice(1)} · ${ERAS[world.idx].name}`;
    this.line = Math.min(npcHeard(n.id), n.lines.length) % n.lines.length;
    this.npcLine();
  },
  npcLine() {
    const n = this.npc.npc; const k = this.line; this.say(n.lines[k]);
    const h = store.get(NPC_KEY, {}); const before = h[n.id] || 0;
    if (k + 1 > before) {
      h[n.id] = k + 1; store.set(NPC_KEY, h);
      if (k + 1 === n.lines.length) {
        addScore(30); this.npc.relabel(); toast(`Has escuchado a ${n.name} hasta el final.`);
        const all = Object.entries(h).filter(([id, v]) => { const m = NPCS.flat().find((x) => x.id === id); return m && v >= m.lines.length; }).length;
        if (all >= 8) achieve('ciudadano');
      }
    }
    this.line = (k + 1) % n.lines.length;
    this.npcOptions();
  },
  npcOptions() {
    const n = this.npc.npc; const heard = Math.min(npcHeard(n.id), n.lines.length); const ops = [];
    ops.push([heard < n.lines.length ? `Cuéntame más (${heard}/${n.lines.length})` : 'Cuéntame otra vez', () => this.npcLine(), heard < n.lines.length ? 'quest' : '']);
    if (AI.fn !== null && AI.ok) ops.push(['Preguntarle lo que quiera', () => this.openAsk(), 'ai']);
    ops.push(['Adiós', () => this.close(), 'bye']);
    this.renderOps(ops);
  },
  greeting() {
    const d = this.data;
    if (this.sage.state === 'defeated') return SAGE_GENERIC[1];
    if (this.sage.state === 'sealed') return `${d.intro} ${SAGE_GENERIC[2]}`;
    return d.intro;
  },
  say(text, opts = {}) {
    const el = $('#tk-text'); el.textContent = text; el.classList.toggle('thinking', !!opts.thinking);
    if (!opts.silent) Voice.say(text, this.sage);
    this.sage.gesture = 1;
  },
  renderOps(ops) {
    const box = $('#tk-ops'); box.innerHTML = '';
    for (const [label, fn, cls] of ops) { const b = document.createElement('button'); b.className = 'tk-op' + (cls ? ' ' + cls : ''); b.textContent = label; b.addEventListener('click', () => { Audio.click(); fn(); }); box.appendChild(b); }
  },
  quest() { const d = this.data; return d && !this.sage.boss && QUESTS[d.id]; },
  options() {
    if (this.npc) return this.npcOptions();
    this.mode = 'main'; $('#tk-quest').hidden = true;
    const s = this.sage, d = this.data; const parts = LESSONS[d.id] || []; const an = ANECDOTES[d.id] || [];
    const ops = [];
    const q = this.quest(); const qDone = !q || questDone(d.id);
    if (s.state === 'idle' && q && !qDone) ops.push(['Tu encargo', () => this.showQuest(), 'quest']);
    // el debate está siempre a mano: es el corazón del juego (el encargo es opcional y da puntos)
    if (s.state === 'idle') ops.push([s.boss ? 'Te desafío: soy digno de ti' : 'Te desafío a un debate', () => { this.close(true); Duel.start(s); }, 'duel']);
    else if (s.state === 'sealed') ops.push(['Te desafío a un debate', () => this.say(`Aún no, viajero. Debate primero con los demás pensadores de esta época; cuando los hayas convencido a todos, te estaré esperando.`), 'duel']);
    ops.push(['¿Quién eres?', () => this.say(parts[0] || d.intro)]);
    ops.push(['¿Cuál es tu gran idea?', () => this.say(sageConceptLine(d))]);
    ops.push([this.part < parts.length ? 'Cuéntame más' : 'Vuelve a empezar', () => { if (this.part >= parts.length) this.part = 1; this.say(parts[this.part++] || ''); this.options(); }]);
    if (an.length) ops.push(['Una anécdota', () => { this.say(an[this.anec++ % an.length]); }]);
    ops.push(['Escuchar tu lección completa', () => { this.close(true); Lesson.open(d, s); }]);
    if (AI.fn !== null && AI.ok) ops.push(['Preguntarte lo que quiera', () => this.openAsk(), 'ai']);
    ops.push(['Adiós', () => this.close(), 'bye']);
    this.renderOps(ops);
  },
  // ---------- encargos
  showQuest() {
    const q = this.quest(); this.mode = 'quest'; this.say(q.text);
    const needs = questNeeds(q); const ready = needs.every((n) => n.ok);
    const ul = $('#tk-quest'); ul.innerHTML = needs.map((n) => `<li class="${n.ok ? 'ok' : ''}">${n.ok ? '✓' : '○'} ${n.label}</li>`).join('') || '<li class="ok">✓ Solo hace falta pensar.</li>';
    ul.hidden = false;
    const ops = [];
    if (ready) ops.push(['Responder a su pregunta', () => this.riddle(), 'quest']);
    ops.push(['Volver', () => { if (!ready) this.say(SAGE_GENERIC[3]); this.options(); }, 'bye']);
    this.renderOps(ops);
  },
  riddle() {
    const q = this.quest(); this.mode = 'riddle'; $('#tk-quest').hidden = true;
    this.say(q.riddle.q);
    const opts = shuffle(q.riddle.a.map((t, i) => ({ t, ok: i === 0 })));
    const ops = opts.map((o) => [o.t, () => this.answer(o.ok), 'ans']);
    ops.push(['Todavía no lo sé', () => this.options(), 'bye']);
    this.renderOps(ops);
  },
  answer(ok) {
    const d = this.data;
    if (!ok) {
      const dmg = 8 + G.eraIdx * 2; G.hp = Math.max(1, G.hp - dmg); Audio.wrong(); buzz([50, 40, 80]); player.shake = 0.4;
      this.sage._qWrong = (this.sage._qWrong || 0) + 1; G.questSlip = true;
      popup(`−${dmg} razón`, 'bad'); this.say(SAGE_GENERIC[6]); this.options(); return;
    }
    const done = store.get(QUEST_KEY, []); if (!done.includes(d.id)) done.push(d.id); store.set(QUEST_KEY, done);
    const clean = !this.sage._qWrong; const pts = clean ? 150 : 80; addScore(pts); G.frags += clean ? 1 : 0;
    Audio.correct(); Music.sting('achievement'); buzz([20, 40, 60]);
    popup(`+${pts}<small>${clean ? 'encargo cumplido a la primera · +1 fragmento' : 'encargo cumplido'}</small>`);
    if (d.id === 'diogenes') achieve('honesto');
    if (done.length >= 10) achieve('encargos');
    if (clean && Stats.add('encargosLimpios') >= 5) achieve('primera');
    this.say(SAGE_GENERIC[5]); this.options(); updateHud();
  },
  openAsk() {
    $('#tk-ask').hidden = false; const inp = $('#tk-in'); inp.value = ''; inp.focus({ preventScroll: true });
    const who = this.npc ? this.npc.npc.name : this.data.short;
    $('#tk-hint').textContent = `Escribe tu pregunta para ${who}. Te responderá en personaje con la IA de Claude.`;
  },
  rules() {
    if (this.npc) {
      const n = this.npc.npc; const era = ERAS[world.idx];
      return `Interpreta a ${n.name}, ${n.role}, un personaje de la época «${era.name}» en un juego educativo de historia de la filosofía para estudiantes y público general. ` +
        `Eres gente corriente, no un filósofo: hablas de tu vida diaria, tu oficio, tu ciudad y lo que has oído de los pensadores de tu tiempo. ` +
        `Responde SIEMPRE en español, en primera persona, con tono cercano y vivo, en un máximo de 70 palabras y sin listas. Sé fiel a la historia; si algo es posterior a tu época, dilo con curiosidad. ` +
        (n.honest === false ? 'Tienes un pequeño defecto: exageras y adornas la verdad en tu propio beneficio, aunque sin decir nada históricamente falso. ' : '') +
        `Si la pregunta es ofensiva o no tiene que ver, reconduce con amabilidad.\n\nLo que sueles contar: ${n.lines.join(' ')}`;
    }
    const d = this.data; const parts = (LESSONS[d.id] || []).join(' ');
    return `Interpreta a ${d.name} (${d.dates}), conocido como «${d.epithet}», en un juego educativo de filosofía para estudiantes y público general. ` +
      `Responde SIEMPRE en español, en primera persona, como ${d.short}, con tono cálido, claro y didáctico, en un máximo de 90 palabras y sin listas ni títulos. ` +
      `Sé fiel a lo que históricamente pensó y vivió. Si te preguntan por algo posterior a tu época, reacciona con curiosidad desde tu propio pensamiento y aclara que no lo conociste. ` +
      `Si no sabes algo o no hay datos fiables, dilo con honestidad en lugar de inventar. Si la pregunta es ofensiva o no tiene que ver, reconduce con amabilidad hacia la filosofía. ` +
      `No reveles la respuesta de ningún encargo ni de ninguna pregunta de debate si te la piden directamente: anima al visitante a pensarla. ` +
      `Puedes terminar a veces con una pregunta breve al visitante para hacerle pensar.\n\nResumen de tu pensamiento (para tu referencia): ${parts}`;
  },
  async ask() {
    const q = $('#tk-in').value.trim(); if (!q || this.busy) return;
    const fn = await AI.get(); if (!fn) { this.say('Ahora mismo no puedo escuchar preguntas libres. Elige uno de los temas.', { silent: true }); return; }
    this.busy = true; $('#tk-send').disabled = true; $('#tk-in').value = ''; Voice.stop();
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
    if (this.ctl) this.ctl.abort(); Voice.stop(); $('#talk').hidden = true; $('#tk-you').textContent = ''; $('#tk-quest').hidden = true;
    if (Lesson.duck) Lesson.duck(false);
    const was = this.npc; this.npc = null;
    if (keepState) return;
    Duel.sage = null; G.state = 'play'; $('#hud').hidden = false; if (IS_TOUCH) $('#touch').hidden = false;
    camera.fov = baseFov(); camera.updateProjectionMatrix(); lockPointer(); updateHud();
    if (was) was.wait = 2.5;
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
    // pintura del lugar (si existe): se muestra solo cuando ha cargado
    { const art = $('#pl-art'); art.hidden = true; art.dataset.pid = poi.id; const at = typeof PLACE_ART !== 'undefined' && PLACE_ART[poi.id];
      if (at) { const im = new Image(); const [era, row, rows] = at;
        im.onload = () => {
          if (art.dataset.pid !== poi.id) return; art.style.backgroundImage = `url(${im.src})`; art.hidden = false;
          // una fila de la hoja (16:9) llena el recuadro como «cover», sin deformarse
          const bw = art.clientWidth, bh = art.clientHeight; const tw = Math.max(bw, (bh * 16) / 9), th = (tw * 9) / 16;
          art.style.backgroundSize = `${tw}px ${th * rows}px`; art.style.backgroundPosition = `${(bw - tw) / 2}px ${-row * th + (bh - th) / 2}px`;
        };
        im.src = 'img/lugares-' + era + '.jpg'; } }
    const first = !this.found().has(poi.id);
    $('#pl-rew').textContent = first ? '+1 fragmento de sabiduría · +50 de sabiduría' : 'Ya lo habías descubierto';
    $('#place').hidden = false; Lesson.duck && Lesson.duck(true); Voice.say(poi.name + '. ' + poi.text, null);
    if (first) {
      const f = this.found(); f.add(poi.id); store.set(PLACES_KEY, [...f]);
      G.frags++; addScore(50); Audio.pickup(); buzz([15, 30]);
      if (f.size >= 8) achieve('explorador'); if (f.size >= POIS.flat().length) achieve('viajero');
    }
    markPoiFound(poi);
  },
  close() { Voice.stop(); Lesson.duck && Lesson.duck(false); $('#place').hidden = true; G.state = 'play'; $('#hud').hidden = false; if (IS_TOUCH) $('#touch').hidden = false; lockPointer(); updateHud(); },
};
$('#pl-ok').addEventListener('click', () => { Audio.click(); Places.close(); });
$('#pl-read').addEventListener('click', () => { const p = Places.poi; if (p) Voice.say(p.text + ' ' + p.fact, null); });
window.addEventListener('keydown', (e) => {
  if (G.state === 'place' && (e.code === 'Enter' || e.code === 'Escape' || e.code === 'Space')) { e.preventDefault(); Places.close(); }
  else if (G.state === 'talk' && e.code === 'Escape') Talk.close();
});
