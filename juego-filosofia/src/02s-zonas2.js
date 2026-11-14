// ============================================================================
//  MÁS EXPERIMENTOS JUGABLES
//    · El río de Heráclito · El sueño de la mariposa (Zhuangzi)
//    · La escalera de Wittgenstein
// ============================================================================

// ---------------------------------------------------------------- 5 · EL RÍO DE HERÁCLITO
ZONES.push({
  id: 'rio', era: 0, near: 'heraclito', title: 'El río de Heráclito', sub: '¿Puedes bañarte dos veces en él?', color: 0x60d8ff,
  b: { x0: 80, x1: 100, z0: -20, z1: 20 }, entry: [90, 0, 16], yaw: 0, exit: [83, 17.5], exitLabel: 'Volver a Éfeso',
  enterMsg: 'Delante corre un río. Métete en él… y luego vuelve a meterte.',
  build(W, Z) {
    const s = Z.s; const grass = texTiles('rio', 0x6a8a4a, 0x4a6a32, 10, 0.3); grass.repeat.set(5, 10);
    zoneBase(W, Z, std(0xffffff, { map: grass, roughness: 1 })); zoneWalls(W, Z, 1, std(0x5a4a3a), false);
    const r = mulberry32(17);
    // orillas con rocas y cañas, y colinas que cierran el valle
    for (const sd of [-1, 1]) for (let k = 0; k < 10; k++) { const b = mesh(new THREE.DodecahedronGeometry(0.4 + r() * 0.5, 0), std(0x8a8478, { flat: true }), 81 + r() * 18, 0.2, sd * (4.6 + r() * 0.8), false, false); W.group.add(b); }
    for (let k = 0; k < 40; k++) W.group.add(mesh(new THREE.CylinderGeometry(0.03, 0.04, 1.2 + r(), 4), std(0x6a8a3a), 81 + r() * 18, 0.7, (r() < 0.5 ? -1 : 1) * (5 + r() * 1.5), false, false));
    for (const sd of [-1, 1]) for (let k = 0; k < 6; k++) W.group.add(mesh(new THREE.SphereGeometry(8 + r() * 6, 12, 8), std(0x5a7a3a, { flat: true }), 72 + k * 9, -3, sd * (28 + r() * 6), false, false));
    for (const x of [79, 101]) for (let z = -20; z <= 20; z += 6) W.group.add(mesh(new THREE.SphereGeometry(4 + r() * 2, 10, 8), std(0x4a6a32, { flat: true }), x, -1, z, false, false));
    // el río: agua con corriente que se puede cruzar (vado)
    const c = document.createElement('canvas'); c.width = 64; c.height = 256; const x = c.getContext('2d');
    x.fillStyle = '#b8d4e8'; x.fillRect(0, 0, 64, 256);
    for (let i = 0; i < 256; i += 4) { x.fillStyle = `rgba(255,255,255,${0.25 + Math.random() * 0.5})`; x.fillRect(Math.random() * 64, i, 6 + Math.random() * 24, 2); }
    const flow = new THREE.CanvasTexture(c); flow.wrapS = flow.wrapT = THREE.RepeatWrapping; flow.repeat.set(1, 4); flow.rotation = Math.PI / 2;
    const water = new THREE.MeshStandardMaterial({ color: 0x3a8ac0, roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.85, emissive: 0x0a2a40, emissiveIntensity: 0.4, emissiveMap: flow, map: flow });
    const river = mesh(new THREE.PlaneGeometry(20, 8), water, 90, 0.08, 0, false, true); river.rotation.x = -Math.PI / 2; W.group.add(river);
    const leaves = []; for (let k = 0; k < 18; k++) { const l = mesh(new THREE.CircleGeometry(0.14, 6), std([0xd8a030, 0xc85a2a, 0x8aa83a][k % 3]), 82 + r() * 16, 0.12, -3 + r() * 6, false, false); l.rotation.x = -Math.PI / 2; W.group.add(l); leaves.push(l); }
    const HUES = [0x3a8ac0, 0x2a9a8a, 0x5a7ab8, 0x3aa0a8, 0x2a6a9a, 0x4a9ac8];
    s.speed = 2.2; s.dir = 1; s.n = 0; s.inside = false;
    W.anim.push((t, dt) => {
      if (!dt) return; flow.offset.y += s.dir * s.speed * dt * 0.08;
      for (const l of leaves) { l.position.x += s.dir * s.speed * dt * 0.9; if (l.position.x > 100) l.position.x = 80; if (l.position.x < 80) l.position.x = 100; }
      if (W.zoneIn !== Z || G.state !== 'play') return;
      const inW = Math.abs(player.pos.z) < 3.6;
      if (inW && !s.inside) {
        s.inside = true; s.n++;
        if (s.n > 1) { water.color.setHex(HUES[s.n % HUES.length]); s.speed = 1.2 + Math.random() * 3; if (Math.random() < 0.35) s.dir *= -1; for (const l of leaves) { l.position.x = 80 + Math.random() * 20; l.position.z = -3 + Math.random() * 6; } }
        if (typeof particles !== 'undefined') particles.emit(new THREE.Vector3(player.pos.x, 0.3, player.pos.z), 40, { color: 0xbfe8ff, speed: 3, life: 0.8, size: 0.25, intensity: 1.5 });
        if (s.n === 1) toast('Te has metido en el río. Sal a la otra orilla… y vuelve a entrar.');
        else if (s.n === 2) toast('Has vuelto a entrar. Pero el agua que te tocó antes ya se fue: el río es otro.');
        else if (s.n === 3) { const rep = (k, title, text) => () => { xpRecord('rio', 'El río de Heráclito', k); achieve('rio'); XP.open('Heráclito de Éfeso', title, text, [XP.note('xp-rio', 'El río de Heráclito', '¿Qué ha cambiado en ti este último año? ¿Qué sigue igual? ¿Eres el mismo?'), ['Seguir', null]]); };
          XP.open('El río de Heráclito', '¿Es el mismo río?', 'Has entrado tres veces, y cada vez el río era distinto: otro color, otra corriente, otras hojas. Heráclito dijo: «No es posible bañarse dos veces en el mismo río». ¿Qué piensas tú?', [
            ['No: el agua siempre es otra', rep('No: el agua siempre es otra', 'Todo fluye', 'Es la idea de Heráclito: todo cambia sin cesar, panta rei, todo fluye. Lo que parece quieto es un equilibrio de fuerzas en movimiento.')],
            ['Sí: el cauce y el nombre siguen siendo los mismos', rep('Sí: el cauce y el nombre son los mismos', 'Algo permanece', 'Muchos filósofos te darían la razón: algo permanece en el cambio, una forma o una medida. Heráclito lo llamaba logos: el orden que guía el cambio. Parménides iría más lejos: el cambio es una ilusión.')],
            ['Tampoco yo soy el mismo que entró la primera vez', rep('Tampoco yo soy el mismo', 'Ni el río ni tú', 'Así lo radicalizó Crátilo, discípulo de Heráclito: ni siquiera una vez puedes bañarte en el mismo río, porque tú también cambias. Heráclito escribió: «En los mismos ríos entramos y no entramos, somos y no somos».')],
          ]); }
        else toast('Otra vez el río es distinto. Todo fluye.');
      } else if (!inW && s.inside) s.inside = false;
    });
    // el fuego siempre vivo de Heráclito
    brazier(W, 94, 12, 0xff8a30);
    W.spots.push({ x: 94, z: 12, r: 3, verb: 'Mirar', label: 'El fuego siempre vivo', on: () => W.zoneIn === Z, act: () => XP.open('Heráclito de Éfeso', 'El fuego siempre vivo', 'Heráclito pensaba que el mundo es como un fuego siempre vivo, que se enciende y se apaga según medida. Nada está quieto, pero el cambio no es caos: sigue un orden, el logos. Y los opuestos se necesitan: el camino hacia arriba y hacia abajo es uno y el mismo.', [['Seguir', null]]) });
  },
  onEnter(W, Z) { Z.s.n = 0; Z.s.inside = false; },
});

