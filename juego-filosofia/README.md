# Odisea de la Razón · Duelo de filósofos

Juego de cartas y preguntas para el móvil (y el ordenador): recorres un camino de **Tales a Kant**,
vences a **25 filósofos** en duelos y coleccionas sus ideas como cartas. Sirve para jugar por gusto
y para repasar filosofía en clase.

## Cómo jugarlo

Abre `index.html` en un navegador (un solo archivo, sin instalación). Para publicarlo gratis con
GitHub Pages: Settings → Pages → rama principal, y entra a `…/juego-filosofia/`.

## Cómo se juega

1. **Si aciertas, golpeas tú; si fallas, golpea el filósofo.** Cada uno te pregunta sobre su pensamiento.
2. **Antes de responder puedes jugar una carta** de tu mano (una por pregunta, opcional):
   - *Ataque*: más daño si aciertas (Logos +4, Armonía ×2, Giro copernicano…)
   - *Defensa*: menos daño si fallas (Prudencia, el Ser, Epojé anula el golpe…)
   - *Ingenio*: quita respuestas falsas, da tiempo, cambia la pregunta (Mayéutica, Navaja de Ockham…)
   - *Cura*: recuperas razón (Autarquía, Arjé…)

   El juego premia saber *cuánto sabes*: si estás seguro, ataca; si dudas, defiéndete.
3. **Cada filósofo tiene una habilidad**: Heráclito «el Oscuro» nubla las respuestas, Sócrates
   duplica su golpe con la ironía, Platón hace brillar una sombra falsa, Diógenes te roba cartas…
4. **Al vencerlo ganas su concepto como carta** (25 en total) y hasta 3 estrellas.
5. **Repaso**: tras cada duelo ves las preguntas con su explicación.

## Además

- **Lecciones habladas**: cada filósofo explica su filosofía en primera persona, con su voz y
  subtítulos. Si la escuchas antes del duelo, empiezas con la carta *Lección aprendida*.
- **Oráculo de Delfos**: 10 preguntas al día, iguales para todos, con resultado para compartir.
- **Salón de la Fama** compartido (en la versión publicada en claude.ai), **21 logros**.
- **Modo estudio**: en Ajustes puedes quitar el límite de tiempo.
- 207 preguntas con explicación, música generativa por época y efectos de sonido.

## Código

```bash
node build.mjs   # genera index.html (cartas) y aventura.html (la versión 3D anterior)
```

- `cartas/`: el juego de cartas (`base.js`, `cards.js` con cartas, habilidades y arte SVG, `game.js`, `template.html`).
- `src/01-data.js`: épocas, filósofos y preguntas (compartido). `src/01a-lessons.js`: lecciones.
- `src/00b-audio.js`, `src/03a-music.js`: efectos y música (compartidos).
- El resto de `src/` es la aventura 3D en primera persona, que se conserva en `aventura.html`.
