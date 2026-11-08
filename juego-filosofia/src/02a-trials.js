// ============================================================================
//  EL CAMINO DE AVENTURA
//  Cada época empieza con un camino suspendido sobre el vacío. Antes de cada
//  pensador hay una prueba inspirada en su filosofía (agua, fuego, ritmo...).
//  Al final del camino se entra en la gran plaza, donde espera el maestro.
// ============================================================================
const SEG = 30, PAD_A = 6, TRIAL_LEN = 15, PLAZA_Z = 37;
const TRIALS = {
  tales: { type: 'river', name: 'El río del arjé', hint: 'Salta de piedra en piedra: todo es agua, pero mejor no caer en ella. Algunas piedras se hunden y vuelven a salir.', col: 0x4ab0e0 },
  pitagoras: { type: 'rhythm', name: 'La escalera armónica', hint: 'Las plataformas aparecen y desaparecen al compás. Escucha el ritmo y salta a tiempo.', col: 0xffd36a },
  heraclito: { type: 'fire', name: 'El fuego siempre vivo', hint: 'Las llamas brotan y se apagan: todo fluye. Cruza cuando el fuego descanse.', col: 0xff6a20 },
  protagoras: { type: 'movers', name: 'Los dos argumentos', hint: 'Las losas se mueven en sentidos opuestos. Elige bien en cuál apoyarte.', col: 0xb05cff },
  socrates: { type: 'crumble', name: 'Solo sé que no sé nada', hint: 'El suelo de tus certezas se desmorona bajo tus pies. No te detengas.', col: 0xe0d2b0 },
  platon: { type: 'reveal', name: 'La salida de la caverna', hint: 'En la oscuridad solo hay sombras. Tu lámpara revela el puente verdadero.', col: 0xffc070 },
  diogenes: { type: 'rollers', name: 'Las tinajas rodantes', hint: 'Las tinajas bajan rodando hacia ti: salta por encima o apártate.', col: 0xc0703a },
  epicuro: { type: 'river', name: 'El estanque del Jardín', hint: 'Cruza el estanque sobre los nenúfares sin perder la calma.', col: 0x5ad08a, lily: true },
  pirron: { type: 'fake', name: 'El puente de la duda', hint: 'Algunas losas no existen. Suspende el juicio y observa: las falsas tiemblan.', col: 0x9aa8c8 },
  agustin: { type: 'rhythm', name: 'La escala de la luz', hint: 'Asciende por los peldaños de luz al compás del canto.', col: 0xffe8a0 },
  averroes: { type: 'orbit', name: 'Los círculos del astrolabio', hint: 'Las plataformas giran como los astros. Salta de una órbita a otra.', col: 0x4ad0c0 },
  ockham: { type: 'pendulum', name: 'La navaja', hint: 'Las navajas cortan lo innecesario. Pasa entre ellas sin que te alcancen.', col: 0xbfe0ff },
  pico: { type: 'rhythm', name: 'La escala del ser', hint: 'Elévate peldaño a peldaño: puedes llegar a ser lo que elijas.', col: 0xe0b84d },
  maquiavelo: { type: 'movers', name: 'La rueda de la fortuna', hint: 'La fortuna cambia de ritmo sin avisar: la virtù sabe cuándo saltar.', col: 0xd03050, fortune: true },
  montaigne: { type: 'crumble', name: '¿Qué sé yo?', hint: 'Cada paso es un ensayo: el suelo no aguanta mucho. Sigue adelante.', col: 0xc8b490 },
  descartes: { type: 'movers', name: 'Los ejes cartesianos', hint: 'Unas losas se mueven en el eje x y otras en el eje y. Calcula antes de saltar.', col: 0x5a8aff, axes: true },
  spinoza: { type: 'reveal', name: 'La lente pulida', hint: 'El puente es transparente: solo tu luz lo deja ver.', col: 0xcfe8ff },
  locke: { type: 'crumble', name: 'La tabla rasa', hint: 'Las losas en blanco se borran tras pisarlas. Escribe tu camino sin pararte.', col: 0xf2ece0 },
  hume: { type: 'rollers', name: 'La conjunción constante', hint: 'Las bolas ruedan siempre igual. Observa el patrón: es la costumbre.', col: 0xe8e2d4, balls: true },
};
const TRIAL_KIND = {
  river: 'Prueba del agua', rhythm: 'Prueba del ritmo', fire: 'Prueba del fuego', movers: 'Prueba del equilibrio', crumble: 'Prueba de la duda',
  reveal: 'Prueba de la luz', rollers: 'Prueba del valor', fake: 'Prueba del juicio', orbit: 'Prueba de los astros', pendulum: 'Prueba de la navaja',
};
const PATH_COL = [[0xcbb08a, 0x6b5a48], [0xe8e2d4, 0x9a9282], [0xd6c3a0, 0x7a6a50], [0x7a746a, 0x2a2622], [0xc8beb0, 0x6a6258], [0x6a4a2e, 0x2a1a10]];

