// ============================================================================
//  XVI · SUMER Y MESOPOTAMIA: lugares, ciudadanos, encargos, anécdotas y libros
// ============================================================================
POIS.push([
  wpoi(0, 'zigurat', 'El zigurat de Ur', 'En el centro de Ur se levanta el gran zigurat, una montaña artificial de ladrillos de barro con terrazas escalonadas y una escalera monumental. En lo alto estaba el templo del dios Luna, Nanna. Los sumerios creían que los zigurats unían el cielo y la tierra. Enheduanna fue la suma sacerdotisa de este templo.',
    'Se construyó hacia el 2100 a.C. con millones de ladrillos, unidos con betún, el asfalto natural que brotaba del suelo.',
    { q: '¿A qué dios estaba dedicado el zigurat de Ur?', a: ['A Nanna, el dios Luna', 'A Zeus', 'A Ra, el Sol', 'A Inti'], e: 'Enheduanna fue su suma sacerdotisa.' }),
  wpoi(1, 'edubba', 'La casa de las tablillas', 'Los sumerios llamaban a la escuela edubba, la casa de las tablillas. Allí los niños, y alguna niña, aprendían durante años a escribir con una caña sobre barro húmedo, copiando listas de palabras, problemas de matemáticas, proverbios y los himnos de Enheduanna.',
    'Se conservan tablillas de alumnos con errores corregidos por el maestro, y hasta quejas de estudiantes castigados por llegar tarde.',
    { q: '¿Qué era la edubba sumeria?', a: ['La escuela, la casa de las tablillas', 'El palacio del rey', 'Un mercado', 'Un barco'], e: 'Allí se formaban los escribas.' }),
  wpoi(2, 'liraur', 'Las tumbas reales de Ur', 'En las tumbas reales de Ur, los arqueólogos encontraron tesoros asombrosos: la lira de Ur, con una cabeza de toro de oro y lapislázuli, y el Estandarte de Ur, que muestra en un lado la guerra y en el otro un banquete con música. Los sumerios cantaban, bebían cerveza y celebraban.',
    'El lapislázuli azul venía de las montañas de Afganistán, a más de dos mil kilómetros: el comercio ya unía pueblos muy lejanos.',
    { q: '¿Qué instrumento musical famoso se encontró en las tumbas de Ur?', a: ['Una lira con cabeza de toro', 'Un piano', 'Una guitarra eléctrica', 'Un órgano'], e: 'Decorada con oro y lapislázuli.' }),
  wpoi(3, 'murallas', 'Las murallas de Uruk', 'Uruk fue una de las primeras grandes ciudades del mundo, con decenas de miles de habitantes. La epopeya dice que Gilgamesh construyó sus murallas, de más de nueve kilómetros. Al final del poema, Gilgamesh, que había fracasado en su búsqueda de la inmortalidad, las contempla con orgullo.',
    'En Uruk aparecieron hacia el 3300 a.C. las primeras tablillas escritas de la historia, sobre todo cuentas de cebada y de ovejas.',
    { q: '¿Qué apareció en Uruk hacia el 3300 a.C.?', a: ['Las primeras tablillas escritas de la historia', 'La primera pirámide', 'El primer barco de vapor', 'La primera moneda de oro'], e: 'La escritura nació para llevar cuentas.' }),
  wpoi(4, 'estela', 'La estela de Hammurabi', 'En Babilonia, el rey Hammurabi mandó levantar una estela de piedra negra con casi trescientas leyes grabadas en escritura cuneiforme. Arriba, el dios Shamash entrega las leyes al rey. Cualquiera que supiera leer, o pidiera a un escriba que se la leyera, podía conocer la ley.',
    'La estela original fue llevada como botín a la ciudad de Susa, donde la encontraron arqueólogos franceses en 1901. Hoy está en el Louvre.',
    { q: '¿Qué dios aparece en lo alto de la estela de Hammurabi?', a: ['Shamash, dios del Sol y de la justicia', 'Poseidón', 'Osiris', 'Quetzalcóatl'], e: 'El Sol lo ve todo.' }),
]);

