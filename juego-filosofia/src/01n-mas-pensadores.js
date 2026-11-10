// ============================================================================
//  CINCO PENSADORES EMBLEMÁTICOS MÁS: Demócrito, Séneca, Hobbes, Rousseau y
//  Schopenhauer. Se suman como pensadores (no maestros) a sus épocas, en orden.
// ============================================================================
{
  const add = (eraId, sage, beforeId) => {
    const e = ERAS.find((x) => x.id === eraId); const list = e.sages;
    const i = beforeId ? list.findIndex((s) => s.id === beforeId) : list.findIndex((s) => s.boss);
    list.splice(i >= 0 ? i : list.length, 0, sage);
  };
  add('presocraticos', {
    id: 'democrito', name: 'Demócrito de Abdera', short: 'Demócrito', dates: 'c. 460 – 370 a. C.', epithet: 'El filósofo que se reía y pensó el átomo',
    look: lk(0xd8c8a0, 0x6a5a3a, 0xd0a07a, 0xb8b0a0, { beard: 0xb8b0a0, acc: 'none' }), prop: 'sphere',
    intro: 'Todo lo que ves, el agua, la piedra, tu propio cuerpo, está hecho de partículas tan pequeñas que no pueden dividirse. ¿Te parece una locura? A mí me hace reír de alegría.',
    defeat: 'Has pensado como un atomista: detrás de lo que parece, hay algo más simple que lo explica. Y ríete, que la serenidad alarga la vida.',
    concept: { name: 'Átomos y vacío', text: 'Demócrito, siguiendo a su maestro Leucipo, propuso que todo está formado por átomos (en griego, «lo que no se puede cortar»): partículas eternas, invisibles e indivisibles que se mueven en el vacío y se combinan de infinitas maneras. Los colores, sabores y olores son el efecto de esos átomos sobre nuestros sentidos: «por convención lo dulce, por convención lo amargo; en realidad, átomos y vacío». Veinticuatro siglos después, la ciencia recuperó la palabra átomo.' },
    q: [
      { q: '¿Qué significa la palabra griega «átomo»?', a: ['Lo que no se puede cortar', 'Lo muy brillante', 'Lo que se mueve', 'Lo que pesa mucho'], e: 'A-tomos: sin división.' },
      { q: '¿De qué está hecho todo, según Demócrito?', a: ['De átomos y vacío', 'De agua', 'De fuego', 'De números'], e: 'Los átomos se mueven en el vacío y se combinan.' },
      { q: '¿Quién fue el maestro de Demócrito, iniciador del atomismo?', a: ['Leucipo', 'Sócrates', 'Pitágoras', 'Platón'], e: 'Juntos fundaron la teoría atómica.' },
      { q: '¿Qué decía Demócrito sobre los sabores y colores?', a: ['Que son efectos de los átomos sobre nuestros sentidos, no cosas en sí', 'Que son dioses', 'Que no existen ni en los sentidos', 'Que son eternos'], e: '«Por convención lo dulce; en realidad, átomos y vacío.»' },
      { q: '¿Por qué llamaban a Demócrito «el filósofo que ríe»?', a: ['Porque se reía de las locuras humanas y buscaba la alegría serena', 'Porque contaba chistes en el teatro', 'Porque era actor', 'Porque nunca hablaba en serio'], e: 'Para él, el buen ánimo (euthymía) era la meta de la vida.' },
      { q: '¿De qué ciudad era Demócrito?', a: ['De Abdera, en Tracia', 'De Atenas', 'De Roma', 'De Alejandría'], e: 'Al norte de Grecia.' },
      { q: '¿Qué filósofo posterior retomó el atomismo para pensar una vida tranquila?', a: ['Epicuro', 'Platón', 'Agustín', 'Kant'], e: 'Los epicúreos fueron los herederos de Demócrito.' },
      { q: '¿Qué tiene que ver Demócrito con la ciencia moderna?', a: ['La química recuperó su idea de que la materia está hecha de átomos', 'Inventó el microscopio', 'Descubrió la electricidad', 'Nada'], e: 'Aunque hoy sabemos que el átomo sí se puede dividir.' },
    ] }, 'parmenides');
  add('helenismo', {
    id: 'seneca', name: 'Lucio Anneo Séneca', short: 'Séneca', dates: 'c. 4 a. C. – 65', epithet: 'El estoico que nos enseñó a no perder el tiempo',
    look: lk(0xf0ece0, 0x8a2a2a, 0xd0a07a, 0x9a9a9a, { beard: 0x9a9a9a, hat: 'bald', acc: 'scroll' }), prop: 'hemlock',
    intro: 'No es que tengamos poco tiempo: es que perdemos mucho. Dime, ¿cuántas horas de hoy fueron realmente tuyas?',
    defeat: 'Has aprendido a reclamar tu tiempo. Vive cada día como si fuera una vida entera: solo así la vida es larga.',
    concept: { name: 'La brevedad de la vida', text: 'Séneca nació en Córdoba, en la Hispania romana, y fue filósofo estoico, escritor y consejero del emperador Nerón. En «Sobre la brevedad de la vida» escribió que la vida no es corta: la hacemos corta al malgastarla en ocupaciones vacías, en ambiciones ajenas y en la espera del mañana. Enseñaba a dominar la ira, a no temer a la fortuna y a aprovechar cada día. Cayó en desgracia y Nerón le ordenó quitarse la vida; murió con serenidad, conversando con sus amigos.' },
    q: [
      { q: '¿Qué dice Séneca en «Sobre la brevedad de la vida»?', a: ['Que la vida no es corta: la hacemos corta al malgastarla', 'Que la vida dura poco y no se puede hacer nada', 'Que hay que vivir para siempre', 'Que el tiempo no existe'], e: '«No recibimos una vida breve, sino que la hacemos breve.»' },
      { q: '¿En qué ciudad nació Séneca?', a: ['En Córdoba, en la Hispania romana', 'En Atenas', 'En Alejandría', 'En Cartago'], e: 'Es uno de los grandes pensadores nacidos en la actual España.' },
      { q: '¿De qué escuela filosófica era Séneca?', a: ['Estoica', 'Epicúrea', 'Cínica', 'Escéptica'], e: 'Como Marco Aurelio y Epicteto.' },
      { q: '¿De qué emperador fue maestro y consejero Séneca?', a: ['De Nerón', 'De Augusto', 'De Trajano', 'De Constantino'], e: 'Intentó moderarlo, sin éxito.' },
      { q: '¿Qué pasión enseñó Séneca a dominar en un libro famoso?', a: ['La ira', 'La alegría', 'La curiosidad', 'La amistad'], e: 'En «Sobre la ira» explica que es una locura breve.' },
      { q: '¿Cómo se llaman las cartas en que Séneca aconseja a su amigo Lucilio?', a: ['Cartas a Lucilio', 'Meditaciones', 'Confesiones', 'Diálogos de Platón'], e: 'Ciento veinticuatro cartas sobre cómo vivir.' },
      { q: '¿Cómo murió Séneca?', a: ['Nerón le ordenó quitarse la vida, y lo hizo con serenidad', 'En una batalla', 'De viejo en su casa', 'En un naufragio'], e: 'Murió conversando con sus amigos, como Sócrates.' },
      { q: '¿Qué consejo da Séneca sobre el mañana?', a: ['No posponer la vida esperando el mañana: vivir hoy', 'Planear todo y no vivir hoy', 'Olvidar el pasado y el futuro', 'Dormir más'], e: '«Mientras se aplaza, la vida pasa.»' },
    ] }, 'hipatia');
  add('modernidad', {
    id: 'hobbes', name: 'Thomas Hobbes', short: 'Hobbes', dates: '1588 – 1679', epithet: 'El filósofo del Leviatán',
    look: lk(0x2a2a2a, 0xf0ece0, 0xe0c0a0, 0xe8e8e8, { beard: 0xe8e8e8, acc: 'book' }), prop: 'crown',
    intro: 'Sin leyes ni gobierno, la vida humana sería solitaria, pobre, desagradable, brutal y breve. ¿Te atreverías a vivir sin Estado?',
    defeat: 'Has pensado como un contractualista: la paz no es natural, hay que construirla con un acuerdo. Pregúntate ahora cuánto poder merece quien nos protege.',
    concept: { name: 'El estado de naturaleza y el Leviatán', text: 'Hobbes vivió las guerras civiles inglesas y se preguntó cómo evitar la violencia. Imaginó un «estado de naturaleza» sin leyes, en el que cada uno teme a todos y la vida es «solitaria, pobre, desagradable, brutal y breve»: una guerra de todos contra todos. Para escapar de ella, las personas hacen un pacto y entregan su poder a un soberano fuerte, el Leviatán, que garantiza la paz. Es una de las primeras teorías del contrato social.' },
    q: [
      { q: '¿Cómo se llama la obra más famosa de Hobbes?', a: ['Leviatán', 'El contrato social', 'El príncipe', 'La república'], e: 'Publicada en 1651, toma el nombre de un monstruo bíblico.' },
      { q: '¿Cómo describe Hobbes la vida en el estado de naturaleza?', a: ['Solitaria, pobre, desagradable, brutal y breve', 'Feliz y libre', 'Tranquila y sencilla', 'Igual que hoy'], e: 'Una guerra de todos contra todos.' },
      { q: '¿Qué frase latina popularizó Hobbes sobre el ser humano?', a: ['El hombre es un lobo para el hombre', 'Pienso, luego existo', 'Conócete a ti mismo', 'Atrévete a saber'], e: 'Homo homini lupus, tomada de Plauto.' },
      { q: '¿Para qué hacen las personas el pacto social, según Hobbes?', a: ['Para salir de la guerra de todos contra todos y vivir en paz', 'Para hacerse ricas', 'Para elegir un dios', 'Para viajar'], e: 'Por miedo a la muerte violenta.' },
      { q: '¿Qué es el Leviatán en la filosofía de Hobbes?', a: ['El Estado soberano y poderoso que garantiza la paz', 'Un dragón real', 'Un barco de guerra', 'Una iglesia'], e: 'Un «dios mortal» formado por todos los ciudadanos.' },
      { q: '¿Qué conflicto vivió Hobbes que influyó en su pensamiento?', a: ['Las guerras civiles inglesas', 'La Revolución francesa', 'La Primera Guerra Mundial', 'La conquista de América'], e: 'Por eso valoraba tanto la paz y el orden.' },
      { q: '¿Qué pensador posterior discutió a Hobbes defendiendo derechos que el gobierno no puede quitar?', a: ['John Locke', 'Nietzsche', 'Platón', 'Confucio'], e: 'Locke defendió la vida, la libertad y la propiedad.' },
      { q: '¿Qué emoción está en la base del pacto social según Hobbes?', a: ['El miedo a la muerte violenta', 'El amor', 'La alegría', 'La curiosidad'], e: 'Y el deseo de una vida cómoda.' },
    ] }, 'descartes');
  add('modernidad', {
    id: 'rousseau', name: 'Jean-Jacques Rousseau', short: 'Rousseau', dates: '1712 – 1778', epithet: 'El filósofo del contrato social',
    look: lk(0x5a3a2a, 0xd8c8a0, 0xe0c0a0, 0xd8d0c0, { hat: 'wig', acc: 'book' }), prop: 'tree',
    intro: 'El ser humano nace libre, y en todas partes está encadenado. ¿Qué cadenas llevas tú sin haberlas elegido?',
    defeat: 'Has pensado como un ciudadano: ser libre es obedecer las leyes que nos damos juntos. Y no olvides la naturaleza: también ella educa.',
    concept: { name: 'El contrato social y la voluntad general', text: 'Rousseau pensaba que el ser humano es bueno por naturaleza y que es la sociedad, con su desigualdad y su vanidad, la que lo corrompe. En «El contrato social» (1762) propuso una comunidad en la que cada uno se une a todos y obedece la «voluntad general», que busca el bien común: así, al obedecer la ley, cada ciudadano se obedece a sí mismo y sigue siendo libre. En «Emilio» defendió una educación que respete el desarrollo natural del niño. Sus ideas inspiraron la Revolución francesa.' },
    q: [
      { q: '¿Con qué frase empieza «El contrato social» de Rousseau?', a: ['El hombre nace libre, y en todas partes está encadenado', 'Pienso, luego existo', 'El hombre es un lobo para el hombre', 'Todo fluye'], e: 'Una de las frases más famosas de la filosofía política.' },
      { q: '¿Cómo nace el ser humano según Rousseau?', a: ['Bueno; es la sociedad la que lo corrompe', 'Malo por naturaleza', 'Sin ninguna capacidad', 'Igual que una piedra'], e: 'La idea del «buen salvaje», que él no llamaba así.' },
      { q: '¿Qué es la «voluntad general»?', a: ['La voluntad de la comunidad que busca el bien común', 'La opinión del rey', 'Lo que quiere cada uno para sí', 'La voluntad de los más ricos'], e: 'No es la suma de intereses privados.' },
      { q: '¿Sobre qué trata el libro «Emilio» de Rousseau?', a: ['Sobre la educación de un niño según su desarrollo natural', 'Sobre una guerra', 'Sobre astronomía', 'Sobre un rey'], e: 'Uno de los grandes libros de pedagogía.' },
      { q: '¿Qué revolución se inspiró en las ideas de Rousseau?', a: ['La Revolución francesa', 'La Revolución industrial', 'La Revolución rusa', 'La revolución de Copérnico'], e: 'Sus restos fueron llevados al Panteón de París.' },
      { q: '¿Qué critica Rousseau en su «Discurso sobre la desigualdad»?', a: ['Que la propiedad privada y la sociedad crearon desigualdades injustas', 'Que todos deberían ser reyes', 'Que la igualdad es imposible', 'Que la ciencia es mala'], e: 'El primero que cercó un terreno y dijo «esto es mío»…' },
      { q: '¿De qué ciudad era Rousseau?', a: ['De Ginebra', 'De Londres', 'De Berlín', 'De Atenas'], e: 'Firmaba con orgullo como «ciudadano de Ginebra».' },
      { q: '¿Qué afición tenía Rousseau en sus últimos años?', a: ['La botánica y los paseos solitarios', 'La guerra', 'El comercio', 'La navegación'], e: 'Escribió «Las ensoñaciones del paseante solitario».' },
    ] }, 'kant');
  add('xix', {
    id: 'schopenhauer', name: 'Arthur Schopenhauer', short: 'Schopenhauer', dates: '1788 – 1860', epithet: 'El filósofo de la voluntad y la compasión',
    look: lk(0x2a2a3a, 0xf0ece0, 0xe0c0a0, 0xe8e8e8, { hat: 'bald', acc: 'book' }), prop: 'lyre',
    intro: 'La vida oscila como un péndulo entre el dolor y el aburrimiento. Pero hay salidas: el arte, la compasión… ¿Las conoces?',
    defeat: 'Has mirado de frente el dolor sin hundirte en él. La compasión que sientes por otro ser es lo mejor de ti: cultívala.',
    concept: { name: 'La voluntad y sus salidas', text: 'Schopenhauer pensó que detrás del mundo que vemos hay una fuerza ciega, la voluntad, que se expresa en todo lo que vive como un deseo que nunca se sacia. Por eso la vida oscila entre el dolor de desear y el aburrimiento de haber conseguido. Hay salidas: el arte, sobre todo la música, que nos libera un momento del deseo; la compasión, que nos hace sentir el dolor ajeno como propio; y la renuncia que enseñan sabidurías como el budismo, que él fue de los primeros en leer en Europa.' },
    q: [
      { q: '¿Cómo se llama la obra principal de Schopenhauer?', a: ['El mundo como voluntad y representación', 'Así habló Zaratustra', 'Ser y tiempo', 'El capital'], e: 'Publicada en 1819.' },
      { q: '¿Qué es la «voluntad» para Schopenhauer?', a: ['Una fuerza ciega que se expresa en todo lo que vive como deseo sin fin', 'La decisión de hacer los deberes', 'El nombre de un dios', 'Un tipo de ley'], e: 'Está en las plantas, los animales y en nosotros.' },
      { q: '¿Entre qué dos cosas oscila la vida como un péndulo, según Schopenhauer?', a: ['Entre el dolor y el aburrimiento', 'Entre el día y la noche', 'Entre la guerra y la paz', 'Entre el frío y el calor'], e: 'Deseamos lo que no tenemos y nos aburre lo que tenemos.' },
      { q: '¿Qué arte consideraba Schopenhauer el más alto?', a: ['La música', 'La arquitectura', 'La pintura', 'La danza'], e: 'Porque expresa directamente la voluntad misma.' },
      { q: '¿En qué basaba Schopenhauer la moral?', a: ['En la compasión por el sufrimiento de los demás', 'En el miedo al castigo', 'En la obediencia', 'En el interés propio'], e: 'Incluía también a los animales.' },
      { q: '¿Qué sabiduría oriental admiraba Schopenhauer?', a: ['El budismo y las Upanishads de la India', 'El confucianismo militar', 'La astrología', 'Ninguna'], e: 'Tenía una estatua de Buda en su escritorio.' },
      { q: '¿A qué filósofo admirado criticaba Schopenhauer con dureza?', a: ['A Hegel', 'A Platón', 'A Kant', 'A Buda'], e: 'Incluso dio clases a la misma hora que Hegel… y casi nadie fue a las suyas.' },
      { q: '¿A qué filósofo influyó mucho Schopenhauer en su juventud?', a: ['A Nietzsche', 'A Sócrates', 'A Tomás de Aquino', 'A Confucio'], e: 'Nietzsche lo llamó su educador.' },
    ] }, 'kierkegaard');
}

