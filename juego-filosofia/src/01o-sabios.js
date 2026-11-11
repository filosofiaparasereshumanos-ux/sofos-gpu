// ============================================================================
//  DIECINUEVE SABIOS MÁS: filósofos de la vida práctica, poetas y científicos
//  que faltaban. Se suman como pensadores (no maestros) a sus épocas, en orden.
//  Q(p, correcta, e, ...falsas) arma una pregunta (la primera opción es la buena).
// ============================================================================
{
  const add = (eraId, sage, beforeId) => {
    const e = ERAS.find((x) => x.id === eraId); const list = e.sages;
    const i = beforeId ? list.findIndex((s) => s.id === beforeId) : list.findIndex((s) => s.boss);
    list.splice(i >= 0 ? i : list.length, 0, sage);
  };
  const Q = (q, ok, e, ...no) => ({ q, a: [ok, ...no], e });

  // ---------------------------------------------------------------- Atenas
  add('atenas', {
    id: 'hipocrates', name: 'Hipócrates de Cos', short: 'Hipócrates', dates: 'c. 460 – 370 a. C.', epithet: 'El padre de la medicina',
    look: lk(0xf0ece0, 0x3a6a8a, 0xd0a07a, 0xd8d8d8, { beard: 0xd8d8d8, hat: 'bald', acc: 'scroll' }), prop: 'water',
    intro: 'Antes de mí, la gente creía que las enfermedades eran castigos de los dioses. Yo preferí observar al enfermo, escucharlo y buscar las causas en la naturaleza. ¿Tú qué harías?',
    defeat: 'Has pensado como un médico: observar con calma, buscar causas reales y, sobre todo, no hacer daño.',
    concept: { name: 'Observar y no dañar', text: 'Hipócrates, nacido en la isla de Cos, separó la medicina de la magia: enseñó que las enfermedades tienen causas naturales que se pueden observar, como la alimentación, el clima o el agua. Sus discípulos anotaban con cuidado los síntomas y la evolución de cada enfermo. A su escuela se atribuye el juramento hipocrático, que todavía inspira a los médicos, y el principio «primero, no dañar». También enseñó que «la vida es breve y el arte es largo».' },
    q: [
      Q('¿Por qué se llama a Hipócrates «padre de la medicina»?', 'Porque explicó las enfermedades por causas naturales, no por castigos divinos', 'Separó la medicina de la magia y la superstición.', 'Porque inventó las vacunas', 'Porque fue el primer cirujano del corazón', 'Porque descubrió los virus'),
      Q('¿Qué principio se asocia a la tradición de Hipócrates?', 'Primero, no dañar', 'Antes de curar, el médico debe evitar hacer daño.', 'El fin justifica los medios', 'Todo fluye', 'Pienso, luego existo'),
      Q('¿Cómo se llama la promesa ética que hacen todavía muchos médicos?', 'El juramento hipocrático', 'Se atribuye a su escuela.', 'El juramento olímpico', 'La regla de oro', 'El imperativo categórico'),
      Q('¿En qué isla griega nació Hipócrates?', 'En Cos', 'Allí había una famosa escuela de medicina.', 'En Creta', 'En Samos', 'En Sicilia'),
      Q('¿Qué hacía la escuela de Hipócrates con cada enfermo?', 'Observaba y anotaba con cuidado sus síntomas y su evolución', 'La observación paciente es la base de la medicina científica.', 'Lo llevaba siempre al templo', 'Le daba siempre el mismo remedio', 'Le leía poemas'),
      Q('¿Qué frase famosa se atribuye a Hipócrates?', '«La vida es breve y el arte es largo»', 'Aprender un oficio, como la medicina, lleva toda una vida.', '«Solo sé que no sé nada»', '«Conócete a ti mismo»', '«El hombre es la medida de todas las cosas»'),
    ] }, 'platon');

  // ---------------------------------------------------------------- Helenismo
  add('helenismo', {
    id: 'epicteto', name: 'Epicteto', short: 'Epicteto', dates: 'c. 50 – 135', epithet: 'El esclavo que enseñó a ser libre',
    look: lk(0xb8a888, 0x5a4a3a, 0xc49372, 0x6a5a4a, { beard: 0x6a5a4a, acc: 'staff' }), prop: 'scales',
    intro: 'Nací esclavo, y cojo. Pero nadie, ni mi amo, pudo quitarme lo único que de verdad es mío: lo que pienso y cómo respondo. ¿Sabes distinguir lo que depende de ti?',
    defeat: 'Has aprendido la gran lección estoica: ocúpate de lo que depende de ti y suelta con calma lo que no.',
    concept: { name: 'Lo que depende de mí', text: 'Epicteto fue esclavo en Roma antes de ser un gran maestro estoico. Su enseñanza central divide la vida en dos: lo que depende de nosotros (nuestros juicios, deseos y acciones) y lo que no (el cuerpo, la fama, lo que hacen los demás). Sufrimos, decía, no por las cosas, sino por las opiniones que tenemos sobre ellas. Su discípulo Arriano recogió sus lecciones en el «Enquiridión», un manual de bolsillo que leyó Marco Aurelio y que hoy inspira a la psicología cognitiva.' },
    q: [
      Q('¿Cuál es la enseñanza central de Epicteto?', 'Distinguir lo que depende de nosotros de lo que no', 'Ocúpate de tus juicios y acciones; acepta lo demás.', 'Buscar siempre el placer', 'Dudar de todo', 'Obedecer siempre al más fuerte'),
      Q('¿Cuál era la condición de Epicteto en su juventud?', 'Era esclavo', 'Fue esclavo en Roma y después hombre libre y maestro.', 'Era emperador', 'Era general', 'Era un rico mercader'),
      Q('Según Epicteto, ¿qué nos hace sufrir?', 'No las cosas, sino las opiniones que tenemos sobre ellas', 'Cambiar el juicio cambia la emoción.', 'Solo el dolor físico', 'Los dioses', 'La mala suerte'),
      Q('¿Cómo se llama el manual que reúne sus enseñanzas?', 'Enquiridión', 'Significa «lo que se tiene a mano»: un manual de bolsillo.', 'La República', 'El Príncipe', 'Meditaciones'),
      Q('¿Qué emperador filósofo admiró y leyó a Epicteto?', 'Marco Aurelio', 'Lo cita con gratitud en sus Meditaciones.', 'Nerón', 'Julio César', 'Augusto'),
      Q('¿Qué disciplina actual se inspira en Epicteto?', 'La psicología cognitiva', 'Trabaja con la idea de que nuestros pensamientos influyen en nuestras emociones.', 'La astronomía', 'La química', 'La arquitectura'),
    ] }, 'hipatia');

  // ---------------------------------------------------------------- Medieval
  add('medieval', {
    id: 'dante', name: 'Dante Alighieri', short: 'Dante', dates: '1265 – 1321', epithet: 'El poeta que viajó al más allá',
    look: lk(0xb83a3a, 0x6a1a1a, 0xd8b08a, 0x2a1a10, { hat: 'hood', acc: 'book' }), prop: 'lectern',
    intro: 'A mitad del camino de la vida me encontré en una selva oscura. Para salir tuve que atravesar el infierno, el purgatorio y el paraíso. ¿Te atreves a acompañarme?',
    defeat: 'Has cruzado la selva oscura. Recuerda: hasta en el peor lugar se puede encontrar el camino hacia las estrellas.',
    concept: { name: 'La Divina Comedia', text: 'Dante Alighieri, poeta de Florencia, escribió la «Divina Comedia», un largo poema en el que viaja por el Infierno, el Purgatorio y el Paraíso, guiado primero por el poeta Virgilio y después por su amada Beatriz. En cada lugar encuentra almas que muestran las consecuencias de nuestras decisiones. Escribió en italiano, la lengua del pueblo, y no en latín, por eso se le considera padre de la lengua italiana. Sufrió el destierro de su ciudad y murió lejos de ella.' },
    q: [
      Q('¿Cuál es la gran obra de Dante?', 'La Divina Comedia', 'Un viaje en verso por el Infierno, el Purgatorio y el Paraíso.', 'El Quijote', 'La Odisea', 'El Decamerón'),
      Q('¿Quién guía a Dante por el Infierno y el Purgatorio?', 'El poeta romano Virgilio', 'Virgilio representa la razón humana.', 'Sócrates', 'Homero', 'Un ángel'),
      Q('¿Quién lo guía en el Paraíso?', 'Beatriz, su amada', 'Representa el amor y la fe.', 'Su madre', 'San Pedro', 'Virgilio'),
      Q('¿En qué idioma escribió Dante su gran poema?', 'En italiano, la lengua del pueblo', 'Por eso es considerado padre de la lengua italiana.', 'En latín', 'En griego', 'En francés'),
      Q('¿De qué ciudad era Dante, y qué le pasó?', 'De Florencia, de la que fue desterrado', 'Murió en Rávena sin poder volver.', 'De Roma, donde fue papa', 'De Venecia, donde fue rey', 'De Atenas, donde enseñó'),
      Q('¿Cómo empieza la Divina Comedia?', '«A mitad del camino de la vida me encontré en una selva oscura»', 'La selva oscura es el extravío del alma.', '«En un lugar de la Mancha…»', '«Canta, oh musa, la cólera de Aquiles»', '«Érase una vez…»'),
    ] }, 'ockham');

  // ---------------------------------------------------------------- Renacimiento
  add('renacimiento', {
    id: 'leonardo', name: 'Leonardo da Vinci', short: 'Leonardo', dates: '1452 – 1519', epithet: 'El genio curioso del Renacimiento',
    look: lk(0x8a5a3a, 0x4a2a1a, 0xd8b08a, 0xd8d0c0, { beard: 0xd8d0c0, hat: 'beret', acc: 'quill' }), prop: 'gears',
    intro: 'Pinté la Mona Lisa, pero también estudié el vuelo de los pájaros, el cuerpo humano y el agua de los ríos. Nunca dejes de preguntar por qué. ¿Qué te da curiosidad a ti?',
    defeat: 'Has mirado el mundo como Leonardo: con ojos de pintor y de científico a la vez. La curiosidad no tiene fronteras.',
    concept: { name: 'Saper vedere: saber ver', text: 'Leonardo da Vinci fue pintor, ingeniero, anatomista e inventor. Para él, todo conocimiento empieza por «saber ver»: observar la naturaleza con atención. Llenó miles de páginas de cuadernos, escritos al revés como en un espejo, con dibujos de máquinas voladoras, músculos, plantas y remolinos de agua. Pintó «La última cena» y «La Gioconda», y su «Hombre de Vitruvio» une arte y matemática. Es el modelo del espíritu renacentista: unir el arte, la ciencia y la técnica.' },
    q: [
      Q('¿Cuál de estas obras pintó Leonardo?', 'La Gioconda (Mona Lisa)', 'También pintó La última cena.', 'La noche estrellada', 'Las meninas', 'El grito'),
      Q('¿Cómo escribía Leonardo en sus cuadernos?', 'Al revés, como reflejado en un espejo', 'Escribía de derecha a izquierda; era zurdo.', 'Solo en griego', 'En código numérico', 'Nunca escribía'),
      Q('¿Qué estudió Leonardo además de pintar?', 'El vuelo de las aves, el cuerpo humano y el agua', 'Sus cuadernos están llenos de ciencia e inventos.', 'Solo música', 'Solo teología', 'Nada más'),
      Q('¿Qué famoso dibujo une las proporciones del cuerpo humano con la geometría?', 'El Hombre de Vitruvio', 'Un hombre inscrito en un círculo y un cuadrado.', 'La Gioconda', 'El David', 'La creación de Adán'),
      Q('¿Qué era para Leonardo el comienzo de todo conocimiento?', 'Saber ver: observar la naturaleza con atención', '«Saper vedere».', 'Leer a los antiguos', 'Obedecer a la Iglesia', 'Soñar'),
      Q('¿Qué inventos imaginó Leonardo siglos antes de que existieran?', 'Máquinas voladoras y un tipo de paracaídas', 'Muchos no se construyeron en su época.', 'El teléfono', 'La computadora', 'La imprenta'),
    ] }, 'pico');
  add('renacimiento', {
    id: 'copernico', name: 'Nicolás Copérnico', short: 'Copérnico', dates: '1473 – 1543', epithet: 'El que puso al Sol en el centro',
    look: lk(0x3a3a5a, 0x1a1a2a, 0xd8b08a, 0x4a2a1a, { hat: 'longhair', acc: 'book' }), prop: 'armillary',
    intro: 'Todos veían al Sol girar alrededor de la Tierra. Yo me atreví a pensar lo contrario: ¿y si somos nosotros los que giramos? A veces la verdad está al otro lado de lo evidente.',
    defeat: 'Has dado un giro copernicano: cambiar el punto de vista puede ordenar de pronto lo que parecía un caos.',
    concept: { name: 'El giro copernicano', text: 'Nicolás Copérnico, astrónomo polaco, propuso en «Sobre las revoluciones de las esferas celestes» (1543) que el Sol, y no la Tierra, está en el centro, y que la Tierra gira sobre sí misma cada día y alrededor del Sol cada año. Así explicaba de forma más sencilla los movimientos de los planetas. Su teoría heliocéntrica abrió el camino a Kepler, Galileo y Newton. Hoy hablamos de un «giro copernicano» cuando un cambio de perspectiva transforma por completo nuestra manera de entender algo.' },
    q: [
      Q('¿Qué propuso Copérnico?', 'Que el Sol está en el centro y la Tierra gira a su alrededor', 'La teoría heliocéntrica.', 'Que la Tierra es plana', 'Que la Luna es el centro', 'Que las estrellas no existen'),
      Q('¿Cómo se llama la teoría que pone al Sol en el centro?', 'Heliocentrismo', 'Helios significa Sol en griego.', 'Geocentrismo', 'Atomismo', 'Estoicismo'),
      Q('¿De dónde era Copérnico?', 'De Polonia', 'Trabajó en Frombork, junto al mar Báltico.', 'De Italia', 'De Grecia', 'De Egipto'),
      Q('¿Qué movimiento de la Tierra explica el día y la noche, según Copérnico?', 'La rotación sobre sí misma', 'Una vuelta completa cada día.', 'El movimiento del Sol', 'La traslación', 'Ninguno'),
      Q('¿Qué científicos continuaron la idea de Copérnico?', 'Kepler, Galileo y Newton', 'Juntos fundaron la astronomía moderna.', 'Platón y Aristóteles', 'Tales y Pitágoras', 'Agustín y Tomás'),
      Q('¿Qué significa hoy un «giro copernicano»?', 'Un cambio de perspectiva que lo transforma todo', 'Kant usó la expresión para su propia filosofía.', 'Un baile antiguo', 'Un error de cálculo', 'Un tipo de reloj'),
    ] }, 'maquiavelo');

  // ---------------------------------------------------------------- Siglo XIX
  add('xix', {
    id: 'thoreau', name: 'Henry David Thoreau', short: 'Thoreau', dates: '1817 – 1862', epithet: 'El que se fue al bosque a vivir de verdad',
    look: lk(0x5a6a3a, 0x3a4a2a, 0xd8b08a, 0x4a3a2a, { beard: 0x4a3a2a, hat: 'cap', acc: 'book' }), prop: 'tree',
    intro: 'Me fui al bosque porque quería vivir deliberadamente, enfrentar solo los hechos esenciales de la vida, y no descubrir, al morir, que no había vivido. ¿Qué te sobra a ti?',
    defeat: 'Has simplificado, como en Walden. Vive con menos cosas y más atención, y escucha tu conciencia aunque vaya contra la corriente.',
    concept: { name: 'Vida sencilla y desobediencia civil', text: 'Henry David Thoreau vivió dos años en una cabaña que construyó junto al lago Walden, en Estados Unidos, para comprobar con qué poco se puede vivir bien. Lo contó en «Walden», un libro sobre la sencillez y la naturaleza. Se negó a pagar un impuesto que financiaba la esclavitud y una guerra injusta, y pasó una noche en la cárcel. De esa experiencia nació su ensayo «La desobediencia civil», que inspiró a Gandhi y a Martin Luther King: ante una ley injusta, la conciencia está primero.' },
    q: [
      Q('¿Dónde vivió Thoreau dos años para experimentar una vida sencilla?', 'En una cabaña junto al lago Walden', 'La construyó con sus propias manos.', 'En un palacio de París', 'En un barco', 'En una ciudad industrial'),
      Q('¿Qué defendió Thoreau en «La desobediencia civil»?', 'Que la conciencia está antes que una ley injusta', 'Se puede resistir sin violencia.', 'Que hay que obedecer siempre', 'Que la guerra es buena', 'Que no existen leyes injustas'),
      Q('¿Por qué Thoreau pasó una noche en la cárcel?', 'Por negarse a pagar un impuesto que apoyaba la esclavitud y una guerra', 'Una protesta pacífica.', 'Por robar', 'Por pelear', 'Por escribir poesía'),
      Q('¿Qué líderes se inspiraron en Thoreau?', 'Gandhi y Martin Luther King', 'Ambos lucharon con resistencia no violenta.', 'Napoleón y César', 'Platón y Aristóteles', 'Ninguno'),
      Q('¿Cómo se llama su libro sobre la vida en el bosque?', 'Walden', 'Por el nombre del lago.', 'Moby Dick', 'Así habló Zaratustra', 'El contrato social'),
      Q('¿Qué buscaba Thoreau al vivir en el bosque?', 'Vivir deliberadamente, solo con lo esencial', 'Para no descubrir al morir que no había vivido.', 'Hacerse rico', 'Esconderse de la policía', 'Fundar una ciudad'),
    ] }, 'marx');

  // ---------------------------------------------------------------- Contemporánea
  add('contemporanea', {
    id: 'frankl', name: 'Viktor Frankl', short: 'Frankl', dates: '1905 – 1997', epithet: 'El médico que encontró sentido en el horror',
    look: lk(0x4a4a4a, 0x2a2a2a, 0xe0c0a0, 0x3a3a3a, { hat: 'none', acc: 'book' }), prop: 'lens',
    intro: 'Sobreviví a los campos de concentración. Allí aprendí que a un ser humano se le puede quitar todo, menos una cosa: la libertad de elegir su actitud. ¿Para qué vives tú?',
    defeat: 'Has encontrado un para qué. Quien tiene un porqué para vivir puede soportar casi cualquier cómo.',
    concept: { name: 'La búsqueda de sentido', text: 'Viktor Frankl fue un médico y psiquiatra de Viena. Durante la Segunda Guerra Mundial fue prisionero en campos de concentración nazis, donde murieron sus padres y su esposa. Observó que quienes tenían algo por qué vivir, una persona amada o una tarea pendiente, resistían mejor. En «El hombre en busca de sentido» explica que la principal motivación humana es encontrar sentido: en lo que hacemos, en lo que amamos y en la actitud con que enfrentamos el sufrimiento. Fundó la logoterapia.' },
    q: [
      Q('¿Qué libro famoso escribió Viktor Frankl?', 'El hombre en busca de sentido', 'Lo escribió tras sobrevivir a los campos nazis.', 'El ser y la nada', 'El segundo sexo', 'La náusea'),
      Q('Según Frankl, ¿qué no se le puede quitar a un ser humano?', 'La libertad de elegir su actitud', 'Ni en las peores condiciones.', 'Su dinero', 'Su casa', 'Su nombre'),
      Q('¿Cuál es, para Frankl, la principal motivación humana?', 'Encontrar sentido a la vida', 'Más que el placer o el poder.', 'Ganar dinero', 'Ser famoso', 'Dormir'),
      Q('¿Cómo se llama la terapia que fundó Frankl?', 'Logoterapia', 'Terapia a través del sentido (logos).', 'Psicoanálisis', 'Hipnosis', 'Fisioterapia'),
      Q('¿Dónde encontramos sentido, según Frankl?', 'En lo que hacemos, en lo que amamos y en la actitud ante el sufrimiento', 'Tres caminos hacia el sentido.', 'Solo en el trabajo', 'Solo en el dinero', 'En ningún lugar'),
      Q('¿Qué frase de Nietzsche citaba Frankl?', '«Quien tiene un porqué para vivir puede soportar casi cualquier cómo»', 'El sentido da fuerza para resistir.', '«Dios ha muerto»', '«Pienso, luego existo»', '«Solo sé que no sé nada»'),
    ] }, 'sartre');

  // ---------------------------------------------------------------- América Latina
  add('latinoamerica', {
    id: 'paz', name: 'Octavio Paz', short: 'Octavio Paz', dates: '1914 – 1998', epithet: 'El poeta que buscó el rostro de México',
    look: lk(0x3a4a5a, 0x1a2a3a, 0xd8b08a, 0xd8d8d8, { hat: 'none', acc: 'book' }), prop: 'lectern',
    intro: 'Soy de México, y me pregunté toda la vida quiénes somos detrás de nuestras máscaras. La poesía es una forma de preguntar. ¿Qué máscara llevas tú?',
    defeat: 'Has mirado detrás de la máscara. La soledad no es solo tristeza: también es el lugar donde empezamos a buscar al otro.',
    concept: { name: 'El laberinto de la soledad', text: 'Octavio Paz fue poeta, ensayista y diplomático mexicano, y recibió el Premio Nobel de Literatura en 1990. En «El laberinto de la soledad» (1950) reflexiona sobre la identidad mexicana: las máscaras con que nos protegemos, la fiesta, la relación con la muerte y la historia de la Conquista. Pensaba que la soledad es la condición de todo ser humano, pero también el impulso que nos lleva a buscar la comunión con los demás. Su poema «Piedra de sol» es circular, como el calendario azteca.' },
    q: [
      Q('¿Qué ensayo famoso escribió Octavio Paz sobre la identidad mexicana?', 'El laberinto de la soledad', 'Publicado en 1950.', 'Nuestra América', 'Cien años de soledad', 'Ariel'),
      Q('¿Qué premio recibió Octavio Paz en 1990?', 'El Premio Nobel de Literatura', 'Fue el primer mexicano en recibirlo.', 'El Premio Nobel de Física', 'Un Óscar', 'Ninguno'),
      Q('¿De qué país era Octavio Paz?', 'De México', 'Nació en la Ciudad de México.', 'De Chile', 'De Argentina', 'De España'),
      Q('Según Paz, ¿con qué nos protegemos los seres humanos?', 'Con máscaras', 'Ocultamos lo que somos para defendernos.', 'Con escudos', 'Con dinero', 'Con leyes'),
      Q('¿Qué forma tiene su poema «Piedra de sol»?', 'Circular, como el calendario azteca', 'Termina con los mismos versos con que empieza.', 'Cuadrada', 'Es un soneto', 'No tiene forma'),
      Q('Para Paz, ¿qué es la soledad?', 'La condición humana, y el impulso que nos lleva a buscar a los otros', 'Soledad y comunión van juntas.', 'Un castigo', 'Un error', 'Algo que solo sienten los mexicanos'),
    ] }, 'castellanos');

  // ---------------------------------------------------------------- China
  add('china', {
    id: 'mozi', name: 'Mozi', short: 'Mozi', dates: 'c. 470 – 391 a. C.', epithet: 'El maestro del amor universal',
    look: lk(0x6a5a4a, 0x3a3a2a, 0xe0c090, 0x1a1a1a, { beard: 0x1a1a1a, hat: 'cap', acc: 'staff' }), prop: 'tower',
    intro: 'Si todos amaran a los demás como a sí mismos, ¿habría guerras? ¿Habría robos? Yo enseñé a cuidar a todos por igual, no solo a los nuestros.',
    defeat: 'Has pensado como Mozi: el bien de todos es el mejor criterio para decidir. Y la guerra de conquista nunca es buena.',
    concept: { name: 'El amor universal', text: 'Mozi fue un pensador chino que criticó a los seguidores de Confucio por dar demasiada importancia a los ritos y a la familia propia. Propuso el «amor universal» (jian ai): preocuparse por todos por igual, porque los conflictos nacen de amar solo a los nuestros. Juzgaba las acciones por sus consecuencias para el pueblo: ¿lo enriquecen, lo protegen, lo alimentan? Se opuso a las guerras de conquista, y sus discípulos eran expertos en fortificaciones para defender ciudades atacadas.' },
    q: [
      Q('¿Qué propuso Mozi?', 'El amor universal: cuidar a todos por igual', 'En chino, jian ai.', 'Amar solo a la propia familia', 'Obedecer los ritos sin pensar', 'Conquistar a los vecinos'),
      Q('¿Qué criticaba Mozi de los seguidores de Confucio?', 'Su exceso de ritos y su amor solo a los cercanos', 'Mozi quería un amor que incluyera a todos.', 'Que leían poco', 'Que no amaban a sus padres', 'Que eran pobres'),
      Q('¿Cómo juzgaba Mozi si una acción era buena?', 'Por sus consecuencias para el bienestar del pueblo', 'Una idea parecida, siglos antes, a la de Mill.', 'Por su belleza', 'Por quién la hacía', 'Por la tradición'),
      Q('¿Qué opinaba Mozi de la guerra de conquista?', 'Que es un gran crimen', 'Matar a uno es un crimen; ¿por qué conquistar a miles sería glorioso?', 'Que es heroica', 'Que es necesaria', 'Que no importa'),
      Q('¿En qué eran expertos los discípulos de Mozi?', 'En defender ciudades atacadas', 'Ayudaban a los débiles a resistir.', 'En atacar ciudades', 'En la poesía', 'En el comercio de seda'),
      Q('¿Según Mozi, de dónde nacen los conflictos?', 'De amar solo a los nuestros y no a los demás', 'La parcialidad divide a la gente.', 'Del clima', 'De los dioses', 'De la música'),
    ] }, 'banzhao');
  add('china', {
    id: 'mencio', name: 'Mencio (Mengzi)', short: 'Mencio', dates: '372 – 289 a. C.', epithet: 'El que creyó en la bondad humana',
    look: lk(0x8a3a2a, 0x4a1a1a, 0xe0c090, 0x2a2a2a, { beard: 0x4a4a4a, hat: 'cap', acc: 'scroll' }), prop: 'flower',
    intro: 'Si ves a un niño a punto de caer a un pozo, sientes de inmediato el impulso de salvarlo. No lo piensas: te nace. Esa es la semilla de la bondad que todos llevamos dentro.',
    defeat: 'Has cuidado tu semilla de bondad. Como un brote, crece si la riegas y se seca si la descuidas.',
    concept: { name: 'Las semillas de la bondad', text: 'Mencio fue el gran continuador de Confucio. Defendió que la naturaleza humana es buena: todos tenemos cuatro «brotes» o semillas, la compasión, la vergüenza ante el mal, el respeto y el sentido de lo justo. La educación y la sociedad deben cultivarlas como un jardinero cuida una planta. Su ejemplo famoso es el del niño que va a caer a un pozo: cualquiera siente el impulso de salvarlo. También enseñó que si un gobernante oprime al pueblo, pierde el «mandato del cielo» y el pueblo puede rebelarse.' },
    q: [
      Q('¿Qué pensaba Mencio de la naturaleza humana?', 'Que es buena y tiene semillas de bondad', 'Hay que cultivarlas como plantas.', 'Que es mala', 'Que no existe', 'Que solo los reyes son buenos'),
      Q('¿Qué ejemplo usaba Mencio para mostrar nuestra bondad natural?', 'Un niño a punto de caer a un pozo', 'Todos sentimos el impulso de salvarlo.', 'Un ladrón en la noche', 'Un rey en su trono', 'Un río desbordado'),
      Q('¿De qué gran maestro fue continuador Mencio?', 'De Confucio', 'Se le llama «el segundo sabio».', 'De Laozi', 'De Buda', 'De Sócrates'),
      Q('¿Cuántos «brotes» de bondad tenemos, según Mencio?', 'Cuatro: compasión, vergüenza, respeto y sentido de lo justo', 'Son las semillas de las virtudes.', 'Uno', 'Diez', 'Ninguno'),
      Q('¿Qué pasa, según Mencio, con un gobernante que oprime al pueblo?', 'Pierde el mandato del cielo y el pueblo puede rebelarse', 'El poder se justifica por el bien del pueblo.', 'Debe ser obedecido siempre', 'Se vuelve dios', 'Nada'),
      Q('¿Qué hacen la educación y la sociedad con nuestras semillas de bondad?', 'Las cultivan para que crezcan', 'Como un jardinero con sus plantas.', 'Las destruyen', 'Las venden', 'Las esconden'),
    ] }, 'banzhao');

  // ---------------------------------------------------------------- India
  add('india', {
    id: 'aryabhata', name: 'Aryabhata', short: 'Aryabhata', dates: '476 – 550', epithet: 'El astrónomo que midió el cielo',
    look: lk(0xe8a040, 0xb86a2a, 0xa0704a, 0x1a1410, { beard: 0x1a1410, hat: 'none', acc: 'scroll' }), prop: 'stars',
    intro: 'Desde la orilla del río veo cómo las estrellas parecen moverse hacia el oeste. Pero, como el barquero que ve pasar los árboles, soy yo el que se mueve: la Tierra gira.',
    defeat: 'Has calculado como Aryabhata: con paciencia y números se pueden entender los cielos.',
    concept: { name: 'Números para entender el cielo', text: 'Aryabhata fue un matemático y astrónomo de la India. En su libro «Aryabhatiya», escrito en verso cuando tenía veintitrés años, calculó el valor de pi con gran precisión, explicó que la Tierra gira sobre su eje y que los eclipses ocurren por la sombra de la Tierra o de la Luna, y no por un demonio que se traga al Sol. Usó un sistema de numeración posicional, base de los números que usamos hoy. Un satélite indio lleva su nombre.' },
    q: [
      Q('¿Qué explicó Aryabhata sobre el movimiento del cielo?', 'Que la Tierra gira sobre su eje', 'Mil años antes que Copérnico en Europa.', 'Que el cielo es de cristal', 'Que el Sol no se mueve nunca', 'Que las estrellas son lámparas'),
      Q('¿Cómo explicó Aryabhata los eclipses?', 'Por la sombra de la Tierra o de la Luna', 'Y no por un demonio que se traga al Sol.', 'Por un demonio que se come el Sol', 'Por la ira de los dioses', 'Por las nubes'),
      Q('¿Qué número famoso calculó con gran precisión?', 'Pi', 'La relación entre la circunferencia y el diámetro.', 'El cero', 'El mil', 'El siete'),
      Q('¿Cómo se llama su libro, escrito en verso?', 'Aryabhatiya', 'Lo escribió con solo veintitrés años.', 'Upanishad', 'Ramayana', 'Elementos'),
      Q('¿Qué comparación usó para explicar que la Tierra gira?', 'La del barquero que ve pasar los árboles como si se movieran', 'El movimiento aparente engaña.', 'La de una rueda de carro', 'La de un trompo', 'La de un pájaro'),
      Q('¿Qué lleva hoy el nombre de Aryabhata?', 'El primer satélite artificial de la India', 'Lanzado en 1975.', 'Un río', 'Una montaña', 'Un barco pirata'),
    ] });

  // ---------------------------------------------------------------- Islam clásico
  add('islam', {
    id: 'aljuarismi', name: 'Al-Juarismi', short: 'Al-Juarismi', dates: 'c. 780 – 850', epithet: 'El padre del álgebra',
    look: lk(0x2a6a5a, 0x1a3a3a, 0xc49372, 0x1a1410, { beard: 0x1a1410, hat: 'turban', acc: 'book' }), prop: 'chalkboard',
    intro: 'En la Casa de la Sabiduría de Bagdad aprendí los números de la India y escribí cómo resolver problemas paso a paso. Cada vez que usas un algoritmo, dices mi nombre.',
    defeat: 'Has resuelto la ecuación. Paso a paso, con orden, todo problema se vuelve más pequeño.',
    concept: { name: 'Álgebra y algoritmos', text: 'Muhammad ibn Musa al-Juarismi trabajó en la Casa de la Sabiduría de Bagdad. Su libro sobre «al-jabr», el arte de completar y equilibrar ecuaciones, dio nombre al álgebra. Otro libro suyo explicó el sistema de numeración de la India, con el cero y las cifras que hoy llamamos arábigas, y así llegaron a Europa. Su propio nombre, latinizado como «Algoritmi», dio origen a la palabra algoritmo: una serie ordenada de pasos para resolver un problema, como las que siguen hoy las computadoras.' },
    q: [
      Q('¿Qué palabra viene del nombre de Al-Juarismi?', 'Algoritmo', 'Su nombre en latín era Algoritmi.', 'Alquimia', 'Almohada', 'Alfabeto'),
      Q('¿Qué rama de las matemáticas toma su nombre de un libro suyo?', 'El álgebra', 'De «al-jabr»: completar y equilibrar.', 'La geometría', 'La estadística', 'El cálculo'),
      Q('¿Dónde trabajó Al-Juarismi?', 'En la Casa de la Sabiduría de Bagdad', 'El gran centro de saber del islam clásico.', 'En la Academia de Atenas', 'En la Biblioteca de Alejandría', 'En París'),
      Q('¿Qué números ayudó a difundir hacia Europa?', 'Las cifras de la India con el cero, que llamamos arábigas', 'Las que usamos hoy: 0, 1, 2, 3…', 'Los números romanos', 'Los números mayas', 'Los números chinos'),
      Q('¿Qué es un algoritmo?', 'Una serie ordenada de pasos para resolver un problema', 'Las computadoras funcionan con algoritmos.', 'Un tipo de poema', 'Un instrumento musical', 'Una enfermedad'),
      Q('¿Qué significa «al-jabr»?', 'Completar o restaurar, equilibrando una ecuación', 'Como pasar términos de un lado a otro.', 'Estrella brillante', 'Libro sagrado', 'Ciudad grande'),
    ] }, 'alfarabi');
  add('islam', {
    id: 'alhacen', name: 'Ibn al-Haytham (Alhacén)', short: 'Alhacén', dates: '965 – 1040', epithet: 'El padre de la óptica y del método científico',
    look: lk(0xe8e0d0, 0x8a6a2a, 0xc49372, 0x6a6a6a, { beard: 0x6a6a6a, hat: 'turban', acc: 'lens' }), prop: 'lens',
    intro: 'Los antiguos decían que de los ojos salen rayos que tocan las cosas. Yo me encerré en un cuarto oscuro, abrí un agujerito y vi la luz entrar. No me creas a mí: compruébalo tú.',
    defeat: 'Has pensado como un científico: no aceptes una idea por quién la dice, sino por lo que muestran los experimentos.',
    concept: { name: 'La luz y la prueba', text: 'Ibn al-Haytham, conocido en Europa como Alhacén, nació en Basora y trabajó en El Cairo. En su «Libro de la óptica» demostró que vemos porque la luz entra en el ojo desde los objetos, y no porque el ojo lance rayos. Estudió la cámara oscura, la reflexión y la refracción. Insistía en comprobar todo con experimentos y en desconfiar incluso de los sabios antiguos: «el buscador de la verdad no es quien estudia a los antiguos y confía en ellos, sino quien sospecha de su fe en ellos». Por eso se le considera un pionero del método científico.' },
    q: [
      Q('¿Qué demostró Alhacén sobre la visión?', 'Que vemos porque la luz entra en el ojo desde los objetos', 'Y no porque el ojo lance rayos.', 'Que los ojos lanzan rayos', 'Que vemos con el cerebro sin luz', 'Que la luz no existe'),
      Q('¿Qué instrumento estudió Alhacén, antecesor de la cámara de fotos?', 'La cámara oscura', 'Un cuarto oscuro con un agujerito proyecta la imagen invertida.', 'El telescopio', 'El microscopio', 'El reloj de arena'),
      Q('¿Por qué se considera a Alhacén pionero del método científico?', 'Porque exigía comprobar las ideas con experimentos', 'Y dudar incluso de los sabios antiguos.', 'Porque inventó la imprenta', 'Porque nunca dudaba', 'Porque solo leía libros antiguos'),
      Q('¿Cómo se llama su obra principal?', 'Libro de la óptica', 'En árabe, Kitab al-Manazir.', 'El canon de medicina', 'Las mil y una noches', 'La ciudad virtuosa'),
      Q('¿En qué ciudad nació Alhacén?', 'En Basora', 'Después trabajó en El Cairo.', 'En Córdoba', 'En Roma', 'En Delhi'),
      Q('¿Qué consejo daba Alhacén al buscador de la verdad?', 'Sospechar incluso de los sabios en que confía', 'La verdad se busca con pruebas, no con autoridades.', 'Creer todo lo que dicen los antiguos', 'No leer nunca', 'Obedecer al califa'),
    ] });

  // ---------------------------------------------------------------- África
  add('africa', {
    id: 'ibnjaldun', name: 'Ibn Jaldún', short: 'Ibn Jaldún', dates: '1332 – 1406', epithet: 'El que descubrió las leyes de la historia',
    look: lk(0xe8e0d0, 0x3a5a2a, 0xa0704a, 0x3a3a3a, { beard: 0x5a5a5a, hat: 'turban', acc: 'book' }), prop: 'city',
    intro: 'Nací en Túnez y vi caer reinos enteros. Me pregunté: ¿por qué los imperios nacen fuertes, se vuelven ricos y luego se derrumban? La historia no es un cuento: tiene leyes.',
    defeat: 'Has leído la historia como Ibn Jaldún: buscando causas, y no solo fechas. La unión de un grupo es su mayor fuerza.',
    concept: { name: 'La asabiyya y los ciclos de la historia', text: 'Ibn Jaldún, nacido en Túnez, fue historiador, juez y diplomático en el norte de África y en Al-Ándalus. En la «Muqaddima» (Introducción) buscó las causas de los hechos históricos: el clima, la economía, la vida en el desierto o en la ciudad. Su idea central es la «asabiyya», la solidaridad que une a un grupo: los pueblos unidos conquistan, se instalan en las ciudades, se acostumbran al lujo, pierden la unión y caen ante otros más cohesionados. Se le considera un precursor de la sociología y de la historia científica.' },
    q: [
      Q('¿Qué es la «asabiyya», según Ibn Jaldún?', 'La solidaridad y unión que da fuerza a un grupo', 'Cuando se pierde, el grupo cae.', 'Un tipo de impuesto', 'Una enfermedad', 'Un instrumento musical'),
      Q('¿De qué ciudad era Ibn Jaldún?', 'De Túnez', 'En el norte de África.', 'De Bagdad', 'De Roma', 'De Tombuctú'),
      Q('¿Cómo se llama su gran obra?', 'Muqaddima (Introducción)', 'Introducción a una historia universal.', 'El Corán', 'La Ilíada', 'El arte de la guerra'),
      Q('Según Ibn Jaldún, ¿por qué caen los imperios?', 'Porque el lujo debilita la unión que los hizo fuertes', 'La historia avanza en ciclos.', 'Por casualidad', 'Por castigo de las estrellas', 'Nunca caen'),
      Q('¿De qué ciencia actual se considera precursor a Ibn Jaldún?', 'De la sociología', 'Estudió la sociedad y sus leyes.', 'De la astronomía', 'De la química', 'De la informática'),
      Q('¿Qué buscaba Ibn Jaldún en la historia?', 'Las causas de los hechos, y no solo contarlos', 'El clima, la economía, la forma de vida.', 'Solo fechas', 'Solo leyendas', 'Nada'),
    ] }, 'zerayacob');
  add('africa', {
    id: 'mandela', name: 'Nelson Mandela', short: 'Mandela', dates: '1918 – 2013', epithet: 'El preso que eligió el perdón',
    look: lk(0xd8a040, 0x8a5a1a, 0x5a3820, 0xd8d8d8, { hat: 'none', acc: 'none' }), prop: 'podium',
    intro: 'Pasé veintisiete años en prisión por luchar contra el apartheid. Cuando salí, podía elegir la venganza. Elegí la reconciliación. ¿Qué habrías hecho tú?',
    defeat: 'Has elegido como Mandela: el resentimiento es como beber veneno y esperar que muera tu enemigo. La paz se construye con valentía.',
    concept: { name: 'Reconciliación y ubuntu', text: 'Nelson Mandela luchó contra el apartheid, el sistema que separaba y oprimía a las personas negras en Sudáfrica. Pasó veintisiete años en prisión, buena parte en la isla de Robben. Al salir, en 1990, no buscó la venganza, sino la reconciliación entre todos los sudafricanos, y en 1994 fue elegido el primer presidente negro del país. Recibió el Premio Nobel de la Paz junto a Frederik de Klerk. Su vida encarna el ubuntu africano: «soy porque somos». Decía que la educación es el arma más poderosa para cambiar el mundo.' },
    q: [
      Q('¿Contra qué sistema luchó Mandela?', 'El apartheid, que separaba y oprimía a las personas negras', 'En Sudáfrica.', 'La monarquía inglesa', 'La esclavitud en Brasil', 'El Imperio romano'),
      Q('¿Cuántos años pasó Mandela en prisión?', 'Veintisiete', 'De 1962 a 1990.', 'Dos', 'Cincuenta', 'Ninguno'),
      Q('¿Qué eligió Mandela al salir de prisión?', 'La reconciliación en vez de la venganza', 'Para construir una Sudáfrica de todos.', 'Vengarse de sus carceleros', 'Irse del país', 'Retirarse de la política'),
      Q('¿Qué cargo ocupó Mandela en 1994?', 'Presidente de Sudáfrica', 'El primero elegido en elecciones con todos los ciudadanos.', 'Rey', 'Papa', 'General del ejército'),
      Q('¿Qué dijo Mandela sobre la educación?', 'Que es el arma más poderosa para cambiar el mundo', 'Estudió Derecho incluso en prisión.', 'Que no sirve para nada', 'Que solo es para ricos', 'Que es peligrosa'),
      Q('¿Qué significa la palabra africana «ubuntu»?', '«Soy porque somos»', 'Nadie es humano solo.', '«Sálvese quien pueda»', '«El más fuerte gana»', '«Hoy no»'),
    ] }, 'maathai');

  // ---------------------------------------------------------------- Poetas
  add('poetas', {
    id: 'dickinson', name: 'Emily Dickinson', short: 'Dickinson', dates: '1830 – 1886', epithet: 'La poeta que vio el universo desde su ventana',
    look: lk(0xe8e8f0, 0x3a3a5a, 0xf0d0b0, 0x5a2a1a, { hat: 'none', acc: 'book' }), prop: 'flower',
    intro: 'Casi no salí de mi casa en Amherst. Y sin embargo, desde mi jardín y mi ventana, escribí sobre la eternidad, la muerte y un pájaro llamado esperanza. ¿Cuánto mundo cabe en tu habitación?',
    defeat: 'Has descubierto que no hace falta viajar lejos para ver hondo. La esperanza es la cosa con plumas que canta sin parar.',
    concept: { name: 'La esperanza es la cosa con plumas', text: 'Emily Dickinson vivió casi toda su vida en la casa familiar de Amherst, en Estados Unidos. Escribió casi mil ochocientos poemas, breves e intensos, llenos de guiones y mayúsculas inesperadas, pero publicó muy pocos en vida. Tras su muerte, su hermana encontró los cuadernillos cosidos a mano y el mundo descubrió a una de las mayores poetas de la lengua inglesa. Escribió sobre la naturaleza, la muerte, la eternidad y la vida interior: «La esperanza es la cosa con plumas que se posa en el alma».' },
    q: [
      Q('¿Dónde vivió Emily Dickinson casi toda su vida?', 'En la casa familiar de Amherst', 'Desde allí escribió sobre el universo.', 'En París', 'En un barco', 'En Londres'),
      Q('¿Cuántos poemas escribió Dickinson, aproximadamente?', 'Casi mil ochocientos', 'Publicó muy pocos en vida.', 'Diez', 'Cien', 'Ninguno'),
      Q('¿Quién descubrió sus poemas después de su muerte?', 'Su hermana', 'Encontró los cuadernillos cosidos a mano.', 'Su perro', 'Un rey', 'Nadie'),
      Q('Según su poema famoso, ¿qué es «la cosa con plumas»?', 'La esperanza', 'Se posa en el alma y canta sin parar.', 'El miedo', 'Un ángel', 'La guerra'),
      Q('¿Qué rasgos tienen sus poemas?', 'Son breves, intensos y llenos de guiones', 'Un estilo inconfundible.', 'Son muy largos y épicos', 'Siempre riman igual', 'Están en latín'),
      Q('¿Sobre qué escribió Dickinson?', 'La naturaleza, la muerte, la eternidad y la vida interior', 'Grandes temas desde una vida pequeña.', 'Solo sobre guerras', 'Solo sobre dinero', 'Sobre deportes'),
    ] }, 'mistral');
  add('poetas', {
    id: 'tagore', name: 'Rabindranath Tagore', short: 'Tagore', dates: '1861 – 1941', epithet: 'El poeta que enseñaba bajo los árboles',
    look: lk(0xe8e0d0, 0x8a6a4a, 0xa0704a, 0xe8e8e8, { beard: 0xe8e8e8, hat: 'longhair', acc: 'book' }), prop: 'tree',
    intro: 'Fundé una escuela donde los niños aprendían al aire libre, bajo los árboles, con música y poesía. ¿No te parece que la naturaleza también enseña?',
    defeat: 'Has escuchado como Tagore: la verdadera educación despierta la libertad y la alegría, no solo la memoria.',
    concept: { name: 'Poesía, libertad y educación', text: 'Rabindranath Tagore, poeta, músico y pintor de Bengala, fue el primer no europeo en recibir el Premio Nobel de Literatura, en 1913, por «Gitanjali», un libro de cantos espirituales. Fundó en Santiniketan una escuela donde los niños aprendían al aire libre, en contacto con la naturaleza, el arte y otras culturas. Escribió los himnos nacionales de la India y de Bangladés. Defendió la libertad interior y la unión de Oriente y Occidente, y advirtió contra el nacionalismo que divide a los pueblos.' },
    q: [
      Q('¿Qué premio recibió Tagore en 1913?', 'El Nobel de Literatura', 'Fue el primer no europeo en recibirlo.', 'El Nobel de la Paz', 'Un Óscar', 'La Medalla Fields'),
      Q('¿Cómo era la escuela que fundó Tagore en Santiniketan?', 'Los niños aprendían al aire libre, bajo los árboles', 'Con naturaleza, música y arte.', 'Muy estricta y sin ventanas', 'Solo para adultos', 'Solo de matemáticas'),
      Q('¿Qué himnos nacionales escribió Tagore?', 'Los de la India y Bangladés', 'Un caso único en el mundo.', 'El de Inglaterra', 'El de Francia', 'Ninguno'),
      Q('¿Cómo se llama su libro de cantos más famoso?', 'Gitanjali', 'Significa «ofrenda de canciones».', 'Ramayana', 'Veinte poemas de amor', 'Hojas de hierba'),
      Q('¿De qué región de la India era Tagore?', 'De Bengala', 'Escribía en bengalí.', 'De Cachemira', 'Del Tíbet', 'De Ceilán'),
      Q('¿Qué advirtió Tagore sobre el nacionalismo?', 'Que puede dividir y enfrentar a los pueblos', 'Defendía la unión entre culturas.', 'Que es siempre bueno', 'Que es el único camino', 'Nada'),
    ] }, 'mistral');

  // ---------------------------------------------------------------- Ciencia
  add('ciencia', {
    id: 'newton', name: 'Isaac Newton', short: 'Newton', dates: '1643 – 1727', epithet: 'El que unió el cielo y la Tierra con una ley',
    look: lk(0x5a3a5a, 0x2a1a2a, 0xf0d0b0, 0xe8e8e8, { hat: 'wig', acc: 'book' }), prop: 'sphere',
    intro: 'Una manzana cae. La Luna no cae. ¿O sí? Descubrí que la misma fuerza que tira de la manzana mantiene a la Luna en su órbita. Si he visto más lejos, es porque me subí a hombros de gigantes.',
    defeat: 'Has unido lo que parecía separado. Una sola ley puede explicar la manzana y los planetas: esa es la belleza de la ciencia.',
    concept: { name: 'La gravitación universal', text: 'Isaac Newton publicó en 1687 los «Principios matemáticos de la filosofía natural». Allí formuló las tres leyes del movimiento y la ley de la gravitación universal: todos los cuerpos se atraen con una fuerza que depende de sus masas y de la distancia. Así explicó con las mismas matemáticas la caída de una manzana, las mareas y las órbitas de los planetas. También descompuso la luz blanca en los colores del arcoíris con un prisma y desarrolló el cálculo. Reconocía su deuda: «si he visto más lejos, es porque me subí a hombros de gigantes».' },
    q: [
      Q('¿Qué ley formuló Newton para explicar por qué caen las cosas y giran los planetas?', 'La ley de la gravitación universal', 'Todos los cuerpos se atraen.', 'La ley de la relatividad', 'La ley de la evolución', 'La ley de Murphy'),
      Q('¿Qué descubrió Newton con un prisma?', 'Que la luz blanca está formada por los colores del arcoíris', 'La descompuso y la volvió a unir.', 'Que la luz es negra', 'Que los colores no existen', 'Que el prisma da calor'),
      Q('¿Qué rama de las matemáticas desarrolló Newton?', 'El cálculo', 'Al mismo tiempo que Leibniz.', 'La geometría de Euclides', 'La aritmética', 'Los números romanos'),
      Q('¿Qué quiso decir con «subirse a hombros de gigantes»?', 'Que su ciencia se apoyaba en la de quienes vinieron antes', 'Como Copérnico, Kepler y Galileo.', 'Que era muy alto', 'Que conoció gigantes', 'Que trepaba árboles'),
      Q('¿Qué fenómeno de los océanos explicó Newton con la gravedad?', 'Las mareas', 'Por la atracción de la Luna y el Sol.', 'Las olas del viento', 'El color del mar', 'La sal del mar'),
      Q('¿Cómo se llama el libro donde Newton formuló sus leyes?', 'Principios matemáticos de la filosofía natural', 'Conocido como los «Principia», de 1687.', 'El origen de las especies', 'Diálogo sobre los dos sistemas', 'Elementos'),
    ] }, 'lovelace');
  add('ciencia', {
    id: 'darwin', name: 'Charles Darwin', short: 'Darwin', dates: '1809 – 1882', epithet: 'El viajero que explicó la evolución',
    look: lk(0x4a3a2a, 0x2a1a10, 0xf0d0b0, 0xe8e8e8, { beard: 0xe8e8e8, hat: 'bald', acc: 'book' }), prop: 'globe',
    intro: 'Di la vuelta al mundo en el barco Beagle. En las islas Galápagos vi pinzones con picos distintos en cada isla. ¿Por qué? Esa pregunta cambió mi vida y la de la ciencia.',
    defeat: 'Has observado como Darwin: con paciencia, los pequeños cambios a lo largo del tiempo explican la asombrosa variedad de la vida.',
    concept: { name: 'La evolución por selección natural', text: 'Charles Darwin viajó cinco años alrededor del mundo en el barco Beagle, también por las costas de Chile y Argentina y por las islas Galápagos. Observó que los seres vivos varían y que, en cada ambiente, los que tienen rasgos más favorables sobreviven y se reproducen más, transmitiendo esos rasgos. A lo largo de muchísimo tiempo, esa «selección natural» produce nuevas especies. Lo explicó en «El origen de las especies» (1859). Su teoría mostró que todos los seres vivos estamos emparentados en un gran árbol de la vida.' },
    q: [
      Q('¿Qué teoría propuso Darwin?', 'La evolución de las especies por selección natural', 'Los rasgos favorables se transmiten y se acumulan.', 'La gravitación universal', 'La relatividad', 'El heliocentrismo'),
      Q('¿Cómo se llamaba el barco en que Darwin dio la vuelta al mundo?', 'Beagle', 'El viaje duró cinco años.', 'Titanic', 'Santa María', 'Argo'),
      Q('¿Qué aves de las Galápagos le dieron pistas?', 'Los pinzones, con picos distintos en cada isla', 'Cada pico se adapta a un alimento.', 'Los pingüinos', 'Los loros', 'Las águilas'),
      Q('¿Cómo se llama su libro más famoso?', 'El origen de las especies', 'Publicado en 1859.', 'Principia', 'Walden', 'El capital'),
      Q('¿Qué países sudamericanos recorrió Darwin en su viaje?', 'Chile y Argentina, entre otros', 'Vivió un terremoto en Chile.', 'Ninguno', 'Solo Brasil', 'Solo México'),
      Q('¿Qué imagen usó Darwin para mostrar que los seres vivos están emparentados?', 'Un gran árbol de la vida', 'Todas las especies comparten ancestros.', 'Una escalera', 'Una pirámide', 'Un reloj'),
    ] }, 'lovelace');
}

