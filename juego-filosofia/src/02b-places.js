// ============================================================================
//  LUGARES PARA DESCUBRIR: historia, arte y ciencia de cada época
//  at: posición [x, z] en la plaza de la época
// ============================================================================
const POIS = [
  [ // I · Jonia
    { id: 'mileto', at: [-19, 26], name: 'El puerto de Mileto', text: 'Mileto era una rica ciudad comercial de Jonia, en la costa de la actual Turquía, con varios puertos abiertos al Mediterráneo. Sus barcos llegaban a Egipto y a Mesopotamia, y con las mercancías viajaban también saberes de astronomía y geometría.', fact: 'Mileto fundó decenas de colonias alrededor del mar Negro. Allí nació la primera escuela de filosofía: Tales, Anaximandro y Anaxímenes.' },
    { id: 'dorico', at: [5, 22], name: 'El orden dórico', text: 'Estas columnas siguen el orden dórico, el más antiguo y sobrio de la arquitectura griega: sin basa, con el fuste estriado y un capitel sencillo formado por un cojín y una losa cuadrada.', fact: 'Los griegos engrosaban ligeramente el centro de las columnas, la éntasis, para corregir la ilusión óptica de que se ven más delgadas en medio.' },
    { id: 'mitos', at: [16, -24], name: 'Antes de la filosofía: los mitos', text: 'Antes de Tales, los griegos explicaban el mundo con relatos sobre dioses. La Teogonía de Hesíodo contaba cómo del Caos nacieron la Tierra, el Cielo y los dioses, y los poemas de Homero narraban la guerra de Troya.', fact: 'La palabra «mito» significa relato y «logos», razón o palabra razonada. El paso del uno al otro fue gradual: los primeros filósofos aún hablaban de dioses.' },
    { id: 'didima', at: [-6, -40], name: 'El templo de Apolo en Dídima', text: 'Cerca de Mileto estaba el santuario de Apolo en Dídima, uno de los grandes oráculos del mundo griego. Los peregrinos consultaban al dios sobre viajes, guerras y fundaciones de ciudades.', fact: 'El templo de Dídima nunca se terminó: su construcción duró siglos y algunas de sus columnas aún siguen en pie.' },
  ],
  [ // II · Atenas
    { id: 'partenon', at: [6, -40], name: 'El Partenón', text: 'Templo de Atenea Pártenos, protectora de la ciudad, construido en la Acrópolis entre el 447 y el 432 a.C. por orden de Pericles. El escultor Fidias dirigió su decoración y creó una gran estatua de la diosa en oro y marfil.', fact: 'En el Partenón casi no hay líneas rectas: el suelo se curva hacia arriba y las columnas se inclinan un poco hacia dentro para parecer perfectas a la vista.' },
    { id: 'agora', at: [3, 21], name: 'El ágora', text: 'El ágora era el corazón de Atenas: mercado, lugar de reunión, tribunales y edificios de gobierno. Aquí Sócrates conversaba con cualquiera que quisiera pensar con él.', fact: 'Los arqueólogos encontraron en el ágora los restos de una cárcel pública que podría ser aquella en la que Sócrates bebió la cicuta.' },
    { id: 'stoa', at: [-17, 5.5], name: 'Las estoas', text: 'Las estoas eran largos pórticos con columnas donde la gente se protegía del sol, comerciaba y discutía. La Stoa Poikile, el pórtico pintado, estaba decorada con grandes cuadros de batallas.', fact: 'Zenón de Citio enseñaba bajo la Stoa Poikile, y por eso a sus seguidores se les llamó estoicos: los del pórtico.' },
    { id: 'democracia', at: [9.5, -9], name: 'La democracia ateniense', text: 'Desde las reformas de Clístenes, hacia el 508 a.C., los ciudadanos varones decidían en la asamblea, que se reunía en la colina de la Pnyx. Muchos cargos se repartían por sorteo para que cualquiera pudiera gobernar.', fact: 'Con el ostracismo, los atenienses podían desterrar durante diez años a un político escribiendo su nombre en trozos de cerámica llamados óstraka. Mujeres, esclavos y extranjeros no votaban.' },
  ],
  [ // III · Helenismo y Roma
    { id: 'alejandro', at: [9, -16], name: 'El imperio de Alejandro', text: 'Alejandro Magno, alumno de Aristóteles, conquistó en solo once años un imperio desde Grecia hasta Egipto y la India. Tras su muerte, en el 323 a.C., la cultura griega se extendió por todo ese territorio: es la época helenística.', fact: 'Alejandro fundó más de una docena de ciudades con su nombre. La más famosa, Alejandría de Egipto, se convirtió en la capital del saber.' },
    { id: 'alejandria', at: [-18, -2], name: 'La Biblioteca de Alejandría', text: 'Los reyes Ptolomeos reunieron en Alejandría la mayor biblioteca de la Antigüedad, junto al Museo, un centro de investigación. Allí trabajaron Euclides, que escribió los Elementos de geometría, y Eratóstenes.', fact: 'Eratóstenes calculó la circunferencia de la Tierra midiendo las sombras de dos ciudades el mismo día. Su resultado se acercó mucho al valor real.' },
    { id: 'jardin', at: [17, 22], name: 'El Jardín y las escuelas helenísticas', text: 'En la época helenística surgieron escuelas que enseñaban un arte de vivir: el Jardín de Epicuro, la Stoa de Zenón, los cínicos y los escépticos. Todas buscaban la tranquilidad del alma en un mundo cambiante.', fact: 'En la entrada del Jardín de Epicuro, según se cuenta, una inscripción invitaba al visitante a quedarse, porque allí el bien supremo era el placer.' },
    { id: 'arco', at: [6, -40], name: 'El arco de triunfo romano', text: 'Roma heredó la filosofía griega y la llevó por todo su imperio. Los romanos dominaron el arco y el hormigón, y levantaban arcos de triunfo para celebrar las victorias de sus generales.', fact: 'El hormigón romano, mezclado con ceniza volcánica, era tan resistente que el Panteón de Roma conserva su cúpula sin armadura desde hace casi dos mil años.' },
  ],
  [ // IV · Edad Media
    { id: 'roseton', at: [6, -38], name: 'El rosetón y las vidrieras', text: 'Las catedrales góticas se llenaron de vidrieras de colores que contaban historias a quienes no sabían leer. Para los teólogos medievales, la luz era un símbolo de Dios y de la verdad.', fact: 'El abad Suger, en la iglesia de Saint-Denis, cerca de París, impulsó hacia 1140 este nuevo estilo lleno de luz que luego se llamó gótico.' },
    { id: 'gotico', at: [4, -4], name: 'La catedral gótica', text: 'El arco apuntado y la bóveda de crucería permitieron construir naves muy altas. Por fuera, los arbotantes sostienen el peso y así los muros pueden abrirse en grandes ventanales.', fact: 'Construir una catedral podía llevar más de un siglo: muchos de los que empezaban la obra nunca la vieron terminada.' },
    { id: 'universidad', at: [15, 30], name: 'Las primeras universidades', text: 'A partir del siglo once nacieron las universidades de Bolonia, París y Oxford. Se enseñaba con el método escolástico: la lectura de un texto, la cuestión y la disputa, en la que se defendían argumentos a favor y en contra.', fact: 'Las clases y los exámenes eran en latín, la lengua común de los sabios de toda Europa.' },
    { id: 'toledo', at: [-15, 30], name: 'Toledo, Córdoba y las traducciones', text: 'En al-Ándalus florecieron la filosofía y la ciencia en árabe. En el siglo doce, en Toledo, equipos de traductores cristianos, judíos y musulmanes pasaron al latín obras de Aristóteles, Averroes y Avicena.', fact: 'Gracias a esas traducciones llegaron a Europa los números arábigos y el cero, que venían de la India.' },
  ],
  [ // V · Renacimiento
    { id: 'cupula', at: [6, -40], name: 'La cúpula de Brunelleschi', text: 'Entre 1420 y 1436, Filippo Brunelleschi levantó la cúpula de la catedral de Florencia, la más grande de su época. Nadie sabía cómo cubrir un espacio tan enorme.', fact: 'La construyó sin una estructura de madera que la sostuviera: usó dos cáscaras y ladrillos colocados en espiga, que se sujetaban unos a otros.' },
    { id: 'perspectiva', at: [4.5, 14], name: 'La perspectiva', text: 'Los artistas del Renacimiento aprendieron a representar el espacio con la perspectiva lineal: las líneas paralelas convergen en un punto de fuga. Brunelleschi la demostró y Alberti la explicó por escrito.', fact: 'Leonardo da Vinci fue pintor, ingeniero y anatomista: llenó miles de páginas de cuadernos escritos al revés, en espejo.' },
    { id: 'ospedale', at: [17, -6], name: 'La loggia renacentista', text: 'Estas arcadas recuerdan al Hospital de los Inocentes de Florencia, uno de los primeros edificios renacentistas, de Brunelleschi. Recupera las columnas y los arcos de medio punto de la Antigüedad.', fact: 'Los medallones azules de la fachada original, obra de Andrea della Robbia, muestran bebés envueltos en pañales: era un hospital para niños abandonados.' },
    { id: 'imprenta', at: [-15, -24], name: 'La imprenta', text: 'Hacia 1450, Johannes Gutenberg inventó en Maguncia la imprenta de tipos móviles. Los libros se abarataron y las ideas de los humanistas, de los reformadores y de los científicos se difundieron por toda Europa.', fact: 'En pocas décadas se imprimieron millones de libros; antes, copiar un solo libro a mano podía llevar meses.' },
    { id: 'copernico', at: [15, 26], name: 'La revolución científica', text: 'En 1543, Copérnico propuso que la Tierra gira alrededor del Sol. A principios del siglo diecisiete, Galileo apuntó un telescopio al cielo y vio las lunas de Júpiter y las montañas de la Luna.', fact: 'Galileo fue juzgado por la Inquisición en 1633 por defender el heliocentrismo y pasó sus últimos años bajo arresto domiciliario.' },
  ],
  [ // VI · Modernidad
    { id: 'newton', at: [3.5, 12.5], name: 'El planetario de Newton', text: 'En 1687, Isaac Newton publicó los Principia: una misma ley de gravitación explica la caída de una manzana y el movimiento de los planetas. El universo empezó a pensarse como un gran mecanismo de relojería.', fact: 'Estos planetarios mecánicos, llamados orreries, se pusieron de moda en el siglo dieciocho para mostrar el sistema solar en los salones.' },
    { id: 'enciclopedia', at: [-18, 8], name: 'La Enciclopedia', text: 'Entre 1751 y 1772, Diderot y d’Alembert publicaron la Enciclopedia, que quería reunir todo el saber humano, las ciencias y los oficios, con la razón como guía. Fue símbolo de la Ilustración.', fact: 'La Enciclopedia fue prohibida varias veces por la censura, y aun así se terminó: sus diecisiete volúmenes de texto se acompañaron de once de láminas.' },
    { id: 'telescopio', at: [6, -38], name: 'El telescopio', text: 'Durante los siglos diecisiete y dieciocho los telescopios crecieron y mejoraron. William Herschel descubrió Urano en 1781 y el universo resultó mucho más grande de lo imaginado.', fact: 'Spinoza se ganaba la vida puliendo lentes, las mismas que se usaban en telescopios y microscopios.' },
    { id: 'derechos', at: [14, 28], name: 'Los derechos del hombre', text: 'Las ideas de Locke, Montesquieu y Rousseau inspiraron la independencia de Estados Unidos en 1776 y la Revolución francesa en 1789, con su Declaración de los Derechos del Hombre y del Ciudadano.', fact: 'Olympe de Gouges respondió en 1791 con una Declaración de los Derechos de la Mujer y la Ciudadana, reclamando la igualdad que la primera olvidaba.' },
  ],
];

