// ============================================================================
//  FILÓSOFAS DE LA ANTIGÜEDAD, LA EDAD MEDIA Y EL RENACIMIENTO
//  Se insertan en sus épocas en orden cronológico.
// ============================================================================
const PENSADORAS = [
  { era: 0, after: 'pitagoras', d: {
    id: 'teano', name: 'Teano de Crotona', short: 'Teano', dates: 'siglo VI a.C.', epithet: 'La filósofa pitagórica',
    look: { robe: 0xf2ece0, robe2: 0x3e6d8f, skin: 0xd8ad8a, hair: 0x3a2418, beard: false, hat: 'longhair', acc: 'scroll' },
    prop: 'lyre',
    intro: 'En la escuela de Pitágoras, hombres y mujeres estudiábamos juntos el número y la armonía. ¿Sabrás afinar tus respuestas?',
    defeat: 'Tu alma ha encontrado su medida, como una lira bien templada. Sigue buscando la armonía.',
    concept: { name: 'La armonía y la medida', text: 'Para los pitagóricos, el cosmos es armonía: proporción entre partes, como en la música. Una vida buena es una vida templada, donde cada parte del alma ocupa su lugar y nada se desborda.' },
    q: [
      { q: '¿De qué escuela filosófica formó parte Teano?', a: ['La escuela pitagórica', 'La Academia de Platón', 'El Jardín de Epicuro', 'La Stoa'], e: 'Una comunidad en Crotona, en el sur de Italia.' },
      { q: '¿Qué tenía de especial la comunidad pitagórica respecto a las mujeres?', a: ['Admitía a mujeres como estudiantes y maestras', 'Las expulsaba de la ciudad', 'Solo las dejaba cocinar', 'Les prohibía hablar de números'], e: 'Se conocen los nombres de varias filósofas pitagóricas.' },
      { q: '¿Qué principio guiaba la ética pitagórica que enseñaba Teano?', a: ['La armonía y la moderación', 'El placer sin límites', 'La duda sobre todo', 'La obediencia ciega al rey'], e: 'El alma, como una lira, debe estar bien afinada.' },
      { q: 'Según la tradición, ¿con quién se casó Teano?', a: ['Con Pitágoras', 'Con Sócrates', 'Con Tales', 'Con Heráclito'], e: 'Tras su muerte, se dice que dirigió la escuela con sus hijos.' },
      { q: '¿En qué región estaba Crotona, la ciudad de los pitagóricos?', a: ['En la Magna Grecia, sur de Italia', 'En Jonia', 'En Egipto', 'En el Ática'], e: 'Las colonias griegas del sur de Italia se llamaban Magna Grecia.' },
      { q: '¿Qué escribió Teano, según las fuentes antiguas, sobre los números?', a: ['Que las cosas no son números, sino que existen según el número', 'Que los números no existen', 'Que solo existe el número uno', 'Que los números son dioses'], e: 'Una precisión sobre la doctrina de Pitágoras.' },
      { q: '¿Qué relación veían los pitagóricos entre música y matemáticas?', a: ['Las notas armoniosas responden a proporciones numéricas', 'Ninguna', 'La música era cosa de esclavos', 'Las matemáticas se cantaban'], e: 'La octava es la proporción 2 a 1.' },
      { q: '¿Qué otra filósofa pitagórica escribió sobre la armonía en la familia y la ciudad?', a: ['Perictíone', 'Hipatia', 'Safo', 'Aspasia'], e: 'Varias pitagóricas escribieron tratados sobre la vida buena.' },
    ] } },
  { era: 2, after: 'pirron', d: {
    id: 'hipatia', name: 'Hipatia de Alejandría', short: 'Hipatia', dates: 'c. 355 – 415', epithet: 'La matemática de Alejandría',
    look: { robe: 0xf4efe2, robe2: 0x2a5a8a, skin: 0xc8a07e, hair: 0x2a1a10, beard: false, hat: 'longhair', acc: 'lens' },
    prop: 'astrolabe',
    intro: 'Enseño matemáticas, astronomía y la filosofía de Platón a quien quiera aprender, sea cristiano o pagano. Defiende tu derecho a pensar.',
    defeat: 'Has razonado con la claridad de una demostración. Que nadie apague nunca la luz de la razón.',
    concept: { name: 'La razón como bien común', text: 'Hipatia enseñó matemáticas, astronomía y filosofía neoplatónica en Alejandría a alumnos de todas las creencias. Para ella, buscar la verdad con la razón es un camino de purificación del alma abierto a cualquiera.' },
    q: [
      { q: '¿En qué ciudad enseñó Hipatia?', a: ['Alejandría', 'Atenas', 'Roma', 'Constantinopla'], e: 'La ciudad de la gran Biblioteca y el Museo.' },
      { q: '¿Quién fue el padre y maestro de Hipatia?', a: ['Teón de Alejandría, matemático', 'Plotino', 'Euclides', 'Ptolomeo'], e: 'Juntos trabajaron en ediciones de obras matemáticas.' },
      { q: '¿Qué corriente filosófica enseñaba Hipatia?', a: ['El neoplatonismo', 'El epicureísmo', 'El cinismo', 'El escepticismo'], e: 'La filosofía inspirada en Platón y Plotino.' },
      { q: '¿Qué instrumento astronómico ayudó a perfeccionar, según una carta de su alumno Sinesio?', a: ['El astrolabio', 'El telescopio', 'La brújula', 'El reloj de péndulo'], e: 'Servía para medir la posición de los astros.' },
      { q: '¿Qué obras matemáticas comentó Hipatia?', a: ['Las Cónicas de Apolonio y la Aritmética de Diofanto', 'Los Elementos de Newton', 'El Álgebra de Al-Juarismi', 'La Geometría de Descartes'], e: 'Fue la primera matemática de la que tenemos datos seguros.' },
      { q: '¿Cómo murió Hipatia en el año 415?', a: ['Asesinada por una turba fanática', 'De vejez en su casa', 'En una batalla naval', 'En un terremoto'], e: 'Su muerte se convirtió en símbolo de la intolerancia contra la razón.' },
      { q: '¿A quién enseñaba Hipatia?', a: ['A alumnos de distintas creencias, cristianos y paganos', 'Solo a los sacerdotes', 'Solo a las mujeres', 'A nadie: escribía en secreto'], e: 'Uno de sus alumnos, Sinesio, llegó a ser obispo.' },
      { q: '¿Qué famoso faro era una de las maravillas de Alejandría?', a: ['El faro de Alejandría, en la isla de Faros', 'El faro de Rodas', 'El faro de Atenas', 'El faro de Cartago'], e: 'Una de las siete maravillas del mundo antiguo.' },
    ] } },
  { era: 3, after: 'agustin', d: {
    id: 'hildegarda', name: 'Hildegarda de Bingen', short: 'Hildegarda', dates: '1098 – 1179', epithet: 'La sibila del Rin',
    look: { robe: 0xf2efe6, robe2: 0x1c1c22, skin: 0xe0b896, hair: 0xf2efe6, beard: false, hat: 'hood', acc: 'book' },
    prop: 'mandala',
    intro: 'He visto la luz viviente y la he escrito, la he pintado y la he cantado. El cosmos entero es una armonía. ¿Escuchas su música?',
    defeat: 'Hay en ti viriditas, la fuerza verde de la vida. Haz que florezca.',
    concept: { name: 'Viriditas y la armonía del cosmos', text: 'Hildegarda vio el mundo como una gran armonía entre Dios, el cosmos y el ser humano, que es un pequeño universo. La viriditas, la fuerza verde de la vida, une la naturaleza, el cuerpo y el alma.' },
    q: [
      { q: '¿Cómo llamaba Hildegarda a la fuerza vital que hace crecer y florecer todo?', a: ['Viriditas', 'Ataraxia', 'Conatus', 'Entelequia'], e: 'Literalmente, «verdor».' },
      { q: '¿En qué obra describe Hildegarda sus visiones?', a: ['Scivias', 'La ciudad de Dios', 'Suma teológica', 'Confesiones'], e: 'Su título significa «Conoce los caminos».' },
      { q: '¿Cuál de estas actividades NO practicó Hildegarda?', a: ['Navegó a América', 'Compuso música', 'Escribió sobre medicina y plantas', 'Fundó monasterios'], e: 'Fue abadesa, compositora, médica, naturalista y teóloga.' },
      { q: '¿Qué idea tenía Hildegarda sobre el ser humano?', a: ['Que es un pequeño cosmos que refleja el universo', 'Que es una máquina', 'Que es un haz de percepciones', 'Que es un lobo para el hombre'], e: 'Microcosmos y macrocosmos se corresponden.' },
      { q: '¿Qué lengua inventó Hildegarda?', a: ['La lingua ignota, una lengua secreta', 'El esperanto', 'El castellano', 'El latín vulgar'], e: 'Con su propio alfabeto y unas mil palabras.' },
      { q: '¿Por qué región viajó Hildegarda predicando, algo insólito para una mujer de su época?', a: ['Por el valle del Rin y otras regiones alemanas', 'Por Tierra Santa', 'Por Al-Ándalus', 'Por Escandinavia'], e: 'Predicó en catedrales y plazas.' },
      { q: '¿Qué título le concedió la Iglesia católica en 2012?', a: ['Doctora de la Iglesia', 'Papisa', 'Emperatriz', 'Reina de Alemania'], e: 'Es una de las cuatro mujeres doctoras de la Iglesia.' },
      { q: '¿Qué obra musical de Hildegarda es considerada uno de los primeros dramas musicales?', a: ['Ordo Virtutum', 'La flauta mágica', 'Carmina Burana', 'El Mesías'], e: 'Un drama sobre la lucha de las virtudes por un alma.' },
    ] } },
  { era: 4, after: null, d: {
    id: 'pizan', name: 'Christine de Pizan', short: 'Christine', dates: '1364 – c. 1430', epithet: 'La primera escritora profesional',
    look: { robe: 0x2a4a8a, robe2: 0xf2efe6, skin: 0xe0b896, hair: 0x8a6a40, beard: false, hat: 'hood', acc: 'quill' },
    prop: 'city',
    intro: 'Leí a los sabios que hablaban mal de las mujeres y me pregunté: ¿tienen razón? Decidí construir una ciudad para responderles. Ven, pon a prueba tu juicio.',
    defeat: 'Has defendido la verdad contra el prejuicio. Mi ciudad tiene un nuevo habitante.',
    concept: { name: 'La Ciudad de las Damas', text: 'Christine de Pizan respondió a siglos de prejuicios contra las mujeres con razones y ejemplos de mujeres sabias, valientes y justas. Defendió que la diferencia entre hombres y mujeres en saber se debe a la educación, no a la naturaleza.' },
    q: [
      { q: '¿Cómo se titula la obra más famosa de Christine de Pizan?', a: ['La ciudad de las damas', 'El segundo sexo', 'Vindicación de los derechos de la mujer', 'Una habitación propia'], e: 'Escrita en 1405.' },
      { q: '¿Quiénes ayudan a Christine a construir la ciudad en su libro?', a: ['Tres damas: Razón, Rectitud y Justicia', 'Tres ángeles', 'Tres reyes magos', 'Tres filósofos griegos'], e: 'Cada una le ayuda en una parte de la construcción.' },
      { q: 'Según Christine, si las mujeres sabían menos que los hombres, era por...', a: ['La falta de educación', 'Su naturaleza inferior', 'La voluntad de Dios', 'El clima'], e: 'Si se las educara igual, aprenderían igual.' },
      { q: '¿Por qué se considera a Christine la primera escritora profesional de Europa?', a: ['Porque vivió de su escritura para mantener a su familia', 'Porque escribió el primer libro impreso', 'Porque fue la primera en saber leer', 'Porque fue reina'], e: 'Enviudó joven y escribió por encargo de reyes y nobles.' },
      { q: '¿En qué país vivió y escribió Christine, aunque nació en Venecia?', a: ['Francia', 'Inglaterra', 'España', 'Alemania'], e: 'Su padre fue astrólogo y médico del rey Carlos V de Francia.' },
      { q: '¿Cómo se llama el debate literario que Christine provocó criticando el «Roman de la Rose»?', a: ['La querella de las mujeres', 'La querella de los universales', 'La disputa de Valladolid', 'La guerra de los cien años'], e: 'Un debate de siglos sobre el valor de las mujeres.' },
      { q: '¿A qué heroína dedicó Christine su último poema, en 1429?', a: ['Juana de Arco', 'Isabel la Católica', 'Cleopatra', 'Safo'], e: 'Lo escribió cuando Juana aún vivía.' },
      { q: '¿Qué artista renacentista inventó la imprenta que difundió los libros hacia 1450?', a: ['Johannes Gutenberg', 'Leonardo da Vinci', 'Brunelleschi', 'Galileo'], e: 'Aunque Christine escribió antes, en manuscritos iluminados.' },
    ] } },
];
for (const p of PENSADORAS) {
  const list = ERAS[p.era].sages; const i = p.after ? list.findIndex((s) => s.id === p.after) + 1 : 0;
  list.splice(i, 0, p.d);
}

