// ============================================================================
//  PARTÍCULAS (pool de puntos aditivos)
// ============================================================================
class Particles {
  constructor(max = 2500) {
    this.max = max; this.n = 0;
    this.pos = new Float32Array(max * 3); this.vel = new Float32Array(max * 3); this.col = new Float32Array(max * 3);
    this.size = new Float32Array(max); this.life = new Float32Array(max); this.maxLife = new Float32Array(max); this.alpha = new Float32Array(max); this.grav = new Float32Array(max); this.drag = new Float32Array(max);
    const g = new THREE.BufferGeometry();
    this.aPos = new THREE.BufferAttribute(this.pos, 3); this.aCol = new THREE.BufferAttribute(this.col, 3); this.aSize = new THREE.BufferAttribute(this.size, 1); this.aAlpha = new THREE.BufferAttribute(this.alpha, 1);
    [this.aPos, this.aCol, this.aSize, this.aAlpha].forEach((a) => a.setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('position', this.aPos); g.setAttribute('pcolor', this.aCol); g.setAttribute('size', this.aSize); g.setAttribute('alpha', this.aAlpha);
    this.mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { scale: { value: 1 } },
      vertexShader: `attribute float size; attribute float alpha; attribute vec3 pcolor; varying vec3 vC; varying float vA; uniform float scale;
        void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); gl_PointSize = size * scale / max(0.1, -mv.z); gl_Position = projectionMatrix * mv; vC = pcolor; vA = alpha; }`,
      fragmentShader: `varying vec3 vC; varying float vA; void main(){ vec2 d = gl_PointCoord - 0.5; float r = length(d); float a = smoothstep(0.5, 0.0, r); a *= a; gl_FragColor = vec4(vC * a * vA, a * vA); }`,
    });
    this.points = new THREE.Points(g, this.mat); this.points.frustumCulled = false; this.geo = g;
    this._c = new THREE.Color();
  }
  emit(p, count, o = {}) {
    const c = this._c.set(o.color ?? 0xffffff).multiplyScalar(o.intensity ?? 2);
    for (let k = 0; k < count; k++) {
      if (this.n >= this.max) return;
      const i = this.n++; const sp = (o.speed ?? 3) * (0.4 + Math.random() * 0.6);
      let dx = Math.random() * 2 - 1, dy = Math.random() * 2 - 1, dz = Math.random() * 2 - 1;
      const l = Math.hypot(dx, dy, dz) || 1; dx /= l; dy /= l; dz /= l;
      if (o.dir) { dx = o.dir.x + dx * (o.spread ?? 0.3); dy = o.dir.y + dy * (o.spread ?? 0.3); dz = o.dir.z + dz * (o.spread ?? 0.3); }
      if (o.flat) dy = Math.abs(dy) * 0.15;
      const j = o.jitter ?? 0;
      this.pos[i * 3] = p.x + (Math.random() - 0.5) * j; this.pos[i * 3 + 1] = p.y + (Math.random() - 0.5) * j; this.pos[i * 3 + 2] = p.z + (Math.random() - 0.5) * j;
      this.vel[i * 3] = dx * sp; this.vel[i * 3 + 1] = dy * sp + (o.up ?? 0); this.vel[i * 3 + 2] = dz * sp;
      this.col[i * 3] = c.r; this.col[i * 3 + 1] = c.g; this.col[i * 3 + 2] = c.b;
      this.size[i] = (o.size ?? 0.3) * (0.6 + Math.random() * 0.8);
      this.maxLife[i] = this.life[i] = (o.life ?? 0.8) * (0.6 + Math.random() * 0.6);
      this.grav[i] = o.gravity ?? 0; this.drag[i] = o.drag ?? 1.5; this.alpha[i] = 1;
    }
  }
  update(dt) {
    for (let i = 0; i < this.n; i++) {
      this.life[i] -= dt;
      if (this.life[i] <= 0) { this.n--; this.copy(this.n, i); i--; continue; }
      const d = Math.exp(-this.drag[i] * dt);
      this.vel[i * 3] *= d; this.vel[i * 3 + 1] = this.vel[i * 3 + 1] * d - this.grav[i] * dt; this.vel[i * 3 + 2] *= d;
      this.pos[i * 3] += this.vel[i * 3] * dt; this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt; this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      const k = this.life[i] / this.maxLife[i]; this.alpha[i] = Math.min(1, k * 2.2) * Math.min(1, (1 - k) * 10 + 0.2);
    }
    this.geo.setDrawRange(0, this.n);
    this.aPos.needsUpdate = this.aCol.needsUpdate = this.aSize.needsUpdate = this.aAlpha.needsUpdate = true;
  }
  copy(from, to) {
    for (let k = 0; k < 3; k++) { this.pos[to * 3 + k] = this.pos[from * 3 + k]; this.vel[to * 3 + k] = this.vel[from * 3 + k]; this.col[to * 3 + k] = this.col[from * 3 + k]; }
    this.size[to] = this.size[from]; this.life[to] = this.life[from]; this.maxLife[to] = this.maxLife[from]; this.alpha[to] = this.alpha[from]; this.grav[to] = this.grav[from]; this.drag[to] = this.drag[from];
  }
  clear() { this.n = 0; this.geo.setDrawRange(0, 0); }
}

