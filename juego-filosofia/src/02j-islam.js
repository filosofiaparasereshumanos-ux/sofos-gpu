// ============================================================================
//  XVII · EL ISLAM CLÁSICO: lugares, ciudadanos, encargos, anécdotas y libro
// ============================================================================
POIS.push([
  wpoi(0, 'casasabiduria', 'La Casa de la Sabiduría', 'En Bagdad, los califas abasíes reunieron en la Casa de la Sabiduría a traductores y sabios de muchas religiones y pueblos. Allí se tradujeron al árabe Platón, Aristóteles, Euclides, Galeno y los matemáticos de la India. Era biblioteca, escuela y observatorio a la vez.',
    'Se cuenta que el califa al-Mamún pagaba a algunos traductores el peso en oro de los libros que traducían.',
    { q: '¿Qué se hacía sobre todo en la Casa de la Sabiduría?', a: ['Traducir y estudiar obras de ciencia y filosofía de muchos pueblos', 'Entrenar soldados', 'Acuñar monedas', 'Guardar tesoros del califa'], e: 'Así se conservó buena parte del saber griego.' }),
  wpoi(1, 'papel', 'El taller de papel', 'Hacia el año 751, el papel, inventado en China, llegó a Samarcanda y luego a Bagdad, donde se abrieron grandes talleres. El papel era mucho más barato que el pergamino, y gracias a él se multiplicaron los libros, las bibliotecas y las librerías del mundo islámico.',
    'En Bagdad había una calle entera de libreros, el Suq al-Warraqin, el mercado de los copistas.',
    { q: '¿De dónde llegó el papel al mundo islámico?', a: ['De China', 'De Egipto', 'De Grecia', 'De Roma'], e: 'Pasó por Samarcanda a mediados del siglo VIII.' }),
  wpoi(2, 'algebra', 'El aula de al-Juarismi', 'Aquí enseñaba al-Juarismi, matemático de la Casa de la Sabiduría. Escribió un libro sobre cómo resolver ecuaciones, y de una palabra de su título, al-yabr, viene «álgebra». De su propio nombre viene la palabra «algoritmo». También difundió las cifras que hoy usamos, nacidas en la India.',
    'Las cifras 0 al 9 llegaron a Europa desde el mundo árabe, por eso aún las llamamos números arábigos.',
    { q: '¿Qué palabra viene del nombre de al-Juarismi?', a: ['Algoritmo', 'Astronomía', 'Alfabeto', 'Alquimia'], e: 'Y de su libro viene «álgebra».' }),
  wpoi(3, 'bimaristan', 'El hospital de Bagdad', 'En el mundo islámico se construyeron grandes hospitales, los bimaristanes, abiertos a ricos y pobres, hombres y mujeres. Tenían salas separadas por enfermedades, farmacias, bibliotecas y médicos que enseñaban a sus alumnos junto a los enfermos.',
    'Algunos hospitales daban a los pacientes, al salir, algo de dinero para que pudieran descansar antes de volver a trabajar.',
    { q: '¿Qué tenían de especial los bimaristanes?', a: ['Atendían a todos, ricos y pobres, y enseñaban medicina', 'Solo atendían al califa', 'Eran templos sin médicos', 'Cobraban fortunas'], e: 'Fueron modelos de hospital durante siglos.' }),
  wpoi(4, 'milnoches', 'El patio de las mil y una noches', 'En los patios de Bagdad, los cuentacuentos narraban historias que acabaron reunidas en Las mil y una noches: Sherezade cuenta cada noche un relato al sultán y lo deja sin terminar, para salvar su vida. Simbad, Aladino y Alí Babá vienen de esta tradición.',
    'Sherezade es una de las grandes figuras de la literatura: una mujer que vence la violencia con la inteligencia y la palabra.',
    { q: '¿Por qué cuenta Sherezade historias cada noche?', a: ['Para salvar su vida dejando el relato sin terminar', 'Para ganar un concurso', 'Para dormir al califa por aburrimiento', 'Para enseñar matemáticas'], e: 'La palabra y la inteligencia vencen a la violencia.' }),
]);

NPCS.push([
  wnpc(0, 'traductor', 'Hunayn', 'traductor de la Casa de la Sabiduría', sk(0xf2ece0, 0x2a4a6a, 0xb8875f, 0x1a1410, { beard: 0x1a1410, acc: 'book' }), [
    'Traduzco del griego al siriaco y al árabe. Soy cristiano, y trabajo junto a musulmanes, judíos y persas. Aquí lo que importa es el saber, no de dónde vienes.',
    'Cuando traduzco, comparo varios manuscritos del mismo libro para corregir los errores de los copistas. Una mala traducción puede cambiar una idea entera.',
    'He traducido a Galeno, el médico griego, y también a Platón. Gracias a nuestras traducciones, siglos después Europa volverá a leer a Aristóteles, traducido del árabe al latín.',
  ]),
  wnpc(1, 'astrolabista', 'Mariam', 'constructora de astrolabios', sk(0xe8dcc4, 0x8a3a5a, 0xb8875f, 0x1a1410, { hat: 'longhair', acc: 'lens' }), [
    'Construyo astrolabios, instrumentos de latón para medir la altura de las estrellas, saber la hora y orientarse. Aprendí el oficio de mi padre, en Alepo.',
    'Con un astrolabio se puede calcular la dirección de La Meca, la hora de la oración o la posición de un barco. Es como tener el cielo en la mano.',
    'Mis astrolabios son tan precisos que el emir de Alepo me los encarga. Algún día pondrán mi nombre a un asteroide, ya verás.',
  ], true),
  wnpc(2, 'librero-bagdad', 'Yusuf', 'librero del mercado de los copistas', sk(0xd8c8a8, 0x4a6a3a, 0xa8754f, 0x1a1410, { beard: 0x1a1410, hat: 'turban', acc: 'scroll' }), [
    'Vendo libros en la calle de los copistas. Gracias al papel, un libro cuesta mucho menos que antes, y hasta un artesano puede comprar uno.',
    'En mi tienda los sabios discuten durante horas. Ayer, un médico y un filósofo se pelearon por el alma: ¿está en el cuerpo, o el cuerpo está en el alma?',
    'Copio también Las mil y una noches para los que prefieren cuentos. Créeme: Sherezade vende más que Aristóteles.',
  ]),
]);

