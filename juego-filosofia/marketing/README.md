# Material para redes

- **`trailer-docentes.mp4`** (43 s, 1080x1920): para docentes y escuelas. Una profesora en el aula: «Saquen sus celulares: hoy debatimos con los grandes filósofos» → el código de la sala en el proyector, cada estudiante responde desde su celular, puntos y ranking → estudiantes celebrando: «¡Acerté!» y «Toda la clase, en vivo» → podio → 25 diálogos socráticos, 11 experimentos mentales, el mapa filosófico de la clase y la guía para docentes en PDF → dos amigos en casa: «¡Te desafío a un duelo de filosofía!» «¡Acepto!» → «Pruébalo con tu clase» y la firma con el logo. Escenas con Veo 3 (kie.ai), montaje con `herramientas/montaje-v5.py`.
  Texto sugerido: *¿Y si tu clase de filosofía empezara con todos los celulares arriba? 📱🏛️ Odisea de la Razón: trivia en vivo para toda la clase, 25 diálogos socráticos, experimentos mentales y el mapa filosófico de tu curso. Gratis y con guía para docentes. Link en la bio. #docentes #filosofía #educación #profesores #aprendizajeactivo*
- **`trailer-corto.mp4`** (recomendado, 64 s, 1080x1920): el más potente y rápido. Intercala las escenas de cine habladas con golpes de juego real. Sócrates en la prisión → «Hoy puedes debatir con él» (lo vences en el juego) → Hipatia → «Desafíala» → Sor Juana → «Gana con argumentos» → «Durante 26 siglos… en la India, en China, en los Andes, en África» con la voz sobre los mundos del juego → «Hoy puedes hablar con ellos» → ráfaga: 21 épocas por el arco-portal, la caverna, Sísifo, Giges, la mariposa, vence al maestro (Pachacútec), tu mapa, el aula → «El primer juego educativo completo» → «¿Te atreves a pensar?» → «Únete a la odisea» con reto → firma con logo y filosofiaparasereshumanos.com. Una sola música continua bajo las voces. Se hizo con `herramientas/montaje-v4.py`.
- **`trailer-mezcla.mp4`** (el más nuevo, 2 min 7 s, 1080x1920): mezcla de los dos tráileres. Empieza con las escenas de cine de Sócrates, Hipatia y Sor Juana, sigue con las sabidurías del mundo y «Hoy puedes hablar con ellos». Luego viene el juego real: el menú, la elección de época, seis enfrentamientos cara a cara con los avatares (Sócrates, Hipatia, Laozi, Sor Juana, Enheduanna y Pachacútec, maestro de los incas), el cruce del arco-portal a la época siguiente, los 21 mundos, diálogos, la caverna, Sísifo, Giges, Descartes, Zhuangzi, libros, el mapa filosófico y el aula. Cierra con Sócrates («¿Te atreves a pensar?»), la llamada con reto y la firma con el logo y filosofiaparasereshumanos.com. Se hizo con `herramientas/captura-v2.cjs` y `herramientas/montaje-v3.py`.
- **`trailer-completo.mp4`** (nuevo, 85 s, 1080x1920): tráiler II, «el primer juego educativo completo de filosofía, ciencia e historia». Abre con Sócrates en la prisión y después es todo juego real grabado fotograma a fotograma: el menú con el botón JUGAR, la elección de época desde Sumer, los 21 mundos en orden cronológico con su nombre y sus pensadores, un debate ganado, un diálogo socrático, la bajada a la caverna de Platón, Sísifo, el anillo de Giges, las dudas de Descartes, el sueño de la mariposa de Zhuangzi, un libro que se abre, el mapa filosófico, el modo aula para docentes, un cartón de cifras y la llamada a sumarse con reto. Cierra con el logo de Filosofía para Seres Humanos. Audio a −14 LUFS. Se hizo con `herramientas/captura-v2.cjs` (tomas) y `herramientas/montaje-v2.py` (edición).
- **`trailer-vertical.mp4`**: tráiler de 67 s, 1080x1920 (9:16), para TikTok, Instagram Reels y YouTube Shorts. Escenas de cine realistas con voz en off de narrador, filósofos que hablan con sus propios labios, subtítulos palabra a palabra, música épica con golpes imágenes reales del juego (recorriendo los mundos, abriendo un libro, conversando y ganando un debate) un cierre con llamada a sumarse y reto para comentar, y la firma de Filosofía para Seres Humanos con el logo y filosofiaparasereshumanos.com. Audio normalizado a −14 LUFS.
- **`portada.jpg`** (Sócrates en la prisión) y **`portada-titulo.jpg`** (cartón final): miniaturas.
- **`logo-filosofia-para-seres-humanos.png`**: logo recortado con fondo transparente.
- **`escenas/`**: las siete escenas originales de 8 s con su sonido (720x1280), para recortes y publicaciones sueltas.
- **`herramientas/`**: guiones con los que se hizo: `imgs.py` (fotogramas 9:16 con nano-banana), `veo.py` (escenas con voz con Veo 3 fast), `ui.cjs` (capturas reales del juego con Playwright) y `captura-juego.cjs` + `captura-plan.json` (graba el juego real fotograma a fotograma con un reloj virtual, a 30 fps fluidos) y `montaje.py` (edición, mezcla con *ducking*, subtítulos sincronizados con Whisper y cartón final). Las rutas apuntan a la carpeta de trabajo donde se generó: es una referencia, no un paso de compilación.

## Guion

