# Odisea de la Razón

Un **viaje en 3D por la historia de la filosofía**, de los presocráticos a nuestros días, con filósofas de todas las épocas y el pensamiento de América Latina. Caminas por cada
época (Jonia, Atenas, Roma, la Edad Media, el Renacimiento, la Ilustración, el siglo XIX, la época contemporánea y América Latina), **conversas** con sus
filósofos, **descubres lugares** y vences a cada pensador en un **debate de conocimientos**.

## Cómo jugarlo

Abre `index.html` en un navegador (un solo archivo). En el móvil: joystick a la izquierda, desliza
a la derecha para mirar, o **toca el suelo** para caminar hasta ese punto. En el ordenador: `WASD`,
ratón y `E` para interactuar.

## Qué puedes hacer

- **Arte y música**: retratos al óleo de los 68 pensadores, una ilustración para cada época y
  cultura, y una banda sonora propia para cada una (generados con kie.ai: nano-banana y Suno; los
  scripts están en `tools/kie/`, la clave nunca se incluye en el juego).

- **Modo aula** (funciona sin servidor):
  - *Docente*: crea una tarea eligiendo pensadores y qué cuenta (lección, encargo, debate, libro) y
    obtiene un código de clase con instrucciones para compartir. Pega las entregas de sus
    estudiantes y ve una tabla de progreso que puede copiar a una hoja de cálculo.
  - *Estudiante*: escribe el código y su nombre, ve su tarea con el progreso, viaja a cada pensador
    y entrega un texto firmado (las entregas modificadas se rechazan).
  - *Proyector y fichas*: debate por equipos en la pizarra digital y fichas imprimibles con
    solucionario.

- **¿Qué diría…?**: haz una pregunta actual (las redes sociales, la IA, la felicidad…) y cuatro
  pensadores de épocas y culturas distintas la responden a la vez, en personaje, con la IA de
  Claude. Hay una pregunta del día y las respuestas se pueden compartir.
- **Oráculo de Delfos diario**: diez preguntas iguales para todos, número de oráculo, racha de días,
  calendario de la semana, idea del día, compartir desde el móvil y ranking de hoy y de la semana.

- **Sabidurías del mundo**: una ruta aparte, desde «Viajar por las épocas», con seis culturas: los
  Mexicas, los Incas, el pueblo mapuche, la China clásica, la India y África. Pensadoras y
  pensadores como Tochihuitzin, Macuilxochitzin, Guamán Poma, el Inca Garcilaso, Pachacútec,
  Lautaro, Janequeo, Laozi, Ban Zhao, Confucio, Gargi, Buda, Ptahhotep, Zera Yacob, Wangari Maathai
  y Desmond Tutu. Donde la tradición no conserva autores con nombre (la machi, el kimche), hablan
  portavoces de esa tradición.

- **Filósofas y pensamiento latinoamericano**: Teano, Hipatia, Hildegarda de Bingen, Christine de
  Pizan, Simone de Beauvoir y Hannah Arendt; y en la época IX, Nezahualcóyotl, Sor Juana Inés de la
  Cruz, José Martí, Rosario Castellanos y Paulo Freire.

- **Viajar por las épocas** (modo explorador): desde el menú («Viajar por las épocas», o tocando
  los números I–VI) o desde la pausa, entra en cualquier época sin superar las anteriores. La odisea
  guardada no se toca.

- **Conversar con 44 pensadoras y pensadores**: «¿Quién eres?», «¿Cuál es tu gran idea?», «Cuéntame más»,
  escuchar su **lección completa** narrada con su voz, o **preguntarles lo que quieras**: en la
  versión publicada en claude.ai responden en personaje con la IA de Claude (pide permiso la
  primera vez y usa la cuenta de quien juega).
- **Descubrir 58 lugares**: el puerto de Mileto, el Partenón, el ágora, la Stoa, la Biblioteca de
  Alejandría, el rosetón gótico, las primeras universidades, la cúpula de Brunelleschi, la imprenta,
  el planetario de Newton, la Enciclopedia, el teatro de Dioniso, Esparta, Olimpia, Delfos, la tinaja de Diógenes, el faro de Alejandría… Cada uno con su historia y un dato curioso.
- **Voz grabada**: lecciones, conversaciones, anécdotas, lugares y ciudadanos tienen narración
  real (unas dos horas, en `audio/`), sin depender de la voz del navegador.
- **Vida en las polis**: 20 ciudadanos pasean por las plazas (un pescador de Mileto, Aspasia, un
  hoplita, un meteco, una panadera de Corinto, monjes, impresores, una científica en un salón…).
  Escúchalos hasta el final: lo que cuentan hace falta para los encargos.
- **Encargos**: antes de debatir, cada pensador te pide algo: descubrir lugares, escuchar a ciertos
  ciudadanos y resolver su enigma. Diógenes busca un ser humano honesto… ¿sabrás encontrarlo?
  Fallar cuesta razón.
- **Estudiar los grandes libros**: 26 obras en atriles repartidos por las épocas (Fragmentos de
  Heráclito, el Poema de Parménides, El banquete, Fedón, Apología, La República, Ética a Nicómaco,
  Carta a Meneceo, Meditaciones, Confesiones, Suma teológica, El príncipe, Ensayos, Discurso del
  método y ¿Qué es la Ilustración?). Se leen por capítulos con voz y terminan con una pregunta de
  estudio; los libros estudiados se pueden releer en la Biblioteca del códice.
- **Debatir**: desafía a cada filósofo a un debate de preguntas (207 en total, con explicación).
  Los fragmentos que ganas descubriendo lugares sirven como comodines.
- Al vencer a todos los pensadores de una época, debates con su **maestro** (Parménides,
  Aristóteles, Marco Aurelio, Tomás de Aquino, Bacon, Kant, Nietzsche, Hannah Arendt y, al final, Paulo Freire), que también te pregunta por los
  lugares de su época, y se abre el portal a la siguiente.
- **Códice** de conceptos y lugares, **Oráculo de Delfos** diario para compartir, **Salón de la
  Fama** y logros.

## Código

```bash
node build.mjs   # genera index.html (viaje 3D) y cartas.html (versión de duelo de cartas)
```

- `src/01-data.js` filósofos y preguntas · `src/01c-contemporanea.js` y `src/02f-contemporanea.js` épocas VII y VIII · `src/01a-lessons.js` lecciones · `src/02b-places.js` lugares
- `src/02-world.js` escenarios de cada época · `src/03-entities.js` figuras de los filósofos
- `src/04-game.js` jugador, debates y pantallas · `src/04b-talk.js` conversaciones y lugares
- `src/02c-polis.js` ciudadanos, encargos, anécdotas y lugares de las polis · `src/03b-citizens.js` ciudadanos en 3D
- `src/02e-books.js` libros para estudiar
- `src/01d-pensadoras.js` filósofas de la Antigüedad al Renacimiento · `src/01e-latinoamerica.js` y `src/02g-latinoamerica.js` época IX
- `src/01f-mundo.js` y `src/02h-mundo.js` ruta «Sabidurías del mundo»
- `src/05b-quediria.js` «¿Qué diría…?» · `src/06-aula.js` modo aula
- `src/00c-art.js` retratos e ilustraciones (`img/`) · banda sonora en `audio/m-*.mp3`
- `src/02d-narration.js` reproductor de la voz grabada · `audio/` paquetes MP3 e índice
- `tools/` generación de la voz: `narration-text.mjs` (frases) → `narrate.py` (Piper TTS + ffmpeg) → `narration-index.mjs`
- `cartas/` versión alternativa de duelo de cartas en 2D (`cartas.html`)