Object.assign(QUESTS, {
  alkindi: { text: 'Visita la Casa de la Sabiduría y escucha a Hunayn, el traductor. Luego dime qué debemos hacer con la verdad que viene de pueblos lejanos.', needs: { pois: ['casasabiduria'], npcs: ['traductor'] },
    riddle: { q: 'Según Al-Kindi, ¿qué hay que hacer con la verdad que viene de otros pueblos?', a: ['Reconocerla y adquirirla, venga de donde venga', 'Rechazarla por ser extranjera', 'Esconderla', 'Cambiarla para que parezca propia'] } },
  rabia: { text: 'Pasa por el patio de las mil y una noches y escucha a Yusuf, el librero. Luego dime por qué quería yo quemar el paraíso y apagar el infierno.', needs: { pois: ['milnoches'], npcs: ['librero-bagdad'] },
    riddle: { q: '¿Por qué quería Rabia quemar el paraíso y apagar el infierno?', a: ['Para que se amara a Dios por sí mismo, no por premio ni por miedo', 'Para castigar a los malos', 'Para asustar a la gente', 'Para construir un nuevo templo'] } },
  alfarabi: { text: 'Visita el hospital de Bagdad y escucha a Mariam, la constructora de astrolabios. Luego dime qué busca la ciudad virtuosa.', needs: { pois: ['bimaristan'], npcs: ['astrolabista'] },
    riddle: { q: '¿Qué busca la ciudad virtuosa de Al-Farabi?', a: ['Que sus habitantes alcancen juntos la felicidad verdadera', 'Conquistar el mundo', 'Acumular oro', 'Que nadie piense'] } },
});

Object.assign(ANECDOTES, {
  alkindi: ['Un rival en la corte convenció al califa de que me confiscara mi biblioteca. Más tarde me la devolvieron entera: hasta mis enemigos sabían que esos libros valían más que el oro.', 'Escribí un pequeño tratado para consolar a quien está triste. Decía: no podemos evitar perder cosas, pero sí podemos elegir no aferrarnos a ellas.'],
  rabia: ['Un famoso predicador me pidió matrimonio. Le respondí que mi corazón ya estaba ocupado y que no tenía tiempo para pensar en otra cosa que en Dios.', 'Un día de primavera, alguien me dijo: sal a contemplar las maravillas de la creación. Respondí: mejor entra tú a contemplar al Creador.'],
  alfarabi: ['Se cuenta que, en la corte del emir de Alepo, toqué el laúd: primero todos rieron, luego lloraron, y al final se quedaron dormidos. Entonces me fui sin despedirme.', 'Vivía con muy poco: dicen que de noche estudiaba a la luz de los faroles de los guardias porque no tenía aceite para mi lámpara.'],
  avicena: ['Cuando no entendía un problema, iba a la mezquita a rezar y luego seguía estudiando de noche, bebiendo algo para no dormirme. Muchas soluciones me llegaron en sueños.', 'A los dieciocho años curé al sultán de Bujará, y como premio me dejó entrar en su biblioteca, llena de libros que nadie había leído. Dije que allí aprendí todo lo que sé.'],
});

BOOKS.push([
  { id: 'ciudadvirtuosa', author: 'alfarabi', by: 'Al-Farabi', title: 'La ciudad virtuosa', year: 'c. 942', kind: 'tratado', at: B2[0],
    parts: [
      { t: 'Un libro sobre la felicidad', x: 'Al-Farabi escribió La ciudad virtuosa al final de su vida, en Damasco. Empieza hablando de Dios, del universo y del alma humana, porque para saber cómo vivir juntos hay que saber qué es el ser humano.' },
      { t: 'Necesitamos a los demás', x: 'Nadie puede alcanzar solo todo lo que necesita: necesitamos una comunidad. Por eso los seres humanos viven en ciudades. Pero no toda ciudad es buena: solo lo es la que busca la felicidad verdadera de todos.' },
      { t: 'La ciudad como un cuerpo', x: 'Al-Farabi compara la ciudad con un cuerpo sano: cada parte cumple su función y el corazón guía al resto. El gobernante ideal es sabio y virtuoso, como el filósofo-rey de Platón, y debe ayudar a cada uno a desarrollar lo mejor de sí.' },
      { t: 'Las ciudades que se equivocan', x: 'Hay ciudades ignorantes, que confunden la felicidad con la riqueza, el placer o el poder; ciudades que saben lo que es el bien pero no lo practican; y ciudades que se pierden. Al-Farabi invita a cada lector a preguntarse en qué ciudad vive.' },
    ],
    quote: 'El ser humano no puede alcanzar la perfección por sí solo: necesita de muchos otros, que le ayuden en lo que le falta.',
    q: { q: 'Según Al-Farabi, ¿por qué los seres humanos viven en ciudades?', a: ['Porque nadie puede alcanzar solo todo lo que necesita', 'Porque se lo ordena el rey', 'Por miedo a los animales', 'Por casualidad'], e: 'La comunidad es necesaria para la felicidad.' } },
]);
BOOKS[BOOKS.length - 1].forEach((b) => { b.q.book = b.title; });