// ---------- suelos (plataformas) ----------
// f: { kind:'box'|'cyl', x, z, hw, hd, r, top, th, solid(), safe, mesh, dx, dz }
function addFloor(W, f) {
  f.th = f.th ?? 1; f.dx = 0; f.dz = 0; f.dy = 0; if (!f.solid) f.solid = () => true;
  W.floors.push(f); return f;
}
function inFloor(f, x, z, pad = 0) {
  if (f.kind === 'cyl') { const dx = x - f.x, dz = z - f.z; return dx * dx + dz * dz <= (f.r + pad) * (f.r + pad); }
  return Math.abs(x - f.x) <= f.hw + pad && Math.abs(z - f.z) <= f.hd + pad;
}
function groundAt(W, x, z, y) {
  let best = null;
  // la plaza tiene suelo firme
  if (z < PLAZA_Z + 0.6 && Math.abs(x) <= 24.5) best = { top: 0, f: null };
  for (const f of W.floors) {
    if (!f.solid()) continue;
    if (f.top > y + 0.55) continue;
    if (!inFloor(f, x, z, 0.12)) continue;
    if (!best || f.top > best.top) best = { top: f.top, f };
  }
  return best;
}
function moveFloor(f, x, z, top) {
  f.dx = x - f.x; f.dz = z - f.z; f.dy = top - f.top; f.x = x; f.z = z; f.top = top;
  if (f.mesh) f.mesh.position.set(x, top - f.th / 2, z);
}

function platformMesh(W, kind, w, th, d, mat, edgeCol, edgeK = 1.3) {
  const geo = kind === 'cyl' ? new THREE.CylinderGeometry(w, w * 0.92, th, 24) : new THREE.BoxGeometry(w, th, d);
  const m = mesh(geo, mat, 0, 0, 0, true, true);
  const e = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 30), new THREE.LineBasicMaterial({ color: new THREE.Color(edgeCol).multiplyScalar(edgeK), toneMapped: false, transparent: true, opacity: 0.85 }));
  m.add(e); m.userData.edge = e;
  W.group.add(m); return m;
}

