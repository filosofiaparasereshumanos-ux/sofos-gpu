// ============================================================================
//  DEBATES MÁS VIVOS: frases que cada pensador dice en el duelo (se graban una
//  vez por voz), dilemas sin respuesta correcta y tipos de argumento.
// ============================================================================
const DEB_LINES = {
  // al acertar: el pensador concede... y contraataca con una de sus frases
  concede: ['Concedo ese punto.', 'Bien visto, lo reconozco.', 'Tu razón es firme.', 'Eso no lo puedo negar.', 'Has dado en el blanco.', 'Me obligas a pensar.'],
  pero: ['Pero escucha lo que yo digo.', 'Aun así, piensa en esto.', 'Pero no te confíes.', 'Sin embargo, recuerda mis palabras.'],
  // al fallar: el pensador remata
  remate: ['Te equivocas. Escucha.', 'No. Mira las cosas como yo.', 'Error. Aprende esto.', 'Te lo diré con mis palabras.'],
  // tipos de argumento
  weak: ['¡Ese argumento me desarma!', '¡Ahí me has dado de lleno!', 'No sé cómo responder a eso.'],
  strong: ['Ese tipo de argumento no me afecta.', 'Con eso no me vas a convencer.', 'Esperaba algo mejor.'],
  crit: ['¡Imposible! ¡Qué golpe!', '¡Me has dejado sin palabras!', '¡Eso ha sido magistral!'],
  // la cuerda se inclina a tu favor
  doubt: ['Me estás haciendo dudar.', 'Empiezo a pensar que tienes razón.', 'Mis certezas tiemblan.'],
  // la revancha
  rival: ['¿Vuelves por más? La última vez te vencí.', 'Otra vez tú. Esta vez tampoco ganarás.', 'Recuerdo tu derrota. Veamos si aprendiste algo.'],
  rivalLost: ['Has aprendido. Te concedo la revancha.', 'Volviste más sabio. Me rindo.'],
  // todo o nada
  bet: ['Último argumento. ¿Te atreves a apostarlo todo?'],
  // dilemas
  dilema: ['Ahora un dilema. Aquí no hay respuesta correcta: elige tu postura.'],
  dilema2: ['Bien. Ahora defiéndela.', 'Interesante postura. Defiéndela.'],
  // mundos sagrados: respuestas suaves, sin burlas
  sacOk: ['Así es.', 'Correcto.', 'Bien aprendido.', 'Lo has comprendido.'],
  sacNo: ['No es así. Vuelve a pensarlo con calma.', 'Repasa la historia y vuelve a intentarlo.', 'Casi: escucha otra vez.'],
};
// tipos de argumento: cada pensador cae ante uno y resiste otro
const ARG_CARDS = [
  { id: 'ejemplo', n: 'Ejemplo', i: '◉', d: 'Baja la idea a un caso concreto de la vida.' },
  { id: 'pregunta', n: 'Pregunta socrática', i: '?', d: 'Pregunta hasta mostrar una contradicción.' },
  { id: 'falacia', n: 'Detectar falacia', i: '⚑', d: 'Señala el truco o el error del razonamiento.' },
];
// los que caen ante una pregunta: sofistas y sistemas seguros de sí; ante un ejemplo: los muy abstractos; ante la falacia: retóricos y políticos
const ARG_WEAK = {
  protagoras: 'pregunta', gorgias: 'pregunta', trasimaco: 'pregunta', descartes: 'pregunta', hegel: 'ejemplo', parmenides: 'ejemplo', platon: 'ejemplo', plotino: 'ejemplo',
  spinoza: 'ejemplo', kant: 'ejemplo', maquiavelo: 'falacia', hobbes: 'falacia', nietzsche: 'pregunta', marx: 'pregunta', zenon: 'ejemplo', pitagoras: 'ejemplo',
  socrates: 'ejemplo', diogenes: 'falacia', aristoteles: 'pregunta', tomas: 'pregunta', agustin: 'ejemplo', hume: 'falacia', rousseau: 'falacia', sartre: 'pregunta',
};
// dilemas: las dos posturas valen; gana quien la defiende con una razón coherente
const DILEMAS = [
  { q: '¿Es correcto mentir para salvar a un amigo?', a: ['Sí, a veces mentir es lo correcto', 'No, nunca se debe mentir'],
    r: ['Porque las consecuencias importan: salvar una vida pesa más que decir la verdad.', 'Porque si todos mintiéramos cuando conviene, nadie podría confiar en nadie.'],
    f: ['Porque lo hace mucha gente.', 'Porque quien piense lo contrario es mala persona.'] },
  { q: '¿Deberían prohibirse las redes sociales a los menores de 16 años?', a: ['Sí, deberían prohibirse', 'No, deberían permitirse'],
    r: ['Porque protegen la salud y la atención de quienes aún se están formando.', 'Porque es mejor aprender a usarlas con guía que dejarlas para después.'],
    f: ['Porque antes no existían y vivíamos bien.', 'Porque todos mis amigos piensan igual.'] },
  { q: '¿Es mejor una vida feliz pero ignorante, o una vida sabia pero triste?', a: ['Mejor feliz e ignorante', 'Mejor sabia aunque triste'],
    r: ['Porque al final lo que buscamos todos es sentirnos bien.', 'Porque una vida sin examen no merece la pena: conocer la verdad nos hace más humanos.'],
    f: ['Porque lo dice un famoso.', 'Porque si no, serías un tonto.'] },
  { q: '¿Deben las leyes obedecerse aunque sean injustas?', a: ['Sí, la ley se obedece siempre', 'No, una ley injusta puede desobedecerse'],
    r: ['Porque si cada uno decide qué ley cumplir, la sociedad se vuelve un caos.', 'Porque la justicia está por encima de la ley, y la conciencia puede negarse a cumplir el mal.'],
    f: ['Porque siempre ha sido así.', 'Porque los que opinan otra cosa son ignorantes.'] },
  { q: '¿Debería el dinero repartirse por igual entre todos?', a: ['Sí, a partes iguales', 'No, según el esfuerzo de cada uno'],
    r: ['Porque todas las personas tienen la misma dignidad y las mismas necesidades básicas.', 'Porque quien trabaja más merece recibir más, y eso anima a esforzarse.'],
    f: ['Porque lo vi en una película.', 'Porque si no estás de acuerdo, no entiendes nada.'] },
  { q: '¿Tienen derechos los animales?', a: ['Sí, tienen derechos', 'No, los derechos son solo humanos'],
    r: ['Porque pueden sufrir, y el sufrimiento importa sea de quien sea.', 'Porque los derechos van unidos a deberes, y solo los seres racionales pueden asumirlos.'],
    f: ['Porque mi perro es muy simpático.', 'Porque nadie se ha quejado nunca.'] },
  { q: '¿Una máquina podrá algún día pensar de verdad?', a: ['Sí, podrá pensar', 'No, solo imitará el pensamiento'],
    r: ['Porque el cerebro también es materia, y lo que hace la materia lo puede hacer otra materia.', 'Porque manejar símbolos no es comprenderlos: falta la experiencia de entender.'],
    f: ['Porque las máquinas dan miedo.', 'Porque lo dicen en internet.'] },
  { q: '¿Es preferible la seguridad a la libertad?', a: ['Sí, primero la seguridad', 'No, primero la libertad'],
    r: ['Porque sin seguridad no se puede vivir, y sin vida no hay libertad que valga.', 'Porque quien cambia libertad por seguridad acaba sin ninguna de las dos.'],
    f: ['Porque mi abuelo lo decía.', 'Porque quien no piensa así es un cobarde.'] },
  { q: '¿Somos libres de verdad o todo está determinado?', a: ['Somos libres', 'Todo está determinado'],
    r: ['Porque sentimos que elegimos, y sin libertad no tendría sentido premiar ni culpar a nadie.', 'Porque todo lo que pasa tiene una causa, y nuestras decisiones también.'],
    f: ['Porque me gusta más pensarlo así.', 'Porque la mayoría lo cree.'] },
  { q: '¿Es justo castigar a alguien para dar ejemplo a los demás?', a: ['Sí, si evita más daños', 'No, solo por lo que hizo'],
    r: ['Porque el castigo sirve para prevenir delitos futuros y proteger a muchos.', 'Porque usar a una persona como medio para asustar a otras viola su dignidad.'],
    f: ['Porque siempre se ha hecho así.', 'Porque los delincuentes no son personas.'] },
  { q: '¿Debemos ayudar primero a los cercanos o a quien más lo necesita?', a: ['Primero a los cercanos', 'Primero a quien más lo necesita'],
    r: ['Porque tenemos deberes especiales con la familia y los amigos que nos cuidan.', 'Porque el sufrimiento de un desconocido vale lo mismo que el de alguien cercano.'],
    f: ['Porque es lo que hace todo el mundo.', 'Porque los otros no se lo merecen.'] },
  { q: '¿Es la belleza algo objetivo o depende de quien mira?', a: ['Es objetiva', 'Depende de quien mira'],
    r: ['Porque hay proporciones y armonías que gustan en todas las culturas.', 'Porque cada época y cada persona encuentra bello algo distinto.'],
    f: ['Porque a mí me gusta.', 'Porque lo dice un experto famoso.'] },
  { q: '¿Debemos decir siempre lo que pensamos?', a: ['Sí, siempre', 'No, a veces es mejor callar'],
    r: ['Porque la sinceridad es la base de la confianza y del diálogo.', 'Porque la prudencia y el cuidado de los demás también son virtudes.'],
    f: ['Porque así soy yo y punto.', 'Porque quien calla es un hipócrita.'] },
  { q: '¿Hay que cuidar la naturaleza por ella misma o por nosotros?', a: ['Por ella misma', 'Por nosotros'],
    r: ['Porque los ríos, los bosques y los animales valen aunque no nos sirvan.', 'Porque de la naturaleza depende nuestra vida y la de las próximas generaciones.'],
    f: ['Porque está de moda.', 'Porque los que no piensan así son malas personas.'] },
];
