// ============================================================================
//  TEMAS VISUALES POR ETAPA
// ============================================================================
const THEMES = [
  { // I · Presocráticos: ruinas jonias al atardecer
    sky: [0x284a80, 0xf4a862, 0x5a4030], sunDir: [-0.55, 0.22, -0.6], sunCol: 0xffc488, sunInt: 2.6, sunDisk: 0xffb070,
    hemi: [0xffd9b0, 0x6b4a30, 0.55], fog: [0xe6a470, 0.0105], exposure: 1.15, stars: false,
    accent: 0xffb347, enemy: { col: 0xff5a2a, core: 0x2a0d06, shell: 'octa' }, lampCol: 0xffc070,
  },
  { // II · Atenas: mediodía luminoso
    sky: [0x2f6fc4, 0xcfe4f4, 0x8a8478], sunDir: [0.45, 0.75, 0.35], sunCol: 0xfff4e0, sunInt: 2.3, sunDisk: 0xfff2d0,
    hemi: [0xcfe4ff, 0x9a8f7a, 0.75], fog: [0xc8dcef, 0.008], exposure: 1.0, stars: false,
    accent: 0x7fb2ff, enemy: { col: 0xb05cff, core: 0x1a0830, shell: 'icosa' }, lampCol: 0xffd9a0,
  },
  { // III · Helenismo y Roma: crepúsculo púrpura
    sky: [0x1f1a46, 0xe07a5c, 0x3a2420], sunDir: [0.7, 0.12, -0.5], sunCol: 0xff9a6a, sunInt: 2.2, sunDisk: 0xff8a5a,
    hemi: [0xb39ad8, 0x4a2a20, 0.55], fog: [0x9a5a6a, 0.012], exposure: 1.2, stars: true,
    accent: 0xff6a6a, enemy: { col: 0xff2a4a, core: 0x2a0410, shell: 'torus' }, lampCol: 0xffb080,
  },
  { // IV · Edad Media: catedral nocturna
    sky: [0x05060c, 0x141a30, 0x050508], sunDir: [-0.5, 0.6, 0.3], sunCol: 0x9fb4ff, sunInt: 1.1, sunDisk: 0x000000,
    hemi: [0x5a6aa0, 0x1a1410, 0.35], fog: [0x0e1020, 0.02], exposure: 1.35, stars: true, indoor: true,
    accent: 0xffcf6a, enemy: { col: 0xd4a017, core: 0x14100a, shell: 'cross' }, lampCol: 0xffb060,
  },
  { // V · Renacimiento: mañana toscana
    sky: [0x4f8fd6, 0xf6dcb2, 0x9a8a70], sunDir: [-0.5, 0.55, 0.45], sunCol: 0xffe8c8, sunInt: 2.4, sunDisk: 0xfff0d8,
    hemi: [0xd8e6ff, 0xa08a6a, 0.7], fog: [0xe8d6bc, 0.0085], exposure: 1.05, stars: false,
    accent: 0x5fd18a, enemy: { col: 0x3fe08a, core: 0x0a2014, shell: 'cube' }, lampCol: 0xffd9a0,
  },
  { // VI · Modernidad: biblioteca-observatorio bajo las estrellas
    sky: [0x03051a, 0x1a2350, 0x05050a], sunDir: [0.3, 0.7, -0.4], sunCol: 0x8fa8ff, sunInt: 0.9, sunDisk: 0x000000,
    hemi: [0x7a86c0, 0x5a3a20, 0.95], fog: [0x0c1230, 0.012], exposure: 1.45, stars: true, moon: true,
    accent: 0x9ab8ff, enemy: { col: 0x8a5cff, core: 0x05030f, shell: 'eye' }, lampCol: 0xffc070,
  },
];

const ARENA = { x0: -24, x1: 24, z0: -47, z1: 37 };

// ============================================================================
//  CIELO
// ============================================================================
function makeSky(th) {
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: {
      top: { value: new THREE.Color(th.sky[0]) }, hor: { value: new THREE.Color(th.sky[1]) }, bot: { value: new THREE.Color(th.sky[2]) },
      sunDir: { value: new THREE.Vector3(...th.sunDir).normalize() }, sunCol: { value: new THREE.Color(th.sunDisk) },
    },
    vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); vec4 p = projectionMatrix * modelViewMatrix * vec4(position,1.0); gl_Position = p.xyww; }`,
    fragmentShader: `uniform vec3 top,hor,bot,sunCol,sunDir; varying vec3 vDir;
      void main(){ vec3 d = normalize(vDir); float h = d.y;
        vec3 c = h > 0.0 ? mix(hor, top, pow(clamp(h,0.0,1.0), 0.5)) : mix(hor, bot, pow(clamp(-h,0.0,1.0), 0.35));
        float s = max(dot(d, sunDir), 0.0);
        c += sunCol * (pow(s, 900.0) * 6.0 + pow(s, 10.0) * 0.35);
        gl_FragColor = vec4(c, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const m = new THREE.Mesh(new THREE.SphereGeometry(450, 32, 16), mat); m.frustumCulled = false; m.renderOrder = -10;
  return m;
}
function makeStars(count = 1600, seed = 9) {
  const r = mulberry32(seed); const pos = new Float32Array(count * 3); const col = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = r() * 2 - 1, th = r() * TAU, y = Math.abs(u) * 0.95 + 0.05; const rr = Math.sqrt(1 - y * y);
    pos.set([Math.cos(th) * rr * 420, y * 420, Math.sin(th) * rr * 420], i * 3);
    const b = 0.6 + r() * 1.8; const tint = r();
    col.set([b * (tint > 0.8 ? 1 : 0.85), b * 0.9, b * (tint < 0.3 ? 1.25 : 1)], i * 3);
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const m = new THREE.PointsMaterial({ size: 1.6, sizeAttenuation: false, vertexColors: true, fog: false, toneMapped: false, transparent: true, depthWrite: false });
  const p = new THREE.Points(g, m); p.frustumCulled = false; return p;
}

// ============================================================================
//  PIEZAS ARQUITECTÓNICAS
// ============================================================================
function flutedCylinder(rt, rb, h, flutes = 20, depth = 0.05) {
  const g = new THREE.CylinderGeometry(rt, rb, h, flutes * 2, 1, false);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), z = p.getZ(i); const r = Math.hypot(x, z); if (r < 1e-4) continue;
    const a = Math.atan2(z, x); const k = 1 - depth * (0.5 + 0.5 * Math.cos(a * flutes));
    p.setX(i, x * k); p.setZ(i, z * k);
  }
  g.computeVertexNormals(); return g;
}
function column(style, h, mat, cap) {
  cap = cap || mat; const g = new THREE.Group(); const r = 0.55;
  if (style === 'doric') {
    g.add(mesh(flutedCylinder(r * 0.8, r, h - 0.5, 20, 0.06), mat, 0, (h - 0.5) / 2, 0));
    g.add(mesh(new THREE.CylinderGeometry(r * 1.25, r * 0.82, 0.3, 24), cap, 0, h - 0.35, 0));
    g.add(mesh(new THREE.BoxGeometry(r * 2.7, 0.22, r * 2.7), cap, 0, h - 0.11, 0));
  } else if (style === 'ionic') {
    g.add(mesh(new THREE.CylinderGeometry(r * 1.2, r * 1.3, 0.3, 24), cap, 0, 0.15, 0));
    put(g, mesh(new THREE.TorusGeometry(r * 1.05, 0.1, 8, 24), cap, 0, 0.36, 0)).rotation.x = Math.PI / 2;
    g.add(mesh(flutedCylinder(r * 0.78, r * 0.85, h - 0.95, 24, 0.05), mat, 0, 0.4 + (h - 0.95) / 2, 0));
    const vol = mesh(new THREE.CylinderGeometry(0.2, 0.2, r * 2.8, 16), cap, 0, h - 0.4, 0); vol.rotation.z = Math.PI / 2; g.add(vol);
    g.add(mesh(new THREE.BoxGeometry(r * 2.4, 0.14, r * 1.6), cap, 0, h - 0.07, 0));
  } else if (style === 'corinthian') {
    g.add(mesh(new THREE.CylinderGeometry(r * 1.25, r * 1.35, 0.35, 24), cap, 0, 0.17, 0));
    g.add(mesh(flutedCylinder(r * 0.75, r * 0.82, h - 1.35, 24, 0.05), mat, 0, 0.35 + (h - 1.35) / 2, 0));
    g.add(mesh(new THREE.CylinderGeometry(r * 1.2, r * 0.76, 0.85, 16), cap, 0, h - 0.6, 0));
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * TAU; const leaf = mesh(new THREE.ConeGeometry(0.14, 0.6, 5), cap, Math.cos(a) * r * 0.95, h - 0.75, Math.sin(a) * r * 0.95);
      leaf.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5); g.add(leaf);
    }
    g.add(mesh(new THREE.BoxGeometry(r * 2.6, 0.16, r * 2.6), cap, 0, h - 0.08, 0));
  } else if (style === 'gothic') {
    g.add(mesh(new THREE.CylinderGeometry(0.95, 1.05, 0.6, 8), cap, 0, 0.3, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.5, 0.5, h - 1, 16), mat, 0, 0.5 + (h - 1) / 2, 0));
    for (let i = 0; i < 4; i++) { const a = (i / 4) * TAU + Math.PI / 4; g.add(mesh(new THREE.CylinderGeometry(0.2, 0.2, h - 1, 10), mat, Math.cos(a) * 0.52, 0.5 + (h - 1) / 2, Math.sin(a) * 0.52)); }
    g.add(mesh(new THREE.CylinderGeometry(0.95, 0.75, 0.5, 8), cap, 0, h - 0.25, 0));
  } else if (style === 'tuscan') {
    g.add(mesh(new THREE.BoxGeometry(0.9, 0.3, 0.9), cap, 0, 0.15, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.3, 0.36, h - 0.6, 18), mat, 0, 0.3 + (h - 0.6) / 2, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.46, 0.32, 0.18, 18), cap, 0, h - 0.21, 0));
    g.add(mesh(new THREE.BoxGeometry(0.95, 0.12, 0.95), cap, 0, h - 0.06, 0));
  }
  return g;
}
// Arcada en el plano local X (luego se rota). Devuelve grupo.
function arcade(len, n, h, mat, trim, opts = {}) {
  const g = new THREE.Group(); const span = len / n;
  for (let i = 0; i <= n; i++) {
    const x = -len / 2 + i * span;
    if (opts.columns) { const c = column(opts.columns, h, mat, trim); c.position.x = x; g.add(c); }
    else g.add(mesh(new THREE.BoxGeometry(1.1, h, 1.1), mat, x, h / 2, 0));
  }
  for (let i = 0; i < n; i++) {
    const xc = -len / 2 + (i + 0.5) * span; const R = span / 2 - (opts.columns ? 0.15 : 0.55);
    if (opts.pointed) {
      const s = R * 2;
      const a1 = mesh(new THREE.TorusGeometry(s, 0.22, 6, 16, Math.PI / 3), trim, xc - R, h, 0); g.add(a1);
      const a2 = mesh(new THREE.TorusGeometry(s, 0.22, 6, 16, Math.PI / 3), trim, xc + R, h, 0); a2.rotation.z = (2 * Math.PI) / 3; g.add(a2);
    } else {
      g.add(mesh(new THREE.TorusGeometry(R, 0.22, 8, 20, Math.PI), trim, xc, h, 0));
      if (opts.roundels) put(g, mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.12, 20), std(0x2a5aa8, { roughness: 0.3 }), xc + span / 2, h + R * 0.75, 0.25)).rotation.x = Math.PI / 2;
    }
  }
  const topH = opts.pointed ? (span / 2) * 1.75 : span / 2 + 0.3;
  g.add(mesh(new THREE.BoxGeometry(len + 1.2, opts.attic ?? 1.0, 1.2), trim, 0, h + topH + (opts.attic ?? 1.0) / 2, 0));
  return g;
}
function pediment(w, h, d, mat) {
  const s = new THREE.Shape(); s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(0, h); s.lineTo(-w / 2, 0);
  const geo = new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: false }); geo.translate(0, 0, -d / 2);
  return mesh(geo, mat);
}
function steps(w, d, n, stepH, mat) {
  const g = new THREE.Group();
  for (let i = 0; i < n; i++) g.add(mesh(new THREE.BoxGeometry(w - i * 1.2, stepH, d - i * 1.2), mat, 0, stepH * (i + 0.5), 0));
  return g;
}
function templeFacade(nCols, colStyle, mat, trim, colH = 9) {
  const g = new THREE.Group(); const w = nCols * 2.6 + 2;
  g.add(steps(w + 2, 12, 3, 0.45, trim));
  const base = 1.35;
  for (let i = 0; i < nCols; i++) { const c = column(colStyle, colH, mat, trim); c.position.set(-((nCols - 1) * 2.6) / 2 + i * 2.6, base, 2.5); g.add(c); }
  for (let i = 0; i < nCols; i++) { if (i % (nCols - 1) !== 0) continue; const c = column(colStyle, colH, mat, trim); c.position.set(-((nCols - 1) * 2.6) / 2 + i * 2.6, base, -2.5); g.add(c); }
  g.add(mesh(new THREE.BoxGeometry(w - 2, colH - 0.5, 4.2), std(0x8a7a64, { roughness: 0.9 }), 0, base + (colH - 0.5) / 2, -1.2));
  g.add(mesh(new THREE.BoxGeometry(w, 0.9, 7), trim, 0, base + colH + 0.45, 0));
  // triglifos
  for (let i = 0; i < nCols * 2; i++) g.add(mesh(new THREE.BoxGeometry(0.45, 0.7, 0.1), std(0x5a6a8a, { roughness: 0.6 }), -w / 2 + 0.8 + i * ((w - 1.6) / (nCols * 2 - 1)), base + colH + 1.3, 3.55));
  g.add(mesh(new THREE.BoxGeometry(w, 0.9, 7), trim, 0, base + colH + 1.35, 0));
  const ped = pediment(w + 0.4, 2.6, 7.2, trim); ped.position.set(0, base + colH + 1.8, 0); g.add(ped);
  return g;
}
function cypress(h = 6) {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(0.12, 0.18, 1, 6), std(0x4a3424), 0, 0.5, 0));
  const c = mesh(new THREE.ConeGeometry(0.85, h, 9, 3), std(0x1f3a24, { roughness: 0.95, flat: true }), 0, h / 2 + 0.6, 0); c.scale.set(1, 1, 1); g.add(c);
  return g;
}
function oliveTree(r) {
  const g = new THREE.Group(); const trunk = std(0x5a4636, { roughness: 1 });
  const t = mesh(new THREE.CylinderGeometry(0.18, 0.32, 2.2, 7), trunk, 0, 1.1, 0); t.rotation.z = (r() - 0.5) * 0.4; g.add(t);
  const leaf = std(0x6b7a52, { roughness: 1, flat: true });
  for (let i = 0; i < 5; i++) { const s = mesh(new THREE.IcosahedronGeometry(0.9 + r() * 0.5, 0), leaf, (r() - 0.5) * 1.8, 2.4 + r() * 0.8, (r() - 0.5) * 1.8); g.add(s); }
  return g;
}
function brazier(world, x, z, col, withLight = true) {
  const g = new THREE.Group(); g.position.set(x, 0, z);
  const metal = std(0x3a2a1a, { metalness: 0.6, roughness: 0.4 });
  g.add(mesh(new THREE.CylinderGeometry(0.12, 0.3, 1.2, 8), metal, 0, 0.6, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.6, 0.25, 0.4, 12, 1, true), metal, 0, 1.35, 0));
  const fl = mesh(new THREE.ConeGeometry(0.35, 0.9, 8), glow(col, 4, { transparent: true, opacity: 0.85, additive: true }), 0, 1.85, 0, false, false); g.add(fl);
  world.group.add(g); world.colliders.push({ t: 1, x, z, r: 0.5, h: 2 });
  world.emitters.push({ x, y: 1.7, z, col, rate: 14, acc: 0, kind: 'flame' });
  let light = null;
  if (withLight && world.lightBudget > 0) { light = new THREE.PointLight(col, 18, 14, 2); light.position.set(x, 2.2, z); world.group.add(light); world.lightBudget--; }
  world.anim.push((t) => { fl.scale.set(1 + Math.sin(t * 13 + x) * 0.12, 1 + Math.sin(t * 9 + z) * 0.2, 1); if (light) light.intensity = 16 + Math.sin(t * 17 + x) * 3 + Math.sin(t * 7.3) * 2; });
  return g;
}
function statue(mat, r) {
  const g = new THREE.Group();
  g.add(mesh(new THREE.BoxGeometry(1.3, 1.6, 1.3), std(0x8a8070, { roughness: 0.9 }), 0, 0.8, 0));
  const body = mesh(new THREE.CylinderGeometry(0.28, 0.45, 1.7, 10), mat, 0, 2.45, 0); g.add(body);
  g.add(mesh(new THREE.SphereGeometry(0.24, 14, 10), mat, 0, 3.5, 0));
  const arm = mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.9, 6), mat, 0.38, 3.0, 0.1); arm.rotation.z = -0.7 - r() * 0.6; g.add(arm);
  return g;
}

