// ============================================================================
//  ÉPOCA IX (América Latina) y encargos de las filósofas: lugares, ciudadanos,
//  encargos, anécdotas y libros
// ============================================================================
POIS.push([
  { id: 'tenochtitlan', at: [15, 24], name: 'Tenochtitlan, la ciudad en el lago', text: 'Los mexicas fundaron Tenochtitlan en 1325 sobre un islote del lago de Texcoco. Con calzadas, canales, chinampas y templos, llegó a tener unos doscientos mil habitantes: más que casi cualquier ciudad europea de su tiempo.', fact: 'Las chinampas eran huertos flotantes construidos con lodo y raíces sobre el lago. Todavía hoy se cultivan en Xochimilco.',
    q: { q: '¿Dónde se fundó Tenochtitlan?', a: ['Sobre un islote del lago de Texcoco', 'En la cima de los Andes', 'En la costa del Caribe', 'En la selva del Amazonas'], e: 'Hoy es el centro de la Ciudad de México.' } },
  { id: 'machupicchu', at: [6, -40], name: 'Machu Picchu', text: 'En lo alto de los Andes, el inca Pachacútec mandó construir hacia 1450 Machu Picchu, una ciudadela de piedra perfectamente encajada, sin argamasa, entre montañas y nubes. Los incas organizaron un enorme imperio unido por caminos de miles de kilómetros.', fact: 'Los incas no tenían escritura alfabética, pero registraban números e información con los quipus: cuerdas de colores con nudos.',
    q: { q: '¿Con qué registraban los incas números e información?', a: ['Con quipus, cuerdas con nudos', 'Con papiros', 'Con tablillas de arcilla', 'Con códices de papel amate'], e: 'Los quipucamayoc eran los especialistas en leerlos.' } },
  { id: 'valladolid', at: [-15, -24], name: 'La Junta de Valladolid', text: 'En 1550, en Valladolid, se celebró un gran debate: ¿era justa la conquista de América? Juan Ginés de Sepúlveda defendió que sí. Bartolomé de las Casas, que había vivido en América, defendió que los indígenas eran plenamente humanos, con sus propios derechos.', fact: 'Antes, Francisco de Vitoria había defendido en Salamanca que los pueblos indígenas eran dueños legítimos de sus tierras, una de las raíces del derecho internacional.',
    q: { q: '¿Quién defendió a los indígenas en la Junta de Valladolid?', a: ['Bartolomé de las Casas', 'Hernán Cortés', 'Ginés de Sepúlveda', 'Cristóbal Colón'], e: 'Su «Brevísima relación de la destrucción de las Indias» denunció los abusos.' } },
  { id: 'independencias', at: [-16, 30], name: 'Las independencias', text: 'Entre 1810 y 1825, casi toda Hispanoamérica se independizó de España, con líderes como Simón Bolívar, José de San Martín, Miguel Hidalgo o Manuela Sáenz. Haití había sido el primero, en 1804, tras la rebelión de las personas esclavizadas.', fact: 'Bolívar soñaba con una gran unión de las repúblicas americanas y convocó para ello el Congreso de Panamá en 1826.',
    q: { q: '¿Qué país fue el primero en independizarse en América Latina, en 1804?', a: ['Haití', 'México', 'Argentina', 'Brasil'], e: 'Tras la única revolución de esclavizados victoriosa de la historia.' } },
  { id: 'muralismo', at: [4, 14], name: 'El muralismo mexicano', text: 'Tras la Revolución mexicana, el filósofo José Vasconcelos, ministro de Educación, invitó a pintores como Diego Rivera, José Clemente Orozco y David Alfaro Siqueiros a pintar enormes murales en edificios públicos, para que el pueblo pudiera leer su propia historia en las paredes.', fact: 'Vasconcelos también impulsó campañas de alfabetización y llevó libros clásicos baratos a todo el país.',
    q: { q: '¿Qué filósofo y ministro impulsó el muralismo mexicano?', a: ['José Vasconcelos', 'Octavio Paz', 'José Martí', 'Leopoldo Zea'], e: 'Fue secretario de Educación Pública entre 1921 y 1924.' } },
  { id: 'mistral', at: [16, -30], name: 'Gabriela Mistral, maestra', text: 'Gabriela Mistral fue maestra rural en Chile antes de ser poeta famosa. Colaboró en la reforma educativa de México y defendió la educación de las niñas y de los pueblos indígenas. En 1945 recibió el Premio Nobel de Literatura, el primero para América Latina.', fact: 'Su verdadero nombre era Lucila Godoy Alcayaga. Eligió su seudónimo en homenaje a dos poetas que admiraba.',
    q: { q: '¿Quién fue la primera persona latinoamericana en recibir el Premio Nobel de Literatura?', a: ['Gabriela Mistral', 'Pablo Neruda', 'Gabriel García Márquez', 'Octavio Paz'], e: 'En 1945.' } },
]);

