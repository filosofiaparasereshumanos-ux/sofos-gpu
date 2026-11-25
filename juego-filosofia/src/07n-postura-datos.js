// ============================================================================
//  «DEBATE TÚ»: el jugador discute con un pensador eligiendo sus argumentos.
//  Cada ronda: el pensador afirma algo; el jugador elige entre tres respuestas
//  (un argumento sólido, uno flojo y una falacia). El pensador responde a lo que
//  elegiste y, al final, juzga la solidez de tu postura.
//  Y «EL LIBRO DE LA RAZÓN»: la historia que une las épocas y termina en el
//  debate contra el Gran Sofista.
//  (datos sin dependencias: también los leen las herramientas de voz)
// ============================================================================
const PO = (k, t, r, why, f) => ({ k, t, r, why, f: f || '' });
const POSTURAS = [
  { id: 'nietzsche', q: '¿Necesitamos valores que valgan para todos?', rounds: [
    { say: 'Dios ha muerto, y con él cayeron los viejos valores. Ahora cada uno debe crear los suyos. ¿Qué me respondes?', opts: [
      PO('bueno', 'Si cada uno crea sus valores, ¿con qué criterio dices que unos son más nobles que otros? Tú mismo hablas de lo noble y lo bajo: eso ya es un criterio común.', 'Astuto. Uso palabras como «noble», sí. Pero lo noble no es una ley escrita en el cielo: es lo que afirma la vida. Aun así, me obligas a precisar.', 'Señalas una tensión interna: incluso quien niega los valores comunes usa algún criterio para juzgar.'),
      PO('flojo', 'Pero mucha gente sigue creyendo en Dios, así que no ha muerto.', 'No hablo de cuántos van al templo. Hablo de que nuestra cultura ya no organiza su vida en torno a Dios. Contar creyentes no responde a eso.', 'Confundes un dato sobre cuántos creen con la tesis cultural de Nietzsche: no respondes a lo que dijo.'),
      PO('falacia', 'Lo dices porque estabas enfermo y amargado.', 'Estuve enfermo, sí. ¿Y eso hace falsa mi idea? Juzga lo que digo, no mis dolores de cabeza.', 'Criticas a quien habla en vez de a su argumento.', 'Ataque a la persona'),
    ] },
    { say: 'La moral de la compasión nació de los débiles, que convirtieron su impotencia en virtud. La bondad suele ser resentimiento disfrazado.', opts: [
      PO('bueno', 'Que una idea tenga un origen dudoso no la hace falsa. Aunque la compasión naciera entre los débiles, puede seguir siendo valiosa: confundes el origen de un valor con su validez.', 'Me acusas de confundir el origen con el valor. Es una buena objeción. Yo creo que conocer el origen nos enseña a sospechar. Pero admito que sospechar no es refutar.', 'Distingues entre el origen de una idea y su validez: es la objeción clásica a la genealogía de Nietzsche.'),
      PO('flojo', 'A mí me gusta ayudar a los demás, así que la compasión es buena.', 'Que te guste no demuestra nada. A otros les gusta mandar. Necesito razones, no gustos.', 'Usas tu gusto personal como prueba: no es un argumento que el otro pueda aceptar.'),
      PO('falacia', 'Todo el mundo sabe que la compasión es buena; si lo niegas, estás solo contra todos.', '¡Que la mayoría lo crea es justamente lo que me hace sospechar! El rebaño siempre prefirió lo cómodo.', 'Que muchos crean algo no lo hace verdadero.', 'Apelación a la mayoría'),
    ] },
    { say: 'Lo que no me mata me hace más fuerte. El sufrimiento no hay que eliminarlo: hay que usarlo para crecer.', opts: [
      PO('bueno', 'Algunos sufrimientos hacen crecer, pero otros destruyen: un niño que pasa hambre no se vuelve más fuerte. Una regla general sobre el dolor olvida esos casos.', 'Cierto, no todo dolor engrandece. Hablo de quien tiene fuerzas para transformarlo. Me obligas a reconocer que mi frase no es una ley para todos.', 'Das un contraejemplo concreto que limita una afirmación demasiado general.'),
      PO('flojo', 'Sufrir es malo, y punto.', '«Y punto» no es un argumento. ¿Nunca aprendiste nada de una derrota?', 'Afirmas sin dar razones: cerrar la discusión no es responder.'),
      PO('falacia', 'Si aceptamos tu idea, mañana justificaremos la tortura, y después cualquier crueldad.', 'Saltas de mi frase a la tortura sin pasos intermedios. Yo no dije que haya que causar dolor a nadie.', 'Supones una cadena de consecuencias extremas sin justificarla.', 'Pendiente resbaladiza'),
    ] },
    { say: 'Mi última prueba: ¿vivirías tu vida otra vez, igual, infinitas veces? Si dices que sí, amas la vida y no necesitas otro mundo.', opts: [
      PO('bueno', 'Puedo amar la vida y aun así querer cambiar lo injusto. Decirle sí a la vida no me obliga a decirle sí a todo lo que pasa en ella. Amar algo también es querer mejorarlo.', 'Quieres afirmar la vida sin aceptar cada injusticia. Es una forma de amor más exigente de lo que pensaba. Me haces dudar, y eso me gusta.', 'Separas afirmar la vida de aceptar pasivamente lo injusto: una distinción fina.'),
      PO('flojo', 'No sé, la verdad es que es una pregunta muy difícil.', 'Lo es. Pero un filósofo no se esconde detrás de la dificultad.', 'Evitas la pregunta en lugar de responderla.'),
      PO('falacia', 'Como nadie puede demostrar que la vida se repite, tu idea es falsa.', 'No dije que se repita de verdad. Es una prueba para el pensamiento: ¿cómo vivirías si así fuera?', 'Que algo no se pueda demostrar no lo hace falso; además, el eterno retorno es un experimento mental.', 'Apelación a la ignorancia'),
    ] },
  ], fin: { alto: 'Me has dado batalla de verdad. Usaste mis propias palabras contra mí, y eso es filosofar a martillazos. Quizás no estamos tan lejos.', medio: 'Algunas de tus razones me hicieron pensar; otras eran débiles. Afila tus argumentos: un martillo sin filo solo hace ruido.', bajo: 'Te escondiste detrás de lo que dicen todos y de ataques fáciles. Piensa por ti mismo: ese es el primer paso.' } },

  { id: 'socrates', q: '¿Qué es la justicia?', rounds: [
    { say: 'Dime, amigo: ¿qué es para ti la justicia?', opts: [
      PO('bueno', 'Creo que la justicia es dar a cada uno lo que le corresponde. Pero sé que tendré que explicar qué le corresponde a cada uno.', '¡Me gusta que ya veas la dificultad! Entonces dime: ¿le corresponde a un amigo que te dejó guardado un cuchillo recuperarlo si vuelve furioso a reclamarlo?', 'Das una definición y reconoces lo que falta precisar: humildad socrática.'),
      PO('flojo', 'La justicia es cuando las cosas están bien.', '¿Y qué es que las cosas estén bien? Has cambiado una palabra por otra, pero sigo sin saber qué es.', 'Definición vacía: no explica nada nuevo.'),
      PO('falacia', 'Es lo que dicen las leyes, porque si son leyes, serán justas.', '¿Nunca ha habido una ley injusta? Si las hubo, la justicia no puede ser solo lo que dicen las leyes.', 'Das por supuesto que las leyes son justas, que es justamente lo que había que demostrar.', 'Petición de principio'),
    ] },
    { say: 'Vayamos más lejos. ¿Es más feliz el injusto que se sale con la suya, o el justo que sufre?', opts: [
      PO('bueno', 'El injusto puede tener más cosas, pero vive con miedo a ser descubierto y en guerra consigo mismo. La felicidad no se mide solo por lo que se tiene.', 'Hablas como quien ha mirado su propia alma. Un alma desordenada es como una ciudad en guerra civil. Sigamos.', 'Distingues entre tener bienes y estar en paz interior, como Sócrates.'),
      PO('flojo', 'El injusto, claro, porque tiene más dinero.', '¿Y el dinero basta para ser feliz? ¿No conoces a ningún rico desdichado?', 'Reduces la felicidad al dinero sin justificarlo.'),
      PO('falacia', 'El justo, porque así nos lo enseñaron nuestros padres.', 'Respeto a tus padres. Pero si te hubieran enseñado lo contrario, ¿cambiaría la verdad?', 'Que te lo enseñaran no lo hace verdadero.', 'Apelación a la tradición'),
    ] },
    { say: 'Dime ahora: ¿alguien hace el mal sabiendo que es malo para él?', opts: [
      PO('bueno', 'A veces sabemos que algo está mal y lo hacemos igual, por debilidad o porque el deseo es muy fuerte. Saber no siempre basta para actuar bien.', 'Aristóteles, el discípulo de mi discípulo, dirá algo parecido. Yo creo que en ese momento el deseo nos nubla el saber. Pero tu objeción es seria y merece pensarse.', 'Planteas la debilidad de la voluntad, la objeción clásica a la idea de Sócrates.'),
      PO('flojo', 'Nadie hace nunca el mal.', '¿Nunca? Mira a tu alrededor. Lo que yo pregunto es si lo hacen sabiéndolo.', 'Exageras hasta negar lo evidente.'),
      PO('falacia', 'Los malos hacen el mal porque son malas personas.', 'Has dado una vuelta en círculo. ¿Y por qué son malas personas?', 'La conclusión ya está escondida en la premisa.', 'Razonamiento circular'),
    ] },
    { say: 'Me han condenado a muerte por hacer preguntas. ¿Debo huir de la cárcel, como me proponen mis amigos?', opts: [
      PO('bueno', 'Huir te salvaría la vida, pero contradiría lo que enseñaste: que es peor cometer una injusticia que sufrirla. Quizás tu muerte sea tu última lección.', 'Has entendido mi vida mejor que muchos de mis jueces. Una vida sin examen no merece ser vivida. Y tú, hoy, has examinado la tuya conmigo.', 'Relacionas la decisión con los principios que Sócrates defendía: coherencia.'),
      PO('flojo', 'Sí, huye: la vida es lo más importante.', '¿Lo más importante es vivir, o vivir bien? Si huyo, ¿qué pensarán los jóvenes a los que enseñé?', 'No tienes en cuenta los principios que están en juego.'),
      PO('falacia', 'Huye: todos lo harían en tu lugar.', 'Que todos lo hicieran no lo haría justo. Nunca me guié por lo que hacen todos.', 'Lo que haría la mayoría no decide lo que es justo.', 'Apelación a la mayoría'),
    ] },
  ], fin: { alto: 'Has preguntado y respondido con honradez. Yo solo sé que no sé nada, pero hoy sé un poco más gracias a ti.', medio: 'Has empezado a examinar tus ideas. Sigue: la sabiduría empieza por reconocer lo que no sabemos.', bajo: 'Respondiste deprisa, sin examinar. No te preocupes: todos empezamos así. La pregunta es el comienzo.' } },

  { id: 'kant', q: '¿Está mal mentir siempre?', rounds: [
    { say: 'Mentir está siempre mal. Si todos mintieran cuando les conviene, nadie creería a nadie, y la mentira misma sería imposible.', opts: [
      PO('bueno', 'Tu prueba funciona contra mentir por conveniencia. Pero ¿y una regla más precisa, como «mentir solo para salvar una vida inocente»? Esa sí podría valer para todos sin destruir la confianza.', 'Precisas la regla. Es la objeción más seria que me hacen. Temo que, si abrimos esa puerta, cada uno llame «salvar una vida» a lo que le convenga. Pero lo pensaré.', 'Reformulas la regla para que pase la prueba de universalidad: un uso inteligente del método de Kant.'),
      PO('flojo', 'Todo el mundo miente un poco, no pasa nada.', 'Que todos lo hagan no lo hace bueno. Hablo de lo que debemos hacer, no de lo que se hace.', 'Confundes lo que ocurre con lo que debería ocurrir.'),
      PO('falacia', 'Tú nunca saliste de tu ciudad: ¿qué sabrás de la vida real?', 'Es cierto que viajé poco. Pero la razón no necesita pasaporte. Responde a mi argumento.', 'Criticas su vida en lugar de su razonamiento.', 'Ataque a la persona'),
    ] },
    { say: 'Un asesino llama a tu puerta y te pregunta dónde está tu amigo. Aun así, no debes mentir.', opts: [
      PO('bueno', 'Si digo la verdad, uso a mi amigo como un medio para mantener mi pureza moral. Tu otra regla dice que las personas son fines: proteger su vida parece respetar más su dignidad.', 'Usas una fórmula de mi imperativo contra otra. Es un argumento elegante. Yo diría que no eres responsable de lo que haga el asesino, pero reconozco que el caso me incomoda.', 'Muestras una tensión entre dos formulaciones del imperativo categórico.'),
      PO('flojo', 'Le cerraría la puerta y ya está.', 'Callar no es mentir, en eso tienes razón. Pero no respondes a mi pregunta: ¿mentirías?', 'Esquivas el dilema en vez de afrontarlo.'),
      PO('falacia', 'Si no mientes, eres cómplice del asesinato, y entonces eres tan asesino como él.', 'No hay solo dos opciones: puedo callar, pedir ayuda, resistir. Me pones entre la mentira y el crimen como si no hubiera nada más.', 'Presentas solo dos opciones cuando hay más.', 'Falso dilema'),
    ] },
    { say: 'Lo que cuenta es la intención, no las consecuencias. Una buena voluntad es buena aunque fracase.', opts: [
      PO('bueno', 'La intención importa, pero una buena intención que ignora las consecuencias puede ser irresponsable. Quien quiere el bien también debe pensar en lo que producen sus actos.', 'Quieres unir intención y responsabilidad. Mill estaría contento. Yo insisto en que la buena voluntad es lo único bueno sin restricción, pero acepto que debemos prever lo que podamos.', 'Equilibras intención y consecuencias: un punto medio razonado.'),
      PO('flojo', 'Lo importante es que salga bien.', '¿Aunque para que salga bien tengas que engañar o usar a otros?', 'Afirmas sin matizar ni justificar.'),
      PO('falacia', 'Eso lo dice un filósofo alemán, y ya se sabe que los alemanes son muy estrictos.', 'Juzgas una idea por el país de quien la dice. Eso no es pensar, es prejuzgar.', 'Juzgas la idea por un prejuicio sobre su origen, no por sus razones.', 'Generalización apresurada'),
    ] },
    { say: 'Atrévete a pensar por ti mismo: eso es la Ilustración. ¿Qué has aprendido hoy?', opts: [
      PO('bueno', 'Que la regla de no mentir es muy fuerte, pero quizás necesita excepciones bien pensadas que también puedan valer para todos. Pensar por mí mismo es no aceptar ni tu regla ni mis excusas sin examinarlas.', 'Eso es exactamente lo que pido: que no me obedezcas a mí, sino a tu razón. Hoy has salido un poco de la minoría de edad.', 'Resumes el debate con matices y aplicas el ideal de la Ilustración.'),
      PO('flojo', 'Que mentir a veces está bien y a veces no.', '¿Y cuándo sí y cuándo no? Sin un criterio, eso es solo una frase.', 'Conclusión vaga, sin criterio.'),
      PO('falacia', 'Que tienes razón en todo, porque eres un gran filósofo.', '¡No! Si me das la razón solo por mi fama, no has entendido nada. Atrévete a servirte de tu propio entendimiento.', 'Dar la razón por la fama de alguien es lo contrario de pensar por uno mismo.', 'Apelación a la autoridad'),
    ] },
  ], fin: { alto: 'Has usado la razón con rigor y con valentía. Así se sale de la minoría de edad.', medio: 'Tu razón despierta, pero todavía se apoya en lo que se dice. Sigue ejercitándola.', bajo: 'Te apoyaste en la costumbre y en la autoridad. Atrévete a pensar por ti mismo.' } },

  { id: 'maquiavelo', q: '¿El fin justifica los medios?', rounds: [
    { say: 'Un gobernante que quiere ser bueno en todo, entre tantos que no lo son, acaba arruinado. Debe aprender a no ser bueno cuando haga falta.', opts: [
      PO('bueno', 'Si el gobernante puede mentir y usar la fuerza cuando quiera, ¿quién lo controla? Un poder sin límites morales suele acabar sirviendo solo a quien lo tiene.', 'Por eso prefiero las repúblicas, donde los ciudadanos vigilan. Has tocado algo que muchos olvidan de mí.', 'Planteas el problema de quién controla al poder.'),
      PO('flojo', 'Los gobernantes deberían ser buenos y ya está.', '«Deberían». Yo escribo sobre cómo son las cosas, no sobre cómo deberían ser.', 'Opones un deseo a una descripción realista sin argumentar.'),
      PO('falacia', 'Eres un hombre malvado: hasta tu apellido se usa como sinónimo de maldad.', 'Que mi nombre se use como insulto no responde a mi argumento.', 'Atacas su fama en vez de su razonamiento.', 'Ataque a la persona'),
    ] },
    { say: 'Es más seguro ser temido que amado, porque los hombres olvidan antes la muerte de su padre que la pérdida de su patrimonio.', opts: [
      PO('bueno', 'El miedo obliga a vigilar siempre, y basta un momento de debilidad para que todo caiga. El respeto ganado con justicia dura más que el miedo.', 'Yo también aconsejo no hacerse odiar: temido sí, odiado nunca. Pero reconozco que el respeto justo es una fortaleza mejor que cualquier muralla.', 'Muestras lo frágil que es un poder basado en el miedo.'),
      PO('flojo', 'Yo prefiero que me quieran.', 'Todos lo preferimos. La pregunta es qué es más seguro para gobernar.', 'Respondes con una preferencia, no con razones.'),
      PO('falacia', 'Si dejamos que los gobernantes den miedo, acabaremos en una dictadura terrible y se acabará el mundo.', 'Del miedo prudente al fin del mundo hay muchos pasos que te saltas.', 'Encadenas consecuencias extremas sin justificarlas.', 'Pendiente resbaladiza'),
    ] },
    { say: 'En las acciones de los gobernantes se mira el resultado. Si conserva el Estado, sus medios serán juzgados honrosos.', opts: [
      PO('bueno', 'Los medios cambian a quien los usa y a quien los sufre. Si se gobierna con mentiras, la gente aprende a mentir, y el Estado que se conserva ya no es el mismo.', 'Dices que los medios moldean el fin. Gandhi diría lo mismo. Es una idea más profunda de lo que parece.', 'Señalas que los medios forman parte del resultado.'),
      PO('flojo', 'Eso no es justo.', '¿Por qué no? Dame razones.', 'Afirmas sin explicar por qué.'),
      PO('falacia', 'Como algunos gobernantes que mintieron fueron derrocados, todos los que mientan lo serán.', 'Unos pocos casos no hacen una ley. Otros mintieron y gobernaron durante años.', 'Sacas una regla general de unos pocos casos.', 'Generalización apresurada'),
    ] },
    { say: 'La fortuna gobierna la mitad de nuestras acciones, y nos deja la otra mitad a nosotros. ¿Qué harías tú con tu mitad?', opts: [
      PO('bueno', 'La usaría para construir instituciones que no dependan de que el gobernante sea bueno o malo: leyes, contrapesos y ciudadanos que participen. Así no hace falta un príncipe sin escrúpulos.', 'Hablas como un buen republicano. Buenas leyes y buenas armas, decía yo; tú añades buenos ciudadanos. Me convences.', 'Propones una solución institucional, como el Maquiavelo que escribió sobre las repúblicas.'),
      PO('flojo', 'Esperaría a ver qué pasa.', 'Quien espera deja toda la partida a la fortuna. Y la fortuna favorece a los audaces.', 'Respuesta pasiva, sin ninguna propuesta.'),
      PO('falacia', 'Haría lo que diga el líder, porque él sabe más.', '¿Y si el líder se equivoca? Un pueblo que solo obedece es presa fácil.', 'Obedecer a alguien solo porque manda no es una razón.', 'Apelación a la autoridad'),
    ] },
  ], fin: { alto: 'Tienes la astucia del zorro y la firmeza del león, pero al servicio de la república. Serías un buen consejero.', medio: 'Ves algunas trampas del poder, pero otras se te escapan. Estudia la historia: es la mejor maestra.', bajo: 'Con tanta ingenuidad, cualquier príncipe te engañaría. Aprende cómo funciona el poder para no ser su víctima.' } },

  { id: 'descartes', q: '¿Podemos estar seguros de algo?', rounds: [
    { say: 'Los sentidos a veces nos engañan, y no es prudente fiarse del todo de quien nos ha engañado una vez. Por eso dudo de todo lo que veo.', opts: [
      PO('bueno', 'Para saber que los sentidos te engañaron, tuviste que usar los sentidos otra vez: viste que el palo en el agua era recto al sacarlo. El engaño se descubre con más experiencia, no sin ella.', 'Buena observación: corregimos unos sentidos con otros. Pero eso solo prueba que a veces aciertan. Yo busco algo que no falle nunca.', 'Muestras que el error de los sentidos se corrige con los propios sentidos.'),
      PO('flojo', 'Yo veo bien, a mí no me engañan.', '¿Nunca soñaste algo que parecía completamente real?', 'Niegas el problema sin argumentar.'),
      PO('falacia', 'Siempre se ha confiado en los sentidos, así que son fiables.', 'Que se haya creído siempre no lo hace cierto. Durante siglos se creyó que el Sol giraba alrededor de la Tierra.', 'Que algo se haya creído desde siempre no lo hace verdadero.', 'Apelación a la tradición'),
    ] },
    { say: 'Quizás todo es un sueño, o un genio maligno me engaña en todo. Pero si me engaña, yo existo: pienso, luego existo.', opts: [
      PO('bueno', 'Concedo que hay pensamiento. Pero ¿cómo sabes que ese «yo» es una sola cosa que dura, y no solo pensamientos que pasan? Del pensamiento se sigue que hay pensamiento, no necesariamente un yo.', 'Lichtenberg diría «se piensa», como se dice «llueve». Es una objeción aguda. Creo que el pensamiento necesita a alguien que piense, pero me obligas a defenderlo.', 'Cuestionas el paso del pensamiento a un «yo» que permanece.'),
      PO('flojo', 'Eso es obvio: todo el mundo sabe que existe.', 'Lo obvio es lo que más hay que examinar.', 'No discutes el argumento: lo das por evidente.'),
      PO('falacia', 'Si no puedes demostrar que el genio maligno no existe, entonces existe.', 'No dije que exista: es una hipótesis para dudar. Que no pueda refutarse no la hace verdadera.', 'Que algo no se pueda refutar no lo hace verdadero.', 'Apelación a la ignorancia'),
    ] },
    { say: 'Para salir de mí mismo necesito a Dios: un ser perfecto no me engañaría. Así recupero la confianza en el mundo.', opts: [
      PO('bueno', 'Usas tu razón para probar que Dios existe, y luego usas a Dios para confiar en tu razón. Es un círculo: das por segura la razón antes de haberla asegurado.', 'El famoso círculo: Arnauld me lo señaló en sus objeciones. Respondo que lo claro y distinto es seguro mientras lo miro, pero confieso que es el punto más discutido de mi obra.', 'Señalas el «círculo cartesiano».'),
      PO('flojo', 'Yo no creo en Dios, así que tu argumento no sirve.', 'Tu creencia no refuta mi razonamiento. Muéstrame dónde falla.', 'Rechazas el argumento sin examinarlo.'),
      PO('falacia', 'Si fueras tan listo, no necesitarías a Dios.', 'Mi inteligencia no tiene nada que ver con la validez del argumento.', 'Atacas a la persona en lugar de al razonamiento.', 'Ataque a la persona'),
    ] },
    { say: 'Divide cada dificultad en tantas partes como sea posible: ese es mi método. ¿Te sirve?', opts: [
      PO('bueno', 'Me sirve para problemas de matemáticas o de ciencia. Pero hay cosas, como una amistad o una obra de arte, que se pierden si las divido: hay que verlas enteras.', 'Pascal me diría que el corazón tiene razones que la razón no conoce. Quizás mi método no sirve para todo. Me haces pensar.', 'Reconoces la utilidad del método y señalas sus límites.'),
      PO('flojo', 'Sí, me gusta.', '¿Por qué te gusta? ¿Dónde lo usarías?', 'Aceptas sin pensar.'),
      PO('falacia', 'Si un método no sirve para todo, no sirve para nada.', '¿Un martillo no sirve porque no corta el pan? Cada herramienta tiene su uso.', 'O todo o nada: olvidas las posibilidades intermedias.', 'Falso dilema'),
    ] },
  ], fin: { alto: 'Has dudado con método y has encontrado grietas en mis cimientos. Eso es filosofía de verdad.', medio: 'Empiezas a dudar con orden. Sigue: la duda bien llevada es el camino a la certeza.', bajo: 'Aceptaste o rechazaste sin examinar. Prueba a dudar un poco más de tus certezas.' } },

  { id: 'sartre', q: '¿Somos totalmente libres?', rounds: [
    { say: 'El ser humano está condenado a ser libre. No hay una naturaleza humana que decida por ti: primero existes, y después te haces.', opts: [
      PO('bueno', 'Elijo, sí, pero no desde cero: nací en un cuerpo, una familia, un idioma y una época que no elegí. Mi libertad tiene un punto de partida.', 'Lo llamo la situación. No elegiste dónde naciste, pero sí qué haces con ello. Aun así, tienes razón: la libertad siempre está situada.', 'Introduces los límites de la situación, que el propio Sartre tuvo que reconocer.'),
      PO('flojo', 'No soy libre porque mis padres no me dejan salir.', 'Te prohíben salir, pero sigues eligiendo cómo responder a eso. La libertad no es hacer lo que quieras.', 'Confundes la libertad con tener permiso.'),
      PO('falacia', 'Eres libre de decir eso porque eres un escritor famoso.', 'Mi fama no cambia mi argumento. Respóndeme.', 'Atacas a la persona en lugar de su idea.', 'Ataque a la persona'),
    ] },
    { say: 'Decir «no tuve opción» es mala fe: es mentirse a uno mismo para no cargar con la responsabilidad.', opts: [
      PO('bueno', 'A veces es mala fe, pero otras es verdad: quien está enfermo, oprimido o amenazado tiene opciones muy reducidas. Llamar mala fe a todo eso es injusto con quien sufre.', 'Simone me dijo algo parecido: hay situaciones que oprimen de verdad. No toda limitación es una excusa. Aprendí de ella.', 'Distingues las excusas de las limitaciones reales; es la objeción de Simone de Beauvoir.'),
      PO('flojo', 'A veces no tengo ganas de elegir.', 'No elegir también es elegir.', 'No respondes al argumento.'),
      PO('falacia', 'Si fuéramos totalmente responsables, deberíamos ir a la cárcel por cualquier cosa.', 'Responsabilidad no es culpa ante un juez. Saltas a una conclusión absurda.', 'Llevas la idea a un extremo que no se sigue de ella.', 'Pendiente resbaladiza'),
    ] },
    { say: 'Al elegir, elijo para toda la humanidad: cada acto dice cómo creo que debería ser el ser humano.', opts: [
      PO('bueno', 'Eso da a cada elección un peso enorme, y puede paralizar. Quizás basta con preguntarse si lo que hago podría ser aceptado por los demás, sin cargar con toda la humanidad.', 'La angustia es el precio de esa responsabilidad. Pero sí, se parece a la prueba de Kant, que tanto discutí.', 'Relacionas la idea con la universalidad de Kant y señalas su peso.'),
      PO('flojo', 'Yo elijo solo para mí.', '¿Seguro? Tus actos enseñan a otros cómo se puede vivir.', 'Respondes sin argumentar.'),
      PO('falacia', 'Como somos millones de personas, ninguna elección individual importa.', 'Cada gota forma el río. Que seamos muchos no hace que tus actos no cuenten.', 'Lo que vale para el conjunto no anula el valor de cada parte.', 'Falacia de división'),
    ] },
    { say: 'El ser humano no es otra cosa que lo que hace. ¿Qué harás tú con tu libertad?', opts: [
      PO('bueno', 'Asumir que soy responsable de lo que hago con lo que me tocó, y ayudar a que otros tengan más opciones: mi libertad crece cuando crece la de los demás.', 'Hablas como Simone: querer la propia libertad es querer la de los otros. Es la mejor respuesta que podías darme.', 'Unes la libertad personal con el compromiso con la libertad de los demás.'),
      PO('flojo', 'Lo que me apetezca.', 'Hacer lo que apetece suele ser obedecer a tus caprichos. ¿Eso es libertad?', 'Confundes la libertad con el capricho.'),
      PO('falacia', 'Lo que hagan mis amigos, porque así no me equivoco.', 'Dejar que otros elijan por ti también es elegir: eliges no ser tú.', 'Seguir a la mayoría no te libra de elegir.', 'Apelación a la mayoría'),
    ] },
  ], fin: { alto: 'Has tomado tu libertad en serio, con sus límites y su peso. Eres responsable de ti, y lo sabes.', medio: 'Ves tu libertad, pero a veces te escondes de ella. Recuerda: no elegir también es elegir.', bajo: 'Buscaste excusas fáciles. La mala fe es cómoda, pero no te hace libre.' } },
];
// el último rival de la historia
const SOFISTA = { id: 'sofista', name: 'El Gran Sofista', short: 'Gran Sofista', epithet: 'El ladrón del Libro de la Razón', boss: true };
const POSTURA_SOFISTA = { id: 'sofista', q: '¿Hay alguna verdad, o solo hay opiniones?', final: true, rounds: [
  { say: 'Bienvenido, buscador. Yo arranqué las páginas del Libro de la Razón. ¿Para qué las quieres? Nada es verdad: solo hay opiniones, y gana quien mejor convence.', opts: [
    PO('bueno', 'Si nada es verdad, tampoco es verdad lo que acabas de decir. Tu frase se destruye a sí misma.', 'La vieja trampa de Platón. Digamos que mi frase es solo una opinión más. ¿Y qué?', 'Muestras que el relativismo absoluto se refuta a sí mismo.'),
    PO('flojo', 'Yo creo que algunas cosas sí son verdad.', 'Crees. Yo también creo cosas. Eso no prueba nada.', 'Afirmas sin argumentar.'),
    PO('falacia', 'Eres un ladrón de páginas, así que nada de lo que dices vale.', 'Sí, robé las páginas. ¿Y eso hace falso mi argumento? Qué poco aprendiste.', 'Aunque sea un ladrón, hay que refutar su idea, no su conducta.', 'Ataque a la persona'),
  ] },
  { say: 'Mira la historia: cada época creyó tener la verdad, y la siguiente se rio de ella. ¿Por qué la tuya sería distinta?', opts: [
    PO('bueno', 'Que las ideas cambien no significa que todas valgan igual. La ciencia corrige sus errores: hoy sabemos más sobre la Tierra que los antiguos. Cambiar también puede ser acercarse a la verdad.', 'Hablas de progreso. Admito que el mapa de hoy es mejor que el de Tales. Maldición.', 'Distingues entre cambiar y progresar en el conocimiento.'),
    PO('flojo', 'Porque mi época es la mejor.', 'Eso pensaron todas. Ese es justamente mi argumento.', 'Caes en lo mismo que critica el sofista.'),
    PO('falacia', 'Porque lo dice mi profesor.', 'Tu profesor también puede equivocarse. Sin razones propias, eres mío.', 'Que alguien con autoridad lo diga no basta.', 'Apelación a la autoridad'),
  ] },
  { say: 'La palabra es un tirano poderoso, decía Gorgias. Con buenas palabras puedo hacerte creer cualquier cosa.', opts: [
    PO('bueno', 'Por eso aprendí a reconocer las trampas: ataques a la persona, falsos dilemas, apelaciones a la mayoría. Quien conoce los trucos ya no es fácil de engañar.', '¡Has estudiado el bestiario de las falacias! Eso me quita la mitad de mis armas.', 'Usas el conocimiento de las falacias como defensa: pensamiento crítico.'),
    PO('flojo', 'A mí nadie me engaña.', 'Eso dicen todos los que ya fueron engañados.', 'Exceso de confianza, sin argumento.'),
    PO('falacia', 'Si las palabras engañan, entonces hay que prohibir hablar.', '¡Qué solución tan extrema! Entre engañar y callar hay un mundo entero: razonar.', 'Solo ves dos salidas, y las dos son extremas.', 'Falso dilema'),
  ] },
  { say: 'Los sabios que conociste en tu viaje no se ponen de acuerdo en nada. Si ellos no saben, ¿quién va a saber?', opts: [
    PO('bueno', 'No se ponen de acuerdo en todo, pero cada uno me enseñó algo que puedo examinar: Sócrates a preguntar, Descartes a dudar con orden, Kant a pensar por mí mismo. El desacuerdo es la forma en que buscamos juntos.', 'Has convertido sus peleas en un método. Eso es justamente lo que yo no quería que descubrieras.', 'Ves el desacuerdo filosófico como un diálogo, no como un fracaso.'),
    PO('flojo', 'Entonces nadie sabe nada.', '¡Exacto! Ya eres de los míos.', 'Le das la razón al sofista sin examinar.'),
    PO('falacia', 'El último que habló seguro que tiene razón, porque es el más moderno.', 'Lo nuevo no es verdadero por ser nuevo. Me sorprende que caigas en eso.', 'Que una idea sea reciente no la hace verdadera.', 'Apelación a la novedad'),
  ] },
  { say: 'Última pregunta, buscador: ¿por qué buscar la verdad, si es tan difícil? Quédate con opiniones cómodas, como todos.', opts: [
    PO('bueno', 'Porque las opiniones cómodas pueden hacer daño, y porque pensar me hace libre. Quizás nunca tenga toda la verdad, pero puedo estar cada día un poco menos equivocado. Ese camino ya es la filosofía.', 'No tengo respuesta para eso. Toma las páginas. El Libro de la Razón es tuyo, y el camino también.', 'Defiendes el valor de buscar la verdad aunque nunca se alcance del todo.'),
    PO('flojo', 'Porque sí.', '«Porque sí» es la respuesta de quien ya se rindió.', 'No das ninguna razón.'),
    PO('falacia', 'Porque si no la busco me volveré un ignorante total y seré infeliz para siempre.', 'Cuánto drama para una pregunta. El miedo no es una razón.', 'Encadenas consecuencias extremas sin justificarlas.', 'Pendiente resbaladiza'),
  ] },
], fin: { alto: 'Me has vencido con razones, no con gritos. Las páginas son tuyas.', medio: 'Me has hecho tambalear, pero aún dudo de ti. Vuelve cuando tus razones sean más firmes.', bajo: 'Ya ves: con un par de trucos te tengo. Recorre de nuevo las épocas y aprende de sus sabios.' } };

