// ============================================================================
//  LUGARES JUGABLES: experimentos mentales de la filosofía que se recorren.
//  Cada uno tiene una puerta junto a su pensador; dentro hay puntos con los que
//  interactuar (E) y tarjetas de decisión, y las elecciones van al cuaderno.
//    · La roca de Sísifo (Camus) · El anillo de Giges (Platón/Sócrates)
//    · El barco de Teseo (Atenas) · La habitación de Descartes
// ============================================================================
const XP_KEY = 'odisea-razon.experiencias';
const ZONES = [];
function xpRecord(id, who, eleccion) {
  const all = store.get(XP_KEY, {}) || {}; const e = all[id] || { who, el: [] };
  e.el = [...(e.el || []), eleccion].slice(-10); e.at = Date.now(); all[id] = e; store.set(XP_KEY, all);
}
// ---------- tarjeta de decisión
const XP = {
  open(eye, title, text, ops) {
    G.state = 'place'; unlockPointer(); input.keys = {}; input.walk = null; input.auto = false; $('#hud').hidden = true; $('#touch').hidden = true;
    $('#xp-eye').textContent = eye; $('#xp-title').textContent = title; $('#xp-text').textContent = text;
    const box = $('#xp-ops'); box.innerHTML = '';
    ops.forEach(([label, fn, cls], i) => { const b = document.createElement('button'); b.className = 'btn' + (cls ? ' ' + cls : i === 0 ? ' primary' : ''); b.textContent = label; b.addEventListener('click', () => { Audio.click(); this.close(); if (fn) fn(); }); box.appendChild(b); });
    $('#xp').hidden = false; if (!IS_TOUCH) setTimeout(() => { const b = box.querySelector('button'); if (b) b.focus({ preventScroll: true }); }, 40);
  },
  close() { $('#xp').hidden = true; if (G.state === 'place') { G.state = 'play'; $('#hud').hidden = false; if (IS_TOUCH) $('#touch').hidden = false; lockPointer(); } },
  note(id, name, q) { return ['📓 Escribir en mi cuaderno', () => Cuaderno.open({ id, name, short: name, q })]; },
};
// ---------- utilidades de construcción
function zoneLabel(W, title, sub, x, y, z, s = 1) { const l = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture(title, sub), transparent: true, depthWrite: false, toneMapped: false })); l.scale.set(2.8 * s, 0.7 * s, 1); l.position.set(x, y, z); W.group.add(l); return l; }
function zoneBase(W, Z, mat, x0 = Z.b.x0, x1 = Z.b.x1, z0 = Z.b.z0, z1 = Z.b.z1) {
  const f = addFloor(W, { kind: 'box', x: (x0 + x1) / 2, z: (z0 + z1) / 2, hw: (x1 - x0) / 2, hd: (z1 - z0) / 2, top: 0, th: 0.4, safePos: new THREE.Vector3(...Z.entry) });
  W.group.add(mesh(new THREE.BoxGeometry(x1 - x0, 0.4, z1 - z0), mat, f.x, -0.2, f.z, false, true)); return f;
}
function zoneWalls(W, Z, h, mat, visible = true) {
  const { x0, x1, z0, z1 } = Z.b; const g = new THREE.Group(); W.group.add(g);
  const add = (w, d, x, z) => { if (visible) g.add(mesh(new THREE.BoxGeometry(w, h, d), mat, x, h / 2, z, false, true)); W.colliders.push({ t: 0, x0: x - w / 2, x1: x + w / 2, z0: z - d / 2, z1: z + d / 2, h }); };
  add(1, z1 - z0 + 2, x0 - 0.5, (z0 + z1) / 2); add(1, z1 - z0 + 2, x1 + 0.5, (z0 + z1) / 2); add(x1 - x0 + 2, 1, (x0 + x1) / 2, z0 - 0.5); add(x1 - x0 + 2, 1, (x0 + x1) / 2, z1 + 0.5);
  return g;
}
function zoneFigure(W, look, x, z, yaw, idle = true) {
  const fig = buildFigure({ robe2: 0x3a3028, skin: 0xc49372, hair: 0x2a1a10, beard: false, hat: 'none', acc: 'none', ...look }, 0xffffff); fig.halo.visible = false;
  const g = new THREE.Group(); g.add(fig.group); g.position.set(x, 0, z); g.rotation.y = yaw; W.group.add(g); W.colliders.push({ t: 1, x, z, r: 0.5, h: 2 });
  if (idle) { const ph = Math.random() * 6; W.anim.push((t) => { fig.head.rotation.y = Math.sin(t * 0.5 + ph) * 0.3; fig.head.rotation.x = Math.sin(t * 0.7 + ph) * 0.05; }); }
  return g;
}
// desvanecer (o hacer aparecer) un grupo de objetos
function zoneFade(W, objs, out, dur = 0.9) {
  const list = (Array.isArray(objs) ? objs : [objs]).filter(Boolean); let t = 0;
  for (const o of list) { o.visible = true; o.userData.s0 = o.userData.s0 || o.scale.clone(); if (!out) o.scale.set(0.001, 0.001, 0.001); }
  if (typeof particles !== 'undefined') for (const o of list) { const p = new THREE.Vector3(); o.getWorldPosition(p); particles.emit(p.setY(p.y + 1), 26, { color: out ? 0xd8c8ff : 0xffe0a0, speed: 3, life: 1, size: 0.35, intensity: 2 }); }
  const fn = (_, dt) => { t += dt; const k = Math.min(1, t / dur); const e = out ? 1 - k : k;
    for (const o of list) { const s = o.userData.s0; o.scale.set(s.x * Math.max(0.001, e), s.y * Math.max(0.001, e), s.z * Math.max(0.001, e)); if (out && k >= 1) o.visible = false; }
    if (k >= 1) { const i = W.anim.indexOf(fn); if (i >= 0) W.anim.splice(i, 1); } };
  W.anim.push(fn);
}
function zoneAmbient(W, amb) {
  const th = W.theme;
  if (amb) { scene.fog = new THREE.FogExp2(amb.fog[0], amb.fog[1]); scene.background = new THREE.Color(amb.bg ?? amb.fog[0]); renderer.toneMappingExposure = amb.exp ?? th.exposure; }
  else { scene.fog = new THREE.FogExp2(th.fog[0], th.fog[1]); scene.background = new THREE.Color(th.sky[1]); renderer.toneMappingExposure = th.exposure; }
  const hide = !!(amb && amb.hideSky); if (W.sky) W.sky.visible = !hide; if (W.horizon) W.horizon.visible = !hide; if (W.stars) W.stars.visible = !hide; if (W.clouds) W.clouds.visible = !hide;
}
// ---------- puerta de entrada junto al pensador
function zoneMouth(W, Z, st) {
  const side = st.pos.x >= 0 ? 1 : -1;
  const free = (x, z) => Math.abs(x) < 21.5 && z > -45 && z < 34 && !W.colliders.some((o) => (o.r !== undefined ? Math.hypot(o.x - x, o.z - z) < o.r + 2 : x > o.x0 - 2 && x < o.x1 + 2 && z > o.z0 - 2 && z < o.z1 + 2)) && !(W._near && W._near(x, z, 0.8)) && !(POIS[W.idx] || []).some((p) => !p.y && Math.hypot(p.at[0] - x, p.at[1] - z) < 2.6);
  const cand = [[side * 4.6, 2.6], [side * 4.6, -2.6], [0, 5], [side * 6, 0], [-side * 4.6, 2.6], [-side * 4.6, -2.6], [0, -5], [side * 7, 4]];
  const pick = cand.find(([dx, dz]) => free(st.pos.x + dx, st.pos.z + dz)) || cand[0];
  const mx = st.pos.x + pick[0], mz = st.pos.z + pick[1];
  const g = new THREE.Group(); g.position.set(mx, 0, mz); const stone = std(Z.stone || 0xb8ac98, { roughness: 0.9 });
  for (const s of [-1, 1]) g.add(mesh(new THREE.BoxGeometry(0.5, 3.4, 0.5), stone, s * 1.25, 1.7, 0));
  g.add(mesh(new THREE.BoxGeometry(3.2, 0.5, 0.6), stone, 0, 3.6, 0));
  const pm = new THREE.MeshBasicMaterial({ color: new THREE.Color(Z.color).multiplyScalar(1.6), transparent: true, opacity: 0.75, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
  const portal = mesh(new THREE.PlaneGeometry(2, 3.1), pm, 0, 1.6, 0, false, false); g.add(portal);
  const ring = mesh(new THREE.RingGeometry(0.85, 1.05, 40), glow(Z.color, 2.2, { transparent: true, opacity: 0.8, side: THREE.DoubleSide }), 0, 0.04, 1.1, false, false); ring.rotation.x = -Math.PI / 2; g.add(ring);
  const l = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture(Z.title, Z.sub), transparent: true, depthWrite: false, toneMapped: false })); l.scale.set(2.8, 0.7, 1); l.position.y = 4.5; g.add(l);
  g.lookAt(0, 0, mz + 10); W.group.add(g);
  W.anim.push((t) => { pm.opacity = 0.55 + Math.sin(t * 2.2) * 0.2; });
  const ry = g.rotation.y; for (const s of [-1, 1]) W.colliders.push({ t: 1, x: mx + Math.cos(ry) * 1.25 * s, z: mz - Math.sin(ry) * 1.25 * s, r: 0.45, h: 3.4 });
  Z.mouth = { x: mx + Math.sin(ry) * 0.5, z: mz + Math.cos(ry) * 0.5, back: { x: mx + Math.sin(ry) * 2.4, z: mz + Math.cos(ry) * 2.4 }, yaw: ry + Math.PI };
}
function zoneTeleport(x, y, z, yaw) {
  const f = $('#flash'); if (f) { f.classList.remove('on'); void f.offsetWidth; f.classList.add('on'); }
  player.pos.set(x, y, z); player.vel.set(0, 0, 0); player.yaw = yaw; player.pitch = -0.05; player.floor = null; player.onGround = false; input.walk = null; input.auto = false;
}
function zoneEnter(W, Z) {
  W.zoneIn = Z; zoneAmbient(W, Z.amb); const [x, y, z] = Z.entry; zoneTeleport(x, y + 0.05, z, Z.yaw || 0); player.safe.set(x, y, z);
  if (Audio.portal) Audio.portal(); if (Z.onEnter) Z.onEnter(W, Z); toast(Z.enterMsg);
}
function zoneExit(W, Z) {
  if (Z.onExit) Z.onExit(W, Z);
  W.zoneIn = null; zoneAmbient(W, null); const m = Z.mouth; zoneTeleport(m.back.x, 0, m.back.z, m.yaw); player.safe.set(m.back.x, 0, m.back.z);
}
function buildZones(W) {
  W.spots = W.spots || [];
  for (const Z of ZONES) {
    if (Z.era !== W.idx) continue; const st = W.stations.find((s) => s.data.id === Z.near); if (!st) continue;
    Z.s = {}; zoneMouth(W, Z, st); Z.build(W, Z);
    W.spots.push({ x: Z.exit[0], z: Z.exit[1], r: 2, verb: 'Salir', label: Z.exitLabel, on: () => W.zoneIn === Z, act: () => zoneExit(W, Z) });
    { const ex = mesh(new THREE.PlaneGeometry(1.8, 2.8), new THREE.MeshBasicMaterial({ color: new THREE.Color(Z.color).multiplyScalar(1.4), transparent: true, opacity: 0.6, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }), Z.exit[0], 1.5, Z.exit[1], false, false); ex.lookAt(Z.entry[0], 1.5, Z.entry[2]); W.group.add(ex); zoneLabel(W, 'Salida', Z.exitLabel, Z.exit[0], 3.4, Z.exit[1], 0.8); }
  }
  W.anim.push(() => {
    if (typeof player === 'undefined' || G.state !== 'play' || W.zoneIn || (W.cave && W.cave.in)) return;
    for (const Z of ZONES) if (Z.era === W.idx && Z.mouth && Math.hypot(player.pos.x - Z.mouth.x, player.pos.z - Z.mouth.z) < 1.1) { zoneEnter(W, Z); break; }
  });
}

