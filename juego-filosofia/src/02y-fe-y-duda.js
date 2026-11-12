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

// ============================================================================
//  XXVIII · LA ESCUELA DE LA MENTE, XXIX · EL BOSQUE DE LA TIERRA y
//  XXX · LA TORRE DE LOS NÚMEROS: lugares, ciudadanos, encargos, anécdotas y libros
// ============================================================================
{
  const PP = [[-17, 30], [17, 24], [17, 6], [-17, -2], [6, -40]];
  const BB = [[16, -12], [-16, 16]];
  const poi = (i, id, name, text, fact, q) => ({ id, at: PP[i], name, text, fact, q });
  const book = (b, i) => ({ ...b, at: BB[i] });

  // ---------------------------------------------------------------- XXVIII · La escuela de la mente
  POIS.push([
    poi(0, 'orbis-pictus', 'El mundo en imágenes', 'En 1658 se publicó en Núremberg el «Orbis sensualium pictus», de Comenio: el mundo de las cosas sensibles en imágenes. Cada página tenía un grabado, con objetos numerados, y debajo sus nombres en latín y en alemán. Por primera vez muchos niños aprendían mirando dibujos y no solo repitiendo palabras.',
      'Empieza con un maestro que invita a un niño: «Ven, muchacho, aprende a ser sabio». Fue traducido a muchas lenguas y usado en las escuelas durante casi dos siglos.',
      { q: '¿Qué tenía de nuevo el Orbis pictus de Comenio?', a: ['Cada palabra iba acompañada de un dibujo', 'No tenía palabras', 'Estaba escrito en clave', 'Era un mapa de estrellas'], e: 'Uno de los primeros libros ilustrados para niños.' }),
    poi(1, 'stans', 'El orfanato de Stans', 'En 1798 la guerra arrasó el pueblo de Stans, en Suiza, y dejó decenas de niños huérfanos. Pestalozzi, ya con más de cincuenta años, se hizo cargo de ellos en un convento vacío, sin ayudantes. Los niños llegaban sucios, enfermos y desconfiados. Él les enseñaba a leer, a contar y a trabajar, y sobre todo a cuidarse entre ellos.',
      'Cuando un pueblo vecino se incendió, los niños de Stans, que no tenían nada, pidieron recibir a otros huérfanos y compartir con ellos su pan.',
      { q: '¿Qué pidieron los huérfanos de Stans cuando se incendió un pueblo vecino?', a: ['Recibir a otros huérfanos y compartir su pan', 'Irse de vacaciones', 'Más juguetes', 'Nada'], e: 'Habían aprendido a cuidarse entre ellos.' }),
    poi(2, 'casa-bambini', 'La Casa de los Niños', 'El 6 de enero de 1907, en el barrio pobre de San Lorenzo, en Roma, Maria Montessori abrió la primera «Casa dei Bambini» para unos cincuenta niños pequeños que pasaban el día solos mientras sus padres trabajaban. Puso mesas y sillas ligeras de su tamaño, estantes bajos y materiales para tocar. Los niños, que al principio lloraban y peleaban, empezaron a concentrarse y a trabajar con calma.',
      'Montessori observó que un niña de tres años repitió más de cuarenta veces un ejercicio de encajar cilindros, sin distraerse, y salió de él feliz y descansada.',
      { q: '¿Cómo eran los muebles de la Casa de los Niños?', a: ['Ligeros y del tamaño de los niños', 'Enormes y pesados', 'De hierro', 'No había muebles'], e: 'Para que los niños pudieran moverlos solos.' }),
    poi(3, 'divan', 'El diván de Berggasse 19', 'Durante casi cincuenta años, Freud recibió a sus pacientes en su consulta de la calle Berggasse, número 19, en Viena. Los pacientes se recostaban en un diván cubierto con una alfombra persa, y Freud se sentaba detrás, donde no lo veían, para que hablaran con libertad. La sala estaba llena de estatuillas antiguas de Egipto, Grecia y Roma, que él coleccionaba.',
      'El diván viajó con Freud cuando huyó a Londres en 1938, y hoy se puede ver en su casa museo de esa ciudad.',
      { q: '¿Dónde se sentaba Freud mientras su paciente hablaba en el diván?', a: ['Detrás, donde el paciente no lo veía', 'Encima del diván', 'En otra ciudad', 'En el techo'], e: 'Para que hablaran con libertad.' }),
    poi(4, 'vasos-piaget', 'El experimento de los vasos', 'Pon la misma cantidad de agua en dos vasos iguales. Luego vacía uno en un vaso alto y delgado. Pregúntale a un niño de cuatro años si hay más agua, menos o igual: casi siempre dirá que hay más en el vaso alto. Un niño de siete u ocho años dirá que es igual, «porque no añadiste ni quitaste nada». Piaget llamó a esto «conservación».',
      'Piaget hacía experimentos parecidos con bolitas de plastilina, filas de monedas y palitos. Le interesaba menos si el niño acertaba que cómo razonaba.',
      { q: '¿Qué suele responder un niño de cuatro años en el experimento de los vasos?', a: ['Que hay más agua en el vaso alto', 'Que es igual', 'Que no hay agua', 'Que hay menos en el alto'], e: 'Todavía no comprende la conservación.' }),
  ]);
  NPCS.push([
    wnpc(0, 'alumna', 'Inés', 'alumna curiosa', sk(0x4a6a9a, 0xe8e8e8, 0xf0d0b0, 0x5a3a2a, { hat: 'braids', acc: 'book' }), [
      'Antes odiaba la escuela: todo era copiar y callar. Ahora tengo una maestra que me deja preguntar. ¡Hago tantas preguntas que se ríe!',
      'Ayer no entendía las fracciones. Mi compañero me las explicó con una pizza dibujada, y de pronto lo vi. A veces un amigo explica mejor que un libro.',
      'Cuando sea grande quiero ser maestra. O astronauta. O las dos cosas: maestra en el espacio.',
    ], true),
    wnpc(1, 'maestro', 'Tomás', 'maestro de escuela rural', sk(0x6a5a4a, 0x3a3a3a, 0xe0c0a0, 0x4a3a2a, { hat: 'none', acc: 'book' }), [
      'Tengo niños de seis a doce años en la misma sala. Los mayores ayudan a los pequeños: así aprenden dos veces.',
      'Antes creía que enseñar era hablar mucho. Ahora creo que enseñar es preguntar bien y escuchar mucho.',
      'Un día un niño me corrigió un error en la pizarra. Le di las gracias delante de todos. Ese día aprendieron más que con cualquier lección.',
    ]),
    wnpc(2, 'abuela', 'Carmen', 'abuela cuentacuentos', sk(0x8a3a4a, 0x3a2a2a, 0xe0b090, 0xe8e8e8, { hat: 'hood', acc: 'staff' }), [
      'Yo no fui a la escuela, pero mi abuela me contaba cuentos cada noche. Con ellos aprendí más palabras de las que puedo contar.',
      'A mis nietos les cuento los mismos cuentos. Siempre me piden el mismo, una y otra vez. Los niños aprenden repitiendo lo que aman.',
      'Los sueños también son cuentos que nos contamos de noche. Mi madre decía que hay que escucharlos, aunque no se entiendan.',
    ], true),
  ]);
  Object.assign(QUESTS, {
    comenio: { text: 'Visita el mundo en imágenes y escucha a Tomás, el maestro rural. Luego dime qué propuse en la Didáctica magna.', needs: { pois: ['orbis-pictus'], npcs: ['maestro'] },
      riddle: { q: '¿Qué propuso Comenio?', a: ['Enseñar todo a todos', 'Enseñar solo a los nobles', 'Cerrar las escuelas', 'Enseñar solo latín'] } },
    pestalozzi: { text: 'Visita el orfanato de Stans. Luego dime qué tres partes de la persona hay que educar.', needs: { pois: ['stans'], npcs: [] },
      riddle: { q: '¿Qué hay que educar según Pestalozzi?', a: ['La cabeza, el corazón y las manos', 'Solo la memoria', 'Solo los músculos', 'Nada'] } },
    montessori: { text: 'Visita la Casa de los Niños y escucha a Inés, la alumna curiosa. Luego dime cuál es el lema de mis escuelas.', needs: { pois: ['casa-bambini'], npcs: ['alumna'] },
      riddle: { q: '¿Cuál es el lema Montessori?', a: ['Ayúdame a hacerlo por mí mismo', 'Obedece y calla', 'Copia diez veces', 'No toques nada'] } },
    freud: { text: 'Visita mi diván de Viena y escucha a Carmen, la abuela cuentacuentos. Luego dime qué son los sueños, según yo.', needs: { pois: ['divan'], npcs: ['abuela'] },
      riddle: { q: '¿Qué son los sueños para Freud?', a: ['El camino real hacia el inconsciente', 'Ruido sin sentido', 'Mensajes de otros planetas', 'Nada'] } },
    piaget: { text: 'Prueba el experimento de los vasos. Luego dime cómo se construye la inteligencia del niño.', needs: { pois: ['vasos-piaget'], npcs: [] },
      riddle: { q: '¿Cómo se construye la inteligencia según Piaget?', a: ['Por etapas', 'De golpe, al nacer', 'Solo con castigos', 'No se construye'] } },
    vygotsky: { text: 'Escucha a Inés, la alumna, y a Tomás, el maestro. Luego dime cómo llamé al espacio donde se aprende con ayuda.', needs: { pois: [], npcs: ['alumna', 'maestro'] },
      riddle: { q: '¿Cómo se llama ese espacio?', a: ['Zona de desarrollo próximo', 'Zona de recreo', 'Zona prohibida', 'Zona de silencio'] } },
  });
  Object.assign(ANECDOTES, {
    comenio: ['Me ofrecieron organizar las escuelas de Suecia, de Inglaterra e incluso, según una vieja historia, me invitaron a dirigir la universidad de Harvard en América. Pero mi lugar estaba con mi pueblo en el exilio.', 'Inventé un juego de teatro escolar para enseñar latín: los alumnos representaban escenas en lugar de memorizar listas. Los padres venían a verlos como a una función.'],
    pestalozzi: ['Era tan desordenado con mi ropa que una vez llegué a una reunión con los zapatos atados con paja. Los niños se reían, y yo con ellos.', 'Un joven alemán, Friedrich Fröbel, pasó dos años conmigo en Yverdon. Después inventó el jardín de infancia, el «kindergarten».'],
    montessori: ['Cuando estudiaba medicina, los compañeros no me dejaban entrar a la sala de disección con ellos. Tenía que hacer mis prácticas sola, de noche, entre los cadáveres.', 'Fui propuesta tres veces para el Premio Nobel de la Paz. Pensaba que educar bien a los niños era la manera más segura de construir la paz.'],
    freud: ['Fumaba muchos puros al día; decía que lo ayudaban a pensar. Alguien me preguntó si eso tenía un significado oculto, y dicen que respondí: «A veces un puro es solo un puro».', 'Cuando los nazis quemaron mis libros, comenté: «En la Edad Media me habrían quemado a mí; ahora se conforman con quemar mis libros». No sabía lo que vendría después.'],
    piaget: ['Iba a todas partes en bicicleta, con boina y pipa, y pasaba los veranos escribiendo en una granja de los Alpes rodeado de papeles.', 'Jugaba a las canicas con niños de Ginebra para estudiar cómo entendían las reglas. Los pequeños creían que las reglas eran eternas; los mayores sabían que se pueden cambiar si todos están de acuerdo.'],
    vygotsky: ['De joven, como era judío, solo podía entrar a la universidad por una lotería. Gané. Mi madre me había dicho que esa suerte había que aprovecharla bien.', 'Escribía tan rápido y tanto que mis amigos decían que dormía con un lápiz en la mano. Sabía que tenía poco tiempo.'],
    wjames: ['Mis alumnos recuerdan que daba clases paseando por el aula, haciendo bromas y a veces preguntándoles a ellos qué pensaban. Era raro en un profesor de Harvard de entonces.', 'Viajé a Brasil de joven en una expedición científica por el Amazonas. Me enfermé de viruela y casi me quedo ciego unos días. Ahí decidí que no sería naturalista.'],
  });
  BOOKS.push([
    book({ id: 'orbis-pictus-libro', author: 'comenio', by: 'Comenio', title: 'Orbis sensualium pictus', year: '1658', kind: 'libro escolar ilustrado',
      parts: [
        { t: 'Ven, muchacho', x: 'El libro empieza con un maestro que invita a un niño a aprender. El niño pregunta qué significa ser sabio, y el maestro responde: entender rectamente, hacer rectamente y hablar rectamente.' },
        { t: 'El mundo en ciento cincuenta imágenes', x: 'Hay grabados de todo: Dios, el cielo, el fuego, las plantas, los animales, el cuerpo, los oficios, la escuela, la ciudad. Cada objeto tiene un número, y debajo su nombre.' },
        { t: 'Las cosas antes que las palabras', x: 'Para Comenio, hay que conocer primero las cosas, con los sentidos, y después sus nombres. Por eso el libro enseña mirando.' },
        { t: 'Un libro que viajó', x: 'Fue traducido a muchas lenguas y se usó durante casi dos siglos. Goethe recordaba que de niño fue uno de sus libros favoritos.' },
      ],
      quote: 'Nada hay en el entendimiento que no haya estado antes en los sentidos.',
      q: { q: '¿Qué debe conocerse primero según Comenio?', a: ['Las cosas, con los sentidos, y después sus nombres', 'Solo las palabras', 'Solo los números', 'Nada'], e: 'Por eso su libro tiene imágenes.' } }, 0),
    book({ id: 'interpretacion-suenos', author: 'freud', by: 'Sigmund Freud', title: 'La interpretación de los sueños', year: '1899', kind: 'psicología',
      parts: [
        { t: 'Los sueños tienen sentido', x: 'Freud sostiene que los sueños no son ruido sin sentido: expresan, de forma disfrazada, deseos y preocupaciones que no reconocemos despiertos.' },
        { t: 'El sueño de Irma', x: 'Analiza un sueño propio sobre una paciente llamada Irma, y descubre en él su deseo de no ser culpable de su enfermedad.' },
        { t: 'El trabajo del sueño', x: 'El sueño condensa varias ideas en una imagen y desplaza lo importante a detalles pequeños. Por eso parece extraño.' },
        { t: 'El camino real', x: 'Freud concluye que la interpretación de los sueños es el camino real hacia el conocimiento del inconsciente.' },
      ],
      quote: 'La interpretación de los sueños es el camino real hacia el conocimiento de lo inconsciente.',
      q: { q: '¿Qué expresan los sueños, según Freud?', a: ['Deseos y preocupaciones disfrazados', 'Mensajes del futuro', 'Nada', 'Solo lo que comimos'], e: 'De forma condensada y desplazada.' } }, 1),
  ]);
  BOOKS[BOOKS.length - 1].forEach((b) => { b.q.book = b.title; });

  // ---------------------------------------------------------------- XXIX · El bosque de la Tierra
  POIS.push([
    poi(0, 'chimborazo', 'La subida al Chimborazo', 'El 23 de junio de 1802, Humboldt, Bonpland y algunos acompañantes intentaron subir el Chimborazo, en Ecuador. Sin equipo de montaña, con los pies heridos y mareados por la altura, llegaron a unos 5.900 metros, más alto que nadie hasta entonces que se supiera. Una grieta les cerró el paso. Allí arriba Humboldt entendió cómo la vida cambia con la altura.',
      'Después dibujó su «Naturgemälde», un gran cuadro de la montaña con los nombres de las plantas escritos a la altura donde crecen.',
      { q: '¿Qué entendió Humboldt en el Chimborazo?', a: ['Cómo la vida cambia con la altura', 'Que la montaña era de oro', 'Que no había plantas', 'Nada'], e: 'Lo dibujó en su Naturgemälde.' }),
    poi(1, 'lobo', 'El fuego verde', 'En una montaña de Arizona, un joven guardabosques y sus compañeros vieron una manada de lobos cruzando un río. Dispararon. Cuando Aldo Leopold llegó junto a una vieja loba, vio morir en sus ojos un fuego verde y feroz. Años después escribió que en ese momento supo que había algo en esos ojos que solo la loba y la montaña conocían.',
      'En el parque de Yellowstone, cuando en 1995 volvieron a soltarse lobos, los ciervos dejaron de comer las orillas de los ríos, crecieron árboles y volvieron castores y pájaros.',
      { q: '¿Qué pasó en Yellowstone cuando volvieron los lobos en 1995?', a: ['Crecieron árboles en las orillas y volvieron castores y pájaros', 'Desaparecieron todos los árboles', 'Nada', 'Se secó el río'], e: 'Todo está conectado.' }),
    poi(2, 'primavera-silenciosa', 'El pueblo sin pájaros', 'El libro de Rachel Carson empieza con una fábula: un pueblo en el que todo vivía en armonía, hasta que un polvo blanco cayó sobre los tejados y los campos. Las gallinas no tenían pollitos, los manzanos no daban fruta, y en primavera no cantaba ningún pájaro. «Nadie había hecho magia; la gente lo había hecho por sí misma.»',
      'Carson aclaró que ese pueblo no existía, pero que cada una de esas desgracias ya había ocurrido en algún lugar real.',
      { q: '¿Qué cae sobre el pueblo en la fábula de Rachel Carson?', a: ['Un polvo blanco: el pesticida', 'Nieve', 'Ceniza de un volcán', 'Harina'], e: 'Y los pájaros dejan de cantar.' }),
    poi(3, 'seringal', 'El seringal de Xapuri', 'En la selva de Acre, en Brasil, los seringueiros recorren cada día senderos que unen cientos de árboles de caucho. Hacen cortes finos en la corteza y recogen la savia blanca, el látex, en pequeñas tazas, sin matar al árbol. Un árbol bien cuidado puede dar látex durante décadas. Allí vivió y luchó Chico Mendes.',
      'Hoy, la Reserva Extractiva Chico Mendes protege casi un millón de hectáreas de selva donde las comunidades viven del caucho, las castañas y otros frutos.',
      { q: '¿Cómo se extrae el látex del árbol de caucho?', a: ['Con cortes finos en la corteza, sin matar al árbol', 'Talando el árbol', 'Quemando el bosque', 'Con dinamita'], e: 'Un árbol puede dar látex durante décadas.' }),
    poi(4, 'gualcarque', 'El río Gualcarque', 'El río Gualcarque baja por las montañas del occidente de Honduras, entre bosques de pinos, hasta el territorio lenca de Río Blanco. Para los lencas es sagrado: en sus aguas habitan los espíritus. Durante años, la comunidad acampó junto al río y bloqueó el camino de las máquinas que venían a construir una represa.',
      'Después del asesinato de Berta Cáceres, varios bancos internacionales se retiraron del proyecto, y el río sigue corriendo libre.',
      { q: '¿Por qué el río Gualcarque es especial para el pueblo lenca?', a: ['Porque es sagrado: en sus aguas habitan los espíritus', 'Porque tiene oro', 'Porque es el más largo del mundo', 'Por nada'], e: 'Lo defendieron con resistencia pacífica.' }),
  ]);
  NPCS.push([
    wnpc(0, 'guardabosques', 'Ana', 'guardabosques', sk(0x4a5a3a, 0x3a3a2a, 0xe8c8a8, 0x8a5a3a, { hat: 'cap', acc: 'staff' }), [
      'Conozco este bosque árbol por árbol. Ese roble tiene trescientos años: vio pasar a tus tatarabuelos.',
      'Un bosque no es solo árboles: es hongos bajo tierra que conectan las raíces, pájaros que siembran semillas, insectos que deshacen las hojas. Si quitas una pieza, todo se tambalea.',
      'Lo más difícil de mi trabajo no son los incendios: es convencer a la gente de no tirar basura. Llévate tu basura, y deja solo tus huellas.',
    ], true),
    wnpc(1, 'balsero', 'Julián', 'balsero del río', sk(0xe8e0d0, 0x5a7a9a, 0xa07050, 0x2a1a10, { hat: 'cap', acc: 'staff' }), [
      'Mi abuelo pescaba aquí peces del tamaño de un brazo. Mi padre, del tamaño de una mano. Yo, cuando pesco, saco peces del tamaño de un dedo. Algo está pasando.',
      'Cuando cortan el bosque de arriba, el río se llena de barro. Cuando lo dejan en paz, el agua vuelve a ser clara. El río sabe lo que pasa en la montaña.',
      'Un río no es solo agua: es un camino, un mercado, una despensa y un cementerio de antepasados. Por eso lo cuidamos.',
    ]),
    wnpc(2, 'apicultora', 'Marta', 'apicultora', sk(0xe8d0a0, 0x8a6a2a, 0xf0d0b0, 0x5a3a2a, { hat: 'hood', acc: 'none' }), [
      'Mis abejas visitan millones de flores para hacer un frasco de miel. Sin ellas, muchas frutas y verduras no existirían.',
      'Algunos venenos para insectos confunden a las abejas: salen a buscar flores y no saben volver a la colmena. Rachel Carson ya lo había advertido.',
      'Si quieres ayudar, planta flores sin venenos en tu ventana o tu patio. Para una abeja, un balcón con flores es un oasis.',
    ], true),
  ]);
  Object.assign(QUESTS, {
    humboldt: { text: 'Sube conmigo al Chimborazo y escucha a Ana, la guardabosques. Luego dime qué descubrí sobre la naturaleza.', needs: { pois: ['chimborazo'], npcs: ['guardabosques'] },
      riddle: { q: '¿Qué descubrió Humboldt?', a: ['Que todo en la naturaleza está conectado', 'Que la naturaleza es una máquina', 'Que nada cambia', 'Que no hay plantas en los Andes'] } },
    leopold: { text: 'Visita el lugar del fuego verde. Luego dime qué propuse en mi almanaque.', needs: { pois: ['lobo'], npcs: [] },
      riddle: { q: '¿Qué propuso Aldo Leopold?', a: ['Una ética de la tierra', 'Cazar todos los lobos', 'Construir una ciudad', 'Vender el bosque'] } },
    carson: { text: 'Visita el pueblo sin pájaros y escucha a Marta, la apicultora. Luego dime qué veneno denuncié.', needs: { pois: ['primavera-silenciosa'], npcs: ['apicultora'] },
      riddle: { q: '¿Qué pesticida denunció Rachel Carson?', a: ['El DDT', 'La sal', 'El azúcar', 'El jabón'] } },
    mendes: { text: 'Visita el seringal de Xapuri. Luego dime qué eran los empates.', needs: { pois: ['seringal'], npcs: [] },
      riddle: { q: '¿Qué eran los empates?', a: ['Cadenas humanas pacíficas frente a las motosierras', 'Partidos de fútbol', 'Fiestas', 'Carreras'] } },
    naess: { text: 'Escucha a Julián, el balsero, y a Ana, la guardabosques. Luego dime qué es la ecología profunda.', needs: { pois: [], npcs: ['balsero', 'guardabosques'] },
      riddle: { q: '¿Qué es la ecología profunda?', a: ['Reconocer que todo ser vivo vale por sí mismo', 'Bucear en el mar', 'Cuidar solo lo útil', 'Estudiar volcanes'] } },
    caceres: { text: 'Visita el río Gualcarque y escucha a Julián, el balsero. Luego dime por qué el río es sagrado para mi pueblo.', needs: { pois: ['gualcarque'], npcs: ['balsero'] },
      riddle: { q: '¿Por qué el Gualcarque es sagrado para los lencas?', a: ['Porque en sus aguas habitan los espíritus', 'Porque tiene oro', 'Porque es muy largo', 'Por nada'] } },
  });
  Object.assign(ANECDOTES, {
    humboldt: ['En mi casa de Berlín recibía tantas cartas, unas dos mil al año, que pensé en poner un anuncio en el periódico pidiendo que dejaran de escribirme. Las contestaba casi todas.', 'Simón Bolívar me conoció en París de joven. Años después escribió que yo había sido el verdadero descubridor de América, porque la había mostrado al mundo tal como era.'],
    leopold: ['Todos los años anotaba en mi diario el primer día en que cantaban los gansos o florecían ciertas plantas. Hoy esos datos ayudan a estudiar el cambio del clima.', 'Escribí que hay dos peligros espirituales en no tener una granja: creer que el desayuno viene del supermercado y que el calor viene de la calefacción.'],
    carson: ['Cuando era niña, encontré en el campo, lejos del mar, un fósil de concha. Me pregunté cómo había llegado allí, y empezó mi amor por el océano.', 'Cuando el presidente Kennedy leyó mi libro, pidió a sus científicos que estudiaran el tema. Confirmaron casi todo lo que yo había escrito.'],
    mendes: ['En las noches de la selva, alrededor del fuego, enseñaba a leer a otros caucheros con los periódicos viejos que llegaban de la ciudad.', 'Recibí un premio de las Naciones Unidas en 1987. En mi pueblo, muchos no sabían quién era la ONU, pero sabían que yo defendía su bosque.'],
    naess: ['A los setenta años todavía escalaba. Mis colegas de la universidad se acostumbraron a verme trepar por los marcos de las puertas y por las paredes de los edificios.', 'Me preguntaron cuál era mi filosofía en una sola palabra. Respondí: «Alegría». Cuidar la Tierra no tiene por qué ser triste.'],
    caceres: ['Mi madre recibía en casa a refugiadas de las guerras de El Salvador. Desde niña aprendí que la solidaridad no es una idea, sino una puerta abierta.', 'En la ceremonia del Premio Goldman terminé mi discurso diciendo: «¡Despertemos, humanidad! Ya no hay tiempo». Muchos lo repiten todavía.'],
    lovelock: ['Durante casi toda mi vida trabajé como científico independiente, en un laboratorio en mi casa de campo, sin depender de ninguna universidad. Decía que así nadie podía decirme qué pensar.', 'A los cien años todavía publicaba libros. El último trataba sobre la inteligencia artificial y el futuro de la vida en la Tierra.'],
  });
  BOOKS.push([
    book({ id: 'primavera-silenciosa-libro', author: 'carson', by: 'Rachel Carson', title: 'Primavera silenciosa', year: '1962', kind: 'ciencia y ecología',
      parts: [
        { t: 'Una fábula para el mañana', x: 'El libro empieza con un pueblo imaginario donde, de pronto, los pájaros dejan de cantar. No es magia: es el veneno que la gente misma ha rociado.' },
        { t: 'Elixires de muerte', x: 'Carson explica cómo los nuevos pesticidas, como el DDT, no desaparecen: se acumulan en el suelo, en el agua y en los tejidos de los animales.' },
        { t: 'La cadena de la vida', x: 'El veneno pasa de los insectos a los peces y a los pájaros, cada vez más concentrado. Los huevos de las aves se vuelven frágiles y no nacen polluelos.' },
        { t: 'El otro camino', x: 'Carson no pide prohibir toda química, sino usar con prudencia lo que no entendemos bien, y buscar soluciones que respeten la vida.' },
      ],
      quote: 'Cuanto más claramente podamos centrar nuestra atención en las maravillas del universo, menos gusto tendremos por la destrucción.',
      q: { q: '¿Qué pasa con el veneno en la cadena de la vida, según Carson?', a: ['Se acumula y se concentra cada vez más', 'Desaparece enseguida', 'Se vuelve alimento', 'Nada'], e: 'De los insectos a los peces y los pájaros.' } }, 0),
    book({ id: 'almanaque', author: 'leopold', by: 'Aldo Leopold', title: 'Almanaque del condado arenoso', year: '1949', kind: 'ensayo de naturaleza',
      parts: [
        { t: 'Mes a mes', x: 'La primera parte cuenta un año en la granja de Leopold: el regreso de los gansos en marzo, las flores de abril, la sequía del verano, la nieve de enero.' },
        { t: 'El roble partido', x: 'Al cortar con sierra un viejo roble caído por un rayo, Leopold recorre sus anillos como si viajara hacia atrás en la historia del país.' },
        { t: 'Pensar como una montaña', x: 'El ensayo de la loba y el fuego verde: la montaña sabe que sin lobos los ciervos la destruirán.' },
        { t: 'La ética de la tierra', x: 'Al final propone ampliar nuestra comunidad moral al suelo, el agua, las plantas y los animales: la tierra no es una propiedad, sino una comunidad a la que pertenecemos.' },
      ],
      quote: 'Algo es correcto cuando tiende a preservar la integridad, la estabilidad y la belleza de la comunidad biótica.',
      q: { q: '¿Qué es la tierra para Leopold?', a: ['Una comunidad a la que pertenecemos', 'Una mercancía', 'Un enemigo', 'Nada'], e: 'Su ética de la tierra.' } }, 1),
  ]);
  BOOKS[BOOKS.length - 1].forEach((b) => { b.q.book = b.title; });

  // ---------------------------------------------------------------- XXX · La torre de los números
  POIS.push([
    poi(0, 'postulados', 'Los cinco postulados', 'Euclides empezó su geometría con cinco postulados. Los cuatro primeros son muy sencillos: por dos puntos pasa una recta, una recta se puede prolongar, se puede trazar un círculo, todos los ángulos rectos son iguales. El quinto, el de las paralelas, es más largo y complicado. Durante dos mil años, muchos matemáticos intentaron demostrarlo a partir de los otros.',
      'En el siglo XIX, Gauss, Lobachevski y Bolyai descubrieron que, si se cambia el quinto postulado, aparecen geometrías nuevas y coherentes. Einstein usó una de ellas para describir el universo.',
      { q: '¿Qué pasó al cambiar el quinto postulado de Euclides?', a: ['Aparecieron geometrías nuevas y coherentes', 'Todo se volvió falso', 'Nada', 'Desapareció la geometría'], e: 'Las geometrías no euclidianas.' }),
    poi(1, 'conejos', 'El problema de los conejos', 'En el Liber abaci, Fibonacci propone: una pareja de conejos se pone en un corral. Cada mes, cada pareja adulta tiene una nueva pareja, que empieza a reproducirse al segundo mes. ¿Cuántas parejas habrá al cabo de un año? Mes a mes salen 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233.',
      'Si divides un número de la sucesión entre el anterior, el resultado se acerca a 1,618…, el número áureo, que muchos artistas han usado buscando proporciones armoniosas.',
      { q: '¿A qué número se acerca la división de dos números seguidos de la sucesión de Fibonacci?', a: ['Al número áureo, 1,618…', 'A cero', 'A cien', 'A pi'], e: 'La proporción áurea.' }),
    poi(2, 'taxi-1729', 'El taxi 1729', 'Un día, el matemático Hardy fue a visitar a Ramanujan, enfermo en un hospital de Londres. Le comentó que había llegado en un taxi con un número aburrido: 1729. Ramanujan respondió enseguida: «No, Hardy, es un número muy interesante: es el menor número que se puede escribir como suma de dos cubos de dos maneras distintas». En efecto: 1729 es 1 al cubo más 12 al cubo, y también 9 al cubo más 10 al cubo.',
      'Desde entonces, a los números así se los llama «números taxicab». Hardy decía que cada número entero era un amigo personal de Ramanujan.',
      { q: '¿Qué tiene de especial el número 1729?', a: ['Es el menor que es suma de dos cubos de dos maneras', 'Es el mayor número primo', 'Es el año de la Revolución Francesa', 'Nada'], e: '1³ + 12³ = 9³ + 10³.' }),
    poi(3, 'puentes-konigsberg', 'Los siete puentes de Königsberg', 'La ciudad de Königsberg tenía un río con dos islas y siete puentes. Sus habitantes se preguntaban si era posible dar un paseo cruzando cada puente una sola vez. En 1736, el matemático Leonhard Euler demostró que no: dibujó las zonas de tierra como puntos y los puentes como líneas, y vio que el paseo es imposible cuando más de dos puntos tienen un número impar de líneas.',
      'Así nació la teoría de grafos, que hoy usan los mapas de tu teléfono para buscar el mejor camino, y las redes sociales para saber quién conoce a quién.',
      { q: '¿Qué rama de las matemáticas nació con el problema de los puentes?', a: ['La teoría de grafos', 'La aritmética', 'La trigonometría', 'La astrología'], e: 'Euler la inventó en 1736.' }),
    poi(4, 'bletchley', 'Bletchley Park', 'En una mansión de la campiña inglesa, durante la Segunda Guerra Mundial, miles de personas trabajaron en secreto para descifrar los mensajes militares alemanes. Muchas eran mujeres, y había matemáticos, lingüistas, campeones de ajedrez y expertos en crucigramas. Turing y su equipo diseñaron máquinas electromecánicas, las «bombas», para encontrar las claves de la máquina Enigma, que cambiaban cada día.',
      'Todo fue secreto durante treinta años. Muchas de las personas que trabajaron allí murieron sin poder contarle a su familia lo que habían hecho.',
      { q: '¿Qué intentaban descifrar en Bletchley Park?', a: ['Los mensajes de la máquina Enigma', 'Jeroglíficos egipcios', 'Partituras de Bach', 'El idioma de los delfines'], e: 'Las claves cambiaban cada día.' }),
  ]);
  NPCS.push([
    wnpc(0, 'contable', 'Lucas', 'contable de un mercader', sk(0x6a3a2a, 0x3a2a1a, 0xe0c0a0, 0x3a2a1a, { hat: 'cap', acc: 'book' }), [
      'Antes hacía las cuentas con números romanos y un ábaco. Para multiplicar MCMXLVII por XXIII tardaba una tarde entera.',
      'Con las cifras nuevas que trajo Fibonacci, y con el cero, lo hago en unos minutos. Al principio algunos gremios las prohibieron, por miedo a que fuera fácil falsificarlas.',
      'El cero es un número muy extraño: no vale nada, pero a la derecha de otro lo multiplica por diez. Nada, que lo cambia todo.',
    ]),
    wnpc(1, 'descifradora', 'Joan', 'descifradora de Bletchley', sk(0x3a4a3a, 0x2a2a2a, 0xf4dcc8, 0x8a5a3a, { hat: 'longhair', acc: 'none' }), [
      'Me contrataron porque gané un concurso de crucigramas del periódico. ¡Quién iba a pensar que los crucigramas ayudarían a ganar una guerra!',
      'No podía decirle a nadie dónde trabajaba, ni siquiera a mis padres. Les decía que era secretaria.',
      'Alan era tímido y un poco raro: encadenaba su taza de té al radiador para que no se la robaran. Pero cuando hablaba de matemáticas, se le iluminaba la cara.',
    ], true),
    wnpc(2, 'arquitecta', 'Elena', 'arquitecta', sk(0x3a3a4a, 0x8a8aa0, 0xf0d0b0, 0x2a1a10, { hat: 'longhair', acc: 'scroll' }), [
      'Cada edificio que diseño es geometría: ángulos, triángulos, círculos. Euclides está en cada esquina de tu casa.',
      'Los triángulos son las figuras más fuertes: no se deforman. Por eso los ves en los puentes y en las grúas.',
      'Cuando un niño me pregunta para qué sirven las matemáticas, le digo: para que el techo no se te caiga encima.',
    ], true),
  ]);
  Object.assign(QUESTS, {
    euclides: { text: 'Estudia los cinco postulados y escucha a Elena, la arquitecta. Luego dime qué demostré sobre los números primos.', needs: { pois: ['postulados'], npcs: ['arquitecta'] },
      riddle: { q: '¿Qué demostró Euclides sobre los números primos?', a: ['Que hay infinitos', 'Que son diez', 'Que no existen', 'Que todos son pares'] } },
    fibonacci: { text: 'Resuelve el problema de los conejos y escucha a Lucas, el contable. Luego dime qué número sigue en 1, 1, 2, 3, 5, 8.', needs: { pois: ['conejos'], npcs: ['contable'] },
      riddle: { q: '¿Qué número sigue en 1, 1, 2, 3, 5, 8?', a: ['13', '10', '11', '16'] } },
    boole: { text: 'Visita los puentes de Königsberg. Luego dime con cuántos valores trabaja mi álgebra.', needs: { pois: ['puentes-konigsberg'], npcs: [] },
      riddle: { q: '¿Con cuántos valores trabaja el álgebra de Boole?', a: ['Dos: verdadero y falso', 'Diez', 'Infinitos', 'Ninguno'] } },
    ramanujan: { text: 'Súbete al taxi 1729. Luego dime qué tiene de especial ese número.', needs: { pois: ['taxi-1729'], npcs: [] },
      riddle: { q: '¿Qué tiene de especial el 1729?', a: ['Es el menor que es suma de dos cubos de dos maneras', 'Es primo', 'Es par', 'Nada'] } },
    noether: { text: 'Escucha a Elena, la arquitecta, y estudia los postulados. Luego dime qué corresponde a cada simetría.', needs: { pois: ['postulados'], npcs: ['arquitecta'] },
      riddle: { q: '¿Qué corresponde a cada simetría según Emmy Noether?', a: ['Una ley de conservación', 'Un número primo', 'Un error', 'Nada'] } },
    godel: { text: 'Escucha a Joan, la descifradora, y visita Bletchley Park. Luego dime qué demostré sobre las verdades matemáticas.', needs: { pois: ['bletchley'], npcs: ['descifradora'] },
      riddle: { q: '¿Qué demostró Gödel?', a: ['Que hay verdades que no se pueden demostrar dentro de un sistema', 'Que todo se puede demostrar', 'Que no hay números', 'Que la lógica es inútil'] } },
  });
  Object.assign(ANECDOTES, {
    euclides: ['Durante siglos, en las escuelas de Inglaterra, el teorema de que los ángulos de la base de un triángulo isósceles son iguales se llamaba «el puente de los asnos»: quien no lo cruzaba, no seguía adelante.', 'Abraham Lincoln estudió los seis primeros libros de mis Elementos de noche, a la luz de una vela, para aprender a razonar como abogado.'],
    fibonacci: ['El emperador Federico II, muy aficionado a la ciencia, organizó un torneo de matemáticas en Pisa y me puso problemas difíciles delante de toda su corte. Los resolví todos.', 'Pisa me concedió un sueldo de por vida por ayudar a la ciudad con sus cuentas y enseñar a los ciudadanos. Es de los pocos datos de mi vida que conocemos por documentos.'],
    boole: ['Mi esposa Mary y yo tuvimos cinco hijas. Una, Alicia, sin estudios universitarios, descubrió figuras geométricas de cuatro dimensiones y las construyó en cartón.', 'Caminé bajo una lluvia fuerte para no faltar a una clase y di la lección empapado. Me enfermé y morí poco después, con cuarenta y nueve años.'],
    ramanujan: ['Escribía con tiza en una pizarra y borraba con el codo, porque el papel era caro. Solo pasaba a los cuadernos los resultados finales.', 'Hardy puntuó a los matemáticos de su tiempo del 1 al 100: a sí mismo se dio 25, a su colega Littlewood 30, al gran Hilbert 80… y a Ramanujan 100.'],
    noether: ['Daba clases caminando por las calles de Gotinga con sus alumnos, hablando de álgebra a todo volumen, sin importar la lluvia. A sus alumnos los llamaban «los chicos de Noether».', 'Cuando los nazis me prohibieron enseñar, seguí dando clases en mi departamento. Un alumno llegó una vez con uniforme nazi; lo recibí igual, y me reí de él.'],
    godel: ['En Princeton, Einstein y yo caminábamos juntos cada tarde hablando en alemán. La gente se preguntaba de qué hablaban esos dos señores tan distintos: él jovial, yo serio y abrigado.', 'Para el cumpleaños setenta de Einstein le regalé una solución de sus ecuaciones donde el universo gira y, en teoría, se podría viajar al pasado.'],
    turing: ['Corría tan bien que fui de los mejores maratonistas de Inglaterra. A veces iba corriendo a reuniones en Londres, a más de sesenta kilómetros.', 'Escribí uno de los primeros programas para jugar al ajedrez, antes de que hubiera una computadora capaz de ejecutarlo. Hacía yo los cálculos a mano, y tardaba media hora por jugada.'],
  });
  BOOKS.push([
    book({ id: 'elementos-libro', author: 'euclides', by: 'Euclides', title: 'Los Elementos', year: 'c. 300 a. C.', kind: 'tratado de geometría',
      parts: [
        { t: 'Definiciones', x: 'Un punto es lo que no tiene partes. Una línea es una longitud sin anchura. Con definiciones así de simples empieza el libro más influyente de la matemática.' },
        { t: 'El triángulo equilátero', x: 'La primera proposición enseña a construir un triángulo equilátero con solo una regla y un compás: dos círculos que se cortan.' },
        { t: 'Pitágoras', x: 'El primer libro termina con el teorema de Pitágoras: en un triángulo rectángulo, el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos.' },
        { t: 'Infinitos primos', x: 'En el libro noveno demuestra que los números primos no se acaban nunca. Y en el último construye los cinco sólidos regulares.' },
      ],
      quote: 'Lo que había que demostrar.',
      q: { q: '¿Con qué teorema termina el primer libro de los Elementos?', a: ['Con el teorema de Pitágoras', 'Con el de Gödel', 'Con el de Noether', 'Con ninguno'], e: 'Sobre los triángulos rectángulos.' } }, 0),
    book({ id: 'liber-abaci', author: 'fibonacci', by: 'Fibonacci', title: 'Liber abaci', year: '1202', kind: 'tratado de cálculo',
      parts: [
        { t: 'Las nueve cifras de los indios', x: 'El libro empieza: «Las nueve cifras de los indios son estas: 9 8 7 6 5 4 3 2 1. Con ellas, y con el signo 0, que los árabes llaman zephirum, se escribe cualquier número».' },
        { t: 'Para los mercaderes', x: 'Fibonacci enseña a sumar, multiplicar y dividir, a cambiar monedas, a repartir ganancias y a convertir pesos y medidas.' },
        { t: 'Los conejos', x: 'Entre muchos problemas aparece el de los conejos que se reproducen, del que nace la famosa sucesión 1, 1, 2, 3, 5, 8, 13…' },
        { t: 'Un cambio lento', x: 'Las nuevas cifras tardaron siglos en imponerse. Algunas ciudades las prohibieron en documentos oficiales, porque un 0 podía convertirse fácilmente en un 6 o un 9.' },
      ],
      quote: 'Con estas nueve cifras y con el signo 0 se escribe cualquier número.',
      q: { q: '¿Cómo llamaban los árabes al cero, según Fibonacci?', a: ['Zephirum', 'Nihil', 'Alfa', 'Ómega'], e: 'De ahí vienen «cifra» y «cero».' } }, 1),
  ]);
  BOOKS[BOOKS.length - 1].forEach((b) => { b.q.book = b.title; });

  // ---------------------------------------------------------------- debates
  try {
    VERSUS.push(
      { id: 'freud-sartre', a: 'freud', b: 'sartre', q: '¿Somos dueños de nosotros mismos?', eje: null, va: 0, vb: 0,
        turns: [
          ['a', 'Crees que decides con libertad, pero gran parte de lo que haces nace de deseos y miedos que no conoces. El yo no es dueño en su propia casa.'],
          ['b', 'Esa es una excusa demasiado cómoda. Siempre elegimos, incluso cuando decimos que no podíamos evitarlo. Echarle la culpa al inconsciente es mala fe.'],
          ['a', 'No digo que no seamos responsables. Digo que para ser libres primero hay que conocer lo que nos mueve en la sombra. Donde estaba el ello, debe llegar el yo.'],
          ['b', 'Estamos de acuerdo en algo: nadie te hará libre desde fuera. Eres lo que haces con lo que hicieron de ti.'],
        ],
        cierre: 'Freud muestra las fuerzas ocultas de la mente; Sartre insiste en que siempre podemos elegir. Quizás la libertad empieza por conocerse.' },
      { id: 'carson-bacon', a: 'carson', b: 'bacon', q: '¿Debe el ser humano dominar la naturaleza?', eje: null, va: 0, vb: 0,
        turns: [
          ['b', 'El saber es poder. Con la ciencia, el ser humano puede dominar la naturaleza y ponerla a su servicio: curar enfermedades, vencer el hambre.'],
          ['a', 'Tu ciencia nos dio mucho. Pero la expresión «dominar la naturaleza» nació de la arrogancia. Rociamos veneno sin saber dónde terminaría, y terminó en nuestros cuerpos.'],
          ['b', 'Yo también escribí que a la naturaleza solo se la domina obedeciéndola, es decir, conociendo sus leyes.'],
          ['a', 'Entonces conozcámosla de verdad, con humildad. No somos sus dueños: somos parte de ella, y lo que le hacemos, nos lo hacemos.'],
        ],
        cierre: 'Bacon soñó con una ciencia que diera poder al ser humano. Carson advirtió los límites de ese poder. Hoy buscamos una ciencia que cuide además de transformar.' },
      { id: 'turing-descartes', a: 'turing', b: 'descartes', q: '¿Pueden pensar las máquinas?', eje: null, va: 0, vb: 0,
        turns: [
          ['b', 'Una máquina podría imitar algunos gestos humanos, pero nunca podría combinar palabras para responder con sentido a todo lo que se le diga, como hace hasta el más torpe de los hombres.'],
          ['a', 'Esa es justamente mi prueba, monsieur Descartes. Si conversas con una máquina y no puedes distinguirla de una persona, ¿con qué derecho dices que no piensa?'],
          ['b', 'Imitar no es pensar. Yo sé que pienso porque lo siento desde dentro. ¿Lo sabe la máquina?'],
          ['a', '¿Y cómo sabes que piensan los demás seres humanos? Solo por cómo responden. Quizás debamos darles a las máquinas la misma cortesía.'],
        ],
        cierre: 'Descartes creía que el lenguaje con sentido era exclusivo del alma humana. Turing propuso juzgar por la conducta. Hoy, con máquinas que conversan, la pregunta es más actual que nunca.' },
    );
  } catch (e) { /* herramientas sin debates */ }
}

