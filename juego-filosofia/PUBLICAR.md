# Publicar Odisea de la Razón en tu dominio (como app)

El juego es una web estática: `index.html`, `img/` y `audio/`, más `manifest.webmanifest` y `sw.js`, que la convierten en **app instalable** que funciona sin conexión. Se publica gratis con **GitHub Pages** desde este repositorio, y se enlaza desde la web de Lovable.

## 1. Activar GitHub Pages (una vez)
1. En GitHub, abre el repositorio **sofos-gpu** → **Settings** → **Pages**.
2. En **Build and deployment**: *Source* = **Deploy from a branch**; *Branch* = `claude/philosophy-fps-game-3v1tjg` (o `main` si lo fusionas), carpeta **/ (root)** → **Save**.
3. En uno o dos minutos queda en: `https://filosofiaparasereshumanos-ux.github.io/sofos-gpu/`.

## 2. Ponerlo en tu dominio: `juego.filosofiaparasereshumanos.com`
1. Donde administras el DNS de tu dominio, crea un registro **CNAME**: nombre `juego` → destino `filosofiaparasereshumanos-ux.github.io`.
2. En GitHub → Settings → Pages → **Custom domain**, escribe `juego.filosofiaparasereshumanos.com` → **Save**. Cuando el DNS se verifique, marca **Enforce HTTPS**.

## 3. Botón en la web de Lovable
En el chat de Lovable, pide algo como:

> Agrega en la página de inicio una sección destacada «Odisea de la Razón: el videojuego de filosofía», con el texto «Conversa y debate con Sócrates, Hipatia, Sor Juana y 214 pensadores más en 35 épocas. Gratis.» y un botón dorado «Jugar gratis» que abra https://juego.filosofiaparasereshumanos.com en una pestaña nueva. Agrega también la ruta /odisea que redirija a esa misma dirección.

## Instalarla como app
- **Android / computador (Chrome, Edge):** en la pantalla de título aparece **«Instalar app»**, o en el menú del navegador → *Instalar aplicación*.
- **iPhone (Safari):** botón **Compartir** → **Agregar a inicio**.

## Qué cambia respecto a la versión en Claude
Todo el juego funciona igual (35 épocas, 217 pensadores con voz, debates, libros, oráculo, modo aula, música). Fuera de Claude no hay IA: desaparece «Pregúntale lo que quieras», «¿Qué diría…?» muestra las ideas escritas de cada pensador y el Salón de la Fama se guarda en cada aparato. Para recuperar la IA en tu dominio haría falta un pequeño servidor con una clave de la API de Claude (con costo por uso).

## Actualizar
Cada vez que se publica un cambio en la rama, GitHub Pages lo actualiza solo. Quien tenga la app instalada recibe la versión nueva la próxima vez que la abra con conexión.
