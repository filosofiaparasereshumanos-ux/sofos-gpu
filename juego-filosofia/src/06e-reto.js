// ============================================================================
//  RETO ENTRE AMIGOS: diez preguntas iguales para los dos, por un enlace.
//  El enlace lleva la semilla de las preguntas y el resultado de quien reta,
//  así que funciona sin servidor y sin cuenta: basta con compartirlo.
// ============================================================================
const RETO_KEY = 'odisea-razon.retos';
const Reto = {
  incoming: null, // reto recibido por enlace
  enc(o) { return btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); },
  dec(s) { try { const o = JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g, '+').replace(/_/g, '/'))))); return o && typeof o.s === 'string' && /^[a-z0-9]{4,12}$/.test(o.s) ? o : null; } catch (e) { return null; } },
  seed() { const a = 'abcdefghjkmnpqrstuvwxyz23456789'; let s = ''; const r = new Uint32Array(8); crypto.getRandomValues(r); for (const x of r) s += a[x % a.length]; return s; },
  name() { const v = ($('#rt-name').value || '').trim().slice(0, 22); return v || (typeof Fame !== 'undefined' && Fame.alias()) || (typeof Cuenta !== 'undefined' && Cuenta.ses && Cuenta.ses.usuario) || ''; },
  link(res) { return GAME_URL + '?reto=' + this.enc({ s: res.s, n: res.n.slice(0, 22), c: res.c, p: res.p, g: res.g }); },
  boot() {
    const raw = new URLSearchParams(location.search).get('reto'); if (!raw) return;
    this.incoming = this.dec(raw);
    try { history.replaceState(null, '', location.pathname + location.hash); } catch (e) { /* nada */ }
    if (this.incoming) this.open();
  },
  open() {
    G.prevScreen = 'title';
    const inc = this.incoming; const nm = $('#rt-name'); nm.value = this.name();
    if (inc) {
      $('#rt-eye').textContent = 'Te han retado';
      $('#rt-title').textContent = `${String(inc.n || 'Alguien').slice(0, 22)} te reta`;
      $('#rt-text').textContent = `Respondió ${inc.c}/10 preguntas con ${Number(inc.p || 0).toLocaleString('es-ES')} de sabiduría. Tendrás las mismas diez preguntas, de todas las épocas y culturas, con 15 segundos para cada una. ¿Puedes superarle?`;
      $('#b-rtgo').textContent = 'Aceptar el reto';
    } else {
      $('#rt-eye').textContent = 'Reto entre amigos';
      $('#rt-title').textContent = 'Reta a un amigo';
      $('#rt-text').textContent = 'Responde diez preguntas de todas las épocas y culturas. Al terminar tendrás un enlace para enviar a quien quieras: le tocarán exactamente las mismas preguntas, y veréis quién sabe más.';
      $('#b-rtgo').textContent = 'Empezar mi reto';
    }
    this.renderHist(); show('reto');
  },
  start() {
    const n = this.name(); if (n) try { store.set(ALIAS_KEY, n); } catch (e) { /* nada */ }
    const seed = this.incoming ? this.incoming.s : this.seed();
    this.cur = { s: seed, from: this.incoming, n: n || 'Anónimo' };
    Oracle.duel = this.cur; Oracle.start();
    $('#duel .conv .lbl').textContent = 'Reto';
  },
  // Oracle.finish llama aquí cuando la partida era un reto
  finish(o) {
    const cur = this.cur; Oracle.duel = null; this.incoming = null;
    const me = { s: cur.s, n: cur.n, c: o.correct, p: o.score, g: o.grid };
    const from = cur.from; let title, msg, share;
    if (from) {
      const win = me.c > from.c || (me.c === from.c && me.p > from.p), tie = me.c === from.c && me.p === from.p;
      title = tie ? 'Empate' : win ? '¡Has ganado el reto!' : `Gana ${String(from.n).slice(0, 22)}`;
      msg = `${String(from.n).slice(0, 22)}: ${from.c}/10 · ${Number(from.p).toLocaleString('es-ES')}  —  Tú: ${me.c}/10 · ${me.p.toLocaleString('es-ES')}`;
      share = `Reto de la Odisea de la Razón\n${String(from.n).slice(0, 22)}: ${from.g || ''} ${from.c}/10\n${me.n}: ${me.g} ${me.c}/10\n${tie ? 'Empate' : win ? `Gana ${me.n}` : `Gana ${String(from.n).slice(0, 22)}`}. ¿Te atreves con las mismas preguntas?\n${this.link(me)}`;
      this.save({ s: me.s, vs: String(from.n).slice(0, 22), r: tie ? 'E' : win ? 'G' : 'P', c: me.c, oc: from.c, t: Date.now() });
      if (win) achieve('oraculo');
    } else {
      title = 'Reto listo'; msg = `${me.c}/10 · ${me.p.toLocaleString('es-ES')} de sabiduría. Envía el enlace: tu amigo tendrá las mismas diez preguntas.`;
      share = `Te reto en la Odisea de la Razón: hice ${me.c}/10 y ${me.p.toLocaleString('es-ES')} de sabiduría.\n${me.g}\n¿Puedes superarme con las mismas preguntas?\n${this.link(me)}`;
      this.save({ s: me.s, vs: '', r: 'C', c: me.c, t: Date.now() });
    }
    $('#oe-eye').textContent = 'Reto entre amigos';
    $('#oe-title').textContent = title; $('#oe-grid').textContent = o.grid; $('#oe-msg').textContent = msg; $('#oe-streak').textContent = '';
    $('#oe-stats').innerHTML = `<div><b>${me.c}/10</b><span>Aciertos</span></div><div><b>${me.p.toLocaleString('es-ES')}</b><span>Sabiduría</span></div><div><b>${o.best}</b><span>Mejor racha</span></div>`;
    $('#oe-share').value = share;
    $('#b-oshare').textContent = navigator.share ? 'Enviar el reto' : 'Copiar el reto para enviarlo';
    $('#b-oreto').hidden = false;
    show('oracle-end');
  },
  hist() { const h = store.get(RETO_KEY, []); return Array.isArray(h) ? h : []; },
  save(e) { const h = this.hist(); h.unshift(e); store.set(RETO_KEY, h.slice(0, 30)); },
  renderHist() {
    const h = this.hist().filter((e) => e.r !== 'C'); const box = $('#rt-hist');
    if (!h.length) { box.hidden = true; return; }
    const g = h.filter((e) => e.r === 'G').length, p = h.filter((e) => e.r === 'P').length, e = h.filter((x) => x.r === 'E').length;
    box.hidden = false; box.innerHTML = '';
    const t = document.createElement('p'); t.className = 'o-streak'; t.textContent = `Tus retos: ${g} ganados · ${p} perdidos${e ? ` · ${e} empates` : ''}`; box.appendChild(t);
    const ul = document.createElement('ul'); ul.className = 'rt-list';
    h.slice(0, 5).forEach((x) => { const li = document.createElement('li'); li.textContent = `${x.r === 'G' ? '🏆' : x.r === 'P' ? '💭' : '🤝'} contra ${x.vs || 'alguien'}: ${x.c} a ${x.oc}`; ul.appendChild(li); });
    box.appendChild(ul);
  },
};
on('#b-reto', () => { Reto.incoming = null; Reto.open(); });
on('#b-rtgo', () => Reto.start());
on('#b-oreto', () => { Reto.incoming = null; Reto.open(); });
