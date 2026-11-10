// ============================================================================
//  TRES EXPERIMENTOS MENTALES MÁS
//    · El dilema del tranvía (junto a Mill, siglo XIX)
//    · La habitación china (junto a Ada Lovelace, el taller de los científicos)
//    · La máquina de experiencias (junto a Epicuro, helenismo)
// ============================================================================

// ---------------------------------------------------------------- 8 · EL DILEMA DEL TRANVÍA
ZONES.push({
  id: 'tranvia', era: 6, near: 'mill', title: 'El dilema del tranvía', sub: '¿Mueves la palanca?', color: 0xffc050,
  b: { x0: 80, x1: 100, z0: -22, z1: 20 }, entry: [90, 0, 16], yaw: 0, exit: [83, 17.5], exitLabel: 'Volver al siglo XIX',
  amb: { fog: [0x5a5048, 0.012], bg: 0x6a5e54, exp: 1.2, hideSky: true },
  enterMsg: 'Un tranvía se ha quedado sin frenos. Acércate a la palanca de las vías y decide.',
  build(W, Z) {
    const s = Z.s; const r = mulberry32(51); const sp = new THREE.Vector3(...Z.entry);
    const cob = texTiles('tranvia', 0x7a7068, 0x4a443e, 12, 0.18); cob.repeat.set(5, 10);
    zoneBase(W, Z, std(0xffffff, { map: cob, roughness: 0.95 })); zoneWalls(W, Z, 1, std(0x3a3430), false);
    // casas de ladrillo que cierran la calle
    for (const sd of [-1, 1]) for (let z = -20; z <= 18; z += 6.5) { const h = 6 + r() * 5; W.group.add(mesh(new THREE.BoxGeometry(5, h, 6), std([0x8a4a3a, 0x7a5a4a, 0x9a6a4a][Math.floor(r() * 3)], { roughness: 0.95 }), 90 + sd * 13, h / 2, z, false, true));
      for (let k = 0; k < 3; k++) W.group.add(mesh(new THREE.BoxGeometry(0.1, 1, 0.8), glow(0xffd890, 0.6), 90 + sd * 10.45, 2 + k * 1.8, z + (r() - 0.5) * 3, false, false)); }
    // las vías: tramo común, bifurcación y dos ramales
    const railM = std(0x9a9aa0, { metalness: 0.7, roughness: 0.35 }), sleeperM = std(0x4a3424, { roughness: 1 });
    const track = (x0, z0, x1, z1) => {
      const len = Math.hypot(x1 - x0, z1 - z0), ang = Math.atan2(-(z1 - z0), x1 - x0); const g = new THREE.Group(); g.position.set(x0, 0, z0); g.rotation.y = ang;
      for (const sd of [-0.5, 0.5]) g.add(mesh(new THREE.BoxGeometry(len, 0.12, 0.1), railM, len / 2, 0.08, sd, false, false));
      for (let k = 0.4; k < len; k += 0.9) g.add(mesh(new THREE.BoxGeometry(0.22, 0.06, 1.5), sleeperM, k, 0.03, 0, false, false));
      W.group.add(g);
    };
    track(80.5, -7, 88, -7); track(88, -7, 99.5, -7); track(88, -7, 99.5, -13.5);
    W.colliders.push({ t: 0, x0: 80, x1: 100, z0: -22, z1: -3.2, h: 2 });
    for (let x = 80.5; x <= 99.5; x += 1.5) W.group.add(mesh(new THREE.BoxGeometry(0.08, 0.9, 0.08), std(0x2a2a2a), x, 0.45, -3.2, false, false));
    W.group.add(mesh(new THREE.BoxGeometry(19.5, 0.06, 0.06), std(0x2a2a2a), 90, 0.85, -3.2, false, false));
    // el tranvía
    const tram = new THREE.Group(); W.group.add(tram);
    tram.add(mesh(new THREE.BoxGeometry(3, 1.7, 1.6), std(0xb83a2a, { roughness: 0.6 }), 0, 1.05, 0, false, false));
    tram.add(mesh(new THREE.BoxGeometry(3.1, 0.18, 1.7), std(0xe8d8b0), 0, 2, 0, false, false));
    for (const sd of [-1, 1]) tram.add(mesh(new THREE.BoxGeometry(2.4, 0.6, 0.04), glow(0xffe0a0, 0.8), 0, 1.35, sd * 0.82, false, false));
    tram.add(mesh(new THREE.BoxGeometry(0.04, 0.6, 1.1), glow(0xfff0c0, 1.4), 1.52, 1.35, 0, false, false));
    // personas en las vías (en un experimento mental nadie sale herido)
    const look = (k) => ({ robe: [0x5a6a8a, 0x8a5a4a, 0x4a7a5a, 0x7a6a3a, 0x6a4a7a, 0x3a5a7a][k % 6], hair: [0x2a1a10, 0x8a6a3a, 0x1a1a1a][k % 3], beard: false });
    s.five = [0, 1, 2, 3, 4].map((k) => zoneFigure(W, look(k), 95 + k * 0.95, -7 + (k % 2 ? 0.25 : -0.25), -Math.PI / 2));
    s.one = [zoneFigure(W, look(5), 97, -12.3, -Math.PI / 2 + 0.5)];
    // la palanca
    const lever = new THREE.Group(); lever.position.set(86.5, 0, -2.4); W.group.add(lever);
    lever.add(mesh(new THREE.BoxGeometry(0.7, 0.4, 0.5), std(0x3a3a3a), 0, 0.2, 0, false, false));
    const stick = new THREE.Group(); stick.position.y = 0.4; lever.add(stick);
    stick.add(mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.3, 6), std(0x8a8a8a, { metalness: 0.7 }), 0, 0.65, 0, false, false));
    stick.add(mesh(new THREE.SphereGeometry(0.13, 10, 8), std(0xd83a2a), 0, 1.3, 0, false, false)); stick.rotation.z = 0.35;
    zoneLabel(W, 'La palanca', 'Desvía el tranvía al otro ramal', 86.5, 2.6, -2.4, 0.75);
    // el puente peatonal, al fondo, con una persona corpulenta
    const stoneM = std(0x8a8070, { roughness: 1 });
    for (const x of [82.5, 97.5]) W.group.add(mesh(new THREE.BoxGeometry(1, 3.2, 1.2), stoneM, x, 1.6, -17, false, false));
    W.group.add(mesh(new THREE.BoxGeometry(16, 0.4, 1.8), stoneM, 90, 3.3, -17, false, false));
    for (const sd of [-1, 1]) W.group.add(mesh(new THREE.BoxGeometry(16, 0.7, 0.1), std(0x3a3a3a), 90, 3.85, -17 + sd * 0.85, false, false));
    track(80.5, -17.5, 99.5, -17.5);
    const big = zoneFigure(W, { robe: 0x4a4a5a, hair: 0x3a2a1a, beard: 0x3a2a1a }, 90, -17, 0); big.position.y = 3.5; big.scale.set(1.35, 1.1, 1.35); W.colliders.pop();
    zoneLabel(W, 'El puente', 'Otra versión del dilema', 94, 2.6, -2.4, 0.75);
    zoneLabel(W, 'El dilema del tranvía', 'Philippa Foot, 1967', 90, 8.5, -10);
    s.tram = tram; s.stick = stick;
    const PATH = { A: [[81.5, -7], [88, -7], [92.8, -7]], B: [[81.5, -7], [88, -7], [92.6, -9.6]] };
    const at = (pts, d) => { let rem = d; for (let i = 0; i < pts.length - 1; i++) { const [ax, az] = pts[i], [bx, bz] = pts[i + 1]; const l = Math.hypot(bx - ax, bz - az); if (rem <= l) { const u = rem / l; return [ax + (bx - ax) * u, az + (bz - az) * u, Math.atan2(-(bz - az), bx - ax)]; } rem -= l; } const [ax, az] = pts[pts.length - 2], [bx, bz] = pts[pts.length - 1]; return [bx, bz, Math.atan2(-(bz - az), bx - ax), true]; };
    s.reset = () => { s.d = 0; s.phase = 'roll'; s.branch = 'A'; s.hop = 0; s.lever = false; s.bridge = false; s.stick.rotation.z = 0.35;
      s.five.forEach((f, k) => f.position.set(95 + k * 0.95, 0, -7 + (k % 2 ? 0.25 : -0.25))); s.one[0].position.set(97, 0, -12.3); const p = at(PATH.A, 0); tram.position.set(p[0], 0, p[1]); tram.rotation.y = p[2]; };
    s.reset();
    W.anim.push((t, dt) => {
      if (!dt || W.zoneIn !== Z) return;
      if (s.phase === 'roll' || s.phase === 'go') {
        const lim = s.phase === 'roll' ? 5.2 : 99; s.d = Math.min(lim, s.d + dt * (s.phase === 'roll' ? 0.9 : 2.6));
        const p = at(PATH[s.branch], s.d); tram.position.set(p[0], Math.abs(Math.sin(t * 9)) * 0.03, p[1]); tram.rotation.y = p[2];
        if (s.phase === 'go' && p[3]) { s.phase = 'stop'; s.hop = 0.0001; Audio.tone && Audio.tone(180, 0.6, { type: 'sawtooth', vol: 0.06, slide: 0.4 });
          if (typeof particles !== 'undefined') particles.emit(new THREE.Vector3(p[0] + 1.4, 0.3, p[1]), 50, { color: 0xffc060, speed: 4, life: 0.6, size: 0.2, intensity: 2 });
          toast('¡Los frenos de emergencia funcionaron! En un experimento mental nadie sale herido… pero tu decisión cuenta.'); }
      }
      if (s.hop > 0 && s.hop < 1) { s.hop = Math.min(1, s.hop + dt * 1.5); const who = s.branch === 'A' ? s.five : s.one;
        who.forEach((f, k) => { f.position.z += dt * 2.2 * (k % 2 ? 1 : -1) * (s.hop < 1 ? 1 : 0); f.position.y = Math.sin(s.hop * Math.PI) * 0.5; }); }
    });
    const rec = (k) => xpRecord('tranvia', 'El dilema del tranvía', k);
    const card = (title, text, ops) => XP.open('El dilema del tranvía', title, text, ops);
    const finalQ = () => {
      const pull = s.lever === 'mover', push = s.bridge === 'empujar';
      const msg = pull && !push ? 'Moviste la palanca pero no empujaste: como la mayoría de las personas. Y sin embargo, en los dos casos eran cinco contra uno. ¿Qué cambia? Muchos dicen: empujar es usar a una persona como un simple medio, y eso, como enseñó Kant, no se hace nunca.'
        : pull && push ? 'Fuiste coherente con las consecuencias: en los dos casos salvaste a cinco. Es la lógica del utilitarismo de Mill y Bentham: lo correcto es lo que produce más bienestar para más personas. ¿Hay algo que no se pueda hacer, aunque salve a muchos?'
          : !pull && !push ? 'No interviniste en ningún caso: para ti no se puede decidir quién sufre. Es una postura cercana a Kant: hay acciones que no se hacen, aunque las consecuencias sean malas. ¿Y si fueran mil personas en lugar de cinco?'
            : 'No moviste la palanca, pero sí empujarías: una combinación rara. ¿Qué diferencia ves entre los dos casos? Piénsalo: quizás descubras qué principio estás usando sin saberlo.';
      card('Tus dos decisiones', msg, [XP.note('xp-tranvia', 'El dilema del tranvía', 'Inventa tu propia versión del dilema del tranvía con un caso de la vida real (un hospital, un coche autónomo, una catástrofe). ¿Qué harías y por qué?'), ['Seguir', null]]);
      achieve('tranvia');
    };
    W.spots.push({ x: 86.5, z: -1.4, r: 2.2, verb: 'Decidir', label: 'La palanca', on: () => W.zoneIn === Z && !s.lever, act: () => {
      s.phase = s.phase === 'roll' ? 'wait' : s.phase;
      const go = (k, branch, title, text) => () => { s.lever = k; rec('La palanca: ' + k); s.branch = branch; s.phase = 'go'; if (branch === 'B') s.stick.rotation.z = -0.35; Audio.click();
        setTimeout(() => card(title, text, [['Ver la otra versión: el puente', () => toast('Acércate al cartel «El puente», a la derecha.')]]), 2600); };
      card('¿Mueves la palanca?', 'Un tranvía sin frenos avanza hacia cinco personas que están en la vía y no pueden apartarse. Tú estás junto a una palanca: si la mueves, el tranvía se desviará a otro ramal, donde hay una sola persona. ¿Qué haces?', [
        ['Mover la palanca: es mejor que sufra uno que cinco', go('mover', 'B', 'Elegiste las consecuencias', 'Es la respuesta del utilitarismo de John Stuart Mill: lo correcto es lo que produce el mayor bien para el mayor número. Uno es menos que cinco. Pero tu mano movió la palanca: ahora eres parte de lo que pasó.')],
        ['No tocar nada: no me corresponde decidir quién sufre', go('no mover', 'A', 'Elegiste no intervenir', 'Muchos filósofos te darían la razón: no es lo mismo dejar que algo pase que hacerlo pasar. Pero otros preguntan: ¿no decidir también es una decisión? Las cinco personas podrían reprocharte que podías ayudarlas.')],
      ]);
    } });
    W.spots.push({ x: 94, z: -1.4, r: 2.2, verb: 'Pensar', label: 'El puente', on: () => W.zoneIn === Z && s.lever && !s.bridge, act: () => {
      const res = (k, title, text) => () => { s.bridge = k; rec('El puente: ' + k); card(title, text, [['¿Y qué dicen mis dos decisiones?', finalQ]]); };
      card('El puente', 'Ahora el tranvía corre hacia cinco personas, pero no hay palanca. Estás en un puente sobre la vía, junto a una persona muy corpulenta. Si la empujas a la vía, su cuerpo frenaría el tranvía y las cinco se salvarían. Ella no lo sabe. ¿Qué haces?', [
        ['Empujar: también es uno contra cinco', res('empujar', 'Coherencia con las consecuencias', 'Desde el utilitarismo, el número es el mismo que con la palanca: uno contra cinco. Pero a casi todos nos parece mucho peor. ¿Por qué será?')],
        ['No empujar: no puedo usar a una persona como un objeto', res('no empujar', 'La dignidad de la persona', 'Es la idea de Kant: trata siempre a las personas como fines, nunca solo como medios. Empujar a alguien para frenar un tranvía es usarlo como una herramienta.')],
      ]);
    } });
  },
  onEnter(W, Z) { Z.s.reset(); },
});

