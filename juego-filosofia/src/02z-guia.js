// ============================================================================
//  EL FILÓSOFO GUÍA (Filosofía para Seres Humanos)
//  Está en todas las épocas, junto al punto de llegada, y da la bienvenida a cada mundo.
// ============================================================================
const GUIDE_LOOK = { plain: true, robe: 0xefe4cc, robe2: 0x4a2352, skin: 0xdba184, hair: 0x1e1712, beard: 0x231d19, beardLen: 1.3, beardTop: 0.53, beardGrey: 0x9a948c, eyes: 0x6f8fa8, stubble: 0x5e4c40, hat: 'braids', acc: 'lamp' };
const GUIDE_LINES = [
  ['Bienvenido, bienvenida, al camino del filósofo. Recuerda: la filosofía es la luz que ilumina cuando todo parece oscuro… pero también es la oscuridad, cuando todo parece demasiado claro.',
    'Te invito a estudiar filosofía conmigo. ¡Comienza tu odisea!'],
  ['Bienvenido a la Atenas clásica, la ciudad del ágora, la Academia y el Liceo. Aquí pensar se volvió un diálogo: alguien pregunta, alguien responde, y los dos descubren que sabían menos de lo que creían.',
    'Busca a Protágoras, a Sócrates, a Platón y, al final, a Aristóteles. No temas equivocarte: reconocer lo que no sabes es el comienzo de la sabiduría.'],
  ['Has llegado al Helenismo y a Roma. Los imperios se volvieron inmensos y las personas se sintieron pequeñas; por eso la filosofía se convirtió en un arte de vivir.',
    'Diógenes, Epicuro, Pirrón, Hipatia y Marco Aurelio te enseñarán a buscar la serenidad. Pregúntate con ellos qué depende de ti y qué no.'],
  ['Bienvenido a la Edad Media: mil años en que la fe y la razón conversaron en monasterios, mezquitas y universidades. No fue una época oscura: aquí se copiaron, tradujeron y discutieron los libros de los griegos.',
    'Agustín, Hildegarda, Averroes, Ockham y Tomás de Aquino te mostrarán que creer y pensar pueden caminar juntos.'],
  ['Llegas al Renacimiento y a la revolución científica. El ser humano vuelve a mirarse con asombro, y la Tierra deja de ser el centro del universo.',
    'Christine, Pico, Maquiavelo, Montaigne y Bacon te invitan a dudar de lo que siempre se dio por cierto. Atrévete a mirar con ojos nuevos.'],
  ['Bienvenido a la Modernidad. Aquí la razón se pregunta por sí misma: ¿qué puedo conocer con certeza? ¿Qué me hace libre?',
    'Descartes, Spinoza, Locke, Hume y Kant te esperan. Recuerda el lema de la Ilustración: ten el valor de servirte de tu propio entendimiento.'],
  ['Has llegado al siglo diecinueve: fábricas, trenes y revoluciones. La historia se mueve deprisa, y la filosofía intenta entender hacia dónde va.',
    'Hegel, Kierkegaard, Marx, Mill y Nietzsche no se pondrán de acuerdo en casi nada. Escúchalos a todos y decide tú.'],
  ['Bienvenido a la época contemporánea, nuestro propio tiempo. Entre guerras mundiales y grandes cambios, los filósofos pensaron el lenguaje, la libertad y el absurdo.',
    'Wittgenstein, Sartre, Beauvoir, Camus y Arendt te preguntarán quién eres y qué haces con tu libertad. Responde con honestidad.'],
  ['Bienvenido a América Latina, nuestra casa. Aquí la filosofía habló en náhuatl, en los versos de una monja, en la voz de un poeta libertador y en el aula de un maestro.',
    'Nezahualcóyotl, Sor Juana, Martí, Castellanos y Freire te enseñarán que pensar también es liberarse.'],
  ['Bienvenido a Tenochtitlan, la ciudad sobre el lago. Los sabios mexicas, los tlamatinime, se preguntaban si en la tierra hay algo verdadero, algo que permanezca.',
    'Escucha a Tochihuitzin, a Macuilxochitzin, a Tecayehuatzin y a Tlacaélel. Para ellos, la verdad se buscaba con flor y canto.'],
  ['Has llegado al Tawantinsuyu, el mundo de los incas, entre montañas que tocan el cielo. Aquí la sabiduría se tejía en el trabajo compartido y en el equilibrio entre todos los seres.',
    'Inca Roca, Garcilaso, Guamán Poma y Pachacútec te hablarán de reciprocidad, de memoria y de justicia. Escucha a los Andes.'],
  ['Mari mari, bienvenido al Wallmapu, la tierra del pueblo mapuche, entre la cordillera y el mar. Aquí la sabiduría no vive en los libros: vive en la palabra, en la tierra y en la comunidad.',
    'La machi, el kimche, Janequeo y Lautaro te enseñarán el küme mongen, el buen vivir en equilibrio con todo lo que existe.'],
  ['Bienvenido a la China clásica, tierra de montañas, ríos y maestros. Aquí la filosofía buscó la armonía: con los demás, con la familia y con el curso de la naturaleza.',
    'Laozi, Ban Zhao, Zhuangzi y Confucio te hablarán del camino, el Tao. Camina despacio: el agua, que es blanda, vence a la roca.'],
  ['Has llegado a la India, donde durante siglos se pensó sobre el yo, el sufrimiento y la liberación. Aquí la filosofía es también una práctica: una manera de vivir y de mirar la mente.',
    'Gargi, Mahavira, Nagarjuna y Buda te esperan. Pregúntate con ellos quién es ese que dice yo.'],
  ['Bienvenido a África, cuna de la humanidad y de algunos de los textos de sabiduría más antiguos del mundo. Desde Egipto hasta hoy, aquí se pensó la justicia, la verdad y la comunidad.',
    'Ptahhotep, Zera Yacob, Maathai y Tutu te enseñarán el ubuntu: yo soy porque nosotros somos.'],
  ['Bienvenido a Sumer, entre el Tigris y el Éufrates, donde empezó la historia escrita. Aquí nacieron las primeras ciudades, la escritura en barro y las primeras leyes.',
    'Enheduanna, la primera autora con nombre, Shuruppak, Hammurabi y el rey Gilgamesh te esperan. Gilgamesh buscó vencer a la muerte; pregúntate con él qué hace valiosa una vida que se acaba.'],
  ['Bienvenido a Bagdad, la ciudad redonda, en los siglos del islam clásico. En la Casa de la Sabiduría, sabios de muchos pueblos y religiones tradujeron a los griegos y los hicieron crecer.',
    'Al-Kindi, Rabia de Basora, Al-Farabi y Avicena te esperan. Recuerda lo que decía Al-Kindi: la verdad hay que aceptarla venga de donde venga.'],
  ['Bienvenido al jardín de los poetas. Aquí la filosofía se calla un momento para escuchar: la poesía no define el amor, el tiempo o la muerte; los hace sentir.',
    'Safo, Li Bai, Rumi, Gabriela Mistral y Pablo Neruda te esperan. Pregúntate con ellos si un poema puede enseñarte algo que un razonamiento no alcanza.'],
  ['Bienvenido al taller de los científicos. La ciencia nació de la filosofía: los primeros científicos se llamaban filósofos de la naturaleza.',
    'Arquímedes, Galileo, Ada Lovelace, Marie Curie y Albert Einstein te esperan. Observa, mide, experimenta e imagina. Y pregúntate: ¿qué es saber algo de verdad?'],
  ['Bienvenido al Japón del zen. Aquí la filosofía se practica: sentándose en silencio, sirviendo una taza de té, caminando y escribiendo poemas de tres versos.',
    'Murasaki Shikibu, Dōgen, Sen no Rikyū, Bashō y Kitarō Nishida te esperan. Camina despacio: la prisa es la única sombra que no se vence corriendo.'],
];
// dónde espera en cada época (junto al punto de llegada, en z = 31)
const GUIDE_AT = { default: [0, 25], 12: [-2.8, 25.5], 14: [-2.8, 25.5], 15: [2.8, 24.5], 16: [2.8, 24.5], 17: [2.8, 24.5], 18: [2.8, 24.5], 19: [2.8, 24.5] };
GUIDE_LINES.forEach((lines, i) => {
  if (!NPCS[i]) NPCS[i] = [];
  NPCS[i].unshift({ id: i === 0 ? 'guia' : 'guia-' + ERAS[i].id, name: 'El guía', role: 'Filosofía para Seres Humanos', portrait: 'guia', greeter: true,
    at: GUIDE_AT[i] || GUIDE_AT.default, path: [0, 0.01], look: GUIDE_LOOK, lines });
});
