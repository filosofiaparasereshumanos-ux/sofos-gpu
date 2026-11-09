// ============================================================================
//  XIX · EL TALLER DE LOS CIENTÍFICOS: lugares, ciudadanos, encargos, anécdotas y libros
// ============================================================================
POIS.push([
  wpoi(0, 'eureka', 'Los baños de Siracusa', 'En unos baños públicos de Siracusa, cuenta la historia, Arquímedes vio cómo subía el agua al meterse en la bañera y comprendió cómo saber si la corona del rey era de oro puro sin romperla. Salió a la calle gritando ¡eureka!, que significa lo encontré.',
    'La anécdota la contó el arquitecto romano Vitruvio unos dos siglos después: quizá no ocurrió exactamente así, pero el método funciona.',
    { q: '¿Qué significa «eureka»?', a: ['Lo encontré', 'Socorro', 'Agua', 'Viva el rey'], e: 'En griego antiguo.' }),
  wpoi(1, 'padua', 'El taller de lentes de Padua', 'En Padua, Galileo pulía sus propias lentes para construir telescopios cada vez más potentes. Con uno de ellos, en enero de 1610, descubrió cuatro pequeñas luces que giraban alrededor de Júpiter: eran lunas. No todo giraba alrededor de la Tierra.',
    'Su primer telescopio aumentaba unas tres veces; en pocos meses construyó uno de unos veinte aumentos.',
    { q: '¿Qué descubrió Galileo alrededor de Júpiter en 1610?', a: ['Cuatro lunas', 'Anillos', 'Un cometa', 'Un segundo sol'], e: 'Prueba de que no todo gira alrededor de la Tierra.' }),
  wpoi(2, 'analitica', 'La máquina analítica', 'En Londres, Charles Babbage diseñó la máquina analítica: una enorme calculadora de engranajes, movida por vapor, que leería instrucciones en tarjetas perforadas y tendría memoria y unidad de cálculo, como los ordenadores actuales. Ada Lovelace escribió cómo programarla.',
    'Nunca se construyó entera por falta de dinero; en 1991 el Museo de Ciencias de Londres construyó su máquina diferencial, y funcionó.',
    { q: '¿Cómo recibiría instrucciones la máquina analítica de Babbage?', a: ['Con tarjetas perforadas', 'Con la voz', 'Con una pantalla táctil', 'Con señales de humo'], e: 'Como los telares de Jacquard.' }),
  wpoi(3, 'cobertizo', 'El cobertizo de los Curie', 'En un viejo cobertizo de París, frío en invierno y caluroso en verano, Marie y Pierre Curie trabajaron durante años removiendo toneladas de mineral en grandes calderos para aislar unos pocos decigramos de radio, que brillaba con una luz azulada en la oscuridad.',
    'Los cuadernos de laboratorio de Marie Curie siguen siendo radiactivos y se guardan en cajas de plomo; para consultarlos hay que firmar un documento.',
    { q: '¿Qué brillaba en la oscuridad del cobertizo de los Curie?', a: ['El radio', 'El oro', 'Las luciérnagas', 'Una lámpara de aceite'], e: 'Con una débil luz azulada.' }),
  wpoi(4, 'berna', 'La oficina de patentes de Berna', 'En una oficina de patentes de Berna, en Suiza, un joven empleado revisaba inventos. En 1905, su «año milagroso», ese empleado, Albert Einstein, publicó cuatro artículos que cambiaron la física, entre ellos la relatividad especial.',
    'Einstein decía que la oficina era un buen lugar para pensar: revisar inventos le obligaba a ir siempre al fondo de cómo funcionaban las cosas.',
    { q: '¿Dónde trabajaba Einstein en su «año milagroso» de 1905?', a: ['En una oficina de patentes en Berna', 'En una universidad famosa', 'En un observatorio', 'En una fábrica'], e: 'Revisando inventos.' }),
]);