// ============================================================================
//  1 · LA ROCA DE SÍSIFO (Camus, época contemporánea)
// ============================================================================
ZONES.push({
  id: 'sisifo', era: 7, near: 'camus', title: 'La roca de Sísifo', sub: 'Empuja la roca hasta la cima', color: 0xffa860, stone: 0x8a7a6a,
  b: { x0: 150, x1: 170, z0: -32, z1: 26 }, entry: [160, 0, 22], yaw: 0, exit: [153, 23], exitLabel: 'Volver con Camus',
  amb: { fog: [0x6a5a6a, 0.03], bg: 0x8a7080, exp: 1.15, hideSky: true },
  enterMsg: 'Estás al pie de la montaña de Sísifo. Acércate a la roca y camina hacia delante para empujarla hasta la cima.',
  build(W, Z) {
    const rockM = std(0x8a7a68, { roughness: 1, flat: true }); const cliff = std(0x6a5a4a, { roughness: 1, flat: true });
    zoneBase(W, Z, rockM, Z.b.x0, Z.b.x1, 12, Z.b.z1);
    const hz = (z) => (z >= 12 ? 0 : z <= -22 ? 8 : (8 * (12 - z)) / 34);
    const sp = new THREE.Vector3(...Z.entry);
    for (let i = 0; i < 34; i++) { const top = (8 * (i + 1)) / 34; const z0 = 11 - i, z1 = 12 - i;
      addFloor(W, { kind: 'box', x: 160, z: (z0 + z1) / 2, hw: 10, hd: 0.5, top, th: top, safePos: sp });
      W.group.add(mesh(new THREE.BoxGeometry(20, top, 1), rockM, 160, top / 2, (z0 + z1) / 2, false, true)); }
    addFloor(W, { kind: 'box', x: 160, z: -27, hw: 10, hd: 5, top: 8, th: 8, safePos: sp }); W.group.add(mesh(new THREE.BoxGeometry(20, 8, 10), rockM, 160, 4, -27, false, true));
    zoneWalls(W, Z, 1, cliff, false);
    // acantilados y rocas sueltas
    const r = mulberry32(31);
    for (const s of [-1, 1]) for (let z = -32; z < 27; z += 3) { const b = mesh(new THREE.DodecahedronGeometry(2.5 + r() * 2.5, 0), cliff, 160 + s * (11.5 + r() * 2), 3 + r() * 8 + hz(z), z, false, false); b.rotation.set(r() * 3, r() * 3, r() * 3); W.group.add(b); }
    for (let k = 0; k < 6; k++) { const b = mesh(new THREE.ConeGeometry(6 + r() * 4, 18 + r() * 10, 6), cliff, 140 + k * 8, 14, -44 - r() * 6, false, false); W.group.add(b); }
    zoneLabel(W, 'La cima', 'Aquí la roca siempre vuelve a caer', 160, 11.5, -24);
    // la roca
    const B = { x: 160, z: 9, v: 0, st: 'idle', rot: 0 }; Z.s.B = B; Z.s.n = 0;
    const rock = mesh(new THREE.DodecahedronGeometry(1.3, 1), std(0x7a7470, { roughness: 1, flat: true }), 160, 1.3, 9); W.group.add(rock);
    const col = { t: 1, x: 160, z: 9, r: 1.25, h: 3 }; W.colliders.push(col);
    const after = () => {
      const n = ++Z.s.n;
      if (n === 1) XP.open('La roca de Sísifo', 'La roca vuelve a caer', 'Los dioses condenaron a Sísifo a subir sin descanso una roca hasta la cima de una montaña, desde donde la piedra volvía a caer por su propio peso. Pensaron que no hay castigo más terrible que el trabajo inútil y sin esperanza.', [['Bajar y volver a empezar', null]]);
      else if (n === 2) XP.open('La roca de Sísifo', 'La hora de la conciencia', 'Camus se fija en el momento en que Sísifo baja la montaña para buscar su roca. Esa hora, como un respiro, es la hora de la conciencia: sabe lo que le espera, y aun así vuelve. En ese saber, dice Camus, está su grandeza.', [['Bajar y volver a empezar', null]]);
      else if (n === 3) {
        const reply = (k, title, text) => () => { xpRecord('sisifo', 'La roca de Sísifo', k); achieve('sisifo'); XP.open('Albert Camus', title, text, [XP.note('xp-sisifo', 'La roca de Sísifo', '¿Qué «roca» empujas tú cada día? ¿Puedes encontrarle sentido? ¿Por qué?'), ['Seguir', null]]); };
        XP.open('La roca de Sísifo', '¿Puede Sísifo ser feliz?', 'Has empujado la roca tres veces, y tres veces ha caído. Camus dice que vivimos en un mundo que no nos da un sentido hecho: eso es lo absurdo. ¿Qué piensas tú de Sísifo?', [
          ['No: un trabajo sin sentido es pura desdicha', reply('No: un trabajo sin sentido es pura desdicha', 'Es lo que pensaban los dioses', 'Camus responde que el sentido no está fuera, en la cima, sino en cómo Sísifo vive su esfuerzo. Piensa en tus propias tareas repetidas: estudiar, entrenar, cuidar a alguien. ¿Son inútiles porque se repiten?')],
          ['Sí, si acepta su destino y lo hace suyo', reply('Sí, si acepta su destino y lo hace suyo', 'Esa es la respuesta de Camus', '«La lucha por llegar a las cimas basta para llenar un corazón humano. Hay que imaginar a Sísifo feliz.» Su roca es su asunto: al aceptarla con lucidez, deja de ser un castigo de los dioses.')],
          ['Solo si se rebela, aunque no pueda escapar', reply('Solo si se rebela, aunque no pueda escapar', 'La rebelión lúcida', 'También es de Camus: rebelarse no es huir del absurdo, sino seguir viviendo con los ojos abiertos, sin resignarse ni engañarse. Sísifo es superior a su destino porque lo mira de frente.')],
        ]);
      } else toast('La roca vuelve a caer. Y Sísifo vuelve a bajar, lúcido.');
    };
    W.anim.push((t, dt) => {
      if (W.zoneIn !== Z || !dt) return; const p = player.pos;
      if (B.st === 'idle') {
        const dx = p.x - B.x, dz = p.z - B.z;
        if (dz > 0.6 && dz < 2.7 && Math.abs(dx) < 1.8 && player.vel.z < -0.5 && G.state === 'play') { const nz = Math.max(-21.6, p.z - 1.85); B.rot += (B.z - nz) / 1.3; B.z = nz; B.x += (p.x - B.x) * Math.min(1, dt * 3); }
        if (B.z <= -21.5) { B.st = 'roll'; B.v = 0; toast('¡La cima!… pero la roca se te escapa de las manos y rueda montaña abajo.'); player.shake = 0.4; }
      } else if (B.st === 'roll') {
        B.v = Math.min(13, B.v + 9 * dt); B.z += B.v * dt; B.rot -= (B.v * dt) / 1.3;
        if (Math.hypot(p.x - B.x, p.z - B.z) < 1.9) { p.x = B.x + (p.x >= B.x ? 1 : -1) * 2; player.shake = 0.5; }
        if (B.z >= 9) { B.z = 9; B.st = 'idle'; B.v = 0; player.shake = 0.3; after(); }
      }
      const bounce = B.st === 'roll' ? Math.abs(Math.sin(B.z * 1.3)) * 0.5 : 0;
      rock.position.set(B.x, hz(B.z) + 1.3 + bounce, B.z); rock.rotation.x = B.rot; col.x = B.x; col.z = B.z;
    });
  },
  onEnter(W, Z) { const B = Z.s.B; B.st = 'idle'; B.z = 9; B.x = 160; },
});

