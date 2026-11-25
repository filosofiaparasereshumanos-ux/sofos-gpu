// ============================================================================
//  JESÚS DE NAZARET (en el camino de la Biblia): por respeto, solo habla con
//  palabras de los evangelios, citadas con capítulo y versículo (según la
//  Biblia de Jerusalén). Su conversación tiene opciones propias y, si alguna
//  parte del juego intentara ponerle en la boca otra frase, su voz se calla.
// ============================================================================
const Jesus = {
  ID: 'jesus',
  T: { words: 'Escuchar sus palabras', beat: 'Las bienaventuranzas', samar: 'La parábola del buen samaritano', quote: '❝ Una frase de los evangelios', bye: 'Adiós', quest: 'Su encargo' },
  // todo lo que puede decir: lo que está escrito en sus datos (intro, despedida, lección, frases y encargo)
  ok(text) {
    if (!this.allowed) {
      const S = SAGE_BY_ID()[this.ID]; if (!S) return false; const d = S.d;
      const all = [d.intro, d.defeat, ...(LESSONS[this.ID] || []), ...((FRASES[this.ID] || []).map((f) => f[0])), (QUESTS[this.ID] || {}).text || ''].join('   ');
      this.allowed = all;
    }
    const t = String(text || '').trim(); return !!t && this.allowed.includes(t);
  },
  is(who) { return !!(who && who.data && who.data.id === this.ID); },
};
// la voz: solo palabras de los evangelios
{
  const s0 = Voice.say.bind(Voice), u0 = Voice.utter.bind(Voice);
  Voice.say = function (text, who) { if (Jesus.is(who) && !Jesus.ok(text)) return; return s0(text, who); };
  Voice.utter = function (text, who, rate, onend) { if (Jesus.is(who) && !Jesus.ok(text)) { if (onend) setTimeout(onend, 300); return; } return u0(text, who, rate, onend); };
}
// la conversación: saludo y opciones propias
{
  const o0 = Talk.open.bind(Talk);
  Talk.open = function (sage) { o0(sage); if (sage && sage.data && sage.data.id === Jesus.ID) { this.say(sage.data.intro); this.options(); } };
  const op0 = Talk.options;
  Talk.options = function () {
    const d = this.data;
    if (this.npc || !d || d.id !== Jesus.ID) return op0.call(this);
    this.mode = 'main'; $('#tk-quest').hidden = true; const s = this.sage, L = LESSONS[Jesus.ID] || [], F = FRASES[Jesus.ID] || [];
    const ops = []; const q = this.quest();
    if (s.state === 'idle' && q && !questDone(d.id)) ops.push([Jesus.T.quest, () => this.showQuest(), 'quest']);
    if (s.state === 'idle') ops.push([SACRED_TXT.test, () => { this.close(true); Duel.start(s); }, 'duel']);
    ops.push([Jesus.T.words, () => { this.close(true); Lesson.open(d, s); }]);
    if (L[1]) ops.push([Jesus.T.beat, () => this.say(L[1])]);
    if (L[4]) ops.push([Jesus.T.samar, () => this.say(L[4])]);
    if (F.length) ops.push([Jesus.T.quote, () => { this.fq = ((this.fq ?? -1) + 1) % F.length; const f = F[this.fq]; this.say(f[0], { silent: true }); Voice.say(f[0], s); $('#tk-text').textContent = `«${f[0]}» (${f[1]})`; }]);
    ops.push([Jesus.T.bye, () => this.close(), 'bye']);
    this.renderOps(ops);
  };
}
// el repaso (modo sagrado): siempre empieza con su saludo y responde solo con frases de los evangelios
{
  const sy0 = Duel.say.bind(Duel);
  Duel.say = function (t) { sy0(t); if (this.sage && this.sage.data.id === Jesus.ID && /^«/.test(t)) $('#d-say').textContent = t; };
  const st0 = Duel.start.bind(Duel);
  Duel.start = function (s) { if (s && s.data && s.data.id === Jesus.ID) s._met = false; return st0(s); };
  const a0 = Duel.answer.bind(Duel);
  Duel.answer = function (i) {
    const s = this.sage, was = this.answered; a0(i);
    if (!s || s.data.id !== Jesus.ID || was || !this.answered) return;
    const q = Debate.quote(Jesus.ID); const el = $('#d-say'); if (q && el) { el.textContent = '«' + q + '»'; Voice.say(q, s); }
  };
}
