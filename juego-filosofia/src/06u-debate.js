// ============================================================================
//  DEBATES MÁS EMOCIONANTES
//  · Réplica: al acertar el pensador concede y contraataca con una de sus frases;
//    al fallar te remata con ella. Todo con su voz.
//  · La cuerda de la persuasión: un tira y afloja entre tú y el pensador.
//  · Tipos de argumento: Ejemplo, Pregunta socrática o Detectar falacia. Cada
//    pensador cae ante uno y resiste otro; lo que descubres queda anotado.
//  · Golpe crítico, aliado que te ayuda, público que aplaude o abuchea,
//    apuesta final a todo o nada, dilemas sin respuesta correcta y revanchas.
// ============================================================================
const DEB_RIVAL_KEY = 'odisea-razon.rivales', DEB_WEAK_KEY = 'odisea-razon.debilidades';
ACH.push(
  { id: 'critico', i: '✸', n: 'Golpe crítico', d: 'Asesta un golpe crítico en un debate.' },
  { id: 'aliado', i: '⚭', n: 'Nunca solo', d: 'Llama a un aliado en un debate.' },
  { id: 'revancha', i: '⟲', n: 'Revancha', d: 'Vence a un pensador que antes te derrotó.' },
  { id: 'todoonada', i: '♛', n: 'Todo o nada', d: 'Gana la apuesta final de un debate.' },
  { id: 'dilema', i: '⚖', n: 'Coherente', d: 'Defiende con coherencia tu postura en un dilema.' },
  { id: 'debilidad', i: '◎', n: 'Punto débil', d: 'Descubre el punto débil de 5 pensadores.' },
);
const DEB_TXT = { won: 'Apuesta ganada', lost: 'Apuesta perdida', rev: 'Revancha', allin: 'Todo o nada' };
const Debate = {
  rope: 0, tension: 0, punch: 0, card: null, ally: false, bet: false, dil: null, get L() { return DEB_LINES; }, get F() { return FRASES; },
  weakOf(id) { if (ARG_WEAK[id]) return ARG_WEAK[id]; let h = 0; for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0; return ARG_CARDS[h % 3].id; },
  strongOf(id) { const k = ARG_CARDS.findIndex((c) => c.id === this.weakOf(id)); return ARG_CARDS[(k + 1) % 3].id; },
  known() { return store.get(DEB_WEAK_KEY, {}) || {}; },
  rivals() { return store.get(DEB_RIVAL_KEY, {}) || {}; },
  quote(id) { const L = (typeof FRASES !== 'undefined' && FRASES[id]) || []; if (!L.length) return null; this._q = this._q || {}; const i = (this._q[id] = ((this._q[id] ?? -1) + 1) % L.length); return L[i][0]; },
  // el pensador habla: una frase corta y, si quiere, una de sus frases célebres
  speak(line, quote) {
    const s = Duel.sage; if (!s) return; const el = $('#d-say'); el.textContent = '«' + line + '»';
    if (quote) { const q = document.createElement('span'); q.className = 'd-quote'; q.textContent = ' «' + quote + '»'; el.appendChild(q); }
    Voice.say(quote ? line + ' ' + quote : line, s);
  },
  // ---------- la cuerda
  paintRope() {
    const s = Duel.sage; if (!s) return; const prog = (s.maxConv - s.conv) / Math.max(1, s.maxConv);
    this.rope = clamp(prog - (this.wrongs || 0) * 0.14, -0.9, 1);
    $('#d-knot').style.left = (50 - this.rope * 44) + '%';
    $('#d-rope').classList.toggle('win', this.rope > 0.6); $('#d-rope').classList.toggle('lose', this.rope < -0.3);
    this.tension = Math.max(0, this.rope) * 0.08;
  },
  // ---------- tipos de argumento
  paintCards() {
    const box = $('#d-cards'); const s = Duel.sage; if (!box || !s) return; const k = this.known()[s.data.id];
    box.querySelectorAll('button').forEach((b) => { b.classList.toggle('on', b.dataset.c === this.card); b.disabled = Duel.answered; b.classList.toggle('weak', !!(k && k.w && b.dataset.c === this.weakOf(s.data.id))); b.classList.toggle('strong', !!(k && k.s && b.dataset.c === this.strongOf(s.data.id))); });
    const hint = $('#d-cards-h'); hint.textContent = this.card ? ARG_CARDS.find((c) => c.id === this.card).d : 'Elige cómo argumentar (opcional)';
  },
  learn(kind) {
    const s = Duel.sage; const K = this.known(); const e = K[s.data.id] || {}; if (e[kind]) return; e[kind] = 1; K[s.data.id] = e; store.set(DEB_WEAK_KEY, K);
    if (Object.values(K).filter((x) => x.w).length >= 5) achieve('debilidad');
  },
  // ---------- público: los ciudadanos cercanos aplauden o abuchean
  crowd(ok) {
    let n = 0;
    for (const c of citizens) { const d = Math.hypot(c.pos.x - player.pos.x, c.pos.z - player.pos.z); if (d < 32) { n++; if (ok) c.gesture = 1; } }
    if (!Audio.ctx || !G.settings) return; const v = n ? 1 : 0.45;
    if (ok) for (let k = 0; k < 18; k++) Audio.noise(0.05, { vol: (0.03 + Math.random() * 0.05) * v, freq: 1800 + Math.random() * 2600, q: 1.5, when: k * 0.045 + Math.random() * 0.04 });
    else [0, 0.07, 0.15].forEach((w, k) => Audio.tone(150 - k * 9, 0.9, { type: 'sawtooth', vol: 0.035 * v, slide: 0.75, filter: 520, when: w }));
  },
  // ---------- aliado
  allyFor(s) {
    if (!G.codex) return null; const id = s.data.id; const ok = (x) => x && x !== id && G.codex.has(x) && FRASES[x];
    const vs = (typeof VERSUS !== 'undefined' ? VERSUS : []).flatMap((v) => (v.a === id ? [v.b] : v.b === id ? [v.a] : [])).filter(ok);
    if (vs.length) return vs[0];
    const same = (ERAS[G.eraIdx] ? ERAS[G.eraIdx].sages : []).map((d) => d.id).filter(ok); if (same.length) return pick(same);
    const any = [...G.codex].filter(ok); return any.length ? pick(any) : null;
  },
  callAlly() {
    const s = Duel.sage; if (!s || Duel.answered || this.ally || this.dil) return; const a = this.allyFor(s); if (!a) return;
    this.ally = true; Duel.aidsUsed = true; achieve('aliado'); Audio.pickup();
    const btns = $('#d-answers').children; const wrong = Duel.opts.map((o, i) => (o.ok || btns[i].disabled ? -1 : i)).filter((i) => i >= 0); shuffle(wrong);
    wrong.slice(0, Math.min(2, wrong.length - 1)).forEach((i) => { btns[i].classList.add('gone'); btns[i].disabled = true; });
    const d = SAGE_BY_ID()[a].d; const q = this.quote(a);
    const el = $('#d-say'); el.innerHTML = '<span class="d-ally"></span>'; el.firstChild.textContent = `${d.short} acude en tu ayuda: «${q}»`;
    Voice.say(q, { data: { id: a } }); toast(`⚭ ${d.short} acude en tu ayuda`); this.paintAids();
  },
  paintAids() { const b = $('#aid-ally'); if (!b) return; const s = Duel.sage; const a = s && this.allyFor(s); b.disabled = !a || this.ally || Duel.answered || !!this.dil; b.title = a ? 'Llama a ' + SAGE_BY_ID()[a].d.short : 'Vence antes a otros pensadores'; },
  // ---------- golpe crítico
  crit() {
    const el = $('#d-crit'); el.classList.remove('on'); void el.offsetWidth; el.classList.add('on'); this.punch = 1; achieve('critico');
    Audio.tone(70, 0.9, { type: 'sine', vol: 0.4, slide: 0.4 }); Audio.victory(); buzz([30, 30, 120]);
  },
  // ---------- apuesta final
  offerBet(done) {
    const p = $('#d-bet'); p.hidden = false; Duel.answered = true; this.speak(pick(DEB_LINES.bet));
    const go = (yes) => { p.hidden = true; this.bet = yes; Duel.answered = false; Duel.time = Duel.maxTime; Audio.click(); if (yes) { $('#d-qnum').textContent += ' · ♛ ' + DEB_TXT.allin; $('#duel').classList.add('allin'); } this.paintCards(); this.paintAids(); Duel.updateAids(); done && done(); };
    $('#d-bet-yes').onclick = () => go(true); $('#d-bet-no').onclick = () => go(false);
  },
  // ---------- dilema: primero eliges postura, luego la defiendes
  startDilema() {
    const D = this.pickDilema(); this.dil = { D, phase: 1 };
    $('#d-qnum').textContent = 'Dilema · elige tu postura'; $('#d-q').textContent = D.q;
    Duel.opts = D.a.map((t) => ({ t, ok: true })); this.renderAns();
    this.speak(DEB_LINES.dilema[0]); this.paintAids(); Duel.updateAids(); $('#aid-5050').disabled = true; $('#aid-time').disabled = true;
  },
  pickDilema() { const used = (this._dUsed = this._dUsed || new Set()); let L = DILEMAS.filter((d) => !used.has(d.q)); if (!L.length) { used.clear(); L = DILEMAS; } const D = pick(L); used.add(D.q); return D; },
  renderAns() {
    const box = $('#d-answers'); box.innerHTML = '';
    Duel.opts.forEach((o, i) => { const b = document.createElement('button'); b.className = 'ans'; b.innerHTML = `<span class="k">${'ABCD'[i]}</span><span></span>`; b.lastChild.textContent = o.t; b.addEventListener('click', () => Duel.answer(i)); box.appendChild(b); });
  },
  dilemaPhase2(i) {
    const { D } = this.dil; this.dil.phase = 2; this.dil.pos = i;
    const opts = [{ t: D.r[i], ok: true }, { t: D.r[1 - i], ok: false }, { t: D.f[0], ok: false }, { t: D.f[1], ok: false }]; shuffle(opts); Duel.opts = opts;
    $('#d-qnum').textContent = 'Dilema · defiende tu postura'; $('#d-q').textContent = `Tu postura: «${D.a[i]}». ¿Qué razón la sostiene con coherencia?`;
    Duel.q = { q: D.q, a: [D.r[i]], e: 'Las dos posturas se pueden defender. Lo que cuenta es dar una razón que de verdad sostenga la tuya, sin trucos ni ataques.' };
    this.renderAns(); Duel.time = Duel.maxTime; Duel.lastTick = Math.ceil(Duel.time); this.speak(pick(DEB_LINES.dilema2)); Audio.click(); Duel.updateAids();
  },
};
// ---------- piezas de interfaz dentro de la tarjeta del duelo
{
  const qb = document.querySelector('#duel .qbox');
  const rope = document.createElement('div'); rope.id = 'd-rope'; rope.innerHTML = '<span class="rp-you">Tú</span><div class="rp-track"><i class="rp-mid"></i><b id="d-knot"></b></div><span class="rp-them" id="d-rope-them"></span>';
  qb.before(rope);
  const cards = document.createElement('div'); cards.id = 'd-cards';
  cards.innerHTML = ARG_CARDS.map((c) => `<button data-c="${c.id}" class="argc"><span class="ai">${c.i}</span>${c.n}</button>`).join('') + '<small id="d-cards-h"></small>';
  $('#d-q').after(cards);
  cards.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => { if (Duel.answered) return; Debate.card = Debate.card === b.dataset.c ? null : b.dataset.c; Audio.click(); Debate.paintCards(); }));
  const bet = document.createElement('div'); bet.id = 'd-bet'; bet.hidden = true;
  bet.innerHTML = '<p><b>♛ Último argumento.</b> Apuesta tu racha: si aciertas, puntos ×2 y un gran premio. Si fallas, pierdes la racha y más razón.</p><div><button class="btn primary" id="d-bet-yes">Apostarlo todo</button><button class="btn" id="d-bet-no">Jugar seguro</button></div>';
  $('#d-answers').before(bet);
  const ab = document.createElement('button'); ab.className = 'aid'; ab.id = 'aid-ally'; ab.innerHTML = 'Aliado <em>1 vez</em>'; $('#aid-time').after(ab); ab.addEventListener('click', () => Debate.callAlly());
  const cr = document.createElement('div'); cr.id = 'd-crit'; cr.textContent = '¡Golpe crítico!'; $('#duel').appendChild(cr);
  const rv = document.createElement('span'); rv.id = 'd-rival'; rv.hidden = true; rv.textContent = '⟲ ' + DEB_TXT.rev; $('#d-meta').after(rv);
}
// ---------- enganches con el duelo
{
  const start0 = Duel.start.bind(Duel), ask0 = Duel.ask.bind(Duel), answer0 = Duel.answer.bind(Duel), next0 = Duel.next.bind(Duel), win0 = Duel.win.bind(Duel);
  Duel.start = function (s) {
    Debate.ally = false; Debate.bet = false; Debate.dil = null; Debate.card = null; Debate.wrongs = 0; Debate.doubted = false; Debate.punch = 0; $('#duel').classList.remove('allin');
    s._dilDone = s._dilDone || false; s._betAsked = false;
    start0(s);
    $('#d-rope-them').textContent = s.data.short; Debate.paintRope();
    const rival = !!Debate.rivals()[s.data.id]; $('#d-rival').hidden = !rival;
    if (rival && !s._rivalSaid) { s._rivalSaid = true; const l = pick(DEB_LINES.rival); if (this.intro > 0) this.introLine = l; else Debate.speak(l); }
    Debate.paintAids();
  };
  Duel.ask = function () {
    Debate.card = null; Debate.dil = null; Debate.bet = false; $('#duel').classList.remove('allin'); $('#d-bet').hidden = true;
    ask0(); const s = this.sage;
    if (s.conv === 1 && G.streak >= 3 && !s._betAsked) { s._betAsked = true; Debate.offerBet(); }
    else if (!s.boss && !s._dilDone && this.round >= 2 && s.conv > 1 && Math.random() < 0.6) { s._dilDone = true; Debate.startDilema(); }
    Debate.paintCards(); Debate.paintAids();
  };
  Duel.answer = function (i) {
    if (this.answered || G.state !== 'duel' || this.intro > 0) return;
    // dilema, fase 1: cualquier postura vale
    if (Debate.dil && Debate.dil.phase === 1 && i >= 0) { const btns = $('#d-answers').children; if (btns[i] && btns[i].disabled) return; Debate.dilemaPhase2(i); return; }
    const s = this.sage; const sc0 = G.score, hp0 = G.hp, st0 = G.streak, fast = this.time > this.maxTime * 0.6;
    answer0(i); if (!this.answered) return;
    const ok = G.score > sc0 || (i >= 0 && this.opts[i] && this.opts[i].ok); const gained = G.score - sc0; const id = s.data.id; const card = Debate.card;
    let line = null, quote = null, mult = 1, plain = false;
    if (ok) {
      if (card && card === Debate.weakOf(id)) { mult *= 1.5; line = pick(DEB_LINES.weak); Debate.learn('w'); popup('<small>¡Muy eficaz!</small>', 'up'); }
      else if (card && card === Debate.strongOf(id)) { mult *= 0.5; line = pick(DEB_LINES.strong); Debate.learn('s'); popup('<small>No muy eficaz…</small>', 'up'); }
      const crit = fast && (st0 + 1 >= 6 || (card && card === Debate.weakOf(id)));
      if (crit) { mult *= 2; Debate.crit(); line = pick(DEB_LINES.crit); }
      if (Debate.bet) { mult *= 2; addScore(300); achieve('todoonada'); popup('+300<small>♛ ' + DEB_TXT.won + '</small>', 'up'); }
      if (Debate.dil) achieve('dilema');
      if (!line) { plain = true; line = pick(DEB_LINES.concede); if (s.conv > 0 && Math.random() < 0.6) { quote = Debate.quote(id); if (quote) line += ' ' + pick(DEB_LINES.pero); } }
    } else {
      if (Debate.bet) { const extra = Math.round((hp0 - G.hp) * 0.5); G.hp = Math.max(0, G.hp - extra); popup(`−${extra}<small>` + DEB_TXT.lost + '</small>', 'bad'); }
      if (card && card === Debate.strongOf(id)) Debate.learn('s');
      Debate.wrongs = (Debate.wrongs || 0) + 1; line = pick(DEB_LINES.remate); quote = Debate.quote(id);
    }
    if (mult !== 1 && gained > 0) addScore(Math.round(gained * (mult - 1)));
    Debate.crowd(ok); Debate.paintRope();
    if (ok && plain && Debate.rope > 0.6 && !Debate.doubted && s.conv > 0) { Debate.doubted = true; line = pick(DEB_LINES.doubt); quote = null; }
    if (s.conv > 0 || !ok) Debate.speak(line, quote);
    this.renderPips(); updateHud(); Debate.paintCards(); Debate.paintAids();
    const nb = $('#d-next'); nb.textContent = G.hp <= 0 ? 'Aceptar la derrota' : s.conv <= 0 ? 'Rematar el argumento' : 'Siguiente argumento';
  };
  Duel.next = function () {
    const s = this.sage;
    if (this.answered && this.intro <= 0 && s && G.hp <= 0) { const R = Debate.rivals(); R[s.data.id] = 1; store.set(DEB_RIVAL_KEY, R); }
    next0();
  };
  Duel.win = function () {
    const s = this.sage; const R = Debate.rivals(); const was = !!R[s.data.id];
    Debate.rope = 1; $('#d-knot').style.left = '6%'; Debate.crowd(true);
    win0();
    if (was) { delete R[s.data.id]; store.set(DEB_RIVAL_KEY, R); addScore(300); achieve('revancha'); setTimeout(() => popup('+300<small>⟲ ' + DEB_TXT.rev + '</small>'), 1100); }
    if (was) setTimeout(() => Voice.say(pick(DEB_LINES.rivalLost), s), 2600);
  };
  const upd0 = Duel.update.bind(Duel);
  Duel.update = function (dt) { Debate.punch = Math.max(0, Debate.punch - dt * 1.8); upd0(dt); };
}