NPCS.push([
  { id: 'tlacuilo', name: 'Ehécatl', role: 'tlacuilo, pintor de códices', at: [17, 16], path: [0, -6], look: { robe: 0xe8dcb8, robe2: 0xc84a2a, skin: 0x9a6a46, hair: 0x1a1410, beard: false, hat: 'none', acc: 'scroll' },
    lines: ['Soy tlacuilo: pinto los códices, nuestros libros de papel amate. No escribimos con letras, sino con imágenes de colores: así guardamos la historia, los calendarios y los cantos.', 'Nuestro rey, Nezahualcóyotl, reunió en Texcoco a poetas y sabios. Dice que todo en la tierra pasa, como las flores, pero que el canto nos da raíz.', 'Muchos de nuestros códices fueron quemados después de la conquista. Los pocos que quedan son como estrellas sueltas de un cielo perdido.'] },
  { id: 'tejedora', name: 'Rosa', role: 'tejedora de los Andes', female: true, at: [-17, 8], path: [0, 6], look: { robe: 0xc84a2a, robe2: 0x2a6a8a, skin: 0x9a6a46, hair: 0x1a1410, beard: false, hat: 'longhair', acc: 'none' },
    lines: ['Tejo como me enseñó mi abuela, y a ella su abuela. Cada dibujo del tejido cuenta algo: los ríos, las montañas, el sol. Mis telas también son libros.', 'Hablo quechua y castellano. Martí decía que el buen gobierno debe conocer su propia tierra. ¿Cómo va a conocerla quien no conoce nuestras lenguas?', 'En los Andes decimos ayni: hoy te ayudo yo, mañana me ayudas tú. Es la reciprocidad. Sin ella, ninguna comunidad sobrevive a la montaña.'] },
  { id: 'maestra', name: 'Inés', role: 'maestra rural', female: true, at: [6, -22], path: [6, 0], look: { robe: 0x3a5a8a, robe2: 0xf2efe6, skin: 0xd2a684, hair: 0x2a1a10, beard: false, hat: 'longhair', acc: 'book' },
    lines: ['Enseño a leer a niñas y niños en una escuela de una sola aula. Algunos caminan dos horas para llegar. Cuando una niña lee su primera frase, sé que el viaje vale la pena.', 'Mi bisabuela no pudo ir a la escuela por ser mujer. Sor Juana tuvo que meterse a un convento para estudiar. Por eso cada niña en mi clase es una pequeña victoria.', 'Gabriela Mistral también fue maestra rural. Decía que enseñar es una forma de amar. Yo añado: y de aprender, porque mis alumnos me enseñan cada día.'] },
  { id: 'campesino', name: 'Severino', role: 'campesino que aprendió a leer', at: [-6, -20], path: [-6, 0], look: { robe: 0xd8cfb8, robe2: 0x6a5a3a, skin: 0x8f6446, hair: 0x2a2018, beard: 0x2a2018, hat: 'cap', acc: 'staff' },
    lines: ['Aprendí a leer a los cuarenta años, con el método de Paulo Freire. Empezamos con la palabra tierra: mi palabra, la que trabajo todos los días.', 'Antes firmaba con el dedo. Ahora leo el contrato antes de firmar, y ya no me engañan con el precio de la cosecha. Leer la palabra me enseñó a leer el mundo.', 'El maestro no nos trataba como vasijas vacías. Nos preguntaba, y nosotros también le enseñábamos: de lluvias, de semillas, de cómo se vive en el campo.'] },
]);

