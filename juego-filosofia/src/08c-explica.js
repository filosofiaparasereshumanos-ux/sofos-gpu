// ============================================================================
//  EL PENSADOR EXPLICA PRIMERO: la primera vez que hablas con un pensador, él
//  empieza solo a contarte su lección (con su voz), parte por parte, para que
//  sepas lo necesario antes del debate. Puedes saltarla. Al terminar te invita a
//  desafiarlo: sus preguntas son sobre lo que te acaba de contar.
// ============================================================================
const Explica = {
  KEY: 'odisea-razon.clase-oida',
  T: {
    skip: '⏭ Saltar y debatir', part: (a, b) => `Explicando ${a} de ${b}`,
    ready: 'Ya conoces lo esencial de mis ideas. ¿Te atreves a desafiarme? Mis preguntas son sobre lo que acabo de contarte.',
  },
  heard(id) { return ((store.get(this.KEY, {}) || {})[id]) === 1; },
  mark(id) { const h = store.get(this.KEY, {}) || {}; h[id] = 1; store.set(this.KEY, h); },
  skipFor(sage) {
    const d = sage && sage.data; if (!d) return true;
    if (d.id === 'jesus' || sage.state === 'defeated' || sage.state === 'sealed') return true;
    const e = ERAS[G.eraIdx]; if (e && e.id === 'coran') return true; // el jardín del Corán tiene su propio modo
    return typeof Recorrido !== 'undefined' && Recorrido.on; // el recorrido narrado ya lo cuenta todo
  },
  run(T, s) {
    const d = s.data; const parts = ((LESSONS[d.id] && LESSONS[d.id].length) ? LESSONS[d.id] : [d.intro]).filter(Boolean);
    const gen = (this.gen = (this.gen || 0) + 1); let k = 0;
    const alive = () => gen === this.gen && !$('#talk').hidden && T.sage === s && T.mode === 'explica';
    // «Saltar y debatir»: corta la explicación y abre el debate de inmediato
    const jump = () => { if (gen !== this.gen) return; this.gen++; Voice.stop(); this.mark(d.id); T.mode = 'main'; if (s.state === 'idle') { T.close(true); Duel.start(s); } else T.options(); };
    const finish = () => { if (gen !== this.gen) return; this.gen++; Voice.stop(); this.mark(d.id); T.mode = 'main'; T.say(this.T.ready); T.options(); };
    T.mode = 'explica';
    const next = () => {
      if (!alive()) return;
      if (k >= parts.length) return finish();
      const t = parts[k++]; T.say(t, { silent: true });
      T.renderOps([[`${this.T.skip} · ${this.T.part(k, parts.length)}`, () => jump(), 'duel']]);
      Voice.utter(t, s, 1, () => { if (alive()) setTimeout(next, 500); });
    };
    // primero termina el saludo; luego empieza la explicación
    const greet = $('#tk-text').textContent; Voice.utter(greet, s, 1, () => { if (alive()) setTimeout(next, 400); });
    T.renderOps([[this.T.skip, () => jump(), 'duel']]);
  },
};
{
  const o0 = Talk.open.bind(Talk);
  Talk.open = function (sage) {
    o0(sage);
    if (this.npc || !this.data || Explica.skipFor(sage) || Explica.heard(this.data.id)) return;
    Explica.run(this, sage);
  };
  // si cierras la conversación a mitad de la explicación, se detiene (y la próxima vez vuelve a empezar)
  const c0 = Talk.close.bind(Talk);
  Talk.close = function (keep) { Explica.gen = (Explica.gen || 0) + 1; return c0(keep); };
}
if (location.hash === '#debug') window.__explica = Explica;
