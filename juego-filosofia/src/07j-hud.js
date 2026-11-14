// ============================================================================
//  HUD ORDENADO EN EL CELULAR (vertical)
//  Arriba a la izquierda, una tarjeta con la época y el objetivo en dos líneas
//  (al tocarla se lee entero). Arriba a la derecha, una fila de botones redondos
//  (foto, pantalla completa, pausa) y debajo la sabiduría y los fragmentos.
//  «Jugar en línea» pasa bajo los marcadores para no tapar el nombre de la época
//  y la ruta de los pensadores baja un poco para que nada se pise.
// ============================================================================
{
  const st = document.createElement('style');
  st.textContent = '@media (max-width:760px) and (orientation:portrait){'
    + 'body.touch .hud-tl{top:calc(10px + var(--sat));left:calc(10px + var(--sal));max-width:calc(100% - 172px);box-sizing:border-box;padding:6px 10px 7px;border-radius:12px;background:linear-gradient(180deg,rgba(14,10,6,.66),rgba(14,10,6,.44));border:1px solid rgba(216,178,90,.35);pointer-events:auto;cursor:pointer}'
    + 'body.touch .hud-era{font-size:.6rem;letter-spacing:.1em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
    + 'body.touch .hud-obj{font-size:.78rem;line-height:1.25;margin-top:2px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}'
    + 'body.touch .hud-tl.open .hud-obj{display:block;-webkit-line-clamp:unset}'
    + 'body.touch .hud-tr{top:calc(58px + var(--sat));right:calc(10px + var(--sar));gap:10px;padding:3px 10px 4px;border-radius:12px;background:rgba(14,10,6,.5);border:1px solid rgba(216,178,90,.3)}'
    + 'body.touch #tfs{top:calc(10px + var(--sat));right:calc(58px + var(--sar))}body.touch #tpause{top:calc(10px + var(--sat));right:calc(10px + var(--sar))}'
    + 'body.touch #b-foto{top:calc(10px + var(--sat));left:auto;right:calc(106px + var(--sar));width:40px;height:40px;font-size:1.1rem}'
    + 'body.touch #mp-badge{top:calc(100px + var(--sat));left:auto;right:calc(10px + var(--sar));transform:none;font-size:.72rem;padding:3px 10px}'
    + 'body.touch #path{top:calc(134px + var(--sat))}'
    + 'body.touch .hud-bl{padding:5px 8px 6px;border-radius:10px;background:rgba(14,10,6,.45);box-sizing:border-box}'
    + 'body.touch #hud::before{height:calc(170px + var(--sat))}'
    + '}';
  document.head.appendChild(st);
  const tl = document.querySelector('.hud-tl');
  if (tl) tl.addEventListener('click', () => { if (IS_TOUCH) { tl.classList.toggle('open'); clearTimeout(tl._t); if (tl.classList.contains('open')) tl._t = setTimeout(() => tl.classList.remove('open'), 6000); } });
}
