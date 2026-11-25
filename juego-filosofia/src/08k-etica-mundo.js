// ============================================================================
//  XXXIX · LA PLAZA DE LAS DECISIONES: escenario de la ética.
//  Mañana dorada sobre una plaza de mármol: una gran balanza de la justicia que
//  oscila, las vías del tranvía con su desvío y su palanca, una encrucijada con
//  cuatro letreros (el deber, las consecuencias, la virtud, el cuidado), faroles
//  con corazones, el faro de la responsabilidad al fondo y bancos para pensar.
// ============================================================================
THEMES.push({ // XXXIX · La plaza de las decisiones: mañana dorada y clara
  sky: [0x6aa8e8, 0xf6dca8, 0xffffff], sunDir: [-0.4, 0.55, -0.6], sunCol: 0xfff0d0, sunInt: 2.1, sunDisk: 0xfff6e0,
  hemi: [0xfff4e0, 0x8a7a6a, 0.9], fog: [0xe8dcc8, 0.0042], exposure: 1.05,
  accent: 0xe8b04a, enemy: { col: 0x9aa4b8, core: 0x2a3040, shell: 'octa' }, lampCol: 0xffe2a0,
});
function ethicsFloorTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 512; const x = c.getContext('2d');
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? '#e9e2d4' : '#cfc4b0'; x.fillRect(i * 128, j * 128, 128, 128); }
  x.strokeStyle = 'rgba(120,100,70,0.35)'; x.lineWidth = 3; for (let k = 0; k <= 512; k += 128) { x.beginPath(); x.moveTo(k, 0); x.lineTo(k, 512); x.stroke(); x.beginPath(); x.moveTo(0, k); x.lineTo(512, k); x.stroke(); }
  // vetas del mármol
  const R = mulberry32(39); x.strokeStyle = 'rgba(150,135,110,0.25)'; x.lineWidth = 1.5;
  for (let k = 0; k < 40; k++) { x.beginPath(); let px = R() * 512, py = R() * 512; x.moveTo(px, py); for (let s = 0; s < 6; s++) { px += (R() - 0.5) * 60; py += (R() - 0.3) * 40; x.lineTo(px, py); } x.stroke(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4; return t;
}
// un letrero de madera con texto (para la encrucijada)
function ethicsSign(text, col) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 128; const x = c.getContext('2d');
  x.fillStyle = col; x.fillRect(0, 0, 512, 128); x.strokeStyle = 'rgba(0,0,0,0.35)'; x.lineWidth = 8; x.strokeRect(4, 4, 504, 120);
  x.fillStyle = '#fffaf0'; x.font = '600 58px "Marcellus SC", Georgia, serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text.toUpperCase(), 256, 68);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
ERA_BUILDERS.push(function (W) {
  const floor = ethicsFloorTexture(); floor.repeat.set(10, 16); ground(W, floor, [80, 120], 0.55, false);
  const marble = std(0xf2ece0, { roughness: 0.45 }), gold = std(0xd8a84a, { roughness: 0.3, metalness: 0.75 }), bronze = std(0x8a6a3a, { roughness: 0.5, metalness: 0.6 }), wood = std(0x7a5232, { roughness: 0.8 }), iron = std(0x3a3a40, { roughness: 0.6, metalness: 0.6 });
  // ---------- la gran balanza de la justicia, que oscila sola
  { const g = new THREE.Group(); g.position.set(0, 0, -8);
    g.add(mesh(new THREE.CylinderGeometry(1.6, 2, 0.8, 24), marble, 0, 0.4, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.22, 0.28, 8, 14), gold, 0, 4.8, 0));
    g.add(mesh(new THREE.SphereGeometry(0.45, 16, 12), gold, 0, 9, 0));
    const beam = new THREE.Group(); beam.position.y = 8.6; g.add(beam);
    beam.add(mesh(new THREE.BoxGeometry(7, 0.22, 0.22), gold, 0, 0, 0));
    const pans = [];
    for (const sx of [-1, 1]) { const pan = new THREE.Group(); pan.position.set(sx * 3.4, 0, 0); beam.add(pan);
      for (const a of [0, 2.1, 4.2]) { const ch = mesh(new THREE.CylinderGeometry(0.025, 0.025, 2.6, 4), gold, Math.cos(a) * 0.55, -1.3, Math.sin(a) * 0.55, false, false); ch.rotation.z = Math.cos(a) * 0.2; ch.rotation.x = -Math.sin(a) * 0.2; pan.add(ch); }
      pan.add(mesh(new THREE.CylinderGeometry(1, 0.7, 0.18, 24), gold, 0, -2.65, 0));
      pans.push(pan); }
    // en un platillo, un corazón; en el otro, un libro: el sentimiento y la razón
    pans[0].add(mesh(new THREE.SphereGeometry(0.32, 14, 10), glow(0xff6a7a, 2), -0.18, -2.3, 0, false, false)); pans[0].add(mesh(new THREE.SphereGeometry(0.32, 14, 10), glow(0xff6a7a, 2), 0.18, -2.3, 0, false, false)); pans[0].add(mesh(new THREE.ConeGeometry(0.44, 0.6, 14), glow(0xff6a7a, 2), 0, -2.62, 0, false, false));
    pans[1].add(mesh(new THREE.BoxGeometry(0.9, 0.22, 0.65), std(0x8a2a2a), 0, -2.45, 0));
    W.group.add(g); W.colliders.push({ t: 1, x: 0, z: -8, r: 2.1, h: 1 });
    W.anim.push((t) => { const a = Math.sin(t * 0.5) * 0.14; beam.rotation.z = a; for (const p of pans) p.rotation.z = -a; }); }
  // ---------- las vías del tranvía: una recta que se bifurca, con su palanca y un tranvía que va y viene
  { const z0 = 12, g = new THREE.Group(); g.position.set(0, 0.02, z0);
    const rail = (x1, z1, x2, z2) => { const L = Math.hypot(x2 - x1, z2 - z1), a = Math.atan2(z2 - z1, x2 - x1);
      for (const o of [-0.55, 0.55]) { const m = mesh(new THREE.BoxGeometry(L, 0.1, 0.1), iron, (x1 + x2) / 2 - Math.sin(a) * o, 0.05, (z1 + z2) / 2 + Math.cos(a) * o, false, false); m.rotation.y = -a; g.add(m); }
      for (let s = 0; s <= L; s += 0.9) { const m = mesh(new THREE.BoxGeometry(0.22, 0.06, 1.6), wood, x1 + Math.cos(a) * s, 0.0, z1 + Math.sin(a) * s, false, false); m.rotation.y = -a; g.add(m); } };
    rail(-22, 0, -2, 0); rail(-2, 0, 22, 0); rail(-2, 0, 22, -4.5);
    // la palanca del desvío
    const lev = new THREE.Group(); lev.position.set(-2.4, 0, 1.6); g.add(lev);
    lev.add(mesh(new THREE.BoxGeometry(0.6, 0.3, 0.6), iron, 0, 0.15, 0)); const arm = mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.4, 6), std(0xc23a2a), 0, 0.85, 0); lev.add(arm); lev.add(mesh(new THREE.SphereGeometry(0.12, 10, 8), std(0xc23a2a), 0, 1.55, 0));
    // el tranvía
    const tram = new THREE.Group(); g.add(tram);
    tram.add(mesh(new THREE.BoxGeometry(3.4, 1.7, 1.6), std(0xd8b04a, { roughness: 0.5 }), 0, 1.05, 0)); tram.add(mesh(new THREE.BoxGeometry(3.6, 0.18, 1.8), std(0x8a2a2a), 0, 1.98, 0));
    for (const sx of [-1.1, 0, 1.1]) tram.add(mesh(new THREE.BoxGeometry(0.75, 0.6, 1.62), glow(0xfff2c8, 1.2), sx, 1.25, 0, false, false));
    tram.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.4, 4), iron, 0, 2.7, 0)); tram.add(mesh(new THREE.BoxGeometry(0.06, 0.06, 1.2), iron, 0, 3.4, 0));
    W.group.add(g);
    W.anim.push((t) => { const u = (Math.sin(t * 0.18) + 1) / 2; const x = -19 + u * 15; tram.position.set(x, 0, 0); arm.rotation.z = Math.sin(t * 0.18 + 1) > 0 ? 0.4 : -0.4; }); }
  // ---------- la encrucijada: cuatro letreros de las grandes teorías éticas
  { const g = new THREE.Group(); g.position.set(0, 0, 2.2);
    g.add(mesh(new THREE.CylinderGeometry(0.14, 0.16, 4.4, 10), wood, 0, 2.2, 0));
    const signs = [['El deber', '#3a5a8a', 0], ['Las consecuencias', '#8a5a2a', Math.PI / 2], ['La virtud', '#3a7a4a', Math.PI], ['El cuidado', '#9a3a5a', -Math.PI / 2]];
    signs.forEach(([txt, col, a], k) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.6), new THREE.MeshStandardMaterial({ map: ethicsSign(txt, col), side: THREE.DoubleSide, roughness: 0.7 }));
      m.position.set(Math.cos(a) * 1.25, 3.7 - k * 0.55, Math.sin(a) * 1.25); m.rotation.y = -a; g.add(m); });
    W.group.add(g); W.colliders.push({ t: 1, x: 0, z: 2.2, r: 0.4, h: 4 }); }
  // ---------- faroles con un corazón de luz a lo largo de la avenida (la ética del cuidado)
  for (let z = 30; z >= -40; z -= 10) for (const sx of [-1, 1]) { const x = sx * 4.6; if (W._near(x, z, 1.2)) continue;
    const g = new THREE.Group(); g.position.set(x, 0, z);
    g.add(mesh(new THREE.CylinderGeometry(0.08, 0.12, 3.6, 8), iron, 0, 1.8, 0));
    const h = new THREE.Group(); h.position.y = 3.9; g.add(h);
    h.add(mesh(new THREE.SphereGeometry(0.2, 12, 10), glow(0xff8a9a, 2.2), -0.14, 0.1, 0, false, false)); h.add(mesh(new THREE.SphereGeometry(0.2, 12, 10), glow(0xff8a9a, 2.2), 0.14, 0.1, 0, false, false)); h.add(mesh(new THREE.ConeGeometry(0.27, 0.38, 12), glow(0xff8a9a, 2.2), 0, -0.14, 0, false, false));
    h.children[2].rotation.z = Math.PI; W.group.add(g); W.colliders.push({ t: 1, x, z, r: 0.25, h: 4 });
    W.anim.push((t) => { const p = 1 + Math.sin(t * 2 + z) * 0.08; h.scale.setScalar(p); }); }
  // ---------- columnas y bancos para pensar a los lados
  for (let z = 26; z >= -38; z -= 16) for (const sx of [-1, 1]) { const x = sx * 21; if (W._near(x, z, 2)) continue;
    const g = new THREE.Group(); g.position.set(x, 0, z);
    g.add(mesh(new THREE.CylinderGeometry(0.55, 0.6, 7, 16), marble, 0, 3.5, 0)); g.add(mesh(new THREE.BoxGeometry(1.6, 0.4, 1.6), marble, 0, 7.2, 0));
    W.group.add(g); W.colliders.push({ t: 1, x, z, r: 0.7, h: 7 });
    const bx = x - sx * 2.4; if (!W._near(bx, z + 3, 1.2)) { const b = new THREE.Group(); b.position.set(bx, 0, z + 3); b.rotation.y = sx > 0 ? Math.PI / 2 : -Math.PI / 2;
      b.add(mesh(new THREE.BoxGeometry(2.2, 0.12, 0.6), wood, 0, 0.55, 0)); b.add(mesh(new THREE.BoxGeometry(2.2, 0.5, 0.1), wood, 0, 0.9, -0.28));
      for (const lx of [-0.9, 0.9]) b.add(mesh(new THREE.BoxGeometry(0.1, 0.55, 0.5), iron, lx, 0.27, 0)); W.group.add(b); } }
  // ---------- el faro de la responsabilidad (Hans Jonas): su luz mira hacia el futuro
  { const g = new THREE.Group(); g.position.set(0, 0, -44);
    g.add(mesh(new THREE.CylinderGeometry(1.4, 2, 12, 18), std(0xf4f0e8, { roughness: 0.5 }), 0, 6, 0));
    for (let k = 0; k < 4; k++) g.add(mesh(new THREE.CylinderGeometry(1.42 - k * 0.15, 1.5 - k * 0.15, 0.7, 18), std(0xb83a2a), 0, 2 + k * 2.6, 0));
    g.add(mesh(new THREE.CylinderGeometry(1.1, 1.1, 1.6, 12), glow(0xfff2c0, 1.5), 0, 12.8, 0, false, false)); g.add(mesh(new THREE.ConeGeometry(1.4, 1.4, 12), std(0x3a3a40), 0, 14.3, 0));
    const beam = mesh(new THREE.ConeGeometry(2.2, 18, 16, 1, true), new THREE.MeshBasicMaterial({ color: 0xfff2c0, transparent: true, opacity: 0.12, depthWrite: false, side: THREE.DoubleSide }), 0, 12.8, 0, false, false);
    beam.geometry.translate(0, -9, 0); beam.rotation.z = Math.PI / 2; const piv = new THREE.Group(); piv.position.y = 12.8; beam.position.set(0, 0, 0); piv.add(beam); g.add(piv);
    W.group.add(g); W.colliders.push({ t: 1, x: 0, z: -44, r: 2, h: 12 });
    W.anim.push((t) => { piv.rotation.y = t * 0.5; }); }
  // ---------- hojas de árboles: olivos (la sabiduría práctica) junto a los muros
  const R = mulberry32(7);
  for (let i = 0; i < 14; i++) { const sx = R() < 0.5 ? -1 : 1, x = sx * (13 + R() * 6), z = -40 + R() * 72; if (W._near(x, z, 1.8)) continue;
    const g = new THREE.Group(); g.position.set(x, 0, z); g.add(mesh(new THREE.CylinderGeometry(0.18, 0.28, 2.2, 8), std(0x6a4a2a), 0, 1.1, 0));
    for (let k = 0; k < 4; k++) g.add(mesh(new THREE.IcosahedronGeometry(0.9 + R() * 0.4, 0), std(0x8a9a5a, { roughness: 0.9, flatShading: true }), (R() - 0.5) * 1.2, 2.6 + R() * 0.8, (R() - 0.5) * 1.2));
    W.group.add(g); W.colliders.push({ t: 1, x, z, r: 0.5, h: 3 }); }
});
