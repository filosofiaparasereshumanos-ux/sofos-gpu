// ============================================================================
//  XXIII · LOS LIBREPENSADORES y XXIV · LA CASA DE LA FE:
//  lugares, ciudadanos, encargos, anécdotas y libros
//  Estas plazas tienen seis pensadores y un maestro: los lugares y los libros van
//  entre los pensadores, sin taparlos.
// ============================================================================
{
  const PP = [[-17, 30], [17, 24], [17, 6], [-17, -2], [6, -40]];
  const BB = [[16, -12], [-16, 16]];
  const poi = (i, id, name, text, fact, q) => ({ id, at: PP[i], name, text, fact, q });

  // ---------------------------------------------------------------- XXIII · Los librepensadores
  POIS.push([
    poi(0, 'lucrecio-hallazgo', 'El poema perdido de Lucrecio', 'En 1417, un humanista italiano llamado Poggio Bracciolini, cazador de libros antiguos, encontró en un monasterio alemán una copia del poema de Lucrecio, que llevaba siglos olvidado. Lo hizo copiar y lo envió a Italia. Sus ideas sobre los átomos, el azar y una vida sin miedo a los dioses se extendieron por la Europa del Renacimiento.',
      'Uno de los lectores entusiastas del poema fue Thomas Jefferson, que tenía varias ediciones en su biblioteca.',
      { q: '¿Quién redescubrió en 1417 el poema de Lucrecio?', a: ['Poggio Bracciolini, un humanista cazador de libros', 'Galileo', 'Un emperador romano', 'Nadie: nunca se perdió'], e: 'Lo encontró en un monasterio alemán.' }),
    poi(1, 'enciclopedia-prohibida', 'La Enciclopedia prohibida', 'La Enciclopedia de Diderot y D’Alembert fue prohibida por el rey de Francia y condenada por el papa. Sus editores siguieron imprimiéndola casi en secreto, con la complicidad de un censor real, Malesherbes, que llegó a esconder los manuscritos en su propia casa para salvarlos.',
      'La obra tuvo más de setenta mil artículos y unos ciento cuarenta colaboradores.',
      { q: '¿Quién escondió los manuscritos de la Enciclopedia para salvarlos?', a: ['Malesherbes, el propio censor del rey', 'El papa', 'Napoleón', 'Un pirata'], e: 'Una prueba de que también hay censores que aman los libros.' }),
    poi(2, 'tetera', 'La tetera celeste', 'Imagina una pequeña tetera de porcelana girando alrededor del Sol, entre la Tierra y Marte, demasiado pequeña para verla con ningún telescopio. Nadie puede demostrar que no está. ¿Deberíamos creer en ella? Russell inventó este ejemplo en 1952 para explicar quién debe dar las pruebas cuando alguien afirma algo.',
      'Los filósofos llaman a este principio «la carga de la prueba»: corresponde a quien afirma, no a quien duda.',
      { q: '¿Qué principio ilustra la tetera de Russell?', a: ['La carga de la prueba corresponde a quien afirma', 'Que el té es saludable', 'Que el espacio está vacío', 'Que todo lo que no se ve existe'], e: 'Quien duda no tiene que probar que algo no existe.' }),
    poi(3, 'punto-azul', 'Un punto azul pálido', 'El 14 de febrero de 1990, la sonda Voyager 1, a unos seis mil millones de kilómetros, giró su cámara hacia atrás y fotografió la Tierra. En la imagen nuestro planeta es un puntito azul, más pequeño que un píxel, suspendido en un rayo de sol. Carl Sagan, que pidió esa foto, escribió que allí está todo lo que amamos.',
      'La Voyager 1, lanzada en 1977, es el objeto hecho por humanos que más lejos ha llegado: ya salió del sistema solar.',
      { q: '¿Qué sonda tomó la foto del «punto azul pálido»?', a: ['La Voyager 1', 'El Apolo 11', 'El telescopio Hubble', 'El Sputnik'], e: 'En 1990, a pedido de Carl Sagan.' }),
    poi(4, 'conciencia', 'La libertad de conciencia', 'En 1948, la Asamblea de las Naciones Unidas aprobó la Declaración Universal de los Derechos Humanos. Su artículo 18 dice que toda persona tiene derecho a la libertad de pensamiento, de conciencia y de religión, incluida la libertad de cambiar de creencia. Protege por igual al creyente y al que no cree.',
      'Durante siglos, en muchos lugares, declararse ateo o cambiar de religión podía costar la cárcel o la vida. En algunos países todavía es así.',
      { q: '¿Qué protege el artículo 18 de la Declaración Universal de los Derechos Humanos?', a: ['La libertad de pensamiento, de conciencia y de religión', 'El derecho a la propiedad', 'El derecho al voto', 'La libertad de comercio'], e: 'Por igual a creyentes y no creyentes.' }),
  ]);
  NPCS.push([
    wnpc(0, 'tipografo', 'Jacques', 'impresor de la Enciclopedia', sk(0x5a4a3a, 0x2a2a2a, 0xe0c0a0, 0x3a2a1a, { hat: 'cap', acc: 'none' }), [
      'Cada letra es un pequeño trozo de metal. Las coloco al revés, una a una, en la caja: un solo volumen de la Enciclopedia lleva meses de trabajo.',
      'Cuando la prohibieron, seguimos imprimiendo de noche. Si nos atrapaban, íbamos presos. Pero el saber no se puede encerrar para siempre.',
      'Monsieur Diderot venía al taller y me preguntaba cómo trabajo. Dice que mi oficio merece estar en el libro igual que la astronomía.',
    ]),
    wnpc(1, 'astronoma', 'Henrietta', 'astrónoma de las placas de vidrio', sk(0xe8e8e8, 0x3a3a5a, 0xf0d0b0, 0x5a3a2a, { hat: 'longhair', acc: 'none' }), [
      'Paso el día mirando placas de vidrio con fotos de miles de estrellas. Nos llaman «las computadoras»: mujeres que calculan lo que los telescopios ven.',
      'Descubrí que ciertas estrellas que parpadean nos dicen a qué distancia están. Con eso, otros midieron el tamaño del universo.',
      'Cuanto más miro, más pequeña me siento… y más asombrada. No sé si hay alguien detrás de todo esto, pero sé que vale la pena mirarlo con cuidado.',
    ], true),
    wnpc(2, 'medica', 'Clara', 'médica del siglo XIX', sk(0x2a2a3a, 0xe8e8e8, 0xf0d0b0, 0x3a2a1a, { hat: 'longhair', acc: 'none' }), [
      'Me dijeron que una mujer no podía estudiar medicina. Estudié igual. Hoy curo a quien llegue, crea en lo que crea.',
      'Antes se pensaba que las epidemias eran castigos. Ahora sabemos que las causan microbios, y que lavarse las manos salva vidas.',
      'A mi consulta vienen creyentes y no creyentes. Todos tienen fiebre igual, y todos merecen el mismo cuidado.',
    ], true),
  ]);
  Object.assign(QUESTS, {
    ajita: { text: 'Mira la foto del punto azul pálido y escucha a Henrietta, la astrónoma. Luego dime de qué estamos hechos, según yo.', needs: { pois: ['punto-azul'], npcs: ['astronoma'] },
      riddle: { q: '¿De qué está hecho el ser humano, según Ajita?', a: ['De tierra, agua, fuego y aire', 'De un alma eterna', 'De números', 'De luz divina'] } },
    lucrecio: { text: 'Visita el lugar donde se redescubrió mi poema. Luego dime de qué está hecho todo.', needs: { pois: ['lucrecio-hallazgo'], npcs: [] },
      riddle: { q: '¿De qué está hecho todo, según Lucrecio?', a: ['De átomos que se mueven en el vacío', 'De agua', 'De ideas', 'De fuego'] } },
    diderot: { text: 'Conoce la historia de la Enciclopedia prohibida y escucha a Jacques, el impresor. Luego dime qué incluí en ella además de las ciencias.', needs: { pois: ['enciclopedia-prohibida'], npcs: ['tipografo'] },
      riddle: { q: '¿Qué incluyó Diderot en la Enciclopedia además de ciencias y artes?', a: ['Los oficios manuales', 'Solo vidas de reyes', 'Recetas de pociones', 'Nada más'] } },
    feuerbach: { text: 'Lee el artículo 18 sobre la libertad de conciencia. Luego dime qué es la religión, según yo.', needs: { pois: ['conciencia'], npcs: [] },
      riddle: { q: '¿Qué es Dios, según Feuerbach?', a: ['Una proyección de las mejores cualidades humanas', 'Una estrella', 'Un rey', 'Una máquina'] } },
    ernestinerose: { text: 'Escucha a Clara, la médica, y lee el artículo sobre la libertad de conciencia. Luego dime por qué causas luché.', needs: { pois: ['conciencia'], npcs: ['medica'] },
      riddle: { q: '¿Por qué causas luchó Ernestine Rose?', a: ['Los derechos de las mujeres, el fin de la esclavitud y la libertad de pensar', 'Por más guerras', 'Por prohibir libros', 'Por la monarquía'] } },
    sagan: { text: 'Imagina la tetera celeste y mira el punto azul pálido. Luego dime mi regla para no engañarnos.', needs: { pois: ['tetera', 'punto-azul'], npcs: [] },
      riddle: { q: '¿Cuál es la regla de Sagan?', a: ['Afirmaciones extraordinarias requieren pruebas extraordinarias', 'Cree lo que te digan', 'Lo antiguo siempre es verdad', 'Lo que no se ve no importa'] } },
  });
  Object.assign(ANECDOTES, {
    ajita: ['Los textos budistas cuentan que un rey preguntó a seis maestros cuál era el fruto de la vida religiosa. Yo le respondí que no había ningún fruto más allá de esta vida. No le gustó la respuesta.', 'Mi manto de cabellos era tan incómodo que mis rivales lo usaban como ejemplo de lo peor que uno puede ponerse.'],
    lucrecio: ['San Jerónimo contó, siglos después, que me volví loco por un filtro de amor y que escribí mi poema en los momentos de lucidez. Probablemente es una historia inventada para desacreditarme.', 'Mi poema empieza con un himno a Venus, la diosa del amor. Curioso, en un poema que dice que los dioses no se ocupan de nosotros: para mí era un símbolo de la fuerza de la naturaleza.'],
    diderot: ['Era tan pobre que no podía darle una dote a mi hija. La emperatriz Catalina de Rusia compró mi biblioteca… y me pagó un sueldo para que yo mismo la cuidara mientras viviera.', 'Escribí un ensayo sobre la bata vieja que tuve que cambiar por una lujosa: con la bata nueva, todo mi cuarto me pareció pobre y terminé cambiando todos mis muebles. Lo llaman el «efecto Diderot».'],
    feuerbach: ['Perdí mi puesto en la universidad por un libro sobre la muerte y la inmortalidad, que publiqué sin firmar. Todos supieron igual que era mío.', 'Viví muchos años en un pueblo, en la fábrica de porcelana de la familia de mi esposa. Desde allí escribí libros que se discutían en toda Europa.'],
    ernestinerose: ['En el sur de Estados Unidos, un periódico escribió que yo era «mil veces peor que una infiel». Seguí dando la conferencia.', 'Me llamaban «la reina de las tribunas». Recorrí veintitrés estados hablando, cuando casi no había mujeres que hablaran en público.'],
    sagan: ['El disco de oro que va en las sondas Voyager lleva saludos en cincuenta y cinco idiomas, música de Bach y de Chuck Berry, y el sonido de un beso.', 'En mi novela «Contacto», una científica recibe un mensaje de las estrellas. Se hizo película, con Jodie Foster.'],
    russell: ['A los ochenta y nueve años volví a la cárcel, por una semana, por protestar contra las armas nucleares sentado en una calle de Londres.', 'Cuando me preguntaron qué diría si después de morir me encontrara frente a Dios, respondí: «Le diría: no me diste pruebas suficientes».'],
  });
  BOOKS.push([
    { id: 'rerum-natura', author: 'lucrecio', by: 'Lucrecio', title: 'Sobre la naturaleza de las cosas', year: 'siglo I a. C.', kind: 'poema filosófico', at: BB[0],
      parts: [
        { t: 'Un poema para liberar del miedo', x: 'Lucrecio escribió seis libros en verso para explicar la física de Epicuro. Su objetivo era liberar a las personas del miedo a los dioses y a la muerte, que les quitaba la paz.' },
        { t: 'Átomos y vacío', x: 'Todo está hecho de átomos, partículas eternas que se mueven en el vacío. Al chocar y unirse forman las piedras, el agua, los árboles y los seres vivos. Nada nace de la nada y nada vuelve a la nada.' },
        { t: 'El desvío', x: 'Para explicar la libertad, Lucrecio dice que los átomos a veces se desvían un poco de su camino, sin que nadie lo decida. Ese pequeño desvío, el clinamen, abre espacio al azar y a la voluntad.' },
        { t: 'La muerte no es nada para nosotros', x: 'Cuando morimos, los átomos del alma se dispersan y dejamos de sentir. No hay que temer ningún castigo. Lo que importa es vivir con serenidad y amistad.' },
      ],
      quote: 'Nada puede nacer de la nada.',
      q: { q: '¿Qué es el «clinamen» en el poema de Lucrecio?', a: ['Un pequeño desvío de los átomos que abre espacio a la libertad', 'Un dios del clima', 'Un tipo de poema', 'Una enfermedad'], e: 'Así explica el azar y la voluntad.' } },
    { id: 'cosmos', author: 'sagan', by: 'Carl Sagan', title: 'Cosmos', year: '1980', kind: 'divulgación científica', at: BB[1],
      parts: [
        { t: 'Las costas del océano cósmico', x: 'Sagan empieza en la orilla del mar: hasta hace poco solo nos habíamos mojado los pies en el océano del cosmos. Ahora empezamos a explorarlo con naves y telescopios.' },
        { t: 'El calendario cósmico', x: 'Si toda la historia del universo cupiera en un año, los dinosaurios aparecerían el 25 de diciembre y toda la historia humana ocuparía los últimos segundos del 31 de diciembre.' },
        { t: 'Somos polvo de estrellas', x: 'Los átomos de nuestro cuerpo se fabricaron dentro de estrellas que estallaron hace miles de millones de años. Somos una forma en que el cosmos se conoce a sí mismo.' },
        { t: '¿Quién habla por la Tierra?', x: 'El libro termina pidiendo cuidar el planeta y evitar la guerra nuclear: la ciencia nos da poder, y necesitamos sabiduría para usarlo bien.' },
      ],
      quote: 'Somos una forma en que el cosmos se conoce a sí mismo.',
      q: { q: 'En el calendario cósmico de Sagan, ¿cuándo aparece la historia humana?', a: ['En los últimos segundos del 31 de diciembre', 'El 1 de enero', 'En pleno verano', 'A mitad de año'], e: 'Somos muy recientes en la historia del universo.' } },
  ]);
  BOOKS[BOOKS.length - 1].forEach((b) => { b.q.book = b.title; });

  // ---------------------------------------------------------------- XXIV · La casa de la fe
  POIS.push([
    poi(0, 'bec', 'La abadía de Bec', 'En el siglo XI, la abadía de Bec, en Normandía, era una de las mejores escuelas de Europa. Allí enseñaron Lanfranco y Anselmo, que se hicieron arzobispos de Canterbury. Los monjes copiaban libros, cultivaban la tierra y discutían con argumentos.',
      'Anselmo escribió en Bec su «Proslogion», el libro del argumento ontológico, después de muchas noches buscando un solo argumento que lo explicara todo.',
      { q: '¿Qué escribió Anselmo en la abadía de Bec?', a: ['El Proslogion, con el argumento ontológico', 'La Divina Comedia', 'El Corán', 'La Guía de perplejos'], e: 'En Normandía, hacia 1078.' }),
    poi(1, 'mezquita-cordoba', 'La Mezquita de Córdoba', 'Con su bosque de más de ochocientas columnas y sus arcos de piedra blanca y ladrillo rojo, la Mezquita de Córdoba fue el corazón de Al-Ándalus. En la Córdoba de los siglos X a XII convivieron, no sin tensiones, musulmanes, judíos y cristianos, y nacieron allí Averroes y Maimónides.',
      'Tras la conquista cristiana, en el siglo XVI se construyó una catedral en medio de la mezquita. Hoy es un edificio único donde se superponen dos tradiciones.',
      { q: '¿Qué dos grandes filósofos nacieron en Córdoba en el siglo XII?', a: ['Averroes y Maimónides', 'Platón y Aristóteles', 'Kant y Hegel', 'Pascal y Descartes'], e: 'Uno musulmán y otro judío.' }),
    poi(2, 'avila', 'Las murallas de Ávila', 'Ávila está rodeada por murallas medievales de dos kilómetros y medio, con ochenta y siete torres. Allí nació Teresa de Jesús en 1515, y desde allí salió a fundar conventos por los caminos de Castilla.',
      'Teresa escribió que el alma es como un castillo: quizás pensaba en las murallas de su propia ciudad.',
      { q: '¿Qué mística nació en Ávila?', a: ['Teresa de Jesús, o de Ávila', 'Hildegarda de Bingen', 'Sor Juana', 'Simone Weil'], e: 'En 1515.' }),
    poi(3, 'memorial', 'La noche del fuego', 'La noche del 23 de noviembre de 1654, entre las diez y media y las doce y media, Pascal vivió una experiencia religiosa intensa. La anotó en un papel que empieza con la palabra «Fuego» y lo cosió dentro de su abrigo. Lo llevó consigo ocho años, hasta su muerte, y nadie lo supo.',
      'Un sirviente encontró el papel al ordenar su ropa tras su muerte. Hoy se llama el Memorial de Pascal.',
      { q: '¿Con qué palabra empieza el Memorial de Pascal?', a: ['Fuego', 'Agua', 'Paz', 'Dios'], e: 'Lo llevaba cosido en su abrigo.' }),
    poi(4, 'parlamento', 'El Parlamento de las Religiones', 'En 1893, en Chicago, se reunió el primer Parlamento Mundial de las Religiones: hindúes, budistas, judíos, cristianos, musulmanes, jainistas y otros hablaron en el mismo salón. Un joven monje indio, Vivekananda, empezó su discurso diciendo «Hermanas y hermanos de América», y el público lo aplaudió de pie durante varios minutos.',
      'Desde entonces el Parlamento se reúne cada pocos años, y también invita a personas no religiosas a dialogar.',
      { q: '¿Cómo empezó Vivekananda su famoso discurso de 1893?', a: ['«Hermanas y hermanos de América»', '«Señoras y señores»', '«Escuchad, infieles»', '«Buenas tardes»'], e: 'El público lo aplaudió de pie.' }),
  ]);
  NPCS.push([
    wnpc(0, 'peregrino', 'Santiago', 'peregrino del camino', sk(0x6a5a3a, 0x3a2a1a, 0xd0a07a, 0x4a3a2a, { beard: 0x4a3a2a, hat: 'cap', acc: 'staff' }), [
      'Llevo dos meses caminando. Al principio cargaba demasiadas cosas; ahora llevo solo lo necesario. El camino enseña a soltar.',
      'He compartido pan con creyentes de todo tipo y con gente que camina sin creer. A todos nos duelen igual los pies.',
      'No sé si llegaré a entender a Dios, pero cada mañana, al ponerme en marcha, siento que alguien me acompaña. Quizás es solo el camino.',
    ]),
    wnpc(1, 'cantora', 'Miriam', 'cantora de música sagrada', sk(0x3a4a6a, 0xe8e0d0, 0xf0d0b0, 0x2a1a10, { hat: 'hood', acc: 'none' }), [
      'Canto en un coro. Cuando cantamos juntos, mi voz deja de ser solo mía. Muchos dicen que así se siente la oración.',
      'Bach escribía al final de sus partituras «Solo a Dios la gloria». Hasta quien no cree se emociona con su música.',
      'Cantamos salmos que tienen tres mil años. Las mismas palabras que cantaban otros, en otras lenguas, por los mismos miedos y las mismas alegrías.',
    ], true),
    wnpc(2, 'hortelano', 'Benito', 'monje hortelano', sk(0x5a3a2a, 0x3a2a1a, 0xe0b090, 0x9a9a9a, { beard: 0x9a9a9a, hat: 'tonsure', acc: 'none' }), [
      'Nuestra regla dice «ora et labora»: reza y trabaja. Yo rezo con las manos en la tierra.',
      'Los monasterios guardaron libros, semillas y recetas durante siglos. Muchas plantas medicinales que hoy conoces las cultivaron monjes como yo.',
      'Un hermano me preguntó si Dios existe. Le di una azada y le dije: «Primero cava; luego conversamos». Hay preguntas que se responden mejor caminando o trabajando.',
    ]),
  ]);
  Object.assign(QUESTS, {
    anselmo: { text: 'Visita la abadía de Bec y escucha a Benito, el hortelano. Luego dime cómo defino a Dios.', needs: { pois: ['bec'], npcs: ['hortelano'] },
      riddle: { q: '¿Cómo define Anselmo a Dios?', a: ['Aquello mayor que lo cual nada puede pensarse', 'El primer motor inmóvil', 'Una estrella', 'La naturaleza'] } },
    maimonides: { text: 'Recorre la Mezquita de Córdoba, mi ciudad natal. Luego dime para quiénes escribí mi Guía.', needs: { pois: ['mezquita-cordoba'], npcs: [] },
      riddle: { q: '¿Para quiénes escribió Maimónides la Guía de perplejos?', a: ['Para quienes dudaban entre la fe y la filosofía', 'Para los reyes', 'Para los niños', 'Para los marineros'] } },
    algazali: { text: 'Visita el Parlamento de las Religiones y escucha a Santiago, el peregrino. Luego dime dónde encontré la certeza.', needs: { pois: ['parlamento'], npcs: ['peregrino'] },
      riddle: { q: '¿Dónde encontró Al-Ghazali la certeza?', a: ['En la experiencia mística, como una luz en el corazón', 'En un libro de leyes', 'En el dinero', 'En la guerra'] } },
    teresa: { text: 'Visita las murallas de Ávila y escucha a Miriam, la cantora. Luego dime cómo describí el alma.', needs: { pois: ['avila'], npcs: ['cantora'] },
      riddle: { q: '¿Cómo describe Teresa el alma?', a: ['Como un castillo de cristal con siete moradas', 'Como un río', 'Como una máquina', 'Como un pájaro enjaulado'] } },
    leibniz: { text: 'Visita el Parlamento de las Religiones. Luego dime en qué tipo de mundo vivimos, según yo.', needs: { pois: ['parlamento'], npcs: [] },
      riddle: { q: '¿En qué mundo vivimos, según Leibniz?', a: ['En el mejor de los mundos posibles', 'En el peor de los mundos', 'En un sueño', 'En un mundo sin razones'] } },
    weil: { text: 'Escucha a Benito, el hortelano, y a Miriam, la cantora. Luego dime qué virtud valoré por encima de todo.', needs: { pois: [], npcs: ['hortelano', 'cantora'] },
      riddle: { q: '¿Qué valoraba Simone Weil por encima de todo?', a: ['La atención', 'La riqueza', 'La fama', 'La velocidad'] } },
  });
  Object.assign(ANECDOTES, {
    anselmo: ['Cuando era abad, los monjes jóvenes me pedían consejos de educación. Les decía que un árbol al que se le atan las ramas con fuerza crece torcido: a los alumnos hay que guiarlos con libertad y con cariño.', 'Discutí con dos reyes de Inglaterra y tuve que exiliarme dos veces. Nunca dejé de escribirles con respeto.'],
    maimonides: ['Escribí a mi hermano que en un día atendía a pacientes desde la mañana hasta la noche, y que muchas veces tenía que examinarlos acostado, de tan cansado.', 'Mi tratado sobre el asma recomienda dormir bien, comer con moderación y tener buen ánimo. Un consejo que sigue valiendo.'],
    algazali: ['De joven, unos bandidos me robaron mis apuntes. Les supliqué que me los devolvieran; el jefe se rió y me dijo: «¿Qué clase de saber es el tuyo, si te lo pueden robar?». Desde entonces memoricé todo.', 'Antes de morir pedí mi mortaja, la besé y dije: «Escucho y obedezco». Murió conmigo una gran pregunta, pero no la paz.'],
    teresa: ['Una vez, cruzando un río, mi carreta volcó y caí al agua. Me quejé a Dios, y sentí que me decía: «Así trato a mis amigos». Le respondí: «¡Por eso tienes tan pocos!».', 'Escribí que Dios también anda entre los pucheros, en la cocina. Para mí, la oración no estaba lejos de la vida diaria.'],
    leibniz: ['Fui diplomático, bibliotecario, historiador e ingeniero de minas. Escribí unas quince mil cartas a más de mil personas.', 'Intenté reconciliar a católicos y protestantes, y también quise una lengua universal hecha de símbolos lógicos, para que las discusiones se resolvieran calculando: «¡Calculemos!».'],
    weil: ['De pequeña, con mi hermano André, que luego sería un gran matemático, recitábamos a Racine en el tren para impresionar a los pasajeros.', 'Una vez di parte de mi sueldo de profesora a los obreros en huelga. Para mí, pensar y actuar no podían ir separados.'],
    pascal: ['Para probar la presión del aire, mi cuñado subió un barómetro al Puy de Dôme, una montaña de Francia: allá arriba, el mercurio bajó. ¡El aire pesa!', 'En mis últimos años organicé en París una de las primeras líneas de transporte público: carrozas con horario fijo que cualquiera podía tomar por cinco céntimos.'],
  });
  BOOKS.push([
    { id: 'pensamientos', author: 'pascal', by: 'Blaise Pascal', title: 'Pensamientos', year: '1670', kind: 'reflexiones', at: BB[0],
      parts: [
        { t: 'Un libro inacabado', x: 'Pascal quería escribir una gran defensa de la fe cristiana, pero murió antes. Dejó cientos de papeles sueltos, atados en paquetes, que sus amigos publicaron como Pensamientos.' },
        { t: 'La caña pensante', x: 'El ser humano es solo una caña, la más débil de la naturaleza, pero una caña que piensa. Aunque el universo lo aplastara, sería más noble que el universo, porque sabe que muere.' },
        { t: 'Entre dos infinitos', x: 'Somos una nada frente al infinito de las estrellas y un todo frente al infinito de lo pequeño. Ese lugar intermedio nos asombra y nos inquieta.' },
        { t: 'La apuesta', x: 'Si la razón no puede decidir si Dios existe, hay que apostar igual, porque no apostar ya es una elección. Pascal propone apostar por Dios: se gana mucho y se pierde poco.' },
      ],
      quote: 'El corazón tiene razones que la razón no conoce.',
      q: { q: '¿Por qué dice Pascal que el ser humano es más noble que el universo?', a: ['Porque sabe que muere, y el universo no sabe nada', 'Porque es más grande', 'Porque es más fuerte', 'Porque vive más'], e: 'La dignidad del pensamiento.' } },
    { id: 'moradas', author: 'teresa', by: 'Teresa de Ávila', title: 'Las moradas o Castillo interior', year: '1577', kind: 'mística', at: BB[1],
      parts: [
        { t: 'Un castillo de cristal', x: 'Teresa imagina el alma como un castillo hecho de un solo diamante o de un cristal muy claro, con muchas habitaciones. En el centro vive Dios, y su luz ilumina todo.' },
        { t: 'Las primeras moradas', x: 'Muchos viven en el patio, entretenidos con las cosas de afuera, sin saber que dentro tienen un tesoro. La puerta para entrar es la oración y el conocimiento de uno mismo.' },
        { t: 'El gusano de seda', x: 'Teresa compara el alma con un gusano de seda que teje su capullo y muere a lo viejo, para salir convertido en mariposa blanca.' },
        { t: 'Las séptimas moradas', x: 'En el centro del castillo el alma se une con Dios en paz. Pero Teresa insiste: la prueba de esa unión no son las visiones, sino las obras de amor a los demás.' },
      ],
      quote: 'Nada te turbe, nada te espante; todo se pasa, Dios no se muda.',
      q: { q: '¿Cuál es, para Teresa, la prueba de haber llegado al centro del castillo?', a: ['Las obras de amor a los demás', 'Tener visiones', 'Ser famosa', 'Vivir en un palacio'], e: 'Lo dice al final de Las moradas.' } },
  ]);
  BOOKS[BOOKS.length - 1].forEach((b) => { b.q.book = b.title; });

  // ---------------------------------------------------------------- un debate entre los dos mundos
  try { VERSUS.push({ id: 'russell-pascal', a: 'russell', b: 'pascal', q: '¿Es razonable creer en Dios?', eje: null, va: 0, vb: 0,
    turns: [
      ['a', 'Si alguien afirma que existe algo que nadie puede ver ni comprobar, es esa persona la que debe dar las pruebas. Yo no he visto pruebas suficientes, así que no creo. No es soberbia: es honestidad.'],
      ['b', 'La razón tiene límites, y no puede decidir esta cuestión ni a favor ni en contra. Pero estamos embarcados: no apostar ya es una elección. Y el corazón tiene razones que la razón no conoce.'],
      ['a', 'Si apostamos por conveniencia, ¿por cuál de los miles de dioses de la historia apostamos? Prefiero vivir con la duda antes que con una creencia elegida por miedo a perder.'],
      ['b', 'No te pido que finjas. Te pido que busques con sinceridad, con la razón y con el corazón. Quien busca de verdad ya está en camino, crea o no al final.'],
    ],
    cierre: 'Russell pide pruebas y prefiere la duda honesta. Pascal reconoce los límites de la razón y apuesta con el corazón. Los dos coinciden en algo: la pregunta merece pensarse en serio, sin burlarse del otro.' }); } catch (e) { /* herramientas sin debates */ }
}

