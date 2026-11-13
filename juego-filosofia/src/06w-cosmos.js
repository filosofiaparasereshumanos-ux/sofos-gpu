// ============================================================================
//  EL COSMOS
//  · El planetario: una sala oscura donde caminas entre el Sol y los planetas,
//    que giran a su ritmo. En cada uno, «Explorar» abre su ficha con datos
//    reales y sella tu pasaporte planetario.
//  · La báscula cósmica: dinos cuánto pesas y sabrás cuánto pesarías en cada mundo.
//  · El atlas del cosmos (gran telescopio o Inicio → Cosmos): un viaje por
//    escalas, de la Tierra y la Luna al universo observable, el sistema
//    solar planeta a planeta y el calendario cósmico.
// ============================================================================
const COS_PASS_KEY = 'odisea-razon.pasaporte', COS_WEIGHT_KEY = 'odisea-razon.peso', COS_SEEN_KEY = 'odisea-razon.atlas';
const COS_IMG = { sol: 'cos-sol', tierra: 'cos-tierra-luna', marte: 'cos-marte', jupiter: 'cos-jupiter', saturno: 'cos-saturno' };
const COS_UI = { pass: 'Pasaporte planetario', weightQ: '¿Cuánto pesas en la Tierra? (kg)', weightNone: 'Escribe tu peso en la Tierra para saber cuánto pesarías aquí.' };
ACH.push(
  { id: 'pasaporte', i: '🪐', n: 'Pasaporte completo', d: 'Visita el Sol, los ocho planetas y Plutón en el planetario.' },
  { id: 'atlas', i: '🔭', n: 'Hasta el borde del universo', d: 'Recorre todas las escalas del atlas del cosmos.' },
  { id: 'primerplaneta', i: '🌍', n: 'Primer sello', d: 'Sella tu pasaporte planetario por primera vez.' },
);
const Cosmos = {
  pass: new Set(store.get(COS_PASS_KEY, []) || []),
  seen: new Set(store.get(COS_SEEN_KEY, []) || []),
  weight() { const w = +store.get(COS_WEIGHT_KEY, 0); return w > 0 && w < 400 ? w : 0; },
  weightLine(p) { const w = this.weight(); return w ? `Si en la Tierra pesas ${w} kg, aquí pesarías ${(w * p.g).toFixed(1).replace('.', ',')} kg.` : `La gravedad aquí es ${String(p.g).replace('.', ',')} veces la de la Tierra.`; },
  stamp(id) {
    if (this.pass.has(id)) return false; this.pass.add(id); store.set(COS_PASS_KEY, [...this.pass]); achieve('primerplaneta');
    if (PLANETAS.every((p) => this.pass.has(p.id))) achieve('pasaporte'); return true;
  },
  card(p) { return `${p.tipo}. Diámetro: ${p.diam}. Distancia al Sol: ${p.dist}. Día: ${p.dia}. Año: ${p.ano}. Lunas: ${p.lunas}. Temperatura: ${p.temp}. ${p.datos.join(' ')} ${this.weightLine(p)}`; },
  // ---------- texturas pintadas a mano (canvas) para cada planeta
  tex(id) {
    const c = document.createElement('canvas'); c.width = 256; c.height = 128; const x = c.getContext('2d'); const r = mulberry32(id.length * 97 + id.charCodeAt(0));
    const fill = (col) => { x.fillStyle = col; x.fillRect(0, 0, 256, 128); };
    const bands = (cols, n) => { for (let i = 0; i < n; i++) { x.fillStyle = cols[i % cols.length]; x.fillRect(0, (i / n) * 128, 256, 128 / n + 1); } x.globalAlpha = 0.25; for (let i = 0; i < 40; i++) { x.fillStyle = cols[(i * 3) % cols.length]; x.fillRect(r() * 256, r() * 128, 30 + r() * 80, 2 + r() * 4); } x.globalAlpha = 1; };
    const blots = (col, n, s) => { x.fillStyle = col; for (let i = 0; i < n; i++) { x.beginPath(); x.ellipse(r() * 256, r() * 128, s * (0.4 + r()), s * (0.3 + r() * 0.6), r() * 3, 0, TAU); x.fill(); } };
    if (id === 'sol') { fill('#ffb020'); blots('#ffd060', 60, 10); blots('#ff8a10', 30, 8); blots('#8a4010', 4, 3); }
    else if (id === 'mercurio') { fill('#8a8580'); blots('#6a6560', 50, 6); blots('#a8a39c', 30, 4); }
    else if (id === 'venus') { bands(['#e8d0a0', '#d8b880', '#f0dcb0', '#c8a870'], 9); }
    else if (id === 'tierra') { fill('#2a5aa8'); blots('#3a8a4a', 14, 18); blots('#c8a86a', 6, 10); x.fillStyle = '#f4f8ff'; x.fillRect(0, 0, 256, 9); x.fillRect(0, 119, 256, 9); x.globalAlpha = 0.6; blots('#ffffff', 26, 9); x.globalAlpha = 1; }
    else if (id === 'marte') { fill('#c0502a'); blots('#8a3018', 26, 12); blots('#d8784a', 20, 8); x.fillStyle = '#f4ece8'; x.fillRect(0, 0, 256, 6); }
    else if (id === 'jupiter') { bands(['#d8b890', '#a8784a', '#f0dcc0', '#c09068', '#e8c8a0', '#8a5a3a'], 14); x.fillStyle = '#c0442a'; x.beginPath(); x.ellipse(170, 82, 18, 9, 0, 0, TAU); x.fill(); }
    else if (id === 'saturno') { bands(['#e8d4a8', '#d8bc88', '#f0e0c0', '#c8a878'], 12); }
    else if (id === 'urano') { fill('#9ad8e0'); bands(['#9ad8e0', '#8ad0d8', '#a8e0e8'], 6); }
    else if (id === 'neptuno') { fill('#3a5ad0'); bands(['#3a5ad0', '#2a48b8', '#4a6ae0'], 7); blots('#1a2a80', 2, 10); }
    else { fill('#c8a888'); blots('#a8805a', 20, 8); x.fillStyle = '#f0e8dc'; x.beginPath(); x.ellipse(140, 72, 22, 18, 0.3, 0, TAU); x.fill(); }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  },
  label(text, sub) { const l = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture(text, sub), transparent: true, depthWrite: false, toneMapped: false })); l.scale.set(2.8, 0.7, 1); return l; },
  // ---------- el gran telescopio de la plaza abre el atlas
  build(W) {
    W.spots = W.spots || [];
    if (W.telescope) W.spots.push({ x: W.telescope.x, z: W.telescope.z, r: 2.4, verb: 'Mirar', label: 'El gran telescopio · atlas del cosmos', on: () => !W.zoneIn, act: () => this.open('escalas') });
  },
  // ---------- el atlas
  open(tab, focus) { this.tab = tab || this.tab || 'escalas'; this.focus = focus || null; Panel.open('cs'); this.paint(); },
  close() { Panel.close('cs'); },
  paint() {
    document.querySelectorAll('#cs-tabs button').forEach((b) => b.classList.toggle('on', b.dataset.t === this.tab));
    for (const t of ['escalas', 'planetas', 'calendario']) $('#cs-' + t).hidden = this.tab !== t;
    if (this.tab === 'escalas') this.paintScale(); else if (this.tab === 'planetas') this.paintPlanets(); else this.paintCal();
  },
  lvl: 0,
  paintScale() {
    const E = COSMOS_ESCALAS[this.lvl]; this.seen.add(E.id); store.set(COS_SEEN_KEY, [...this.seen]); if (COSMOS_ESCALAS.every((e) => this.seen.has(e.id))) achieve('atlas');
    $('#cs-lvl').textContent = `${this.lvl + 1} / ${COSMOS_ESCALAS.length}`; $('#cs-in').disabled = this.lvl === 0; $('#cs-out').disabled = this.lvl === COSMOS_ESCALAS.length - 1;
    $('#cs-name').textContent = E.n; $('#cs-size').textContent = E.tam; $('#cs-light').textContent = E.luz; $('#cs-desc').textContent = E.d;
    const ul = $('#cs-objs'); ul.innerHTML = ''; for (const o of E.obj) { const li = document.createElement('li'); li.innerHTML = (o.img ? `<i class="cs-th" style="background-image:url(img/${o.img}.jpg)"></i>` : '') + '<b></b> <span></span>'; li.querySelector('b').textContent = o.n; li.querySelector('span').textContent = o.t; ul.appendChild(li); }
    const im = $('#cs-img'); im.style.backgroundImage = `url(img/${E.img}.jpg)`;
    this.draw(); Voice.say(E.n + '. ' + E.d);
  },
  // dibujo esquemático de cada escala
  draw() {
    const cv = $('#cs-cv'); const w = cv.clientWidth || 600, h = 220; cv.width = w * 2; cv.height = h * 2; const x = cv.getContext('2d'); x.scale(2, 2);
    x.fillStyle = '#04060f'; x.fillRect(0, 0, w, h); const r = mulberry32(7 + this.lvl); const cx = w / 2, cy = h / 2;
    for (let i = 0; i < 160; i++) { x.fillStyle = `rgba(255,255,255,${0.15 + r() * 0.5})`; x.fillRect(r() * w, r() * h, 1, 1); }
    const dot = (px, py, rad, col, glowC) => { if (glowC) { const g = x.createRadialGradient(px, py, 0, px, py, rad * 3); g.addColorStop(0, glowC); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.beginPath(); x.arc(px, py, rad * 3, 0, TAU); x.fill(); } x.fillStyle = col; x.beginPath(); x.arc(px, py, rad, 0, TAU); x.fill(); };
    const txt = (s, px, py, col = '#dfe8ff') => { x.fillStyle = col; x.font = '12px Georgia, serif'; x.textAlign = 'center'; x.fillText(s, px, py); };
    const here = (px, py) => { x.strokeStyle = '#ffd36a'; x.lineWidth = 1.5; x.beginPath(); x.arc(px, py, 7, 0, TAU); x.stroke(); txt('Estás aquí', px, py - 12, '#ffd36a'); };
    const id = COSMOS_ESCALAS[this.lvl].id;
    if (id === 'tierra-luna') { dot(w * 0.18, cy, 26, '#2a5aa8', 'rgba(80,140,255,0.35)'); dot(w * 0.84, cy, 7, '#bbb'); x.setLineDash([4, 6]); x.strokeStyle = '#556'; x.beginPath(); x.moveTo(w * 0.18 + 30, cy); x.lineTo(w * 0.84 - 10, cy); x.stroke(); x.setLineDash([]); txt('La Tierra', w * 0.18, cy + 46); txt('La Luna', w * 0.84, cy + 26); txt('384.400 km', cx, cy - 8, '#9ab'); }
    else if (id === 'sistema-solar') { dot(30, cy, 14, '#ffd040', 'rgba(255,200,60,0.4)'); const P = [[4, '#9a9590'], [6, '#e8c890'], [6, '#4a8ad8'], [5, '#d85a3a'], [11, '#d8a878'], [10, '#e8d0a0'], [8, '#8ad8e8'], [8, '#4a6ad8']]; const names = ['Mercurio', 'Venus', 'Tierra', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Neptuno'];
      P.forEach(([s, c], i) => { const px = 60 + Math.sqrt(i + 1) * (w - 100) / Math.sqrt(8) * 0.98; dot(px, cy, s * 0.6, c); txt(names[i], px, cy + (i % 2 ? -14 : 22), '#aab'); if (i === 2) here(px, cy); if (i === 5) { x.strokeStyle = '#e8d0a0'; x.beginPath(); x.ellipse(px, cy, 11, 3, 0, 0, TAU); x.stroke(); } }); }
    else if (id === 'oort') { dot(cx, cy, 3, '#ffd040', 'rgba(255,200,60,0.5)'); x.strokeStyle = 'rgba(140,180,255,0.4)'; x.beginPath(); x.arc(cx, cy, 14, 0, TAU); x.stroke(); txt('Sistema solar', cx, cy + 28, '#aab'); for (let i = 0; i < 900; i++) { const a = r() * TAU, d = 70 + r() * 30; x.fillStyle = 'rgba(200,220,255,0.5)'; x.fillRect(cx + Math.cos(a) * d * 1.6, cy + Math.sin(a) * d * 0.9, 1, 1); } txt('Nube de Oort', cx, 18); }
    else if (id === 'vecindario') { const S = [[0, 0, 'El Sol', '#ffd040'], [60, -20, 'Próxima Centauri', '#ff7050'], [-90, 30, 'Sirio', '#cfe0ff'], [120, 50, 'Épsilon Eridani', '#ffb060'], [-140, -50, 'Estrella de Barnard', '#ff6040'], [180, -60, 'Procyon', '#fff0d0']];
      S.forEach(([dx, dy, n, c], i) => { dot(cx + dx, cy + dy, i ? 3 : 4, c, 'rgba(255,255,255,0.25)'); txt(n, cx + dx, cy + dy + 18, '#aab'); }); here(cx, cy); }
    else if (id === 'via-lactea') { for (let i = 0; i < 2600; i++) { const arm = i % 4; const t = r() * 3.4; const a = arm * (TAU / 4) + t * 1.7 + (r() - 0.5) * 0.5; const d = 8 + t * 30 + (r() - 0.5) * 10; x.fillStyle = r() < 0.15 ? 'rgba(255,190,220,0.7)' : `rgba(${180 + r() * 75},${200 + r() * 55},255,0.7)`; x.fillRect(cx + Math.cos(a) * d * 1.5, cy + Math.sin(a) * d * 0.9, 1.2, 1.2); }
      dot(cx, cy, 10, '#fff0c8', 'rgba(255,220,150,0.6)'); txt('Sagitario A*', cx, cy + 26, '#ffd8a0'); here(cx + 55, cy - 30); }
    else if (id === 'grupo-local') { const G2 = [[-80, 0, 'Vía Láctea', 26], [110, -30, 'Andrómeda', 32], [-120, 50, 'Nubes de Magallanes', 8], [40, 60, 'Triángulo', 14]];
      for (const [dx, dy, n, s] of G2) { for (let i = 0; i < 300; i++) { const a = r() * TAU, d = r() * s; x.fillStyle = 'rgba(210,220,255,0.55)'; x.fillRect(cx + dx + Math.cos(a) * d * 1.4, cy + dy + Math.sin(a) * d * 0.6, 1, 1); } dot(cx + dx, cy + dy, 3, '#fff0d0'); txt(n, cx + dx, cy + dy + s * 0.6 + 16, '#aab'); }
      here(cx - 80, cy); x.setLineDash([3, 5]); x.strokeStyle = '#ffd36a'; x.beginPath(); x.moveTo(cx - 50, cy - 8); x.lineTo(cx + 80, cy - 26); x.stroke(); x.setLineDash([]); txt('2,5 millones de años luz', cx + 15, cy - 26, '#ffd36a'); }
    else if (id === 'laniakea') { const nodes = Array.from({ length: 26 }, () => [r() * w, r() * h]); x.strokeStyle = 'rgba(160,190,255,0.35)';
      nodes.forEach(([a, b], i) => { const n2 = nodes[(i * 7 + 3) % nodes.length]; x.beginPath(); x.moveTo(a, b); x.lineTo(n2[0], n2[1]); x.stroke(); for (let k = 0; k < 30; k++) { x.fillStyle = 'rgba(220,230,255,0.6)'; x.fillRect(a + (r() - 0.5) * 16, b + (r() - 0.5) * 16, 1, 1); } });
      here(cx, cy); txt('Cúmulo de Virgo', nodes[3][0], nodes[3][1] - 10, '#aab'); }
    else { const g = x.createRadialGradient(cx, cy, 10, cx, cy, Math.min(w, h * 2) / 2); g.addColorStop(0, 'rgba(30,40,80,1)'); g.addColorStop(0.85, 'rgba(60,30,60,1)'); g.addColorStop(1, 'rgba(200,120,80,0.9)'); x.fillStyle = g; x.beginPath(); x.ellipse(cx, cy, w * 0.45, h * 0.45, 0, 0, TAU); x.fill();
      for (let i = 0; i < 500; i++) { const a = r() * TAU, d = r(); x.fillStyle = `rgba(255,${200 + r() * 55},${180 + r() * 75},0.7)`; x.fillRect(cx + Math.cos(a) * d * w * 0.43, cy + Math.sin(a) * d * h * 0.43, 1.3, 1.3); } here(cx, cy); txt('Fondo cósmico de microondas', cx, h - 8, '#ffb890'); }
  },
  paintPlanets() {
    const box = $('#cs-planetas'); box.innerHTML = '';
    const wb = document.createElement('div'); wb.className = 'cs-weight'; wb.innerHTML = '<label></label><input type="number" min="1" max="300" inputmode="decimal">'; wb.querySelector('label').textContent = COS_UI.weightQ;
    const inp = wb.querySelector('input'); inp.value = this.weight() || ''; inp.addEventListener('change', () => { store.set(COS_WEIGHT_KEY, +inp.value || 0); this.paintPlanets(); }); box.appendChild(wb);
    const pc = document.createElement('p'); pc.className = 'qd-note'; pc.style.textAlign = 'center'; pc.textContent = `${COS_UI.pass}: ${this.pass.size} de ${PLANETAS.length} sellos`; box.appendChild(pc);
    for (const p of PLANETAS) {
      const it = document.createElement('details'); it.className = 'fa-it' + (this.pass.has(p.id) ? ' got' : ''); if (this.focus === p.id) it.open = true;
      it.innerHTML = '<summary><b></b><i></i><span class="fa-ok"></span></summary><div class="cs-pimg" hidden></div><p class="cs-data"></p><ul class="cs-facts"></ul><p class="fa-r"></p>';
      it.querySelector('b').textContent = p.n; it.querySelector('i').textContent = p.tipo; it.querySelector('.fa-ok').textContent = this.pass.has(p.id) ? '✓ visitado' : '';
      if (COS_IMG[p.id]) { const d = it.querySelector('.cs-pimg'); d.hidden = false; d.style.backgroundImage = `url(img/${COS_IMG[p.id]}.jpg)`; }
      it.querySelector('.cs-data').textContent = `Diámetro: ${p.diam} · Distancia al Sol: ${p.dist} · Día: ${p.dia} · Año: ${p.ano} · Lunas: ${p.lunas} · Temperatura: ${p.temp}`;
      const ul = it.querySelector('.cs-facts'); for (const f of p.datos) { const li = document.createElement('li'); li.textContent = f; ul.appendChild(li); }
      it.querySelector('.fa-r').textContent = this.weightLine(p);
      box.appendChild(it);
    }
  },
  paintCal() {
    const box = $('#cs-calendario'); box.innerHTML = '';
    const intro = document.createElement('p'); intro.className = 'cs-desc'; intro.textContent = 'Imagina que toda la historia del universo, 13.800 millones de años, cabe en un solo año. El Big Bang ocurre el 1 de enero a medianoche. ¿Cuándo aparecemos nosotros?'; box.appendChild(intro);
    // fechas sin palabras que traducir: el formato del idioma de la página y la hora en cifras
    const lang = document.documentElement.lang === 'en' ? 'en-GB' : 'es';
    const when = (hace) => { const s = (1 - hace / 13800) * 365 * 86400; const d = new Date(Date.UTC(2001, 0, 1) + s * 1000); const left = (hace / 13800) * 365 * 86400;
      const day = d.toLocaleDateString(lang, { day: 'numeric', month: 'long', timeZone: 'UTC' }); if (left >= 86400) return day;
      const hh = String(d.getUTCHours()).padStart(2, '0'), mm = String(d.getUTCMinutes()).padStart(2, '0'), ss = String(d.getUTCSeconds()).padStart(2, '0');
      return left < 60 ? `${day} · ${hh}:${mm}:${ss}${(1 - (left % 1)).toFixed(1).slice(1)}` : `${day} · ${hh}:${mm}`; };
    for (const e of CALENDARIO) { const it = document.createElement('div'); it.className = 'cs-cal'; it.innerHTML = '<span class="cs-date"></span><b></b><p></p><small></small>'; it.querySelector('.cs-date').textContent = when(e.hace); it.querySelector('b').textContent = e.n; it.querySelector('p').textContent = e.t;
      it.querySelector('small').textContent = e.hace >= 1 ? `Hace ${String(e.hace).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} millones de años` : `Hace ${Math.round(e.hace * 1e6).toLocaleString('es')} años`; box.appendChild(it); }
  },
};
on('#b-cosmos', () => { Audio.click(); Cosmos.open('escalas'); });
on('#cs-x', () => Cosmos.close());
on('#cs-in', () => { if (Cosmos.lvl > 0) { Cosmos.lvl--; Audio.click(); Cosmos.paintScale(); } });
on('#cs-out', () => { if (Cosmos.lvl < COSMOS_ESCALAS.length - 1) { Cosmos.lvl++; Audio.click(); Cosmos.paintScale(); } });
document.querySelectorAll('#cs-tabs button').forEach((b) => b.addEventListener('click', () => { Audio.click(); Cosmos.tab = b.dataset.t; Cosmos.paint(); }));

