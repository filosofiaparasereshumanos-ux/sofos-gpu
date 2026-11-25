// ============================================================================
//  EL JUICIO DE SÓCRATES (Atenas, 399 a.C.), según la Apología, el Critón y el
//  Fedón de Platón. El jugador es Sócrates: en cada momento elige entre lo que
//  dijo de verdad (k:'socratico'), ceder para salvarse (k:'ceder') o responder
//  con soberbia (k:'soberbio'). El jurado de unos quinientos ciudadanos vota.
//  Ser fiel a Sócrates no salva la vida: esa es la lección.
//  (datos sin dependencias: también los leen las herramientas de voz)
// ============================================================================
const JUICIO_VOCES = {
  meleto: { id: 'meleto', name: 'Meleto', short: 'Meleto', epithet: 'Poeta joven, acusador principal' },
  anito: { id: 'anito', name: 'Ánito', short: 'Ánito', epithet: 'Político demócrata, acusador' },
  licon: { id: 'licon', name: 'Licón', short: 'Licón', epithet: 'Orador, acusador' },
  criton: { id: 'criton', name: 'Critón', short: 'Critón', epithet: 'Amigo de toda la vida' },
};
const JO = (k, t, r, why) => ({ k, t, r, why });
const JUICIO = {
  intro: [
    'Atenas, primavera del año 399 antes de Cristo. Un jurado de unos quinientos ciudadanos, elegidos por sorteo, se sienta en el tribunal. Hoy se juzga a un hombre de setenta años que nunca escribió un libro: Sócrates.',
    'Lo acusan tres ciudadanos: Meleto, un poeta joven; Ánito, un político influyente; y Licón, un orador. Tú eres Sócrates. Cada vez que hables, elige: ¿dirás lo que de verdad piensas, o lo que te salvaría?',
  ],
  acusacion: { who: 'meleto', say: 'Esta es nuestra acusación: Sócrates es culpable de corromper a los jóvenes y de no reconocer a los dioses que reconoce la ciudad, sino otras divinidades nuevas. Pedimos para él la pena de muerte.' },
  defensa: [
    { who: 'meleto', say: 'Los jóvenes te siguen por las calles y aprenden de ti a burlarse de sus mayores. Tú los corrompes, Sócrates.', opts: [
      JO('socratico', 'Dime, Meleto: si yo corrompo a los jóvenes, ¿quién los hace mejores? ¿Los jueces, el consejo, la asamblea, todos los atenienses menos yo? Con los caballos pasa al revés: pocos saben mejorarlos. Se ve que nunca te has preocupado por los jóvenes.', 'Meleto balbucea y no sabe qué responder. Algunos jueces sonríen; otros se molestan al ver humillado a un acusador.', 'Es la defensa de la Apología (24d-26a): Sócrates interroga a Meleto hasta mostrar que nunca pensó en serio en la educación.'),
      JO('ceder', 'Jueces, vosotros que sois los más sabios de Grecia, sabéis que soy un pobre anciano inofensivo. Tened compasión de mí.', 'Varios jueces asienten, halagados. Pero tus discípulos se miran entre sí, extrañados: ese no es el Sócrates que conocen.', 'Sócrates se negó a halagar al jurado: dijo que solo hablaría con la verdad, sin adornos (Apología 17b-c).'),
      JO('soberbio', 'Meleto es un ignorante y un envidioso. No merece ni que le responda.', 'Se oyen protestas en el tribunal. Insultar no es argumentar, y el jurado lo nota.', 'Sócrates refutó a Meleto con preguntas, no con insultos: su arma era el diálogo.'),
    ] },
    { who: 'anito', say: 'Vas por la ciudad haciendo preguntas a todos, dejando en ridículo a políticos, poetas y artesanos. ¿Quién te crees que eres? ¿El más sabio de Atenas?', opts: [
      JO('socratico', 'Mi amigo Querefonte preguntó al oráculo de Delfos si había alguien más sabio que yo, y la sacerdotisa respondió que nadie. Para entenderlo, interrogué a los que parecían sabios, y descubrí que creían saber lo que no sabían. Yo, al menos, lo que no sé tampoco creo saberlo.', 'Un murmullo recorre el tribunal. Algunos admiran tu honestidad; otros sienten que acabas de llamarlos ignorantes.', 'Es la historia del oráculo que Sócrates cuenta en la Apología (20e-23b): su sabiduría es reconocer los límites de su saber.'),
      JO('ceder', 'Si me absolvéis, os prometo que dejaré de hacer preguntas y no volveré a filosofar.', 'Muchos jueces parecen satisfechos. Pero en el fondo del tribunal, el joven Platón baja la cabeza.', 'Sócrates dijo exactamente lo contrario: «Os aprecio, atenienses, pero obedeceré al dios antes que a vosotros, y mientras viva no dejaré de filosofar» (Apología 29d).'),
      JO('soberbio', 'Soy más sabio que todos vosotros juntos, y lo sabéis.', 'Un abucheo llena el tribunal. Has confirmado lo que temían tus acusadores.', 'Sócrates nunca dijo saber más que nadie: decía que su única ventaja era saber que no sabía.'),
    ] },
    { who: 'meleto', say: 'Y además eres un ateo. Dices que te habla una voz divina, un daimon. No crees en los dioses de la ciudad.', opts: [
      JO('socratico', 'Tu acusación dice que creo en cosas divinas, y a la vez que no creo en ningún dios. ¿Puede alguien creer en las cosas de los caballos y no creer en los caballos? Te contradices, Meleto.', 'Meleto se enreda en su propia acusación. Pero las contradicciones de un acusador no siempre cambian los votos.', 'Es el argumento de la Apología (27b-e): la acusación de Meleto es contradictoria.'),
      JO('ceder', 'Haré todos los sacrificios que me pidáis y nunca más hablaré de mi voz interior.', 'Algunos jueces se tranquilizan. Pero has negado algo que para Sócrates era muy importante.', 'Sócrates nunca renunció a su daimon, la voz que le advertía cuando iba a equivocarse (Apología 31c-d).'),
      JO('soberbio', 'Los dioses de la ciudad son cuentos para niños.', 'El tribunal estalla en gritos. Acabas de dar a tus acusadores justo lo que querían oír.', 'Sócrates participaba en la religión de la ciudad; la acusación de impiedad tenía mucho de política.'),
    ] },
    { who: 'licon', say: 'Es costumbre que el acusado traiga a su esposa y a sus hijos, llorando, para conmover a los jueces. ¿No harás lo mismo, Sócrates?', opts: [
      JO('socratico', 'Tengo tres hijos, pero no los traeré aquí a suplicar. No sería digno de mí ni de vosotros. El juez no está para hacer favores, sino para juzgar según la ley.', 'Se hace un silencio largo. Algunos jueces te respetan por ello; otros lo toman como una falta de respeto.', 'Sócrates se negó a esas escenas: las consideraba indignas de la justicia (Apología 34c-35c).'),
      JO('ceder', 'Traed a mis hijos. Mirad sus lágrimas, jueces, y tened piedad de su padre.', 'Los niños lloran y varios jueces se conmueven. Pero has hecho justo lo que Sócrates dijo que nunca haría.', 'Sócrates rechazó expresamente traer a sus hijos para provocar lástima (Apología 34c-d).'),
      JO('soberbio', 'Haced lo que queráis. Me da igual lo que piense esta multitud.', 'El desprecio se paga caro: varios jueces que dudaban se deciden en tu contra.', 'Sócrates respetaba al jurado, aunque no lo halagara: hablaba con franqueza, no con desprecio.'),
    ] },
  ],
  veredicto: { culpable: 'El jurado te declara culpable. La diferencia es pequeña: si unos treinta votos hubieran cambiado de lado, habrías sido absuelto.', absuelto: 'El jurado te absuelve. Vives… pero para salvarte has dicho cosas que Sócrates jamás habría dicho.' },
  pena: { who: 'meleto', say: 'Ya eres culpable. Nosotros pedimos la muerte. Según la ley, ahora tú debes proponer otra pena, y el jurado elegirá entre las dos.', opts: [
    JO('socratico', 'Por lo que he hecho por Atenas, lo justo sería que me alimentarais en el Pritaneo, como a los campeones olímpicos. Pero ya que debo proponer una pena, mis amigos Platón, Critón, Critobulo y Apolodoro ofrecen pagar una multa de treinta minas.', 'Parte del jurado se indigna: parece que te burlas del tribunal. Pero eso fue lo que dijo Sócrates.', 'Es la contrapropuesta de la Apología (36d-38b): primero, con ironía, el Pritaneo; después, una multa garantizada por sus amigos.'),
    JO('ceder', 'Propongo el destierro. Me iré de Atenas y no volveré a filosofar en ninguna parte.', 'Muchos jueces respiran aliviados: quizá era lo que algunos esperaban desde el principio.', 'Sócrates rechazó el destierro: «Una vida sin examen no merece ser vivida» (Apología 37c-38a).'),
    JO('soberbio', 'No propongo nada. Condenadme a muerte, si os atrevéis.', 'Tu desafío convence a los indecisos. La votación será dura.', 'Sócrates sí propuso una pena: no buscaba la muerte, pero tampoco renunció a sus principios.'),
  ] },
  sentencia: { muerte: 'El jurado vota la muerte, y esta vez por más diferencia que antes. Beberás la cicuta.', destierro: 'El jurado acepta el destierro. Vivirás lejos de Atenas, en silencio.' },
  despedida: { who: 'socrates', say: 'Ya es hora de irnos: yo a morir y vosotros a vivir. Quién de nosotros va hacia algo mejor, nadie lo sabe, salvo el dios.' },
  carcel: { who: 'criton', say: 'Sócrates, han pasado casi treinta días mientras el barco sagrado volvía de Delos. Todo está preparado: los guardias están comprados y en Tesalia tengo amigos que te acogerán. Huye esta noche, te lo suplico.', opts: [
    JO('socratico', 'Querido Critón, nunca hay que responder a la injusticia con injusticia. Toda mi vida acepté las leyes de Atenas; si ahora huyo, rompo ese acuerdo justo cuando no me conviene.', 'Critón llora en silencio. Sabe que no podrá convencerte.', 'Es el argumento del Critón (49b-54d): Sócrates imagina que las Leyes le hablan y le recuerdan el acuerdo que hizo con la ciudad.'),
    JO('ceder', 'Tienes razón, Critón. Vámonos esta noche.', 'Escapas en la oscuridad hacia Tesalia. Sigues vivo, pero has contradicho todo lo que enseñaste.', 'En el Critón, Sócrates rechaza la fuga: sería cometer una injusticia para escapar de otra.'),
    JO('soberbio', 'Que se queden con su ciudad. Me iré y me reiré de ellos desde lejos.', 'Critón te mira sorprendido: ese rencor no es tuyo.', 'Sócrates no huyó ni guardó rencor: incluso en la cárcel siguió conversando con calma sobre la justicia.'),
  ] },
  final: [
    { who: 'narr', say: 'Al atardecer, el servidor de los Once trajo la cicuta. Sócrates la bebió con calma, mientras sus amigos lloraban, y les pidió serenidad.' },
    { who: 'socrates', say: 'Critón, le debemos un gallo a Asclepio. Págalo y no lo olvides.' },
    { who: 'narr', say: 'Así terminó, cuenta Platón en el Fedón, el mejor de los hombres de su tiempo que conocimos, y también el más sabio y el más justo.' },
  ],
  finales: {
    fiel: 'Has sido Sócrates de verdad: preferiste la verdad a la vida, y la coherencia a la comodidad. Por eso, casi dos mil cuatrocientos años después, todavía lo recordamos.',
    medio: 'A veces fuiste Sócrates, y a veces elegiste lo que te convenía. Pregúntate: ¿qué te habría costado ser coherente hasta el final?',
    lejos: 'Te salvaste, o te dejaste llevar por el orgullo, pero no fuiste Sócrates. Él pensaba que es peor cometer una injusticia que sufrirla, y vivió y murió según esa idea.',
  },
  nota: 'Para saber más: casi todo lo que sabemos del juicio viene de la Apología, el Critón y el Fedón de Platón, y de la Apología de Jenofonte. Platón estaba presente en el juicio, pero no el día de la muerte, porque estaba enfermo.',
};
