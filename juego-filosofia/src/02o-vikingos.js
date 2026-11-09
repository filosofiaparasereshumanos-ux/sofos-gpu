// ============================================================================
//  XXI · LOS VIKINGOS Y EL NORTE: lugares, ciudadanos, encargos, anécdotas y libros
// ============================================================================
POIS.push([
  wpoi(0, 'thing', 'Thingvellir y el Althing', 'En el valle de Thingvellir, en Islandia, se reunía cada verano desde el año 930 el Althing, la asamblea de los hombres libres. Allí se hacían las leyes, se juzgaban las disputas y se casaban las familias. Es una de las asambleas más antiguas del mundo.',
    'Thingvellir está justo donde se separan las placas tectónicas de América y de Europa: el valle se ensancha unos milímetros cada año.',
    { q: '¿Qué era el Althing?', a: ['La asamblea donde los islandeses libres hacían sus leyes', 'Un templo', 'Un mercado de esclavos', 'Un puerto'], e: 'Fundado en el año 930.' }),
  wpoi(1, 'langhus', 'La casa larga', 'Las familias nórdicas vivían en casas largas de madera y turba, con un fuego en el centro. Allí se cocinaba, se tejía, se contaban sagas en las largas noches de invierno y dormían juntos parientes, trabajadores e incluso animales en un extremo.',
    'El humo salía por un agujero del techo; las paredes de turba eran tan gruesas que mantenían el calor durante el frío invierno.',
    { q: '¿Qué había en el centro de la casa larga vikinga?', a: ['Un fuego largo para cocinar y calentarse', 'Una piscina', 'Un altar de oro', 'Una escalera'], e: 'El hogar era el corazón de la casa.' }),
  wpoi(2, 'drakkar', 'Los barcos del Norte', 'Los barcos vikingos eran largos, ligeros y flexibles, con vela y remos. Podían navegar en mar abierto y también remontar ríos poco profundos. Con ellos llegaron a Islandia, a Groenlandia y, hacia el año 1000, a Terranova, en América.',
    'Leif Erikson llegó a América unos quinientos años antes que Colón. Llamó a esa tierra Vinland.',
    { q: '¿Hasta dónde llegaron los barcos vikingos hacia el año 1000?', a: ['Hasta América del Norte', 'Hasta Australia', 'Hasta la Luna', 'Solo hasta Dinamarca'], e: 'A Terranova, que llamaron Vinland.' }),
  wpoi(3, 'runas', 'La piedra rúnica', 'Los nórdicos escribían con runas, un alfabeto de trazos rectos fácil de tallar en piedra o madera. Levantaban piedras rúnicas para recordar a sus muertos, contar viajes o celebrar obras, como un puente construido para todos.',
    'El alfabeto rúnico se llama futhark, por el sonido de sus seis primeras letras.',
    { q: '¿Para qué servían muchas piedras rúnicas?', a: ['Para recordar a personas y hechos importantes', 'Para afilar espadas', 'Para jugar', 'Para cocinar'], e: 'Eran monumentos de memoria.' }),
  wpoi(4, 'reykholt', 'El baño de Snorri en Reykholt', 'En Reykholt, Snorri Sturluson tenía su granja, su biblioteca y un baño circular de piedra alimentado por una fuente termal, donde se reunía a conversar. Allí escribió buena parte de sus obras, y allí lo asesinaron sus enemigos en 1241.',
    'El baño de Snorri, Snorralaug, todavía existe y el agua caliente sigue llegando a él desde la fuente.',
    { q: '¿Qué conserva todavía hoy la granja de Reykholt?', a: ['El baño termal de piedra de Snorri', 'Un barco vikingo entero', 'La espada de Odín', 'Un castillo'], e: 'Snorralaug, alimentado por agua caliente natural.' }),
]);

