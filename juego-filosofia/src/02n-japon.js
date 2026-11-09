// ============================================================================
//  XX · EL JAPÓN DEL ZEN: lugares, ciudadanos, encargos, anécdotas y libros
// ============================================================================
POIS.push([
  wpoi(0, 'heian', 'El palacio de Heian', 'En Heian-kyō, la antigua Kioto, la corte imperial vivía entre poemas, música y jardines. Las damas de la corte escribían diarios y novelas en kana, la escritura japonesa, mientras los hombres escribían en chino. Así nació una gran literatura escrita por mujeres.',
    'Las damas de la corte llegaban a vestir doce capas de seda de colores, el jūnihitoe, y elegían cada combinación según la estación del año.',
    { q: '¿Quiénes escribieron muchas de las grandes obras de la corte de Heian?', a: ['Las damas de la corte, en escritura japonesa', 'Solo los soldados', 'Los comerciantes extranjeros', 'Nadie: no se escribía'], e: 'Como Murasaki Shikibu y Sei Shōnagon.' }),
  wpoi(1, 'eiheiji', 'El templo de Eiheiji', 'Entre cedros gigantes, en las montañas, Dōgen fundó en 1244 el templo de Eiheiji, «el templo de la paz eterna». Allí los monjes se levantan antes del amanecer para meditar, y cocinar, barrer o comer en silencio también es parte de su práctica.',
    'En Eiheiji, el cocinero del monasterio, el tenzo, es uno de los cargos más respetados: Dōgen escribió un libro entero de instrucciones para él.',
    { q: '¿Qué tareas forman parte de la práctica de los monjes de Eiheiji?', a: ['Meditar, pero también cocinar, barrer y comer con atención', 'Solo dormir', 'Solo leer', 'Hacer negocios'], e: 'Cada tarea sencilla es una ocasión para despertar.' }),
  wpoi(2, 'casadete', 'La casa de té', 'Una casa de té es una cabaña pequeña en un jardín. Se entra por una puerta baja, el nijiriguchi, inclinándose. Dentro hay un rollo con un poema, una sola flor y el hervidor sobre el fuego. Preparar y servir el té con calma es un camino: el chadō.',
    'Antes de entrar, los invitados se lavan las manos y la boca en una pila de piedra, el tsukubai, para dejar fuera el polvo del mundo.',
    { q: '¿Por qué se entra inclinándose en una casa de té?', a: ['Porque la puerta es baja, para que todos sean iguales', 'Para no golpearse con el techo alto', 'Por castigo', 'Para buscar algo en el suelo'], e: 'Nobles y humildes se inclinan por igual.' }),
  wpoi(3, 'oku', 'El camino del norte', 'En 1689, Bashō y su amigo Sora salieron a pie de Edo hacia el norte, por caminos de montaña, arrozales y costas. Durante unos cinco meses visitaron templos, ruinas y lugares cantados por los poetas antiguos, y escribieron haikus por el camino.',
    'En el templo de Risshaku-ji, en lo alto de una montaña, Bashō escribió: qué silencio; penetra en las rocas la voz de las cigarras.',
    { q: '¿Cómo recorrió Bashō el camino del norte?', a: ['A pie, durante meses', 'En tren', 'En avión', 'En carroza imperial'], e: 'Unos dos mil cuatrocientos kilómetros.' }),
  wpoi(4, 'filosofo', 'El camino del filósofo', 'En Kioto hay un sendero junto a un canal, bordeado de cerezos, por donde Kitarō Nishida paseaba cada día pensando. Hoy se llama Tetsugaku no michi, el camino del filósofo, y en primavera las flores caen sobre el agua.',
    'Muchos filósofos han pensado caminando: Aristóteles enseñaba paseando, y Kant salía a pasear cada tarde a la misma hora.',
    { q: '¿Por qué un sendero de Kioto se llama «el camino del filósofo»?', a: ['Porque Nishida paseaba por él cada día pensando', 'Porque allí vivía Platón', 'Porque allí se venden libros', 'Por casualidad'], e: 'Tetsugaku no michi.' }),
]);

