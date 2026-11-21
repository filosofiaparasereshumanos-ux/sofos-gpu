// ============================================================================
//  ODISEA DE LA RAZÓN · DUELO DE FILÓSOFOS
// ============================================================================
const SAGES = allSages(); // [{ s, ei }] en orden cronológico
const P = {
  // progreso guardado
  data: Object.assign({ stars: {}, best: {}, cards: [], lessons: [], streakBest: 0, wins: 0, correct: 0, answered: 0 }, store.get(KEY + 'progreso', {})),
  save() { store.set(KEY + 'progreso', this.data); },
  won(id) { return (this.data.stars[id] || 0) > 0; },
  unlockedIndex() { let i = 0; while (i < SAGES.length && this.won(SAGES[i].s.id)) i++; return i; },
  totalStars() { return Object.values(this.data.stars).reduce((a, b) => a + b, 0); },
  totalScore() { return Object.values(this.data.best).reduce((a, b) => a + b, 0); },
  deck() { return [...STARTER, ...this.data.cards.map((id) => conceptCard(SAGES.find((x) => x.s.id === id).s))]; },
};

// ---------------------------------------------------------------------------
//  NAVEGACIÓN ENTRE PANTALLAS
// ---------------------------------------------------------------------------
const SCREENS = ['title', 'map', 'duel', 'result', 'coll', 'oracle', 'quiz', 'oend', 'fame', 'logros', 'settings', 'how'];
let current = 'title', history = [];
function go(id, push = true) {
  if (id === 'back') { id = history.pop() || 'title'; push = false; }
  $('#layer').innerHTML = ''; $('#toasts').innerHTML = ''; Voice.stop();
  if (push && current !== id && !['duel', 'quiz', 'result', 'oend'].includes(current)) history.push(current);
  SCREENS.forEach((s) => ($('#' + s).hidden = s !== id)); current = id; G.state = id === 'title' ? 'title' : id;
  if (id === 'title') renderTitle(); if (id === 'map') renderMap(); if (id === 'coll') renderColl(); if (id === 'logros') renderLogros();
  if (id === 'fame') Fame.render(); if (id === 'settings') syncSettings(); if (id === 'oracle') Oracle.open();
  if (['title', 'map', 'coll', 'oracle', 'fame', 'logros', 'settings', 'how'].includes(id)) Audio.mode = 'calm';
  BG.era = id === 'duel' && Duel.ei !== undefined ? Duel.ei : clamp(SAGES[Math.min(P.unlockedIndex(), SAGES.length - 1)].ei, 0, 5);
}
document.addEventListener('click', (e) => { const b = e.target.closest('[data-go]'); if (b) { Audio.click(); go(b.dataset.go); } });

function toast(msg) {
  const box = $('#toasts'); const el = document.createElement('div'); el.className = 'toast'; el.textContent = msg; box.appendChild(el);
  while (box.children.length > 3) box.firstChild.remove();
  setTimeout(() => el.classList.add('fade'), 3200); setTimeout(() => el.remove(), 3800);
}
function floatText(html, x, y, bad) {
  const el = document.createElement('div'); el.className = 'dmg' + (bad ? ' bad' : ''); el.innerHTML = html;
  const r = $('#app').getBoundingClientRect(); el.style.left = (x - r.left) + 'px'; el.style.top = (y - r.top) + 'px'; $('#app').appendChild(el); setTimeout(() => el.remove(), 1200);
}
const starStr = (n) => '<b>★</b>'.repeat(n) + '★'.repeat(3 - n);

// ---------------------------------------------------------------------------
//  FONDO ANIMADO (motas doradas sobre el color de cada época)
// ---------------------------------------------------------------------------
const BG = {
  era: 0, cur: [0, 0, 0, 0, 0, 0], motes: [],
  init() {
    this.c = $('#bg'); this.ctx = this.c.getContext('2d'); this.resize(); window.addEventListener('resize', () => this.resize());
    for (let i = 0; i < 60; i++) this.motes.push({ x: Math.random(), y: Math.random(), s: 0.5 + Math.random() * 1.8, v: 0.004 + Math.random() * 0.012, p: Math.random() * 6 });
    const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
    this.pal = ERA_BG.map(([a, b]) => [hex(a), hex(b)]); this.cur = [...this.pal[0][0], ...this.pal[0][1]];
    const loop = (t) => { this.draw(t / 1000); requestAnimationFrame(loop); }; requestAnimationFrame(loop);
  },
  resize() { const d = Math.min(2, window.devicePixelRatio || 1); this.c.width = innerWidth * d; this.c.height = innerHeight * d; this.d = d; },
  draw(t) {
    const { ctx, c } = this; const tgt = [...this.pal[this.era][0], ...this.pal[this.era][1]];
    for (let i = 0; i < 6; i++) this.cur[i] += (tgt[i] - this.cur[i]) * 0.04;
    const [r1, g1, b1, r2, g2, b2] = this.cur.map(Math.round);
    const gr = ctx.createRadialGradient(c.width / 2, c.height * 0.15, 0, c.width / 2, c.height * 0.4, c.height * 0.9);
    gr.addColorStop(0, `rgba(${r2},${g2},${b2},0.55)`); gr.addColorStop(0.5, `rgb(${r1},${g1},${b1})`); gr.addColorStop(1, '#0a090d');
    ctx.fillStyle = gr; ctx.fillRect(0, 0, c.width, c.height);
    for (const m of this.motes) {
      m.y -= m.v * 0.016 * 4; if (m.y < -0.02) { m.y = 1.02; m.x = Math.random(); }
      const a = 0.25 + 0.35 * Math.sin(t * 1.3 + m.p);
      ctx.fillStyle = `rgba(255,214,140,${a.toFixed(3)})`; ctx.beginPath(); ctx.arc((m.x + Math.sin(t * 0.3 + m.p) * 0.01) * c.width, m.y * c.height, m.s * this.d, 0, TAU); ctx.fill();
    }
  },
};

// ---------------------------------------------------------------------------
//  TÍTULO
// ---------------------------------------------------------------------------
function renderTitle() {
  const ids = ['tales', 'heraclito', 'socrates', 'platon', 'aristoteles', 'agustin', 'descartes', 'kant'].slice(0, innerWidth < 420 ? 7 : 8);
  $('#t-coins').innerHTML = ids.map((id, i) => { const x = SAGES.find((q) => q.s.id === id).s; return coinSVG(x, { metal: P.won(id) ? 'gold' : 'silver' }).replace('class="coin', `style="animation-delay:${i * 0.08}s" class="coin`); }).join('');
  const u = P.unlockedIndex();
  $('#b-play-s').textContent = u === 0 ? 'Empieza el camino con Tales de Mileto' : u >= SAGES.length ? 'Has vencido a todos. ¡Mejora tus estrellas!' : `Siguiente: ${SAGES[u].s.name}`;
  const done = store.get(KEY + 'oraculo', {})[Oracle.today()];
  $('#b-oracle').classList.toggle('fresh', !done);
  $('#b-oracle-s').textContent = done ? `Hoy: ${done.grid}` : '10 preguntas · las mismas para todos';
}