// ---------------------------------------------------------------- 6 · EL SUEÑO DE LA MARIPOSA
ZONES.push({
  id: 'mariposa', era: 12, near: 'zhuangzi', title: 'El sueño de la mariposa', sub: '¿Quién sueña a quién?', color: 0xff9ae0,
  b: { x0: 80, x1: 100, z0: -22, z1: 20 }, entry: [90, 0, 16], yaw: 0, exit: [83, 17.5], exitLabel: 'Volver a la China clásica',
  amb: { fog: [0x3a2a5a, 0.03], bg: 0x2a1a4a, exp: 1.3, hideSky: true },
  enterMsg: 'Eres una mariposa. Revolotea de flor en flor, subiendo hacia el pabellón donde alguien duerme.',
  build(W, Z) {
    const s = Z.s; const r = mulberry32(88); const sp = new THREE.Vector3(...Z.entry);
    const meadow = texTiles('mar', 0x3a5a4a, 0x2a4a3a, 10, 0.3); meadow.repeat.set(5, 10);
    zoneBase(W, Z, std(0xffffff, { map: meadow, roughness: 1 })); zoneWalls(W, Z, 1, std(0x2a3a2a), false);
    // flores luminosas en el prado
    const petal = [0xff7ac8, 0xffd060, 0x9a8aff, 0x7affd8, 0xff9a6a];
    for (let k = 0; k < 70; k++) { const fx = 81 + r() * 18, fz = -21 + r() * 40; W.group.add(mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.6, 4), std(0x3a6a3a), fx, 0.3, fz, false, false)); W.group.add(mesh(new THREE.IcosahedronGeometry(0.16, 0), glow(petal[k % 5], 1.6), fx, 0.65, fz, false, false)); }
    // camino de flores gigantes que flotan, subiendo hasta el pabellón
    const pads = []; const N = 13;
    for (let i = 0; i < N; i++) { const a = i * 0.4, rad = 4.5; const px = 90 + Math.sin(a) * rad, pz = 11 - i * 1.2, top = 0.45 + i * 0.42;
      const f = addFloor(W, { kind: 'cyl', x: px, z: pz, r: 1.35, top, th: 0.3, safePos: sp }); f.solid = () => !s.awake; pads.push(f);
      const g = new THREE.Group(); g.position.set(px, top, pz);
      g.add(mesh(new THREE.CylinderGeometry(1.35, 1.1, 0.3, 16), glow(petal[i % 5], 0.7), 0, -0.15, 0, false, true));
      for (let k = 0; k < 6; k++) { const pe = mesh(new THREE.SphereGeometry(0.5, 8, 6), glow(petal[(i + 1) % 5], 1.1, { transparent: true, opacity: 0.8 }), Math.cos((k / 6) * TAU) * 1.3, 0.05, Math.sin((k / 6) * TAU) * 1.3, false, false); pe.scale.set(1, 0.25, 0.6); pe.rotation.y = -(k / 6) * TAU; g.add(pe); }
      W.group.add(g); f.mesh = null; pads[i].g = g; }
    // el pabellón donde duerme Zhuangzi
    const topP = 0.45 + N * 0.42; const pz = 11 - N * 1.2 - 1.8;
    addFloor(W, { kind: 'box', x: 90 + Math.sin(N * 0.4) * 4.5, z: pz, hw: 3.2, hd: 3, top: topP, th: topP, safePos: sp });
    const pav = new THREE.Group(); pav.position.set(90 + Math.sin(N * 0.4) * 4.5, 0, pz); W.group.add(pav);
    pav.add(mesh(new THREE.BoxGeometry(6.4, topP, 6), std(0x4a3a5a), 0, topP / 2, 0)); const red = std(0xa83a3a);
    for (const [a, b] of [[-2.8, -2.6], [2.8, -2.6], [-2.8, 2.6], [2.8, 2.6]]) pav.add(mesh(new THREE.CylinderGeometry(0.15, 0.15, 3, 8), red, a, topP + 1.5, b));
    const roof = mesh(new THREE.ConeGeometry(4.8, 1.6, 4), std(0x2a2a3a), 0, topP + 3.6, 0, false, false); roof.rotation.y = Math.PI / 4; pav.add(roof);
    const sleeper = buildFigure({ robe: 0xe8e0d0, robe2: 0x5a4a8a, skin: 0xe0c098, hair: 0x2a2a2a, beard: 0x2a2a2a, hat: 'none', acc: 'none' }, 0xffffff); sleeper.halo.visible = false;
    sleeper.group.rotation.z = Math.PI / 2; sleeper.group.position.set(0.9, topP + 0.35, 0); pav.add(sleeper.group);
    s.pavX = pav.position.x; s.pavZ = pz; s.topP = topP;
    // mariposas que revolotean
    const bflies = []; for (let k = 0; k < 26; k++) { const g = new THREE.Group(); const wm = glow(petal[k % 5], 1.5, { transparent: true, opacity: 0.9, side: THREE.DoubleSide });
      for (const sd of [-1, 1]) { const w = mesh(new THREE.CircleGeometry(0.22, 8), wm, sd * 0.18, 0, 0, false, false); w.scale.set(1, 1.3, 1); g.add(w); }
      g.position.set(81 + r() * 18, 1 + r() * 6, -20 + r() * 38); W.group.add(g); bflies.push({ g, ph: r() * 6, sp: 0.4 + r() * 0.6, c: g.position.clone() }); }
    W.anim.push((t) => { for (const b of bflies) { b.g.position.set(b.c.x + Math.sin(t * b.sp + b.ph) * 2, b.c.y + Math.sin(t * 2 * b.sp + b.ph) * 0.8, b.c.z + Math.cos(t * b.sp + b.ph) * 2); b.g.children[0].rotation.y = Math.sin(t * 14 + b.ph) * 1.1; b.g.children[1].rotation.y = -Math.sin(t * 14 + b.ph) * 1.1; b.g.rotation.y = t * b.sp + b.ph; }
      pads.forEach((f, i) => { if (f.g) f.g.position.y = f.top + Math.sin(t * 1.3 + i) * 0.04; }); });
    s.pads = pads; s.bflies = bflies;
    W.spots.push({ x: s.pavX, z: pz, r: 3.4, verb: 'Acercarte', label: 'El que duerme en el pabellón', on: () => W.zoneIn === Z && !s.awake && player.pos.y > topP - 0.5, act: () => {
      s.awake = true; zoneFade(W, pads.map((f) => f.g), true, 1.2); zoneAmbient(W, { fog: [0xf0d0b0, 0.02], bg: 0xf0c8a0, exp: 1.05, hideSky: true });
      sleeper.group.rotation.z = 0; sleeper.group.position.set(-1.5, topP, 1.2); zoneTeleport(s.pavX + 0.2, topP, pz + 1.6, 0);
      const rep = (k, title, text) => () => { xpRecord('mariposa', 'El sueño de la mariposa', k); achieve('mariposa'); XP.open('Zhuangzi', title, text, [XP.note('xp-mariposa', 'El sueño de la mariposa', '¿Cómo sabes que no estás soñando ahora mismo? ¿Importa saberlo? ¿Por qué?'), ['Seguir', null]]); };
      XP.open('Zhuangzi', 'Has despertado', 'Te acercas al que duerme… y de pronto despiertas: eres Zhuangzi, tumbado en el pabellón. Hace un momento eras una mariposa que revoloteaba feliz, sin saber nada de Zhuangzi. Ahora no sabes si eres Zhuangzi que soñó ser mariposa, o una mariposa que sueña ser Zhuangzi.', [
        ['Soy Zhuangzi, que soñó ser mariposa', rep('Soy Zhuangzi que soñó ser mariposa', 'La certeza del despierto', 'Es lo que pensaría cualquiera al despertar. Pero ¿cómo lo sabes? Mientras soñabas también estabas seguro de ser mariposa. Descartes se haría la misma pregunta dos mil años después.')],
        ['Soy una mariposa que ahora sueña ser Zhuangzi', rep('Soy una mariposa que sueña', 'Desde dentro no se sabe', 'Zhuangzi no descarta esta posibilidad: desde dentro de un sueño no hay manera segura de saber que se sueña. Quizá lo que llamamos vida despierta también es un sueño.')],
        ['Hay una diferencia, pero todas las cosas se transforman', rep('Todas las cosas se transforman', 'La transformación de las cosas', 'Esa es la conclusión de Zhuangzi: «Entre Zhuangzi y la mariposa tiene que haber alguna diferencia. A esto se le llama la transformación de las cosas». Fluir con los cambios, sin aferrarse a una sola forma de ser.')],
      ]);
    } });
  },
  onEnter(W, Z) { const s = Z.s; s.awake = false; for (const f of s.pads) if (f.g) { f.g.visible = true; if (f.g.userData.s0) f.g.scale.copy(f.g.userData.s0); } },
});