// ============================================================================
//  FIGURA DE FILÓSOFO
// ============================================================================
function buildFigure(look, accent) {
  const g = new THREE.Group(); const body = new THREE.Group(); g.add(body);
  const robe = std(look.robe, { roughness: 0.85 }); const robe2 = std(look.robe2, { roughness: 0.7 });
  const skin = std(look.skin, { roughness: 0.6 }); const hair = std(look.hair, { roughness: 0.9 });
  const prof = [[0, 0], [0.6, 0], [0.57, 0.2], [0.49, 0.65], [0.41, 1.05], [0.39, 1.28], [0.45, 1.4], [0.34, 1.5], [0.15, 1.56], [0, 1.57]];
  body.add(mesh(new THREE.LatheGeometry(prof.map((p) => new THREE.Vector2(p[0], p[1])), 24), robe));
  // manto (himation / estola) en diagonal
  const sash = mesh(new THREE.TorusGeometry(0.43, 0.05, 6, 32, Math.PI * 1.25), robe2, 0, 1.12, 0); sash.rotation.set(Math.PI / 2 - 0.12, 0.6, 0); sash.scale.set(1, 1.12, 0.55); body.add(sash);
  body.add(mesh(new THREE.CylinderGeometry(0.4, 0.42, 0.08, 20), robe2, 0, 1.0, 0));
  if (look.hat === 'ruff' || look.hat === 'wig' || look.hat === 'longhair') put(body, mesh(new THREE.ConeGeometry(0.12, 0.35, 4), std(0xf6f2ea), 0, 1.4, 0.3)).rotation.x = Math.PI; // corbatín
  // cabeza
  const head = new THREE.Group(); head.position.y = 1.78; g.add(head);
  head.add(mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.2, 10), skin, 0, -0.18, 0));
  const skull = mesh(new THREE.SphereGeometry(0.2, 22, 16), skin, 0, 0, 0); skull.scale.set(0.92, 1.08, 1); head.add(skull);
  put(head, mesh(new THREE.ConeGeometry(0.035, 0.1, 6), skin, 0, -0.01, 0.2)).rotation.x = Math.PI / 2;
  const eyeM = std(0x1a1410, { roughness: 0.3 });
  head.add(mesh(new THREE.SphereGeometry(0.022, 8, 6), eyeM, -0.07, 0.04, 0.175, false)); head.add(mesh(new THREE.SphereGeometry(0.022, 8, 6), eyeM, 0.07, 0.04, 0.175, false));
  head.add(mesh(new THREE.BoxGeometry(0.07, 0.015, 0.02), hair, -0.07, 0.085, 0.18, false)); head.add(mesh(new THREE.BoxGeometry(0.07, 0.015, 0.02), hair, 0.07, 0.085, 0.18, false));
  if (look.beard) {
    const b = mesh(new THREE.SphereGeometry(0.17, 16, 12, 0, TAU, Math.PI * 0.42, Math.PI * 0.58), std(look.beard, { roughness: 1 }), 0, -0.02, 0.05); b.scale.set(1.05, 1.5, 1); head.add(b);
    head.add(mesh(new THREE.BoxGeometry(0.12, 0.025, 0.03), std(look.beard, { roughness: 1 }), 0, -0.06, 0.19, false));
  }
  const cap = (geo, m, y = 0.04, z = -0.01) => { const c = mesh(geo, m, 0, y, z); head.add(c); return c; };
  switch (look.hat) {
    case 'bald': cap(new THREE.SphereGeometry(0.205, 16, 10, 0, TAU, Math.PI * 0.55, Math.PI * 0.25), hair, 0, -0.01); break;
    case 'laurel': cap(new THREE.SphereGeometry(0.21, 16, 10, 0, TAU, 0, Math.PI * 0.45), hair, 0.01);
      { const l = mesh(new THREE.TorusGeometry(0.2, 0.03, 6, 20), std(0x4a7a2a, { roughness: 0.8 }), 0, 0.08, -0.01); l.rotation.x = Math.PI / 2 - 0.2; head.add(l); } break;
    case 'none': cap(new THREE.SphereGeometry(0.21, 16, 10, 0, TAU, 0, Math.PI * 0.5), hair, 0.01, -0.015); break;
    case 'hood': { const h = mesh(new THREE.SphereGeometry(0.27, 16, 12, 0, TAU, 0, Math.PI * 0.62), robe, 0, 0.02, -0.04); head.add(h); } break;
    case 'tonsure': { const t = mesh(new THREE.TorusGeometry(0.17, 0.05, 8, 20), hair, 0, 0.1, 0); t.rotation.x = Math.PI / 2; head.add(t); } break;
    case 'mitre': cap(new THREE.SphereGeometry(0.21, 16, 10, 0, TAU, 0, Math.PI * 0.5), hair, 0.0); { const m = mesh(new THREE.ConeGeometry(0.17, 0.42, 4), std(0xf2ece0, { roughness: 0.6 }), 0, 0.33, 0); m.rotation.y = Math.PI / 4; m.scale.set(1, 1, 0.6); head.add(m); head.add(mesh(new THREE.BoxGeometry(0.03, 0.3, 0.12), std(0xc9a227, { metalness: 0.8, roughness: 0.3 }), 0, 0.3, 0)); } break;
    case 'turban': { for (let i = 0; i < 3; i++) { const t = mesh(new THREE.TorusGeometry(0.17 - i * 0.03, 0.07, 8, 20), std(0xf4efe2, { roughness: 0.9 }), 0, 0.1 + i * 0.07, -0.01); t.rotation.x = Math.PI / 2; head.add(t); } } break;
    case 'beret': cap(new THREE.SphereGeometry(0.21, 16, 10, 0, TAU, 0, Math.PI * 0.5), hair, 0.0); { const b = mesh(new THREE.CylinderGeometry(0.27, 0.22, 0.09, 20), robe, 0, 0.17, -0.02); b.rotation.x = -0.2; head.add(b); } break;
    case 'cap': { const c = mesh(new THREE.SphereGeometry(0.215, 16, 10, 0, TAU, 0, Math.PI * 0.5), robe, 0, 0.02, -0.01); head.add(c); } break;
    case 'ruff': cap(new THREE.SphereGeometry(0.21, 16, 10, 0, TAU, 0, Math.PI * 0.5), hair, 0.01);
      { const r = mesh(new THREE.TorusGeometry(0.17, 0.06, 8, 24), std(0xf6f2ea, { roughness: 0.9 }), 0, -0.2, 0); r.rotation.x = Math.PI / 2; head.add(r); } break;
    case 'wig': cap(new THREE.SphereGeometry(0.22, 16, 10, 0, TAU, 0, Math.PI * 0.5), hair, 0.01);
      for (const s of [-1, 1]) for (let i = 0; i < 2; i++) put(head, mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.12, 12), hair, s * 0.19, -0.02 - i * 0.1, -0.03)).rotation.z = Math.PI / 2;
      break;
    case 'longhair': cap(new THREE.SphereGeometry(0.215, 16, 10, 0, TAU, 0, Math.PI * 0.5), hair, 0.01);
      for (const s of [-1, 1]) { const l = mesh(new THREE.BoxGeometry(0.09, 0.42, 0.2), hair, s * 0.17, -0.14, -0.05); head.add(l); }
      break;
  }
  // brazos
  const mkArm = (s) => {
    const pivot = new THREE.Group(); pivot.position.set(s * 0.4, 1.42, 0);
    const a = mesh(new THREE.CapsuleGeometry(0.085, 0.5, 4, 8), robe, 0, -0.3, 0); pivot.add(a);
    pivot.add(mesh(new THREE.SphereGeometry(0.07, 10, 8), skin, 0, -0.62, 0));
    pivot.rotation.z = s * 0.18; g.add(pivot); return pivot;
  };
  const armL = mkArm(-1), armR = mkArm(1);
  // accesorio en la mano derecha
  const hand = new THREE.Group(); hand.position.set(0, -0.64, 0.02); armR.add(hand);
  switch (look.acc) {
    case 'staff': hand.add(mesh(new THREE.CylinderGeometry(0.03, 0.035, 1.9, 6), std(0x5a3a22), 0, 0.3, 0.06)); break;
    case 'scroll': { const s = mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.36, 10), std(0xe8dcb8), 0, 0, 0.08); s.rotation.z = Math.PI / 2; hand.add(s); } break;
    case 'book': hand.add(mesh(new THREE.BoxGeometry(0.24, 0.32, 0.07), std(0x5a1a1a, { roughness: 0.6 }), 0, 0, 0.1)); break;
    case 'lamp': hand.add(mesh(new THREE.SphereGeometry(0.08, 10, 8), glow(0xffc070, 4), 0, -0.12, 0.08, false, false)); break;
    case 'cup': hand.add(mesh(new THREE.CylinderGeometry(0.08, 0.04, 0.14, 10), std(0x8a6a3a, { metalness: 0.5, roughness: 0.4 }), 0, 0, 0.08)); break;
    case 'quill': { const q = mesh(new THREE.ConeGeometry(0.03, 0.4, 5), std(0xf6f2ea), 0, 0.16, 0.06); q.rotation.z = 0.4; hand.add(q); } break;
    case 'lens': { const l = mesh(new THREE.TorusGeometry(0.08, 0.015, 6, 16), std(0xc8a050, { metalness: 0.9, roughness: 0.3 }), 0, 0.05, 0.08); hand.add(l); } break;
  }
  // halo
  const halo = mesh(new THREE.TorusGeometry(0.3, 0.02, 8, 48), glow(accent, 2.2), 0, 2.32, 0, false, false); halo.rotation.x = Math.PI / 2; g.add(halo);
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return { group: g, head, armL, armR, halo, body };
}