// ============================================================================
//  EL PLANETARIO: una zona junto a Kepler
// ============================================================================
ZONES.push({
  id: 'planetario', era: ERAS.findIndex((e) => e.id === 'cosmos'), near: 'kepler', title: 'El planetario', sub: 'Camina entre los planetas', color: 0x8fb8ff, stone: 0xdfe6f0,
  b: { x0: -262, x1: -138, z0: -72, z1: 52 }, entry: [-200, 0, 47], yaw: 0, exit: [-195, 49], exitLabel: 'Volver al observatorio',
  amb: { fog: [0x02030a, 0.0035], bg: 0x02030a, exp: 1.25, hideSky: true },
  enterMsg: 'Estás en el planetario. Los planetas giran alrededor del Sol a su ritmo. Acércate a cada uno y pulsa «Explorar» para sellar tu pasaporte. (Las distancias y los tamaños no están a escala: el sistema solar real es muchísimo más grande y vacío).',
  build(W, Z) {
    const C = [-200, -10]; const s = Z.s;
    const floorT = texTiles('planetario', 0x0a0e1c, 0x141c34, 12, 0.08); floorT.repeat.set(16, 16);
    zoneBase(W, Z, std(0xffffff, { map: floorT, roughness: 0.9, metalness: 0 })); zoneWalls(W, Z, 8, std(0x02030a), false);
    // cielo estrellado propio
    { const n = 2200, pos = new Float32Array(n * 3); const r = mulberry32(35); for (let i = 0; i < n; i++) { const u = r() * 2 - 1, a = r() * TAU, rad = 160; const q = Math.sqrt(1 - u * u); pos[i * 3] = C[0] + Math.cos(a) * q * rad; pos[i * 3 + 1] = Math.abs(u) * rad * 0.8 - 10; pos[i * 3 + 2] = C[1] + Math.sin(a) * q * rad; }
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); W.group.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xdfe8ff, size: 0.7, sizeAttenuation: true }))); }
    // el Sol
    const sun = mesh(new THREE.SphereGeometry(5, 40, 24), new THREE.MeshBasicMaterial({ map: Cosmos.tex('sol'), toneMapped: false }), C[0], 7, C[1], false, false); W.group.add(sun);
    const halo = mesh(new THREE.SphereGeometry(6.4, 32, 18), new THREE.MeshBasicMaterial({ color: 0xffb030, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false }), C[0], 7, C[1], false, false); W.group.add(halo);
    const light = new THREE.PointLight(0xfff0d0, 260, 140, 1.2); light.position.set(C[0], 7, C[1]); W.group.add(light);
    { const l = Cosmos.label('El Sol', 'Explorar'); l.position.set(C[0], 14, C[1]); W.group.add(l); }
    W.colliders.push({ t: 1, x: C[0], z: C[1], r: 3.2, h: 12 });
    // los planetas: radio visual, distancia en el planetario y periodo
    const D = { mercurio: [0.45, 10, 30], venus: [0.8, 14, 50], tierra: [0.85, 18.5, 70], marte: [0.6, 23, 100], jupiter: [2.2, 31, 170], saturno: [1.9, 39, 230], urano: [1.3, 47, 300], neptuno: [1.25, 54, 360], pluton: [0.35, 59, 440] };
    s.pl = [];
    for (const p of PLANETAS) {
      if (p.id === 'sol') continue; const [rad, orb, per] = D[p.id]; const g = new THREE.Group(); W.group.add(g);
      const body = mesh(new THREE.SphereGeometry(rad, 32, 20), std(0xffffff, { map: Cosmos.tex(p.id), roughness: 0.85 }), 0, 0, 0, false, false); g.add(body);
      if (p.id === 'saturno') { const ring = mesh(new THREE.RingGeometry(rad * 1.3, rad * 2.2, 48), new THREE.MeshStandardMaterial({ color: 0xe8d8b0, side: THREE.DoubleSide, transparent: true, opacity: 0.8, roughness: 0.8 }), 0, 0, 0, false, false); ring.rotation.x = -Math.PI / 2 + 0.45; g.add(ring); }
      if (p.id === 'urano') body.rotation.z = 1.7;
      if (p.id === 'tierra') { const moon = mesh(new THREE.SphereGeometry(0.24, 16, 10), std(0xc8c8c8), 1.6, 0.3, 0, false, false); g.add(moon); W.anim.push((t) => { moon.position.set(Math.cos(t * 0.8) * 1.6, 0.3, Math.sin(t * 0.8) * 1.6); }); }
      const lab = Cosmos.label(p.n, 'Explorar'); lab.position.y = rad + 1.1; lab.scale.set(2.4, 0.6, 1); g.add(lab);
      // la órbita dibujada en el suelo y la sombra luminosa bajo el planeta
      const orbit = mesh(new THREE.RingGeometry(orb - 0.04, orb + 0.04, 128), new THREE.MeshBasicMaterial({ color: 0x5a7ad8, transparent: true, opacity: 0.45, side: THREE.DoubleSide, depthWrite: false }), C[0], 0.03, C[1], false, false); orbit.rotation.x = -Math.PI / 2; W.group.add(orbit);
      const mark = mesh(new THREE.RingGeometry(rad + 0.3, rad + 0.6, 32), new THREE.MeshBasicMaterial({ color: 0x9ad0ff, transparent: true, opacity: 0.6, side: THREE.DoubleSide, depthWrite: false, toneMapped: false }), 0, 0.05, 0, false, false); mark.rotation.x = -Math.PI / 2; W.group.add(mark);
      const o = { p, g, body, mark, orb, per, a: (p.id.length * 1.3) % TAU, y: rad + 2.3, x: 0, z: 0 }; s.pl.push(o);
      W.spots.push({ get x() { return o.x; }, get z() { return o.z; }, r: rad + 2.6, verb: 'Explorar', get label() { return p.n + (Cosmos.pass.has(p.id) ? ' · ✓ sellado' : ''); }, on: () => W.zoneIn === Z, act: () => this.visit(p) });
    }
    W.spots.push({ x: C[0], z: C[1] + 4.6, r: 3, verb: 'Explorar', get label() { return 'El Sol' + (Cosmos.pass.has('sol') ? ' · ✓ sellado' : ''); }, on: () => W.zoneIn === Z, act: () => this.visit(PLANETAS[0]) });
    // atlas a mano también aquí
    W.spots.push({ x: -195, z: 44, r: 1.8, verb: 'Abrir', label: 'El atlas del cosmos', on: () => W.zoneIn === Z, act: () => Cosmos.open('planetas') });
    zoneLabel(W, 'El planetario', 'Los tamaños y las distancias no están a escala', -200, 4.2, 44, 1);
    W.anim.push((t) => {
      if (W.zoneIn !== Z) return; sun.rotation.y = t * 0.05; halo.scale.setScalar(1 + Math.sin(t * 1.4) * 0.03);
      for (const o of s.pl) { const a = o.a + (t / o.per) * TAU; o.x = C[0] + Math.cos(a) * o.orb; o.z = C[1] + Math.sin(a) * o.orb; o.g.position.set(o.x, o.y + Math.sin(t + o.orb) * 0.15, o.z); o.mark.position.set(o.x, 0.05, o.z); o.body.rotation.y = t * 0.4; }
    });
  },
  visit(p) {
    const nuevo = Cosmos.stamp(p.id); if (nuevo) { addScore(80); popup('+80<small>sello del pasaporte</small>', 'up'); Audio.pickup && Audio.pickup(); }
    XP.open('🪐 ' + COS_UI.pass + ` · ${Cosmos.pass.size}/${PLANETAS.length}`, p.n, Cosmos.card(p), [['Seguir', null], ['Ver en el atlas', () => Cosmos.open('planetas', p.id)], ...(Cosmos.weight() ? [] : [['Calcular mi peso aquí', () => Cosmos.open('planetas', p.id)]])]);
  },
});