Object.assign(LESSONS, {
  hipocrates: [
    'Soy Hipócrates, de la isla de Cos. Mi familia era de médicos, y yo recorrí Grecia curando enfermos y enseñando a mis discípulos.',
    'En mi tiempo, mucha gente pensaba que las enfermedades eran castigos de los dioses, y se curaban con amuletos. Yo pensé otra cosa: las enfermedades tienen causas naturales.',
    'Por eso enseñé a observar: el agua que bebe el enfermo, el aire que respira, lo que come, cómo duerme. Anotábamos todo, día tras día, para aprender de cada caso.',
    'Pedía a mis discípulos que juraran cuidar al enfermo, guardar sus secretos y, sobre todo, no hacerle daño. Ese juramento todavía inspira a los médicos de hoy.',
    'La vida es breve y el arte es largo: aprender a curar lleva toda una vida. Mi pregunta para ti: ¿qué hábito de tu día cuida tu salud, y cuál la daña?',
  ],
  epicteto: [
    'Soy Epicteto. Nací esclavo en Frigia y me llevaron a Roma. Mi nombre significa «adquirido», como se dice de una cosa comprada.',
    'Cojeaba de una pierna. Cuentan que mi amo me la torció, y yo le dije con calma: «Si sigues, la vas a romper». Y la rompió. «Te lo dije», respondí.',
    'Cuando fui libre, abrí una escuela. Enseñaba algo muy simple: hay cosas que dependen de ti, como tus juicios, tus deseos y tus actos; y cosas que no, como el cuerpo, la fama o lo que hacen los demás.',
    'No nos perturban las cosas, sino las opiniones que tenemos sobre ellas. Si alguien te insulta, no te hiere el insulto, sino tu juicio de que te ha herido.',
    'Ocúpate de lo tuyo y acepta lo demás con serenidad. Mi pregunta para ti: ¿qué te preocupa hoy que, en realidad, no depende de ti?',
  ],
  dante: [
    'Soy Dante Alighieri, de Florencia. Desde niño amé a una muchacha llamada Beatriz; la vi pocas veces, pero inspiró toda mi poesía.',
    'Participé en la política de mi ciudad y mis enemigos me desterraron. Nunca pude volver a Florencia. Lejos de casa escribí mi gran poema.',
    'En la Divina Comedia viajo por el Infierno, guiado por el poeta Virgilio. Cada alma recibe allí las consecuencias de lo que eligió en vida.',
    'Después subo la montaña del Purgatorio, donde las almas se purifican con esperanza, y llego al Paraíso guiado por Beatriz, hasta ver la luz que mueve el sol y las demás estrellas.',
    'Escribí en italiano, la lengua del pueblo, para que todos pudieran leerme. Mi pregunta para ti: ¿cuál ha sido tu «selva oscura», y quién te ayudó a salir?',
  ],
  leonardo: [
    'Soy Leonardo, del pueblo de Vinci, en Italia. Aprendí a pintar en el taller de un maestro de Florencia, mezclando colores y observando la luz.',
    'Pero no me bastaba con pintar. Quería saber cómo vuelan los pájaros, cómo se mueve el agua, cómo funcionan los músculos bajo la piel.',
    'Llené miles de páginas con dibujos y notas, escritas al revés, como en un espejo. Allí imaginé máquinas voladoras, puentes y paracaídas.',
    'Pinté La última cena y La Gioconda, con su sonrisa misteriosa. Para pintar bien un rostro, había que conocer la anatomía y la luz: arte y ciencia van juntos.',
    'Todo empieza por saber ver. Mi pregunta para ti: ¿qué cosa de todos los días podrías mirar como si fuera la primera vez?',
  ],
  copernico: [
    'Soy Nicolás Copérnico, de Polonia. Estudié en Italia matemáticas, medicina y derecho, pero lo que más amaba era mirar el cielo.',
    'Todos creían que la Tierra estaba quieta en el centro, y que el Sol, la Luna y los planetas giraban a su alrededor con movimientos muy complicados.',
    'Yo propuse algo más sencillo: el Sol en el centro, y la Tierra girando sobre sí misma cada día y alrededor del Sol cada año, como un planeta más.',
    'Tuve miedo de publicarlo. Mi libro salió en 1543, el año de mi muerte. Dicen que me lo pusieron en las manos en mi lecho final.',
    'A veces, para entender, hay que cambiar el punto de vista. Mi pregunta para ti: ¿qué problema tuyo se vería distinto si lo miraras desde otro lugar?',
  ],
  thoreau: [
    'Soy Henry David Thoreau, de Concord, en Estados Unidos. Fui maestro, agrimensor y fabricante de lápices, y sobre todo un gran caminante.',
    'Un día de 1845 me fui a vivir a una cabaña que construí junto al lago Walden. Quería saber con qué poco se puede vivir bien.',
    'Sembré frijoles, leí, escribí y observé las estaciones. Descubrí que la mayoría de la gente vive en una desesperación callada, trabajando para tener cosas que no necesita.',
    'Me negué a pagar un impuesto que financiaba la esclavitud y una guerra injusta, y pasé una noche en la cárcel. Escribí que la conciencia está antes que una ley injusta.',
    'Simplifica, simplifica. Mi pregunta para ti: ¿qué cosa podrías dejar de hacer o de tener para vivir con más atención?',
  ],
  frankl: [
    'Soy Viktor Frankl, médico y psiquiatra de Viena. Desde joven me interesó una pregunta: ¿qué nos ayuda a seguir viviendo cuando todo es difícil?',
    'En la Segunda Guerra Mundial, por ser judío, me llevaron a campos de concentración. Allí perdí a mis padres, a mi hermano y a mi esposa.',
    'Observé algo: resistían mejor quienes tenían un para qué. Una persona que los esperaba, un libro que terminar, una tarea pendiente.',
    'Aprendí que se le puede quitar todo a un ser humano menos una cosa: la libertad de elegir su actitud ante lo que le toca vivir.',
    'Encontramos sentido en lo que creamos, en lo que amamos y en cómo enfrentamos el dolor. Mi pregunta para ti: ¿para qué te levantas cada mañana?',
  ],
  paz: [
    'Soy Octavio Paz, nací en la Ciudad de México. Mi abuelo tenía una gran biblioteca, y allí, entre libros, empecé a escribir poemas siendo muy joven.',
    'Fui diplomático y viví en Estados Unidos, Francia, Japón y la India. Mirar mi país desde lejos me ayudó a preguntarme quiénes somos los mexicanos.',
    'En El laberinto de la soledad escribí sobre nuestras máscaras: escondemos lo que sentimos para protegernos. Pero en la fiesta las máscaras caen y nos encontramos.',
    'Pienso que todo ser humano está solo, y que esa soledad es también un impulso: el deseo de salir de nosotros y encontrarnos con los otros.',
    'La poesía es una forma de preguntar y de unir. Mi pregunta para ti: ¿en qué momento te quitas la máscara y eres tú de verdad?',
  ],
  mozi: [
    'Soy Mozi. Viví en China en tiempos de guerras constantes entre reinos. Era artesano, y conocía la vida dura del pueblo.',
    'Los seguidores de Confucio hablaban de ritos, de música elegante y de funerales caros. Yo pensaba: ¿y quién da de comer al pueblo?',
    'Enseñé el amor universal: preocuparse por todos por igual. Si cada uno amara la familia ajena como la propia, ¿quién robaría? ¿Quién haría la guerra?',
    'Para saber si algo es bueno, pregunto: ¿enriquece al pueblo, lo protege, lo alimenta? Si no, no vale la pena, por bonito que parezca.',
    'Matar a una persona es un crimen; conquistar un reino entero, ¿cómo podría ser glorioso? Mi pregunta para ti: ¿a quién dejas fuera de tu cuidado sin darte cuenta?',
  ],
  mencio: [
    'Soy Mencio. Mi madre se mudó tres veces para que yo creciera cerca de una escuela y no de un mercado o un cementerio. Así de importante es el ambiente.',
    'Estudié con los discípulos del nieto de Confucio, y dediqué mi vida a continuar su camino: la bondad, la justicia y el buen gobierno.',
    'Creo que la naturaleza humana es buena. Imagina que ves a un niño a punto de caer a un pozo: sin pensarlo, sientes el impulso de salvarlo.',
    'Todos llevamos cuatro brotes: compasión, vergüenza ante el mal, respeto y sentido de lo justo. Hay que cultivarlos, como un jardinero cuida sus plantas.',
    'Un gobernante que oprime al pueblo pierde el mandato del cielo. Mi pregunta para ti: ¿qué semilla de bondad tuya necesita más cuidado?',
  ],
  aryabhata: [
    'Soy Aryabhata. Viví en Kusumapura, cerca de la actual Patna, en la India, donde había una gran universidad.',
    'A los veintitrés años escribí un libro en verso, el Aryabhatiya, con todo lo que sabía de matemáticas y astronomía.',
    'Calculé el valor de pi con gran precisión, y usé un sistema de números donde el lugar de cada cifra cambia su valor, como hacemos hoy.',
    'Dije que la Tierra gira sobre sí misma, y que las estrellas parecen moverse como los árboles parecen moverse para el que va en barca.',
    'También expliqué los eclipses con sombras, y no con demonios. Mi pregunta para ti: ¿qué miedo tuyo desaparecería si entendieras su causa?',
  ],
  aljuarismi: [
    'Soy Muhammad ibn Musa al-Juarismi. Mi familia venía de Corasmia, en Asia Central, y yo trabajé en la Casa de la Sabiduría de Bagdad.',
    'Allí llegaban libros de Grecia, de Persia y de la India. Aprendí los números indios, con el cero y el valor según la posición, mucho más fáciles que otros sistemas.',
    'Escribí un libro sobre al-jabr: cómo completar y equilibrar una ecuación para encontrar lo que no sabes. De esa palabra nació el álgebra.',
    'Mostré cómo resolver problemas paso a paso: herencias, medidas de terrenos, comercio. Mi nombre, en latín Algoritmi, dio origen a la palabra algoritmo.',
    'Hoy las computadoras siguen algoritmos, como los que yo escribía. Mi pregunta para ti: ¿qué problema grande podrías resolver si lo dividieras en pasos pequeños?',
  ],
  alhacen: [
    'Soy Ibn al-Haytham. Nací en Basora y trabajé en El Cairo. Me llaman Alhacén en Europa.',
    'Cuentan que el califa me pidió controlar las crecidas del Nilo. Vi que era imposible y, por miedo a su castigo, fingí estar loco durante años. Ese tiempo lo usé para estudiar.',
    'Los antiguos decían que de los ojos salen rayos. Yo hice experimentos con un cuarto oscuro y un agujerito, y mostré que la luz viaja desde las cosas hasta el ojo.',
    'Estudié cómo se refleja la luz en los espejos y cómo se dobla al pasar por el agua. Y siempre comprobé mis ideas con experimentos repetidos.',
    'El buscador de la verdad no confía ciegamente en los antiguos, sino que sospecha y comprueba. Mi pregunta para ti: ¿qué idea que crees cierta podrías poner a prueba?',
  ],
  ibnjaldun: [
    'Soy Ibn Jaldún, nacido en Túnez. Mi familia venía de Sevilla, en Al-Ándalus. Una peste terrible me arrebató a mis padres cuando era joven.',
    'Fui secretario de sultanes, juez y diplomático. Hasta me reuní con el conquistador Tamerlán frente a las murallas de Damasco.',
    'Me retiré a un castillo en el desierto y escribí la Muqaddima, una introducción a la historia. Quería entender las causas de los hechos, no solo contarlos.',
    'Descubrí un ciclo: los pueblos unidos por la asabiyya, la solidaridad, conquistan. Luego se acomodan en el lujo de las ciudades, pierden la unión y caen.',
    'La historia tiene leyes, como la naturaleza. Mi pregunta para ti: ¿qué mantiene unido a tu grupo, tu familia o tu curso, y qué podría separarlo?',
  ],
  mandela: [
    'Soy Nelson Mandela. Nací en una aldea xhosa de Sudáfrica. Mi nombre xhosa, Rolihlahla, significa «el que sacude las ramas», es decir, el que causa problemas.',
    'En mi país existía el apartheid: las personas negras no podían votar, ni vivir donde quisieran, ni ir a las mismas escuelas. Me hice abogado para defenderlas.',
    'Por luchar contra esa injusticia me condenaron a cadena perpetua. Pasé veintisiete años en prisión, muchos en la isla de Robben, picando piedra.',
    'Cuando salí, en 1990, el país podía caer en la guerra. Elegí la reconciliación: hablar con los antiguos enemigos y construir una Sudáfrica para todos.',
    'Soy porque somos: eso es ubuntu. Mi pregunta para ti: ¿hay alguien a quien podrías perdonar, no por el otro, sino para ser libre tú?',
  ],
  dickinson: [
    'Soy Emily Dickinson, de Amherst, en Estados Unidos. Estudié en un seminario para señoritas, pero preferí volver a casa, a mi jardín y a mi escritorio.',
    'Con los años salí cada vez menos. Mis vecinos me llamaban «el mito» porque casi nunca me veían. Pero desde mi ventana veía el universo entero.',
    'Escribía poemas breves, con guiones y mayúsculas extrañas, sobre las abejas, los pájaros, la muerte y la eternidad. Los cosía a mano en cuadernillos.',
    'Casi no publiqué en vida. Mi hermana encontró casi mil ochocientos poemas tras mi muerte, y el mundo me conoció entonces.',
    'La esperanza es la cosa con plumas que se posa en el alma y canta sin parar. Mi pregunta para ti: ¿dónde está hoy tu pequeña cosa con plumas?',
  ],
  tagore: [
    'Soy Rabindranath Tagore, de Calcuta, en Bengala. Fui el menor de catorce hermanos, en una familia llena de músicos, poetas y pensadores.',
    'De niño odiaba la escuela: las paredes, la memoria sin sentido. Aprendía mejor caminando por el campo y escuchando a la naturaleza.',
    'Por eso fundé en Santiniketan una escuela al aire libre, donde los niños aprendían bajo los árboles, con música, arte y alegría.',
    'Escribí miles de canciones y poemas. Por Gitanjali, mis cantos de ofrenda, recibí el Premio Nobel de Literatura en 1913.',
    'Escribí los himnos de la India y de Bangladés, pero advertí contra el nacionalismo que divide. Mi pregunta para ti: ¿dónde aprendes tú con más alegría?',
  ],
  newton: [
    'Soy Isaac Newton. Nací en una granja de Inglaterra, el día de Navidad, tan pequeño que dicen que cabía en una jarra.',
    'Cuando una peste cerró la universidad, volví a casa. En esos meses de encierro hice mis mayores descubrimientos: sobre la luz, el cálculo y la gravedad.',
    'Me pregunté por qué la manzana cae y la Luna no. Comprendí que la misma fuerza actúa en las dos: la Luna también cae, pero va tan rápido que da vueltas.',
    'Formulé tres leyes del movimiento y la ley de la gravitación universal. Con ellas se explican las mareas, las órbitas y el vuelo de una piedra.',
    'Si he visto más lejos, es porque me subí a hombros de gigantes. Mi pregunta para ti: ¿sobre los hombros de quién te has subido tú para aprender?',
  ],
  darwin: [
    'Soy Charles Darwin, de Inglaterra. De niño coleccionaba escarabajos, y mi padre temía que no sirviera para nada.',
    'A los veintidós años me embarqué en el Beagle. Viajé cinco años: vi la selva de Brasil, los fósiles de Argentina y un terremoto en Chile.',
    'En las islas Galápagos encontré pinzones con picos diferentes en cada isla: unos para romper semillas, otros para comer insectos.',
    'Pensé durante veinte años antes de publicar: los seres vivos varían, y los que mejor se adaptan sobreviven y dejan más descendientes. Es la selección natural.',
    'Todos los seres vivos estamos emparentados en un gran árbol de la vida. Mi pregunta para ti: ¿cómo te has adaptado tú a un cambio difícil?',
  ],
});
