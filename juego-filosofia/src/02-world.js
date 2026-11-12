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
    hemi: [0x6a7ab0, 0x3a2c20, 0.55], fog: [0x0e1020, 0.02], exposure: 1.45, stars: true, indoor: true,
    accent: 0xffcf6a, enemy: { col: 0xd4a017, core: 0x14100a, shell: 'cross' }, lampCol: 0xffb060,
  },
  { // V · Renacimiento: mañana toscana
    sky: [0x4f8fd6, 0xf6dcb2, 0x9a8a70], sunDir: [-0.5, 0.55, 0.45], sunCol: 0xffe8c8, sunInt: 2.4, sunDisk: 0xfff0d8,
    hemi: [0xd8e6ff, 0xa08a6a, 0.7], fog: [0xe8d6bc, 0.0085], exposure: 1.05, stars: false,
    accent: 0x5fd18a, enemy: { col: 0x3fe08a, core: 0x0a2014, shell: 'cube' }, lampCol: 0xffd9a0,
  },
  { // VI · Modernidad: biblioteca-observatorio bajo las estrellas
    sky: [0x03051a, 0x1a2350, 0x05050a], sunDir: [0.3, 0.7, -0.4], sunCol: 0x8fa8ff, sunInt: 0.9, sunDisk: 0x000000,
    hemi: [0x8a96cc, 0x8a6a48, 1.2], fog: [0x0c1230, 0.012], exposure: 1.5, stars: true, moon: true,
    accent: 0x9ab8ff, enemy: { col: 0x8a5cff, core: 0x05030f, shell: 'eye' }, lampCol: 0xffc070,
  },
  { // VII · Siglo XIX: atardecer dorado entre hierro, vidrio y montañas
    sky: [0x2e3a78, 0xffa872, 0x4a3438], sunDir: [0.15, 0.1, -1], sunCol: 0xffb47a, sunInt: 2.5, sunDisk: 0xffa060,
    hemi: [0xffd2b4, 0x4a3a40, 0.62], fog: [0xe0a07e, 0.0085], exposure: 1.15, stars: false,
    accent: 0xffa05a, enemy: { col: 0xff7a2a, core: 0x200a04, shell: 'cube' }, lampCol: 0xffc080,
  },
  { // VIII · Época contemporánea: noche azul con la Tierra en el cielo
    sky: [0x040a26, 0x3d5fae, 0x0a0c18], sunDir: [-0.3, 0.55, -0.6], sunCol: 0xa8c0ff, sunInt: 0.85, sunDisk: 0x000000,
    hemi: [0x9ab4f0, 0x3a3048, 1.05], fog: [0x1c2850, 0.0062], exposure: 1.4, stars: true,
    accent: 0x6ae0ff, enemy: { col: 0x40e0ff, core: 0x020814, shell: 'icosa' }, lampCol: 0xd8ecff,
  },
  { // IX · América Latina: mañana dorada entre portales, jacarandas y los Andes
    sky: [0x2a6ad0, 0xffe2b8, 0x8a6a50], sunDir: [-0.45, 0.42, -0.6], sunCol: 0xfff0d0, sunInt: 2.5, sunDisk: 0xfff0c8,
    hemi: [0xd8e8ff, 0xa07a50, 0.78], fog: [0xf0d8b8, 0.0072], exposure: 1.08, stars: false,
    accent: 0xff5a8a, enemy: { col: 0xff4a8a, core: 0x200410, shell: 'octa' }, lampCol: 0xffd090,
  },
  { // X · Mexicas: mañana luminosa sobre el lago
    sky: [0x2a70d8, 0xd8ecff, 0x7a8a7a], sunDir: [0.4, 0.6, -0.5], sunCol: 0xfff4e0, sunInt: 2.5, sunDisk: 0xfff2d8,
    hemi: [0xd8e8ff, 0x8a7a5a, 0.8], fog: [0xd8e4ec, 0.0068], exposure: 1.05, stars: false,
    accent: 0x2ad0c0, enemy: { col: 0x2ad0c0, core: 0x04201c, shell: 'octa' }, lampCol: 0xffd090,
  },
  { // XI · Incas: cielo andino intenso
    sky: [0x1a50c0, 0xbfe0ff, 0x6a7a5a], sunDir: [-0.3, 0.7, -0.4], sunCol: 0xfff8e8, sunInt: 2.7, sunDisk: 0xfffae0,
    hemi: [0xcfe4ff, 0x6a7a4a, 0.8], fog: [0xc8dcf0, 0.006], exposure: 1.02, stars: false,
    accent: 0xffc040, enemy: { col: 0xffc040, core: 0x201404, shell: 'cube' }, lampCol: 0xffd090,
  },
  { // XII · Mapuche: atardecer húmedo entre araucarias
    sky: [0x2a3a6a, 0xf0b890, 0x2a3a2a], sunDir: [0.5, 0.15, -0.8], sunCol: 0xffc8a0, sunInt: 2.2, sunDisk: 0xffb080,
    hemi: [0xd0c8e0, 0x3a4a2a, 0.7], fog: [0xc8b8b0, 0.011], exposure: 1.15, stars: false,
    accent: 0x5ab0ff, enemy: { col: 0x5ab0ff, core: 0x041020, shell: 'torus' }, lampCol: 0xffb070,
  },
  { // XIII · China: amanecer rosado entre montañas de niebla
    sky: [0x4a6ab0, 0xffd8d0, 0x6a6a70], sunDir: [-0.6, 0.25, -0.6], sunCol: 0xffe0d0, sunInt: 2.2, sunDisk: 0xffd0b0,
    hemi: [0xe0d8f0, 0x6a6058, 0.75], fog: [0xe8c8c8, 0.0068], exposure: 0.98, stars: false,
    accent: 0xff4a3a, enemy: { col: 0xff4a3a, core: 0x200404, shell: 'icosa' }, lampCol: 0xffb080,
  },
  { // XIV · India: atardecer anaranjado
    sky: [0x3a3a8a, 0xffa860, 0x6a4a3a], sunDir: [0.6, 0.18, -0.7], sunCol: 0xffb070, sunInt: 2.5, sunDisk: 0xffa050,
    hemi: [0xffd8b8, 0x6a4a3a, 0.7], fog: [0xf0b890, 0.0085], exposure: 1.12, stars: false,
    accent: 0xff9a1a, enemy: { col: 0xff9a1a, core: 0x201004, shell: 'torus' }, lampCol: 0xffb050,
  },
  { // XV · África: sabana dorada al caer la tarde
    sky: [0x3a3a7a, 0xffb868, 0x6a4a2a], sunDir: [-0.5, 0.15, -0.85], sunCol: 0xffb060, sunInt: 2.6, sunDisk: 0xff9a40,
    hemi: [0xffd8b0, 0x7a5a3a, 0.72], fog: [0xe8b080, 0.0078], exposure: 1.12, stars: false,
    accent: 0xffb020, enemy: { col: 0xffb020, core: 0x201404, shell: 'cube' }, lampCol: 0xffc070,
  },
  { // XVI · Sumer: atardecer de polvo dorado entre dos ríos
    sky: [0x2a3a6a, 0xffc890, 0x8a6a4a], sunDir: [0.45, 0.18, -0.85], sunCol: 0xffc070, sunInt: 2.5, sunDisk: 0xffa850,
    hemi: [0xffe0b8, 0x8a6a48, 0.74], fog: [0xe8c098, 0.0072], exposure: 1.1, stars: false,
    accent: 0x4aa8d8, enemy: { col: 0x4aa8d8, core: 0x081a28, shell: 'cube' }, lampCol: 0xffc878,
  },
  { // XVII · Bagdad: anochecer azul con estrellas y faroles
    sky: [0x0a1238, 0x3a4a8a, 0x8a5a4a], sunDir: [-0.3, 0.12, -0.9], sunCol: 0xa8b8ff, sunInt: 1.2, sunDisk: 0xffe8c0,
    hemi: [0x8a9ad8, 0x4a3a30, 0.62], fog: [0x2a3060, 0.0085], exposure: 1.18, stars: true,
    accent: 0x3ad8b0, enemy: { col: 0x3ad8b0, core: 0x04201a, shell: 'cube' }, lampCol: 0xffc070, indoor: false,
  },
  { // XVIII · Jardín de los poetas: crepúsculo rosa y violeta con la primera estrella
    sky: [0x2a2a6a, 0xffa8b8, 0x6a4a6a], sunDir: [0.5, 0.1, -0.85], sunCol: 0xffb0a0, sunInt: 2.0, sunDisk: 0xffd0b0,
    hemi: [0xffd8e8, 0x4a5a3a, 0.7], fog: [0xe8b0c0, 0.0075], exposure: 1.12, stars: true,
    accent: 0xff7aa8, enemy: { col: 0xff7aa8, core: 0x280818, shell: 'cube' }, lampCol: 0xffc8a0,
  },
  { // XIX · Taller de los científicos: tarde clara y luz de laboratorio
    sky: [0x3a6aa8, 0xd8e8f8, 0x8a8a8a], sunDir: [-0.4, 0.5, -0.75], sunCol: 0xfff0d8, sunInt: 2.6, sunDisk: 0xfff4e0,
    hemi: [0xe0ecff, 0x5a5a5a, 0.78], fog: [0xc8d4e4, 0.0065], exposure: 1.08, stars: false,
    accent: 0x58c8ff, enemy: { col: 0x58c8ff, core: 0x061a28, shell: 'cube' }, lampCol: 0xd8f0ff,
  },
  { // XX · Japón del zen: mañana de primavera, cerezos en flor
    sky: [0x6a9ad8, 0xffe0e8, 0x9a8a8a], sunDir: [0.35, 0.35, -0.85], sunCol: 0xfff0e0, sunInt: 2.3, sunDisk: 0xfff0e8,
    hemi: [0xffe8f0, 0x5a6a4a, 0.74], fog: [0xf0dce4, 0.0072], exposure: 1.1, stars: false,
    accent: 0xff5a6a, enemy: { col: 0xff5a6a, core: 0x280a0e, shell: 'cube' }, lampCol: 0xffd8a0,
  },
  { // XXI · El Norte vikingo: crepúsculo frío con aurora boreal
    sky: [0x0a1a2a, 0x3a5a6a, 0x5a5a6a], sunDir: [-0.5, 0.08, -0.85], sunCol: 0xffc8a0, sunInt: 1.4, sunDisk: 0xffd8b0,
    hemi: [0x9ac8d8, 0x3a3a30, 0.66], fog: [0x3a4a58, 0.0095], exposure: 1.16, stars: true,
    accent: 0x5affb0, enemy: { col: 0x5affb0, core: 0x04201a, shell: 'cube' }, lampCol: 0xffb060,
  },
  { // XXII · La antigua Persia: tarde dorada sobre Persépolis, cielo turquesa
    sky: [0x3a8ab8, 0xffe0b0, 0xc89a6a], sunDir: [0.45, 0.32, -0.83], sunCol: 0xffe2b8, sunInt: 2.4, sunDisk: 0xfff0d0,
    hemi: [0xffe8c8, 0x8a6a48, 0.74], fog: [0xf0d0a8, 0.0075], exposure: 1.1, stars: false,
    accent: 0x3ad8d0, enemy: { col: 0x3ad8d0, core: 0x062420, shell: 'octa' }, lampCol: 0xffc070,
  },
  { // XXIII · Los librepensadores: noche estrellada sobre un ateneo con observatorio
    sky: [0x060a1e, 0x1a2a5a, 0x2a2a3a], sunDir: [-0.4, 0.5, -0.75], sunCol: 0xb8c8f0, sunInt: 0.9, sunDisk: 0xe8f0ff,
    hemi: [0x8aa0d8, 0x2a2a38, 0.5], fog: [0x1a2448, 0.0082], exposure: 1.0, stars: true,
    accent: 0x8ab8ff, enemy: { col: 0x8ab8ff, core: 0x0a1430, shell: 'octa' }, lampCol: 0xfff0c8,
  },
  { // XXIV · La casa de la fe: atardecer dorado en un claustro de muchas tradiciones
    sky: [0x4a6aa8, 0xffc890, 0xb88a6a], sunDir: [0.5, 0.18, -0.85], sunCol: 0xffd0a0, sunInt: 2.3, sunDisk: 0xffe0b8,
    hemi: [0xffe0c0, 0x7a5a48, 0.72], fog: [0xe8c0a0, 0.0078], exposure: 1.12, stars: false,
    accent: 0xffd070, enemy: { col: 0xffd070, core: 0x2a1a06, shell: 'cube' }, lampCol: 0xffc880,
  },
  { // XXV · Las pensadoras: tarde de primavera en un jardín con invernadero
    sky: [0x6aa0e0, 0xf8d8e8, 0xb8c8a8], sunDir: [-0.5, 0.55, -0.6], sunCol: 0xfff0e0, sunInt: 2.6, sunDisk: 0xfff8f0,
    hemi: [0xe8e0ff, 0x6a7a5a, 0.8], fog: [0xe8d8e8, 0.007], exposure: 1.08, stars: false,
    accent: 0xc89aff, enemy: { col: 0xc89aff, core: 0x24103a, shell: 'octa' }, lampCol: 0xffe0c0,
  },
  { // XXVI · La asamblea de la justicia: mediodía luminoso sobre piedra blanca
    sky: [0x3a7ad8, 0xc8e0f8, 0xe8e0c8], sunDir: [0.3, 0.9, -0.3], sunCol: 0xfff8e8, sunInt: 3.0, sunDisk: 0xffffff,
    hemi: [0xd8e8ff, 0x8a7a5a, 0.75], fog: [0xd8e4f0, 0.0055], exposure: 1.0, stars: false,
    accent: 0xe8b848, enemy: { col: 0xe8b848, core: 0x2a1a06, shell: 'cube' }, lampCol: 0xffe0a0,
  },
  { // XXVII · La montaña de los místicos: amanecer con niebla entre las cumbres
    sky: [0x5a7ab8, 0xffb88a, 0xd8c8c8], sunDir: [0.7, 0.14, -0.7], sunCol: 0xffc8a0, sunInt: 2.2, sunDisk: 0xfff0d0,
    hemi: [0xd8d8f0, 0x5a5048, 0.75], fog: [0xe8d8d8, 0.012], exposure: 1.1, stars: false,
    accent: 0xff9a3a, enemy: { col: 0xff9a3a, core: 0x2a1004, shell: 'octa' }, lampCol: 0xffb060,
  },
  { // XXVIII · La escuela de la mente: mañana de otoño en un patio de escuela
    sky: [0x5a9ae8, 0xffe0b0, 0xc8b898], sunDir: [-0.4, 0.5, -0.7], sunCol: 0xfff0d0, sunInt: 2.6, sunDisk: 0xfff8e0,
    hemi: [0xffe8c8, 0x7a5a3a, 0.8], fog: [0xf0dcc0, 0.0068], exposure: 1.06, stars: false,
    accent: 0xffa040, enemy: { col: 0xffa040, core: 0x2a1404, shell: 'cube' }, lampCol: 0xffe0b0,
  },
  { // XXIX · El bosque de la Tierra: rayos de sol entre árboles gigantes
    sky: [0x6aa8d8, 0xd8f0d0, 0x8aa878], sunDir: [0.3, 0.75, -0.55], sunCol: 0xfff4d0, sunInt: 2.4, sunDisk: 0xfffbe8,
    hemi: [0xd8f0d0, 0x3a4a2a, 0.85], fog: [0xb8d0b0, 0.011], exposure: 1.08, stars: false,
    accent: 0x7ad860, enemy: { col: 0x7ad860, core: 0x0a2006, shell: 'octa' }, lampCol: 0xffe8b0,
  },
  { // XXX · La torre de los números: crepúsculo violeta con estrellas
    sky: [0x1a1a4a, 0x8a5aa8, 0xe8a87a], sunDir: [-0.6, 0.12, -0.8], sunCol: 0xffc8a0, sunInt: 1.8, sunDisk: 0xffe0c0,
    hemi: [0xc8b8ff, 0x3a2a4a, 0.7], fog: [0x5a4a7a, 0.008], exposure: 1.12, stars: true,
    accent: 0x6ae0ff, enemy: { col: 0x6ae0ff, core: 0x06202a, shell: 'octa' }, lampCol: 0xffe0a0,
  },
  { // XXXI · El taller de la belleza: tarde dorada en un patio de artistas
    sky: [0x5a8ad8, 0xffd8a0, 0xd8b890], sunDir: [-0.6, 0.35, -0.7], sunCol: 0xffe0b0, sunInt: 2.6, sunDisk: 0xfff0d0,
    hemi: [0xffe8d0, 0x7a5a3a, 0.8], fog: [0xf0d8b8, 0.0065], exposure: 1.08, stars: false,
    accent: 0xff6a8a, enemy: { col: 0xff6a8a, core: 0x2a0a14, shell: 'octa' }, lampCol: 0xffd8a0,
  },
  { // XXXII · La gran asamblea de los pueblos: atardecer sobre la pradera
    sky: [0x3a4a9a, 0xff9a5a, 0xc87a5a], sunDir: [0.75, 0.12, -0.65], sunCol: 0xffb070, sunInt: 2.3, sunDisk: 0xffd090,
    hemi: [0xffc8a0, 0x5a4030, 0.72], fog: [0xe8a880, 0.007], exposure: 1.1, stars: false,
    accent: 0xffb040, enemy: { col: 0xffb040, core: 0x2a1404, shell: 'cube' }, lampCol: 0xff9a40,
  },
  { // XXXIII · La casa de los cuidados: mañana serena y clara
    sky: [0x7ab0e8, 0xe8f4f0, 0xc8d8c8], sunDir: [0.4, 0.7, -0.5], sunCol: 0xfffaf0, sunInt: 2.5, sunDisk: 0xffffff,
    hemi: [0xe8f4ff, 0x7a8a7a, 0.85], fog: [0xe0ece8, 0.0065], exposure: 1.02, stars: false,
    accent: 0x6ad8b0, enemy: { col: 0x6ad8b0, core: 0x062a20, shell: 'octa' }, lampCol: 0xfff0d0,
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
// material para montañas lejanas: sin niebla, pero con su color ya mezclado con el del cielo (perspectiva aérea),
// para que la roca y la nieve se lean en lugar de volverse una mancha blanca
function farStd(W, hex, k, o = {}) { const c = new THREE.Color(hex).lerp(new THREE.Color(W.theme.fog[0]), k); const m = std(c.getHex(), { roughness: 1, flat: true, ...o }); m.fog = false; return m; }
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
function withRot(m, ax, v) { m.rotation[ax] = v; return m; }
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
// ventanas encendidas de los rascacielos
function windowsTexture() {
  return cachedTex('windows', () => {
    const c = document.createElement('canvas'); c.width = 64; c.height = 64; const x = c.getContext('2d'); const r = mulberry32(5);
    x.fillStyle = '#05070c'; x.fillRect(0, 0, 64, 64);
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { if (r() < 0.45) continue; x.fillStyle = ['#ffd890', '#fff0c8', '#a8d0ff', '#ffc070'][Math.floor(r() * 4)]; x.globalAlpha = 0.5 + r() * 0.5; x.fillRect(i * 16 + 3, j * 16 + 4, 10, 9); }
    const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; t.magFilter = THREE.NearestFilter; return t;
  });
}
// la Tierra: océanos, continentes y nubes
function earthTexture() {
  return cachedTex('earth', () => {
    const c = document.createElement('canvas'); c.width = 512; c.height = 256; const x = c.getContext('2d'); const r = mulberry32(42);
    const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#dfe8f4'); g.addColorStop(0.1, '#1f4f9a'); g.addColorStop(0.5, '#1a5aa8'); g.addColorStop(0.9, '#1f4f9a'); g.addColorStop(1, '#e8eef6');
    x.fillStyle = g; x.fillRect(0, 0, 512, 256);
    for (let i = 0; i < 26; i++) { const cx = r() * 512, cy = 50 + r() * 156; x.fillStyle = ['#3f7a3a', '#5a8a3a', '#b89a5a', '#4a7a40'][Math.floor(r() * 4)]; for (let k = 0; k < 14; k++) { x.beginPath(); x.arc(cx + (r() - 0.5) * 70, cy + (r() - 0.5) * 40, 6 + r() * 16, 0, Math.PI * 2); x.fill(); } }
    x.globalAlpha = 0.55; x.fillStyle = '#ffffff'; for (let i = 0; i < 70; i++) { x.beginPath(); x.ellipse(r() * 512, r() * 256, 10 + r() * 30, 3 + r() * 6, 0, 0, Math.PI * 2); x.fill(); }
    return c;
  });
}
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
  if (n === 5) return [[-12, 22], [12, 12], [-12, 2], [12, -8], [-12, -18]];
  if (n >= 6) return [[-12, 24], [12, 16], [-12, 7], [12, -2], [-12, -11], [12, -20]].slice(0, n);
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
// horizonte pintado (img/h-<época>.jpg): un cilindro lejano que se funde con el cielo hacia arriba
let HORIZON_FADE = null;
function addHorizon(W, idx) {
  new THREE.TextureLoader().load('img/h-' + idx + '.jpg', (tex) => {
    if (!W.group.parent && W.disposed) return;
    tex.colorSpace = THREE.SRGBColorSpace; tex.wrapS = THREE.MirroredRepeatWrapping; tex.repeat.set(2, 1); tex.anisotropy = 4;
    if (!HORIZON_FADE) { const c = document.createElement('canvas'); c.width = 4; c.height = 256; const g = c.getContext('2d'); const gr = g.createLinearGradient(0, 0, 0, 256);
      gr.addColorStop(0, 'rgba(0,0,0,1)'); gr.addColorStop(0.32, 'rgba(0,0,0,1)'); gr.addColorStop(0.62, 'rgba(255,255,255,1)'); gr.addColorStop(1, 'rgba(255,255,255,1)'); g.fillStyle = gr; g.fillRect(0, 0, 4, 256); HORIZON_FADE = new THREE.CanvasTexture(c); }
    const R = 400, H = (Math.PI * R * 9) / 21;
    const mat = new THREE.MeshBasicMaterial({ map: tex, alphaMap: HORIZON_FADE, transparent: true, depthWrite: false, fog: false, side: THREE.BackSide, toneMapped: false, color: 0xe8e8e8 });
    const cyl = new THREE.Mesh(new THREE.CylinderGeometry(R, R, H, 96, 1, true), mat); cyl.position.y = H / 2 - H * 0.3; cyl.rotation.y = Math.PI; cyl.renderOrder = -9; cyl.frustumCulled = false;
    W.group.add(cyl); W.horizon = cyl;
  }, undefined, () => {});
}
// muros pintados (img/w-<época>.jpg): los muros, columnas y edificios grandes de cada escenario
// reciben la textura de su época, teñida suavemente con su color original
function paintWalls(W, idx) {
  const targets = [];
  W.group.traverse((o) => {
    if (!o.isMesh || !o.geometry || !o.material || Array.isArray(o.material)) return;
    const m = o.material, g = o.geometry, pr = g.parameters || {}; const sc = o.scale;
    if (!m.isMeshStandardMaterial || m.map || m.transparent || m.metalness > 0.5 || (m.emissive && m.emissive.getHex() !== 0 && m.emissiveIntensity > 0)) return;
    if (g.type === 'BoxGeometry') { const w = pr.width * sc.x, h = pr.height * sc.y, d = pr.depth * sc.z; if (h >= 2.2 && Math.max(w, d) >= 1.4) targets.push([o, 'box', w, h, d]); }
    else if (g.type === 'CylinderGeometry') { const h = pr.height * sc.y, r = Math.max(pr.radiusTop, pr.radiusBottom) * Math.max(sc.x, sc.z); if (h >= 2.5 && r >= 0.2) targets.push([o, 'cyl', r, h]); }
  });
  if (!targets.length) return;
  { const tex = new THREE.TextureLoader().load('img/w-' + idx + '.jpg');
    tex.colorSpace = THREE.SRGBColorSpace; tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.anisotropy = 8;
    W.paintTex = tex; const mats = new Map(); const T = 3.2; // metros por baldosa de textura
    for (const [o, kind, a, b, c] of targets) {
      let nm = mats.get(o.material); if (!nm) { nm = o.material.clone(); nm.map = tex; nm.color = o.material.color.clone().lerp(new THREE.Color(0xffffff), 0.62); nm.needsUpdate = true; mats.set(o.material, nm); (W.paintMats = W.paintMats || []).push(nm); }
      const g = o.geometry.clone(); const uv = g.attributes.uv;
      if (kind === 'box') { const [w, h, d] = [a, b, c]; const per = uv.count / 6; const dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
        for (let f = 0; f < 6; f++) for (let k = 0; k < per; k++) { const i = f * per + k; uv.setXY(i, uv.getX(i) * dims[f][0] / T, uv.getY(i) * dims[f][1] / T); } }
      else { const circ = TAU * a; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * Math.max(1, Math.round(circ / T)), uv.getY(i) * b / T); }
      uv.needsUpdate = true; o.geometry = g; o.material = nm;
    }
  }
}
// rendimiento: une en una sola malla la decoración estática del escenario que comparte material.
// Se detecta lo que se mueve ejecutando las animaciones en dos instantes y viendo qué cambió.
function mergeStatic(W, n0, n1) {
  const roots = W.group.children.slice(n0, n1); const cand = [];
  const skip = new Set([W.groundMesh, ...(W.floors || []).map((f) => f.mesh).filter(Boolean)]);
  for (const r of roots) r.traverse((o) => { if (o.isMesh && !o.isInstancedMesh && !o.isSkinnedMesh && !skip.has(o) && !Array.isArray(o.material) && !o.material.transparent && o.geometry && o.geometry.attributes.position && !o.userData.noMerge) cand.push(o); });
  if (cand.length < 2) return;
  W.group.updateMatrixWorld(true);
  const snap = () => cand.map((o) => { o.updateMatrixWorld(true); return o.matrixWorld.elements.slice(0).concat([o.visible ? 1 : 0]); });
  const a = snap(); for (const f of W.anim) try { f(1.37, 0.016); } catch (e) { /* nada */ }
  const b = snap(); for (const f of W.anim) try { f(4.11, 0.016); } catch (e) { /* nada */ }
  const c = snap();
  const moved = (i) => { for (let k = 0; k < a[i].length; k++) if (Math.abs(a[i][k] - b[i][k]) > 1e-5 || Math.abs(a[i][k] - c[i][k]) > 1e-5) return true; return false; };
  // un grupo con alguna pieza que se mueve queda entero sin tocar (las animaciones a veces usan children[n])
  const tainted = new Set(); cand.forEach((o, i) => { if (!moved(i)) return; let p = o.parent; while (p && p !== W.group) { tainted.add(p); p = p.parent; } });
  const groups = new Map();
  cand.forEach((o, i) => { if (moved(i) || !o.visible) return; { let p = o.parent; while (p && p !== W.group) { if (tainted.has(p)) return; p = p.parent; } } let p = o.parent, vis = true; while (p && p !== W.group) { if (!p.visible) vis = false; p = p.parent; } if (!vis) return;
    const key = o.material.uuid + '|' + o.castShadow + o.receiveShadow; if (!groups.has(key)) groups.set(key, []); groups.get(key).push(o); });
  let merged = 0, removed = 0;
  for (const list of groups.values()) {
    if (list.length < 2) continue;
    const geos = [];
    for (const o of list) { let g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone(); const ng = new THREE.BufferGeometry();
      ng.setAttribute('position', g.attributes.position); if (g.attributes.normal) ng.setAttribute('normal', g.attributes.normal); else { ng.setAttribute('position', g.attributes.position); ng.computeVertexNormals(); }
      ng.setAttribute('uv', g.attributes.uv || new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
      ng.applyMatrix4(o.matrixWorld); geos.push(ng); }
    let mg = null; try { mg = mergeGeometries(geos, false); } catch (e) { mg = null; }
    if (!mg) continue;
    const m = new THREE.Mesh(mg, list[0].material); m.castShadow = list[0].castShadow; m.receiveShadow = list[0].receiveShadow; m.matrixAutoUpdate = false; m.updateMatrix(); W.group.add(m);
    for (const o of list) { o.parent.remove(o); removed++; } merged++;
  }
  W.mergeInfo = { merged, removed };
}
// suelo pintado (img/t-<época>.jpg): sustituye la textura generada de la plaza
function paintGround(W, idx) {
  const m = W.groundMesh; if (!m) return;
  new THREE.TextureLoader().load('img/t-' + idx + '.jpg', (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace; tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.anisotropy = 8;
    const p = m.geometry.parameters || { width: 80, height: 110 }; tex.repeat.set(p.width / 7, p.height / 7);
    m.material.map = tex; m.material.bumpMap = null; m.material.needsUpdate = true;
  }, undefined, () => {});
}
function ground(W, map, size = [70, 110], rough = 0.9, bump = true) {
  // la plaza termina en su entrada sur: más allá está el camino sobre el vacío
  const zmin = -5 - size[1] / 2, zmax = Math.min(-5 + size[1] / 2, 37.6);
  const geo = new THREE.PlaneGeometry(size[0], zmax - zmin); geo.rotateX(-Math.PI / 2);
  const m = mesh(geo, std(0xffffff, { map, roughness: rough, bump: bump ? map : undefined, bumpScale: 1.2 }), 0, 0, (zmin + zmax) / 2, false, true);
  W.group.add(m); if (!W.groundMesh) W.groundMesh = m; return m;
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
  const free = (x, z, hw, hd) => !W._near(x, z, Math.max(hw, hd) + 0.3) && !beds.some((b) => Math.abs(b.x - x) < b.hw + hw + 1.6 && Math.abs(b.z - z) < b.hd + hd + 1.6) &&
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
  // ------------------------------------------------------------------ VII
  function (W) {
    const fl = texTiles('vii', 0x7a6e62, 0x3e362e, 10, 0.3); fl.repeat.set(10, 16);
    ground(W, fl, [80, 120], 0.75);
    const r = mulberry32(77);
    const iron = std(0x2c3a36, { metalness: 0.65, roughness: 0.4 });
    const brick = std(0xffffff, { map: texStone('vii', 0x9a5a44), roughness: 0.95 });
    const glass = new THREE.MeshStandardMaterial({ color: 0xcfe6ff, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.18, depthWrite: false, side: THREE.DoubleSide });
    // galerías de hierro y vidrio a ambos lados, como el Palacio de Cristal
    for (const side of [-1, 1]) {
      const gal = new THREE.Group();
      for (let z = -44; z <= 34; z += 6) {
        gal.add(mesh(new THREE.CylinderGeometry(0.22, 0.3, 7, 10), iron, side * 19.5, 3.5, z));
        gal.add(mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.3, 12), iron, side * 19.5, 0.15, z));
        W.colliders.push({ t: 1, x: side * 19.5, z, r: 0.45, h: 7 });
        if (z < 34) { const a = mesh(new THREE.TorusGeometry(3, 0.1, 6, 24, Math.PI), iron, side * 19.5, 7, z + 3, true, false); a.rotation.y = Math.PI / 2; gal.add(a); }
      }
      // bóveda de cristal (cuarto de cilindro) con costillas de hierro
      const vault = mesh(new THREE.CylinderGeometry(5.5, 5.5, 80, 24, 1, true, side > 0 ? 0 : Math.PI, Math.PI / 2), glass, side * 22, 7, -5, false, false); vault.rotation.x = Math.PI / 2; vault.rotation.z = side > 0 ? 0 : 0; gal.add(vault);
      for (let z = -44; z <= 34; z += 3) { const rib = mesh(new THREE.TorusGeometry(5.5, 0.06, 4, 16, Math.PI / 2), iron, side * 22, 7, z, false, false); rib.rotation.z = side > 0 ? 0 : Math.PI / 2; gal.add(rib); }
      // muro de ladrillo con grandes ventanales iluminados
      gal.add(mesh(new THREE.BoxGeometry(1, 12, 84), brick, side * 25.2, 6, -5));
      for (let z = -40; z <= 30; z += 8) {
        const win = mesh(new THREE.PlaneGeometry(3, 5.2), glow(0xffb870, 1.7), side * 24.65, 3.6, z, false, false); win.rotation.y = -side * Math.PI / 2; gal.add(win);
        const top = mesh(new THREE.CircleGeometry(1.5, 16, 0, Math.PI), glow(0xffc888, 1.5), side * 24.65, 6.2, z, false, false); top.rotation.y = -side * Math.PI / 2; gal.add(top);
        for (const dy of [1.8, 3.6]) { const bar = mesh(new THREE.BoxGeometry(0.06, 0.08, 3), iron, side * 24.6, dy + 0.8, z, false, false); gal.add(bar); }
      }
      W.group.add(gal);
      // chimeneas de fábrica con humo, al fondo
      for (const z of [-30, 0, 26]) {
        const x = side * (34 + r() * 6); W.group.add(mesh(new THREE.CylinderGeometry(1.1, 1.6, 26, 12), brick, x, 13, z, false, false));
        W.emitters.push({ x, y: 26.5, z, col: 0x8a7a70, rate: 3, acc: 0, kind: 'smoke' });
      }
    }
    // farolas de gas a lo largo del camino
    const lampPost = (x, z, light) => {
      const g = new THREE.Group(); g.position.set(x, 0, z);
      g.add(mesh(new THREE.CylinderGeometry(0.07, 0.12, 3.6, 8), iron, 0, 1.8, 0));
      g.add(mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.25, 8), iron, 0, 0.12, 0));
      g.add(mesh(new THREE.CylinderGeometry(0.28, 0.18, 0.55, 6, 1, true), glass, 0, 3.85, 0, false, false));
      const fl = mesh(new THREE.SphereGeometry(0.16, 10, 8), glow(0xffc070, 5), 0, 3.85, 0, false, false); g.add(fl);
      g.add(mesh(new THREE.ConeGeometry(0.36, 0.3, 6), iron, 0, 4.25, 0));
      W.group.add(g); W.colliders.push({ t: 1, x, z, r: 0.3, h: 4 });
      let pl = null; if (light && W.lightBudget > 1) { pl = new THREE.PointLight(0xffb060, 10, 12, 2); pl.position.set(x, 3.8, z); W.group.add(pl); W.lightBudget--; }
      W.anim.push((t) => { const k = 1 + Math.sin(t * 9 + x * 3 + z) * 0.06; fl.scale.setScalar(k); if (pl) pl.intensity = 9 + Math.sin(t * 7 + z) * 0.8; });
    };
    let li = 0; for (const side of [-1, 1]) for (let z = 28; z > -28; z -= 10) { if (!W._near(side * 5.3, z, 0.2)) lampPost(side * 5.3, z, (li++ % 3) === 0); }
    // árboles de otoño
    const autumn = [0xd2691e, 0xe8a03a, 0xb8442a, 0xd8b048, 0x9a3a22];
    for (let i = 0; i < 26; i++) {
      const x = (r() < 0.5 ? -1 : 1) * (8.5 + r() * 8), z = -42 + r() * 74; if (W._near(x, z, 2.2)) continue;
      const t = new THREE.Group(); t.position.set(x, 0, z); const s = 0.8 + r() * 0.5; t.scale.setScalar(s);
      t.add(mesh(new THREE.CylinderGeometry(0.15, 0.25, 2.6, 7), std(0x3a2a20, { roughness: 1 }), 0, 1.3, 0));
      const lc = std(autumn[Math.floor(r() * autumn.length)], { roughness: 0.9, flat: true });
      for (let k = 0; k < 5; k++) t.add(mesh(new THREE.IcosahedronGeometry(0.75 + r() * 0.5, 0), lc, (r() - 0.5) * 1.6, 2.7 + r() * 1.1, (r() - 0.5) * 1.6));
      W.group.add(t); W.colliders.push({ t: 1, x, z, r: 0.4 * s + 0.1, h: 3 });
      if (r() < 0.35) W.emitters.push({ x, y: 3.2 * s, z, col: autumn[Math.floor(r() * autumn.length)], rate: 0.5, acc: 0, kind: 'leaf' });
    }
    // fuente de hierro fundido en el centro
    fountain(W, 0, 2, std(0x3a4a44, { metalness: 0.6, roughness: 0.4 }));
    // locomotora de vapor junto al andén
    { const loco = new THREE.Group(); loco.position.set(-21.6, 0, 27); const black = std(0x1a1a1e, { metalness: 0.5, roughness: 0.45 }); const red = std(0x8c1d2c, { roughness: 0.5 }); const brass = std(0xc8a050, { metalness: 0.9, roughness: 0.3 });
      const boiler = mesh(new THREE.CylinderGeometry(0.9, 0.9, 5, 20), black, 0, 2, 0.6); boiler.rotation.x = Math.PI / 2; loco.add(boiler);
      for (let k = 0; k < 3; k++) { const band = mesh(new THREE.TorusGeometry(0.92, 0.05, 6, 24), brass, 0, 2, -1 + k * 1.6); loco.add(band); }
      loco.add(mesh(new THREE.BoxGeometry(2, 2.6, 1.8), red, 0, 2.3, 3.8)); loco.add(mesh(new THREE.BoxGeometry(2.3, 0.2, 2.1), black, 0, 3.7, 3.8));
      loco.add(mesh(new THREE.CylinderGeometry(0.28, 0.4, 1.4, 12), black, 0, 3.4, -1.3));
      for (const s of [-1, 1]) for (const z of [-1.2, 0.4, 2.2, 3.8]) { const wh = mesh(new THREE.CylinderGeometry(z > 2 ? 0.75 : 0.55, z > 2 ? 0.75 : 0.55, 0.15, 18), red, s * 0.95, z > 2 ? 0.75 : 0.55, z); wh.rotation.z = Math.PI / 2; loco.add(wh); }
      loco.add(mesh(new THREE.SphereGeometry(0.25, 12, 10), glow(0xfff0c0, 4), 0, 2.2, -1.95, false, false));
      W.group.add(loco); W.colliders.push({ t: 0, x0: -22.8, x1: -20.4, z0: 25, z1: 32, h: 4 });
      W.emitters.push({ x: -21.6, y: 4.3, z: 25.7, col: 0xcfc8c0, rate: 4, acc: 0, kind: 'smoke' });
      const rails = std(0x5a5a5a, { metalness: 0.7, roughness: 0.4 }); for (const s of [-0.75, 0.75]) W.group.add(mesh(new THREE.BoxGeometry(0.12, 0.1, 80), rails, -21.6 + s, 0.05, -5, false, true));
    }
    // montañas nevadas al fondo (los Alpes de Nietzsche) y mar de niebla
    const mtn = farStd(W, 0x5a5a72, 0.4); const snow = farStd(W, 0xf4f0f8, 0.12, { roughness: 0.8 });
    for (let i = 0; i < 14; i++) {
      const x = -150 + i * 23 + (r() - 0.5) * 12, z = -150 - r() * 60, h = 45 + r() * 50, w = 30 + r() * 25;
      const m = new THREE.Group(); m.position.set(x, -4, z);
      m.add(mesh(new THREE.ConeGeometry(w, h, 6), mtn, 0, h / 2, 0, false, false));
      m.add(mesh(new THREE.ConeGeometry(w * 0.32, h * 0.32, 6), snow, 0, h - h * 0.16 + 0.2, 0, false, false));
      W.group.add(m);
    }
    const mist = new THREE.Mesh(new THREE.PlaneGeometry(500, 140), new THREE.MeshBasicMaterial({ color: 0xffd8c0, transparent: true, opacity: 0.35, depthWrite: false, fog: false }));
    mist.rotation.x = -Math.PI / 2; mist.position.set(0, 6, -130); W.group.add(mist);
    W.anim.push((t) => { mist.material.opacity = 0.3 + Math.sin(t * 0.3) * 0.06; });
    brazier(W, -4, -36, 0xffa050); brazier(W, 4, -36, 0xffa050);
  },
  // ------------------------------------------------------------------ VIII
  function (W) {
    const fl = texTiles('viii', 0x646a78, 0x3a3e48, 3, 0.06); fl.repeat.set(16, 26);
    const gnd = ground(W, fl, [80, 120], 0.22, false); gnd.material.metalness = 0.35;
    const r = mulberry32(88);
    const steel = std(0xb8c0cc, { metalness: 0.85, roughness: 0.25 });
    // rascacielos con ventanas encendidas
    const winTex = windowsTexture();
    for (const side of [-1, 1]) for (let i = 0; i < 9; i++) {
      const x = side * (40 + r() * 40), z = -60 + i * 13 + (r() - 0.5) * 6, w = 7 + r() * 7, d = 7 + r() * 7, h = 18 + r() * 42;
      const tex = winTex.clone(); tex.needsUpdate = true; tex.repeat.set(Math.round(w / 2.5), Math.round(h / 3));
      const m = mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color: 0x1a2030, roughness: 0.3, metalness: 0.6, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 1.1 }), x, h / 2, z, false, false);
      W.group.add(m);
      if (r() < 0.5) W.group.add(mesh(new THREE.SphereGeometry(0.35, 8, 6), glow(0xff3040, 4), x, h + 0.6, z, false, false));
    }
    // límites de la plaza: jardineras bajas con setos
    const planter = std(0x5a5e68, { roughness: 0.5 }); const hedge = std(0x2f5a3a, { roughness: 0.9, flat: true });
    for (const side of [-1, 1]) { W.group.add(mesh(new THREE.BoxGeometry(1.6, 0.9, 84), planter, side * 23.4, 0.45, -5)); W.group.add(mesh(new THREE.BoxGeometry(1.3, 0.8, 84), hedge, side * 23.4, 1.2, -5)); }
    // cerezos en flor con pétalos que caen
    const pinks = [0xffb7d0, 0xffc8dc, 0xf7a1c4, 0xffe0ec];
    for (let i = 0; i < 24; i++) {
      const x = (r() < 0.5 ? -1 : 1) * (8.5 + r() * 9), z = -42 + r() * 74; if (W._near(x, z, 2.2)) continue;
      const t = new THREE.Group(); t.position.set(x, 0, z); const s = 0.85 + r() * 0.45; t.scale.setScalar(s);
      const tr = mesh(new THREE.CylinderGeometry(0.13, 0.24, 2.4, 7), std(0x3a2626, { roughness: 1 }), 0, 1.2, 0); tr.rotation.z = (r() - 0.5) * 0.25; t.add(tr);
      const lc = std(pinks[Math.floor(r() * pinks.length)], { roughness: 0.8, flat: true, emissive: 0x401020, ei: 0.35 });
      for (let k = 0; k < 6; k++) t.add(mesh(new THREE.IcosahedronGeometry(0.7 + r() * 0.45, 0), lc, (r() - 0.5) * 2, 2.6 + r() * 1.0, (r() - 0.5) * 2));
      W.group.add(t); W.colliders.push({ t: 1, x, z, r: 0.4 * s + 0.1, h: 3 });
      if (r() < 0.5) W.emitters.push({ x, y: 3 * s, z, col: 0xffc0d8, rate: 0.9, acc: 0, kind: 'petal' });
    }
    // guirnaldas de luces sobre el camino
    for (let z = 30; z > -30; z -= 12) {
      for (const side of [-1, 1]) { W.group.add(mesh(new THREE.CylinderGeometry(0.06, 0.08, 5, 8), steel, side * 6, 2.5, z)); W.colliders.push({ t: 1, x: side * 6, z, r: 0.2, h: 5 }); }
      for (let k = 0; k <= 16; k++) { const u = k / 16; const x = -6 + u * 12; const y = 4.9 - Math.sin(u * Math.PI) * 1.1; W.group.add(mesh(new THREE.SphereGeometry(0.09, 6, 4), glow([0xffd890, 0xffffff, 0xffc0e0][k % 3], 4), x, y, z, false, false)); }
      for (let k = 0; k <= 10; k++) { const u = k / 10; const zz = z - u * 12; if (zz < -30) break; for (const side of [-1, 1]) W.group.add(mesh(new THREE.SphereGeometry(0.08, 6, 4), glow(0xffe0a0, 3.5), side * 6, 4.9 - Math.sin(u * Math.PI) * 0.9, zz, false, false)); }
    }
    // fuente-espejo de agua en el centro
    { const pool = mesh(new THREE.CylinderGeometry(3.2, 3.3, 0.35, 40), std(0x8a909a, { roughness: 0.3, metalness: 0.4 }), 0, 0.17, 2); W.group.add(pool);
      const water = mesh(new THREE.CylinderGeometry(3, 3, 0.05, 40), new THREE.MeshStandardMaterial({ color: 0x1a3a6a, roughness: 0.02, metalness: 0.9, emissive: 0x0a2a5a, emissiveIntensity: 0.5 }), 0, 0.37, 2, false); W.group.add(water);
      W.colliders.push({ t: 1, x: 0, z: 2, r: 3.3, h: 0.5 });
      for (let k = 0; k < 8; k++) { const a = (k / 8) * TAU; W.emitters.push({ x: Math.cos(a) * 2.2, y: 0.5, z: 2 + Math.sin(a) * 2.2, col: 0x9fe0ff, rate: 5, acc: 0, kind: 'water' }); }
      const ring = mesh(new THREE.TorusGeometry(3.05, 0.04, 6, 64), glow(0x6ae0ff, 2.5), 0, 0.42, 2, false, false); ring.rotation.x = Math.PI / 2; W.group.add(ring);
      if (W.lightBudget > 1) { const pl = new THREE.PointLight(0x6ae0ff, 14, 14, 2); pl.position.set(0, 1.5, 2); W.group.add(pl); W.lightBudget--; } }
    // terraza del café junto al Flore
    for (const [x, z] of [[20, 21], [20.5, 25], [20, 29], [17.5, 30.5]]) {
      if (W._near(x, z, -1.5)) continue;
      const g = new THREE.Group(); g.position.set(x, 0, z);
      g.add(mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.04, 16), std(0xe8e4dc, { roughness: 0.3 }), 0, 0.95, 0)); g.add(mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.95, 6), std(0x2a2a30), 0, 0.47, 0));
      g.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.4, 6), std(0x2a2a30), 0, 1.2, 0)); g.add(mesh(new THREE.ConeGeometry(1.3, 0.5, 8, 1, true), std(0x8c1d2c, { roughness: 0.7, side: THREE.DoubleSide }), 0, 2.45, 0));
      g.add(mesh(new THREE.SphereGeometry(0.07, 6, 4), glow(0xffd080, 4), 0, 1.1, 0, false, false));
      W.group.add(g); W.colliders.push({ t: 1, x, z, r: 0.6, h: 2 });
    }
    // la Tierra vista desde el espacio, sobre el portal: el punto azul pálido
    { const earth = mesh(new THREE.SphereGeometry(16, 48, 32), std(0xffffff, { map: earthTexture(), roughness: 0.7, emissive: 0x1a3a80, ei: 0.55 }), 0, 46, -150, false, false); earth.material.fog = false; W.group.add(earth);
      const atm = new THREE.Sprite(new THREE.SpriteMaterial({ map: cloudTexture(), color: 0x6ab0ff, transparent: true, opacity: 0.55, depthWrite: false, fog: false, blending: THREE.AdditiveBlending })); atm.scale.set(52, 52, 1); atm.position.set(0, 46, -151); W.group.add(atm);
      W.anim.push((t, dt) => { earth.rotation.y += dt * 0.02; }); }
    // farolas modernas
    for (const [x, z] of [[-5, -36], [5, -36]]) { W.group.add(mesh(new THREE.CylinderGeometry(0.06, 0.08, 4, 8), steel, x, 2, z)); W.group.add(mesh(new THREE.BoxGeometry(0.8, 0.1, 0.25), glow(0xe8f4ff, 3.5), x, 4, z, false, false)); W.colliders.push({ t: 1, x, z, r: 0.2, h: 4 }); }
    if (W.lightBudget > 0) { const pl = new THREE.PointLight(0xd8ecff, 18, 16, 2); pl.position.set(0, 4, -34); W.group.add(pl); W.lightBudget--; }
  },
  // ------------------------------------------------------------------ IX
  function (W) {
    const fl = texTiles('ix', 0xc87a5a, 0x8a4a32, 6, 0.25); fl.repeat.set(14, 22);
    ground(W, fl, [80, 120], 0.8);
    const r = mulberry32(99);
    const stucco = std(0xf4ece0, { roughness: 0.85 }); const trim = std(0xe8d8c0, { roughness: 0.7 });
    const tile = std(0xb04a2a, { roughness: 0.8, flat: true });
    const pastel = [0xf2a0b8, 0xf6d06a, 0x7ac0d8, 0xa8d878, 0xf09a6a, 0xc8a0e0];
    // portales coloniales con arcos y casas de colores
    for (const side of [-1, 1]) {
      const a = arcade(80, 13, 4.2, stucco, trim, { attic: 0.6 }); a.rotation.y = Math.PI / 2; a.position.set(side * 20.5, 0, -4); W.group.add(a);
      for (let i = 0; i <= 13; i++) { const z = -4 - 40 + i * (80 / 13); W.colliders.push({ t: 0, x0: side * 20.5 - 0.6, x1: side * 20.5 + 0.6, z0: z - 0.6, z1: z + 0.6, h: 9 }); }
      const roof = mesh(new THREE.BoxGeometry(4.6, 0.25, 82), tile, side * 22.6, 7.4, -4); roof.rotation.z = side * 0.25; W.group.add(roof);
      for (let z = -44, k = 0; z < 36; z += 8, k++) {
        const c = pastel[(k * 2 + (side > 0 ? 1 : 0)) % pastel.length]; const h = 8 + r() * 4;
        W.group.add(mesh(new THREE.BoxGeometry(2, h, 8), std(c, { roughness: 0.9 }), side * 25.6, h / 2, z + 4));
        W.group.add(mesh(new THREE.BoxGeometry(2.4, 0.4, 8.2), trim, side * 25.6, h + 0.2, z + 4));
        for (const dz of [-2, 2]) {
          const win = mesh(new THREE.PlaneGeometry(1.2, 1.8), std(0x2a5a7a, { roughness: 0.4, emissive: 0xffc070, ei: 0.25 }), side * 24.58, 5.6, z + 4 + dz, false, false); win.rotation.y = -side * Math.PI / 2; W.group.add(win);
          W.group.add(mesh(new THREE.BoxGeometry(0.6, 0.12, 1.6), std(0x2a2a2a, { metalness: 0.6 }), side * 24.3, 4.6, z + 4 + dz, false, false));
          for (let f = 0; f < 4; f++) W.group.add(mesh(new THREE.SphereGeometry(0.13, 6, 4), std([0xff3a5a, 0xff8a2a, 0xffffff, 0xd84aff][f], { roughness: 0.7 }), side * 24.2, 4.8, z + 4 + dz - 0.6 + f * 0.4, false, false));
        }
      }
    }
    // jacarandas en flor, agaves y cactus
    const lilac = [0x9a6ad8, 0xb088e8, 0x8a5ac8, 0xc0a0f0];
    for (let i = 0; i < 24; i++) {
      const x = (r() < 0.5 ? -1 : 1) * (8.5 + r() * 8.5), z = -42 + r() * 74; if (W._near(x, z, 2.2)) continue;
      const k = r();
      if (k < 0.65) {
        const t = new THREE.Group(); t.position.set(x, 0, z); const s = 0.85 + r() * 0.45; t.scale.setScalar(s);
        const tr = mesh(new THREE.CylinderGeometry(0.13, 0.24, 2.6, 7), std(0x4a3a30, { roughness: 1 }), 0, 1.3, 0); tr.rotation.z = (r() - 0.5) * 0.3; t.add(tr);
        const lc = std(lilac[Math.floor(r() * lilac.length)], { roughness: 0.8, flat: true, emissive: 0x200a30, ei: 0.3 });
        for (let q = 0; q < 6; q++) t.add(mesh(new THREE.IcosahedronGeometry(0.75 + r() * 0.45, 0), lc, (r() - 0.5) * 2.2, 2.7 + r() * 1.0, (r() - 0.5) * 2.2));
        W.group.add(t); W.colliders.push({ t: 1, x, z, r: 0.4 * s + 0.1, h: 3 });
        if (r() < 0.5) W.emitters.push({ x, y: 3 * s, z, col: 0xb898f0, rate: 0.8, acc: 0, kind: 'petal' });
      } else if (k < 0.85) {
        const g = new THREE.Group(); g.position.set(x, 0, z); const ag = std(0x5a8a6a, { roughness: 0.8, flat: true });
        for (let q = 0; q < 9; q++) { const leaf = mesh(new THREE.ConeGeometry(0.16, 1.6, 4), ag, 0, 0.7, 0); leaf.rotation.set(0.5 + r() * 0.4, (q / 9) * TAU, 0); leaf.position.set(Math.sin((q / 9) * TAU) * 0.3, 0.6, Math.cos((q / 9) * TAU) * 0.3); g.add(leaf); }
        W.group.add(g); W.colliders.push({ t: 1, x, z, r: 0.8, h: 1.2 });
      } else {
        const g = new THREE.Group(); g.position.set(x, 0, z); const cc = std(0x3a7a4a, { roughness: 0.8 });
        g.add(mesh(new THREE.CapsuleGeometry(0.3, 2.4, 4, 10), cc, 0, 1.5, 0));
        for (const s of [-1, 1]) { const arm = new THREE.Group(); arm.position.set(s * 0.3, 1.3 + r() * 0.6, 0); arm.add(mesh(new THREE.CapsuleGeometry(0.2, 0.5, 4, 8), cc, s * 0.3, 0, 0)); const up = mesh(new THREE.CapsuleGeometry(0.2, 0.8, 4, 8), cc, s * 0.55, 0.5, 0); arm.add(up); arm.children[0].rotation.z = Math.PI / 2; g.add(arm); }
        W.group.add(g); W.colliders.push({ t: 1, x, z, r: 0.5, h: 3 });
      }
    }
    // papel picado sobre el camino
    const picado = [];
    for (let z = 30; z > -30; z -= 9) {
      for (const side of [-1, 1]) { W.group.add(mesh(new THREE.CylinderGeometry(0.05, 0.07, 5.2, 6), std(0x6a4a30), side * 6, 2.6, z)); W.colliders.push({ t: 1, x: side * 6, z, r: 0.2, h: 5 }); }
      for (let k = 0; k < 14; k++) {
        const u = (k + 0.5) / 14; const x = -6 + u * 12; const y = 5 - Math.sin(u * Math.PI) * 0.9;
        const pp = mesh(new THREE.PlaneGeometry(0.62, 0.7), std(pastel[(k + Math.round(z)) % pastel.length], { roughness: 0.9, side: THREE.DoubleSide, emissive: pastel[(k + Math.round(z)) % pastel.length], ei: 0.25 }), x, y - 0.38, z, false, false);
        W.group.add(pp); picado.push([pp, k + z]);
      }
    }
    W.anim.push((t) => picado.forEach(([p, k]) => { p.rotation.x = Math.sin(t * 2.2 + k) * 0.25; }));
    // fuente colonial
    fountain(W, 0, 2, std(0xd8c8a8, { roughness: 0.7 }));
    // pirámide escalonada al fondo, y los Andes en el horizonte
    { const py = new THREE.Group(); py.position.set(0, 0, -78); const st = std(0xb8a488, { roughness: 1, flat: true });
      for (let k = 0; k < 6; k++) { const w = 34 - k * 5; py.add(mesh(new THREE.BoxGeometry(w, 3.6, w), st, 0, 1.8 + k * 3.6, 0, false, false)); }
      { const stair = mesh(new THREE.BoxGeometry(6, 1, 30), std(0xa89478, { roughness: 1 }), 0, 11, 16, false, false); stair.rotation.x = -0.72; py.add(stair); }
      py.add(mesh(new THREE.BoxGeometry(6, 4.5, 6), std(0xc8b498), 0, 23.8, 0, false, false));
      py.add(mesh(new THREE.BoxGeometry(6.6, 0.8, 6.6), std(0x8a3a2a), 0, 26.4, 0, false, false));
      W.group.add(py); }
    const mtn = farStd(W, 0x3e5a4c, 0.4); const snow = farStd(W, 0xf4f0f8, 0.12, { roughness: 0.8 });
    for (let i = 0; i < 16; i++) {
      const x = -170 + i * 23 + (r() - 0.5) * 12, z = -170 - r() * 70, h = 55 + r() * 55, w = 32 + r() * 25;
      const m = new THREE.Group(); m.position.set(x, -4, z);
      m.add(mesh(new THREE.ConeGeometry(w, h, 7), mtn, 0, h / 2, 0, false, false));
      m.add(mesh(new THREE.ConeGeometry(w * 0.3, h * 0.3, 7), snow, 0, h - h * 0.15 + 0.2, 0, false, false));
      W.group.add(m);
    }
    // faroles de hierro con luz cálida
    for (const [x, z] of [[-5, -36], [5, -36], [-5, 20], [5, -8]]) { W.group.add(mesh(new THREE.CylinderGeometry(0.06, 0.1, 3.6, 8), std(0x2a2a2a, { metalness: 0.6 }), x, 1.8, z)); W.group.add(mesh(new THREE.SphereGeometry(0.22, 10, 8), glow(0xffd090, 4), x, 3.7, z, false, false)); W.colliders.push({ t: 1, x, z, r: 0.25, h: 4 }); }
    brazier(W, -4, -33, 0xff8a40); brazier(W, 4, -33, 0xff8a40);
  },
  // ------------------------------------------------------------------ X · Mexicas
  function (W) {
    const fl = texTiles('x', 0xc8b490, 0x8a7a5a, 5, 0.2); fl.repeat.set(14, 22);
    ground(W, fl, [80, 120], 0.8);
    const r = mulberry32(110);
    const water = new THREE.MeshStandardMaterial({ color: 0x2a7a9a, roughness: 0.05, metalness: 0.5, emissive: 0x0a3a50, emissiveIntensity: 0.4 });
    const stucco = std(0xf2ece0, { roughness: 0.85 }); const red = std(0xb83a2a, { roughness: 0.8 }); const blue = std(0x3a6ab8, { roughness: 0.8 });
    // canales con chinampas y ahuejotes a ambos lados
    for (const side of [-1, 1]) {
      const w = mesh(new THREE.PlaneGeometry(4, 84), water, side * 21.5, 0.05, -5, false, true); w.rotation.x = -Math.PI / 2; W.group.add(w);
      W.colliders.push({ t: 0, x0: side > 0 ? 19.5 : -23.5, x1: side > 0 ? 23.5 : -19.5, z0: -47, z1: 37, h: 3 });
      for (let z = -42; z < 34; z += 7) {
        if (W._near(side * 18.2, z, 3)) continue;
        const ch = mesh(new THREE.BoxGeometry(2.4, 0.5, 5.5), std(0x5a4a30, { roughness: 1 }), side * 18.2, 0.25, z); W.group.add(ch); W.colliders.push({ t: 0, x0: side * 18.2 - 1.2, x1: side * 18.2 + 1.2, z0: z - 2.75, z1: z + 2.75, h: 1 });
        for (let k = 0; k < 8; k++) W.group.add(mesh(new THREE.IcosahedronGeometry(0.22 + r() * 0.12, 0), std([0x4a8a3a, 0xff8a2a, 0xf6d06a, 0x5aa040][k % 4], { roughness: 0.8, flat: true }), side * 18.2 + (r() - 0.5) * 1.8, 0.65, z + (r() - 0.5) * 4.5, false, false));
        if (!W._near(side * 16.6, z, 0.5)) { const c = cypress(6 + r() * 3); c.scale.set(0.6, 1, 0.6); c.position.set(side * 16.6, 0, z); W.group.add(c); W.colliders.push({ t: 1, x: side * 16.6, z, r: 0.4, h: 6 }); }
      }
      // casas blancas de azotea al otro lado del canal
      for (let z = -44; z < 36; z += 9) { const h = 3 + r() * 3; W.group.add(mesh(new THREE.BoxGeometry(5, h, 7), stucco, side * 27, h / 2, z + 3, false, true)); W.group.add(mesh(new THREE.BoxGeometry(5.4, 0.3, 7.4), red, side * 27, h + 0.15, z + 3, false, false)); }
    }
    // Templo Mayor al fondo: doble pirámide con dos santuarios
    { const tm = new THREE.Group(); tm.position.set(0, 0, -85); const st = std(0xd8c8a8, { roughness: 1, flat: true });
      for (let k = 0; k < 5; k++) { const w = 40 - k * 6; tm.add(mesh(new THREE.BoxGeometry(w, 4, w * 0.8), st, 0, 2 + k * 4, 0, false, false)); }
      for (const [x, m] of [[-4, blue], [4, red]]) { tm.add(mesh(new THREE.BoxGeometry(6, 5, 6), m, x, 22.5, 0, false, false)); tm.add(mesh(new THREE.BoxGeometry(6.6, 1, 6.6), stucco, x, 25.5, 0, false, false)); }
      const stair = mesh(new THREE.BoxGeometry(12, 1, 26), std(0xc8b898), 0, 10, 13, false, false); stair.rotation.x = -0.65; tm.add(stair);
      W.group.add(tm); }
    // volcanes: Popocatépetl e Iztaccíhuatl
    const mtn = farStd(W, 0x4a5a6a, 0.4); const snow = farStd(W, 0xf4f0f8, 0.12, { roughness: 0.8 });
    for (const [x, z, h, w, smoke] of [[-90, -180, 95, 55, true], [70, -190, 75, 70, false], [-30, -220, 60, 50, false], [140, -170, 55, 45, false]]) {
      const m = new THREE.Group(); m.position.set(x, -4, z); m.add(mesh(new THREE.ConeGeometry(w, h, 8), mtn, 0, h / 2, 0, false, false)); m.add(mesh(new THREE.ConeGeometry(w * 0.33, h * 0.33, 8), snow, 0, h - h * 0.165 + 0.3, 0, false, false)); W.group.add(m);
      if (smoke) W.emitters.push({ x, y: h - 2, z, col: 0xd8d0c8, rate: 2, acc: 0, kind: 'smoke' });
    }
    // braseros y estandartes de plumas
    for (const [x, z] of [[-5, 24], [5, 24], [-5, -6], [5, -6]]) { if (!W._near(x, z, 0.3)) brazier(W, x, z, 0xff8a30, false); }
    brazier(W, -4, -34, 0xff8a30); brazier(W, 4, -34, 0xff8a30);
  },
  // ------------------------------------------------------------------ XI · Incas
  function (W) {
    const fl = texTiles('xi', 0x7a9a5a, 0x5a7a3a, 4, 0.3); fl.repeat.set(10, 16);
    ground(W, fl, [80, 120], 0.95);
    const r = mulberry32(111);
    const granite = std(0x9a948a, { roughness: 0.95, flat: true }); const dark = std(0x2a2620, { roughness: 1 });
    // camino de piedra central
    W.group.add(mesh(new THREE.BoxGeometry(6, 0.06, 84), std(0xa8a090, { roughness: 0.9 }), 0, 0.03, -5, false, true));
    // muros de piedras encajadas con hornacinas trapezoidales
    for (const side of [-1, 1]) {
      for (let z = -46; z < 36;) {
        const len = 1.2 + r() * 1.6; let y = 0;
        for (let row = 0; row < 4; row++) { const h = 0.6 + r() * 0.5; W.group.add(mesh(new THREE.BoxGeometry(1.4, h, len - 0.05), granite, side * 20.5 + (r() - 0.5) * 0.08, y + h / 2, z + len / 2)); y += h; }
        z += len;
      }
      W.colliders.push({ t: 0, x0: side * 20.5 - 0.8, x1: side * 20.5 + 0.8, z0: -47, z1: 37, h: 5 });
      for (let z = -40; z < 32; z += 6) { const n = mesh(new THREE.CylinderGeometry(0.45, 0.65, 1.4, 4), dark, side * 19.78, 1.6, z, false, false); n.rotation.y = Math.PI / 4; n.scale.z = 0.2; W.group.add(n); }
      // andenes escalonados más allá del muro
      for (let k = 0; k < 6; k++) { const x = side * (23 + k * 3.5), h = 2 + k * 2.4; W.group.add(mesh(new THREE.BoxGeometry(3.6, h, 90), granite, x, h / 2, -5, false, true)); W.group.add(mesh(new THREE.BoxGeometry(3.6, 0.3, 90), std(0x6a9a4a, { roughness: 1 }), x, h + 0.15, -5, false, true)); }
    }
    // llamas
    const wool = std(0xe8dcc8, { roughness: 1 }); const brown = std(0x8a5a3a, { roughness: 1 });
    for (let i = 0; i < 6; i++) { const x = (i % 2 ? -1 : 1) * (9 + r() * 7), z = -38 + i * 12; if (W._near(x, z, 1.2)) continue; const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = r() * TAU; const m = i % 3 ? wool : brown;
      g.add(mesh(new THREE.BoxGeometry(0.6, 0.6, 1.2), m, 0, 1.1, 0)); g.add(mesh(new THREE.BoxGeometry(0.25, 0.9, 0.25), m, 0, 1.7, 0.55)); g.add(mesh(new THREE.BoxGeometry(0.28, 0.25, 0.45), m, 0, 2.15, 0.7));
      for (const [a, b] of [[-0.2, -0.45], [0.2, -0.45], [-0.2, 0.45], [0.2, 0.45]]) g.add(mesh(new THREE.BoxGeometry(0.12, 0.8, 0.12), m, a, 0.4, b));
      for (const s of [-1, 1]) g.add(mesh(new THREE.ConeGeometry(0.05, 0.2, 4), m, s * 0.09, 2.37, 0.62));
      W.group.add(g); W.colliders.push({ t: 1, x, z, r: 0.7, h: 2 }); W.anim.push((t) => { g.children[2].rotation.x = Math.sin(t * 0.7 + i) * 0.15; }); }
    // picos andinos: un Huayna Picchu verde y la cordillera nevada
    const green = farStd(W, 0x34523a, 0.3); const snow = farStd(W, 0xffffff, 0.05, { roughness: 0.8, emissive: 0x303540 }); const rock = farStd(W, 0x7a7a88, 0.5);
    { const hp = mesh(new THREE.ConeGeometry(22, 85, 7), green, 0, 38, -105, false, false); hp.scale.x = 0.7; W.group.add(hp); }
    for (let i = 0; i < 14; i++) { const x = -170 + i * 26 + (r() - 0.5) * 12, z = -180 - r() * 60, h = 70 + r() * 60, w = 30 + r() * 25; const m = new THREE.Group(); m.position.set(x, -4, z); m.add(mesh(new THREE.ConeGeometry(w, h, 7), rock, 0, h / 2, 0, false, false)); m.add(mesh(new THREE.ConeGeometry(w * 0.42, h * 0.42, 7), snow, 0, h - h * 0.21 + 0.3, 0, false, false)); W.group.add(m); }
    brazier(W, -4, -34, 0xffb040); brazier(W, 4, -34, 0xffb040);
  },
  // ------------------------------------------------------------------ XII · Mapuche
  function (W) {
    const fl = texTiles('xii', 0x6a7a4a, 0x4a5a32, 3, 0.35); fl.repeat.set(10, 16);
    ground(W, fl, [80, 120], 1);
    const r = mulberry32(112);
    W.group.add(mesh(new THREE.BoxGeometry(5, 0.05, 84), std(0x8a7a5a, { roughness: 1 }), 0, 0.03, -5, false, true));
    // araucarias: troncos altos con copas en paraguas
    const bark = std(0x5a4a3a, { roughness: 1 }); const needle = std(0x2f5a3a, { roughness: 0.9, flat: true });
    const araucaria = (x, z, s) => { const g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(s);
      g.add(mesh(new THREE.CylinderGeometry(0.25, 0.4, 9, 8), bark, 0, 4.5, 0));
      for (let k = 0; k < 5; k++) { const y = 6 + k * 0.9; const rr = 2.6 - k * 0.45; const disk = mesh(new THREE.ConeGeometry(rr, 0.8, 10), needle, 0, y, 0); disk.scale.y = 0.6; g.add(disk); }
      W.group.add(g); W.colliders.push({ t: 1, x, z, r: 0.5 * s, h: 9 }); };
    for (let i = 0; i < 30; i++) { const x = (r() < 0.5 ? -1 : 1) * (9 + r() * 12), z = -44 + r() * 78; if (W._near(x, z, 2)) continue; araucaria(x, z, 0.8 + r() * 0.5); }
    for (const side of [-1, 1]) for (let z = -46; z < 36; z += 7) araucaria(side * (25 + r() * 6), z + r() * 3, 1 + r() * 0.5);
    // rukas de paja
    const straw = std(0xc8a868, { roughness: 1, flat: true }); const wood = std(0x6a4a30, { roughness: 1 });
    for (const [x, z] of [[-20, 20], [20, 4], [-20, -32], [19, -36]]) { if (W._near(x, z, 2)) continue; const g = new THREE.Group(); g.position.set(x, 0, z);
      const roof = mesh(new THREE.SphereGeometry(3.2, 14, 10, 0, TAU, 0, Math.PI / 2), straw, 0, 0, 0); roof.scale.set(1, 1.1, 1.4); g.add(roof);
      const door = mesh(new THREE.PlaneGeometry(1, 1.6), wood, 0, 0.8, 0, false, false); door.position.set(-Math.sign(x) * 3.1, 0.8, 0); door.rotation.y = -Math.sign(x) * Math.PI / 2; g.add(door);
      W.group.add(g); W.colliders.push({ t: 1, x, z, r: 3.3, h: 3 }); W.emitters.push({ x, y: 3.4, z, col: 0xb8b0a8, rate: 1.2, acc: 0, kind: 'smoke' }); }
    // volcán nevado humeante (el Rukapillan) y montañas
    const mtn = farStd(W, 0x3e4a4a, 0.4); const snow = farStd(W, 0xf4f0f8, 0.12, { roughness: 0.8 });
    { const v = new THREE.Group(); v.position.set(-10, -4, -170); v.add(mesh(new THREE.ConeGeometry(70, 110, 10), mtn, 0, 55, 0, false, false)); v.add(mesh(new THREE.ConeGeometry(30, 47, 10), snow, 0, 87, 0, false, false)); W.group.add(v); W.emitters.push({ x: -10, y: 104, z: -170, col: 0xe0dcd8, rate: 3, acc: 0, kind: 'smoke' }); }
    for (let i = 0; i < 10; i++) { const x = -180 + i * 40 + (r() - 0.5) * 20, z = -200 - r() * 40, h = 50 + r() * 40, w = 40 + r() * 20; const m = new THREE.Group(); m.position.set(x, -4, z); m.add(mesh(new THREE.ConeGeometry(w, h, 7), mtn, 0, h / 2, 0, false, false)); W.group.add(m); }
    // un estero de agua a un costado
    const est = mesh(new THREE.PlaneGeometry(5, 30), new THREE.MeshStandardMaterial({ color: 0x3a6a7a, roughness: 0.05, metalness: 0.5 }), 20.5, 0.05, 20, false, true); est.rotation.x = -Math.PI / 2; W.group.add(est);
    W.colliders.push({ t: 0, x0: 18, x1: 23, z0: 5, z1: 35, h: 2 });
    brazier(W, -4, -34, 0xff9a40); brazier(W, 4, -34, 0xff9a40);
  },
  // ------------------------------------------------------------------ XIII · China
  function (W) {
    const fl = texTiles('xiii', 0x9a9890, 0x5a5850, 4, 0.12); fl.repeat.set(14, 22);
    ground(W, fl, [80, 120], 0.6);
    const r = mulberry32(113);
    const red = std(0xb02a20, { roughness: 0.6 }); const roofM = std(0x3a6a62, { roughness: 0.55, flat: true }); const gold = std(0xd8b048, { metalness: 0.6, roughness: 0.4 });
    // galerías de columnas rojas con tejados curvos
    for (const side of [-1, 1]) {
      for (let z = -44; z <= 34; z += 5) { W.group.add(mesh(new THREE.CylinderGeometry(0.28, 0.3, 4.5, 12), red, side * 20, 2.25, z)); W.colliders.push({ t: 1, x: side * 20, z, r: 0.4, h: 5 }); }
      W.group.add(mesh(new THREE.BoxGeometry(1.2, 0.5, 82), red, side * 20, 4.7, -5));
      { // tejado a cuatro aguas a lo largo de la galería (primero se gira el cono y luego se estira el grupo)
        const rg = new THREE.Group(); rg.position.set(side * 20.6, 5.65, -5); rg.scale.set(1, 1, 13.9); W.group.add(rg);
        const roof = mesh(new THREE.CylinderGeometry(0.1, 3.4, 1.5, 4, 1, false), roofM, 0, 0, 0, true, false); roof.rotation.y = Math.PI / 4; rg.add(roof); }
      for (let z = -44; z <= 34; z += 10) { const tip = mesh(new THREE.ConeGeometry(0.15, 0.6, 5), gold, side * 18.3, 5.2, z, false, false); tip.rotation.z = side * 0.9; W.group.add(tip); }
      // bambú y faroles rojos
      for (let z = -42; z < 34; z += 5) { if (W._near(side * 16.5, z, 0.8)) continue; for (let k = 0; k < 5; k++) { const h = 4 + r() * 3; W.group.add(mesh(new THREE.CylinderGeometry(0.07, 0.08, h, 6), std(0x6a9a3a, { roughness: 0.6 }), side * (16.5 + (r() - 0.5) * 1.2), h / 2, z + (r() - 0.5) * 1.2)); } W.colliders.push({ t: 1, x: side * 16.5, z, r: 0.8, h: 5 }); }
    }
    for (let z = 30; z > -30; z -= 8) for (const side of [-1, 1]) { if (W._near(side * 5.5, z, 0.3)) continue; W.group.add(mesh(new THREE.CylinderGeometry(0.05, 0.06, 3.4, 6), std(0x2a2a2a), side * 5.5, 1.7, z)); const lan = mesh(new THREE.SphereGeometry(0.35, 12, 10), glow(0xff3a2a, 2.2), side * 5.5, 3.5, z, false, false); lan.scale.y = 1.25; W.group.add(lan); W.colliders.push({ t: 1, x: side * 5.5, z, r: 0.2, h: 4 }); }
    // pagoda al fondo
    { const pg = new THREE.Group(); pg.position.set(0, 0, -80);
      for (let k = 0; k < 7; k++) { const w = 12 - k * 1.3, y = k * 5; pg.add(mesh(new THREE.BoxGeometry(w * 0.7, 4, w * 0.7), red, 0, y + 2, 0, false, false)); const rf = mesh(new THREE.CylinderGeometry(0.2, w * 0.75, 1.5, 4), roofM, 0, y + 4.6, 0, false, false); rf.rotation.y = Math.PI / 4; pg.add(rf); }
      pg.add(mesh(new THREE.CylinderGeometry(0.1, 0.3, 5, 8), gold, 0, 38, 0, false, false)); W.group.add(pg); }
    // montañas kársticas en la niebla
    const karst = farStd(W, 0x2c4436, 0.45), karst2 = farStd(W, 0x3a5a44, 0.45);
    for (let i = 0; i < 14; i++) { // picos irregulares, más oscuros que la niebla para que se lean como montañas
      const x = -160 + i * 25 + (r() - 0.5) * 14, z = -95 - r() * 40, h = 28 + r() * 34, w = 8 + r() * 7;
      const k = mesh(new THREE.CylinderGeometry(w * (0.35 + r() * 0.2), w, h, 7, 3), i % 2 ? karst : karst2, x, h / 2 - 3, z, false, false);
      const pos = k.geometry.attributes.position; for (let v = 0; v < pos.count; v++) { const y = pos.getY(v); if (y > -h / 2 + 0.1) { pos.setX(v, pos.getX(v) * (0.85 + r() * 0.3)); pos.setZ(v, pos.getZ(v) * (0.85 + r() * 0.3)); } } k.geometry.computeVertexNormals();
      W.group.add(k); const cap = mesh(new THREE.SphereGeometry(w * 0.45, 7, 5), karst2, x, h - 3, z, false, false); cap.scale.set(1, 0.6, 1); W.group.add(cap);
    }
    brazier(W, -4, -34, 0xff6a30); brazier(W, 4, -34, 0xff6a30);
  },
  // ------------------------------------------------------------------ XIV · India
  function (W) {
    const fl = texTiles('xiv', 0xd8a878, 0x9a6a4a, 5, 0.2); fl.repeat.set(14, 22);
    ground(W, fl, [80, 120], 0.75);
    const r = mulberry32(114);
    const sand = std(0xe0b088, { roughness: 0.85 }); const trim = std(0xc89068, { roughness: 0.7 });
    for (const side of [-1, 1]) {
      const a = arcade(80, 13, 4.5, sand, trim, { attic: 0.9 }); a.rotation.y = Math.PI / 2; a.position.set(side * 20.5, 0, -4); W.group.add(a);
      for (let i = 0; i <= 13; i++) { const z = -4 - 40 + i * (80 / 13); W.colliders.push({ t: 0, x0: side * 20.5 - 0.6, x1: side * 20.5 + 0.6, z0: z - 0.6, z1: z + 0.6, h: 9 }); }
      // pequeños templos con shikhara detrás
      for (let z = -40; z < 36; z += 12) { const g = new THREE.Group(); g.position.set(side * 27, 0, z); g.add(mesh(new THREE.BoxGeometry(4, 4, 4), sand, 0, 2, 0, false, false)); g.add(mesh(new THREE.ConeGeometry(2.4, 7, 8), trim, 0, 7.5, 0, false, false)); g.add(mesh(new THREE.SphereGeometry(0.5, 10, 8), std(0xd8b048, { metalness: 0.7, roughness: 0.3 }), 0, 11.2, 0, false, false)); W.group.add(g); }
    }
    // árboles banianos de copa ancha
    const lc = std(0x3f6a2e, { roughness: 0.9, flat: true });
    for (let i = 0; i < 12; i++) { const x = (r() < 0.5 ? -1 : 1) * (9 + r() * 8), z = -42 + r() * 74; if (W._near(x, z, 2.5)) continue; const t = new THREE.Group(); t.position.set(x, 0, z); const s = 0.9 + r() * 0.4; t.scale.setScalar(s);
      t.add(mesh(new THREE.CylinderGeometry(0.4, 0.6, 3, 8), std(0x6a5040, { roughness: 1 }), 0, 1.5, 0));
      for (let k = 0; k < 4; k++) t.add(mesh(new THREE.CylinderGeometry(0.04, 0.05, 3, 4), std(0x6a5040), (r() - 0.5) * 3, 1.5, (r() - 0.5) * 3));
      for (let k = 0; k < 8; k++) t.add(mesh(new THREE.IcosahedronGeometry(1.1 + r() * 0.5, 0), lc, (r() - 0.5) * 4, 3.4 + r() * 0.8, (r() - 0.5) * 4));
      W.group.add(t); W.colliders.push({ t: 1, x, z, r: 0.7 * s, h: 4 }); }
    // guirnaldas de caléndulas sobre el camino y lamparitas diya
    for (let z = 30; z > -30; z -= 10) {
      for (const side of [-1, 1]) { W.group.add(mesh(new THREE.CylinderGeometry(0.06, 0.08, 4.8, 6), std(0x8a5a3a), side * 6, 2.4, z)); W.colliders.push({ t: 1, x: side * 6, z, r: 0.2, h: 5 }); }
      for (let k = 0; k <= 24; k++) { const u = k / 24; W.group.add(mesh(new THREE.SphereGeometry(0.11, 6, 4), std(k % 3 ? 0xff9a1a : 0xffd02a, { roughness: 0.7, emissive: 0x4a2000, ei: 0.4 }), -6 + u * 12, 4.6 - Math.sin(u * Math.PI) * 1.2, z, false, false)); }
    }
    for (let z = 33; z > -30; z -= 2.5) for (const side of [-1, 1]) W.group.add(mesh(new THREE.SphereGeometry(0.07, 6, 4), glow(0xffb040, 5), side * 3.2, 0.12, z, false, false));
    // gran estupa al fondo
    { const sp = new THREE.Group(); sp.position.set(0, 0, -82); const white = std(0xf2ece0, { roughness: 0.8 });
      sp.add(mesh(new THREE.CylinderGeometry(20, 21, 4, 40), sand, 0, 2, 0, false, false)); sp.add(mesh(new THREE.SphereGeometry(17, 40, 20, 0, TAU, 0, Math.PI / 2), white, 0, 4, 0, false, false));
      sp.add(mesh(new THREE.BoxGeometry(5, 3, 5), trim, 0, 22, 0, false, false)); sp.add(mesh(new THREE.CylinderGeometry(0.4, 0.4, 8, 8), std(0xd8b048, { metalness: 0.7, roughness: 0.3 }), 0, 27, 0, false, false));
      for (let k = 0; k < 3; k++) sp.add(mesh(new THREE.CylinderGeometry(3 - k * 0.8, 3 - k * 0.8, 0.3, 20), std(0xd8b048, { metalness: 0.7, roughness: 0.3 }), 0, 25 + k * 2, 0, false, false));
      W.group.add(sp); }
    brazier(W, -4, -34, 0xffa030); brazier(W, 4, -34, 0xffa030);
  },
  // ------------------------------------------------------------------ XV · África
  function (W) {
    const fl = texTiles('xv', 0xc89a5a, 0x9a6a3a, 4, 0.3); fl.repeat.set(12, 20);
    ground(W, fl, [80, 120], 0.95);
    const r = mulberry32(115);
    const mud = std(0xb8804a, { roughness: 1 }); const stick = std(0x5a3a22, { roughness: 1 });
    // muros de adobe al estilo de Tombuctú, con vigas de madera y contrafuertes
    for (const side of [-1, 1]) {
      W.group.add(mesh(new THREE.BoxGeometry(1.4, 6, 84), mud, side * 21, 3, -5)); W.colliders.push({ t: 0, x0: side * 21 - 0.8, x1: side * 21 + 0.8, z0: -47, z1: 37, h: 7 });
      for (let z = -44; z < 36; z += 4) { W.group.add(mesh(new THREE.CylinderGeometry(0.3, 0.7, 7.5, 6), mud, side * 20.3, 3.75, z)); for (let k = 0; k < 3; k++) { const b = mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.8, 5), stick, side * 20.2, 2 + k * 1.8, z + 2); b.rotation.z = Math.PI / 2; W.group.add(b); } }
    }
    // baobabs y acacias
    const bark = std(0x8a7060, { roughness: 1 }); const leaf = std(0x6a8a3a, { roughness: 0.9, flat: true });
    for (let i = 0; i < 18; i++) { const x = (r() < 0.5 ? -1 : 1) * (9 + r() * 8), z = -42 + r() * 74; if (W._near(x, z, 2.5)) continue; const t = new THREE.Group(); t.position.set(x, 0, z); const s = 0.8 + r() * 0.4; t.scale.setScalar(s);
      if (r() < 0.5) { t.add(mesh(new THREE.CylinderGeometry(0.9, 1.3, 5, 10), bark, 0, 2.5, 0)); for (let k = 0; k < 5; k++) { const a = (k / 5) * TAU; const br = mesh(new THREE.CylinderGeometry(0.1, 0.2, 1.8, 5), bark, Math.cos(a) * 0.7, 5.6, Math.sin(a) * 0.7); br.rotation.set(Math.sin(a) * 0.6, 0, -Math.cos(a) * 0.6); t.add(br); t.add(mesh(new THREE.IcosahedronGeometry(0.5, 0), leaf, Math.cos(a) * 1.3, 6.4, Math.sin(a) * 1.3)); } W.colliders.push({ t: 1, x, z, r: 1.3 * s, h: 5 }); }
      else { t.add(mesh(new THREE.CylinderGeometry(0.12, 0.2, 3.5, 6), bark, 0, 1.75, 0)); const c = mesh(new THREE.CylinderGeometry(2.6, 2.2, 0.6, 12), leaf, 0, 3.8, 0); t.add(c); W.colliders.push({ t: 1, x, z, r: 0.35 * s, h: 3 }); }
      W.group.add(t); }
    // estela de Aksum y tambores
    { const st = mesh(new THREE.BoxGeometry(1.4, 9, 0.8), std(0x8a8070, { roughness: 0.9 }), 9, 4.5, 34, true, true); W.group.add(st); W.group.add(mesh(new THREE.SphereGeometry(0.7, 12, 8, 0, TAU, 0, Math.PI / 2), std(0x8a8070), 9, 9, 34)); W.colliders.push({ t: 1, x: 9, z: 34, r: 1, h: 9 }); }
    // pirámides y el Kilimanjaro en el horizonte
    const pyr = std(0xd8b080, { roughness: 1, flat: true });
    for (const [x, z, s] of [[-60, -170, 40], [-20, -190, 48], [20, -175, 30]]) { const p = mesh(new THREE.ConeGeometry(s, s * 1.2, 4), pyr, x, s * 0.6 - 4, z, false, false); p.rotation.y = Math.PI / 4; W.group.add(p); }
    { const k = new THREE.Group(); k.position.set(120, -4, -200); k.add(mesh(new THREE.ConeGeometry(90, 70, 9), std(0x6a5a5a, { roughness: 1, flat: true }), 0, 35, 0, false, false)); k.add(mesh(new THREE.CylinderGeometry(15, 30, 12, 9), std(0xf4f0f8, { roughness: 0.8, flat: true }), 0, 66, 0, false, false)); W.group.add(k); }
    brazier(W, -4, -34, 0xff8a30); brazier(W, 4, -34, 0xff8a30);
  },
  // ------------------------------------------------------------------ XVI · Sumer
  function (W) {
    const fl = texTiles('xvi', 0xc8a070, 0x8a6a48, 6, 0.22); fl.repeat.set(14, 22);
    ground(W, fl, [80, 120], 0.95);
    const r = mulberry32(116);
    const brick = std(0xffffff, { map: texTiles('xvib', 0xb88a5a, 0x7a5a3a, 8, 0.25), roughness: 1 });
    const mud = std(0xb8905e, { roughness: 1 }); const blueGlaze = std(0x2a6ab0, { roughness: 0.4, metalness: 0.1 });
    const water = new THREE.MeshStandardMaterial({ color: 0x3a7a8a, roughness: 0.08, metalness: 0.45, emissive: 0x0a3040, emissiveIntensity: 0.35 });
    const reed = std(0x9a9a4a, { roughness: 0.9, flat: true }); const trunk = std(0x7a5a3a, { roughness: 1 }); const frond = std(0x5a8a3a, { roughness: 0.85, flat: true });
    const palm = (x, z, h) => { const g = new THREE.Group(); g.position.set(x, 0, z);
      for (let k = 0; k < 6; k++) g.add(mesh(new THREE.CylinderGeometry(0.22 - k * 0.015, 0.26 - k * 0.015, h / 6, 7), trunk, Math.sin(k * 0.5) * 0.15, h / 12 + (k * h) / 6, 0, false, false));
      for (let k = 0; k < 8; k++) { const a = (k / 8) * TAU; const f = mesh(new THREE.ConeGeometry(0.35, 3.2, 4), frond, Math.cos(a) * 1.2, h + 0.2, Math.sin(a) * 1.2, false, false); f.rotation.set(Math.sin(a) * 1.2, 0, -Math.cos(a) * 1.2); f.scale.set(1, 1, 0.25); g.add(f); }
      g.add(mesh(new THREE.SphereGeometry(0.35, 8, 6), std(0xa8602a, { roughness: 0.8 }), 0, h - 0.2, 0, false, false)); W.group.add(g); W.colliders.push({ t: 1, x, z, r: 0.35, h }); };
    // canales del Éufrates con juncos y palmeras datileras
    for (const side of [-1, 1]) {
      const wt = mesh(new THREE.PlaneGeometry(3.4, 84), water, side * 20.6, 0.05, -5, false, true); wt.rotation.x = -Math.PI / 2; W.group.add(wt);
      W.colliders.push({ t: 0, x0: side > 0 ? 18.9 : -22.3, x1: side > 0 ? 22.3 : -18.9, z0: -47, z1: 37, h: 3 });
      for (let z = -44; z < 36; z += 1.6) for (let k = 0; k < 2; k++) { const x = side * (18.7 + r() * 0.5 + k * 3.3); if (r() < 0.35) continue; const c = mesh(new THREE.ConeGeometry(0.06, 1.4 + r() * 1.2, 4), reed, x, 0.7, z + r(), false, false); c.rotation.z = (r() - 0.5) * 0.3; W.group.add(c); }
      for (let z = -40; z < 34; z += 9) { const x = side * (16.4 + r() * 0.8), zz = z + r() * 3; if (!W._near(x, zz, 1.5)) palm(x, zz, 5 + r() * 2.5); }
      // muros de adobe con contrafuertes y franja de ladrillo vidriado
      W.group.add(mesh(new THREE.BoxGeometry(1.6, 6.5, 84), brick, side * 24, 3.25, -5)); W.colliders.push({ t: 0, x0: side * 24 - 0.9, x1: side * 24 + 0.9, z0: -47, z1: 37, h: 7 });
      W.group.add(mesh(new THREE.BoxGeometry(1.7, 0.6, 84), blueGlaze, side * 24, 5.2, -5, false, false));
      for (let z = -44; z < 36; z += 3.5) W.group.add(mesh(new THREE.BoxGeometry(0.9, 7, 1.2), brick, side * 23.3, 3.5, z, false, false));
    }
    // casas de junco en arco (mudhif) entre las palmeras
    const mat = std(0xc8b07a, { roughness: 1 });
    for (const [x, z] of [[-11, 33], [11, 33], [-12, -36], [12, -36]]) { if (W._near(x, z, 2.5)) continue; const g = new THREE.Group(); g.position.set(x, 0, z);
      const hut = mesh(new THREE.CylinderGeometry(2, 2, 6, 14, 1, false, 0, Math.PI), mat, 0, 0, 0); hut.rotation.set(0, 0, Math.PI / 2); hut.rotation.y = Math.PI / 2; g.add(hut);
      for (let k = -2; k <= 2; k++) { const a = mesh(new THREE.TorusGeometry(2.05, 0.12, 6, 16, Math.PI), trunk, 0, 0, k * 1.4, false, false); g.add(a); }
      W.group.add(g); W.colliders.push({ t: 0, x0: x - 3, x1: x + 3, z0: z - 2.2, z1: z + 2.2, h: 2.2 }); }
    // el gran zigurat al fondo, con escalera central y templo azul en lo alto
    { const zg = new THREE.Group(); zg.position.set(0, 0, -95);
      for (let k = 0; k < 3; k++) { const w2 = 64 - k * 18, d = 46 - k * 13, h = 9 - k; zg.add(mesh(new THREE.BoxGeometry(w2, h, d), brick, 0, k * 9 + h / 2, 0, false, false)); for (let j = -3; j <= 3; j++) zg.add(mesh(new THREE.BoxGeometry(1.4, h, 1), mud, j * (w2 / 7), k * 9 + h / 2, d / 2 + 0.3, false, false)); }
      zg.add(mesh(new THREE.BoxGeometry(12, 6, 10), blueGlaze, 0, 29, 0, false, false)); zg.add(mesh(new THREE.BoxGeometry(13, 0.8, 11), std(0xd8b070), 0, 32.4, 0, false, false));
      { const st = new THREE.Group(); st.position.set(0, 0, 23); // escalera central de tres tramos
        for (let k = 0; k < 18; k++) st.add(mesh(new THREE.BoxGeometry(10, 1, 1.6), std(0xc89a68, { roughness: 1 }), 0, k + 0.5, 14 - k * 0.8, false, false));
        for (const sx of [-5.6, 5.6]) for (let k = 0; k < 18; k += 3) st.add(mesh(new THREE.BoxGeometry(1.2, 3.2, 2.4), mud, sx, k + 1.6, 14 - k * 0.8, false, false));
        zg.add(st); }
      W.group.add(zg); }
    // llanura y montañas lejanas de Zagros
    const mtn = std(0x8a6a5a, { roughness: 1, flat: true });
    for (const [x, z, h, s] of [[-150, -230, 60, 70], [-60, -260, 45, 60], [90, -250, 55, 80], [180, -220, 40, 60]]) W.group.add(mesh(new THREE.ConeGeometry(s, h, 7), mtn, x, h / 2 - 3, z, false, false));
    // braseros en la vía procesional
    for (const [x, z] of [[-5, 24], [5, 24], [-5, -6], [5, -6]]) { if (!W._near(x, z, 0.3)) brazier(W, x, z, 0xff9a40, false); }
    brazier(W, -4, -34, 0xff8a30); brazier(W, 4, -34, 0xff8a30);
  },
  // ------------------------------------------------------------------ XVII · Bagdad
  function (W) {
    const fl = texTiles('xvii', 0xe8e0d0, 0x2a6a8a, 8, 0.1); fl.repeat.set(12, 20);
    ground(W, fl, [80, 120], 0.6);
    const r = mulberry32(117);
    const stucco = std(0xe8d8b8, { roughness: 0.85 }); const tile = std(0x2a7a9a, { roughness: 0.35, metalness: 0.1 }); const gold = std(0xd8b048, { metalness: 0.7, roughness: 0.35 });
    const trunk = std(0x7a5a3a, { roughness: 1 }); const frond = std(0x3a6a3a, { roughness: 0.85, flat: true });
    // galerías de arcos apuntados a ambos lados, con faroles
    for (const side of [-1, 1]) {
      W.group.add(mesh(new THREE.BoxGeometry(1.2, 7, 84), stucco, side * 24, 3.5, -5)); W.colliders.push({ t: 0, x0: side * 24 - 0.7, x1: side * 24 + 0.7, z0: -47, z1: 37, h: 7 });
      W.group.add(mesh(new THREE.BoxGeometry(5.6, 0.6, 84), stucco, side * 21.6, 6.2, -5, false, false));
      W.group.add(mesh(new THREE.BoxGeometry(5.7, 0.25, 84), tile, side * 21.6, 5.8, -5, false, false));
      for (let z = -44; z < 36; z += 4) {
        W.group.add(mesh(new THREE.CylinderGeometry(0.28, 0.32, 5.6, 10), stucco, side * 19, 2.8, z)); W.colliders.push({ t: 1, x: side * 19, z, r: 0.35, h: 6 });
        const arch = mesh(new THREE.TorusGeometry(1.75, 0.22, 6, 18, Math.PI), stucco, side * 19, 5.1, z + 2, false, false); arch.rotation.y = Math.PI / 2; arch.scale.set(1, 1.35, 1); W.group.add(arch);
        if ((z + 44) % 8 === 0) { const l = mesh(new THREE.SphereGeometry(0.22, 10, 8), glow(0xffc070, 3), side * 19, 4.3, z + 2, false, false); W.group.add(l); }
      }
    }
    // palmeras y fuente con cuatro canales (jardín)
    const palm = (x, z, h) => { const g = new THREE.Group(); g.position.set(x, 0, z);
      for (let k = 0; k < 6; k++) g.add(mesh(new THREE.CylinderGeometry(0.2 - k * 0.012, 0.24 - k * 0.012, h / 6, 7), trunk, Math.sin(k * 0.6) * 0.12, h / 12 + (k * h) / 6, 0, false, false));
      for (let k = 0; k < 8; k++) { const a = (k / 8) * TAU; const f = mesh(new THREE.ConeGeometry(0.32, 3, 4), frond, Math.cos(a) * 1.1, h + 0.2, Math.sin(a) * 1.1, false, false); f.rotation.set(Math.sin(a) * 1.2, 0, -Math.cos(a) * 1.2); f.scale.set(1, 1, 0.25); g.add(f); }
      W.group.add(g); W.colliders.push({ t: 1, x, z, r: 0.32, h }); };
    for (let i = 0; i < 14; i++) { const x = (r() < 0.5 ? -1 : 1) * (14.5 + r() * 2.5), z = -42 + r() * 74; if (!W._near(x, z, 2.2)) palm(x, z, 5 + r() * 2); }
    if (!W._near(0, 9, 3.5)) { W.group.add(mesh(new THREE.CylinderGeometry(2.6, 2.8, 0.7, 8), tile, 0, 0.35, 9)); W.group.add(mesh(new THREE.CylinderGeometry(2.2, 2.2, 0.1, 8), new THREE.MeshStandardMaterial({ color: 0x3a8aaa, roughness: 0.05, metalness: 0.5, emissive: 0x0a3040, emissiveIntensity: 0.4 }), 0, 0.72, 9, false, false)); W.colliders.push({ t: 1, x: 0, z: 9, r: 2.8, h: 0.8 }); W.emitters.push({ x: 0, y: 1.6, z: 9, col: 0xbfeaff, rate: 18, acc: 0, kind: 'water' }); }
    // cúpulas y alminar al fondo: la ciudad redonda
    { const g = new THREE.Group(); g.position.set(0, 0, -92);
      for (const [x, z, s] of [[0, 0, 14], [-22, 8, 8], [22, 8, 8]]) { g.add(mesh(new THREE.CylinderGeometry(s, s, s * 0.9, 16), stucco, x, s * 0.45, z, false, false)); g.add(mesh(new THREE.SphereGeometry(s, 20, 12, 0, TAU, 0, Math.PI / 2), tile, x, s * 0.9, z, false, false)); g.add(mesh(new THREE.ConeGeometry(0.6, 3, 8), gold, x, s * 1.9 + 1.5, z, false, false)); }
      g.add(mesh(new THREE.CylinderGeometry(1.6, 2.2, 34, 12), stucco, 32, 17, -6, false, false)); g.add(mesh(new THREE.CylinderGeometry(2.6, 2.6, 1, 12), tile, 32, 30, -6, false, false)); g.add(mesh(new THREE.ConeGeometry(1.8, 5, 12), gold, 32, 36.5, -6, false, false));
      W.group.add(g); }
    // faroles en la vía central
    for (const [x, z] of [[-5, 24], [5, 24], [-5, -6], [5, -6]]) { if (!W._near(x, z, 0.3)) brazier(W, x, z, 0xffb050, false); }
    brazier(W, -4, -34, 0xffb050); brazier(W, 4, -34, 0xffb050);
  },
  // ------------------------------------------------------------------ XVIII · Jardín de los poetas
  function (W) {
    const grass = texTiles('xviii', 0x6a9a4a, 0x5a8a3a, 10, 0.25); grass.repeat.set(16, 24); ground(W, grass, [80, 120], 1);
    const path = new THREE.PlaneGeometry(6, 84); path.rotateX(-Math.PI / 2);
    const pt = texTiles('xviiip', 0xd8c8b0, 0x9a8a70, 4, 0.2); const ptc = pt.clone(); ptc.repeat.set(2, 24); ptc.needsUpdate = true;
    W.group.add(mesh(path, std(0xffffff, { map: ptc, roughness: 0.95 }), 0, 0.01, -5, false, true));
    const r = mulberry32(118);
    const petals = [0xff6a9a, 0xffd04a, 0xffffff, 0xc86aff, 0xff8a4a, 0x6aa8ff];
    // arriates de flores y cipreses a lo largo del paseo
    for (const side of [-1, 1]) for (let z = -42; z < 34; z += 5) {
      const x = side * (6 + r() * 2); if (W._near(x, z, 2)) continue;
      W.group.add(mesh(new THREE.BoxGeometry(2.2, 0.35, 3.4), std(0x5a3a22, { roughness: 1 }), x, 0.17, z, false, false));
      for (let k = 0; k < 14; k++) W.group.add(mesh(new THREE.IcosahedronGeometry(0.13 + r() * 0.08, 0), std(petals[(k + Math.floor(z)) % petals.length], { roughness: 0.7, flat: true }), x + (r() - 0.5) * 1.9, 0.45, z + (r() - 0.5) * 3, false, false));
      W.colliders.push({ t: 0, x0: x - 1.1, x1: x + 1.1, z0: z - 1.7, z1: z + 1.7, h: 0.4 });
    }
    for (const side of [-1, 1]) for (let z = -44; z < 36; z += 4) { const x = side * (21 + r()); const c = cypress(7 + r() * 3); c.position.set(x, 0, z); W.group.add(c); W.colliders.push({ t: 1, x, z, r: 0.5, h: 7 }); }
    // pérgolas con enredaderas
    const wood = std(0xe8e0d0, { roughness: 0.8 }); const vine = std(0x4a8a3a, { roughness: 0.9, flat: true });
    for (const z of [26, 2, -22]) { if (W._near(0, z, 2.5)) continue; for (const x of [-3.4, 3.4]) { W.group.add(mesh(new THREE.CylinderGeometry(0.16, 0.18, 3.6, 8), wood, x, 1.8, z)); W.colliders.push({ t: 1, x, z, r: 0.25, h: 3.6 }); }
      const arc = mesh(new THREE.TorusGeometry(3.4, 0.14, 6, 20, Math.PI), wood, 0, 3.6, z, false, false); W.group.add(arc);
      for (let k = 0; k < 16; k++) { const a = (k / 15) * Math.PI; W.group.add(mesh(new THREE.IcosahedronGeometry(0.35, 0), k % 3 ? vine : std(0xff7aa8, { flat: true }), Math.cos(a) * 3.4, 3.6 + Math.sin(a) * 3.4, z + (r() - 0.5) * 0.4, false, false)); } }
    // estanque con puente en el lado izquierdo y glorieta al fondo
    { const pond = mesh(new THREE.CylinderGeometry(4, 4, 0.1, 24), new THREE.MeshStandardMaterial({ color: 0x4a7a9a, roughness: 0.05, metalness: 0.4, emissive: 0x1a2a40, emissiveIntensity: 0.3 }), -13, 0.06, 18, false, false); if (!W._near(-13, 18, 4.5)) { W.group.add(pond); W.colliders.push({ t: 1, x: -13, z: 18, r: 4, h: 0.5 }); for (let k = 0; k < 6; k++) W.group.add(mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.05, 8), std(0x5a9a4a), -13 + (r() - 0.5) * 5, 0.13, 18 + (r() - 0.5) * 5, false, false)); } }
    { const g = new THREE.Group(); g.position.set(0, 0, -60); for (let k = 0; k < 8; k++) { const a = (k / 8) * TAU; g.add(mesh(new THREE.CylinderGeometry(0.3, 0.3, 6, 8), wood, Math.cos(a) * 6, 3, Math.sin(a) * 6, false, false)); } g.add(mesh(new THREE.SphereGeometry(7, 20, 10, 0, TAU, 0, Math.PI / 2), std(0xe8d8e8, { roughness: 0.7 }), 0, 6, 0, false, false)); W.group.add(g); }
    for (const [x, z] of [[-5, 24], [5, 24], [-5, -6], [5, -6]]) { if (!W._near(x, z, 0.3)) brazier(W, x, z, 0xffb0a0, false); }
    brazier(W, -4, -34, 0xffa080); brazier(W, 4, -34, 0xffa080);
  },
  // ------------------------------------------------------------------ XIX · Taller de los científicos
  function (W) {
    const fl = texTiles('xix', 0x9aa0a8, 0x5a6068, 6, 0.12); fl.repeat.set(14, 22); ground(W, fl, [80, 120], 0.7);
    const r = mulberry32(119);
    const iron = std(0x3a3e48, { metalness: 0.7, roughness: 0.4 }); const glass = new THREE.MeshStandardMaterial({ color: 0xbfe0ff, roughness: 0.05, metalness: 0.2, transparent: true, opacity: 0.25 });
    const brass = std(0xc8a050, { metalness: 0.9, roughness: 0.3 }); const board = std(0x1e2a24, { roughness: 0.9 }); const chalk = std(0xf0f0e8, { roughness: 1 });
    // naves de hierro y vidrio a ambos lados
    for (const side of [-1, 1]) {
      W.group.add(mesh(new THREE.BoxGeometry(0.4, 9, 84), glass, side * 24, 4.5, -5, false, false)); W.colliders.push({ t: 0, x0: side * 24 - 0.5, x1: side * 24 + 0.5, z0: -47, z1: 37, h: 9 });
      for (let z = -44; z < 37; z += 4) { W.group.add(mesh(new THREE.BoxGeometry(0.3, 9, 0.3), iron, side * 23.8, 4.5, z, false, false)); const a = mesh(new THREE.TorusGeometry(5, 0.12, 6, 18, Math.PI / 2), iron, side * 19, 9, z, false, false); a.rotation.y = side > 0 ? 0 : Math.PI; W.group.add(a); }
      // pizarras con fórmulas
      for (let z = -36; z < 30; z += 16) { const x = side * 22.6; if (W._near(x, z, 2)) continue; const b = mesh(new THREE.BoxGeometry(0.2, 2.4, 4.6), board, x, 2.2, z, false, false); W.group.add(b);
        for (let k = 0; k < 9; k++) W.group.add(mesh(new THREE.BoxGeometry(0.05, 0.06, 0.4 + r() * 1.6), chalk, x - side * 0.12, 1.4 + (k % 5) * 0.35, z - 1.6 + Math.floor(k / 5) * 2 + r() * 0.6, false, false)); }
      // engranajes en los muros
      for (let z = -40; z < 34; z += 12) { const g = mesh(new THREE.TorusGeometry(1 + r() * 0.6, 0.18, 6, 16), brass, side * 23.5, 6 + r() * 1.5, z, false, false); g.rotation.y = Math.PI / 2; W.group.add(g); W.anim && W.anim.push((t) => { g.rotation.x = t * (0.3 + (z % 3) * 0.1) * side; }); }
    }
    // gran planetario mecánico en el centro de la plaza
    if (!W._near(0, 9, 3.5)) { const o = new THREE.Group(); o.position.set(0, 0, 9);
      o.add(mesh(new THREE.CylinderGeometry(1.2, 1.6, 1, 12), iron, 0, 0.5, 0)); o.add(mesh(new THREE.SphereGeometry(0.7, 20, 14), glow(0xffd070, 3), 0, 2.4, 0, false, false));
      const rings = []; for (let k = 0; k < 4; k++) { const ring = new THREE.Group(); ring.position.y = 2.4; const t2 = mesh(new THREE.TorusGeometry(1.3 + k * 0.6, 0.03, 6, 48), brass, 0, 0, 0, false, false); t2.rotation.x = Math.PI / 2; ring.add(t2); ring.add(mesh(new THREE.SphereGeometry(0.16 + k * 0.04, 12, 8), std([0x8a8aff, 0x4aa8ff, 0xff8a4a, 0xd8b070][k]), 1.3 + k * 0.6, 0, 0, false, false)); o.add(ring); rings.push(ring); }
      W.group.add(o); W.colliders.push({ t: 1, x: 0, z: 9, r: 2, h: 3 }); W.anim && W.anim.push((t) => rings.forEach((rg, k) => (rg.rotation.y = t * (0.6 / (k + 1))))); }
    // cúpula de observatorio al fondo
    { const g = new THREE.Group(); g.position.set(0, 0, -78); g.add(mesh(new THREE.CylinderGeometry(14, 14, 10, 24), std(0xe8e4dc, { roughness: 0.8 }), 0, 5, 0, false, false)); g.add(mesh(new THREE.SphereGeometry(14, 24, 12, 0, TAU, 0, Math.PI / 2), std(0xc8ccd4, { metalness: 0.6, roughness: 0.35 }), 0, 10, 0, false, false));
      const tel = mesh(new THREE.CylinderGeometry(1, 1.4, 14, 12), iron, 0, 20, 4, false, false); tel.rotation.x = -0.7; g.add(tel); W.group.add(g); }
    for (const [x, z] of [[-5, 24], [5, 24], [-5, -6], [5, -6]]) { if (!W._near(x, z, 0.3)) brazier(W, x, z, 0x9adcff, false); }
    brazier(W, -4, -34, 0x9adcff); brazier(W, 4, -34, 0x9adcff);
  },
  // ------------------------------------------------------------------ XX · Japón del zen
  function (W) {
    const grav = texTiles('xx', 0xd8d4c8, 0xb8b4a8, 12, 0.1); grav.repeat.set(16, 24); ground(W, grav, [80, 120], 1);
    const path = new THREE.PlaneGeometry(4, 84); path.rotateX(-Math.PI / 2);
    const pt = texTiles('xxp', 0x8a8478, 0x5a564e, 3, 0.25); const ptc = pt.clone(); ptc.repeat.set(1, 20); ptc.needsUpdate = true;
    W.group.add(mesh(path, std(0xffffff, { map: ptc, roughness: 0.95 }), 0, 0.01, -5, false, true));
    const r = mulberry32(120);
    const red = std(0xc8302a, { roughness: 0.6 }); const black = std(0x1a1a1a, { roughness: 0.7 }); const stone = std(0x8a8880, { roughness: 0.95, flat: true });
    const wood = std(0x6a4a30, { roughness: 0.85 }); const plaster = std(0xf0ece0, { roughness: 0.9 });
    const bloom = [std(0xffb8cc, { roughness: 0.8, flat: true }), std(0xffd0dc, { roughness: 0.8, flat: true }), std(0xff9ab8, { roughness: 0.8, flat: true })];
    // toriis a lo largo del camino central
    for (const z of [30, 14, -2, -18]) { if (W._near(0, z, 1.5)) continue; const g = new THREE.Group(); g.position.set(0, 0, z);
      for (const x of [-2.6, 2.6]) { g.add(mesh(new THREE.CylinderGeometry(0.2, 0.24, 4.6, 10), red, x, 2.3, 0)); W.colliders.push({ t: 1, x, z, r: 0.3, h: 4.6 }); }
      g.add(mesh(new THREE.BoxGeometry(6.8, 0.32, 0.4), black, 0, 4.7, 0, false, false)); g.add(mesh(new THREE.BoxGeometry(6.2, 0.22, 0.3), red, 0, 4.15, 0, false, false));
      W.group.add(g); }
    // cerezos en flor y faroles de piedra
    const sakura = (x, z) => { const g = new THREE.Group(); g.position.set(x, 0, z); const h = 2.6 + r() * 1.2;
      const tr = mesh(new THREE.CylinderGeometry(0.16, 0.3, h, 7), std(0x4a3228, { roughness: 1 }), 0, h / 2, 0); tr.rotation.z = (r() - 0.5) * 0.25; g.add(tr);
      for (let k = 0; k < 9; k++) g.add(mesh(new THREE.IcosahedronGeometry(0.9 + r() * 0.7, 0), bloom[k % 3], (r() - 0.5) * 3.2, h + 0.3 + r() * 1.4, (r() - 0.5) * 3.2, false, false));
      W.group.add(g); W.colliders.push({ t: 1, x, z, r: 0.4, h: h + 2 }); };
    const lantern = (x, z) => { const g = new THREE.Group(); g.position.set(x, 0, z);
      g.add(mesh(new THREE.CylinderGeometry(0.35, 0.45, 0.3, 6), stone, 0, 0.15, 0)); g.add(mesh(new THREE.CylinderGeometry(0.14, 0.18, 1.1, 8), stone, 0, 0.85, 0));
      g.add(mesh(new THREE.BoxGeometry(0.6, 0.5, 0.6), stone, 0, 1.6, 0)); g.add(mesh(new THREE.BoxGeometry(0.34, 0.3, 0.62), glow(0xffd8a0, 2.2), 0, 1.6, 0, false, false));
      g.add(mesh(new THREE.ConeGeometry(0.62, 0.45, 6), stone, 0, 2.08, 0)); W.group.add(g); W.colliders.push({ t: 1, x, z, r: 0.45, h: 2.2 }); };
    for (const side of [-1, 1]) for (let z = -42; z < 34; z += 7) { const x = side * (9 + r() * 6); if (!W._near(x, z, 2.2)) sakura(x, z); }
    for (const side of [-1, 1]) for (let z = -38; z < 34; z += 12) { const x = side * 3.6; if (!W._near(x, z, 1)) lantern(x, z); }
    // bambúes junto a los muros y muros encalados con tejado
    for (const side of [-1, 1]) {
      for (let z = -44; z < 36; z += 0.9) { const x = side * (21 + r() * 1.6); const h = 6 + r() * 4; W.group.add(mesh(new THREE.CylinderGeometry(0.07, 0.09, h, 6), std(0x6a9a3a, { roughness: 0.6 }), x, h / 2, z + r() * 0.5, false, false)); }
      W.group.add(mesh(new THREE.BoxGeometry(0.6, 3, 84), plaster, side * 23.4, 1.5, -5, false, false)); W.colliders.push({ t: 0, x0: side * 23.4 - 0.5, x1: side * 23.4 + 0.5, z0: -47, z1: 37, h: 3 });
      const roof = mesh(new THREE.BoxGeometry(1.6, 0.18, 84.6), std(0x3a3e44, { roughness: 0.8 }), side * 23.4, 3.1, -5, false, false); W.group.add(roof); }
    // jardín de piedras rastrillado con estanque y puente rojo
    if (!W._near(-12, 16, 4)) { const pond = mesh(new THREE.CylinderGeometry(4.2, 4.2, 0.1, 28), new THREE.MeshStandardMaterial({ color: 0x3a6a7a, roughness: 0.05, metalness: 0.4, emissive: 0x0a2a30, emissiveIntensity: 0.3 }), -12, 0.06, 16, false, false); W.group.add(pond);
      const br = mesh(new THREE.TorusGeometry(3, 0.25, 6, 16, Math.PI), red, -12, -1.6, 16, false, false); br.scale.set(1.2, 0.7, 2); W.group.add(br);
      for (let k = 0; k < 5; k++) { const fish = mesh(new THREE.SphereGeometry(0.18, 8, 6), std(k % 2 ? 0xff7a2a : 0xf0f0f0), -12, 0.12, 16, false, false); fish.scale.set(1.8, 0.5, 0.7); W.group.add(fish); const ph = r() * TAU, rad = 1.4 + r() * 2; W.anim && W.anim.push((t) => { const a = ph + t * 0.35; fish.position.set(-12 + Math.cos(a) * rad, 0.12, 16 + Math.sin(a) * rad); fish.rotation.y = -a; }); }
      W.colliders.push({ t: 1, x: -12, z: 16, r: 4.2, h: 0.4 }); }
    if (!W._near(13, 4, 4)) { for (let k = 0; k < 7; k++) { const ring = mesh(new THREE.TorusGeometry(1 + k * 0.45, 0.04, 4, 40), std(0xa8a49a, { roughness: 1 }), 13, 0.03, 4, false, false); ring.rotation.x = Math.PI / 2; W.group.add(ring); }
      W.group.add(mesh(new THREE.DodecahedronGeometry(0.8, 0), stone, 13, 0.5, 4)); W.colliders.push({ t: 1, x: 13, z: 4, r: 1, h: 1 }); }
    // pagoda de cinco pisos al fondo
    { const g = new THREE.Group(); g.position.set(0, 0, -74);
      for (let k = 0; k < 5; k++) { const w = 11 - k * 1.6, y = k * 5.2; g.add(mesh(new THREE.BoxGeometry(w * 0.62, 4, w * 0.62), k % 2 ? plaster : std(0xa83a2a, { roughness: 0.8 }), 0, y + 2, 0, false, false));
        const rf = mesh(new THREE.ConeGeometry(w * 0.78, 1.6, 4), std(0x2a2e34, { roughness: 0.8 }), 0, y + 4.6, 0, false, false); rf.rotation.y = Math.PI / 4; g.add(rf); }
      g.add(mesh(new THREE.CylinderGeometry(0.15, 0.15, 7, 8), std(0xc8a050, { metalness: 0.8, roughness: 0.3 }), 0, 29, 0, false, false)); W.group.add(g); }
    for (const [x, z] of [[-5, 24], [5, 24], [-5, -6], [5, -6]]) { if (!W._near(x, z, 0.3)) brazier(W, x, z, 0xffc890, false); }
    brazier(W, -4, -34, 0xffc890); brazier(W, 4, -34, 0xffc890);
  },
  // ------------------------------------------------------------------ XXI · El Norte vikingo
  function (W) {
    const dirt = texTiles('xxi', 0x5a4a3a, 0x3a3028, 8, 0.3); dirt.repeat.set(16, 24); ground(W, dirt, [80, 120], 1);
    const path = new THREE.PlaneGeometry(4, 84); path.rotateX(-Math.PI / 2);
    const pt = texTiles('xxip', 0x6a5a48, 0x4a3a2a, 2, 0.2); const ptc = pt.clone(); ptc.repeat.set(1, 24); ptc.needsUpdate = true;
    W.group.add(mesh(path, std(0xffffff, { map: ptc, roughness: 1 }), 0, 0.01, -5, false, true));
    const r = mulberry32(121);
    const timber = std(0x4a3424, { roughness: 0.9 }); const turf = std(0x4a6a3a, { roughness: 1, flat: true }); const stone = std(0x7a7a78, { roughness: 1, flat: true }); const snow = std(0xeef2f6, { roughness: 0.9, flat: true });
    // casas largas a ambos lados, con techo de turba
    for (const side of [-1, 1]) for (const z of [22, 0, -24]) {
      const x = side * 17; if (W._near(x, z, 5)) continue; const g = new THREE.Group(); g.position.set(x, 0, z);
      g.add(mesh(new THREE.BoxGeometry(7, 3, 14), timber, 0, 1.5, 0));
      const roof = mesh(new THREE.CylinderGeometry(4.6, 4.6, 14.6, 4, 1, false, 0, Math.PI), turf, 0, 2.9, 0, false, false); roof.rotation.set(Math.PI / 2, 0, Math.PI / 2); roof.scale.set(1, 1, 0.62); g.add(roof);
      g.add(mesh(new THREE.BoxGeometry(1.4, 2.2, 0.2), std(0x2a1a10), -side * 3.55, 1.1, 0, false, false).rotateY(Math.PI / 2));
      W.group.add(g); W.colliders.push({ t: 0, x0: x - 3.6, x1: x + 3.6, z0: z - 7.2, z1: z + 7.2, h: 4 }); }
    // pinos y rocas nevadas junto a los muros
    for (const side of [-1, 1]) for (let z = -44; z < 36; z += 3.2) { const x = side * (21.5 + r() * 1.5); const h = 5 + r() * 4;
      const g = new THREE.Group(); g.position.set(x, 0, z); g.add(mesh(new THREE.CylinderGeometry(0.15, 0.22, h * 0.3, 6), timber, 0, h * 0.15, 0, false, false));
      for (let k = 0; k < 3; k++) g.add(mesh(new THREE.ConeGeometry(1.5 - k * 0.38, h * 0.38, 7), std(0x2a4a34, { roughness: 1, flat: true }), 0, h * (0.32 + k * 0.22), 0, false, false));
      g.add(mesh(new THREE.ConeGeometry(0.42, h * 0.16, 7), snow, 0, h * 0.95, 0, false, false)); W.group.add(g); W.colliders.push({ t: 1, x, z, r: 0.9, h }); }
    // piedras rúnicas
    for (const [x, z] of [[-6, 16], [6, -12], [-6, -30]]) { if (W._near(x, z, 1.2)) continue; const st = mesh(new THREE.BoxGeometry(1.1, 2.6, 0.4), stone, x, 1.3, z); st.rotation.y = r() * 0.6 - 0.3; W.group.add(st);
      for (let k = 0; k < 6; k++) W.group.add(mesh(new THREE.BoxGeometry(0.06, 0.32, 0.05), glow(0xd83a2a, 1.2), x - 0.3 + (k % 3) * 0.3, 1.2 + Math.floor(k / 3) * 0.6, z + 0.22, false, false));
      W.colliders.push({ t: 1, x, z, r: 0.7, h: 2.6 }); }
    // fuego largo en el centro de la plaza
    if (!W._near(0, 6, 2.5)) { W.group.add(mesh(new THREE.BoxGeometry(1.6, 0.3, 5), stone, 0, 0.15, 6)); for (let k = -2; k <= 2; k++) brazier(W, 0, 6 + k * 1.1, 0xff8a30, k === 0); }
    // barco vikingo varado junto a la costa del fondo, con proa de dragón
    { const g = new THREE.Group(); g.position.set(0, 0, -64);
      const hull = mesh(new THREE.SphereGeometry(1, 20, 10, 0, TAU, Math.PI / 2, Math.PI / 2), timber, 0, 2.2, 0, false, false); hull.scale.set(3.4, 2.2, 13); g.add(hull);
      const prow = mesh(new THREE.TorusGeometry(1.6, 0.25, 6, 12, Math.PI), timber, 0, 3.6, -12.4, false, false); prow.rotation.y = Math.PI / 2; g.add(prow);
      g.add(mesh(new THREE.CylinderGeometry(0.2, 0.25, 12, 8), timber, 0, 8, 0, false, false));
      const sail = mesh(new THREE.PlaneGeometry(8, 6), new THREE.MeshStandardMaterial({ color: 0xc83a2a, roughness: 0.9, side: THREE.DoubleSide }), 0, 9, 0.3, false, false); g.add(sail);
      for (let k = -3; k <= 3; k += 2) g.add(mesh(new THREE.BoxGeometry(0.9, 6, 0.04), std(0xf0e8d8, { roughness: 0.9 }), k * 1.1, 9, 0.35, false, false));
      for (let k = 0; k < 7; k++) for (const sd of [-1, 1]) g.add(mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.1, 14), k % 2 ? std(0xc8a050, { metalness: 0.6, roughness: 0.4 }) : std(0x2a4a7a), sd * 3.3, 2.6, -8 + k * 2.6, false, false).rotateZ(Math.PI / 2));
      W.group.add(g); }
    // montañas nevadas al fondo
    for (let k = 0; k < 7; k++) { const m = mesh(new THREE.ConeGeometry(18 + r() * 10, 30 + r() * 20, 7), farStd(W, 0x4a5a6a, 0.35), -60 + k * 20, 12, -110 - r() * 20, false, false); W.group.add(m);
      W.group.add(mesh(new THREE.ConeGeometry(7, 10, 7), farStd(W, 0xeef2f6, 0.1), m.position.x, m.position.y + m.geometry.parameters.height / 2 - 4, m.position.z, false, false)); }
    // aurora boreal: cortinas de luz que ondulan en el cielo
    { const c = document.createElement('canvas'); c.width = 128; c.height = 128; const x = c.getContext('2d'); const gr = x.createLinearGradient(0, 0, 0, 128); gr.addColorStop(0, 'rgba(120,255,200,0)'); gr.addColorStop(0.35, 'rgba(120,255,190,0.55)'); gr.addColorStop(0.75, 'rgba(80,200,255,0.25)'); gr.addColorStop(1, 'rgba(60,120,255,0)'); x.fillStyle = gr; x.fillRect(0, 0, 128, 128);
      x.globalCompositeOperation = 'destination-in'; const gh = x.createLinearGradient(0, 0, 128, 0); gh.addColorStop(0, 'rgba(0,0,0,0)'); gh.addColorStop(0.3, 'rgba(0,0,0,1)'); gh.addColorStop(0.7, 'rgba(0,0,0,1)'); gh.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = gh; x.fillRect(0, 0, 128, 128);
      const tex = new THREE.CanvasTexture(c);
      for (let k = 0; k < 3; k++) { const geo = new THREE.PlaneGeometry(260, 46, 48, 1); const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false, toneMapped: false, opacity: 0.55 });
        const a = new THREE.Mesh(geo, mat); a.position.set(-30 + k * 30, 95 + k * 12, -170 - k * 25); a.rotation.x = -0.25; W.group.add(a);
        const base = geo.attributes.position.array.slice(); W.anim && W.anim.push((t) => { const p = geo.attributes.position.array; for (let i = 0; i < p.length; i += 3) p[i + 2] = base[i + 2] + Math.sin(base[i] * 0.04 + t * 0.6 + k) * 10; geo.attributes.position.needsUpdate = true; }); } }
    for (const [x, z] of [[-5, 24], [5, 24], [-5, -6], [5, -6]]) { if (!W._near(x, z, 0.3)) brazier(W, x, z, 0xffa040, false); }
    brazier(W, -4, -34, 0xffa040); brazier(W, 4, -34, 0xffa040);
  },
  // ------------------------------------------------------------------ XXII · La antigua Persia
  function (W) {
    const sand = texTiles('xxii', 0xd8b88a, 0xb89868, 10, 0.18); sand.repeat.set(16, 24); ground(W, sand, [80, 120], 1);
    const r = mulberry32(131);
    const lime = std(0xe8d8b8, { roughness: 0.85 }); const stone = std(0xc8b08a, { roughness: 0.9 }); const dark = std(0x5a4a3a, { roughness: 0.9 });
    const tile = std(0x2a9ab0, { roughness: 0.35, metalness: 0.1 }); const tile2 = std(0x1a4a8a, { roughness: 0.35 }); const gold = std(0xd8b048, { metalness: 0.7, roughness: 0.35 });
    const water = new THREE.MeshStandardMaterial({ color: 0x3aa8c0, roughness: 0.05, metalness: 0.35, emissive: 0x0a3a48, emissiveIntensity: 0.35 });
    // el jardín cuatripartito (chahar bagh): canal central a lo largo del camino y canal transversal
    { const ch = mesh(new THREE.BoxGeometry(1.4, 0.12, 70), water, 0, 0.06, -6, false, true); W.group.add(ch);
      for (const sd of [-1, 1]) W.group.add(mesh(new THREE.BoxGeometry(0.3, 0.25, 70), tile, sd * 0.85, 0.12, -6, false, false));
      if (!W._near(0, 4, 2)) { W.group.add(mesh(new THREE.BoxGeometry(30, 0.12, 1.4), water, 0, 0.06, 4, false, true)); W.group.add(mesh(new THREE.CylinderGeometry(1.6, 1.8, 0.5, 8), tile, 0, 0.25, 4)); W.group.add(mesh(new THREE.CylinderGeometry(0.25, 0.3, 1.4, 8), lime, 0, 0.9, 4));
        W.emitters.push({ x: 0, y: 1.6, z: 4, col: 0xbfe8ff, rate: 6, acc: 0, kind: 'water' }); W.colliders.push({ t: 1, x: 0, z: 4, r: 1.8, h: 0.6 }); } }
    // cipreses y rosales a lo largo de los canales
    const cypress = (x, z) => { const h = 4 + r() * 2; const c = mesh(new THREE.ConeGeometry(0.5, h, 8), std(0x3a6a3a, { roughness: 1, flat: true }), x, h / 2, z); c.scale.set(1, 1, 1); W.group.add(c); W.colliders.push({ t: 1, x, z, r: 0.45, h }); };
    const roses = [std(0xd83a4a, { roughness: 0.8, flat: true }), std(0xff8aa0, { roughness: 0.8, flat: true }), std(0xf0e0a0, { roughness: 0.8, flat: true })];
    for (const sd of [-1, 1]) for (let z = -40; z < 32; z += 6) { const x = sd * (5.2 + r() * 0.6); if (!W._near(x, z, 1.2)) cypress(x, z);
      if (!W._near(sd * 3, z + 3, 1)) for (let k = 0; k < 3; k++) { W.group.add(mesh(new THREE.IcosahedronGeometry(0.45, 0), std(0x3a6a3a, { flat: true }), sd * (2.6 + r() * 0.8), 0.4, z + 3 + (r() - 0.5) * 1.5, false, false)); W.group.add(mesh(new THREE.IcosahedronGeometry(0.14, 0), roses[k], sd * (2.6 + r() * 0.8), 0.85, z + 3 + (r() - 0.5) * 1.5, false, false)); } }
    // granados con frutos rojos
    for (const [x, z] of [[-12, 20], [12, 14], [-13, -8], [13, -22], [-11, -30]]) { if (W._near(x, z, 2)) continue; const g = new THREE.Group(); g.position.set(x, 0, z);
      g.add(mesh(new THREE.CylinderGeometry(0.15, 0.25, 1.8, 7), std(0x5a3a28, { roughness: 1 }), 0, 0.9, 0)); g.add(mesh(new THREE.IcosahedronGeometry(1.4, 0), std(0x4a7a3a, { roughness: 1, flat: true }), 0, 2.4, 0, false, false));
      for (let k = 0; k < 7; k++) g.add(mesh(new THREE.SphereGeometry(0.14, 8, 6), std(0xc8202a, { roughness: 0.5 }), (r() - 0.5) * 2, 2 + r() * 1.2, (r() - 0.5) * 2, false, false));
      W.group.add(g); W.colliders.push({ t: 1, x, z, r: 0.5, h: 3 }); }
    // pórticos con columnas esbeltas y capiteles de toros a ambos lados (la Apadana de Persépolis)
    for (const side of [-1, 1]) {
      for (let z = -44; z <= 34; z += 4.5) { const x = side * 19.5; const g = new THREE.Group(); g.position.set(x, 0, z);
        g.add(mesh(new THREE.CylinderGeometry(0.75, 0.9, 0.5, 14), stone, 0, 0.25, 0)); g.add(mesh(flutedCylinder(0.34, 0.38, 7.2, 20, 0.04), lime, 0, 4.1, 0));
        g.add(mesh(new THREE.CylinderGeometry(0.5, 0.36, 0.6, 12), stone, 0, 8, 0));
        for (const sd of [-1, 1]) { const bull = mesh(new THREE.BoxGeometry(0.55, 0.6, 1.1), dark, 0, 8.65, sd * 0.5, false, false); g.add(bull); g.add(mesh(new THREE.BoxGeometry(0.4, 0.4, 0.35), dark, 0, 8.75, sd * 1.15, false, false)); }
        W.group.add(g); W.colliders.push({ t: 1, x, z, r: 0.55, h: 9 }); }
      W.group.add(mesh(new THREE.BoxGeometry(2.6, 0.6, 82), stone, side * 20.2, 9.3, -5, false, false));
      W.group.add(mesh(new THREE.BoxGeometry(0.6, 9.6, 82), lime, side * 23.4, 4.8, -5, false, false)); W.colliders.push({ t: 0, x0: side * 23.4 - 0.4, x1: side * 23.4 + 0.4, z0: -47, z1: 37, h: 9 });
      // friso de azulejos en el muro y relieves de las delegaciones
      W.group.add(mesh(new THREE.BoxGeometry(0.1, 0.7, 82), tile, side * 23.05, 6.4, -5, false, false));
      for (let z = -40; z <= 30; z += 3.5) W.group.add(mesh(new THREE.BoxGeometry(0.12, 1.6, 0.5), std(0xb8a07a, { roughness: 0.9 }), side * 23.05, 2.4, z + (r() - 0.5) * 0.3, false, false));
    }
    // altar del fuego zoroastriano
    if (!W._near(-8, -14, 2)) { W.group.add(mesh(new THREE.BoxGeometry(1.3, 1.2, 1.3), stone, -8, 0.6, -14)); W.group.add(mesh(new THREE.BoxGeometry(1.7, 0.3, 1.7), stone, -8, 1.35, -14)); brazier(W, -8, -14, 0xff9a40); W.colliders.push({ t: 1, x: -8, z: -14, r: 1, h: 1.5 }); }
    // gran iwán de azulejos turquesa al fondo, con cúpula
    { const g = new THREE.Group(); g.position.set(0, 0, -60);
      g.add(mesh(new THREE.BoxGeometry(22, 16, 4), lime, 0, 8, 0, false, false));
      g.add(mesh(new THREE.BoxGeometry(9, 12, 0.3), tile2, 0, 6, 2.05, false, false)); const arch = mesh(new THREE.CylinderGeometry(4.5, 4.5, 0.32, 24, 1, false, 0, Math.PI), tile2, 0, 12, 2.06, false, false); arch.rotation.set(Math.PI / 2, 0, Math.PI / 2); g.add(arch);
      for (const sd of [-1, 1]) { g.add(mesh(new THREE.BoxGeometry(2.2, 16.2, 0.4), tile, sd * 5.6, 8, 2.1, false, false)); g.add(mesh(new THREE.CylinderGeometry(1, 1.1, 22, 14), tile, sd * 12, 11, 0, false, false)); g.add(mesh(new THREE.ConeGeometry(1.3, 2.6, 14), gold, sd * 12, 23.3, 0, false, false)); }
      const dome = mesh(new THREE.SphereGeometry(7, 28, 16, 0, TAU, 0, Math.PI / 2), tile, 0, 16, -3, false, false); dome.scale.set(1, 1.25, 1); g.add(dome); g.add(mesh(new THREE.ConeGeometry(0.5, 2.5, 10), gold, 0, 26, -3, false, false));
      W.group.add(g); }
    // montes Zagros al fondo
    const mtn = farStd(W, 0x9a7a5a, 0.45);
    for (let k = 0; k < 10; k++) { const x = -150 + k * 33 + (r() - 0.5) * 12, z = -140 - r() * 50, h = 16 + r() * 18, w = 45 + r() * 25; const m = mesh(new THREE.ConeGeometry(w, h, 7), mtn, x, h / 2 - 4, z, false, false); m.scale.z = 0.6; W.group.add(m); }
    for (const [x, z] of [[-5, 24], [5, 24], [-5, -6], [5, -6]]) { if (!W._near(x, z, 0.3)) brazier(W, x, z, 0xffc070, false); }
    brazier(W, -4, -34, 0xffc070); brazier(W, 4, -34, 0xffc070);
  },
  // ------------------------------------------------------------------ XXIII · Los librepensadores
  function (W) {
    const marble = texTiles('xxiii', 0x7a7c88, 0x5a5c68, 6, 0.08); marble.repeat.set(12, 18); ground(W, marble, [80, 120], 0.6);
    const r = mulberry32(141);
    const white = std(0xece8e0, { roughness: 0.55 }); const wood = std(0x4a2e1c, { roughness: 0.8 }); const brass = std(0xc8a050, { metalness: 0.8, roughness: 0.3 });
    const glowB = (c, k = 3) => glow(c, k);
    // mapa del sistema solar incrustado en el suelo: órbitas de latón alrededor de un sol central
    { const cx = 0, cz = 2; if (!W._near(cx, cz, 3)) {
      for (const R of [2.2, 3.4, 4.6, 6.2]) { const o = mesh(new THREE.RingGeometry(R - 0.04, R + 0.04, 64), brass, cx, 0.03, cz, false, false); o.rotation.x = -Math.PI / 2; W.group.add(o); }
      // planetario mecánico en el centro (planetas que giran)
      const g = new THREE.Group(); g.position.set(cx, 0, cz); W.group.add(g);
      g.add(mesh(new THREE.CylinderGeometry(0.5, 0.7, 0.9, 16), wood, 0, 0.45, 0)); g.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.6, 8), brass, 0, 1.6, 0));
      g.add(mesh(new THREE.SphereGeometry(0.42, 20, 14), glowB(0xffd070, 4), 0, 2.5, 0, false, false));
      const arms = [[1.3, 0.14, 0x9ab0ff, 1.6], [2.0, 0.2, 0x5aa0ff, 1.0], [2.8, 0.18, 0xff8a5a, 0.7], [3.8, 0.34, 0xe8c08a, 0.4]].map(([R, rr, c, sp]) => { const a = new THREE.Group(); a.position.y = 2.5; g.add(a); a.add(mesh(new THREE.BoxGeometry(R, 0.03, 0.03), brass, R / 2, 0, 0, false, false)); a.add(mesh(new THREE.SphereGeometry(rr, 14, 10), std(c, { roughness: 0.5 }), R, 0, 0, false, false)); return [a, sp]; });
      W.anim.push((t) => { for (const [a, sp] of arms) a.rotation.y = t * sp * 0.4; });
      W.colliders.push({ t: 1, x: cx, z: cz, r: 0.8, h: 3 }); } }
    // columnatas jónicas con estanterías de libros detrás, a ambos lados
    for (const side of [-1, 1]) {
      for (let z = -44; z <= 34; z += 5) { const x = side * 19.5; W.group.add(mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.4, 14), white, x, 0.2, z)); W.group.add(mesh(flutedCylinder(0.38, 0.42, 7, 20, 0.04), white, x, 3.9, z)); W.group.add(mesh(new THREE.BoxGeometry(1.2, 0.4, 1.2), white, x, 7.6, z)); W.colliders.push({ t: 1, x, z, r: 0.5, h: 8 }); }
      W.group.add(mesh(new THREE.BoxGeometry(2.4, 0.8, 82), white, side * 20.2, 8.2, -5, false, false));
      W.group.add(mesh(new THREE.BoxGeometry(0.6, 9.6, 82), wood, side * 23.4, 4.8, -5, false, false)); W.colliders.push({ t: 0, x0: side * 23.4 - 0.4, x1: side * 23.4 + 0.4, z0: -47, z1: 37, h: 9 });
      // estantes con lomos de libros de colores
      const cols = [0x7a2a2a, 0x2a4a7a, 0x3a6a3a, 0x8a6a2a, 0x5a3a6a, 0x2a2a2a];
      for (let lvl = 0; lvl < 5; lvl++) for (let z = -44; z < 34; z += 1.6) { if (r() < 0.12) continue; W.group.add(mesh(new THREE.BoxGeometry(0.3, 1.1, 1.4 + r() * 0.15), std(cols[Math.floor(r() * cols.length)], { roughness: 0.8 }), side * 23.0, 1.0 + lvl * 1.6, z + 0.8, false, false)); }
      for (let lvl = 0; lvl <= 5; lvl++) W.group.add(mesh(new THREE.BoxGeometry(0.5, 0.08, 80), wood, side * 23.0, 0.42 + lvl * 1.6, -5, false, false));
    }
    // imprenta de Gutenberg en un rincón
    if (!W._near(-9, 18, 2.2)) { const g = new THREE.Group(); g.position.set(-9, 0, 18); g.rotation.y = 0.4;
      for (const sx of [-0.8, 0.8]) g.add(mesh(new THREE.BoxGeometry(0.25, 2.6, 0.25), wood, sx, 1.3, 0)); g.add(mesh(new THREE.BoxGeometry(1.9, 0.25, 0.4), wood, 0, 2.5, 0)); g.add(mesh(new THREE.BoxGeometry(1.5, 0.15, 1.2), wood, 0, 0.9, 0.2)); g.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.2, 8), brass, 0, 1.7, 0)); g.add(mesh(new THREE.BoxGeometry(1.0, 0.04, 0.7), std(0xf4ecd8, { roughness: 0.9 }), 0, 0.99, 0.2, false, false));
      W.group.add(g); W.colliders.push({ t: 1, x: -9, z: 18, r: 1.1, h: 2.6 }); }
    // farolas de luz fría a lo largo del camino
    for (const [x, z] of [[-4, 26], [4, 26], [-4, 10], [4, 10], [-4, -10], [4, -10], [-4, -28], [4, -28]]) { if (W._near(x, z, 0.6)) continue; W.group.add(mesh(new THREE.CylinderGeometry(0.07, 0.1, 3.4, 8), std(0x2a2a30, { metalness: 0.6, roughness: 0.4 }), x, 1.7, z)); W.group.add(mesh(new THREE.SphereGeometry(0.28, 14, 10), glowB(0xfff0c8, 3), x, 3.5, z, false, false)); W.colliders.push({ t: 1, x, z, r: 0.2, h: 3.4 }); }
    // observatorio con cúpula y gran telescopio al fondo
    { const g = new THREE.Group(); g.position.set(0, 0, -60);
      g.add(mesh(new THREE.CylinderGeometry(9, 9.5, 10, 32), white, 0, 5, 0, false, false));
      const dome = mesh(new THREE.SphereGeometry(9.2, 32, 16, 0, TAU, 0, Math.PI / 2), std(0xd8dce4, { metalness: 0.4, roughness: 0.35 }), 0, 10, 0, false, false); g.add(dome);
      g.add(mesh(new THREE.BoxGeometry(2.2, 9.5, 0.4), std(0x0a0e1e, { roughness: 1 }), 0, 14.2, 8.7, false, false));
      const tube = mesh(new THREE.CylinderGeometry(0.6, 0.9, 9, 16), brass, 0, 17, 5, false, false); tube.rotation.x = -0.75; g.add(tube);
      g.add(mesh(new THREE.BoxGeometry(6, 7, 1), white, 0, 3.5, 9.6, false, false)); g.add(mesh(new THREE.BoxGeometry(2.2, 4, 0.2), glowB(0xffd8a0, 1.5), 0, 2, 10.15, false, false));
      W.group.add(g); }
    // colinas lejanas y luces de una ciudad
    const mtn = farStd(W, 0x1a2238, 0.35);
    for (let k = 0; k < 10; k++) { const x = -150 + k * 33 + (r() - 0.5) * 12, z = -140 - r() * 50, h = 12 + r() * 12, w = 45 + r() * 25; const m = mesh(new THREE.ConeGeometry(w, h, 7), mtn, x, h / 2 - 4, z, false, false); m.scale.z = 0.6; W.group.add(m); }
    for (let k = 0; k < 60; k++) W.group.add(mesh(new THREE.SphereGeometry(0.35, 6, 4), glowB(0xffd890, 2), -120 + r() * 240, 0.5 + r() * 3, -120 - r() * 30, false, false));
    brazier(W, -4, -34, 0xcfe0ff); brazier(W, 4, -34, 0xcfe0ff);
  },
  // ------------------------------------------------------------------ XXIV · La casa de la fe
  function (W) {
    const tiles = texTiles('xxiv', 0xc88a5a, 0xa86a4a, 10, 0.14); tiles.repeat.set(14, 22); ground(W, tiles, [80, 120], 0.85);
    const r = mulberry32(151);
    const stone = std(0xe0c898, { roughness: 0.85 }); const trim = std(0xc8a878, { roughness: 0.8 }); const gold = std(0xd8b048, { metalness: 0.7, roughness: 0.35 });
    const turq = std(0x2a9ab0, { roughness: 0.35, metalness: 0.1 }); const blue = std(0x2a4a8a, { roughness: 0.5 });
    const water = new THREE.MeshStandardMaterial({ color: 0x4a9ab8, roughness: 0.05, metalness: 0.35, emissive: 0x0a3040, emissiveIntensity: 0.3 });
    // claustro: arcadas a ambos lados
    for (const side of [-1, 1]) {
      const a = arcade(80, 16, 4.5, stone, trim, { attic: 1.4 }); a.rotation.y = Math.PI / 2; a.position.set(side * 20.5, 0, -5); W.group.add(a);
      for (let i = 0; i <= 16; i++) { const z = -5 - 40 + i * 5; W.colliders.push({ t: 1, x: side * 20.5, z, r: 0.6, h: 7 }); }
      W.group.add(mesh(new THREE.BoxGeometry(0.6, 9, 82), stone, side * 23.4, 4.5, -5, false, false)); W.colliders.push({ t: 0, x0: side * 23.4 - 0.4, x1: side * 23.4 + 0.4, z0: -47, z1: 37, h: 9 });
      // velas encendidas en hornacinas
      for (let z = -40; z <= 30; z += 8) { W.group.add(mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.35, 8), std(0xf4ecd8), side * 22.9, 1.6, z, false, false)); W.group.add(mesh(new THREE.SphereGeometry(0.07, 8, 6), glow(0xffc060, 4), side * 22.9, 1.85, z, false, false)); }
    }
    // fuente central de cuatro canales, como en los jardines de muchas tradiciones
    if (!W._near(0, 4, 3)) { W.group.add(mesh(new THREE.CylinderGeometry(2.4, 2.6, 0.6, 24), stone, 0, 0.3, 4)); W.group.add(mesh(new THREE.CylinderGeometry(2.1, 2.1, 0.1, 24), water, 0, 0.62, 4, false, true)); W.group.add(mesh(new THREE.CylinderGeometry(0.3, 0.4, 1.6, 10), stone, 0, 1.1, 4)); W.group.add(mesh(new THREE.SphereGeometry(0.5, 16, 10), stone, 0, 2.1, 4));
      W.emitters.push({ x: 0, y: 2.4, z: 4, col: 0xbfe8ff, rate: 6, acc: 0, kind: 'water' }); W.colliders.push({ t: 1, x: 0, z: 4, r: 2.7, h: 0.7 });
      for (const [dx, dz, w, d] of [[0, 6, 0.9, 6], [0, -6, 0.9, 6], [6, 0, 6, 0.9], [-6, 0, 6, 0.9]]) if (!W._near(dx, 4 + dz, 1)) W.group.add(mesh(new THREE.BoxGeometry(w, 0.1, d), water, dx, 0.05, 4 + dz, false, true)); }
    // olivos y cipreses
    for (const [x, z] of [[-9, 22], [9, 28], [-8, -6], [9, -16], [-9, -32], [8, 4]]) { if (W._near(x, z, 2.2)) continue; const t = oliveTree(r); t.position.set(x, 0, z); W.group.add(t); W.colliders.push({ t: 1, x, z, r: 0.5, h: 3 }); }
    for (const side of [-1, 1]) for (let z = -38; z < 32; z += 9) { const x = side * (16 + r()); if (W._near(x, z, 1.4)) continue; const c = cypress(5 + r() * 2); c.position.set(x, 0, z); W.group.add(c); W.colliders.push({ t: 1, x, z, r: 0.5, h: 6 }); }
    // al fondo, arquitecturas sagradas de varias tradiciones juntas
    { const g = new THREE.Group(); g.position.set(0, 0, -62);
      // fachada con rosetón
      g.add(mesh(new THREE.BoxGeometry(14, 18, 3), stone, 0, 9, 0, false, false)); const rose = mesh(new THREE.CircleGeometry(3, 32), glow(0xffa860, 1.4), 0, 12, 1.55, false, false); g.add(rose);
      for (let k = 0; k < 8; k++) { const sp = mesh(new THREE.BoxGeometry(0.15, 5.8, 0.1), trim, 0, 12, 1.6, false, false); sp.rotation.z = (k / 8) * Math.PI; g.add(sp); }
      g.add(mesh(new THREE.BoxGeometry(3.6, 6, 0.3), std(0x3a2a1a, { roughness: 1 }), 0, 3, 1.55, false, false)); const top = mesh(new THREE.CylinderGeometry(4.2, 4.2, 3, 3), trim, 0, 19.4, 0, false, false); top.rotation.set(Math.PI / 2, 0, Math.PI / 2); top.scale.y = 1; g.add(top);
      // campanario
      g.add(mesh(new THREE.BoxGeometry(3.6, 26, 3.6), stone, -11, 13, -2, false, false)); g.add(mesh(new THREE.ConeGeometry(2.8, 6, 4), trim, -11, 29, -2, false, false));
      // cúpula turquesa con alminar
      const dome = mesh(new THREE.SphereGeometry(6, 28, 16, 0, TAU, 0, Math.PI / 2), turq, 13, 12, -4, false, false); g.add(dome); g.add(mesh(new THREE.CylinderGeometry(6.2, 6.2, 12, 28), stone, 13, 6, -4, false, false)); g.add(mesh(new THREE.ConeGeometry(0.4, 2, 8), gold, 13, 19, -4, false, false));
      g.add(mesh(new THREE.CylinderGeometry(0.9, 1.1, 30, 12), stone, 22, 15, -2, false, false)); g.add(mesh(new THREE.ConeGeometry(1.3, 3.5, 12), turq, 22, 31.7, -2, false, false));
      // torre de templo escalonada
      for (let k = 0; k < 6; k++) g.add(mesh(new THREE.BoxGeometry(8 - k * 1.2, 3, 8 - k * 1.2), std([0xd8a070, 0xc89060][k % 2], { roughness: 0.9 }), -24, 1.5 + k * 3, -6, false, false)); g.add(mesh(new THREE.SphereGeometry(0.8, 12, 8), gold, -24, 19, -6, false, false));
      // ventana con candelabro de siete brazos
      g.add(mesh(new THREE.BoxGeometry(5, 7, 0.3), blue, 6.5, 6, 1.6, false, false)); g.add(mesh(new THREE.BoxGeometry(0.15, 3, 0.1), gold, 6.5, 5.5, 1.8, false, false));
      for (let k = -3; k <= 3; k++) g.add(mesh(new THREE.SphereGeometry(0.12, 8, 6), glow(0xffc060, 3), 6.5 + k * 0.45, 7.3 - Math.abs(k) * 0.08, 1.85, false, false));
      W.group.add(g); }
    const mtn = farStd(W, 0x8a6a5a, 0.45);
    for (let k = 0; k < 10; k++) { const x = -150 + k * 33 + (r() - 0.5) * 12, z = -140 - r() * 50, h = 14 + r() * 14, w = 45 + r() * 25; const m = mesh(new THREE.ConeGeometry(w, h, 7), mtn, x, h / 2 - 4, z, false, false); m.scale.z = 0.6; W.group.add(m); }
    for (const [x, z] of [[-5, 24], [5, 24], [-5, -6], [5, -6]]) { if (!W._near(x, z, 0.3)) brazier(W, x, z, 0xffc880, false); }
    brazier(W, -4, -34, 0xffc880); brazier(W, 4, -34, 0xffc880);
  },
  // ------------------------------------------------------------------ XXV · Las pensadoras
  function (W) {
    const parq = texTiles('xxv', 0xd8c0a0, 0xb89a7a, 8, 0.1); parq.repeat.set(12, 18); ground(W, parq, [80, 120], 0.7);
    const r = mulberry32(161);
    const white = std(0xf4f0ea, { roughness: 0.5 }); const iron = std(0x2a3a3a, { metalness: 0.6, roughness: 0.4 }); const wood = std(0x6a4a2a, { roughness: 0.8 });
    const glass = new THREE.MeshStandardMaterial({ color: 0xd8f0ff, roughness: 0.05, metalness: 0.2, transparent: true, opacity: 0.35 });
    const beds = addGardens(W, r, { x0: 8.5, xMax: 15.5 }); addButterflies(W, beds, 14, r);
    // pérgolas con glicinas a ambos lados
    const wis = [0xb08ae8, 0xc8a0f0, 0x9a78d8, 0xe0c8ff];
    for (const side of [-1, 1]) {
      const x = side * 19;
      for (let z = -44; z <= 34; z += 4) { W.group.add(mesh(new THREE.CylinderGeometry(0.18, 0.22, 4.2, 10), white, x - 1.4 * side, 2.1, z)); W.group.add(mesh(new THREE.CylinderGeometry(0.18, 0.22, 4.2, 10), white, x + 1.4 * side, 2.1, z)); W.colliders.push({ t: 1, x: x - 1.4 * side, z, r: 0.3, h: 4 }); }
      W.group.add(mesh(new THREE.BoxGeometry(3.6, 0.2, 80), wood, x, 4.3, -5, false, false));
      for (let z = -44; z <= 34; z += 1.2) { W.group.add(mesh(new THREE.BoxGeometry(3.6, 0.12, 0.12), wood, x, 4.45, z, false, false));
        for (let k = 0; k < 2; k++) { const h = 0.8 + r() * 1.2; const c = mesh(new THREE.ConeGeometry(0.22 + r() * 0.1, h, 6), std(wis[Math.floor(r() * 4)], { roughness: 0.8 }), x + (r() - 0.5) * 3.2, 4.3 - h / 2, z + (r() - 0.5) * 0.8, false, false); c.rotation.x = Math.PI; W.group.add(c); } }
      // muro de setos detrás
      W.group.add(mesh(new THREE.BoxGeometry(1.6, 3, 82), std(0x3a6a3a, { roughness: 1, flat: true }), side * 22.6, 1.5, -5, false, false)); W.colliders.push({ t: 0, x0: side * 22.6 - 0.9, x1: side * 22.6 + 0.9, z0: -47, z1: 37, h: 3 });
    }
    // fuente y bancos de lectura con libros
    fountain(W, 0, 6, white);
    for (const [x, z, a] of [[-5, 16, 0.3], [5, 16, -0.3], [-5, -4, -0.3], [5, -4, 0.3]]) { if (W._near(x, z, 1.4)) continue; const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = a;
      g.add(mesh(new THREE.BoxGeometry(2.2, 0.12, 0.6), wood, 0, 0.55, 0)); for (const sx of [-0.9, 0.9]) g.add(mesh(new THREE.BoxGeometry(0.1, 0.55, 0.5), iron, sx, 0.27, 0)); g.add(mesh(new THREE.BoxGeometry(2.2, 0.5, 0.08), wood, 0, 0.95, -0.28));
      g.add(mesh(new THREE.BoxGeometry(0.4, 0.08, 0.3), std([0x7a2a5a, 0x2a4a7a][Math.floor(r() * 2)]), 0.4, 0.65, 0.05)); W.group.add(g); W.colliders.push({ t: 1, x, z, r: 1.1, h: 1 }); }
    // invernadero de hierro y cristal al fondo
    { const g = new THREE.Group(); g.position.set(0, 0, -62);
      g.add(mesh(new THREE.BoxGeometry(30, 0.6, 14), white, 0, 0.3, 0, false, false));
      g.add(mesh(new THREE.BoxGeometry(28, 9, 12), glass, 0, 5.1, 0, false, false));
      const vault = mesh(new THREE.CylinderGeometry(6, 6, 28, 24, 1, true, 0, Math.PI), glass, 0, 9.6, 0, false, false); vault.rotation.z = Math.PI / 2; g.add(vault);
      for (let k = -14; k <= 14; k += 2) { g.add(mesh(new THREE.BoxGeometry(0.12, 9, 0.12), iron, k, 5.1, 6, false, false)); const rib = mesh(new THREE.TorusGeometry(6, 0.08, 6, 24, Math.PI), iron, k, 9.6, 0, false, false); rib.rotation.y = Math.PI / 2; g.add(rib); }
      const dome = mesh(new THREE.SphereGeometry(5, 24, 12, 0, TAU, 0, Math.PI / 2), glass, 0, 15.5, 0, false, false); g.add(dome); g.add(mesh(new THREE.ConeGeometry(0.4, 2, 8), iron, 0, 21, 0, false, false));
      for (let k = 0; k < 14; k++) { const t = oliveTree(r); t.scale.setScalar(0.8 + r() * 0.4); t.position.set(-12 + r() * 24, 0.6, -4 + r() * 8); g.add(t); }
      W.group.add(g); }
    const mtn = farStd(W, 0x8aa07a, 0.45);
    for (let k = 0; k < 10; k++) { const x = -150 + k * 33 + (r() - 0.5) * 12, z = -140 - r() * 50, h = 10 + r() * 10, w = 50 + r() * 25; const m = mesh(new THREE.SphereGeometry(w, 12, 8, 0, TAU, 0, Math.PI / 2), mtn, x, -4, z, false, false); m.scale.set(1, h / w, 0.6); W.group.add(m); }
    brazier(W, -4, -34, 0xffe0c0); brazier(W, 4, -34, 0xffe0c0);
  },
  // ------------------------------------------------------------------ XXVI · La asamblea de la justicia
  function (W) {
    const slabs = texTiles('xxvi', 0xe8e4dc, 0xb8b4a8, 5, 0.1); slabs.repeat.set(10, 16); ground(W, slabs, [80, 120], 0.8);
    const r = mulberry32(171);
    const marble = std(0xf2eee6, { roughness: 0.5 }); const trim = std(0xd8d0c0, { roughness: 0.6 }); const bronze = std(0xb8863a, { metalness: 0.85, roughness: 0.3 });
    // gran balanza de bronce en el centro
    if (!W._near(0, 4, 3)) { const g = new THREE.Group(); g.position.set(0, 0, 4); W.group.add(g);
      g.add(mesh(new THREE.CylinderGeometry(1.6, 2, 0.8, 8), marble, 0, 0.4, 0)); g.add(mesh(new THREE.CylinderGeometry(0.15, 0.2, 5, 10), bronze, 0, 3.3, 0));
      const beam = new THREE.Group(); beam.position.y = 5.8; g.add(beam); beam.add(mesh(new THREE.BoxGeometry(5, 0.15, 0.15), bronze, 0, 0, 0));
      const pans = [-2.4, 2.4].map((x) => { const p = new THREE.Group(); p.position.set(x, 0, 0); beam.add(p); for (const a of [0, 2.1, 4.2]) { const c = mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.8, 4), bronze, Math.cos(a) * 0.4, -0.9, Math.sin(a) * 0.4, false, false); c.rotation.z = Math.cos(a) * 0.22; c.rotation.x = -Math.sin(a) * 0.22; p.add(c); } p.add(mesh(new THREE.CylinderGeometry(0.75, 0.55, 0.15, 18), bronze, 0, -1.8, 0)); return p; });
      W.anim.push((t) => { const a = Math.sin(t * 0.6) * 0.06; beam.rotation.z = a; for (const p of pans) p.rotation.z = -a; });
      W.colliders.push({ t: 1, x: 0, z: 4, r: 2, h: 6 }); }
    // columnatas a ambos lados con estandartes
    for (const side of [-1, 1]) {
      for (let z = -44; z <= 34; z += 5) { const x = side * 19.5; W.group.add(mesh(new THREE.BoxGeometry(1.2, 0.5, 1.2), trim, x, 0.25, z)); W.group.add(mesh(flutedCylinder(0.4, 0.45, 7.5, 20, 0.04), marble, x, 4.25, z)); W.group.add(mesh(new THREE.BoxGeometry(1.2, 0.4, 1.2), trim, x, 8.2, z)); W.colliders.push({ t: 1, x, z, r: 0.5, h: 8 });
        if ((z + 44) % 10 === 0) { const b = mesh(new THREE.PlaneGeometry(1.6, 4), std([0x2a4a8a, 0x8a2a2a, 0x2a6a4a][Math.floor(r() * 3)], { roughness: 0.9, side: THREE.DoubleSide }), x - side * 1.3, 5.5, z + 2.5, false, false); b.rotation.y = Math.PI / 2; W.group.add(b); } }
      W.group.add(mesh(new THREE.BoxGeometry(2.4, 1, 82), marble, side * 20.2, 8.9, -5, false, false));
      W.group.add(mesh(new THREE.BoxGeometry(0.6, 9.4, 82), trim, side * 23.4, 4.7, -5, false, false)); W.colliders.push({ t: 0, x0: side * 23.4 - 0.4, x1: side * 23.4 + 0.4, z0: -47, z1: 37, h: 9 });
    }
    // olivos y laureles
    for (const [x, z] of [[-9, 24], [9, 28], [-9, -12], [9, -18], [-8, 8], [9, 10]]) { if (W._near(x, z, 2.2)) continue; const t = oliveTree(r); t.position.set(x, 0, z); W.group.add(t); W.colliders.push({ t: 1, x, z, r: 0.5, h: 3 }); }
    // anfiteatro en semicírculo y palacio de justicia con cúpula al fondo
    { const g = new THREE.Group(); g.position.set(0, 0, -58);
      for (let k = 0; k < 7; k++) { const R = 10 + k * 1.8; const tier = mesh(new THREE.CylinderGeometry(R, R, 0.7, 40, 1, false, Math.PI / 2, Math.PI), marble, 0, 0.35 + k * 0.7, 0, false, false); g.add(tier); }
      g.add(mesh(new THREE.BoxGeometry(34, 16, 6), marble, 0, 8, -18, false, false));
      for (let k = 0; k < 8; k++) g.add(mesh(flutedCylinder(0.6, 0.65, 12, 20, 0.05), marble, -10.5 + k * 3, 6, -14.5, false, false));
      const ped = pediment(26, 4, 2, trim); ped.position.set(0, 12, -14.5); g.add(ped);
      g.add(mesh(new THREE.CylinderGeometry(7, 7, 4, 32), marble, 0, 18, -18, false, false));
      g.add(mesh(new THREE.SphereGeometry(7, 32, 16, 0, TAU, 0, Math.PI / 2), std(0x7aa8a0, { metalness: 0.5, roughness: 0.4 }), 0, 20, -18, false, false));
      g.add(mesh(new THREE.SphereGeometry(0.6, 12, 8), bronze, 0, 27.3, -18, false, false));
      W.group.add(g); }
    const mtn = farStd(W, 0x9aa0a8, 0.5);
    for (let k = 0; k < 10; k++) { const x = -150 + k * 33 + (r() - 0.5) * 12, z = -140 - r() * 50, h = 14 + r() * 14, w = 45 + r() * 25; const m = mesh(new THREE.ConeGeometry(w, h, 7), mtn, x, h / 2 - 4, z, false, false); m.scale.z = 0.6; W.group.add(m); }
    brazier(W, -4, -34, 0xffe0a0); brazier(W, 4, -34, 0xffe0a0);
  },
  // ------------------------------------------------------------------ XXVII · La montaña de los místicos
  function (W) {
    const slate = texTiles('xxvii', 0x8a8478, 0x5a564e, 7, 0.22); slate.repeat.set(12, 18); ground(W, slate, [80, 120], 0.95);
    const r = mulberry32(181);
    const rock = std(0x7a7468, { roughness: 1, flat: true }); const white = std(0xf0ece4, { roughness: 0.7 }); const gold = std(0xd8a838, { metalness: 0.75, roughness: 0.3 }); const red = std(0x8a2a1a, { roughness: 0.8 });
    // rocas y peñascos a los lados
    for (const side of [-1, 1]) for (let z = -46; z <= 36; z += 3.2) { const x = side * (20 + r() * 3), s = 1.5 + r() * 2.5; const m = mesh(new THREE.DodecahedronGeometry(s, 0), rock, x, s * 0.5, z); m.rotation.set(r() * 3, r() * 3, r() * 3); m.scale.y = 0.6 + r() * 0.8; W.group.add(m); }
    for (const side of [-1, 1]) W.colliders.push({ t: 0, x0: side * 21 - 1.5, x1: side * 21 + 1.5, z0: -47, z1: 37, h: 4 });
    // estupas blancas con remate dorado
    const stupa = (x, z, k) => { if (W._near(x, z, 2.4 * k)) return; const g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(k);
      g.add(mesh(new THREE.BoxGeometry(3, 0.8, 3), white, 0, 0.4, 0)); g.add(mesh(new THREE.BoxGeometry(2.4, 0.6, 2.4), white, 0, 1.1, 0));
      g.add(mesh(new THREE.SphereGeometry(1.2, 20, 12, 0, TAU, 0, Math.PI / 2), white, 0, 1.4, 0)); g.add(mesh(new THREE.BoxGeometry(0.7, 0.5, 0.7), gold, 0, 2.8, 0));
      g.add(mesh(new THREE.ConeGeometry(0.35, 2, 10), gold, 0, 4, 0)); W.group.add(g); W.colliders.push({ t: 1, x, z, r: 1.6 * k, h: 4 * k }); };
    for (const [x, z, k] of [[-9, 26, 0.9], [9, 20, 0.8], [-9, -8, 0.9], [9, -20, 1], [-8, 8, 0.7]]) stupa(x, z, k);
    // banderas de oración que ondean
    const flagCols = [0x2a6ad8, 0xf0f0f0, 0xd82a2a, 0x2aa84a, 0xf0c02a];
    for (const [z0, z1, x0, x1, h] of [[30, 10, -14, 14, 5.5], [8, -14, 14, -14, 5.8], [-16, -36, -14, 14, 6]]) {
      for (const [x, z] of [[x0, z0], [x1, z1]]) { if (!W._near(x, z, 0.5)) { W.group.add(mesh(new THREE.CylinderGeometry(0.08, 0.1, h + 0.5, 6), std(0x5a3a1a), x, (h + 0.5) / 2, z)); W.colliders.push({ t: 1, x, z, r: 0.2, h }); } }
      const n = 26; for (let i = 1; i < n; i++) { const f = i / n; const x = x0 + (x1 - x0) * f, z = z0 + (z1 - z0) * f, y = h - Math.sin(f * Math.PI) * 1.2;
        const fl = mesh(new THREE.PlaneGeometry(0.55, 0.65), std(flagCols[i % 5], { roughness: 0.9, side: THREE.DoubleSide }), x, y - 0.35, z, false, false); fl.rotation.y = Math.atan2(x1 - x0, z1 - z0) + Math.PI / 2; W.group.add(fl);
        const ph = i * 0.7; W.anim.push((t) => { fl.rotation.x = Math.sin(t * 2.4 + ph) * 0.35; }); } }
    // ruedas de oración
    for (const side of [-1, 1]) for (let z = 28; z >= -36; z -= 16) { const x = side * 15.5; if (W._near(x, z, 1)) continue; const w = mesh(new THREE.CylinderGeometry(0.45, 0.45, 1.1, 16), gold, x, 1.3, z); W.group.add(w); W.group.add(mesh(new THREE.BoxGeometry(0.15, 2.2, 0.15), red, x, 1.1, z - 0.6));
      W.anim.push((t) => { w.rotation.y = t * 0.8; }); W.colliders.push({ t: 1, x, z, r: 0.6, h: 2 }); }
    // templo de piedra encalada con tejado dorado y cueva al fondo
    { const g = new THREE.Group(); g.position.set(0, 0, -58);
      g.add(mesh(new THREE.BoxGeometry(22, 10, 10), white, 0, 5, 0, false, false));
      g.add(mesh(new THREE.BoxGeometry(22.4, 1.4, 10.4), red, 0, 10.4, 0, false, false));
      const roof = mesh(new THREE.ConeGeometry(10, 5, 4), gold, 0, 13.6, 0, false, false); roof.rotation.y = Math.PI / 4; roof.scale.set(1.15, 1, 0.55); g.add(roof);
      for (let k = -3; k <= 3; k++) g.add(mesh(new THREE.BoxGeometry(1.2, 2, 0.2), std(0x2a1a10), k * 3, 6, 5.1, false, false));
      g.add(mesh(new THREE.BoxGeometry(3.6, 5, 0.3), red, 0, 2.5, 5.1, false, false));
      for (const x of [-16, 16]) { g.add(mesh(new THREE.CylinderGeometry(2, 2.4, 14, 10), white, x, 7, -2, false, false)); g.add(mesh(new THREE.ConeGeometry(2.6, 3, 10), gold, x, 15.5, -2, false, false)); }
      W.group.add(g); }
    // grandes cumbres nevadas
    const mtn = farStd(W, 0x8a8aa0, 0.3); const snow = farStd(W, 0xf4f4ff, 0.25);
    for (let k = 0; k < 11; k++) { const x = -160 + k * 32 + (r() - 0.5) * 12, z = -120 - r() * 60, h = 40 + r() * 50, w = 30 + r() * 20;
      const m = mesh(new THREE.ConeGeometry(w, h, 6), mtn, x, h / 2 - 6, z, false, false); W.group.add(m);
      const c = mesh(new THREE.ConeGeometry(w * 0.36, h * 0.36, 6), snow, x, h - 6 - h * 0.18 + 0.4, z, false, false); W.group.add(c); }
    for (const side of [-1, 1]) for (let k = 0; k < 4; k++) { const h = 20 + r() * 20; const m = mesh(new THREE.ConeGeometry(14 + r() * 8, h, 6), rock, side * (42 + r() * 10), h / 2 - 3, -40 + k * 24, false, false); W.group.add(m); }
    brazier(W, -4, -34, 0xffb060); brazier(W, 4, -34, 0xffb060);
  },
  // ------------------------------------------------------------------ XXVIII · La escuela de la mente
  function (W) {
    const boards = texTiles('xxviii', 0xb08a5a, 0x8a6a42, 9, 0.12); boards.repeat.set(10, 16); ground(W, boards, [80, 120], 0.85);
    const r = mulberry32(191);
    const brick = std(0xa84a32, { roughness: 0.9 }); const cream = std(0xf0e6d0, { roughness: 0.7 }); const wood = std(0x7a5232, { roughness: 0.8 }); const slate = std(0x2a4a3a, { roughness: 0.8 });
    // muros de ladrillo con ventanas grandes a los lados
    for (const side of [-1, 1]) {
      W.group.add(mesh(new THREE.BoxGeometry(1, 8, 82), brick, side * 22.6, 4, -5, false, false)); W.colliders.push({ t: 0, x0: side * 22.6 - 0.6, x1: side * 22.6 + 0.6, z0: -47, z1: 37, h: 8 });
      for (let z = -40; z <= 32; z += 6) { W.group.add(mesh(new THREE.BoxGeometry(0.2, 3.2, 2.4), cream, side * 22.05, 4.2, z, false, false)); W.group.add(mesh(new THREE.BoxGeometry(0.22, 2.8, 2), glow(0xffe8b0, 0.9), side * 22.0, 4.2, z, false, false)); }
      // pizarras al aire libre
      for (let z = -30; z <= 26; z += 18) { const x = side * 18; if (W._near(x, z, 1.6)) continue; const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
        for (const sx of [-1.2, 1.2]) g.add(mesh(new THREE.BoxGeometry(0.12, 2.6, 0.12), wood, sx, 1.3, 0)); g.add(mesh(new THREE.BoxGeometry(2.6, 1.5, 0.08), slate, 0, 1.8, 0)); g.add(mesh(new THREE.BoxGeometry(2.7, 0.08, 0.15), wood, 0, 1.02, 0.05));
        for (let k = 0; k < 6; k++) g.add(mesh(new THREE.BoxGeometry(0.3 + r() * 0.5, 0.03, 0.01), std(0xf0f0f0), -0.9 + r() * 1.8, 1.3 + r() * 0.9, 0.05, false, false));
        W.group.add(g); W.colliders.push({ t: 1, x, z, r: 1.3, h: 2.6 }); }
    }
    // árboles de otoño
    const leaf = [0xe8902a, 0xd8602a, 0xf0c040, 0xc84a2a];
    const autumn = (x, z, k) => { if (W._near(x, z, 2.4 * k)) return; const g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(k);
      g.add(mesh(new THREE.CylinderGeometry(0.35, 0.55, 4.5, 10), std(0x5a3a22, { roughness: 1 }), 0, 2.25, 0));
      for (let i = 0; i < 9; i++) g.add(mesh(new THREE.IcosahedronGeometry(1.2 + r() * 0.8, 1), std(leaf[Math.floor(r() * 4)], { roughness: 0.9, flat: true }), (r() - 0.5) * 3, 4.8 + r() * 2, (r() - 0.5) * 3));
      W.group.add(g); W.colliders.push({ t: 1, x, z, r: 0.6 * k, h: 5 }); };
    for (const [x, z, k] of [[-10, 24, 1.1], [10, 30, 0.9], [-9, -10, 1], [10, -20, 1.2], [9, 6, 0.8], [-10, -32, 0.9]]) autumn(x, z, k);
    // hojas caídas
    for (let i = 0; i < 160; i++) { const x = (r() - 0.5) * 40, z = -44 + r() * 80; const l = mesh(new THREE.PlaneGeometry(0.25, 0.18), std(leaf[i % 4], { side: THREE.DoubleSide }), x, 0.03, z, false, false); l.rotation.set(-Math.PI / 2, 0, r() * 6); W.group.add(l); }
    // bloques de colores apilados, globos terráqueos y una rayuela
    const blockCols = [0xd83a3a, 0x3a7ad8, 0xf0c03a, 0x3aa84a];
    for (const [x, z] of [[-5, 14], [5, -4]]) { if (W._near(x, z, 1.5)) continue; for (let i = 0; i < 6; i++) W.group.add(mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), std(blockCols[i % 4], { roughness: 0.6 }), x + (i % 3) * 0.75 - 0.75, 0.35 + Math.floor(i / 3) * 0.7, z + (r() - 0.5) * 0.2)); W.colliders.push({ t: 1, x, z, r: 1.2, h: 1.4 }); }
    for (const [x, z] of [[5, 16], [-5, -6]]) { if (W._near(x, z, 1)) continue; W.group.add(mesh(new THREE.CylinderGeometry(0.06, 0.3, 1.2, 8), wood, x, 0.6, z)); const gl = mesh(new THREE.SphereGeometry(0.55, 20, 14), new THREE.MeshStandardMaterial({ map: earthTexture(), roughness: 0.6 }), x, 1.6, z); W.group.add(gl); W.anim.push((t) => { gl.rotation.y = t * 0.4; }); W.colliders.push({ t: 1, x, z, r: 0.6, h: 2 }); }
    for (let i = 0; i < 8; i++) { const sq = mesh(new THREE.PlaneGeometry(0.9, 0.9), std(0xf8f8f0), (i % 3 === 1 ? 0 : (i % 3 === 0 ? -0.5 : 0.5)), 0.035, 22 - i * 1, false, false); sq.rotation.x = -Math.PI / 2; if (!W._near(sq.position.x, sq.position.z, 0.6)) W.group.add(sq); }
    // la escuela de ladrillo con su campanario al fondo
    { const g = new THREE.Group(); g.position.set(0, 0, -60);
      g.add(mesh(new THREE.BoxGeometry(34, 12, 10), brick, 0, 6, 0, false, false));
      g.add(mesh(new THREE.BoxGeometry(35, 0.8, 11), cream, 0, 12.4, 0, false, false));
      for (let k = -3; k <= 3; k++) for (const y of [3.6, 8.4]) { g.add(mesh(new THREE.BoxGeometry(2.6, 3, 0.2), cream, k * 4.6, y, 5.05, false, false)); g.add(mesh(new THREE.BoxGeometry(2.2, 2.6, 0.22), glow(0xffe0a0, 0.8), k * 4.6, y, 5.1, false, false)); }
      g.add(mesh(new THREE.BoxGeometry(5, 10, 5), brick, 0, 17, 0, false, false)); g.add(mesh(new THREE.ConeGeometry(4, 4, 4), std(0x3a4a5a, { roughness: 0.6 }), 0, 24, 0, false, false));
      const clock = mesh(new THREE.CircleGeometry(1.3, 24), std(0xf8f4e8), 0, 19, 2.55, false, false); g.add(clock);
      const hand = mesh(new THREE.BoxGeometry(0.1, 1.1, 0.05), std(0x1a1a1a), 0, 19, 2.6, false, false); g.add(hand); W.anim.push((t) => { hand.rotation.z = -t * 0.1; });
      W.group.add(g); }
    const mtn = farStd(W, 0xc8904a, 0.45);
    for (let k = 0; k < 10; k++) { const x = -150 + k * 33 + (r() - 0.5) * 12, z = -140 - r() * 50, h = 10 + r() * 10, w = 50 + r() * 25; const m = mesh(new THREE.SphereGeometry(w, 12, 8, 0, TAU, 0, Math.PI / 2), mtn, x, -4, z, false, false); m.scale.set(1, h / w, 0.6); W.group.add(m); }
    brazier(W, -4, -34, 0xffe0b0); brazier(W, 4, -34, 0xffe0b0);
  },
  // ------------------------------------------------------------------ XXIX · El bosque de la Tierra
  function (W) {
    const moss = texTiles('xxix', 0x5a7a3a, 0x4a5a2a, 6, 0.3); moss.repeat.set(12, 18); ground(W, moss, [80, 120], 1);
    const r = mulberry32(201);
    const bark = std(0x6a3a22, { roughness: 1 }); const plank = std(0x8a6a42, { roughness: 0.85 });
    const greens = [0x2a5a2a, 0x3a6a2a, 0x2a4a22];
    const redwood = (x, z, h, rad) => { const g = new THREE.Group(); g.position.set(x, 0, z);
      g.add(mesh(new THREE.CylinderGeometry(rad * 0.6, rad, h, 12), bark, 0, h / 2, 0));
      for (let k = 0; k < 5; k++) g.add(mesh(new THREE.ConeGeometry(rad * 3.4 - k * rad * 0.5, h * 0.18, 9), std(greens[k % 3], { roughness: 1, flat: true }), 0, h * 0.55 + k * h * 0.1, 0));
      W.group.add(g); W.colliders.push({ t: 1, x, z, r: rad + 0.2, h }); };
    // árboles gigantes a los lados y detrás
    for (const side of [-1, 1]) for (let z = -46; z <= 36; z += 5 + r() * 3) { const x = side * (19 + r() * 3); if (!W._near(x, z, 2.5)) redwood(x, z, 26 + r() * 14, 1.1 + r() * 0.6); }
    for (let k = 0; k < 14; k++) { const x = (r() - 0.5) * 70, z = -56 - r() * 20; redwood(x, z, 30 + r() * 16, 1.4 + r() * 0.6); }
    for (const [x, z] of [[-9, 18], [9, -8], [-8, -26], [10, 28]]) if (!W._near(x, z, 2.6)) redwood(x, z, 22 + r() * 8, 1);
    W.colliders.push({ t: 0, x0: -23, x1: -21, z0: -47, z1: 37, h: 6 }, { t: 0, x0: 21, x1: 23, z0: -47, z1: 37, h: 6 });
    // helechos
    const fern = new THREE.ConeGeometry(0.5, 1.1, 5);
    for (let i = 0; i < 120; i++) { const x = (r() < 0.5 ? -1 : 1) * (6 + r() * 12), z = -44 + r() * 80; if (W._near(x, z, 1.2)) continue; const f = mesh(fern, std(greens[i % 3], { roughness: 1, flat: true }), x, 0.4, z, false, false); f.scale.set(0.6 + r() * 0.6, 0.5 + r() * 0.5, 0.6 + r() * 0.6); W.group.add(f); }
    // arroyo con pasarela de madera
    const water = new THREE.MeshStandardMaterial({ color: 0x4a9ab0, roughness: 0.05, metalness: 0.3, emissive: 0x0a3040, emissiveIntensity: 0.4 });
    const stream = mesh(new THREE.PlaneGeometry(3.2, 82), water, -12.5, 0.04, -5, false, true); stream.rotation.x = -Math.PI / 2; if (!W._near(-12.5, 0, 0)) W.group.add(stream);
    W.anim.push((t) => { water.emissiveIntensity = 0.35 + Math.sin(t * 1.5) * 0.08; });
    for (const z of [12, -20]) { if (W._near(-12.5, z, 1.5)) continue; W.group.add(mesh(new THREE.BoxGeometry(4.2, 0.2, 1.8), plank, -12.5, 0.35, z)); }
    // rayos de sol entre los árboles
    const rayMat = new THREE.MeshBasicMaterial({ color: 0xfff4c0, transparent: true, opacity: 0.035, depthWrite: false, side: THREE.DoubleSide });
    for (let i = 0; i < 10; i++) { const ray = mesh(new THREE.CylinderGeometry(0.4, 1.6, 30, 8, 1, true), rayMat, (r() - 0.5) * 30, 14, -40 + r() * 70, false, false); ray.rotation.z = 0.3; ray.rotation.x = -0.25; W.group.add(ray); }
    // casa del árbol con mirador al fondo
    { const g = new THREE.Group(); g.position.set(0, 0, -50);
      g.add(mesh(new THREE.CylinderGeometry(2.4, 3.2, 40, 14), bark, 0, 20, 0, false, false));
      g.add(mesh(new THREE.CylinderGeometry(6, 6, 0.6, 16), plank, 0, 12, 0, false, false)); g.add(mesh(new THREE.BoxGeometry(6, 4, 6), plank, 0, 14.3, 0, false, false)); g.add(mesh(new THREE.ConeGeometry(5, 3, 4), std(0x5a3a22), 0, 17.8, 0, false, false));
      for (let k = 0; k < 12; k++) { const a = k / 12 * TAU; g.add(mesh(new THREE.BoxGeometry(0.15, 1.2, 0.15), plank, Math.cos(a) * 5.8, 12.9, Math.sin(a) * 5.8, false, false)); }
      for (let k = 0; k < 6; k++) g.add(mesh(new THREE.ConeGeometry(12 - k * 1.6, 6, 10), std(greens[k % 3], { roughness: 1, flat: true }), 0, 26 + k * 4, 0, false, false));
      W.group.add(g); }
    const mtn = farStd(W, 0x3a5a3a, 0.4);
    for (let k = 0; k < 10; k++) { const x = -150 + k * 33 + (r() - 0.5) * 12, z = -140 - r() * 50, h = 30 + r() * 20, w = 40 + r() * 20; const m = mesh(new THREE.ConeGeometry(w, h, 7), mtn, x, h / 2 - 4, z, false, false); m.scale.z = 0.6; W.group.add(m); }
    brazier(W, -4, -34, 0xffe8b0); brazier(W, 4, -34, 0xffe8b0);
  },
  // ------------------------------------------------------------------ XXX · La torre de los números
  function (W) {
    const tiles = texTiles('xxx', 0xe8e4f0, 0x2a2a3a, 8, 0.05); tiles.repeat.set(10, 15); ground(W, tiles, [80, 120], 0.4);
    const r = mulberry32(211);
    const stone = std(0xece8f4, { roughness: 0.5 }); const brass = std(0xd8a848, { metalness: 0.85, roughness: 0.3 }); const dark = std(0x2a2a3a, { roughness: 0.6 });
    // espiral áurea dorada en el suelo
    { const pts = []; const b = 0.3063; for (let a = 0; a < 5.2 * Math.PI; a += 0.05) { const rr = 0.25 * Math.exp(b * a); pts.push(new THREE.Vector3(Math.cos(a) * rr, 0.06, 4 + Math.sin(a) * rr)); }
      const curve = new THREE.CatmullRomCurve3(pts); W.group.add(mesh(new THREE.TubeGeometry(curve, 300, 0.07, 6, false), glow(0xffd070, 2), 0, 0, 0, false, false)); }
    // sólidos platónicos flotando y girando sobre pedestales
    const solids = [new THREE.TetrahedronGeometry(0.9), new THREE.BoxGeometry(1.2, 1.2, 1.2), new THREE.OctahedronGeometry(0.95), new THREE.DodecahedronGeometry(0.9), new THREE.IcosahedronGeometry(0.95)];
    const sCols = [0xff6a5a, 0x6ab8ff, 0xffd060, 0x9a6aff, 0x6aff9a];
    const spots = [[-6, 24], [6, 18], [-6, -8], [6, -18], [-6, 8]];
    spots.forEach(([x, z], i) => { if (W._near(x, z, 1.4)) return; W.group.add(mesh(new THREE.CylinderGeometry(0.6, 0.8, 1.4, 12), stone, x, 0.7, z));
      const s = mesh(solids[i], new THREE.MeshStandardMaterial({ color: sCols[i], metalness: 0.3, roughness: 0.25, emissive: sCols[i], emissiveIntensity: 0.25, flatShading: true }), x, 2.6, z); W.group.add(s);
      W.anim.push((t) => { s.rotation.set(t * 0.4 + i, t * 0.6, 0); s.position.y = 2.6 + Math.sin(t * 1.2 + i) * 0.2; }); W.colliders.push({ t: 1, x, z, r: 0.8, h: 3 }); });
    // columnas con anillos de números a los lados
    for (const side of [-1, 1]) {
      for (let z = -44; z <= 34; z += 6) { const x = side * 19.5; W.group.add(mesh(new THREE.CylinderGeometry(0.5, 0.6, 8, 14), stone, x, 4, z)); W.group.add(mesh(new THREE.TorusGeometry(0.75, 0.06, 6, 24), brass, x, 6.5, z)); W.colliders.push({ t: 1, x, z, r: 0.6, h: 8 }); }
      W.group.add(mesh(new THREE.BoxGeometry(0.6, 9, 82), stone, side * 23.4, 4.5, -5, false, false)); W.colliders.push({ t: 0, x0: side * 23.4 - 0.4, x1: side * 23.4 + 0.4, z0: -47, z1: 37, h: 9 });
    }
    // la torre con escalera en espiral y reloj astronómico al fondo
    { const g = new THREE.Group(); g.position.set(0, 0, -60);
      g.add(mesh(new THREE.CylinderGeometry(6, 8, 44, 20), stone, 0, 22, 0, false, false));
      for (let k = 0; k < 60; k++) { const a = k * 0.45, y = 1 + k * 0.7; g.add(withRot(mesh(new THREE.BoxGeometry(2.4, 0.25, 1), brass, Math.cos(a) * 8.2, y, Math.sin(a) * 8.2, false, false), 'y', -a)); }
      g.add(mesh(new THREE.CylinderGeometry(7, 6, 2, 20), brass, 0, 45, 0, false, false));
      const dome = mesh(new THREE.SphereGeometry(5, 24, 12, 0, TAU, 0, Math.PI / 2), std(0x4a4a8a, { metalness: 0.4, roughness: 0.3 }), 0, 46, 0, false, false); g.add(dome);
      const face = mesh(new THREE.CircleGeometry(3.4, 32), dark, 0, 30, 6.9, false, false); g.add(face);
      g.add(mesh(new THREE.TorusGeometry(3.4, 0.15, 6, 32), brass, 0, 30, 6.95, false, false));
      const ring = mesh(new THREE.TorusGeometry(2.2, 0.1, 6, 32), glow(0x6ae0ff, 2), 0, 30, 7, false, false); g.add(ring);
      const hand = mesh(new THREE.BoxGeometry(0.15, 3, 0.05), brass, 0, 30, 7.05, false, false); g.add(hand);
      W.anim.push((t) => { hand.rotation.z = -t * 0.2; ring.rotation.z = t * 0.1; });
      W.group.add(g); }
    // constelaciones geométricas en el cielo
    const starMat = glow(0xcfe8ff, 3);
    for (let c = 0; c < 6; c++) { const cx = -60 + c * 24, cy = 30 + r() * 25, n = 3 + c % 4; for (let k = 0; k < n; k++) { const a = k / n * TAU; W.group.add(mesh(new THREE.SphereGeometry(0.35, 8, 6), starMat, cx + Math.cos(a) * 5, cy + Math.sin(a) * 5, -100, false, false)); } }
    const mtn = farStd(W, 0x3a3a6a, 0.35);
    for (let k = 0; k < 12; k++) { const x = -150 + k * 27, z = -130 - r() * 50, h = 15 + r() * 30, w = 6 + r() * 6; W.group.add(mesh(new THREE.BoxGeometry(w, h, w), mtn, x, h / 2 - 2, z, false, false)); if (r() < 0.5) W.group.add(mesh(new THREE.SphereGeometry(w * 0.6, 12, 8, 0, TAU, 0, Math.PI / 2), mtn, x, h - 2, z, false, false)); }
    brazier(W, -4, -34, 0xffe0a0); brazier(W, 4, -34, 0xffe0a0);
  },
  // ------------------------------------------------------------------ XXXI · El taller de la belleza
  function (W) {
    const floor = texTiles('xxxi', 0xc8a070, 0xa88050, 7, 0.14); floor.repeat.set(10, 16); ground(W, floor, [80, 120], 0.85);
    const r = mulberry32(221);
    const plaster = std(0xf0dcc0, { roughness: 0.8 }); const wood = std(0x6a4a2a, { roughness: 0.8 }); const marble = std(0xf4f0ea, { roughness: 0.45 });
    const paint = [0xe83a3a, 0x3a7ae8, 0xf0c030, 0x3ab85a, 0xa84ae8, 0xff8a3a, 0x2ad8d8];
    // arcadas con vitrales de colores a los lados
    for (const side of [-1, 1]) {
      const a = arcade(80, 16, 5, plaster, std(0xd8c0a0), {}); a.rotation.y = Math.PI / 2; a.position.set(side * 20.5, 0, -5); W.group.add(a);
      for (let i = 0; i <= 16; i++) W.colliders.push({ t: 1, x: side * 20.5, z: -45 + i * 5, r: 0.6, h: 7 });
      W.group.add(mesh(new THREE.BoxGeometry(0.6, 9, 82), plaster, side * 23.4, 4.5, -5, false, false)); W.colliders.push({ t: 0, x0: side * 23.4 - 0.4, x1: side * 23.4 + 0.4, z0: -47, z1: 37, h: 9 });
      for (let z = -42; z <= 32; z += 5) for (let k = 0; k < 4; k++) W.group.add(withRot(mesh(new THREE.PlaneGeometry(0.7, 1.1), glow(paint[(Math.abs(z) + k) % 7], 0.9), side * 23.05, 3 + (k >> 1) * 1.2, z + (k & 1) * 0.75 - 0.35, false, false), 'y', -side * Math.PI / 2));
    }
    // caballetes con lienzos de colores
    for (const [x, z, a] of [[-6, 24, 0.4], [6, 20, -0.4], [-7, 2, 0.6], [7, -6, -0.5], [-6, -20, 0.3], [6, -28, -0.3]]) { if (W._near(x, z, 1.6)) continue; const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = a;
      for (const sx of [-0.5, 0.5]) { const leg = mesh(new THREE.BoxGeometry(0.08, 2.6, 0.08), wood, sx, 1.3, 0); leg.rotation.z = sx * 0.15; g.add(leg); } const back = mesh(new THREE.BoxGeometry(0.08, 2.4, 0.08), wood, 0, 1.2, -0.5); back.rotation.x = 0.3; g.add(back);
      g.add(mesh(new THREE.BoxGeometry(1.5, 1.1, 0.06), std(0xf8f4ec), 0, 1.9, 0.08));
      for (let k = 0; k < 5; k++) g.add(mesh(new THREE.PlaneGeometry(0.2 + r() * 0.5, 0.15 + r() * 0.4), std(paint[Math.floor(r() * 7)], { roughness: 0.9 }), -0.5 + r(), 1.6 + r() * 0.6, 0.115, false, false));
      W.group.add(g); W.colliders.push({ t: 1, x, z, r: 0.9, h: 2.6 }); }
    // esculturas sobre pedestales
    for (const [x, z] of [[-9, 14], [9, 10], [-9, -10], [9, -16]]) { if (W._near(x, z, 1.4)) continue; const st = statue(marble, r); st.position.set(x, 0, z); st.rotation.y = r() * 6; W.group.add(st); W.colliders.push({ t: 1, x, z, r: 0.8, h: 3.6 }); }
    // piano de cola
    if (!W._near(0, 6, 2.4)) { const g = new THREE.Group(); g.position.set(0, 0, 6); const black = std(0x0a0a0a, { roughness: 0.25, metalness: 0.2 });
      const sh = new THREE.Shape(); sh.moveTo(-0.8, 0); sh.lineTo(0.8, 0); sh.lineTo(0.8, 1.2); sh.quadraticCurveTo(0.6, 2.4, -0.3, 2.6); sh.lineTo(-0.8, 2.4); sh.lineTo(-0.8, 0);
      const body = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.45, bevelEnabled: false }), black); body.rotation.x = -Math.PI / 2; body.position.set(0, 0.85, 0.9); g.add(body);
      const lid = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.04, bevelEnabled: false }), black); lid.rotation.set(-Math.PI / 2 + 0.6, 0, 0); lid.position.set(0, 1.35, 0.9); g.add(lid);
      for (const [lx, lz] of [[-0.7, 0.8], [0.7, 0.8], [-0.2, -1.4]]) g.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.85, 8), black, lx, 0.42, lz));
      g.add(mesh(new THREE.BoxGeometry(1.6, 0.05, 0.25), std(0xf8f8f0), 0, 1.0, 1.0)); W.group.add(g); W.colliders.push({ t: 1, x: 0, z: 6, r: 1.6, h: 1.4 }); }
    // manchas de pintura en el suelo
    for (let i = 0; i < 60; i++) { const x = (r() - 0.5) * 36, z = -44 + r() * 80; if (W._near(x, z, 0.5)) continue; const sp = mesh(new THREE.CircleGeometry(0.15 + r() * 0.35, 10), std(paint[i % 7], { roughness: 0.7 }), x, 0.025, z, false, false); sp.rotation.x = -Math.PI / 2; W.group.add(sp); }
    // estudio con gran cúpula al fondo
    { const g = new THREE.Group(); g.position.set(0, 0, -60);
      g.add(mesh(new THREE.BoxGeometry(30, 12, 12), plaster, 0, 6, 0, false, false));
      for (let k = -3; k <= 3; k++) g.add(mesh(new THREE.CircleGeometry(1.4, 24), glow(paint[(k + 3) % 7], 1.1), k * 4, 8, 6.05, false, false));
      g.add(mesh(new THREE.CylinderGeometry(8, 8, 5, 8), plaster, 0, 14.5, 0, false, false));
      g.add(mesh(new THREE.SphereGeometry(8, 8, 12, 0, TAU, 0, Math.PI / 2), std(0xc8603a, { roughness: 0.7 }), 0, 17, 0, false, false));
      g.add(mesh(new THREE.CylinderGeometry(1.2, 1.2, 3, 12), marble, 0, 26.5, 0, false, false)); g.add(mesh(new THREE.SphereGeometry(0.8, 12, 8), std(0xd8a848, { metalness: 0.8, roughness: 0.3 }), 0, 28.6, 0, false, false));
      W.group.add(g); }
    const mtn = farStd(W, 0x9a8a5a, 0.45);
    for (let k = 0; k < 10; k++) { const x = -150 + k * 33 + (r() - 0.5) * 12, z = -140 - r() * 50, h = 10 + r() * 10, w = 50 + r() * 25; const m = mesh(new THREE.SphereGeometry(w, 12, 8, 0, TAU, 0, Math.PI / 2), mtn, x, -4, z, false, false); m.scale.set(1, h / w, 0.6); W.group.add(m); }
    for (let k = 0; k < 16; k++) { const c = cypress(5 + r() * 4); c.position.set(-80 + r() * 160, 0, -90 - r() * 30); W.group.add(c); }
    brazier(W, -4, -34, 0xffd8a0); brazier(W, 4, -34, 0xffd8a0);
  },
  // ------------------------------------------------------------------ XXXII · La gran asamblea de los pueblos
  function (W) {
    const grass = texTiles('xxxii', 0xb8904a, 0x9a7a3a, 6, 0.3); grass.repeat.set(12, 18); ground(W, grass, [80, 120], 1);
    const r = mulberry32(231);
    const hide = std(0xe8d0a8, { roughness: 0.9 }); const pole = std(0x5a3a22, { roughness: 1 });
    const bands = [0xa83a2a, 0x2a5a8a, 0xe8b040, 0x2a2a2a];
    // tipis pintados alrededor del círculo
    const tipi = (x, z, k) => { if (W._near(x, z, 2.6 * k)) return; const g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(k);
      g.add(mesh(new THREE.ConeGeometry(2.2, 5, 12, 1, true), hide, 0, 2.5, 0)); for (let b = 0; b < 2; b++) g.add(mesh(new THREE.CylinderGeometry(1.32 - b * 0.4, 1.76 - b * 0.4, 0.4, 12, 1, true), std(bands[Math.floor(r() * 4)], { roughness: 0.9 }), 0, 1.2 + b * 1.2, 0, false, false));
      for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; const pl = mesh(new THREE.CylinderGeometry(0.04, 0.05, 2, 5), pole, Math.cos(a) * 0.2, 5.4, Math.sin(a) * 0.2, false, false); pl.rotation.set(Math.sin(a) * 0.3, 0, -Math.cos(a) * 0.3); g.add(pl); }
      g.add(mesh(new THREE.ConeGeometry(0.6, 1.4, 3), std(0x2a1a10), 0, 0.7, 2.0, false, false));
      W.group.add(g); W.colliders.push({ t: 1, x, z, r: 2.1 * k, h: 5 }); };
    for (const [x, z, k] of [[-10, 26, 1], [10, 30, 0.9], [-11, 6, 1.1], [11, 12, 1], [-10, -16, 0.9], [11, -12, 1.1], [-9, -32, 1], [10, -30, 0.9]]) tipi(x, z, k);
    // círculo de piedras y fuego del consejo
    if (!W._near(0, 4, 3.5)) { for (let i = 0; i < 18; i++) { const a = i / 18 * TAU; W.group.add(mesh(new THREE.DodecahedronGeometry(0.35, 0), std(0x8a8070, { flat: true }), Math.cos(a) * 3.4, 0.2, 4 + Math.sin(a) * 3.4)); }
      for (let i = 0; i < 8; i++) { const a = i / 8 * TAU + 0.2; W.group.add(withRot(mesh(new THREE.BoxGeometry(1.6, 0.35, 0.4), pole, Math.cos(a) * 2.4, 0.25, 4 + Math.sin(a) * 2.4), 'y', -a + Math.PI / 2)); }
      brazier(W, 0, 4, 0xff8a30); }
    // pastos altos y laguna con canoas a un lado
    const blade = new THREE.ConeGeometry(0.08, 0.9, 3);
    for (let i = 0; i < 260; i++) { const x = (r() < 0.5 ? -1 : 1) * (5 + r() * 15), z = -44 + r() * 80; if (W._near(x, z, 0.8)) continue; const b = mesh(blade, std([0xc8a050, 0xa88a3a, 0xd8b868][i % 3], { flat: true }), x, 0.4, z, false, false); b.rotation.z = (r() - 0.5) * 0.4; W.group.add(b); }
    const water = new THREE.MeshStandardMaterial({ color: 0x3a8ab0, roughness: 0.05, metalness: 0.3, emissive: 0x2a1a20, emissiveIntensity: 0.3 });
    const lag = mesh(new THREE.CircleGeometry(6, 32), water, 15, 0.04, -40, false, true); lag.rotation.x = -Math.PI / 2; lag.scale.set(1, 1.6, 1); if (!W._near(15, -40, 4)) { W.group.add(lag);
      for (const dz of [-3, 2]) { const c = new THREE.Group(); c.position.set(14 + dz * 0.3, 0.2, -40 + dz); c.add(withRot(mesh(new THREE.CylinderGeometry(0.3, 0.3, 4.4, 8), pole, 0, 0, 0, false, false), 'x', Math.PI / 2)); c.add(withRot(mesh(new THREE.CylinderGeometry(0.12, 0.12, 4, 6), pole, 1.4, 0, 0, false, false), 'x', Math.PI / 2)); c.add(mesh(new THREE.BoxGeometry(1.5, 0.08, 0.1), pole, 0.7, 0.1, 1, false, false)); c.add(mesh(new THREE.BoxGeometry(1.5, 0.08, 0.1), pole, 0.7, 0.1, -1, false, false)); W.group.add(c); } }
    // el gran pino blanco con su águila al fondo
    { const g = new THREE.Group(); g.position.set(0, 0, -58);
      g.add(mesh(new THREE.CylinderGeometry(1.4, 2.4, 34, 12), std(0x6a5a4a, { roughness: 1 }), 0, 17, 0, false, false));
      for (let k = 0; k < 7; k++) g.add(mesh(new THREE.ConeGeometry(14 - k * 1.7, 7, 10), std([0x2a5a3a, 0x3a6a42, 0x2a4a32][k % 3], { roughness: 1, flat: true }), 0, 14 + k * 4.2, 0, false, false));
      for (let i = 0; i < 4; i++) { const a = i / 4 * TAU + 0.4; const root = mesh(new THREE.CylinderGeometry(0.25, 0.6, 14, 6), std(0xf0ece0, { roughness: 0.8 }), Math.cos(a) * 7, 0.25, Math.sin(a) * 7, false, false); root.rotation.set(Math.PI / 2, 0, -a + Math.PI / 2); g.add(root); }
      const eagle = new THREE.Group(); eagle.position.set(0, 46, 0); g.add(eagle); eagle.add(mesh(new THREE.SphereGeometry(0.7, 10, 8), std(0x3a2a1a), 0, 0, 0, false, false)); for (const sx of [-1, 1]) { const wg = mesh(new THREE.BoxGeometry(3, 0.1, 1), std(0x3a2a1a), sx * 1.6, 0.2, 0, false, false); wg.rotation.z = sx * 0.25; eagle.add(wg); } eagle.add(mesh(new THREE.SphereGeometry(0.35, 10, 8), std(0xf0f0f0), 0, 0.5, 0.5, false, false));
      W.anim.push((t) => { eagle.rotation.y = Math.sin(t * 0.3) * 0.6; });
      W.group.add(g); }
    // mesetas y una gran roca roja en el horizonte
    const mesa = farStd(W, 0xa8603a, 0.35);
    for (let k = 0; k < 9; k++) { const x = -160 + k * 40 + (r() - 0.5) * 14, z = -130 - r() * 50, h = 14 + r() * 16, w = 18 + r() * 20; W.group.add(mesh(new THREE.CylinderGeometry(w * 0.85, w, h, 8), mesa, x, h / 2 - 2, z, false, false)); }
    const rock = mesh(new THREE.SphereGeometry(30, 20, 10, 0, TAU, 0, Math.PI / 2), farStd(W, 0xd8582a, 0.25), 90, -2, -150, false, false); rock.scale.set(1.6, 0.6, 0.8); W.group.add(rock);
    brazier(W, -4, -34, 0xff9a40); brazier(W, 4, -34, 0xff9a40);
  },
  // ------------------------------------------------------------------ XXXIII · La casa de los cuidados
  function (W) {
    const tiles = texTiles('xxxiii', 0xeef2ee, 0xc8d8d0, 8, 0.05); tiles.repeat.set(10, 16); ground(W, tiles, [80, 120], 0.45);
    const r = mulberry32(241);
    const white = std(0xf6f6f2, { roughness: 0.6 }); const trim = std(0xc8d8d0, { roughness: 0.6 }); const glassJ = new THREE.MeshStandardMaterial({ color: 0xa8e0d0, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.6 });
    // claustro blanco con arcadas
    for (const side of [-1, 1]) {
      const a = arcade(80, 16, 4.6, white, trim, { attic: 1.2 }); a.rotation.y = Math.PI / 2; a.position.set(side * 20.5, 0, -5); W.group.add(a);
      for (let i = 0; i <= 16; i++) W.colliders.push({ t: 1, x: side * 20.5, z: -45 + i * 5, r: 0.6, h: 7 });
      W.group.add(mesh(new THREE.BoxGeometry(0.6, 9, 82), white, side * 23.4, 4.5, -5, false, false)); W.colliders.push({ t: 0, x0: side * 23.4 - 0.4, x1: side * 23.4 + 0.4, z0: -47, z1: 37, h: 9 });
      // estantes con frascos de botica
      for (let z = -40; z <= 30; z += 10) { W.group.add(mesh(new THREE.BoxGeometry(0.4, 2.4, 3), std(0x6a4a2a), side * 22.9, 1.6, z, false, false));
        for (let k = 0; k < 9; k++) W.group.add(mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.4, 10), k % 3 ? glassJ : std([0x3a7ab0, 0xb03a3a, 0xd8a838][k % 3], { roughness: 0.3 }), side * 22.6, 0.8 + Math.floor(k / 3) * 0.8, z - 1 + (k % 3) * 0.9, false, false)); }
    }
    // huerto de plantas medicinales y fuente
    const beds = addGardens(W, r, { x0: 8, xMax: 15.5 }); addButterflies(W, beds, 10, r);
    fountain(W, 0, 6, white);
    // faroles
    for (const [x, z] of [[-5, 24], [5, 24], [-5, -6], [5, -6], [-5, -24], [5, -24]]) { if (W._near(x, z, 0.6)) continue; W.group.add(mesh(new THREE.CylinderGeometry(0.07, 0.1, 3, 8), std(0x2a3a3a, { metalness: 0.5 }), x, 1.5, z)); W.group.add(mesh(new THREE.BoxGeometry(0.45, 0.6, 0.45), glow(0xfff0d0, 2), x, 3.2, z, false, false)); W.colliders.push({ t: 1, x, z, r: 0.2, h: 3 }); }
    // la enfermería histórica con grandes ventanas y reloj al fondo
    { const g = new THREE.Group(); g.position.set(0, 0, -60);
      g.add(mesh(new THREE.BoxGeometry(36, 14, 10), white, 0, 7, 0, false, false));
      g.add(mesh(new THREE.BoxGeometry(37, 1, 11), trim, 0, 14.5, 0, false, false));
      for (let k = -4; k <= 4; k++) for (const y of [4, 9.5]) g.add(mesh(new THREE.BoxGeometry(2.2, 3.6, 0.2), glow(0xe8fff4, 0.7), k * 3.8, y, 5.05, false, false));
      const ped = pediment(14, 4, 2, white); ped.position.set(0, 15, 4); g.add(ped);
      g.add(mesh(new THREE.CircleGeometry(1.3, 24), std(0xf8f4e8), 0, 16.6, 5.05, false, false)); const hand = mesh(new THREE.BoxGeometry(0.1, 1.1, 0.05), std(0x1a1a1a), 0, 16.6, 5.1, false, false); g.add(hand); W.anim.push((t) => { hand.rotation.z = -t * 0.1; });
      g.add(mesh(new THREE.CylinderGeometry(3, 3, 3, 16), white, 0, 16.5, -2, false, false)); g.add(mesh(new THREE.SphereGeometry(3, 16, 8, 0, TAU, 0, Math.PI / 2), std(0x6ab8a0, { roughness: 0.4, metalness: 0.3 }), 0, 18, -2, false, false));
      W.group.add(g); }
    const mtn = farStd(W, 0x8ab08a, 0.45);
    for (let k = 0; k < 10; k++) { const x = -150 + k * 33 + (r() - 0.5) * 12, z = -140 - r() * 50, h = 10 + r() * 10, w = 50 + r() * 25; const m = mesh(new THREE.SphereGeometry(w, 12, 8, 0, TAU, 0, Math.PI / 2), mtn, x, -4, z, false, false); m.scale.set(1, h / w, 0.6); W.group.add(m); }
    brazier(W, -4, -34, 0xfff0d0); brazier(W, 4, -34, 0xfff0d0);
  },
];