Object.assign(QUESTS, {
  teano: { text: 'Para entender la armonía hay que escuchar. Descubre los mitos que contaban los griegos y escucha a Ione, la rapsoda, recitar a Homero. Luego dime a qué se parece una vida bien vivida.', needs: { pois: ['mitos'], npcs: ['rapsoda'] },
    riddle: { q: 'Para los pitagóricos, vivir bien es como...', a: ['Afinar una lira: armonía y medida entre las partes del alma', 'Ganar una carrera en Olimpia', 'Acumular oro', 'No sentir nada'] } },
  hipatia: { text: 'Visita la Biblioteca de Alejandría y el faro, y habla con Demetrio, el bibliotecario. Después dime con qué instrumento medimos la altura de las estrellas.', needs: { pois: ['alejandria', 'faro'], npcs: ['bibliotecario'] },
    riddle: { q: '¿Qué instrumento sirve para medir la altura de los astros y orientarse?', a: ['El astrolabio', 'La clepsidra', 'El ábaco', 'La balanza'] } },
  hildegarda: { text: 'Ve al scriptorium y escucha al hermano Beda, el copista. Él sabe cuánto trabajo cuesta conservar un libro. Después dime cómo llamo a la fuerza verde de la vida.', needs: { pois: ['scriptorium'], npcs: ['copista'] },
    riddle: { q: '¿Cómo llama Hildegarda a la fuerza verde que hace florecer la naturaleza y el alma?', a: ['Viriditas', 'Conatus', 'Logos', 'Ataraxia'] } },
  pizan: { text: 'Los libros pueden difundir prejuicios o desmontarlos. Visita la imprenta y escucha al impresor. Después dime qué construí yo para responder a quienes despreciaban a las mujeres.', needs: { pois: ['imprenta'], npcs: ['impresor'] },
    riddle: { q: '¿Qué construye Christine de Pizan en su libro más famoso?', a: ['Una ciudad para las mujeres, hecha de razones y ejemplos', 'Una catedral gótica', 'Un barco para huir', 'Una universidad para hombres'] } },
  nezahualcoyotl: { text: 'Visita Tenochtitlan, la ciudad en el lago, y escucha a Ehécatl, el pintor de códices. Luego dime qué es lo verdadero en la tierra, según mis cantos.', needs: { pois: ['tenochtitlan'], npcs: ['tlacuilo'] },
    riddle: { q: 'Si todo en la tierra es pasajero, ¿qué da raíz al corazón según los sabios nahuas?', a: ['La flor y el canto: la poesía', 'El oro y el jade', 'La guerra', 'El silencio absoluto'] } },
  sorjuana: { text: 'Escucha a Inés, la maestra rural, hasta el final. Después dime dónde se puede aprender, según escribí en mi Respuesta.', needs: { npcs: ['maestra'] },
    riddle: { q: 'Según Sor Juana, ¿dónde se puede aprender filosofía?', a: ['En todas partes, incluso en la cocina', 'Solo en la universidad', 'Solo en latín', 'Solo si eres hombre'] } },
  marti: { text: 'Para gobernar hay que conocer el propio país. Visita el recuerdo de las independencias y escucha a Rosa, la tejedora. Después dime de dónde debe nacer el gobierno.', needs: { pois: ['independencias'], npcs: ['tejedora'] },
    riddle: { q: 'Según «Nuestra América», ¿de dónde ha de nacer el gobierno?', a: ['Del propio país, conociendo sus elementos', 'De los libros de Francia', 'De la voluntad de un rey extranjero', 'De la fuerza de las armas'] } },
  castellanos: { text: 'Descubre los murales de México y la historia de Gabriela Mistral, maestra. Después completa mi verso más conocido: debe haber otro modo de ser...', needs: { pois: ['muralismo', 'mistral'] },
    riddle: { q: 'Completa el verso de Rosario Castellanos: «Debe haber otro modo de ser...»', a: ['...humano y libre', '...rico y famoso', '...rey del mundo', '...invisible'] } },
});