// ============================================================================
//  CONSTRUCCIÓN DE CADA ETAPA
// ============================================================================
function newWorld(idx) {
  return {
    idx, theme: THEMES[idx], group: new THREE.Group(), colliders: [], anim: [], emitters: [], lightBudget: 7,
    stations: [], bossPos: new THREE.Vector3(0, 0, -30), portalPos: new THREE.Vector3(0, 0, -41), start: new THREE.Vector3(0, 0, 31),
    spawns: [],
  };
}
// El camino: los pensadores esperan uno tras otro sobre la vía central, en orden cronológico
function stationPositions(n) {
  // los pensadores esperan repartidos por la plaza, cada uno junto a su escenario
  if (n === 3) return [[-12, 16], [12, 2], [-12, -12]];
  return [[-12, 20], [12, 8], [-12, -4], [12, -16]];
}
function addBounds(W) {
  const { x0, x1, z0, z1 } = ARENA, T = 4;
  W.colliders.push({ t: 0, x0: x0 - T, x1: x0, z0: z0 - T, z1: z1 + T, h: 99 });
  W.colliders.push({ t: 0, x0: x1, x1: x1 + T, z0: z0 - T, z1: z1 + T, h: 99 });
  W.colliders.push({ t: 0, x0: x0 - T, x1: x1 + T, z0: z0 - T, z1: z0, h: 99 });
  W.colliders.push({ t: 0, x0: x0 - T, x1: x1 + T, z0: z1, z1: z1 + T, h: 99 });
}
function addBox(W, geoW, geoH, geoD, mat, x, y, z, collide = true) {
  const m = mesh(new THREE.BoxGeometry(geoW, geoH, geoD), mat, x, y, z); W.group.add(m);
  if (collide) W.colliders.push({ t: 0, x0: x - geoW / 2, x1: x + geoW / 2, z0: z - geoD / 2, z1: z + geoD / 2, h: y + geoH / 2 });
  return m;
}
function ground(W, map, size = [70, 110], rough = 0.9, bump = true) {
  // la plaza termina en su entrada sur: más allá está el camino sobre el vacío
  const zmin = -5 - size[1] / 2, zmax = Math.min(-5 + size[1] / 2, 37.6);
  const geo = new THREE.PlaneGeometry(size[0], zmax - zmin); geo.rotateX(-Math.PI / 2);
  const m = mesh(geo, std(0xffffff, { map, roughness: rough, bump: bump ? map : undefined, bumpScale: 1.2 }), 0, 0, (zmin + zmax) / 2, false, true);
  W.group.add(m); return m;
}
function columnRows(W, style, h, mat, cap, opts = {}) {
  const zs = opts.zs || [26, 18, 10, 2, -6, -14, -22];
  const r = mulberry32(W.idx * 31 + 7);
  for (const side of [-1, 1]) for (const z of zs) {
    let hh = h, st = style;
    if (opts.broken) { const k = r(); if (k < 0.45) { hh = 1 + r() * 3.5; } }
    const c = column(st, hh, mat, cap); c.position.set(side * 7.5, 0, z);
    if (opts.broken && hh < h) { c.children.forEach((ch, i) => { if (i > 0) ch.visible = false; }); c.children[0].scale.y = hh / (h - 0.5); c.children[0].position.y = hh / 2; c.rotation.z = (r() - 0.5) * 0.06; }
    W.group.add(c); W.colliders.push({ t: 1, x: side * 7.5, z, r: 0.75, h: hh });
  }
}