function buildWorld(idx) {
  const W = newWorld(idx); const th = W.theme; const era = ERAS[idx];
  const regs = era.sages.filter((s) => !s.boss);
  const sp = stationPositions(regs.length);
  const npcPts = (NPCS[idx] || []).flatMap((n) => [0, 0.5, 1].map((k) => [n.at[0] + n.path[0] * k, n.at[1] + n.path[1] * k]));
  const bookPts = (BOOKS[idx] || []).map((b) => b.at);
  W._near = (x, z, d) => bookPts.some(([bx, bz]) => Math.hypot(bx - x, bz - z) < d + 1.5) || npcPts.some(([nx, nz]) => Math.hypot(nx - x, nz - z) < d + 1) || sp.some(([sx, sz]) => Math.hypot(sx - x, sz - z) < d + 3) || Math.hypot(x, z - W.bossPos.z) < d + 5 || (POIS[idx] || []).some((p) => Math.hypot(p.at[0] - x, p.at[1] - z) < d + 1.5);
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
  const nB = W.group.children.length; ERA_BUILDERS[idx](W); const nE = W.group.children.length;
  addHorizon(W, idx); paintGround(W, idx); paintWalls(W, idx);
  if (G.settings.merge !== false) mergeStatic(W, nB, nE);
  if (!th.indoor && idx !== 5) addClouds(W, idx);
  if (idx === 0 || idx === 2) addGrass(W, idx, sp);
  // estaciones de los filósofos
  W.trials = []; W.gates = [];
  regs.forEach((s, i) => W.stations.push({ data: s, pos: new THREE.Vector3(sp[i][0], 0, sp[i][1]), side: Math.sign(sp[i][0]) || 1 }));
  const boss = era.sages.find((s) => s.boss); W.stations.push({ data: boss, pos: W.bossPos.clone(), boss: true, side: 1 });
  for (const st of W.stations) buildStation(W, st);
  if (typeof buildCave === 'function' && idx === CAVE_ERA) buildCave(W);
  if (typeof buildZones === 'function') buildZones(W);
  if (typeof Agora !== 'undefined') { try { Agora.build(W); } catch (e) { console.warn('ágora', e); } }

  buildPortal(W);
  // puntos de aparición de enemigos
  const r = mulberry32(idx * 101 + 3);
   buildPois(W); buildBooks(W);
  for (let i = 0; i < 24; i++) { const x = (r() * 2 - 1) * 20, z = -38 + r() * 64; if (z > 24 && Math.abs(x) < 8) continue; W.spawns.push(new THREE.Vector3(x, 0, z)); }
  return W;
}

