// ============================================================================
//  MESAS REDONDAS (pestaña del panel de Debates): cuatro pensadores sentados en
//  círculo discuten la misma pregunta, cada uno con su voz. El que habla se
//  ilumina. Al final eliges la postura que más te convence.
// ============================================================================
ACH.push({ id: 'mesa', i: '👥', n: 'Mesa redonda', d: 'Escucha una mesa redonda de cuatro pensadores y elige una postura.' });
const Mesa = {
  T: { h: 'Mesas redondas', note: 'Cuatro pensadores, cuatro posturas y una sola pregunta. Escúchalos y elige la que más te convence.', step: (i, n) => `${i} de ${n}`, next: 'Siguiente', vote: '¿Qué postura te convence más?', none: 'Ninguna del todo: me quedo con algo de cada una', ask: 'Escuchaste a los cuatro. No hay respuesta correcta: ¿qué postura te convence más?', back: '◂ Otras mesas', more: 'Otra mesa', chose: (n) => `Elegiste la postura de ${n}. `, mixed: 'Elegiste quedarte con algo de cada una. ', pts: '+80 sabiduría · tu elección quedó en el Cuaderno.', seen: '✓ ' },
  show(on) { this.ensure(); this.gen = (this.gen || 0) + 1; document.getElementById('mesa').hidden = !on; if (on) this.list(); },
  ensure() {
    if (document.getElementById('mesa')) return; const card = document.querySelector('#vs .vs-card'); if (!card) return;
    const el = document.createElement('div'); el.id = 'mesa'; el.hidden = true;
    el.innerHTML = '<div id="ms-list"><div class="eyebrow" style="text-align:center"></div><h3 class="av-h"></h3><p class="qd-note" style="text-align:center"></p><div id="ms-items"></div></div>'
      + '<div id="ms-play" hidden><button class="po-back ms-back"></button><h3 class="vs-q" id="ms-q"></h3><div id="ms-seats"></div><div class="vs-bubble ms-bubble"><b id="ms-who"></b><p id="ms-text" aria-live="polite"></p><small id="ms-step"></small></div><div class="btns" id="ms-vote" hidden></div><p id="ms-end" hidden></p><div class="btns"><button class="btn primary" id="ms-next"></button></div></div>';
    card.appendChild(el); el.querySelector('.eyebrow').textContent = '👥'; el.querySelector('h3').textContent = this.T.h; el.querySelector('.qd-note').textContent = this.T.note;
    el.querySelector('.ms-back').textContent = this.T.back; el.querySelector('.ms-back').addEventListener('click', () => { Audio.click && Audio.click(); this.gen++; Voice.stop(); this.list(); });
    $('#ms-next').addEventListener('click', () => { Audio.click && Audio.click(); if (this.done) { this.list(); return; } this.next(false); });
  },
  key(M) { return 'mesa-' + M.id; },
  voted(M) { const x = (store.get(XP_KEY, {}) || {})[this.key(M)]; return !!(x && x.el && x.el.length); },
  list() {
    const S = SAGE_BY_ID(); $('#ms-list').hidden = false; $('#ms-play').hidden = true; const box = $('#ms-items'); box.innerHTML = '';
    for (const M of MESAS) {
      const b = document.createElement('button'); b.className = 'vs-item ms-item'; b.innerHTML = '<span class="ms-faces"></span><span><b></b><small></small></span>';
      const f = b.querySelector('.ms-faces'); for (const id of M.sabios) { const m = document.createElement('i'); m.className = 'medal'; setMedal(m, id, S[id].d.short[0]); f.appendChild(m); }
      b.querySelector('b').textContent = (this.voted(M) ? this.T.seen : '') + M.q; b.querySelector('small').textContent = M.sabios.map((id) => S[id].d.short).join(' · ');
      b.addEventListener('click', () => { Audio.click && Audio.click(); this.play(M); }); box.appendChild(b);
    }
  },
  play(M) {
    const S = SAGE_BY_ID(); this.M = M; this.i = 0; this.done = false; this.D = Object.fromEntries(M.sabios.map((id) => [id, S[id].d]));
    $('#ms-list').hidden = true; $('#ms-play').hidden = false; $('#ms-q').textContent = M.q; $('#ms-vote').hidden = true; $('#ms-end').hidden = true; $('#ms-next').hidden = false;
    const seats = $('#ms-seats'); seats.innerHTML = '';
    M.sabios.forEach((id) => { const s = document.createElement('div'); s.className = 'ms-seat'; s.dataset.id = id; s.innerHTML = '<i class="medal"></i><b></b><small></small>'; setMedal(s.querySelector('.medal'), id, this.D[id].short[0]); s.querySelector('b').textContent = this.D[id].short; s.querySelector('small').textContent = M.posturas[id]; seats.appendChild(s); });
    this.turn();
  },
  turn() {
    const gen = ++this.gen; const [id, text] = this.M.turns[this.i]; const d = this.D[id];
    document.querySelectorAll('.ms-seat').forEach((s) => s.classList.toggle('on', s.dataset.id === id));
    $('#ms-who').textContent = d.short; $('#ms-text').textContent = text; $('#ms-step').textContent = this.T.step(this.i + 1, this.M.turns.length);
    $('#ms-next').textContent = this.i < this.M.turns.length - 1 ? this.T.next : this.T.vote;
    const parts = narrSplit(text); let k = 0;
    const say = () => { if (gen !== this.gen) return; if (k >= parts.length) return setTimeout(() => { if (gen === this.gen) this.next(true); }, 700); Voice.utter(parts[k++], { data: d, boss: false }, 1, say); };
    say();
  },
  next(auto) {
    if (this.i < this.M.turns.length - 1) { this.i++; this.turn(); return; }
    if (auto && !$('#ms-vote').hidden) return;
    this.gen++; Voice.stop(); document.querySelectorAll('.ms-seat').forEach((s) => s.classList.remove('on'));
    $('#ms-who').textContent = ''; $('#ms-text').textContent = this.T.ask; $('#ms-step').textContent = ''; $('#ms-next').hidden = true;
    const box = $('#ms-vote'); box.hidden = false; box.innerHTML = '';
    for (const id of this.M.sabios) { const b = document.createElement('button'); b.className = 'btn primary ms-v'; b.innerHTML = '<b></b><small></small>'; b.querySelector('b').textContent = this.D[id].short; b.querySelector('small').textContent = this.M.posturas[id]; b.addEventListener('click', () => { Audio.click && Audio.click(); this.vote(id); }); box.appendChild(b); }
    const n = document.createElement('button'); n.className = 'btn ghost'; n.textContent = this.T.none; n.addEventListener('click', () => { Audio.click && Audio.click(); this.vote(''); }); box.appendChild(n);
  },
  vote(id) {
    const M = this.M, first = !this.voted(M);
    xpRecord(this.key(M), M.q, id ? `${this.D[id].short}: ${M.posturas[id]}` : this.T.none);
    $('#ms-vote').hidden = true; const e = $('#ms-end'); e.hidden = false; e.textContent = (id ? this.T.chose(this.D[id].short) : this.T.mixed) + M.cierre;
    if (id) document.querySelectorAll('.ms-seat').forEach((s) => s.classList.toggle('on', s.dataset.id === id));
    if (first) { try { addScore(80); } catch (err) { /* fuera de una partida */ } toast(this.T.pts); }
    achieve('mesa'); try { Mision.hit('versus'); } catch (err) { /* nada */ }
    this.done = true; const nb = $('#ms-next'); nb.hidden = false; nb.textContent = this.T.more;
  },
};
{
  const st = document.createElement('style');
  st.textContent = '#mesa[hidden],#ms-list[hidden],#ms-play[hidden]{display:none}.ms-item{grid-template-columns:auto 1fr!important;text-align:left!important}.ms-faces{display:grid;grid-template-columns:repeat(2,30px);gap:3px}.ms-faces .medal{width:30px;height:30px;font-size:.75rem}'
    + '#ms-seats{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:6px 0 10px}.ms-seat{text-align:center;padding:6px 4px;border-radius:12px;border:1px solid rgba(216,178,90,.25);background:rgba(255,255,255,.03);transition:transform .3s,box-shadow .3s,border-color .3s,opacity .3s;opacity:.65}'
    + '.ms-seat .medal{width:48px;height:48px;margin:0 auto 4px;font-size:1.1rem}.ms-seat b{display:block;font-family:var(--display);font-weight:normal;font-size:.8rem;color:var(--gold-bright,#ffd36a)}.ms-seat small{display:block;font-size:.66rem;line-height:1.25;color:#e8dcc0;margin-top:2px}'
    + '.ms-seat.on{opacity:1;transform:translateY(-3px) scale(1.04);border-color:#ffd36a;box-shadow:0 0 16px rgba(255,211,106,.45)}.ms-seat.on .medal{box-shadow:0 0 0 3px rgba(255,211,106,.6)}'
    + '#ms-vote{flex-direction:column}.ms-v{display:block;width:100%;text-align:left}.ms-v b{display:block}.ms-v small{display:block;font-size:.78rem;opacity:.85;font-family:var(--body);text-transform:none;letter-spacing:0}#ms-end{line-height:1.5;color:#f3e6c4}';
  document.head.appendChild(st);
}
// al cerrar el panel, las mesas también se callan
{ const x0 = Versus.close.bind(Versus); Versus.close = function () { Mesa.gen = (Mesa.gen || 0) + 1; x0(); }; }
if (location.hash === '#debug') window.__mesa = Mesa;
