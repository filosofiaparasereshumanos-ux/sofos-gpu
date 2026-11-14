// ============================================================================
//  XVIII · EL JARDÍN DE LOS POETAS: lugares, ciudadanos, encargos, anécdotas y libros
// ============================================================================
POIS.push([
  wpoi(0, 'lesbos', 'La isla de Lesbos', 'En Mitilene, en la isla de Lesbos, Safo reunía a jóvenes para cantar, bailar y componer poemas con la lira. Sus versos se cantaron durante siglos por todo el mundo griego, hasta que sus libros se perdieron y solo quedaron fragmentos.',
    'Muchos versos de Safo se recuperaron de papiros encontrados en los basureros de la antigua ciudad egipcia de Oxirrinco; en 2014 apareció un poema nuevo.',
    { q: '¿Dónde se han encontrado muchos versos perdidos de Safo?', a: ['En papiros de antiguos basureros de Egipto', 'En una cueva de Lesbos', 'En una biblioteca de Roma intacta', 'En una tumba china'], e: 'En la ciudad de Oxirrinco.' }),
  wpoi(1, 'changan', 'Chang’an, la capital Tang', 'Chang’an, la capital de la dinastía Tang, fue una de las ciudades más grandes del mundo, con más de un millón de habitantes, mercados de la Ruta de la Seda y templos de muchas religiones. Allí la poesía era tan importante que formaba parte de los exámenes para ser funcionario.',
    'Se conservan casi cincuenta mil poemas de la dinastía Tang, escritos por más de dos mil poetas.',
    { q: '¿Qué papel tenía la poesía en la China Tang?', a: ['Formaba parte de los exámenes para ser funcionario', 'Estaba prohibida', 'Solo la escribían los emperadores', 'No existía'], e: 'Un buen funcionario debía saber escribir versos.' }),
  wpoi(2, 'konya', 'Konya y los derviches', 'En Konya, en Anatolia, está el mausoleo de Rumi, con su cúpula de azulejos verdes. Sus seguidores, los derviches giróvagos, giran con faldas blancas que se abren como flores, al son de la flauta de caña y los tambores, en una meditación llamada sema.',
    'La ceremonia del sema fue declarada Patrimonio Inmaterial de la Humanidad por la Unesco.',
    { q: '¿Cómo se llama la meditación giratoria de los derviches?', a: ['Sema', 'Yoga', 'Tai chi', 'Haka'], e: 'Simboliza el giro del universo y el viaje del alma.' }),
  wpoi(3, 'elqui', 'La escuela del valle de Elqui', 'En el valle de Elqui, en el norte de Chile, entre cerros secos y viñedos, Gabriela Mistral fue alumna y luego maestra. Hoy, en Montegrande, se conserva la pequeña escuela donde estudió, y allí mismo está su tumba.',
    'El valle de Elqui tiene uno de los cielos más limpios del mundo: está lleno de observatorios astronómicos.',
    { q: '¿Qué hay hoy en Montegrande, en el valle de Elqui?', a: ['La escuela donde estudió Gabriela Mistral y su tumba', 'Un puerto', 'Una fábrica de autos', 'Un castillo'], e: 'Lugar de peregrinación para lectores de todo el mundo.' }),
  wpoi(4, 'islanegra', 'La casa de Isla Negra', 'Frente al océano Pacífico, en Isla Negra, está la casa de Pablo Neruda, construida como un barco. Allí guardaba mascarones de proa, caracolas, botellas de colores y mapas antiguos. Decía que escribir frente al mar le daba sus mejores versos.',
    'A pesar de su nombre, Isla Negra no es una isla: es un pueblo en la costa central de Chile.',
    { q: '¿Qué coleccionaba Neruda en su casa de Isla Negra?', a: ['Mascarones de proa, caracolas y botellas', 'Armas', 'Animales disecados', 'Monedas de oro'], e: 'Hoy la casa es un museo.' }),
]);

