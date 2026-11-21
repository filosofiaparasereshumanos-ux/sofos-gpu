// ============================================================================
//  TORNEO CON AMIGOS DESDE LA PORTADA: con un toque se activa «Jugar en línea»,
//  se entra al ágora de la primera época y se abre la mesa de trivia con
//  preguntas de cultura general de todos los mundos (pensadores, lugares y obras
//  del museo). Los amigos llegan con el enlace de WhatsApp directo a su asiento.
// ============================================================================
const TorneoPortada = {
  T: { card: 'Torneo con amigos', cardS: 'Trivia de cultura general de todos los mundos · invita por WhatsApp', need: 'Para el torneo hace falta conexión a internet (abre el juego desde la web).', wait: 'Preparando tu mesa del torneo…', fail: 'No se pudo conectar al modo en línea. Inténtalo de nuevo en un momento.', allOn: 'Preguntas de cultura general de todos los mundos' },
  go() {
    Audio.init && Audio.init(); Audio.click && Audio.click();
    if (typeof Sala === 'undefined' || !Sala.ok()) return toast(this.T.need);
    if (G.settings.mundo !== true) { G.settings.mundo = true; saveSettings(); try { syncSettings(); } catch (e) { /* nada */ } }
    Juntos.asked = true; Juntos.welcomed = true; Trivia.allDefault = true; toast(this.T.wait);
    const idx = G.state === 'title' || G.eraIdx == null ? 0 : G.eraIdx;
    if (G.state !== 'play') { G.travelFrom = 'title'; G.explore = false; travelTo(idx); }
    const t0 = performance.now(); clearInterval(this.iv);
    this.iv = setInterval(() => {
      if (Trivia.canOpen()) { clearInterval(this.iv); Trivia.setup(); return; }
      if (G.state === 'play' && performance.now() - t0 > 25000) { clearInterval(this.iv); toast(this.T.fail); }
    }, 500);
  },
  card() {
    if (document.getElementById('tp-tcard')) return; const anchor = document.getElementById('bj-tcard') || document.getElementById('mu-tcard') || document.getElementById('lib-card'); if (!anchor) return;
    const c = document.createElement('button'); c.id = 'tp-tcard'; c.innerHTML = '<b>🏆</b><span><strong></strong><small></small></span>';
    c.querySelector('strong').textContent = this.T.card; c.querySelector('small').textContent = this.T.cardS;
    anchor.after(c); c.addEventListener('click', () => this.go());
  },
};
// la mesa: «todas las épocas» marcado de inicio cuando se abre desde la portada, y más preguntas en el modo de todas
{
  const s0 = Trivia.setup.bind(Trivia);
  Trivia.setup = function () {
    s0(); if (!this.allDefault || !this.T || !this.T.setup) return; this.allDefault = false;
    const cb = document.querySelector('#mpd-a .tri-all input'); if (cb && !cb.checked) { cb.checked = true; cb.dispatchEvent(new Event('change')); }
    const sp = document.querySelector('#mpd-a .tri-all span'); if (sp) sp.textContent = TorneoPortada.T.allOn;
  };
  const q0 = Trivia.questions.bind(Trivia);
  Trivia.questions = function (seed, n, all) {
    if (!all) return q0(seed, n, all);
    const P = [];
    for (const e of ERAS) for (const s of e.sages) for (const q of s.q || []) if (q && q.a && q.a.length === 4) P.push({ q: q.q, a: q.a, e: q.e || '', who: s.short });
    for (const L of POIS) for (const p of L || []) if (p.q && p.q.a && p.q.a.length === 4) P.push({ q: p.q.q, a: p.q.a, e: p.q.e || '', who: p.name });
    if (typeof OBRAS !== 'undefined') for (const o of OBRAS) if (o.q && o.q.a && o.q.a.length === 4) P.push({ q: o.q.q, a: o.q.a, e: '', who: o.titulo });
    const r = mulberry32(seed); const idx = P.map((_, i) => i); for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
    return idx.slice(0, n).map((i) => { const q = P[i]; const o = q.a.map((t, k) => ({ t, ok: k === 0 })); for (let k = 3; k > 0; k--) { const j = Math.floor(r() * (k + 1)); [o[k], o[j]] = [o[j], o[k]]; } return { ...q, o }; });
  };
}
setTimeout(() => TorneoPortada.card(), 100);
{
  const st = document.createElement('style'); st.textContent = '#tp-tcard{display:flex;align-items:center;gap:10px;width:min(440px,92vw);margin:8px auto 0;padding:9px 14px;border-radius:12px;border:1px solid var(--gold,#d8b25a);background:linear-gradient(150deg,rgba(110,74,16,.85),rgba(40,26,8,.9));color:#fff4dc;font-family:var(--body,Georgia);text-align:left;cursor:pointer;box-shadow:0 0 18px rgba(255,211,106,.25)}#tp-tcard b{font-size:1.5rem}#tp-tcard span{display:flex;flex-direction:column}#tp-tcard small{color:#e8d8b0}';
  document.head.appendChild(st);
}
if (location.hash === '#debug') { window.__tp = TorneoPortada; window.__tpS = () => [G.state, Juntos.on, MRT.joined, !!Trivia.T, Sala.ok()]; window.__trv = Trivia; }
