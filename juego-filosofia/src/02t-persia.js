// ============================================================================
//  XXII · LA ANTIGUA PERSIA: lugares, ciudadanos, encargos, anécdotas y libros
// ============================================================================
POIS.push([
  wpoi(0, 'persepolis', 'Persépolis y la Puerta de Todas las Naciones', 'Persépolis fue la gran capital ceremonial de los reyes persas. Para entrar había que cruzar la Puerta de Todas las Naciones, custodiada por toros alados. En las escaleras de la Apadana, cientos de relieves muestran a delegaciones de pueblos distintos, cada uno con su ropa y sus regalos, subiendo juntos ante el rey.',
    'En los relieves de Persépolis nadie aparece humillado ni encadenado: los pueblos llegan de la mano, como invitados.',
    { q: '¿Qué muestran los relieves de las escaleras de Persépolis?', a: ['Delegaciones de muchos pueblos distintos que llegan con sus regalos', 'Batallas sangrientas', 'Animales del mar', 'Mapas de las estrellas'], e: 'Un imperio de muchos pueblos.' }),
  wpoi(1, 'cilindro', 'El Cilindro de Ciro', 'Es un cilindro de arcilla del tamaño de un balón de rugby, escrito en acadio, la lengua de Babilonia. En él, Ciro cuenta que entró en la ciudad en paz, que respetó sus templos y que dejó volver a sus tierras a los pueblos deportados.',
    'El original está en el Museo Británico de Londres, y una copia se exhibe en la sede de las Naciones Unidas en Nueva York.',
    { q: '¿En qué lengua está escrito el Cilindro de Ciro?', a: ['En acadio, con escritura cuneiforme', 'En latín', 'En griego', 'En chino'], e: 'La lengua de la antigua Babilonia.' }),
  wpoi(2, 'jardin-persa', 'El jardín persa, el paraíso', 'Los persas crearon jardines cerrados por muros, divididos en cuatro partes por canales de agua que se cruzan en el centro, con árboles frutales, flores y sombra. Los llamaban pairidaeza, «recinto cerrado». De esa palabra viene la nuestra: paraíso.',
    'El agua llegaba a los jardines por qanats, canales subterráneos excavados en el desierto, algunos de más de dos mil años de antigüedad.',
    { q: '¿Qué palabra nuestra viene del nombre persa de estos jardines?', a: ['Paraíso', 'Jardín', 'Oasis', 'Huerta'], e: 'De pairidaeza, «recinto cerrado».' }),
  wpoi(3, 'camino-real', 'El Camino Real y sus mensajeros', 'Los reyes persas construyeron el Camino Real, de unos dos mil quinientos kilómetros, desde Sardes hasta Susa. Cada día de viaje había una posta con caballos frescos, y los mensajeros, relevándose, llevaban las cartas en una semana.',
    'El historiador griego Heródoto escribió que a estos mensajeros no los detenían ni la nieve, ni la lluvia, ni el calor, ni la noche. La frase está hoy grabada en el edificio del correo de Nueva York.',
    { q: '¿Qué permitía el Camino Real persa?', a: ['Llevar mensajes de un extremo al otro del imperio en una semana', 'Navegar hasta la India', 'Volar en globo', 'Cruzar el océano'], e: 'Un sistema de postas con caballos frescos.' }),
  wpoi(4, 'templo-fuego', 'El templo del fuego', 'En los templos zoroastrianos arde un fuego que se cuida día y noche. No se adora al fuego: es un símbolo de la verdad, la luz y la pureza que el Señor Sabio pide elegir. Los fieles rezan mirando una luz.',
    'En el templo de Yazd, en Irán, se dice que el fuego arde sin apagarse desde hace unos mil quinientos años.',
    { q: '¿Qué simboliza el fuego en los templos zoroastrianos?', a: ['La verdad, la luz y la pureza', 'La guerra', 'La riqueza', 'El miedo'], e: 'Es un símbolo, no un dios.' }),
]);