class Sage {
  constructor(world, station, idx) {
    this.world = world; this.st = station; this.data = station.data; this.boss = !!station.boss; this.idx = idx;
    const accent = world.theme.accent;
    this.fig = buildFigure(this.data.look, accent);
    this.scale = this.boss ? 1.45 : 1.05;
    this.fig.group.scale.setScalar(this.scale);
    this.group = new THREE.Group(); this.group.add(this.fig.group); this.group.position.copy(station.pos); this.group.position.y = 0.14;
    // mirar hacia el centro
    this.baseYaw = Math.atan2(-station.pos.x, this.boss ? 1 : -station.pos.x * 0.0001 + 0.0001) || 0;
    this.baseYaw = 0; // miran hacia quien llega por el camino
    this.group.rotation.y = this.baseYaw; this.yaw = this.baseYaw;
    // etiqueta
    const tex = labelTexture(this.data.short, this.data.epithet);
    this.label = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false }));
    this.label.scale.set(2.4, 0.6, 1); this.label.position.y = 2.75 * this.scale + 0.3; this.group.add(this.label);
    world.group.add(this.group);
    this.maxConv = this.boss ? (this.data.final ? 7 : 5) : 3; this.conv = this.maxConv;
    this.breaks = this.boss ? (this.data.final ? [5, 2] : [3]) : [];
    this.state = this.boss ? 'sealed' : 'idle'; // sealed | idle | shielded | defeated
    this.order = shuffle([...this.data.q.keys()]); this.qptr = 0;
    this.t = Math.random() * 10; this.gesture = 0; this.shootCd = 2;
    this.radius = this.boss ? 1.3 : 0.8;
    this.shield = null;
  }
  get pos() { return this.group.position; }
  nextQuestion() {
    if (this.qptr >= this.order.length) { this.order = shuffle([...this.data.q.keys()]); this.qptr = 0; }
    return this.data.q[this.order[this.qptr++]];
  }
  setShield(on) {
    if (on && !this.shield) {
      const m = new THREE.Mesh(new THREE.SphereGeometry(1.9 * this.scale, 32, 20), new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
        uniforms: { t: { value: 0 }, col: { value: new THREE.Color(this.world.theme.enemy.col).multiplyScalar(1.5) } },
        vertexShader: 'varying vec3 vN; varying vec3 vV; varying vec3 vP; void main(){ vec4 mv = modelViewMatrix*vec4(position,1.); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); vP = position; gl_Position = projectionMatrix*mv; }',
        fragmentShader: 'uniform float t; uniform vec3 col; varying vec3 vN; varying vec3 vV; varying vec3 vP; void main(){ float f = pow(1.0-abs(dot(vN,vV)), 2.2); float hex = step(0.92, fract(vP.y*3.0 + t*0.5)) + step(0.95, fract(atan(vP.z,vP.x)*4.0)); gl_FragColor = vec4(col*(f + hex*0.25), f*0.9 + hex*0.15); }',
      }));
      m.position.y = 1.2 * this.scale; this.group.add(m); this.shield = m; this.state = 'shielded';
    } else if (!on && this.shield) {
      this.group.remove(this.shield); this.shield.geometry.dispose(); this.shield = null; this.state = 'idle';
    }
  }
  defeat() {
    this.state = 'defeated';
    this.fig.halo.material = glow(0xffd36a, 5);
    this.label.material.map = labelTexture(this.data.short, '✓ ' + this.data.concept.name, '#ffd36a'); this.label.material.needsUpdate = true;
    if (this.st.ring) this.st.ring.material = glow(0xffd36a, 3, { transparent: true, opacity: 0.9 });
  }
  update(dt, t, player, inDuel) {
    this.t += dt;
    const f = this.fig;
    // flotar suave
    f.group.position.y = (this.boss ? 0.25 + Math.sin(this.t * 1.2) * 0.12 : Math.sin(this.t * 1.5) * 0.03);
    f.halo.rotation.z += dt * 0.8; f.halo.position.y = 2.32 + Math.sin(this.t * 2) * 0.04;
    if (this.state === 'defeated') f.halo.position.y = 2.42 + Math.sin(this.t * 2) * 0.06;
    // mirar al jugador si está cerca
    const dx = player.pos.x - this.pos.x, dz = player.pos.z - this.pos.z; const d = Math.hypot(dx, dz);
    const want = d < 14 || inDuel ? Math.atan2(dx, dz) : this.baseYaw;
    let diff = want - this.yaw; while (diff > Math.PI) diff -= TAU; while (diff < -Math.PI) diff += TAU;
    this.yaw += diff * Math.min(1, dt * 3); this.group.rotation.y = this.yaw;
    this.label.visible = !inDuel && d > 3.4 + this.radius;
    // gestos espontáneos cuando el jugador está cerca
    this.nextGesture = (this.nextGesture ?? 3 + Math.random() * 4) - dt;
    if (this.nextGesture <= 0) { this.nextGesture = 4 + Math.random() * 5; if (d < 12 && this.state !== 'defeated') this.gesture = 1; }
    f.head.rotation.y = damp(f.head.rotation.y, clamp(diff * 0.6, -0.6, 0.6), 4, dt);
    f.body.scale.y = 1 + Math.sin(this.t * 1.8) * 0.012; // respiración
    // gestos
    this.gesture = Math.max(0, this.gesture - dt);
    const g = this.gesture > 0 ? Math.sin((1 - this.gesture) * Math.PI) : 0;
    f.armR.rotation.x = -0.25 - g * 1.6 + Math.sin(this.t * 1.1) * 0.05 - (inDuel ? 0.4 + Math.sin(this.t * 2.2) * 0.15 : 0);
    f.armL.rotation.x = -0.1 + Math.sin(this.t * 0.9 + 1) * 0.05 - (this.gesture > 0.7 ? Math.sin((this.gesture - 0.7) * 4.5) * 0.5 : 0);
    f.armL.rotation.z = -0.18 - (inDuel ? 0.25 + Math.sin(this.t * 1.7) * 0.12 : 0);
    f.head.rotation.x = Math.sin(this.t * 0.7) * 0.05 + (this.state === 'defeated' ? 0.12 : 0);
    if (this.shield) this.shield.material.uniforms.t.value = this.t;
    // escenario
    if (this.st.barrier) {
      const u = this.st.barrier.material.uniforms; u.t.value = this.t;
      if (this.state !== 'sealed') { u.a.value = Math.max(0, u.a.value - dt * 0.8); if (u.a.value <= 0) this.st.barrier.visible = false; }
    }
  }
}