NPCS.push([
  wnpc(0, 'pulidor', 'Marco', 'pulidor de lentes de Padua', sk(0x6a4a2a, 0x3a3a3a, 0xd2a684, 0x2a1a10, { beard: 0x2a1a10, acc: 'lens' }), [
    'Pulo vidrio para el maestro Galileo. Una lente con un pequeño defecto deforma el cielo entero. La paciencia también es una herramienta científica.',
    'Algunos profesores se niegan a mirar por el telescopio. Dicen que si Aristóteles no lo vio, no puede existir. ¡Ni siquiera quieren comprobarlo!',
    'El maestro anota todo lo que ve, noche tras noche, y dibuja la Luna con sus sombras. Dice que mirar una vez no basta: hay que repetir.',
  ]),
  wnpc(1, 'babbage', 'Charles Babbage', 'inventor de la máquina analítica', sk(0x2a2a3a, 0x8a7a6a, 0xe0b896, 0x6a5a4a, { acc: 'scroll' }), [
    'Diseñé una máquina que calcula sola, sin errores humanos. Las tablas de números de los barcos tenían tantos errores que provocaban naufragios.',
    'Ada entendió mi máquina mejor que yo mismo. La llamé la encantadora de números.',
    'Me preguntaron una vez en el Parlamento: si pone números equivocados en la máquina, ¿saldrán las respuestas correctas? No logré comprender la confusión de ideas que lleva a hacer esa pregunta.',
  ]),
  wnpc(2, 'radiologa', 'Irène', 'radióloga de guerra', sk(0x4a4a5a, 0xf2efe6, 0xe8c8a8, 0x4a3a2a, { hat: 'longhair', acc: 'lens' }), [
    'Soy Irène, la hija de Marie Curie. A los diecisiete años, en la guerra, conducía con mi madre coches con aparatos de rayos X para ver las balas dentro de los heridos.',
    'Mi madre me enseñó que la ciencia es para servir. Aprendí a enseñar a los médicos a usar los rayos X, aunque algunos no querían recibir órdenes de una chica tan joven.',
    'Años después, con mi marido Frédéric, descubrimos la radiactividad artificial. También recibimos el Nobel. En mi familia hay cinco premios Nobel.',
  ], true),
]);

Object.assign(QUESTS, {
  arquimedes: { text: 'Visita los baños de Siracusa y escucha a Marco, que pule lentes con paciencia. Luego dime qué significa la palabra que grité.', needs: { pois: ['eureka'], npcs: ['pulidor'] },
    riddle: { q: '¿Qué significa «eureka»?', a: ['Lo encontré', 'Lo perdí', 'Ayuda', 'Agua caliente'] } },
  galileo: { text: 'Visita mi taller de lentes en Padua y escucha a Marco, mi pulidor. Luego dime en qué lenguaje está escrito el libro de la naturaleza.', needs: { pois: ['padua'], npcs: ['pulidor'] },
    riddle: { q: 'Según Galileo, ¿en qué lenguaje está escrito el libro de la naturaleza?', a: ['En el de las matemáticas', 'En latín', 'En el de los sueños', 'En el de la música'] } },
  lovelace: { text: 'Visita la máquina analítica y escucha a Charles Babbage. Luego dime qué no puede hacer la máquina, según mis notas.', needs: { pois: ['analitica'], npcs: ['babbage'] },
    riddle: { q: 'Según Ada Lovelace, ¿qué no puede hacer la máquina analítica?', a: ['Crear algo por sí misma: solo hace lo que se le ordena', 'Sumar', 'Leer tarjetas perforadas', 'Moverse con vapor'] } },
  curie: { text: 'Visita mi cobertizo de París y escucha a mi hija Irène. Luego dime qué hay que hacer con lo que nos da miedo.', needs: { pois: ['cobertizo'], npcs: ['radiologa'] },
    riddle: { q: 'Según Marie Curie, ¿qué hay que hacer con lo que nos da miedo?', a: ['Comprenderlo', 'Huir siempre', 'Ignorarlo', 'Prohibirlo'] } },
});

