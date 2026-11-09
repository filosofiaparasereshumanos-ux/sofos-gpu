// ============================================================================
//  DIÁLOGOS SOCRÁTICOS: filosofar es tomar postura, dar razones, escuchar la
//  objeción y responderla (o revisar lo que uno pensaba). No hay una única
//  respuesta correcta: se valora la calidad del razonamiento.
//
//  Cada razón y cada respuesta tiene una calidad:
//    b = buena (+2) · d = débil (0) · f = falacia (−1, con su nombre)
//  Se supera el diálogo con 3 puntos o más: una buena razón y una buena respuesta.
// ============================================================================
const DR = (t, k, e, f) => ({ t, k, e, f });
const DIALOGOS = {
  protagoras: {
    tesis: 'El ser humano es la medida de todas las cosas: lo que a cada uno le parece verdadero, es verdadero para él.',
    posturas: [
      { t: 'Estoy de acuerdo: cada persona tiene su verdad.', eje: 'relativo',
        razones: [
          DR('Las mismas cosas se perciben distinto: el agua tibia parece fría a quien viene del calor y caliente a quien viene del frío.', 'b', 'Buena razón: das un caso concreto en que la percepción cambia según la persona.'),
          DR('Las costumbres cambian de un pueblo a otro, y cada pueblo cree que las suyas son las correctas.', 'b', 'Buena razón: muestras con ejemplos que muchas normas dependen de cada cultura.'),
          DR('Porque hoy casi todo el mundo piensa así.', 'f', 'Que mucha gente piense algo no lo hace verdadero.', 'falacia de popularidad'),
          DR('Porque así no hay que discutir con nadie.', 'd', 'Es cómodo, pero que una idea sea cómoda no prueba que sea verdadera.'),
        ],
        objecion: 'Ah, pero cuidado: si cada uno tiene su verdad, quien piensa que mi frase es falsa también tiene razón. ¿Entonces mi frase es verdadera y falsa a la vez?',
        respuestas: [
          DR('Quizá vale para los gustos y las percepciones, pero no para todo: en matemáticas o en hechos comprobables no basta con que algo me parezca.', 'b', 'Excelente: distingues ámbitos en lugar de defender todo o nada.'),
          DR('Tienes razón: si todo es relativo, también lo es esa idea. Debo revisar mi postura.', 'b', 'Reconocer una contradicción y revisar tu idea es uno de los gestos más filosóficos que existen.'),
          DR('Da igual, yo sigo pensando lo mismo.', 'd', 'Insistir sin dar razones no es dialogar: la objeción sigue sin respuesta.'),
          DR('Lo dices porque eres un sofista que cobra por hablar.', 'f', 'Atacas a la persona en lugar de responder a su argumento.', 'falacia ad hominem'),
        ],
        cierre: 'Has tropezado con el viejo problema del relativismo: sirve para ver que muchas cosas dependen del punto de vista, pero si lo extiendes a todo, se contradice a sí mismo.' },
      { t: 'No estoy de acuerdo: hay verdades que valen para todos.', eje: 'universal',
        razones: [
          DR('Que dos más dos sean cuatro no depende de lo que yo opine.', 'b', 'Buena razón: das un ejemplo de verdad que no cambia según quién la piense.'),
          DR('Si cada uno tuviera su verdad, nadie podría equivocarse nunca, y sin embargo nos equivocamos.', 'b', 'Muy buena razón: muestras una consecuencia absurda de la tesis contraria.'),
          DR('Porque mi profesor dice que hay verdades absolutas.', 'f', 'Citar a alguien no basta: hay que explicar por qué tiene razón.', 'falacia de autoridad'),
          DR('Porque me molesta que la gente piense distinto.', 'd', 'Lo que te molesta habla de ti, no de la verdad del asunto.'),
        ],
        objecion: 'Pero piensa en el viento: a uno le parece frío y a otro templado. ¿Quién tiene la verdad sobre el viento? ¿No depende de cada cuerpo?',
        respuestas: [
          DR('Lo que siento depende de mí, pero la temperatura del viento se puede medir: una cosa es la sensación y otra el hecho.', 'b', 'Excelente distinción entre la sensación de cada uno y el hecho que todos pueden comprobar.'),
          DR('En las sensaciones y los gustos tienes razón: ahí cada uno es medida. Pero eso no vale para todo.', 'b', 'Buena respuesta: concedes lo que es justo conceder y mantienes tu punto con un matiz.'),
          DR('Eso es una tontería.', 'd', 'Descalificar no es argumentar: no explicas qué falla en el ejemplo.'),
          DR('Entonces, o todo es absoluto o nada lo es.', 'f', 'Presentas solo dos opciones extremas cuando hay posturas intermedias.', 'falso dilema'),
        ],
        cierre: 'Has separado lo que depende de cada uno de lo que no. Esa distinción entre opinión y conocimiento ocupará a Sócrates y a Platón durante toda su vida.' },
      { t: 'Depende: en algunas cosas sí, en otras no.', eje: 'matiz',
        razones: [
          DR('En los gustos, como la comida o la música, cada uno es medida; en los hechos, no.', 'b', 'Buena razón: propones un criterio para separar dos tipos de asuntos.'),
          DR('Las leyes cambian de una ciudad a otra, pero el dolor de una injusticia lo siente cualquiera.', 'b', 'Buena razón: muestras algo que varía y algo que parece común a todos.'),
          DR('Porque la respuesta del medio siempre es la correcta.', 'f', 'La verdad no está siempre en el punto medio entre dos posturas.', 'falacia del término medio'),
          DR('Porque no quiero equivocarme eligiendo un lado.', 'd', 'El miedo a equivocarse es humano, pero no es una razón sobre el asunto.'),
        ],
        objecion: 'Muy cómodo. Pero ¿dónde pones la frontera? La justicia, por ejemplo, ¿es como un gusto o como un hecho?',
        respuestas: [
          DR('Pongo la frontera en lo que puede argumentarse con razones que cualquiera puede revisar: la justicia se puede discutir con razones, no es solo un gusto.', 'b', 'Excelente: das un criterio claro y lo aplicas al caso difícil.'),
          DR('La justicia no es solo un gusto: si alguien me roba, no basta con que al ladrón le parezca bien.', 'b', 'Buena respuesta: usas un ejemplo que muestra el límite de la tesis.'),
          DR('No sé, cada uno verá.', 'd', 'Esquivar la pregunta deja tu postura sin defender.'),
          DR('La frontera la pongo donde me convenga en cada momento.', 'f', 'Cambiar el criterio según te conviene vacía de sentido tu postura.', 'razonamiento a conveniencia'),
        ],
        cierre: 'Buscar el criterio que separa una cosa de otra es exactamente lo que hacen los filósofos. No hay respuesta fácil: sigue buscando.' },
    ],
  },
  socrates: {
    tesis: 'Nadie hace el mal a sabiendas: quien obra mal, lo hace por ignorancia de lo que de verdad le conviene.',
    posturas: [
      { t: 'Estoy de acuerdo: el mal nace de la ignorancia.', eje: 'saber',
        razones: [
          DR('Nadie quiere hacerse daño a sí mismo; quien obra mal cree, equivocadamente, que eso le conviene.', 'b', 'Buena razón: reconstruyes el argumento central de Sócrates con tus palabras.'),
          DR('Cuando alguien entiende de verdad el daño que causa, muchas veces cambia su conducta.', 'b', 'Buena razón: apoyas la tesis en algo que se puede observar.'),
          DR('Porque lo dice Sócrates, que es muy sabio.', 'f', 'Ni siquiera Sócrates pedía obediencia: pedía razones.', 'falacia de autoridad'),
          DR('Porque es más bonito pensar que todos somos buenos.', 'd', 'Que una idea sea bonita no la hace verdadera.'),
        ],
        objecion: 'Pero piensa en alguien que sabe que copiar en un examen está mal, y aun así copia. ¿No lo sabía?',
        respuestas: [
          DR('Sabe la regla, pero no comprende de verdad por qué es mala; si lo comprendiera del todo, no copiaría.', 'b', 'Excelente: distingues entre conocer una regla y comprenderla de verdad.'),
          DR('Es cierto: a veces sabemos y aun así lo hacemos. Quizá no basta saber; también hace falta voluntad.', 'b', 'Revisas tu postura ante un buen ejemplo. Así pensará Aristóteles, que habló de la debilidad de la voluntad.'),
          DR('Ese ejemplo no cuenta.', 'd', 'Descartar un contraejemplo sin explicar por qué no es responder.'),
          DR('Los que copian son malas personas y punto.', 'f', 'Etiquetas a las personas en lugar de explicar el caso.', 'generalización apresurada'),
        ],
        cierre: 'Has examinado tu idea con un ejemplo difícil. Por eso digo que una vida sin examen no merece ser vivida.' },
      { t: 'No estoy de acuerdo: mucha gente hace el mal sabiendo que es malo.', eje: 'voluntad',
        razones: [
          DR('A veces alguien miente sabiendo que está mal, porque le conviene.', 'b', 'Buena razón: das un caso concreto contra la tesis.'),
          DR('Uno puede saber que algo hace daño y hacerlo igual por rabia o por miedo.', 'b', 'Buena razón: señalas que las emociones también mueven nuestros actos.'),
          DR('Porque todo el mundo hace cosas malas.', 'f', 'Que algo sea frecuente no explica si se hace sabiendo o no.', 'falacia de popularidad'),
          DR('Porque Sócrates era un ingenuo.', 'f', 'Descalificas a Sócrates en lugar de discutir su idea.', 'falacia ad hominem'),
        ],
        objecion: 'Piensa en quien miente porque le conviene. ¿Le conviene de verdad convertirse en alguien que miente? ¿No se daña a sí mismo, aunque no lo vea?',
        respuestas: [
          DR('Le conviene a corto plazo, aunque a la larga se dañe: lo que ignora es su verdadero bien.', 'b', 'Excelente: distingues entre la conveniencia inmediata y el verdadero bien, y te acercas a Sócrates sin perder tu punto.'),
          DR('Aun así, hay quien sabe que se daña y lo hace igual; por eso creo que además del saber está la voluntad.', 'b', 'Buena respuesta: mantienes tu postura con una razón nueva.'),
          DR('Me da igual si le conviene o no.', 'd', 'Dejas la objeción sin responder.'),
          DR('Eso es filosofía, no la vida real.', 'f', 'Descalificar la pregunta es una forma de no pensarla.', 'evasión'),
        ],
        cierre: 'No me has dado la razón, pero has pensado. Eso me alegra más que tu acuerdo.' },
      { t: 'Depende: a veces es ignorancia y a veces no.', eje: 'matiz',
        razones: [
          DR('Un niño que maltrata a un animal sin saber que sufre obra por ignorancia; un adulto que lo sabe, no.', 'b', 'Buena razón: comparas dos casos que parecen iguales y no lo son.'),
          DR('Hay errores por no saber y daños hechos a propósito; no son lo mismo.', 'b', 'Buena razón: distingues dos clases de mal.'),
          DR('Porque la verdad siempre está en el medio.', 'f', 'La verdad no siempre está entre dos posturas.', 'falacia del término medio'),
          DR('Porque cada caso es distinto, y ya.', 'd', 'Es cierto que los casos varían, pero falta decir en qué y por qué.'),
        ],
        objecion: 'Piensa en un adulto que sabe que un animal sufre y aun así lo maltrata. ¿Sabe de verdad lo que se hace a sí mismo al volverse cruel?',
        respuestas: [
          DR('Quizá sabe una parte, pero ignora otra: lo que pierde de sí mismo. Puedo aceptar que hay grados de saber.', 'b', 'Excelente: descubres que «saber» tiene grados.'),
          DR('Puede ser, pero entonces «ignorancia» significa algo más profundo que no tener información.', 'b', 'Buena respuesta: precisas el significado de una palabra clave del debate.'),
          DR('No lo sé, pregúntale a él.', 'd', 'Esquivas la pregunta en lugar de pensarla.'),
          DR('Eso solo pasa con la gente mala.', 'f', 'Repites la conclusión sin dar una razón nueva.', 'razonamiento circular'),
        ],
        cierre: 'Has descubierto que saber tiene grados. Es un descubrimiento enorme: sigue examinándolo.' },
    ],
  },
  platon: {
    tesis: 'Lo que vemos con los ojos son sombras: la verdad solo se alcanza con la razón.',
    posturas: [
      { t: 'Estoy de acuerdo: los sentidos engañan y la razón descubre la verdad.', eje: 'razon',
        razones: [
          DR('Los sentidos nos engañan: un palo dentro del agua parece quebrado y no lo está.', 'b', 'Buena razón: das un ejemplo clásico de ilusión de los sentidos.'),
          DR('Ningún círculo dibujado es perfecto, pero entendemos con la razón qué es un círculo perfecto.', 'b', 'Muy buena razón: es casi el argumento de Platón sobre las Ideas.'),
          DR('Porque Platón es el filósofo más famoso.', 'f', 'La fama de alguien no prueba que tenga razón.', 'falacia de autoridad'),
          DR('Porque suena profundo.', 'd', 'Que algo suene profundo no lo hace verdadero.'),
        ],
        objecion: 'Pero si los sentidos engañan, ¿cómo descubres el engaño? Cuando un palo dentro del agua parece quebrado, ¿no lo descubres también tocándolo, con otro sentido?',
        respuestas: [
          DR('Los sentidos se corrigen entre sí, pero es la razón la que compara y juzga cuál acierta.', 'b', 'Excelente: le das a cada uno su papel sin abandonar tu postura.'),
          DR('Es cierto: los sentidos también enseñan. Quizá la razón los necesita para empezar.', 'b', 'Revisas tu postura con honestidad. Así pensará tu alumno Aristóteles.'),
          DR('Porque sí.', 'd', '«Porque sí» no es una razón.'),
          DR('Tocarlo también engaña: todo engaña y nada se puede saber.', 'f', 'Saltas al extremo sin razones; y si nada se puede saber, tampoco eso.', 'pendiente resbaladiza'),
        ],
        cierre: 'Has subido un peldaño fuera de la caverna: los sentidos dan sombras, pero también pistas para la razón.' },
      { t: 'No estoy de acuerdo: conocemos el mundo gracias a los sentidos.', eje: 'experiencia',
        razones: [
          DR('La ciencia avanza observando y experimentando, no solo pensando.', 'b', 'Buena razón: apoyas tu postura en cómo se produce el conocimiento científico.'),
          DR('Quien nunca ha visto los colores no puede imaginarlos: el conocimiento empieza por la experiencia.', 'b', 'Buena razón: es casi el argumento de los empiristas como Locke y Hume.'),
          DR('Porque lo que no se ve no existe.', 'f', 'Hay cosas que no vemos y existen, como el aire o la gravedad.', 'generalización apresurada'),
          DR('Porque pensar cansa.', 'd', 'Es sincero, pero no dice nada sobre cómo conocemos.'),
        ],
        objecion: '¿Has visto alguna vez la justicia? ¿O el número tres? Sin embargo, sabes lo que son. ¿Qué sentido te los enseñó?',
        respuestas: [
          DR('Los aprendí de muchos casos que sí vi, y la mente sacó lo común: la experiencia es el punto de partida.', 'b', 'Gran respuesta: describes la abstracción, como hará Aristóteles.'),
          DR('Tienes razón: hay saberes que no vienen directamente de los sentidos. Quizá necesitamos ambos.', 'b', 'Revisas tu postura ante una buena objeción: eso es filosofar.'),
          DR('La justicia no existe.', 'd', 'Negar lo incómodo no es responder a la objeción.'),
          DR('Eso lo dices porque vives en las nubes.', 'f', 'Atacas a la persona en lugar de su argumento.', 'falacia ad hominem'),
        ],
        cierre: 'Defiendes la experiencia con buenos argumentos. Mi alumno Aristóteles pensará muy parecido a ti.' },
      { t: 'Depende: necesitamos las dos cosas, sentidos y razón.', eje: 'matiz',
        razones: [
          DR('Los sentidos dan los datos y la razón los ordena: sin datos no hay qué pensar, y sin razón no se entienden.', 'b', 'Buena razón: explicas qué aporta cada uno.'),
          DR('Un científico observa, pero también calcula y razona.', 'b', 'Buena razón: das un ejemplo donde ambas cosas trabajan juntas.'),
          DR('Porque la respuesta del medio siempre es la buena.', 'f', 'Quedarse en el medio no es por sí mismo una razón.', 'falacia del término medio'),
          DR('Porque así todos quedan contentos.', 'd', 'Contentar a todos no es un criterio de verdad.'),
        ],
        objecion: 'Pero si los sentidos y la razón dicen cosas distintas, ¿a quién crees? Eso es lo que hay que decidir.',
        respuestas: [
          DR('Creo a la razón cuando puede explicar el error de los sentidos, como en el palo dentro del agua.', 'b', 'Excelente: das un criterio y un ejemplo.'),
          DR('Busco que se pueda comprobar de varias maneras: si ambos coinciden, confío más.', 'b', 'Buena respuesta: propones contrastar las fuentes de conocimiento.'),
          DR('A quien más me guste en ese momento.', 'd', 'El gusto no sirve para decidir qué es verdadero.'),
          DR('A ninguno: mejor no pensar en eso.', 'f', 'Renunciar a pensar no resuelve la pregunta.', 'evasión'),
        ],
        cierre: 'Buscar el acuerdo entre los sentidos y la razón es el camino de casi toda la filosofía posterior. Bien pensado.' },
    ],
  },
};