// ============================================================================
//  2 · EL ANILLO DE GIGES (Atenas, junto a Sócrates)
// ============================================================================
ZONES.push({
  id: 'giges', era: 1, near: 'socrates', title: 'El anillo de Giges', sub: '¿Serías justo si nadie te viera?', color: 0xffd060,
  b: { x0: -102, x1: -78, z0: -24, z1: 22 }, entry: [-90, 0, 18], yaw: 0, exit: [-84, 20], exitLabel: 'Volver al ágora',
  enterMsg: 'Llegas a un mercado de Lidia. Delante, junto a una grieta, brilla algo sobre un caballo de bronce.',
  build(W, Z) {
    const stoneM = std(0xd8ccb4, { roughness: 0.9 }); const tiles = texTiles('giges', 0xc8b89a, 0x8a7a60, 8, 0.15); tiles.repeat.set(6, 12);
    zoneBase(W, Z, std(0xffffff, { map: tiles, roughness: 0.95 })); zoneWalls(W, Z, 5, std(0xe8dcc4, { roughness: 0.9 }));
    const r = mulberry32(55); const s = Z.s;
    // puestos del mercado con toldos, mercancías y mercaderes
    const awn = [0xc84a3a, 0x3a6aa8, 0x4a8a4a, 0xd8a03a];
    [[-97, -10], [-97, 2], [-83, -10], [-83, 0]].forEach(([x, z], i) => {
      W.group.add(mesh(new THREE.BoxGeometry(3, 1, 2), std(0x7a5a3a), x, 0.5, z)); W.colliders.push({ t: 0, x0: x - 1.5, x1: x + 1.5, z0: z - 1, z1: z + 1, h: 1 });
      const a = mesh(new THREE.BoxGeometry(3.4, 0.12, 2.6), std(awn[i]), x, 2.6, z, false, false); a.rotation.x = 0.12; W.group.add(a);
      for (const ox of [-1.5, 1.5]) W.group.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.6, 6), std(0x5a3a22), x + ox, 1.3, z - 1, false, false));
      for (let k = 0; k < 7; k++) W.group.add(mesh(new THREE.SphereGeometry(0.16, 8, 6), std([0xd84a2a, 0xe8b830, 0x7ab84a, 0x8a3a8a][(i + k) % 4]), x - 1.1 + (k % 4) * 0.7, 1.15, z - 0.4 + Math.floor(k / 4) * 0.5, false, false));
      zoneFigure(W, { robe: awn[(i + 1) % 4], beard: i % 2 ? 0x2a1a10 : false }, x + (x < -90 ? -2.3 : 2.3), z, x < -90 ? Math.PI / 2 : -Math.PI / 2);
    });
    // la bolsa del mercader
    const bag = new THREE.Group(); bag.position.set(-83, 1.05, 0.3); bag.add(mesh(new THREE.SphereGeometry(0.28, 12, 10), std(0x8a5a2a), 0, 0.2, 0, false, false));
    for (let k = 0; k < 6; k++) bag.add(mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.03, 12), std(0xe8c050, { metalness: 0.9, roughness: 0.3 }), 0.4 + (k % 3) * 0.12, 0.02 + Math.floor(k / 3) * 0.04, (k % 2) * 0.1, false, false));
    W.group.add(bag); s.bag = bag;
    // el caballo de bronce sobre la grieta, con el anillo
    const bronze = std(0x8a6a3a, { metalness: 0.7, roughness: 0.4 });
    const chasm = mesh(new THREE.CircleGeometry(2.4, 24), new THREE.MeshBasicMaterial({ color: 0x0a0604 }), -90, 0.02, 10, false, false); chasm.rotation.x = -Math.PI / 2; W.group.add(chasm);
    const horse = new THREE.Group(); horse.position.set(-90, 0, 10);
    horse.add(mesh(new THREE.BoxGeometry(2.4, 1, 0.9), bronze, 0, 1.6, 0)); horse.add(mesh(new THREE.BoxGeometry(0.5, 1.2, 0.6), bronze, 1.25, 2.3, 0)); horse.add(mesh(new THREE.BoxGeometry(0.9, 0.45, 0.5), bronze, 1.6, 2.85, 0));
    for (const [lx, lz] of [[-0.9, -0.3], [-0.9, 0.3], [0.9, -0.3], [0.9, 0.3]]) horse.add(mesh(new THREE.BoxGeometry(0.22, 1.2, 0.22), bronze, lx, 0.6, lz));
    W.group.add(horse); W.colliders.push({ t: 1, x: -90, z: 10, r: 1.5, h: 3 });
    const ped = mesh(new THREE.CylinderGeometry(0.35, 0.45, 1.1, 10), stoneM, -90, 0.55, 7.8); W.group.add(ped);
    const ring = mesh(new THREE.TorusGeometry(0.16, 0.045, 10, 24), glow(0xffd060, 3), -90, 1.35, 7.8, false, false); W.group.add(ring); s.ring = ring;
    W.anim.push((t) => { ring.rotation.y = t * 1.5; ring.position.y = 1.35 + Math.sin(t * 2) * 0.05; });
    // palacio del rey al fondo y fuente junto a la entrada
    for (let k = 0; k < 6; k++) W.group.add(mesh(new THREE.CylinderGeometry(0.4, 0.45, 6, 12), stoneM, -97.5 + k * 3, 3, -22.5, true, false));
    W.group.add(mesh(new THREE.BoxGeometry(18, 0.8, 1.5), stoneM, -90, 6.4, -22.5, false, false)); const ped2 = mesh(new THREE.ConeGeometry(10, 2, 4, 1), stoneM, -90, 7.8, -22.5, false, false); ped2.scale.z = 0.12; ped2.rotation.y = Math.PI / 4; W.group.add(ped2);
    W.group.add(mesh(new THREE.BoxGeometry(2.6, 4, 0.2), std(0x6a3a1a), -90, 2, -23.3, false, false));
    zoneLabel(W, 'El palacio del rey', 'Con el anillo, Giges entró aquí', -90, 9.3, -22);
    W.group.add(mesh(new THREE.CylinderGeometry(1.4, 1.6, 0.8, 18), stoneM, -97, 0.4, 14)); W.colliders.push({ t: 1, x: -97, z: 14, r: 1.5, h: 1 });
    W.group.add(mesh(new THREE.CylinderGeometry(1.25, 1.25, 0.1, 18), new THREE.MeshStandardMaterial({ color: 0x4a8ab0, roughness: 0.05, metalness: 0.3 }), -97, 0.78, 14, false, false));
    // puntos de interacción
    const inv = (on) => {
      s.inv = on; const g = grade.uniforms;
      if (on) { s.prev = { sat: g.sat.value, gain: g.gain.value.clone() }; g.sat.value = 0.3; g.gain.value.multiply(new THREE.Color(0.85, 0.95, 1.2)); }
      else if (s.prev) { g.sat.value = s.prev.sat; g.gain.value.copy(s.prev.gain); s.prev = null; }
    };
    s.invFn = inv;
    W.spots.push({ x: -90, z: 7.8, r: 1.9, verb: 'Tomar', label: 'El anillo de oro', on: () => W.zoneIn === Z && !s.has, act: () => XP.open('El anillo de Giges', 'Un anillo que hace invisible', 'Platón cuenta en La República que el pastor Giges, tras un terremoto, bajó a una grieta y encontró un caballo de bronce hueco. Dentro yacía un gigante muerto con un anillo de oro. Giges se lo puso, y descubrió que al girar la piedra hacia dentro nadie podía verlo.', [['Ponerme el anillo y girarlo', () => { s.has = true; ring.visible = false; inv(true); toast('Has girado el anillo: ahora nadie puede verte. Recorre el mercado…'); }], ['Dejarlo donde está', null]]) });
    const coinReply = (k, title, text) => () => { xpRecord('giges', 'El anillo de Giges', 'La bolsa: ' + k); if (k.startsWith('Tomar')) bag.visible = false; XP.open('El anillo de Giges', title, text, [['Seguir', null]]); };
    W.spots.push({ x: -81.2, z: 0.3, r: 1.9, verb: 'Mirar', label: 'La bolsa del mercader', on: () => W.zoneIn === Z && s.inv && !s.coins, act: () => { s.coins = true; XP.open('Nadie te ve', 'La bolsa del mercader', 'El mercader se ha distraído hablando con un cliente. Su bolsa de monedas está a tu alcance. Nadie te ve, y nadie podría acusarte nunca.', [
      ['Tomarla: nadie lo sabrá', coinReply('Tomarla: nadie lo sabrá', 'Glaucón tendría razón', 'Glaucón, el hermano de Platón, dice que con un anillo así nadie seguiría siendo justo: todos tomarían lo ajeno, porque solo somos justos por miedo a ser descubiertos. Sócrates responde que el injusto, aunque nadie lo vea, desordena su propia alma y se vuelve esclavo de sus deseos.')],
      ['Dejarla: no es mía, aunque nadie me vea', coinReply('Dejarla: no es mía, aunque nadie me vea', 'Sócrates estaría contigo', 'Para Sócrates, la justicia no es una máscara para quedar bien ante los demás, sino la salud del alma. Quien es justo solo por miedo al castigo, en realidad no es justo.')],
      ['Avisar al mercader para que la guarde', coinReply('Avisar al mercader para que la guarde', 'Más allá de no robar', 'No solo no robas: proteges al otro. Para Sócrates, el justo busca el bien común. Pero… ¿cómo avisas si eres invisible? Quizá tendrás que quitarte el anillo y dar la cara.')],
    ]); } });
    const palReply = (k, text) => () => { xpRecord('giges', 'El anillo de Giges', 'El palacio: ' + k); XP.open('El anillo de Giges', 'El poder sin control', text, [['Seguir', null]]); };
    W.spots.push({ x: -90, z: -21, r: 2.2, verb: 'Entrar', label: 'Las puertas del palacio', on: () => W.zoneIn === Z && s.inv && !s.palace, act: () => { s.palace = true; XP.open('Nadie te ve', 'El palacio del rey', 'Con el anillo, Giges entró en el palacio, sedujo a la reina, mató al rey y se quedó con el reino. Tú estás ante la misma puerta. Con este poder podrías gobernar sin que nadie te controle.', [
      ['Usarlo para gobernar: lo haría mejor que el rey', palReply('Gobernar con el anillo', 'Platón desconfiaba del poder sin control: por eso el filósofo que gobierna debía educarse durante décadas y obedecer las leyes. Si nadie puede verte ni pedirte cuentas, ¿quién te vigila a ti?')],
      ['Solo para descubrir injusticias y denunciarlas', palReply('Espiar para denunciar injusticias', 'Un fin noble… pero espiar a otros sin que lo sepan, ¿es justo aunque tu intención sea buena? Es la vieja pregunta de si el fin justifica los medios.')],
      ['No entrar: un poder sin control corrompe', palReply('No entrar', 'Es la intuición de muchos pensadores, de Platón a Lord Acton: «el poder tiende a corromper, y el poder absoluto corrompe absolutamente».')],
    ]); } });
    W.spots.push({ x: -95, z: 14, r: 2.2, verb: 'Quitarme el anillo', label: 'La fuente', on: () => W.zoneIn === Z && s.inv, act: () => { inv(false); achieve('giges'); XP.open('El anillo de Giges', 'Vuelves a ser visible', 'Glaucón desafió a Sócrates: «demuéstrame que la justicia vale por sí misma, y no solo por la buena fama». Toda La República es la respuesta a ese desafío. Ahora te toca a ti responder.', [XP.note('xp-giges', 'El anillo de Giges', '¿Serías justo si nadie pudiera verte nunca? ¿Por qué?'), ['Volver a ponérmelo', () => inv(true)], ['Seguir', null]]); } });
  },
  onEnter(W, Z) { const s = Z.s; s.has = false; s.coins = false; s.palace = false; s.ring.visible = true; s.bag.visible = true; },
  onExit(W, Z) { if (Z.s.inv) Z.s.invFn(false); },
});