// --------------------------------------------------------------- la historia
const HISTORIA = [
  { id: 'prologo', at: 0, t: 'Prólogo · El Libro de la Razón', p: [
    'Hace mucho tiempo, los sabios de todas las épocas escribieron juntos un libro. Cada uno dejó en él su idea más valiosa: Tales, el asombro; Sócrates, la pregunta; Hipatia, la medida de los cielos; Sor Juana, el derecho a saber.',
    'Lo llamaron el Libro de la Razón, porque quien lo leía aprendía a pensar por sí mismo.',
    'Pero una noche alguien entró en la biblioteca. El Gran Sofista, que enseña que nada es verdad y que gana quien mejor habla, arrancó todas las páginas y las repartió entre los maestros de cada época, envueltas en dudas y en trampas.',
    'Tú ya sabes ganar un debate, y así se recupera una página: cada maestro de época que convenzas te devolverá la suya. Reúne seis y podrás enfrentarte al Gran Sofista.',
  ] },
  { id: 'cap1', at: 1, t: 'Capítulo I · La primera página', p: [
    'La página brilla entre tus manos. Las letras, que estaban borrosas, se vuelven nítidas mientras la lees.',
    'En el reverso hay algo escrito con otra tinta, oscura y elegante: «Una página no es nada, buscador. Yo tengo cientos de palabras para cada una de tus razones».',
    'El Gran Sofista sabe que lo buscas. Guarda la página en tu libro y sigue tu camino.',
  ] },
  { id: 'cap2', at: 3, t: 'Capítulo II · El rastro del Sofista', p: [
    'Tres páginas. En cada época que visitas, alguien recuerda a un extranjero de manto gris que discutía con todos y nunca perdía: convencía a unos de que lo blanco era negro, y a otros de lo contrario, solo por diversión.',
    'Dicen que en cada lugar dejó una duda sembrada, como una semilla: «¿Y si nada es verdad?».',
    'Ahora entiendes su plan. No quiere destruir el libro: quiere que nadie confíe en la razón. Que todos crean que pensar no sirve para nada.',
  ] },
  { id: 'cap3', at: 6, t: 'Capítulo III · El desafío', p: [
    'Seis páginas. Esta noche, mientras guardas la última, una voz suena a tu espalda: «Has reunido muchas palabras. Veamos si sabes usarlas».',
    'Cuando te das vuelta, no hay nadie. Solo una carta clavada en tu libro con un alfiler de plata: «Te espero en el último debate. Si me vences con razones, te devolveré todas las páginas. Si caes en mis trampas, el libro será mío para siempre».',
    'Abre el Libro de la Razón cuando estés listo. Recuerda lo que te enseñaron los sabios: preguntar, dudar con orden, reconocer las falacias y pensar por ti mismo.',
  ] },
  { id: 'fin', at: -1, t: 'Epílogo · El libro abierto', p: [
    'El Gran Sofista baja la mirada y deja caer un fajo de páginas sobre la mesa. Por primera vez en siglos, no tiene nada que decir.',
    'Las páginas vuelan solas hacia el libro y se cosen unas a otras con hilos de luz. Pero algo ha cambiado: entre las ideas de los sabios aparece una página nueva, escrita con tu letra.',
    'Dice: «La verdad no se tiene: se busca, con otros, y cada día un poco mejor».',
    'El libro nunca estará completo, porque cada persona que piensa le añade una página. Sigue viajando: quedan épocas por recorrer, sabios por escuchar y preguntas por hacer.',
  ] },
];