NPCS.push([
  wnpc(0, 'estudiante-tang', 'Wei', 'estudiante del examen imperial', sk(0xe8e4dc, 0x2a5a8a, 0xd2a684, 0x1a1410, { acc: 'scroll' }), [
    'Me preparo para el examen imperial. Debo saber de memoria a Confucio y, además, escribir un poema perfecto con las rimas que me pidan.',
    'Mi poeta favorito es Li Bai. Dicen que podía escribir cien poemas con una sola jarra de vino. Yo, con una tetera, apenas escribo uno.',
    'En la poesía china cada verso tiene el mismo número de sílabas, y una imagen pequeña, la luna, un ganso, un sauce, dice un sentimiento enorme.',
  ]),
  wnpc(1, 'derviche', 'Ahmet', 'derviche de Konya', sk(0xf4f0e8, 0x6a4a3a, 0xc49372, 0x1a1410, { beard: 0x1a1410, hat: 'cap', acc: 'none' }), [
    'Al girar, pongo la mano derecha hacia el cielo para recibir, y la izquierda hacia la tierra para dar. Yo solo soy el puente.',
    'Mi gorro alto de fieltro representa la lápida del ego, y mi falda blanca, su mortaja. Girando, morimos un poco a lo pequeño de nosotros.',
    'Rumi decía: la herida es el lugar por donde entra la luz. Cuando sufrimos, también podemos abrirnos.',
  ]),
  wnpc(2, 'maestra-elqui', 'Rosa', 'maestra rural del valle de Elqui', sk(0x5a4a3a, 0xd8d4cc, 0xc49372, 0x3a2a20, { hat: 'longhair', acc: 'book' }), [
    'Enseño en una escuela rural, como Gabriela. Algunos niños caminan horas para llegar. Cuando llegan, lo primero es darles de comer.',
    'Gabriela decía que la maestra debía ser como una madre que enseña con ternura. Yo creo que también con exigencia: el cariño no es dejar de enseñar.',
    'Por las noches los niños miran las estrellas. Aquí el cielo es tan limpio que han puesto observatorios en los cerros. La poesía y la ciencia nacen del mismo asombro.',
  ], true),
]);

Object.assign(QUESTS, {
  safo: { text: 'Visita la isla de Lesbos y escucha a Wei, el estudiante, que también escribe poemas. Luego dime qué es lo más bello, según mi canto.', needs: { pois: ['lesbos'], npcs: ['estudiante-tang'] },
    riddle: { q: 'Según Safo, ¿qué es lo más bello sobre la tierra?', a: ['Aquello que uno ama', 'Un ejército de jinetes', 'Una flota de naves', 'El palacio del rey'] } },
  libai: { text: 'Recorre Chang’an y escucha a Wei, que se prepara para el examen imperial. Luego dime en qué piensa el poeta al ver la luna junto a su cama.', needs: { pois: ['changan'], npcs: ['estudiante-tang'] },
    riddle: { q: '¿En qué piensa Li Bai al mirar la luna en su poema más famoso?', a: ['En su tierra natal', 'En el emperador', 'En la guerra', 'En el dinero'] } },
  rumi: { text: 'Visita Konya y escucha a Ahmet, el derviche. Luego dime cuál es el camino, según mis versos.', needs: { pois: ['konya'], npcs: ['derviche'] },
    riddle: { q: 'Para Rumi, ¿cuál es el camino hacia lo divino y hacia uno mismo?', a: ['El amor', 'La riqueza', 'La guerra', 'El olvido'] } },
  mistral: { text: 'Visita la escuela del valle de Elqui y escucha a Rosa, la maestra rural. Luego dime cuál es el nombre del niño.', needs: { pois: ['elqui'], npcs: ['maestra-elqui'] },
    riddle: { q: 'Según Gabriela Mistral, ¿cuál es el nombre del niño?', a: ['Hoy', 'Mañana', 'Futuro', 'Nadie'] } },
});

Object.assign(ANECDOTES, {
  safo: ['El poeta Alceo, de mi misma isla, me escribió: Safo de cabellos de violeta, pura, de dulce sonrisa, quiero decirte algo, pero me lo impide la vergüenza.', 'Durante siglos se contó que me arrojé al mar por un amor no correspondido. Es una leyenda inventada mucho después: de mi vida real sabemos muy poco.'],
  libai: ['Cuentan que el emperador me pidió un poema estando yo borracho, y que me echaron agua en la cara para despertarme. Escribí uno tan bello que el emperador mismo me sirvió la sopa.', 'Mi amigo Du Fu me escribió muchos poemas. Decía: ¿cuándo volveremos a hablar de literatura junto a una jarra de vino?'],
  rumi: ['Se cuenta que, al conocer a Shams de Tabriz, este tiró mis libros a una fuente. Cuando los sacó, estaban secos. Me dijo: esto es algo que tú no sabes.', 'En mi funeral caminaron juntos musulmanes, cristianos y judíos. Cada uno decía que yo les había ayudado a comprender mejor su propia fe.'],
  mistral: ['Cuando era niña, en la escuela de Vicuña, me acusaron injustamente de robar papel y me echaron. Esa humillación me enseñó cuánto puede herir una escuela injusta.', 'Elegí mi seudónimo por dos poetas que admiraba: el italiano Gabriele D’Annunzio y el francés Frédéric Mistral. También me gustaba el mistral, un viento del sur de Francia.'],
  neruda: ['Mi seudónimo lo tomé, en parte, del escritor checo Jan Neruda. Lo usé para que mi padre, que no quería que fuera poeta, no supiera que publicaba versos.', 'En Isla Negra puse a cada mascarón de proa un nombre, y les hablaba como si fueran amigos.'],
});

