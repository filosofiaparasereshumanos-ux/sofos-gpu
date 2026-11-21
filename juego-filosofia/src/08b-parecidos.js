// ============================================================================
//  PARECIDOS: rasgos reconocibles de cada pensador (barba, bigote, peinado,
//  lentes, tocado, color de pelo y piel) según sus retratos, fotos, bustos o la
//  iconografía tradicional. Se aplican sobre el aspecto base de cada personaje.
//  Los colores van como texto "#rrggbb". Datos en PARECIDOS (08b-parecidos-datos).
// ============================================================================
{
  const num = (v) => (typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v) ? parseInt(v.slice(1), 16) : v);
  const P = typeof PARECIDOS !== 'undefined' ? PARECIDOS : {};
  for (const e of ERAS) for (const s of e.sages) {
    const f = P[s.id]; if (!f || !s.look) continue;
    for (const [k, v] of Object.entries(f)) if (k !== 'why') s.look[k] = num(v);
  }
}
// para revisar los rostros (solo con #debug)
if (location.hash === '#debug') { window.__fig = buildFigure; window.__THREE = THREE; }