Object.assign(LESSONS, {
  democrito: [
    'Soy Demócrito, de Abdera, una ciudad del norte de Grecia. Heredé una fortuna y la gasté viajando: dicen que estuve en Egipto, en Persia y hasta en la India, aprendiendo de todos.',
    'Mi maestro Leucipo me enseñó una idea asombrosa: si cortas una piedra por la mitad, y luego otra vez, y otra, al final llegarás a algo que ya no se puede cortar. Lo llamamos átomo, «lo que no se divide».',
    'Todo está hecho de átomos que se mueven en el vacío. Son distintos en forma y tamaño: unos lisos, otros con ganchos. Al chocar y engancharse forman el agua, el hierro, las flores y a ti.',
    'Los colores y los sabores no están en las cosas, sino en cómo sus átomos tocan nuestros sentidos. Por eso digo: por convención lo dulce, por convención lo amargo; en realidad, átomos y vacío.',
    'Me llaman el filósofo que ríe, porque me río de las locuras humanas. Pensaba que la meta de la vida es el buen ánimo, la serenidad alegre. Mi pregunta para ti: ¿qué cosa que parece complicada podría explicarse con algo muy simple?',
  ],
  seneca: [
    'Soy Lucio Anneo Séneca. Nací en Córdoba, en Hispania, y crecí en Roma, donde fui abogado, senador, escritor y filósofo de la escuela estoica.',
    'Fui maestro y consejero del joven emperador Nerón. Intenté enseñarle a gobernar con moderación, pero el poder lo volvió cruel, y al final me apartó de su lado.',
    'Escribí que la vida no es breve: la hacemos breve. La gastamos en esperar, en quejarnos, en ocupaciones que no elegimos y en ambiciones que no son nuestras. Quien aprovecha cada día, vive mucho.',
    'También escribí sobre la ira, a la que llamé una locura breve, y cartas a mi amigo Lucilio con consejos para vivir. Le decía: reclama tu tiempo para ti, que hasta ahora te lo han robado.',
    'Cuando Nerón me ordenó morir, consolé a mis amigos y les dejé lo único que tenía de valor: la imagen de mi vida. Mi pregunta para ti: si hoy fuera tu último día, ¿en qué lo gastarías?',
  ],
  hobbes: [
    'Soy Thomas Hobbes. Nací en Inglaterra en 1588, el año en que la Armada española amenazaba nuestras costas. Mi madre, del susto, me dio a luz antes de tiempo. Por eso digo que nací gemelo del miedo.',
    'Viví las guerras civiles de mi país: ingleses matando a ingleses. Me pregunté qué pasaría si no hubiera ninguna ley ni ningún gobierno. Lo llamé el estado de naturaleza.',
    'En ese estado, cada uno tendría derecho a todo y temería a todos. Sería una guerra de todos contra todos, y la vida sería solitaria, pobre, desagradable, brutal y breve.',
    'Para salir de ahí, las personas hacen un pacto: entregan su poder a un soberano fuerte, el Leviatán, que impone la paz. A cambio de obedecer, reciben seguridad.',
    'Locke y Rousseau me discutieron: ¿y si el soberano abusa? Es una buena pregunta. Mi pregunta para ti: ¿qué pasaría en tu escuela si un día desaparecieran todas las reglas?',
  ],
  rousseau: [
    'Soy Jean-Jacques Rousseau, ciudadano de Ginebra. Mi madre murió al nacer yo, y me crie entre libros con mi padre, relojero. Fui aprendiz, vagabundo, músico y, al final, filósofo.',
    'Pienso que el ser humano es bueno por naturaleza. Es la sociedad, con su desigualdad, su vanidad y sus comparaciones, la que lo corrompe. El primero que cercó un terreno y dijo «esto es mío» fue el fundador de la desigualdad.',
    'En «El contrato social» escribí: el hombre nace libre, y en todas partes está encadenado. Propuse una comunidad donde cada uno se une a todos y obedece la voluntad general, que busca el bien de todos. Así, al obedecer la ley, cada uno se obedece a sí mismo.',
    'En «Emilio» pensé cómo educar a un niño respetando su naturaleza: que aprenda de las cosas y de la experiencia, no solo de los libros, y que sea feliz en cada edad.',
    'Mis ideas inspiraron la Revolución francesa, pero en vida fui perseguido y mis libros se quemaron. Mis últimos años los pasé paseando y estudiando plantas. Mi pregunta para ti: ¿qué reglas obedecerías con gusto porque ayudaste a decidirlas?',
  ],
  schopenhauer: [
    'Soy Arthur Schopenhauer. Nací en Danzig en 1788, hijo de un rico comerciante. Mi padre quería que siguiera sus negocios, pero yo elegí la filosofía.',
    'Leí a Kant y pensé que detrás del mundo que vemos hay algo que él no se atrevió a nombrar: la voluntad. Una fuerza ciega que empuja a la planta a crecer, al animal a cazar y a nosotros a desear sin descanso.',
    'Por eso la vida oscila como un péndulo entre el dolor y el aburrimiento: sufrimos mientras deseamos, y nos aburrimos cuando conseguimos. Parece triste, pero no termina ahí.',
    'Hay salidas. El arte, sobre todo la música, nos libera un momento del deseo. La compasión nos hace sentir el dolor del otro como nuestro, y es la base de toda moral, también con los animales. Y la sabiduría de la India y del Buda enseña a no dejarse arrastrar por la voluntad.',
    'Di clases a la misma hora que Hegel, el filósofo más famoso de Berlín, y casi nadie vino a las mías. Tardé décadas en ser leído. Mi pregunta para ti: ¿qué música te hace olvidar por un momento todo lo que deseas?',
  ],
});