function buildPois(W) {
  W.pois = [];
  const col = W.theme.accent;
  for (const p of POIS[W.idx] || []) {
    const g = new THREE.Group(); g.position.set(p.at[0], 0, p.at[1]);
    const ring = mesh(new THREE.RingGeometry(0.85, 1.05, 40), glow(0xffd36a, 2.2, { transparent: true, opacity: 0.85, side: THREE.DoubleSide }), 0, 0.04, 0, false, false); ring.rotation.x = -Math.PI / 2; g.add(ring);
    const gem = mesh(new THREE.OctahedronGeometry(0.32, 0), glow(0xffd36a, 3.5), 0, 2.1, 0, false, false); g.add(gem);
    const cage = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.5, 0)), new THREE.LineBasicMaterial({ color: new THREE.Color(col).multiplyScalar(2.2), toneMapped: false })); cage.position.y = 2.1; g.add(cage);
    const beam = mesh(new THREE.CylinderGeometry(0.05, 0.2, 2, 8, 1, true), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffd36a).multiplyScalar(1.4), transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }), 0, 1, 0, false, false); g.add(beam);
    const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture(p.name, 'Lugar para descubrir'), transparent: true, depthWrite: false, toneMapped: false }));
    label.scale.set(2.3, 0.58, 1); label.position.y = 3.1; g.add(label);
    W.group.add(g);
    const poi = { ...p, group: g, gem, cage, ring, label, found: false };
    W.pois.push(poi);
    W.anim.push((t) => { gem.rotation.y = t * 1.4; cage.rotation.y = -t * 0.8; gem.position.y = cage.position.y = 2.1 + Math.sin(t * 2 + p.at[0]) * 0.12; });
  }
}
function markPoiFound(poi) {
  poi.found = true;
  poi.gem.material = glow(0x9ab0c0, 1.4); poi.ring.material = glow(0x9ab0c0, 1.2, { transparent: true, opacity: 0.5, side: THREE.DoubleSide });
  poi.label.material.map = labelTexture(poi.name, '✓ Descubierto', '#cfd8e0'); poi.label.material.needsUpdate = true;
}