// ---------------------------------------------------------------------------
//  MAPA: el camino de Tales a Kant (de abajo arriba)
// ---------------------------------------------------------------------------
function renderMap() {
  const inner = $('#map-inner'); const W = Math.min(560, innerWidth); const ROW = 118, HEAD = 150, PAD = 90;
  const xs = [0.5, 0.72, 0.5, 0.28];
  // calcular posiciones de abajo arriba
  const items = []; let y = PAD; const bands = [];
  ERAS.forEach((e, ei) => {
    const b0 = y; y += 215;
    e.sages.forEach((s, k) => { items.push({ s, ei, k, y }); y += ROW; });
    y += 10; bands.push({ ei, y0: b0, y1: y });
  });
  const H = y + 40; inner.style.height = H + 'px';
  const toTop = (yy) => H - yy; // invertimos: Tales abajo
  const u = P.unlockedIndex(); let html = '';
  bands.forEach(({ ei, y0, y1 }) => {
    const e = ERAS[ei]; const [c1, c2] = ERA_BG[ei];
    html += `<div class="era-band" style="top:${toTop(y1)}px;height:${y1 - y0}px;background:linear-gradient(0deg, ${c1}cc, ${c2}55 85%, ${c1}00)"><svg class="emb" viewBox="0 0 100 100" style="color:${ERA_TINT[ei]}">${eraEmblem(ei)}</svg></div>`;
    html += `<div class="era-head" style="top:${toTop(y0) - 100}px"><div class="num">${e.num}</div><h3>${esc(e.name)}</h3><p>${esc(e.years)}</p></div>`;
  });
  // camino
  const pts = items.map((it, i) => [xs[i % 4] * W, toTop(it.y)]);
  let d = `M ${pts[0][0]} ${pts[0][1] + 40}`; pts.forEach((p, i) => { if (i === 0) { d += ` L ${p[0]} ${p[1]}`; return; } const q = pts[i - 1]; const my = (p[1] + q[1]) / 2; d += ` C ${q[0]} ${my}, ${p[0]} ${my}, ${p[0]} ${p[1]}`; });
  const doneIdx = Math.max(0, Math.min(u, items.length - 1));
  let dDone = `M ${pts[0][0]} ${pts[0][1] + 40}`; pts.slice(0, doneIdx + 1).forEach((p, i) => { if (i === 0) { dDone += ` L ${p[0]} ${p[1]}`; return; } const q = pts[i - 1]; const my = (p[1] + q[1]) / 2; dDone += ` C ${q[0]} ${my}, ${p[0]} ${my}, ${p[0]} ${p[1]}`; });
  html += `<svg class="path-svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><path d="${d}" fill="none" stroke="rgba(239,227,198,0.22)" stroke-width="5" stroke-dasharray="2 12" stroke-linecap="round"/><path d="${dDone}" fill="none" stroke="#ffd36a" stroke-width="4" stroke-linecap="round" opacity="0.8"/></svg>`;
  items.forEach((it, i) => {
    const st = P.data.stars[it.s.id] || 0; const locked = i > u; const now = i === u;
    const metal = st ? 'gold' : locked ? 'bronze' : 'silver';
    html += `<button class="node${it.s.boss ? ' boss' : ''}${locked ? ' locked' : ''}${now ? ' now' : ''}" data-i="${i}" style="left:${pts[i][0]}px;top:${pts[i][1] - (it.s.boss ? 46 : 38)}px" aria-label="${esc(it.s.name)}${locked ? ', bloqueado' : ''}">
      ${coinSVG(it.s, { metal })}<span class="nm">${esc(it.s.short)}</span><span class="st">${locked ? '' : starStr(st)}</span>${locked ? '<span class="lock">BLOQUEADO</span>' : ''}</button>`;
  });
  inner.innerHTML = html;
  $('#m-stars').textContent = P.totalStars(); $('#m-cards').textContent = P.data.cards.length;
  inner.querySelectorAll('.node').forEach((n) => n.addEventListener('click', () => { const i = +n.dataset.i; Audio.click(); if (i > u) { toast(`Vence antes a ${SAGES[u].s.short}.`); return; } openSheet(i); }));
  // desplazar hasta el filósofo actual
  const sc = $('#map-scroll'); const target = pts[Math.min(u, pts.length - 1)][1] - sc.clientHeight * 0.6;
  requestAnimationFrame(() => (sc.scrollTop = Math.max(0, target)));
  if (Audio.ctx) Audio.startMusic(SAGES[Math.min(u, SAGES.length - 1)].ei);
}

// ---------------------------------------------------------------------------
//  FICHA DEL FILÓSOFO
// ---------------------------------------------------------------------------
function openSheet(i) {
  const { s, ei } = SAGES[i]; const ab = ABILITIES[s.id]; const st = P.data.stars[s.id] || 0; const card = conceptCard(s); const heard = P.data.lessons.includes(s.id);
  const wrap = document.createElement('div'); wrap.className = 'sheet-wrap';
  wrap.innerHTML = `<div class="sheet" role="dialog" aria-label="${esc(s.name)}">
    ${coinSVG(s, { metal: st ? 'gold' : 'silver' })}
    <div class="eyebrow" style="margin-top:6px">${ERAS[ei].num} · ${esc(ERAS[ei].name)}${s.boss ? ' · Maestro' : ''}</div>
    <h2>${esc(s.name)}</h2><p class="meta">${esc(s.epithet)} · ${esc(s.dates)}</p>
    <div class="stars-big">${starStr(st)}</div>
    <p class="quote">«${esc(s.intro)}»</p>
    <div class="ability"><b>Su habilidad · ${esc(ab.name)}</b>${esc(ab.text)}</div>
    <div class="reward">${cardHTML(card, { small: true })}<p>${P.won(s.id) ? 'Ya tienes su carta. Repite el duelo para conseguir más estrellas.' : `Si lo vences, ganas su idea como carta: <b>${esc(s.concept.name)}</b>.`}</p></div>
    <div class="sheet-btns">
      <button class="btn primary" id="sh-duel">Duelo</button>
      <button class="btn" id="sh-lesson">Escuchar su lección<small>${heard ? 'Ya la escuchaste' : 'Unos 2 minutos · empiezas el duelo con una carta extra'}</small></button>
      <button class="btn" style="border:0;background:none" id="sh-close">Volver al camino</button>
    </div></div>`;
  $('#layer').appendChild(wrap);
  const close = () => wrap.remove();
  wrap.addEventListener('click', (e) => { if (e.target === wrap) close(); });
  wrap.querySelector('#sh-close').onclick = () => { Audio.click(); close(); };
  wrap.querySelector('#sh-duel').onclick = () => { close(); Duel.start(i); };
  wrap.querySelector('#sh-lesson').onclick = () => { close(); Lesson.open(s, () => openSheet(i)); };
  Voice.say(s.intro, s);
}