| Tiempo | Imagen | Voz |
|---|---|---|
| 0–7,7 | Sócrates en la prisión con la cicuta | «Atenas, año 399 a. C. Lo condenaron a muerte por hacer preguntas.» — Sócrates: «Solo sé que no sé nada.» |
| 7,7–14,9 | Hipatia en la Biblioteca, antorchas en la puerta | «Alejandría. A ella la persiguieron por enseñar.» — Hipatia: «Defiende tu derecho a pensar.» |
| 14,9–22,5 | Sor Juana escribiendo a la luz de las velas | «Nueva España. A ella le prohibieron escribir.» — Sor Juana: «Yo no estudio para saber más, sino para ignorar menos.» |
| 22,5–27,4 | Nietzsche en un acantilado bajo la tormenta | Nietzsche: «¡Dios ha muerto!» — «Y él se atrevió a desafiarlo todo.» |
| 27,4–34,9 | Gargi en la India → Confucio → Pachacútec → Ptahhotep → Nezahualcóyotl → machi mapuche | «Durante 26 siglos… en la India, en China, en los Andes, en África… buscaron la verdad.» |
| 34,9–42,3 | Chica descubre el juego en el celular → juego real: pregunta libre, respuesta de Sócrates, debate, acierto | «Hoy puedes hablar con ellos. Preguntarles lo que quieras. Y desafiarlos.» |
| 42,3–49,9 | Viajero cruza un portal de luz → juego real: Atenas, ciudad moderna, Tenochtitlan, abrir *El banquete*, hablar con Ananda, ganar un debate | «Recorre quince mundos. Encuentra sus libros. Cumple sus misiones. Y gana cada debate.» |
| 49,9–53,5 | Ráfaga de mundos del juego (Alejandría, catedral, China, India, Atenas, ciudad) | Solo música: «15 MUNDOS · 68 PENSADORES · 1 ODISEA» |
| 53,5–55 | Sócrates mira a cámara | «¿Te atreves a pensar?» |
| 55–62,6 | Cartón final con botón «Únete a la odisea» y reto | «¡Odisea de la Razón! Gratis, en tu celular. Únete a la odisea.» — en pantalla: «RETO: vence a Sócrates en un debate y comenta tu puntaje ↓» |
| 62,6–67,6 | Polvo dorado sobre negro; aparecen el logo, «Filosofía para Seres Humanos» y filosofiaparasereshumanos.com | «Una más de… Filosofía para Seres Humanos.» |

Imágenes con nano-banana, escenas con voz con Veo 3 fast y música con Suno, todo en kie.ai.

## Texto sugerido para publicar

> Lo condenaron a muerte por hacer preguntas. ¿Te atreves a pensar? 🏛️
> En Odisea de la Razón conversas con Sócrates, Hipatia, Sor Juana, Nietzsche, Confucio y 60 pensadores más, les preguntas lo que quieras y los desafías a un debate. De Tales a nuestros días, y por las sabidurías de los mexicas, incas, mapuche, China, India y África.
> Gratis, en el navegador del celular, sin descargar nada. Link en la bio.
> 🏆 RETO: vence a Sócrates en un debate y comenta tu puntaje.
>
> #filosofía #sócrates #hipatia #sorjuana #nietzsche #videojuegos #educación #profesores #historia #aprendeentiktok

## Tráiler II (`trailer-completo.mp4`)

| Tiempo | Imagen | Texto en pantalla |
|---|---|---|
| 0–7,7 | Sócrates en la prisión (escena de cine) | Voz: «Lo condenaron a muerte por hacer preguntas.» |
| 7,7–13 | Menú del juego con el botón JUGAR | «El primer juego educativo completo · de filosofía, ciencia e historia» |
| 13–16 | Pantalla «¿Por dónde empiezas?» | «Empieza en Sumer, hace 4.500 años · o viaja a la época que quieras» |
| 16–40 | Los 21 mundos, de Sumer a la ciencia, cada uno con su número, nombre y pensadores | «21 épocas» · «De Bagdad a Tenochtitlan» · «96 pensadoras y pensadores» |
| 40–64 | Debate con Sócrates, diálogo con Platón, caverna, Sísifo, Giges, Descartes, mariposa, libro | Un rótulo por cada experiencia |
| 64–70 | Mapa filosófico y mapa de la clase | «Tu mapa filosófico» · «Para docentes» |
| 70–75 | Cifras | «21 épocas · 96 pensadoras y pensadores · 15 diálogos socráticos · 9 experimentos filosóficos · Gratis, en tu celular» |
| 75–85 | Llamada y firma | «Únete a la odisea · RETO: sal de la caverna de Platón y comenta tu mapa filosófico ↓» y logo |

### Texto sugerido

> El primer juego educativo completo de filosofía, ciencia e historia. 🏛️🔭
> 21 épocas, de Sumer a nuestros días: debate con Sócrates, baja a la caverna de Platón, empuja la roca de Sísifo, duda con Descartes, sueña con Zhuangzi… y descubre tu propio mapa filosófico.
> 96 pensadoras y pensadores de Grecia, China, India, África, el islam, los mexicas, los incas, los mapuche y más. Con modo aula para docentes.
> Gratis, en el celular, sin descargar nada. Link en la bio.
> 🏆 RETO: sal de la caverna de Platón y comenta tu mapa filosófico.
>
> #filosofía #historia #ciencia #educación #videojuegoseducativos #profesores #sócrates #platón #aprendeentiktok