// ============================================================================
//  XXV · LAS PENSADORAS, XXVI · LA ASAMBLEA DE LA JUSTICIA y
//  XXVII · LA MONTAÑA DE LOS MÍSTICOS: lugares, ciudadanos, encargos, anécdotas y libros
// ============================================================================
{
  const PP = [[-17, 30], [17, 24], [17, 6], [-17, -2], [6, -40]];
  const BB = [[16, -12], [-16, 16]];
  const poi = (i, id, name, text, fact, q) => ({ id, at: PP[i], name, text, fact, q });
  const book = (b, i) => ({ ...b, at: BB[i] });

  // ---------------------------------------------------------------- XXV · Las pensadoras
  POIS.push([
    poi(0, 'cirey', 'El laboratorio de Cirey', 'En el castillo de Cirey, en el este de Francia, Émilie du Châtelet y Voltaire montaron hacia 1735 uno de los mejores laboratorios privados de Europa, con telescopios, prismas, balanzas y una biblioteca de miles de libros. Allí Émilie estudió la naturaleza del fuego, pesando metales calientes y fríos, y escribió de noche, durmiendo apenas unas horas.',
      'En 1737 Émilie y Voltaire se presentaron, cada uno por su lado y sin decírselo, a un concurso de la Academia de Ciencias sobre el fuego. Ninguno ganó, pero la Academia publicó los dos trabajos.',
      { q: '¿Qué estudió Émilie du Châtelet en Cirey para un concurso de la Academia?', a: ['La naturaleza del fuego', 'Los volcanes de la Luna', 'Las abejas', 'La música'], e: 'Su trabajo se publicó junto al de Voltaire.' }),
    poi(1, 'seneca-falls', 'La convención de Seneca Falls', 'En julio de 1848, en el pueblo de Seneca Falls, en Nueva York, unas trescientas personas se reunieron en una capilla para hablar de los derechos de las mujeres. Elizabeth Cady Stanton y Lucretia Mott redactaron una «Declaración de sentimientos» que copiaba la Declaración de Independencia, con un cambio: «todos los hombres y mujeres son creados iguales».',
      'El punto más discutido fue el derecho al voto. Muchos lo creían demasiado radical. Lo defendió Frederick Douglass, un hombre que había escapado de la esclavitud.',
      { q: '¿Qué cambio hizo la Declaración de Seneca Falls a la frase de la Independencia?', a: ['«Todos los hombres y mujeres son creados iguales»', 'Quitó la palabra «iguales»', 'Añadió un rey', 'Ninguno'], e: 'Fue en 1848, en Nueva York.' }),
    poi(2, 'akron', 'La iglesia de Akron', 'En mayo de 1851, en una iglesia de Akron, Ohio, se celebraba una convención por los derechos de las mujeres. Varios pastores decían que las mujeres eran débiles y que debían ser protegidas. Entonces se levantó Sojourner Truth, alta y con voz profunda, y habló de su vida: había arado, sembrado y cargado como cualquier hombre, y nadie la había protegido nunca.',
      'El discurso se conoce por una versión escrita años después con la famosa pregunta «¿Acaso no soy una mujer?». Una versión anterior, de 1851, es algo distinta, pero dice lo mismo en el fondo.',
      { q: '¿Qué respondió Sojourner Truth a quienes decían que las mujeres eran débiles?', a: ['Que ella había arado, sembrado y cargado como cualquier hombre', 'Que tenían razón', 'Que no le importaba', 'Que solo los reyes trabajan'], e: 'En Akron, en 1851.' }),
    poi(3, 'sufragio', 'El primer voto de las mujeres', 'En 1893, Nueva Zelanda fue el primer país del mundo en reconocer el voto de las mujeres en elecciones nacionales. Lo lograron tras años de campaña y una petición de casi treinta y dos mil firmas, que medía más de doscientos metros, pegada en un rollo de papel. La campaña la encabezó Kate Sheppard.',
      'En América Latina, Ecuador fue el primer país en reconocer el voto femenino, en 1929. En muchos países llegó mucho más tarde: en Suiza, en elecciones nacionales, recién en 1971.',
      { q: '¿Cuál fue el primer país en reconocer el voto de las mujeres en elecciones nacionales?', a: ['Nueva Zelanda, en 1893', 'Francia, en 1789', 'Grecia, en la Antigüedad', 'Suiza, en 1850'], e: 'Tras una petición de casi treinta y dos mil firmas.' }),
    poi(4, 'la-piece', 'La casa del exilio', 'En un pueblito del Jura francés, cerca de Ginebra, María Zambrano vivió años en una casa vieja junto a su hermana Araceli y muchos gatos. Allí, lejos de su país, escribió algunas de sus páginas más hermosas. Decía que el exilio, aunque duele, puede enseñar a ver lo esencial.',
      'Cuando volvió a Madrid en 1984, tenía ochenta años. Había salido de España a pie, cruzando los Pirineos, en el invierno de 1939.',
      { q: '¿Qué aprendió María Zambrano del exilio, según ella?', a: ['A ver lo esencial', 'A olvidar su lengua', 'A odiar a todos', 'Nada'], e: 'Vivió cuarenta y cinco años fuera de España.' }),
  ]);
  NPCS.push([
    wnpc(0, 'maestra', 'Lucía', 'maestra rural', sk(0x5a4a6a, 0x2a2a3a, 0xf0d0b0, 0x3a2a1a, { hat: 'longhair', acc: 'book' }), [
      'Mi abuela no sabía leer; no la dejaron ir a la escuela. Mi madre aprendió a escondidas. Yo enseño a leer a cuarenta niñas y niños.',
      'Cada vez que una niña lee su primera frase en voz alta, siento que se abre una puerta que estuvo cerrada siglos.',
      'Mary Wollstonecraft tenía razón: la diferencia no estaba en la cabeza de las niñas, sino en las puertas de las escuelas.',
    ], true),
    wnpc(1, 'sufragista', 'Kate', 'sufragista', sk(0xe8e8e8, 0x6a3a7a, 0xf4dcc8, 0x8a5a3a, { hat: 'longhair', acc: 'scroll' }), [
      'Juntamos firmas puerta por puerta, en el campo y en la ciudad. El rollo de papel era tan largo que lo desenrollamos por el piso del Parlamento.',
      'Nos decían que votar no era cosa de mujeres. Ahora parece increíble, ¿verdad? Muchas cosas injustas parecieron normales durante siglos.',
      'Lleva esta cinta violeta, blanca y verde: son los colores de las sufragistas. Dignidad, pureza y esperanza.',
    ], true),
    wnpc(2, 'obrero', 'Pierre', 'obrero tipógrafo', sk(0x4a4a5a, 0x2a2a2a, 0xe0c0a0, 0x2a1a10, { beard: 0x2a1a10, hat: 'cap', acc: 'none' }), [
      'Trabajo catorce horas al día. Una señora que se llama Flora Tristán vino al taller a hablarnos de unirnos. Al principio nos reímos de ella.',
      'Luego nos dijo algo que me dolió: «Ustedes se quejan de sus patrones, pero ¿cómo tratan a sus mujeres en casa?». Me quedé callado.',
      'Ahora creo que tenía razón. Nadie es libre del todo si en su propia casa hay alguien que no lo es.',
    ]),
  ]);
  Object.assign(QUESTS, {
    chatelet: { text: 'Visita mi laboratorio de Cirey. Luego dime qué gran obra traduje al francés.', needs: { pois: ['cirey'], npcs: [] },
      riddle: { q: '¿Qué obra tradujo Émilie du Châtelet?', a: ['Los Principia de Newton', 'La Odisea', 'El Quijote', 'La Biblia'] } },
    wollstonecraft: { text: 'Escucha a Lucía, la maestra rural, y visita Seneca Falls. Luego dime qué pedí para niñas y niños.', needs: { pois: ['seneca-falls'], npcs: ['maestra'] },
      riddle: { q: '¿Qué pidió Mary Wollstonecraft para niñas y niños?', a: ['Una educación igual', 'Escuelas separadas', 'Que no estudiaran', 'Solo bordado'] } },
    gouges: { text: 'Habla con Kate, la sufragista, y visita el lugar del primer voto. Luego dime qué declaración escribí.', needs: { pois: ['sufragio'], npcs: ['sufragista'] },
      riddle: { q: '¿Qué declaración escribió Olympe de Gouges?', a: ['La de los derechos de la mujer y de la ciudadana', 'La de independencia', 'La de guerra', 'Ninguna'] } },
    truth: { text: 'Visita la iglesia de Akron, donde hablé en 1851. Luego dime qué pregunta hice.', needs: { pois: ['akron'], npcs: [] },
      riddle: { q: '¿Qué preguntó Sojourner Truth en Akron?', a: ['¿Acaso no soy una mujer?', '¿Qué hora es?', '¿Dónde está el rey?', '¿Quién ganó?'] } },
    tristan: { text: 'Escucha a Pierre, el obrero tipógrafo. Luego dime qué propuse en La unión obrera.', needs: { pois: [], npcs: ['obrero'] },
      riddle: { q: '¿Qué propuso Flora Tristán?', a: ['Que los trabajadores de todos los países se unieran', 'Que se prohibieran los talleres', 'Que volviera el rey', 'Que nadie leyera'] } },
    stein: { text: 'Visita la casa del exilio y escucha a Lucía, la maestra. Luego dime qué estudié en mi tesis.', needs: { pois: ['la-piece'], npcs: ['maestra'] },
      riddle: { q: '¿Qué estudió Edith Stein en su tesis?', a: ['La empatía', 'Los planetas', 'La guerra', 'El dinero'] } },
  });
  Object.assign(ANECDOTES, {
    chatelet: ['Para pagar mis libros y mis instrumentos, a veces jugaba a las cartas y calculaba las probabilidades mejor que mis rivales. Ganaba bastante.', 'Voltaire escribió de mí que era «un gran hombre cuyo único defecto fue ser mujer». Lo decía como un elogio; yo habría preferido que no hiciera falta decirlo.'],
    wollstonecraft: ['Viajé sola por Escandinavia, con mi hija pequeña y una niñera, para resolver un asunto de negocios. Mis cartas de ese viaje se volvieron un libro muy leído.', 'Me casé con el filósofo William Godwin, pero cada uno tenía su casa y nos escribíamos notas durante el día. Decíamos que así no nos aburríamos nunca.'],
    gouges: ['Pegaba mis panfletos en las paredes de París, por la noche, con mis propias manos. Escribí más de cuarenta obras de teatro y montones de folletos políticos.', 'Me ofrecí a defender al rey Luis XVI en su juicio, no porque fuera monárquica, sino porque creía que todo acusado merece defensa. Me lo negaron.'],
    truth: ['Una vez, en un mitin, alguien dijo que yo era en realidad un hombre disfrazado. Abrí mi blusa delante de todos y dije que la vergüenza era de ellos, no mía.', 'Durante la Guerra Civil ayudé a conseguir comida y ropa para los soldados negros y, ya mayor, me negué a bajar de los tranvías de Washington reservados para blancos.'],
    tristan: ['En el barco hacia el Perú yo era la única mujer a bordo. El capitán se enamoró de mí, pero yo solo quería llegar y contar lo que viera.', 'Mi libro sobre Londres describe las fábricas, las cárceles y los barrios pobres. Me disfracé de hombre para entrar al Parlamento inglés, donde no admitían mujeres.'],
    stein: ['Durante la Primera Guerra Mundial fui enfermera voluntaria en un hospital de enfermedades contagiosas. Ahí aprendí más sobre la empatía que en todos los libros.', 'Le escribí al papa Pío XI, en 1933, para pedirle que hablara contra la persecución de los judíos.'],
    zambrano: ['En Roma vivía en un departamento lleno de gatos, más de una docena. Decía que los gatos le enseñaban a estar presente sin hacer ruido.', 'Cuando me dieron el Premio Cervantes estaba demasiado enferma para recibirlo en persona. Leyeron mi discurso, que hablaba del exilio y de la palabra.'],
  });
  BOOKS.push([
    book({ id: 'declaracion-mujer', author: 'gouges', by: 'Olympe de Gouges', title: 'Declaración de los derechos de la mujer y de la ciudadana', year: '1791', kind: 'declaración política',
      parts: [
        { t: 'Una pregunta a los hombres', x: 'La Declaración empieza así: «Hombre, ¿eres capaz de ser justo? Es una mujer quien te hace la pregunta». Olympe la dedicó a la reina María Antonieta.' },
        { t: 'Nacen iguales', x: 'Su primer artículo dice que la mujer nace libre y permanece igual al hombre en derechos. Las únicas distinciones sociales deben basarse en la utilidad común.' },
        { t: 'Subir a la tribuna', x: 'En el artículo diez escribe la frase más famosa: si la mujer tiene derecho a subir al cadalso, debe tener también el de subir a la tribuna, es decir, a hablar en público y en política.' },
        { t: 'Mujer, despierta', x: 'En el epílogo pide a las mujeres que reconozcan sus derechos: los hombres hicieron una revolución, pero no la compartieron con ellas.' },
      ],
      quote: 'Mujer, despierta: el rebato de la razón se hace oír en todo el universo.',
      q: { q: '¿Con qué pregunta empieza la Declaración de Olympe de Gouges?', a: ['«Hombre, ¿eres capaz de ser justo?»', '«¿Quién manda aquí?»', '«¿Hay alguien ahí?»', '«¿Dónde está el rey?»'], e: 'Así interpela a los revolucionarios.' } }, 0),
    book({ id: 'claros-bosque', author: 'zambrano', by: 'María Zambrano', title: 'Claros del bosque', year: '1977', kind: 'ensayo poético',
      parts: [
        { t: 'El claro', x: 'En el bosque, a veces, se abre un claro donde entra la luz. No se puede ir a buscarlo con un mapa: aparece. Así llegan ciertas verdades, cuando uno camina sin prisa.' },
        { t: 'No buscar', x: 'Zambrano escribe que el claro no hay que buscarlo: hay que dejar que se muestre. La razón que solo quiere dominar no ve; la que escucha, sí.' },
        { t: 'La palabra', x: 'En el claro se oye una palabra que no es para discutir, sino para comprender. Como la poesía, dice más de lo que dice.' },
        { t: 'Despertar', x: 'Pensar, para Zambrano, es como despertar despacio, sin apagar del todo los sueños. La vida necesita una razón que tenga el calor del corazón.' },
      ],
      quote: 'El claro del bosque es un centro en el que no siempre es posible entrar.',
      q: { q: '¿Qué es un «claro del bosque» para Zambrano?', a: ['Una verdad que aparece de pronto, cuando uno camina sin prisa', 'Un lugar para cortar árboles', 'Un río', 'Una ciudad'], e: 'No se encuentra con un mapa.' } }, 1),
  ]);
  BOOKS[BOOKS.length - 1].forEach((b) => { b.q.book = b.title; });

  // ---------------------------------------------------------------- XXVI · La asamblea de la justicia
  POIS.push([
    poi(0, 'seisachtheia', 'La sacudida de las cargas', 'En la Atenas antigua, cuando un campesino pedía un préstamo, ponía piedras en su campo para marcar la deuda. Si no podía pagar, perdía la tierra, y él y su familia podían ser vendidos como esclavos. Solón mandó arrancar esas piedras de los campos y anuló las deudas. Los atenienses llamaron a su reforma «la sacudida de las cargas».',
      'Solón escribió en un poema que había liberado la tierra negra, «antes esclava y ahora libre», y que había traído de vuelta a atenienses vendidos en tierras lejanas.',
      { q: '¿Qué marcaban las piedras en los campos de Atenas antes de Solón?', a: ['Que el campo estaba hipotecado por una deuda', 'Una tumba', 'Un templo', 'Un tesoro'], e: 'Solón las mandó arrancar.' }),
    poi(1, 'senado', 'El Senado romano', 'En la Curia, el edificio donde se reunía el Senado de Roma, los senadores discutían las leyes sentados en bancos de madera. En noviembre del año 63 a. C., Cicerón denunció allí a Catilina, que estaba presente. Los senadores que estaban a su lado se apartaron de él, dejándolo solo en su banco.',
      'La palabra «senado» viene del latín «senex», anciano: era el consejo de los mayores.',
      { q: '¿De qué palabra latina viene «senado»?', a: ['De «senex», anciano', 'De «sol»', 'De «sena», cena', 'De «signum», señal'], e: 'Era el consejo de los mayores.' }),
    poi(2, 'valladolid', 'La Junta de Valladolid', 'Entre 1550 y 1551, el emperador Carlos V suspendió las nuevas conquistas en América y reunió en Valladolid a un grupo de juristas y teólogos para decidir si eran justas. Juan Ginés de Sepúlveda defendió la guerra contra los pueblos indígenas; Bartolomé de las Casas, durante cinco días, leyó un enorme alegato a favor de su libertad.',
      'Es uno de los primeros debates de la historia en que un imperio discutió si sus propias conquistas eran justas.',
      { q: '¿Qué se discutió en la Junta de Valladolid?', a: ['Si las conquistas en América eran justas', 'El precio del trigo', 'Quién sería el próximo rey', 'Un torneo de caballería'], e: 'Las Casas contra Sepúlveda.' }),
    poi(3, 'marcha-sal', 'La Marcha de la Sal', 'El 12 de marzo de 1930, Gandhi salió de su comunidad cerca de Ahmedabad con setenta y ocho compañeros. Caminaron veinticuatro días, unos 390 kilómetros, hasta la playa de Dandi. Allí, el 6 de abril, Gandhi tomó un puñado de sal del mar, desobedeciendo la ley británica que prohibía a los indios producir su propia sal.',
      'En las semanas siguientes, unas sesenta mil personas fueron encarceladas por hacer lo mismo. El mundo entero miró hacia la India.',
      { q: '¿Qué hizo Gandhi al llegar a la playa de Dandi?', a: ['Tomó un puñado de sal del mar, desobedeciendo la ley', 'Se fue en barco', 'Construyó un castillo', 'Pagó el impuesto'], e: 'El 6 de abril de 1930.' }),
    poi(4, 'montgomery', 'El autobús de Montgomery', 'El 1 de diciembre de 1955, en Montgomery, Alabama, Rosa Parks, una costurera de cuarenta y dos años, se negó a ceder su asiento en el autobús a un hombre blanco, como exigían las leyes de segregación. Fue arrestada. La comunidad negra de la ciudad respondió con un boicot a los autobuses que duró 381 días.',
      'Rosa Parks contó más tarde que no estaba cansada del cuerpo, como muchos creyeron: estaba cansada de ceder.',
      { q: '¿Cuántos días duró el boicot a los autobuses de Montgomery?', a: ['381 días', 'Un día', 'Una semana', 'Diez años'], e: 'Terminó con la segregación en los autobuses de la ciudad.' }),
  ]);
  NPCS.push([
    wnpc(0, 'jueza', 'Aurelia', 'jueza', sk(0x1a1a1a, 0xe8e8e8, 0xe0b090, 0x6a6a6a, { hat: 'none', acc: 'book' }), [
      'Cada día escucho a dos personas que creen tener razón. Mi trabajo es escuchar a las dos antes de decidir. Parece fácil; no lo es.',
      'Una vez juzgué a un hombre que había robado pan para sus hijos. La ley decía una cosa; la justicia, quizás, otra. Esas son las noches en que no duermo.',
      'Montesquieu decía que el juez debe ser solo la boca que pronuncia las palabras de la ley. A veces pienso que también debe tener oídos y corazón.',
    ], true),
    wnpc(1, 'campesino', 'Ramu', 'salinero de la costa', sk(0xf4f0e8, 0xe8e0d0, 0x8a5a3a, 0x1a1410, { hat: 'turban', acc: 'none' }), [
      'Mi familia saca sal del mar desde hace generaciones. Un día el gobierno dijo que la sal era suya y que había que pagarla. ¡La sal del mar!',
      'Cuando el Mahatma llegó a la playa, toda mi aldea fue a verlo. Tomó sal con la mano. Al día siguiente, todos hicimos lo mismo.',
      'Me llevaron preso tres semanas. No me arrepiento. Aprendí que un hombre pobre también puede decir «no».',
    ]),
    wnpc(2, 'costurera', 'Claudette', 'costurera de Montgomery', sk(0x6a8aaa, 0x2a3a5a, 0x5a3a2a, 0x1a1410, { hat: 'longhair', acc: 'none' }), [
      'Durante el boicot caminábamos kilómetros cada mañana para ir al trabajo. Mis pies dolían, pero mi alma descansaba.',
      'Había taxis de vecinos que cobraban lo mismo que el autobús, y autos que compartíamos. Toda la ciudad se organizó.',
      'Una anciana dijo una frase que nunca olvido: «Mis pies están cansados, pero mi alma está en paz».',
    ], true),
  ]);
  Object.assign(QUESTS, {
    solon: { text: 'Visita el lugar de la sacudida de las cargas. Luego dime qué hice con las deudas.', needs: { pois: ['seisachtheia'], npcs: [] },
      riddle: { q: '¿Qué hizo Solón con las deudas de los pobres?', a: ['Las anuló y liberó a los esclavizados por ellas', 'Las duplicó', 'Las vendió', 'Nada'] } },
    ciceron: { text: 'Visita el Senado y escucha a Aurelia, la jueza. Luego dime qué es la verdadera ley.', needs: { pois: ['senado'], npcs: ['jueza'] },
      riddle: { q: '¿Qué es la verdadera ley para Cicerón?', a: ['La recta razón conforme a la naturaleza', 'La voluntad del más fuerte', 'Lo que diga el césar', 'Una costumbre cualquiera'] } },
    lascasas: { text: 'Visita la Junta de Valladolid. Luego dime qué defendí ante el emperador.', needs: { pois: ['valladolid'], npcs: [] },
      riddle: { q: '¿Qué defendió Las Casas en Valladolid?', a: ['Que los indígenas eran libres y plenamente humanos', 'La guerra de conquista', 'La esclavitud', 'Nada'] } },
    montesquieu: { text: 'Escucha a Aurelia, la jueza. Luego dime en cuántos poderes dividí el Estado.', needs: { pois: [], npcs: ['jueza'] },
      riddle: { q: '¿En cuántos poderes dividió Montesquieu el Estado?', a: ['Tres: legislativo, ejecutivo y judicial', 'Uno solo', 'Diez', 'Ninguno'] } },
    gandhi: { text: 'Camina hasta el lugar de la Marcha de la Sal y escucha a Ramu, el salinero. Luego dime cómo se llama mi método.', needs: { pois: ['marcha-sal'], npcs: ['campesino'] },
      riddle: { q: '¿Cómo llamó Gandhi a su método?', a: ['Satyagraha, la fuerza de la verdad', 'Blitzkrieg', 'Laissez faire', 'Carpe diem'] } },
    king: { text: 'Visita el autobús de Montgomery y escucha a Claudette, la costurera. Luego dime qué puede expulsar al odio.', needs: { pois: ['montgomery'], npcs: ['costurera'] },
      riddle: { q: '¿Qué puede expulsar al odio, según Martin Luther King?', a: ['Solo el amor', 'Más odio', 'El dinero', 'El miedo'] } },
  });
  Object.assign(ANECDOTES, {
    solon: ['Cuando el tirano Pisístrato tomó el poder en Atenas, yo ya era muy viejo. Me puse la armadura y salí a la puerta de mi casa para mostrar que no estaba de acuerdo. Me dejaron en paz por mi edad.', 'Un amigo me preguntó si había dado a Atenas las mejores leyes. Le respondí: «Las mejores que podían aceptar».'],
    ciceron: ['Mi apellido viene de «cicer», garbanzo. Me aconsejaron cambiarlo para hacer carrera política. Dije que lo haría más famoso que los apellidos más nobles. Lo logré.', 'Cuando me exiliaron de Roma, me deprimí tanto que mis cartas de esa época están llenas de quejas. Ni los grandes oradores son de piedra.'],
    lascasas: ['Crucé el océano Atlántico unas catorce veces, en barcos de madera, para defender a los indígenas ante la corte. Viví noventa y dos años y seguí escribiendo hasta el final.', 'Intenté fundar una comunidad pacífica en Venezuela, con campesinos españoles e indígenas trabajando juntos. Fracasó, y me sentí tan derrotado que me encerré años en un convento a estudiar.'],
    montesquieu: ['Mientras escribía, me paseaba por mi jardín con un bastón, en bata, y los visitantes a veces me confundían con el jardinero.', 'Mis «Cartas persas» se publicaron sin mi nombre en Ámsterdam. Todo París adivinó quién las había escrito, y se vendieron tanto que los libreros pedían a otros autores: «escríbanme unas cartas persas».'],
    gandhi: ['Escribía todos los días, y cuando se me cansaba la mano derecha, escribía con la izquierda. Cada lunes era mi día de silencio: no decía ni una palabra.', 'En Londres, en 1931, fui a ver al rey vestido con mi ropa sencilla de algodón. Un periodista me preguntó si no iba poco vestido. Le respondí: «El rey llevaba ropa suficiente para los dos».'],
    king: ['Saqué notas muy normales en la clase de oratoria del seminario. Luego, mis discursos movieron a millones. Nunca hay que desanimarse por una mala nota.', 'La parte más famosa de mi discurso, «Tengo un sueño», no estaba en el papel. Una cantante, Mahalia Jackson, me gritó desde atrás: «¡Cuéntales del sueño, Martin!». Y improvisé.'],
    rawls: ['Mis alumnos recuerdan que cada vez que hablaba de otros filósofos, intentaba presentar sus ideas de la mejor manera posible, incluso las que yo no compartía. Decía que era una cuestión de justicia también.', 'No me gustaba dar entrevistas ni recibir premios. Prefería pasar horas en mi escritorio, puliendo una sola idea.'],
  });
  BOOKS.push([
    book({ id: 'espiritu-leyes', author: 'montesquieu', by: 'Montesquieu', title: 'Del espíritu de las leyes', year: '1748', kind: 'tratado político',
      parts: [
        { t: 'Las leyes y su espíritu', x: 'Montesquieu estudia las leyes de muchos pueblos y descubre que dependen del clima, la religión, el comercio y las costumbres. Cada país necesita leyes adecuadas a su manera de vivir.' },
        { t: 'Tres formas de gobierno', x: 'Distingue la república, la monarquía y el despotismo. Cada una tiene un principio: la virtud, el honor y el miedo.' },
        { t: 'El poder frena al poder', x: 'Todo el que tiene poder tiende a abusar de él, hasta encontrar límites. Por eso hay que separar el poder legislativo, el ejecutivo y el judicial.' },
        { t: 'La libertad', x: 'La libertad no es hacer lo que uno quiere, sino poder hacer todo lo que las leyes permiten, y no ser obligado a hacer lo que no ordenan.' },
      ],
      quote: 'Para que no se pueda abusar del poder, es preciso que el poder frene al poder.',
      q: { q: '¿Qué principio tiene el despotismo, según Montesquieu?', a: ['El miedo', 'La virtud', 'El honor', 'La alegría'], e: 'La república se basa en la virtud y la monarquía en el honor.' } }, 0),
    book({ id: 'teoria-justicia', author: 'rawls', by: 'John Rawls', title: 'Teoría de la justicia', year: '1971', kind: 'filosofía política',
      parts: [
        { t: 'La primera virtud', x: 'Rawls empieza diciendo que la justicia es la primera virtud de las instituciones, como la verdad lo es de las teorías. Una ley injusta debe cambiarse, por eficiente que sea.' },
        { t: 'La posición original', x: 'Imagina a personas que deben acordar las reglas de su sociedad sin saber quiénes serán en ella: ricas o pobres, con talento o sin él. Es el velo de ignorancia.' },
        { t: 'Dos principios', x: 'Detrás del velo elegiríamos: primero, iguales libertades básicas para todos; segundo, que las desigualdades beneficien a los que están peor y que haya igualdad de oportunidades.' },
        { t: 'La lotería natural', x: 'Nadie merece haber nacido con más talento o en una familia más rica. Una sociedad justa no deja que esa lotería decida la vida de las personas.' },
      ],
      quote: 'La justicia es la primera virtud de las instituciones sociales, como la verdad lo es de los sistemas de pensamiento.',
      q: { q: '¿Qué es la «posición original» de Rawls?', a: ['Acordar las reglas sin saber quién serás en la sociedad', 'El lugar donde nació Rawls', 'Una postura de yoga', 'El primer puesto en una carrera'], e: 'Detrás del velo de ignorancia.' } }, 1),
  ]);
  BOOKS[BOOKS.length - 1].forEach((b) => { b.q.book = b.title; });

  // ---------------------------------------------------------------- XXVII · La montaña de los místicos
  POIS.push([
    poi(0, 'cueva-muro', 'La cueva frente al muro', 'En el monte Song, en China, cerca del monasterio de Shaolin, hay una pequeña cueva donde, según la tradición, Bodhidharma meditó nueve años mirando la pared. Se cuenta que su sombra quedó grabada en la roca. Un discípulo, Huike, esperó afuera en la nieve para que lo aceptara como alumno.',
      'Los monjes de Shaolin dicen que Bodhidharma les enseñó ejercicios para fortalecer el cuerpo después de tantas horas sentados. Así nacería, según la leyenda, el famoso kung-fu de Shaolin.',
      { q: '¿Cuántos años meditó Bodhidharma frente al muro, según la leyenda?', a: ['Nueve', 'Uno', 'Cuarenta', 'Cien'], e: 'Cerca del monasterio de Shaolin.' }),
    poi(1, 'cueva-milarepa', 'Las cuevas del ermitaño', 'En las montañas del Tíbet y de Nepal hay muchas cuevas donde, según la tradición, meditó Milarepa. Algunas están a más de cuatro mil metros de altura. En una de ellas, la cueva de la Sombra de Garuda, se ven todavía marcas en la roca que los peregrinos atribuyen a su mano.',
      'Los yoguis del Tíbet practican el «tummo», una meditación para producir calor interior. Se dice que Milarepa sobrevivía así a los inviernos vestido solo con una tela de algodón.',
      { q: '¿Qué práctica tibetana permitiría resistir el frío, según la tradición?', a: ['El tummo, la meditación del calor interior', 'Comer mucho', 'Correr sin parar', 'Dormir todo el invierno'], e: 'Milarepa vestía solo una tela de algodón.' }),
    poi(2, 'arunachala', 'La montaña de Arunachala', 'Arunachala es una montaña sagrada en el sur de la India, junto a la ciudad de Tiruvannamalai. Los peregrinos la rodean descalzos, caminando unos catorce kilómetros. Ramana Maharshi llegó allí a los dieciséis años y nunca se fue. Decía que la montaña misma enseñaba en silencio.',
      'En la luna llena del mes de Kartikai se enciende un enorme fuego en la cima, que se ve desde muy lejos, y cientos de miles de personas rodean la montaña.',
      { q: '¿Qué hacen los peregrinos en Arunachala?', a: ['La rodean caminando descalzos', 'La escalan con cuerdas', 'Le disparan flechas', 'Nada'], e: 'Unos catorce kilómetros.' }),
    poi(3, 'benares', 'Los telares de Benarés', 'Benarés o Varanasi, a orillas del Ganges, es una de las ciudades habitadas más antiguas del mundo y la más sagrada para los hindúes. Allí vivió Kabir, el tejedor. Todavía hoy, en sus callejuelas, se oye el ruido de los telares que tejen los famosos saris de seda de Benarés.',
      'Kabir comparaba el cuerpo con una tela: «Esta sábana la tejió el Tejedor con hilos finos; los santos la usaron con cuidado, y Kabir la devolvió tal como la recibió».',
      { q: '¿Con qué comparaba Kabir el cuerpo?', a: ['Con una tela tejida con hilos finos', 'Con una espada', 'Con una piedra', 'Con un barco'], e: 'Kabir era tejedor de oficio.' }),
    poi(4, 'cuatro-monasterios', 'Los cuatro monasterios', 'Según la tradición, Shankara fundó cuatro grandes monasterios en los cuatro extremos de la India: Sringeri en el sur, Dwarka en el oeste, Puri en el este y Joshimath en el norte, en el Himalaya. Cada uno guarda uno de los cuatro Vedas. Más de mil años después, siguen funcionando.',
      'Así, Shankara unió con caminos de peregrinación un país enorme, lleno de lenguas y reinos distintos.',
      { q: '¿Cuántos monasterios fundó Shankara en los extremos de la India?', a: ['Cuatro', 'Uno', 'Doce', 'Cien'], e: 'Uno en cada punto cardinal.' }),
  ]);
  NPCS.push([
    wnpc(0, 'tejedora', 'Lakshmi', 'tejedora de seda', sk(0xc82a5a, 0xe8b048, 0x8a5a3a, 0x1a1410, { hat: 'braids', acc: 'none' }), [
      'Tejo un sari en tres semanas. Si me distraigo un segundo, el dibujo se tuerce. Mi abuela decía que tejer es una forma de rezar.',
      'Canto los versos de Kabir mientras tejo: el ritmo del telar y el ritmo del poema son el mismo.',
      'Hindúes y musulmanes tejemos juntos en esta calle desde hace siglos. La seda no pregunta de qué religión son tus manos.',
    ], true),
    wnpc(1, 'monje', 'Tenzin', 'monje tibetano', sk(0x8a2a2a, 0xe8b048, 0xb08060, 0x1a1410, { hat: 'bald', acc: 'none' }), [
      'Mira esas banderas de colores. Tienen oraciones escritas: cada vez que el viento las mueve, las oraciones viajan por el mundo.',
      'Mi maestro me hizo hacer un mandala de arena durante semanas. Cuando lo terminé, lo barrió. Así aprendí que nada dura para siempre.',
      'Respira. Antes de hablar con los sabios de esta montaña, aquieta un poco tu mente. Tres respiraciones lentas bastan para empezar.',
    ]),
    wnpc(2, 'peregrina', 'Anjali', 'peregrina descalza', sk(0xe8a030, 0xf4f0e8, 0x9a6a4a, 0x2a1a10, { hat: 'longhair', acc: 'staff' }), [
      'He rodeado la montaña descalza más de cien veces. Al principio me dolían los pies; ahora, mientras camino, se me aquieta el corazón.',
      'Le pregunté a un sadhu cuál era el secreto. Me dijo: «No hay secreto. Camina, y deja que los pensamientos se cansen antes que tú».',
      'En la cima de la montaña, en la noche de luna llena, encienden un fuego enorme. Todos miramos hacia arriba al mismo tiempo, en silencio.',
    ], true),
  ]);
  Object.assign(QUESTS, {
    bodhidharma: { text: 'Visita la cueva frente al muro y escucha a Tenzin, el monje. Luego dime qué le respondí al emperador.', needs: { pois: ['cueva-muro'], npcs: ['monje'] },
      riddle: { q: '¿Qué mérito dijo Bodhidharma que tenía el emperador por construir templos?', a: ['Ninguno', 'Muchísimo', 'Un reino en el cielo', 'La inmortalidad'] } },
    huineng: { text: 'Escucha a Tenzin, el monje. Luego dime qué dice mi poema sobre el polvo.', needs: { pois: [], npcs: ['monje'] },
      riddle: { q: '¿Qué dice el poema de Huineng?', a: ['Que desde el principio no hay ni una cosa donde se pose el polvo', 'Que hay que barrer cada día', 'Que el polvo es oro', 'Que los espejos son malos'] } },
    milarepa: { text: 'Visita las cuevas del ermitaño. Luego dime qué me hizo hacer mi maestro Marpa.', needs: { pois: ['cueva-milarepa'], npcs: [] },
      riddle: { q: '¿Qué le hizo hacer Marpa a Milarepa?', a: ['Construir y derribar torres de piedra', 'Leer mil libros', 'Viajar a la India', 'Nada'] } },
    kabir: { text: 'Visita los telares de Benarés y escucha a Lakshmi, la tejedora. Luego dime dónde está lo divino, según yo.', needs: { pois: ['benares'], npcs: ['tejedora'] },
      riddle: { q: '¿Dónde está lo divino, según Kabir?', a: ['Dentro de cada persona', 'Solo en el templo', 'Solo en la mezquita', 'En el oro'] } },
    mirabai: { text: 'Escucha a Lakshmi, la tejedora, y a Anjali, la peregrina. Luego dime a quién dediqué mis canciones.', needs: { pois: [], npcs: ['tejedora', 'peregrina'] },
      riddle: { q: '¿A quién cantaba Mirabai?', a: ['A Krishna', 'Al rey', 'Al mar', 'A la guerra'] } },
    ramana: { text: 'Rodea la montaña de Arunachala y escucha a Anjali, la peregrina. Luego dime qué pregunta enseñaba.', needs: { pois: ['arunachala'], npcs: ['peregrina'] },
      riddle: { q: '¿Qué pregunta enseñaba Ramana Maharshi?', a: ['¿Quién soy yo?', '¿Cuánto tengo?', '¿Dónde está el tesoro?', '¿Quién ganará?'] } },
  });
  Object.assign(ANECDOTES, {
    bodhidharma: ['Una leyenda cuenta que, para no dormirme en la meditación, me corté los párpados y los tiré al suelo. Allí brotaron las primeras plantas de té, que desde entonces ayudan a los monjes a mantenerse despiertos.', 'Otra leyenda dice que crucé el río Yangtsé de pie sobre una sola caña. Los pintores chinos me dibujan así desde hace siglos.'],
    huineng: ['Cuando recibí el manto del quinto patriarca, tuve que huir de noche: algunos monjes envidiosos querían quitármelo. Viví quince años escondido entre cazadores, comiendo verduras que cocinaba en sus ollas de carne.', 'Mi cuerpo se conserva momificado en un templo del sur de China, sentado en meditación, desde hace más de mil trescientos años.'],
    milarepa: ['Un día unos ladrones entraron de noche en mi cueva a robar. Me reí y les dije: «Yo no encuentro nada aquí de día; ¿qué esperan encontrar ustedes de noche?».', 'Mi hermana Peta me encontró años después, flaco y verde en una cueva, y lloró de vergüenza. Más tarde ella también se hizo yoguini.'],
    kabir: ['Me casé y tuve hijos, y seguí tejiendo toda la vida. Decía que no hace falta irse al bosque para encontrar lo divino: basta tu casa y tu telar, si los miras bien.', 'Benarés era la ciudad donde los hindúes querían morir para liberarse. Al final de mi vida me fui a morir a Magahar, un pueblo que se consideraba de mal agüero, para demostrar que la liberación no depende del lugar.'],
    mirabai: ['El gran músico Tansen y el emperador Akbar, según una leyenda, vinieron disfrazados a escucharme cantar, y el emperador dejó un collar de perlas a los pies de Krishna.', 'Una vez un monje se negó a hablar conmigo porque era mujer. Le respondí que creía que en Vrindavan solo había un hombre, Krishna, y que todos los demás éramos sus devotas. Se rió y me recibió.'],
    ramana: ['Durante mis primeros años en Arunachala estaba tan absorto en la meditación que los insectos me picaban las piernas y no me daba cuenta. Unos niños me tiraban piedras, y un buen hombre me protegió.', 'En el ashram yo mismo cortaba verduras en la cocina a las cuatro de la mañana. Decía que el trabajo bien hecho también es meditación.'],
    shankara: ['Una leyenda cuenta que debatí durante días con un gran maestro, Mandana Mishra, y que la jueza del debate fue su esposa, Ubhaya Bharati, una mujer muy sabia. Ella declaró mi victoria, pero luego me desafió a mí.', 'Aunque había renunciado a todo, volví a casa para el funeral de mi madre, como se lo había prometido. Los sacerdotes del pueblo no quisieron ayudarme, así que la despedí yo solo.'],
  });
  BOOKS.push([
    book({ id: 'sutra-estrado', author: 'huineng', by: 'Huineng', title: 'El Sutra del estrado', year: 'siglo VIII', kind: 'texto zen',
      parts: [
        { t: 'Un leñador', x: 'El sutra empieza con la vida de Huineng, el leñador pobre y analfabeto que se convirtió en el sexto patriarca del Chan. Es el único texto budista chino al que se llamó «sutra», como a las palabras del Buda.' },
        { t: 'El poema del espejo', x: 'Cuenta el concurso de poemas: uno decía que la mente es un espejo que hay que limpiar del polvo; Huineng respondió que desde el principio no hay ni una cosa donde se pose el polvo.' },
        { t: 'Súbito', x: 'Huineng enseña que la naturaleza de Buda está en todos, ricos y pobres, letrados o no. Por eso el despertar puede llegar de golpe, como cuando se enciende una lámpara en un cuarto oscuro.' },
        { t: 'Sin apego', x: 'La práctica, dice, consiste en no aferrarse a ningún pensamiento: dejar que pasen como nubes, sin rechazarlos ni perseguirlos.' },
      ],
      quote: 'Desde el principio no hay ni una cosa: ¿dónde se posaría el polvo?',
      q: { q: '¿Por qué el Sutra del estrado es especial?', a: ['Es el único texto chino al que se llamó «sutra», como a las palabras del Buda', 'Porque es el más corto del mundo', 'Porque lo escribió un emperador', 'Porque está en latín'], e: 'Recoge las enseñanzas de Huineng.' } }, 0),
    book({ id: 'cien-mil-cantos', author: 'milarepa', by: 'Milarepa', title: 'Los cien mil cantos', year: 'siglos XI – XII', kind: 'poesía mística',
      parts: [
        { t: 'Canciones en las cuevas', x: 'Milarepa no escribía tratados: cantaba. Sus discípulos recogieron sus canciones, improvisadas para cazadores, pastores, ladrones, demonios y reyes.' },
        { t: 'Impermanencia', x: 'Todo lo que se junta se separa, todo lo que se construye se derrumba, todo lo que nace muere. Cantarlo no da tristeza: libera de aferrarse.' },
        { t: 'El cazador', x: 'Un cazador persiguió a un ciervo hasta la cueva de Milarepa. El yogui le cantó una canción sobre la compasión; el cazador rompió su arco y se hizo su discípulo.' },
        { t: 'Alegría', x: 'Aunque vivía en la pobreza total, Milarepa cantaba que nunca había sido tan feliz: en las montañas solitarias, decía, la mente es libre como un pájaro.' },
      ],
      quote: 'Todo lo que se junta acaba separándose; todo lo que se eleva acaba cayendo.',
      q: { q: '¿Qué le pasó al cazador que llegó a la cueva de Milarepa?', a: ['Escuchó su canción, rompió el arco y se hizo su discípulo', 'Lo atrapó', 'Huyó asustado', 'Se perdió'], e: 'Por una canción sobre la compasión.' } }, 1),
  ]);
  BOOKS[BOOKS.length - 1].forEach((b) => { b.q.book = b.title; });

  // ---------------------------------------------------------------- debates entre los mundos
  try {
    VERSUS.push(
      { id: 'wollstonecraft-rousseau', a: 'wollstonecraft', b: 'rousseau', q: '¿Deben educarse igual niñas y niños?', eje: null, va: 0, vb: 0,
        turns: [
          ['b', 'Hombres y mujeres son distintos por naturaleza, y su educación debe serlo. Sofía debe aprender a agradar a Emilio y a cuidar del hogar; Emilio, a pensar y a gobernarse.'],
          ['a', 'Escribiste un libro admirable sobre la libertad de los niños, y luego encerraste a las niñas. Si a Sofía solo le enseñas a agradar, claro que parecerá menos racional: no le diste con qué pensar.'],
          ['b', 'Temo que, si las mujeres se vuelven como los hombres, se pierda algo valioso que solo ellas tienen.'],
          ['a', 'No quiero que sean como los hombres, sino dueñas de sí mismas. Dales la misma escuela y deja que cada una decida quién quiere ser. La razón no tiene sexo.'],
        ],
        cierre: 'Rousseau creyó en una naturaleza distinta para cada sexo. Wollstonecraft respondió que las diferencias venían de la educación. Hoy las escuelas de casi todo el mundo son mixtas: ella ganó buena parte del debate.' },
      { id: 'gandhi-maquiavelo', a: 'gandhi', b: 'maquiavelo', q: '¿El fin justifica los medios?', eje: null, va: 0, vb: 0,
        turns: [
          ['b', 'Un gobernante que quiere salvar a su pueblo no puede ser siempre bueno. A veces debe mentir o usar la fuerza. Al final, lo que se juzga es el resultado.'],
          ['a', 'Los medios son como la semilla y el fin como el árbol. Si siembras violencia y mentira, no cosecharás paz ni verdad. El fin está ya dentro de los medios.'],
          ['b', 'Bonito, pero los imperios no se retiran con buenas palabras. ¿Qué haces si tu enemigo no tiene escrúpulos?'],
          ['a', 'Le muestro su injusticia ante el mundo entero, sin odiarlo, y acepto el castigo. Así lo hicimos, y un imperio se retiró de la India. La no violencia no es debilidad: es la fuerza más difícil.'],
        ],
        cierre: 'Maquiavelo mira la política como es, con su dureza. Gandhi cree que los medios deciden los fines. Desde entonces, cada lucha por la justicia se pregunta qué caminos está dispuesta a recorrer.' },
      { id: 'shankara-nagarjuna', a: 'shankara', b: 'nagarjuna', q: '¿Existe un yo verdadero?', eje: null, va: 0, vb: 0,
        turns: [
          ['b', 'Busca tu yo: ¿está en el cuerpo, en los pensamientos, en las sensaciones? Todo cambia y depende de otras cosas. Nada tiene un ser propio. Todo es vacío.'],
          ['a', 'Pero ¿quién es el que busca? Ves cambiar el cuerpo y los pensamientos; tú eres el testigo que los ve cambiar. Ese testigo no cambia: es el Atman, y es lo mismo que Brahman.'],
          ['b', 'Si te aferras a un yo eterno, sigues atado. Vaciar también la idea del yo es la verdadera libertad.'],
          ['a', 'Y si lo vacías todo, ¿quién queda libre? Lo que buscas no es una cosa entre las cosas, sino la conciencia en la que todas aparecen.'],
        ],
        cierre: 'Shankara encontró en el fondo un yo que es uno con todo. Nagarjuna encontró que no hay nada fijo, ni siquiera el yo. Dos caminos de la India que siguen dialogando.' },
    );
  } catch (e) { /* herramientas sin debates */ }
}
