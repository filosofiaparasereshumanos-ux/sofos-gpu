// Dirección pública del juego: se usa en todos los textos para compartir.
const GAME_URL = 'https://filosofiaparasereshumanos-ux.github.io/sofos-gpu/';

// ============================================================================
//  ARTE: retratos al óleo de los pensadores e ilustraciones de cada época
//  (generados con kie.ai e incluidos en img/). Si una imagen no carga, se
//  mantiene la inicial dorada de siempre.
// ============================================================================
const ART = {
  portrait(id) { return 'img/p-' + id + '.jpg'; },
  era(i) { return 'img/e-' + i + '.jpg'; },
  place(id) { return 'img/l-' + id + '.jpg'; },
};
function setMedal(el, id, letter) {
  if (!el) return;
  el.textContent = letter || ''; el.classList.remove('portrait'); el.style.backgroundImage = ''; el.dataset.pid = id || '';
  el.classList.remove('sprite'); el.style.backgroundSize = ''; el.style.backgroundPosition = '';
  if (!id) return;
  const sp = typeof SPRITES !== 'undefined' && SPRITES[id];
  if (sp) {
    const [src, c, r, cols, rows] = sp; const im = new Image();
    im.onload = () => { if (el.dataset.pid !== id) return; el.style.backgroundImage = `url("${src}")`;
      el.style.backgroundSize = `${cols * 100}% ${rows * 100}%`; el.style.backgroundPosition = `${cols > 1 ? (c / (cols - 1)) * 100 : 0}% ${rows > 1 ? (r / (rows - 1)) * 100 : 0}%`;
      el.classList.add('portrait', 'sprite'); };
    im.src = src; return;
  }
  if (/^[cb]-/.test(id)) return;
  const im = new Image();
  im.onload = () => { if (el.dataset.pid !== id) return; el.style.backgroundImage = `url("${im.src}")`; el.classList.add('portrait'); };
  im.src = ART.portrait(id);
}
function setEraBackdrop(el, i) {
  if (!el) return; el.style.removeProperty('--era-img'); el.classList.remove('has-art');
  const im = new Image(); im.onload = () => { el.style.setProperty('--era-img', `url("${im.src}")`); el.classList.add('has-art'); }; im.src = ART.era(i);
}