NPCS.push([
  wnpc(0, 'runista', 'Halfdan', 'tallador de runas', sk(0x5a4a3a, 0x8a3a2a, 0xe0c0a0, 0xc8a060, { beard: 0xc8a060, acc: 'staff' }), [
    'Tallo runas en piedra. Cada letra tiene un nombre y un sentido: la runa del ganado es también la de la riqueza; la del sol, la de la victoria.',
    'Me encargan piedras para recordar a los muertos. Escribo: fulano levantó esta piedra por su padre, que murió en tierras lejanas. Así la piedra habla cuando nosotros callamos.',
    'Un hombre me pidió grabar en una piedra que había construido un puente para el bien de todos. Esa es la mejor fama: la que deja algo útil a los demás.',
  ]),
  wnpc(1, 'tejedora-norte', 'Gudrun', 'señora de la granja y tejedora', sk(0x6a4a5a, 0xc8a050, 0xe8d0b8, 0xd8b878, { hat: 'longhair', acc: 'none' }), [
    'Llevo las llaves de la granja colgadas del broche: la despensa, los cofres, el granero. Mientras los hombres viajan, la granja la dirijo yo.',
    'Tejo en un telar vertical con pesas de piedra. Una vela de barco puede llevar a varias mujeres más de un año de trabajo. Sin nuestras velas, no hay viajes.',
    'En las noches de invierno, junto al fuego, contamos sagas. Mi abuela decía: escucha bien, porque un día tú serás la que recuerde.',
  ], true),
  wnpc(2, 'navegante', 'Ketil', 'navegante del Atlántico Norte', sk(0x3a4a5a, 0x6a6a6a, 0xd8b090, 0x8a5a3a, { beard: 0x8a5a3a, hat: 'cap', acc: 'none' }), [
    'Navegamos mirando el sol, las estrellas, las ballenas y las aves. Cuando ves aves que vuelan al atardecer, sabes hacia dónde queda la tierra.',
    'El Hávamál dice que el que viaja lejos necesita buen juicio: en casa todo es fácil, pero lejos se ve quién sabe pensar.',
    'He visto hielo flotante grande como montañas. El mar no perdona la arrogancia: hay que respetarlo para volver a casa.',
  ]),
]);

Object.assign(QUESTS, {
  volva: { text: 'Visita la piedra rúnica y escucha a Halfdan, el tallador. Luego dime qué ocurre después del ocaso de los dioses.', needs: { pois: ['runas'], npcs: ['runista'] },
    riddle: { q: '¿Qué ocurre después del Ragnarök, según la vidente?', a: ['Una tierra nueva y verde surge del mar', 'Nada vuelve a existir', 'Los gigantes reinan para siempre', 'El mundo se congela'] } },
  egill: { text: 'Entra en la casa larga y escucha a Gudrun, la tejedora. Luego dime qué me devolvió las ganas de vivir.', needs: { pois: ['langhus'], npcs: ['tejedora-norte'] },
    riddle: { q: '¿Qué devolvió a Egill las ganas de vivir?', a: ['Componer un poema para su hijo', 'Ganar una batalla', 'Encontrar oro', 'Olvidar a su hijo'] } },
  aud: { text: 'Visita los barcos del Norte y escucha a Ketil, el navegante. Luego dime qué hice con mis esclavos al llegar a Islandia.', needs: { pois: ['drakkar'], npcs: ['navegante'] },
    riddle: { q: '¿Qué hizo Aud con varios de sus esclavos en Islandia?', a: ['Les dio la libertad y tierras propias', 'Los vendió', 'Los dejó en el barco', 'Los castigó'] } },
  thorgeir: { text: 'Visita Thingvellir y escucha a Halfdan, que talla la memoria en piedra. Luego dime qué pasa si dividimos la ley.', needs: { pois: ['thing'], npcs: ['runista'] },
    riddle: { q: 'Según Thorgeir, si dividimos la ley...', a: ['Dividiremos también la paz', 'Habrá más libertad', 'Ganará el más fuerte', 'No pasará nada'] } },
});