// ---------------------------------------------------------------------------
//  DUELO
// ---------------------------------------------------------------------------
const Duel = {
  start(i) {
    Audio.init();
    const { s, ei } = SAGES[i]; this.i = i; this.s = s; this.ei = ei; this.ab = ABILITIES[s.id];
    this.maxF = s.boss ? (s.final ? 34 : 18 + ei * 3) : 10 + ei * 2; this.foeHp = this.maxF; this.shield = 0;
    this.maxMe = 20 + ei * 2; this.me = this.maxMe; this.atk = (s.boss ? 5 : 4) + Math.floor(ei / 2) + (this.ab.atk || 0);
    this.turn = 0; this.streak = 0; this.wrong = 0; this.correct = 0; this.log = []; this.weaken = 0; this.weakenTurns = 0;
    this.deck = P.deck(); this.hand = []; this.bonusCard = this.lessonBonus === s.id ? LESSON_CARD : null; this.lessonBonus = null;
    this.order = shuffle([...s.q.keys()]); this.qptr = 0;
    $('#d-coin').innerHTML = coinSVG(s, { metal: 'gold' }); $('#d-name').textContent = s.name; $('#d-ep').textContent = s.epithet;
    $('#d-era').textContent = `${ERAS[ei].num} · ${ERAS[ei].name}`;
    go('duel'); BG.era = ei; Audio.startMusic(ei); Audio.mode = s.boss ? 'boss' : 'duel'; Audio.gong(); buzz([20, 60, 20]);
    this.say(s.intro);
    this.nextTurn();
  },
  say(t) { $('#d-say').textContent = '«' + t + '»'; Voice.say(t, this.s); },
  nextQ() { if (this.qptr >= this.order.length) { this.order = shuffle([...this.s.q.keys()]); this.qptr = 0; } return this.s.q[this.order[this.qptr++]]; },
  abilityNow() { const ab = this.ab; return ab.every ? this.turn % ab.every === 0 : false; },
  nextTurn() {
    this.turn++; this.armed = {}; this.played = null; this.answered = false; this.rush = false; this.dodge = false;
    const ab = this.ab; const now = this.abilityNow();
    // efectos del filósofo al empezar el turno
    let note = '';
    if (now) {
      if (ab.heal) { this.foeHp = Math.min(this.maxF, this.foeHp + ab.heal); note = `${ab.name}: recupera ${ab.heal}.`; }
      if (ab.shield) { this.shield += ab.shield; note = `${ab.name}: se escuda con ${ab.shield}.`; Audio.shield(); }
      if (ab.rush) { this.rush = true; note = `${ab.name}: ¡la mitad de tiempo!`; }
      if (ab.dodge) { this.dodge = true; note = `${ab.name}: este turno tu golpe no le afecta.`; }
    }
    // repartir la mano hasta 3 cartas
    this.hand = this.hand.filter(Boolean);
    if (this.bonusCard) { this.hand.push(this.bonusCard); this.bonusCard = null; }
    const pool = this.deck.filter((c) => !this.hand.includes(c));
    shuffle(pool); while (this.hand.length < 3 && pool.length) this.hand.push(pool.pop());
    if (now && ab.steal) { const n = Math.min(ab.steal, this.hand.length); for (let k = 0; k < n; k++) this.hand.splice(Math.floor(Math.random() * this.hand.length), 1); note = ab.steal >= 3 ? `${ab.name}: tu mano queda en blanco.` : `${ab.name}: te quita una carta.`; }
    this.q = this.nextQ(); this.prepQ(); this.render(true);
    if (note) this.say(note);
  },
  prepQ() {
    const opts = this.q.a.map((t, k) => ({ t, ok: k === 0, gone: false })); shuffle(opts); this.opts = opts;
    this.decoy = this.ab.decoy ? opts.findIndex((o) => !o.ok) : -1;
    const base = G.settings.timer; this.maxTime = base ? (this.rush ? Math.max(8, base / 2) : base) : 0; this.time = this.maxTime;
    this.fogT = this.ab.fog || 0; this.askedAt = performance.now();
  },
  render(deal) {
    const s = this.s;
    $('#d-fhp').style.transform = `scaleX(${this.foeHp / this.maxF})`; $('#d-fhpn').innerHTML = `${this.foeHp}/${this.maxF}${this.shield ? ` <span class="shield">◆ ${this.shield}</span>` : ''}`;
    $('#d-mhp').style.transform = `scaleX(${this.me / this.maxMe})`; $('#d-mhpn').textContent = `${this.me}/${this.maxMe}`;
    $('#d-streak').textContent = this.streak >= 2 ? `racha ${this.streak}` : '';
    $('#d-turn').textContent = `Turno ${this.turn}`;
    const ab = this.ab; let hit = this.atk - (this.weakenTurns > 0 ? this.weaken : 0); if (ab.ironia) hit *= 2; hit = Math.max(0, hit);
    let abChip = esc(ab.name);
    if (ab.every) { const left = ab.every - (this.turn % ab.every); abChip += left === ab.every ? ' · ¡ahora!' : ` · en ${left} ${left === 1 ? 'turno' : 'turnos'}`; } else abChip += ' · siempre';
    $('#d-intent').innerHTML = `<span class="chip">Si fallas: −${hit} razón</span><span class="chip ab${this.abilityNow() ? ' now' : ''}" title="${esc(ab.text)}">${abChip}</span>`;
    $('#d-qn').textContent = `Pregunta ${this.turn}`;
    $('#d-q').textContent = this.q.q;
    const box = $('#d-ans'); box.innerHTML = '';
    this.opts.forEach((o, k) => {
      const b = document.createElement('button'); b.className = 'ans' + (o.gone ? ' gone' : '') + (k === this.decoy && !o.gone ? ' decoy' : '');
      b.disabled = o.gone; b.innerHTML = `<span class="k">${'ABCD'[k]}</span><span></span>`; b.lastChild.textContent = o.t;
      b.addEventListener('click', () => this.answer(k)); box.appendChild(b);
    });
    if (this.fogT > 0) { const f = document.createElement('div'); f.className = 'fog'; f.id = 'd-fog'; f.textContent = this.ab.name.toUpperCase(); box.appendChild(f); }
    $('#d-fb').innerHTML = '';
    this.renderHand(deal);
    this.renderPlayed();
  },
  renderHand(deal) {
    const h = $('#d-hand'); h.innerHTML = this.hand.map((c, k) => cardHTML(c, { attrs: `data-k="${k}" role="button" tabindex="0" aria-label="Jugar ${esc(c.name)}: ${esc(c.text)}"` })).join('');
    h.classList.toggle('locked', !!this.played || this.answered);
    [...h.children].forEach((el, k) => { if (deal) { el.classList.add('enter'); el.style.animationDelay = k * 0.08 + 's'; } el.addEventListener('click', () => this.play(k)); el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.play(k); } }); });
    $('#d-hlabel').textContent = this.answered ? '' : this.played ? 'Carta jugada. Ahora responde.' : this.hand.length ? 'Juega una carta antes de responder (opcional)' : 'No te quedan cartas este turno';
  },
  renderPlayed() {
    const el = $('#d-played'); if (!this.played) { el.innerHTML = ''; return; }
    el.innerHTML = `${cardHTML(this.played, { small: true })}<span>${esc(this.played.name)}: ${esc(this.played.text)}</span>`;
  },
  play(k) {
    if (this.played || this.answered) return; const c = this.hand[k]; if (!c) return;
    this.played = c; this.hand.splice(k, 1); const fx = c.fx; Audio.pickup(); buzz(15);
    // efectos inmediatos
    if (fx.heal) { this.me = Math.min(this.maxMe, this.me + fx.heal); floatText(`+${fx.heal}`, innerWidth / 2, innerHeight * 0.82); }
    if (fx.elim) { const wrong = this.opts.map((o, i) => (!o.ok && !o.gone ? i : -1)).filter((i) => i >= 0); shuffle(wrong); wrong.slice(0, fx.elim).forEach((i) => (this.opts[i].gone = true)); }
    if (fx.time && this.maxTime) { this.time += fx.time; this.maxTime += fx.time; }
    if (fx.reroll) { this.q = this.nextQ(); this.prepQ(); this.fogT = 0; }
    if (fx.redraw) { const pool = shuffle(this.deck.filter((x) => x !== c)); this.hand = pool.slice(0, 3); }
    if (fx.draw) { const pool = shuffle(this.deck.filter((x) => !this.hand.includes(x) && x !== c)); for (let n = 0; n < fx.draw && pool.length; n++) this.hand.push(pool.pop()); }
    if (fx.weaken) { this.weaken = fx.weaken; this.weakenTurns = 2; }
    this.armed = fx; this.render(false);
  },
  update(dt) {
    if (this.answered) return;
    if (this.fogT > 0) { this.fogT -= dt; if (this.fogT <= 0) { const f = $('#d-fog'); if (f) { f.style.opacity = 0; setTimeout(() => f.remove(), 400); } this.askedAt = performance.now(); } return; }
    if (!this.maxTime) { $('#d-timer').style.transform = 'scaleX(1)'; $('#d-time').textContent = '∞'; return; }
    this.time -= dt; const k = Math.max(0, this.time / this.maxTime);
    const tb = $('#d-timer'); tb.style.transform = `scaleX(${k})`; tb.classList.toggle('urgent', this.time < 5);
    const sec = Math.max(0, Math.ceil(this.time)); if ($('#d-time').textContent !== String(sec)) { $('#d-time').textContent = sec; if (this.time < 5) Audio.tick(); }
    if (this.time <= 0) this.answer(-1);
  },
  answer(k) {
    if (this.answered || this.fogT > 0) return; if (k >= 0 && this.opts[k].gone) return;
    this.answered = true; const ok = k >= 0 && this.opts[k].ok; const fx = this.armed || {}; const fast = performance.now() - this.askedAt < 6000;
    P.data.answered++; if (ok) P.data.correct++;
    [...$('#d-ans').querySelectorAll('.ans')].forEach((b, i) => { b.disabled = true; if (this.opts[i].ok) b.classList.add('right'); else if (i === k) b.classList.add('wrong'); else b.classList.add('dim'); });
    let msg = '';
    if (ok) {
      this.streak++; this.correct++; Stats.streak(this.streak);
      let dmg = 3 + (fast ? 1 : 0) + (this.streak >= 3 ? 1 : 0) + (fx.dmg || 0) + (fx.streak ? this.streak : 0);
      if (fx.mult) dmg *= fx.mult; if (fx.risk) dmg *= 3;
      if (this.ab.armor) dmg = Math.max(1, dmg - this.ab.armor);
      if (this.dodge) { dmg = 0; msg = `${this.ab.name}: suspende el juicio y tu golpe no le afecta.`; }
      const abs = Math.min(this.shield, dmg); this.shield -= abs; const real = dmg - abs;
      this.foeHp = Math.max(0, this.foeHp - real);
      if (fx.healHit) this.me = Math.min(this.maxMe, this.me + fx.healHit);
      Audio.correct(); buzz(25);
      const fr = $('#d-foe').getBoundingClientRect(); $('#d-foe').classList.remove('hit'); void $('#d-foe').offsetWidth; $('#d-foe').classList.add('hit');
      floatText(`−${real}${abs ? `<small>escudo −${abs}</small>` : fast ? '<small>¡rápido!</small>' : this.streak >= 3 ? `<small>racha ${this.streak}</small>` : ''}`, fr.left + 40, fr.top + 10);
      if (!msg) msg = pick(LINES.right);
      if (Date.now() && performance.now() - this.askedAt < 3000) achieve('veloz');
    } else {
      this.streak = 0; this.wrong++;
      let dmg = this.atk; if (this.ab.ironia) dmg *= 2; if (fx.risk) dmg *= 2;
      if (this.weakenTurns > 0) dmg = Math.max(0, dmg - this.weaken);
      dmg = Math.max(0, dmg - (fx.block || 0)); if (fx.epoje) { dmg = 0; achieve('epoje'); }
      this.me = Math.max(0, this.me - dmg);
      Audio.wrong(); if (dmg) { Audio.hurt(); buzz([50, 40, 80]); $('#duel').classList.remove('hurt'); void $('#duel').offsetWidth; $('#duel').classList.add('hurt'); }
      floatText(dmg ? `−${dmg}<small>razón</small>` : '0<small>bloqueado</small>', innerWidth / 2, innerHeight * 0.78, !!dmg);
      msg = k < 0 ? pick(LINES.timeout) : pick(LINES.wrong);
    }
    if (this.weakenTurns > 0) this.weakenTurns--;
    this.say(msg);
    this.log.push({ q: this.q.q, ok, right: this.opts.find((o) => o.ok).t, e: this.q.e });
    // devolver a la mano las cartas no jugadas (se conservan) y mostrar explicación
    const fb = $('#d-fb'); const right = this.opts.find((o) => o.ok).t;
    fb.innerHTML = `<div class="feedback${ok ? '' : ' bad'}"><b>${ok ? '¡Correcto!' : k < 0 ? 'Se acabó el tiempo' : 'No es correcto'}</b>${ok ? '' : `La respuesta era: <i>${esc(right)}</i>. `}${esc(this.q.e || '')}<button class="btn primary go" id="d-next">${this.foeHp <= 0 ? '¡Victoria!' : this.me <= 0 ? 'Continuar' : 'Siguiente pregunta'}</button></div>`;
    $('#d-next').onclick = () => this.next(); this.render2();
    setTimeout(() => { const b = $('#d-next'); if (b) b.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, 50);
  },
  render2() {
    $('#d-fhp').style.transform = `scaleX(${this.foeHp / this.maxF})`; $('#d-fhpn').innerHTML = `${this.foeHp}/${this.maxF}${this.shield ? ` <span class="shield">◆ ${this.shield}</span>` : ''}`;
    $('#d-mhp').style.transform = `scaleX(${this.me / this.maxMe})`; $('#d-mhpn').textContent = `${this.me}/${this.maxMe}`;
    $('#d-streak').textContent = this.streak >= 2 ? `racha ${this.streak}` : ''; this.renderHand(false);
  },
  next() {
    Audio.click(); P.save();
    if (this.foeHp <= 0) return this.finish(true);
    if (this.me <= 0) return this.finish(false);
    this.nextTurn(); $('#duel').scrollTop = 0;
  },
  quit() { this.answered = true; Voice.stop(); this.finish(false, true); },
  finish(win, gaveUp) {
    const s = this.s; Voice.stop(); this.answered = true;
    const stars = win ? 1 + (this.me >= this.maxMe * 0.5 ? 1 : 0) + (this.wrong === 0 ? 1 : 0) : 0;
    const score = win ? this.me * 10 + this.correct * 50 + stars * 100 + (s.boss ? 200 : 0) : 0;
    const firstWin = win && !P.won(s.id);
    if (win) {
      P.data.stars[s.id] = Math.max(P.data.stars[s.id] || 0, stars); P.data.best[s.id] = Math.max(P.data.best[s.id] || 0, score); P.data.wins++;
      if (firstWin) P.data.cards.push(s.id);
      Audio.victory(); Music.sting('victory'); buzz([30, 50, 30, 50, 140]);
      achieve('primer'); if (stars === 3) achieve('tres'); if (P.data.cards.length >= 12) achieve('coleccion'); if (P.data.cards.length >= 25) achieve('erudito');
      if (P.totalStars() >= 45) achieve('estrellas'); if (P.totalStars() >= 75) achieve('perfecto');
      if (this.armed && this.armed.risk) achieve('riesgo');
      const lastOfEra = ERAS[this.ei].sages[ERAS[this.ei].sages.length - 1].id === s.id; if (lastOfEra) achieve('era' + this.ei);
      if (s.final) achieve('kant');
      Fame.submitCamp();
    } else Audio.tone(220, 1.2, { type: 'sawtooth', vol: 0.1, slide: 0.3, filter: 800 });
    P.save();
    // pantalla de resultado
    const R = $('#result'); R.classList.toggle('lost', !win);
    $('#r-eye').textContent = `${ERAS[this.ei].num} · ${s.name}`;
    $('#r-title').textContent = win ? (s.final ? '¡Sapere aude!' : '¡Victoria!') : gaveUp ? 'Te has retirado' : 'La caverna te reclama';
    $('#r-stars').innerHTML = win ? starStr(stars) : '';
    $('#r-score').textContent = win ? `${this.correct} aciertos · ${this.wrong} fallos · ${fmt(score)} de sabiduría` : `${this.correct} aciertos · ${this.wrong} fallos`;
    $('#r-card').innerHTML = firstWin ? cardHTML(conceptCard(s), { attrs: 'style="margin:0 auto"' }).replace('class="card', 'class="card big') : '';
    $('#r-concept').innerHTML = win ? (firstWin ? `<b>Nueva carta: ${esc(s.concept.name)}</b><br>${esc(s.concept.text)}` : `«${esc(s.defeat)}»`) : 'Escucha su lección o repasa abajo lo que falló, y vuelve a intentarlo.';
    $('#r-list').innerHTML = this.log.map((l) => `<li class="${l.ok ? 'ok' : 'ko'}">${l.ok ? '✓' : '✗'} ${esc(l.q)}${l.ok ? '' : `<span class="a">${esc(l.right)}</span>`}${l.e ? `<span class="e">${esc(l.e)}</span>` : ''}</li>`).join('');
    $('#r-review').open = !win || this.wrong > 0;
    const nextI = this.i + 1;
    let btns = '';
    if (win && nextI < SAGES.length) btns += `<button class="btn primary" id="r-next">Siguiente: ${esc(SAGES[nextI].s.short)}</button>`;
    if (win && s.final) btns += `<button class="btn primary" id="r-share">Compartir mi odisea</button>`;
    if (!win) btns += `<button class="btn primary" id="r-retry">Reintentar</button><button class="btn" id="r-lesson">Escuchar su lección</button>`;
    else if (stars < 3) btns += `<button class="btn" id="r-retry">Repetir por más estrellas</button>`;
    btns += `<button class="btn" id="r-map">Volver al camino</button>`;
    $('#r-btns').innerHTML = btns;
    const on = (id, fn) => { const b = $(id); if (b) b.onclick = () => { Audio.click(); fn(); }; };
    on('#r-next', () => { go('map'); setTimeout(() => openSheet(nextI), 250); });
    on('#r-retry', () => Duel.start(this.i));
    on('#r-lesson', () => Lesson.open(s, () => go('result', false)));
    on('#r-map', () => go('map'));
    on('#r-share', () => shareText(`He completado la Odisea de la Razón: de Tales a Kant con ${P.totalStars()} ★ y ${P.data.cards.length} ideas coleccionadas. ¿Te atreves? https://filosofiaparasereshumanos-ux.github.io/sofos-gpu/`));
    go('result'); R.scrollTop = 0;
    if (win) setTimeout(() => Voice.say(s.defeat, s), 600);
  },
};
$('#d-quit').addEventListener('click', () => { if (Duel.answered && !$('#d-next')) return; Audio.click(); Duel.quit(); });
window.addEventListener('keydown', (e) => {
  if (current === 'duel' && !e.repeat) {
    const n = { Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3, KeyA: 0, KeyB: 1, KeyC: 2, KeyD: 3 }[e.code];
    if (n !== undefined && !Duel.answered && performance.now() - Duel.askedAt > 400) Duel.answer(n);
    if ((e.code === 'Enter' || e.code === 'Space') && $('#d-next')) { e.preventDefault(); $('#d-next').click(); }
  }
  if (current === 'quiz' && !e.repeat) Oracle.key(e);
});