NPCS.push([
  wnpc(0, 'escriba-dudu', 'Dudu', 'escriba de Ur', sk(0xe8dcc4, 0x5a6a8a, 0xb8875f, 0x1a1410, { hat: 'bald', acc: 'scroll' }), [
    'Soy escriba. Escribo apretando una caña en forma de cuña sobre el barro húmedo. Por eso los sabios de tu tiempo llaman a nuestra escritura cuneiforme.',
    'Pasé doce años en la casa de las tablillas copiando listas, proverbios y los himnos de nuestra sacerdotisa Enheduanna. El maestro me pegaba con una vara si me equivocaba.',
    'Al principio, la escritura servía para contar ovejas y sacos de cebada. Luego aprendimos a escribir nombres, leyes, cartas, poemas. Con el barro guardamos la memoria del mundo.',
  ]),
  wnpc(1, 'tabernera', 'Kubaba', 'tabernera de Kish', sk(0xf0d8b0, 0xa8402a, 0xb8875f, 0x2a1a10, { hat: 'longhair', acc: 'cup' }), [
    'Sirvo cerveza de cebada, que se bebe con pajitas largas para no tragar el grano. Los sumerios tenemos hasta una diosa de la cerveza, Ninkasi, y un himno con su receta.',
    'Cuentan que una tabernera como yo, llamada Kubaba, llegó a ser reina de la ciudad de Kish. ¡La lista de reyes sumerios la recuerda!',
    'En el poema de Gilgamesh, la tabernera Siduri le dice al rey que deje de buscar la vida eterna y disfrute de la vida que tiene. Las taberneras sabemos escuchar.',
  ], true),
  wnpc(2, 'campesino-abum', 'Abum', 'campesino de los canales', sk(0xc8b890, 0x6a8a4a, 0xa8754f, 0x1a1410, { beard: 0x1a1410, acc: 'staff' }), [
    'Aquí casi no llueve. Sin los canales que traen el agua del Éufrates, esta tierra sería desierto. Por eso cuidarlos es tarea de todos.',
    'Las leyes del rey Hammurabi dicen que si alguien descuida su dique y el agua inunda el campo del vecino, debe pagar la cebada perdida. La ley también protege el agua.',
    'Plantamos cebada, trigo y palmeras datileras. Con la cebada pagamos los salarios: aquí la cebada es como el dinero.',
  ]),
]);

Object.assign(QUESTS, {
  enheduanna: { text: 'Sube al zigurat de Ur y escucha a Dudu, el escriba, que copió mis himnos en la escuela. Luego dime qué hice yo que nadie había hecho antes.', needs: { pois: ['zigurat'], npcs: ['escriba-dudu'] },
    riddle: { q: '¿Qué hizo Enheduanna que nadie había hecho antes?', a: ['Firmar sus textos con su propio nombre', 'Inventar la rueda', 'Fundar una ciudad', 'Escribir en papel'] } },
  shuruppak: { text: 'Visita la casa de las tablillas y escucha a Kubaba, la tabernera, que sabe mucho de la vida. Luego dime qué te aconsejo sobre la palabra.', needs: { pois: ['edubba'], npcs: ['tabernera'] },
    riddle: { q: '¿Qué aconseja Shuruppak sobre la palabra?', a: ['Cuidarla: no mentir ni hablar con arrogancia', 'Hablar mucho y rápido', 'No decir nunca nada', 'Decir lo que convenga a cada uno'] } },
  hammurabi: { text: 'Lee la estela con mis leyes y escucha a Abum, el campesino, que sabe cómo protegen el agua. Luego dime para qué escribí mi código.', needs: { pois: ['estela'], npcs: ['campesino-abum'] },
    riddle: { q: '¿Para qué dice Hammurabi que escribió sus leyes?', a: ['Para que el fuerte no oprima al débil', 'Para cobrar más impuestos', 'Para que nadie las leyera', 'Para castigar solo a los pobres'] } },
});

Object.assign(ANECDOTES, {
  enheduanna: ['Se conserva un disco de piedra blanca, hallado en Ur, en el que aparezco yo misma con una túnica de volantes, presidiendo una ofrenda. Es de los pocos retratos que tenemos de una autora tan antigua.', 'En mi himno a Inanna escribí que la diosa me había devuelto la voz. Los escribas lo copiaron tantas veces durante quinientos años que hoy conocemos el texto gracias a más de cien tablillas.'],
  shuruppak: ['Uno de mis consejos dice: no compres un asno que rebuzna demasiado, porque tiene algún defecto. La sabiduría también es mirar bien lo que compras.', 'Mis consejos se copiaron durante siglos en las escuelas de escribas; algunas tablillas tienen errores de alumnos distraídos. Así sabemos que ya entonces costaba aprender.'],
  hammurabi: ['En mi código hay leyes muy concretas: si un constructor hace una casa que se derrumba y mata al dueño, el constructor debe morir. Así me aseguraba de que construyeran bien.', 'También escribí sobre los médicos: si curaban bien a alguien, cobraban según la clase del paciente; si causaban daño por descuido, eran castigados. Ya entonces importaba la responsabilidad.'],
  gilgamesh: ['La epopeya se perdió durante dos mil años. En 1872, George Smith, que trabajaba en el Museo Británico, descifró una tablilla con la historia del diluvio y se emocionó tanto que, según cuentan, empezó a quitarse la ropa de alegría.', 'Una nueva tablilla, descubierta en 2011, contó más detalles del bosque de los cedros: había monos que chillaban y cigarras que cantaban. Mi historia sigue creciendo.'],
});

