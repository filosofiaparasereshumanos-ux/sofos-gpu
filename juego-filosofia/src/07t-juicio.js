// ============================================================================
//  EL JUICIO DE SÓCRATES: escena jugable. Tú eres Sócrates ante el jurado.
//  Los votos se ven en una barra de quinientos jueces. Elegir como Sócrates
//  (la verdad) no salva la vida: el juego mide tu «coherencia socrática».
// ============================================================================
ACH.push({ id: 'juicio', i: '⚖', n: 'Una vida examinada', d: 'Vive el juicio de Sócrates siendo fiel a él hasta el final.' });
const Juicio = {
  T: {
    eye: 'Atenas, 399 a.C.', h: 'El juicio de Sócrates', next: 'Continuar', vote: 'Que vote el jurado', you: 'Sócrates (tú)', guilty: 'Culpable', inno: 'Inocente', death: 'Muerte', alt: 'Tu propuesta',
    coh: 'Coherencia socrática', again: 'Volver a vivirlo', close: 'Cerrar', start: '⚖ Vivir el juicio de Sócrates', startS: 'Tú eres Sócrates ante quinientos jueces',
    kinds: { socratico: '✓ Así habló Sócrates', ceder: '~ Cediste para salvarte', soberbio: '✗ Soberbia, no filosofía' }, narr: 'Narrador', jurado: 'El jurado de Atenas',
    lv: { fiel: 'Fuiste Sócrates', medio: 'Sócrates a medias', lejos: 'No fuiste Sócrates' }, talk: '⚖ Vivir mi juicio',
  },
  build() {
    if (document.getElementById('juicio')) return;
    const el = document.createElement('div'); el.id = 'juicio'; el.className = 'nb'; el.hidden = true;
    el.innerHTML = '<div class="nb-card ju-card" role="dialog"><button class="ls-x pn-x" id="ju-x" aria-label="✕">✕</button><div class="eyebrow"></div><h3 class="ju-h"></h3>'
      + '<div class="ju-jury" hidden><div class="ju-bar"><i class="ju-g"></i><i class="ju-i"></i></div><div class="ju-n"><span class="ju-gn"></span><span class="ju-in"></span></div></div>'
      + '<div class="ju-who"><i class="medal"></i><b></b></div><p class="ju-say"></p><div class="ju-fb" hidden><b></b><span></span></div><div class="ju-opts"></div><div class="ju-end" hidden></div><div class="btns"><button class="btn primary" id="ju-next"></button></div></div>';
    document.body.appendChild(el); el.querySelector('.eyebrow').textContent = this.T.eye; el.querySelector('.ju-h').textContent = this.T.h;
    el.querySelector('#ju-x').addEventListener('click', () => { Audio.click && Audio.click(); this.close(); });
    el.querySelector('#ju-next').addEventListener('click', () => { Audio.click && Audio.click(); const f = this.nextFn; this.nextFn = null; if (f) f(); });
  },
  open() { this.build(); Panel.open('juicio'); Audio.init && Audio.init(); this.restart(); },
  restart() { this.coh = 0; this.inno = 236; this.k = 0; this.path = []; this.play(); },
  close() { this.gen = (this.gen || 0) + 1; Voice.stop(); Panel.close('juicio'); },
  who(id) { if (id === 'narr') return null; if (id === 'socrates') { const S = SAGE_BY_ID().socrates; return { data: S.d, boss: false }; } return { data: JUICIO_VOCES[id], boss: false }; },
  speak(id, text, after) {
    const gen = (this.gen = (this.gen || 0) + 1); const parts = narrSplit(text); let k = 0; const w = this.who(id);
    const say = () => { if (gen !== this.gen) return; if (k >= parts.length) { if (after) after(); return; } Voice.utter(parts[k++], w, 1, say); }; say();
  },
  show(id, text, btn, fn) {
    const el = document.getElementById('juicio'), m = el.querySelector('.ju-who .medal');
    const name = id === 'narr' ? this.T.narr : id === 'socrates' ? this.T.you : JUICIO_VOCES[id].name;
    if (id === 'socrates') setMedal(m, 'socrates', 'S'); else { setMedal(m, '', id === 'narr' ? '☉' : JUICIO_VOCES[id].short[0]); }
    m.classList.toggle('ju-acc', id !== 'narr' && id !== 'socrates');
    el.querySelector('.ju-who b').textContent = name; el.querySelector('.ju-say').textContent = text; el.querySelector('.ju-opts').innerHTML = ''; el.querySelector('.ju-fb').hidden = true;
    const nb = $('#ju-next'); nb.hidden = !btn; if (btn) { nb.textContent = btn; this.nextFn = fn; }
    this.speak(id, text);
  },
  jury(show, g, i, labels) {
    const j = document.querySelector('#juicio .ju-jury'); j.hidden = !show; if (!show) return;
    const L = labels || [this.T.guilty, this.T.inno]; const tot = g + i || 1;
    j.querySelector('.ju-g').style.width = (g / tot * 100) + '%'; j.querySelector('.ju-i').style.width = (i / tot * 100) + '%';
    j.querySelector('.ju-gn').textContent = `${L[0]}: ${g}`; j.querySelector('.ju-in').textContent = `${L[1]}: ${i}`;
  },
  count(g, i, labels, done) { // los votos se cuentan poco a poco
    const t0 = performance.now(), D = 2600; Audio.tone && Audio.tone(110, 2.4, { type: 'sine', vol: 0.1, slide: 1.4 });
    const step = () => { const e = Math.min(1, (performance.now() - t0) / D); this.jury(true, Math.round(g * e), Math.round(i * e), labels); if (e < 1) requestAnimationFrame(step); else { Audio.gong && Audio.gong(); done && done(); } };
    step();
  },
  ask(scene, onPick) {
    this.show(scene.who, scene.say, null);
    const box = document.querySelector('#juicio .ju-opts'); box.innerHTML = '';
    shuffle([...scene.opts]).forEach((o, k) => { const b = document.createElement('button'); b.className = 'ans ju-o'; b.innerHTML = `<span class="k">${'ABC'[k]}</span><span></span>`; b.lastChild.textContent = o.t; b.addEventListener('click', () => this.pick(o, onPick)); box.appendChild(b); });
  },
  pick(o, onPick) {
    const el = document.getElementById('juicio'); el.querySelector('.ju-opts').innerHTML = ''; this.path.push(o.k);
    if (o.k === 'socratico') { this.coh++; Audio.correct && Audio.correct(); } else if (o.k === 'soberbio') { Audio.wrong && Audio.wrong(); } else Audio.click && Audio.click();
    // Sócrates (tú) dice su frase con su voz; luego, la reacción
    let done = false; const react = () => { if (done) return; done = true;
      el.querySelector('.ju-say').textContent = o.r; el.querySelector('.ju-who b').textContent = this.T.jurado; setMedal(el.querySelector('.ju-who .medal'), '', '⚖'); el.querySelector('.ju-who .medal').classList.remove('ju-acc');
      const fb = el.querySelector('.ju-fb'); fb.hidden = false; fb.className = 'ju-fb ' + o.k; fb.querySelector('b').textContent = this.T.kinds[o.k]; fb.querySelector('span').textContent = o.why;
      const nb = $('#ju-next'); nb.hidden = false; nb.textContent = this.T.next; this.nextFn = () => onPick(o);
      this.speak('narr', o.r);
    };
    this.show('socrates', o.t, this.T.next, react); this.speak('socrates', o.t, react);
  },
  play() {
    const J = JUICIO; this.jury(false); document.querySelector('#juicio .ju-end').hidden = true;
    const seq = [...J.intro.map((t) => () => this.show('narr', t, this.T.next, next))]; let i = 0;
    const next = () => { if (i < seq.length) seq[i++](); };
    seq.push(() => this.show(J.acusacion.who, J.acusacion.say, this.T.next, next));
    J.defensa.forEach((sc) => seq.push(() => this.ask(sc, (o) => { this.inno += o.k === 'socratico' ? -4 : o.k === 'ceder' ? 18 : -20; next(); })));
    seq.push(() => this.verdict());
    next();
  },
  verdict() {
    const inno = Math.max(120, Math.min(380, this.inno)), g = 500 - inno; const guilty = g > inno;
    this.show('narr', this.T.vote + '…', null);
    this.count(g, inno, null, () => {
      if (!guilty) { this.show('narr', JUICIO.veredicto.absuelto, this.T.next, () => this.end('absuelto')); return; }
      this.show('narr', JUICIO.veredicto.culpable, this.T.next, () => this.ask(JUICIO.pena, (o) => this.sentence(o)));
    });
  },
  sentence(o) {
    const J = JUICIO;
    if (o.k === 'ceder') { this.count(180, 320, [this.T.death, this.T.alt], () => this.show('narr', J.sentencia.destierro, this.T.next, () => this.end('destierro'))); return; }
    const d = o.k === 'socratico' ? [360, 140] : [400, 100];
    this.show('narr', this.T.vote + '…', null);
    this.count(d[0], d[1], [this.T.death, this.T.alt], () => this.show('narr', J.sentencia.muerte, this.T.next, () => this.show(J.despedida.who, J.despedida.say, this.T.next, () => this.ask(J.carcel, (c) => {
      if (c.k === 'ceder') { this.end('fuga'); return; }
      const F = J.final; let k = 0; this.jury(false);
      const step = () => { if (k < F.length) { const s = F[k++]; this.show(s.who, s.say, this.T.next, step); } else this.end('cicuta'); }; step();
    }))));
  },
  end(how) {
    const J = JUICIO, n = this.path.length, c = this.coh; const lv = c === n && how === 'cicuta' ? 'fiel' : c >= n - 2 ? 'medio' : 'lejos';
    const el = document.getElementById('juicio'); el.querySelector('.ju-opts').innerHTML = ''; el.querySelector('.ju-fb').hidden = true; this.jury(false);
    const e = el.querySelector('.ju-end'); e.hidden = false; e.className = 'ju-end ' + lv;
    e.innerHTML = '<span class="ju-lv"></span><b class="ju-c"></b><small class="ju-nota"></small>';
    e.querySelector('.ju-lv').textContent = this.T.lv[lv]; e.querySelector('.ju-c').textContent = `${this.T.coh}: ${c} / ${n}`; e.querySelector('.ju-nota').textContent = J.nota;
    this.show('narr', J.finales[lv], this.T.again, () => this.restart());
    if (lv === 'fiel') { achieve('juicio'); try { addScore(300); } catch (er) { /* fuera de una partida */ } }
    if (typeof Metricas !== 'undefined') Metricas.hit('juicio_' + lv, '');
  },
};
// accesos: en la conversación con Sócrates y en la lista de «Debate tú»
{
  const r0 = Talk.renderOps.bind(Talk);
  Talk.renderOps = function (ops) {
    try {
      const d = this.data, bye = ops.findIndex((o) => o[2] === 'bye' && o[0] === 'Adiós');
      if (this.mode === 'main' && d && this.sage && bye >= 0) {
        const extra = [];
        if (d.id === 'socrates') extra.push([Juicio.T.talk, () => { this.close(); Juicio.open(); }, 'quest']);
        const P = (typeof POSTURAS !== 'undefined') && POSTURAS.find((x) => x.id === d.id);
        if (P) extra.push([Postura.T.talk, () => { this.close(); Postura.open(P); }, 'quest']);
        if (extra.length) ops = [...ops.slice(0, bye), ...extra, ...ops.slice(bye)];
      }
    } catch (e) { console.warn('talk', e); }
    return r0(ops);
  };
  Postura.T.talk = '🗣 Discute conmigo';
  const l0 = Postura.list.bind(Postura);
  Postura.list = function () {
    l0(); const box = $('#po-items'); if (!box) return;
    const b = document.createElement('button'); b.className = 'vs-item po-item ju-item'; b.innerHTML = '<i class="medal"></i><span><b></b><small></small></span><i class="po-st">⚖</i>';
    setMedal(b.querySelector('.medal'), 'socrates', 'S'); b.querySelector('b').textContent = Juicio.T.start; b.querySelector('small').textContent = Juicio.T.startS;
    b.addEventListener('click', () => { Audio.click && Audio.click(); Panel.close('vs'); Juicio.open(); }); box.prepend(b);
  };
}
{
  const st = document.createElement('style');
  st.textContent = '#juicio{z-index:66}.ju-card{background:linear-gradient(170deg,#241a10,#120c06);border-color:#c8a050}.ju-h{font-family:var(--display);font-weight:normal;color:#ffe2a0;margin:2px 34px 10px 0;font-size:1.3rem}'
    + '.ju-jury{margin:0 0 10px}.ju-jury[hidden]{display:none}.ju-bar{display:flex;height:14px;border-radius:7px;overflow:hidden;background:rgba(255,255,255,.08);border:1px solid rgba(216,178,90,.4)}.ju-bar i{display:block;height:100%;transition:width .1s linear}.ju-g{background:linear-gradient(90deg,#8a2a22,#d0503a)}.ju-i{background:linear-gradient(90deg,#3a8a5a,#7ad09a);margin-left:auto}'
    + '.ju-n{display:flex;justify-content:space-between;font-size:.82rem;margin-top:4px;font-family:var(--display);letter-spacing:.06em}.ju-gn{color:#ff9a8a}.ju-in{color:#9fe0b8}'
    + '.ju-who{display:flex;align-items:center;gap:10px;margin:6px 0 4px}.ju-who .medal{width:46px;height:46px;font-size:1.1rem}.ju-who .medal.ju-acc{background:radial-gradient(circle at 40% 35%,#6a4a3a,#2a1a12 70%);color:#ffd0b0}.ju-who b{font-family:var(--display);font-weight:normal;color:var(--gold-bright,#ffd36a);letter-spacing:.06em}'
    + '.ju-say{font-size:1.05rem;line-height:1.55;color:#f6ead0;margin:4px 0 10px;min-height:3em}.ju-opts .ju-o{width:100%;margin:5px 0;text-align:left}'
    + '.ju-fb{margin:4px 0 10px;padding:8px 10px;border-radius:10px;border-left:3px solid;font-size:.9rem;line-height:1.4}.ju-fb b{display:block;font-weight:normal;font-family:var(--display);font-size:.8rem;letter-spacing:.06em}.ju-fb.socratico{border-color:#5cc49a;background:rgba(92,196,154,.08)}.ju-fb.socratico b{color:#8ff0c4}.ju-fb.ceder{border-color:#d8b25a;background:rgba(216,178,90,.07)}.ju-fb.ceder b{color:#ffd36a}.ju-fb.soberbio{border-color:#e06a5a;background:rgba(224,106,90,.08)}.ju-fb.soberbio b{color:#ff9a8a}'
    + '.ju-end{text-align:center;padding:12px;border-radius:12px;border:1px solid;margin:6px 0}.ju-end[hidden]{display:none}.ju-end .ju-lv{display:block;font-family:var(--display);letter-spacing:.14em;text-transform:uppercase}.ju-end .ju-c{display:block;font-weight:normal;font-size:1.1rem;margin:4px 0}.ju-end .ju-t{display:none}.ju-end .ju-nota{display:block;font-size:.78rem;opacity:.8;margin-top:6px;line-height:1.4}'
    + '.ju-end.fiel{border-color:#5cc49a;color:#8ff0c4;background:rgba(92,196,154,.08)}.ju-end.medio{border-color:#d8b25a;color:#ffd36a;background:rgba(216,178,90,.07)}.ju-end.lejos{border-color:#e06a5a;color:#ff9a8a;background:rgba(224,106,90,.08)}.ju-item{border-color:rgba(255,211,106,.6)!important}';
  document.head.appendChild(st);
}
if (location.hash === '#debug') window.__juicio = Juicio;
