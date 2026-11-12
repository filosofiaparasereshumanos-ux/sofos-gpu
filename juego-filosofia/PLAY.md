# Publicar «Odisea de la Razón» en Google Play

El juego ya es una app web instalable (PWA). Para Google Play se empaqueta como
**Trusted Web Activity (TWA)**: una app Android que abre la versión web a pantalla
completa. Cada vez que actualizamos el juego en GitHub Pages, la app se actualiza
sola, sin subir una versión nueva a Play.

## Lo que ya está listo

| Requisito de Play | Dónde está |
|---|---|
| App web con manifiesto, service worker e íconos | `manifest.webmanifest`, `sw.js`, `img/icon-*.png` |
| Ícono 512×512 | `img/icon-512.png` |
| Gráfico destacado 1024×500 | `marketing/play/grafico-destacado.png` |
| Capturas de teléfono 1080×1920 | `marketing/play/1-inicio.png` … `8-experimento.png` (portada, Japón, pensadora, debate, avatar, ágora en Persia, escuchar juntos y el dilema del tranvía) |
| Política de privacidad (URL pública) | https://filosofiaparasereshumanos-ux.github.io/sofos-gpu/juego-filosofia/privacidad.html |

## Pasos (unos 30 minutos)

1. **Cuenta de desarrollador.** Entra en https://play.google.com/console y crea tu
   cuenta (pago único de 25 USD). Google pide verificar tu identidad: puede tardar
   unos días.

2. **Generar la app Android con PWABuilder** (gratis, de Microsoft):
   - Abre https://www.pwabuilder.com
   - Pega: `https://filosofiaparasereshumanos-ux.github.io/sofos-gpu/juego-filosofia/index.html`
   - Pulsa **Package for stores → Android → Generate package**.
   - Datos sugeridos:
     - *Package ID:* `com.filosofiaparasereshumanos.odisea`
     - *App name:* `Odisea de la Razón` · *Short name:* `Odisea`
     - *Display mode:* Fullscreen · *Signing key:* **Create new**
   - Descarga el ZIP. Dentro vienen el archivo **`.aab`** (lo que se sube a Play),
     la **llave de firma** (`signing.keystore` + `signing-key-info.txt`) y un archivo
     **`assetlinks.json`**.
   - ⚠️ **Guarda la llave de firma en un lugar seguro** (no la subas a GitHub). Sin
     ella no podrás publicar actualizaciones de la app.

3. **Crear la app en Play Console:** *Crear app* → nombre «Odisea de la Razón»,
   idioma español, tipo *Juego*, gratis. Luego completa:
   - *Ficha de Play Store:* descripción (abajo), ícono, gráfico destacado y capturas.
   - *Política de privacidad:* la URL de arriba.
   - *Clasificación de contenido:* cuestionario (educativo, sin violencia realista,
     sin compras, sin anuncios).
   - *Público objetivo:* elige las edades (por ejemplo, 13 años o más). Si incluyes
     menores de 13, Google pide cumplir la política de Familias.
   - *Seguridad de los datos:* recopila «nombre de usuario» (opcional, para la
     cuenta) y «progreso del juego»; no se comparte con terceros; se puede pedir
     el borrado. Para el multijugador declara también «Otro contenido generado por
     el usuario» (apodo y avatar) e «Interacciones en la app» (posición, gestos y
     respuestas), marcados como **transmitidos de forma efímera, no almacenados**,
     cifrados en tránsito y opcionales.
   - *Clasificación de contenido:* en «Interacción entre usuarios» responde que
     **sí** hay interacción, **sin** chat libre, sin compartir ubicación real ni
     datos personales, con opción de silenciar a otros jugadores.

4. **Subir el `.aab`:** *Pruebas → Prueba interna* (o directamente *Producción*) →
   *Crear versión* → sube el archivo. Las cuentas personales nuevas deben hacer
   primero una **prueba cerrada con 12 personas durante 14 días**; invita a tus
   estudiantes o seguidores.

5. **Quitar la barra del navegador (opcional, recomendado).** Sin este paso la app
   funciona, pero muestra una barra con la dirección arriba. Para quitarla, Google
   necesita encontrar `assetlinks.json` en
   `https://filosofiaparasereshumanos-ux.github.io/.well-known/assetlinks.json`.
   Como el juego vive en una subcarpeta, hay que crear en GitHub un repositorio
   nuevo llamado exactamente **`filosofiaparasereshumanos-ux.github.io`**, con el
   archivo `.well-known/assetlinks.json` (el que generó PWABuilder) y un archivo
   vacío `.nojekyll`. Si me lo pides, te preparo ese contenido.
   Importante: en Play Console, en *Integridad de la app → Firma de apps*, copia la
   huella **SHA-256** de la llave de Google y añádela también a `assetlinks.json`.

## Descripción para la ficha

**Breve (80 caracteres):**
Debate con 140 filósofas y filósofos en 24 épocas, de Sumer a hoy.

**Completa:**
Odisea de la Razón es un viaje en 3D por la historia del pensamiento. Camina por la
Atenas de Sócrates, la Persia de Zaratustra, la Bagdad de la Casa de la Sabiduría, la
Tenochtitlan de los poetas nahuas o el Japón del zen, y debate con 107 pensadoras y
pensadores: Hipatia, Sor Juana, Confucio, Avicena, Simone de Beauvoir, Paulo Freire,
Marie Curie y muchos más.

• Escucha sus lecciones narradas y descubre lugares, libros y personajes de cada época.
• Vence en debates de preguntas y en 41 diálogos socráticos: toma postura, da razones y aprende a detectar falacias.
• Vive 11 experimentos filosóficos: la caverna de Platón, el tranvía, la habitación china, la máquina de experiencias…
• Vota en la pregunta del día de cada época y descubre cuántos viajeros piensan como tú.
• Comparte tu perfil filosófico («Pienso como Descartes») y sácate fotos con los pensadores.
• Gana accesorios para tu avatar con tus logros.
• Siéntate con otros viajeros a escuchar la lección de un pensador, como en la Academia, y comparen qué piensa cada uno.
• Mira debatir a Platón con Aristóteles o a Hobbes con Rousseau, con sus voces, y decide quién te convence.
• Misiones nuevas cada día y rachas con premios para tu avatar.
• Línea de tiempo: descubre quién vivió a la vez en Grecia, China, la India o América.
• Torneos de debate relámpago: con tres o más viajeros en la misma época, todos defienden la misma tesis y votan la mejor razón.
• Mundo abierto: encuentra a otros viajeros en la misma época, salúdalos con gestos y rétalos a un duelo o a un debate. Sin chat libre.
• Consulta cada día al Oráculo de Delfos y compite en el ranking mundial.
• Reta a tus amigos con un enlace: las mismas diez preguntas, gana quien sepa más.
• Para docentes: modo aula con seguimiento del curso, trivia en vivo para proyectar, grupos privados y guía didáctica.

Gratis, sin anuncios. Una propuesta de Filosofía para Seres Humanos.
