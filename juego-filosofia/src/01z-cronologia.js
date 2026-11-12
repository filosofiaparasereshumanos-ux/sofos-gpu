// ============================================================================
//  LA LÍNEA DEL TIEMPO: un solo viaje por todas las épocas, en orden cronológico,
//  desde Sumer hasta nuestros días (y al final los dos mundos temáticos que
//  atraviesan todos los tiempos: los poetas y los científicos).
//  Los números romanos de cada época se reasignan según este orden.
// ============================================================================
const CHRONO = ['sumer', 'africa', 'india', 'persia', 'presocraticos', 'china', 'atenas', 'helenismo', 'medieval', 'islam', 'vikingos', 'japon',
  'mexicas', 'incas', 'renacimiento', 'mapuche', 'modernidad', 'xix', 'latinoamerica', 'contemporanea', 'poetas', 'ciencia', 'ateos', 'teistas', 'pensadoras', 'justicia', 'misticos', 'mente', 'tierra', 'numeros', 'belleza', 'pueblos', 'cuidado']
  .map((id) => ERAS.findIndex((e) => e.id === id)).filter((i) => i >= 0);
ERAS.forEach((e, i) => { if (!CHRONO.includes(i)) CHRONO.push(i); });
// el botón principal dice cuántas épocas y pensadores hay (se calcula, para que no quede viejo)
if (typeof document !== 'undefined') { const f = () => { const el = document.getElementById('b-play-s'); if (el) el.textContent = `${ERAS.length} épocas · ${ERAS.reduce((a, e) => a + e.sages.length, 0)} pensadoras y pensadores`; }; if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', f); else f(); }
const ROMANO = (n) => [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']].reduce((acc, [v, s]) => { while (n >= v) { acc += s; n -= v; } return acc; }, '');
CHRONO.forEach((ei, k) => { ERAS[ei].num = ROMANO(k + 1); ERAS[ei].pos = k; });
// lema corto de cada época para la pantalla de elección
const ERA_HOOK = {
  sumer: 'Donde nació la escritura y la primera autora de la historia.',
  africa: 'La sabiduría de Egipto, de los griots y del ubuntu.',
  india: 'El Buda, las Upanishads y la pregunta por el yo.',
  persia: 'Zaratustra, Ciro y el jardín que dio nombre al paraíso.',
  presocraticos: '¿De qué está hecho todo? Nace la filosofía griega.',
  china: 'Confucio, Laozi y el arte de vivir en armonía.',
  atenas: 'Sócrates, Platón y Aristóteles en el ágora.',
  helenismo: 'Estoicos, epicúreos y la Biblioteca de Alejandría.',
  medieval: 'Fe y razón entre catedrales y universidades.',
  islam: 'La Casa de la Sabiduría de Bagdad.',
  vikingos: 'Sagas, runas y una asamblea que hacía la ley.',
  japon: 'El zen, el té y el haiku.',
  mexicas: 'Flor y canto en Tenochtitlan.',
  incas: 'Los Andes, los quipus y el buen gobierno.',
  renacimiento: 'El ser humano en el centro… y el telescopio.',
  mapuche: 'El küme mongen: vivir bien con la tierra.',
  modernidad: 'Pienso, luego existo: la razón se pregunta por sí misma.',
  xix: 'Revoluciones, libertad y la muerte de los viejos dioses.',
  latinoamerica: 'Sor Juana, Martí, Freire: pensar desde nuestra América.',
  contemporanea: 'Existencia, lenguaje y responsabilidad en el siglo XX.',
  poetas: 'Un mundo temático: Safo, Li Bai, Rumi, Mistral y Neruda.',
  ciencia: 'Un mundo temático: de Arquímedes a Einstein.',
  ateos: 'Un mundo temático: quienes explicaron el mundo sin dioses.',
  teistas: 'Un mundo temático: la fe que busca comprender.',
  pensadoras: 'Un mundo temático: las mujeres que pensaron cuando no las dejaban.',
  justicia: 'Un mundo temático: qué es una sociedad justa.',
  misticos: 'Un mundo temático: los sabios de Oriente que miraron hacia adentro.',
  mente: 'Un mundo temático: cómo aprendemos y cómo pensamos.',
  tierra: 'Un mundo temático: quienes enseñaron a cuidar el planeta.',
  numeros: 'Un mundo temático: la belleza de las matemáticas y la lógica.',
  belleza: 'Un mundo temático: el arte y la pregunta por lo bello.',
  pueblos: 'Un mundo temático: las sabidurías de Norteamérica y Oceanía.',
  cuidado: 'Un mundo temático: curar, cuidar y respetar la vida.',
};
function nextEra(i) { const k = CHRONO.indexOf(i); return k >= 0 && k < CHRONO.length - 1 ? CHRONO[k + 1] : -1; }