// ============================================================================
//  XXXI · EL TALLER DE LA BELLEZA, XXXII · LA GRAN ASAMBLEA DE LOS PUEBLOS y
//  XXXIII · LA CASA DE LOS CUIDADOS: lugares, ciudadanos, encargos, anécdotas y libros
// ============================================================================
{
  const PP = [[-17, 30], [17, 24], [17, 6], [-17, -2], [6, -40]];
  const BB = [[16, -12], [-16, 16]];
  const poi = (i, id, name, text, fact, q) => ({ id, at: PP[i], name, text, fact, q });
  const book = (b, i) => ({ ...b, at: BB[i] });

  // ---------------------------------------------------------------- XXXI · El taller de la belleza
  POIS.push([
    poi(0, 'cueva-chauvet', 'La cueva de Chauvet', 'En 1994, tres espeleólogos encontraron en el sur de Francia una cueva cerrada durante milenios. En sus paredes había cientos de animales pintados hace unos treinta y seis mil años: caballos, leones, rinocerontes, osos y mamuts, dibujados con carbón y ocre, aprovechando los relieves de la roca para dar volumen. Son de las pinturas más antiguas del mundo.',
      'Los artistas de Chauvet pintaban a la luz de antorchas. Con la luz temblorosa, los animales parecían moverse: quizás era el primer cine de la humanidad.',
      { q: '¿Hace cuánto tiempo se pintaron los animales de la cueva de Chauvet?', a: ['Unos treinta y seis mil años', 'Cien años', 'Mil años', 'Un millón de años'], e: 'Son de las pinturas más antiguas del mundo.' }),
    poi(1, 'gran-ola', 'La gran ola', 'Hacia 1831, Hokusai publicó «La gran ola de Kanagawa». Es un grabado en madera: se tallaba un bloque para cada color y se imprimía a mano, de modo que se hacían miles de copias baratas que compraba la gente común. Usó un azul nuevo, el azul de Prusia, que acababa de llegar a Japón y hacía el mar más intenso.',
      'Hoy es quizás la imagen japonesa más reproducida del mundo, y se dice que inspiró al músico Debussy para su obra «El mar».',
      { q: '¿Qué técnica usó Hokusai para La gran ola?', a: ['Grabado en madera, con un bloque para cada color', 'Pintura al óleo', 'Fotografía', 'Mosaico'], e: 'Se hacían miles de copias baratas.' }),
    poi(2, 'novena', 'El estreno de la Novena', 'El 7 de mayo de 1824, en el teatro de la Puerta de Carintia de Viena, se estrenó la Novena Sinfonía de Beethoven. Él estaba en el escenario marcando el ritmo, pero ya no oía nada. Cuando terminó la música, siguió de espaldas al público, mirando la partitura. Una joven cantante, Caroline Unger, lo tomó del brazo y lo hizo girar: el teatro entero aplaudía y agitaba sombreros y pañuelos para que él pudiera ver la ovación.',
      'La partitura original de la Novena es hoy Patrimonio de la Humanidad de la Unesco.',
      { q: '¿Cómo supo Beethoven que el público aplaudía su Novena?', a: ['Una cantante lo hizo girar para que viera la ovación', 'Lo escuchó con claridad', 'Se lo contaron al día siguiente', 'Nunca lo supo'], e: 'Agitaban sombreros y pañuelos.' }),
    poi(3, 'casa-azul', 'La Casa Azul', 'En Coyoacán, en la Ciudad de México, hay una casa pintada de un azul intenso. Allí nació Frida Kahlo, allí vivió con Diego Rivera y allí murió. En el patio hay plantas, una pirámide con esculturas antiguas y, dentro, su caballete, su silla de ruedas, sus pinceles y los corsés que tuvo que usar por su columna, que ella también pintaba.',
      'Desde 1958 es un museo. En la cocina, con las paredes de colores, todavía se ven escritos los nombres de Frida y Diego con pequeños jarritos de barro.',
      { q: '¿Qué pintaba Frida también, además de lienzos?', a: ['Los corsés que usaba por su columna', 'Coches', 'Barcos', 'Nada más'], e: 'Convertía hasta su dolor en arte.' }),
    poi(4, 'sinestesia', 'Los colores que suenan', 'Algunas personas tienen sinestesia: al oír música ven colores, o al leer una letra sienten un color. Kandinsky lo vivió escuchando la ópera «Lohengrin» de Wagner: «vi todos mis colores, estaban ante mis ojos», escribió. Desde entonces quiso pintar cuadros que fueran como sinfonías, y los tituló «Composiciones» e «Improvisaciones», como piezas musicales.',
      'Se calcula que alrededor de una de cada veinte o treinta personas tiene algún tipo de sinestesia.',
      { q: '¿Qué es la sinestesia?', a: ['Percibir un sentido a través de otro, como ver colores al oír música', 'Una enfermedad del estómago', 'Un tipo de pintura', 'Un instrumento musical'], e: 'Kandinsky la vivió con Wagner.' }),
  ]);
  NPCS.push([
    wnpc(0, 'escultora', 'Camila', 'escultora', sk(0xe8e0d0, 0x8a6a4a, 0xf0d0b0, 0x5a3a2a, { hat: 'longhair', acc: 'none' }), [
      'Miguel Ángel decía que la estatua ya está dentro del bloque de mármol: el escultor solo quita lo que sobra. Yo todavía estoy aprendiendo a ver qué sobra.',
      'Me paso horas puliendo una curva que nadie notará. Pero yo sé que está ahí. Esa es la honradez del artista.',
      'Toca esta piedra. Está fría, pero si la trabajas con paciencia, parece que respira.',
    ], true),
    wnpc(1, 'luthier', 'Antonio', 'constructor de violines', sk(0x6a4a2a, 0x3a2a1a, 0xe0c0a0, 0x8a8a8a, { beard: 0x8a8a8a, hat: 'cap', acc: 'none' }), [
      'Un violín tiene más de setenta piezas de madera. La de arriba es de abeto; la de atrás, de arce. Cada una canta distinto.',
      'Antes de pegar la tapa, la golpeo suavemente y escucho. La madera me dice si está lista. Hay que tener paciencia para escuchar a la madera.',
      'Un buen violín mejora con los años si alguien lo toca. Como las personas: lo que no se usa, se apaga.',
    ]),
    wnpc(2, 'bailarina', 'Lola', 'bailarina', sk(0xc82a5a, 0x2a2a2a, 0xe0b090, 0x1a1410, { hat: 'braids', acc: 'none' }), [
      'Antes de cada función me tiemblan las piernas. Luego empieza la música y el miedo se transforma en movimiento.',
      'El baile es el arte más antiguo, creo: antes de pintar o escribir, los seres humanos ya bailaban alrededor del fuego.',
      'Schiller tenía razón: cuando bailo, estoy jugando en serio. Y en ese momento me siento libre.',
    ], true),
  ]);
  Object.assign(QUESTS, {
    vitruvio: { text: 'Visita la cueva de Chauvet y escucha a Camila, la escultora. Luego dime qué tres cualidades debe tener un edificio.', needs: { pois: ['cueva-chauvet'], npcs: ['escultora'] },
      riddle: { q: '¿Qué debe tener un edificio según Vitruvio?', a: ['Firmeza, utilidad y belleza', 'Oro, torres y altura', 'Solo tamaño', 'Nada'] } },
    hokusai: { text: 'Mira de cerca La gran ola. Luego dime qué montaña aparece al fondo.', needs: { pois: ['gran-ola'], npcs: [] },
      riddle: { q: '¿Qué montaña aparece en La gran ola?', a: ['El monte Fuji', 'El Everest', 'El Olimpo', 'El Chimborazo'] } },
    beethoven: { text: 'Asiste al estreno de la Novena y escucha a Antonio, el constructor de violines. Luego dime con qué poema termina mi sinfonía.', needs: { pois: ['novena'], npcs: ['luthier'] },
      riddle: { q: '¿Con qué poema termina la Novena?', a: ['La Oda a la alegría', 'La Odisea', 'Ninguno', 'El cuervo'] } },
    tolstoi: { text: 'Escucha a Lola, la bailarina, y a Antonio, el luthier. Luego dime qué es el arte, según yo.', needs: { pois: [], npcs: ['bailarina', 'luthier'] },
      riddle: { q: '¿Qué es el arte para Tolstói?', a: ['Un contagio de sentimientos que une a las personas', 'Un adorno', 'Un negocio', 'Nada'] } },
    kandinsky: { text: 'Descubre los colores que suenan. Luego dime qué instrumento suena como el amarillo.', needs: { pois: ['sinestesia'], npcs: [] },
      riddle: { q: '¿Cómo suena el amarillo para Kandinsky?', a: ['Como una trompeta', 'Como un tambor', 'Como el silencio', 'Como una campana rota'] } },
    frida: { text: 'Visita la Casa Azul y escucha a Camila, la escultora. Luego dime qué pintaba yo más que nada.', needs: { pois: ['casa-azul'], npcs: ['escultora'] },
      riddle: { q: '¿Qué pintaba Frida con más frecuencia?', a: ['Autorretratos', 'Batallas', 'Barcos', 'Coches'] } },
  });
  Object.assign(ANECDOTES, {
    vitruvio: ['Conté la historia de Arquímedes y la corona del rey: cómo descubrió en la bañera que podía medir el volumen con el agua, y salió corriendo gritando «¡Eureka!». Gracias a mí la conoces.', 'Escribí que el arquitecto debe saber de todo: dibujo, geometría, historia, filosofía, música, medicina, derecho y astronomía. ¡Nada menos!'],
    hokusai: ['Una vez, ante el gobernante de Japón, pinté una curva azul en un largo papel, mojé las patas de un gallo en pintura roja y lo dejé caminar encima. Dije: «hojas de arce flotando en un río».', 'Pinté en un festival un retrato enorme de un monje budista, de más de doscientos metros cuadrados, con escobas como pinceles. La gente lo miraba desde los tejados.'],
    beethoven: ['Me mudé de casa en Viena más de sesenta veces. Los caseros se quejaban de mi desorden y de que tocaba el piano a cualquier hora.', 'Para seguir sintiendo la música ya sordo, apoyaba una varilla de madera entre los dientes y el piano: así sentía las vibraciones.'],
    tolstoi: ['A los ochenta y dos años me escapé de casa en secreto, de noche, para vivir con sencillez. Me enfermé en el tren y morí en la casa del jefe de una pequeña estación.', 'Durante muchos años fui vegetariano y no permitía que se cazara en mi finca. Decía que mientras haya mataderos habrá campos de batalla.'],
    kandinsky: ['Durante un tiempo vivía en Múnich con mis amigos pintores y hacíamos una revista llamada «El jinete azul». A mí me gustaban los caballos y a Franz Marc el azul.', 'En la Bauhaus hice una encuesta a todos: ¿qué color le corresponde al triángulo, al cuadrado y al círculo? La mayoría respondió: amarillo, rojo y azul.'],
    frida: ['Para que mi padre no se preocupara, de niña escondía mi pierna más delgada con varias medias. Después, en mis cuadros, la mostré sin vergüenza.', 'En mi primera exposición en México, en 1953, estaba tan enferma que no podía levantarme. Me llevaron en mi cama, en una ambulancia, y recibí a todos acostada.'],
    schiller: ['Mi amigo Goethe contó que una vez, en mi casa, sintió un olor terrible en mi escritorio: yo guardaba manzanas podridas en un cajón, porque su olor me ayudaba a escribir.', 'Mi obra Guillermo Tell, con el héroe que dispara a una manzana sobre la cabeza de su hijo, se convirtió en símbolo de la libertad de Suiza.'],
  });
  BOOKS.push([
    book({ id: 'cartas-estetica', author: 'schiller', by: 'Friedrich Schiller', title: 'Cartas sobre la educación estética del hombre', year: '1795', kind: 'filosofía del arte',
      parts: [
        { t: 'Una época sin armonía', x: 'Schiller ve que en su tiempo las personas se han dividido: unos solo trabajan con las manos, otros solo piensan. Nadie desarrolla su humanidad entera.' },
        { t: 'Dos impulsos', x: 'Tenemos un impulso sensible, que nos ata a lo que sentimos ahora, y uno formal, que busca leyes eternas. Si gana uno solo, nos volvemos salvajes o fríos.' },
        { t: 'El impulso de juego', x: 'La belleza despierta un tercer impulso, el de juego, que une los dos. Por eso el ser humano solo es plenamente humano cuando juega.' },
        { t: 'De la belleza a la libertad', x: 'Para construir una sociedad libre, dice, primero hay que formar personas armoniosas. Es por la belleza por donde se llega a la libertad.' },
      ],
      quote: 'Es por la belleza por donde se llega a la libertad.',
      q: { q: '¿Qué une los impulsos sensible y formal según Schiller?', a: ['El impulso de juego, despertado por la belleza', 'El miedo', 'El dinero', 'La guerra'], e: 'Así somos plenamente humanos.' } }, 0),
    book({ id: 'lo-espiritual', author: 'kandinsky', by: 'Vasili Kandinsky', title: 'De lo espiritual en el arte', year: '1911', kind: 'teoría del arte',
      parts: [
        { t: 'Más allá de la materia', x: 'Kandinsky critica un arte que solo copia el mundo exterior. El verdadero arte nace de una necesidad interior y habla al alma.' },
        { t: 'El triángulo espiritual', x: 'Imagina la humanidad como un gran triángulo que sube lentamente. En la punta, solos, están los artistas que ven más allá, y que al principio nadie entiende.' },
        { t: 'El lenguaje de los colores', x: 'El amarillo es cálido y se acerca al espectador, como una trompeta; el azul profundo se aleja, y llama a lo infinito. Los colores tienen efectos en el alma.' },
        { t: 'La pintura como música', x: 'Como la música no necesita imitar ruidos de la naturaleza, la pintura puede usar colores y formas libremente para emocionar.' },
      ],
      quote: 'El color es la tecla, el ojo el martillo, el alma el piano de muchas cuerdas.',
      q: { q: '¿De dónde nace el verdadero arte para Kandinsky?', a: ['De una necesidad interior', 'De copiar fotos', 'Del dinero', 'Del azar'], e: 'Y habla al alma.' } }, 1),
  ]);
  BOOKS[BOOKS.length - 1].forEach((b) => { b.q.book = b.title; });

  // ---------------------------------------------------------------- XXXII · La gran asamblea de los pueblos
  POIS.push([
    poi(0, 'arbol-paz', 'El Árbol de la Paz', 'Según la tradición haudenosaunee, cuando las cinco naciones aceptaron la Gran Ley de la Paz, arrancaron un gran pino blanco y arrojaron sus armas en el hueco, donde una corriente subterránea se las llevó. Volvieron a plantar el árbol encima. Sus raíces blancas se extienden hacia los cuatro puntos cardinales, para que cualquier pueblo que quiera la paz pueda seguirlas hasta allí.',
      'En la copa del árbol vigila un águila, que avisa si se acerca un peligro. De ahí viene la expresión «enterrar el hacha de guerra».',
      { q: '¿De dónde viene la expresión «enterrar el hacha de guerra»?', a: ['De las armas enterradas bajo el Árbol de la Paz', 'De un cuento de piratas', 'De Roma', 'De nada'], e: 'Una tradición haudenosaunee.' }),
    poi(1, 'bisontes', 'Las grandes manadas', 'A principios del siglo XIX, decenas de millones de bisontes recorrían las praderas de Norteamérica. Los pueblos de las llanuras vivían de ellos y usaban casi todo el animal: carne, piel, huesos, tendones. En pocas décadas, la caza masiva por parte de colonos y comerciantes, a veces alentada para debilitar a los pueblos originarios, los dejó casi extinguidos: hacia 1890 quedaban menos de mil.',
      'Gracias al trabajo de conservación, hoy vuelven a vivir en libertad varios cientos de miles de bisontes, y muchas naciones originarias los han traído de vuelta a sus tierras.',
      { q: '¿Cuántos bisontes quedaban hacia 1890?', a: ['Menos de mil', 'Decenas de millones', 'Cien millones', 'Ninguno nunca existió'], e: 'Tras la caza masiva.' }),
    poi(2, 'parihaka', 'Parihaka', 'En una colina al pie del monte Taranaki, en Nueva Zelanda, estaba la aldea de Parihaka. Cada mes, el día dieciocho, miles de maoríes se reunían para escuchar a Te Whiti y a Tohu. Llevaban una pluma blanca de albatros en el pelo, símbolo de paz. Cuando llegaron los soldados en 1881, encontraron a dos mil personas sentadas en silencio y a niños que cantaban y ofrecían pan.',
      'Cada 5 de noviembre se recuerda la invasión de Parihaka. La pluma blanca sigue siendo un símbolo de resistencia pacífica en Nueva Zelanda.',
      { q: '¿Qué símbolo de paz llevaban los habitantes de Parihaka?', a: ['Una pluma blanca de albatros', 'Una corona de oro', 'Una espada', 'Una bandera roja'], e: 'Todavía es símbolo de resistencia pacífica.' }),
    poi(3, 'iolani', 'El palacio ʻIolani', 'En Honolulu se alza el palacio ʻIolani, el único palacio real en territorio de Estados Unidos. Tenía luz eléctrica y teléfono antes que la Casa Blanca. En 1895, la reina Liliʻuokalani estuvo encerrada casi ocho meses en una habitación del piso de arriba. Para pasar el tiempo, cosió una colcha con su historia y compuso canciones.',
      'La colcha de la reina, con mensajes y fechas bordadas, todavía se conserva y se exhibe en el palacio.',
      { q: '¿Qué tenía el palacio ʻIolani antes que la Casa Blanca?', a: ['Luz eléctrica y teléfono', 'Un zoológico', 'Un ascensor de oro', 'Nada'], e: 'Era un palacio muy moderno.' }),
    poi(4, 'uluru', 'Uluru', 'En el centro de Australia se alza Uluru, una enorme roca de arenisca que cambia de color con la luz: rojo encendido al atardecer, morado al anochecer. Para el pueblo anangu es un lugar sagrado, lleno de historias del «Tiempo del Sueño», cuando los seres ancestrales crearon el mundo. En 1985 el gobierno devolvió la propiedad de Uluru a los anangu.',
      'Desde 2019 está prohibido escalar la roca, por respeto a sus guardianes tradicionales.',
      { q: '¿Qué pasó en 2019 en Uluru?', a: ['Se prohibió escalar la roca, por respeto a los anangu', 'Se construyó un hotel encima', 'Se pintó de azul', 'Nada'], e: 'Es un lugar sagrado.' }),
  ]);
  NPCS.push([
    wnpc(0, 'tejedora-dine', 'Nizhoni', 'tejedora diné', sk(0xc84a2a, 0x2a2a3a, 0x9a6a4a, 0x1a1410, { hat: 'braids', acc: 'none' }), [
      'Mi abuela me enseñó a tejer en el telar. Cada alfombra tiene un pequeño hilo que sale hasta el borde: el camino del espíritu, para que el alma de la tejedora no quede atrapada en la obra.',
      'Tejer me enseña paciencia. Una alfombra grande puede llevar meses. Si te apuras, el dibujo se tuerce.',
      'Decimos «hózhó»: vivir en belleza y en equilibrio con todo lo que te rodea. Es la palabra más importante que conozco.',
    ], true),
    wnpc(1, 'navegante', 'Kaimana', 'navegante polinesio', sk(0xe8b048, 0x2a5a7a, 0x8a5a3a, 0x1a1410, { hat: 'longhair', acc: 'none' }), [
      'Mis antepasados cruzaron el océano Pacífico en canoas dobles, sin brújula ni mapas, mucho antes que los europeos. Se guiaban por las estrellas, las olas y los pájaros.',
      'Aprendí a memorizar dónde sale y se pone cada estrella. Y a sentir con el cuerpo, acostado en la canoa, la dirección de las olas.',
      'Si ves un ave que vuela al atardecer, síguela: va a dormir a tierra. El océano habla, si sabes escucharlo.',
    ]),
    wnpc(2, 'narradora', 'Winona', 'abuela narradora', sk(0x8a6a4a, 0x5a3a2a, 0x9a6a4a, 0xe8e8e8, { hat: 'braids', acc: 'staff' }), [
      'Nuestras historias no se escribían: se contaban junto al fuego en las noches de invierno. Cada anciano que muere es como una biblioteca que se quema.',
      'Mi abuela decía: no heredamos la tierra de nuestros padres, la tomamos prestada de nuestros hijos. Muchos pueblos dicen algo parecido.',
      'En el círculo, cada uno habla cuando le llega el turno, y los demás escuchan sin interrumpir. Prueba hacerlo una vez en tu familia.',
    ], true),
  ]);
  Object.assign(QUESTS, {
    torosentado: { text: 'Visita las grandes manadas y escucha a Winona, la abuela narradora. Luego dime qué animal era la base de la vida de mi pueblo.', needs: { pois: ['bisontes'], npcs: ['narradora'] },
      riddle: { q: '¿Qué animal era la base de la vida lakota?', a: ['El bisonte', 'El camello', 'El canguro', 'El elefante'] } },
    joseph: { text: 'Escucha a Winona, la abuela narradora. Luego dime qué dije al rendirme.', needs: { pois: [], npcs: ['narradora'] },
      riddle: { q: '¿Qué dijo el Jefe Joseph al rendirse?', a: ['No lucharé más para siempre', 'Volveré con un ejército', 'Nunca me rendiré', 'Nada'] } },
    alcenegro: { text: 'Visita el Árbol de la Paz y escucha a Nizhoni, la tejedora. Luego dime cómo se mueve la vida, según yo.', needs: { pois: ['arbol-paz'], npcs: ['tejedora-dine'] },
      riddle: { q: '¿Cómo se mueve la vida según Alce Negro?', a: ['En círculos', 'En línea recta', 'Al azar', 'No se mueve'] } },
    tewhiti: { text: 'Visita Parihaka. Luego dime qué símbolo de paz llevábamos en el pelo.', needs: { pois: ['parihaka'], npcs: [] },
      riddle: { q: '¿Qué llevaban en el pelo los habitantes de Parihaka?', a: ['Una pluma blanca de albatros', 'Una corona', 'Una flor roja', 'Nada'] } },
    liliuokalani: { text: 'Visita el palacio ʻIolani y escucha a Kaimana, el navegante. Luego dime mi canción más famosa.', needs: { pois: ['iolani'], npcs: ['navegante'] },
      riddle: { q: '¿Cuál es la canción más famosa de Liliʻuokalani?', a: ['Aloha ʻOe', 'Cielito lindo', 'La bamba', 'Ninguna'] } },
    unaipon: { text: 'Visita Uluru y escucha a Kaimana, el navegante. Luego dime qué estudié para imaginar una máquina voladora.', needs: { pois: ['uluru'], npcs: ['navegante'] },
      riddle: { q: '¿Qué estudió Unaipon para imaginar un helicóptero?', a: ['El vuelo del bumerán', 'Las nubes', 'Los cohetes', 'Las gallinas'] } },
  });
  Object.assign(ANECDOTES, {
    torosentado: ['Durante un tiempo viajé con el espectáculo del Oeste de Buffalo Bill. Daba casi todo lo que ganaba a los niños pobres que se acercaban: no entendía cómo podía haber tanta pobreza entre tanta riqueza.', 'Me gustaba cantar. Muchas de mis canciones hablaban de los pájaros: decía que una alondra me había avisado de un peligro cuando era joven.'],
    joseph: ['En Washington conocí al presidente y hablé en un gran salón lleno de gente importante. Les dije: las buenas palabras no le devuelven la salud a mi pueblo ni nos devuelven nuestra tierra.', 'Mi médico escribió que morí «de tristeza», lejos de mi valle de Wallowa.'],
    alcenegro: ['En Inglaterra, la reina Victoria vino a ver nuestro espectáculo. Al final nos dio la mano y nos dijo que, si fuéramos suyos, no dejaría que nos llevaran por el mundo como en un circo.', 'Siendo anciano subí al pico más alto de las Colinas Negras y pedí, llorando, que el árbol sagrado de mi pueblo volviera a florecer. Cayó una lluvia suave sobre un cielo despejado.'],
    tewhiti: ['Cuando los soldados vinieron a arrestarme, salí a recibirlos tranquilo y le dije a mi gente que no se resistiera. «Nos llevan a la cárcel, pero no pueden encerrar la paz», dije.', 'Mientras estaba preso, me pasearon por ciudades de la Isla Sur, esperando que me impresionara el poder de los colonos. Yo miraba sus fábricas en silencio.'],
    liliuokalani: ['Mientras estuve presa, escribía música en un papel pautado que dibujaba yo misma. No me dejaban tener un piano, así que tarareaba las melodías para no olvidarlas.', 'Escribí la letra de Aloha ʻOe después de ver a dos enamorados despedirse durante un paseo a caballo. Ahora se canta en las despedidas de todo Hawái.'],
    unaipon: ['Pasé años intentando inventar una máquina de movimiento perpetuo. Nunca lo logré, porque es imposible, pero aprendí muchísima física en el intento.', 'Cuando viajaba por Australia, a veces no me dejaban entrar en los hoteles por ser aborigen. Dormía donde podía y al día siguiente daba mi conferencia igual.'],
    pacificador: ['Para demostrar que mi mensaje era verdadero, dicen que subí a lo alto de un árbol sobre una cascada y pedí que lo cortaran. Caí al agua. A la mañana siguiente me encontraron sentado junto al fuego, cocinando tranquilo.', 'Dicen que nunca quise que se dijera mi nombre en voz alta, salvo en ocasiones especiales. Por eso muchos me llaman simplemente el Pacificador.'],
  });
  BOOKS.push([
    book({ id: 'gran-ley', author: 'pacificador', by: 'Tradición haudenosaunee', title: 'La Gran Ley de la Paz', year: 'tradición oral', kind: 'constitución tradicional',
      parts: [
        { t: 'Una ley que se recuerda', x: 'La Gran Ley de la Paz no se escribió en papel: se recuerda con cinturones de cuentas de concha, llamados wampum, cuyos dibujos ayudan a recitar sus partes.' },
        { t: 'El gran consejo', x: 'Los jefes de las naciones se reúnen junto al fuego del consejo. Cada asunto pasa de un grupo a otro hasta que todos llegan a un acuerdo.' },
        { t: 'Las madres de los clanes', x: 'Las madres de los clanes eligen a los jefes, y pueden quitarles el cargo si no cumplen con su deber. Las mujeres tienen un papel central.' },
        { t: 'La piel de siete palmos', x: 'Se dice que los jefes deben tener una piel de siete palmos de grosor, para no ofenderse con las críticas, y pensar siempre en las generaciones que vendrán.' },
      ],
      quote: 'En cada deliberación, pensad en el bienestar de las siete generaciones futuras.',
      q: { q: '¿Con qué se recordaba la Gran Ley de la Paz?', a: ['Con cinturones de cuentas de concha, llamados wampum', 'Con libros de papel', 'Con piedras talladas en latín', 'No se recordaba'], e: 'Sus dibujos ayudan a recitarla.' } }, 0),
    book({ id: 'alce-negro-habla', author: 'alcenegro', by: 'Alce Negro y John Neihardt', title: 'Alce Negro habla', year: '1932', kind: 'testimonio y visión',
      parts: [
        { t: 'Para que no se pierda', x: 'Ya anciano, Alce Negro contó su vida al poeta John Neihardt, con su hijo como intérprete. Quería que su gran visión no se perdiera.' },
        { t: 'La gran visión', x: 'A los nueve años, enfermo, fue llevado al cielo por dos hombres. Los Seis Abuelos le dieron poderes y le mostraron el aro de su pueblo y el árbol florido.' },
        { t: 'El aro roto', x: 'El libro cuenta la llegada de los colonos, la desaparición de los bisontes y la masacre de Wounded Knee, donde, dice, murió un hermoso sueño.' },
        { t: 'El círculo', x: 'Para Alce Negro, el mundo se mueve en círculos y todo está unido. El centro del mundo está en todas partes.' },
      ],
      quote: 'El centro del mundo está en todas partes.',
      q: { q: '¿Dónde está el centro del mundo, según Alce Negro?', a: ['En todas partes', 'En una montaña de Europa', 'En el mar', 'En ningún lugar'], e: 'Todo está unido en el círculo.' } }, 1),
  ]);
  BOOKS[BOOKS.length - 1].forEach((b) => { b.q.book = b.title; });

  // ---------------------------------------------------------------- XXXIII · La casa de los cuidados
  POIS.push([
    poi(0, 'gladiadores', 'La escuela de gladiadores', 'En el siglo II, la ciudad de Pérgamo tenía un gran templo dedicado a Asclepio, dios de la medicina, y una escuela de gladiadores. El sumo sacerdote nombró médico de los gladiadores a un joven de veintiocho años: Galeno. Le dieron el puesto después de una prueba difícil: delante de otros médicos, Galeno abrió el vientre de un mono y desafió a sus rivales a curarlo; nadie se atrevió, y él lo hizo.',
      'Según Galeno, en los años en que cuidó a los gladiadores murieron muchos menos que con el médico anterior: limpiaba bien las heridas y los alimentaba mejor.',
      { q: '¿Por qué los gladiadores ayudaron a Galeno a conocer el cuerpo?', a: ['Por sus heridas profundas, que dejaban ver músculos y tendones', 'Porque eran médicos', 'Porque escribían libros', 'No ayudaron'], e: 'Fue su primera gran escuela.' }),
    poi(1, 'teatro-anatomico', 'El teatro anatómico de Padua', 'En 1595 la Universidad de Padua construyó un teatro anatómico: una sala de madera en forma de embudo, con seis pisos de gradas ovaladas y estrechas, donde unos trescientos estudiantes podían mirar desde arriba, de pie, cómo un profesor estudiaba un cuerpo sobre una mesa en el centro. Es el teatro anatómico permanente más antiguo que se conserva.',
      'Allí estudió anatomía William Harvey, que después descubrió la circulación de la sangre. Las clases se hacían en invierno, porque el frío conservaba mejor los cuerpos.',
      { q: '¿Por qué las clases en el teatro anatómico se hacían en invierno?', a: ['Porque el frío conservaba mejor los cuerpos', 'Porque en verano había vacaciones', 'Por la nieve', 'Por nada'], e: 'No había refrigeradores.' }),
    poi(2, 'lavado-manos', 'El lavabo de Viena', 'En 1847, en la entrada de la primera sala de partos del Hospital General de Viena, Semmelweis puso una palangana con agua de cloro. Todo médico o estudiante que llegara de las autopsias debía lavarse las manos hasta que no quedara olor. En pocos meses, la mortalidad de las madres en esa sala bajó de más de una de cada diez a muy pocas.',
      'Hoy, el 5 de mayo es el Día Mundial de la Higiene de Manos. Lavarse bien las manos durante veinte segundos sigue salvando millones de vidas.',
      { q: '¿Con qué se lavaban las manos en la sala de Semmelweis?', a: ['Con agua de cloro', 'Con vino', 'Con agua de mar', 'No se lavaban'], e: 'Hasta que no quedara olor.' }),
    poi(3, 'escutari', 'El hospital de Escútari', 'En el cuartel de Escútari, frente a Estambul, se instaló un enorme hospital para los soldados británicos heridos en la guerra de Crimea. Cuando llegó Florence Nightingale, en 1854, los soldados dormían en el suelo, había ratas y piojos, faltaban vendas y las cloacas estaban rotas. Nightingale organizó la limpieza, la cocina, la lavandería y la ventilación, y recorría las salas de noche con su lámpara.',
      'Con sus datos, Nightingale mostró en su diagrama de rosa que la mayoría de las muertes se debían a enfermedades evitables, no a las heridas de guerra.',
      { q: '¿Qué mostró el diagrama de rosa de Nightingale?', a: ['Que la mayoría de las muertes eran por enfermedades evitables', 'Que había muchas flores', 'Que la guerra era buena', 'Nada'], e: 'Con datos y gráficos.' }),
    poi(4, 'vacuna-rabia', 'El niño y la vacuna', 'El 6 de julio de 1885, una madre llegó al laboratorio de Pasteur en París con su hijo Joseph Meister, de nueve años, mordido catorce veces por un perro rabioso. La rabia era siempre mortal. Pasteur no era médico, y su vacuna solo se había probado en perros. Tras consultar con médicos, decidió intentarlo: durante diez días le inyectaron la vacuna. Joseph sobrevivió.',
      'Meses después llegaron personas mordidas desde muchos países, incluso un grupo desde Rusia mordido por un lobo. Así nació el Instituto Pasteur.',
      { q: '¿Quién fue el primer niño salvado con la vacuna de la rabia de Pasteur?', a: ['Joseph Meister', 'Louis Braille', 'Mozart', 'Nadie'], e: 'En 1885, con nueve años.' }),
  ]);
  NPCS.push([
    wnpc(0, 'enfermera', 'Rosa', 'enfermera de noche', sk(0xe8e8f0, 0x3a5a8a, 0xf0d0b0, 0x5a3a2a, { hat: 'hood', acc: 'lamp' }), [
      'Trabajo de noche, cuando el hospital está en silencio. Es cuando los enfermos tienen más miedo. A veces lo que más cura es sentarse un rato y escuchar.',
      'Florence Nightingale escribió que la enfermera debe observar todo: el color de la piel, el apetito, el ánimo. Los detalles salvan vidas.',
      'Cuidar no es solo dar medicinas. Es lavar, acomodar una almohada, abrir la ventana, sonreír. Todo eso también cura.',
    ], true),
    wnpc(1, 'boticario', 'Matías', 'boticario', sk(0x5a4a3a, 0x2a2a2a, 0xe0c0a0, 0x6a6a6a, { beard: 0x6a6a6a, hat: 'cap', acc: 'none' }), [
      'Paracelso decía: todo es veneno, nada es veneno; solo la dosis hace el veneno. Una medicina en exceso daña, y un veneno en una pizca puede curar.',
      'Muchas medicinas vienen de plantas: la aspirina, de la corteza del sauce; la quinina, de un árbol de los Andes que los pueblos originarios ya usaban.',
      'Nunca tomes una medicina sin saber qué es y cuánto tomar. La farmacia es un lugar de ciencia, no de magia.',
    ]),
    wnpc(2, 'partera', 'Dolores', 'partera', sk(0x8a5a4a, 0xe8e0d0, 0xc49372, 0x3a2a1a, { hat: 'longhair', acc: 'none' }), [
      'He ayudado a nacer a más de dos mil niños en este pueblo. Muchos de los que ahora son abuelos, los recibí yo en mis manos.',
      'Mi abuela, que también era partera, ya decía que había que lavarse bien las manos con jabón antes de tocar a una madre. ¡Sabía más que muchos médicos de su tiempo!',
      'Cada nacimiento es distinto, y cada uno me sigue emocionando como el primero.',
    ], true),
  ]);
  Object.assign(QUESTS, {
    galeno: { text: 'Visita la escuela de gladiadores y escucha a Matías, el boticario. Luego dime qué llevan las arterias, según demostré.', needs: { pois: ['gladiadores'], npcs: ['boticario'] },
      riddle: { q: '¿Qué llevan las arterias según Galeno?', a: ['Sangre', 'Aire', 'Agua', 'Nada'] } },
    vesalio: { text: 'Visita el teatro anatómico de Padua. Luego dime cómo se llama mi gran libro.', needs: { pois: ['teatro-anatomico'], npcs: [] },
      riddle: { q: '¿Cómo se llama el gran libro de Vesalio?', a: ['De humani corporis fabrica', 'El canon', 'Cosmos', 'La República'] } },
    semmelweis: { text: 'Visita el lavabo de Viena y escucha a Dolores, la partera. Luego dime qué gesto salvó a las madres.', needs: { pois: ['lavado-manos'], npcs: ['partera'] },
      riddle: { q: '¿Qué gesto salvó a las madres de Viena?', a: ['Lavarse las manos', 'Rezar', 'Dormir más', 'Abrir ventanas'] } },
    nightingale: { text: 'Visita el hospital de Escútari y escucha a Rosa, la enfermera de noche. Luego dime qué usé para convencer al gobierno.', needs: { pois: ['escutari'], npcs: ['enfermera'] },
      riddle: { q: '¿Qué usó Nightingale para convencer al gobierno?', a: ['Datos y gráficos', 'Poemas', 'Amenazas', 'Nada'] } },
    pasteur: { text: 'Conoce la historia del niño y la vacuna. Luego dime contra qué enfermedad era.', needs: { pois: ['vacuna-rabia'], npcs: [] },
      riddle: { q: '¿Contra qué enfermedad fue la vacuna de 1885?', a: ['La rabia', 'La gripe', 'El resfriado', 'La varicela'] } },
    cajal: { text: 'Escucha a Matías, el boticario, y a Rosa, la enfermera. Luego dime de qué células está formado el cerebro.', needs: { pois: [], npcs: ['boticario', 'enfermera'] },
      riddle: { q: '¿De qué células independientes está formado el sistema nervioso?', a: ['Neuronas', 'Glóbulos rojos', 'Células de la piel', 'Ninguna'] } },
  });
  Object.assign(ANECDOTES, {
    galeno: ['Era tan orgulloso que escribí un libro sobre cómo reconocer a los médicos charlatanes, y otro sobre mis propios libros, para que nadie me atribuyera obras falsas.', 'Cuando la peste llegó a Roma, en tiempos de Marco Aurelio, describí sus síntomas con tanto detalle que hoy los historiadores creen que fue viruela.'],
    vesalio: ['Para estudiar un esqueleto completo, una noche saqué en secreto, hueso por hueso, el cuerpo de un ajusticiado colgado fuera de la ciudad de Lovaina. Luego dije que lo había traído de París.', 'Morí a los cincuenta años, al volver de una peregrinación a Jerusalén: mi barco sufrió una tormenta y llegué enfermo a la isla griega de Zante.'],
    semmelweis: ['Escribí cartas furiosas a los médicos que me rechazaban, llamándolos asesinos. No me ayudó: tener razón no basta, también hay que saber convencer.', 'Hoy en Budapest hay una universidad de medicina con mi nombre, y mi cara aparece en sellos y monedas de Hungría.'],
    nightingale: ['Tenía una lechuza mascota llamada Atenea, que había rescatado en Grecia. La llevaba a todas partes en el bolsillo.', 'Fui la primera mujer admitida en la Real Sociedad de Estadística británica. Decía que para entender los pensamientos de Dios hay que estudiar estadística.'],
    pasteur: ['A los cuarenta y cinco años sufrí un derrame cerebral que me dejó medio cuerpo paralizado. Seguí trabajando, y mis mayores descubrimientos llegaron después.', 'Se dice que limpiaba los platos y los cubiertos con una servilleta antes de comer, por miedo a los microbios, incluso en las cenas elegantes.'],
    cajal: ['También fui un gran fotógrafo: hice algunas de las primeras fotografías en color de España, y escribí un libro sobre fotografía.', 'Escribí cuentos de ciencia ficción, y un libro de consejos para jóvenes investigadores que todavía se lee: «Reglas y consejos sobre investigación científica».'],
    schweitzer: ['En Lambaréné tenía un pelícano, cabras, perros y hasta un cerdo salvaje como compañeros. Dejaba a las hormigas cruzar su escritorio sin molestarlas.', 'Llevé a la selva un piano preparado para el clima húmedo, con pedales de órgano, para seguir practicando a Bach por las noches.'],
  });
  BOOKS.push([
    book({ id: 'fabrica-vesalio', author: 'vesalio', by: 'Andrés Vesalio', title: 'De humani corporis fabrica', year: '1543', kind: 'anatomía',
      parts: [
        { t: 'Siete libros', x: 'La Fabrica tiene siete libros: huesos, músculos, venas y arterias, nervios, órganos del vientre, corazón y pulmones, y cerebro.' },
        { t: 'Esqueletos en el paisaje', x: 'Sus grabados muestran esqueletos y cuerpos sin piel posando en paisajes de Italia, como si estuvieran vivos. Uno de ellos se apoya pensativo sobre una tumba.' },
        { t: 'Corregir a Galeno', x: 'Vesalio señala más de doscientos errores de Galeno, como la existencia de un hueso que solo tienen los animales en la mandíbula.' },
        { t: 'Mirar uno mismo', x: 'Su mensaje principal: el médico no debe confiar solo en los libros antiguos, sino abrir los ojos y comprobar con sus propias manos.' },
      ],
      quote: 'Me he propuesto describir el cuerpo humano tal como lo he visto, no como lo cuentan los libros.',
      q: { q: '¿Cuál es el mensaje principal de la Fabrica?', a: ['Comprobar uno mismo en lugar de confiar solo en los libros antiguos', 'Obedecer a Galeno', 'No estudiar el cuerpo', 'Nada'], e: 'El comienzo de la anatomía moderna.' } }, 0),
    book({ id: 'notas-enfermeria', author: 'nightingale', by: 'Florence Nightingale', title: 'Notas sobre enfermería', year: '1859', kind: 'manual de cuidados',
      parts: [
        { t: 'Para todas las mujeres', x: 'Nightingale escribió el libro para cualquier persona que cuidara a un enfermo en casa, no solo para enfermeras profesionales. Se vendieron miles de copias.' },
        { t: 'Aire puro', x: 'Lo primero, dice, es mantener el aire de la habitación tan puro como el de afuera, sin enfriar al enfermo. La ventilación salva vidas.' },
        { t: 'Ruido y luz', x: 'El ruido innecesario daña al enfermo, y la luz del sol lo ayuda. Hay que poner la cama donde pueda ver el cielo por la ventana.' },
        { t: 'Observar', x: 'La lección más importante para una enfermera es aprender qué observar, cómo observar y qué síntomas indican mejoría o peligro.' },
      ],
      quote: 'Lo primero que debe hacer un hospital es no hacer daño a los enfermos.',
      q: { q: '¿Qué es lo primero que pide Nightingale para la habitación de un enfermo?', a: ['Aire puro, como el de afuera', 'Oscuridad total', 'Mucho ruido', 'Cerrar las ventanas siempre'], e: 'La ventilación salva vidas.' } }, 1),
  ]);
  BOOKS[BOOKS.length - 1].forEach((b) => { b.q.book = b.title; });

  // ---------------------------------------------------------------- debates
  try {
    VERSUS.push(
      { id: 'schiller-kant', a: 'schiller', b: 'kant', q: '¿Qué es la belleza?', eje: null, va: 0, vb: 0,
        turns: [
          ['b', 'Bello es lo que agrada universalmente sin concepto, y sin interés: no lo queremos poseer ni usar, solo contemplar. Es un libre juego de la imaginación y el entendimiento.'],
          ['a', 'Maestro Kant, tomo su palabra «juego» y la llevo más lejos. La belleza no solo agrada: nos educa. Reconcilia lo que sentimos con lo que pensamos, y así nos hace libres.'],
          ['b', 'Cuidado, Schiller: si la belleza tiene un fin, deja de ser pura. La rosa es bella aunque no sirva para nada.'],
          ['a', 'Precisamente porque no sirve para nada, nos libera de la necesidad. Por eso el ser humano solo es plenamente humano cuando juega.'],
        ],
        cierre: 'Kant definió la belleza como un placer libre y desinteresado. Schiller vio en ese libre juego un camino para educar a la humanidad. Discípulo y maestro, juntos, dieron forma a la estética moderna.' },
      { id: 'pacificador-hobbes', a: 'pacificador', b: 'hobbes', q: '¿Cómo se construye la paz?', eje: null, va: 0, vb: 0,
        turns: [
          ['b', 'Sin un poder que inspire miedo a todos, los seres humanos viven en guerra de todos contra todos. La paz necesita un soberano fuerte, con la espada en la mano.'],
          ['a', 'Las cinco naciones vivían en esa guerra que describes. No las unió el miedo, sino la palabra: escuchamos, consolamos el dolor de cada uno y acordamos una ley común.'],
          ['b', '¿Y si alguien rompe el acuerdo? Los pactos sin espada son solo palabras.'],
          ['a', 'Por eso decidimos en consejo, buscando que todos acepten. Una flecha sola se rompe; cinco juntas no. La fuerza de la paz está en la unión, no en el miedo.'],
        ],
        cierre: 'Hobbes vio la paz como obra de un poder temido. La Gran Ley haudenosaunee la construyó con consejo, consenso y unión. Dos caminos que todavía discuten las sociedades.' },
      { id: 'schweitzer-descartes', a: 'schweitzer', b: 'descartes', q: '¿Son máquinas los animales?', eje: null, va: 0, vb: 0,
        turns: [
          ['b', 'Los animales funcionan como relojes muy complejos: se mueven por resortes y engranajes de carne. No piensan, porque no hablan con sentido.'],
          ['a', 'He visto a una madre hipopótamo defender a su cría, y a un pelícano esperarme cada mañana. Toda vida quiere vivir, igual que yo.'],
          ['b', 'Que quieran vivir no prueba que piensen. El reloj también «quiere» dar la hora.'],
          ['a', 'No necesito saber si piensan como nosotros para respetarlos. Basta saber que sienten y quieren vivir. Por eso la ética debe abarcar toda vida.'],
        ],
        cierre: 'Descartes separó el alma humana del cuerpo-máquina de los animales. Schweitzer propuso respetar toda vida. Hoy la ciencia sabe que muchos animales sienten, y la pregunta sigue abierta.' },
    );
  } catch (e) { /* herramientas sin debates */ }
}
