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