// ---------------------------------------------------------------- 9 · LA HABITACIÓN CHINA
const CHINA_QA = [['你好吗？', '我很好，谢谢。', '¿Cómo estás?', 'Muy bien, gracias.'], ['你喜欢茶吗？', '我很喜欢茶。', '¿Te gusta el té?', 'Me gusta mucho el té.'], ['天空是什么颜色？', '天空是蓝色的。', '¿De qué color es el cielo?', 'El cielo es azul.']];
ZONES.push({
  id: 'china', era: 18, near: 'lovelace', title: 'La habitación china', sub: '¿Entiende una máquina?', color: 0x8ad0ff,
  b: { x0: 82, x1: 98, z0: -4, z1: 20 }, entry: [90, 0, 16], yaw: 0, exit: [84.5, 17.5], exitLabel: 'Volver al taller',
  amb: { fog: [0x14121a, 0.03], bg: 0x0a0a10, exp: 1.25, hideSky: true },
  enterMsg: 'Estás encerrado en una habitación. No sabes chino. Por la ranura de la izquierda entran tarjetas…',
  build(W, Z) {
    const s = Z.s; const r = mulberry32(64);
    const floor = texTiles('china', 0x5a4a3a, 0x3a2e24, 6, 0.15); floor.repeat.set(4, 6);
    zoneBase(W, Z, std(0xffffff, { map: floor, roughness: 0.9 })); zoneWalls(W, Z, 4.2, std(0x3a3240, { roughness: 1 }));
    W.group.add(mesh(new THREE.BoxGeometry(18, 0.3, 26), std(0x24202a), 90, 4.35, 8, false, false));
    // estanterías llenas de libros de reglas
    for (const x of [83.2, 96.8]) for (let z = 8; z <= 18; z += 3.4) { W.group.add(mesh(new THREE.BoxGeometry(0.6, 3.6, 3), std(0x4a3424), x, 1.8, z, false, false));
      for (let k = 0; k < 18; k++) W.group.add(mesh(new THREE.BoxGeometry(0.45, 0.55 + r() * 0.2, 0.14), std([0x8a3a2a, 0x2a4a6a, 0x5a6a3a, 0xa88a4a][k % 4]), x + (x < 90 ? 0.1 : -0.1), 0.6 + Math.floor(k / 6) * 1.1, z - 1.2 + (k % 6) * 0.45, false, false)); }
    // escritorio con el gran libro de reglas y una lámpara
    W.group.add(mesh(new THREE.BoxGeometry(3.2, 0.12, 1.6), std(0x6a4a2a), 90, 1, 2, false, false));
    for (const [dx, dz] of [[-1.4, -0.6], [1.4, -0.6], [-1.4, 0.6], [1.4, 0.6]]) W.group.add(mesh(new THREE.BoxGeometry(0.1, 1, 0.1), std(0x4a3420), 90 + dx, 0.5, 2 + dz, false, false));
    W.colliders.push({ t: 0, x0: 88.3, x1: 91.7, z0: 1.1, z1: 2.9, h: 1.1 });
    const book = mesh(new THREE.BoxGeometry(1.1, 0.18, 0.8), std(0xd8c8a0), 90, 1.15, 2, false, false); W.group.add(book);
    W.group.add(mesh(new THREE.BoxGeometry(1.15, 0.06, 0.85), std(0x8a2a1a), 90, 1.06, 2, false, false));
    zoneLabel(W, 'El libro de reglas', 'Si recibes estos signos, responde estos otros', 90, 2.6, 2, 0.8);
    const lamp = new THREE.PointLight(0xffd8a0, 18, 14, 1.6); lamp.position.set(90, 3.2, 3); W.group.add(lamp);
    W.group.add(mesh(new THREE.SphereGeometry(0.22, 12, 8), glow(0xffe0b0, 2), 90, 3.4, 3, false, false));
    // ranuras de entrada y salida
    const slot = (x, label, sub) => { W.group.add(mesh(new THREE.BoxGeometry(0.2, 0.25, 1.2), glow(0x8ad0ff, 1.2), x, 1.3, 4, false, false)); zoneLabel(W, label, sub, x + (x < 90 ? 1.2 : -1.2), 2.4, 4, 0.75); };
    slot(82.05, 'Entrada', 'Llegan preguntas'); slot(97.95, 'Salida', 'Envía tu respuesta');
    const paper = (x) => { const p = mesh(new THREE.BoxGeometry(0.5, 0.02, 0.7), glow(0xfff8e0, 0.9), x, 1.3, 4, false, false); p.visible = false; W.group.add(p); return p; };
    s.pin = paper(82.6); s.pout = paper(97.3);
    zoneLabel(W, 'La habitación china', 'John Searle, 1980', 90, 3.6, -3.4);
    // afuera, una hablante de chino lee tus respuestas (la oyes al otro lado de la pared)
    s.reset = () => { s.n = 0; s.step = 'in'; s.pin.visible = true; s.pout.visible = false; };
    s.reset();
    W.anim.push((t) => { if (W.zoneIn !== Z) return; if (s.pin.visible) s.pin.position.y = 1.3 + Math.sin(t * 3) * 0.04; });
    const card = (title, text, ops) => XP.open('La habitación china', title, text, ops);
    const rec = (k) => xpRecord('china', 'La habitación china', k);
    const finalQ = () => {
      const res = (k, title, text) => () => { rec(k); achieve('china'); card(title, text, [['¿Y las inteligencias artificiales?', () => card('¿Y una inteligencia artificial?', 'Hoy hay programas que conversan, escriben poemas y responden preguntas en cualquier idioma. Aprenden patrones de millones de textos. Searle preguntaría: ¿entienden lo que dicen, o son una habitación china gigante? Ada Lovelace ya escribió en 1843 que la máquina analítica «no tiene pretensión de originar nada». ¿Tú qué crees?',
        [XP.note('xp-china', 'La habitación china', '¿Qué es entender algo? Escribe un ejemplo de algo que sabes repetir pero no entiendes, y algo que entiendes de verdad. ¿Qué diferencia hay?'), ['Seguir', null]])]]); };
      card('¿Entiendes chino?', `Afuera creen que hablas chino perfectamente: respondiste bien tres veces. Por cierto: te preguntaron «${CHINA_QA.map((q) => q[2]).join(' », « ')}» y respondiste «${CHINA_QA.map((q) => q[3]).join(' », « ')}». Pero tú solo seguías reglas para copiar signos. Entonces…`, [
        ['No entiendo nada: solo sigo reglas, sin saber qué significan', res('No: solo sigo reglas', 'Sintaxis no es semántica', 'Es la conclusión de Searle: manipular símbolos según reglas (sintaxis) no basta para entender su significado (semántica). Por eso pensaba que un programa, por muy bien que responda, no entiende.')],
        ['Yo no, pero la habitación entera (yo, el libro y las reglas) sí entiende', res('El sistema entero entiende', 'La respuesta del sistema', 'Es la objeción más famosa a Searle: tal vez ninguna neurona de tu cerebro entiende español, pero tú sí. Quizás el entendimiento está en el sistema completo, no en una de sus piezas.')],
        ['Si respondo siempre bien, eso es entender', res('Si respondo bien, entiendo', 'El test de Turing', 'Es la idea de Alan Turing: si una máquina conversa de modo que no podemos distinguirla de una persona, deberíamos decir que piensa. Lo que cuenta es la conducta, no lo que pasa por dentro.')],
      ]);
    };
    W.spots.push({ x: 83.4, z: 4, r: 1.9, verb: 'Tomar', get label() { return `La tarjeta de la ranura · ${s.n}/3`; }, on: () => W.zoneIn === Z && s.step === 'in', act: () => {
      const q = CHINA_QA[s.n]; s.pin.visible = false; s.step = 'book'; Audio.pickup && Audio.pickup();
      card('Una tarjeta', `Por la ranura entra una tarjeta con estos signos: ${q[0]}  No tienes ni idea de qué significan. Pero en el escritorio hay un gran libro de reglas escrito en español.`, [['Buscar en el libro de reglas', () => toast('Lleva la tarjeta al libro de reglas del escritorio.')]]);
    } });
    W.spots.push({ x: 90, z: 3.6, r: 2, verb: 'Consultar', label: 'El libro de reglas', on: () => W.zoneIn === Z && s.step === 'book', act: () => {
      const q = CHINA_QA[s.n]; s.step = 'out'; Audio.click();
      card('El libro de reglas', `Buscas la forma de los signos en el libro. La regla dice: «Si recibes ${q[0]}, responde ${q[1]}». Copias los signos con cuidado, trazo a trazo, sin saber qué dicen.`, [['Llevarla a la ranura de salida', () => toast('Lleva tu respuesta a la ranura de salida, a la derecha.')]]);
    } });
    W.spots.push({ x: 96.6, z: 4, r: 1.9, verb: 'Enviar', label: 'La ranura de salida', on: () => W.zoneIn === Z && s.step === 'out', act: () => {
      s.pout.visible = true; zoneFade(W, s.pout, true, 0.8); s.n++; Audio.correct && Audio.correct();
      const praise = ['Desde afuera se oye: «¡Responde perfecto! Ahí dentro hay alguien que habla chino».', 'Afuera aplauden: «¡Qué respuesta tan natural! Habla chino como una nativa».', 'Afuera dicen: «No hay duda: la persona de la habitación entiende chino perfectamente».'][s.n - 1];
      toast(praise);
      if (s.n < 3) { s.step = 'in'; setTimeout(() => { s.pin.visible = true; zoneFade(W, s.pin, false, 0.5); toast('Llega otra tarjeta por la ranura de entrada.'); }, 1800); }
      else { s.step = 'done'; setTimeout(finalQ, 1600); }
    } });
  },
  onEnter(W, Z) { Z.s.reset(); },
});