// ---------------------------------------------------------------------------
//  LECCIONES HABLADAS
// ---------------------------------------------------------------------------
const Lesson = {
  open(s, onClose) {
    Audio.init(); this.s = s; this.parts = LESSONS[s.id] || []; this.i = 0; this.k = 0; this.playing = false; this.onClose = onClose; this.rate = 1; this.gen = 0;
    const wrap = document.createElement('div'); wrap.className = 'lesson';
    wrap.innerHTML = `<div class="sheet">${coinSVG(s, { metal: 'gold' })}
      <div class="eyebrow" style="text-align:center;margin-top:6px">Lección</div><h2 style="text-align:center">${esc(s.name)}</h2>
      <div class="ls-dots" id="ls-dots"></div><p class="ls-text" id="ls-text"></p><div id="ls-rew"></div>
      ${Voice.ok() ? '' : '<p style="color:var(--parchment-dim);font-style:italic;font-size:.9rem">Tu navegador no tiene voz: la lección avanzará a ritmo de lectura.</p>'}
      <div class="ls-ctl"><button class="btn" id="ls-prev">Atrás</button><button class="btn primary" id="ls-play">Escuchar</button><button class="btn" id="ls-next">Siguiente</button><button class="btn" id="ls-x" aria-label="Cerrar">✕</button></div></div>`;
    $('#layer').appendChild(wrap); this.wrap = wrap; this.duck(true);
    wrap.querySelector('#ls-play').onclick = () => (this.done ? this.restart() : this.playing ? this.pause() : this.play());
    wrap.querySelector('#ls-next').onclick = () => (this.done ? this.close() : this.skip(1));
    wrap.querySelector('#ls-prev').onclick = () => this.skip(-1);
    wrap.querySelector('#ls-x').onclick = () => this.close();
    this.done = false; this.render(); this.play();
  },
  sentences() { const p = this.parts[this.i] || ''; return (p.match(/[^.!?¿¡]*(?:[¿¡][^?!]*[?!]|[^.!?]+[.!?]+)\s*|[^.!?]+$/g) || [p]).map((x) => x.trim()).filter(Boolean); },
  render() {
    const ss = this.sentences(); const box = this.wrap.querySelector('#ls-text'); box.innerHTML = ss.map((t, k) => `<span class="${k === this.k ? 'on' : ''}">${esc(t)} </span>`).join('');
    this.wrap.querySelector('#ls-dots').innerHTML = this.parts.map((_, k) => `<i class="${k < this.i ? 'done' : k === this.i ? 'now' : ''}"></i>`).join('');
    this.wrap.querySelector('#ls-play').textContent = this.done ? 'Repetir' : this.playing ? 'Pausa' : 'Escuchar';
    this.wrap.querySelector('#ls-next').textContent = this.done ? 'Cerrar' : this.i >= this.parts.length - 1 ? 'Terminar' : 'Siguiente';
  },
  duck(on) { if (!Audio.ctx) return; Audio.music.gain.setTargetAtTime(0.55 * G.settings.music * (on ? 0.18 : 1), Audio.ctx.currentTime, 0.4); },
  play() { this.playing = true; this.render(); this.speak(); },
  pause() { this.playing = false; this.gen++; clearTimeout(this.t); Voice.stop(); this.render(); },
  speak() {
    const gen = ++this.gen; clearTimeout(this.t); const ss = this.sentences(); const text = ss[this.k]; if (!text) return;
    const after = () => { if (gen !== this.gen || !this.playing) return; this.advance(); };
    if (Voice.ok() && Voice.utter(text, this.s, this.rate, after)) this.t = setTimeout(after, (text.length / 11 + 3) * 1000);
    else this.t = setTimeout(after, Math.max(2200, text.length * 62));
  },
  advance() {
    const ss = this.sentences();
    if (this.k < ss.length - 1) { this.k++; this.render(); if (this.playing) this.speak(); return; }
    if (this.i < this.parts.length - 1) { this.i++; this.k = 0; this.render(); if (this.playing) { this.gen++; this.t = setTimeout(() => this.speak(), 450); } return; }
    this.finish();
  },
  skip(d) { Voice.stop(); this.gen++; this.i = clamp(this.i + d, 0, this.parts.length - 1); if (d > 0 && this.i === this.parts.length - 1 && this.k === -1) return this.finish(); this.k = 0; this.render(); if (this.playing) this.speak(); if (d > 0 && this.lastSkip === this.i) this.finish(); this.lastSkip = this.i; },
  finish() {
    this.pause(); this.done = true; const s = this.s;
    if (!P.data.lessons.includes(s.id)) P.data.lessons.push(s.id); P.save();
    achieve('discipulo'); if (P.data.lessons.length >= 10) achieve('academia'); if (P.data.lessons.length >= 25) achieve('liceo');
    Duel.lessonBonus = s.id;
    this.wrap.querySelector('#ls-rew').innerHTML = `<div class="ls-reward">Lección completada. En tu próximo duelo contra ${esc(s.short)} empezarás con la carta <b>Lección aprendida</b> (elimina 2 falsas y +10 s).</div>`;
    Music.sting('achievement'); this.render();
  },
  restart() { this.done = false; this.i = 0; this.k = 0; this.wrap.querySelector('#ls-rew').innerHTML = ''; this.play(); },
  close() { this.pause(); this.duck(false); this.wrap.remove(); if (this.onClose) this.onClose(); },
};