BOOKS.push([
  { id: 'masnavi', author: 'rumi', by: 'Yalal al-Din Rumi', title: 'El Masnavi', year: 'c. 1258 – 1273', kind: 'poema', at: B2[0],
    parts: [
      { t: 'La flauta de caña', x: 'El Masnavi empieza así: escucha a la flauta de caña, cómo se queja de la separación. Desde que me cortaron del cañaveral, mi lamento hace llorar a hombres y mujeres. La flauta es el alma, que añora volver a su origen.' },
      { t: 'Un libro de historias', x: 'El Masnavi tiene seis libros y más de veinticinco mil versos. Está lleno de historias: de reyes, mercaderes, animales y locos sabios. Cada historia lleva dentro otra historia, y todas enseñan algo sobre el alma.' },
      { t: 'El elefante en la oscuridad', x: 'Unos hombres tocan un elefante en una habitación oscura. Uno toca la trompa y dice que es una manguera; otro, la oreja, y dice que es un abanico; otro, la pata, y dice que es una columna. Si tuvieran una vela, dice Rumi, no discutirían: cada uno conoce solo una parte de la verdad.' },
      { t: 'El amor transforma', x: 'Para Rumi, el amor es el gran maestro: transforma lo amargo en dulce y el cobre en oro. No se trata de huir del mundo, sino de vivirlo con el corazón abierto.' },
    ],
    quote: 'Escucha a la flauta de caña, cómo cuenta su historia y se queja de la separación.',
    q: { q: '¿Qué enseña la historia del elefante en la oscuridad?', a: ['Que cada uno conoce solo una parte de la verdad', 'Que los elefantes son peligrosos', 'Que no hay que entrar en habitaciones oscuras', 'Que la verdad no existe'], e: 'Con más luz, discutiríamos menos.' } },
  { id: 'fragmentos-safo', author: 'safo', by: 'Safo de Lesbos', title: 'Poemas y fragmentos', year: 'c. 600 a.C.', kind: 'poesía', at: B2[1],
    parts: [
      { t: 'Nueve libros perdidos', x: 'Los sabios de Alejandría reunieron la poesía de Safo en nueve libros. Casi todo se perdió. Hoy solo tenemos un poema completo, la Oda a Afrodita, y muchos fragmentos: a veces, una sola palabra entre dos huecos.' },
      { t: 'Lo más bello', x: 'En el fragmento 16, Safo recuerda a una amiga que se fue lejos y dice: algunos dicen que lo más bello es un ejército; yo digo que es aquello que uno ama. Y prefiere ver el andar amable de su amiga a todos los carros de guerra de Lidia.' },
      { t: 'El cuerpo que siente', x: 'En otro famoso poema, Safo describe lo que siente al ver a la persona amada: la lengua se le quiebra, un fuego sutil le corre bajo la piel, no ve nada, le zumban los oídos. Es una de las primeras descripciones de una emoción en la literatura.' },
      { t: 'Una voz que vuelve', x: 'Todavía hoy aparecen versos suyos en papiros antiguos. Cada hallazgo es como recuperar un trozo de una voz que habló hace veintiséis siglos. Safo escribió: alguien, te digo, se acordará de nosotras en el futuro.' },
    ],
    quote: 'Alguien, te digo, se acordará de nosotras en el futuro.',
    q: { q: '¿Cuánto se conserva de la poesía de Safo?', a: ['Un poema completo y muchos fragmentos', 'Sus nueve libros completos', 'Nada', 'Solo su nombre'], e: 'La Oda a Afrodita es el único poema entero.' } },
]);
BOOKS[BOOKS.length - 1].forEach((b) => { b.q.book = b.title; });