// ---------------------------------------------------------------- 10 · LA MÁQUINA DE EXPERIENCIAS
ZONES.push({
  id: 'maquina', era: 2, near: 'epicuro', title: 'La máquina de experiencias', sub: '¿Te conectarías para siempre?', color: 0xff80e0,
  b: { x0: 80, x1: 100, z0: -14, z1: 20 }, entry: [90, 0, 16], yaw: 0, exit: [83, 17.5], exitLabel: 'Volver al Jardín de Epicuro',
  amb: { fog: [0x1a2430, 0.026], bg: 0x101820, exp: 1.25, hideSky: true },
  enterMsg: 'Bienvenido al laboratorio. Al fondo brilla la máquina de experiencias. Acércate a ella.',
  build(W, Z) {
    const s = Z.s; const r = mulberry32(93);
    const tiles = texTiles('maquina', 0xd8dce0, 0x9aa0a8, 8, 0.06); tiles.repeat.set(5, 8);
    zoneBase(W, Z, std(0xffffff, { map: tiles, roughness: 0.4, metalness: 0.1 })); zoneWalls(W, Z, 4, std(0x2a3440, { roughness: 0.7 }));
    // paneles de luz y pantallas
    for (const sd of [-1, 1]) for (let z = -10; z <= 16; z += 4.5) { W.group.add(mesh(new THREE.BoxGeometry(0.08, 1.4, 2.6), glow([0x60d0ff, 0x80ffd0, 0xff80e0][Math.floor(r() * 3)], 0.7), 90 + sd * 9.9, 2.2, z, false, false)); }
    // la máquina: cápsula de cristal con luz que late
    const pod = new THREE.Group(); pod.position.set(90, 0, -7); W.group.add(pod);
    pod.add(mesh(new THREE.CylinderGeometry(1.6, 1.8, 0.5, 24), std(0x3a4450, { metalness: 0.7, roughness: 0.3 }), 0, 0.25, 0, false, false));
    pod.add(mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.4, 24), std(0x3a4450, { metalness: 0.7, roughness: 0.3 }), 0, 3.6, 0, false, false));
    pod.add(mesh(new THREE.CylinderGeometry(1.4, 1.4, 3, 24, 1, true), new THREE.MeshStandardMaterial({ color: 0xc8f0ff, transparent: true, opacity: 0.25, roughness: 0.05, metalness: 0.3, side: THREE.DoubleSide }), 0, 2, 0, false, false));
    const core = mesh(new THREE.IcosahedronGeometry(0.7, 1), glow(0xff80e0, 2.2), 0, 2, 0, false, false); pod.add(core);
    for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2; const c = mesh(new THREE.CylinderGeometry(0.06, 0.06, 4.5, 6), std(0x1a1a1a), Math.cos(a) * 2.6, 0.1, Math.sin(a) * 2.6 - 1, false, false); c.rotation.set(Math.PI / 2, 0, a); pod.add(c); }
    W.colliders.push({ t: 1, x: 90, z: -7, r: 2, h: 4 });
    const pl = new THREE.PointLight(0xff80e0, 14, 16, 1.6); pl.position.set(90, 2.5, -5); W.group.add(pl);
    zoneLabel(W, 'La máquina de experiencias', 'Robert Nozick, 1974', 90, 5.2, -7);
    zoneFigure(W, { robe: 0xf0f0f0, hair: 0x8a8a8a, beard: false, acc: 'scroll' }, 85.5, -4, Math.PI / 2 + 0.4);
    zoneLabel(W, 'La científica', 'Te ofrece la vida perfecta', 85.5, 2.8, -4, 0.75);
    // el sueño: luces de colores, flores y estrellas que solo existen dentro de la máquina
    const dream = new THREE.Group(); W.group.add(dream); dream.visible = false; const orbs = [];
    for (let k = 0; k < 70; k++) { const o = mesh(new THREE.IcosahedronGeometry(0.15 + r() * 0.3, 0), glow([0xffd060, 0xff80e0, 0x80ffd0, 0x8ab0ff, 0xffffff][k % 5], 2), 81 + r() * 18, 0.6 + r() * 6, -12 + r() * 30, false, false); o.userData.ph = r() * 6; dream.add(o); orbs.push(o); }
    for (let k = 0; k < 6; k++) { const a = mesh(new THREE.TorusGeometry(2.5 + k * 0.8, 0.06, 6, 40), glow([0xffd060, 0xff80e0, 0x80ffd0][k % 3], 1.6), 90, 3 + k * 0.4, 4, false, false); a.rotation.x = Math.PI / 2; dream.add(a); orbs.push(a); }
    s.dream = 0; s.used = false;
    const card = (title, text, ops) => XP.open('La máquina de experiencias', title, text, ops);
    const rec = (k) => xpRecord('maquina', 'La máquina de experiencias', k);
    const DREAM_AMB = { fog: [0xffb0e8, 0.018], bg: 0xffd0f0, exp: 1.7, hideSky: true };
    const wake = () => {
      s.dream = 0; dream.visible = false; zoneAmbient(W, Z.amb); const f = $('#flash'); if (f) { f.classList.remove('on'); void f.offsetWidth; f.classList.add('on'); }
      const res = (k, title, text) => () => { rec('Al despertar: ' + k); achieve('maquina'); card(title, text, [XP.note('xp-maquina', 'La máquina de experiencias', '¿Qué cosas de tu vida no cambiarías por ninguna experiencia simulada? ¿Por qué importa que sean reales?'), ['Seguir', null]]); };
      card('Despiertas', 'La científica abre la cápsula. Durante unos minutos fuiste feliz: todo era hermoso y fácil. Pero nada de eso pasó de verdad: no hiciste nada, no conociste a nadie. ¿Importa?', [
        ['No importa: lo sentí, y eso es lo único que cuenta', res('no importa', 'El placer es lo que cuenta', 'Es la respuesta del hedonismo: lo único bueno en sí mismo es el placer. Pero Epicuro, que te espera afuera, matizaría: el mayor placer es la tranquilidad del alma, la amistad y una vida sencilla… y esos se viven de verdad.')],
        ['Sí importa: quiero hacer cosas y conocer personas de verdad', res('sí importa', 'Más que sentir', 'Es la conclusión de Nozick: queremos hacer cosas, no solo sentir que las hacemos; ser alguien, no un cuerpo flotando en un tanque; y estar en contacto con la realidad. Por eso casi nadie se conectaría para siempre.')],
      ]);
    };
    W.anim.push((t, dt) => {
      if (W.zoneIn !== Z) return; core.rotation.y = t * 0.8; core.scale.setScalar(1 + Math.sin(t * 2.4) * 0.08);
      if (s.dream > 0 && dt) { s.dream += dt; for (const o of orbs) { o.position.y += Math.sin(t * 1.5 + (o.userData.ph || 0)) * dt * 0.4; o.rotation.y += dt * 0.6; }
        if (s.dream > 2 && !s.t1) { s.t1 = true; toast('Todo es perfecto. Ganas, te aplauden, todos te quieren… sin esfuerzo.'); }
        if (s.dream > 6 && !s.t2) { s.t2 = true; toast('Demasiado perfecto…'); }
        if (s.dream > 9 && G.state === 'play') wake(); }
    });
    const enter = () => { zoneTeleport(90, 0, 7, 0); s.dream = 0.001; s.t1 = s.t2 = false; dream.visible = true; zoneAmbient(W, DREAM_AMB); Audio.portal && Audio.portal(); if (Music && Music.sting) Music.sting('victory'); };
    W.spots.push({ x: 90, z: -4.2, r: 2.4, verb: 'Mirar', label: 'La máquina de experiencias', on: () => W.zoneIn === Z && s.dream === 0, act: () => {
      const no = (k, title, text) => () => { rec(k); achieve('maquina'); card(title, text, [['Probar la máquina un momento, solo para ver', () => { rec('Probé la máquina un momento'); enter(); }], XP.note('xp-maquina', 'La máquina de experiencias', '¿Qué cosas de tu vida no cambiarías por ninguna experiencia simulada? ¿Por qué importa que sean reales?'), ['Seguir', null]]); };
      card('¿Te conectarías?', 'La científica te explica: «Esta máquina te hace vivir la vida que sueñes: ser una estrella, tener los mejores amigos, viajar a donde quieras. Todo se sentirá totalmente real, y no recordarás que estás conectado. En realidad estarás flotando en esta cápsula». ¿Te conectas para siempre?', [
        ['Sí, me conecto: lo que importa es sentirme feliz', () => { rec('Me conecto para siempre'); enter(); }],
        ['No: prefiero una vida real, aunque sea más difícil', no('No me conecto', 'Prefieres lo real', 'Es lo que responde casi todo el mundo, y por eso Nozick inventó este experimento: si solo importara sentir placer, todos nos conectaríamos. Que no queramos muestra que valoramos otras cosas: hacer, ser y conocer la realidad.')],
        ['Solo un rato, como unas vacaciones', no('Solo un rato', 'Placeres con medida', 'Epicuro estaría de acuerdo: el placer es bueno, pero con medida y sin que nos haga esclavos. Unas vacaciones en la máquina… ¿y si después no quisieras volver?')],
      ]);
    } });
    s.reset = () => { s.dream = 0; dream.visible = false; };
  },
  onEnter(W, Z) { Z.s.reset(); },
  onExit(W, Z) { Z.s.reset(); },
});
