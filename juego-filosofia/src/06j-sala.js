// ============================================================================
//  EN VIVO: trivia filosófica para toda la clase (o un grupo de amigos).
//  Quien crea la sala la proyecta; los demás se unen desde su celular con un
//  código de 4 letras y un apodo. Sin chat, sin cuentas y sin datos personales:
//  los mensajes viajan por un canal de Supabase Realtime y no se guardan.
// ============================================================================
const RT = {
  ws: null, topic: '', ref: 0, hb: null, handlers: {}, joined: false, want: false, tries: 0, onStatus: null,
  connect(room, handlers, onStatus) {
    this.close(); this.topic = 'realtime:odisea-sala-' + room; this.handlers = handlers; this.onStatus = onStatus; this.want = true; this.tries = 0; this.open();
  },
  open() {
    const K = CUENTA_CFG.key; let ws;
    try { ws = new WebSocket(CUENTA_CFG.url.replace(/^http/, 'ws') + '/realtime/v1/websocket?apikey=' + K + '&vsn=1.0.0'); } catch (e) { this.status('error'); return; }
    this.ws = ws; this.joined = false;
    ws.onopen = () => { this.push('phx_join', { config: { broadcast: { self: false, ack: false }, presence: { key: '' } }, access_token: K }, this.topic); };
    ws.onmessage = (m) => {
      let j; try { j = JSON.parse(m.data); } catch (e) { return; }
      if (j.event === 'phx_reply' && j.topic === this.topic && !this.joined) { if (j.payload && j.payload.status === 'ok') { this.joined = true; this.tries = 0; this.status('ok'); } else this.status('error'); return; }
      if (j.event === 'broadcast' && j.payload) { const f = this.handlers[j.payload.event]; if (f) try { f(j.payload.payload || {}); } catch (e) { console.warn(e); } }
    };
    ws.onclose = () => { clearInterval(this.hb); this.joined = false; if (!this.want) return; this.status('reconnect'); if (this.tries++ < 8) setTimeout(() => this.want && this.open(), 1200 * this.tries); else this.status('error'); };
    ws.onerror = () => {};
    clearInterval(this.hb); this.hb = setInterval(() => this.push('heartbeat', {}, 'phoenix'), 25000);
  },
  status(s) { if (this.onStatus) this.onStatus(s); },
  push(event, payload, topic = this.topic) { if (this.ws && this.ws.readyState === 1) this.ws.send(JSON.stringify({ topic, event, payload, ref: String(++this.ref) })); },
  send(event, payload) { if (!this.joined) return false; this.push('broadcast', { type: 'broadcast', event, payload }); return true; },
  close() { this.want = false; clearInterval(this.hb); if (this.ws) try { this.ws.close(); } catch (e) { /* nada */ } this.ws = null; this.joined = false; },
};