Object.assign(ANECDOTES, {
  nezahualcoyotl: ['De joven tuve que huir de mis enemigos y esconderme en los montes. Se cuenta que una vez escapé de los soldados escondido bajo un montón de chía que unas mujeres estaban desgranando.', 'Diseñé jardines y baños en el cerro de Tetzcotzinco, con canales de agua que bajaban de las montañas por acueductos. Allí me retiraba a pensar y a componer cantos.'],
  sorjuana: ['De niña me cortaba el pelo cuando no aprendía algo en el tiempo que me había fijado. Me parecía que no estaba bien que una cabeza estuviera vestida de cabello y desnuda de noticias.', 'Una superiora me prohibió estudiar en libros durante unos meses. Obedecí, pero seguí estudiando en todo lo que veía: cómo gira una peonza, cómo se fríe un huevo, cómo se forman las figuras geométricas en una habitación.'],
  marti: ['A los dieciséis años me condenaron a trabajos forzados en las canteras de San Lázaro. Llevaba un grillete con una cadena en el tobillo. Toda mi vida guardé un anillo hecho con un eslabón de aquella cadena.', 'En Nueva York trabajaba de día como cónsul y traductor, y de noche escribía para periódicos de toda América. Mis crónicas sobre el puente de Brooklyn o la Estatua de la Libertad se leían de Buenos Aires a México.'],
  castellanos: ['De niña, una adivina le dijo a mi madre que uno de sus dos hijos moriría pronto. Mi madre gritó: ¡que no sea el varón! Mi hermano murió poco después. Crecí sabiendo que en mi casa una niña valía menos.', 'Escribí obras de teatro para títeres que recorrían los pueblos de Chiapas en lenguas tzotzil y tzeltal. El personaje principal, Petul, enseñaba a los niños cosas de salud y de derechos.'],
  freire: ['De niño, en el patio de mi casa, mis padres me enseñaron a escribir mis primeras palabras con un palito en la tierra, a la sombra de los mangos. Así aprendí que se aprende desde la propia vida.', 'Cuando los militares me encarcelaron en 1964, me preguntaban por qué era tan peligroso enseñar a leer. Yo respondía que, quizá, porque los que aprenden a leer empiezan a preguntar.'],
});