// ============================================================================
//  ENEMIGOS: sombras que encarnan los errores de cada época
// ============================================================================
const SHELL_GEO = {};
function shellGeo(kind) {
  if (SHELL_GEO[kind]) return SHELL_GEO[kind];
  let g;
  switch (kind) {
    case 'octa': g = new THREE.OctahedronGeometry(0.7, 0); break;
    case 'icosa': g = new THREE.IcosahedronGeometry(0.68, 0); break;
    case 'torus': g = new THREE.TorusGeometry(0.55, 0.12, 6, 18); break;
    case 'cross': g = new THREE.BoxGeometry(1.4, 0.18, 0.18); break;
    case 'cube': g = new THREE.BoxGeometry(0.95, 0.95, 0.95); break;
    case 'eye': g = new THREE.TorusGeometry(0.7, 0.05, 6, 32); break;
  }
  return (SHELL_GEO[kind] = g);
}
class Shade {
  constructor(world, pos, kind, eraIdx, summoned = false) {
    const th = world.theme.enemy; this.world = world; this.kind = kind; this.summoned = summoned;
    this.group = new THREE.Group(); this.group.position.copy(pos);
    this.y = kind === 'charger' ? 1.1 : 2 + Math.random() * 1.2; this.group.position.y = this.y + 4;
    const coreR = kind === 'charger' ? 0.32 : 0.42;
    this.core = mesh(new THREE.IcosahedronGeometry(coreR, 1), std(th.core, { roughness: 0.35, metalness: 0.6, emissive: th.col, ei: 0.35, flat: true }), 0, 0, 0, true, false);
    this.group.add(this.core);
    this.shellMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(th.col).multiplyScalar(2.2), wireframe: th.shell !== 'torus' && th.shell !== 'eye', transparent: true, opacity: 0.85, toneMapped: false });
    this.shell = new THREE.Mesh(shellGeo(th.shell), this.shellMat); this.group.add(this.shell);
    if (th.shell === 'cross') { const s2 = new THREE.Mesh(shellGeo('cross'), this.shellMat); s2.rotation.z = Math.PI / 2; this.shell.add(s2); }
    if (th.shell === 'eye') { const s2 = new THREE.Mesh(shellGeo('eye'), this.shellMat); s2.rotation.x = Math.PI / 2; this.shell.add(s2); }
    const eyeM = glow(0xffffff, 6);
    this.eyes = new THREE.Group();
    if (th.shell === 'eye') this.eyes.add(mesh(new THREE.SphereGeometry(0.13, 10, 8), glow(th.col, 8), 0, 0, coreR * 0.9, false, false));
    else { this.eyes.add(mesh(new THREE.SphereGeometry(0.06, 8, 6), eyeM, -0.13, 0.08, coreR * 0.88, false, false)); this.eyes.add(mesh(new THREE.SphereGeometry(0.06, 8, 6), eyeM, 0.13, 0.08, coreR * 0.88, false, false)); }
    this.group.add(this.eyes);
    this.baseScale = kind === 'charger' ? 0.95 : 1.2; this.group.scale.setScalar(this.baseScale);
    world.group.add(this.group);
    const k = 1 + eraIdx * 0.12;
    this.hp = this.maxHp = kind === 'charger' ? 2 : 3 + (eraIdx >= 3 ? 1 : 0);
    this.speed = (kind === 'charger' ? 5.2 : 3) * (1 + eraIdx * 0.06);
    this.dmg = Math.round((kind === 'charger' ? 11 : 8) * k);
    this.shotSpeed = 9 + eraIdx * 0.6;
    this.fireCd = 1.5 + Math.random() * 2; this.t = Math.random() * 10; this.flash = 0; this.spawnT = 0.8;
    this.strafe = Math.random() < 0.5 ? 1 : -1; this.hitCd = 0; this.recoil = new THREE.Vector3();
    this.radius = kind === 'charger' ? 0.55 : 0.7; this.dead = false; this.color = th.col;
  }
  get pos() { return this.group.position; }
  update(dt, game) {
    this.t += dt; const p = this.group.position; const pl = game.player.pos;
    if (this.spawnT > 0) { this.spawnT -= dt; p.y = this.y + Math.max(0, this.spawnT) * 5; this.group.scale.setScalar((1 - Math.max(0, this.spawnT) / 0.8) * this.baseScale); return; }
    this.shell.rotation.x += dt * 1.3; this.shell.rotation.y += dt * 1.9;
    const tx = pl.x - p.x, tz = pl.z - p.z; const d = Math.hypot(tx, tz) || 1;
    this.group.rotation.y = Math.atan2(tx, tz);
    let vx = 0, vz = 0;
    if (this.kind === 'charger') {
      // acecha → se carga (aviso) → embiste en línea recta → se recupera
      this.hitCd -= dt; this.phaseT = (this.phaseT || 0) - dt; this.phase = this.phase || 'stalk';
      p.y = damp(p.y, 1.2 + Math.sin(this.t * 6) * 0.1, 4, dt);
      if (this.phase === 'stalk') {
        const sp = this.hitCd > 0 ? -this.speed * 0.3 : this.speed * 0.8;
        vx = (tx / d) * sp + (-tz / d) * this.strafe * 1.5; vz = (tz / d) * sp + (tx / d) * this.strafe * 1.5;
        if (d < 8 && this.hitCd <= 0) { this.phase = 'windup'; this.phaseT = 0.55; }
      } else if (this.phase === 'windup') {
        this.shell.rotation.y += dt * 25; this.flash = Math.max(this.flash, 0.6 + Math.sin(this.t * 40) * 0.4);
        this.group.position.x += (Math.random() - 0.5) * 0.06;
        if (this.phaseT <= 0) { this.phase = 'lunge'; this.phaseT = 0.5; this.lungeDir = new THREE.Vector3(tx / d, 0, tz / d); }
      } else if (this.phase === 'lunge') {
        vx = this.lungeDir.x * this.speed * 3.2; vz = this.lungeDir.z * this.speed * 3.2;
        if (Math.random() < dt * 60) game.particles.emit(p, 1, { color: this.color, speed: 0.5, life: 0.4, size: 0.5, intensity: 2.5 });
        if (d < 1.2 && this.hitCd <= 0 && Math.abs(pl.y + 1 - p.y) < 1.6) { game.hurtPlayer(this.dmg, p); this.hitCd = 1.6; this.phase = 'recover'; this.phaseT = 0.9; }
        if (this.phaseT <= 0) { this.phase = 'recover'; this.phaseT = 0.8; this.hitCd = 0.6; }
      } else { vx = -(tx / d) * 1.5; vz = -(tz / d) * 1.5; if (this.phaseT <= 0) this.phase = 'stalk'; }
    } else {
      const want = 9 + Math.sin(this.t * 0.4) * 2;
      const radial = d > want + 1 ? 1 : d < want - 1 ? -1 : 0;
      vx = (tx / d) * radial * this.speed + (-tz / d) * this.strafe * this.speed * 0.6;
      vz = (tz / d) * radial * this.speed + (tx / d) * this.strafe * this.speed * 0.6;
      if (Math.random() < dt * 0.25) this.strafe *= -1;
      p.y = this.y + Math.sin(this.t * 1.7) * 0.35 + Math.sin(this.t * 3.1) * 0.12;
      vx += Math.sin(this.t * 2.3) * 1.2; vz += Math.cos(this.t * 1.9) * 1.2;
      const pulse = 1 + Math.sin(this.t * 5) * 0.06; this.core.scale.setScalar(pulse);
      this.fireCd -= dt;
      if (this.fireCd <= 0 && d < 26) {
        this.fireCd = 2.2 + Math.random() * 1.6 - game.eraIdx * 0.12;
        const from = p.clone(); const to = new THREE.Vector3(pl.x, pl.y + 1.4, pl.z);
        // pequeña anticipación
        to.addScaledVector(game.player.vel, Math.min(0.6, d / this.shotSpeed) * 0.5);
        game.spawnBolt(from, to.sub(from).normalize(), 'enemy', this.dmg, this.shotSpeed, this.color);
        Audio.enemyShot();
      }
    }
    p.x += (vx + this.recoil.x) * dt; p.z += (vz + this.recoil.z) * dt; this.recoil.multiplyScalar(Math.exp(-5 * dt));
    p.x = clamp(p.x, ARENA.x0 + 1, ARENA.x1 - 1); p.z = clamp(p.z, ARENA.z0 + 1, ARENA.z1 - 1);
    this.flash = Math.max(0, this.flash - dt * 4);
    this.shellMat.color.set(this.color).multiplyScalar(2.2 + this.flash * 6);
    if (Math.random() < dt * 20) game.particles.emit(p, 1, { color: this.color, speed: 0.4, life: 0.7, size: 0.35, intensity: 1.2, jitter: 0.5 });
  }
  damage(n, dir) {
    this.hp -= n; this.flash = 1; if (dir) this.recoil.addScaledVector(dir, 6);
    return this.hp <= 0;
  }
  dispose() { this.world.group.remove(this.group); this.core.geometry.dispose(); }
}

