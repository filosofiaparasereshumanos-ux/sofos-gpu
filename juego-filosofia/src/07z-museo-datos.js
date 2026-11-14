// ============================================================================
//  MUSEO DE OBRAS MAESTRAS: las obras (imágenes de Wikimedia Commons, con su
//  autor y su licencia libre) y el lugar del museo en «El taller de la belleza».
// ============================================================================
const OBRAS = [
 {
  "id": "willendorf",
  "img": "willendorf.jpg",
  "epoca": "antiguedad",
  "titulo": "Venus de Willendorf",
  "autor": "Anónimo (cultura gravetiense, Paleolítico superior)",
  "fecha": "Hace unos 30.000 años",
  "tecnica": "Piedra caliza oolítica con restos de ocre rojo (11 cm)",
  "lugar": "Museo de Historia Natural (Naturhistorisches Museum), Viena",
  "texto": "Esta pequeña figura femenina, de solo 11 centímetros, es una de las representaciones humanas más antiguas que conocemos. No sabemos para qué servía: se ha propuesto que fuera un símbolo de fertilidad o de abundancia, pero es una hipótesis, no un dato. Curiosamente, no tiene rostro: la cabeza está cubierta por lo que podrían ser trenzas o un tocado.",
  "q": {
   "q": "¿Qué rasgo llamativo tiene la Venus de Willendorf?",
   "a": [
    "No tiene rostro visible",
    "Tiene alas",
    "Lleva una corona de oro",
    "Mide más de dos metros"
   ]
  },
  "credito": "Matthias Kabel · CC BY 2.5 · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Venus_von_Willendorf_01.jpg"
 },
 {
  "id": "altamira",
  "img": "altamira.jpg",
  "epoca": "antiguedad",
  "titulo": "Bisonte del techo de Altamira",
  "autor": "Anónimo (Paleolítico superior, Magdaleniense)",
  "fecha": "Hace unos 15.000–14.000 años (techo polícromo)",
  "tecnica": "Pintura con ocre y carbón sobre roca, aprovechando sus relieves",
  "lugar": "Cueva de Altamira, Santillana del Mar (Cantabria); réplica en el Museo de Altamira",
  "texto": "En el techo de la cueva, varios bisontes pintados en rojo y negro parecen moverse gracias a que los artistas aprovecharon los bultos naturales de la roca. Altamira fue la primera cueva donde se reconoció el arte rupestre paleolítico, aunque durante años muchos expertos pensaron que era una falsificación. Se cuenta que fue la niña María Sanz de Sautuola quien, en 1879, vio primero las pinturas al mirar hacia arriba.",
  "q": {
   "q": "¿Dónde se encuentra la cueva de Altamira?",
   "a": [
    "En Cantabria (España)",
    "En el sur de Francia",
    "En Egipto",
    "En Grecia"
   ]
  },
  "credito": "Matthias Kabel (foto de la réplica del Museo de Altamira) · CC BY 2.5 · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Reproduction_cave_of_Altamira_01.jpg"
 },
 {
  "id": "nefertiti",
  "img": "nefertiti.jpg",
  "epoca": "antiguedad",
  "titulo": "Busto de Nefertiti",
  "autor": "Taller del escultor Tutmose (atribución), Antiguo Egipto",
  "fecha": "Hacia 1345 a. C. (periodo de Amarna)",
  "tecnica": "Piedra caliza recubierta de estuco pintado",
  "lugar": "Neues Museum, Berlín",
  "texto": "Representa a Nefertiti, esposa del faraón Akenatón, el rey que intentó imponer el culto a un único dios solar, Atón. Fue hallado en 1912 por una expedición alemana en el taller de un escultor en Amarna y hoy Egipto reclama su devolución. Un detalle curioso: el ojo izquierdo no tiene incrustación, y no se sabe si nunca la tuvo o se perdió.",
  "q": {
   "q": "¿En qué ciudad se expone hoy el busto de Nefertiti?",
   "a": [
    "Berlín",
    "El Cairo",
    "Londres",
    "París"
   ]
  },
  "credito": "Philip Pikart · CC BY-SA 3.0 · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Nofretete_Neues_Museum.jpg"
 },
 {
  "id": "tutankamon",
  "img": "tutankamon.jpg",
  "epoca": "antiguedad",
  "titulo": "Máscara funeraria de Tutankamón",
  "autor": "Orfebres reales del Antiguo Egipto (dinastía XVIII)",
  "fecha": "Hacia 1323 a. C.",
  "tecnica": "Oro con incrustaciones de lapislázuli, cornalina, cuarzo, obsidiana, turquesa y pasta vítrea",
  "lugar": "Gran Museo Egipcio, Guiza (antes en el Museo Egipcio de El Cairo)",
  "texto": "Esta máscara cubría el rostro de la momia del joven faraón Tutankamón, cuya tumba casi intacta descubrió Howard Carter en 1922. Pesa algo más de 10 kilos de oro y quería asegurar que el difunto fuera reconocido y protegido en el más allá. En la parte trasera lleva grabado un hechizo del llamado Libro de los Muertos.",
  "q": {
   "q": "¿Quién descubrió la tumba de Tutankamón en 1922?",
   "a": [
    "Howard Carter",
    "Napoleón Bonaparte",
    "Heinrich Schliemann",
    "Jean-François Champollion"
   ]
  },
  "credito": "Roland Unger · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:CairoEgMuseumTaaMaskMostlyPhotographed.jpg"
 },
 {
  "id": "discobolo",
  "img": "discobolo.jpg",
  "epoca": "antiguedad",
  "titulo": "Discóbolo (copia Lancelotti)",
  "autor": "Mirón (original griego en bronce, perdido); copia romana",
  "fecha": "Original hacia 460–450 a. C.; copia del siglo II d. C.",
  "tecnica": "Mármol (copia romana de un original en bronce)",
  "lugar": "Museo Nacional Romano, Palazzo Massimo alle Terme, Roma",
  "texto": "Un atleta está a punto de lanzar el disco: Mirón congeló el instante de máxima tensión, justo antes del giro. El bronce original se perdió y lo conocemos gracias a copias romanas en mármol como esta. Es un ejemplo del ideal griego de cuerpo armonioso y equilibrado, aunque la postura real de un lanzador no es exactamente así.",
  "q": {
   "q": "¿Qué hace la figura del Discóbolo?",
   "a": [
    "Se dispone a lanzar un disco",
    "Corre una maratón",
    "Lucha con una serpiente",
    "Toca la lira"
   ]
  },
  "credito": "Livioandronico2013 · CC BY-SA 4.0 · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Discobolus_in_National_Roman_Museum_Palazzo_Massimo_alle_Terme.JPG"
 },
 {
  "id": "venus-milo",
  "img": "venus-milo.jpg",
  "epoca": "antiguedad",
  "titulo": "Venus de Milo (Afrodita de Milo)",
  "autor": "Atribuida a Alejandro de Antioquía (época helenística)",
  "fecha": "Hacia 150–125 a. C.",
  "tecnica": "Mármol de Paros (unos 2 m de altura)",
  "lugar": "Museo del Louvre, París",
  "texto": "Esta estatua de la diosa del amor y la belleza fue hallada en 1820 en la isla griega de Milo y pronto se convirtió en un emblema del Louvre. Combina la serenidad del rostro con un cuerpo en suave giro, típico del arte helenístico. Sus brazos se perdieron y nadie sabe con certeza qué sostenía: se ha propuesto una manzana, un escudo o un espejo.",
  "q": {
   "q": "¿Qué parte le falta a la Venus de Milo?",
   "a": [
    "Los brazos",
    "La cabeza",
    "Las piernas",
    "Nada, está completa"
   ]
  },
  "credito": "Jastrow · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Venus_de_Milo_Louvre_Ma399_n4.jpg"
 },
 {
  "id": "victoria-samotracia",
  "img": "victoria-samotracia.jpg",
  "epoca": "antiguedad",
  "titulo": "Victoria alada de Samotracia",
  "autor": "Anónimo (época helenística)",
  "fecha": "Hacia 190 a. C.",
  "tecnica": "Mármol de Paros (figura) y mármol gris de Lartos (proa de barco)",
  "lugar": "Museo del Louvre, París (escalera Daru)",
  "texto": "La diosa Niké (la Victoria) se posa sobre la proa de un barco, con el viento pegando la túnica a su cuerpo y las alas desplegadas. Probablemente conmemoraba una victoria naval y se colocó en el santuario de los Grandes Dioses de Samotracia, donde la halló en 1863 el francés Charles Champoiseau. Le faltan la cabeza y los brazos, pero en 1950 se encontró su mano derecha, que se expone junto a ella.",
  "q": {
   "q": "¿Sobre qué se apoya la Victoria de Samotracia?",
   "a": [
    "Sobre la proa de un barco",
    "Sobre un carro de caballos",
    "Sobre una columna jónica",
    "Sobre un león"
   ]
  },
  "credito": "Shonagon · CC0 · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Victoire_de_Samothrace_-_Musee_du_Louvre_-_20190812.jpg"
 },
 {
  "id": "laocoonte",
  "img": "laocoonte.jpg",
  "epoca": "antiguedad",
  "titulo": "Laocoonte y sus hijos",
  "autor": "Agesandro, Atenodoro y Polidoro de Rodas",
  "fecha": "Siglo I a. C. – siglo I d. C. (fecha discutida)",
  "tecnica": "Mármol",
  "lugar": "Museos Vaticanos (Museo Pío-Clementino), Ciudad del Vaticano",
  "texto": "El sacerdote troyano Laocoonte y sus dos hijos luchan contra unas serpientes enviadas por los dioses, según el mito. Los cuerpos retorcidos y el rostro de dolor muestran el gusto helenístico por las emociones extremas. Se desenterró en Roma en 1506 y causó sensación entre los artistas del Renacimiento; entre quienes acudieron a verlo estaba Miguel Ángel.",
  "q": {
   "q": "¿Contra qué luchan Laocoonte y sus hijos?",
   "a": [
    "Contra serpientes",
    "Contra leones",
    "Contra soldados griegos",
    "Contra un toro"
   ]
  },
  "credito": "LivioAndronico · CC BY-SA 4.0 · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Laocoon_and_His_Sons.jpg"
 },
 {
  "id": "terracota",
  "img": "terracota.jpg",
  "epoca": "oriente",
  "titulo": "Guerreros de terracota",
  "autor": "Talleres imperiales de la dinastía Qin (China)",
  "fecha": "Hacia 210 a. C.",
  "tecnica": "Terracota originalmente policromada, con armas de bronce",
  "lugar": "Museo del Mausoleo del Emperador Qin Shi Huang, Lintong (Xi'an, China)",
  "texto": "Miles de soldados, caballos y carros de tamaño natural acompañaban en la muerte a Qin Shi Huang, el primer emperador de una China unificada. Los descubrieron en 1974 unos campesinos que cavaban un pozo, y se calcula que hay unas 8.000 figuras, muchas aún sin excavar. Se fabricaban con piezas de molde, pero los rasgos se retocaban a mano, por lo que los rostros muestran una gran variedad; además, estaban pintados con colores vivos.",
  "q": {
   "q": "¿Para quién se hicieron los guerreros de terracota?",
   "a": [
    "Para el primer emperador de China, Qin Shi Huang",
    "Para el faraón Ramsés II",
    "Para el emperador romano Augusto",
    "Para Gengis Kan"
   ]
  },
  "credito": "Jmhullot · CC BY 3.0 · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Terracotta_Army,_View_of_Pit_1.jpg"
 },
 {
  "id": "nataraja",
  "img": "nataraja.jpg",
  "epoca": "oriente",
  "titulo": "Shiva Nataraja (Señor de la danza)",
  "autor": "Anónimo, periodo Chola (sur de la India, Tamil Nadu)",
  "fecha": "Hacia 950–1000",
  "tecnica": "Aleación de cobre (bronce), fundida a la cera perdida",
  "lugar": "Museo de Arte del Condado de Los Ángeles (LACMA), Los Ángeles",
  "texto": "El dios hindú Shiva baila dentro de un aro de llamas: con su danza destruye y vuelve a crear el universo una y otra vez. Cada gesto tiene significado: en una mano lleva un tambor (la creación), en otra el fuego (la destrucción), y bajo su pie aplasta a un enano que simboliza la ignorancia. Los bronces de este tipo se sacaban en procesión durante las fiestas de los templos.",
  "q": {
   "q": "¿Qué hace Shiva en esta escultura?",
   "a": [
    "Bailar la danza que destruye y recrea el universo",
    "Meditar bajo un árbol",
    "Montar a caballo",
    "Escribir un libro sagrado"
   ]
  },
  "credito": "Los Angeles County Museum of Art (LACMA) · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Shiva_as_the_Lord_of_Dance_LACMA_edit.jpg"
 },
 {
  "id": "gran-ola",
  "img": "gran-ola.jpg",
  "epoca": "oriente",
  "titulo": "La gran ola de Kanagawa",
  "autor": "Katsushika Hokusai",
  "fecha": "Hacia 1830–1832",
  "tecnica": "Xilografía en color (ukiyo-e), de la serie Treinta y seis vistas del monte Fuji",
  "lugar": "Se conservan muchas estampas; esta, en el Metropolitan Museum of Art, Nueva York",
  "texto": "Una ola gigantesca, con su cresta como garras, amenaza a tres barcas de pescadores mientras al fondo asoma, diminuto, el monte Fuji. Al ser un grabado, se imprimieron muchas copias y hoy hay ejemplares en museos de todo el mundo; influyó mucho en artistas europeos como Monet o Van Gogh. Hokusai usó el azul de Prusia, un pigmento importado de Europa que entonces era novedoso en Japón.",
  "q": {
   "q": "¿Qué montaña aparece al fondo de La gran ola?",
   "a": [
    "El monte Fuji",
    "El Everest",
    "El Kilimanjaro",
    "El Olimpo"
   ]
  },
  "credito": "Metropolitan Museum of Art · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg",
  "cuadro": 1
 },
 {
  "id": "arnolfini",
  "img": "arnolfini.jpg",
  "epoca": "renacimiento",
  "titulo": "El matrimonio Arnolfini",
  "autor": "Jan van Eyck",
  "fecha": "1434",
  "tecnica": "Óleo sobre tabla de roble",
  "lugar": "National Gallery, Londres",
  "texto": "Una pareja posa en una habitación llena de objetos minuciosamente pintados: la lámpara, las naranjas, el perrito, los zuecos. Tradicionalmente se identifica a los retratados con el mercader Giovanni di Nicolao Arnolfini y su esposa, aunque el significado exacto de la escena se sigue discutiendo. En el espejo convexo del fondo se reflejan dos personas más en la puerta, y encima el pintor escribió «Johannes de eyck fuit hic 1434» («Jan van Eyck estuvo aquí»).",
  "q": {
   "q": "¿Qué objeto del fondo refleja a dos personas que entran en la habitación?",
   "a": [
    "Un espejo convexo",
    "Una ventana",
    "Un cuadro",
    "Una armadura"
   ]
  },
  "credito": "National Gallery, London · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Van_Eyck_-_Arnolfini_Portrait.jpg"
 },
 {
  "id": "venus-botticelli",
  "img": "venus-botticelli.jpg",
  "epoca": "renacimiento",
  "titulo": "El nacimiento de Venus",
  "autor": "Sandro Botticelli",
  "fecha": "Hacia 1484–1486",
  "tecnica": "Temple sobre lienzo",
  "lugar": "Galería de los Uffizi, Florencia",
  "texto": "La diosa Venus, nacida del mar, llega a la orilla sobre una concha empujada por el soplo de Céfiro, mientras una figura femenina se apresura a cubrirla con un manto. Fue uno de los primeros desnudos mitológicos de gran tamaño desde la Antigüedad y refleja el interés de la Florencia del siglo XV por la cultura clásica. Está pintado sobre lienzo, algo poco habitual en la Florencia de entonces, donde se solía pintar sobre tabla.",
  "q": {
   "q": "¿Sobre qué llega Venus a la orilla?",
   "a": [
    "Sobre una concha",
    "Sobre un delfín",
    "Sobre una barca",
    "Sobre una nube"
   ]
  },
  "credito": "Google Art Project · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
  "cuadro": 1
 },
 {
  "id": "ultima-cena",
  "img": "ultima-cena.jpg",
  "epoca": "renacimiento",
  "titulo": "La última cena",
  "autor": "Leonardo da Vinci",
  "fecha": "1495–1498",
  "tecnica": "Temple y óleo sobre yeso (técnica experimental en seco)",
  "lugar": "Refectorio del convento de Santa Maria delle Grazie, Milán",
  "texto": "Leonardo pintó el instante en que Jesús anuncia a sus doce apóstoles que uno de ellos lo traicionará, y cada uno reacciona de forma distinta. Las líneas de la arquitectura conducen la mirada hacia la cabeza de Jesús, en el centro exacto de la composición. Como no usó la técnica del fresco, la pintura empezó a deteriorarse ya en vida del artista; una larga restauración terminó en 1999.",
  "q": {
   "q": "¿Qué momento representa La última cena de Leonardo?",
   "a": [
    "Cuando Jesús anuncia que uno de los apóstoles lo traicionará",
    "La resurrección de Jesús",
    "El bautismo de Jesús",
    "La boda de Caná"
   ]
  },
  "credito": "Reproducción de dominio público · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Leonardo_da_Vinci_(1452-1519)_-_The_Last_Supper_(1495-1498).jpg"
 },
 {
  "id": "gioconda",
  "img": "gioconda.jpg",
  "epoca": "renacimiento",
  "titulo": "La Gioconda (Mona Lisa)",
  "autor": "Leonardo da Vinci",
  "fecha": "Hacia 1503–1519",
  "tecnica": "Óleo sobre tabla de álamo (77 × 53 cm)",
  "lugar": "Museo del Louvre, París",
  "texto": "Se identifica a la retratada con Lisa Gherardini, esposa del comerciante florentino Francesco del Giocondo, de ahí su nombre. Leonardo usó el sfumato, un difuminado suave de contornos que hace que su famosa sonrisa parezca cambiar según dónde la miremos. Su fama mundial creció enormemente después de que fuera robada del Louvre en 1911; apareció dos años después en Florencia.",
  "q": {
   "q": "¿En qué museo está La Gioconda?",
   "a": [
    "El Louvre (París)",
    "El Prado (Madrid)",
    "Los Uffizi (Florencia)",
    "La National Gallery (Londres)"
   ]
  },
  "credito": "C2RMF · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg",
  "cuadro": 1
 },
 {
  "id": "piedad",
  "img": "piedad.jpg",
  "epoca": "renacimiento",
  "titulo": "La Piedad",
  "autor": "Miguel Ángel Buonarroti",
  "fecha": "1498–1499",
  "tecnica": "Mármol de Carrara",
  "lugar": "Basílica de San Pedro, Ciudad del Vaticano",
  "texto": "La Virgen María sostiene en su regazo el cuerpo de Jesús muerto, con una serenidad que contrasta con el dolor del tema. Miguel Ángel la esculpió con poco más de veinte años y es la única obra que firmó: su nombre aparece en la cinta que cruza el pecho de María. Se cuenta, según el biógrafo Vasari, que la firmó tras oír que la atribuían a otro escultor.",
  "q": {
   "q": "¿Dónde firmó Miguel Ángel La Piedad?",
   "a": [
    "En la cinta que cruza el pecho de la Virgen",
    "En la base, por debajo",
    "En la espalda de Jesús",
    "No la firmó"
   ]
  },
  "credito": "Jebulon · CC0 · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Michelangelo%27s_Piet%C3%A0_Saint_Peter%27s_Basilica_Vatican_City.jpg"
 },
 {
  "id": "david",
  "img": "david.jpg",
  "epoca": "renacimiento",
  "titulo": "David",
  "autor": "Miguel Ángel Buonarroti",
  "fecha": "1501–1504",
  "tecnica": "Mármol (5,17 m de altura)",
  "lugar": "Galleria dell'Accademia, Florencia (desde 1873)",
  "texto": "Miguel Ángel representó al joven héroe bíblico concentrado, probablemente justo antes de enfrentarse al gigante Goliat, con la honda sobre el hombro. Lo talló en un enorme bloque de mármol que otros escultores habían empezado y abandonado décadas antes. Se colocó frente al Palazzo Vecchio como símbolo de la República de Florencia; hoy allí hay una copia y el original está protegido en un museo.",
  "q": {
   "q": "¿A quién se dispone a enfrentarse el David de Miguel Ángel?",
   "a": [
    "Al gigante Goliat",
    "Al Minotauro",
    "A un león",
    "Al rey Saúl"
   ]
  },
  "credito": "Livioandronico2013 · CC BY-SA 4.0 · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Michelangelo%27s_David_2015.jpg"
 },
 {
  "id": "creacion-adan",
  "img": "creacion-adan.jpg",
  "epoca": "renacimiento",
  "titulo": "La creación de Adán",
  "autor": "Miguel Ángel Buonarroti",
  "fecha": "Hacia 1508–1512",
  "tecnica": "Fresco (bóveda de la Capilla Sixtina)",
  "lugar": "Capilla Sixtina, Museos Vaticanos, Ciudad del Vaticano",
  "texto": "Dios, rodeado de ángeles, extiende el brazo hacia Adán para darle la vida; sus dedos casi se tocan, pero no del todo. Forma parte de la enorme bóveda que Miguel Ángel pintó durante unos cuatro años, en gran parte trabajando sobre un andamio. Algunos estudiosos han sugerido que la silueta que envuelve a Dios recuerda la forma de un cerebro humano, aunque es una interpretación discutida.",
  "q": {
   "q": "¿Qué detalle es famoso en La creación de Adán?",
   "a": [
    "Los dedos de Dios y Adán casi se tocan",
    "Adán lleva una corona",
    "Dios aparece como un niño",
    "La escena ocurre de noche"
   ]
  },
  "credito": "Reproducción de dominio público · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Michelangelo_-_Creation_of_Adam_(cropped).jpg"
 },
 {
  "id": "escuela-atenas",
  "img": "escuela-atenas.jpg",
  "epoca": "renacimiento",
  "titulo": "La escuela de Atenas",
  "autor": "Rafael Sanzio",
  "fecha": "1509–1511",
  "tecnica": "Fresco",
  "lugar": "Estancia de la Signatura, Palacio Apostólico (Museos Vaticanos), Ciudad del Vaticano",
  "texto": "Rafael reunió en un gran edificio clásico a los filósofos y sabios de la Antigüedad. En el centro, Platón señala hacia arriba, al mundo de las Ideas, mientras Aristóteles extiende la mano hacia delante, hacia el mundo que podemos observar: dos maneras de buscar la verdad. Se suele afirmar que Platón tiene el rostro de Leonardo da Vinci, y Rafael se retrató a sí mismo mirándonos en el borde derecho.",
  "q": {
   "q": "¿Hacia dónde señala Platón en La escuela de Atenas?",
   "a": [
    "Hacia arriba",
    "Hacia el suelo",
    "Hacia Aristóteles",
    "Hacia el espectador"
   ]
  },
  "credito": "Vatican.va · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg"
 },
 {
  "id": "jardin-delicias",
  "img": "jardin-delicias.jpg",
  "epoca": "renacimiento",
  "titulo": "El jardín de las delicias",
  "autor": "El Bosco (Jheronimus Bosch)",
  "fecha": "Hacia 1490–1500",
  "tecnica": "Óleo sobre tabla (tríptico)",
  "lugar": "Museo Nacional del Prado, Madrid",
  "texto": "Este tríptico muestra a la izquierda el Paraíso con Adán y Eva, en el centro un enorme jardín lleno de figuras desnudas, frutas gigantes y animales extraños, y a la derecha un infierno de pesadilla. Su significado sigue discutiéndose, aunque muchos lo interpretan como una advertencia sobre el pecado y los placeres pasajeros. En el infierno, los instrumentos musicales se convierten en objetos de tortura, y uno de los condenados lleva una partitura pintada en el trasero.",
  "q": {
   "q": "¿Qué se representa en el panel derecho de El jardín de las delicias?",
   "a": [
    "El infierno",
    "El Paraíso",
    "Un banquete real",
    "Una batalla naval"
   ]
  },
  "credito": "Museo del Prado / Google Earth · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:The_Garden_of_Earthly_Delights_by_Bosch_High_Resolution.jpg"
 },
 {
  "id": "piedra-sol",
  "img": "piedra-sol.jpg",
  "epoca": "oriente",
  "titulo": "Piedra del Sol («Calendario azteca»)",
  "autor": "Cultura mexica",
  "fecha": "Hacia 1502–1521",
  "tecnica": "Basalto tallado (unos 3,6 m de diámetro y unas 24 toneladas)",
  "lugar": "Museo Nacional de Antropología, Ciudad de México",
  "texto": "Este gran disco de piedra fue hallado en 1790 bajo la plaza principal de Ciudad de México, la antigua Tenochtitlan. Aunque se le llama «calendario», no servía para consultar fechas: es un monumento ceremonial que representa la concepción mexica del tiempo y de las eras del mundo, con los signos de los 20 días alrededor. La identidad del rostro central se discute (el Sol, Tonatiuh, o la Tierra, Tlaltecuhtli), y originalmente estaba pintado.",
  "q": {
   "q": "¿Qué cultura talló la Piedra del Sol?",
   "a": [
    "La mexica (azteca)",
    "La maya",
    "La inca",
    "La olmeca"
   ]
  },
  "credito": "Juan Carlos Fonseca Mata · CC BY-SA 4.0 · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Piedra_del_Sol_-_Sala_Mexica_del_Museo_Nacional_de_Antropolog%C3%ADa.jpg"
 },
 {
  "id": "vocacion-mateo",
  "img": "vocacion-mateo.jpg",
  "epoca": "barroco",
  "titulo": "La vocación de san Mateo",
  "autor": "Michelangelo Merisi da Caravaggio",
  "fecha": "1599–1600",
  "tecnica": "Óleo sobre lienzo",
  "lugar": "Capilla Contarelli, iglesia de San Luigi dei Francesi, Roma",
  "texto": "Jesús entra en una oscura oficina de recaudadores de impuestos y señala a Mateo para que lo siga; un haz de luz cruza la escena como si fuera la propia llamada. Caravaggio pintó un episodio sagrado con personajes vestidos como gente corriente de su época y con fuertes contrastes de luz y sombra (claroscuro). Los expertos aún discuten cuál de los hombres sentados es Mateo, y la mano de Jesús recuerda a la de Adán en la Capilla Sixtina.",
  "q": {
   "q": "¿Qué recurso es característico de Caravaggio en esta obra?",
   "a": [
    "El fuerte contraste de luz y sombra",
    "El uso de pan de oro",
    "La pintura abstracta",
    "Las figuras diminutas"
   ]
  },
  "credito": "Reproducción de dominio público · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:The_Calling_of_Saint_Matthew-Caravaggo_(1599-1600).jpg"
 },
 {
  "id": "extasis-teresa",
  "img": "extasis-teresa.jpg",
  "epoca": "barroco",
  "titulo": "El éxtasis de santa Teresa",
  "autor": "Gian Lorenzo Bernini",
  "fecha": "1647–1652",
  "tecnica": "Mármol, bronce dorado y estuco",
  "lugar": "Capilla Cornaro, iglesia de Santa Maria della Vittoria, Roma",
  "texto": "Un ángel está a punto de clavar una flecha de oro en el corazón de santa Teresa de Jesús, que se desvanece en una experiencia mística. Bernini se basó en la descripción que la propia santa escribió en su «Libro de la vida». La capilla funciona como un teatro: una ventana oculta ilumina la escena y, en los laterales, miembros de la familia Cornaro esculpidos parecen contemplarla desde unos palcos.",
  "q": {
   "q": "¿En qué texto se inspiró Bernini para esta escultura?",
   "a": [
    "En el «Libro de la vida» de la propia santa Teresa",
    "En la Odisea de Homero",
    "En la Divina comedia de Dante",
    "En el Quijote"
   ]
  },
  "credito": "Alvesgaspar · CC BY-SA 4.0 · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Ecstasy_of_Saint_Teresa_September_2015-2a.jpg"
 },
 {
  "id": "meninas",
  "img": "meninas.jpg",
  "epoca": "barroco",
  "titulo": "Las meninas",
  "autor": "Diego Velázquez",
  "fecha": "1656",
  "tecnica": "Óleo sobre lienzo (318 × 276 cm)",
  "lugar": "Museo Nacional del Prado, Madrid",
  "texto": "La infanta Margarita aparece rodeada de sus damas de compañía (las «meninas»), mientras el propio Velázquez, a la izquierda, se pinta trabajando ante un gran lienzo. En el espejo del fondo se reflejan los reyes Felipe IV y Mariana de Austria, como si estuvieran donde está el espectador: ¿quién mira a quién? La cruz roja de la Orden de Santiago en el pecho del pintor se añadió después de 1659, cuando recibió ese honor.",
  "q": {
   "q": "¿Quiénes se reflejan en el espejo del fondo de Las meninas?",
   "a": [
    "Los reyes Felipe IV y Mariana de Austria",
    "El papa y un cardenal",
    "Velázquez y su esposa",
    "Nadie: el espejo está vacío"
   ]
  },
  "credito": "Museo del Prado / Google Earth · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Las_Meninas,_by_Diego_Vel%C3%A1zquez,_from_Prado_in_Google_Earth.jpg",
  "cuadro": 1
 },
 {
  "id": "joven-perla",
  "img": "joven-perla.jpg",
  "epoca": "barroco",
  "titulo": "La joven de la perla",
  "autor": "Johannes Vermeer",
  "fecha": "Hacia 1665",
  "tecnica": "Óleo sobre lienzo (44,5 × 39 cm)",
  "lugar": "Mauritshuis, La Haya",
  "texto": "Una joven con turbante azul y amarillo se gira hacia nosotros con los labios entreabiertos, como si fuera a decir algo. No es un retrato de una persona concreta sino un «tronie», un estudio de rostro con un atuendo exótico, y no sabemos quién posó. La famosa perla está hecha con apenas unas pinceladas, y por su gran tamaño algunos piensan que podría ser de vidrio o metal pulido.",
  "q": {
   "q": "¿Qué es un «tronie», como La joven de la perla?",
   "a": [
    "Un estudio de rostro, no el retrato de alguien concreto",
    "Un retrato oficial de una reina",
    "Un paisaje marino",
    "Una escena religiosa"
   ]
  },
  "credito": "Mauritshuis · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:1665_Girl_with_a_Pearl_Earring.jpg",
  "cuadro": 1
 },
 {
  "id": "ronda-noche",
  "img": "ronda-noche.jpg",
  "epoca": "barroco",
  "titulo": "La ronda de noche",
  "autor": "Rembrandt van Rijn",
  "fecha": "1642",
  "tecnica": "Óleo sobre lienzo (379,5 × 453,5 cm)",
  "lugar": "Rijksmuseum, Ámsterdam",
  "texto": "Es un retrato de grupo de una compañía de la milicia ciudadana de Ámsterdam, dirigida por el capitán Frans Banninck Cocq, que se pone en marcha con lanzas, mosquetes y un tambor. Rembrandt rompió con los retratos de grupo estáticos y llenó la escena de movimiento y luz. En realidad no es una escena nocturna: el barniz oscurecido con los siglos le dio ese nombre, y en 1715 el lienzo se recortó por los lados para que cupiera en una pared.",
  "q": {
   "q": "¿Por qué se llama «La ronda de noche»?",
   "a": [
    "Porque el barniz oscurecido la hacía parecer nocturna",
    "Porque Rembrandt la pintó de noche",
    "Porque representa una batalla nocturna",
    "Porque se expone a oscuras"
   ]
  },
  "credito": "Rijksmuseum · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:The_Night_Watch_-_HD.jpg"
 },
 {
  "id": "tres-mayo",
  "img": "tres-mayo.jpg",
  "epoca": "siglo-xviii-xix",
  "titulo": "El 3 de mayo de 1808 en Madrid (Los fusilamientos)",
  "autor": "Francisco de Goya",
  "fecha": "1814",
  "tecnica": "Óleo sobre lienzo",
  "lugar": "Museo Nacional del Prado, Madrid",
  "texto": "Goya muestra el fusilamiento de madrileños por soldados franceses tras el levantamiento del 2 de mayo de 1808 contra las tropas de Napoleón. Los soldados aparecen de espaldas y sin rostro, como una máquina de matar, mientras las víctimas tienen caras llenas de miedo y desesperación. El hombre de camisa blanca abre los brazos como en una crucifixión, y en una de sus manos se aprecia una marca que recuerda a un estigma.",
  "q": {
   "q": "¿Quiénes disparan en El 3 de mayo de 1808?",
   "a": [
    "Soldados franceses",
    "Soldados ingleses",
    "Guerrilleros españoles",
    "Piratas"
   ]
  },
  "credito": "Museo del Prado / Google Earth · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg"
 },
 {
  "id": "caminante",
  "img": "caminante.jpg",
  "epoca": "siglo-xviii-xix",
  "titulo": "El caminante sobre el mar de nubes",
  "autor": "Caspar David Friedrich",
  "fecha": "Hacia 1817",
  "tecnica": "Óleo sobre lienzo",
  "lugar": "Hamburger Kunsthalle, Hamburgo",
  "texto": "Un hombre, de espaldas, contempla desde lo alto de una roca un paisaje de montañas envuelto en niebla. Es un icono del Romanticismo: expresa lo sublime, esa mezcla de admiración y vértigo ante una naturaleza inmensa. Al verlo de espaldas no conocemos su rostro, y así el espectador puede ponerse en su lugar; su identidad sigue siendo desconocida.",
  "q": {
   "q": "¿A qué movimiento artístico pertenece El caminante sobre el mar de nubes?",
   "a": [
    "Romanticismo",
    "Cubismo",
    "Impresionismo",
    "Gótico"
   ]
  },
  "credito": "Cybershot800i · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg"
 },
 {
  "id": "libertad",
  "img": "libertad.jpg",
  "epoca": "siglo-xviii-xix",
  "titulo": "La Libertad guiando al pueblo",
  "autor": "Eugène Delacroix",
  "fecha": "1830",
  "tecnica": "Óleo sobre lienzo",
  "lugar": "Museo del Louvre, París",
  "texto": "Una mujer con gorro frigio y la bandera tricolor, alegoría de la Libertad, guía a parisinos de distintas clases sociales por encima de una barricada. Delacroix pintó la Revolución de Julio de 1830, que derrocó al rey Carlos X, y escribió a su hermano que, si no había luchado por su patria, al menos pintaría para ella. Se suele decir que el chico con pistolas pudo inspirar al personaje de Gavroche de Los miserables de Victor Hugo, aunque no hay prueba directa.",
  "q": {
   "q": "¿Qué acontecimiento inspiró La Libertad guiando al pueblo?",
   "a": [
    "La Revolución de Julio de 1830 en París",
    "La toma de la Bastilla de 1789",
    "La batalla de Waterloo",
    "La Primera Guerra Mundial"
   ]
  },
  "credito": "Erich Lessing Culture and Fine Arts Archives · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg"
 },
 {
  "id": "impresion",
  "img": "impresion.jpg",
  "epoca": "siglo-xviii-xix",
  "titulo": "Impresión, sol naciente",
  "autor": "Claude Monet",
  "fecha": "1872",
  "tecnica": "Óleo sobre lienzo",
  "lugar": "Musée Marmottan Monet, París",
  "texto": "Monet pintó el puerto de Le Havre entre la bruma del amanecer, con pinceladas rápidas y un pequeño sol anaranjado reflejado en el agua. Cuando se expuso en 1874, el crítico Louis Leroy usó su título para burlarse del grupo llamándolos «impresionistas», y el nombre acabó adoptándose con orgullo. Unos investigadores calcularon, a partir de la posición del sol y las mareas, que pudo pintarse hacia el 13 de noviembre de 1872.",
  "q": {
   "q": "¿Qué movimiento artístico tomó su nombre de este cuadro?",
   "a": [
    "El impresionismo",
    "El surrealismo",
    "El cubismo",
    "El romanticismo"
   ]
  },
  "credito": "Reproducción de dominio público · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Claude_Monet,_Impression,_soleil_levant.jpg"
 },
 {
  "id": "noche-estrellada",
  "img": "noche-estrellada.jpg",
  "epoca": "siglo-xviii-xix",
  "titulo": "La noche estrellada",
  "autor": "Vincent van Gogh",
  "fecha": "Junio de 1889",
  "tecnica": "Óleo sobre lienzo",
  "lugar": "Museum of Modern Art (MoMA), Nueva York",
  "texto": "Un cielo nocturno lleno de remolinos, estrellas que parecen girar y una luna creciente brillante se extiende sobre un pueblo tranquilo y un ciprés oscuro como una llama. Van Gogh lo pintó mientras estaba ingresado en el sanatorio de Saint-Rémy-de-Provence, a partir de la vista desde su ventana, pero combinándola con elementos imaginados, como el pueblo. Se cree que la «estrella» más brillante cerca del horizonte es en realidad el planeta Venus.",
  "q": {
   "q": "¿Dónde pintó Van Gogh La noche estrellada?",
   "a": [
    "En el sanatorio de Saint-Rémy-de-Provence",
    "En su estudio de París",
    "En un barco",
    "En Ámsterdam"
   ]
  },
  "credito": "Google Arts & Culture · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
  "cuadro": 1
 },
 {
  "id": "girasoles",
  "img": "girasoles.jpg",
  "epoca": "siglo-xviii-xix",
  "titulo": "Los girasoles",
  "autor": "Vincent van Gogh",
  "fecha": "1888",
  "tecnica": "Óleo sobre lienzo",
  "lugar": "National Gallery, Londres",
  "texto": "Un jarrón con girasoles en todas sus fases, desde flores frescas hasta otras marchitas, pintado casi solo con tonos amarillos. Van Gogh pintó esta serie en Arlés para decorar la habitación de su amigo, el pintor Paul Gauguin, en la llamada Casa Amarilla; hay varias versiones repartidas por distintos museos. Algunos de los amarillos de cromo que utilizó se están oscureciendo lentamente con la luz, y los museos los estudian para conservarlos.",
  "q": {
   "q": "¿Para quién quería Van Gogh decorar una habitación con los girasoles?",
   "a": [
    "Para su amigo el pintor Paul Gauguin",
    "Para su hermano Theo",
    "Para el rey de Francia",
    "Para un hospital"
   ]
  },
  "credito": "National Gallery, London · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_Sunflowers_(1888,_National_Gallery_London).jpg"
 },
 {
  "id": "grito",
  "img": "grito.jpg",
  "epoca": "siglo-xviii-xix",
  "titulo": "El grito",
  "autor": "Edvard Munch",
  "fecha": "1893",
  "tecnica": "Óleo, temple y pastel sobre cartón",
  "lugar": "Museo Nacional (Nasjonalmuseet), Oslo",
  "texto": "Una figura con el rostro como una calavera se lleva las manos a la cabeza sobre un puente, bajo un cielo rojo y ondulante. Munch escribió que, paseando al atardecer, sintió «un grito infinito que atravesaba la naturaleza»; la obra expresa la angustia y se convirtió en un símbolo del ser humano moderno. Existen varias versiones, y en esta hay una pequeña inscripción a lápiz que dice «Solo pudo haberlo pintado un loco», que el museo confirmó en 2021 que es de la mano del propio Munch.",
  "q": {
   "q": "¿Qué sentimiento expresa sobre todo El grito?",
   "a": [
    "La angustia",
    "La alegría",
    "El aburrimiento",
    "El orgullo"
   ]
  },
  "credito": "Nasjonalmuseet (Oslo) · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Edvard_Munch,_1893,_The_Scream,_oil,_tempera_and_pastel_on_cardboard,_91_x_73_cm,_National_Gallery_of_Norway.jpg"
 },
 {
  "id": "pensador",
  "img": "pensador.jpg",
  "epoca": "siglo-xviii-xix",
  "titulo": "El pensador",
  "autor": "Auguste Rodin",
  "fecha": "Modelado hacia 1880–1882; versión monumental de 1903–1904",
  "tecnica": "Bronce",
  "lugar": "Museo Rodin, París (existen numerosas fundiciones en otros lugares)",
  "texto": "Un hombre desnudo y musculoso, sentado, apoya la barbilla en la mano, absorto en sus pensamientos: el esfuerzo de pensar se expresa con todo el cuerpo. Nació como parte de La puerta del infierno, un gran portal inspirado en la Divina comedia, y al principio representaba al poeta Dante meditando sobre su obra. Más tarde se agrandó y se convirtió en una obra independiente, símbolo universal de la filosofía y la reflexión.",
  "q": {
   "q": "¿A quién representaba originalmente El pensador?",
   "a": [
    "Al poeta Dante",
    "Al filósofo Sócrates",
    "Al propio Rodin",
    "A Napoleón"
   ]
  },
  "credito": "Tammy Lo · CC BY 2.0 · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:The_Thinker,_Mus%C3%A9e_Rodin,_Paris_September_2013_002.jpg"
 },
 {
  "id": "beso",
  "img": "beso.jpg",
  "epoca": "siglo-xx",
  "titulo": "El beso",
  "autor": "Gustav Klimt",
  "fecha": "1907–1908",
  "tecnica": "Óleo y pan de oro sobre lienzo (180 × 180 cm)",
  "lugar": "Galería Belvedere (Österreichische Galerie Belvedere), Viena",
  "texto": "Una pareja se abraza envuelta en un manto dorado, sobre un prado de flores al borde de un precipicio. Es la obra más famosa del «periodo dorado» de Klimt, en el que usó láminas de oro inspirándose en parte en los mosaicos bizantinos. Los adornos distinguen a los dos amantes: rectángulos negros y blancos en el manto de él, círculos y flores de colores en el vestido de ella.",
  "q": {
   "q": "¿Qué material especial usó Klimt en El beso?",
   "a": [
    "Pan de oro",
    "Vidrio de colores",
    "Plumas",
    "Arena"
   ]
  },
  "credito": "Google Art Project · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg"
 },
 {
  "id": "nenufares",
  "img": "nenufares.jpg",
  "epoca": "siglo-xx",
  "titulo": "Las ninfeas (Los nenúfares)",
  "autor": "Claude Monet",
  "fecha": "Hacia 1914–1926",
  "tecnica": "Óleo sobre lienzo (ocho grandes paneles)",
  "lugar": "Musée de l'Orangerie, París",
  "texto": "En dos salas ovaladas, ocho enormes lienzos rodean al visitante con el agua, los nenúfares y los reflejos del cielo del estanque que Monet creó en su jardín de Giverny. Monet los ofreció al Estado francés tras el armisticio de 1918, como un lugar de paz, y se instalaron en 1927, poco después de su muerte. Pintó buena parte de ellos cuando sufría cataratas, que alteraban su percepción de los colores.",
  "q": {
   "q": "¿Qué pintó Monet en esta serie?",
   "a": [
    "El estanque con nenúfares de su jardín de Giverny",
    "Las calles de París de noche",
    "Las montañas de los Alpes",
    "Una batalla naval"
   ]
  },
  "credito": "Sailko · CC BY-SA 3.0 · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Claude_monet,_Ninfee_e_Nuvole,_1920-1926_(orangerie)_03.JPG"
 },
 {
  "id": "kandinsky",
  "img": "kandinsky.jpg",
  "epoca": "siglo-xx",
  "titulo": "Composición VIII",
  "autor": "Vasili Kandinsky",
  "fecha": "1923",
  "tecnica": "Óleo sobre lienzo (140 × 201 cm)",
  "lugar": "Museo Solomon R. Guggenheim, Nueva York",
  "texto": "Círculos, triángulos, líneas y semicírculos de colores flotan sobre un fondo claro sin representar ningún objeto reconocible: es pintura abstracta. Kandinsky la pintó cuando enseñaba en la Bauhaus, la célebre escuela alemana de arte y diseño. Comparaba la pintura con la música, y por eso tituló algunas obras «composiciones», como si fueran piezas musicales.",
  "q": {
   "q": "¿Con qué arte comparaba Kandinsky la pintura?",
   "a": [
    "Con la música",
    "Con la arquitectura",
    "Con la danza",
    "Con el cine"
   ]
  },
  "credito": "Reproducción de dominio público · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Vassily_Kandinsky,_1923_-_Composition_8,_huile_sur_toile,_140_cm_x_201_cm,_Mus%C3%A9e_Guggenheim,_New_York.jpg"
 },
 {
  "id": "mondrian",
  "img": "mondrian.jpg",
  "epoca": "siglo-xx",
  "titulo": "Composición II en rojo, azul y amarillo",
  "autor": "Piet Mondrian",
  "fecha": "1930",
  "tecnica": "Óleo sobre lienzo (46 × 46 cm)",
  "lugar": "Kunsthaus, Zúrich",
  "texto": "Solo hay líneas negras horizontales y verticales, y rectángulos de rojo, azul y amarillo sobre blanco. Mondrian, miembro del grupo neerlandés De Stijl, llamó a su estilo «neoplasticismo»: buscaba una armonía universal reduciendo la pintura a sus elementos más básicos. El gran cuadrado rojo domina la composición, pero el equilibrio se logra con el pequeño azul y el amarillo, que pesan menos.",
  "q": {
   "q": "¿Qué colores usa Mondrian, además del blanco y el negro?",
   "a": [
    "Rojo, azul y amarillo",
    "Verde, naranja y violeta",
    "Rosa y marrón",
    "Dorado y plateado"
   ]
  },
  "credito": "Reproducción de dominio público · Public domain · Wikimedia Commons",
  "fuente": "https://commons.wikimedia.org/wiki/File:Piet_Mondriaan,_1930_-_Mondrian_Composition_II_in_Red,_Blue,_and_Yellow.jpg"
 },
 {
  "id": "guernica",
  "img": null,
  "epoca": "siglo-xx",
  "titulo": "Guernica",
  "autor": "Pablo Picasso",
  "fecha": "1937",
  "tecnica": "Óleo sobre lienzo (349,3 × 776,6 cm)",
  "lugar": "Museo Nacional Centro de Arte Reina Sofía, Madrid",
  "texto": "Picasso lo pintó tras el bombardeo de la villa vasca de Gernika, el 26 de abril de 1937, por aviones alemanes e italianos aliados de Franco durante la Guerra Civil española, y lo presentó en el pabellón de la República en la Exposición Internacional de París. En blanco, negro y grises, muestra una madre con su hijo muerto, un caballo herido, un toro y cuerpos rotos: es uno de los grandes símbolos contra la guerra. Picasso quiso que no viajara a España hasta que hubiera democracia, y llegó en 1981.",
  "q": {
   "q": "¿Qué hecho histórico inspiró el Guernica?",
   "a": [
    "El bombardeo de Gernika en 1937",
    "La Revolución francesa",
    "La caída del Imperio romano",
    "El descubrimiento de América"
   ]
  }
 },
 {
  "id": "persistencia",
  "img": null,
  "epoca": "siglo-xx",
  "titulo": "La persistencia de la memoria",
  "autor": "Salvador Dalí",
  "fecha": "1931",
  "tecnica": "Óleo sobre lienzo (24 × 33 cm)",
  "lugar": "Museum of Modern Art (MoMA), Nueva York",
  "texto": "Varios relojes blandos se derriten sobre una rama, un bloque y una extraña figura dormida, en un paisaje inspirado en la costa de Cataluña. Es una obra emblemática del surrealismo, que quería pintar el mundo de los sueños y del inconsciente, y nos hace preguntarnos qué es el tiempo. Sorprende su tamaño: apenas mide 24 por 33 centímetros, poco más que una hoja de papel; según contó el propio Dalí, la idea le vino al ver un queso camembert derritiéndose.",
  "q": {
   "q": "¿Qué objetos se derriten en La persistencia de la memoria?",
   "a": [
    "Relojes",
    "Velas",
    "Helados",
    "Espejos"
   ]
  }
 },
 {
  "id": "dos-fridas",
  "img": null,
  "epoca": "siglo-xx",
  "titulo": "Las dos Fridas",
  "autor": "Frida Kahlo",
  "fecha": "1939",
  "tecnica": "Óleo sobre lienzo (173,5 × 173 cm)",
  "lugar": "Museo de Arte Moderno, Ciudad de México",
  "texto": "Dos Fridas sentadas se dan la mano: una lleva un vestido blanco de estilo europeo y la otra un traje tradicional mexicano de tehuana. Sus corazones están a la vista y unidos por una arteria, y la Frida europea intenta detener con unas pinzas quirúrgicas la sangre que gotea. Lo pintó en la época de su divorcio del pintor Diego Rivera, y se suele interpretar como una reflexión sobre su identidad doble, europea y mexicana.",
  "q": {
   "q": "¿Qué une los corazones de las dos Fridas?",
   "a": [
    "Una arteria",
    "Una cinta roja",
    "Una cadena de oro",
    "Una rama de árbol"
   ]
  }
 }
];
{
  const bi = ERAS.findIndex((e) => e.id === 'belleza');
  if (bi >= 0 && POIS[bi]) POIS[bi].push({ id: 'museo', at: [-17, -31], name: 'El museo de las obras maestras', museo: true,
    text: 'En esta galería se reúnen algunas de las obras de arte más famosas del mundo: desde la Venus de Milo y el David de Miguel Ángel hasta La noche estrellada de Van Gogh. Entra al museo para verlas de cerca, conocer su historia y ponerte a prueba.',
    fact: 'El Louvre de París, el museo más visitado del mundo, abrió sus puertas al público en 1793, en plena Revolución francesa, con unas seiscientas obras de las antiguas colecciones reales.',
    q: { q: '¿Qué museo guarda La Gioconda de Leonardo?', a: ['El Louvre, en París', 'El Prado, en Madrid', 'Los Uffizi, en Florencia', 'El Museo Británico, en Londres'], e: 'Está en el Louvre desde la Revolución francesa (con un paréntesis tras su robo en 1911).' } });
}
