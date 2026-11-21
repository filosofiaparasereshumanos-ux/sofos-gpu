// ============================================================================
//  EL EVENTO DE LA SEMANA
//  Cada lunes cambia: un pensador destacado (vencerlo da el doble de sabiduría y
//  lleva una estrella dorada en su mundo) y dos retos más. Son los mismos para
//  todos los jugadores esa semana. Completar los tres da un premio grande y el
//  logro «Viajero de la semana». La tarjeta está en la portada y lleva directo
//  al pensador.
// ============================================================================
const SEM_KEY = 'odisea-razon.semana';
const SEM_RETOS = [['win', 'Gana 5 debates', 5], ['ok', 'Acierta 25 argumentos', 25], ['streak', 'Logra una racha de 6 aciertos', 6], ['boss', 'Convence a un maestro de época', 1], ['win3', 'Gana 3 debates sin fallar', 3]];
ACH.push({ id: 'semana', i: '⭐', n: 'Viajero de la semana', d: 'Completa los tres retos del evento semanal.' });
const Semana = {
  T: { eye: 'Evento de la semana', left: (n) => n === 1 ? 'último día' : `quedan ${n} días`, feat: (s) => `Vence a ${s} · sabiduría doble`, go: 'Ir ahora ▶', done: '¡Completado!', star: (s) => `⭐ Esta semana destaca ${s}: gana su debate y la sabiduría será doble.`, x2: 'premio doble de la semana', fin: '⭐ ¡Evento de la semana completado! +1000 sabiduría.', hit: (t) => '⭐ ' + `Reto de la semana cumplido: ${t}` },
  week() { return Oracle.weekKey(); },
  left() { const d = new Date(); return 7 - ((d.getDay() + 6) % 7); },
  pool() { if (!this._pool) { this._pool = []; ERAS.forEach((e, idx) => { if (e.sacred) return; for (const s of e.sages) if (!s.boss) this._pool.push({ s, idx }); }); } return this._pool; },
  info() {
    const wk = this.week(); if (this._wk === wk) return this._info;
    const r = mulberry32(Juntos.hash('sem' + wk)); const P = this.pool(); const f = P[Math.floor(r() * P.length)];
    const idx = SEM_RETOS.map((_, i) => i); for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
    this._wk = wk; this._info = { wk, feat: f.s, idx: f.idx, retos: idx.slice(0, 2).map((i) => SEM_RETOS[i]) }; return this._info;
  },
  st() { let s = store.get(SEM_KEY, null); const wk = this.week(); if (!s || s.wk !== wk) s = { wk, feat: 0, n: {}, done: false }; return s; },
  progress(s = this.st()) { const I = this.info(); return [s.feat ? 1 : 0, ...I.retos.map(([k, , n]) => Math.min(1, (s.n[k] || 0) / n))]; },
  bump(k, v, max) {
    const s = this.st(), I = this.info(); const R = I.retos.find((x) => x[0] === k); if (!R || s.done) return;
    const before = s.n[k] || 0; s.n[k] = max ? Math.max(before, v) : before + v; if (before < R[2] && s.n[k] >= R[2]) toast(this.T.hit(R[1]));
    this.save(s);
  },
  save(s) {
    if (!s.done && this.progress(s).every((p) => p >= 1)) { s.done = true; try { addScore(1000); } catch (e) { /* fuera de una partida */ } setTimeout(() => toast(this.T.fin), 900); achieve('semana'); Audio.victory && Audio.victory(); }
    store.set(SEM_KEY, s); this.paint();
  },
  paint() {
    const card = this.card(); if (!card) return; const I = this.info(), s = this.st(), P = this.progress(s);
    card.querySelector('.sm-eye').textContent = `⭐ ${this.T.eye} · ${s.done ? this.T.done : this.T.left(this.left())}`;
    setMedal(card.querySelector('.medal'), I.feat.id, I.feat.short[0]);
    card.querySelector('.sm-t').textContent = this.T.feat(I.feat.short); card.querySelector('.sm-e').textContent = ERAS[I.idx].name;
    const rows = [[this.T.feat(I.feat.short).split(' · ')[0], P[0]], ...I.retos.map(([k, t, n], j) => [`${t}${n > 1 && P[j + 1] < 1 ? ` (${Math.min(n, s.n[k] || 0)}/${n})` : ''}`, P[j + 1]])];
    const box = card.querySelector('.sm-r'); box.innerHTML = '';
    for (const [t, p] of rows) { const r = document.createElement('span'); r.className = p >= 1 ? 'ok' : ''; r.textContent = (p >= 1 ? '✓ ' : '○ ') + t; box.appendChild(r); }
    card.querySelector('.sm-go').textContent = this.T.go; card.classList.toggle('done', !!s.done);
  },
  card() {
    let c = document.getElementById('sem-card'); if (c) return c; const anchor = document.getElementById('fr-dia'); if (!anchor) return null;
    c = document.createElement('button'); c.id = 'sem-card'; c.innerHTML = '<span class="sm-eye"></span><span class="sm-m"><i class="medal"></i><span class="sm-tx"><b class="sm-t"></b><small class="sm-e"></small></span><span class="sm-go"></span></span><span class="sm-r"></span>';
    anchor.before(c); c.addEventListener('click', () => this.go()); return c;
  },
  go() {
    Audio.init && Audio.init(); Audio.click && Audio.click(); const I = this.info();
    if (typeof Ir !== 'undefined') Ir.pend = { sage: I.feat.id, de: '', idx: I.idx };
    G.travelFrom = 'title'; G.explore = false; travelTo(I.idx);
  },
  // estrella dorada sobre el pensador de la semana
  mark() {
    if (!world) return; const I = this.info(); if (world.idx !== I.idx) return; const s = sages.find((x) => x.data.id === I.feat.id); if (!s || s._star) return;
    const cv = document.createElement('canvas'); cv.width = cv.height = 128; const c = cv.getContext('2d');
    c.translate(64, 64); c.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? 24 : 56, a = (i / 10) * Math.PI * 2 - Math.PI / 2; c.lineTo(Math.cos(a) * r, Math.sin(a) * r); } c.closePath();
    const g = c.createRadialGradient(0, -8, 4, 0, 0, 60); g.addColorStop(0, '#fff6c8'); g.addColorStop(0.5, '#ffd36a'); g.addColorStop(1, '#c88a20'); c.fillStyle = g; c.shadowColor = '#ffb030'; c.shadowBlur = 14; c.fill(); c.lineWidth = 4; c.strokeStyle = '#7a4a10'; c.stroke();
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false })); sp.scale.setScalar(0.5); sp.position.y = 2.75 * s.scale + 0.95; s.group.add(sp); s._star = sp;
    world.anim.push((t) => { sp.position.y = 2.75 * s.scale + 0.95 + Math.sin(t * 2.4) * 0.08; sp.material.rotation = Math.sin(t * 1.3) * 0.25; sp.visible = s.state !== 'defeated' || !this.st().feat; });
  },
};
{
  const w0 = Duel.win.bind(Duel);
  Duel.win = function () {
    const s = this.sage; w0(); if (!s) return;
    try {
      const I = Semana.info(), st = Semana.st();
      if (s.data.id === I.feat.id) { const b = s.boss ? 500 : 250; addScore(b); popup(`+${b}<small>⭐ ${Semana.T.x2}</small>`); if (!st.feat) { st.feat = 1; Semana.save(st); toast(Semana.T.hit(Semana.T.feat(I.feat.short).split(' · ')[0])); } }
      Semana.bump('win', 1); if (s.boss) Semana.bump('boss', 1); if (!s._wrongs) Semana.bump('win3', 1);
    } catch (e) { console.warn('semana', e); }
  };
  const a0 = Duel.answer.bind(Duel);
  Duel.answer = function (i) { const was = this.answered; a0(i); if (was || !this.answered || this._oracle) return; try { if (i >= 0 && this.opts[i] && this.opts[i].ok) { Semana.bump('ok', 1); Semana.bump('streak', G.streak, true); } } catch (e) { /* nada */ } };
  const e0 = enterEra;
  enterEra = function () {
    const was = G.state; e0(); if (was !== 'intro' || G.state !== 'play') return;
    try { Semana.mark(); const I = Semana.info(); if (world.idx === I.idx && !Semana.st().feat) setTimeout(() => toast(Semana.T.star(I.feat.short)), 2600); } catch (e) { console.warn('semana', e); }
  };
}
setTimeout(() => { try { Semana.paint(); } catch (e) { console.warn('semana', e); } }, 800);
{
  const st = document.createElement('style');
  st.textContent = '#sem-card{display:block;width:min(440px,92vw);margin:10px auto 0;padding:10px 14px 11px;text-align:left;border-radius:14px;cursor:pointer;color:#fff4dc;font-family:var(--body,Georgia);background:linear-gradient(150deg,rgba(90,60,14,.85),rgba(30,20,8,.88));border:1.5px solid var(--gold,#d8b25a);box-shadow:0 0 0 0 rgba(255,211,106,.4),0 6px 22px rgba(0,0,0,.45);animation:smGlow 2.8s ease-in-out infinite}'
    + '@keyframes smGlow{50%{box-shadow:0 0 22px rgba(255,211,106,.45),0 6px 22px rgba(0,0,0,.45)}}#sem-card.done{animation:none;opacity:.85}'
    + '#sem-card .sm-eye{display:block;font-family:var(--display,Georgia);font-size:.66rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gold-bright,#ffd36a)}'
    + '#sem-card .sm-m{display:flex;align-items:center;gap:10px;margin:6px 0 6px}#sem-card .medal{width:42px;height:42px;flex:none;font-size:1.1rem}#sem-card .sm-tx{flex:1;min-width:0}#sem-card .sm-t{display:block;font-size:1rem;color:#ffe9b0;line-height:1.2}#sem-card .sm-e{display:block;font-size:.78rem;opacity:.8}'
    + '#sem-card .sm-go{flex:none;font-family:var(--display,Georgia);font-size:.74rem;letter-spacing:.06em;padding:6px 10px;border-radius:999px;background:linear-gradient(180deg,#ffe9a8,#e2b04e);color:#1a1206}'
    + '#sem-card .sm-r{display:flex;flex-direction:column;gap:2px;font-size:.8rem;opacity:.92}#sem-card .sm-r .ok{color:#9fe08a}';
  document.head.appendChild(st);
}
if (location.hash === '#debug') window.__semana = Semana;
