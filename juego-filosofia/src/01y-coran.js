// ============================================================================
//  XXXVII · EL JARDÍN DEL CORÁN
//  Siete estaciones, cada una dedicada a una sura (o a la historia del Libro).
//  Por respeto a la tradición islámica, aquí no se representa a ningún profeta
//  ni a sus compañeros: cada estación es un atril con un medallón geométrico, y
//  una voz narradora cuenta en tercera persona lo que dice el texto y cómo lo
//  entienden los musulmanes. Es un mundo «sagrado»: aquí se comprende, no se vence.
//  Las aleyas citadas son traducciones aproximadas al español.
// ============================================================================
{
  const Q = (q, ok, e, ...no) => ({ q, a: [ok, ...no], e });
  const st = (id, name, short, dates, epithet, prop, intro, defeat, concept, q, extra = {}) => ({ id, name, short, dates, epithet, prop, intro, defeat, concept, q, aniconic: true, look: lk(0x1a5a6a, 0xd8a838, 0xc49372, 0x2a2a2a), ...extra });
  ERAS.push({
    id: 'coran', num: 'XXXVII', name: 'El jardín del Corán', world: true, sacred: true,
    place: 'Un jardín imaginario de arcos, fuentes y azulejos, entre La Meca y Medina', years: 'Siglo VII',
    quote: { t: 'Os hemos hecho pueblos y tribus para que os conozcáis unos a otros.', a: 'Corán 49:13' },
    enemy: { one: 'Sombra del Olvido', many: 'Sombras del Olvido' },
    story: 'Para más de mil ochocientos millones de musulmanes, el Corán es la palabra de Dios revelada en árabe al profeta Mahoma durante unos veintitrés años, a partir del año 610. Su nombre significa «la recitación»: se aprende de memoria, se recita en cada oración y se escribe con la caligrafía más bella. En este jardín no hay estatuas ni retratos de profetas: cada estación es un atril con un medallón, y una voz te cuenta una sura, sus historias y cómo la entienden los creyentes. Escucha, pon a prueba lo que aprendiste y descubre cómo se reunió el Libro.',
    sages: [
      st('iqra', 'La primera revelación', 'Iqra', 'Sura 96 · La Meca, hacia el año 610', '«¡Lee!»: el comienzo de la revelación', 'stars',
        'Esta estación cuenta el comienzo. Según la tradición islámica, una noche del mes de Ramadán, en una cueva del monte Hira, llegó la primera palabra del Corán: «¡Lee!». ¿Quieres saber qué ocurrió?',
        'Has comprendido el comienzo. La primera palabra revelada invita a leer y a aprender: «Lee en el nombre de tu Señor».',
        { name: 'La primera revelación', text: 'Según la tradición islámica, hacia el año 610 Mahoma, un comerciante de La Meca de unos cuarenta años, solía retirarse a meditar en una cueva del monte Hira. Allí el ángel Gabriel, en árabe Yibril, le transmitió los primeros versículos del Corán, que hoy forman el comienzo de la sura 96: «¡Lee en el nombre de tu Señor, que ha creado! (…) ¡Lee! Tu Señor es el Más Generoso, que enseñó por medio del cálamo». La revelación continuó durante unos veintitrés años, hasta su muerte en el año 632. La palabra Corán, Qur’an, significa «la recitación» o «la lectura». Para los musulmanes es la palabra de Dios en árabe.' },
        [
          Q('¿Qué significa la palabra «Corán» (Qur’an)?', 'La recitación o lectura', 'De la raíz árabe qara’a, leer o recitar.', 'La espada', 'El jardín', 'El viaje'),
          Q('¿Cuál fue la primera palabra revelada, según la tradición?', '«¡Lee!» (Iqra)', 'Comienzo de la sura 96.', '«¡Escucha!»', '«¡Lucha!»', '«¡Duerme!»'),
          Q('¿Dónde ocurrió la primera revelación, según la tradición?', 'En una cueva del monte Hira, cerca de La Meca', 'El monte de la Luz.', 'En Jerusalén', 'En Damasco', 'En Bagdad'),
          Q('¿Durante cuántos años fue revelado el Corán, según la tradición?', 'Unos veintitrés años', 'Del 610 al 632.', 'Un día', 'Cien años', 'Tres años'),
          Q('¿Qué ángel transmitió la revelación, según el islam?', 'Gabriel (Yibril)', 'El mismo nombre que en la Biblia.', 'Miguel', 'Rafael', 'Ninguno'),
          Q('¿En qué lengua fue revelado el Corán?', 'En árabe', 'Por eso se recita en árabe en todo el mundo.', 'En latín', 'En griego', 'En hebreo'),
        ]),
      st('fatiha', 'Al-Fátiha · La que abre', 'Al-Fátiha', 'Sura 1 · siete aleyas', 'La que abre el Libro', 'lectern',
        'Esta estación guarda la sura más recitada del mundo: la primera, Al-Fátiha, «la que abre». Tiene solo siete aleyas, y los musulmanes la repiten en cada parte de sus oraciones. ¿La conoces?',
        'Has comprendido la Fátiha. Empieza con «En el nombre de Dios, el Compasivo, el Misericordioso» y termina pidiendo ser guiado por el camino recto.',
        { name: 'La sura que abre el Libro', text: 'Al-Fátiha es la primera sura del Corán. Tiene siete aleyas o versículos. Empieza con la fórmula que encabeza casi todas las suras, la basmala: «En el nombre de Dios, el Compasivo, el Misericordioso». Sigue con una alabanza a Dios, «Señor de los mundos», «Soberano del Día del Juicio», y termina con una petición: «Guíanos por el camino recto». Los musulmanes la recitan en cada unidad de las cinco oraciones diarias, por lo que se dice al menos diecisiete veces al día. También se la llama «la madre del Libro», porque resume su mensaje.' },
        [
          Q('¿Qué significa «Al-Fátiha»?', 'La que abre', 'Es la primera sura.', 'La que cierra', 'La más larga', 'La del desierto'),
          Q('¿Cuántas aleyas tiene la Fátiha?', 'Siete', 'Una sura breve.', 'Cien', 'Dos', 'Treinta'),
          Q('¿Con qué fórmula empiezan casi todas las suras?', '«En el nombre de Dios, el Compasivo, el Misericordioso»', 'La basmala.', '«Había una vez»', '«En el principio era el Verbo»', '«Escucha, Israel»'),
          Q('¿Qué pide la Fátiha al final?', 'Ser guiado por el camino recto', '«Guíanos por el camino recto».', 'Riquezas', 'Victoria en la guerra', 'Lluvia'),
          Q('¿Cuándo se recita la Fátiha?', 'En cada unidad de las oraciones diarias', 'Al menos diecisiete veces al día.', 'Solo una vez en la vida', 'Solo en bodas', 'Nunca en voz alta'),
          Q('¿Qué otro nombre recibe la Fátiha?', 'La madre del Libro', 'Porque resume su mensaje.', 'La hija del desierto', 'La sura del hierro', 'El libro de los reyes'),
        ]),
      st('yusuf', 'Sura de José (Yusuf)', 'Yusuf', 'Sura 12 · 111 aleyas', '«El más bello de los relatos»', 'water',
        'Esta estación cuenta una historia completa: la de José, Yusuf, vendido por sus hermanos y llegado a lo más alto en Egipto. El propio Corán la llama «el más bello de los relatos». ¿La escuchamos?',
        'Has comprendido el relato de José. Su mensaje es la «paciencia hermosa» y el perdón: José perdonó a los hermanos que lo traicionaron.',
        { name: 'El más bello de los relatos', text: 'La sura 12 es la única del Corán que cuenta una sola historia de principio a fin: la de José, Yusuf, hijo del profeta Jacob, Yaqub. Sus hermanos, celosos, lo arrojan a un pozo; unos viajeros lo venden como esclavo en Egipto. Allí resiste la tentación, es encarcelado injustamente, interpreta los sueños del rey y llega a administrar el país durante siete años de abundancia y siete de hambre. Al final perdona a sus hermanos y se reúne con su padre. La misma historia aparece en el libro del Génesis de la Biblia, con diferencias de detalle. El Corán la presenta así: «Te contamos el más bello de los relatos».' },
        [
          Q('¿Cómo llama el propio Corán a la historia de José?', 'El más bello de los relatos', 'Corán 12:3.', 'La historia más triste', 'La guerra de los hermanos', 'El viaje al mar'),
          Q('¿Qué tiene de especial la sura 12?', 'Cuenta una sola historia de principio a fin', 'La de José.', 'Es la más corta', 'No tiene palabras', 'Está en griego'),
          Q('¿Qué hicieron los hermanos de José, celosos?', 'Lo arrojaron a un pozo', 'Y fue vendido como esclavo.', 'Lo coronaron rey', 'Le regalaron un barco', 'Nada'),
          Q('¿Qué don tenía José?', 'Interpretar los sueños', 'Como los del rey de Egipto.', 'Volar', 'Hablar con los peces', 'Hacerse invisible'),
          Q('¿En qué otro libro sagrado aparece la historia de José?', 'En el Génesis de la Biblia', 'Con diferencias de detalle.', 'En la Odisea', 'En el Mahabharata', 'En ninguno'),
          Q('¿Qué virtud destaca la sura de José?', 'La paciencia y el perdón', '«Paciencia hermosa».', 'La venganza', 'La riqueza', 'La fuerza'),
        ]),
      st('maryam', 'Sura de María (Maryam)', 'Maryam', 'Sura 19 · 98 aleyas', 'La única mujer nombrada en el Corán', 'garden',
        'Esta estación está dedicada a María, Maryam, la madre de Jesús. Es la única mujer a la que el Corán llama por su nombre, y una sura entera lleva su nombre. ¿Sabes qué cuenta?',
        'Has comprendido la sura de María. En el islam, María es un modelo de fe, y Jesús, Isa, es un gran profeta.',
        { name: 'María y Jesús en el Corán', text: 'La sura 19 lleva el nombre de María, Maryam, la única mujer citada por su nombre en el Corán, donde aparece más veces que en todo el Nuevo Testamento. La sura cuenta primero cómo Zacarías, ya anciano, recibe el anuncio del nacimiento de Juan, Yahya. Después narra cómo María, retirada en oración, recibe el anuncio de un hijo, y da a luz a Jesús, Isa, junto a una palmera que le da dátiles, mientras brota un arroyo a sus pies. Para el islam, Jesús es uno de los más grandes profetas y el Mesías, nacido de una virgen, pero no es Dios ni hijo de Dios: esa es una diferencia importante con el cristianismo.' },
        [
          Q('¿Qué tiene de especial María en el Corán?', 'Es la única mujer nombrada por su nombre', 'Y una sura lleva su nombre.', 'No aparece', 'Es una reina guerrera', 'Es una profeta del mar'),
          Q('¿Cómo se llama Jesús en el Corán?', 'Isa', 'Uno de los grandes profetas.', 'Yusuf', 'Musa', 'Ibrahim'),
          Q('¿Junto a qué árbol da a luz María, según la sura 19?', 'Junto a una palmera', 'Que le da dátiles.', 'Junto a un olivo', 'Junto a un roble', 'Junto a un manzano'),
          Q('¿Qué es Jesús para el islam?', 'Un gran profeta y el Mesías, pero no Dios', 'Una diferencia con el cristianismo.', 'Un rey de Egipto', 'Un filósofo griego', 'Nada'),
          Q('¿Qué nacimiento se anuncia primero a Zacarías en la sura 19?', 'El de Juan (Yahya)', 'Siendo ya anciano.', 'El de José', 'El de Moisés', 'El de David'),
          Q('¿Dónde aparece más veces María, en el Corán o en el Nuevo Testamento?', 'En el Corán', 'Es muy venerada en el islam.', 'En el Nuevo Testamento', 'Igual', 'En ninguno'),
        ]),
      st('kahf', 'Sura de la Caverna (Al-Kahf)', 'Al-Kahf', 'Sura 18 · 110 aleyas', 'Cuatro historias para tiempos difíciles', 'cave',
        'Esta estación cuenta cuatro historias: unos jóvenes que durmieron siglos en una caverna, un hombre orgulloso de su jardín, el viaje de Moisés con un sabio misterioso y un rey que viajó a los confines de la tierra. ¿Empezamos?',
        'Has comprendido la sura de la Caverna. Si el mar fuera tinta para escribir las palabras de Dios, se agotaría antes que ellas.',
        { name: 'Las historias de la Caverna', text: 'La sura 18 reúne cuatro historias. La de los durmientes de la caverna: unos jóvenes creyentes que, perseguidos, se refugian en una cueva y duermen durante unos trescientos años. La del dueño de dos jardines, que se cree dueño de todo y lo pierde por su orgullo. La de Moisés y un sabio misterioso, al que la tradición llama Al-Jidr: Moisés no entiende sus actos extraños hasta que el sabio le explica sus razones, una lección sobre la paciencia y los límites del propio saber. Y la de Dhul-Qarnayn, un rey justo que viaja de oriente a occidente y levanta una muralla para proteger a un pueblo. Muchos musulmanes recitan esta sura los viernes.' },
        [
          Q('¿Qué hicieron los jóvenes de la caverna, según la sura 18?', 'Dormir unos trescientos años', 'Refugiados de sus perseguidores.', 'Construir una ciudad', 'Navegar por el mar', 'Pintar la cueva'),
          Q('¿Qué aprende Moisés del sabio misterioso (Al-Jidr)?', 'Paciencia y que su propio saber tiene límites', 'No entendía sus actos al principio.', 'A luchar', 'A pescar', 'Nada'),
          Q('¿Qué le pasa al dueño de los dos jardines?', 'Pierde todo por su orgullo', 'Se creía dueño de todo.', 'Gana un premio', 'Se casa', 'Nada'),
          Q('¿Qué día recitan muchos musulmanes la sura de la Caverna?', 'El viernes', 'El día de la oración comunitaria.', 'El lunes', 'El domingo', 'Nunca'),
          Q('Según 18:109, ¿qué se agotaría antes que las palabras de Dios?', 'El mar, si fuera tinta', 'Una imagen de lo inagotable.', 'El sol', 'Los árboles', 'Nada'),
          Q('¿Qué levanta Dhul-Qarnayn para proteger a un pueblo?', 'Una muralla', 'Un rey justo y viajero.', 'Un templo', 'Un puente', 'Una torre'),
        ]),
      st('rahman', 'Sura del Misericordioso (Ar-Rahmán)', 'Ar-Rahmán', 'Sura 55 · 78 aleyas', '«La novia del Corán»', 'flower',
        'Esta estación es un canto a la creación: el sol y la luna, los dos mares, los frutos y las flores. Una pregunta se repite como un estribillo: ¿cuál de las gracias de vuestro Señor negaréis? ¿La escuchamos?',
        'Has comprendido la sura del Misericordioso. La creación entera es un regalo, y la justicia es una balanza que no hay que alterar.',
        { name: 'El canto de la misericordia', text: 'La sura 55 lleva el nombre de Ar-Rahmán, el Misericordioso, uno de los nombres de Dios en el islam. Es un gran poema sobre la creación: el sol y la luna que siguen su cálculo, las plantas y los árboles, los dos mares que no se mezclan, las perlas y el coral, los jardines con frutos y fuentes. Un estribillo se repite treinta y una veces: «¿Cuál de las gracias de vuestro Señor negaréis?». También habla de la justicia: Dios estableció la balanza, «no alteréis la balanza». Por su belleza, una tradición la llama «la novia del Corán». Es una de las suras más recitadas en voz alta.' },
        [
          Q('¿Qué significa «Ar-Rahmán»?', 'El Misericordioso', 'Uno de los nombres de Dios.', 'El Guerrero', 'El Desierto', 'El Rey de Egipto'),
          Q('¿Qué pregunta se repite como estribillo en la sura 55?', '«¿Cuál de las gracias de vuestro Señor negaréis?»', 'Treinta y una veces.', '«¿Quién eres?»', '«¿Dónde está el mar?»', '«¿Qué hora es?»'),
          Q('¿Cuántas veces se repite el estribillo?', 'Treinta y una', 'Como un canto.', 'Una', 'Mil', 'Siete'),
          Q('¿Cómo llama una tradición a la sura de Ar-Rahmán?', 'La novia del Corán', 'Por su belleza.', 'La espada del Corán', 'La madre del desierto', 'El rey de las suras'),
          Q('¿Qué pide la sura sobre la balanza?', 'No alterarla: ser justos', 'Dios estableció la balanza.', 'Romperla', 'Venderla', 'Esconderla'),
          Q('¿De qué habla sobre todo la sura de Ar-Rahmán?', 'De las maravillas de la creación', 'Sol, luna, mares, frutos y jardines.', 'De batallas', 'De leyes de comercio', 'De reyes'),
        ]),
      st('mushaf', 'El Libro reunido (el Mushaf)', 'El Mushaf', '114 suras', 'Cómo se escribió y se transmitió el Corán', 'lectern',
        'Esta última estación cuenta cómo las palabras recitadas durante veintitrés años se convirtieron en un libro: quién las memorizó, quién las escribió y cómo se reunieron. ¿Recorres conmigo el último tramo?',
        'Has recorrido todo el jardín. El Corán se ha transmitido a la vez de memoria y por escrito: millones de personas en el mundo lo saben entero de memoria.',
        { name: 'Cómo se reunió el Corán', text: 'Según la tradición islámica, mientras duró la revelación muchos compañeros del Profeta memorizaban los versículos y algunos los escribían en hojas de palmera, piedras planas, huesos y pergamino. Tras la muerte de Mahoma, en el año 632, el primer califa, Abu Bakr, encargó a Zayd ibn Thabit reunir todos los fragmentos. Hacia el año 650, el califa Uzmán hizo preparar una copia oficial y envió ejemplares a las grandes ciudades. El Corán tiene 114 suras y unas 6.236 aleyas, ordenadas aproximadamente de la más larga a la más corta, con la Fátiha al principio. Hay suras de La Meca y suras de Medina. Algunos de los manuscritos más antiguos que se conservan, como el de Birmingham, son del siglo VII. Para los musulmanes, las traducciones son interpretaciones: el Corán, en sentido estricto, es el texto árabe.' },
        [
          Q('¿Cuántas suras tiene el Corán?', '114', 'Con unas 6.236 aleyas.', '7', '150', '1.000'),
          Q('¿En qué orden están, aproximadamente, las suras?', 'De la más larga a la más corta, con la Fátiha al principio', 'No por orden de revelación.', 'Por orden alfabético', 'Por fechas exactas', 'Al azar'),
          Q('¿Qué califa hizo preparar la copia oficial del Corán, hacia el año 650?', 'Uzmán', 'Y la envió a las grandes ciudades.', 'Harún al-Rashid', 'Saladino', 'Solimán'),
          Q('¿A quién encargó Abu Bakr reunir los fragmentos del Corán?', 'A Zayd ibn Thabit', 'Según la tradición.', 'A Avicena', 'A Rumi', 'A Ibn Jaldún'),
          Q('¿Cómo se llama quien sabe el Corán entero de memoria?', 'Hafiz', 'Millones en el mundo.', 'Califa', 'Visir', 'Sultán'),
          Q('Para los musulmanes, ¿qué son las traducciones del Corán?', 'Interpretaciones; el Corán es el texto árabe', 'Por eso se recita en árabe.', 'Lo mismo que el original', 'Libros prohibidos', 'Poemas inventados'),
          Q('¿Qué significa «Corán»?', 'La recitación', 'La primera palabra revelada fue «¡Lee!».', 'El jardín', 'La espada', 'El camino'),
          Q('¿Qué sura se recita en cada oración?', 'La Fátiha', 'La que abre.', 'La de la Caverna', 'La de José', 'La de María'),
          Q('¿Qué sura llama a su historia «el más bello de los relatos»?', 'La de José (Yusuf)', 'Sura 12.', 'La de María', 'La del Misericordioso', 'La de la Caverna'),
          Q('¿Quién es la única mujer nombrada en el Corán?', 'María (Maryam)', 'La madre de Jesús.', 'Eva', 'Sara', 'Ninguna'),
          Q('¿Qué sura cuenta la historia de los jóvenes dormidos?', 'La de la Caverna (Al-Kahf)', 'Sura 18.', 'La Fátiha', 'La de José', 'La de María'),
          Q('¿Qué sura repite «¿Cuál de las gracias de vuestro Señor negaréis?»?', 'Ar-Rahmán', 'Sura 55.', 'La Fátiha', 'La de la Caverna', 'La de José'),
        ], { boss: true, final: false }),
    ],
  });
}

