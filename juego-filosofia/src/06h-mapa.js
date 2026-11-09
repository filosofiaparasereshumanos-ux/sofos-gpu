// ============================================================================
//  MAPA FILOSÓFICO: con las posturas de los diálogos y las elecciones de los
//  experimentos, el jugador ve dónde se sitúa en seis grandes preguntas y con
//  qué pensadores coincide o discute. No hay posturas correctas.
// ============================================================================
const MAPA_EJES = [
  { id: 'verdad', q: '¿Hay verdades para todos?', neg: 'Cada uno tiene su verdad', pos: 'Hay verdades para todos', a: ['protagoras', 'nietzsche'], b: ['platon', 'kant'], hint: 'Dialoga con Protágoras (Atenas) o con Nietzsche (siglo XIX)' },
  { id: 'conocer', q: '¿Cómo conocemos?', neg: 'Por los sentidos y la experiencia', pos: 'Por la razón', a: ['aristoteles', 'hume', 'locke'], b: ['platon', 'descartes', 'spinoza'], hint: 'Dialoga con Platón o Descartes, o entra en la habitación de Descartes' },
  { id: 'cambio', q: '¿Todo cambia?', neg: 'Todo fluye', pos: 'Algo permanece', a: ['heraclito', 'zhuangzi', 'buda'], b: ['parmenides', 'aristoteles', 'platon'], hint: 'Dialoga con Heráclito o entra en su río o en el barco de Teseo' },
  { id: 'justicia', q: '¿Por qué ser justos?', neg: 'Por miedo o conveniencia', pos: 'Porque vale por sí misma', a: ['maquiavelo', 'epicuro'], b: ['socrates', 'platon', 'kant'], hint: 'Ponte el anillo de Giges o dialoga con Maquiavelo' },
  { id: 'mal', q: '¿De dónde nace el mal?', neg: 'De la ignorancia', pos: 'De la voluntad', a: ['socrates', 'buda'], b: ['agustin', 'aristoteles', 'arendt'], hint: 'Dialoga con Sócrates o con Agustín' },
  { id: 'sentido', q: '¿Dónde está el sentido de la vida?', neg: 'Hay que encontrarlo fuera', pos: 'Lo creamos al vivir', a: ['platon', 'agustin', 'tomas'], b: ['camus', 'sartre', 'beauvoir'], hint: 'Dialoga con Camus o empuja la roca de Sísifo' },
];
// [experiencia, comienzo de la elección registrada, eje, valor]
const MAPA_REGLAS = [
  ['rio', 'No: el agua siempre es otra', 'cambio', -1], ['rio', 'Sí: el cauce', 'cambio', 1], ['rio', 'Tampoco yo', 'cambio', -1],
  ['teseo', '¿Cuál es el verdadero? El de tablas nuevas', 'cambio', 1], ['teseo', '¿Cuál es el verdadero? El de tablas viejas', 'cambio', 1], ['teseo', '¿Cuál es el verdadero? Los dos', 'cambio', -0.5],
  ['mariposa', 'Todas las cosas se transforman', 'cambio', -1], ['mariposa', 'Soy Zhuangzi', 'conocer', 0.5], ['mariposa', 'Soy una mariposa', 'conocer', -0.5],
  ['descartes', 'Llegué al cogito', 'conocer', 1],
  ['giges', 'La bolsa: Tomarla', 'justicia', -1], ['giges', 'La bolsa: Dejarla', 'justicia', 1], ['giges', 'La bolsa: Avisar', 'justicia', 1],
  ['giges', 'El palacio: Gobernar', 'justicia', -0.5], ['giges', 'El palacio: No entrar', 'justicia', 0.5],
  ['sisifo', 'No: un trabajo sin sentido', 'sentido', -1], ['sisifo', 'Sí, si acepta', 'sentido', 1], ['sisifo', 'Solo si se rebela', 'sentido', 1],
  ['escalera', 'Hay cosas que solo se muestran', 'sentido', -0.5],
];
const MAPA_DIALOGO = {
  protagoras: { eje: 'verdad', relativo: -1, universal: 1, matiz: 0 }, nietzsche: { eje: 'verdad', relativo: -1, universal: 1, matiz: 0 },
  platon: { eje: 'conocer', experiencia: -1, razon: 1, matiz: 0 }, descartes: { eje: 'conocer', experiencia: -1, razon: 1, matiz: 0 },
  heraclito: { eje: 'cambio', fluye: -1, permanece: 1, matiz: 0 },
  maquiavelo: { eje: 'justicia', conveniencia: -1, valor: 1, matiz: 0 },
  socrates: { eje: 'mal', saber: -1, voluntad: 1, matiz: 0 }, agustin: { eje: 'mal', ignorancia: -1, voluntad: 1, matiz: 0 },
  camus: { eje: 'sentido', fuera: -1, crear: 1, matiz: 0 },
  kant: { eje: 'justicia', deber: 1, consecuencias: -0.5, matiz: 0 },
  hume: { eje: 'conocer', experiencia: -1, razon: 1, matiz: 0 },
  buda: { eje: 'mal', apego: -1, fuera: 0, matiz: 0 },
  beauvoir: { eje: 'sentido', construido: 1, natural: -0.5, matiz: 0 },
};
const Mapa = {
  calc() {
    const acc = {}; const add = (e, v) => { (acc[e] = acc[e] || []).push(v); };
    const ps = store.get(POSTURA_KEY, {}) || {};
    for (const [id, p] of Object.entries(ps)) { const m = MAPA_DIALOGO[id]; if (m && p.eje in m) add(m.eje, m[p.eje]); }
    const xs = store.get(XP_KEY, {}) || {};
    for (const [id, x] of Object.entries(xs)) for (const el of x.el || []) for (const [rid, pre, e, v] of MAPA_REGLAS) if (rid === id && String(el).startsWith(pre)) add(e, v);
    return MAPA_EJES.map((e) => { const v = acc[e.id]; return { ...e, n: v ? v.length : 0, v: v ? Math.max(-1, Math.min(1, v.reduce((a, b) => a + b, 0) / v.length)) : null }; });
  },
  sages() { const m = {}; for (const e of ERAS) for (const s of e.sages) m[s.id] = s; return m; },
  afinidades(ejes) {
    const sc = {};
    for (const e of ejes) { if (e.v === null || Math.abs(e.v) < 0.35) continue; const [mine, other] = e.v < 0 ? [e.a, e.b] : [e.b, e.a];
      for (const id of mine) sc[id] = (sc[id] || 0) + Math.abs(e.v); for (const id of other) sc[id] = (sc[id] || 0) - Math.abs(e.v); }
    const S = this.sages(); const list = Object.entries(sc).filter(([id]) => S[id]).sort((a, b) => b[1] - a[1]);
    return { con: list.filter(([, v]) => v > 0).slice(0, 3).map(([id]) => S[id]), contra: list.filter(([, v]) => v < 0).slice(-3).reverse().map(([id]) => S[id]) };
  },
  render(box) {
    const ejes = this.calc(); const done = ejes.filter((e) => e.v !== null).length;
    box.innerHTML = '';
    const h = document.createElement('div'); h.className = 'mp-head'; h.innerHTML = `<b>Tu mapa filosófico</b><span>${done} de ${ejes.length} preguntas</span>`; box.appendChild(h);
    for (const e of ejes) {
      const row = document.createElement('div'); row.className = 'mp-row' + (e.v === null ? ' off' : '');
      const q = document.createElement('div'); q.className = 'mp-q'; q.textContent = e.q; row.appendChild(q);
      const bar = document.createElement('div'); bar.className = 'mp-bar';
      const l = document.createElement('span'); l.className = 'mp-l'; l.textContent = e.neg; const r = document.createElement('span'); r.className = 'mp-r'; r.textContent = e.pos;
      const track = document.createElement('div'); track.className = 'mp-track';
      if (e.v !== null) { const dot = document.createElement('i'); dot.style.left = `${6 + ((e.v + 1) / 2) * 88}%`; track.appendChild(dot); }
      bar.append(l, track, r); row.appendChild(bar);
      if (e.v === null) { const hn = document.createElement('div'); hn.className = 'mp-hint'; hn.textContent = 'Aún sin postura · ' + e.hint; row.appendChild(hn); }
      box.appendChild(row);
    }
    const af = this.afinidades(ejes);
    const p = document.createElement('p'); p.className = 'mp-af';
    if (af.con.length) p.textContent = `Piensas parecido a ${af.con.map((s) => s.short).join(', ')}.${af.contra.length ? ` Te desafían ${af.contra.map((s) => s.short).join(', ')}: vale la pena escucharlos.` : ''}`;
    else p.textContent = 'Toma postura en los diálogos de Atenas y en los experimentos jugables para descubrir con qué pensadores coincides.';
    box.appendChild(p);
  },
  text() {
    const ejes = this.calc(); const out = ['— MI MAPA FILOSÓFICO —'];
    for (const e of ejes) out.push(`${e.q} ${e.v === null ? '(sin postura)' : e.v < -0.3 ? e.neg : e.v > 0.3 ? e.pos : 'En un punto intermedio'}`);
    const af = this.afinidades(ejes); if (af.con.length) out.push(`Pienso parecido a: ${af.con.map((s) => s.short).join(', ')}`); if (af.contra.length) out.push(`Me desafían: ${af.contra.map((s) => s.short).join(', ')}`);
    return out.join('\n') + '\n';
  },
};
// aviso discreto cuando una decisión mueve el mapa (una vez por eje y sesión)
const MAPA_AVISO = new Set();
function mapaAviso(eje) { if (!eje || MAPA_AVISO.has(eje)) return; MAPA_AVISO.add(eje); const e = MAPA_EJES.find((x) => x.id === eje); if (e && typeof toast === 'function') setTimeout(() => toast(`🧭 Tu mapa filosófico cambió: «${e.q}». Míralo en el Cuaderno.`), 1200); }