// ============================================================================
//  JARDINES: parterres con flores, laureles, fuentes y mariposas
// ============================================================================
const FLOWER_COLS = [0xff5a7a, 0xffd34a, 0xf4f0ff, 0xc77dff, 0xff8a3d, 0xff9fc8, 0x7ab8ff];
function addGardens(W, r, opts = {}) {
  const stone = std(0xece6d8, { roughness: 0.55 }); const soil = std(0x4a3a28, { roughness: 1 });
  const bushes = [], flowers = [], m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), sc = new THREE.Vector3();
  const beds = []; const blades = [];
  const lawnMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, map: texTiles('lawn', 0x6f9e48, 0x5a8a3a, 6, 0.4) });
  const free = (x, z, hw, hd) => !W._near(x, z, Math.max(hw, hd) - 0.5) && !beds.some((b) => Math.abs(b.x - x) < b.hw + hw + 1.6 && Math.abs(b.z - z) < b.hd + hd + 1.6) &&
    !(opts.avoid || []).some(([ax, az, ar]) => Math.hypot(ax - x, az - z) < ar + Math.max(hw, hd));
  for (const side of [-1, 1]) for (let z = opts.z1 ?? 34; z >= (opts.z0 ?? -44); z -= 1.5) {
    const hw = 1.6 + r() * 1.2, hd = 1.4 + r() * 1.6; const x = side * (opts.x0 ?? 9.5) + side * (hw + r() * 2.5);
    if (Math.abs(x) + hw > (opts.xMax ?? 17.6) || !free(x, z, hw, hd)) continue;
    beds.push({ x, z, hw, hd });
  }
  for (const b of beds) {
    const g = new THREE.Group(); g.position.set(b.x, 0, b.z);
    // bordillo de mármol y tierra
    for (const [w, d, x, z] of [[b.hw * 2 + 0.3, 0.25, 0, b.hd], [b.hw * 2 + 0.3, 0.25, 0, -b.hd], [0.25, b.hd * 2, b.hw, 0], [0.25, b.hd * 2, -b.hw, 0]]) g.add(mesh(new THREE.BoxGeometry(w, 0.38, d), stone, x, 0.19, z));
    g.add(mesh(new THREE.BoxGeometry(b.hw * 2, 0.3, b.hd * 2), soil, 0, 0.15, 0, false));
    // césped alrededor, con matas de hierba
    const lawn = mesh(new THREE.PlaneGeometry(b.hw * 2 + 2, b.hd * 2 + 2), lawnMat, 0, 0.02, 0, false); lawn.rotation.x = -Math.PI / 2; lawn.receiveShadow = true; g.add(lawn);
    for (let i = 0; i < 40; i++) { const side = r() < 0.5; const gx = side ? (r() * 2 - 1) * (b.hw + 0.9) : (r() < 0.5 ? -1 : 1) * (b.hw + 0.3 + r() * 0.6), gz = side ? (r() < 0.5 ? -1 : 1) * (b.hd + 0.3 + r() * 0.6) : (r() * 2 - 1) * (b.hd + 0.9); blades.push([b.x + gx, b.z + gz]); }
    W.group.add(g); W.colliders.push({ t: 0, x0: b.x - b.hw - 0.15, x1: b.x + b.hw + 0.15, z0: b.z - b.hd - 0.15, z1: b.z + b.hd + 0.15, h: 1.2 });
    // un árbol en el centro de los parterres grandes: laurel, ciprés o granado
    const big = b.hw * b.hd > 4.5;
    if (big) {
      const k = r(); const t = k < 0.4 ? cypress(3.5 + r() * 2) : oliveTree(r); if (k >= 0.4) t.scale.setScalar(0.75 + r() * 0.2);
      t.position.set((r() - 0.5) * b.hw * 0.6, 0.3, (r() - 0.5) * b.hd * 0.6); W.group.add(t);
      if (k >= 0.75) for (let i = 0; i < 9; i++) flowers.push([b.x + t.position.x + (r() - 0.5) * 2.4, 2 + r() * 1.4, b.z + t.position.z + (r() - 0.5) * 2.4, 0.14, 0xd6283a]); // granadas
    }
    // arbustos de flores (adelfas, rosas, mirtos)
    const nb = Math.round(b.hw * b.hd * 0.9) + 2;
    for (let i = 0; i < nb; i++) {
      const bx = b.x + (r() * 2 - 1) * (b.hw - 0.45), bz = b.z + (r() * 2 - 1) * (b.hd - 0.45), s = 0.35 + r() * 0.35;
      bushes.push([bx, 0.3 + s * 0.6, bz, s, [0x3f6b2e, 0x4f7a34, 0x2f5a2a, 0x5a7d3a][Math.floor(r() * 4)]]);
      const fc = FLOWER_COLS[Math.floor(r() * FLOWER_COLS.length)];
      for (let j = 0; j < 11; j++) { const a = r() * TAU, rr = s * (0.7 + r() * 0.35); flowers.push([bx + Math.cos(a) * rr, 0.3 + s * 0.6 + (r() - 0.1) * s * 0.9, bz + Math.sin(a) * rr, 0.08 + r() * 0.05, fc]); }
    }
    // flores sueltas por el borde
    for (let i = 0; i < 46; i++) { const fx = b.x + (r() * 2 - 1) * (b.hw - 0.2), fz = b.z + (r() * 2 - 1) * (b.hd - 0.2); flowers.push([fx, 0.38 + r() * 0.12, fz, 0.08 + r() * 0.04, FLOWER_COLS[Math.floor(r() * FLOWER_COLS.length)]]); }
  }
  const inst = (geo, mat, list) => {
    if (!list.length) return; const im = new THREE.InstancedMesh(geo, mat, list.length); const col = new THREE.Color();
    list.forEach(([x, y, z, s, c], i) => { e.set(r() * 0.4, r() * TAU, r() * 0.4); q.setFromEuler(e); m4.compose(v.set(x, y, z), q, sc.set(s, s * 0.85, s)); im.setMatrixAt(i, m4); im.setColorAt(i, col.set(c).multiplyScalar(0.85 + r() * 0.3)); });
    im.castShadow = true; im.receiveShadow = true; W.group.add(im);
  };
  inst(new THREE.IcosahedronGeometry(1, 1), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, flatShading: true }), bushes);
  inst(new THREE.IcosahedronGeometry(1, 0), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, emissive: 0x221018, emissiveIntensity: 0.3 }), flowers);
  if (blades.length) {
    const geo = new THREE.ConeGeometry(0.06, 0.5, 3); geo.translate(0, 0.25, 0); const n = blades.length * 5;
    const im = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 }), n); const col = new THREE.Color(); let k = 0;
    for (const [x, z] of blades) for (let j = 0; j < 5; j++, k++) { e.set((r() - 0.5) * 0.5, r() * TAU, (r() - 0.5) * 0.5); q.setFromEuler(e); m4.compose(v.set(x + (r() - 0.5) * 0.5, 0, z + (r() - 0.5) * 0.5), q, sc.set(1, 0.6 + r() * 0.8, 1)); im.setMatrixAt(k, m4); im.setColorAt(k, col.set([0x5a8a38, 0x7aa048, 0x4a7a30][j % 3]).multiplyScalar(0.85 + r() * 0.3)); }
    W.group.add(im);
  }
  W.gardens = beds;
  return beds;
}
// fuente con surtidor
function fountain(W, x, z, stoneMat) {
  const g = new THREE.Group(); g.position.set(x, 0, z);
  g.add(mesh(new THREE.CylinderGeometry(2.1, 2.3, 0.6, 28), stoneMat, 0, 0.3, 0));
  const water = mesh(new THREE.CylinderGeometry(1.85, 1.85, 0.08, 28), new THREE.MeshStandardMaterial({ color: 0x4aa8c8, roughness: 0.08, metalness: 0.2, emissive: 0x0a3a50, emissiveIntensity: 0.6, transparent: true, opacity: 0.88 }), 0, 0.55, 0, false); g.add(water);
  g.add(mesh(new THREE.CylinderGeometry(0.22, 0.32, 1.6, 12), stoneMat, 0, 1.1, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.8, 0.35, 0.25, 20), stoneMat, 0, 1.95, 0));
  g.add(mesh(new THREE.SphereGeometry(0.2, 12, 8), stoneMat, 0, 2.2, 0));
  W.group.add(g); W.colliders.push({ t: 1, x, z, r: 2.2, h: 1 });
  W.emitters.push({ x, y: 2.25, z, col: 0xbfeaff, rate: 26, acc: 0, kind: 'water' });
  W.anim.push((t) => { water.material.emissiveIntensity = 0.5 + Math.sin(t * 2 + x) * 0.15; });
}
// mariposas que revolotean entre las flores
function addButterflies(W, beds, n, r) {
  if (!beds.length) return;
  const wing = new THREE.PlaneGeometry(0.16, 0.12); wing.translate(0.08, 0, 0);
  for (let i = 0; i < n; i++) {
    const b = beds[Math.floor(r() * beds.length)]; const col = [0xffd34a, 0xffffff, 0x7ab8ff, 0xff8a3d, 0xff9fc8][i % 5];
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(col).multiplyScalar(1.3), side: THREE.DoubleSide, toneMapped: false });
    const g = new THREE.Group(); const L = new THREE.Mesh(wing, mat), R = new THREE.Mesh(wing, mat); R.scale.x = -1; g.add(L, R); W.group.add(g);
    const ph = r() * 10, sp = 0.4 + r() * 0.4, rad = 1 + r() * 1.6;
    W.anim.push((t) => {
      const a = t * sp + ph; g.position.set(b.x + Math.cos(a) * rad + Math.sin(a * 2.3) * 0.4, 1 + Math.sin(a * 1.7) * 0.35 + Math.sin(t * 6 + ph) * 0.05, b.z + Math.sin(a * 1.3) * rad);
      g.rotation.y = -a * 1.1; const f = Math.sin(t * 22 + ph) * 1.1; L.rotation.y = f; R.rotation.y = -f;
    });
  }
}