// ---------------------------------------------------------------------------
//  COLECCIÓN
// ---------------------------------------------------------------------------
function renderColl() {
  const g = $('#c-grid'); g.innerHTML = '';
  SAGES.forEach(({ s }) => {
    const own = P.data.cards.includes(s.id);
    const el = document.createElement('div');
    el.innerHTML = own ? cardHTML(conceptCard(s), { attrs: 'role="button" tabindex="0"' }) : `<div class="card locked" role="button" tabindex="0"><div class="c-top"><span>¿?</span></div><div class="c-art" style="font-family:var(--display);font-size:1.6rem;opacity:.5">?</div><div class="c-name">${esc(s.short)}</div><div class="c-text">Véncelo para ganar su idea</div></div>`;
    const card = el.firstElementChild; card.addEventListener('click', () => openCard(s, own)); g.appendChild(card);
  });
  $('#c-start').innerHTML = STARTER.filter((c, i, a) => a.findIndex((x) => x.id === c.id) === i).map((c) => cardHTML(c)).join('');
  $('#c-count').textContent = `${P.data.cards.length} de 25 ideas · ${P.data.lessons.length} lecciones escuchadas`;
}
function openCard(s, own) {
  const wrap = document.createElement('div'); wrap.className = 'sheet-wrap';
  wrap.innerHTML = `<div class="sheet">${own ? `<div style="display:flex;justify-content:center;margin-top:-80px">${cardHTML(conceptCard(s)).replace('class="card', 'class="card big')}</div>` : coinSVG(s, { metal: 'bronze' })}
    <h2 style="margin-top:10px">${own ? esc(s.concept.name) : '¿?'}</h2><p class="meta">${esc(s.name)} · ${esc(s.dates)}</p>
    <p class="quote" style="font-style:normal">${own ? esc(s.concept.text) : 'Vence a este filósofo en el camino para ganar su idea como carta.'}</p>
    <div class="sheet-btns"><button class="btn primary" id="cd-lesson">Escuchar su lección</button><button class="btn" id="cd-close" style="border:0;background:none">Cerrar</button></div></div>`;
  $('#layer').appendChild(wrap);
  wrap.addEventListener('click', (e) => { if (e.target === wrap) wrap.remove(); });
  wrap.querySelector('#cd-close').onclick = () => wrap.remove();
  wrap.querySelector('#cd-lesson').onclick = () => { wrap.remove(); Lesson.open(s, () => renderColl()); };
}