NPCS.push([
  wnpc(0, 'caligrafa-heian', 'Sei', 'calígrafa de la corte', sk(0xc84a5a, 0xf0d8a8, 0xf0dcc8, 0x0a0a0a, { hat: 'longhair', acc: 'quill' }), [
    'Escribo poemas con pincel y tinta. Cada trazo se hace una sola vez: no se puede corregir. Por eso la caligrafía enseña a estar presente.',
    'Aquí, en la corte, un poema mal escrito puede arruinar una amistad, y uno bello puede empezar un amor. La forma también dice cosas.',
    'Mi amiga Murasaki escribe una historia larguísima sobre un príncipe. Todas las damas esperamos el siguiente capítulo como quien espera la luna llena.',
  ], true),
  wnpc(1, 'monje-zen', 'Kōun', 'monje cocinero de Eiheiji', sk(0x2a2a2a, 0x4a3a2a, 0xe8c8a0, 0x2a2a2a, { hat: 'bald', acc: 'none' }), [
    'Soy el tenzo, el cocinero del templo. El maestro Dōgen dice que hay que tratar cada grano de arroz como si fuera tus propios ojos.',
    'Cuando lavo el arroz, solo lavo el arroz. Cuando barro, solo barro. Parece fácil, pero la mente siempre quiere irse a otra parte.',
    'Un novicio me preguntó cuándo llegaría la iluminación. Le di una escoba. Lleva tres meses barriendo y ya pregunta menos.',
  ]),
  wnpc(2, 'alfarero', 'Chōjirō', 'alfarero de cuencos de té', sk(0x5a4a3a, 0x8a6a4a, 0xd8b08a, 0x2a2a2a, { acc: 'cup' }), [
    'Hago cuencos de té para el maestro Rikyū, modelados a mano, sin torno. Ninguno sale igual a otro.',
    'Cuando un cuenco se rompe, lo reparamos con laca y polvo de oro. Se llama kintsugi: la grieta no se esconde, se vuelve parte de su belleza.',
    'El señor Hideyoshi prefiere los cuencos dorados. El maestro Rikyū prefiere mis cuencos negros, sencillos y tranquilos. Cada uno ve lo que su corazón busca.',
  ]),
]);

Object.assign(QUESTS, {
  murasaki: { text: 'Visita el palacio de Heian y escucha a Sei, la calígrafa. Luego dime qué sentimos ante la belleza que pasa.', needs: { pois: ['heian'], npcs: ['caligrafa-heian'] },
    riddle: { q: '¿Qué es «mono no aware»?', a: ['La emoción ante la belleza de lo que es pasajero', 'El deseo de riquezas', 'El miedo a los fantasmas', 'La alegría de ganar'] } },
  dogen: { text: 'Visita el templo de Eiheiji y escucha a Kōun, el cocinero. Luego dime qué significa «shikantaza».', needs: { pois: ['eiheiji'], npcs: ['monje-zen'] },
    riddle: { q: '¿Qué significa «shikantaza»?', a: ['Solo sentarse, en meditación atenta', 'Cocinar deprisa', 'Hablar sin parar', 'Correr por la montaña'] } },
  rikyu: { text: 'Visita la casa de té y escucha a Chōjirō, el alfarero. Luego dime qué significa «ichigo ichie».', needs: { pois: ['casadete'], npcs: ['alfarero'] },
    riddle: { q: '¿Qué significa «ichigo ichie»?', a: ['Una vez, un encuentro: cada momento es único', 'Un té para cada uno', 'Una victoria, una derrota', 'Uno más uno'] } },
  basho: { text: 'Recorre el camino del norte y escucha a Kōun, que solo barre cuando barre. Luego dime cuántos versos tiene un haiku.', needs: { pois: ['oku'], npcs: ['monje-zen'] },
    riddle: { q: '¿Cuántos versos tiene un haiku?', a: ['Tres', 'Catorce', 'Uno', 'Cien'] } },
});

