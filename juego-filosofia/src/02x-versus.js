// ============================================================================
//  DEBATES ENTRE PENSADORES: dos pensadores discuten una pregunta, cada uno con
//  su voz, y el jugador decide quién lo convence más. No hay ganador correcto:
//  la elección mueve el mapa filosófico. Los turnos son paráfrasis fieles de sus
//  ideas, no citas textuales.
//  eje/va/vb: eje del mapa y valor que suma elegir a «a» o a «b».
// ============================================================================
const VERSUS = [
  { id: 'platon-aristoteles', a: 'platon', b: 'aristoteles', q: '¿Dónde está lo real?', eje: 'conocer', va: 1, vb: -1,
    turns: [
      ['a', 'Lo que ves cambia y muere. Lo real de verdad son las Ideas: la Justicia misma, la Belleza misma, que no cambian nunca. Las cosas de este mundo son solo sus sombras.'],
      ['b', 'Maestro, te quiero mucho, pero quiero más a la verdad. La belleza no vive en otro mundo: está en esta flor y en este rostro. Para conocer hay que observar las cosas, una por una.'],
      ['a', 'Los sentidos te engañan, Aristóteles. Nadie ha visto jamás un círculo perfecto, y sin embargo lo entendemos. Eso lo conoce la razón, no los ojos.'],
      ['b', 'Entendemos el círculo porque antes vimos muchas cosas redondas. Nada llega al entendimiento sin pasar primero por los sentidos. Tu otro mundo sobra para explicar este.'],
    ],
    cierre: 'Platón confía en la razón y en un mundo de Ideas perfectas. Aristóteles confía en la observación de este mundo. De esa discusión nacen dos grandes caminos del pensamiento.' },
  { id: 'hobbes-rousseau', a: 'hobbes', b: 'rousseau', q: '¿El ser humano es bueno por naturaleza?', eje: 'justicia', va: -1, vb: 1,
    turns: [
      ['a', 'Quita las leyes y verás. Sin un poder que nos dé miedo a todos, cada uno tomaría lo que pudiera. La vida sería solitaria, pobre, desagradable, brutal y breve.'],
      ['b', 'Describes al hombre de tu ciudad, no al hombre natural. El ser humano nace bueno y siente compasión al ver sufrir a otro. Es la sociedad, con su propiedad y su vanidad, la que lo corrompe.'],
      ['a', 'Bonita historia. Pero tú mismo cierras tu puerta con llave por la noche. ¿De quién te proteges, si todos somos tan buenos?'],
      ['b', 'Me protejo de hombres que una sociedad injusta ya ha dañado. No hace falta un amo que nos asuste, sino un pacto entre iguales en el que cada uno obedezca leyes que él mismo ayudó a hacer.'],
    ],
    cierre: 'Hobbes cree que obedecemos por miedo y conveniencia, y que por eso hace falta un poder fuerte. Rousseau cree que somos buenos y que la sociedad debe rehacerse entre iguales. Todavía hoy discutimos cuánta razón tiene cada uno.' },
  { id: 'heraclito-parmenides', a: 'heraclito', b: 'parmenides', q: '¿Todo cambia o algo permanece?', eje: 'cambio', va: -1, vb: 1,
    turns: [
      ['a', 'Nadie se baña dos veces en el mismo río. El agua ya es otra, y tú también eres otro. Todo fluye, como un fuego que se enciende y se apaga con medida.'],
      ['b', 'Tus ojos te dicen que todo cambia, pero piensa. Lo que es, es. Y lo que no es, no es. Para cambiar, algo tendría que venir de la nada, y de la nada no sale nada.'],
      ['a', 'Miras el mundo con los ojos cerrados, Parménides. El día se vuelve noche, el niño se vuelve viejo. Negar el cambio es negar la vida.'],
      ['b', 'Y tú crees a los sentidos antes que a la razón. Lo que de verdad existe no nace ni muere. El cambio es apariencia: la verdad es una sola y permanece.'],
    ],
    cierre: 'Heráclito ve el cambio en todas partes. Parménides defiende que el ser verdadero no cambia. Más tarde, Platón y Aristóteles intentaron darles la razón a los dos.' },
  { id: 'descartes-hume', a: 'descartes', b: 'hume', q: '¿Cómo conocemos: por la razón o por la experiencia?', eje: 'conocer', va: 1, vb: -1,
    turns: [
      ['a', 'Los sentidos me han engañado muchas veces, y hasta podría estar soñando. Pero aunque dude de todo, hay algo seguro: pienso, luego existo. Sobre esa certeza de la razón levanto todo lo demás.'],
      ['b', 'Mira dentro de tu mente, amigo. Solo encontrarás impresiones que te dejó la experiencia, y las ideas que copiamos de ellas. Un ciego de nacimiento no puede pensar el color rojo.'],
      ['a', 'Las matemáticas no dependen de lo que veo. Dos más tres son cinco, esté yo despierto o dormido. La razón alcanza verdades que ninguna experiencia puede darme.'],
      ['b', 'Esas verdades solo relacionan ideas entre sí; no dicen nada del mundo. Que el sol saldrá mañana no lo demuestra la razón: lo esperamos por costumbre, porque siempre ha salido.'],
    ],
    cierre: 'Descartes es racionalista: la razón es la fuente más segura del conocimiento. Hume es empirista: todo empieza en la experiencia. Kant dijo que leer a Hume lo despertó, y buscó unir las dos posturas.' },
  { id: 'kant-mill', a: 'kant', b: 'mill', q: '¿Qué hace buena una acción?', eje: 'justicia', va: 1, vb: -0.5,
    turns: [
      ['a', 'Una acción es buena cuando se hace por deber, no por lo que se gana con ella. Pregúntate: ¿querría que todos hicieran lo mismo que yo? Si no, no lo hagas. Mentir está mal aunque te convenga.'],
      ['b', 'Una acción es buena si trae la mayor felicidad para el mayor número de personas. Lo que importa son las consecuencias. Una regla que hace sufrir a todos no puede ser una buena regla.'],
      ['a', 'Entonces podrías sacrificar a un inocente para alegrar a muchos. Yo digo que no: cada persona es un fin en sí misma, nunca solo un medio para la felicidad de otros.'],
      ['b', 'Y tú no mentirías ni para salvar una vida. Yo sí defiendo los derechos y la libertad de cada uno, precisamente porque la experiencia enseña que así vivimos todos mejor.'],
    ],
    cierre: 'Kant mira el deber y la intención. Mill mira las consecuencias y la felicidad de todos. El dilema del tranvía, que puedes vivir en el siglo XIX, enfrenta justamente estas dos ideas.' },
  { id: 'epicuro-seneca', a: 'epicuro', b: 'seneca', q: '¿Qué es vivir bien: buscar el placer o la virtud?', eje: null, va: 0, vb: 0,
    turns: [
      ['a', 'El placer es el principio y el fin de la vida feliz. Pero no hablo de banquetes: hablo de no sufrir en el cuerpo y de tener el alma tranquila. Pan, agua y amigos me bastan.'],
      ['b', 'El placer va y viene, Epicuro, y quien depende de él es esclavo de la suerte. Lo único que es de verdad nuestro es la virtud: obrar bien pase lo que pase.'],
      ['a', 'También yo digo que no se vive con placer sin vivir con prudencia y justicia. Pero la virtud vale porque nos da una vida serena, no por sí sola.'],
      ['b', 'Ahí nos separamos. Yo elegiría la virtud aunque doliera. Y sin embargo te leo con gusto: no importa quién dice una verdad, sino que sea verdad.'],
    ],
    cierre: 'Epicuro busca la serenidad a través de placeres sencillos. Séneca, estoico, pone la virtud por encima de todo. Los dos coinciden en algo: para vivir bien hace falta muy poco.' },
  { id: 'spinoza-sartre', a: 'spinoza', b: 'sartre', q: '¿Somos libres?', eje: 'sentido', va: -0.5, vb: 1,
    turns: [
      ['a', 'Los hombres se creen libres porque conocen sus deseos, pero ignoran las causas que los producen. Una piedra que cae, si pudiera pensar, también creería que cae porque quiere.'],
      ['b', 'El ser humano no es una piedra. Primero existimos y después, con cada elección, decidimos qué somos. Estamos condenados a ser libres: ni siquiera podemos elegir no elegir.'],
      ['a', 'No te pido que te rindas. Te pido que entiendas. Quien comprende por qué siente lo que siente deja de ser arrastrado por ello. Esa es la única libertad verdadera.'],
      ['b', 'Decir «no pude hacer otra cosa» es engañarse a uno mismo, es mala fe. Aunque no elijas lo que te pasa, siempre eliges qué haces con lo que te pasa. Y eres responsable de ello.'],
    ],
    cierre: 'Para Spinoza todo tiene una causa, y la libertad consiste en comprender. Para Sartre somos libertad pura y cargamos con toda la responsabilidad. ¿Elegimos, o solo creemos que elegimos?' },
  { id: 'confucio-laozi', a: 'confucio', b: 'laozi', q: '¿Cómo se vive bien: con reglas o dejando fluir?', eje: 'cambio', va: 0.5, vb: -0.5,
    turns: [
      ['a', 'Para que haya paz en el mundo, cada uno debe cumplir su papel con respeto: el hijo, el padre, el gobernante. La virtud se aprende con estudio, con ritos y con el ejemplo de los mayores.'],
      ['b', 'Cuando se pierde el Camino, aparecen las reglas y los deberes. El agua no estudia ni se esfuerza, y sin embargo vence a la roca. Vive con sencillez y deja que las cosas sigan su curso.'],
      ['a', 'Sin educación, el hombre se queda en bruto. No hagas a otros lo que no quieres que te hagan a ti: eso no nace solo, hay que cultivarlo cada día.'],
      ['b', 'Cuanto más ordenas, más desorden creas. El mejor gobernante es aquel del que el pueblo apenas sabe que existe. Actúa sin forzar, y nada quedará sin hacerse.'],
    ],
    cierre: 'Confucio confía en la educación, los ritos y el orden. Laozi confía en la naturalidad y en no forzar las cosas. China ha vivido durante siglos escuchando a los dos.' },
];
const VERSUS_NARR = (v) => v.turns.map((t) => t[1]); // lo que se graba con la voz de cada pensador