BOOKS[4].push(
  { id: 'ciudad_damas', author: 'pizan', by: 'Christine de Pizan', title: 'La ciudad de las damas', year: '1405', kind: 'alegoría', at: [-15, 10],
    parts: [
      { t: 'La tristeza de una lectora', x: 'Christine cuenta que, leyendo a un autor que hablaba mal de las mujeres, se quedó triste y confusa: si tantos sabios lo decían, ¿no tendrían razón? Empezó a despreciarse a sí misma por haber nacido mujer.' },
      { t: 'Tres damas coronadas', x: 'Entonces se le aparecen tres damas: Razón, con un espejo; Rectitud, con una regla; y Justicia, con una copa de oro. Le dicen que esos libros están llenos de errores y le encargan construir una ciudad donde las mujeres valiosas estén a salvo de las calumnias.' },
      { t: 'Piedra a piedra', x: 'Cada piedra de la ciudad es un ejemplo: reinas que gobernaron con sabiduría, inventoras, guerreras, poetas como Safo, sabias como la que inventó el alfabeto latino según la leyenda. Cada ejemplo responde a un prejuicio con un hecho.' },
      { t: 'La educación de las niñas', x: 'Razón explica a Christine que, si se enviara a las niñas a la escuela como a los niños, aprenderían las artes y las ciencias igual de bien. Si las mujeres saben menos, es porque no se les permite estudiar, no por su naturaleza.' },
    ],
    quote: 'Si fuera costumbre mandar a las niñas a la escuela y enseñarles las ciencias como a los niños, aprenderían y entenderían igual de bien.',
    q: { q: 'En La ciudad de las damas, ¿por qué las mujeres sabían menos, según Razón?', a: ['Porque no se les permitía estudiar', 'Por su naturaleza', 'Porque no les interesaba', 'Por voluntad de los astros'], e: 'La educación, no la naturaleza, explica la diferencia.' } },
);
BOOKS[5].push(
  { id: 'vindicacion', author: 'wollstonecraft', by: 'Mary Wollstonecraft', title: 'Vindicación de los derechos de la mujer', year: '1792', kind: 'ensayo', at: [14, 0],
    parts: [
      { t: 'Una respuesta a la Revolución', x: 'La Revolución francesa proclamó los derechos del hombre, pero dejó fuera a las mujeres. La escritora inglesa Mary Wollstonecraft respondió en 1792 con este libro, dedicado a un político francés que quería que las niñas solo recibieran una educación doméstica.' },
      { t: 'La razón no tiene sexo', x: 'Wollstonecraft defiende que mujeres y hombres tienen la misma capacidad de razonar. Si las mujeres parecen frívolas o dependientes, es porque se las educa solo para agradar, como si fueran adornos. Una virtud basada en la ignorancia no es virtud.' },
      { t: 'Contra Rousseau', x: 'Critica a Rousseau, que en su Emilio decía que la mujer debe ser educada para servir al hombre. Wollstonecraft responde que eso las condena a una infancia perpetua. Quiere que las mujeres tengan poder, no sobre los hombres, sino sobre sí mismas.' },
      { t: 'Educación para todas', x: 'Propone escuelas públicas mixtas y gratuitas, donde niñas y niños estudien juntos, y que las mujeres puedan ejercer profesiones como la medicina o el comercio. Su hija, Mary Shelley, escribiría años después la novela Frankenstein.' },
    ],
    quote: 'No deseo que las mujeres tengan poder sobre los hombres, sino sobre sí mismas.',
    q: { q: 'Según Mary Wollstonecraft, ¿por qué muchas mujeres parecían dependientes?', a: ['Porque se las educaba solo para agradar', 'Por su naturaleza', 'Porque lo decía la ciencia', 'Porque así lo querían'], e: 'Pidió escuelas mixtas y una educación racional para todas.' } },
);
BOOKS.push([
  { id: 'respuesta', author: 'sorjuana', by: 'Sor Juana Inés de la Cruz', title: 'Respuesta a sor Filotea de la Cruz', year: '1691', kind: 'carta', at: [-14, -12],
    parts: [
      { t: 'Una carta con nombre falso', x: 'En 1690, el obispo de Puebla publicó una crítica de Sor Juana a un sermón, y la acompañó de una carta firmada como sor Filotea, aconsejándole dejar los estudios profanos y dedicarse a la religión. Sor Juana respondió con esta larga carta, una defensa de su vida y de las mujeres.' },
      { t: 'Una inclinación natural', x: 'Sor Juana cuenta su historia: aprendió a leer a los tres años, quiso ir a la universidad vestida de hombre, entró en el convento para poder estudiar. Dice que el deseo de saber es una inclinación que Dios le dio y que no puede apagar.' },
      { t: 'Todo enseña', x: 'Cuando le prohibieron leer libros, siguió estudiando el mundo: los círculos que hace una peonza, las figuras de una habitación, lo que pasa al freír un huevo. Y concluye: si Aristóteles hubiera guisado, mucho más hubiera escrito.' },
      { t: 'Mujeres sabias', x: 'Sor Juana recuerda a mujeres sabias de la Biblia y de la historia, como Hipatia, y defiende que las mujeres pueden estudiar y enseñar. Propone que mujeres mayores y doctas eduquen a las niñas, para que no dependan de maestros que puedan abusar de ellas.' },
    ],
    quote: 'Si Aristóteles hubiera guisado, mucho más hubiera escrito.',
    q: { q: 'En su Respuesta, ¿qué siguió estudiando Sor Juana cuando le prohibieron los libros?', a: ['El mundo: una peonza, una habitación, la cocina', 'Nada en absoluto', 'Solo la Biblia', 'Las cartas de los virreyes'], e: 'Todo enseña a quien quiere aprender.' } },
  { id: 'nuestra_america', author: 'marti', by: 'José Martí', title: 'Nuestra América', year: '1891', kind: 'ensayo', at: [14, -4],
    parts: [
      { t: 'Trincheras de ideas', x: 'Martí publicó este ensayo en 1891, en Nueva York y en México. Empieza llamando a despertar: los pueblos de América deben conocerse y unirse, porque trincheras de ideas valen más que trincheras de piedra.' },
      { t: 'El gobierno nace del país', x: 'Nuestros gobernantes, dice Martí, copiaron leyes de Francia o de Estados Unidos sin conocer su propia tierra. El buen gobernante es el que sabe con qué elementos está hecho su país. El gobierno ha de nacer del país.' },
      { t: 'La universidad americana', x: 'Martí pide que se enseñe la historia de América, de los incas acá, aunque no se enseñe la de los arcontes de Grecia. Nuestra Grecia es preferible a la Grecia que no es nuestra. Injértese en nuestras repúblicas el mundo, pero el tronco ha de ser el de nuestras repúblicas.' },
      { t: 'No hay razas', x: 'Contra quienes despreciaban a indígenas, negros y mestizos, Martí afirma que no hay odio de razas, porque no hay razas. El alma emana, igual y eterna, de todos los cuerpos. Y advierte del peligro de un vecino poderoso que no conoce a Nuestra América.' },
    ],
    quote: 'Injértese en nuestras repúblicas el mundo; pero el tronco ha de ser el de nuestras repúblicas.',
    q: { q: 'Según «Nuestra América», ¿qué valen más que las trincheras de piedra?', a: ['Las trincheras de ideas', 'Los ejércitos extranjeros', 'Las riquezas', 'Las murallas de las ciudades'], e: 'La cultura y el conocimiento propio son la mejor defensa.' } },
  { id: 'pedagogia', author: 'freire', by: 'Paulo Freire', title: 'Pedagogía del oprimido', year: '1968', kind: 'ensayo', at: [-14, 10],
    parts: [
      { t: 'Escrito en el exilio', x: 'Paulo Freire escribió este libro en Chile, exiliado tras el golpe militar en Brasil. Se ha traducido a decenas de lenguas y es uno de los libros de educación más citados del mundo. Está dedicado a los desharrapados del mundo y a quienes sufren y luchan con ellos.' },
      { t: 'La educación bancaria', x: 'En la escuela tradicional, el profesor habla y el alumno escucha; el profesor sabe y el alumno no sabe; el profesor deposita y el alumno archiva. Freire lo llama educación bancaria: convierte a las personas en recipientes pasivos y las adapta a un mundo injusto.' },
      { t: 'El diálogo', x: 'Frente a ella, Freire propone una educación problematizadora, basada en el diálogo. Maestro y alumnos investigan juntos problemas reales. El maestro ya no es solo el que educa, sino el que también es educado al dialogar.' },
      { t: 'Leer el mundo', x: 'Aprender a leer es aprender a decir la propia palabra y a leer el mundo. Con la concientización, las personas oprimidas descubren las causas de su situación y se organizan para transformarla. Nadie libera a nadie, nadie se libera solo: nos liberamos en comunión.' },
    ],
    quote: 'Nadie educa a nadie, nadie se educa a sí mismo; los seres humanos se educan entre sí, mediatizados por el mundo.',
    q: { q: '¿Qué propone Freire frente a la educación bancaria?', a: ['Una educación problematizadora basada en el diálogo', 'Más exámenes de memoria', 'Eliminar las escuelas', 'Que el profesor hable más'], e: 'Maestro y alumnos aprenden juntos investigando la realidad.' } },
]);
BOOKS.slice(4).forEach((list) => list.forEach((b) => { b.q.book = b.title; }));