const ERA_BUILDERS = [
  // ------------------------------------------------------------------ I
  function (W) {
    const sand = texSand('i', 0xd8b07a); sand.repeat.set(18, 28);
    ground(W, sand, [80, 120]);
    const path = new THREE.PlaneGeometry(7, 84); path.rotateX(-Math.PI / 2);
    const pt = texTiles('i', 0xcbb79a, 0x6b5a48, 4, 0.18); const ptc = pt.clone(); ptc.repeat.set(2, 24); ptc.needsUpdate = true;
    W.group.add(mesh(path, std(0xffffff, { map: ptc, roughness: 0.95 }), 0, 0.01, -5, false, true));
    // mar al oeste
    const sea = new THREE.PlaneGeometry(400, 400); sea.rotateX(-Math.PI / 2);
    const seaM = mesh(sea, std(0x1f5a88, { roughness: 0.15, metalness: 0.3 }), -240, -0.6, 0, false, false); W.group.add(seaM);
    // montañas al este
    const r = mulberry32(5);
    for (let i = 0; i < 14; i++) { const m = mesh(new THREE.ConeGeometry(18 + r() * 20, 14 + r() * 22, 6), std(0x7a6a5a, { flat: true, roughness: 1 }), 70 + r() * 60, 0, -120 + i * 18, false, false); m.rotation.y = r() * 3; W.group.add(m); }
    const marble = std(0xffffff, { map: texMarble('i', 0xe9dcc4, 0xa08a6a), roughness: 0.55 });
    const cap = std(0xd8c8a8, { roughness: 0.7 });
    columnRows(W, 'doric', 7, marble, cap, { broken: true });
    // muros en ruinas
    const wallM = std(0xffffff, { map: texStone('i', 0xbfa880), roughness: 0.95 });
    for (const side of [-1, 1]) for (let z = -44; z < 36; z += 6) {
      const h = 0.6 + r() * 2.2; if (r() < 0.2) continue;
      addBox(W, 1.2, h, 5.4, wallM, side * 24.6, h / 2, z + 3, false);
    }
    // tambores caídos
    for (let i = 0; i < 10; i++) {
      const x = (r() < 0.5 ? -1 : 1) * (9 + r() * 4), z = -24 + r() * 50;
      if (W._near(x, z, 4)) continue;
      const d = mesh(flutedCylinder(0.55, 0.55, 1.4, 20, 0.06), marble, x, 0.5, z); d.rotation.set(0, r() * 3, Math.PI / 2); W.group.add(d);
      W.colliders.push({ t: 1, x, z, r: 0.9, h: 1 });
    }
    // olivos
    for (let i = 0; i < 9; i++) { const x = (r() < 0.5 ? -1 : 1) * (18 + r() * 4), z = -40 + r() * 74; if (W._near(x, z, 4)) continue; const t = oliveTree(r); t.position.set(x, 0, z); W.group.add(t); W.colliders.push({ t: 1, x, z, r: 0.5, h: 3 }); }
    // templo en ruinas al norte
    const tmp = templeFacade(6, 'doric', marble, cap, 8); tmp.position.set(0, 0, -53); W.group.add(tmp);
    tmp.children.forEach((c, i) => { if (i === 3 || i === 6) { c.scale.y = 0.45; } });
    brazier(W, -4, -36, 0xff8a3a); brazier(W, 4, -36, 0xff8a3a);
    brazier(W, -4, 30, 0xff8a3a, false); brazier(W, 4, 30, 0xff8a3a, false);
  },
  // ------------------------------------------------------------------ II
  function (W) {
    const fl = texTiles('ii', 0xe8e2d4, 0x9a9282, 3, 0.07); fl.repeat.set(24, 38);
    ground(W, fl, [80, 120], 0.45);
    const marble = std(0xffffff, { map: texMarble('ii', 0xf3efe6, 0xb0a898), roughness: 0.4 });
    const cap = std(0xeae4d6, { roughness: 0.5 });
    // estoas laterales
    for (const side of [-1, 1]) {
      const stoa = new THREE.Group();
      for (let z = -42; z <= 34; z += 5) { const c = column('doric', 6.5, marble, cap); c.position.set(side * 19.5, 0, z); stoa.add(c); W.colliders.push({ t: 1, x: side * 19.5, z, r: 0.7, h: 7 }); }
      stoa.add(mesh(new THREE.BoxGeometry(6.5, 0.6, 80), cap, side * 22, 6.8, -4));
      stoa.add(mesh(new THREE.BoxGeometry(1, 7.4, 80), std(0xb87a5a, { roughness: 0.9 }), side * 25, 3.7, -4));
      W.group.add(stoa);
    }
    // estatuas en la vía central
    const r = mulberry32(22);
    for (const side of [-1, 1]) for (const z of [24, 6, -12]) { const s = statue(marble, r); s.position.set(side * 7.5, 0, z); s.rotation.y = -side * Math.PI / 2; W.group.add(s); W.colliders.push({ t: 0, x0: side * 7.5 - 0.7, x1: side * 7.5 + 0.7, z0: z - 0.7, z1: z + 0.7, h: 4 }); }
    // altar central
    addBox(W, 2.6, 1, 1.6, marble, 0, 0.5, 18);
    W.emitters.push({ x: 0, y: 1.1, z: 18, col: 0xffa040, rate: 10, acc: 0, kind: 'flame' });
    // Partenón
    const tmp = templeFacade(8, 'doric', marble, cap, 9.5); tmp.position.set(0, 0, -54); W.group.add(tmp);
    brazier(W, -5, -36, 0xff9a40); brazier(W, 5, -36, 0xff9a40);
    // olivos de Atenea
    for (const [x, z] of [[-18, 30], [18, 30], [-17, -40], [17, -40]]) { const t = oliveTree(r); t.position.set(x, 0, z); W.group.add(t); }
    // jardines de Atenas: parterres floridos, fuentes, macetas y mariposas
    const fountains = [[8.5, 33], [-9, -2]].filter(([x, z]) => !W._near(x, z, 1.5));
    for (const [x, z] of fountains) fountain(W, x, z, marble);
    const statues = [24, 6, -12].flatMap((z) => [[-7.5, z, 1.4], [7.5, z, 1.4]]);
    const beds = addGardens(W, r, { avoid: [...statues, ...fountains.map(([x, z]) => [x, z, 2.6]), [-13, 31, 3.6]] });
    addButterflies(W, beds, 16, r);
    // macetas con flores junto a la vía central
    const pot = std(0xb8643a, { roughness: 0.8 }); const potFl = [];
    for (const side of [-1, 1]) for (let z = 32; z > -34; z -= 6) {
      const x = side * 4.6; if (W._near(x, z, 0.2) || statues.some(([sx, sz]) => Math.hypot(sx - x, sz - z) < 3)) continue;
      const g = new THREE.Group(); g.position.set(x, 0, z);
      g.add(mesh(new THREE.CylinderGeometry(0.42, 0.28, 0.7, 12), pot, 0, 0.35, 0)); put(g, mesh(new THREE.TorusGeometry(0.42, 0.06, 6, 16), pot, 0, 0.7, 0)).rotation.x = Math.PI / 2;
      g.add(mesh(new THREE.IcosahedronGeometry(0.45, 1), std(0x3f6b2e, { roughness: 0.9, flat: true }), 0, 1.0, 0));
      const fc = FLOWER_COLS[Math.floor(r() * FLOWER_COLS.length)];
      for (let k = 0; k < 8; k++) { const a = (k / 8) * TAU; g.add(mesh(new THREE.IcosahedronGeometry(0.08, 0), std(fc, { roughness: 0.6 }), Math.cos(a) * 0.38, 1.05 + Math.sin(k * 2.1) * 0.15, Math.sin(a) * 0.38, false)); }
      W.group.add(g); W.colliders.push({ t: 1, x, z, r: 0.5, h: 1.2 });
    }
    // pérgola con parra en el jardín de la Academia
    { const pg = new THREE.Group(); pg.position.set(-13, 0, 31);
      for (const [px, pz] of [[-2.4, -1.6], [2.4, -1.6], [-2.4, 1.6], [2.4, 1.6]]) { const c = column('doric', 3.2, marble, cap); c.scale.setScalar(0.55); c.position.set(px, 0, pz); pg.add(c); W.colliders.push({ t: 1, x: -13 + px, z: 31 + pz, r: 0.35, h: 3 }); }
      const wood = std(0x6a4a30, { roughness: 0.9 });
      for (const pz of [-1.6, 1.6]) pg.add(mesh(new THREE.BoxGeometry(5.6, 0.2, 0.25), wood, 0, 3.15, pz));
      for (let k = -2.4; k <= 2.4; k += 0.6) pg.add(mesh(new THREE.BoxGeometry(0.15, 0.15, 3.8), wood, k, 3.3, 0));
      const vine = std(0x4a7a30, { roughness: 0.9, flat: true }); const grape = std(0x5a2a6a, { roughness: 0.5 });
      for (let k = 0; k < 22; k++) pg.add(mesh(new THREE.IcosahedronGeometry(0.35 + r() * 0.25, 0), vine, (r() - 0.5) * 5.2, 3.4 + r() * 0.3, (r() - 0.5) * 3.6, false));
      for (let k = 0; k < 8; k++) { const gx = (r() - 0.5) * 4.6, gz = (r() - 0.5) * 3; put(pg, mesh(new THREE.ConeGeometry(0.16, 0.4, 6), grape, gx, 2.95, gz, false)).rotation.x = Math.PI; }
      pg.add(mesh(new THREE.BoxGeometry(2.6, 0.45, 0.7), marble, 0, 0.45, 0)); // banco
      W.group.add(pg); }
  },
  // ------------------------------------------------------------------ III
  function (W) {
    const fl = texTiles('iii', 0xd6c3a0, 0x7a6a50, 2, 0.15); fl.repeat.set(20, 30);
    ground(W, fl, [80, 120], 0.8);
    const trav = std(0xffffff, { map: texMarble('iii', 0xe2d2b4, 0xa89070), roughness: 0.65 });
    const brick = std(0xffffff, { map: texStone('iii', 0xb4654a), roughness: 0.95 });
    const trim = std(0xe6d8bc, { roughness: 0.6 });
    for (const side of [-1, 1]) {
      const a = arcade(80, 13, 5, brick, trim, { attic: 1.6 }); a.rotation.y = Math.PI / 2; a.position.set(side * 21, 0, -4); W.group.add(a);
      for (let i = 0; i <= 13; i++) { const z = -4 - 40 + i * (80 / 13); W.colliders.push({ t: 0, x0: side * 21 - 0.6, x1: side * 21 + 0.6, z0: z - 0.6, z1: z + 0.6, h: 9 }); }
      W.group.add(mesh(new THREE.BoxGeometry(1, 10, 80), brick, side * 25, 5, -4));
    }
    columnRows(W, 'corinthian', 8, trav, trim, { zs: [26, 16, 6, -4, -14, -22] });
    // arco de triunfo
    const arch = new THREE.Group();
    arch.add(mesh(new THREE.BoxGeometry(4, 11, 4), trav, -6, 5.5, 0)); arch.add(mesh(new THREE.BoxGeometry(4, 11, 4), trav, 6, 5.5, 0));
    arch.add(mesh(new THREE.BoxGeometry(16, 4, 4), trav, 0, 13, 0));
    arch.add(mesh(new THREE.TorusGeometry(4, 0.5, 8, 24, Math.PI), trim, 0, 8, 2.05));
    arch.add(mesh(new THREE.BoxGeometry(16.6, 0.5, 4.4), trim, 0, 11.2, 0));
    arch.add(mesh(new THREE.BoxGeometry(9, 1.6, 0.2), std(0x2a2018), 0, 13.2, 2.05));
    for (const x of [-7.6, -4.4, 4.4, 7.6]) { const c = column('corinthian', 9, trav, trim); c.position.set(x, 0, 2.3); c.scale.setScalar(0.92); arch.add(c); }
    arch.position.set(0, 0, -51); W.group.add(arch);
    const r = mulberry32(33);
    for (let i = 0; i < 10; i++) { const x = (i % 2 ? -1 : 1) * (16.5 + r() * 1.5), z = -40 + i * 7.5; if (W._near(x, z, 4)) continue; const c = cypress(5 + r() * 3); c.position.set(x, 0, z); W.group.add(c); W.colliders.push({ t: 1, x, z, r: 0.7, h: 6 }); }
    brazier(W, -4, -36, 0xff7040); brazier(W, 4, -36, 0xff7040); brazier(W, 4, 30, 0xff7040); brazier(W, -10, 5, 0xff7040, false); brazier(W, 10, -9, 0xff7040, false);
  },
  // ------------------------------------------------------------------ IV
  function (W) {
    const fl = texTiles('iv', 0x6a645a, 0x2a2622, 2, 0.2); fl.repeat.set(16, 26);
    ground(W, fl, [60, 100], 0.6);
    const stone = std(0xffffff, { map: texStone('iv', 0x8a8478), roughness: 0.9 });
    const pil = std(0x9a948a, { roughness: 0.8 });
    // muros con vidrieras
    for (const side of [-1, 1]) {
      W.group.add(mesh(new THREE.BoxGeometry(1.4, 22, 90), stone, side * 25, 11, -5));
      for (let z = -40; z <= 30; z += 10) {
        const win = mesh(new THREE.PlaneGeometry(3.4, 9), new THREE.MeshBasicMaterial({ map: texStainedGlass(Math.abs(z * 7 + side * 3) % 50), toneMapped: false, color: new THREE.Color(2.2, 2.2, 2.2) }), side * 24.25, 10, z, false, false);
        win.rotation.y = -side * Math.PI / 2; W.group.add(win);
        const pa = new THREE.Group();
        pa.add(mesh(new THREE.TorusGeometry(3.4, 0.22, 6, 12, Math.PI / 3), pil, -1.7, 14.5, 0));
        const a2 = mesh(new THREE.TorusGeometry(3.4, 0.22, 6, 12, Math.PI / 3), pil, 1.7, 14.5, 0); a2.rotation.z = (2 * Math.PI) / 3; pa.add(a2);
        pa.rotation.y = Math.PI / 2; pa.position.set(side * 24.2, 0, z); W.group.add(pa);
        // haz de luz
        const shaft = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 26), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.35, 0.3, 0.5), transparent: true, opacity: 0.09, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
        shaft.position.set(side * 18, 6, z); shaft.rotation.set(0, Math.PI / 2, side * 0.62); W.group.add(shaft);
      }
    }
    W.group.add(mesh(new THREE.BoxGeometry(52, 22, 1.4), stone, 0, 11, -50));
    W.group.add(mesh(new THREE.BoxGeometry(52, 22, 1.4), stone, 0, 11, 39));
    const vault = mesh(new THREE.BoxGeometry(52, 1, 92), std(0x1a1816, { roughness: 1 }), 0, 22, -5, false, false); W.group.add(vault);
    // rosetón
    const rose = mesh(new THREE.CircleGeometry(6.5, 48), new THREE.MeshBasicMaterial({ map: texRose(), toneMapped: false, color: new THREE.Color(2.6, 2.6, 2.6) }), 0, 13, -49.2, false, false); W.group.add(rose);
    W.group.add(mesh(new THREE.TorusGeometry(6.6, 0.45, 8, 48), pil, 0, 13, -49.1));
    // nave: pilares y arcos apuntados
    for (const side of [-1, 1]) {
      const a = arcade(56, 7, 10, pil, pil, { columns: 'gothic', pointed: true, attic: 0.8 }); a.rotation.y = Math.PI / 2; a.position.set(side * 7.5, 0, -2); W.group.add(a);
      for (let i = 0; i <= 7; i++) W.colliders.push({ t: 1, x: side * 7.5, z: -2 - 28 + i * 8, r: 1.05, h: 12 });
    }
    // bancos
    const wood = std(0xffffff, { map: texWood('iv', 0x5a3a22), roughness: 0.8 });
    for (const side of [-1, 1]) for (let z = 26; z > 22; z -= 2.2) addBox(W, 4.5, 0.9, 0.7, wood, side * 15, 0.45, z);
    // candelabros
    const metal = std(0x2a2018, { metalness: 0.7, roughness: 0.4 });
    const candles = [[-4, 28], [4, 28], [-4, -34], [4, -34], [-11, 5], [11, -9]];
    candles.forEach(([x, z], i) => {
      const g = new THREE.Group(); g.position.set(x, 0, z);
      g.add(mesh(new THREE.CylinderGeometry(0.06, 0.35, 2.4, 8), metal, 0, 1.2, 0));
      put(g, mesh(new THREE.TorusGeometry(0.45, 0.04, 6, 16), metal, 0, 2.4, 0)).rotation.x = Math.PI / 2;
      for (let k = 0; k < 5; k++) { const a = (k / 5) * TAU; g.add(mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.3, 6), std(0xf2e8d0), Math.cos(a) * 0.45, 2.55, Math.sin(a) * 0.45)); g.add(mesh(new THREE.SphereGeometry(0.05, 6, 4), glow(0xffb050, 6), Math.cos(a) * 0.45, 2.78, Math.sin(a) * 0.45, false, false)); }
      W.group.add(g); W.colliders.push({ t: 1, x, z, r: 0.4, h: 3 });
      if (W.lightBudget > 0) { const l = new THREE.PointLight(0xffa850, 14, 13, 2); l.position.set(x, 3, z); W.group.add(l); W.lightBudget--; W.anim.push((t) => { l.intensity = 13 + Math.sin(t * 11 + i) * 1.5; }); }
    });
    // altar
    const altar = addBox(W, 5, 1.2, 2, std(0xe8e0d0, { roughness: 0.4 }), 0, 0.6, -45);
    W.group.add(mesh(new THREE.BoxGeometry(0.25, 3, 0.25), glow(0xffd070, 2.5), 0, 2.7, -45, false, false));
    W.group.add(mesh(new THREE.BoxGeometry(1.6, 0.25, 0.25), glow(0xffd070, 2.5), 0, 3.4, -45, false, false));
  },
  // ------------------------------------------------------------------ V
  function (W) {
    const fl = texChecker('v', 0xeee8dc, 0xc49c8a, 0x3a6a52); fl.repeat.set(16, 26);
    ground(W, fl, [80, 120], 0.35, false);
    const pietra = std(0x8a8a90, { roughness: 0.6 });
    const ochre = std(0xffffff, { map: texStone('v', 0xd8a868), roughness: 0.95 });
    const white = std(0xf2ece0, { roughness: 0.6 });
    for (const side of [-1, 1]) {
      const a = arcade(80, 16, 5.5, pietra, white, { columns: 'tuscan', roundels: true, attic: 2.4 }); a.rotation.y = Math.PI / 2; a.position.set(side * 20, 0, -4); W.group.add(a);
      for (let i = 0; i <= 16; i++) W.colliders.push({ t: 1, x: side * 20, z: -44 + i * 5, r: 0.45, h: 9 });
      W.group.add(mesh(new THREE.BoxGeometry(1, 12, 80), ochre, side * 25, 6, -4));
      W.group.add(mesh(new THREE.BoxGeometry(5, 0.4, 80), white, side * 22.5, 9.5, -4));
    }
    // cúpula
    const duomo = new THREE.Group();
    duomo.add(mesh(new THREE.BoxGeometry(28, 10, 14), std(0xffffff, { map: texMarble('vw', 0xf2ece0, 0x6a8a74), roughness: 0.6 }), 0, 5, 0));
    for (let i = 0; i < 6; i++) duomo.add(mesh(new THREE.BoxGeometry(0.5, 10, 0.3), std(0x3a6a52, { roughness: 0.5 }), -12.5 + i * 5, 5, 7.05));
    duomo.add(mesh(new THREE.BoxGeometry(5, 7, 0.2), std(0x5a3a22, { roughness: 0.8 }), 0, 3.5, 7.1));
    duomo.add(mesh(new THREE.CylinderGeometry(9, 9, 6, 8), white, 0, 13, 0));
    for (let i = 0; i < 8; i++) { const a = (i / 8) * TAU + Math.PI / 8; put(duomo, mesh(new THREE.CircleGeometry(1.1, 16), std(0x223040), Math.cos(a) * 8.6, 13, Math.sin(a) * 8.6)).lookAt(Math.cos(a) * 20, 13, Math.sin(a) * 20); }
    const dome = mesh(new THREE.SphereGeometry(8.8, 8, 12, 0, TAU, 0, Math.PI / 2), std(0xb4533a, { roughness: 0.8, flat: true }), 0, 16, 0); dome.scale.y = 1.25; duomo.add(dome);
    for (let i = 0; i < 8; i++) { const rib = mesh(new THREE.TorusGeometry(8.85, 0.2, 6, 24, Math.PI / 2), white, 0, 16, 0); rib.scale.set(1, 1.25, 1); rib.rotation.y = (i / 8) * TAU + Math.PI / 8; rib.rotation.order = 'YXZ'; duomo.add(rib); rib.rotation.z = 0; }
    duomo.add(mesh(new THREE.CylinderGeometry(1.1, 1.3, 2.5, 8), white, 0, 28, 0));
    duomo.add(mesh(new THREE.SphereGeometry(0.45, 12, 8), std(0xd6a84a, { metalness: 1, roughness: 0.3 }), 0, 29.7, 0));
    duomo.position.set(0, 0, -58); W.group.add(duomo);
    // fuente
    const f = new THREE.Group(); f.position.set(0, 0, 9);
    f.add(mesh(new THREE.CylinderGeometry(3, 3.2, 0.8, 24), white, 0, 0.4, 0));
    f.add(mesh(new THREE.CylinderGeometry(2.7, 2.7, 0.1, 24), std(0x3a7aa8, { roughness: 0.05, metalness: 0.4 }), 0, 0.72, 0, false));
    f.add(mesh(new THREE.CylinderGeometry(0.3, 0.45, 2.5, 10), white, 0, 1.6, 0));
    f.add(mesh(new THREE.CylinderGeometry(1.1, 0.4, 0.4, 16), white, 0, 2.9, 0));
    W.group.add(f); W.colliders.push({ t: 1, x: 0, z: 9, r: 3.3, h: 1 });
    W.emitters.push({ x: 0, y: 3.1, z: 9, col: 0xbfe4ff, rate: 22, acc: 0, kind: 'water' });
    const r = mulberry32(55);
    for (const [x, z] of [[-12, 30], [12, 30], [-12, -30], [12, -30]]) { const s = statue(std(0xf4f0e8, { roughness: 0.45 }), r); s.position.set(x, 0, z); W.group.add(s); W.colliders.push({ t: 0, x0: x - 0.7, x1: x + 0.7, z0: z - 0.7, z1: z + 0.7, h: 4 }); }
    brazier(W, -4, -36, 0xffb060, true); brazier(W, 4, -36, 0xffb060, true);
  },
  // ------------------------------------------------------------------ VI
  function (W) {
    const fl = texWood('vi', 0x7a4a28); fl.repeat.set(12, 20);
    ground(W, fl, [60, 100], 0.55);
    const wood = std(0x3a2414, { roughness: 0.7 });
    const books = texBooks(3); const booksM = std(0xffffff, { map: books, roughness: 0.85, emissive: 0xffffff, emissiveMap: books, ei: 0.22 });
    // estanterías perimetrales
    for (const side of [-1, 1]) {
      for (let z = -44; z < 36; z += 8) {
        const sh = mesh(new THREE.BoxGeometry(1.2, 10, 8), wood, side * 24.6, 5, z + 4); W.group.add(sh);
        const face = mesh(new THREE.PlaneGeometry(7.6, 9.6), booksM, side * 23.95, 5, z + 4, false, true); face.rotation.y = -side * Math.PI / 2; W.group.add(face);
      }
      W.group.add(mesh(new THREE.BoxGeometry(2.5, 0.3, 84), wood, side * 23.5, 10.1, -5));
      // barandilla del altillo
      for (let z = -44; z < 37; z += 2) W.group.add(mesh(new THREE.CylinderGeometry(0.05, 0.05, 1, 6), std(0xb08a4a, { metalness: 0.8, roughness: 0.3 }), side * 22.4, 10.75, z));
      W.group.add(mesh(new THREE.BoxGeometry(0.12, 0.12, 84), std(0xb08a4a, { metalness: 0.8, roughness: 0.3 }), side * 22.4, 11.25, -5));
    }
    // islas de libros en la nave (en lugar de columnas)
    for (const side of [-1, 1]) for (const z of [24, 6, -12]) {
      addBox(W, 1.4, 4.5, 6, wood, side * 7.5, 2.25, z);
      for (const s of [-1, 1]) { const face = mesh(new THREE.PlaneGeometry(5.6, 4.2), booksM, side * 7.5 + s * 0.71, 2.25, z, false, true); face.rotation.y = s * Math.PI / 2; W.group.add(face); }
      // lámpara de aceite encima
      W.group.add(mesh(new THREE.SphereGeometry(0.22, 12, 8), glow(0xffc070, 4), side * 7.5, 4.9, z, false, false));
    }
    // planetario mecánico central
    const orr = new THREE.Group(); orr.position.set(0, 0, 8);
    const brass = std(0xc8a050, { metalness: 0.9, roughness: 0.3 });
    orr.add(mesh(new THREE.CylinderGeometry(1.4, 1.8, 1.2, 16), wood, 0, 0.6, 0));
    orr.add(mesh(new THREE.CylinderGeometry(0.1, 0.1, 2, 8), brass, 0, 2.2, 0));
    orr.add(mesh(new THREE.SphereGeometry(0.55, 20, 14), glow(0xffc060, 3.5), 0, 3.2, 0, false, false));
    const planets = [];
    [[1.3, 0.12, 0x9a8a7a, 1.6], [1.9, 0.16, 0xe0c080, 1.1], [2.6, 0.18, 0x4a8ad0, 0.8], [3.3, 0.14, 0xc0503a, 0.6], [4.3, 0.32, 0xd8b088, 0.35]].forEach(([rad, s, c, sp], i) => {
      const arm = new THREE.Group(); arm.position.y = 3.2;
      put(arm, mesh(new THREE.TorusGeometry(rad, 0.015, 4, 48), brass, 0, 0, 0, false)).rotation.x = Math.PI / 2;
      const p = mesh(new THREE.SphereGeometry(s, 14, 10), std(c, { roughness: 0.6 }), rad, 0, 0); arm.add(p);
      orr.add(arm); planets.push([arm, sp]);
    });
    W.anim.push((t, dt) => planets.forEach(([a, sp]) => (a.rotation.y += sp * dt * 0.5)));
    W.group.add(orr); W.colliders.push({ t: 1, x: 0, z: 8, r: 2, h: 4 });
    const l = new THREE.PointLight(0xffc070, 30, 18, 2); l.position.set(0, 3.4, 8); W.group.add(l); W.lightBudget--;
    // telescopio al norte
    const tel = new THREE.Group(); tel.position.set(0, 0, -45);
    tel.add(mesh(new THREE.CylinderGeometry(3.5, 4, 1.2, 24), wood, 0, 0.6, 0));
    tel.add(mesh(new THREE.BoxGeometry(0.6, 4, 0.6), brass, -1, 3, 0)); tel.add(mesh(new THREE.BoxGeometry(0.6, 4, 0.6), brass, 1, 3, 0));
    const tube = mesh(new THREE.CylinderGeometry(0.7, 0.95, 12, 20), brass, 0, 5, 0); tube.rotation.x = -0.8; tube.position.set(0, 7, -2.5); tel.add(tube);
    W.group.add(tel); W.colliders.push({ t: 1, x: 0, z: -45, r: 4, h: 2 });
    // escritorios con velas y globos
    const deskSpots = [[-17, 30], [17, 30], [-18, -26], [18, -26]];
    deskSpots.forEach(([x, z], i) => {
      addBox(W, 3, 1, 1.5, wood, x, 0.5, z);
      W.group.add(mesh(new THREE.SphereGeometry(0.4, 16, 12), std(0x4a6a8a, { roughness: 0.5 }), x - 0.8, 1.45, z));
      put(W.group, mesh(new THREE.TorusGeometry(0.45, 0.03, 4, 24), brass, x - 0.8, 1.45, z)).rotation.y = 0.5;
      W.group.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.4, 6), std(0xf2e8d0), x + 0.7, 1.2, z));
      W.group.add(mesh(new THREE.SphereGeometry(0.06, 6, 4), glow(0xffb050, 6), x + 0.7, 1.45, z, false, false));
      if (W.lightBudget > 2 && i < 2) { const pl = new THREE.PointLight(0xffa850, 8, 9, 2); pl.position.set(x + 0.7, 1.8, z); W.group.add(pl); W.lightBudget--; }
    });
    brazier(W, -4, -35, 0xffb060); brazier(W, 4, -35, 0xffb060);
  },
];

