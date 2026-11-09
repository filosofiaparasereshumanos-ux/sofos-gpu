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
};
function setMedal(el, id, letter) {
  if (!el) return;
  el.textContent = letter || ''; el.classList.remove('portrait'); el.style.backgroundImage = ''; el.dataset.pid = id || '';
  if (!id) return;
  const im = new Image();
  im.onload = () => { if (el.dataset.pid !== id) return; el.style.backgroundImage = `url("${im.src}")`; el.classList.add('portrait'); };
  im.src = ART.portrait(id);
}
function setEraBackdrop(el, i) {
  if (!el) return; el.style.removeProperty('--era-img'); el.classList.remove('has-art');
  const im = new Image(); im.onload = () => { el.style.setProperty('--era-img', `url("${im.src}")`); el.classList.add('has-art'); }; im.src = ART.era(i);
}