// ============================================================================
//  PROYECTILES Y RECOMPENSAS
// ============================================================================
const BOLT_GEO = new THREE.SphereGeometry(1, 10, 8);
class Bolt {
  constructor(scene, pos, dir, owner, dmg, speed, color) {
    this.owner = owner; this.dmg = dmg; this.vel = dir.clone().multiplyScalar(speed); this.life = owner === 'player' ? 1.6 : 4; this.color = color;
    const s = owner === 'player' ? 0.11 : 0.2;
    this.mesh = new THREE.Mesh(BOLT_GEO, glow(color, owner === 'player' ? 6 : 4));
    this.mesh.scale.setScalar(s); this.mesh.position.copy(pos);
    if (owner === 'enemy') { const inner = new THREE.Mesh(BOLT_GEO, glow(0xffffff, 3)); inner.scale.setScalar(0.5); this.mesh.add(inner); }
    scene.add(this.mesh); this.scene = scene; this.dead = false;
  }
  get pos() { return this.mesh.position; }
  kill() { this.dead = true; this.scene.remove(this.mesh); }
}
class Pickup {
  constructor(scene, pos, kind) {
    this.kind = kind; this.scene = scene; this.t = Math.random() * 6; this.dead = false;
    const g = new THREE.Group(); g.position.copy(pos); g.position.y = 0.9;
    if (kind === 'frag') {
      g.add(mesh(new THREE.OctahedronGeometry(0.22, 0), glow(0x7fe6ff, 3.5), 0, 0, 0, false, false));
      g.add(mesh(new THREE.OctahedronGeometry(0.34, 0), new THREE.MeshBasicMaterial({ color: new THREE.Color(0x7fe6ff).multiplyScalar(1.5), wireframe: true, toneMapped: false }), 0, 0, 0, false, false));
    } else {
      const jar = mesh(new THREE.LatheGeometry([[0, 0], [0.12, 0.02], [0.2, 0.15], [0.18, 0.32], [0.08, 0.42], [0.09, 0.5]].map((p) => new THREE.Vector2(p[0], p[1])), 14), std(0xb5652e, { roughness: 0.6, emissive: 0x401a00, ei: 1 }), 0, -0.25, 0, false, false);
      g.add(jar); g.add(mesh(new THREE.SphereGeometry(0.1, 8, 6), glow(0xffd36a, 4), 0, 0.3, 0, false, false));
    }
    scene.add(g); this.group = g; this.life = 25;
  }
  get pos() { return this.group.position; }
  update(dt) { this.t += dt; this.life -= dt; this.group.rotation.y += dt * 2; this.group.position.y = 0.9 + Math.sin(this.t * 3) * 0.12; if (this.life < 4) this.group.visible = Math.sin(this.t * 20) > 0; }
  kill() { this.dead = true; this.scene.remove(this.group); }
}