function buildWorld(idx) {
  const W = newWorld(idx); const th = W.theme; const era = ERAS[idx];
  const regs = era.sages.filter((s) => !s.boss);
  const sp = stationPositions(regs.length);
  const npcPts = (NPCS[idx] || []).flatMap((n) => [0, 0.5, 1].map((k) => [n.at[0] + n.path[0] * k, n.at[1] + n.path[1] * k]));
  W._near = (x, z, d) => npcPts.some(([nx, nz]) => Math.hypot(nx - x, nz - z) < d + 1) || sp.some(([sx, sz]) => Math.hypot(sx - x, sz - z) < d + 3) || Math.hypot(x, z - W.bossPos.z) < d + 5 || (POIS[idx] || []).some((p) => Math.hypot(p.at[0] - x, p.at[1] - z) < d + 1.5);
  W.floors = [];
  addBounds(W);
  W.sky = makeSky(th); W.group.add(W.sky);
  if (th.stars) { W.stars = makeStars(idx === 5 ? 2600 : 1400, idx); W.group.add(W.stars); }
  if (th.moon) { const moon = mesh(new THREE.SphereGeometry(9, 24, 16), glow(0xdfe6ff, 1.6), -120, 140, -260, false, false); W.group.add(moon); }
  // luces
  const hemi = new THREE.HemisphereLight(th.hemi[0], th.hemi[1], th.hemi[2]); W.group.add(hemi);
  const sun = new THREE.DirectionalLight(th.sunCol, th.sunInt);
  sun.position.set(...th.sunDir).normalize().multiplyScalar(60); sun.target.position.set(0, 0, -5);
  sun.castShadow = G.settings.quality === 'high';
  sun.shadow.mapSize.set(2048, 2048); const sc = sun.shadow.camera; sc.left = -48; sc.right = 48; sc.top = 48; sc.bottom = -48; sc.near = 1; sc.far = 160;
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.03;
  W.group.add(sun); W.group.add(sun.target); W.sun = sun; W.sunOff = sun.position.clone();
  ERA_BUILDERS[idx](W);
  if (!th.indoor && idx !== 5) addClouds(W, idx);
  if (idx === 0 || idx === 2) addGrass(W, idx, sp);
  // estaciones de los filósofos
  W.trials = []; W.gates = [];
  regs.forEach((s, i) => W.stations.push({ data: s, pos: new THREE.Vector3(sp[i][0], 0, sp[i][1]), side: Math.sign(sp[i][0]) || 1 }));
  const boss = era.sages.find((s) => s.boss); W.stations.push({ data: boss, pos: W.bossPos.clone(), boss: true, side: 1 });
  for (const st of W.stations) buildStation(W, st);

  buildPortal(W);
  // puntos de aparición de enemigos
  const r = mulberry32(idx * 101 + 3);
   buildPois(W);
  for (let i = 0; i < 24; i++) { const x = (r() * 2 - 1) * 20, z = -38 + r() * 64; if (z > 24 && Math.abs(x) < 8) continue; W.spawns.push(new THREE.Vector3(x, 0, z)); }
  return W;
}

