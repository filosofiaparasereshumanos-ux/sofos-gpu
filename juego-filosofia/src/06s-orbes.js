// ============================================================================
//  ORBES DE SABIDURÍA: un juego de saltos en todos los mundos.
//  · En cada época flotan orbes con una pregunta dentro, demasiado altos para
//    tocarlos caminando: hay que saltar para alcanzarlos.
//  · Algunos están sobre escalones de piedra: sube saltando y salta otra vez.
//  · De vez en cuando cruza el cielo una estrella fugaz y deja caer un orbe
//    dorado cerca de ti, que dura poco y da más puntos.
//  Las preguntas salen de los pensadores y lugares de la época en que estás.
// ============================================================================
ACH.push({ id: 'saltarin', i: '⤒', n: 'Saltarín sabio', d: 'Alcanza diez orbes de sabiduría saltando.' }, { id: 'estrella', i: '✶', n: 'Cazador de estrellas', d: 'Atrapa un orbe dorado de una estrella fugaz.' });
const Orbes = {
  tex: null,
  texture() {
    if (this.tex) return this.tex;
    const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d');
    x.fillStyle = 'rgba(0,0,0,0)'; x.fillRect(0, 0, 128, 128);
    x.font = 'bold 92px Georgia, serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineWidth = 10; x.strokeStyle = 'rgba(20,12,4,0.85)'; x.strokeText('?', 64, 70); x.fillStyle = '#fff6d8'; x.fillText('?', 64, 70);
    this.tex = new THREE.CanvasTexture(c); this.tex.colorSpace = THREE.SRGBColorSpace; return this.tex;
  },
  // un sitio libre: lejos de muros, pensadores, lugares y otros orbes
  spot(W, r, taken, minWall = 2.2) {
    const busy = [...W.stations.map((s) => [s.pos.x, s.pos.z, 4.5]), ...(W.pois || []).map((p) => [p.at[0], p.at[1], 3]), ...taken.map((t) => [t[0], t[1], 6]), [0, W.bossPos ? W.bossPos.z : -40, 7]];
    for (let k = 0; k < 80; k++) {
      const x = (r() * 2 - 1) * 15, z = -30 + r() * 56;
      if (busy.some(([bx, bz, br]) => Math.hypot(bx - x, bz - z) < br)) continue;
      if (W.colliders.some((c) => (c.t === 1 ? Math.hypot(c.x - x, c.z - z) < c.r + minWall : x > c.x0 - minWall && x < c.x1 + minWall && z > c.z0 - minWall && z < c.z1 + minWall))) continue;
      if (W._near && W._near(x, z, minWall)) continue;
      return [x, z];
    }
    return null;
  },
  build(W) {
    if (W.cave && W.cave.in) return;
    const r = mulberry32(W.idx * 977 + 11); const acc = new THREE.Color(W.theme.accent); W.orbes = []; const taken = [];
    const stone = std(0xcfc6b4, { roughness: 0.8 });
    const make = (x, z, y, kind) => {
      const g = new THREE.Group(); g.position.set(x, y, z); W.group.add(g);
      const gold = kind === 'star';
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 16), new THREE.MeshStandardMaterial({ color: gold ? 0xffd36a : acc, emissive: gold ? 0xffb020 : acc, emissiveIntensity: 1.6, transparent: true, opacity: 0.55, roughness: 0.2 }));
      g.add(core);
      const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(0.62, 1), new THREE.MeshBasicMaterial({ color: gold ? 0xfff0b0 : acc.clone().multiplyScalar(1.6), wireframe: true, transparent: true, opacity: 0.55, toneMapped: false }));
      g.add(shell);
      const q = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.texture(), transparent: true, depthWrite: false, toneMapped: false })); q.scale.set(0.7, 0.7, 1); g.add(q);
      // sombra luminosa en el suelo: marca dónde saltar
      const ring = mesh(new THREE.RingGeometry(0.55, 0.78, 32), new THREE.MeshBasicMaterial({ color: gold ? 0xffd36a : acc.clone().multiplyScalar(1.4), transparent: true, opacity: 0.7, side: THREE.DoubleSide, depthWrite: false, toneMapped: false }), x, kind === 'high' ? 1.25 : 0.05, z, false, false);
      ring.rotation.x = -Math.PI / 2; W.group.add(ring);
      const o = { g, core, shell, ring, x, z, y, kind, done: false, ph: r() * 6, born: tAccNow() };
      W.orbes.push(o); this.jumpSpot(W, o); return o;
    };
    // orbes en el aire, que se alcanzan con un salto
    for (let i = 0; i < 3; i++) { const p = this.spot(W, r, taken); if (!p) continue; taken.push(p); make(p[0], p[1], 2.55, 'air'); }
    // orbes sobre escalones de piedra: sube al escalón y salta otra vez
    for (let i = 0; i < 2; i++) {
      const p = this.spot(W, r, taken, 3.2); if (!p) continue; taken.push(p); const [x, z] = p;
      const a = r() * TAU, sx = Math.cos(a) * 1.7, sz = Math.sin(a) * 1.7;
      W.group.add(mesh(new THREE.CylinderGeometry(0.75, 0.85, 0.5, 14), stone, x + sx, 0.25, z + sz)); addFloor(W, { kind: 'cyl', x: x + sx, z: z + sz, r: 0.8, top: 0.5, th: 0.5 });
      W.group.add(mesh(new THREE.CylinderGeometry(0.85, 0.95, 1.2, 16), stone, x, 0.6, z)); addFloor(W, { kind: 'cyl', x, z, r: 0.9, top: 1.2, th: 1.2 });
      make(x, z, 3.75, 'high');
    }
    W.anim.push((t) => this.tick(W, t));
  },
  tick(W, t) {
    // rombo dorado sobre los pensadores con quienes todavía puedes hablar
    if (typeof sages !== 'undefined') for (const sg of sages) {
      if (!sg.group) continue;
      if (!sg._mk) { sg._mk = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 0), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffd36a).multiplyScalar(2.2), toneMapped: false })); sg._mk.scale.set(1, 1.6, 1); sg.group.add(sg._mk); }
      const on = sg.state === 'idle'; sg._mk.visible = on;
      if (on) { sg._mk.position.y = 2.75 * (sg.scale || 1) + 1.05 + Math.sin(t * 2.2 + sg.group.position.x) * 0.1; sg._mk.rotation.y = t * 1.8; }
    }
    for (const o of W.orbes) {
      if (o.done) continue;
      o.g.position.y = o.y + Math.sin(t * 1.6 + o.ph) * 0.14; o.shell.rotation.y = t * 0.8; o.shell.rotation.x = t * 0.5;
      o.ring.material.opacity = 0.45 + Math.sin(t * 3 + o.ph) * 0.25;
      if (o.kind === 'star' && t - o.born > 30) { this.vanish(W, o, false); continue; }
      if (G.state !== 'play' || W.zoneIn) continue;
      const dx = player.pos.x - o.x, dz = player.pos.z - o.z; if (dx * dx + dz * dz > 1.25) continue;
      const head = player.pos.y + 1.7; if (head < o.g.position.y - 0.45 || player.pos.y > o.g.position.y + 0.4) continue;
      this.catch(W, o);
    }
    // estrella fugaz: cada cierto tiempo de juego cae un orbe dorado cerca del jugador
    if (G.state === 'play' && !W.zoneIn) {
      W._starT = (W._starT ?? 70 + Math.random() * 40) - (t - (W._lastT ?? t)); W._lastT = t;
      if (W._starT <= 0) { W._starT = 90 + Math.random() * 60; this.star(W, t); }
    } else W._lastT = t;
  },
  star(W, t) {
    if (W.orbes.some((o) => o.kind === 'star' && !o.done)) return;
    const a = player.yaw + (Math.random() - 0.5) * 1.2, d = 5 + Math.random() * 3;
    let x = player.pos.x - Math.sin(a) * d, z = player.pos.z - Math.cos(a) * d;
    x = Math.max(-16, Math.min(16, x)); z = Math.max(-38, Math.min(30, z));
    if (W.colliders.some((c) => (c.t === 1 ? Math.hypot(c.x - x, c.z - z) < c.r + 1.2 : x > c.x0 - 1.2 && x < c.x1 + 1.2 && z > c.z0 - 1.2 && z < c.z1 + 1.2))) return;
    const o = this.buildStar(W, x, z, t);
    // estela de la estrella al caer
    const trail = mesh(new THREE.SphereGeometry(0.3, 10, 8), glow(0xffe08a, 6), x + 14, 22, z - 10, false, false); W.group.add(trail);
    const t0 = t; W.anim.push((tt) => { const k = Math.min(1, (tt - t0) / 1.4); trail.position.set(x + 14 * (1 - k), 22 - (22 - 2.6) * k, z - 10 * (1 - k)); if (k >= 1 && trail.visible) { trail.visible = false; particles.emit(new THREE.Vector3(x, 2.6, z), 40, { color: 0xffd36a, speed: 4, life: 0.8, size: 0.4 }); } });
    o.g.visible = false; o.ring.visible = true; setTimeout(() => { o.g.visible = true; }, 1400);
    Audio.portal && Audio.portal(); toast('✶ ¡Una estrella fugaz! Salta para atrapar el orbe dorado antes de que se apague.');
  },
  buildStar(W, x, z, t) {
    const g = new THREE.Group(); g.position.set(x, 2.6, z); W.group.add(g);
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 16), new THREE.MeshStandardMaterial({ color: 0xffd36a, emissive: 0xffb020, emissiveIntensity: 2, transparent: true, opacity: 0.6 })); g.add(core);
    const shell = new THREE.Mesh(new THREE.OctahedronGeometry(0.7, 0), new THREE.MeshBasicMaterial({ color: 0xfff0b0, wireframe: true, transparent: true, opacity: 0.7, toneMapped: false })); g.add(shell);
    const q = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.texture(), transparent: true, depthWrite: false, toneMapped: false })); q.scale.set(0.7, 0.7, 1); g.add(q);
    const ring = mesh(new THREE.RingGeometry(0.55, 0.78, 32), new THREE.MeshBasicMaterial({ color: 0xffd36a, transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false, toneMapped: false }), x, 0.05, z, false, false); ring.rotation.x = -Math.PI / 2; W.group.add(ring);
    const o = { g, core, shell, ring, x, z, y: 2.6, kind: 'star', done: false, ph: 0, born: t }; W.orbes.push(o); this.jumpSpot(W, o); return o;
  },
  // junto a un orbe, el botón principal se vuelve «Saltar» (en el móvil no hay otro botón de salto)
  jumpSpot(W, o) {
    W.spots = W.spots || [];
    W.spots.push({ x: o.x, z: o.z, r: o.kind === 'high' ? 2.4 : 1.7, verb: 'Saltar', label: o.kind === 'high' ? 'sube al escalón y alcanza el orbe' : o.kind === 'star' ? 'atrapa el orbe dorado' : 'alcanza el orbe de sabiduría',
      on: () => !o.done && o.g.visible && !W.zoneIn, act: () => { input.jumpReq = true; } });
  },
  vanish(W, o, burst) {
    o.done = true; o.g.visible = false; o.ring.visible = false;
    if (burst) particles.emit(new THREE.Vector3(o.x, o.g.position.y, o.z), 36, { color: o.kind === 'star' ? 0xffd36a : W.theme.accent, speed: 4, life: 0.7, size: 0.35 });
  },
  pool() {
    const e = ERAS[G.eraIdx]; const list = [];
    for (const s of e.sages) for (const q of s.q || []) list.push({ ...q, who: s.short });
    for (const p of (POIS[G.eraIdx] || [])) if (p.q) list.push({ ...p.q, who: p.name });
    return list.filter((q) => q.a && q.a.length >= 3);
  },
  catch(W, o) {
    this.vanish(W, o, true); Audio.pickup && Audio.pickup(); buzz(20);
    const list = this.pool(); if (!list.length) return;
    const q = list[Math.floor(Math.random() * list.length)]; const right = q.a[0];
    const ops = shuffle(q.a.slice(0, 4)).map((a) => [a, () => this.answer(o, q, a === right)]);
    XP.open(o.kind === 'star' ? '✶ Orbe dorado de una estrella fugaz' : '⤒ Orbe de sabiduría · ' + ERAS[G.eraIdx].name, q.q, `Una pregunta sobre ${q.who}. Elige la respuesta.`, ops);
  },
  answer(o, q, ok) {
    const pts = o.kind === 'star' ? 150 : o.kind === 'high' ? 90 : 60;
    if (ok) {
      addScore(pts); popup(`+${pts}<small>${o.kind === 'star' ? 'orbe dorado' : 'orbe de sabiduría'}</small>`, 'up'); Audio.correct(); buzz([20, 30]);
      if (Stats.add('orbes') >= 10) achieve('saltarin'); if (o.kind === 'star') achieve('estrella');
      if (q.e) toast('✓ ' + q.e);
    } else { Audio.wrong && Audio.wrong(); toast(`La respuesta era «${q.a[0]}». ${q.e || ''}`); }
  },
};
function tAccNow() { return typeof performance !== 'undefined' ? performance.now() / 1000 : 0; }