// ============================================================================
//  3 · EL BARCO DE TESEO (Atenas, junto a Aristóteles)
// ============================================================================
ZONES.push({
  id: 'teseo', era: 1, near: 'aristoteles', title: 'El barco de Teseo', sub: '¿Sigue siendo el mismo barco?', color: 0x60c8ff,
  b: { x0: 136, x1: 152, z0: -20, z1: 20 }, entry: [143, 0, 16], yaw: 0, exit: [138.5, 17], exitLabel: 'Volver al ágora',
  enterMsg: 'Estás en el puerto de Atenas. Ahí está el barco en que Teseo volvió de Creta. Acércate y cambia sus tablas viejas.',
  build(W, Z) {
    const s = Z.s; const r = mulberry32(77);
    const deck = texTiles('teseo', 0x9a7a52, 0x5a4428, 3, 0.25); deck.repeat.set(4, 10);
    zoneBase(W, Z, std(0xffffff, { map: deck, roughness: 0.9 })); zoneWalls(W, Z, 1.2, std(0x6a4a2a), false);
    const water = mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshStandardMaterial({ color: 0x2a6a8a, roughness: 0.15, metalness: 0.3 }), 175, -0.35, 0, false, true); water.rotation.x = -Math.PI / 2; W.group.add(water);
    for (let z = -19; z <= 19; z += 4) W.group.add(mesh(new THREE.CylinderGeometry(0.22, 0.25, 1.2, 8), std(0x4a3a2a), 152, 0.3, z));
    // el barco de Teseo, junto al muelle: 12 tablas a la vista
    const oldM = std(0x5a4430, { roughness: 0.95 }), newM = std(0xdab57a, { roughness: 0.7 }), hullM = std(0x3a2a1a, { roughness: 0.9 });
    const ship = new THREE.Group(); ship.position.set(157, 0, 0); W.group.add(ship);
    ship.add(mesh(new THREE.BoxGeometry(4, 2.4, 13), hullM, 0.6, 0.6, 0, false, false));
    for (const sz of [-1, 1]) { const bow = mesh(new THREE.ConeGeometry(2.1, 3.5, 4), hullM, 0.6, 0.8, sz * 8.2, false, false); bow.rotation.x = sz * Math.PI / 2; bow.rotation.y = Math.PI / 4; bow.scale.set(1, 1, 0.6); ship.add(bow); }
    ship.add(mesh(new THREE.CylinderGeometry(0.18, 0.22, 10, 8), hullM, 0.6, 6, 0, false, false));
    const sail = mesh(new THREE.PlaneGeometry(7, 5), new THREE.MeshStandardMaterial({ color: 0xf0e8d8, roughness: 0.9, side: THREE.DoubleSide }), 0.6, 7, 0, false, false); sail.rotation.y = Math.PI / 2; ship.add(sail);
    const planks = []; for (let row = 0; row < 3; row++) for (let c = 0; c < 4; c++) { const p = mesh(new THREE.BoxGeometry(0.22, 0.62, 3.1), oldM, -1.5, 0 + row * 0.68, -4.8 + c * 3.2, false, false); ship.add(p); planks.push(p); }
    W.anim.push((t) => { ship.position.y = Math.sin(t * 0.8) * 0.06; ship.rotation.z = Math.sin(t * 0.6) * 0.012; });
    zoneLabel(W, 'El barco de Teseo', 'Conservado por los atenienses durante siglos', 157, 11, 0);
    W.colliders.push({ t: 0, x0: 152.2, x1: 160, z0: -20, z1: 20, h: 3 });
    // el segundo barco que arma el carpintero con las tablas viejas
    const ship2 = new THREE.Group(); ship2.position.set(142, 0, -11); ship2.rotation.y = Math.PI / 2; W.group.add(ship2);
    ship2.add(mesh(new THREE.BoxGeometry(0.4, 0.4, 12), hullM, 0, 0.2, 0, false, false));
    for (let k = -5; k <= 5; k += 2.5) { const rib = mesh(new THREE.TorusGeometry(1.5, 0.08, 6, 12, Math.PI), hullM, 0, 1.6, k, false, false); rib.rotation.z = Math.PI; ship2.add(rib); }
    const planks2 = []; for (let row = 0; row < 3; row++) for (let c = 0; c < 4; c++) { const p = mesh(new THREE.BoxGeometry(0.22, 0.62, 3.1), oldM, 1.55, 0.5 + row * 0.68, -4.8 + c * 3.2, false, false); p.visible = false; ship2.add(p); planks2.push(p); }
    const mast2 = mesh(new THREE.CylinderGeometry(0.15, 0.18, 8, 8), hullM, 0, 4.5, 0, false, false); mast2.visible = false; ship2.add(mast2);
    W.colliders.push({ t: 0, x0: 139, x1: 145, z0: -17.5, z1: -4.5, h: 3 });
    zoneFigure(W, { robe: 0x8a6a4a, beard: 0x5a4a3a, acc: 'staff' }, 146.5, -7, -Math.PI / 2);
    zoneLabel(W, 'El carpintero', 'Guarda las tablas viejas', 146.5, 2.8, -7, 0.8);
    s.n = 0; s.planks = planks; s.planks2 = planks2; s.mast2 = mast2; s.oldM = oldM; s.newM = newM;
    const ask = (title, text, ops) => XP.open('El barco de Teseo', title, text, ops);
    const rec = (k) => xpRecord('teseo', 'El barco de Teseo', k);
    const finalQ = () => {
      const fin = (k, title, text) => () => { rec('¿Cuál es el verdadero? ' + k); achieve('teseo'); ask(title, text, [XP.note('xp-teseo', 'El barco de Teseo', 'Tus células se renuevan y tus ideas cambian con los años. ¿Eres la misma persona que eras de niño? ¿Qué te hace ser tú?'), ['Seguir', null]]); };
      ask('¿Cuál es el verdadero barco de Teseo?', 'Los atenienses conservaron durante siglos el barco en que Teseo volvió de Creta, cambiando cada tabla podrida por una nueva. Plutarco cuenta que los filósofos discutían si seguía siendo el mismo barco. Siglos después, Hobbes añadió: ¿y si alguien armara otro barco con las tablas viejas? Ahora tienes los dos delante.', [
        ['El de tablas nuevas: importa la forma y la historia continua', fin('El de tablas nuevas', 'La forma y la continuidad', 'Es una respuesta cercana a Aristóteles: una cosa es lo que es por su forma y su función, no solo por su materia. Como tu cuerpo, que renueva sus células y sigue siendo tuyo.')],
        ['El de tablas viejas: es la materia que tocó Teseo', fin('El de tablas viejas', 'La materia original', 'Es lo que querría un museo: los mismos materiales del héroe. Pero entonces, al cambiar una sola tabla, ¿el barco ya dejó de ser el mismo?')],
        ['Los dos o ninguno: depende de lo que llamemos «el mismo»', fin('Los dos, o ninguno', 'La identidad como decisión', 'Para muchos filósofos, la identidad depende en parte de para qué preguntamos: para la historia, para la ley, para el recuerdo. Heráclito diría que todo fluye y nada permanece igual.')],
      ]);
    };
    W.spots.push({ x: 151, z: 0, r: 2.6, verb: 'Cambiar una tabla', get label() { return `El barco de Teseo · ${s.n}/12 tablas nuevas`; }, on: () => W.zoneIn === Z && s.n < 12, act: () => {
      const i = s.n++; const p = planks[i]; p.material = newM; Audio.pickup && Audio.pickup(); planks2[i].visible = true; zoneFade(W, planks2[i], false, 0.6);
      { const v = new THREE.Vector3(); p.getWorldPosition(v); particles.emit(v, 18, { color: 0xdab57a, speed: 3, life: 0.8, size: 0.3, intensity: 1.5 }); }
      if (s.n === 1) ask('Una tabla nueva', '¿Sigue siendo el barco de Teseo?', [['Sí, claro: solo cambié una tabla', () => rec('Con 1 tabla nueva: sí')], ['No: ya no es exactamente el mismo', () => { rec('Con 1 tabla nueva: no'); toast('Interesante: ¿una sola tabla basta para cambiar la identidad de algo? ¿Y si te cortas el pelo?'); }]]);
      else if (s.n === 6) ask('La mitad de las tablas', '¿Y ahora, con la mitad de las tablas nuevas?', [['Sigue siendo el mismo barco', () => rec('Con 6 tablas nuevas: el mismo')], ['Ya es medio barco nuevo', () => rec('Con 6 tablas nuevas: medio nuevo')], ['No sé dónde está el límite', () => { rec('Con 6 tablas nuevas: no sé el límite'); toast('Ese es el problema: no hay un número exacto de tablas en que deje de ser el mismo. Es como la paradoja del montón de arena.'); }]]);
      else if (s.n === 12) { mast2.visible = true; zoneFade(W, mast2, false, 1); ask('Todas las tablas son nuevas: el carpintero te llama', '«Mientras tú cambiabas las tablas, yo las fui guardando y restaurando. Mira: con todas las tablas viejas he armado otro barco. Ahora hay dos.»', [['Mirar los dos barcos', finalQ]]); }
    } });
  },
  onEnter(W, Z) { const s = Z.s; s.n = 0; s.planks.forEach((p) => (p.material = s.oldM)); s.planks2.forEach((p) => (p.visible = false)); s.mast2.visible = false; },
});