// ---------------------------------------------------------------------------
//  LOGROS
// ---------------------------------------------------------------------------
const ACH = [
  { id: 'primer', i: 'Α', n: 'Primer diálogo', d: 'Vence a tu primer filósofo.' },
  { id: 'tres', i: 'Μ', n: 'Mayéutica perfecta', d: 'Gana un duelo con tres estrellas.' },
  { id: 'veloz', i: 'Ν', n: 'Intuición intelectual', d: 'Acierta una pregunta en menos de 3 segundos.' },
  { id: 'racha', i: 'Λ', n: 'Rayo de razón', d: 'Encadena 10 aciertos seguidos.' },
  { id: 'epoje', i: 'Ε', n: 'Suspensión del juicio', d: 'Evita un golpe con la carta Epojé.' },
  { id: 'riesgo', i: 'Φ', n: 'Virtù', d: 'Gana un duelo dando el golpe final con Virtù y fortuna.' },
  { id: 'era0', i: 'Ι', n: 'Presocrático', d: 'Vence a Parménides y completa la primera época.' },
  { id: 'era1', i: 'Π', n: 'Ciudadano de Atenas', d: 'Vence a Aristóteles.' },
  { id: 'era2', i: 'Σ', n: 'Estoico', d: 'Vence a Marco Aurelio.' },
  { id: 'era3', i: 'Θ', n: 'Escolástico', d: 'Vence a Tomás de Aquino.' },
  { id: 'era4', i: 'Ψ', n: 'Humanista', d: 'Vence a Francis Bacon.' },
  { id: 'kant', i: 'Κ', n: 'Sapere aude', d: 'Vence a Kant y completa la odisea.' },
  { id: 'coleccion', i: 'Δ', n: 'Bibliotecario', d: 'Colecciona 12 cartas de concepto.' },
  { id: 'erudito', i: 'Ω', n: 'Erudito', d: 'Colecciona las 25 ideas.' },
  { id: 'estrellas', i: 'Η', n: 'Constelación', d: 'Consigue 45 estrellas.' },
  { id: 'perfecto', i: 'Β', n: 'Rey filósofo', d: 'Consigue las 75 estrellas.' },
  { id: 'discipulo', i: 'Τ', n: 'Discípulo', d: 'Escucha una lección completa.' },
  { id: 'academia', i: 'Γ', n: 'La Academia', d: 'Escucha 10 lecciones.' },
  { id: 'liceo', i: 'Ζ', n: 'El Liceo completo', d: 'Escucha las 25 lecciones.' },
  { id: 'oraculo', i: 'Ο', n: 'Consultante', d: 'Completa un Oráculo de Delfos.' },
  { id: 'pitia', i: 'Ἀ', n: 'Elegido de Apolo', d: 'Acierta las 10 preguntas del oráculo.' },
];
const Stats = { streak(n) { if (n > (P.data.streakBest || 0)) P.data.streakBest = n; if (n >= 10) achieve('racha'); } };
const achQ = []; let achBusy = false;
function achieve(id) {
  const got = new Set(store.get(KEY + 'logros', [])); if (got.has(id)) return; got.add(id); store.set(KEY + 'logros', [...got]);
  const a = ACH.find((x) => x.id === id); if (!a) return; achQ.push(a); if (!achBusy) nextAch();
}
function nextAch() {
  const a = achQ.shift(); const el = $('#achv'); if (!a) { achBusy = false; el.hidden = true; return; }
  achBusy = true; $('#achv-i').textContent = a.i; $('#achv-n').textContent = a.n; $('#achv-d').textContent = a.d; el.hidden = true; void el.offsetWidth; el.hidden = false;
  Music.sting('achievement'); buzz([20, 40, 20]); setTimeout(nextAch, 3900);
}
function renderLogros() {
  const got = new Set(store.get(KEY + 'logros', []));
  $('#l-list').innerHTML = ACH.map((a) => `<div class="ach${got.has(a.id) ? '' : ' off'}"><span class="ic">${got.has(a.id) ? a.i : '?'}</span><div><h4>${esc(a.n)}</h4><p>${esc(a.d)}</p></div></div>`).join('');
  $('#l-count').textContent = `${got.size} de ${ACH.length} · mejor racha: ${P.data.streakBest || 0} · aciertos: ${P.data.correct}/${P.data.answered}`;
}

