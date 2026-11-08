# Odisea de la Razón

Juego de filosofía en primera persona (3D, navegador). Recorres veinticinco siglos de pensamiento,
de Tales de Mileto a Immanuel Kant, venciendo a las sombras del error con la lámpara de Diógenes
y derrotando a cada filósofo en un **duelo dialéctico** de preguntas.

## Cómo jugarlo

Abre `index.html` en un navegador moderno (Chrome, Edge, Firefox o Safari). Es un único archivo:
no necesita instalación. Three.js se carga desde jsDelivr, así que hace falta conexión a internet.

Para publicarlo gratis: activa **GitHub Pages** en el repositorio (Settings → Pages → rama
`main`, carpeta raíz) y entra a `https://<usuario>.github.io/<repo>/juego-filosofia/`.

## Las seis etapas

| Etapa | Escenario | Pensadores | Maestro final | Enemigos |
|---|---|---|---|---|
| I · Los Presocráticos | Ruinas jonias al atardecer | Tales, Pitágoras, Heráclito | Parménides | Quimeras del Mito |
| II · La Atenas Clásica | El ágora y el Partenón a mediodía | Protágoras, Sócrates, Platón | Aristóteles | Sofismas |
| III · Helenismo y Roma | Arcadas romanas al crepúsculo | Diógenes, Epicuro, Pirrón | Marco Aurelio | Pasiones |
| IV · La Edad Media | Catedral gótica con vidrieras | Agustín, Averroes, Ockham | Tomás de Aquino | Dogmas |
| V · Renacimiento | Plaza florentina con cúpula | Pico della Mirandola, Maquiavelo, Montaigne | Francis Bacon | Ídolos |
| VI · La Modernidad | Biblioteca-observatorio bajo las estrellas | Descartes, Spinoza, Locke, Hume | Kant | Genios Malignos |

Cada filósofo tiene su propio escenario simbólico: el estanque de Tales, el fuego de Heráclito,
la esfera de Parménides, la caverna de Platón, la tinaja de Diógenes, la navaja de Ockham, los
ejes cartesianos de Descartes, las bolas de billar de Hume, el cielo estrellado de Kant…

## Modos

- **Odisea:** la campaña completa por las seis épocas.
- **Oráculo de Delfos (diario):** 10 preguntas de Tales a Kant, iguales para todo el mundo cada día,
  15 segundos por pregunta y rachas que multiplican la puntuación. Al terminar genera un resultado
  para compartir (🟨 acierto rápido, 🟩 acierto, 🟥 fallo, ⬛ tiempo agotado).
- **Salón de la Fama:** ranking del oráculo de hoy y de la odisea completa (en la versión publicada en
  claude.ai, con base de datos compartida). Cada jugador elige su nombre de filósofo.
- **16 logros**: Mayéutica perfecta, Rayo de razón, Fuera de la caverna, Elegido de Apolo…

## El camino

Cada época es una **vía recta**: los pensadores esperan uno tras otro sobre el camino, en orden
cronológico (Tales → Pitágoras → Heráclito → Parménides…). Entre uno y otro hay una **puerta de luz**
que se abre al vencer al pensador que la custodia. Un marcador dorado con la distancia y una
columna de luz señalan al siguiente; tócalo (o pulsa `E`) para caminar solo hasta él. Arriba,
una barra muestra el recorrido de la época y tu posición.

## Mecánicas

- **Exploración y combate (FPS):** `WASD` para moverte, ratón para mirar, clic para disparar la
  lámpara, `Mayús` para correr, `Espacio` para saltar.
- **Impulso** (`C` o `Ctrl`): esquiva rápida con un instante de invulnerabilidad.
- **Epojé** (`Q` o clic derecho): una onda de "suspensión del juicio" que daña a las sombras
  cercanas y disuelve sus proyectiles.
- **Duelos dialécticos** (`E` junto a un filósofo): preguntas de opción múltiple con tiempo.
  Cada acierto quiebra su *convicción*; cada fallo daña tu *razón* (tu vida). Después de cada
  respuesta se explica la respuesta correcta.
- **Comodines:** con los fragmentos de sabiduría que sueltan las sombras puedes usar
  *Mayéutica* (elimina dos respuestas falsas) o *Clepsidra* (+10 segundos).
- **Maestros finales:** a mitad del duelo se protegen con un escudo e invocan sombras; hay que
  destruirlas para seguir. Kant lo hace dos veces.
- **Códice:** cada filósofo vencido te entrega su concepto central (Arjé, Logos, Mayéutica,
  Ataraxia, Navaja de Ockham, Cogito, Giro copernicano…), que puedes repasar en el menú.
- **Rachas:** cada tres aciertos seguidos sube el multiplicador de sabiduría (×2, ×3, ×4).
- **Maestros con presentación cinematográfica**, cámara lenta al vencer a cada filósofo y **voces**:
  los filósofos hablan en español con la voz del sistema (se puede desactivar en Ajustes).
- Progreso guardado automáticamente al empezar cada etapa.

### En el móvil

- Joystick flotante: pon el pulgar en cualquier punto de la mitad izquierda; desliza por la derecha para mirar.
- La lámpara **dispara sola** cuando apuntas a una sombra, con asistencia de puntería (se puede desactivar).
- Vibración al recibir daño, acertar o vencer; botón de pantalla completa; la pantalla no se apaga mientras juegas.
- Funciona en vertical y en horizontal (en vertical el campo de visión se amplía). Se juega mejor en horizontal.
- Calidad "Media" con resplandor pensada para móviles; si el juego va lento, baja la calidad sola.

En total: 25 filósofos y unas 200 preguntas con explicación.

## Código

El juego se escribe en `src/` y se empaqueta en un solo `index.html`:

```bash
node build.mjs
```

- `src/00-core.js`: utilidades, texturas procedurales (mármol, teselas, vidrieras…) y audio generativo.
- `src/01-data.js`: etapas, filósofos, preguntas y conceptos (para añadir preguntas, edita aquí).
- `src/02-world.js`: cielos, arquitectura de cada época y escenarios de los filósofos.
- `src/03-entities.js`: figuras de los filósofos, enemigos, proyectiles y partículas.
- `src/03a-music.js`: banda sonora generativa (acordes, bajo, arpegios, melodía y percusión por época).
- `src/04-game.js`: jugador, duelos, pantallas y bucle principal.
- `src/05-features.js`: Oráculo diario, Salón de la Fama y logros.
- `src/template.html`: interfaz y estilos.

Todo (modelos, texturas, música y efectos) se genera por código: no hay archivos externos aparte
de Three.js y dos fuentes de Google Fonts.