// ============================================================================
//  4 · LA HABITACIÓN DE DESCARTES (Modernidad)
// ============================================================================
ZONES.push({
  id: 'descartes', era: 5, near: 'descartes', title: 'La habitación de Descartes', sub: '¿De qué puedes estar seguro?', color: 0xb090ff,
  b: { x0: 82, x1: 98, z0: -14, z1: 14 }, entry: [90, 0, 11], yaw: 0, exit: [84.5, 12.6], exitLabel: 'Volver a la Modernidad',
  amb: { fog: [0x0c0a08, 0.035], bg: 0x050403, exp: 1.25, hideSky: true },
  enterMsg: 'Es la habitación caldeada donde Descartes decidió dudar de todo. Busca el cuenco con el palo en el agua.',
  build(W, Z) {
    const s = Z.s; const wood = std(0x6a4a2e, { roughness: 0.8 }); const panel = std(0x8a6a4a, { roughness: 0.85 }); const floorT = texTiles('desc', 0x7a5a3a, 0x4a3420, 6, 0.2); floorT.repeat.set(4, 7);
    zoneBase(W, Z, std(0xffffff, { map: floorT, roughness: 0.9 }));
    const room = zoneWalls(W, Z, 5, panel); room.add(mesh(new THREE.BoxGeometry(18, 0.4, 30), wood, 90, 5.2, 0, false, false));
    const roomMats = []; room.traverse((o) => { if (o.isMesh) { o.material = o.material.clone(); roomMats.push(o.material); } });
    const g1 = new THREE.Group(), g2 = new THREE.Group(); W.group.add(g1, g2);
    // los sentidos: ventana pintada, librería, globo y flores
    { const c = document.createElement('canvas'); c.width = 128; c.height = 96; const x = c.getContext('2d'); const gr = x.createLinearGradient(0, 0, 0, 96); gr.addColorStop(0, '#8ab8e8'); gr.addColorStop(0.6, '#e8d8b0'); gr.addColorStop(0.61, '#6a8a4a'); gr.addColorStop(1, '#4a6a3a'); x.fillStyle = gr; x.fillRect(0, 0, 128, 96);
      const win = mesh(new THREE.PlaneGeometry(3, 2.2), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c) }), 82.05, 2.6, -2, false, false); win.rotation.y = Math.PI / 2; g1.add(win);
      const fr = mesh(new THREE.BoxGeometry(0.15, 2.5, 3.3), wood, 82.1, 2.6, -2, false, false); g1.add(fr); }
    { const sh = new THREE.Group(); sh.position.set(97.4, 0, 2); sh.add(mesh(new THREE.BoxGeometry(0.8, 3.6, 3), wood, 0, 1.8, 0)); for (let row = 0; row < 4; row++) for (let k = 0; k < 9; k++) sh.add(mesh(new THREE.BoxGeometry(0.5, 0.55 + (k % 3) * 0.08, 0.22), std([0x8a2a2a, 0x2a4a6a, 0x3a5a2a, 0x6a4a2a][(row + k) % 4]), -0.15, 0.45 + row * 0.85, -1.2 + k * 0.28, false, false)); g1.add(sh); }
    { const gl = new THREE.Group(); gl.position.set(85, 0, -9); gl.add(mesh(new THREE.CylinderGeometry(0.08, 0.3, 1.1, 8), wood, 0, 0.55, 0)); gl.add(mesh(new THREE.SphereGeometry(0.45, 16, 12), std(0x4a7ab0), 0, 1.5, 0)); g1.add(gl); }
    // el sueño: cama, silla y alfombra
    { const bed = new THREE.Group(); bed.position.set(85, 0, 6); bed.add(mesh(new THREE.BoxGeometry(2, 0.6, 3.4), wood, 0, 0.3, 0)); bed.add(mesh(new THREE.BoxGeometry(1.9, 0.3, 3.2), std(0xe8e0d0), 0, 0.75, 0)); bed.add(mesh(new THREE.BoxGeometry(1.9, 0.35, 2), std(0x6a2a3a), 0, 0.85, 0.6)); bed.add(mesh(new THREE.BoxGeometry(2, 1.6, 0.2), wood, 0, 0.8, -1.7)); g2.add(bed); W.colliders.push({ t: 0, x0: 84, x1: 86, z0: 4.3, z1: 7.7, h: 1 }); }
    { const ch = new THREE.Group(); ch.position.set(93, 0, -2); ch.add(mesh(new THREE.BoxGeometry(0.8, 0.1, 0.8), wood, 0, 0.8, 0)); ch.add(mesh(new THREE.BoxGeometry(0.8, 1, 0.1), wood, 0, 1.3, -0.35)); for (const [a, b] of [[-0.35, -0.35], [0.35, -0.35], [-0.35, 0.35], [0.35, 0.35]]) ch.add(mesh(new THREE.BoxGeometry(0.08, 0.8, 0.08), wood, a, 0.4, b)); g2.add(ch); }
    { const rug = mesh(new THREE.PlaneGeometry(5, 7), std(0x7a2a2a, { roughness: 1 }), 90, 0.02, -2, false, true); rug.rotation.x = -Math.PI / 2; g2.add(rug); }
    // la estufa (Descartes pensaba «en una habitación caldeada»)
    const stove = new THREE.Group(); stove.position.set(95.5, 0, 10); stove.add(mesh(new THREE.BoxGeometry(1.6, 2.2, 1.4), std(0x5a4a3a), 0, 1.1, 0)); stove.add(mesh(new THREE.PlaneGeometry(0.8, 0.5), glow(0xff8a30, 3), -0.81, 0.7, 0, false, false).rotateY(-Math.PI / 2)); room.add(stove);
    W.colliders.push({ t: 1, x: 95.5, z: 10, r: 1, h: 2 });
    const stoveL = new THREE.PointLight(0xff8a40, 16, 14, 1.6); stoveL.position.set(94, 1.5, 9.5); room.add(stoveL);
    // el cuenco con el palo que parece quebrado
    { const b = new THREE.Group(); b.position.set(95, 0, -9); b.add(mesh(new THREE.CylinderGeometry(0.25, 0.3, 0.9, 10), wood, 0, 0.45, 0)); b.add(mesh(new THREE.CylinderGeometry(0.7, 0.45, 0.4, 18), std(0xb8a888), 0, 1.1, 0)); b.add(mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.05, 18), new THREE.MeshStandardMaterial({ color: 0x5a8ab0, roughness: 0.05, transparent: true, opacity: 0.8 }), 0, 1.25, 0, false, false));
      const s1 = mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.9, 6), wood, 0.1, 1.68, 0, false, false); s1.rotation.z = 0.5; b.add(s1); const s2 = mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.4, 6), wood, -0.12, 1.1, 0, false, false); s2.rotation.z = 1.2; b.add(s2); W.group.add(b); W.colliders.push({ t: 1, x: 95, z: -9, r: 0.8, h: 1.4 }); }
    // el espejo (en el que no apareces)
    { const m = new THREE.Group(); m.position.set(90, 0, -13.85); m.add(mesh(new THREE.BoxGeometry(2.4, 3.4, 0.15), std(0xc8a050, { metalness: 0.8, roughness: 0.3 }), 0, 2.4, 0)); m.add(mesh(new THREE.PlaneGeometry(2.1, 3.1), new THREE.MeshStandardMaterial({ color: 0x8a96a8, roughness: 0.02, metalness: 1 }), 0, 2.4, 0.09, false, false)); room.add(m); }
    // la mesa y la vela del cogito
    const candleL = new THREE.PointLight(0xffc070, 14, 16, 1.5); candleL.position.set(90, 2.2, -4); W.group.add(candleL);
    { const tb = new THREE.Group(); tb.position.set(90, 0, -4); tb.add(mesh(new THREE.BoxGeometry(2.2, 0.12, 1.3), wood, 0, 1, 0)); for (const [a, b] of [[-0.95, -0.5], [0.95, -0.5], [-0.95, 0.5], [0.95, 0.5]]) tb.add(mesh(new THREE.BoxGeometry(0.1, 1, 0.1), wood, a, 0.5, b));
      tb.add(mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.4, 10), std(0xf0e8d8), 0, 1.26, 0)); const fl = mesh(new THREE.ConeGeometry(0.07, 0.22, 8), glow(0xffc060, 5, { transparent: true, opacity: 0.9, additive: true }), 0, 1.58, 0, false, false); tb.add(fl);
      tb.add(mesh(new THREE.BoxGeometry(0.6, 0.04, 0.45), std(0xf0e8d0), 0.5, 1.08, 0.1)); W.group.add(tb); W.colliders.push({ t: 0, x0: 88.9, x1: 91.1, z0: -4.65, z1: -3.35, h: 1 });
      W.anim.push((t) => { fl.scale.set(1 + Math.sin(t * 17) * 0.1, 1 + Math.sin(t * 13) * 0.2, 1); candleL.intensity = (s.cogito ? 40 : 14) + Math.sin(t * 15) * 1.5; }); }
    const stars = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(Array.from({ length: 900 }, (_, i) => (i % 3 === 1 ? Math.random() * 30 - 5 : i % 3 === 0 ? 90 + (Math.random() - 0.5) * 80 : (Math.random() - 0.5) * 80)), 3)), new THREE.PointsMaterial({ color: 0xd8d0ff, size: 0.12, transparent: true, opacity: 0.8, fog: false }));
    stars.visible = false; W.group.add(stars);
    Object.assign(s, { g1, g2, room, roomMats, stars, wallCol: roomMats.map((m) => m.color.clone()) });
    const doubt = (key, objs, msg, after) => () => { s[key] = true; zoneFade(W, objs, true, 1.1); player.shake = 0.25; toast(msg); xpRecord('descartes', 'La habitación de Descartes', { d1: 'Dudé de mis sentidos', d2: 'Dudé de estar despierto', d3: 'Dudé de todo, por el genio maligno' }[key]); if (after) after(); };
    W.spots.push({ x: 93.6, z: -9, r: 2, verb: 'Examinar', label: 'El palo en el agua', on: () => W.zoneIn === Z && !s.d1, act: () => XP.open('Primera meditación', 'Los sentidos engañan', 'Este palo parece quebrado dentro del agua, y está entero. Descartes escribe: «He comprobado que los sentidos a veces me engañan, y es prudente no confiar del todo en quien nos ha engañado una vez». Quiere encontrar algo absolutamente seguro, y para eso decide dudar de todo lo que pueda dudarse.', [['Dudar de todo lo que veo', doubt('d1', [g1], 'Dudas de tus sentidos: la ventana, los libros y el globo se desvanecen. Ahora acércate a la cama.')], ['Todavía no', null]]) });
    W.spots.push({ x: 86.8, z: 6, r: 2.2, verb: 'Pensar', label: 'La cama', on: () => W.zoneIn === Z && s.d1 && !s.d2, act: () => XP.open('Primera meditación', '¿Estoy despierto?', 'Muchas veces he soñado que estaba aquí, sentado junto al fuego, vestido, y en realidad estaba dormido en la cama. No hay señales seguras para distinguir la vigilia del sueño. ¿Y si todo esto fuera un sueño?', [['Dudar de que esto sea real', doubt('d2', [g2], 'Dudas de estar despierto: la habitación se vuelve irreal, como en un sueño. Ahora mírate en el espejo.', () => { s.roomMats.forEach((m) => m.color.lerp(new THREE.Color(0x6a4a9a), 0.6)); })], ['Todavía no', null]]) });
    W.spots.push({ x: 90, z: -12, r: 2, verb: 'Mirarte', label: 'El espejo', on: () => W.zoneIn === Z && s.d2 && !s.d3, act: () => XP.open('Primera meditación', 'El genio maligno', 'Te miras en el espejo… y no apareces. Descartes imagina algo peor que un sueño: un genio maligno, poderoso y astuto, que emplea todo su ingenio en engañarme. Podría hacerme creer que dos más tres son cinco aunque no lo fueran, o que tengo un cuerpo aunque no lo tuviera.', [['Dudar incluso de esto', doubt('d3', [room], 'Lo dudas todo: las paredes desaparecen y solo queda la oscuridad. Solo queda la vela…', () => { s.stars.visible = true; })], ['Todavía no', null]]) });
    W.spots.push({ x: 90, z: -2.6, r: 2, verb: 'Pensar', label: 'La vela', on: () => W.zoneIn === Z && s.d3 && !s.cogito, act: () => XP.open('Segunda meditación', 'Pienso, luego existo', 'Lo he puesto todo en duda: los sentidos, el mundo, mi cuerpo, incluso las matemáticas. Pero mientras dudo hay algo de lo que no puedo dudar: que estoy dudando. Si el genio me engaña, yo tengo que existir para ser engañado. Dudar es pensar, y pensar es existir.', [['Afirmar: «Pienso, luego existo»', () => {
      s.cogito = true; achieve('cogito'); xpRecord('descartes', 'La habitación de Descartes', 'Llegué al cogito: pienso, luego existo'); s.stars.visible = false;
      s.roomMats.forEach((m, i) => m.color.copy(s.wallCol[i])); zoneFade(W, [room, g1, g2], false, 1.6);
      particles.emit(new THREE.Vector3(90, 1.8, -4), 220, { color: 0xffe8b0, speed: 8, life: 1.6, size: 0.5, intensity: 3 });
      XP.open('René Descartes', 'Cogito, ergo sum', 'Descartes encontró su primera certeza: existo mientras pienso. Desde ella intentará reconstruir todo el conocimiento, y el mundo vuelve a aparecer, ahora sostenido por la razón. ¿Te convence?', [XP.note('xp-descartes', 'La habitación de Descartes', '¿Hay algo de lo que puedas estar completamente seguro? ¿Por qué no podrías dudar de ello?'), ['Seguir', null]]);
    }]]) });
  },
  onEnter(W, Z) {
    const s = Z.s; s.d1 = s.d2 = s.d3 = s.cogito = false; s.stars.visible = false;
    for (const o of [s.g1, s.g2, s.room]) { o.visible = true; if (o.userData.s0) o.scale.copy(o.userData.s0); }
    s.roomMats.forEach((m, i) => m.color.copy(s.wallCol[i]));
  },
});