// ============================================================================
//  ESTACIONES Y ESCENARIOS DE CADA FILÓSOFO
// ============================================================================
function buildStation(W, st) {
  const th = W.theme; const { x, z } = st.pos; const R = st.boss ? 4.2 : 2.6;
  const g = new THREE.Group(); g.position.set(x, 0, z);
  const daisMat = W.idx === 7 ? std(0x2a2e38, { roughness: 0.3, metalness: 0.4 }) : W.idx === 5 ? std(0x2a1a10, { roughness: 0.5 }) : W.idx === 3 ? std(0x5a544c, { roughness: 0.7 }) : std(0xe2d8c4, { roughness: 0.55 });
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
    case 'owl': { // Hegel: la lechuza de Minerva sobre un pedestal
      add(mesh(new THREE.CylinderGeometry(0.5, 0.65, 1.6, 12), stone, 0, 0.8, 0));
      const owl = add(new THREE.Group()); owl.position.y = 1.6;
      const fe = std(0x8a6a4a, { roughness: 0.9, flat: true });
      const body = mesh(new THREE.SphereGeometry(0.45, 12, 10), fe, 0, 0.5, 0); body.scale.set(1, 1.3, 0.9); owl.add(body);
      owl.add(mesh(new THREE.SphereGeometry(0.34, 12, 10), fe, 0, 1.15, 0));
      for (const s of [-1, 1]) { owl.add(mesh(new THREE.SphereGeometry(0.11, 10, 8), glow(0xffc040, 3), s * 0.13, 1.2, 0.28, false, false)); put(owl, mesh(new THREE.ConeGeometry(0.07, 0.22, 4), fe, s * 0.2, 1.47, 0)).rotation.z = -s * 0.3; }
      owl.add(mesh(new THREE.ConeGeometry(0.05, 0.12, 4), std(0x3a2a1a), 0, 1.08, 0.33));
      W.anim.push((t) => { owl.rotation.y = Math.sin(t * 0.4) * 0.6; });
      col(0.7); break;
    }
    case 'leap': { // Kierkegaard: dos bordes y un abismo de luz entre ellos
      for (const s of [-1, 1]) add(mesh(new THREE.BoxGeometry(1.1, 1.2 + (s > 0 ? 0.4 : 0), 1.2), stone, s * 1.1, 0.6 + (s > 0 ? 0.2 : 0), 0));
      const gap = add(mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.05, 20), glow(acc, 2.4, { transparent: true, opacity: 0.8 }), 0, 0.03, 0, false, false));
      const orb = add(mesh(new THREE.SphereGeometry(0.16, 12, 10), glow(0xffffff, 3), 0, 1.6, 0, false, false));
      W.anim.push((t) => { const k = (t * 0.5) % 1; orb.position.set(-1.1 + k * 2.2, 1.6 + Math.sin(k * Math.PI) * 1.4, 0); gap.material.opacity = 0.5 + Math.sin(t * 2) * 0.3; });
      col(1.2); break;
    }
    case 'gears': { // Marx: engranajes de una fábrica
      const iron = std(0x4a4440, { metalness: 0.7, roughness: 0.45 });
      const gearsA = [];
      for (const [x, y, r, dir] of [[-0.6, 1.4, 0.8, 1], [0.55, 2.1, 0.55, -1.45], [0.75, 0.8, 0.45, -1.8]]) {
        const gg = add(new THREE.Group()); gg.position.set(x, y, 0);
        gg.add(mesh(new THREE.TorusGeometry(r, 0.12, 8, 24), iron, 0, 0, 0));
        for (let k = 0; k < 10; k++) { const a = (k / 10) * TAU; const tth = mesh(new THREE.BoxGeometry(0.18, 0.22, 0.2), iron, Math.cos(a) * (r + 0.15), Math.sin(a) * (r + 0.15), 0); tth.rotation.z = a; gg.add(tth); }
        for (let k = 0; k < 3; k++) { const sp = mesh(new THREE.BoxGeometry(r * 2, 0.08, 0.08), iron); sp.rotation.z = (k / 3) * Math.PI; gg.add(sp); }
        put(gg, mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.3, 10), glow(acc, 2), 0, 0, 0, false, false)).rotation.x = Math.PI / 2;
        gearsA.push([gg, dir]);
      }
      add(mesh(new THREE.BoxGeometry(2.4, 0.3, 0.8), iron, 0, 0.15, 0));
      W.anim.push((t, dt) => gearsA.forEach(([gg, d]) => (gg.rotation.z += d * dt * 0.6)));
      col(1.3); break;
    }
    case 'hammer': { // Nietzsche: el martillo sobre una roca de los Alpes
      const rock = add(mesh(new THREE.DodecahedronGeometry(1.1, 0), std(0x8a8478, { roughness: 1, flat: true }), 0, 0.7, 0)); rock.scale.set(1.3, 0.8, 1);
      const hm = add(new THREE.Group()); hm.position.set(0.2, 1.4, 0); hm.rotation.z = 0.5;
      hm.add(mesh(new THREE.CylinderGeometry(0.06, 0.07, 1.6, 8), darkW, 0, 0.8, 0));
      hm.add(mesh(new THREE.BoxGeometry(0.7, 0.3, 0.3), std(0x5a5a62, { metalness: 0.8, roughness: 0.35 }), 0, 1.6, 0));
      const spark = add(mesh(new THREE.OctahedronGeometry(0.12, 0), glow(acc, 4), 0, 2.9, 0, false, false));
      W.anim.push((t) => { spark.rotation.y = t * 2; spark.position.y = 2.9 + Math.sin(t * 2) * 0.15; });
      col(1.4); break;
    }
    case 'cafe': { // Sartre: mesa de café con dos tazas y un libro
      add(mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.05, 20), std(0xd8d4cc, { roughness: 0.3 }), 0, 1.05, 0));
      add(mesh(new THREE.CylinderGeometry(0.05, 0.08, 1.05, 8), darkW, 0, 0.52, 0));
      for (const s of [-1, 1]) {
        add(mesh(new THREE.CylinderGeometry(0.08, 0.06, 0.12, 10), std(0xf6f2ea), s * 0.25, 1.14, 0.1));
        const ch = add(new THREE.Group()); ch.position.set(s * 0.95, 0, 0);
        ch.add(mesh(new THREE.BoxGeometry(0.45, 0.05, 0.45), darkW, 0, 0.5, 0)); ch.add(mesh(new THREE.BoxGeometry(0.05, 0.55, 0.45), darkW, s * 0.22, 0.78, 0));
        for (const [a, b] of [[-1, -1], [-1, 1], [1, -1], [1, 1]]) ch.add(mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.5, 5), darkW, a * 0.19, 0.25, b * 0.19));
      }
      add(mesh(new THREE.BoxGeometry(0.3, 0.05, 0.22), std(0x8c1d2c), 0, 1.1, -0.2));
      const steam = add(mesh(new THREE.SphereGeometry(0.06, 8, 6), glow(0xffffff, 1.5, { transparent: true, opacity: 0.4 }), 0.25, 1.3, 0.1, false, false));
      W.anim.push((t) => { steam.position.y = 1.3 + ((t * 0.4) % 0.5); steam.material.opacity = 0.4 * (1 - ((t * 0.4) % 0.5) * 2); });
      col(1.2); break;
    }
    case 'mirror': { // Beauvoir: un espejo de pie que refleja luz
      const frame = std(0xc8a050, { metalness: 0.8, roughness: 0.3 });
      const fr = add(mesh(new THREE.TorusGeometry(0.7, 0.07, 8, 32), frame, 0, 1.9, 0)); fr.scale.y = 1.4;
      const glass = add(mesh(new THREE.CircleGeometry(0.66, 32), new THREE.MeshStandardMaterial({ color: 0xbfd8ff, metalness: 1, roughness: 0.05, emissive: new THREE.Color(acc), emissiveIntensity: 0.25 }), 0, 1.9, 0, false)); glass.scale.y = 1.4;
      add(mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.9, 6), frame, 0, 0.45, 0)); add(mesh(new THREE.CylinderGeometry(0.4, 0.45, 0.08, 16), frame, 0, 0.04, 0));
      W.anim.push((t) => { glass.material.emissiveIntensity = 0.2 + Math.sin(t * 1.3) * 0.12; fr.parent.rotation.y = Math.sin(t * 0.3) * 0.25; });
      col(0.7); break;
    }
    case 'boulder': { // Camus: la roca de Sísifo en su pendiente
      const ramp = add(mesh(new THREE.BoxGeometry(1.4, 0.2, 3.2), std(0x9a8a6a, { roughness: 1 }), 0, 0.7, 0)); ramp.rotation.x = 0.42;
      const rk = add(mesh(new THREE.DodecahedronGeometry(0.55, 1), std(0x7a7066, { roughness: 1, flat: true }), 0, 1.1, 0));
      W.anim.push((t) => { const k = (Math.sin(t * 0.35) * 0.5 + 0.5); rk.position.set(0, 0.55 + 0.55 + (k - 0.5) * 1.3, (0.5 - k) * 2.8); rk.rotation.x = -k * 6; });
      col(1.3); break;
    }
    case 'globe': { // Arendt: la Tierra, nuestro mundo común
      add(mesh(new THREE.CylinderGeometry(0.5, 0.7, 1.4, 16), stone, 0, 0.7, 0));
      const earth = add(mesh(new THREE.SphereGeometry(0.75, 32, 20), std(0xffffff, { map: earthTexture(), roughness: 0.6, emissive: 0x0a2040, ei: 0.4 }), 0, 2.3, 0));
      const ring = add(mesh(new THREE.TorusGeometry(1.05, 0.02, 6, 64), glow(acc, 2.5), 0, 2.3, 0, false, false)); ring.rotation.x = 1.2;
      W.anim.push((t, dt) => { earth.rotation.y += dt * 0.25; ring.rotation.z += dt * 0.4; });
      col(0.9); break;
    }
    case 'lyre': { // Teano: una lira de la armonía
      add(mesh(new THREE.CylinderGeometry(0.45, 0.6, 1.1, 12), stone, 0, 0.55, 0));
      const ly = add(new THREE.Group()); ly.position.y = 1.15;
      for (const s of [-1, 1]) { const arm = mesh(new THREE.TorusGeometry(0.55, 0.06, 6, 16, Math.PI * 0.7), brass, s * 0.25, 0.75, 0); arm.rotation.z = s > 0 ? -0.2 : Math.PI + 0.2; ly.add(arm); }
      ly.add(mesh(new THREE.BoxGeometry(1.3, 0.08, 0.08), brass, 0, 1.45, 0)); ly.add(mesh(new THREE.SphereGeometry(0.3, 12, 8), darkW, 0, 0.15, 0));
      const strings = []; for (let k = 0; k < 7; k++) { const st = mesh(new THREE.BoxGeometry(0.015, 1.25, 0.015), glow(acc, 2.2), -0.36 + k * 0.12, 0.8, 0, false, false); ly.add(st); strings.push(st); }
      W.anim.push((t) => strings.forEach((st, k) => { st.position.z = Math.sin(t * 9 + k) * 0.012; }));
      col(0.7); break;
    }
    case 'mandala': { // Hildegarda: una visión de círculos de luz
      add(mesh(new THREE.CylinderGeometry(0.5, 0.6, 0.3, 14), stone, 0, 0.15, 0));
      const v = add(new THREE.Group()); v.position.y = 2.1;
      const cols = [0xffd36a, 0x6ad0ff, 0xff7a9a, 0x9aff8a];
      for (let k = 0; k < 4; k++) { const ring = mesh(new THREE.TorusGeometry(0.35 + k * 0.28, 0.035, 6, 48), glow(cols[k], 2.4), 0, 0, 0, false, false); v.add(ring); }
      v.add(mesh(new THREE.SphereGeometry(0.2, 14, 10), glow(0xffffff, 4), 0, 0, 0, false, false));
      W.anim.push((t) => { v.children.forEach((c, k) => { c.rotation.x = t * (0.3 + k * 0.15); c.rotation.y = t * (0.2 + k * 0.1); }); });
      col(0.7); break;
    }
    case 'city': { // Christine: torres de la Ciudad de las Damas
      const wall = std(0xe8dcc0, { roughness: 0.7 });
      for (const [x, z, h] of [[-0.7, 0, 2.2], [0.1, -0.3, 2.9], [0.8, 0.1, 1.8]]) {
        add(mesh(new THREE.CylinderGeometry(0.32, 0.36, h, 10), wall, x, h / 2, z));
        add(mesh(new THREE.ConeGeometry(0.42, 0.7, 10), std(0x2a4a8a, { roughness: 0.6 }), x, h + 0.35, z));
        add(mesh(new THREE.BoxGeometry(0.12, 0.2, 0.05), glow(0xffd080, 3), x, h * 0.7, z + 0.34, false, false));
      }
      const flag = add(mesh(new THREE.PlaneGeometry(0.4, 0.25), std(acc, { side: THREE.DoubleSide, emissive: acc, ei: 0.4 }), 0.3, 3.9, -0.3));
      W.anim.push((t) => { flag.rotation.y = Math.sin(t * 3) * 0.4; });
      col(1.1); break;
    }
    case 'flower': { // Nezahualcóyotl: flor y canto
      add(mesh(new THREE.CylinderGeometry(0.55, 0.7, 0.6, 10), std(0x8a6a4a, { roughness: 0.9 }), 0, 0.3, 0));
      const fl = add(new THREE.Group()); fl.position.y = 1.5;
      fl.add(mesh(new THREE.CylinderGeometry(0.04, 0.05, 1.2, 6), std(0x3a7a3a), 0, -0.4, 0));
      for (let k = 0; k < 8; k++) { const a = (k / 8) * TAU; const p = mesh(new THREE.SphereGeometry(0.28, 10, 8), std(k % 2 ? 0xff8a2a : 0xffc83a, { roughness: 0.6, emissive: 0x401800, ei: 0.4 }), Math.cos(a) * 0.32, 0.25, Math.sin(a) * 0.32); p.scale.set(1, 0.35, 0.6); p.rotation.y = -a; fl.add(p); }
      fl.add(mesh(new THREE.SphereGeometry(0.16, 10, 8), glow(0xffe08a, 2.5), 0, 0.3, 0, false, false));
      const notes = []; for (let k = 0; k < 3; k++) { const n = mesh(new THREE.OctahedronGeometry(0.08, 0), glow(acc, 3), 0, 0, 0, false, false); add(n); notes.push(n); }
      W.anim.push((t) => { fl.rotation.y = t * 0.3; notes.forEach((n, k) => { const u = (t * 0.4 + k / 3) % 1; n.position.set(Math.sin(u * 6 + k) * 0.4, 1.9 + u * 1.5, Math.cos(u * 6 + k) * 0.4); n.scale.setScalar(1 - u); }); });
      col(0.8); break;
    }
    case 'rose': { // Martí: la rosa blanca
      add(mesh(new THREE.CylinderGeometry(0.4, 0.5, 1.1, 12), stone, 0, 0.55, 0));
      add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.8, 6), std(0x2a6a2a), 0, 1.5, 0));
      const rose = add(new THREE.Group()); rose.position.y = 2;
      for (let k = 0; k < 10; k++) { const a = (k / 10) * TAU * 1.6; const r2 = 0.06 + k * 0.022; const p = mesh(new THREE.SphereGeometry(0.15, 10, 8), std(0xf8f6f0, { roughness: 0.5, emissive: 0xffffff, ei: 0.12 }), Math.cos(a) * r2, k * 0.012, Math.sin(a) * r2); p.scale.set(0.9, 0.55, 0.5); p.rotation.y = -a; rose.add(p); }
      for (const s of [-1, 1]) { const lf = mesh(new THREE.SphereGeometry(0.12, 8, 6), std(0x2a6a2a), s * 0.15, -0.25, 0); lf.scale.set(1.4, 0.3, 0.7); rose.add(lf); }
      W.anim.push((t) => { rose.rotation.y = Math.sin(t * 0.5) * 0.4; });
      col(0.6); break;
    }
    case 'chalkboard': { // Freire: pizarra con «tierra» escrita
      const board = new THREE.CanvasTexture((() => { const c = document.createElement('canvas'); c.width = 256; c.height = 160; const x = c.getContext('2d'); x.fillStyle = '#1f3a2a'; x.fillRect(0, 0, 256, 160); x.fillStyle = '#f2f2e8'; x.font = 'bold 44px serif'; x.textAlign = 'center'; x.fillText('TIERRA', 128, 70); x.font = '30px serif'; x.fillText('ti · e · rra', 128, 120); return c; })());
      board.colorSpace = THREE.SRGBColorSpace;
      add(mesh(new THREE.BoxGeometry(2.1, 1.35, 0.08), darkW, 0, 1.75, 0));
      add(mesh(new THREE.PlaneGeometry(1.9, 1.18), std(0xffffff, { map: board, roughness: 0.9, emissive: 0xffffff, emissiveMap: board, ei: 0.25 }), 0, 1.75, 0.05, false));
      for (const s of [-1, 1]) add(mesh(new THREE.BoxGeometry(0.08, 1.2, 0.08), darkW, s * 0.9, 0.6, 0));
      add(mesh(new THREE.BoxGeometry(1.6, 0.06, 0.18), darkW, 0, 1.05, 0.1));
      col(1.1); break;
    }
    case 'sun': { // Pachacútec: el disco de Inti
      add(mesh(new THREE.CylinderGeometry(0.5, 0.7, 1.2, 10), std(0x8a7a6a, { roughness: 0.9, flat: true }), 0, 0.6, 0));
      const sun = add(new THREE.Group()); sun.position.y = 2.4;
      sun.add(mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.12, 32), std(0xffc040, { metalness: 0.9, roughness: 0.25, emissive: 0xff9a20, ei: 0.5 }), 0, 0, 0));
      sun.children[0].rotation.x = Math.PI / 2;
      for (let k = 0; k < 16; k++) { const a = (k / 16) * TAU; const ray = mesh(new THREE.ConeGeometry(0.1, 0.55, 4), std(0xffc040, { metalness: 0.9, roughness: 0.25, emissive: 0xff9a20, ei: 0.5 }), Math.cos(a) * 0.95, Math.sin(a) * 0.95, 0); ray.rotation.z = a - Math.PI / 2; sun.add(ray); }
      W.anim.push((t) => { sun.rotation.z = t * 0.2; });
      col(0.8); break;
    }
    case 'quipu': { // Inca Roca: cuerdas anudadas
      const bar = add(mesh(new THREE.CylinderGeometry(0.05, 0.05, 2, 8), std(0xd8c8a0), 0, 2.4, 0)); bar.rotation.z = Math.PI / 2;
      for (const s of [-1, 1]) add(mesh(new THREE.CylinderGeometry(0.05, 0.06, 2.5, 6), darkW, s * 1, 1.25, 0));
      const cols = [0xc84a2a, 0xd8b048, 0x2a5aa8, 0x3a8a4a, 0xf2efe6, 0x6a3a8a];
      const cords = [];
      for (let k = 0; k < 10; k++) { const x = -0.85 + k * 0.19; const len = 0.9 + ((k * 37) % 5) * 0.15; const c = new THREE.Group(); c.position.set(x, 2.38, 0); c.add(mesh(new THREE.CylinderGeometry(0.018, 0.018, len, 4), std(cols[k % cols.length]), 0, -len / 2, 0, false)); for (let n = 0; n < 1 + (k % 4); n++) c.add(mesh(new THREE.SphereGeometry(0.045, 6, 4), std(cols[(k + 2) % cols.length]), 0, -0.2 - n * 0.18, 0, false)); add(c); cords.push(c); }
      W.anim.push((t) => cords.forEach((c, k) => { c.rotation.z = Math.sin(t * 1.3 + k) * 0.05; }));
      col(1.1); break;
    }
    case 'drum': { // la machi: el kultrún sobre un rewe
      const wood = std(0x6a4a30, { roughness: 0.9 });
      const rewe = add(mesh(new THREE.CylinderGeometry(0.22, 0.28, 3, 8), wood, -0.7, 1.5, 0));
      for (let k = 0; k < 6; k++) add(mesh(new THREE.BoxGeometry(0.5, 0.08, 0.3), wood, -0.7, 0.4 + k * 0.45, 0.2));
      const kt = add(new THREE.Group()); kt.position.set(0.5, 1.2, 0);
      kt.add(mesh(new THREE.SphereGeometry(0.45, 16, 10, 0, TAU, Math.PI / 2, Math.PI / 2), wood, 0, 0, 0));
      const skin = new THREE.CanvasTexture((() => { const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d'); x.fillStyle = '#e8d8b0'; x.beginPath(); x.arc(64, 64, 63, 0, TAU); x.fill(); x.strokeStyle = '#8a1a1a'; x.lineWidth = 6; x.beginPath(); x.moveTo(64, 4); x.lineTo(64, 124); x.moveTo(4, 64); x.lineTo(124, 64); x.stroke(); for (const [a, b] of [[32, 32], [96, 32], [32, 96], [96, 96]]) { x.beginPath(); x.arc(a, b, 10, 0, TAU); x.stroke(); } return c; })());
      const top = mesh(new THREE.CircleGeometry(0.45, 24), std(0xffffff, { map: skin, roughness: 0.8 }), 0, 0.01, 0, false); top.rotation.x = -Math.PI / 2; kt.add(top);
      add(mesh(new THREE.CylinderGeometry(0.2, 0.3, 0.8, 8), wood, 0.5, 0.4, 0));
      W.anim.push((t) => { kt.position.y = 1.2 + Math.max(0, Math.sin(t * 6)) * 0.02; });
      col(1.1); break;
    }
    case 'tree': { // Buda, el kimche, Maathai: un árbol sagrado joven
      const t = add(new THREE.Group());
      t.add(mesh(new THREE.CylinderGeometry(0.15, 0.3, 2.4, 8), std(0x5a4030, { roughness: 1 }), 0, 1.2, 0));
      const lc = std(0x3f7a3a, { roughness: 0.85, flat: true });
      for (let k = 0; k < 7; k++) { const a = (k / 7) * TAU; t.add(mesh(new THREE.IcosahedronGeometry(0.6, 0), lc, Math.cos(a) * 0.7, 2.6 + (k % 2) * 0.4, Math.sin(a) * 0.7)); }
      t.add(mesh(new THREE.IcosahedronGeometry(0.75, 0), lc, 0, 3.2, 0));
      const lights = []; for (let k = 0; k < 6; k++) { const l = mesh(new THREE.SphereGeometry(0.06, 6, 4), glow(acc, 3), 0, 0, 0, false, false); t.add(l); lights.push(l); }
      W.anim.push((tt) => lights.forEach((l, k) => { const a = tt * 0.5 + k; l.position.set(Math.cos(a) * 1.2, 2.4 + Math.sin(tt + k) * 0.6, Math.sin(a) * 1.2); }));
      col(0.6); break;
    }
    case 'yinyang': { // Laozi
      add(mesh(new THREE.CylinderGeometry(0.5, 0.65, 1.2, 12), stone, 0, 0.6, 0));
      const yy = add(new THREE.Group()); yy.position.y = 2.2;
      const tex = new THREE.CanvasTexture((() => { const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d'); x.fillStyle = '#f4f0e8'; x.beginPath(); x.arc(64, 64, 62, 0, TAU); x.fill(); x.fillStyle = '#1a1a1e'; x.beginPath(); x.arc(64, 64, 62, -Math.PI / 2, Math.PI / 2); x.arc(64, 95, 31, Math.PI / 2, -Math.PI / 2, true); x.arc(64, 33, 31, Math.PI / 2, -Math.PI / 2); x.fill(); x.beginPath(); x.arc(64, 33, 9, 0, TAU); x.fill(); x.fillStyle = '#f4f0e8'; x.beginPath(); x.arc(64, 95, 9, 0, TAU); x.fill(); return c; })());
      for (const s of [1, -1]) { const d = mesh(new THREE.CircleGeometry(0.7, 40), std(0xffffff, { map: tex, roughness: 0.5, emissive: 0xffffff, emissiveMap: tex, ei: 0.2 }), 0, 0, s * 0.01, false); if (s < 0) d.rotation.y = Math.PI; yy.add(d); }
      yy.add(mesh(new THREE.TorusGeometry(0.72, 0.04, 6, 40), glow(acc, 2), 0, 0, 0, false, false));
      W.anim.push((t) => { yy.rotation.z = t * 0.4; yy.rotation.y = Math.sin(t * 0.3) * 0.5; });
      col(0.7); break;
    }
    case 'butterfly': { // Zhuangzi: mariposas que revolotean sobre una flor
      add(mesh(new THREE.CylinderGeometry(0.4, 0.5, 0.8, 10), stone, 0, 0.4, 0));
      add(mesh(new THREE.SphereGeometry(0.3, 10, 8), std(0xff8ab0, { roughness: 0.6 }), 0, 1.0, 0));
      const wing = new THREE.PlaneGeometry(0.3, 0.22); wing.translate(0.15, 0, 0);
      const bs = [];
      for (let k = 0; k < 3; k++) { const m = new THREE.MeshBasicMaterial({ color: new THREE.Color([0x6ad0ff, 0xffd34a, 0xff8ab0][k]).multiplyScalar(1.4), side: THREE.DoubleSide, toneMapped: false }); const b = new THREE.Group(); const L = new THREE.Mesh(wing, m), R = new THREE.Mesh(wing, m); R.scale.x = -1; b.add(L, R); add(b); bs.push([b, L, R, k]); }
      W.anim.push((t) => bs.forEach(([b, L, R, k]) => { const a = t * (0.7 + k * 0.2) + k * 2; b.position.set(Math.cos(a) * (0.8 + k * 0.2), 1.6 + Math.sin(a * 1.7) * 0.4 + k * 0.3, Math.sin(a) * (0.8 + k * 0.2)); b.rotation.y = -a; const f = Math.sin(t * 18 + k) * 1.1; L.rotation.y = f; R.rotation.y = -f; }));
      col(0.6); break;
    }
    case 'lotus': { // Mahavira: una flor de loto sobre el agua
      add(mesh(new THREE.CylinderGeometry(1.1, 1.2, 0.4, 24), stone, 0, 0.2, 0));
      add(mesh(new THREE.CylinderGeometry(1, 1, 0.05, 24), new THREE.MeshStandardMaterial({ color: 0x2a6a8a, roughness: 0.05, metalness: 0.6 }), 0, 0.42, 0, false));
      const lt = add(new THREE.Group()); lt.position.y = 0.5;
      for (let ring = 0; ring < 2; ring++) for (let k = 0; k < 8; k++) { const a = (k / 8) * TAU + ring * 0.4; const p = mesh(new THREE.SphereGeometry(0.22, 10, 8), std(ring ? 0xffd0e0 : 0xff9ac0, { roughness: 0.5, emissive: 0x401020, ei: 0.3 }), Math.cos(a) * (0.32 - ring * 0.12), 0.12 + ring * 0.1, Math.sin(a) * (0.32 - ring * 0.12)); p.scale.set(0.5, 0.9, 1); p.rotation.set(0, -a, ring ? 0.3 : 0.7); lt.add(p); }
      lt.add(mesh(new THREE.SphereGeometry(0.1, 10, 8), glow(0xffe08a, 3), 0, 0.3, 0, false, false));
      W.anim.push((t) => { lt.rotation.y = t * 0.15; });
      col(1.2); break;
    }
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
  W.group.add(g); W.clouds = g; W.anim.push((t, dt) => (g.rotation.y += dt * 0.006));
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