// ---------- atriles con libros para estudiar
function buildBooks(W) {
  W.books = [];
  const wood = std(0x5a3a22, { roughness: 0.7 }); const dark = std(0x3a2414, { roughness: 0.8 });
  const page = new THREE.MeshStandardMaterial({ color: 0xf4ead0, roughness: 0.9, emissive: 0xffe8b0, emissiveIntensity: 0.25 });
  const studied = new Set(store.get(BOOK_KEY, []));
  for (const b of BOOKS[W.idx] || []) {
    const g = new THREE.Group(); g.position.set(b.at[0], 0, b.at[1]);
    g.rotation.y = b.at[0] < 0 ? Math.PI / 2 : -Math.PI / 2; // el atril mira hacia la vía central
    g.add(mesh(new THREE.CylinderGeometry(0.42, 0.55, 0.12, 16), dark, 0, 0.06, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.07, 0.1, 1.05, 10), wood, 0, 0.6, 0));
    const top = new THREE.Group(); top.position.set(0, 1.18, 0); top.rotation.x = 0.6; top.scale.setScalar(1.3); g.add(top);
    top.add(mesh(new THREE.BoxGeometry(0.95, 0.05, 0.65), wood, 0, 0, 0));
    top.add(mesh(new THREE.BoxGeometry(0.9, 0.02, 0.06), dark, 0, 0.03, -0.32));
    // libro abierto: dos páginas curvadas y lomo
    for (const sx of [-1, 1]) { const pg = mesh(new THREE.BoxGeometry(0.4, 0.025, 0.52), page, sx * 0.21, 0.05, 0, false); pg.rotation.z = sx * -0.08; top.add(pg); }
    top.add(mesh(new THREE.BoxGeometry(0.88, 0.03, 0.56), std(0x6a1f1f, { roughness: 0.6 }), 0, 0.03, 0, false));
    // líneas de texto
    for (const sx of [-1, 1]) for (let k = 0; k < 6; k++) top.add(mesh(new THREE.BoxGeometry(0.3, 0.004, 0.012), std(0x3a2a1a), sx * 0.21, 0.066, -0.18 + k * 0.07, false, false));
    // brillo y halo de luz
    const glowRing = mesh(new THREE.RingGeometry(0.75, 0.9, 36), glow(0x9fd8ff, 2, { transparent: true, opacity: 0.7, side: THREE.DoubleSide }), 0, 0.03, 0, false, false); glowRing.rotation.x = -Math.PI / 2; g.add(glowRing);
    const motes = mesh(new THREE.OctahedronGeometry(0.09, 0), glow(0xcfeaff, 3), 0, 1.75, 0, false, false); g.add(motes);
    const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture(b.title, b.by + ' · Libro para estudiar', '#cfeaff'), transparent: true, depthWrite: false, toneMapped: false }));
    label.scale.set(2.5, 0.62, 1); label.position.y = 2.45; g.add(label);
    W.group.add(g); W.colliders.push({ t: 1, x: b.at[0], z: b.at[1], r: 0.55, h: 1.4 });
    const wb = { ...b, group: g, ring: glowRing, label, motes, read: false };
    W.books.push(wb); if (studied.has(b.id)) markBookRead(wb);
    W.anim.push((t) => { motes.position.y = 1.75 + Math.sin(t * 2 + b.at[1]) * 0.12; motes.rotation.y = t * 1.5; glowRing.material.opacity = 0.45 + Math.sin(t * 2.5 + b.at[0]) * 0.2; });
  }
}
function markBookRead(wb) {
  wb.read = true; wb.ring.material = glow(0xffd36a, 1.6, { transparent: true, opacity: 0.6, side: THREE.DoubleSide });
  wb.label.material.map = labelTexture(wb.title, '✓ Estudiado · ' + wb.by, '#ffd98a'); wb.label.material.needsUpdate = true;
}
