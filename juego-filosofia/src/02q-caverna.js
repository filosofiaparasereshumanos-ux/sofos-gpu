// ============================================================================
//  LA CAVERNA DE PLATÓN (Atenas): un espacio explorable junto a Platón.
//  Se entra por una boca de roca y se baja por terrazas: la salida hacia el sol,
//  el fuego, el camino con el muro bajo y los portadores de objetos, y al fondo
//  los prisioneros encadenados mirando las sombras en la pared.
// ============================================================================
const CAVE = { x: 90, x0: 78, x1: 102, z0: -19, z1: 27, entry: [90, 6, 23], fire: [90, 4.1, 9] };
const CAVE_ERA = 1;
const inCave = (x) => x > 60;
// lugares para descubrir dentro de la caverna (cuentan como lugares de Atenas)
POIS[CAVE_ERA].push(
  { id: 'cueva-salida', at: [93, 22], y: 6, name: 'La salida hacia el sol', text: 'Platón imagina que uno de los prisioneros es liberado y obligado a subir por un camino áspero y empinado hasta la salida. Al principio la luz del sol lo ciega y le duele. Poco a poco ve las sombras, luego los reflejos en el agua, después las cosas mismas y, al final, el sol. El sol representa la Idea del Bien, que hace visible y comprensible todo lo demás.',
    fact: 'Platón cuenta el mito de la caverna en el libro VII de La República, como un diálogo entre Sócrates y Glaucón.',
    q: { q: '¿Qué representa el sol en el mito de la caverna?', a: ['La Idea del Bien, que hace comprensible todo lo demás', 'El fuego de la cocina', 'El poder del rey', 'Un dios que castiga'], e: 'Es la meta del camino del conocimiento.' } },
  { id: 'cueva-fuego', at: [86, 9], y: 3, name: 'El fuego de la caverna', text: 'Detrás de los prisioneros, en lo alto, arde un fuego. Su luz proyecta sobre la pared del fondo las sombras de los objetos que pasan por delante. Si un prisionero liberado mirara directamente el fuego, le dolerían los ojos y querría volver a sus sombras, que le resultan más cómodas y familiares.',
    fact: 'Para Platón, aprender duele un poco: salir de lo conocido incomoda, y por eso muchos prefieren quedarse con las sombras.',
    q: { q: '¿Por qué el prisionero liberado querría volver a las sombras al ver el fuego?', a: ['Porque la luz le duele y las sombras le son familiares', 'Porque tiene frío', 'Porque el fuego es falso', 'Porque se lo ordenan'], e: 'Salir de la comodidad cuesta.' } },
  { id: 'cueva-muro', at: [80.5, 2], y: 1.5, name: 'El muro y los portadores', text: 'Entre el fuego y los prisioneros hay un camino elevado con un muro bajo, como el de los titiriteros. Por detrás del muro pasan personas que llevan objetos: figuras de animales, vasijas, estatuas. Los prisioneros nunca ven a los portadores ni los objetos: solo sus sombras. Lo que creen real son copias de copias.',
    fact: 'Hoy muchos lectores comparan el mito con las pantallas: vemos imágenes que otros eligen mostrarnos. ¿Quiénes son hoy los portadores?',
    q: { q: '¿Qué ven en realidad los prisioneros de la caverna?', a: ['Las sombras de objetos que otros llevan detrás de un muro', 'El sol', 'Los objetos reales', 'A los portadores'], e: 'Copias de copias de la realidad.' } },
  { id: 'cueva-prisioneros', at: [80.5, -9], y: 0, name: 'Los prisioneros', text: 'Desde niños, los prisioneros están encadenados de piernas y cuello, mirando siempre la pared del fondo. Nunca han visto otra cosa que sombras, y les ponen nombres y compiten por adivinar cuál pasará después. Para ellos, las sombras son toda la realidad. Platón dice: son semejantes a nosotros.',
    fact: 'Si el que salió volviera para liberarlos, dice Platón, se reirían de él y hasta querrían matarlo. Es una alusión a la muerte de Sócrates.',
    q: { q: 'Según Platón, ¿a quiénes se parecen los prisioneros de la caverna?', a: ['A nosotros mismos', 'Solo a los esclavos', 'A los animales', 'A los dioses'], e: '«Son semejantes a nosotros», dice Sócrates en el diálogo.' } },
);
NPCS[CAVE_ERA].push({ id: 'liberado', name: 'El prisionero liberado', role: 'el que salió de la caverna y volvió', female: false, greeter: true, at: [97, -5], path: [0, 0.01],
  look: { robe: 0x6a645a, robe2: 0x3a342c, skin: 0xd8b08a, hair: 0x3a2a20, beard: 0x3a2a20, hat: 'none', acc: 'none' },
  lines: [
    'Pasé toda mi vida aquí, encadenado, mirando esa pared. Creía que las sombras eran las cosas mismas. Les poníamos nombre y competíamos por adivinar cuál pasaría después.',
    'Un día me soltaron y me obligaron a girarme. El fuego me cegó; los objetos verdaderos me parecían menos reales que sus sombras. Quise volver a mi sitio.',
    'Me arrastraron por el camino de subida hasta la salida. Afuera, la luz del sol me dolía. Primero miré sombras y reflejos en el agua; después, las cosas; al final, el sol mismo.',
    'Volví para contarles a mis compañeros lo que había visto. Mis ojos, acostumbrados a la luz, ya no distinguían bien las sombras, y se rieron de mí. Dicen que salir me arruinó la vista.',
    'Ahora te pregunto a ti, que has bajado hasta aquí: ¿qué sombras das tú por reales? ¿Y volverías a la caverna para ayudar a otros a salir, aunque se rieran de ti?',
  ] });