// anécdotas de las filósofas antiguas y medievales
Object.assign(ANECDOTES, {
  teano: ['Cuentan que alguien me preguntó cuánto tiempo después de estar con un hombre queda una mujer pura para entrar al templo. Respondí: si es con su marido, enseguida; si es con otro, nunca.', 'Se conserva una carta atribuida a mí en la que aconsejo a una amiga sobre cómo educar a sus hijos: sin caprichos ni excesos, porque el placer sin medida forma almas débiles.'],
  hipatia: ['Paseaba por el centro de Alejandría con el manto gastado de los filósofos y me detenía a explicar a Platón y a Aristóteles a cualquiera que quisiera escuchar. Los magistrados de la ciudad venían a pedirme consejo.', 'Mi alumno Sinesio llegó a ser obispo cristiano, pero siguió escribiéndome cartas llenas de cariño. Me llamaba madre, hermana, maestra y benefactora.'],
  hildegarda: ['Cuando el emperador Federico Barbarroja apoyó a un antipapa, le escribí con dureza: escucha, oh rey, si quieres vivir. Pocos se atrevían a hablarle así.', 'Durante una enfermedad grave, los monjes se negaban a dejarme fundar un monasterio propio. En cuanto aceptaron, me recuperé. Yo estaba segura de que la enfermedad venía de no cumplir lo que había visto.'],
  pizan: ['En uno de mis libros cuento que la Fortuna me transformó en hombre para que pudiera llevar el timón de mi familia tras quedar viuda. Era mi forma de decir que tuve que hacer todo lo que se esperaba de un hombre.', 'Supervisé yo misma la copia y las miniaturas de mis manuscritos, y los regalé a reinas y duques. Una de mis copias, preparada para la reina Isabel de Baviera, todavía se conserva en Londres.'],
});
