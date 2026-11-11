// ============================================================================
//  TORNEO DE DEBATE RELÁMPAGO: con tres o más viajeros en la misma época,
//  cualquiera abre un torneo. En cada ronda todos reciben la misma tesis, toman
//  postura y eligen su mejor razón; después cada uno vota la mejor razón de los
//  demás (sin ver de quién es). Suman la calidad de la razón y los votos
//  recibidos. Dos rondas y podio. Quien abre el torneo lleva la cuenta.
// ============================================================================
const TOR_MIN = 3, TOR_ROUNDS = 2;
const TOR_ON = true; // en pruebas: todavía no se ofrece a los jugadores
const Torneo = {
  T: null,
  me() { return Juntos.myId(); },
  others() { let n = 0; for (const r of Juntos.R.values()) if (r.e === G.eraIdx && r.st) n++; return n; },
  canOpen() { return TOR_ON && Juntos.on && MRT.joined && G.state === 'play' && !Juntos.duel && !Juntos.inv && this.others() >= TOR_MIN - 1; },
  send(o) { MRT.send('tor', { ...o, h: this.T.host }); },
  q(k) { return k === 'b' ? 2 : k === 'f' ? -1 : 0; },
  tag(k, f) { return k === 'b' ? '✓ buena razón' : k === 'f' ? `✗ falacia${f ? ': ' + f : ''}` : k === 'd' ? '· razón débil' : '· sin razón'; },
  thesis(T, r) { const here = ERAS[T.e].sages.filter((s) => DIALOGOS[s.id]); const all = ERAS.flatMap((e) => e.sages).filter((s) => DIALOGOS[s.id]); const list = here.length >= TOR_ROUNDS ? here : all; const s = list[(T.seed + r) % list.length]; return { s, D: DIALOGOS[s.id] }; },
  enter() {
    Juntos.duel = this.T; G.state = 'place'; unlockPointer(); input.keys = {}; input.walk = null; input.auto = false; $('#hud').hidden = true; $('#touch').hidden = true; $('#mp-meet').hidden = true; $('#mp-emobar').hidden = true; $('#mp-tor').hidden = true;
    $('#mpd-vs').textContent = '🏆 Torneo de debate relámpago'; $('#mpd').hidden = false; Audio.mode = 'duel';
  },
  leave(msg) { const T = this.T; if (T) { clearInterval(T.timer); clearTimeout(T.t1); clearTimeout(T.t2); clearInterval(T.watch); } this.T = null; Juntos.close(); if (msg) toast(msg); },
  wait(text) { $('#mpd-q').textContent = text; $('#mpd-a').innerHTML = ''; $('#mpd-msg').textContent = ''; $('#mpd-bar').style.transform = 'scaleX(0)'; clearInterval(this.T.timer); },
  // -------- abrir y sumarse
  open() {
    if (!this.canOpen()) return toast(`Para un torneo hacen falta al menos ${TOR_MIN} viajeros en esta época.`);
    const me = this.me(); this.T = { kind: 't', host: me, seed: (Math.random() * 1e6) | 0, e: G.eraIdx, P: new Map([[me, Juntos.name]]), r: -1, tot: {}, done: {} };
    MRT.send('tor', { t: 'open', h: me, n: Juntos.name, seed: this.T.seed, e: this.T.e }); this.enter(); this.lobby();
    this.T.t0s = performance.now(); this.T.t1 = setTimeout(() => this.start(), 22000);
    this.T.timer = setInterval(() => { const T = this.T; if (!T || T.r >= 0) return; $('#mpd-bar').style.transform = `scaleX(${Math.max(0, 1 - (performance.now() - T.t0s) / 22000)})`; }, 200);
  },
  lobby() {
    const T = this.T; const host = T.host === this.me(); $('#mpd-n').textContent = 'Reuniendo participantes';
    $('#mpd-q').textContent = host ? `Tu torneo empieza en unos segundos. Participantes: ${[...T.P.values()].join(', ')}.` : `Te sumaste al torneo de ${T.hostName}. Empieza en unos segundos…`;
    const box = $('#mpd-a'); box.innerHTML = ''; $('#mpd-msg').textContent = 'Dos rondas: postura, mejor razón y voto a la mejor razón de los demás.';
    if (host) { const b = document.createElement('button'); b.className = 'btn primary'; b.textContent = T.P.size >= TOR_MIN ? 'Empezar ya' : `Esperando (mínimo ${TOR_MIN})`; b.disabled = T.P.size < TOR_MIN; b.addEventListener('click', () => this.start()); box.appendChild(b); }
    const c = document.createElement('button'); c.className = 'btn ghost'; c.textContent = host ? 'Cancelar el torneo' : 'Salir'; c.addEventListener('click', () => { if (host) this.send({ t: 'cancel' }); this.leave(host ? 'Cancelaste el torneo.' : ''); }); box.appendChild(c);
  },
  invite(d) {
    if (!TOR_ON || this.T || Juntos.duel || Juntos.inv || G.state !== 'play' || d.e !== G.eraIdx || Juntos.muted().has(String(d.h))) return;
    Juntos.inv = { tor: true, h: String(d.h), n: Sala.clean(d.n) || 'Un viajero', seed: d.seed | 0, e: d.e };
    $('#mp-inv-t').textContent = `🏆 ${Juntos.inv.n} abre un torneo de debate relámpago: dos rondas, todos con la misma tesis, y se vota la mejor razón. ¿Te sumas?`;
    $('#mp-yes').textContent = 'Me sumo'; $('#mp-no').textContent = 'Ahora no'; $('#mp-inv').hidden = false; Audio.gong && Audio.gong(); buzz([20, 40, 20]);
    clearTimeout(Juntos.invT); Juntos.invT = setTimeout(() => Juntos.answerInv(false), 15000);
  },
  join(d) {
    this.T = { kind: 't', host: d.h, hostName: d.n, seed: d.seed, e: d.e, P: new Map(), r: -1, tot: {}, done: {}, rx: performance.now() };
    this.send({ t: 'join', id: this.me(), n: Juntos.name }); this.enter(); this.lobby();
    this.T.watch = setInterval(() => { const T = this.T; if (T && performance.now() - T.rx > 85000) this.leave('El torneo se interrumpió: quien lo abrió se desconectó.'); }, 5000);
  },
  start() {
    const T = this.T; if (!T || T.host !== this.me() || T.r >= 0) return; clearTimeout(T.t1); clearInterval(T.timer);
    if (T.P.size < TOR_MIN) { this.send({ t: 'cancel' }); return this.leave(`El torneo necesita al menos ${TOR_MIN} participantes. Inténtalo cuando haya más viajeros.`); }
    this.hostRound(0);
  },
  // -------- quien abre el torneo marca los tiempos
  hostRound(r) {
    const T = this.T; if (!T) return; T.ans = new Map(); T.picks = new Map();
    const m = { t: 'round', r, ids: [...T.P.keys()], ns: [...T.P.values()] }; this.send(m); this.onRound(m);
    clearTimeout(T.t1); T.t1 = setTimeout(() => this.hostVote(r), 52000);
  },
  hostVote(r) {
    const T = this.T; if (!T || T.done['v' + r]) return; T.done['v' + r] = true; clearTimeout(T.t1);
    const list = [...T.P.keys()].map((id) => T.ans.get(id) || { id, n: T.P.get(id), post: '', raz: '', rk: '', rf: '' });
    const m = { t: 'vote', r, list }; this.send(m); this.onVote(m); T.t1 = setTimeout(() => this.hostRes(r), 26000);
  },
  hostRes(r) {
    const T = this.T; if (!T || T.done['r' + r]) return; T.done['r' + r] = true; clearTimeout(T.t1);
    const votes = {}; for (const [from, to] of T.picks) if (from !== to && T.P.has(to)) votes[to] = (votes[to] || 0) + 1;
    const rows = [...T.P.keys()].map((id) => { const a = T.ans.get(id) || { n: T.P.get(id), raz: '', rk: '', rf: '' }; const v = votes[id] || 0; const pts = this.q(a.rk) + v; T.tot[id] = (T.tot[id] || 0) + pts; return { id, n: T.P.get(id), raz: a.raz, rk: a.rk, rf: a.rf, v, pts, tot: T.tot[id] }; });
    const last = r >= TOR_ROUNDS - 1; const m = { t: 'res', r, rows, last }; this.send(m); this.onRes(m);
    if (!last) T.t1 = setTimeout(() => this.hostRound(r + 1), 12000);
  },
  // -------- mensajes
  rx(d) {
    const T = this.T; const h = String(d.h || '');
    if (d.t === 'open') return this.invite(d);
    if (!T || h !== T.host) return; const host = T.host === this.me(); T.rx = performance.now();
    if (host) {
      const id = String(d.id || ''); if (!/^[A-Za-z0-9]{6,12}$/.test(id) || Juntos.muted().has(id)) return;
      // a los inscritos se los cuenta aunque dejen de verse un momento en el mapa
      if (d.t === 'join' && T.r < 0 && T.P.size < 12) { const r = Juntos.R.get(id); T.P.set(id, (r && r.name) || Sala.clean(d.n) || 'Viajero'); this.send({ t: 'lobby', ns: [...T.P.values()] }); this.lobby(); }
      else if (d.t === 'ans' && d.r === T.r && T.P.has(id)) { T.ans.set(id, { id, n: T.P.get(id), post: String(d.post || '').slice(0, 300), raz: String(d.raz || '').slice(0, 400), rk: String(d.rk || '').slice(0, 1), rf: String(d.rf || '').slice(0, 60) }); if (T.ans.size >= T.P.size) this.hostVote(T.r); }
      else if (d.t === 'pick' && d.r === T.r && T.P.has(id)) { T.picks.set(id, String(d.f || '')); if (T.picks.size >= T.P.size) this.hostRes(T.r); }
      return;
    }
    if (d.t === 'cancel') return this.leave('El torneo se canceló: no se reunieron suficientes participantes.');
    if (d.t === 'lobby' && T.r < 0) { $('#mpd-msg').textContent = `Participantes: ${(d.ns || []).map((n) => Sala.clean(n) || 'Viajero').join(', ')}.`; return; }
    if (d.t === 'round') { if (!(d.ids || []).includes(this.me())) return this.leave('El torneo empezó sin ti. ¡Súmate al próximo!'); return this.onRound(d); }
    if (d.t === 'vote' && d.r === T.r) return this.onVote(d);
    if (d.t === 'res' && d.r === T.r) return this.onRes(d);
  },
  // -------- cada ronda, en la pantalla de cada participante
  onRound(d) {
    const T = this.T; T.r = d.r; T.n = (d.ids || []).length; const th = this.thesis(T, d.r); T.th = th; T.i = 0; T.post = 0; T.raz = null; this.step();
  },
  step() {
    const T = this.T; const D = T.th.D; T.answered = false; $('#mpd-msg').textContent = `Ronda ${T.r + 1} de ${TOR_ROUNDS} · ${T.n} participantes`;
    if (T.i === 0) { $('#mpd-n').textContent = `Tesis de ${T.th.s.short}`; $('#mpd-q').textContent = `«${D.tesis}» ¿Qué piensas tú?`; Juntos.buttons(D.posturas.map((p) => p.t), (k) => this.pickStep(k)); Juntos.timer(20, () => this.pickStep(-1)); }
    else { const P = D.posturas[T.post]; T.rz = shuffle(P.razones.slice()); $('#mpd-n').textContent = 'Tu mejor razón'; $('#mpd-q').textContent = `Tu postura: ${P.t} ¿Por qué? Los demás votarán la mejor razón.`; Juntos.buttons(T.rz.map((x) => x.t), (k) => this.pickStep(k)); Juntos.timer(25, () => this.pickStep(-1)); }
  },
  pickStep(k) {
    const T = this.T; if (!T || T.answered) return; T.answered = true; clearInterval(T.timer); Audio.click();
    if (T.i === 0) { T.post = k < 0 ? 0 : k; T.i = 1; return this.step(); }
    T.raz = k < 0 ? null : T.rz[k]; const P = T.th.D.posturas[T.post];
    const m = { t: 'ans', r: T.r, id: this.me(), n: Juntos.name, post: P.t, raz: T.raz ? T.raz.t : '', rk: T.raz ? T.raz.k : '', rf: (T.raz && T.raz.f) || '' };
    if (T.host === this.me()) { T.ans.set(m.id, m); if (T.ans.size >= T.P.size) return this.hostVote(T.r); } else this.send(m);
    $('#mpd-n').textContent = 'Listo'; this.wait('Esperando las razones de los demás…');
  },
  onVote(d) {
    const T = this.T; const me = this.me(); const list = shuffle((d.list || []).filter((a) => a.id !== me && a.raz));
    $('#mpd-n').textContent = 'Vota la mejor razón'; $('#mpd-msg').textContent = 'No ves de quién es cada una: vota por la razón, no por la persona.';
    const cast = (id) => { if (T.voted === T.r) return; T.voted = T.r; clearInterval(T.timer); Audio.click(); const m = { t: 'pick', r: T.r, id: me, f: id };
      if (T.host === me) { T.picks.set(me, id); if (T.picks.size >= T.P.size) return this.hostRes(T.r); } else this.send(m);
      $('#mpd-n').textContent = 'Voto enviado'; this.wait('Contando los votos…'); };
    if (!list.length) { $('#mpd-q').textContent = 'Nadie más dio una razón en esta ronda.'; $('#mpd-a').innerHTML = ''; return cast(''); }
    $('#mpd-q').textContent = '¿Cuál de estas razones te parece la mejor?';
    Juntos.buttons(list.map((a) => `${a.post} — ${a.raz}`), (k) => cast(list[k].id)); Juntos.timer(22, () => cast(''));
  },
  onRes(d) {
    const T = this.T; clearInterval(T.timer); const rows = (d.rows || []).slice().sort((a, b) => b.tot - a.tot); const me = this.me(); const top = rows.length ? rows[0].tot : 0;
    $('#mpd-n').textContent = d.last ? 'Resultado final' : `Resultados de la ronda ${T.r + 1}`; $('#mpd-bar').style.transform = 'scaleX(0)';
    const win = rows.filter((x) => x.tot === top); const iWon = d.last && win.some((x) => x.id === me);
    $('#mpd-q').textContent = d.last ? (win.length > 1 ? `🏆 Empate entre ${win.map((x) => Sala.clean(x.n) || 'Viajero').join(' y ')}.` : `🏆 Gana ${win[0].id === me ? 'tú' : Sala.clean(win[0].n) || 'Viajero'} con ${top} puntos.`) : 'Así quedó la ronda. La siguiente empieza en unos segundos…';
    $('#mpd-msg').textContent = 'Puntos: buena razón +2, falacia −1, y +1 por cada voto recibido.';
    const box = $('#mpd-a'); box.innerHTML = '';
    rows.forEach((x, i) => { const c = document.createElement('div'); c.className = 'mpd-card' + (x.id === me ? ' me' : ''); c.innerHTML = '<b></b><p class="p"></p><p></p>';
      c.querySelector('b').textContent = `${i + 1}. ${x.id === me ? 'Tú' : Sala.clean(x.n) || 'Viajero'} · ${x.tot} ${x.tot === 1 ? 'punto' : 'puntos'}`; c.querySelector('.p').textContent = x.raz || 'No alcanzó a dar una razón.';
      c.children[2].textContent = `${this.tag(x.rk, x.rf)} · ${x.v} ${x.v === 1 ? 'voto' : 'votos'} · ${x.pts >= 0 ? '+' : ''}${x.pts} en esta ronda`; box.appendChild(c); });
    if (!d.last) return;
    const pts = iWon ? 400 : 120; addScore(pts); popup(`+${pts}<small>torneo de debate</small>`, 'up'); achieve('torneo1'); if (iWon) { achieve('torneo'); Audio.victory && Audio.victory(); }
    const b = document.createElement('button'); b.className = 'btn primary'; b.textContent = 'Seguir explorando'; b.addEventListener('click', () => this.leave('')); box.appendChild(b);
    clearInterval(T.watch); clearTimeout(T.t1);
  },
};
on('#mp-tor', () => Torneo.open());
setInterval(() => { try { const b = $('#mp-tor'); const show = !Torneo.T && Torneo.canOpen(); if (b.hidden === show) b.hidden = !show; } catch (e) { /* nada */ } }, 700);