const SALA_COLORS = ['#d8504a', '#3a8ad8', '#e0b030', '#3aa860'];
const SALA_BAD = /\b(puta|puto|mierda|verga|culo|weon|huevon|pene|sexo|concha|idiota|estupid[oa]|maric[oó]n|pendej[oa]|imbecil|tont[oa])\b/;
const Sala = {
  role: null, code: '', id: '', name: '', view: '', P: new Map(), qs: [], i: -1, cur: null, timer: null, left: 0, T: 20,
  ok() { return typeof AppInstall !== 'undefined' && AppInstall.web && typeof WebSocket !== 'undefined'; },
  rid(n, abc = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789') { const r = new Uint32Array(n); crypto.getRandomValues(r); return [...r].map((x) => abc[x % abc.length]).join(''); },
  clean(n) {
    let v = String(n || '').replace(/[^\p{L}\p{N} ]/gu, '').replace(/\s+/g, ' ').trim().slice(0, 16);
    const plain = v.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    if (v.length < 2 || SALA_BAD.test(plain)) v = '';
    return v;
  },
  // ---------------------------------------------------------------- pantallas
  open(code) {
    G.prevScreen = 'title'; show('sala'); this.role = null;
    $('#sl-off').hidden = this.ok(); $('#sl-home').hidden = !this.ok(); this.setView('home');
    const al = (typeof Fame !== 'undefined' && Fame.alias()) || ''; if (al && !$('#sl-name').value) $('#sl-name').value = this.clean(al);
    if (code) $('#sl-code').value = code;
    const sel = $('#sl-era'); if (!sel.options.length) { sel.add(new Option('Toda la odisea (mezcla)', '-1')); CHRONO.forEach((ei) => sel.add(new Option(`${ERAS[ei].num} · ${ERAS[ei].name}`, String(ei)))); }
  },
  setView(v) {
    this.view = v; document.querySelectorAll('#sala [data-sv]').forEach((el) => (el.hidden = el.dataset.sv !== v));
    $('#sala').classList.toggle('sl-big', this.role === 'host' && v !== 'home');
  },
  leave() {
    clearInterval(this.timer); if (this.role === 'host') RT.send('cerrada', {}); RT.close(); this.role = null; this.P.clear();
    try { if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {}); } catch (e) { /* nada */ }
    show('title');
  },
  net(s) { const el = $('#sl-net'); el.hidden = s === 'ok'; el.textContent = s === 'reconnect' ? 'Reconectando…' : s === 'error' ? 'Sin conexión con la sala. Revisa internet e inténtalo otra vez.' : ''; },
  // ---------------------------------------------------------------- anfitrión
  host() {
    this.role = 'host'; this.code = this.rid(4); this.P.clear(); this.i = -1;
    RT.connect(this.code, { hola: (d) => this.hHola(d), resp: (d) => this.hResp(d) }, (s) => this.net(s));
    $('#sl-bigcode').textContent = this.code; $('#sl-link').textContent = GAME_URL.replace(/^https?:\/\//, '') + '?sala=' + this.code;
    this.setView('lobby'); this.paintLobby();
    try { if (document.documentElement.requestFullscreen && !document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {}); } catch (e) { /* nada */ }
  },
  ranking() { return [...this.P.entries()].sort((a, b) => b[1].pts - a[1].pts || a[1].name.localeCompare(b[1].name, 'es')); },
  roster() { return [...this.P.values()].map((p) => p.name); },
  hHola(d) {
    const id = String(d.id || '').slice(0, 12); if (!/^[A-Za-z0-9]{6,12}$/.test(id)) return;
    let p = this.P.get(id);
    if (!p) {
      if (this.P.size >= 60) return; let name = this.clean(d.name) || 'Jugador ' + (this.P.size + 1);
      const taken = new Set(this.roster().map((n) => n.toLowerCase())); let k = 2; const base = name; while (taken.has(name.toLowerCase())) name = base.slice(0, 13) + ' ' + k++;
      p = { name, pts: 0, streak: 0 }; this.P.set(id, p); Audio.pickup && Audio.pickup();
    }
    RT.send('bien', { id, name: p.name, n: this.P.size });
    if (this.cur && this.view === 'q') RT.send('q', { ...this.qPayload(), solo: id });
    if (this.view === 'lobby') this.paintLobby(); else this.paintCount();
  },
  paintLobby() {
    const box = $('#sl-players'); box.innerHTML = '';
    for (const [id, p] of this.P) { const b = document.createElement('button'); b.className = 'sl-chip'; b.textContent = p.name; b.title = 'Tocar para sacar de la sala';
      b.addEventListener('click', () => { if (!confirm(`¿Sacar a «${p.name}» de la sala?`)) return; this.P.delete(id); RT.send('fuera', { id }); this.paintLobby(); }); box.appendChild(b); }
    $('#sl-pcount').textContent = this.P.size ? `${this.P.size} ${this.P.size === 1 ? 'jugador' : 'jugadores'} en la sala` : 'Esperando jugadores…';
    $('#sl-start').disabled = !this.P.size;
  },
  pool(era) {
    const eras = era >= 0 ? [ERAS[era]] : ERAS; const out = [];
    for (const e of eras) for (const s of e.sages) for (const q of s.q || []) if (q && q.q && q.a && q.a.length === 4) out.push({ q: q.q, a: q.a, e: q.e || '', who: s.short, era: e.name });
    return out;
  },
  start() {
    const era = +$('#sl-era').value, n = +$('#sl-n').value; this.T = +$('#sl-t').value;
    this.qs = shuffle(this.pool(era)).slice(0, n); if (!this.qs.length) return toast('No hay preguntas para esa época.');
    for (const p of this.P.values()) { p.pts = 0; p.streak = 0; }
    this.i = -1; Audio.gong && Audio.gong(); this.next();
  },
  qPayload() { const c = this.cur; return { i: this.i, n: this.qs.length, q: c.q.q, a: c.opts.map((o) => o.t), who: c.q.who, t: Math.max(1, Math.ceil(this.left)) }; },
  next() {
    if (this.i + 1 >= this.qs.length) return this.end();
    this.i++; const q = this.qs[this.i]; const opts = shuffle(q.a.map((t, k) => ({ t, ok: k === 0 })));
    this.cur = { q, opts, ans: new Map(), t0: performance.now() }; this.left = this.T;
    $('#sl-qnum').textContent = `Pregunta ${this.i + 1} de ${this.qs.length}`; $('#sl-qwho').textContent = q.who + ' · ' + q.era; $('#sl-q').textContent = q.q;
    const box = $('#sl-ans'); box.innerHTML = '';
    opts.forEach((o, k) => { const d = document.createElement('div'); d.className = 'sl-a'; d.style.setProperty('--c', SALA_COLORS[k]); d.innerHTML = `<b>${'ABCD'[k]}</b><span></span><i></i>`; d.querySelector('span').textContent = o.t; box.appendChild(d); });
    $('#sl-exp').hidden = true; $('#sl-top').hidden = true; $('#sl-next').hidden = true; $('#sl-reveal').hidden = false;
    this.setView('q'); this.paintCount(); RT.send('q', this.qPayload());
    clearInterval(this.timer); const t0 = performance.now();
    this.timer = setInterval(() => {
      this.left = this.T - (performance.now() - t0) / 1000; const k = Math.max(0, this.left / this.T);
      $('#sl-tbar').style.transform = `scaleX(${k})`; $('#sl-tnum').textContent = Math.max(0, Math.ceil(this.left));
      if (this.left <= 5 && this.left > 0 && Math.ceil(this.left) !== this._tick) { this._tick = Math.ceil(this.left); Audio.tick && Audio.tick(); }
      if (this.left <= 0) this.reveal();
    }, 100);
  },
  paintCount() { if (this.cur) $('#sl-count').textContent = `${this.cur.ans.size} de ${this.P.size} respondieron`; },
  hResp(d) {
    const c = this.cur; if (!c || this.view !== 'q' || c.done || d.i !== this.i) return; const p = this.P.get(d.id); if (!p || c.ans.has(d.id)) return;
    const k = d.k | 0; if (k < 0 || k > 3) return; c.ans.set(d.id, { k, at: performance.now() - c.t0 }); this.paintCount();
    if (c.ans.size >= this.P.size) setTimeout(() => this.reveal(), 400);
  },
  reveal() {
    const c = this.cur; if (!c || c.done) return; c.done = true; clearInterval(this.timer);
    const okK = c.opts.findIndex((o) => o.ok); const dist = [0, 0, 0, 0]; const res = {};
    for (const [id, p] of this.P) {
      const a = c.ans.get(id); let got = 0;
      if (a) { dist[a.k]++; if (a.k === okK) { p.streak++; got = Math.round(500 + 500 * Math.max(0, 1 - a.at / (this.T * 1000))) + (p.streak >= 3 ? 100 : 0); p.pts += got; } else p.streak = 0; } else p.streak = 0;
      res[id] = [a ? (a.k === okK ? 1 : 0) : -1, got, p.pts, 0];
    }
    const rank = this.ranking(); rank.forEach(([id], k) => { if (res[id]) res[id][3] = k + 1; });
    [...$('#sl-ans').children].forEach((el, k) => { el.classList.add(k === okK ? 'ok' : 'no'); el.querySelector('i').textContent = dist[k]; });
    const ex = $('#sl-exp'); ex.hidden = !c.q.e; ex.textContent = c.q.e;
    const top = $('#sl-top'); top.innerHTML = '<h3>Posiciones</h3>' + rank.slice(0, 5).map(([, p], k) => `<div><b>${k + 1}</b><span></span><em>${p.pts}</em></div>`).join('');
    [...top.querySelectorAll('span')].forEach((s, k) => (s.textContent = rank[k][1].name)); top.hidden = !rank.length;
    $('#sl-reveal').hidden = true; $('#sl-next').hidden = false; $('#sl-next').textContent = this.i + 1 >= this.qs.length ? 'Ver el podio' : 'Siguiente pregunta';
    Audio.correct && Audio.correct();
    RT.send('rev', { i: this.i, ok: okK, okT: c.opts[okK].t, e: c.q.e, res });
  },
  end() {
    clearInterval(this.timer); this.cur = null; const rank = this.ranking(); const res = {};
    rank.forEach(([id, p], k) => (res[id] = [k + 1, p.pts]));
    const pod = $('#sl-podium'); pod.innerHTML = '';
    [1, 0, 2].forEach((k) => { const r = rank[k]; const d = document.createElement('div'); d.className = 'sl-pod p' + (k + 1); d.innerHTML = `<span></span><em></em><b>${k + 1}</b>`; if (r) { d.querySelector('span').textContent = r[1].name; d.querySelector('em').textContent = r[1].pts + ' pts'; } else d.style.visibility = 'hidden'; pod.appendChild(d); });
    const rest = $('#sl-rest'); rest.innerHTML = ''; rank.slice(3, 12).forEach(([, p], k) => { const d = document.createElement('div'); d.innerHTML = `<b>${k + 4}</b><span></span><em>${p.pts}</em>`; d.querySelector('span').textContent = p.name; rest.appendChild(d); });
    this.setView('end'); Audio.victory && Audio.victory();
    RT.send('fin', { res, top: rank.slice(0, 3).map(([, p]) => [p.name, p.pts]) });
  },
  // ---------------------------------------------------------------- jugador
  join() {
    const code = ($('#sl-code').value || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4); const name = this.clean($('#sl-name').value);
    if (code.length !== 4) return toast('El código de la sala tiene 4 letras o números.');
    if (!name) return toast('Escribe un apodo de 2 a 16 letras (sin palabras ofensivas).');
    this.role = 'player'; this.code = code; this.name = name; this.got = false;
    try { this.id = sessionStorage.getItem('odisea-sala-' + code) || this.rid(8); sessionStorage.setItem('odisea-sala-' + code, this.id); } catch (e) { this.id = this.rid(8); }
    $('#sl-wmsg').textContent = 'Buscando la sala ' + code + '…'; $('#sl-wme').textContent = ''; this.setView('wait');
    let tries = 0; clearInterval(this.timer);
    const hello = () => { if (this.got) return; if (tries++ > 6) { clearInterval(this.timer); $('#sl-wmsg').textContent = 'No encontramos la sala ' + code + '. Revisa el código y que la pantalla del docente siga abierta.'; return; } RT.send('hola', { id: this.id, name: this.name }); };
    RT.connect(code, {
      bien: (d) => { if (d.id !== this.id) return; if (!this.got) Audio.correct && Audio.correct(); this.got = true; this.name = d.name; clearInterval(this.timer); if (this.view === 'wait' || this.view === 'pend') { $('#sl-wmsg').textContent = '¡Estás dentro! Mira la pantalla de la sala: el juego empezará pronto.'; $('#sl-wme').textContent = d.name; } },
      q: (d) => { if (d.solo && d.solo !== this.id) return; this.pQ(d); },
      rev: (d) => this.pRev(d), fin: (d) => this.pFin(d),
      fuera: (d) => { if (d.id !== this.id) return; RT.close(); $('#sl-wmsg').textContent = 'Quien creó la sala te sacó del juego.'; $('#sl-wme').textContent = ''; this.setView('wait'); },
      cerrada: () => { RT.close(); $('#sl-wmsg').textContent = 'La sala se cerró. ¡Gracias por jugar!'; this.setView('wait'); },
    }, (s) => { this.net(s); if (s === 'ok') { hello(); clearInterval(this.timer); this.timer = setInterval(hello, 2000); } });
  },
  pQ(d) {
    this.pq = d; this.sent = false; $('#sl-pnum').textContent = `Pregunta ${d.i + 1} de ${d.n} · ${d.who}`; $('#sl-pq').textContent = d.q;
    const box = $('#sl-pans'); box.innerHTML = '';
    d.a.forEach((t, k) => { const b = document.createElement('button'); b.className = 'sl-pa'; b.style.setProperty('--c', SALA_COLORS[k]); b.innerHTML = `<b>${'ABCD'[k]}</b><span></span>`; b.querySelector('span').textContent = t;
      b.addEventListener('click', () => { if (this.sent) return; this.sent = true; Audio.click(); buzz && buzz(15); RT.send('resp', { id: this.id, i: d.i, k }); [...box.children].forEach((x, j) => x.classList.add(j === k ? 'pick' : 'dim')); $('#sl-pstate').textContent = 'Respuesta enviada. ¡Mira la pantalla!'; }); box.appendChild(b); });
    $('#sl-pstate').textContent = ''; this.setView('pq');
    const end = performance.now() + d.t * 1000; clearInterval(this.timer);
    this.timer = setInterval(() => { const l = (end - performance.now()) / 1000; $('#sl-ptbar').style.transform = `scaleX(${Math.max(0, l / d.t)})`; if (l <= 0) { clearInterval(this.timer); if (!this.sent) { this.sent = true; $('#sl-pstate').textContent = 'Se acabó el tiempo.'; } } }, 100);
  },
  pRev(d) {
    clearInterval(this.timer); const r = (d.res || {})[this.id]; if (!r) return;
    const [ok, got, tot, pos] = r; const el = $('#sl-pres');
    el.className = 'sl-pres ' + (ok === 1 ? 'ok' : 'no');
    el.querySelector('b').textContent = ok === 1 ? '✓ ¡Correcto!' : ok === 0 ? '✗ No era esa' : '⏱ Sin respuesta';
    el.querySelector('span').textContent = ok === 1 ? `+${got} puntos` : `Era: ${d.okT}`;
    el.querySelector('em').textContent = `${tot} puntos · vas en el puesto ${pos}`;
    (ok === 1 ? Audio.correct : Audio.wrong) && (ok === 1 ? Audio.correct() : Audio.wrong()); this.setView('prev');
  },
  pFin(d) {
    clearInterval(this.timer); const r = (d.res || {})[this.id]; const pos = r ? r[0] : 0;
    $('#sl-fpos').textContent = pos ? (pos <= 3 ? ['🥇', '🥈', '🥉'][pos - 1] + ' ' : '') + `Puesto ${pos}` : 'Fin del juego';
    $('#sl-fpts').textContent = r ? `${r[1]} puntos` : '';
    $('#sl-ftop').textContent = (d.top || []).map((x, k) => `${k + 1}. ${x[0]} (${x[1]})`).join('   ');
    if (pos === 1) achieve && achieve('envivo'); Audio.victory && Audio.victory(); this.setView('pend');
  },
  boot() { const c = new URLSearchParams(location.search).get('sala'); if (!c) return; try { history.replaceState(null, '', location.pathname + location.hash); } catch (e) { /* nada */ } this.open(c.toUpperCase().slice(0, 4)); },
};
on('#b-sala', () => Sala.open());
on('#sl-host', () => Sala.host());
on('#sl-join', () => Sala.join());
on('#sl-start', () => Sala.start());
on('#sl-reveal', () => Sala.reveal());
on('#sl-next', () => Sala.next());
on('#sl-again', () => { Sala.setView('lobby'); Sala.paintLobby(); });
document.querySelectorAll('#sala .sl-leave').forEach((b) => b.addEventListener('click', () => { Audio.click(); Sala.leave(); }));
$('#sl-code').addEventListener('keydown', (e) => { if (e.key === 'Enter') $('#sl-name').focus(); });
$('#sl-name').addEventListener('keydown', (e) => { if (e.key === 'Enter') Sala.join(); });
