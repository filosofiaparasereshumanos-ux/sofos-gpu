// ============================================================================
//  RANGO Y VICTORIAS
//  · Cada pensador vencido suma a tu rango: de Viajero curioso a Guardián de
//    la Razón, con su color y su corona de laurel.
//  · «Mis victorias» (Inicio): tu rango, cuántos llevas, cuánto falta para el
//    siguiente y, época por época, los retratos de los que ya venciste.
//  · En el mundo: los vencidos llevan una corona de laurel dorada.
//  · En línea: los demás viajeros ven tu rango sobre tu avatar, con tu corona.
// ============================================================================
const RANGOS = [
  { n: 'Viajero curioso', min: 0, c: '#d8c8a8', i: '✧' },
  { n: 'Aprendiz', min: 3, c: '#d0905a', i: '❧' },
  { n: 'Discípulo', min: 10, c: '#c8d4e4', i: '☙' },
  { n: 'Dialéctico', min: 25, c: '#f0c860', i: '✦' },
  { n: 'Filósofo', min: 50, c: '#6ad8b0', i: '❖' },
  { n: 'Sabio', min: 90, c: '#8fb8ff', i: '✺' },
  { n: 'Maestro', min: 140, c: '#c890ff', i: '✹' },
  { n: 'Guardián de la Razón', min: 200, c: '#fff4d0', i: '☀' },
];
ACH.push({ id: 'rango-filosofo', i: '❖', n: 'Filósofo', d: 'Alcanza el rango de Filósofo: 50 pensadores vencidos.' }, { id: 'rango-guardian', i: '☀', n: 'Guardián de la Razón', d: 'Alcanza el rango más alto.' });
const Rango = {
  total() { return ERAS.reduce((a, e) => a + e.sages.length, 0); },
  n() { return G.codex ? G.codex.size : 0; },
  of(n) { let k = 0; RANGOS.forEach((r, i) => { if (n >= r.min) k = i; }); return k; },
  info(n = this.n()) { const k = this.of(n); const r = RANGOS[k], nx = RANGOS[k + 1]; return { k, lvl: k + 1, r, nx, n, falta: nx ? nx.min - n : 0, pct: nx ? (n - r.min) / (nx.min - r.min) : 1 }; },
  check() { const k = this.of(this.n()); if (k >= 4) achieve('rango-filosofo'); if (k >= 7) achieve('rango-guardian'); if (this._k !== undefined && k > this._k) { const r = RANGOS[k]; setTimeout(() => toast(`${r.i} ¡Nuevo rango: ${r.n}! Los demás viajeros lo verán sobre tu avatar.`), 1600); Audio.victory && Audio.victory(); } this._k = k; this.paintButton(); },
  // ---------- corona de laurel 3D, del color del rango
  crown(col) {
    const g = new THREE.Group(); const m = new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.6, metalness: 0.7, roughness: 0.3 });
    g.add(new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.025, 8, 28), m));
    for (let i = 0; i < 14; i++) { const a = (i / 14) * Math.PI * 2; if (Math.abs(Math.sin(a)) > 0.92 && Math.cos(a) > 0) continue; const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 4), m); leaf.scale.set(0.6, 1.5, 0.35); leaf.position.set(Math.cos(a) * 0.24, Math.sin(a) * 0.24, 0); leaf.rotation.z = a + 0.6; g.add(leaf); }
    g.rotation.x = Math.PI / 2; return g;
  },
  // ---------- botón de Inicio
  paintButton() { const s = $('#b-vic-s'); if (!s) return; const I = this.info(); s.textContent = `${I.r.n} · ${I.n} de ${this.total()}`; const b = $('#b-vic'); if (b) b.style.setProperty('--rk', I.r.c); },
  // ---------- la ficha «Mis victorias»
  open() { Panel.open('vi'); this.paint(); },
  close() { Panel.close('vi'); },
  paint() {
    const I = this.info(); const T = this.total(); const card = $('#vi-head'); card.style.setProperty('--rk', I.r.c);
    $('#vi-emblem').textContent = I.r.i; $('#vi-lvl').textContent = `Nivel ${I.lvl} de ${RANGOS.length}`; $('#vi-rank').textContent = I.r.n;
    $('#vi-count').textContent = `${I.n} de ${T} pensadoras y pensadores vencidos`;
    $('#vi-bar').style.width = Math.round(I.pct * 100) + '%';
    $('#vi-next').textContent = I.nx ? `Te faltan ${I.falta} para ser ${I.nx.n}` : 'Has alcanzado el rango más alto';
    const box = $('#vi-eras'); box.innerHTML = ''; let full = 0;
    for (const i of CHRONO) {
      const e = ERAS[i]; const got = e.sages.filter((s) => G.codex.has(s.id)).length; if (got === e.sages.length) full++;
      const row = document.createElement('div'); row.className = 'vi-era' + (got === e.sages.length ? ' full' : got ? ' some' : '');
      row.innerHTML = '<div class="vi-eh"><b></b><span></span></div><div class="vi-faces"></div>';
      row.querySelector('b').textContent = `${e.num} · ${e.name}`; row.querySelector('span').textContent = got === e.sages.length ? '✓ completa' : `${got} / ${e.sages.length}`;
      const faces = row.querySelector('.vi-faces');
      for (const s of e.sages) { const f = document.createElement('i'); f.className = 'medal sm vi-f' + (G.codex.has(s.id) ? ' on' : ''); f.title = s.name + (G.codex.has(s.id) ? ' · vencido' : ''); setMedal(f, s.id, s.short[0]); faces.appendChild(f); }
      box.appendChild(row);
    }
    $('#vi-full').textContent = `${full} de ${CHRONO.length} épocas completas`;
  },
};
// los pensadores vencidos llevan una corona de laurel dorada y lo dicen en su letrero
{
  const d0 = Sage.prototype.defeat;
  Sage.prototype.defeat = function () {
    d0.call(this);
    this.label.material.map = labelTexture(this.data.short, '✓ Vencido · ' + this.data.concept.name, '#ffd36a'); this.label.material.needsUpdate = true;
    if (!this._crown && this.fig && this.fig.group) { const c = Rango.crown(0xffd36a); c.position.y = 2.32; this.fig.group.add(c); this._crown = c; }
    if (typeof Rango !== 'undefined') Rango.check();
  };
}
on('#b-vic', () => { Audio.click(); Rango.open(); });
on('#vi-x', () => Rango.close());
Rango._k = Rango.of(Rango.n()); Rango.paintButton();
