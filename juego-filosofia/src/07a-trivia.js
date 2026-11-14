// ============================================================================
//  TORNEO DE TRIVIA EN LÍNEA: una mesa de 2, 4 u 8 asientos en el mundo de la
//  época. Quien la abre invita a los viajeros que están ahí (o a amigos por
//  WhatsApp); cada uno toma asiento. Todos responden a la vez las mismas
//  preguntas (acierto + rapidez). Con 8: cuartos → semifinal → final; con 4:
//  semifinal → final; con 2: final. Quien abre la mesa lleva el reloj y la cuenta.
// ============================================================================
const TRI_Q = 5, TRI_SEC = 15, TRI_REV = 4200;
const Trivia = {
  T: null, seen: new Set(), pendHost: '',
  me() { return Juntos.myId(); },
  okId(id) { return /^[A-Za-z0-9]{6,12}$/.test(String(id || '')); },
  canOpen() { return Juntos.on && MRT.joined && G.state === 'play' && !Juntos.duel && !Juntos.inv && !this.T; },
  send(o) { MRT.send('triv', { ...o, h: this.T ? this.T.host : o.h }); },
  color(id) { try { const r = id === this.me() ? { ls: Juntos.lookStr() } : Juntos.R.get(id); return '#' + (AV_ROBES[avParse(r && r.ls).r] ?? AV_ROBES[0]).toString(16).padStart(6, '0'); } catch (e) { return '#c8962a'; } },
  // preguntas: de esta época si alcanzan, si no de todas; el mismo orden para todos (semilla)
  questions(seed, n, all) {
    const P = []; const eras = all ? ERAS : [ERAS[G.eraIdx]];
    for (const e of eras) for (const s of e.sages) for (const q of s.q || []) if (q && q.a && q.a.length === 4) P.push({ q: q.q, a: q.a, e: q.e || '', who: s.short });
    if (!all && P.length < n) return this.questions(seed, n, true);
    const r = mulberry32(seed); const idx = P.map((_, i) => i); for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
    return idx.slice(0, n).map((i) => { const q = P[i]; const o = q.a.map((t, k) => ({ t, ok: k === 0 })); for (let k = 3; k > 0; k--) { const j = Math.floor(r() * (k + 1)); [o[k], o[j]] = [o[j], o[k]]; } return { ...q, o }; });
  },
  stages(n) { return n > 4 ? ['Cuartos de final', 'Semifinal', 'Final'] : n > 2 ? ['Semifinal', 'Final'] : ['Final']; },
  // ---------------------------------------------------------------- pantalla
  enter() {
    Juntos.duel = this.T; G.state = 'place'; unlockPointer(); input.keys = {}; input.walk = null; input.auto = false;
    for (const id of ['hud', 'touch', 'mp-meet', 'mp-emobar', 'mp-tor', 'mp-triv']) { const e = document.getElementById(id); if (e) e.hidden = true; }
    $('#mpd').hidden = false; $('#mpd').classList.add('tri'); Audio.mode = 'duel';
  },
  leave(msg) {
    const T = this.T; if (T) { clearInterval(T.timer); clearTimeout(T.t1); clearInterval(T.beat); clearInterval(T.watch); }
    if (T && T.host === this.me() && T.st < 0) this.send({ t: 'cancel' }); else if (T && T.host !== this.me() && T.st < 0) this.send({ t: 'leave', id: this.me() });
    this.T = null; $('#mpd').classList.remove('tri'); Juntos.close(); if (msg) toast(msg);
  },
  btn(text, cls, fn, box = $('#mpd-a')) { const b = document.createElement('button'); b.className = 'btn ' + (cls || ''); b.textContent = text; b.addEventListener('click', () => { Audio.click(); fn(); }); box.appendChild(b); return b; },
  // ---------------------------------------------------------------- elegir la mesa
  setup() {
    if (!this.canOpen()) return toast(Juntos.on ? 'Ahora no se puede abrir una mesa.' : 'Activa «Jugar en línea» para abrir un torneo.');
    this.T = { host: this.me(), setup: true, st: -1 }; this.enter();
    $('#mpd-vs').textContent = '🏆 Torneo de trivia'; $('#mpd-n').textContent = '¿Cuántos asientos tendrá la mesa?'; $('#mpd-bar').style.transform = 'scaleX(0)';
    $('#mpd-q').textContent = 'Todos responden a la vez las mismas preguntas: suma quien acierta y más si responde rápido. La mitad con más puntos pasa a la siguiente ronda.';
    const box = $('#mpd-a'); box.innerHTML = ''; let all = false;
    const grid = document.createElement('div'); grid.className = 'tri-sizes'; box.appendChild(grid);
    for (const [n, d] of [[2, 'Duelo: una final'], [4, 'Semifinal y final'], [8, 'Cuartos, semifinal y final']]) {
      const b = document.createElement('button'); b.className = 'tri-size'; b.innerHTML = '<b></b><span></span>'; b.querySelector('b').textContent = n; b.querySelector('span').textContent = d;
      b.addEventListener('click', () => { Audio.click(); this.open(n, all); }); grid.appendChild(b);
    }
    const tg = document.createElement('label'); tg.className = 'tri-all'; tg.innerHTML = '<input type="checkbox"> <span></span>'; tg.querySelector('span').textContent = 'Preguntas de todas las épocas (si no, solo de esta)';
    tg.querySelector('input').addEventListener('change', (e) => { all = e.target.checked; }); box.appendChild(tg);
    this.btn('Cancelar', 'ghost', () => this.leave(''));
    $('#mpd-msg').textContent = '';
  },
  open(n, all) {
    const me = this.me(); const seats = Array(n).fill(null); seats[0] = me;
    this.T = { host: me, n, all: !!all, seed: (Math.random() * 1e9) | 0, e: G.eraIdx, seats, names: { [me]: Juntos.name }, st: -1, t0: performance.now() };
    this.beacon(); this.T.beat = setInterval(() => this.beacon(), 4000);
    this.T.t1 = setTimeout(() => { if (this.T && this.T.st < 0) this.leave('La mesa se cerró: pasaron 4 minutos sin empezar.'); }, 240000);
    this.lobby();
  },
  beacon() { const T = this.T; if (!T || T.st >= 0) return; if (T.host === this.me() && !$('#mpd').hidden) this.lobby(); this.send({ t: 'open', n: T.n, nm: Juntos.name, e: T.e, seats: T.seats, names: this.namesOf(T), all: T.all ? 1 : 0, seed: T.seed }); },
  namesOf(T) { const o = {}; for (const id of T.seats) if (id) o[id] = T.names[id] || 'Viajero'; return o; },
  free(T) { return T.seats.filter((x) => !x).length; },
  inviteLink() { const T = this.T; return Ir.url('mundo=' + ERAS[T.e].id + '&mesa=' + T.host); },
  // ---------------------------------------------------------------- la mesa con sus asientos
  lobby() {
    const T = this.T; if (!T) return; const host = T.host === this.me(); const taken = T.n - this.free(T);
    $('#mpd-vs').textContent = `🏆 Torneo de trivia · ${T.n} asientos`; $('#mpd-n').textContent = `Asientos ocupados: ${taken} de ${T.n}`;
    $('#mpd-q').textContent = host ? 'Invita a los viajeros de esta época o envía la invitación por WhatsApp. Puedes empezar cuando haya al menos dos.' : `Tomaste asiento en la mesa de ${T.names[T.host] || 'un viajero'}. El torneo empieza cuando lo decida quien abrió la mesa.`;
    const box = $('#mpd-a'); box.innerHTML = '';
    const table = document.createElement('div'); table.className = 'tri-table n' + T.n; box.appendChild(table);
    const mid = document.createElement('div'); mid.className = 'tri-mid'; mid.textContent = '🏆'; table.appendChild(mid);
    T.seats.forEach((id, i) => {
      const s = document.createElement('div'); s.className = 'tri-seat' + (id ? ' on' : '') + (id === this.me() ? ' me' : ''); const a = (i / T.n) * Math.PI * 2 - Math.PI / 2;
      s.style.left = (50 + Math.cos(a) * 40) + '%'; s.style.top = (50 + Math.sin(a) * 38) + '%';
      const c = document.createElement('i'); c.style.background = id ? this.color(id) : 'transparent'; c.textContent = id ? (T.names[id] || '?')[0].toUpperCase() : '+'; s.appendChild(c);
      const t = document.createElement('span'); t.textContent = id ? (id === this.me() ? 'Tú' : T.names[id] || 'Viajero') + (id === T.host ? ' 👑' : '') : 'Libre'; s.appendChild(t); table.appendChild(s);
    });
    if (host) {
      const near = [...Juntos.R.entries()].filter(([id, r]) => r.e === G.eraIdx && !T.seats.includes(id));
      const inv = document.createElement('div'); inv.className = 'tri-inv'; box.appendChild(inv);
      const h = document.createElement('p'); h.className = 'tri-h'; h.textContent = near.length ? 'Viajeros en esta época:' : 'Ahora no hay más viajeros en esta época: invita a tus amigos por WhatsApp.'; inv.appendChild(h);
      for (const [id, r] of near.slice(0, 12)) { const row = document.createElement('div'); row.className = 'tri-row'; const nm = document.createElement('span'); nm.textContent = r.name; row.appendChild(nm);
        const sent = T.invited && T.invited.has(id); const b = this.btn(sent ? 'Invitado ✓' : 'Invitar', 'tri-ib', () => { (T.invited = T.invited || new Set()).add(id); this.send({ t: 'inv', to: id, nm: Juntos.name, n: T.n, e: T.e }); b.textContent = 'Invitado ✓'; b.disabled = true; }, row); b.disabled = !!sent; inv.appendChild(row); }
      if (typeof Ir !== 'undefined') this.btn('📲 Invitar amigos por WhatsApp', 'tri-wa', () => Ir.sheet({ url: this.inviteLink(), text: `🏆 Te guardo un asiento en mi torneo de trivia de filosofía en Odisea de la Razón (${ERAS[T.e].name}). Entra directo aquí:` }), box);
      const go = this.btn(taken >= 2 ? `Empezar el torneo (${taken})` : 'Esperando jugadores…', 'primary', () => this.start()); go.disabled = taken < 2;
      this.btn('Cerrar la mesa', 'ghost', () => this.leave('Cerraste la mesa.'));
    } else this.btn('Dejar el asiento', 'ghost', () => this.leave(''));
    $('#mpd-msg').textContent = this.stages(Math.max(2, taken)).join(' → ') + ` · ${TRI_Q} preguntas por ronda`;
  },
  // invitación a otros: aviso para tomar asiento
  offer(d, direct) {
    if (this.T || Juntos.duel || Juntos.inv || G.state !== 'play' || d.e !== G.eraIdx || Juntos.muted().has(String(d.h))) return;
    const fromLink = this.pendHost && this.pendHost === String(d.h);
    if (!direct && !fromLink && this.seen.has(String(d.h))) return; this.seen.add(String(d.h)); if (fromLink) this.pendHost = '';
    const nm = Sala.clean(d.nm) || 'Un viajero'; const free = Array.isArray(d.seats) ? d.seats.filter((x) => !x).length : 1; if (!free) return;
    Juntos.inv = { triv: true, h: String(d.h), nm };
    $('#mp-inv-t').textContent = direct || fromLink ? `🏆 ${nm} te guarda un asiento en su torneo de trivia (${d.n} asientos). ¿Te sientas?` : `🏆 ${nm} abrió una mesa de trivia en esta época: ${d.n} asientos, ${free} libres. ¿Tomas asiento?`;
    $('#mp-yes').textContent = 'Tomar asiento'; $('#mp-no').textContent = 'Ahora no'; $('#mp-inv').hidden = false; Audio.gong && Audio.gong(); buzz([20, 40, 20]);
    clearTimeout(Juntos.invT); Juntos.invT = setTimeout(() => Juntos.answerInv(false), 20000);
  },
  join(h, nm) {
    this.T = { host: h, n: 0, seats: [], names: { [h]: nm }, st: -1, rx: performance.now(), joining: true };
    this.send({ t: 'join', id: this.me(), nm: Juntos.name }); this.enter();
    $('#mpd-vs').textContent = '🏆 Torneo de trivia'; $('#mpd-n').textContent = 'Buscando tu asiento…'; $('#mpd-q').textContent = ''; $('#mpd-a').innerHTML = ''; $('#mpd-msg').textContent = '';
    this.btn('Salir', 'ghost', () => this.leave(''));
    this.T.watch = setInterval(() => { const T = this.T; if (T && performance.now() - T.rx > (T.st < 0 ? 15000 : 40000)) this.leave('La mesa se cerró: quien la abrió se desconectó.'); }, 3000);
  },
  // ---------------------------------------------------------------- el torneo (lo dirige quien abrió la mesa)
  start() {
    const T = this.T; if (!T || T.host !== this.me() || T.st >= 0) return; const ids = T.seats.filter(Boolean); if (ids.length < 2) return;
    clearInterval(T.beat); clearTimeout(T.t1); T.players = ids; T.plan = this.stages(ids.length); T.total = {}; T.ms = {};
    this.hostStage(0, ids);
  },
  hostStage(st, act) {
    const T = this.T; T.st = st; T.act = act; T.sc = {}; for (const id of act) T.sc[id] = 0;
    const m = { t: 'stage', st, act, plan: T.plan, players: T.players, names: this.namesOf({ seats: T.players, names: T.names }), seed: T.seed, all: T.all ? 1 : 0, e: T.e };
    this.send(m); this.onStage(m); T.t1 = setTimeout(() => this.hostQ(0), 4500);
  },
  hostQ(i) {
    const T = this.T; if (!T) return; T.qi = i; T.ans = new Map(); const gi = T.st * TRI_Q + i;
    const m = { t: 'q', st: T.st, i, gi }; this.send(m); this.onQ(m);
    clearTimeout(T.t1); T.t1 = setTimeout(() => this.hostRev(gi), TRI_SEC * 1000 + 800);
  },
  hostRev(gi) {
    const T = this.T; if (!T || T.revd === gi) return; T.revd = gi; clearTimeout(T.t1);
    const got = {}; for (const id of T.act) { const a = T.ans.get(id); const ok = a && this.qs[gi] && this.qs[gi].o[a.k] && this.qs[gi].o[a.k].ok; const p = ok ? 100 + Math.round(100 * Math.max(0, 1 - a.ms / (TRI_SEC * 1000))) : 0; got[id] = p; T.sc[id] += p; T.total[id] = (T.total[id] || 0) + p; T.ms[id] = (T.ms[id] || 0) + (a ? a.ms : TRI_SEC * 1000); }
    const m = { t: 'rev', gi, got, sc: T.sc }; this.send(m); this.onRev(m);
    T.t1 = setTimeout(() => { if (T.qi < TRI_Q - 1) return this.hostQ(T.qi + 1); this.hostEndStage(); }, TRI_REV);
  },
  hostEndStage() {
    const T = this.T; const rank = T.act.slice().sort((a, b) => (T.sc[b] - T.sc[a]) || ((T.ms[a] || 0) - (T.ms[b] || 0)));
    if (T.st >= T.plan.length - 1) { const rows = rank.map((id) => ({ id, n: T.names[id] || 'Viajero', p: T.sc[id], tot: T.total[id] || 0 })); const out = T.players.filter((id) => !T.act.includes(id)).sort((a, b) => (T.total[b] || 0) - (T.total[a] || 0)).map((id) => ({ id, n: T.names[id] || 'Viajero', p: 0, tot: T.total[id] || 0 })); const m = { t: 'end', rows, out }; this.send(m); return this.onEnd(m); }
    const keep = rank.slice(0, Math.max(2, Math.ceil(rank.length / 2))); const m = { t: 'cut', st: T.st, keep, rank: rank.map((id) => ({ id, n: T.names[id] || 'Viajero', p: T.sc[id] })) }; this.send(m); this.onCut(m);
    T.t1 = setTimeout(() => this.hostStage(T.st + 1, keep), 7000);
  },
  // ---------------------------------------------------------------- mensajes
  rx(d) {
    const h = String(d.h || ''); if (!this.okId(h)) return; const T = this.T;
    if (d.t === 'open') { if (T && h === T.host && T.host !== this.me()) { if (T.st >= 0) return; T.rx = performance.now(); T.seats = Array.isArray(d.seats) ? d.seats.slice(0, 8) : T.seats; T.n = d.n | 0; T.names = { ...T.names, ...(d.names || {}) }; if (T.joining && T.seats.includes(this.me())) T.joining = false; if (!T.joining) this.lobby(); return; } return this.offer(d, false); }
    if (d.t === 'inv') { if (d.to === this.me()) this.offer(d, true); return; }
    if (!T || h !== T.host) return; T.rx = performance.now();
    if (T.host === this.me()) { // quien abrió la mesa recibe asientos y respuestas
      const id = String(d.id || ''); if (!this.okId(id) || Juntos.muted().has(id)) return;
      if (d.t === 'join' && T.st < 0) { if (T.seats.includes(id)) return this.beacon(); const k = T.seats.indexOf(null); if (k < 0) return this.send({ t: 'full', to: id }); T.seats[k] = id; const r = Juntos.R.get(id); T.names[id] = (r && r.name) || Sala.clean(d.nm) || 'Viajero'; this.beacon(); this.lobby(); Audio.pickup && Audio.pickup(); }
      else if (d.t === 'leave' && T.st < 0) { const k = T.seats.indexOf(id); if (k > 0) { T.seats[k] = null; this.beacon(); this.lobby(); } }
      else if (d.t === 'ans' && T.act && T.act.includes(id) && d.gi === T.st * TRI_Q + T.qi && !T.ans.has(id)) { T.ans.set(id, { k: Math.max(0, Math.min(3, d.k | 0)), ms: Math.max(0, Math.min(TRI_SEC * 1000, d.ms | 0)) }); if (T.ans.size >= T.act.length) this.hostRev(d.gi); }
      return;
    }
    if (d.t === 'cancel') return this.leave('Quien abrió la mesa la cerró.');
    if (d.t === 'full' && d.to === this.me() && T.joining) return this.leave('La mesa ya está llena.');
    if (d.t === 'stage') { if (!(d.players || []).includes(this.me())) return this.leave('El torneo empezó sin ti. ¡Súmate a la próxima mesa!'); T.joining = false; return this.onStage(d); }
    if (d.t === 'q') return this.onQ(d);
    if (d.t === 'rev') return this.onRev(d);
    if (d.t === 'cut') return this.onCut(d);
    if (d.t === 'end') return this.onEnd(d);
  },
  // ---------------------------------------------------------------- en la pantalla de cada jugador
  onStage(d) {
    const T = this.T; T.st = d.st; T.act = d.act || []; T.plan = d.plan || ['Final']; T.players = d.players || []; T.names = { ...T.names, ...(d.names || {}) }; T.total = T.total || {};
    if (!this.qs || T.qseed !== d.seed) { this.qs = this.questions(d.seed, TRI_Q * 3, !!d.all); T.qseed = d.seed; }
    const playing = T.act.includes(this.me()); $('#mpd-vs').textContent = `🏆 ${T.plan[T.st]}`; $('#mpd-bar').style.transform = 'scaleX(0)';
    $('#mpd-n').textContent = playing ? '¡Prepárate!' : 'Eres espectador en esta ronda'; $('#mpd-q').textContent = `${T.plan[T.st]}: ${T.act.map((id) => id === this.me() ? 'tú' : T.names[id] || 'Viajero').join(' · ')}`;
    $('#mpd-a').innerHTML = ''; $('#mpd-msg').textContent = `${TRI_Q} preguntas · ${TRI_SEC} segundos cada una · acierto 100 + hasta 100 por rapidez`;
    this.btn('Salir del torneo', 'ghost', () => this.leave('Saliste del torneo.'));
  },
  onQ(d) {
    const T = this.T; const q = this.qs && this.qs[d.gi]; if (!q) return; T.gi = d.gi; T.mine = -1; T.qt0 = performance.now(); const playing = T.act.includes(this.me());
    $('#mpd-n').textContent = `${T.plan[T.st]} · Pregunta ${d.i + 1} de ${TRI_Q}`; $('#mpd-q').textContent = q.q + (q.who ? ` (${q.who})` : '');
    Juntos.buttons(q.o.map((x) => x.t), (k) => {
      if (!playing || T.mine >= 0 || T.gi !== d.gi) return; T.mine = k; const ms = Math.round(performance.now() - T.qt0); Audio.click();
      const bs = $('#mpd-a').querySelectorAll('.sl-pa'); bs.forEach((b, j) => { b.classList.toggle('pick', j === k); b.disabled = true; });
      if (T.host === this.me()) { if (!T.ans.has(this.me())) T.ans.set(this.me(), { k, ms }); if (T.ans.size >= T.act.length) this.hostRev(d.gi); } else this.send({ t: 'ans', id: this.me(), gi: d.gi, k, ms });
      $('#mpd-msg').textContent = 'Respuesta enviada. Esperando a los demás…';
    });
    if (!playing) $('#mpd-a').querySelectorAll('.sl-pa').forEach((b) => { b.disabled = true; });
    $('#mpd-msg').textContent = playing ? '¡Rápido! Cuanto antes aciertes, más puntos.' : 'Miras cómo juegan los demás.';
    clearInterval(T.timer); T.timer = setInterval(() => { const l = TRI_SEC - (performance.now() - T.qt0) / 1000; $('#mpd-bar').style.transform = `scaleX(${Math.max(0, l / TRI_SEC)})`; if (l <= 0) clearInterval(T.timer); }, 100);
  },
  onRev(d) {
    const T = this.T; clearInterval(T.timer); const q = this.qs && this.qs[d.gi]; if (!q) return; const me = this.me();
    const bs = $('#mpd-a').querySelectorAll('.sl-pa'); bs.forEach((b, j) => { b.disabled = true; if (q.o[j].ok) b.classList.add('ok'); else if (j === T.mine) b.classList.add('bad'); });
    const p = (d.got || {})[me]; if (T.act.includes(me)) { if (p > 0) { Audio.pickup && Audio.pickup(); buzz(30); } else { Audio.hurt && Audio.hurt(); } }
    const rows = Object.entries(d.sc || {}).sort((a, b) => b[1] - a[1]);
    const lb = document.createElement('div'); lb.className = 'tri-lb';
    rows.forEach(([id, s], i) => { const r = document.createElement('div'); r.className = 'tri-lr' + (id === me ? ' me' : ''); const g = (d.got || {})[id] | 0; r.innerHTML = '<b></b><span></span><em></em>'; r.children[0].textContent = `${i + 1}.`; r.children[1].textContent = id === me ? 'Tú' : T.names[id] || 'Viajero'; r.children[2].textContent = `${s}${g ? ' (+' + g + ')' : ''}`; lb.appendChild(r); });
    $('#mpd-a').appendChild(lb);
    $('#mpd-msg').textContent = (p > 0 ? `✓ ¡Correcto! +${p}` : T.act.includes(me) ? '✗ No esta vez.' : '') + (q.e ? ' ' + q.e : '');
  },
  onCut(d) {
    const T = this.T; const me = this.me(); const keep = d.keep || []; const still = keep.includes(me), was = T.act.includes(me);
    $('#mpd-vs').textContent = `🏆 Fin de la ${T.plan[T.st].toLowerCase()}`; $('#mpd-bar').style.transform = 'scaleX(0)';
    $('#mpd-n').textContent = was ? (still ? '¡Pasas a la siguiente ronda!' : 'Quedaste fuera esta vez') : 'Siguen en carrera';
    $('#mpd-q').textContent = `Pasan: ${keep.map((id) => id === me ? 'tú' : T.names[id] || 'Viajero').join(', ')}.`;
    const box = $('#mpd-a'); box.innerHTML = ''; (d.rank || []).forEach((x, i) => { const c = document.createElement('div'); c.className = 'mpd-card' + (x.id === me ? ' me' : ''); c.innerHTML = '<b></b>'; c.firstChild.textContent = `${keep.includes(x.id) ? '✓' : '·'} ${i + 1}. ${x.id === me ? 'Tú' : Sala.clean(x.n) || 'Viajero'} · ${x.p} puntos`; box.appendChild(c); });
    if (was && !still) { addScore(80); this.btn('Mirar hasta el final', 'primary', () => {}); }
    this.btn('Salir del torneo', 'ghost', () => this.leave('Saliste del torneo.'));
    $('#mpd-msg').textContent = 'La siguiente ronda empieza en unos segundos…'; if (still) { Audio.victory && Audio.victory(); buzz([30, 40, 30]); }
  },
  onEnd(d) {
    const T = this.T; clearInterval(T.timer); clearInterval(T.watch); clearTimeout(T.t1); const me = this.me(); const rows = (d.rows || []).concat((d.out || []).map((x) => ({ ...x, p: x.tot })));
    const win = rows[0]; const iWon = win && win.id === me; const pos = rows.findIndex((x) => x.id === me);
    $('#mpd-vs').textContent = '🏆 Podio del torneo'; $('#mpd-bar').style.transform = 'scaleX(0)';
    $('#mpd-n').textContent = iWon ? '¡Eres campeón del torneo!' : win ? `Campeón: ${Sala.clean(win.n) || 'Viajero'}` : 'Fin del torneo';
    $('#mpd-q').textContent = 'Gracias por jugar. ¡Pensar juntos es mejor!';
    const box = $('#mpd-a'); box.innerHTML = ''; const pod = document.createElement('div'); pod.className = 'tri-pod'; box.appendChild(pod);
    [rows[1], rows[0], rows[2]].forEach((x, k) => { if (!x) return; const c = document.createElement('div'); c.className = 'tri-pc p' + [2, 1, 3][k] + (x.id === me ? ' me' : ''); c.innerHTML = '<i></i><b></b><span></span>'; c.children[0].textContent = ['🥈', '🥇', '🥉'][k]; c.children[1].textContent = x.id === me ? 'Tú' : Sala.clean(x.n) || 'Viajero'; c.children[2].textContent = `${x.p} pts`; pod.appendChild(c); });
    const pts = iWon ? 500 : pos === 1 ? 250 : 120; addScore(pts); popup(`+${pts}<small>torneo de trivia</small>`, 'up'); achieve('torneo1'); if (iWon) { achieve('torneo'); Audio.victory && Audio.victory(); buzz([40, 60, 40, 60, 80]); }
    this.btn('Seguir explorando', 'primary', () => this.leave(''));
    if (T.host === me) this.btn('Abrir otra mesa', 'ghost', () => { this.leave(''); setTimeout(() => this.setup(), 300); });
    $('#mpd-msg').textContent = '';
  },
};
// Juntos: el «sí» del aviso de invitación también sirve para tomar asiento
{
  const a0 = Juntos.answerInv;
  Juntos.answerInv = function (yes) {
    const d = this.inv; if (!d || !d.triv) return a0.call(this, yes);
    this.inv = null; $('#mp-inv').hidden = true; clearTimeout(this.invT); $('#mp-yes').textContent = '¡Acepto!'; $('#mp-no').textContent = 'Ahora no';
    if (yes && G.state === 'play') Trivia.join(d.h, d.nm);
  };
}
// botón para abrir una mesa cuando estás en línea
{
  const b = document.createElement('button'); b.id = 'mp-triv'; b.hidden = true; b.textContent = '🏆 Torneo'; b.setAttribute('aria-label', 'Abrir un torneo de trivia');
  b.addEventListener('click', () => { Audio.init && Audio.init(); Audio.click(); Trivia.setup(); });
  (document.getElementById('app') || document.body).appendChild(b);
  setInterval(() => { try { const show = Trivia.canOpen(); if (b.hidden === show) b.hidden = !show; } catch (e) { /* nada */ } }, 700);
}
{
  const st = document.createElement('style');
  st.textContent = '#mp-triv{position:absolute;right:max(12px,var(--sar,0px));top:calc(max(8px,var(--sat)) + 96px);z-index:31;border:1px solid var(--gold,#d8b25a);border-radius:999px;padding:8px 14px;font:inherit;font-size:.9rem;color:#2a1a08;background:linear-gradient(#ffe08a,#d8a83a);box-shadow:0 4px 16px rgba(0,0,0,.45);cursor:pointer}'
    + 'body.touch #mp-triv{top:auto;bottom:calc(var(--sab,0px) + 250px)}#mp-triv[hidden]{display:none}'
    + '.tri-sizes{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:8px 0 12px}.tri-size{border:1px solid var(--gold,#d8b25a);border-radius:14px;padding:12px 6px;background:rgba(255,211,106,.08);color:inherit;font:inherit;cursor:pointer}'
    + '.tri-size b{display:block;font-size:2rem;color:var(--gold-bright,#ffd36a);font-family:var(--display,Georgia)}.tri-size span{font-size:.8rem;opacity:.85}.tri-all{display:block;font-size:.85rem;margin:4px 0 10px;opacity:.9}'
    + '.tri-table{position:relative;width:min(320px,80vw);aspect-ratio:1.1;margin:6px auto 10px;border-radius:50%;background:radial-gradient(circle,rgba(150,100,40,.55),rgba(60,38,14,.75) 62%,transparent 64%)}'
    + '.tri-mid{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:2.2rem;filter:drop-shadow(0 0 10px rgba(255,211,106,.6))}'
    + '.tri-seat{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;width:78px;text-align:center}'
    + '.tri-seat i{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;font-style:normal;font-weight:700;color:#fff;border:2px dashed rgba(255,224,160,.5);text-shadow:0 1px 2px #000;font-size:1.2rem}'
    + '.tri-seat.on i{border:2px solid var(--gold,#d8b25a);box-shadow:0 0 12px rgba(255,211,106,.45)}.tri-seat.me i{border-color:#fff}.tri-seat span{font-size:.72rem;margin-top:3px;line-height:1.1;max-width:78px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'
    + '.tri-table.n8 .tri-seat i{width:38px;height:38px;font-size:1rem}'
    + '.tri-inv{margin:6px 0}.tri-h{font-size:.85rem;opacity:.85;margin:4px 0}.tri-row{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.08)}'
    + '.tri-row .btn{padding:6px 12px;font-size:.85rem;margin:0}.tri-wa{background:#25d366 !important;color:#fff !important;border-color:#25d366 !important}'
    + '.tri-lb{margin-top:10px}.tri-lr{display:grid;grid-template-columns:28px 1fr auto;gap:6px;padding:4px 8px;border-radius:8px;font-size:.92rem}.tri-lr.me{background:rgba(255,211,106,.15)}.tri-lr em{font-style:normal;color:var(--gold-bright,#ffd36a)}'
    + '#mpd.tri .sl-pa.pick{outline:3px solid #fff}#mpd.tri .sl-pa.ok{outline:3px solid #5fd36a;box-shadow:0 0 16px rgba(95,211,106,.6)}#mpd.tri .sl-pa.bad{opacity:.55}'
    + '.tri-pod{display:flex;align-items:flex-end;justify-content:center;gap:8px;margin:10px 0 14px}.tri-pc{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;width:96px;border-radius:12px 12px 0 0;background:linear-gradient(rgba(255,211,106,.25),rgba(255,211,106,.05));border:1px solid var(--gold,#d8b25a);padding:8px 4px}'
    + '.tri-pc.p1{height:150px}.tri-pc.p2{height:118px}.tri-pc.p3{height:96px}.tri-pc i{font-style:normal;font-size:1.8rem}.tri-pc b{font-size:.9rem;margin-top:4px;max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tri-pc span{font-size:.8rem;opacity:.85}.tri-pc.me{box-shadow:0 0 14px rgba(255,255,255,.4)}';
  document.head.appendChild(st);
}
