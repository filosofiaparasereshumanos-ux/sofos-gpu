// ============================================================================
//  EL CUADERNO DEL FILÓSOFO: respuestas escritas a la pregunta de cada pensador,
//  con una autoevaluación sencilla, y las posturas tomadas en los diálogos.
//  Se guarda en el dispositivo y se puede copiar o descargar para el docente.
// ============================================================================
const CUADERNO_KEY = 'odisea-razon.cuaderno';
const Cuaderno = {
  d: null,
  question(d) {
    if (typeof d.q === 'string') return d.q;
    const L = LESSONS[d.id] || []; const last = L[L.length - 1] || '';
    const m = last.match(/Mi pregunta para ti[^:]*:\s*(.+)$/); if (m) return m[1].trim();
    const D = typeof DIALOGOS !== 'undefined' && DIALOGOS[d.id]; if (D) return `¿Estás de acuerdo con esta idea: «${D.tesis}»? ¿Por qué?`;
    return `¿Qué idea de ${d.short} te hizo pensar? ¿Estás de acuerdo con ella? ¿Por qué?`;
  },
  all() { const o = store.get(CUADERNO_KEY, {}); return o && typeof o === 'object' ? o : {}; },
  experiencias() { const o = store.get(XP_KEY, {}); return o && typeof o === 'object' ? o : {}; },
  posturas() { const o = store.get(POSTURA_KEY, {}); return o && typeof o === 'object' ? o : {}; },
  open(d) {
    this.d = d; const e = this.all()[d.id];
    $('#nb-who').textContent = d.name; $('#nb-q').textContent = this.question(d); $('#nb-t').value = e ? e.t : '';
    for (const k of ['r', 'e', 'o']) $('#nb-' + k).checked = !!(e && e.c && e.c[k]);
    $('#nb-msg').textContent = ''; $('#nb').hidden = false; Voice.stop();
    this.fromPlay = G.state === 'play'; if (this.fromPlay) { G.state = 'place'; unlockPointer(); input.keys = {}; $('#hud').hidden = true; $('#touch').hidden = true; }
    if (!IS_TOUCH) setTimeout(() => $('#nb-t').focus(), 60);
  },
  save() {
    const t = $('#nb-t').value.trim();
    if (t.length < 15) { $('#nb-msg').textContent = 'Escribe al menos una idea completa, con tus palabras.'; return; }
    const all = this.all(); const first = !all[this.d.id]; const c = { r: $('#nb-r').checked, e: $('#nb-e').checked, o: $('#nb-o').checked };
    all[this.d.id] = { who: this.d.name, q: this.question(this.d), t: t.slice(0, 3000), c, at: Date.now() };
    store.set(CUADERNO_KEY, all); this.close();
    if (first && G.state !== 'title' && typeof addScore === 'function') addScore(50);
    const n = Object.values(c).filter(Boolean).length;
    toast(first ? `Guardado en tu cuaderno (+50 sabiduría).${n < 3 ? ' Consejo: una buena respuesta da una razón, pone un ejemplo y piensa en una objeción.' : ' ¡Respuesta completa!'}` : 'Cuaderno actualizado.');
    achieve('cuaderno');
  },
  close() { $('#nb').hidden = true; if (this.fromPlay && G.state === 'place') { this.fromPlay = false; G.state = 'play'; $('#hud').hidden = false; if (IS_TOUCH) $('#touch').hidden = false; lockPointer(); } },
  checks(c) { return [['r', 'di una razón'], ['e', 'puse un ejemplo'], ['o', 'consideré una objeción']].map(([k, l]) => (c && c[k] ? '✓ ' : '○ ') + l).join(' · '); },
  qual(k) { return k === 'b' ? 'buena' : k === 'f' ? 'falacia' : 'débil'; },
  text() {
    const name = (typeof Fame !== 'undefined' && Fame.alias()) || (typeof Cuenta !== 'undefined' && Cuenta.ses && Cuenta.ses.usuario) || '';
    const out = [`CUADERNO DEL FILÓSOFO · Odisea de la Razón${name ? ' · ' + name : ''}`, new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }), ''];
    if (typeof Mapa !== 'undefined') out.push(Mapa.text());
    const ps = Object.values(this.posturas());
    if (ps.length) { out.push('— DIÁLOGOS —'); for (const p of ps) out.push(`${p.who}: «${p.tesis}»`, `  Mi postura: ${p.postura}`, `  Mi razón (${this.qual(p.rk)}): ${p.razon}`, `  Ante la objeción respondí (${this.qual(p.xk)}): ${p.resp}`, ''); }
    const xs = Object.values(this.experiencias());
    if (xs.length) { out.push('— EXPERIENCIAS —'); for (const x of xs) out.push(x.who + ':', ...(x.el || []).map((e) => '  · ' + e), ''); }
    const es = Object.values(this.all()).sort((a, b) => a.at - b.at);
    if (es.length) { out.push('— MIS RESPUESTAS —'); for (const e of es) out.push(`${e.who}: ${e.q}`, e.t, `  (${this.checks(e.c)})`, ''); }
    if (!ps.length && !es.length && !xs.length) out.push('Todavía no hay nada escrito.');
    return out.join('\n');
  },
  render() {
    if (typeof Mapa !== 'undefined') Mapa.render($('#cu-mapa'));
    const box = $('#cu-list'); box.innerHTML = '';
    const ps = Object.values(this.posturas()); const es = Object.values(this.all()).sort((a, b) => b.at - a.at);
    $('#cu-count').textContent = `${es.length} ${es.length === 1 ? 'respuesta' : 'respuestas'} · ${ps.length} ${ps.length === 1 ? 'diálogo' : 'diálogos'}`;
    const add = (cls, h, lines) => { const c = document.createElement('div'); c.className = 'cu-item ' + cls; const b = document.createElement('b'); b.textContent = h; c.appendChild(b); for (const [t, k] of lines) { const p = document.createElement('p'); if (k) p.className = k; p.textContent = t; c.appendChild(p); } box.appendChild(c); };
    for (const p of ps) add('cu-dlg', `Diálogo con ${p.who}`, [[`«${p.tesis}»`, 'cq'], ['Tu postura: ' + p.postura, ''], [`Tu razón: ${p.razon}`, 'c' + (p.rk === 'b' ? 'ok' : p.rk === 'f' ? 'bad' : 'meh')], [`Ante la objeción: ${p.resp}`, 'c' + (p.xk === 'b' ? 'ok' : p.xk === 'f' ? 'bad' : 'meh')]]);
    for (const x of Object.values(this.experiencias())) add('cu-dlg', x.who, (x.el || []).map((e) => ['· ' + e, '']));
    for (const e of es) add('cu-ans', e.who, [[e.q, 'cq'], [e.t, 'ctxt'], [this.checks(e.c), 'cchk']]);
    if (!ps.length && !es.length && !Object.keys(this.experiencias()).length) { const p = document.createElement('p'); p.className = 'story'; p.textContent = 'Tu cuaderno está vacío. Habla con un pensador y elige «📓 Escribir en mi cuaderno», o elige «Dialoguemos» con pensadores como Sócrates, Heráclito, Descartes o Camus.'; box.appendChild(p); }
  },
  download() {
    const blob = new Blob([this.text()], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'cuaderno-del-filosofo.txt'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  },
};
on('#nb-save', () => Cuaderno.save());
on('#nb-cancel', () => Cuaderno.close());
$('#nb-t').addEventListener('keydown', (e) => e.stopPropagation());
on('#b-cuaderno', () => { openSub('cuaderno'); Cuaderno.render(); });
on('#cu-copy', () => shareOrCopy(Cuaderno.text(), $('#cu-copy')));
on('#cu-dl', () => Cuaderno.download());