Object.assign(LESSONS, {
  teano: [
    'Soy Teano, de Crotona, en el sur de Italia. Fui discípula de Pitágoras y, según cuentan, su esposa. En nuestra escuela, algo raro en Grecia, hombres y mujeres estudiábamos juntos matemáticas, música, astronomía y el arte de vivir bien.',
    'Los pitagóricos vivíamos en comunidad: compartíamos los bienes, guardábamos silencio durante años para aprender a escuchar, y cada noche repasábamos el día preguntándonos: ¿qué he hecho bien, qué he hecho mal, qué he dejado de hacer?',
    'Creemos que el cosmos es armonía. Una cuerda que suena da una nota; la mitad de esa cuerda da la misma nota más aguda. Todo en el universo responde a proporciones así, de los planetas al alma humana.',
    'Algunos simplifican y dicen que para Pitágoras todo es número. Yo lo precisé: las cosas no son números, sino que existen según el número. El número es su orden, su medida, no su materia.',
    'Mi enseñanza ética es la de la armonía y la moderación. El alma tiene partes, como una lira tiene cuerdas. Si una se tensa demasiado, por la ira o el deseo, la música se rompe. Vivir bien es afinar el alma.',
    'Tras la muerte de Pitágoras, se dice que dirigí la escuela con nuestros hijos. Nos han llegado cartas con mi nombre sobre la educación, la familia y la templanza. Recuerda: la filosofía nunca fue solo cosa de hombres.',
  ],
  hipatia: [
    'Soy Hipatia, de Alejandría, en Egipto. Nací hacia el año 355. Mi padre, Teón, era matemático y astrónomo del Museo, y me educó como a un sabio. Pronto lo superé, y llegué a dirigir la escuela platónica de la ciudad.',
    'Enseñé matemáticas y astronomía. Comenté las Cónicas de Apolonio, que estudian las curvas que salen al cortar un cono: la elipse, la parábola y la hipérbola. Siglos después, Kepler descubriría que los planetas se mueven en elipses.',
    'También ayudé a mejorar instrumentos como el astrolabio, que sirve para medir la altura de los astros y orientarse, y el hidrómetro, para medir la densidad de los líquidos. Mi alumno Sinesio me escribía pidiéndome consejo sobre ellos.',
    'En filosofía seguía a Platón y a Plotino. Creía que el alma, a través de las matemáticas y la contemplación, puede elevarse desde lo sensible hasta lo inteligible y acercarse al Uno, la fuente de todo.',
    'Daba clases públicas, vestida con el manto de los filósofos, a todo el que quisiera escuchar: paganos y cristianos, ricos y pobres. Los gobernantes de la ciudad me consultaban. En una época de luchas religiosas, yo defendía el diálogo y la razón.',
    'En el año 415, una turba de fanáticos me asaltó en la calle y me asesinó. Mis escritos se perdieron casi todos. Pero mi nombre se convirtió en símbolo de la libertad de pensamiento y de las mujeres en la ciencia.',
  ],
  hildegarda: [
    'Soy Hildegarda, nacida en 1098 en Alemania. Mis padres me entregaron a un monasterio a los ocho años. Allí aprendí a leer, a cantar los salmos y a escuchar. Llegué a ser abadesa y fundé mis propios monasterios junto al río Rin.',
    'Desde niña tuve visiones: veía una luz que llamaba la sombra de la luz viviente. Durante años las callé por miedo. A los cuarenta y dos años sentí la orden de escribirlas, y así nació Scivias, que significa conoce los caminos.',
    'En mis visiones el universo aparece como un huevo cósmico, con el fuego, las estrellas, los vientos y la tierra en armonía. El ser humano está en el centro como un pequeño cosmos: lo que pasa en el cuerpo y en el alma refleja lo que pasa en el universo.',
    'Hablo de viriditas, la fuerza verde: el verdor que hace brotar las plantas, sana el cuerpo y hace florecer el alma. Por eso escribí sobre medicina, plantas, piedras y animales: la naturaleza es un libro que también habla de lo divino.',
    'Compuse música, más de setenta cantos, y un drama musical, Ordo Virtutum, donde las virtudes luchan por un alma. Para mí, la música es el eco de la armonía del paraíso. Incluso inventé una lengua y un alfabeto propios.',
    'Me carteé con papas, emperadores y reyes, y les reprendí cuando gobernaban mal. Viajé predicando por ciudades, algo inaudito para una mujer. Morí en 1179 y en 2012 me nombraron doctora de la Iglesia. Que nunca se seque tu verdor.',
  ],
  pizan: [
    'Soy Christine de Pizan. Nací en Venecia en 1364, pero crecí en París, en la corte del rey Carlos V, donde mi padre era astrólogo y médico. Él quiso que estudiara, aunque mi madre prefería que aprendiera a hilar.',
    'A los veinticinco años me quedé viuda, con tres hijos, mi madre y una sobrina a mi cargo. Para mantenerlas decidí hacer algo que casi ninguna mujer había hecho: vivir de mi pluma. Escribí poemas, biografías, tratados de política y de guerra por encargo de reyes y duques.',
    'Un día, leyendo a un autor que despreciaba a las mujeres, me sentí triste: tantos sabios no podían equivocarse. Entonces se me aparecieron tres damas, Razón, Rectitud y Justicia, y me dijeron que me levantara: esos libros estaban llenos de prejuicios.',
    'Con ellas construí La ciudad de las damas, una ciudad hecha de razones y de ejemplos. Sus cimientos son mujeres sabias, como Safo; sus muros, mujeres valientes y justas; y su reina, la Virgen María. Cada piedra responde a una calumnia.',
    'Defiendo que, si se enviara a las niñas a la escuela como a los niños, aprenderían las artes y las ciencias igual de bien. Si las mujeres saben menos, no es por su naturaleza, sino porque no se les permite estudiar.',
    'Al final de mi vida me retiré a un convento. Desde allí, en 1429, escribí un poema de alegría por Juana de Arco, una joven que había devuelto la esperanza a Francia. Mi debate con los misóginos, la querella de las mujeres, duró siglos.',
  ],
});