// ============================================================================
//  ESTACIONES Y ESCENARIOS DE CADA FILÓSOFO
// ============================================================================
function buildStation(W, st) {
  const th = W.theme; const { x, z } = st.pos; const R = st.boss ? 4.2 : 2.6;
  const g = new THREE.Group(); g.position.set(x, 0, z);
  const daisMat = W.idx === 5 ? std(0x2a1a10, { roughness: 0.5 }) : W.idx === 3 ? std(0x5a544c, { roughness: 0.7 }) : std(0xe2d8c4, { roughness: 0.55 });
  g.add(mesh(new THREE.CylinderGeometry(R, R + 0.25, 0.14, 40), daisMat, 0, 0.07, 0, false, true));
  const ring = mesh(new THREE.RingGeometry(R - 0.18, R - 0.06, 64), glow(th.accent, 2.2, { transparent: true, opacity: 0.85 }), 0, 0.15, 0, false, false);
  ring.rotation.x = -Math.PI / 2; g.add(ring); st.ring = ring;
  W.group.add(g); st.group = g;
  const side = st.side; // lado del camino donde se levanta su escenario
  const off = st.boss ? new THREE.Vector3(0, 0, -2.6) : new THREE.Vector3(side * 4.2, 0, -0.6);
  const prop = buildProp(W, st.data.prop, st, off);
  g.add(prop);
  if (st.boss) {
    // barrera de luz que se disipa al vencer a los demás
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(R + 0.4, R + 0.4, 6, 48, 1, true), new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
      uniforms: { t: { value: 0 }, col: { value: new THREE.Color(th.accent).multiplyScalar(1.6) }, a: { value: 1 } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
      fragmentShader: 'uniform float t,a; uniform vec3 col; varying vec2 vUv; void main(){ float l = sin(vUv.x*120.0 + t*2.0)*0.5+0.5; float v = (1.0-vUv.y); float k = pow(v,2.0)*(0.35+0.65*l*l) + smoothstep(0.92,1.0,v)*0.6; gl_FragColor = vec4(col*k*a, k*a); }',
    }));
    bar.position.y = 3; g.add(bar); st.barrier = bar;
  }
}