Object.assign(ANECDOTES, {
  volva: ['Cuando llego a una granja, me sientan en un asiento alto con un cojín de plumas de gallina y me sirven corazones de animales. Así lo cuenta la Saga de Erik el Rojo.', 'Antes de hablar, necesito que una mujer cante los cantos antiguos. Una vez solo una joven cristiana los sabía, y aceptó cantar para ayudar a su gente.'],
  egill: ['Siendo muy niño, mis padres no querían llevarme a una fiesta porque era revoltoso. Fui solo, montado en un caballo, y recité un poema para el anfitrión. Me recibieron como a un invitado de honor.', 'Ya muy viejo y casi ciego, quise enterrar mis cofres de plata en un lugar secreto. Nadie supo nunca dónde. Los islandeses aún bromean con buscarlos.'],
  aud: ['Al llegar a Islandia, perdí mi asiento de mando de madera en el mar. Esperé a que las olas lo dejaran en la costa y allí construí mi casa: dejé que el mar eligiera el lugar.', 'Un pariente me ofreció hospitalidad solo para mí, sin mi gente. Me fui ofendida: quien no recibe a los míos, no me recibe a mí.'],
  thorgeir: ['Dicen que, después de la decisión, arrojé las imágenes de los antiguos dioses a una cascada que hoy se llama Goðafoss, la cascada de los dioses.', 'Yo mismo seguía a los dioses antiguos cuando tomé la decisión, y aun así elegí lo que traía paz a todos, no lo que convenía a mi bando.'],
  snorri: ['Viajé a Noruega y fui recibido por el rey y por un poderoso jarl. Les escribí poemas, y a cambio recibí regalos, entre ellos un barco.', 'Mis enemigos me mataron en el sótano de mi casa. Mis últimas palabras, según la saga, fueron: no golpeéis.'],
});

BOOKS.push([
  { id: 'havamal', author: 'volva', by: 'Poema nórdico anónimo', title: 'Hávamál, los dichos del Altísimo', year: 'c. siglo X', kind: 'poema sapiencial', at: B2[0],
    parts: [
      { t: 'Consejos de Odín', x: 'El Hávamál es un poema de la Edda poética que reúne consejos atribuidos a Odín, el Altísimo. Habla de cómo comportarse como huésped y anfitrión, cómo hacer amigos y cómo vivir con prudencia.' },
      { t: 'El viajero prudente', x: 'Quien llega a una casa debe mirar bien antes de entrar, hablar poco y escuchar mucho. Nada es mejor equipaje para el camino que mucho buen juicio; y nada peor que beber demasiado.' },
      { t: 'La amistad', x: 'Al amigo hay que visitarlo a menudo, porque la maleza crece en el camino que nadie pisa. Un ser humano es la alegría de otro ser humano: nadie debería vivir solo.' },
      { t: 'La fama que no muere', x: 'Muere el ganado, mueren los parientes, también uno mismo muere; pero la fama no muere nunca para quien supo ganarla con bien. Lo que queda de nosotros son nuestros actos y lo que otros dicen de ellos.' },
    ],
    quote: 'Un ser humano es la alegría de otro ser humano.',
    q: { q: '¿Qué dice el Hávamál sobre el camino hacia la casa del amigo?', a: ['Que crece la maleza si nadie lo pisa: hay que visitarlo a menudo', 'Que hay que cerrarlo', 'Que es peligroso', 'Que no importa'], e: 'La amistad se cuida con presencia.' } },
  { id: 'edda', author: 'snorri', by: 'Snorri Sturluson', title: 'La Edda menor', year: 'c. 1220', kind: 'tratado y mitología', at: B2[1],
    parts: [
      { t: 'Un manual para poetas', x: 'Snorri escribió la Edda para que los jóvenes poetas entendieran las imágenes de la poesía antigua. Para eso tuvo que contar los mitos completos: así los salvó del olvido.' },
      { t: 'El engaño de Gylfi', x: 'Un rey llamado Gylfi viaja disfrazado a la morada de los dioses y les hace preguntas sobre el origen del mundo. Las respuestas cuentan cómo de un abismo de hielo y fuego surgieron los gigantes, los dioses y los seres humanos.' },
      { t: 'Yggdrasil y los nueve mundos', x: 'El fresno Yggdrasil sostiene los nueve mundos. Un águila vive en su copa, una serpiente roe sus raíces y una ardilla lleva mensajes entre ambas. Bajo sus raíces está el pozo de la sabiduría, por el que Odín dio un ojo.' },
      { t: 'El fin y el comienzo', x: 'La Edda cuenta el Ragnarök: la gran batalla en que caen dioses y gigantes. Pero después renace una tierra verde, y dos seres humanos que se refugiaron en el árbol vuelven a poblarla.' },
    ],
    quote: 'Odín dio un ojo para beber del pozo de la sabiduría.',
    q: { q: '¿Por qué escribió Snorri la Edda menor?', a: ['Para enseñar a los poetas los mitos antiguos y salvarlos del olvido', 'Para declarar la guerra', 'Para describir barcos', 'Para hacer leyes'], e: 'Gracias a ella conocemos la mitología nórdica.' } },
]);
BOOKS[BOOKS.length - 1].forEach((b) => { b.q.book = b.title; });