// ---------------------------------------------------------------------------
//  SALÓN DE LA FAMA (base de datos compartida del artefacto)
// ---------------------------------------------------------------------------
const Fame = {
  db: null, user: null, uid: null, ready: false, writable: true, tab: 'daily', chain: Promise.resolve(),
  async init() {
    try {
      if (!window.claude || typeof window.claude.use !== 'function') return;
      const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
      this.db = db; this.user = user; this.uid = user ? await user.id() : null; this.ready = !!(db && this.uid);
      if (this.ready && user.can) { const w = await user.can('data.write'); if (w === false) this.writable = false; }
      if (current === 'fame') this.render();
    } catch (e) { this.ready = false; }
  },
  alias() { return String(store.get(KEY + 'alias', '') || '').slice(0, 22); },
  save(patch) {
    if (!this.ready || !this.writable) return Promise.resolve(false);
    this.chain = this.chain.then(async () => {
      const ref = this.db.doc('fama/' + this.uid);
      try { const snap = await ref.get(); const base = snap.exists ? { ...snap.data() } : {}; await ref.set(Object.assign(base, patch, { alias: this.alias(), t: Date.now() })); return true; }
      catch (e) { if (e && e.code === 'invalid_argument') this.writable = false; return false; }
    });
    return this.chain;
  },
  submitCamp() { this.save({ best: P.totalScore(), bestRank: `★ ${P.totalStars()} · ${P.data.cards.length}/25 ideas` }); },
  submitDaily(r) { return this.save({ dailyDate: r.date, dailyScore: r.score, dailyCorrect: r.correct, dailyGrid: r.grid }); },
  async render() {
    const list = $('#f-list'), note = $('#f-note'); list.innerHTML = '';
    $$('#f-tabs button').forEach((b) => b.classList.toggle('on', b.dataset.v === this.tab)); $('#f-alias').value = this.alias();
    if (!this.ready) {
      const mine = store.get(KEY + 'oraculo', {})[Oracle.today()];
      list.innerHTML = `<li class="empty">${this.tab === 'daily' ? (mine ? `Tu oráculo de hoy: ${mine.correct}/10 · ${fmt(mine.score)}` : 'Aún no has consultado al oráculo hoy.') : `Tu campaña: ★ ${P.totalStars()} · ${fmt(P.totalScore())} de sabiduría`}</li>`;
      note.textContent = 'El ranking compartido funciona en la versión publicada en claude.ai, con tu cuenta. Aquí ves tus marcas en este dispositivo.'; return;
    }
    note.textContent = this.writable ? (this.tab === 'daily' ? 'Las preguntas del oráculo son las mismas para todos hoy.' : 'Suma de tus mejores duelos de la campaña.') : 'Puedes ver el ranking, pero tu acceso a esta página no permite publicar puntuaciones.';
    list.innerHTML = '<li class="empty">Consultando los anales…</li>';
    try {
      const col = this.db.collection('fama');
      const q = this.tab === 'daily' ? col.where('dailyDate', '==', Oracle.today()).orderBy('dailyScore', 'desc').limit(30) : col.where('best', '>', 0).orderBy('best', 'desc').limit(30);
      const snap = await Promise.race([q.get(), new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 10000))]);
      const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      if (!rows.length) { list.innerHTML = `<li class="empty">${this.tab === 'daily' ? 'Nadie ha consultado al oráculo hoy. ¡Sé el primero!' : 'Todavía no hay campañas en el salón.'}</li>`; return; }
      let names = {}; try { names = await this.user.profiles(rows.filter((r) => !r.alias).map((r) => r.id)); } catch (e) { /* sin nombres */ }
      list.innerHTML = '';
      rows.forEach((r, i) => {
        const li = document.createElement('li'); if (r.id === this.uid) li.className = 'me';
        const who = String(r.alias || (names[r.id] && names[r.id].name) || 'Pensador anónimo').slice(0, 22);
        const sub = this.tab === 'daily' ? `${r.dailyCorrect ?? '?'}/10` : String(r.bestRank || '');
        li.innerHTML = `<span class="n">${i + 1}</span><span class="who"></span><span class="sc">${fmt(this.tab === 'daily' ? r.dailyScore : r.best)}</span>`;
        li.querySelector('.who').textContent = who; const sm = document.createElement('small'); sm.textContent = sub; li.querySelector('.who').appendChild(sm);
        list.appendChild(li);
      });
    } catch (e) { list.innerHTML = '<li class="empty">No se pudo cargar el ranking ahora. Inténtalo en un momento.</li>'; }
  },
};
$$('#f-tabs button').forEach((b) => b.addEventListener('click', () => { Fame.tab = b.dataset.v; Fame.render(); }));
$('#f-save').addEventListener('click', () => { const v = $('#f-alias').value.replace(/\s+/g, ' ').trim().slice(0, 22); store.set(KEY + 'alias', v); Audio.click(); toast(v ? `Te llamarán «${v}».` : 'Nombre borrado.'); if (Fame.ready) Fame.save({}).then(() => Fame.render()); });

// ---------------------------------------------------------------------------
//  ORÁCULO DE DELFOS: 10 preguntas diarias, iguales para todos
// ---------------------------------------------------------------------------
const Oracle = {
  today() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; },
  label(ds) { const [y, m, d] = ds.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }); },
  build(ds) {
    let h = 2166136261; for (const ch of ds + 'delfos') { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
    const r = mulberry32(h >>> 0); const picks = [];
    ERAS.forEach((e, ei) => picks.push({ s: e.sages[Math.floor(r() * e.sages.length)], ei }));
    const rest = SAGES.filter((x) => !picks.some((p) => p.s === x.s)); shuffle(rest, r); picks.push(...rest.slice(0, 4));
    picks.sort((a, b) => SAGES.findIndex((x) => x.s === a.s) - SAGES.findIndex((x) => x.s === b.s));
    this.qs = picks.map(({ s, ei }) => { const q = s.q[Math.floor(r() * s.q.length)]; return { s, ei, q, opts: shuffle(q.a.map((t, k) => ({ t, ok: k === 0 })), r) }; });
  },
  open() {
    const ds = this.today(); const done = store.get(KEY + 'oraculo', {})[ds];
    $('#o-date').textContent = 'Consulta del ' + this.label(ds);
    $('#o-done').innerHTML = done ? `<div class="grid-emoji">${done.grid}</div><p style="text-align:center;color:var(--parchment-dim)">Hoy: ${done.correct}/10 · ${fmt(done.score)} de sabiduría. Mañana habrá preguntas nuevas.</p>` : '';
    $('#o-start').textContent = done ? 'Practicar otra vez (no puntúa)' : 'Consultar al oráculo';
  },
  start() {
    Audio.init(); const ds = this.today(); this.practice = !!store.get(KEY + 'oraculo', {})[ds];
    this.build(ds); this.i = 0; this.score = 0; this.streak = 0; this.best = 0; this.grid = []; this.correct = 0;
    go('quiz'); Audio.mode = 'duel'; this.ask();
  },
  ask() {
    const it = this.qs[this.i]; this.answered = false; this.time = Math.max(15, G.settings.timer || 0); this.noTimer = !G.settings.timer; this.askedAt = performance.now();
    $('#q-coin').innerHTML = coinSVG(it.s, { metal: 'gold' }); $('#q-name').textContent = it.s.name; $('#q-ep').textContent = `${ERAS[it.ei].num} · ${it.s.epithet}`;
    $('#q-head').textContent = 'Oráculo de Delfos'; $('#q-qn').textContent = `Pregunta ${this.i + 1} de 10`; $('#q-q').textContent = it.q.q;
    $('#q-pips').innerHTML = this.qs.map((_, k) => `<i class="${k < this.grid.length ? (this.grid[k] === '🟥' || this.grid[k] === '⬛' ? 'ko' : 'ok') : ''}"></i>`).join('');
    $('#q-score').textContent = fmt(this.score);
    const box = $('#q-ans'); box.innerHTML = '';
    it.opts.forEach((o, k) => { const b = document.createElement('button'); b.className = 'ans'; b.innerHTML = `<span class="k">${'ABCD'[k]}</span><span></span>`; b.lastChild.textContent = o.t; b.onclick = () => this.answer(k); box.appendChild(b); });
    $('#q-fb').innerHTML = '';
  },
  mult() { return this.streak >= 7 ? 4 : this.streak >= 5 ? 3 : this.streak >= 3 ? 2 : 1; },
  update(dt) {
    if (current !== 'quiz' || this.answered) return;
    if (this.noTimer) { $('#q-timer').style.transform = 'scaleX(1)'; $('#q-time').textContent = '∞'; return; }
    this.time -= dt; $('#q-timer').style.transform = `scaleX(${Math.max(0, this.time / 15)})`; $('#q-time').textContent = Math.max(0, Math.ceil(this.time));
    if (this.time <= 0) this.answer(-1);
  },
  answer(k) {
    if (this.answered) return; this.answered = true; const it = this.qs[this.i]; const ok = k >= 0 && it.opts[k].ok; const secs = (performance.now() - this.askedAt) / 1000;
    [...$('#q-ans').children].forEach((b, j) => { b.disabled = true; if (it.opts[j].ok) b.classList.add('right'); else if (j === k) b.classList.add('wrong'); else b.classList.add('dim'); });
    if (ok) { const fast = secs < 6; this.streak++; this.best = Math.max(this.best, this.streak); this.correct++; const pts = (100 + Math.max(0, Math.ceil((15 - secs) * 10))) * this.mult(); this.score += pts; this.grid.push(fast ? '🟨' : '🟩'); Audio.correct(); buzz(25); const r = $('#q-ans').getBoundingClientRect(); floatText(`+${pts}${this.mult() > 1 ? `<small>racha ×${this.mult()}</small>` : ''}`, r.left + r.width / 2 - 30, r.top - 20); }
    else { this.grid.push(k < 0 ? '⬛' : '🟥'); this.streak = 0; Audio.wrong(); buzz([50, 40, 80]); }
    $('#q-fb').innerHTML = `<div class="feedback${ok ? '' : ' bad'}"><b>${ok ? '¡Correcto!' : k < 0 ? 'Se acabó el tiempo' : 'No es correcto'}</b>${ok ? '' : `La respuesta era: <i>${esc(it.opts.find((o) => o.ok).t)}</i>. `}${esc(it.q.e || '')}<button class="btn primary go" id="q-next">${this.i >= 9 ? 'Ver la respuesta del oráculo' : 'Siguiente'}</button></div>`;
    $('#q-next').onclick = () => { Audio.click(); this.i++; if (this.i >= 10) this.finish(); else this.ask(); };
    $('#q-score').textContent = fmt(this.score);
  },
  key(e) {
    const n = { Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3 }[e.code];
    if (n !== undefined && !this.answered && performance.now() - this.askedAt > 400) this.answer(n);
    if ((e.code === 'Enter' || e.code === 'Space') && $('#q-next')) { e.preventDefault(); $('#q-next').click(); }
  },
  finish() {
    const ds = this.today(); const grid = this.grid.join(''); const c = this.correct;
    const [title, msg] = c === 10 ? ['Elegido de Apolo', 'Perfecto. La Pitia guarda silencio ante ti.'] : c >= 8 ? ['Sabio de Delfos', 'Pocos mortales responden así al oráculo.'] : c >= 6 ? ['Filósofo', 'Buen juicio. El oráculo asiente.'] : c >= 4 ? ['Aprendiz', 'Sabes que no sabes: es un buen comienzo.'] : ['Habitante de la caverna', 'Las sombras te confunden hoy. Mañana, otra oportunidad.'];
    if (!this.practice) { const all = store.get(KEY + 'oraculo', {}); all[ds] = { date: ds, score: this.score, correct: c, grid }; store.set(KEY + 'oraculo', all); Fame.submitDaily(all[ds]); }
    achieve('oraculo'); if (c === 10) achieve('pitia'); Audio.victory();
    $('#oe-eye').textContent = this.practice ? 'Práctica · no cuenta para el ranking' : 'El oráculo ha hablado · ' + this.label(ds);
    $('#oe-title').textContent = title; $('#oe-grid').textContent = grid; $('#oe-msg').textContent = msg;
    $('#oe-stats').innerHTML = `<div><b>${c}/10</b><span>Aciertos</span></div><div><b>${fmt(this.score)}</b><span>Sabiduría</span></div><div><b>${this.best}</b><span>Mejor racha</span></div>`;
    $('#o-share').value = `Odisea de la Razón · Oráculo de Delfos\n${this.label(ds)}\n${grid}\n${c}/10 · ${fmt(this.score)} de sabiduría · «${title}»\n¿Puedes superarme? https://filosofiaparasereshumanos-ux.github.io/sofos-gpu/`;
    go('oend');
  },
};
$('#o-start').addEventListener('click', () => { Audio.click(); Oracle.start(); });
$('#q-quit').addEventListener('click', () => { Audio.click(); go('oracle'); });
function shareText(text) {
  const done = () => toast('Copiado. Pégalo donde quieras.');
  const fb = () => { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (e) { toast('No se pudo copiar automáticamente.'); } ta.remove(); };
  try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fb); else fb(); } catch (e) { fb(); }
}
$('#o-copy').addEventListener('click', () => { const ta = $('#o-share'); try { navigator.clipboard.writeText(ta.value).then(() => toast('Copiado. Pégalo donde quieras.'), () => { ta.select(); toast('Selecciona el texto y cópialo.'); }); } catch (e) { ta.select(); } });