function buildProp(W, kind, st, off) {
  const g = new THREE.Group(); g.position.copy(off); const th = W.theme; const acc = th.accent;
  const stone = std(0xd8ccb4, { roughness: 0.8 }); const brass = std(0xc8a050, { metalness: 0.9, roughness: 0.3 });
  const darkW = std(0x3a2414, { roughness: 0.7 });
  const add = (o) => (g.add(o), o);
  const col = (r) => W.colliders.push({ t: 1, x: st.pos.x + g.position.x, z: st.pos.z + g.position.z, r, h: 2, _prop: g });
  switch (kind) {
    case 'water': {
      add(mesh(new THREE.CylinderGeometry(1.5, 1.6, 0.6, 28, 1, true), stone, 0, 0.3, 0));
      add(mesh(new THREE.TorusGeometry(1.55, 0.12, 8, 28), stone, 0, 0.6, 0)).rotation.x = Math.PI / 2;
      const w = add(mesh(new THREE.CircleGeometry(1.5, 28), new THREE.MeshStandardMaterial({ color: 0x2a7ab8, roughness: 0.05, metalness: 0.3, emissive: 0x0a3050 }), 0, 0.5, 0, false));
      w.rotation.x = -Math.PI / 2;
      W.anim.push((t) => { w.material.emissiveIntensity = 0.8 + Math.sin(t * 2) * 0.3; });
      W.emitters.push({ x: 0, y: 0.6, z: 0, col: 0x9fd8ff, rate: 6, acc: 0, kind: 'mist', g });
      break;
    }
    case 'tetractys': {
      const tg = add(new THREE.Group()); tg.position.y = 2.2;
      let k = 0; for (let row = 0; row < 4; row++) for (let i = 0; i <= row; i++) { tg.add(mesh(new THREE.SphereGeometry(0.11, 10, 8), glow(acc, 4), (i - row / 2) * 0.42, (1.5 - row) * 0.4, 0, false, false)); k++; }
      const dod = add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.DodecahedronGeometry(0.9)), new THREE.LineBasicMaterial({ color: new THREE.Color(acc).multiplyScalar(2.5), toneMapped: false })));
      dod.position.y = 2.2;
      add(mesh(new THREE.CylinderGeometry(0.5, 0.6, 1, 8), stone, 0, 0.5, 0));
      W.anim.push((t) => { tg.rotation.y = t * 0.6; dod.rotation.set(t * 0.3, t * 0.45, 0); tg.position.y = 2.2 + Math.sin(t * 1.5) * 0.1; });
      break;
    }
    case 'fire': {
      add(mesh(new THREE.CylinderGeometry(0.25, 0.5, 1.2, 8), std(0x2a1a10, { metalness: 0.6, roughness: 0.4 }), 0, 0.6, 0));
      add(mesh(new THREE.CylinderGeometry(1.1, 0.5, 0.6, 16, 1, true), std(0x2a1a10, { metalness: 0.6, roughness: 0.4, side: THREE.DoubleSide }), 0, 1.5, 0));
      const fl = add(mesh(new THREE.ConeGeometry(0.75, 1.8, 10), glow(0xff7a20, 5, { transparent: true, opacity: 0.8, additive: true }), 0, 2.4, 0, false, false));
      W.emitters.push({ x: 0, y: 1.9, z: 0, col: 0xff8a30, rate: 40, acc: 0, kind: 'flame', g, big: true });
      if (W.lightBudget > 0) { const l = add(new THREE.PointLight(0xff7a30, 30, 16, 2)); l.position.y = 2.5; W.lightBudget--; W.anim.push((t) => (l.intensity = 26 + Math.sin(t * 19) * 5 + Math.sin(t * 7) * 3)); }
      W.anim.push((t) => fl.scale.set(1 + Math.sin(t * 12) * 0.15, 1 + Math.sin(t * 8.3) * 0.25, 1));
      break;
    }
    case 'sphere': {
      const s = add(mesh(new THREE.SphereGeometry(1.4, 48, 32), std(0xe8e4dc, { metalness: 1, roughness: 0.08 }), 0, 3.6, 0));
      add(mesh(new THREE.TorusGeometry(1.9, 0.04, 6, 64), glow(acc, 3), 0, 3.6, 0, false, false)).rotation.x = Math.PI / 2;
      W.anim.push((t) => { s.position.y = 3.6 + Math.sin(t * 0.8) * 0.2; s.rotation.y = t * 0.2; });
      break;
    }
    case 'podium': {
      add(steps(2.2, 2.2, 3, 0.3, std(0xd8ccb4)));
      add(mesh(new THREE.BoxGeometry(0.15, 1.8, 0.15), brass, 0, 1.8, 0));
      const beam = add(mesh(new THREE.BoxGeometry(1.8, 0.08, 0.08), brass, 0, 2.7, 0));
      const p1 = mesh(new THREE.CylinderGeometry(0.35, 0.2, 0.1, 16), brass, -0.85, -0.5, 0); const p2 = mesh(new THREE.CylinderGeometry(0.35, 0.2, 0.1, 16), brass, 0.85, -0.5, 0);
      beam.add(p1); beam.add(p2);
      W.anim.push((t) => { beam.rotation.z = Math.sin(t * 1.2) * 0.25; p1.rotation.z = p2.rotation.z = -beam.rotation.z; });
      col(1.2); break;
    }
    case 'hemlock': {
      add(mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.12, 20), stone, 0, 1, 0)); add(mesh(new THREE.CylinderGeometry(0.15, 0.3, 1, 10), stone, 0, 0.5, 0));
      const cup = add(mesh(new THREE.LatheGeometry([[0, 0], [0.12, 0], [0.04, 0.05], [0.04, 0.2], [0.22, 0.32], [0.26, 0.45]].map((p) => new THREE.Vector2(p[0], p[1])), 16), std(0x7a5a2a, { metalness: 0.4, roughness: 0.4 }), 0, 1.06, 0));
      add(mesh(new THREE.CircleGeometry(0.22, 16), glow(0x5aff8a, 2), 0, 1.48, 0, false, false)).rotation.x = -Math.PI / 2;
      col(0.8); break;
    }
    case 'cave': {
      const rock = std(0x4a4038, { roughness: 1, flat: true });
      const arch = add(mesh(new THREE.SphereGeometry(2.6, 10, 8, 0, Math.PI, 0, Math.PI / 2), rock, 0, 0, 0)); arch.rotation.y = Math.PI / 2 * st.side; arch.material.side = THREE.DoubleSide;
      const fire = add(mesh(new THREE.ConeGeometry(0.3, 0.7, 8), glow(0xff8a30, 5, { transparent: true, opacity: 0.85, additive: true }), 0, 0.35, 0, false, false));
      const shadows = add(new THREE.Group());
      for (let i = 0; i < 3; i++) { const s = mesh(new THREE.CircleGeometry(0.4, 12), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.75 }), 0, 1.3, 0, false, false); s.scale.set(0.7, 1.6, 1); shadows.add(s); }
      shadows.position.x = st.side * 2.3; shadows.rotation.y = -Math.PI / 2 * st.side;
      W.emitters.push({ x: 0, y: 0.5, z: 0, col: 0xff8a30, rate: 14, acc: 0, kind: 'flame', g });
      W.anim.push((t) => { shadows.children.forEach((s, i) => { s.position.x = Math.sin(t * 0.7 + i * 2) * 1.2; s.position.y = 1.3 + Math.sin(t * 2 + i) * 0.1; }); fire.scale.y = 1 + Math.sin(t * 13) * 0.2; });
      col(1.8); break;
    }
    case 'armillary': {
      const a = add(new THREE.Group()); a.position.y = 4;
      for (let i = 0; i < 4; i++) { const r = mesh(new THREE.TorusGeometry(1.6 - i * 0.12, 0.04, 6, 64), brass, 0, 0, 0, false); r.rotation.set(i * 0.8, i * 0.5, 0); a.add(r); }
      a.add(mesh(new THREE.SphereGeometry(0.35, 16, 12), glow(acc, 3), 0, 0, 0, false, false));
      add(mesh(new THREE.CylinderGeometry(0.15, 0.4, 2.4, 10), brass, 0, 1.2, 0));
      W.anim.push((t) => { a.children.forEach((c, i) => { c.rotation.x += 0.003 * (i + 1); c.rotation.y += 0.004 * (4 - i); }); });
      break;
    }
    case 'barrel': {
      const jar = add(mesh(new THREE.LatheGeometry([[0, 0], [0.6, 0.05], [1.3, 0.6], [1.45, 1.4], [1.2, 2.2], [0.75, 2.6], [0.8, 2.8]].map((p) => new THREE.Vector2(p[0], p[1])), 24), std(0xa0583a, { roughness: 0.9, side: THREE.DoubleSide }), 0, 1.3, 0));
      const sg = st.side; jar.rotation.z = sg * Math.PI / 2; jar.position.set(sg * 2.0, 1.35, 0);
      col(1.6); break;
    }
    case 'garden': {
      for (const [dx, dz] of [[0, -2], [0.6, 2], [1.4, 0]]) { const c = cypress(3.2); c.position.set(dx * st.side, 0, dz); c.scale.setScalar(0.7); g.add(c); }
      for (let i = 0; i < 12; i++) { const f = mesh(new THREE.SphereGeometry(0.08, 6, 4), glow(pick([0xff6a8a, 0xffe06a, 0xffffff]), 2), (Math.random() - 0.5) * 2.5, 0.12, (Math.random() - 0.5) * 3, false, false); g.add(f); }
      add(mesh(new THREE.BoxGeometry(0.6, 0.45, 2), stone, -0.6 * st.side, 0.22, 0));
      col(1.4); break;
    }
    case 'scales': {
      add(mesh(new THREE.CylinderGeometry(0.4, 0.6, 0.3, 12), stone, 0, 0.15, 0)); add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.6, 8), brass, 0, 1.6, 0));
      const beam = add(mesh(new THREE.BoxGeometry(2.4, 0.06, 0.06), brass, 0, 2.9, 0));
      for (const s of [-1, 1]) { const p = mesh(new THREE.CylinderGeometry(0.45, 0.25, 0.08, 16), brass, s * 1.1, -0.8, 0); beam.add(p); p.add(mesh(new THREE.SphereGeometry(0.15, 10, 8), glow(acc, 2.5), 0, 0.18, 0, false, false)); }
      W.anim.push((t) => { beam.rotation.z = Math.sin(t * 0.9) * 0.02; beam.children.forEach((p) => (p.rotation.z = -beam.rotation.z)); });
      col(0.8); break;
    }
    case 'throne': {
      const red = std(0x7d1f2b, { roughness: 0.7 }); const gold = std(0xd6a84a, { metalness: 0.9, roughness: 0.3 });
      add(steps(3, 2.4, 2, 0.3, std(0xe2d2b4)));
      add(mesh(new THREE.BoxGeometry(1.4, 0.3, 1.2), gold, 0, 1, 0)); add(mesh(new THREE.BoxGeometry(1.4, 2.4, 0.25), red, 0, 2.2, -0.55));
      for (const s of [-1, 1]) {
        add(mesh(new THREE.CylinderGeometry(0.05, 0.05, 4.5, 6), gold, s * 2.2, 2.25, 0.5));
        add(mesh(new THREE.BoxGeometry(0.9, 1.2, 0.05), red, s * 2.2, 3.6, 0.5));
        add(mesh(new THREE.ConeGeometry(0.2, 0.5, 4), gold, s * 2.2, 4.7, 0.5));
      }
      break;
    }
    case 'lectern': {
      add(mesh(new THREE.CylinderGeometry(0.12, 0.35, 1.3, 8), darkW, 0, 0.65, 0));
      const top = add(mesh(new THREE.BoxGeometry(1, 0.08, 0.8), darkW, 0, 1.35, 0)); top.rotation.x = 0.35;
      const page = add(mesh(new THREE.PlaneGeometry(0.85, 0.6), glow(0xffe8b0, 2.2), 0, 1.42, 0.02, false, false)); page.rotation.x = -Math.PI / 2 + 0.35;
      const heart = add(mesh(new THREE.SphereGeometry(0.22, 16, 12), glow(0xff5a5a, 3), 0, 2.6, 0, false, false));
      W.anim.push((t) => { const s = 1 + Math.pow(Math.max(0, Math.sin(t * 3.5)), 8) * 0.35; heart.scale.setScalar(s); heart.position.y = 2.6 + Math.sin(t) * 0.1; });
      col(0.6); break;
    }
    case 'astrolabe': {
      const a = add(new THREE.Group()); a.position.y = 2.4;
      put(a, mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.06, 48), brass, 0, 0, 0)).rotation.x = Math.PI / 2;
      const rete = mesh(new THREE.TorusGeometry(0.8, 0.03, 6, 48), glow(acc, 3), 0, 0, 0.06, false, false); a.add(rete);
      const al = mesh(new THREE.BoxGeometry(2, 0.06, 0.04), std(0x2a2018, { metalness: 0.8 }), 0, 0, 0.1); a.add(al);
      for (let i = 0; i < 12; i++) { const k = (i / 12) * TAU; a.add(mesh(new THREE.SphereGeometry(0.04, 6, 4), glow(0xffe0a0, 3), Math.cos(k) * 0.95, Math.sin(k) * 0.95, 0.06, false, false)); }
      add(mesh(new THREE.CylinderGeometry(0.08, 0.3, 1.8, 8), brass, 0, 0.9, 0));
      W.anim.push((t) => { al.rotation.z = t * 0.4; rete.rotation.z = -t * 0.15; a.rotation.y = Math.sin(t * 0.3) * 0.5; });
      break;
    }
    case 'razor': {
      const r = add(new THREE.Group()); r.position.y = 2.8;
      const blade = mesh(new THREE.BoxGeometry(2.6, 0.5, 0.04), std(0xdfe6ee, { metalness: 1, roughness: 0.12 }), 0, 0, 0); r.add(blade);
      r.add(mesh(new THREE.BoxGeometry(2.6, 0.04, 0.05), glow(0xbfe0ff, 4), 0, -0.25, 0, false, false));
      r.add(mesh(new THREE.BoxGeometry(1.6, 0.3, 0.12), darkW, -1.9, 0.1, 0));
      W.anim.push((t) => { r.rotation.y = t * 0.8; r.position.y = 2.8 + Math.sin(t * 1.3) * 0.15; });
      break;
    }
    case 'fiveways': {
      for (let i = 0; i < 5; i++) {
        const k = (i / 5) * TAU + Math.PI / 2; const x = Math.cos(k) * 3.4, z = Math.sin(k) * 3.4 + 2.6;
        const p = mesh(new THREE.CylinderGeometry(0.14, 0.14, 7, 12, 1, true), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffd890).multiplyScalar(1.1), transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }), x, 3.5, z, false, false); g.add(p);
        g.add(mesh(new THREE.CylinderGeometry(0.4, 0.5, 0.4, 10), stone, x, 0.2, z));
        W.anim.push((t) => (p.material.opacity = 0.28 + Math.sin(t * 2 + i) * 0.1));
      }
      break;
    }
    case 'ladder': {
      const lg = add(new THREE.Group());
      for (let i = 0; i < 9; i++) lg.add(mesh(new THREE.BoxGeometry(1.2, 0.06, 0.25), glow(acc, 1.2 + i * 0.35), 0, 0.4 + i * 0.5, -i * 0.12, false, false));
      for (const s of [-1, 1]) { const rail = mesh(new THREE.BoxGeometry(0.06, 5, 0.06), brass, s * 0.62, 2.5, -0.5); rail.rotation.x = 0.24; lg.add(rail); }
      W.anim.push((t) => lg.children.forEach((c, i) => { if (i < 9) c.position.x = Math.sin(t * 1.5 + i * 0.6) * 0.05; }));
      break;
    }
    case 'crown': {
      add(mesh(new THREE.BoxGeometry(1, 1.2, 1), std(0x2a2a30, { roughness: 0.5 }), 0, 0.6, 0));
      const cr = add(new THREE.Group()); cr.position.y = 1.55;
      cr.add(mesh(new THREE.CylinderGeometry(0.4, 0.38, 0.25, 16, 1, true), std(0xd6a84a, { metalness: 1, roughness: 0.25, side: THREE.DoubleSide })));
      for (let i = 0; i < 6; i++) { const k = (i / 6) * TAU; cr.add(mesh(new THREE.ConeGeometry(0.08, 0.3, 4), std(0xd6a84a, { metalness: 1, roughness: 0.25 }), Math.cos(k) * 0.38, 0.25, Math.sin(k) * 0.38)); cr.add(mesh(new THREE.SphereGeometry(0.05, 6, 4), glow(0xff3050, 3), Math.cos(k) * 0.4, 0.02, Math.sin(k) * 0.4, false, false)); }
      const dagger = add(mesh(new THREE.BoxGeometry(0.06, 1, 0.02), std(0xdfe6ee, { metalness: 1, roughness: 0.15 }), 0.3, 1.25, 0.2)); dagger.rotation.z = 0.5;
      W.anim.push((t) => (cr.rotation.y = t * 0.5));
      col(0.8); break;
    }
    case 'tower': {
      const tw = add(mesh(new THREE.CylinderGeometry(1.4, 1.6, 6, 16), std(0xffffff, { map: texStone('tw', 0xc8b490), roughness: 0.95 }), 0, 3, 0));
      add(mesh(new THREE.ConeGeometry(1.8, 2, 16), std(0x6a3a2a, { roughness: 0.8 }), 0, 7, 0));
      add(mesh(new THREE.PlaneGeometry(0.6, 1), glow(0xffc070, 2.5), -st.side * 1.41, 4.5, 0, false, false)).rotation.y = -st.side * Math.PI / 2;
      col(1.7); break;
    }
    case 'idols': {
      const names = 4; const mats = [std(0x6a7a5a, { roughness: 0.6, metalness: 0.4 }), std(0x5a6a7a, { roughness: 0.6, metalness: 0.4 })];
      for (let i = 0; i < names; i++) {
        const k = (i / names) * TAU + Math.PI / 4; const x = Math.cos(k) * 4.6, z = Math.sin(k) * 4.6 + 2.6;
        const s = new THREE.Group(); s.position.set(x, 0, z);
        s.add(mesh(new THREE.BoxGeometry(0.9, 1, 0.9), stone, 0, 0.5, 0));
        s.add(mesh(new THREE.ConeGeometry(0.4, 1.6, 4), mats[i % 2], 0, 1.8, 0, true));
        s.add(mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), mats[(i + 1) % 2], 0, 2.9, 0));
        s.add(mesh(new THREE.SphereGeometry(0.06, 6, 4), glow(0x3fe08a, 5), -0.15, 2.95, 0.31, false, false)); s.add(mesh(new THREE.SphereGeometry(0.06, 6, 4), glow(0x3fe08a, 5), 0.15, 2.95, 0.31, false, false));
        s.lookAt(st.pos.x, 0, st.pos.z + 2.6); s.rotation.x = 0; s.rotation.z = 0;
        g.add(s);
        W.colliders.push({ t: 1, x: st.pos.x + x, z: st.pos.z + z - 2.6, r: 0.7, h: 3 });
      }
      break;
    }
    case 'axes': {
      const ax = add(new THREE.Group()); ax.position.y = 1.2;
      [[0xff5050, [1, 0, 0]], [0x50ff80, [0, 1, 0]], [0x5080ff, [0, 0, 1]]].forEach(([c, d]) => {
        const m = mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.4, 6), glow(c, 3), d[0] * 1.2, d[1] * 1.2, d[2] * 1.2, false, false);
        if (d[0]) m.rotation.z = Math.PI / 2; if (d[2]) m.rotation.x = Math.PI / 2; ax.add(m);
        const tip = mesh(new THREE.ConeGeometry(0.09, 0.25, 8), glow(c, 3), d[0] * 2.45, d[1] * 2.45, d[2] * 2.45, false, false);
        if (d[0]) tip.rotation.z = -Math.PI / 2; if (d[2]) tip.rotation.x = Math.PI / 2; ax.add(tip);
      });
      const grid = new THREE.GridHelper(4, 8, 0x5a7aff, 0x2a3a6a); grid.position.y = 0.17; g.add(grid);
      const pt = mesh(new THREE.SphereGeometry(0.1, 10, 8), glow(0xffffff, 4), 0, 0, 0, false, false); ax.add(pt);
      W.anim.push((t) => { pt.position.set(Math.cos(t) * 1.2, 0.8 + Math.sin(t * 2) * 0.4, Math.sin(t) * 1.2); ax.rotation.y = t * 0.2; });
      break;
    }
    case 'lens': {
      const lg = add(new THREE.Group()); lg.position.y = 2.2;
      for (let i = 0; i < 3; i++) {
        const l = mesh(new THREE.SphereGeometry(0.5, 24, 12), new THREE.MeshPhysicalMaterial({ color: 0xcfe8ff, roughness: 0.02, metalness: 0, transmission: 0.9, thickness: 0.3, transparent: true, opacity: 0.6 }), (i - 1) * 0.9, 0, 0, false, false);
        l.scale.set(1, 1, 0.22); lg.add(l);
        lg.add(mesh(new THREE.TorusGeometry(0.5, 0.03, 6, 32), brass, (i - 1) * 0.9, 0, 0, false));
      }
      add(mesh(new THREE.BoxGeometry(1.6, 0.9, 0.9), darkW, 0, 0.45, 0));
      W.anim.push((t) => { lg.rotation.y = t * 0.4; lg.children.forEach((c, i) => (c.position.y = Math.sin(t * 1.4 + Math.floor(i / 2)) * 0.15)); });
      col(0.9); break;
    }
    case 'tablet': {
      const tb = add(mesh(new THREE.BoxGeometry(1.6, 2.2, 0.12), glow(0xf6f0e2, 1.35), 0, 2, 0, true, false));
      tb.rotation.y = Math.PI / 2;
      add(mesh(new THREE.BoxGeometry(0.4, 1, 0.4), darkW, 0, 0.5, 0));
      W.anim.push((t) => (tb.position.y = 2 + Math.sin(t) * 0.08));
      col(0.6); break;
    }
    case 'billiard': {
      const tbl = new THREE.Group(); g.add(tbl);
      tbl.add(mesh(new THREE.BoxGeometry(1.6, 0.12, 2.8), std(0x1f6a3a, { roughness: 0.95 }), 0, 0.95, 0));
      tbl.add(mesh(new THREE.BoxGeometry(1.9, 0.2, 3.1), darkW, 0, 0.85, 0));
      for (const [sx, sz] of [[-0.7, -1.2], [0.7, -1.2], [-0.7, 1.2], [0.7, 1.2]]) tbl.add(mesh(new THREE.BoxGeometry(0.15, 0.85, 0.15), darkW, sx, 0.42, sz));
      const b1 = mesh(new THREE.SphereGeometry(0.1, 14, 10), std(0xf6f2e8, { roughness: 0.2 }), 0, 1.11, 0); const b2 = mesh(new THREE.SphereGeometry(0.1, 14, 10), std(0xc0302a, { roughness: 0.2 }), 0, 1.11, 0);
      tbl.add(b1); tbl.add(b2);
      // bola blanca golpea a la roja: ciclo de 3 s (conjunción constante)
      W.anim.push((t) => { const c = (t % 3) / 3; if (c < 0.4) { b1.position.z = lerp(1.1, 0, c / 0.4); b2.position.z = -0.2; } else { b1.position.z = 0; b2.position.z = lerp(-0.2, -1.2, Math.min(1, (c - 0.4) / 0.35)); } });
      col(1.5); break;
    }
    case 'stars': {
      const sg = add(new THREE.Group()); sg.position.y = 5;
      const r = mulberry32(77);
      for (let i = 0; i < 70; i++) { const k = r() * TAU, rad = 3 + r() * 3, y = (r() - 0.5) * 3; sg.add(mesh(new THREE.OctahedronGeometry(0.05 + r() * 0.07, 0), glow(r() < 0.3 ? 0xbfd0ff : 0xfff2d0, 4), Math.cos(k) * rad, y, Math.sin(k) * rad, false, false)); }
      const clock = add(new THREE.Group()); clock.position.set(0, 2.6, 0);
      put(clock, mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.12, 40), std(0xf2ece0), 0, 0, 0)).rotation.x = Math.PI / 2;
      clock.add(mesh(new THREE.TorusGeometry(0.92, 0.07, 8, 40), brass));
      const hh = mesh(new THREE.BoxGeometry(0.05, 0.5, 0.03), std(0x111111), 0, 0.22, 0.08); const mh = mesh(new THREE.BoxGeometry(0.035, 0.75, 0.03), std(0x111111), 0, 0.34, 0.09);
      const hp = new THREE.Group(); hp.add(hh); const mp = new THREE.Group(); mp.add(mh); clock.add(hp); clock.add(mp); hp.position.z = mp.position.z = 0.01;
      add(mesh(new THREE.CylinderGeometry(0.08, 0.3, 2, 8), brass, 0, 1, 0));
      W.anim.push((t) => { sg.rotation.y = t * 0.05; mp.rotation.z = -t * 0.5; hp.rotation.z = -t * 0.04; });
      break;
    }
  }
  return g;
}