Object.assign(ANECDOTES, {
  murasaki: ['En la corte, la dama Sei Shōnagon escribía también un libro famoso, El libro de la almohada. En mi diario la critiqué un poco: decía que presumía demasiado de saber chino. Las escritoras también tenían rivalidades.', 'Para que no me creyeran pedante, en la corte fingía no saber leer ni los caracteres chinos más sencillos. Pero en secreto enseñaba poesía china a la emperatriz.'],
  dogen: ['Antes de viajar a China me preguntaba: si todos ya tenemos la naturaleza de Buda, ¿para qué meditar? Ningún maestro de Japón supo responderme. Por eso crucé el mar.', 'Volví de China sin reliquias, sin libros y sin estatuas. Dije que solo traía las manos vacías, y que había aprendido que los ojos son horizontales y la nariz vertical.'],
  rikyu: ['Pedí a mi hijo que barriera el jardín. Lo dejó perfecto, sin una sola hoja. Entonces sacudí un arce y dejé caer algunas hojas sobre el camino: así estaba completo.', 'Un invitado trajo un cuenco carísimo y presumía de él. Lo serví con normalidad. Después, otro trajo un cuenco roto y reparado, y lo traté como un tesoro: lo que importa es la historia y el cuidado.'],
  basho: ['Mi cabaña de Edo se quemó en un incendio. Me salvé metiéndome en el río, con una estera mojada sobre la cabeza. Desde entonces sentí que mi casa verdadera era el camino.', 'Tuve muchos discípulos, pero les decía que no copiaran mis poemas. Les pedía que aprendieran del pino mirando el pino, y del bambú mirando el bambú.'],
  nishida: ['Suspendí el examen de ingreso a la universidad por enfermedad y tuve que estudiar como alumno de segunda categoría. Me sentí humillado, pero seguí leyendo filosofía cada noche.', 'Escribía en mi diario las horas que había meditado cada día. A veces anotaba solo: hoy, nada. También eso era parte del camino.'],
});

BOOKS.push([
  { id: 'genji', author: 'murasaki', by: 'Murasaki Shikibu', title: 'La historia de Genji', year: 'c. 1008', kind: 'novela', at: B2[0],
    parts: [
      { t: 'Una novela de mil años', x: 'La historia de Genji fue escrita hacia el año 1000 por Murasaki Shikibu, dama de la corte de Kioto. Tiene cincuenta y cuatro capítulos y más de cuatrocientos personajes. Muchos la consideran una de las primeras novelas del mundo.' },
      { t: 'El príncipe resplandeciente', x: 'Cuenta la vida de Genji, hijo de un emperador, tan bello y talentoso que lo llaman el resplandeciente. Vive amores, alegrías, exilios y regresos, siempre rodeado de poesía, música y jardines.' },
      { t: 'Todo pasa', x: 'Con los años, las personas que Genji ama envejecen o mueren, y él mismo va perdiendo su brillo. La novela no esconde la tristeza: muestra que la belleza y el tiempo van siempre juntos.' },
      { t: 'Mono no aware', x: 'Siglos después, el estudioso Motoori Norinaga dijo que el corazón de la obra es el mono no aware: la capacidad de conmoverse ante las cosas. Leer a Genji es aprender a sentir con delicadeza.' },
    ],
    quote: 'Las flores del cerezo son más hermosas porque sabemos que caerán.',
    q: { q: '¿Qué gran sentimiento recorre La historia de Genji?', a: ['El mono no aware: la emoción ante lo pasajero', 'La sed de venganza', 'El amor al dinero', 'El miedo a los dragones'], e: 'La belleza y el tiempo van juntos.' } },
  { id: 'sendas-oku', author: 'basho', by: 'Matsuo Bashō', title: 'Sendas de Oku', year: '1694', kind: 'diario de viaje', at: B2[1],
    parts: [
      { t: 'Los días son viajeros', x: 'Sendas de Oku empieza así: los días y los meses son viajeros de la eternidad, y también lo son los años que van y vienen. Bashō vende su cabaña y sale a caminar hacia el norte de Japón.' },
      { t: 'Prosa y poemas', x: 'El libro mezcla relatos breves del viaje con haikus. Bashō cuenta los templos, las montañas, la lluvia, los encuentros con gente sencilla, y en el momento justo lo condensa todo en tres versos.' },
      { t: 'El silencio y las cigarras', x: 'En un templo de montaña escribe: qué silencio; penetra en las rocas la voz de las cigarras. El ruido de las cigarras hace sentir todavía más el silencio: los contrarios se necesitan.' },
      { t: 'El camino es la casa', x: 'Bashō no viaja para llegar a un sitio, sino para ver de verdad. Su libro enseña que la vida misma es un viaje, y que el que camina con atención ya está en casa.' },
    ],
    quote: 'Los días y los meses son viajeros de la eternidad, y también lo son los años que van y vienen.',
    q: { q: '¿Qué mezcla el libro Sendas de Oku?', a: ['Relatos de viaje en prosa y haikus', 'Recetas y mapas', 'Leyes y castigos', 'Fórmulas matemáticas'], e: 'Un diario de viaje con poemas.' } },
]);
BOOKS[BOOKS.length - 1].forEach((b) => { b.q.book = b.title; });