NPCS.push([
  wnpc(0, 'alfombrera', 'Shirin', 'tejedora de alfombras', sk(0x8a2a3a, 0x2a4a7a, 0xd8a880, 0x1a1410, { hat: 'longhair', acc: 'none' }), [
    'Anudo mis alfombras nudo a nudo: una alfombra grande puede llevar más de un millón de nudos y un año de trabajo. Mi madre me enseñó, y su madre a ella.',
    'En el centro dibujo un jardín, con sus cuatro canales de agua y sus árboles. Así, en invierno, cualquier casa puede tener su paraíso en el suelo.',
    'Siempre dejo un pequeño error a propósito. Decimos que solo Dios es perfecto, y que la humildad también se teje.',
  ], true),
  wnpc(1, 'chapar', 'Arash', 'mensajero del Camino Real', sk(0x6a4a2a, 0xc8a050, 0xc8946a, 0x2a1a10, { beard: 0x2a1a10, hat: 'cap', acc: 'none' }), [
    'Cabalgo de una posta a la siguiente, donde me espera otro jinete con un caballo fresco. Le paso la carta y descanso. Así el mensaje nunca se detiene.',
    'Ni la nieve, ni la lluvia, ni el calor, ni la noche nos detienen: eso dicen los griegos de nosotros. Exageran un poco… pero no mucho.',
    'Llevo cartas en arameo, la lengua que todos entienden en el imperio. Un imperio de tantos pueblos necesita palabras que viajen rápido.',
  ]),
  wnpc(2, 'jardinero', 'Kourosh', 'jardinero del paraíso', sk(0x4a6a3a, 0x8a6a3a, 0xc8946a, 0x5a4a3a, { beard: 0x5a4a3a, hat: 'turban', acc: 'none' }), [
    'El agua viene de las montañas por el qanat, un canal bajo tierra que excavaron nuestros abuelos. Sin él, aquí solo habría desierto.',
    'Divido el jardín en cuatro partes con canales que se cruzan en el centro. Los cuatro brazos del agua son los cuatro rincones del mundo, unidos en un solo lugar.',
    'Planto granados, cipreses y rosas. El ciprés siempre verde es la vida que no se rinde; la granada, con sus mil semillas, la abundancia compartida.',
  ]),
]);

Object.assign(QUESTS, {
  zaratustra: { text: 'Visita el templo del fuego y escucha a Shirin, la tejedora. Luego dime cuáles son las tres cosas buenas que enseño.', needs: { pois: ['templo-fuego'], npcs: ['alfombrera'] },
    riddle: { q: '¿Cuál es el lema de Zaratustra?', a: ['Buenos pensamientos, buenas palabras, buenas obras', 'Obedece y calla', 'Gana a cualquier precio', 'Nada importa'] } },
  ciro: { text: 'Examina el Cilindro de Ciro y escucha a Arash, el mensajero. Luego dime qué permití a los pueblos deportados.', needs: { pois: ['cilindro'], npcs: ['chapar'] },
    riddle: { q: '¿Qué permitió Ciro a los pueblos deportados por Babilonia?', a: ['Volver a sus tierras y reconstruir sus templos', 'Quedarse como esclavos', 'Olvidar su lengua', 'Hacerse persas a la fuerza'] } },
  mani: { text: 'Recorre Persépolis y su Puerta de Todas las Naciones. Luego dime qué dos principios se mezclan en el mundo según yo.', needs: { pois: ['persepolis'], npcs: [] },
    riddle: { q: '¿Qué dos principios se mezclan en el mundo según Mani?', a: ['La luz y las tinieblas', 'El agua y el vino', 'El norte y el sur', 'El oro y el hierro'] } },
  burzoe: { text: 'Pasea por el jardín persa y escucha a Kourosh, el jardinero. Luego dime qué era en realidad la hierba que resucita a los muertos.', needs: { pois: ['jardin-persa'], npcs: ['jardinero'] },
    riddle: { q: '¿Qué era la «hierba que resucita a los muertos» que buscaba Burzoe?', a: ['La sabiduría de los buenos libros', 'Una flor de la montaña', 'Un veneno', 'Un mineral precioso'] } },
});

Object.assign(ANECDOTES, {
  zaratustra: ['La tradición cuenta que fui el único niño que nació riendo en vez de llorar.', 'Durante años casi nadie me escuchó. Mi primer seguidor fue mi propio primo. Luego un rey, Vishtaspa, aceptó mis enseñanzas, y con él muchos más.'],
  ciro: ['Heródoto cuenta que, de niño, un rey quiso hacerme desaparecer y fui criado por un pastor. Jugando con otros niños, me eligieron rey del juego… y así me descubrieron.', 'Mi tumba en Pasargada es una pequeña casa de piedra. Dicen que tenía escrito: «Oh, hombre, soy Ciro, que dio un imperio a los persas. No me envidies esta poca tierra que cubre mi cuerpo».'],
  mani: ['Cuando quería explicar algo difícil, lo pintaba. En Persia, durante siglos, a un gran pintor se le llamaba «un nuevo Mani».', 'Viajé hasta la India por mar para conocer a los maestros budistas y aprender de ellos.'],
  burzoe: ['Pedí al rey, como única recompensa por mi viaje, que pusiera al principio del libro un capítulo contando mi propia vida. Así mi nombre viajó junto a las fábulas.', 'Una fábula del libro cuenta que un cuervo, una rata, una tortuga y una gacela, siendo tan distintos, se salvaron unos a otros por ser amigos. Es mi favorita.'],
  ferdousi: ['Mi héroe Rostam vivió setecientos años y mató a un dragón, pero el pasaje que más hace llorar es cuando, sin saberlo, se enfrenta a su propio hijo, Sohrab.', 'Para escribir mi libro usé un viejo libro de los reyes en persa medio, que otros habían reunido antes que yo. Ninguna obra grande nace de la nada.'],
});