// ---------------------------------------------------------------------------
//  AJUSTES
// ---------------------------------------------------------------------------
function syncSettings() {
  $('#s-music').value = G.settings.music; $('#s-sfx').value = G.settings.sfx;
  $$('#s-timer button').forEach((b) => b.classList.toggle('on', +b.dataset.v === +G.settings.timer));
  $$('#s-voices button').forEach((b) => b.classList.toggle('on', (b.dataset.v === '1') === !!G.settings.voices));
  $$('#s-vib button').forEach((b) => b.classList.toggle('on', (b.dataset.v === '1') === !!G.settings.vibrate));
  $('#s-reset').textContent = 'Borrar mi progreso'; resetArm = false;
}
let resetArm = false;
$('#s-music').addEventListener('input', (e) => { G.settings.music = +e.target.value; saveSettings(); });
$('#s-sfx').addEventListener('input', (e) => { G.settings.sfx = +e.target.value; saveSettings(); Audio.click(); });
$$('#s-timer button').forEach((b) => b.addEventListener('click', () => { G.settings.timer = +b.dataset.v; saveSettings(); syncSettings(); }));
$$('#s-voices button').forEach((b) => b.addEventListener('click', () => { G.settings.voices = b.dataset.v === '1'; saveSettings(); syncSettings(); if (G.settings.voices) Voice.utter('La filosofía comienza con el asombro.', null); else Voice.stop(); }));
$$('#s-vib button').forEach((b) => b.addEventListener('click', () => { G.settings.vibrate = b.dataset.v === '1'; saveSettings(); syncSettings(); buzz(40); }));
$('#s-reset').addEventListener('click', () => {
  if (!resetArm) { resetArm = true; $('#s-reset').textContent = 'Pulsa otra vez para confirmar'; return; }
  P.data = { stars: {}, best: {}, cards: [], lessons: [], streakBest: 0, wins: 0, correct: 0, answered: 0 }; P.save(); store.set(KEY + 'logros', []);
  syncSettings(); toast('Progreso borrado. El camino empieza de nuevo.');
});

// ---------------------------------------------------------------------------
//  BOTONES DEL TÍTULO Y ARRANQUE
// ---------------------------------------------------------------------------
const tb = (id, fn) => $(id).addEventListener('click', () => { Audio.init(); Audio.click(); fn(); });
tb('#b-play', () => { go('map'); if (P.unlockedIndex() === 0 && !P.data.answered) setTimeout(() => toast('Toca a Tales para empezar tu odisea.'), 600); });
tb('#b-oracle', () => go('oracle'));
tb('#b-coll', () => go('coll'));
tb('#b-fame', () => go('fame'));
tb('#b-logros', () => go('logros'));
tb('#b-how', () => go('how'));
tb('#b-set', () => go('settings'));
let lastT = performance.now();
function tick(t) { const dt = Math.min(0.1, (t - lastT) / 1000); lastT = t; if (current === 'duel') Duel.update(dt); if (current === 'quiz') Oracle.update(dt); Audio.updateMusic(); requestAnimationFrame(tick); }
document.addEventListener('visibilitychange', () => { if (document.hidden) { Voice.stop(); if (Audio.ctx) Audio.ctx.suspend(); } else if (Audio.ctx) Audio.ctx.resume(); });
const unlock = () => { Audio.init(); Audio.startMusic(clamp(SAGES[Math.min(P.unlockedIndex(), SAGES.length - 1)].ei, 0, 5)); window.removeEventListener('pointerdown', unlock); };
window.addEventListener('pointerdown', unlock);
(async function boot() {
  try { await Promise.race([document.fonts.ready, wait(2500)]); } catch (e) { /* sin fuentes */ }
  BG.init(); go('title', false); $('#loading').style.display = 'none'; requestAnimationFrame(tick); Fame.init();
})();
if (location.hash === '#debug') window.__dbg = { P, Duel, Oracle, Lesson, go, SAGES, achieve, openSheet };
