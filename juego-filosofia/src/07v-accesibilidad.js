// ============================================================================
//  ACCESIBILIDAD: tamaño de letra (normal, grande, muy grande) y una letra
//  pensada para la dislexia y la baja visión (Atkinson Hyperlegible). Se elige
//  en Ajustes y se guarda en el aparato.
// ============================================================================
const Acceso = {
  T: { size: 'Tamaño de letra', sizes: ['Normal', 'Grande', 'Muy grande'], dys: 'Letra más legible (dislexia)', no: 'No', yes: 'Sí' },
  SIZES: { normal: 100, grande: 115, muy: 130 },
  apply() {
    const s = G.settings; document.documentElement.style.fontSize = (this.SIZES[s.letra] || 100) + '%';
    document.body.style.fontSize = s.letra && s.letra !== 'normal' ? (17 * this.SIZES[s.letra] / 100) + 'px' : '';
    if (s.dislexia) {
      if (!document.getElementById('font-atkinson')) { const l = document.createElement('link'); l.id = 'font-atkinson'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap'; document.head.appendChild(l); }
      document.documentElement.classList.add('dislexia');
    } else document.documentElement.classList.remove('dislexia');
    document.querySelectorAll('#s-letra button').forEach((b) => b.classList.toggle('on', b.dataset.v === (s.letra || 'normal')));
    document.querySelectorAll('#s-dislexia button').forEach((b) => b.classList.toggle('on', (b.dataset.v === '1') === !!s.dislexia));
  },
  build() {
    const anchor = document.getElementById('s-invert'); const row0 = anchor && anchor.closest('.row'); if (!row0 || document.getElementById('s-letra')) return;
    const mk = (id, label, opts) => { const r = document.createElement('div'); r.className = 'row'; r.innerHTML = `<label></label><div class="seg" id="${id}"></div>`; r.querySelector('label').textContent = label; const seg = r.querySelector('.seg'); for (const [v, t] of opts) { const b = document.createElement('button'); b.dataset.v = v; b.textContent = t; seg.appendChild(b); } row0.before(r); return seg; };
    mk('s-letra', this.T.size, [['normal', this.T.sizes[0]], ['grande', this.T.sizes[1]], ['muy', this.T.sizes[2]]]).addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; G.settings.letra = b.dataset.v; saveSettings(); this.apply(); Audio.click && Audio.click(); });
    mk('s-dislexia', this.T.dys, [['0', this.T.no], ['1', this.T.yes]]).addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; G.settings.dislexia = b.dataset.v === '1'; saveSettings(); this.apply(); Audio.click && Audio.click(); });
  },
};
{
  const st = document.createElement('style');
  st.textContent = 'html.dislexia{--body:"Atkinson Hyperlegible",Verdana,sans-serif;--display:"Atkinson Hyperlegible",Verdana,sans-serif}html.dislexia body{letter-spacing:.02em;word-spacing:.08em}html.dislexia p,html.dislexia .po-b p,html.dislexia .ju-say{line-height:1.65}';
  document.head.appendChild(st);
  Acceso.build(); Acceso.apply();
}