BOOKS.push([
  { id: 'gathas', author: 'zaratustra', by: 'Zaratustra', title: 'Los Gathas', year: 'c. 1000 a. C. (tradición)', kind: 'himnos', at: B2[0],
    parts: [
      { t: 'Los cantos del profeta', x: 'Los Gathas son diecisiete himnos en avéstico antiguo, la lengua más antigua del Irán. Se cantaron de memoria durante muchos siglos antes de escribirse. En ellos Zaratustra habla con el Señor Sabio, le pregunta y le pide consejo.' },
      { t: 'Las preguntas', x: '«Esto te pregunto, Señor, dime la verdad: ¿quién sostiene la tierra y el cielo para que no caigan? ¿Quién hizo las aguas y las plantas? ¿Quién unió la velocidad a los vientos y a las nubes?» El profeta pregunta antes de afirmar.' },
      { t: 'Los dos espíritus', x: 'Al principio hubo dos espíritus, como gemelos: uno eligió la verdad y otro la mentira. Las personas que piensan bien eligen como el primero; las que no, como el segundo. Cada uno debe elegir por sí mismo, después de escuchar con mente clara.' },
      { t: 'La recompensa', x: 'A quien elige la verdad con buenos pensamientos, buenas palabras y buenas obras, el Señor Sabio le da plenitud e inmortalidad. Quien engaña a los demás se engaña primero a sí mismo.' },
    ],
    quote: 'Escuchad con los oídos lo mejor; mirad con mente clara, y que cada uno elija por sí mismo.',
    q: { q: '¿Qué pide Zaratustra a quienes escuchan sus himnos?', a: ['Que cada uno elija por sí mismo, después de pensar con mente clara', 'Que obedezcan sin preguntar', 'Que olviden sus himnos', 'Que no elijan nada'], e: 'La elección libre está en el centro de su enseñanza.' } },
  { id: 'shahnameh', author: 'ferdousi', by: 'Ferdousí', title: 'Shahnameh, el Libro de los Reyes', year: 'c. 1010', kind: 'epopeya', at: B2[1],
    parts: [
      { t: 'La historia de un pueblo', x: 'El Shahnameh cuenta en unos cincuenta mil versos la historia de Irán: desde el primer rey de la creación del mundo hasta la caída del Imperio sasánida en el siglo VII.' },
      { t: 'Rostam y Rakhsh', x: 'El gran héroe es Rostam, fuerte como un elefante y leal a su pueblo, que cabalga sobre Rakhsh, un caballo que lo salva más de una vez. Juntos superan siete pruebas en un viaje lleno de dragones y demonios.' },
      { t: 'Rostam y Sohrab', x: 'La historia más triste: Rostam lucha contra un joven guerrero sin saber que es su hijo, Sohrab. Cuando lo descubre, es demasiado tarde. Ferdousí enseña que la guerra y el orgullo pueden destruir lo que más amamos.' },
      { t: 'Una lengua salvada', x: 'Ferdousí escribió casi sin palabras árabes, en un persa limpio. Al terminar, dijo que no moriría, porque había sembrado la semilla de su lengua. Mil años después, los iraníes siguen leyéndolo.' },
    ],
    quote: 'No moriré, pues he sembrado la semilla de la palabra.',
    q: { q: '¿Qué historia del Shahnameh muestra que el orgullo puede destruir lo que amamos?', a: ['Rostam lucha contra su hijo Sohrab sin saber quién es', 'Rostam encuentra un tesoro', 'Rakhsh aprende a volar', 'Un rey construye un puente'], e: 'La gran tragedia de la epopeya persa.' } },
]);
BOOKS[BOOKS.length - 1].forEach((b) => { b.q.book = b.title; });