// ============================================================================
//  PORTAL
// ============================================================================
function buildPortal(W) {
  const th = W.theme; const g = new THREE.Group(); g.position.copy(W.portalPos);
  const stone = std(0x8a8070, { roughness: 0.8 });
  g.add(mesh(new THREE.CylinderGeometry(2.8, 3.1, 0.4, 32), stone, 0, 0.2, 0));
  const ringMat = new THREE.MeshStandardMaterial({ color: 0x6a6052, roughness: 0.5, metalness: 0.4, emissive: new THREE.Color(th.accent), emissiveIntensity: 0.05 });
  const ring = mesh(new THREE.TorusGeometry(2.3, 0.28, 12, 64), ringMat, 0, 2.9, 0); g.add(ring);
  for (let i = 0; i < 12; i++) { const k = (i / 12) * TAU; put(g, mesh(new THREE.BoxGeometry(0.25, 0.6, 0.5), stone, Math.cos(k) * 2.55, 2.9 + Math.sin(k) * 2.55, 0)).rotation.z = k; }
  const disc = new THREE.Mesh(new THREE.CircleGeometry(2.1, 64), new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide,
    uniforms: { t: { value: 0 }, open: { value: 0 }, c1: { value: new THREE.Color(th.accent).multiplyScalar(1.2) }, c2: { value: new THREE.Color(0xffffff) } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: `uniform float t, open; uniform vec3 c1, c2; varying vec2 vUv;
      void main(){ vec2 p = vUv - 0.5; float r = length(p) * 2.0; float a = atan(p.y, p.x);
        float sw = sin(a * 5.0 + r * 12.0 - t * 3.0) * 0.5 + 0.5; float sw2 = sin(a * 3.0 - r * 18.0 + t * 2.0) * 0.5 + 0.5;
        vec3 col = mix(c1, c2, pow(sw * sw2, 2.0)) * (1.8 - r) * 2.2;
        float core = smoothstep(0.35, 0.0, r) * 2.0;
        col += c2 * core;
        float al = smoothstep(1.0, 0.82, r) * open;
        gl_FragColor = vec4(col * open, al); }`,
  }));
  disc.position.y = 2.9; g.add(disc);
  const light = new THREE.PointLight(th.accent, 0, 14, 2); light.position.set(0, 2.9, 1.5); g.add(light);
  W.group.add(g);
  W.portal = { group: g, disc, ring, light, open: false, k: 0 };
  W.colliders.push({ t: 0, x0: -2.9, x1: -2.0, z0: -41.4, z1: -40.6, h: 6 }, { t: 0, x0: 2.0, x1: 2.9, z0: -41.4, z1: -40.6, h: 6 });
}

// ============================================================================
//  NUBES Y HIERBA
// ============================================================================
function cloudTexture() {
  return cachedTex('cloud', () => {
    const c = document.createElement('canvas'); c.width = 256; c.height = 128; const ctx = c.getContext('2d');
    const r = mulberry32(99);
    for (let i = 0; i < 26; i++) {
      const x = 40 + r() * 176, y = 50 + r() * 40 - Math.abs(x - 128) * 0.12, rad = 18 + r() * 30;
      const g = ctx.createRadialGradient(x, y, 0, x, y, rad); g.addColorStop(0, 'rgba(255,255,255,0.55)'); g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, rad, 0, TAU); ctx.fill();
    }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  });
}
function addClouds(W, idx) {
  const th = W.theme; const g = new THREE.Group(); const r = mulberry32(idx * 7 + 5);
  const tint = new THREE.Color(th.sky[1]).lerp(new THREE.Color(0xffffff), 0.55);
  for (let i = 0; i < 16; i++) {
    const m = new THREE.SpriteMaterial({ map: cloudTexture(), color: tint, transparent: true, opacity: 0.55 + r() * 0.35, depthWrite: false, fog: false });
    const sp = new THREE.Sprite(m); const a = r() * TAU, rad = 170 + r() * 150;
    sp.position.set(Math.cos(a) * rad, 45 + r() * 70, Math.sin(a) * rad); const sc = 70 + r() * 90; sp.scale.set(sc, sc * 0.45, 1);
    g.add(sp);
  }
  W.group.add(g); W.anim.push((t, dt) => (g.rotation.y += dt * 0.006));
}
function addGrass(W, idx, sp) {
  const n = 1400; const geo = new THREE.ConeGeometry(0.06, 0.55, 3); geo.translate(0, 0.27, 0);
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 });
  const inst = new THREE.InstancedMesh(geo, mat, n); const r = mulberry32(idx * 13 + 1);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), sc = new THREE.Vector3(); const col = new THREE.Color();
  const base = idx === 0 ? [0xb8a060, 0x8a8a50, 0xc8b070] : [0x6a7a40, 0x8a8a50, 0x5a6a38];
  let k = 0;
  for (let i = 0; i < n * 3 && k < n; i++) {
    // matas agrupadas, fuera del camino central y de los estrados
    const cx = (r() * 2 - 1) * 23, cz = -45 + r() * 80;
    if (Math.abs(cx) < 4.5 || W._near(cx, cz, 1.2)) continue;
    for (let j = 0; j < 6 && k < n; j++, k++) {
      v.set(cx + (r() - 0.5) * 0.7, 0, cz + (r() - 0.5) * 0.7);
      e.set((r() - 0.5) * 0.5, r() * TAU, (r() - 0.5) * 0.5); q.setFromEuler(e); const h = 0.6 + r() * 0.9; sc.set(1, h, 1);
      m4.compose(v, q, sc); inst.setMatrixAt(k, m4); inst.setColorAt(k, col.set(base[Math.floor(r() * 3)]).multiplyScalar(0.8 + r() * 0.4));
    }
  }
  inst.count = k; inst.receiveShadow = true; W.group.add(inst);
}

// ============================================================================
//  PUERTAS DE LUZ DEL CAMINO
// ============================================================================
function buildGate(W, z, i) {
  const th = W.theme; const g = new THREE.Group(); g.position.set(0, 0, z);
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    uniforms: { t: { value: 0 }, col: { value: new THREE.Color(th.accent).multiplyScalar(1.4) }, a: { value: 1 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `uniform float t, a; uniform vec3 col; varying vec2 vUv;
      void main(){ float x = vUv.x * 16.0; float strand = pow(abs(sin(x * 1.7 + sin(vUv.y * 3.0 + t) * 0.6)), 18.0);
        float wave = 0.5 + 0.5 * sin(vUv.y * 14.0 - t * 3.0 + x * 0.3);
        float base = smoothstep(0.0, 0.08, vUv.y) * (1.0 - vUv.y);
        float k = (0.10 + strand * 0.55 + wave * 0.08) * base;
        gl_FragColor = vec4(col * k * a, k * a); }`,
  });
  const curtain = new THREE.Mesh(new THREE.PlaneGeometry(16, 6.5), mat); curtain.position.y = 3.25; g.add(curtain);
  const line = mesh(new THREE.BoxGeometry(16, 0.05, 0.25), glow(th.accent, 2.5), 0, 0.03, 0, false, false); g.add(line);
  for (const x of [-4, 4]) { const p = mesh(new THREE.CylinderGeometry(0.22, 0.32, 3.4, 8), std(0x8a8070, { roughness: 0.7 }), x, 1.7, 0); g.add(p); g.add(mesh(new THREE.SphereGeometry(0.25, 12, 8), glow(th.accent, 4), x, 3.6, 0, false, false)); }
  W.group.add(g);
  const col = { t: 0, x0: -24, x1: 24, z0: z - 0.35, z1: z + 0.35, h: 99 }; W.colliders.push(col);
  const gate = { z, i, group: g, mat, col, open: false };
  W.anim.push((t, dt) => {
    mat.uniforms.t.value = t;
    if (gate.open) { mat.uniforms.a.value = Math.max(0, mat.uniforms.a.value - dt * 0.9); line.scale.x = Math.max(0.001, mat.uniforms.a.value); if (mat.uniforms.a.value <= 0) g.visible = false; }
  });
  return gate;
}
function openGate(W, i) {
  const gate = W.gates && W.gates[i]; if (!gate || gate.open) return;
  gate.open = true; const k = W.colliders.indexOf(gate.col); if (k >= 0) W.colliders.splice(k, 1);
}