// ---------- el camino completo ----------
function buildCauseway(W, regs) {
  const n = regs.length, idx = W.idx, th = W.theme;
  const top = PLAZA_Z + n * SEG;
  const pc = PATH_COL[idx];
  const tex = texTiles('cw' + idx, pc[0], pc[1], 2, 0.12); const pathMat = std(0xffffff, { map: tex, roughness: 0.8 });
  const sideMat = std(pc[1], { roughness: 0.9 });
  W.floors = W.floors || []; W.trials = []; W.gates = [];
  const pad = (z0, z1, hw, safe = true) => {
    const len = z0 - z1, cz = (z0 + z1) / 2;
    const m = mesh(new THREE.BoxGeometry(hw * 2, 1.4, len), [sideMat, sideMat, pathMat, sideMat, sideMat, sideMat], 0, -0.7, cz, true, true); W.group.add(m);
    // bordillos y farolillos para leer bien los bordes
    for (const s of [-1, 1]) {
      W.group.add(mesh(new THREE.BoxGeometry(0.3, 0.25, len), sideMat, s * (hw - 0.15), 0.12, cz));
      for (let z = z1 + 1.5; z < z0 - 1; z += 6) { W.group.add(mesh(new THREE.CylinderGeometry(0.1, 0.14, 1.3, 6), sideMat, s * (hw - 0.15), 0.65, z)); W.group.add(mesh(new THREE.SphereGeometry(0.13, 8, 6), glow(th.lampCol, 3.5), s * (hw - 0.15), 1.4, z, false, false)); }
    }
    return addFloor(W, { kind: 'box', x: 0, z: cz, hw, hd: len / 2, top: 0, th: 1.4, safe, respawnZ: z1 + Math.min(3, len / 2) });
  };
  // plataforma de inicio
  pad(top + 8, top, 5).respawnZ = top + 4;
  W.start = new THREE.Vector3(0, 0, top + 4);
  const positions = [];
  for (let i = 0; i < n; i++) {
    const zA = top - i * SEG; const tz0 = zA - PAD_A, tz1 = tz0 - TRIAL_LEN; const zB0 = tz1, zB1 = zA - SEG;
    pad(zA, tz0, 4);
    const padB = pad(zB0, zB1, 7.5); padB.respawnZ = zB0 - 2.5;
    const sageZ = zB1 + 6;
    positions.push([0, sageZ]);
    const cfg = TRIALS[regs[i].id] || { type: 'crumble', name: 'Prueba', hint: '', col: th.accent };
    const tr = { i, sage: regs[i], cfg, zS: tz0, zE: tz1, entered: false, done: false, falls: 0, tick: null };
    TRIAL_BUILDERS[cfg.type](W, tr, pathMat, sideMat);
    W.trials.push(tr);
    // puerta de luz al final del tramo
    W.gates.push(buildGate(W, zB1 + 0.6, i));
    // arcos de entrada a la prueba
    const arch = new THREE.Group(); arch.position.set(0, 0, tz0 + 0.4);
    for (const s of [-1, 1]) { arch.add(mesh(new THREE.CylinderGeometry(0.2, 0.26, 4.6, 10), sideMat, s * 3.85, 2.3, 0)); arch.add(mesh(new THREE.SphereGeometry(0.26, 10, 8), glow(cfg.col, 3), s * 3.85, 4.8, 0, false, false)); }
    arch.add(mesh(new THREE.BoxGeometry(8.2, 0.3, 0.4), sideMat, 0, 4.6, 0));
    arch.add(mesh(new THREE.BoxGeometry(6.2, 0.12, 0.75), glow(cfg.col, 2.4), 0, 4.1, 0, false, false));
    W.group.add(arch);
  }
  // tramo final hasta la plaza
  pad(PLAZA_Z + 0.5, PLAZA_Z - 1.5, 4);
  // entrada monumental a la plaza (con muros a los lados)
  const wallH = th.indoor ? 22 : 5;
  for (const s of [-1, 1]) {
    W.group.add(mesh(new THREE.BoxGeometry(20, wallH, 1.4), sideMat, s * 14.2, wallH / 2, PLAZA_Z + 0.2));
    W.colliders.push({ t: 0, x0: s < 0 ? -26 : 4.2, x1: s < 0 ? -4.2 : 26, z0: PLAZA_Z - 0.5, z1: PLAZA_Z + 0.9, h: 99 });
    W.group.add(mesh(new THREE.BoxGeometry(1.6, 7.5, 1.6), pathMat, s * 4.6, 3.75, PLAZA_Z + 0.2));
  }
  W.group.add(mesh(new THREE.BoxGeometry(10.8, 1.2, 1.8), pathMat, 0, 8, PLAZA_Z + 0.2));
  W.group.add(mesh(new THREE.BoxGeometry(8, 0.14, 1.85), glow(th.accent, 2), 0, 7.35, PLAZA_Z + 0.2, false, false));
  // la plaza es una isla suspendida: cimientos de roca bajo ella
  const rock = std(0xffffff, { map: texStone('isle' + idx, pc[1] === 0x2a1a10 ? 0x4a3a30 : 0x8a7a68), roughness: 1 });
  W.group.add(mesh(new THREE.BoxGeometry(52, 14, 88), rock, 0, -7.05, -5.5, false, true));
  const cone = mesh(new THREE.ConeGeometry(36, 30, 7), rock, 0, -29, -5.5, false, false); cone.rotation.x = Math.PI; W.group.add(cone);
  // el vacío: mar de nubes al aire libre, oscuridad en las épocas nocturnas
  const abyssCol = th.indoor || idx === 5 ? new THREE.Color(th.fog[0]).multiplyScalar(0.7) : new THREE.Color(th.sky[1]).lerp(new THREE.Color(0xffffff), 0.35);
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(600, 600), new THREE.MeshBasicMaterial({ map: (() => { const t = cloudTexture().clone(); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(10, 10); t.needsUpdate = true; return t; })(), color: abyssCol, transparent: true, opacity: 0.9, depthWrite: false, fog: true }));
  sea.rotation.x = -Math.PI / 2; sea.position.set(0, -26, top / 2); W.group.add(sea);
  W.anim.push((t) => { sea.material.map.offset.x = t * 0.004; sea.material.map.offset.y = t * 0.002; });
  return positions;
}

