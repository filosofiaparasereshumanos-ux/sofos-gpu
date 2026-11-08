# Odisea de la Razón

Un **viaje en 3D por la historia de la filosofía**, de los presocráticos a Kant. Caminas por cada
época (Jonia, Atenas, Roma, la Edad Media, el Renacimiento, la Ilustración), **conversas** con sus
filósofos, **descubres lugares** y vences a cada pensador en un **debate de conocimientos**.

## Cómo jugarlo

Abre `index.html` en un navegador (un solo archivo). En el móvil: joystick a la izquierda, desliza
a la derecha para mirar, o **toca el suelo** para caminar hasta ese punto. En el ordenador: `WASD`,
ratón y `E` para interactuar.

## Qué puedes hacer

- **Viajar por las épocas** (modo explorador): desde el menú («Viajar por las épocas», o tocando
  los números I–VI) o desde la pausa, entra en cualquier época sin superar las anteriores. La odisea
  guardada no se toca.

- **Conversar con 25 filósofos**: «¿Quién eres?», «¿Cuál es tu gran idea?», «Cuéntame más»,
  escuchar su **lección completa** narrada con su voz, o **preguntarles lo que quieras**: en la
  versión publicada en claude.ai responden en personaje con la IA de Claude (pide permiso la
  primera vez y usa la cuenta de quien juega).
- **Descubrir 40 lugares**: el puerto de Mileto, el Partenón, el ágora, la Stoa, la Biblioteca de
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
- **Estudiar los grandes libros**: 15 obras en atriles repartidos por las épocas (Fragmentos de
  Heráclito, el Poema de Parménides, El banquete, Fedón, Apología, La República, Ética a Nicómaco,
  Carta a Meneceo, Meditaciones, Confesiones, Suma teológica, El príncipe, Ensayos, Discurso del
  método y ¿Qué es la Ilustración?). Se leen por capítulos con voz y terminan con una pregunta de
  estudio; los libros estudiados se pueden releer en la Biblioteca del códice.
- **Debatir**: desafía a cada filósofo a un debate de preguntas (207 en total, con explicación).
  Los fragmentos que ganas descubriendo lugares sirven como comodines.
- Al vencer a todos los pensadores de una época, debates con su **maestro** (Parménides,
  Aristóteles, Marco Aurelio, Tomás de Aquino, Bacon, Kant), que también te pregunta por los
  lugares de su época, y se abre el portal a la siguiente.
- **Códice** de conceptos y lugares, **Oráculo de Delfos** diario para compartir, **Salón de la
  Fama** y logros.

## Código

```bash
node build.mjs   # genera index.html (viaje 3D) y cartas.html (versión de duelo de cartas)
```

- `src/01-data.js` filósofos y preguntas · `src/01a-lessons.js` lecciones · `src/02b-places.js` lugares
- `src/02-world.js` escenarios de cada época · `src/03-entities.js` figuras de los filósofos
- `src/04-game.js` jugador, debates y pantallas · `src/04b-talk.js` conversaciones y lugares
- `src/02c-polis.js` ciudadanos, encargos, anécdotas y lugares de las polis · `src/03b-citizens.js` ciudadanos en 3D
- `src/02e-books.js` libros para estudiar
- `src/02d-narration.js` reproductor de la voz grabada · `audio/` paquetes MP3 e índice
- `tools/` generación de la voz: `narration-text.mjs` (frases) → `narrate.py` (Piper TTS + ffmpeg) → `narration-index.mjs`
- `cartas/` versión alternativa de duelo de cartas en 2D (`cartas.html`)
