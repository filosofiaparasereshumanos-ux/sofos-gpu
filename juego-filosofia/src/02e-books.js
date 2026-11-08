// ============================================================================
//  LIBROS: las grandes obras de cada época, en atriles que se pueden estudiar
//  Cada libro: capítulos (t: título, x: texto), una cita y una pregunta de estudio.
//  author: id del filósofo (si está en el juego) · at: posición [x, z]
// ============================================================================
const BOOKS = [
  [ // I · Presocráticos
    { id: 'fragmentos', author: 'heraclito', by: 'Heráclito de Éfeso', title: 'Fragmentos', year: 'hacia el 500 a.C.', kind: 'aforismos', at: [-15, 6],
      parts: [
        { t: 'Un libro perdido', x: 'Heráclito escribió un solo libro, Sobre la naturaleza, que se perdió. Solo conservamos unos ciento treinta fragmentos: frases breves y enigmáticas citadas por otros autores. Por su estilo oscuro lo llamaron el Oscuro. Cada fragmento es como un oráculo: hay que pensarlo despacio.' },
        { t: 'Todo fluye', x: 'En el mismo río entramos y no entramos, somos y no somos. Las aguas que te bañan ya son otras, y tú también has cambiado. Para Heráclito, nada permanece quieto: la realidad es un proceso de cambio continuo, como una llama que siempre arde y nunca es la misma.' },
        { t: 'La guerra de los contrarios', x: 'La guerra es padre de todas las cosas. El día y la noche, el frío y el calor, la vida y la muerte se necesitan: uno se convierte en el otro. Lo que parece desorden es una tensión entre opuestos, como la del arco y la lira, que produce armonía.' },
        { t: 'El Logos', x: 'Por debajo del cambio hay una medida común, el Logos: una razón que ordena el cosmos. Casi todos viven como dormidos, cada uno en su mundo privado. El sabio despierta y escucha al Logos, que es común a todos. Por eso dice: no a mí, sino al Logos escuchando, es sabio reconocer que todo es uno.' },
      ],
      quote: 'Este cosmos, el mismo para todos, no lo hizo ningún dios ni ningún hombre: siempre fue, es y será fuego siempre vivo.',
      q: { q: 'Según los Fragmentos de Heráclito, ¿qué ordena el cambio continuo del cosmos?', a: ['El Logos, una razón común a todos', 'El azar de los átomos', 'Los números de Pitágoras', 'La voluntad de Zeus'], e: 'Bajo el flujo de las cosas hay una medida: el Logos.' } },
    { id: 'poema', author: 'parmenides', by: 'Parménides de Elea', title: 'Sobre la naturaleza (el Poema)', year: 'hacia el 475 a.C.', kind: 'poema', at: [-12, -26],
      parts: [
        { t: 'El viaje hacia la diosa', x: 'Parménides escribió su filosofía en verso, como Homero. El poema empieza con un viaje: unas yeguas guían su carro, conducido por las hijas del Sol, hasta las puertas del Día y de la Noche. Allí una diosa lo recibe y le promete enseñarle la verdad.' },
        { t: 'Los dos caminos', x: 'La diosa le muestra dos caminos. Uno dice que lo que es, es, y no puede no ser: es el camino de la verdad. El otro dice que lo que no es, es: es un camino imposible, porque la nada no se puede pensar ni decir. Pensar y ser son lo mismo.' },
        { t: 'Lo que es', x: 'Si solo existe lo que es, entonces el ser no nace ni muere, porque tendría que venir de la nada o ir a ella. Es uno, continuo, inmóvil y completo, como una esfera bien redonda. El cambio y la pluralidad que vemos son solo apariencia.' },
        { t: 'La opinión de los mortales', x: 'La segunda parte del poema explica las opiniones de los mortales, que confían en los sentidos y creen que las cosas nacen y mueren. La diosa las expone para que el viajero las conozca, pero advierte que en ellas no hay verdadera certeza. La razón debe juzgar, no los ojos ni los oídos.' },
      ],
      quote: 'Lo mismo es pensar y ser.',
      q: { q: 'En el Poema de Parménides, ¿qué camino es imposible?', a: ['Decir que lo que no es, es', 'Decir que lo que es, es', 'Seguir a la diosa', 'Escribir en verso'], e: 'La nada no se puede pensar ni decir.' } },
  ],
  [ // II · Atenas
    { id: 'banquete_libro', author: 'platon', by: 'Platón', title: 'El banquete', year: 'hacia el 385 a.C.', kind: 'diálogo', at: [-11, 8],
      parts: [
        { t: 'Una fiesta para celebrar', x: 'El poeta Agatón ha ganado un premio de tragedia y celebra un banquete en su casa. Entre los invitados están Sócrates, el médico Erixímaco y el cómico Aristófanes. Deciden no emborracharse y, en lugar de eso, que cada uno pronuncie un discurso en honor de Eros, el amor.' },
        { t: 'El mito de Aristófanes', x: 'Aristófanes cuenta que al principio los humanos eran seres dobles, redondos, con cuatro brazos y cuatro piernas. Eran tan poderosos que Zeus los cortó por la mitad. Desde entonces cada uno busca a su otra mitad, y a ese anhelo de volver a estar completos lo llamamos amor.' },
        { t: 'Lo que enseñó Diotima', x: 'Sócrates dice que aprendió sobre el amor de una sabia, Diotima de Mantinea. El amor no es un dios perfecto, sino un intermediario: es deseo de lo que no se tiene. Por eso Eros es filósofo, amante de la sabiduría, porque no es sabio pero desea serlo.' },
        { t: 'La escalera del amor', x: 'Diotima describe una ascensión: primero amamos un cuerpo bello, luego la belleza de todos los cuerpos, después la de las almas, las leyes y los saberes. Al final se contempla la Belleza en sí, eterna y pura. Entonces irrumpe Alcibíades, borracho, y elogia a Sócrates, que permanece sereno hasta el amanecer.' },
      ],
      quote: 'El amor es deseo de engendrar en la belleza, tanto según el cuerpo como según el alma.',
      q: { q: 'En El banquete, ¿quién le enseñó a Sócrates qué es el amor?', a: ['Diotima de Mantinea', 'Aspasia de Mileto', 'Aristófanes', 'La Pitia de Delfos'], e: 'Diotima explica que el amor es deseo de lo bello que no se posee.' } },
    { id: 'fedon', author: 'platon', by: 'Platón', title: 'Fedón', year: 'hacia el 380 a.C.', kind: 'diálogo', at: [14, 11],
      parts: [
        { t: 'El último día de Sócrates', x: 'Fedón cuenta a un amigo cómo fue el último día de Sócrates en la cárcel de Atenas. Sus discípulos lloran, pero Sócrates está tranquilo y conversa con ellos. Les pregunta por qué un filósofo debería temer la muerte, si toda su vida ha sido una preparación para ella.' },
        { t: 'Filosofar es aprender a morir', x: 'Para Sócrates, el cuerpo distrae al alma con deseos, miedos y sensaciones. El filósofo intenta pensar con el alma sola, lo más libre posible del cuerpo. La muerte es la separación del alma y el cuerpo, de modo que el filósofo no debe temerla: es lo que siempre buscó.' },
        { t: 'Pruebas de la inmortalidad', x: 'Sócrates ofrece argumentos de que el alma es inmortal. Los contrarios nacen de los contrarios, y la vida nace de la muerte. Aprender es recordar lo que el alma ya vio antes de nacer, las Ideas. Y el alma se parece a las Ideas: es simple, invisible y no se descompone.' },
        { t: 'La cicuta', x: 'Al caer la tarde, Sócrates se baña, se despide de su familia y bebe la cicuta sin temblar. Pide a sus amigos que no lloren. Sus últimas palabras son: Critón, le debemos un gallo a Asclepio; págalo y no lo olvides. Así murió, dice Fedón, el más sabio y el más justo de los hombres.' },
      ],
      quote: 'Los que se dedican de verdad a la filosofía no se ocupan de otra cosa que de morir y estar muertos.',
      q: { q: 'En el Fedón, ¿por qué el filósofo no teme la muerte?', a: ['Porque toda su vida ha buscado liberar el alma del cuerpo', 'Porque cree que no existe el alma', 'Porque espera volver como héroe', 'Porque los dioses le prometieron riquezas'], e: 'La muerte separa el alma del cuerpo, y eso es lo que el filósofo siempre buscó.' } },
    { id: 'apologia', author: 'socrates', by: 'Platón', title: 'Apología de Sócrates', year: 'hacia el 395 a.C.', kind: 'discurso', at: [-14, -4],
      parts: [
        { t: 'El juicio', x: 'En el 399 a.C., Sócrates es acusado ante un tribunal de quinientos ciudadanos atenienses. Le acusan de no creer en los dioses de la ciudad y de corromper a los jóvenes. La Apología es el discurso de defensa que Platón pone en su boca. Apología significa defensa.' },
        { t: 'El oráculo', x: 'Sócrates cuenta que su amigo Querefonte preguntó en Delfos si había alguien más sabio que él, y la Pitia respondió que no. Sorprendido, Sócrates interrogó a políticos, poetas y artesanos. Descubrió que creían saber lo que no sabían. Él al menos sabía que no sabía.' },
        { t: 'El tábano de Atenas', x: 'Sócrates dice que el dios lo ha puesto sobre la ciudad como un tábano sobre un caballo grande y perezoso, para despertarlo. Si lo condenan, no encontrarán fácilmente a otro. Él no dejará de filosofar aunque le cueste la vida, porque una vida sin examen no merece ser vivida.' },
        { t: 'La condena', x: 'El tribunal lo declara culpable. Sócrates propone, con ironía, que como castigo lo alimenten en el Pritaneo, como a los héroes olímpicos. Lo condenan a muerte. Él se despide sin rencor: ya es hora de irnos, yo a morir y vosotros a vivir; quién va a algo mejor, solo el dios lo sabe.' },
      ],
      quote: 'Una vida sin examen no merece ser vivida.',
      q: { q: 'En la Apología, ¿de qué acusaban a Sócrates?', a: ['De no creer en los dioses de la ciudad y corromper a los jóvenes', 'De robar el tesoro de Atenea', 'De traicionar a Atenas ante Esparta', 'De escribir libros prohibidos'], e: 'Fue condenado a muerte en el 399 a.C.' } },
    { id: 'republica', author: 'platon', by: 'Platón', title: 'La República', year: 'hacia el 375 a.C.', kind: 'diálogo', at: [14, -18],
      parts: [
        { t: '¿Qué es la justicia?', x: 'La República empieza en casa de Céfalo, en el Pireo. Sócrates pregunta qué es la justicia. Trasímaco responde que es lo que conviene al más fuerte. Para responderle, Sócrates propone mirar la justicia en grande: imaginar una ciudad justa y ver cómo funciona.' },
        { t: 'La ciudad ideal', x: 'En la ciudad ideal hay tres clases: los productores, que trabajan; los guardianes, que defienden; y los gobernantes, que piensan. La justicia consiste en que cada uno haga lo suyo. Lo mismo pasa en el alma, con sus tres partes: el deseo, el ánimo y la razón, que debe gobernar.' },
        { t: 'Los reyes filósofos', x: 'Mientras los filósofos no gobiernen, o los gobernantes no filosofen de verdad, no habrá fin de los males para las ciudades. Los gobernantes deben educarse durante años en matemáticas y dialéctica, hasta conocer la Idea del Bien, que es como el sol del mundo inteligible.' },
        { t: 'La alegoría de la caverna', x: 'Imagina prisioneros encadenados en una caverna, que solo ven sombras en la pared y creen que son la realidad. Uno se libera, sale y, deslumbrado, descubre el sol. Si vuelve para liberar a los demás, se burlarán de él. Así es la educación: girar el alma entera hacia la luz.' },
      ],
      quote: 'La educación no es meter la vista en unos ojos ciegos, sino girar el alma entera hacia la luz.',
      q: { q: 'En La República, ¿qué es la justicia en la ciudad ideal?', a: ['Que cada clase haga lo suyo, bajo el gobierno de la razón', 'Lo que conviene al más fuerte', 'Que todos voten todas las leyes', 'Devolver siempre lo que se debe'], e: 'Así responde Sócrates a Trasímaco.' } },
    { id: 'etica', author: 'aristoteles', by: 'Aristóteles', title: 'Ética a Nicómaco', year: 'hacia el 330 a.C.', kind: 'tratado', at: [-14, -20],
      parts: [
        { t: 'El fin de la vida', x: 'Todas nuestras acciones buscan algún bien, y hay un bien supremo que buscamos por sí mismo: la felicidad, eudaimonía. Pero no es el placer ni la riqueza ni los honores. Para saber qué es, hay que preguntar cuál es la función propia del ser humano. El libro lleva el nombre de Nicómaco, el hijo de Aristóteles.' },
        { t: 'Vivir según la razón', x: 'Lo propio del ser humano es la razón. Por eso la felicidad es una actividad del alma de acuerdo con la virtud, a lo largo de una vida entera. Una golondrina no hace verano, ni un solo día feliz hace feliz a una persona.' },
        { t: 'El término medio', x: 'La virtud es un hábito que se adquiere practicando: nos hacemos justos haciendo cosas justas. Consiste en un término medio entre dos vicios, uno por exceso y otro por defecto. El valor está entre la cobardía y la temeridad; la generosidad, entre la tacañería y el derroche.' },
        { t: 'Amistad y contemplación', x: 'Nadie querría vivir sin amigos, aunque tuviera todos los demás bienes. La amistad perfecta es la de los buenos, que se quieren por lo que son y no por utilidad o placer. Y la felicidad más alta es la vida contemplativa: pensar, lo más divino que hay en nosotros.' },
      ],
      quote: 'Una golondrina no hace verano, ni un solo día; tampoco un solo día ni un breve tiempo hacen a alguien feliz y dichoso.',
      q: { q: 'Según la Ética a Nicómaco, ¿qué es la virtud del valor?', a: ['El término medio entre la cobardía y la temeridad', 'No tener nunca miedo', 'Obedecer siempre al general', 'Un don con el que se nace'], e: 'La virtud es un término medio que se adquiere con el hábito.' } },
  ],
  [ // III · Helenismo y Roma
    { id: 'meneceo', author: 'epicuro', by: 'Epicuro', title: 'Carta a Meneceo', year: 'hacia el 300 a.C.', kind: 'carta', at: [16, 16],
      parts: [
        { t: 'Nunca es pronto para filosofar', x: 'Epicuro escribe a su amigo Meneceo: que nadie, siendo joven, tarde en filosofar, ni siendo viejo se canse de hacerlo. Nunca es demasiado pronto ni demasiado tarde para cuidar la salud del alma. La filosofía es la medicina que nos hace felices.' },
        { t: 'No temer a los dioses ni a la muerte', x: 'Los dioses existen, pero viven felices y no se ocupan de castigarnos. Y la muerte no es nada para nosotros: todo bien y todo mal está en la sensación, y la muerte es privación de sensación. Mientras existimos, la muerte no está; cuando llega, ya no existimos.' },
        { t: 'Clases de deseos', x: 'Unos deseos son naturales y necesarios, como comer o tener amigos. Otros son naturales pero no necesarios, como los manjares refinados. Y otros son vanos, como la fama o el lujo sin fin. El sabio satisface los primeros y aprende a prescindir de los últimos.' },
        { t: 'El placer sereno', x: 'Cuando decimos que el placer es el fin, no hablamos de los placeres de los derrochadores, sino de no sufrir dolor en el cuerpo ni turbación en el alma. Pan y agua dan el mayor placer a quien tiene hambre. La prudencia es el mayor bien, y de ella nacen las demás virtudes.' },
      ],
      quote: 'La muerte no es nada para nosotros: cuando nosotros somos, ella no es; y cuando ella es, nosotros ya no somos.',
      q: { q: 'Según la Carta a Meneceo, ¿qué placer busca el sabio?', a: ['No sufrir en el cuerpo ni turbarse en el alma', 'Los banquetes más lujosos', 'La fama y los honores', 'El poder sobre los demás'], e: 'Ataraxia y aponía: serenidad del alma y ausencia de dolor.' } },
    { id: 'meditaciones', author: 'marcoaurelio', by: 'Marco Aurelio', title: 'Meditaciones', year: 'hacia el 175 d.C.', kind: 'diario', at: [-14, -24],
      parts: [
        { t: 'Un diario para sí mismo', x: 'Marco Aurelio fue emperador de Roma y escribió estas notas en griego, de noche, durante sus campañas militares en el Danubio. No pensaba publicarlas: su título original es Para sí mismo. Son ejercicios para recordar cada día cómo vivir como un estoico.' },
        { t: 'Lo que depende de ti', x: 'Muchas cosas no dependen de nosotros: la fama, la salud, lo que hagan los demás. Lo único que depende de ti es tu juicio. Si te angustia algo externo, no es la cosa la que te molesta, sino tu opinión sobre ella, y esa opinión puedes cambiarla ahora mismo.' },
        { t: 'Al empezar el día', x: 'Dite al amanecer: hoy me encontraré con un entrometido, un ingrato, un insolente. Pero nadie puede dañarme de verdad, y no puedo enfadarme con quien es mi pariente. Hemos nacido para colaborar, como los pies, las manos o los párpados.' },
        { t: 'Todo pasa', x: 'Piensa en cuántos emperadores, sabios y ciudades han desaparecido. Todo es pasajero: lo que hoy es fama mañana es olvido. Por eso vive cada día como si fuera el último, sin agitación, sin pereza y sin fingimiento, de acuerdo con la naturaleza y la razón.' },
      ],
      quote: 'Tienes poder sobre tu mente, no sobre los acontecimientos. Date cuenta de esto y encontrarás la fuerza.',
      q: { q: 'Según las Meditaciones, ¿qué es lo único que depende de nosotros?', a: ['Nuestro propio juicio sobre las cosas', 'La fama y la salud', 'Lo que hacen los demás', 'El destino del Imperio'], e: 'No nos turban las cosas, sino nuestras opiniones sobre ellas.' } },
  ],
  [ // IV · Edad Media
    { id: 'confesiones', author: 'agustin', by: 'Agustín de Hipona', title: 'Confesiones', year: 'hacia el 400', kind: 'autobiografía', at: [-7, 30],
      parts: [
        { t: 'Una vida contada a Dios', x: 'Agustín escribe su autobiografía como una larga conversación con Dios. Confiesa sus errores y alaba a Dios por haberle guiado. Es una de las primeras autobiografías de la historia, y muestra a alguien que se examina por dentro con una sinceridad nueva.' },
        { t: 'Las peras robadas', x: 'De adolescente, Agustín robó peras de un huerto con unos amigos. No tenía hambre: las tiraron a los cerdos. Lo hizo solo por el gusto de hacer lo prohibido. Al recordarlo se pregunta por qué amamos el mal, y descubre lo inquieto y dividido que está el corazón humano.' },
        { t: 'Toma y lee', x: 'En un jardín de Milán, angustiado, Agustín oye a un niño cantar: toma y lee, toma y lee. Abre las cartas de San Pablo al azar y lee una frase que le cambia la vida. Así cuenta su conversión al cristianismo, a los treinta y dos años.' },
        { t: '¿Qué es el tiempo?', x: 'Si nadie me lo pregunta, lo sé; si quiero explicárselo a quien me lo pregunta, no lo sé. El pasado ya no es y el futuro aún no es. Agustín concluye que el tiempo está en el alma: el pasado es memoria, el presente es atención y el futuro es espera.' },
      ],
      quote: 'Nos hiciste, Señor, para ti, y nuestro corazón está inquieto hasta que descanse en ti.',
      q: { q: 'En las Confesiones, ¿dónde está el tiempo, según Agustín?', a: ['En el alma: memoria, atención y espera', 'En los relojes de agua', 'En el movimiento de los astros únicamente', 'En ningún lugar: no existe'], e: 'El pasado es memoria, el presente atención y el futuro espera.' } },
    { id: 'suma', author: 'tomas', by: 'Tomás de Aquino', title: 'Suma teológica', year: '1265 – 1274', kind: 'tratado', at: [16, -26],
      parts: [
        { t: 'Un libro para estudiantes', x: 'Tomás escribió la Suma teológica como un manual para principiantes, aunque tiene miles de páginas. Quería ordenar todo el saber sobre Dios, el ser humano y el mundo. Murió sin terminarla: tras una experiencia mística dijo que todo lo escrito le parecía paja.' },
        { t: 'El método de la cuestión', x: 'Cada artículo sigue el método de la universidad. Primero se plantea una pregunta, como si Dios existe. Luego se exponen las objeciones contrarias, después una autoridad a favor, la respuesta de Tomás y, al final, la contestación a cada objeción. Es una disputa ordenada.' },
        { t: 'Las cinco vías', x: 'Tomás propone cinco vías para demostrar que Dios existe, partiendo de lo que vemos. Todo lo que se mueve es movido por otro, y no se puede ir al infinito: hace falta un primer motor. Del mismo modo, una primera causa, un ser necesario, un ser perfectísimo y una inteligencia que ordena el mundo.' },
        { t: 'Fe y razón', x: 'Para Tomás, la fe y la razón no se contradicen, porque las dos vienen de Dios. La razón puede llegar por sí sola a algunas verdades, como que Dios existe. Otras, como la Trinidad, solo se conocen por la fe. La filosofía de Aristóteles se convierte así en aliada de la teología.' },
      ],
      quote: 'La gracia no destruye la naturaleza, sino que la perfecciona.',
      q: { q: '¿Cómo está organizado cada artículo de la Suma teológica?', a: ['Pregunta, objeciones, autoridad, respuesta y réplica a las objeciones', 'Como un poema en verso', 'Como una serie de cartas', 'Como un diálogo entre dos amigos'], e: 'Sigue el método de la disputa escolástica de las universidades.' } },
  ],
  [ // V · Renacimiento
    { id: 'principe', author: 'maquiavelo', by: 'Nicolás Maquiavelo', title: 'El príncipe', year: '1513', kind: 'tratado', at: [13, 18],
      parts: [
        { t: 'Escrito en el destierro', x: 'Maquiavelo fue funcionario de la república de Florencia. Cuando los Médici volvieron al poder, lo apartaron, lo torturaron y lo desterraron a su finca. Allí escribió El príncipe, un libro breve que dedicó a Lorenzo de Médici con la esperanza de recuperar un cargo.' },
        { t: 'La verdad efectiva de las cosas', x: 'Muchos han imaginado repúblicas que nunca existieron. Maquiavelo quiere hablar de cómo se vive, no de cómo se debería vivir. Quien deja lo que se hace por lo que debería hacerse, aprende antes su ruina que su conservación. Así nace una política realista, separada de la moral tradicional.' },
        { t: 'Zorro y león', x: '¿Es mejor ser amado o temido? Lo ideal sería ambas cosas, pero si hay que elegir, es más seguro ser temido, aunque sin ser odiado. El príncipe debe ser como el zorro, para reconocer las trampas, y como el león, para espantar a los lobos.' },
        { t: 'Virtud y fortuna', x: 'La fortuna, la suerte, es como un río desbordado que lo arrasa todo. Pero gobierna solo la mitad de nuestras acciones: la otra mitad depende de nosotros. La virtù, la habilidad y la audacia del gobernante, consiste en construir diques a tiempo y aprovechar la ocasión.' },
      ],
      quote: 'Los hombres olvidan antes la muerte de su padre que la pérdida de su patrimonio.',
      q: { q: 'Según El príncipe, ¿qué animales debe imitar el gobernante?', a: ['El zorro y el león', 'El águila y la serpiente', 'El lobo y el cordero', 'El perro y el caballo'], e: 'Astucia para ver las trampas y fuerza para espantar a los lobos.' } },
    { id: 'ensayos', author: 'montaigne', by: 'Michel de Montaigne', title: 'Ensayos', year: '1580 – 1588', kind: 'ensayos', at: [-16, -14],
      parts: [
        { t: 'El tema soy yo mismo', x: 'A los treinta y ocho años, Montaigne se retiró a la torre de su castillo, rodeado de libros. Allí empezó a escribir sobre todo lo que se le ocurría: la amistad, el miedo, los caníbales, la educación. Advierte al lector: yo mismo soy la materia de mi libro.' },
        { t: 'Ensayar', x: 'Montaigne inventó un género nuevo: el ensayo. Ensayar significa probar, intentar. No pretende dar verdades definitivas, sino poner a prueba su juicio sobre cualquier tema, con libertad, cambiando de opinión si hace falta. Su lema era una pregunta: ¿qué sé yo?' },
        { t: 'Los caníbales', x: 'Montaigne habló con indígenas traídos de Brasil. Concluye que cada uno llama bárbaro a lo que no es su costumbre. Los europeos, que torturan y queman a otros por sus creencias, no tienen derecho a sentirse superiores. Es una de las primeras críticas al etnocentrismo.' },
        { t: 'Aprender a vivir', x: 'Filosofar es aprender a morir, dice al principio, citando a los antiguos. Pero al final de su vida prefiere otra lección: vivir bien, con naturalidad y moderación, disfrutando de lo cotidiano. Nuestra obra maestra, escribe, es vivir como es debido.' },
      ],
      quote: 'Cada cual llama barbarie a lo que no es costumbre suya.',
      q: { q: '¿Qué significa «ensayo», el género que inventó Montaigne?', a: ['Probar, poner a prueba el propio juicio', 'Un tratado con verdades definitivas', 'Una obra de teatro', 'Un libro de leyes'], e: 'Su lema era: ¿qué sé yo?' } },
  ],
  [ // VI · Modernidad
    { id: 'metodo', author: 'descartes', by: 'René Descartes', title: 'Discurso del método', year: '1637', kind: 'tratado', at: [-15, 2],
      parts: [
        { t: 'Escrito para todos', x: 'Descartes lo escribió en francés y no en latín, para que pudiera leerlo cualquiera con buen sentido, incluidas las mujeres, decía. Empieza con una ironía: el buen sentido es la cosa mejor repartida del mundo, porque nadie desea tener más del que tiene.' },
        { t: 'Las cuatro reglas', x: 'Descartes propone un método de cuatro reglas. No aceptar nada como verdadero si no es evidente, claro y distinto. Dividir cada dificultad en partes. Ir de lo simple a lo complejo. Y hacer revisiones tan completas que estemos seguros de no omitir nada.' },
        { t: 'Pienso, luego existo', x: 'Para encontrar algo seguro, Descartes duda de todo: de los sentidos, que a veces engañan, y de si está despierto o soñando. Pero mientras duda, piensa, y si piensa, existe. Pienso, luego existo: es la primera verdad, firme y segura, sobre la que construir todo el saber.' },
        { t: 'Una moral provisional', x: 'Mientras reconstruye el edificio del saber, Descartes necesita una casa donde vivir. Por eso adopta una moral provisional: obedecer las leyes de su país, ser firme en sus decisiones, cambiar sus deseos antes que el orden del mundo y dedicar su vida a cultivar la razón.' },
      ],
      quote: 'Pienso, luego existo.',
      q: { q: 'Según el Discurso del método, ¿cuál es la primera regla?', a: ['No aceptar nada que no sea evidente, claro y distinto', 'Creer lo que dicen los antiguos', 'Confiar siempre en los sentidos', 'Empezar por lo más complejo'], e: 'Después: dividir, ordenar y revisar.' } },
    { id: 'ilustracion', author: 'kant', by: 'Immanuel Kant', title: '¿Qué es la Ilustración?', year: '1784', kind: 'artículo', at: [14, -4],
      parts: [
        { t: 'Una pregunta en un periódico', x: 'En 1784, una revista de Berlín preguntó a sus lectores qué es la Ilustración. Kant respondió con un artículo breve que se hizo famoso. Su respuesta empieza así: la Ilustración es la salida del ser humano de su minoría de edad, de la que él mismo es culpable.' },
        { t: 'La minoría de edad', x: 'Ser menor de edad es no poder servirse del propio entendimiento sin la guía de otro. Es cómodo: si tengo un libro que piensa por mí, un director espiritual que decide por mí o un médico que me dice qué comer, no necesito esforzarme. La pereza y la cobardía nos mantienen así.' },
        { t: 'Sapere aude', x: 'El lema de la Ilustración es sapere aude: atrévete a saber, ten el valor de servirte de tu propio entendimiento. A una persona sola le cuesta salir de la minoría de edad, pero un público entero puede ilustrarse si se le deja libertad.' },
        { t: 'El uso público de la razón', x: 'Kant distingue el uso privado de la razón, cuando cumplimos nuestro cargo, y el uso público, cuando hablamos como sabios ante el público lector. El primero puede limitarse; el segundo debe ser siempre libre. Vivimos, dice, no en una época ilustrada, sino en una época de Ilustración.' },
      ],
      quote: '¡Sapere aude! Ten el valor de servirte de tu propio entendimiento.',
      q: { q: 'Para Kant, ¿qué es la minoría de edad?', a: ['No servirse del propio entendimiento sin la guía de otro', 'Tener menos de veintiún años', 'No saber leer ni escribir', 'No tener derecho a votar'], e: 'Y somos culpables de ella por pereza y cobardía.' } },
  ],
];
const BOOK_KEY = 'odisea-razon.libros';
// texto que se escucha de cada capítulo (título incluido)
const bookPartText = (p) => `${p.t}. ${p.x}`;
// los maestros también preguntan por los libros de su época
BOOKS.forEach((list) => list.forEach((b) => { b.q.book = b.title; }));