Object.assign(LESSONS, {
  iqra: [
    'Hacia el año seiscientos diez, en La Meca, vivía un comerciante llamado Mahoma, conocido por su honradez. Solía retirarse a meditar en una cueva del monte Hira, sobre la ciudad.',
    'Según la tradición islámica, una noche del mes de Ramadán se le presentó el ángel Gabriel, Yibril, y le dijo: ¡Lee! Él respondió que no sabía leer. El ángel repitió la orden tres veces.',
    'Entonces llegaron las primeras palabras del Corán: ¡Lee en el nombre de tu Señor, que ha creado! ¡Lee! Tu Señor es el Más Generoso, que enseñó por medio del cálamo, que enseñó al ser humano lo que no sabía.',
    'Asustado, volvió a casa, y su esposa Jadiya lo tranquilizó y fue la primera en creer en su mensaje. La revelación continuó durante unos veintitrés años, en La Meca y después en Medina.',
    'La palabra Corán significa la recitación. Para los musulmanes, es la palabra de Dios en lengua árabe. Una pregunta para ti: ¿por qué crees que la primera palabra fue precisamente lee?',
  ],
  fatiha: [
    'La primera sura del Corán se llama Al-Fátiha, la que abre. Tiene solo siete aleyas, es decir, siete versículos.',
    'Empieza con la basmala, la fórmula que abre casi todas las suras: En el nombre de Dios, el Compasivo, el Misericordioso.',
    'Después alaba a Dios, Señor de los mundos, y lo llama Soberano del Día del Juicio. A ti solo adoramos, dice, y a ti solo pedimos ayuda.',
    'Termina con una petición: Guíanos por el camino recto. Los musulmanes la recitan en cada parte de sus cinco oraciones diarias: al menos diecisiete veces al día.',
    'Por eso se la llama la madre del Libro: resume su mensaje en pocas palabras. Una pregunta para ti: ¿qué significa para ti seguir un camino recto?',
  ],
  yusuf: [
    'La sura doce cuenta, de principio a fin, la historia de José, Yusuf, hijo de Jacob. El Corán la presenta como el más bello de los relatos.',
    'De niño, José soñó que once estrellas, el sol y la luna se inclinaban ante él. Sus hermanos, celosos, lo arrojaron a un pozo, y unos viajeros lo vendieron como esclavo en Egipto.',
    'En Egipto resistió la tentación y fue encarcelado injustamente. En la cárcel interpretó sueños, y después los del rey: siete vacas gordas y siete flacas anunciaban años de abundancia y de hambre.',
    'José administró Egipto y salvó al pueblo del hambre. Cuando sus hermanos llegaron a pedir trigo, los reconoció y los perdonó. Al final se reunió con su padre, que había esperado con paciencia hermosa.',
    'La misma historia está en el Génesis de la Biblia, con algunas diferencias. Una pregunta para ti: ¿es posible perdonar a quien te ha hecho mucho daño?',
  ],
  maryam: [
    'La sura diecinueve lleva el nombre de María, Maryam. Es la única mujer a la que el Corán llama por su nombre, y aparece en él más veces que en todo el Nuevo Testamento.',
    'Empieza con Zacarías, ya anciano, que pide un hijo a Dios. Recibe la noticia del nacimiento de Juan, Yahya, al que los cristianos llaman Juan el Bautista.',
    'Después cuenta cómo María, retirada en oración, recibe el anuncio de que tendrá un hijo. Da a luz a Jesús, Isa, junto a una palmera que le ofrece dátiles, mientras a sus pies brota un arroyo.',
    'Para el islam, Jesús es uno de los más grandes profetas y el Mesías, nacido de una virgen; pero no es Dios ni hijo de Dios. Es una diferencia importante con el cristianismo, que cree que Jesús es el Hijo de Dios.',
    'María es para los musulmanes un modelo de fe y de pureza. Una pregunta para ti: ¿qué personajes comparten la Biblia y el Corán, y por qué crees que ocurre?',
  ],
  kahf: [
    'La sura dieciocho, la de la Caverna, reúne cuatro historias. Muchos musulmanes la recitan los viernes.',
    'La primera cuenta cómo unos jóvenes creyentes, perseguidos, se refugiaron en una cueva con su perro y durmieron unos trescientos años. Al despertar, el mundo había cambiado.',
    'La segunda habla de un hombre con dos jardines espléndidos que se creía dueño de todo y despreciaba a su vecino pobre. Lo perdió todo por su orgullo.',
    'La tercera cuenta el viaje de Moisés con un sabio misterioso, al que la tradición llama Al-Jidr. Moisés no entiende sus actos extraños, hasta que el sabio le explica sus razones. La cuarta, la de Dhul-Qarnayn, un rey justo que viaja hasta los confines de la tierra.',
    'La sura dice que si el mar fuera tinta para escribir las palabras de Dios, se agotaría antes que ellas. Una pregunta para ti: ¿qué cosas no puedes entender todavía, aunque algún día quizá sí?',
  ],
  rahman: [
    'La sura cincuenta y cinco lleva el nombre de Ar-Rahmán, el Misericordioso, uno de los nombres de Dios. Empieza así: el Misericordioso enseñó el Corán, creó al ser humano y le enseñó a expresarse.',
    'Es un gran canto a la creación: el sol y la luna siguen su cálculo, las plantas y los árboles se inclinan, los dos mares se encuentran sin mezclarse, y de ellos salen perlas y coral.',
    'Habla también de la justicia: Dios elevó el cielo y estableció la balanza. No alteréis la balanza: pesad con equidad.',
    'Treinta y una veces se repite un estribillo: ¿cuál de las gracias de vuestro Señor negaréis? Por su belleza, una tradición la llama la novia del Corán.',
    'Una pregunta para ti: ¿qué regalo de la naturaleza te parece más maravilloso, y cómo podrías cuidarlo?',
  ],
  mushaf: [
    'El Corán fue revelado poco a poco, durante unos veintitrés años. Muchos compañeros del Profeta memorizaban cada versículo, y algunos los escribían en hojas de palmera, piedras planas, huesos y pergamino.',
    'Según la tradición, tras la muerte de Mahoma en el año seiscientos treinta y dos, el primer califa, Abu Bakr, encargó a Zayd ibn Thabit reunir todos los fragmentos en un solo libro.',
    'Hacia el año seiscientos cincuenta, el califa Uzmán hizo preparar una copia oficial y envió ejemplares a las grandes ciudades. A ese libro reunido se le llama Mushaf.',
    'El Corán tiene ciento catorce suras y unas seis mil doscientas aleyas, ordenadas más o menos de la más larga a la más corta, con la Fátiha al principio. Algunos de los manuscritos más antiguos que se conservan, como el de Birmingham, son del siglo séptimo.',
    'Hoy millones de personas, llamadas hafiz, lo saben entero de memoria. Para los musulmanes, las traducciones son interpretaciones: el Corán es el texto árabe. Una pregunta para ti: ¿qué diferencia hay entre aprender algo de memoria y comprenderlo?',
  ],
});

Object.assign(FRASES, {
  iqra: [['¡Lee en el nombre de tu Señor, que ha creado!', 'Corán 96:1'], ['Tu Señor es el Más Generoso, que enseñó por medio del cálamo.', 'Corán 96:3-4']],
  fatiha: [['En el nombre de Dios, el Compasivo, el Misericordioso.', 'Corán 1:1'], ['Guíanos por el camino recto.', 'Corán 1:6']],
  yusuf: [['Te contamos el más bello de los relatos.', 'Corán 12:3'], ['Paciencia hermosa.', 'Corán 12:18']],
  maryam: [['Sacude hacia ti el tronco de la palmera y caerán sobre ti dátiles frescos.', 'Corán 19:25']],
  kahf: [['Si el mar fuera tinta para las palabras de mi Señor, se agotaría el mar antes que las palabras de mi Señor.', 'Corán 18:109']],
  rahman: [['¿Cuál de las gracias de vuestro Señor negaréis?', 'Corán 55:13'], ['No alteréis la balanza.', 'Corán 55:8']],
  mushaf: [['No cabe coacción en la religión.', 'Corán 2:256'], ['Os hemos hecho pueblos y tribus para que os conozcáis unos a otros.', 'Corán 49:13']],
});
