// ============================================================================
//  TRES LUGARES MÁS EN EL CAMINO DE LA BIBLIA: el valle de Elá, Belén y la
//  tumba vacía (los juegos de 07y-biblia-juegos.js se abren desde aquí).
// ============================================================================
{
  const bi = ERAS.findIndex((e) => e.id === 'biblia');
  if (bi >= 0 && POIS[bi]) POIS[bi].push(
    { id: 'valle-ela', at: [17, -26], name: 'El valle de Elá', juego: ['honda', 'orden'],
      text: 'Según el primer libro de Samuel (capítulo 17), en el valle de Elá se enfrentaban los ejércitos de Israel y de los filisteos. Cada día, el gigante Goliat desafiaba a los israelitas. El joven pastor David, que llevaba comida a sus hermanos, se ofreció a luchar solo con su honda y cinco piedras lisas del torrente.',
      fact: 'Otro pasaje, 2 Samuel 21,19, atribuye la muerte de Goliat a Eljanán, uno de los guerreros de David. Los estudiosos discuten cómo se relacionan los dos relatos.',
      q: { q: 'Según 1 Samuel 17, ¿con qué se enfrentó David a Goliat?', a: ['Con una honda y piedras', 'Con espada y escudo', 'Con un arco y flechas', 'Con una lanza'], e: '1 Samuel 17,40: escogió cinco piedras lisas del torrente.' } },
    { id: 'belen', at: [8, 30], name: 'Belén',
      text: 'Según los evangelios de Mateo y Lucas, Jesús nació en Belén de Judea, la ciudad de David. Lucas cuenta que lo acostaron en un pesebre porque no había sitio para ellos en el alojamiento, y que unos pastores fueron a verlo; Mateo cuenta la visita de unos magos de Oriente guiados por una estrella. Sobre la gruta que señala la tradición se alza la basílica de la Natividad, una de las iglesias más antiguas del mundo.',
      fact: 'Nuestro calendario lo calculó en el siglo VI el monje Dionisio el Exiguo, que se equivocó en unos años: los historiadores sitúan el nacimiento de Jesús hacia el 6 o el 4 a. C., antes de la muerte del rey Herodes.',
      q: { q: '¿Qué evangelios cuentan el nacimiento de Jesús en Belén?', a: ['Mateo y Lucas', 'Marcos y Juan', 'Solo Juan', 'Ninguno'], e: 'Marcos y Juan empiezan su relato con Jesús ya adulto.' } },
    { id: 'tumba-vacia', at: [-17, -31], name: 'La tumba vacía', juego: ['tumba'],
      text: 'Según los cuatro evangelios, el primer día de la semana, muy de mañana, unas mujeres que seguían a Jesús fueron al sepulcro y lo encontraron vacío. Para los cristianos es el signo de la resurrección y el centro de su fe. La tradición sitúa el sepulcro en la actual basílica del Santo Sepulcro de Jerusalén.',
      fact: 'En el final más antiguo del evangelio de Marcos (16,8), las mujeres huyen del sepulcro llenas de miedo y no dicen nada a nadie. Los versículos 9 a 20 se añadieron después, como explican las notas de las biblias de estudio.',
      q: { q: 'Según los evangelios, ¿quiénes encontraron primero el sepulcro vacío?', a: ['Unas mujeres, entre ellas María Magdalena', 'Los soldados romanos', 'Los sumos sacerdotes', 'Pilato'], e: 'Los cuatro evangelios coinciden en que María Magdalena estaba allí.' } },
  );
}
