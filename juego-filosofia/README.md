# Odisea de la Razón

Un **viaje en 3D por la historia de la filosofía**, de los presocráticos a Kant. Caminas por cada
época (Jonia, Atenas, Roma, la Edad Media, el Renacimiento, la Ilustración), **conversas** con sus
filósofos, **descubres lugares** y vences a cada pensador en un **debate de conocimientos**.

## Cómo jugarlo

Abre `index.html` en un navegador (un solo archivo). En el móvil: joystick a la izquierda, desliza
a la derecha para mirar, o **toca el suelo** para caminar hasta ese punto. En el ordenador: `WASD`,
ratón y `E` para interactuar.

## Qué puedes hacer

- **Conversar con 25 filósofos**: «¿Quién eres?», «¿Cuál es tu gran idea?», «Cuéntame más»,
  escuchar su **lección completa** narrada con su voz, o **preguntarles lo que quieras**: en la
  versión publicada en claude.ai responden en personaje con la IA de Claude (pide permiso la
  primera vez y usa la cuenta de quien juega).
- **Descubrir 25 lugares**: el puerto de Mileto, el Partenón, el ágora, la Stoa, la Biblioteca de
  Alejandría, el rosetón gótico, las primeras universidades, la cúpula de Brunelleschi, la imprenta,
  el planetario de Newton, la Enciclopedia… Cada uno con su historia y un dato curioso.
- **Debatir**: desafía a cada filósofo a un debate de preguntas (207 en total, con explicación).
  Los fragmentos que ganas descubriendo lugares sirven como comodines.
- Al vencer a todos los pensadores de una época, debates con su **maestro** (Parménides,
  Aristóteles, Marco Aurelio, Tomás de Aquino, Bacon, Kant) y se abre el portal a la siguiente.
- **Códice** de conceptos y lugares, **Oráculo de Delfos** diario para compartir, **Salón de la
  Fama** y logros.

## Código

```bash
node build.mjs   # genera index.html (viaje 3D) y cartas.html (versión de duelo de cartas)
```

- `src/01-data.js` filósofos y preguntas · `src/01a-lessons.js` lecciones · `src/02b-places.js` lugares
- `src/02-world.js` escenarios de cada época · `src/03-entities.js` figuras de los filósofos
- `src/04-game.js` jugador, debates y pantallas · `src/04b-talk.js` conversaciones y lugares
- `cartas/` versión alternativa de duelo de cartas en 2D (`cartas.html`)