// ---------- utilidades de prueba ----------
function trialFloorMat(col) { return std(0xffffff, { map: texTiles('trial', 0xd8d0c0, 0x5a5048, 2, 0.1), roughness: 0.7 }); }
const TRIAL_BUILDERS = {
  // --- AGUA: piedras, algunas se hunden; un tronco a la deriva
  river(W, tr, pathMat, sideMat) {
    const { zS, zE, cfg } = tr; const lily = !!cfg.lily; const r = mulberry32(zS * 13 + 7);
    const water = new THREE.Mesh(new THREE.PlaneGeometry(22, TRIAL_LEN + 0.4), new THREE.ShaderMaterial({
      transparent: true, uniforms: { t: { value: 0 }, c1: { value: new THREE.Color(lily ? 0x1f5a48 : 0x1a5a8a) }, c2: { value: new THREE.Color(lily ? 0x8af0c0 : 0x9fe0ff) } },
      vertexShader: 'varying vec2 vUv; varying vec3 vW; void main(){ vUv = uv; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }',
      fragmentShader: `uniform float t; uniform vec3 c1, c2; varying vec2 vUv; varying vec3 vW;
        void main(){ vec2 p = vW.xz * 0.6; float w = sin(p.x * 2.0 + t * 1.3) * sin(p.y * 1.7 - t * 2.1) + sin((p.x + p.y) * 3.1 + t * 2.7) * 0.5;
          float caust = pow(max(0.0, w), 3.0); vec3 c = mix(c1, c2, 0.25 + caust * 0.7);
          float edge = smoothstep(0.0, 0.06, vUv.x) * smoothstep(1.0, 0.94, vUv.x);
          gl_FragColor = vec4(c, 0.88 * edge + 0.1);
          #include <colorspace_fragment>
        }`,
    }));
    water.rotation.x = -Math.PI / 2; water.position.set(0, -0.35, (zS + zE) / 2); W.group.add(water);
    // orillas laterales de roca
    for (const s of [-1, 1]) W.group.add(mesh(new THREE.BoxGeometry(1, 1.6, TRIAL_LEN), sideMat, s * 11.5, -0.6, (zS + zE) / 2));
    const stoneMat = lily ? std(0x3a8a4a, { roughness: 0.6 }) : std(0x8a8478, { roughness: 0.9, flat: true });
    const movers = [];
    let x = 0; const stones = 7;
    for (let k = 0; k < stones; k++) {
      const z = zS - 1.5 - k * ((TRIAL_LEN - 3) / (stones - 1)); x = clamp(x + (r() < 0.5 ? -1 : 1) * (1 + r() * 1.3), -3.2, 3.2);
      const rad = lily ? 0.95 : 0.8 + r() * 0.2; const bob = k === 2 || k === 4 || (k === 5 && W.idx > 0);
      const m = platformMesh(W, 'cyl', rad, lily ? 0.15 : 0.9, 0, stoneMat, cfg.col, 0.9);
      const f = addFloor(W, { kind: 'cyl', x, z, r: rad, top: lily ? 0.02 : 0.25, th: lily ? 0.15 : 0.9, mesh: m });
      if (lily) { for (let q = 0; q < 3; q++) m.add(mesh(new THREE.SphereGeometry(0.09, 6, 4), glow(q ? 0xff8ab0 : 0xffffff, 2), (r() - 0.5) * rad, 0.1, (r() - 0.5) * rad, false, false)); }
      moveFloor(f, x, z, f.top);
      if (bob) { f.bobPhase = r() * TAU; f.solid = () => f.top > -0.15; movers.push((t) => { const tp = (lily ? 0.02 : 0.25) - Math.max(0, Math.sin(t * 1.1 + f.bobPhase)) * 0.75; moveFloor(f, f.x, f.z, tp); }); }
      if (lily) { const x0 = x, ph = r() * TAU; movers.push((t) => moveFloor(f, x0 + Math.sin(t * 0.5 + ph) * 0.8, f.z, f.top)); }
    }
    // tronco (o rama) a la deriva cruzando
    const log = platformMesh(W, 'box', 3, 0.5, 0.9, std(0x5a3a22, { roughness: 0.9 }), cfg.col, 0.8);
    const lf = addFloor(W, { kind: 'box', x: 0, z: zS - TRIAL_LEN * 0.55, hw: 1.5, hd: 0.45, top: 0.1, th: 0.5, mesh: log });
    const lz = lf.z; movers.push((t) => moveFloor(lf, Math.sin(t * 0.6) * 5, lz, 0.1));
    W.anim.push((t, dt) => { water.material.uniforms.t.value = t; for (const m of movers) m(t, dt); });
    tr.tick = (dt, P) => {
      if (P.pos.y < -0.45 && P.pos.z < zS && P.pos.z > zE && Math.abs(P.pos.x) < 11) { tr.splash = true; return 'water'; }
      return null;
    };
  },
  // --- RITMO: peldaños que aparecen y desaparecen al compás
  rhythm(W, tr, pathMat, sideMat) {
    const { zS, cfg } = tr; const steps = 6; const hs = [0.8, 1.6, 2.4, 2.4, 1.6, 0.8]; const plats = [];
    const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color(cfg.col).multiplyScalar(0.55), emissive: new THREE.Color(cfg.col), emissiveIntensity: 0.6, roughness: 0.4, transparent: true });
    for (let k = 0; k < steps; k++) {
      const z = zS - 1.4 - k * 2.45; const x = (k % 2 ? 1 : -1) * 0.9;
      const m = platformMesh(W, 'box', 2.1, 0.45, 2.0, mat.clone(), cfg.col, 2);
      const grp = k % 2; const f = addFloor(W, { kind: 'box', x, z, hw: 1.05, hd: 1.0, top: hs[k], th: 0.45, mesh: m });
      moveFloor(f, x, z, hs[k]);
      f.solid = () => Rhythm.on(grp); plats.push({ f, m, grp });
      // nota visible bajo la plataforma
      m.add(mesh(new THREE.TorusGeometry(0.35, 0.04, 6, 20), glow(cfg.col, 3), 0, -0.4, 0, false, false));
    }
    let lastBeat = -1;
    W.anim.push((t) => {
      for (const p of plats) { const on = Rhythm.on(p.grp); const warn = Rhythm.warn(p.grp); p.m.visible = on; p.m.material.opacity = warn ? 0.35 + 0.5 * (Math.sin(t * 40) * 0.5 + 0.5) : 1; p.m.userData.edge.material.opacity = on ? 0.9 : 0; }
      const beat = Math.floor(t / (Rhythm.period / 2));
      if (beat !== lastBeat) { lastBeat = beat; if (tr.near) Audio.tone(beat % 2 ? 659 : 523, 0.35, { type: 'triangle', vol: 0.09 }); }
    });
    tr.tick = () => null;
  },
  // --- FUEGO: chorros de llamas en oleadas
  fire(W, tr, pathMat, sideMat) {
    const { zS, zE, cfg } = tr; const len = zS - zE;
    const floorM = mesh(new THREE.BoxGeometry(8, 1.4, len), [sideMat, sideMat, std(0x3a2a20, { roughness: 0.9 }), sideMat, sideMat, sideMat], 0, -0.7, (zS + zE) / 2); W.group.add(floorM);
    addFloor(W, { kind: 'box', x: 0, z: (zS + zE) / 2, hw: 4, hd: len / 2, top: 0, th: 1.4 });
    const jets = []; const rows = 4;
    for (let k = 0; k < rows; k++) {
      const z = zS - 2.5 - k * ((len - 5) / (rows - 1));
      for (const x of [-2.6, 0, 2.6]) {
        const g = new THREE.Group(); g.position.set(x, 0, z); W.group.add(g);
        g.add(mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.06, 16), std(0x1a1210, { metalness: 0.6, roughness: 0.4 }), 0, 0.03, 0, false, true));
        put(g, mesh(new THREE.RingGeometry(0.6, 0.85, 16), glow(0xff5a10, 1.5), 0, 0.07, 0, false, false)).rotation.x = -Math.PI / 2;
        const flame = mesh(new THREE.ConeGeometry(0.85, 3.4, 12, 1, true), glow(0xff7a20, 3.5, { transparent: true, opacity: 0.85, additive: true, side: THREE.DoubleSide }), 0, 1.7, 0, false, false);
        g.add(flame); jets.push({ x, z, flame, ph: k * 0.55 + (x === 0 ? 0.25 : 0) });
      }
    }
    const P = 2.8; const state = (j, t) => { const c = ((t + j.ph) % P) / P; return c < 0.38 ? 'on' : c < 0.52 ? 'warn' : 'off'; };
    W.anim.push((t) => {
      for (const j of jets) {
        const s = state(j, t); j.flame.visible = s !== 'off';
        j.flame.scale.set(s === 'warn' ? 0.25 : 1 + Math.sin(t * 20 + j.x) * 0.1, s === 'warn' ? 0.15 : 1 + Math.sin(t * 13 + j.z) * 0.15, s === 'warn' ? 0.25 : 1);
        if (s === 'on' && tr.near && Math.random() < 0.3) game.particles.emit(_tv.set(j.x, 1 + Math.random() * 2, j.z), 1, { color: 0xff8a30, speed: 1, up: 3, life: 0.6, size: 0.6, intensity: 2.5 });
      }
    });
    tr.tick = (dt, Pl) => {
      if (Pl.pos.y > 2.6) return null;
      for (const j of jets) { if (state(j, tAccW()) !== 'on') continue; if (Math.hypot(Pl.pos.x - j.x, Pl.pos.z - j.z) < 1.05) return { hurt: 14, push: new THREE.Vector3(Math.sign(Pl.pos.x - j.x || 1) * 2, 4, 6), kind: 'fire' }; }
      return null;
    };
  },
  // --- MOVIMIENTO: losas que se desplazan (sentidos opuestos, fortuna o ejes)
  movers(W, tr, pathMat, sideMat) {
    const { zS, cfg } = tr; const n = 5; const movers = []; const mat = std(0xffffff, { map: texTiles('trial' + W.idx, 0xd8d0c0, 0x5a5048, 2, 0.1), roughness: 0.7 });
    for (let k = 0; k < n; k++) {
      const z = zS - 1.6 - k * 2.9; const m = platformMesh(W, 'box', 2.4, 0.5, 2.3, mat, cfg.col, 1.6);
      const f = addFloor(W, { kind: 'box', x: 0, z, hw: 1.2, hd: 1.15, top: 0.2, th: 0.5, mesh: m });
      const dir = k % 2 ? 1 : -1; const yAxis = cfg.axes && k % 2 === 1; const ph = k * 1.3;
      movers.push((t) => {
        const sp = cfg.fortune ? 1 + 0.4 * Math.sin(t * 0.37 + k) : 1;
        if (yAxis) moveFloor(f, 0, z, 0.2 + (Math.sin(t * 1.1 * sp + ph) * 0.5 + 0.5) * 1.6);
        else moveFloor(f, dir * Math.sin(t * 0.9 * sp + ph) * 3.4, z, 0.2);
      });
    }
    W.anim.push((t, dt) => { for (const m of movers) m(t, dt); });
    tr.tick = () => null;
  },
  // --- DESMORONAMIENTO: losas que caen tras pisarlas
  crumble(W, tr, pathMat, sideMat) {
    const { zS, cfg } = tr; const rows = 6, cols = 3; const tiles = [];
    const mat = std(0xffffff, { map: texTiles('trial' + W.idx, 0xd8d0c0, 0x5a5048, 2, 0.1), roughness: 0.7 });
    for (let rI = 0; rI < rows; rI++) for (let c = 0; c < cols; c++) {
      const x = (c - 1) * 2.45, z = zS - 1.25 - rI * 2.45;
      const m = platformMesh(W, 'box', 2.3, 0.5, 2.3, mat, cfg.col, 1.2);
      const f = addFloor(W, { kind: 'box', x, z, hw: 1.15, hd: 1.15, top: 0, th: 0.5, mesh: m }); moveFloor(f, x, z, 0);
      const tile = { f, m, t: -1, gone: 0, x, z };
      f.solid = () => tile.gone <= 0;
      f.onStand = () => { if (tile.t < 0 && tile.gone <= 0) tile.t = 0.55; };
      tiles.push(tile);
    }
    W.anim.push((t, dt) => {
      for (const tl of tiles) {
        if (tl.t >= 0) { tl.t -= dt; tl.m.position.x = tl.x + (Math.random() - 0.5) * 0.08; if (tl.t < 0) { tl.gone = 4; tl.t = -1; if (tr.near) Audio.noise(0.4, { vol: 0.12, freq: 300, slide: 0.4 }); } }
        if (tl.gone > 0) { tl.gone -= dt; tl.m.position.y -= dt * 9; tl.m.visible = tl.m.position.y > -12; if (tl.gone <= 0) { tl.m.position.set(tl.x, -0.25, tl.z); tl.m.visible = true; } }
      }
    });
    tr.tick = () => null;
  },
  // --- REVELACIÓN: el puente solo se ve cerca de tu lámpara
  reveal(W, tr, pathMat, sideMat) {
    const { zS, cfg } = tr; const tiles = []; let x = 0; const r = mulberry32(zS * 7 + 3);
    for (let k = 0; k < 9; k++) {
      const z = zS - 0.9 - k * 1.65; if (k > 0) x = clamp(x + (r() < 0.5 ? -1 : 1) * (0.8 + r() * 0.9), -3.5, 3.5);
      const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color(cfg.col).multiplyScalar(0.6), emissive: new THREE.Color(cfg.col), emissiveIntensity: 0.4, roughness: 0.2, transparent: true, opacity: 0 });
      const m = platformMesh(W, 'box', 1.7, 0.3, 1.5, mat, cfg.col, 2);
      const f = addFloor(W, { kind: 'box', x, z, hw: 0.85, hd: 0.75, top: 0, th: 0.3, mesh: m }); moveFloor(f, x, z, 0);
      tiles.push({ m, x, z });
    }
    // sombras proyectadas de la caverna a los lados
    for (let k = 0; k < 6; k++) { const s = mesh(new THREE.PlaneGeometry(1.2, 2.6), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false }), (k % 2 ? 1 : -1) * 7, 1.5, zS - 2 - k * 2.2, false, false); s.rotation.y = Math.PI / 2; W.group.add(s); tiles.push({ shadow: s, ph: k }); }
    W.anim.push((t) => {
      const p = game.player.pos;
      for (const tl of tiles) {
        if (tl.shadow) { tl.shadow.position.y = 1.5 + Math.sin(t * 0.8 + tl.ph) * 0.3; continue; }
        const d = Math.hypot(p.x - tl.x, p.z - tl.z); const a = clamp(1 - (d - 2.5) / 3.5, 0, 1);
        tl.m.material.opacity = a * 0.95; tl.m.userData.edge.material.opacity = Math.max(a, 0.06);
      }
    });
    tr.tick = () => null;
  },
  // --- RODANTES: tinajas o bolas que bajan por el camino
  rollers(W, tr, pathMat, sideMat) {
    const { zS, zE, cfg } = tr; const len = zS - zE;
    W.group.add(mesh(new THREE.BoxGeometry(7, 1.4, len), [sideMat, sideMat, pathMat, sideMat, sideMat, sideMat], 0, -0.7, (zS + zE) / 2));
    addFloor(W, { kind: 'box', x: 0, z: (zS + zE) / 2, hw: 3.5, hd: len / 2, top: 0, th: 1.4 });
    for (const s of [-1, 1]) W.group.add(mesh(new THREE.BoxGeometry(0.3, 0.5, len), sideMat, s * 3.35, 0.25, (zS + zE) / 2));
    const balls = cfg.balls; const pool = []; const lanes = [-2.2, 0, 2.2]; const r = mulberry32(zS);
    const ballCols = [0xf6f2e8, 0xc0302a, 0x2a5aa8, 0xe0b030];
    for (let k = 0; k < 6; k++) {
      let m;
      if (balls) m = mesh(new THREE.SphereGeometry(0.55, 18, 14), std(ballCols[k % 4], { roughness: 0.15 }), 0, 0.55, 0);
      else { m = mesh(new THREE.LatheGeometry([[0, 0], [0.35, 0.05], [0.6, 0.4], [0.62, 0.9], [0.45, 1.3], [0.3, 1.4]].map((p) => new THREE.Vector2(p[0], p[1])), 16), std(0xa0583a, { roughness: 0.85, side: THREE.DoubleSide }), 0, 0.6, 0); m.geometry.translate(0, -0.7, 0); m.rotation.z = Math.PI / 2; }
      m.visible = false; W.group.add(m); pool.push({ m, active: false, x: 0, z: 0, sp: 0 });
    }
    let timer = 0, pattern = 0;
    W.anim.push((t, dt) => {
      timer -= dt;
      if (timer <= 0 && tr.near) {
        timer = balls ? 1.25 : 1.1 + r() * 0.6;
        const b = pool.find((q) => !q.active); if (b) { b.active = true; b.x = balls ? lanes[pattern++ % 3] : lanes[Math.floor(r() * 3)]; b.z = zE + 0.5; b.sp = balls ? 6 : 5 + r() * 2; b.m.visible = true; }
      }
      for (const b of pool) {
        if (!b.active) continue; b.z += b.sp * dt; b.m.position.x = b.x; b.m.position.z = b.z;
        if (balls) b.m.rotation.x += b.sp * dt / 0.55; else b.m.rotation.x += b.sp * dt / 0.6;
        if (b.z > zS + 1) { b.active = false; b.m.visible = false; }
      }
    });
    tr.tick = (dt, P) => {
      if (P.pos.y > 0.95) return null;
      for (const b of pool) if (b.active && Math.abs(P.pos.z - b.z) < 0.85 && Math.abs(P.pos.x - b.x) < 0.95) { b.active = false; b.m.visible = false; return { hurt: 10, push: new THREE.Vector3(Math.sign(P.pos.x - b.x || 1) * 3, 5, 7), kind: 'roll' }; }
      return null;
    };
  },
  // --- JUICIO: losas falsas que tiemblan
  fake(W, tr, pathMat, sideMat) {
    const { zS, cfg } = tr; const rows = 6, cols = 3; const r = mulberry32(zS * 3 + 1); const fakes = [];
    const mat = std(0xffffff, { map: texTiles('trial' + W.idx, 0xd8d0c0, 0x5a5048, 2, 0.1), roughness: 0.7 });
    let col = 1;
    for (let rI = 0; rI < rows; rI++) {
      if (rI > 0) col = clamp(col + Math.floor(r() * 3) - 1, 0, 2);
      for (let c = 0; c < cols; c++) {
        const real = c === col || r() < 0.3; const x = (c - 1) * 2.45, z = zS - 1.25 - rI * 2.45;
        const m = platformMesh(W, 'box', 2.3, 0.5, 2.3, mat, cfg.col, 1.2);
        const f = addFloor(W, { kind: 'box', x, z, hw: 1.15, hd: 1.15, top: 0, th: 0.5, mesh: m }); moveFloor(f, x, z, 0);
        if (!real) { f.solid = () => false; fakes.push({ m, x, z, ph: r() * TAU }); }
      }
    }
    W.anim.push((t) => { for (const fk of fakes) { fk.m.position.y = -0.25 + Math.sin(t * 9 + fk.ph) * 0.025; fk.m.rotation.z = Math.sin(t * 7 + fk.ph) * 0.012; } });
    tr.tick = () => null;
  },
  // --- ÓRBITAS: plataformas que giran alrededor de pilares
  orbit(W, tr, pathMat, sideMat) {
    const { zS, cfg } = tr; const centers = [zS - 3.2, zS - 7.6, zS - 12]; const movers = []; const brass = std(0xc8a050, { metalness: 0.9, roughness: 0.3 });
    const mat = std(0xffffff, { map: texTiles('trial' + W.idx, 0xd8d0c0, 0x5a5048, 2, 0.1), roughness: 0.7 });
    centers.forEach((cz, ci) => {
      const pil = platformMesh(W, 'cyl', 0.9, 6, 0, sideMat, cfg.col, 0.8); const pf = addFloor(W, { kind: 'cyl', x: 0, z: cz, r: 0.9, top: 0.5, th: 6, mesh: pil }); moveFloor(pf, 0, cz, 0.5);
      put(W.group, mesh(new THREE.TorusGeometry(2.6, 0.03, 4, 48), glow(cfg.col, 2), 0, 0.3, cz, false, false)).rotation.x = -Math.PI / 2;
      for (let k = 0; k < 3; k++) {
        const m = platformMesh(W, 'box', 1.7, 0.4, 1.7, mat, cfg.col, 1.6); m.add(mesh(new THREE.BoxGeometry(0.15, 0.15, 1.0), brass, 0.85, 0, 0));
        const f = addFloor(W, { kind: 'box', x: 0, z: cz, hw: 0.85, hd: 0.85, top: 0.3, th: 0.4, mesh: m });
        const ph = (k / 3) * TAU, dir = ci % 2 ? 1 : -1;
        movers.push((t) => { const a = ph + t * 0.55 * dir; moveFloor(f, Math.cos(a) * 2.6, cz + Math.sin(a) * 2.6, 0.3); });
      }
    });
    W.anim.push((t, dt) => { for (const m of movers) m(t, dt); });
    tr.tick = () => null;
  },
  // --- NAVAJAS: péndulos que barren el puente
  pendulum(W, tr, pathMat, sideMat) {
    const { zS, zE, cfg } = tr; const len = zS - zE;
    W.group.add(mesh(new THREE.BoxGeometry(3.4, 1.4, len), [sideMat, sideMat, pathMat, sideMat, sideMat, sideMat], 0, -0.7, (zS + zE) / 2));
    addFloor(W, { kind: 'box', x: 0, z: (zS + zE) / 2, hw: 1.7, hd: len / 2, top: 0, th: 1.4 });
    const blades = []; const steel = std(0xdfe6ee, { metalness: 1, roughness: 0.15 });
    for (let k = 0; k < 4; k++) {
      const z = zS - 2.5 - k * 3.4; const piv = new THREE.Group(); piv.position.set(0, 7.5, z); W.group.add(piv);
      piv.add(mesh(new THREE.CylinderGeometry(0.05, 0.05, 6.4, 6), std(0x2a2018), 0, -3.2, 0));
      const bl = mesh(new THREE.BoxGeometry(2.4, 0.9, 0.08), steel, 0, -6.7, 0); piv.add(bl);
      bl.add(mesh(new THREE.BoxGeometry(2.4, 0.06, 0.1), glow(cfg.col, 4), 0, -0.45, 0, false, false));
      W.group.add(mesh(new THREE.BoxGeometry(4, 0.3, 0.3), sideMat, 0, 7.6, z));
      blades.push({ piv, z, ph: k * 1.1 });
    }
    const ang = (b, t) => Math.sin(t * 1.7 + b.ph) * 0.95;
    W.anim.push((t) => { for (const b of blades) b.piv.rotation.z = ang(b, t); });
    tr.tick = (dt, P) => {
      const t = tAccW();
      for (const b of blades) {
        if (Math.abs(P.pos.z - b.z) > 0.55 || P.pos.y > 1.6) continue;
        const a = ang(b, t); const bx = -Math.sin(a) * 6.7; const by = 7.5 - Math.cos(a) * 6.7;
        if (Math.abs(P.pos.x - bx) < 1.4 && by < P.pos.y + 1.6) { const v = Math.cos(t * 1.7 + b.ph); return { hurt: 10, push: new THREE.Vector3(-Math.sign(v || 1) * 9, 4, 0), kind: 'blade' }; }
      }
      return null;
    };
  },
};
const _tv = new THREE.Vector3();
// reloj global compartido por las pruebas (se asigna desde el bucle principal)
let tAccW = () => 0;
// ritmo de Pitágoras: dos grupos que se alternan con un solape breve
const Rhythm = {
  period: 3.8,
  phase() { return (tAccW() % this.period) / this.period; },
  on(g) { const p = this.phase(); return g === 0 ? p < 0.6 : p >= 0.42 || p < 0.1; },
  warn(g) { const p = this.phase(); return g === 0 ? p > 0.42 && p < 0.6 : p > 0.92 || p < 0.1; },
};
