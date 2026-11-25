// ============================================================================
//  EL LIBRO DE LA RAZÓN: la historia que une las épocas.
//  El Gran Sofista arrancó las páginas del libro que escribieron los sabios y
//  las repartió entre los maestros de cada época. Cada maestro convencido
//  devuelve su página (su gran idea). Los capítulos aparecen con la primera
//  victoria y con 1, 3 y 6 páginas; con seis se desbloquea el debate final
//  contra el Gran Sofista (con «Debate tú»). Al vencerlo, el epílogo.
// ============================================================================
const HIST_KEY = 'odisea-razon.historia', HIST_META = 6;
ACH.push({ id: 'libro', i: '📜', n: 'El Libro de la Razón', d: 'Recupera el libro venciendo al Gran Sofista con razones.' });
const Historia = {
  T: {
    eye: 'El Libro de la Razón', story: 'La historia de tu viaje', next: 'Continuar', close: 'Cerrar', open: 'Abrir el libro', pages: (n, m) => `${n} de ${m} páginas`, of: (n) => `${n} recuperadas`,
    face: '⚔ Enfrentar al Gran Sofista', locked: (n) => `Reúne ${n} páginas más para enfrentarte al Gran Sofista.`, done: '📜 Libro recuperado', chapters: 'Capítulos', pagesH: 'Páginas recuperadas',
    none: 'Todavía no tienes páginas. Convence al maestro de una época para recuperar la primera.', reread: 'Volver a leer', lost: 'El Gran Sofista se ríe y guarda las páginas. Vuelve a intentarlo cuando quieras desde el Libro de la Razón.',
    win: '📜 ¡Has recuperado el Libro de la Razón! +2000 sabiduría.', newPage: (n) => `📜 Recuperaste una página del Libro de la Razón: «${n}».`, card: 'El Libro de la Razón', cardS: (n, m) => `${n} de ${m} páginas · toca para abrirlo`,
  },
  st() { const s = store.get(HIST_KEY, null); return s && typeof s === 'object' ? { seen: s.seen || [], won: !!s.won } : { seen: [], won: false }; },
  save(s) { store.set(HIST_KEY, s); this.paintCard(); },
  pages() { const out = []; for (const i of CHRONO) { const b = ERAS[i].sages.find((x) => x.boss); if (b && G.codex.has(b.id)) out.push({ b, e: ERAS[i] }); } return out; },
  due() {
    const s = this.st(), n = this.pages().length;
    for (const c of HISTORIA) { if (c.at < 0 || s.seen.includes(c.id)) continue; if (c.at === 0 ? G.codex.size > 0 : n >= c.at) return c; }
    return null;
  },
  // ---------------------------------------------------------------- capítulos
  build() {
    if (document.getElementById('hist')) return;
    const el = document.createElement('div'); el.id = 'hist'; el.className = 'nb'; el.hidden = true;
    el.innerHTML = '<div class="nb-card hist-card" role="dialog"><div class="eyebrow"></div><h3 class="hist-t"></h3><div class="hist-p"></div><div class="btns"><button class="btn primary" id="hist-next"></button></div></div>';
    document.body.appendChild(el); el.querySelector('.eyebrow').textContent = this.T.eye;
    el.querySelector('#hist-next').addEventListener('click', () => this.step());
  },
  show(c, then) {
    this.build(); this.c = c; this.k = 0; this.then = then || null; const el = document.getElementById('hist');
    el.querySelector('.hist-t').textContent = c.t; el.querySelector('.hist-p').innerHTML = ''; Panel.open('hist');
    Audio.init && Audio.init(); Audio.tone && Audio.tone(196, 2.2, { type: 'sine', vol: 0.12, slide: 1.5 }); this.para();
  },
  para() {
    const c = this.c, p = document.createElement('p'); p.textContent = c.p[this.k]; document.querySelector('#hist .hist-p').appendChild(p);
    const gen = (this.gen = (this.gen || 0) + 1); const parts = narrSplit(c.p[this.k]); let j = 0;
    const say = () => { if (gen !== this.gen || j >= parts.length) return; Voice.utter(parts[j++], null, 1, say); }; say();
    const last = this.k >= c.p.length - 1; $('#hist-next').textContent = last ? (c.id === 'cap3' ? this.T.open : this.T.close) : this.T.next;
    requestAnimationFrame(() => { const card = document.querySelector('#hist .nb-card'); if (card) card.scrollTo({ top: card.scrollHeight, behavior: 'smooth' }); });
  },
  step() {
    Audio.click && Audio.click(); this.gen++; Voice.stop();
    if (this.k < this.c.p.length - 1) { this.k++; this.para(); return; }
    const c = this.c; Panel.close('hist');
    const s = this.st(); if (!s.seen.includes(c.id)) { s.seen.push(c.id); this.save(s); }
    if (c.id === 'cap3') setTimeout(() => this.open(), 300);
    if (this.then) { const f = this.then; this.then = null; f(); }
  },
  check() { if (G.state !== 'play') return; const h = document.getElementById('hist'); if (h && !h.hidden) return; const c = this.due(); if (c) this.show(c); },
  // ---------------------------------------------------------------- el libro
  buildBook() {
    if (document.getElementById('libro')) return;
    const el = document.createElement('div'); el.id = 'libro'; el.className = 'nb'; el.hidden = true;
    el.innerHTML = '<div class="nb-card hist-card lib-card" role="dialog"><button class="ls-x pn-x" id="lib-x" aria-label="✕">✕</button><div class="eyebrow"></div><h3 class="av-h"></h3><div class="lib-prog"><i></i></div><p class="lib-s"></p><div class="lib-go"></div><h4 class="lib-h1"></h4><div class="lib-ch"></div><h4 class="lib-h2"></h4><div class="lib-pages"></div></div>';
    document.body.appendChild(el); el.querySelector('.eyebrow').textContent = this.T.story; el.querySelector('h3').textContent = this.T.eye;
    el.querySelector('.lib-h1').textContent = this.T.chapters; el.querySelector('.lib-h2').textContent = this.T.pagesH;
    el.querySelector('#lib-x').addEventListener('click', () => { Audio.click && Audio.click(); Panel.close('libro'); });
  },
  open() {
    this.buildBook(); const el = document.getElementById('libro'), s = this.st(), P = this.pages(), n = P.length;
    el.querySelector('.lib-prog i').style.width = Math.min(1, n / HIST_META) * 100 + '%';
    el.querySelector('.lib-s').textContent = s.won ? this.T.done + ' · ' + this.T.of(n) : this.T.pages(Math.min(n, HIST_META), HIST_META) + (n > HIST_META ? ' · ' + this.T.of(n) : '');
    const go = el.querySelector('.lib-go'); go.innerHTML = '';
    if (!s.won && n >= HIST_META) { const b = document.createElement('button'); b.className = 'btn primary lib-face'; b.textContent = this.T.face; b.addEventListener('click', () => { Audio.click && Audio.click(); Panel.close('libro'); this.duel(); }); go.appendChild(b); }
    else if (!s.won) { const p = document.createElement('p'); p.className = 'qd-note'; p.textContent = this.T.locked(HIST_META - n); go.appendChild(p); }
    const ch = el.querySelector('.lib-ch'); ch.innerHTML = '';
    for (const c of HISTORIA) { if (!s.seen.includes(c.id)) continue; const b = document.createElement('button'); b.className = 'lib-chap'; b.textContent = '▸ ' + c.t; b.addEventListener('click', () => { Panel.close('libro'); this.show(c, () => this.open()); }); ch.appendChild(b); }
    const pg = el.querySelector('.lib-pages'); pg.innerHTML = '';
    if (!P.length) { const p = document.createElement('p'); p.className = 'qd-note'; p.textContent = this.T.none; pg.appendChild(p); }
    for (const { b, e } of P) { const d = document.createElement('div'); d.className = 'lib-page'; d.innerHTML = '<i class="medal"></i><div><b></b><small></small><p></p></div>'; setMedal(d.querySelector('.medal'), b.id, b.short[0]); d.querySelector('b').textContent = b.concept.name; d.querySelector('small').textContent = `${b.short} · ${e.name}`; d.querySelector('p').textContent = b.concept.text; pg.appendChild(d); }
    Panel.open('libro');
  },
  duel() {
    Postura.open(POSTURA_SOFISTA, (lv, sc) => {
      if (lv === 'bajo' || sc < 6) { setTimeout(() => toast(this.T.lost), 1500); return; }
      const s = this.st(); if (s.won) return; s.won = true; this.save(s);
      achieve('libro'); try { addScore(2000); } catch (e) { /* fuera de una partida */ } Audio.victory && Audio.victory();
      setTimeout(() => { Panel.close('vs'); toast(this.T.win); this.show(HISTORIA.find((c) => c.id === 'fin')); }, 4200);
    });
  },
  // tarjeta en la portada
  paintCard() {
    let c = document.getElementById('lib-card'); const anchor = document.getElementById('sem-card') || document.getElementById('fr-dia'); if (!anchor) return;
    if (!c) { c = document.createElement('button'); c.id = 'lib-card'; c.innerHTML = '<b>📜</b><span><strong></strong><small></small></span><i class="lib-mini"><em></em></i>'; anchor.after(c); c.addEventListener('click', () => { Audio.init && Audio.init(); Audio.click && Audio.click(); this.open(); }); }
    const n = this.pages().length, s = this.st(); c.querySelector('strong').textContent = this.T.card; c.querySelector('small').textContent = s.won ? this.T.done : this.T.cardS(Math.min(n, HIST_META), HIST_META);
    c.querySelector('em').style.width = (s.won ? 100 : Math.min(1, n / HIST_META) * 100) + '%'; c.classList.toggle('ready', !s.won && n >= HIST_META);
  },
};
// cuándo aparecen los capítulos: al volver a caminar tras una victoria, o al entrar en una época
{
  const c0 = closeConcept;
  closeConcept = function () {
    const s = Duel._won; c0();
    if (s && s.boss) setTimeout(() => toast(Historia.T.newPage(s.data.concept.name)), 2400);
    setTimeout(() => Historia.check(), s && s.boss ? 4200 : 1400);
  };
  { const b = document.getElementById('b-concept'); if (b) { b.removeEventListener('click', c0); b.addEventListener('click', () => closeConcept()); } }
  const e0 = enterEra;
  enterEra = function () { const was = G.state; e0(); if (was === 'intro' && G.state === 'play') setTimeout(() => Historia.check(), 3500); };
  // en la pausa: abrir el libro
  const btns = document.querySelector('#pause .btns') || (document.getElementById('b-pcodex') && document.getElementById('b-pcodex').parentNode);
  if (btns) { const b = document.createElement('button'); b.className = 'btn'; b.id = 'b-plibro'; b.textContent = '📜 ' + Historia.T.eye; b.addEventListener('click', () => { Audio.click && Audio.click(); Historia.open(); }); btns.insertBefore(b, document.getElementById('b-psettings') || null); }
  // al cerrar el panel de debates, la voz se calla del todo
  const x0 = Versus.close.bind(Versus); Versus.close = function () { Postura.gen = (Postura.gen || 0) + 1; x0(); };
}
setTimeout(() => { try { Historia.paintCard(); } catch (e) { console.warn('historia', e); } }, 900);
{
  const st = document.createElement('style');
  st.textContent = '#hist{z-index:70}.hist-card{background:linear-gradient(170deg,#2a2012,#16100a);border-color:#c8a050;box-shadow:0 0 40px rgba(216,178,90,.25),0 20px 60px rgba(0,0,0,.6)}'
    + '.hist-t{font-family:var(--display);font-weight:normal;color:#ffe2a0;font-size:1.3rem;margin:4px 0 10px;letter-spacing:.04em}.hist-p p{margin:0 0 12px;line-height:1.6;color:#f6ead0;font-size:1.02rem;animation:poIn .6s ease}'
    + '#hist .eyebrow,#libro .eyebrow{color:#d8b25a}.lib-prog{height:8px;border-radius:5px;background:rgba(255,255,255,.08);overflow:hidden;margin:6px 0}.lib-prog i{display:block;height:100%;background:linear-gradient(90deg,#c8a050,#ffe2a0)}.lib-s{margin:2px 0 10px;color:#f3e6c4;text-align:center}'
    + '.lib-face{width:100%;font-size:1.05rem;animation:smGlow 2s ease-in-out infinite;margin-bottom:8px}.lib-card h4{font-family:var(--display);font-weight:normal;color:#ffd36a;letter-spacing:.12em;text-transform:uppercase;font-size:.78rem;margin:14px 0 6px}'
    + '.lib-chap{display:block;width:100%;text-align:left;border:0;border-bottom:1px solid rgba(216,178,90,.2);background:none;color:#f3e6c4;font:inherit;padding:8px 2px;cursor:pointer}'
    + '.lib-page{display:grid;grid-template-columns:44px 1fr;gap:10px;align-items:start;padding:10px;margin:6px 0;border-radius:10px;background:rgba(255,236,190,.05);border:1px solid rgba(216,178,90,.25)}.lib-page .medal{width:44px;height:44px}.lib-page b{display:block;color:#ffe2a0;font-weight:normal;font-family:var(--display)}.lib-page small{display:block;color:#bfae8e;font-size:.76rem;margin-bottom:4px}.lib-page p{margin:0;font-size:.9rem;line-height:1.4;color:#f3e6c4}'
    + '#lib-card{display:flex;align-items:center;gap:10px;width:min(440px,92vw);margin:8px auto 0;padding:9px 14px;border-radius:12px;border:1px solid rgba(216,178,90,.55);background:linear-gradient(150deg,rgba(60,40,14,.8),rgba(24,16,8,.85));color:#fff4dc;font-family:var(--body,Georgia);text-align:left;cursor:pointer}'
    + '#lib-card>b{font-size:1.5rem}#lib-card span{flex:1;min-width:0}#lib-card strong{display:block;font-weight:normal;font-family:var(--display);color:#ffe2a0;letter-spacing:.04em}#lib-card small{display:block;font-size:.78rem;opacity:.85}'
    + '#lib-card .lib-mini{flex:none;width:64px;height:6px;border-radius:4px;background:rgba(255,255,255,.1);overflow:hidden}#lib-card .lib-mini em{display:block;height:100%;background:#ffd36a}#lib-card.ready{animation:smGlow 2s ease-in-out infinite;border-color:#ffd36a}';
  document.head.appendChild(st);
}
if (location.hash === '#debug') window.__historia = Historia;