function buildCave(W) {
  const st = W.stations.find((s) => s.data.id === 'platon'); if (!st) return;
  const r = mulberry32(777);
  const rock = std(0x3a322a, { roughness: 1, flat: true }); const rockD = std(0x241e18, { roughness: 1, flat: true }); const iron = std(0x2a2a2e, { metalness: 0.7, roughness: 0.5 });
  const C = CAVE, cx = C.x;
  // ---------- la boca de la caverna, junto a Platón
  const side = st.pos.x >= 0 ? 1 : -1; const free = (x, z) => !W.colliders.some((o) => (o.r !== undefined ? Math.hypot(o.x - x, o.z - z) < o.r + 1.8 : x > o.x0 - 1.8 && x < o.x1 + 1.8 && z > o.z0 - 1.8 && z < o.z1 + 1.8)) && !(W._near && W._near(x, z, 0.6));
  const cand = [[side * 4.6, -2.5], [side * 4.6, 2.5], [0, -5], [side * 5.5, 0], [-side * 4.6, -2.5]];
  const pick = cand.find(([dx, dz]) => free(st.pos.x + dx, st.pos.z + dz)) || cand[0];
  const mx = st.pos.x + pick[0], mz = st.pos.z + pick[1];
  { const g = new THREE.Group(); g.position.set(mx, 0, mz);
    for (let k = 0; k < 11; k++) { const a = Math.PI * (k / 10); const b = mesh(new THREE.DodecahedronGeometry(0.75 + r() * 0.35, 0), rock, Math.cos(a) * 1.7, 0.2 + Math.sin(a) * 2.4, 0, true, false); b.rotation.set(r() * 3, r() * 3, r() * 3); g.add(b); }
    const hole = mesh(new THREE.CircleGeometry(1.45, 24, 0, Math.PI), new THREE.MeshBasicMaterial({ color: 0x050302 }), 0, 0.02, 0.05, false, false); hole.scale.y = 1.6; g.add(hole);
    const glowRing = mesh(new THREE.RingGeometry(0.85, 1.05, 40), glow(0xff9a40, 2.2, { transparent: true, opacity: 0.8, side: THREE.DoubleSide }), 0, 0.04, 1.1, false, false); glowRing.rotation.x = -Math.PI / 2; g.add(glowRing);
    const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture('La caverna de Platón', 'Entra y baja hasta los prisioneros'), transparent: true, depthWrite: false, toneMapped: false })); label.scale.set(2.6, 0.65, 1); label.position.y = 3.8; g.add(label);
    g.lookAt(0, 0, mz + 10); W.group.add(g);
    for (const s of [-1, 1]) W.colliders.push({ t: 1, x: mx + Math.cos(g.rotation.y) * 1.8 * s, z: mz - Math.sin(g.rotation.y) * 1.8 * s, r: 0.7, h: 3 });
    W.caveMouth = { x: mx + Math.sin(g.rotation.y) * 0.9, z: mz + Math.cos(g.rotation.y) * 0.9, back: { x: mx + Math.sin(g.rotation.y) * 2.6, z: mz + Math.cos(g.rotation.y) * 2.6 }, yaw: g.rotation.y + Math.PI };
  }
  // ---------- terrazas de roca (cada una es un bloque macizo desde el suelo)
  const safePos = new THREE.Vector3(...C.entry);
  const block = (z0, z1, top, x0 = C.x0, x1 = C.x1, mat = rock) => {
    const f = addFloor(W, { kind: 'box', x: (x0 + x1) / 2, z: (z0 + z1) / 2, hw: (x1 - x0) / 2, hd: (z1 - z0) / 2, top, th: Math.max(top, 0.4), safePos });
    if (top > 0.05) W.group.add(mesh(new THREE.BoxGeometry(x1 - x0, top, z1 - z0), mat, f.x, top / 2, f.z, false, true));
    return f;
  };
  block(C.z0, C.z1 + 1, 0, C.x0, C.x1, rockD); W.group.add(mesh(new THREE.BoxGeometry(C.x1 - C.x0, 0.2, C.z1 - C.z0 + 1), rockD, cx, -0.1, (C.z0 + C.z1 + 1) / 2, false, true));
  block(18, C.z1 + 1, 6);                                             // rellano de la entrada
  for (let i = 0; i < 5; i++) block(17 - i, 18 - i, 5.5 - i * 0.5);   // bajada hacia el fuego
  block(6, 13, 3);                                                    // repisa del fuego
  block(5, 6, 2.5); block(4, 5, 2);                                   // bajada hacia el camino
  block(0, 4, 1.5);                                                   // camino elevado
  block(-1, 0, 1, 97, C.x1); block(-2, -1, 0.5, 97, C.x1);             // escalones hasta el fondo
  // muro bajo (como el de los titiriteros), con un hueco a la derecha para bajar
  W.group.add(mesh(new THREE.BoxGeometry(97 - C.x0, 1.1, 0.5), std(0x5a4e40, { roughness: 1, flat: true }), (C.x0 + 97) / 2, 1.5 + 0.55, 0.25));
  W.colliders.push({ t: 0, x0: C.x0, x1: 97, z0: -0.05, z1: 0.55, h: 3 });
  // ---------- paredes, techo y estalactitas
  const shell = std(0x2e2620, { roughness: 1, flat: true });
  W.group.add(mesh(new THREE.BoxGeometry(2, 16, C.z1 - C.z0 + 4), shell, C.x0 - 1, 8, (C.z0 + C.z1) / 2, false, true)); W.colliders.push({ t: 0, x0: C.x0 - 2, x1: C.x0, z0: C.z0 - 2, z1: C.z1 + 2, h: 16 });
  W.group.add(mesh(new THREE.BoxGeometry(2, 16, C.z1 - C.z0 + 4), shell, C.x1 + 1, 8, (C.z0 + C.z1) / 2, false, true)); W.colliders.push({ t: 0, x0: C.x1, x1: C.x1 + 2, z0: C.z0 - 2, z1: C.z1 + 2, h: 16 });
  W.group.add(mesh(new THREE.BoxGeometry(C.x1 - C.x0 + 4, 16, 2), shell, cx, 8, C.z1 + 2, false, true)); W.colliders.push({ t: 0, x0: C.x0 - 2, x1: C.x1 + 2, z0: C.z1 + 1, z1: C.z1 + 3, h: 16 });
  W.group.add(mesh(new THREE.BoxGeometry(C.x1 - C.x0 + 4, 16, 1), std(0x6a5a48, { roughness: 1 }), cx, 8, C.z0 - 0.5, false, true)); W.colliders.push({ t: 0, x0: C.x0 - 2, x1: C.x1 + 2, z0: C.z0 - 2, z1: C.z0, h: 16 });
  W.group.add(mesh(new THREE.BoxGeometry(C.x1 - C.x0 + 4, 1.5, C.z1 - C.z0 + 4), shell, cx, 15.5, (C.z0 + C.z1) / 2, false, false));
  for (let k = 0; k < 40; k++) { const h = 0.8 + r() * 2.6; const s = mesh(new THREE.ConeGeometry(0.25 + r() * 0.4, h, 6), rock, C.x0 + 1 + r() * (C.x1 - C.x0 - 2), 14.8 - h / 2, C.z0 + 1 + r() * (C.z1 - C.z0 - 2), false, false); s.rotation.x = Math.PI; W.group.add(s); }
  for (let k = 0; k < 26; k++) { const z = C.z0 + 1 + r() * (C.z1 - C.z0 - 2); const x = r() < 0.5 ? C.x0 + 0.6 : C.x1 - 0.6; const b = mesh(new THREE.DodecahedronGeometry(0.6 + r() * 1.1, 0), rock, x, 0.6 + r() * 6, z, false, false); b.rotation.set(r() * 3, r() * 3, r() * 3); W.group.add(b); }
  // ---------- la salida hacia el sol (en lo alto, detrás del rellano)
  { const sunM = mesh(new THREE.PlaneGeometry(7, 5.5), glow(0xfff4d8, 4.5), cx, 6 + 2.75, C.z1 + 0.95, false, false); sunM.rotation.y = Math.PI; W.group.add(sunM);
    { const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d'); const gr = x.createRadialGradient(64, 64, 4, 64, 64, 64); gr.addColorStop(0, 'rgba(255,246,220,0.9)'); gr.addColorStop(0.4, 'rgba(255,230,180,0.35)'); gr.addColorStop(1, 'rgba(255,220,160,0)'); x.fillStyle = gr; x.fillRect(0, 0, 128, 128);
      const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, toneMapped: false })); halo.scale.set(16, 13, 1); halo.position.set(cx, 8.8, C.z1 + 0.3); W.group.add(halo); }
    const sl = new THREE.PointLight(0xfff0d0, 40, 30, 1.6); sl.position.set(cx, 8.5, C.z1 - 1); W.group.add(sl);
    const lab = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture('Salida hacia la luz', 'Camina hacia el sol para volver a Atenas'), transparent: true, depthWrite: false, toneMapped: false })); lab.scale.set(3, 0.75, 1); lab.position.set(cx, 10.4, C.z1 - 0.5); W.group.add(lab); }
  // ---------- el fuego
  const [fx, fy, fz] = C.fire;
  { W.group.add(mesh(new THREE.CylinderGeometry(1.4, 1.7, 0.6, 10), rock, fx, 3.3, fz)); W.colliders.push({ t: 1, x: fx, z: fz, r: 1.8, h: 5 });
    const flames = []; for (let k = 0; k < 5; k++) { const f = mesh(new THREE.ConeGeometry(0.55 - k * 0.06, 1.8 + k * 0.2, 8), glow(k % 2 ? 0xffb040 : 0xff6a20, 4, { transparent: true, opacity: 0.85, additive: true }), fx + (r() - 0.5) * 0.8, 4.3, fz + (r() - 0.5) * 0.8, false, false); W.group.add(f); flames.push(f); }
    W.emitters.push({ x: fx, y: 4.6, z: fz, col: 0xff9a40, rate: 30, acc: 0, kind: 'flame' });
    const fl = new THREE.PointLight(0xff9a50, 60, 40, 1.5); fl.position.set(fx, 5, fz); W.group.add(fl);
    W.anim.push((t) => { fl.intensity = 54 + Math.sin(t * 13) * 7 + Math.sin(t * 5.3) * 5; flames.forEach((f, k) => f.scale.set(1 + Math.sin(t * 11 + k) * 0.15, 1 + Math.sin(t * 8 + k * 2) * 0.25, 1)); }); }
  // ---------- portadores con objetos, y sus sombras en la pared del fondo
  const shapes = [
    () => { const g = new THREE.Group(); g.add(mesh(new THREE.BoxGeometry(1.1, 0.45, 0.25), rockD, 0, 0, 0)); g.add(mesh(new THREE.BoxGeometry(0.3, 0.55, 0.22), rockD, 0.55, 0.3, 0)); for (const lx of [-0.4, 0.4]) g.add(mesh(new THREE.BoxGeometry(0.1, 0.5, 0.12), rockD, lx, -0.45, 0)); return g; }, // caballo
    () => { const pts = [[0, 0], [0.25, 0.05], [0.4, 0.3], [0.35, 0.65], [0.15, 0.8], [0.18, 0.95], [0, 0.95]].map((p) => new THREE.Vector2(p[0], p[1])); const g = new THREE.Group(); const v = mesh(new THREE.LatheGeometry(pts, 14), std(0xb86a3a), 0, -0.4, 0); g.add(v); for (const s of [-1, 1]) { const h = mesh(new THREE.TorusGeometry(0.14, 0.035, 6, 10, Math.PI), std(0xb86a3a), s * 0.3, 0.3, 0); h.rotation.z = s * Math.PI / 2; g.add(h); } return g; }, // ánfora
    () => { const g = new THREE.Group(); g.add(mesh(new THREE.CylinderGeometry(0.15, 0.25, 0.8, 8), std(0xe8e0d0), 0, 0, 0)); g.add(mesh(new THREE.SphereGeometry(0.16, 10, 8), std(0xe8e0d0), 0, 0.55, 0)); const a = mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.6, 6), std(0xe8e0d0), 0.25, 0.2, 0); a.rotation.z = -0.9; g.add(a); return g; }, // estatua
    () => { const g = new THREE.Group(); g.add(mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.6, 6), std(0x5a3a22), 0, -0.2, 0)); g.add(mesh(new THREE.IcosahedronGeometry(0.42, 0), std(0x4a7a3a, { flat: true }), 0, 0.3, 0)); return g; }, // árbol
  ];
  const black = new THREE.MeshBasicMaterial({ color: 0x0a0604, transparent: true, opacity: 0.78, depthWrite: false });
  const T = 2.4, TX = 1.6; // tamaño y desplazamiento de las sombras en la pared (para que caigan siempre sobre ella)
  const carriers = [];
  shapes.forEach((mk, i) => {
    const look = { robe: [0x5a4a3a, 0x4a3a30, 0x6a5a48, 0x3a3028][i], robe2: 0x2a2018, skin: 0xc49372, hair: 0x2a1a10, beard: i % 2 ? 0x2a1a10 : false, hat: 'none', acc: 'none' };
    const fig = buildFigure(look, 0xffffff); fig.halo.visible = false; const g = new THREE.Group(); g.add(fig.group); W.group.add(g);
    const obj = mk(); obj.position.set(0, 3.6 - 1.5, 0.15); g.add(obj);
    const sh = mk(); sh.traverse((o) => { if (o.isMesh) { o.material = black; o.castShadow = false; } }); sh.scale.set(T, T, 0.02); W.group.add(sh);
    const ph = i * 1.7, sp = 0.35 + i * 0.05;
    carriers.push({ g, sh, ph, sp });
  });
  W.anim.push((t) => { for (const c of carriers) { const u = Math.sin(t * c.sp + c.ph); const x = cx + u * 7; const dir = Math.cos(t * c.sp + c.ph) >= 0 ? 1 : -1;
    c.g.position.set(x, 1.5, 2.2); c.g.rotation.y = dir > 0 ? Math.PI / 2 : -Math.PI / 2; c.g.position.y = 1.5 + Math.abs(Math.sin(t * 6 + c.ph)) * 0.05;
    c.sh.position.set(cx + (x - cx) * TX, 4.3, C.z0 + 0.6); c.sh.rotation.y = dir > 0 ? 0 : Math.PI; c.sh.visible = true; } });
  // ---------- los prisioneros encadenados, mirando la pared
  for (let i = 0; i < 5; i++) {
    const x = 82 + i * 3.4, z = -9; const look = { robe: 0x7a7266, robe2: 0x4a443a, skin: 0xd0a888, hair: [0x2a1a10, 0x5a3a20, 0x1a1410, 0x6a6a6a, 0x3a2a20][i], beard: i % 2 ? 0x2a1a10 : false, hat: 'none', acc: 'none' };
    const fig = buildFigure(look, 0xffffff); fig.halo.visible = false; const g = new THREE.Group(); g.add(fig.group); fig.group.position.y = -0.55; fig.group.scale.set(1, 0.92, 1);
    g.position.set(x, 0, z); g.rotation.y = Math.PI; W.group.add(g);
    W.group.add(mesh(new THREE.BoxGeometry(1, 0.45, 0.8), rock, x, 0.22, z + 0.35));
    W.colliders.push({ t: 1, x, z, r: 0.7, h: 2 });
    // grilletes y cadenas hasta argollas en el suelo
    const collar = mesh(new THREE.TorusGeometry(0.15, 0.035, 6, 14), iron, x, 1.05, z, false, false); collar.rotation.x = Math.PI / 2; W.group.add(collar);
    for (let k = 0; k < 7; k++) { const l = mesh(new THREE.TorusGeometry(0.07, 0.02, 4, 8), iron, x + 0.05 * k, 1.0 - k * 0.14, z + 0.2 + k * 0.08, false, false); l.rotation.y = k % 2 ? Math.PI / 2 : 0; W.group.add(l); }
    W.group.add(mesh(new THREE.TorusGeometry(0.12, 0.04, 6, 12), iron, x + 0.35, 0.05, z + 0.75, false, false).rotateX(Math.PI / 2));
    W.anim.push((t) => { fig.head.rotation.x = 0.05 + Math.sin(t * 0.6 + i) * 0.04; fig.head.rotation.y = Math.sin(t * 0.3 + i * 2) * 0.12; });
    // su propia sombra, quieta, al pie de la pared
    const s = mesh(new THREE.CircleGeometry(0.45, 16), black, x, 1.2, C.z0 + 0.62, false, false); s.scale.set(1, 1.9, 1); W.group.add(s);
  }
  // ---------- luz ambiente de la caverna
  const amb = new THREE.PointLight(0xff8a40, 26, 30, 1.3); amb.position.set(cx, 3, -8); W.group.add(amb);
  // ---------- entrar, salir y cambiar el ambiente
  W.cave = { in: false };
  W.anim.push(() => {
    if (typeof player === 'undefined' || G.state !== 'play') return;
    const p = player.pos; const m = W.caveMouth;
    if (!W.cave.in && m && Math.hypot(p.x - m.x, p.z - m.z) < 1.1) caveEnter(W);
    else if (W.cave.in && p.z > C.z1 - 2.2 && p.y > 5) caveExit(W);
  });
}
function caveFog(W, inside) {
  const th = W.theme;
  if (inside) { scene.fog = new THREE.FogExp2(0x0c0806, 0.03); scene.background = new THREE.Color(0x050302); renderer.toneMappingExposure = 1.25; }
  else { scene.fog = new THREE.FogExp2(th.fog[0], th.fog[1]); scene.background = new THREE.Color(th.sky[1]); renderer.toneMappingExposure = th.exposure; }
  if (W.sky) W.sky.visible = !inside; if (W.horizon) W.horizon.visible = !inside; if (W.stars) W.stars.visible = !inside;
}
function caveTeleport(x, y, z, yaw) {
  const f = $('#flash'); if (f) { f.classList.remove('on'); void f.offsetWidth; f.classList.add('on'); }
  player.pos.set(x, y, z); player.vel.set(0, 0, 0); player.yaw = yaw; player.pitch = -0.12; player.floor = null; player.onGround = false; input.walk = null;
}
function caveEnter(W) {
  W.cave.in = true; caveFog(W, true); const [x, y, z] = CAVE.entry; caveTeleport(x, y + 0.05, z, 0); player.safe.set(x, y, z);
  Audio.portal && Audio.portal(); toast('Has entrado en la caverna de Platón. Baja por las terrazas hasta los prisioneros… y descubre qué ven.');
}
function caveExit(W) {
  W.cave.in = false; caveFog(W, false); const m = W.caveMouth; caveTeleport(m.back.x, 0, m.back.z, m.yaw); player.safe.set(m.back.x, 0, m.back.z);
  toast('Has salido de la caverna. Como el prisionero liberado, ahora ves la luz del sol.');
  if (typeof achieve === 'function' && (store.get('odisea-razon.lugares', []) || []).includes('cueva-prisioneros')) achieve('salida');
}