// ---------------------------------------------------------------- 7 · LA ESCALERA DE WITTGENSTEIN
ZONES.push({
  id: 'escalera', era: 7, near: 'wittgenstein', title: 'La escalera de Wittgenstein', sub: 'Sube… y luego tírala', color: 0xe8e8ff,
  b: { x0: -182, x1: -158, z0: -10, z1: 20 }, entry: [-170, 0, 16], yaw: 0, exit: [-170, -33], exitLabel: 'Volver a la época contemporánea',
  amb: { fog: [0x0a0a14, 0.02], bg: 0x05050c, exp: 1.25, hideSky: true },
  enterMsg: 'Una escalera de proposiciones sube hacia la oscuridad. Léelas mientras subes.',
  build(W, Z) {
    const s = Z.s; const sp = new THREE.Vector3(...Z.entry);
    zoneBase(W, Z, std(0x1a1a24, { roughness: 0.6 }));
    W.colliders.push({ t: 0, x0: -183, x1: -182, z0: -11, z1: 21, h: 2 }, { t: 0, x0: -158, x1: -157, z0: -11, z1: 21, h: 2 }, { t: 0, x0: -183, x1: -157, z0: 20, z1: 21, h: 2 }, { t: 0, x0: -183, x1: -172.2, z0: -11, z1: -9.6, h: 2 }, { t: 0, x0: -167.8, x1: -157, z0: -11, z1: -9.6, h: 2 });
    // estrellas
    const pts = []; for (let i = 0; i < 1500; i++) { const a = Math.random() * TAU, e = Math.random() * 1.2 - 0.1, R = 120; pts.push(-170 + Math.cos(a) * Math.cos(e) * R, Math.sin(e) * R, -10 + Math.sin(a) * Math.cos(e) * R); }
    W.group.add(new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(pts, 3)), new THREE.PointsMaterial({ color: 0xffffff, size: 0.35, fog: false })));
    // la escalera: peldaños que suben desde el borde del suelo hasta una plataforma en el vacío
    const props = ['1. El mundo es todo lo que es el caso.', '2. Lo que es el caso, el hecho, es la existencia de estados de cosas.', '3. La figura lógica de los hechos es el pensamiento.', '4. El pensamiento es la proposición con sentido.', '4.11 La totalidad de las proposiciones verdaderas es la ciencia natural entera.', '5.6 Los límites de mi lenguaje significan los límites de mi mundo.', '6.44 No cómo sea el mundo es lo místico, sino que sea.', '6.52 Aun cuando todas las preguntas científicas posibles hayan recibido respuesta, nuestros problemas vitales todavía no se han rozado en lo más mínimo.'];
    const steps = []; const N = 20; const stepM = std(0xe8e8f0, { roughness: 0.4, metalness: 0.2 });
    for (let i = 0; i < N; i++) { const top = 0.4 + i * 0.45, z = -10.5 - i * 1.1;
      const f = addFloor(W, { kind: 'box', x: -170, z, hw: 2, hd: 0.55, top, th: 0.25, safePos: sp }); f.solid = () => !s.gone;
      const m = mesh(new THREE.BoxGeometry(4, 0.25, 1.1), stepM, -170, top - 0.125, z, false, true); W.group.add(m); f.m = m; steps.push(f); }
    for (const sd of [-1, 1]) { const rail = mesh(new THREE.BoxGeometry(0.12, 0.12, N * 1.1 + 1), stepM, -170 + sd * 2, 0, -10.5 - (N - 1) * 0.55, false, false); rail.rotation.x = Math.atan2(0.45, 1.1); rail.position.y = 0.4 + (N - 1) * 0.225 + 1; W.group.add(rail); steps.push({ m: rail, rail: true }); }
    props.forEach((t, i) => { const j = Math.min(N - 1, Math.round((i * (N - 1)) / (props.length - 1))); const l = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture(t.split(' ')[0], t.slice(t.indexOf(' ') + 1)), transparent: true, depthWrite: false, toneMapped: false })); l.scale.set(5.2, 1.3, 1); l.position.set(-170 + (i % 2 ? 3.6 : -3.6), 0.4 + j * 0.45 + 1.6, -10.5 - j * 1.1); W.group.add(l); steps.push({ m: l, rail: true }); });
    // la plataforma en lo alto
    const topY = 0.4 + N * 0.45, pzc = -10.5 - N * 1.1 - 2;
    addFloor(W, { kind: 'box', x: -170, z: pzc, hw: 3.5, hd: 3, top: topY, th: 0.5, safePos: sp });
    W.group.add(mesh(new THREE.BoxGeometry(7, 0.5, 6), std(0xd8d8e8, { roughness: 0.4 }), -170, topY - 0.25, pzc, false, true));
    W.colliders.push({ t: 0, x0: -174, x1: -173.4, z0: pzc - 3.4, z1: pzc + 3, h: 99 }, { t: 0, x0: -166.6, x1: -166, z0: pzc - 3.4, z1: pzc + 3, h: 99 }, { t: 0, x0: -174, x1: -166, z0: pzc - 3.6, z1: pzc - 3, h: 99 });
    const gl = new THREE.PointLight(0xc8d0ff, 20, 20, 1.5); gl.position.set(-170, topY + 3, pzc); W.group.add(gl);
    zoneLabel(W, '7.', 'De lo que no se puede hablar, hay que callar.', -170, topY + 3.2, pzc - 2.5, 1.4);
    Z.exit = [-170, pzc - 1.8]; Z.exitY = topY; s.topY = topY; s.steps = steps;
    // si caes después de tirar la escalera, la escalera vuelve para que puedas subir de nuevo
    W.anim.push(() => { if (W.zoneIn !== Z || !s.gone || player.pos.y > 2) return; s.gone = false; zoneFade(W, steps.map((x) => x.m), false, 1.2); toast('La escalera vuelve a aparecer: puedes subir otra vez.'); });
    W.spots.push({ x: -170, z: pzc + 1, r: 2.6, verb: 'Mirar atrás', label: 'Lo alto de la escalera', on: () => W.zoneIn === Z && !s.gone && player.pos.y > topY - 0.6, act: () => XP.open('Ludwig Wittgenstein', 'Tirar la escalera', '«Mis proposiciones esclarecen de este modo: quien me entiende las reconoce al final como absurdas, cuando a través de ellas, sobre ellas, ha salido fuera de ellas. Tiene, por así decirlo, que tirar la escalera después de haber subido por ella.»', [['Tirar la escalera', () => {
      s.gone = true; zoneFade(W, steps.map((x) => x.m), true, 1.6); player.shake = 0.3; achieve('escalera');
      const rep = (k, title, text) => () => { xpRecord('escalera', 'La escalera de Wittgenstein', k); XP.open('Ludwig Wittgenstein', title, text, [XP.note('xp-escalera', 'La escalera de Wittgenstein', '¿Hay algo importante en tu vida que no se pueda decir con palabras? ¿Cómo lo muestras?'), ['Seguir', null]]); };
      XP.open('Ludwig Wittgenstein', 'Ya no hay escalera', 'La escalera ha desaparecido. Estás en lo alto, en silencio, frente a las estrellas. Wittgenstein termina su libro así: «De lo que no se puede hablar, hay que callar». ¿Qué crees que quería decir?', [
        ['Que hay cosas importantes que solo se muestran, no se dicen', rep('Hay cosas que solo se muestran', 'Mostrar, no decir', 'Esa es la lectura más común: la ética, el sentido de la vida o lo místico no caben en proposiciones como los hechos, pero se muestran en cómo vivimos. Wittgenstein valoraba ese silencio como algo profundo, no como un vacío.')],
        ['Que lo que no se puede decir no tiene importancia', rep('Lo que no se dice no importa', 'Otra lectura posible', 'Algunos filósofos, como los del Círculo de Viena, leyeron así a Wittgenstein: lo que no puede verificarse carece de sentido. Pero él mismo dijo que lo más importante de su libro era precisamente lo que no había escrito.')],
        ['Que la filosofía es una escalera: sirve para subir y luego se deja', rep('La filosofía es una escalera', 'La filosofía como actividad', 'Para Wittgenstein la filosofía no es una doctrina, sino una actividad que aclara el pensamiento. Cuando ha hecho su trabajo, uno ve el mundo correctamente… y ya no necesita la escalera.')],
      ]);
    }], ['Todavía no', null]]) });
  },
  onEnter(W, Z) { const s = Z.s; s.gone = false; for (const x of s.steps) { x.m.visible = true; if (x.m.userData.s0) x.m.scale.copy(x.m.userData.s0); } },
});
