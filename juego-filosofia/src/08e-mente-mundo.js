// ============================================================================
//  XXXVIII · EL LABERINTO DE LA MENTE: escenario psicodélico.
//  Cielo violeta y magenta, suelo caleidoscópico, un gran cerebro de luz que
//  late sobre la plaza, espirales de colores, ojos flotantes que te miran,
//  hongos luminosos, mándalas que giran, escaleras imposibles y setos de neón.
//  Los colores cambian despacio, como en un sueño.
// ============================================================================
THEMES.push({ // XXXVIII · El laberinto de la mente: crepúsculo psicodélico
  sky: [0x1a0638, 0xd04aa8, 0x2ad8c8], sunDir: [0.2, 0.35, -0.8], sunCol: 0xffb8f0, sunInt: 1.6, sunDisk: 0xffe0ff,
  hemi: [0xffb0f0, 0x2a1a5a, 0.95], fog: [0x6a2a8a, 0.0058], exposure: 1.18, stars: true,
  accent: 0xff6ad8, enemy: { col: 0xc890ff, core: 0x1a0638, shell: 'octa' }, lampCol: 0xffc0ff,
});
// textura del suelo: un caleidoscopio de anillos y pétalos de colores
function mindFloorTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 512; const x = c.getContext('2d');
  x.fillStyle = '#1a0a30'; x.fillRect(0, 0, 512, 512);
  const cx = 256, cy = 256;
  for (let r = 250; r > 10; r -= 18) { const h = (r * 1.7) % 360; x.strokeStyle = `hsla(${h},90%,62%,0.55)`; x.lineWidth = 7; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke(); }
  for (let k = 0; k < 16; k++) { const a = (k / 16) * Math.PI * 2; x.save(); x.translate(cx, cy); x.rotate(a); x.fillStyle = `hsla(${(k * 22.5 + 200) % 360},95%,60%,0.35)`; x.beginPath(); x.ellipse(0, 130, 34, 120, 0, 0, Math.PI * 2); x.fill(); x.restore(); }
  for (const [px, py] of [[0, 0], [512, 0], [0, 512], [512, 512]]) { x.fillStyle = 'rgba(255,220,255,0.25)'; x.beginPath(); x.arc(px, py, 60, 0, Math.PI * 2); x.fill(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4; return t;
}
ERA_BUILDERS.push(function (W) {
  const floor = mindFloorTexture(); floor.repeat.set(7, 11); ground(W, floor, [80, 120], 0.6, false);
  const r = mulberry32(381);
  const hueMats = []; // materiales que cambian de color con el tiempo
  const neon = (h, k = 2.2) => { const m = glow(new THREE.Color().setHSL(h, 1, 0.6).getHex(), k); hueMats.push([m, h, k]); return m; };
  // ---------- el gran cerebro de luz que late sobre la plaza
  { const g = new THREE.Group(); g.position.set(0, 13, -6);
    const lobe = (sx) => { for (let i = 0; i < 46; i++) { const a = r() * Math.PI * 2, b = (r() - 0.3) * Math.PI * 0.9, R = 3.2 + r() * 0.7;
      const s = mesh(new THREE.SphereGeometry(0.7 + r() * 0.6, 12, 10), neon(0.83 + r() * 0.12, 1.4), sx * 1.9 + Math.cos(a) * Math.cos(b) * R * 0.65, Math.sin(b) * R * 0.7, Math.sin(a) * Math.cos(b) * R, false, false); g.add(s); } };
    lobe(-1); lobe(1);
    // sinapsis: chispas que viajan entre los dos hemisferios
    const sparks = []; for (let i = 0; i < 18; i++) { const s = mesh(new THREE.SphereGeometry(0.12, 8, 6), glow(0xffffff, 4), 0, 0, 0, false, false); g.add(s); sparks.push([s, r() * 6, 1 + r() * 2]); }
    W.group.add(g);
    W.anim.push((t) => { const p = 1 + Math.sin(t * 1.6) * 0.04; g.scale.set(p, p, p); g.rotation.y = Math.sin(t * 0.15) * 0.4;
      for (const [s, o, sp] of sparks) { const u = ((t * sp * 0.3 + o) % 2) - 1; s.position.set(u * 4, Math.sin(o * 3 + t) * 2, Math.cos(o * 5 + t * 0.7) * 2.6); } }); }
  // ---------- mándalas que giran en el suelo
  for (const [x, z, R] of [[0, 18, 4.2], [0, -18, 3.6], [0, 4, 2.6]]) { if (W._near(x, z, 1)) continue;
    const g = new THREE.Group(); g.position.set(x, 0.03, z);
    for (let k = 0; k < 4; k++) { const ring = mesh(new THREE.RingGeometry(R - k * 0.9 - 0.25, R - k * 0.9, 48, 1), neon((k * 0.21) % 1, 1.8), 0, 0.01 * k, 0, false, false); ring.rotation.x = -Math.PI / 2; g.add(ring); }
    for (let k = 0; k < 12; k++) { const a = (k / 12) * Math.PI * 2; const p = mesh(new THREE.CircleGeometry(0.28, 12), neon((k / 12 + 0.5) % 1, 2), Math.cos(a) * (R - 0.5), 0.05, Math.sin(a) * (R - 0.5), false, false); p.rotation.x = -Math.PI / 2; g.add(p); }
    W.group.add(g); W.anim.push((t) => { g.rotation.y = t * 0.2 * (x === 0 && z > 0 ? 1 : -1); }); }
  // ---------- espirales de colores (hélices de luz) a los lados de la avenida
  const helix = (x, z, h) => { if (W._near(x, z, 1.2)) return; const pts = []; for (let i = 0; i <= 80; i++) { const t = i / 80; pts.push(new THREE.Vector3(Math.cos(t * 14) * 0.7, t * h, Math.sin(t * 14) * 0.7)); }
    const g = new THREE.Group(); g.position.set(x, 0, z);
    g.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 160, 0.12, 6), neon(r(), 2), 0, 0, 0, false, false));
    g.add(mesh(new THREE.SphereGeometry(0.45, 14, 10), glow(0xffffff, 3), 0, h + 0.4, 0, false, false));
    W.group.add(g); W.anim.push((t) => { g.rotation.y = t * 0.8; }); W.colliders.push({ t: 1, x, z, r: 0.8, h }); };
  for (const [x, z, h] of [[-6, 26, 6], [6, 22, 7], [-6, 6, 5], [6, -10, 6], [-6, -24, 7], [6, -30, 5.5]]) helix(x, z, h);
  // ---------- ojos flotantes que te siguen con la mirada
  const eyes = [];
  for (let i = 0; i < 9; i++) { const x = (r() < 0.5 ? -1 : 1) * (8 + r() * 12), z = -40 + r() * 70, y = 4 + r() * 5; const s = 0.6 + r() * 0.7;
    const g = new THREE.Group(); g.position.set(x, y, z); g.scale.setScalar(s);
    g.add(mesh(new THREE.SphereGeometry(1, 20, 14), std(0xfaf6ff, { roughness: 0.35, emissive: 0x6a5a8a, emissiveIntensity: 0.4 }), 0, 0, 0, false, false));
    const iris = mesh(new THREE.CircleGeometry(0.48, 24), neon(r(), 1.6), 0, 0, 0.99, false, false); g.add(iris);
    g.add(mesh(new THREE.CircleGeometry(0.22, 18), std(0x05030a), 0, 0, 1.0, false, false));
    g.add(mesh(new THREE.CircleGeometry(0.07, 10), glow(0xffffff, 3), 0.1, 0.12, 1.01, false, false));
    W.group.add(g); eyes.push([g, y, r() * 6]); }
  W.anim.push((t) => { const p = typeof player !== 'undefined' && player ? player.pos : null; for (const [g, y, o] of eyes) { g.position.y = y + Math.sin(t * 0.9 + o) * 0.5; if (p) g.lookAt(p.x, p.y + 1.6, p.z); const bl = Math.max(0, Math.sin(t * 0.7 + o * 3) - 0.97) * 30; g.scale.y = g.scale.x * (1 - Math.min(0.9, bl)); } });
  // ---------- hongos luminosos (como en un cuento) en los bordes
  for (let i = 0; i < 26; i++) { const x = (r() < 0.5 ? -1 : 1) * (17 + r() * 5), z = -42 + r() * 74; if (W._near(x, z, 0.8)) continue; const s = 0.6 + r() * 1.3;
    const g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(s);
    g.add(mesh(new THREE.CylinderGeometry(0.16, 0.24, 1.1, 10), std(0xf4e8ff, { emissive: 0x6a3a8a, emissiveIntensity: 0.5 }), 0, 0.55, 0, false, false));
    const cap = mesh(new THREE.SphereGeometry(0.75, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), neon(r(), 1.2), 0, 1.05, 0, false, false); cap.scale.y = 0.6; g.add(cap);
    for (let k = 0; k < 5; k++) { const a = r() * Math.PI * 2, b = 0.3 + r() * 0.9; g.add(mesh(new THREE.SphereGeometry(0.09, 8, 6), glow(0xffffff, 2.5), Math.cos(a) * Math.sin(b) * 0.72, 1.05 + Math.cos(b) * 0.42, Math.sin(a) * Math.sin(b) * 0.72, false, false)); }
    W.group.add(g); W.colliders.push({ t: 1, x, z, r: 0.5 * s, h: 1.5 * s }); }
  // ---------- setos de neón del laberinto, al fondo de cada lado
  for (const sx of [-1, 1]) for (let k = 0; k < 7; k++) { const z = -44 + k * 12, x = sx * 22.5; const w = 6 + r() * 4;
    const hedge = mesh(new THREE.BoxGeometry(1, 2.2, w), std(0x2a0a4a, { roughness: 0.8, emissive: 0x3a0a5a, emissiveIntensity: 0.3 }), x, 1.1, z, true, true); W.group.add(hedge);
    const edge = mesh(new THREE.BoxGeometry(1.05, 0.08, w + 0.02), neon((k * 0.13 + (sx > 0 ? 0.5 : 0)) % 1, 2.6), x, 2.24, z, false, false); W.group.add(edge); }
  // ---------- escaleras imposibles y figuras geométricas flotando en el cielo
  { const g = new THREE.Group(); g.position.set(0, 9, -58);
    for (let i = 0; i < 24; i++) { const a = (i / 24) * Math.PI * 2; const st = mesh(new THREE.BoxGeometry(3, 0.6, 2), neon(i / 24, 1.2), Math.cos(a) * 10, (i % 12) * 0.8 - 4, Math.sin(a) * 4, false, false); st.rotation.y = -a; g.add(st); }
    W.group.add(g); W.anim.push((t) => { g.rotation.y = t * 0.05; }); }
  const shapes = [];
  for (let i = 0; i < 14; i++) { const geo = [new THREE.IcosahedronGeometry(1.2, 0), new THREE.TorusKnotGeometry(0.9, 0.25, 64, 8), new THREE.OctahedronGeometry(1.3, 0), new THREE.TorusGeometry(1.1, 0.25, 8, 24)][i % 4];
    const m = mesh(geo, neon(r(), 1.4), (r() - 0.5) * 60, 14 + r() * 16, -50 + r() * 90, false, false); W.group.add(m); shapes.push([m, r() * 3]); }
  // un gran anillo de colores que gira en el horizonte
  { const ring = mesh(new THREE.TorusGeometry(42, 1.6, 12, 96), neon(0.9, 1.5), 0, 22, -120, false, false); W.group.add(ring); W.anim.push((t) => { ring.rotation.z = t * 0.05; ring.rotation.x = Math.sin(t * 0.1) * 0.2; }); }
  W.anim.push((t) => {
    for (const [m, o] of shapes) { m.rotation.x = t * 0.3 + o; m.rotation.y = t * 0.4 + o; m.position.y += Math.sin(t + o) * 0.004; }
    // los colores fluyen despacio
    const c = new THREE.Color();
    for (const [m, h, k] of hueMats) { c.setHSL((h + t * 0.03) % 1, 1, 0.6); if (m.emissive) m.emissive.copy(c).multiplyScalar(k * 0.5); if (m.color) m.color.copy(c); }
  });
});