Object.assign(ANECDOTES, {
  arquimedes: ['Diseñé espejos para quemar las velas de los barcos romanos que atacaban Siracusa, concentrando la luz del sol. Al menos eso cuentan; los científicos todavía discuten si era posible.', 'Escribí un libro, El contador de arena, para calcular cuántos granos de arena cabrían en todo el universo. Quería demostrar que ningún número es demasiado grande para la razón.'],
  galileo: ['De joven, en la catedral de Pisa, cronometré con mi propio pulso el balanceo de una lámpara y descubrí que tardaba lo mismo en ir y volver, fuera grande o pequeño el balanceo. De ahí salió el péndulo para los relojes.', 'Escribí mi gran libro en forma de diálogo entre tres personajes, en italiano y no en latín, para que cualquiera pudiera leerlo.'],
  lovelace: ['De niña diseñé una máquina voladora: estudié las alas de los pájaros y escribí un libro de vuelo. Tenía doce años.', 'Firmé mis famosas notas solo con mis iniciales, A. A. L. En mi tiempo, una mujer matemática no era tomada en serio.'],
  curie: ['Cuando murió Pierre en un accidente, ocupé su cátedra en la Sorbona: fui la primera mujer profesora de esa universidad. Empecé mi primera clase exactamente en la frase donde él había terminado.', 'Llevaba un tubo de radio en el bolsillo de la bata porque me gustaba su brillo. Entonces no sabíamos lo dañina que era la radiación.'],
  einstein: ['Nunca llevaba calcetines: decía que el dedo gordo siempre acababa haciéndoles un agujero.', 'En 1952 me ofrecieron ser presidente de Israel. Lo rechacé: dije que sabía algo de la naturaleza, pero casi nada de las personas.'],
});

BOOKS.push([
  { id: 'mensajero-sidereo', author: 'galileo', by: 'Galileo Galilei', title: 'El mensajero sideral', year: '1610', kind: 'tratado', at: B2[0],
    parts: [
      { t: 'Un libro urgente', x: 'Galileo publicó El mensajero sideral en marzo de 1610, apenas unas semanas después de sus observaciones. Era un librito en latín, con dibujos, que contaba lo que nadie había visto nunca en el cielo.' },
      { t: 'La Luna con montañas', x: 'Primero describe la Luna: no es una esfera lisa y perfecta, como decían los antiguos, sino un mundo con montañas, valles y cráteres, igual que la Tierra. Midió la altura de sus montañas por la longitud de sus sombras.' },
      { t: 'Estrellas invisibles', x: 'Después, con el telescopio, la Vía Láctea se convierte en una multitud de estrellas que el ojo no ve. El universo es mucho más grande y más lleno de lo que nadie había imaginado.' },
      { t: 'Las lunas de Júpiter', x: 'Por último, cuenta que noche tras noche vio cuatro pequeñas estrellas que cambiaban de posición junto a Júpiter: eran lunas girando a su alrededor. Si Júpiter tenía lunas, la Tierra no era el único centro del universo.' },
    ],
    quote: 'Es algo grandioso añadir a la multitud de estrellas fijas otras innumerables, nunca vistas antes.',
    q: { q: '¿Qué descubrió Galileo sobre la Luna, según El mensajero sideral?', a: ['Que tiene montañas y cráteres', 'Que es de cristal', 'Que es lisa y perfecta', 'Que tiene luz propia'], e: 'Midió sus montañas por las sombras.' } },
  { id: 'notas-lovelace', author: 'lovelace', by: 'Ada Lovelace', title: 'Notas sobre la máquina analítica', year: '1843', kind: 'ensayo', at: B2[1],
    parts: [
      { t: 'Más largas que el artículo', x: 'En 1843, Ada Lovelace tradujo un artículo del ingeniero italiano Menabrea sobre la máquina de Babbage. Le añadió siete notas, de la A a la G, que ocupaban el triple que el texto original.' },
      { t: 'Una máquina que teje números', x: 'Ada escribe que la máquina analítica teje patrones algebraicos igual que el telar de Jacquard teje flores y hojas. Las tarjetas perforadas son las instrucciones: el programa.' },
      { t: 'La nota G', x: 'En la última nota, Ada describe paso a paso cómo la máquina calcularía los números de Bernoulli, con una tabla de operaciones y variables. Es el primer algoritmo publicado pensado para una máquina.' },
      { t: 'Más allá de los números', x: 'Ada imagina que la máquina podría operar con cualquier símbolo, incluso componer música, si se traducen las notas a números. Pero advierte: la máquina no tiene pretensión de originar nada; solo puede hacer lo que sabemos ordenarle.' },
    ],
    quote: 'La máquina analítica teje patrones algebraicos igual que el telar de Jacquard teje flores y hojas.',
    q: { q: '¿Qué describe Ada Lovelace en la nota G?', a: ['El primer algoritmo para una máquina, que calcula los números de Bernoulli', 'Un poema de su padre', 'Un viaje a Italia', 'Una receta de cocina'], e: 'Por eso se la considera la primera programadora.' } },
]);
BOOKS[BOOKS.length - 1].forEach((b) => { b.q.book = b.title; });
