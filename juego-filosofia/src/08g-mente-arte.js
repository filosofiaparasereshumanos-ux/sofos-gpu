// ============================================================================
//  ARTE DEL LABERINTO DE LA MENTE: cuadros de los lugares y retratos de los
//  psicólogos (img/lugares-37.jpg y img/retratos-psi.jpg).
// ============================================================================
{
  const ei = ERAS.findIndex((e) => e.id === 'psicologia');
  if (ei >= 0) ['laboratorio-leipzig', 'experimento-asch', 'experimento-milgram', 'caso-gage', 'paciente-hm', 'galeria-ilusiones', 'sala-sesgos', 'manchas-tinta'].forEach((id, k) => { PLACE_ART[id] = [ei, k, 8]; });
  ['wundt', 'pavlov', 'horney', 'skinner', 'maslow', 'ainsworth', 'jung'].forEach((id, k) => { SPRITES['p-' + id] = ['img/retratos-psi.jpg', k, 0, 7, 1]; });
}