BOOKS.push([
  { id: 'gilgamesh-libro', author: 'gilgamesh', by: 'Anónimo (versión del escriba Sîn-lēqi-unninni)', title: 'La epopeya de Gilgamesh', year: 'c. 1200 a.C.', kind: 'epopeya', at: B2[0],
    parts: [
      { t: 'El rey arrogante', x: 'La epopeya empieza alabando a Gilgamesh, rey de Uruk, el que lo vio todo. Pero el rey es arrogante y oprime a su pueblo. Los dioses le envían un igual: Enkidu, un hombre salvaje que vive con las gacelas. Luchan, y se hacen amigos.' },
      { t: 'La muerte del amigo', x: 'Juntos vencen al gigante Humbaba y al Toro del Cielo. Pero los dioses deciden que Enkidu debe morir. Gilgamesh lo llora siete días y siete noches. Por primera vez entiende que él también morirá, y el miedo lo empuja a buscar la vida eterna.' },
      { t: 'Siduri y Utnapishtim', x: 'En su viaje, la tabernera Siduri le aconseja disfrutar de la vida y cuidar a los suyos. Utnapishtim, el sobreviviente del diluvio, le cuenta cómo los dioses le dieron la inmortalidad, y le revela una planta que devuelve la juventud. Una serpiente se la roba.' },
      { t: 'Las murallas de Uruk', x: 'Gilgamesh vuelve a Uruk con las manos vacías. Pero al mostrarle la ciudad al barquero que lo acompaña, mira sus murallas, sus huertos y sus templos. No ha vencido a la muerte, pero su obra y su ciudad perdurarán. La epopeya termina como empezó: con las murallas de Uruk.' },
    ],
    quote: 'Tú, llena tu vientre; día y noche alégrate; cuida al pequeño que te toma de la mano; que tu esposa se goce en tu pecho: esa es la tarea de los hombres.',
    q: { q: '¿Qué roba la serpiente a Gilgamesh en la epopeya?', a: ['La planta que devuelve la juventud', 'Su corona', 'La espada de Enkidu', 'Las tablillas de las leyes'], e: 'Por eso, dice el poema, las serpientes mudan de piel.' } },
  { id: 'himnos-inanna', author: 'enheduanna', by: 'Enheduanna', title: 'La exaltación de Inanna', year: 'c. 2250 a.C.', kind: 'himno', at: B2[1],
    parts: [
      { t: 'Una autora con nombre', x: 'La exaltación de Inanna es un himno de unos ciento cincuenta versos. Lo escribió Enheduanna, suma sacerdotisa de Ur e hija del rey Sargón, y es una de las primeras obras de la historia con autor conocido.' },
      { t: 'La diosa poderosa', x: 'El himno alaba a Inanna, diosa del amor, de la guerra y de la estrella de la tarde: la que reúne en sí fuerzas opuestas. Enheduanna la presenta como la señora de todos los poderes divinos, los me.' },
      { t: 'El exilio', x: 'En medio del himno aparece algo sorprendente: la propia autora. Cuenta que un usurpador, Lugalanne, la expulsó del templo; que vagó por el desierto; que su boca de miel se volvió amarga. Es una de las primeras voces personales de la literatura.' },
      { t: 'La voz recuperada', x: 'Al final, Inanna escucha a Enheduanna y le devuelve su lugar. El himno se copió en las escuelas durante siglos. Gracias a esos alumnos que lo repetían sobre el barro, la primera voz con nombre de la historia llegó hasta nosotros.' },
    ],
    quote: 'Yo, Enheduanna, la suma sacerdotisa… he recitado para ti este canto.',
    q: { q: '¿Qué cuenta Enheduanna sobre sí misma en el himno?', a: ['Que fue expulsada de su templo y luego recuperó su lugar', 'Que era reina de Egipto', 'Que inventó la cerveza', 'Que nunca salió de Ur'], e: 'Es una de las primeras voces personales de la literatura.' } },
]);
BOOKS[BOOKS.length - 1].forEach((b) => { b.q.book = b.title; });
