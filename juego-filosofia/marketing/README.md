# Material para redes

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
