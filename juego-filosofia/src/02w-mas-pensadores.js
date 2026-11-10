// ============================================================================
//  Encargos y anécdotas de Demócrito, Séneca, Hobbes, Rousseau y Schopenhauer
// ============================================================================
Object.assign(QUESTS, {
  democrito: { text: 'Visita Mileto, donde empezó todo, y escucha al mercader que ha recorrido medio mundo. Luego dime de qué está hecho todo lo que existe.', needs: { pois: ['mileto'], npcs: ['mercader'] },
    riddle: { q: 'Según Demócrito, ¿de qué está hecho todo lo que existe?', a: ['De átomos y vacío', 'De agua', 'De cuatro elementos y amor', 'De números'] } },
  seneca: { text: 'Pasa bajo el arco de triunfo de Roma y escucha a Calias. Luego dime si la vida es corta o la hacemos corta.', needs: { pois: ['arco'], npcs: ['calias'] },
    riddle: { q: 'Según Séneca, ¿por qué nos parece que la vida es corta?', a: ['Porque la malgastamos: no es corta, la hacemos corta', 'Porque los dioses lo quieren', 'Porque es imposible vivir mucho', 'Porque el tiempo no existe'] } },
  hobbes: { text: 'Visita la Declaración de los derechos y escucha al librero, que sabe de libros prohibidos. Luego dime cómo sería la vida sin leyes ni gobierno.', needs: { pois: ['derechos'], npcs: ['librero'] },
    riddle: { q: 'Según Hobbes, ¿cómo sería la vida en el estado de naturaleza?', a: ['Solitaria, pobre, desagradable, brutal y breve', 'Libre y feliz', 'Igual que en una ciudad', 'Llena de fiestas'] } },
  rousseau: { text: 'Hojea la Enciclopedia, para la que escribí sobre música, y escucha a Émilie du Châtelet. Luego dime cómo nace el ser humano.', needs: { pois: ['enciclopedia'], npcs: ['chatelet'] },
    riddle: { q: 'Según Rousseau, ¿cómo nace el ser humano?', a: ['Bueno: es la sociedad la que lo corrompe', 'Malo, y la sociedad lo mejora', 'Ni bueno ni malo, como una máquina', 'Encadenado para siempre'] } },
  schopenhauer: { text: 'Contempla «El caminante sobre el mar de nubes» y escucha al pintor. Luego dime qué arte nos libera mejor del deseo.', needs: { pois: ['caminante'], npcs: ['pintor'] },
    riddle: { q: 'Para Schopenhauer, ¿qué arte nos libera mejor, por un momento, de la voluntad?', a: ['La música', 'La arquitectura', 'La cocina', 'La guerra'] } },
});
Object.assign(ANECDOTES, {
  democrito: ['Dicen que me reía tanto de las tonterías humanas que mis vecinos llamaron al médico Hipócrates para que me curara. Después de hablar conmigo, Hipócrates les dijo que el más cuerdo de la ciudad era yo.', 'Cuentan que vivía tan concentrado en mis estudios que me encerraba en un cobertizo del jardín y no me enteraba de lo que pasaba fuera.'],
  seneca: ['Me desterraron ocho años a la isla de Córcega, acusado de un escándalo en la corte. Allí escribí consuelos para mi madre, para que no sufriera por mí.', 'Era muy rico, y mis enemigos me acusaban de hipócrita por predicar la sencillez. Les respondía: no digo que yo sea sabio, digo cómo se debería vivir; estoy aprendiendo.'],
  hobbes: ['A los cuarenta años abrí por casualidad los Elementos de Euclides en un teorema. Dije: «¡Por Dios, esto es imposible!». Leí la demostración hacia atrás hasta convencerme, y me enamoré de la geometría.', 'Viví hasta los noventa y un años. Dicen que cantaba en voz alta en la cama, a solas, porque pensaba que era bueno para los pulmones.'],
  rousseau: ['Gané un concurso de la Academia de Dijon defendiendo que las ciencias y las artes no habían hecho mejores a las personas. Me hice famoso de un día para otro llevando la contraria a todos.', 'Escribí una ópera, «El adivino de la aldea», que gustó tanto al rey que quiso darme una pensión. No fui a recibirla: no quería depender de nadie.'],
  schopenhauer: ['Tenía un perro de lanas al que llamaba Atma, que en sánscrito significa «alma del mundo». Cuando se portaba mal, lo llamaba «¡humano!».', 'Llevaba siempre conmigo un ejemplar de las Upanishads traducidas al latín. Decía que habían sido el consuelo de mi vida y lo serían de mi muerte.'],
});
