// ============================================================================
//  JUEGOS DE LA MENTE (mundo XXXVIII · El laberinto de la mente): experimentos
//  clásicos de la psicología convertidos en juegos breves, cada uno con su
//  explicación. Se abren desde los lugares del mundo (poi.juego) y desde la pausa.
//   · reaccion: el tiempo de reacción (Wundt, Donders)        · stroop: el efecto Stroop (1935)
//   · memoria: la memoria de dígitos (Miller, 1956; H. M.)     · ilusiones: ilusiones visuales clásicas
//   · asch: el experimento de conformidad de Asch (1951)       · sesgos: heurísticos y sesgos (Kahneman y Tversky)
//   · manchas: manchas de tinta y pareidolia (Rorschach, 1921)
// ============================================================================
ACH.push({ id: 'psicologo', i: '🧠', n: 'Explorador de la mente', d: 'Juega cinco de los juegos de la mente en el laberinto de la mente.' });
const MJ = {
  KEY: 'odisea-razon.juegos-mente',
  T: {
    eye: 'El laberinto de la mente', menu: '🧠 Juegos de la mente', again: 'Jugar otra vez', close: 'Cerrar', next: 'Siguiente', start: 'Empezar', pts: (n) => `+${n} sabiduría`,
    reaccion: '⚡ Jugar: tu tiempo de reacción', stroop: '🎨 Jugar: el efecto Stroop', memoria: '🔢 Jugar: ¿cuántos números recuerdas?', ilusiones: '👁 Jugar: ilusiones visuales', asch: '📏 Jugar: el experimento de Asch', sesgos: '🎲 Jugar: las trampas de la mente', manchas: '🦋 Jugar: manchas de tinta',
    rH: 'Tu tiempo de reacción', rI: 'Toca la pantalla en cuanto se ponga verde. No te adelantes. Haremos cinco intentos.', rWait: 'Espera el verde…', rGo: '¡AHORA!', rEarly: '¡Demasiado pronto! Espera el verde.', rMs: (ms) => `${ms} milisegundos`,
    rEnd: (ms) => `Tu tiempo medio: ${ms} milisegundos. Lo habitual en una persona joven ante una señal visual está entre 200 y 300 milisegundos. En el siglo XIX, Donders y luego Wundt midieron estos tiempos para estudiar cuánto tarda la mente en percibir y decidir: fue el comienzo de la psicología experimental.`,
    sH: 'El efecto Stroop', sI: 'Aparecerán nombres de colores escritos con tinta de otro color. Toca el color de la TINTA, no lo que dice la palabra. ¡Rápido!',
    sEnd: (a, b, ok, n) => `Acertaste ${ok} de ${n}. Cuando la palabra y la tinta coincidían tardaste unos ${a} ms; cuando no coincidían, unos ${b} ms. Esa diferencia es el efecto Stroop (John Ridley Stroop, 1935): leer es tan automático que la palabra «interfiere» aunque intentes ignorarla.`,
    mH: '¿Cuántos números recuerdas?', mI: 'Verás una serie de números, uno por uno. Luego escríbelos en el mismo orden. Cada vez la serie será más larga.', mType: 'Escribe los números en orden', mOk: '¡Correcto!', mNo: (s) => `Era: ${s}`,
    mEnd: (n) => `Recordaste series de hasta ${n} números. En 1956 George Miller escribió que la memoria inmediata retiene unos «siete, más o menos dos» elementos; hoy muchos investigadores creen que el límite real está más cerca de cuatro grupos de información. El paciente H. M. conservaba esta memoria inmediata, pero no podía guardar recuerdos nuevos a largo plazo: así se descubrió que son sistemas distintos.`,
    iH: 'Ilusiones visuales', iI: 'Tus ojos ven bien, pero el cerebro interpreta. Responde y luego mira la explicación.',
    aH: 'El experimento de Asch', aI: '¿Qué línea, A, B o C, mide lo mismo que la línea modelo? Antes de ti responden otras seis personas. Responde con sinceridad.', aSay: (n, x) => `${n} dice: «${x}»`,
    aEnd: (c, n) => `Seguiste al grupo en ${c} de las ${n} veces en que el grupo se equivocó a propósito. En el estudio de Solomon Asch (1951), las personas siguieron la respuesta equivocada del grupo en alrededor de un tercio de las pruebas, y unas tres de cada cuatro lo hicieron al menos una vez. Pero bastaba con que una sola persona del grupo dijera la verdad para que la conformidad bajara mucho.`,
    bH: 'Las trampas de la mente', bI: 'Daniel Kahneman y Amos Tversky estudiaron los atajos que usa la mente para decidir rápido, y los errores que provocan. Responde rápido, como te salga.',
    bEnd: (ok, n) => `Esquivaste ${ok} de ${n} trampas. Kahneman lo explicó con dos «sistemas»: el sistema 1 es rápido, automático e intuitivo; el sistema 2 es lento, esforzado y reflexivo. Casi siempre el sistema 1 acierta, pero cae en sesgos previsibles. Conocerlos ayuda a pensar mejor.`,
    kH: 'Manchas de tinta', kI: 'Mira la mancha. ¿Qué ves? No hay respuestas correctas.', kNew: 'Otra mancha', kSeen: (x) => `Viste: ${x}.`,
    kEnd: 'En 1921 el psiquiatra suizo Hermann Rorschach publicó una prueba con diez manchas de tinta simétricas. Durante décadas se usó para intentar describir la personalidad, pero muchos estudios han criticado su fiabilidad: no sirve para «leer» a nadie a partir de lo que ve. Lo que sí muestra es la pareidolia: nuestro cerebro busca formas conocidas, sobre todo caras y animales, hasta en las nubes o en un enchufe.',
    kOpts: ['Una mariposa', 'Un murciélago', 'Una cara', 'Dos personas', 'Un animal', 'Otra cosa'],
  },
  COLORES: [['ROJO', '#e83a3a'], ['AZUL', '#3a7ae8'], ['VERDE', '#2ab84a'], ['AMARILLO', '#e8c81a']],
  ILUS: [
    { q: '¿Cuál de las dos líneas horizontales es más larga?', a: ['Las dos miden lo mismo', 'La de arriba', 'La de abajo'], e: 'Es la ilusión de Müller-Lyer (1889). Las puntas hacia afuera o hacia adentro engañan al cerebro, que interpreta las líneas como esquinas más cercanas o más lejanas.', d: 'muller' },
    { q: '¿Qué círculo naranja del centro es más grande?', a: ['Son iguales', 'El de la izquierda', 'El de la derecha'], e: 'Es la ilusión de Ebbinghaus. Juzgamos el tamaño en comparación con lo que rodea a cada círculo: rodeado de círculos grandes parece pequeño, y rodeado de pequeños, grande.', d: 'ebbinghaus' },
    { q: '¿Hay un triángulo blanco dibujado en el centro?', a: ['No: el cerebro lo completa', 'Sí, tiene bordes', 'Hay dos triángulos'], e: 'Es el triángulo de Kanizsa (1955). No hay ninguna línea que lo dibuje: el cerebro completa los contornos que «deberían» estar. La psicología de la Gestalt estudió estas leyes de la percepción.', d: 'kanizsa' },
    { q: '¿Las líneas horizontales grises están torcidas?', a: ['No, son perfectamente paralelas', 'Sí, se inclinan', 'Solo la del medio'], e: 'Es la ilusión de la pared de la cafetería, descrita en 1979 a partir de la fachada de un café en Bristol. El contraste entre baldosas desplazadas confunde a las neuronas que detectan bordes.', d: 'cafe' },
  ],
  SESGOS: [
    { q: 'Un bate y una pelota cuestan 1,10 en total. El bate cuesta 1 más que la pelota. ¿Cuánto cuesta la pelota?', a: ['0,05', '0,10', '0,01', '1,00'], e: 'La respuesta rápida es 0,10, pero entonces el bate costaría 1,10 y el total 1,20. La pelota cuesta 0,05 y el bate 1,05. Es la prueba de reflexión cognitiva de Shane Frederick: el sistema 1 responde antes de que el sistema 2 compruebe.' },
    { q: 'Linda tiene 31 años, estudió filosofía y le preocupa mucho la justicia social. ¿Qué es más probable?', a: ['Que Linda sea cajera de banco', 'Que Linda sea cajera de banco y activista feminista'], e: 'Muchísima gente elige la segunda, pero dos condiciones juntas nunca pueden ser más probables que una sola de ellas. Es la «falacia de la conjunción», que Tversky y Kahneman estudiaron en 1983: la descripción «encaja» y nos olvidamos de la probabilidad.' },
    { q: 'Una moneda normal ha salido cara cinco veces seguidas. En la próxima tirada…', a: ['Cara y cruz siguen teniendo un 50 %', 'Es más probable cruz', 'Es más probable cara'], e: 'La moneda no tiene memoria. Creer que «ya toca cruz» es la falacia del jugador: esperamos que las rachas se compensen en pocos intentos.' },
    { q: 'Un tratamiento para una enfermedad grave tiene un 90 % de supervivencia al mes. Otro, un 10 % de mortalidad al mes. ¿Cuál prefieres?', a: ['Son exactamente lo mismo', 'El del 90 % de supervivencia', 'El del 10 % de mortalidad'], e: 'Es el mismo dato dicho de dos formas. Aun así, médicos y pacientes eligen más a menudo el que habla de supervivencia: es el efecto de encuadre que estudiaron Tversky y Kahneman.' },
    { q: '¿Qué mata a más personas en el mundo cada año?', a: ['Los mosquitos (por las enfermedades que transmiten)', 'Los tiburones', 'Los lobos'], e: 'Los tiburones causan pocas muertes al año; los mosquitos, cientos de miles por la malaria y otras enfermedades. Exageramos lo que sale en las noticias y es fácil de imaginar: es el heurístico de disponibilidad.' },
  ],
  st() { return store.get(this.KEY, {}) || {}; },
  done(g, pts) {
    const s = this.st(); if (!s[g]) { s[g] = 1; store.set(this.KEY, s); try { addScore(pts); } catch (e) { /* fuera de partida */ } toast(this.T.pts(pts)); }
    if (Object.keys(this.st()).length >= 5) try { achieve('psicologo'); } catch (e) { /* nada */ }
  },
  build() {
    if (document.getElementById('mj')) return;
    const el = document.createElement('div'); el.id = 'mj'; el.className = 'nb'; el.hidden = true;
    el.innerHTML = '<div class="nb-card mj-card" role="dialog"><button class="ls-x pn-x" id="mj-x" aria-label="✕">✕</button><div class="eyebrow"></div><h3 class="mj-h"></h3><p class="mj-p"></p><div class="mj-body"></div><div class="btns mj-btns"></div></div>';
    el.querySelector('.eyebrow').textContent = this.T.eye; document.body.appendChild(el); el.querySelector('#mj-x').addEventListener('click', () => this.close());
  },
  open(g) { this.build(); Panel.open('mj'); Audio.init && Audio.init(); this.gen = (this.gen || 0) + 1; this[g](); },
  close() { this.gen = (this.gen || 0) + 1; clearTimeout(this.tm); Panel.close('mj'); },
  ui(h, p) { const el = document.getElementById('mj'); el.querySelector('.mj-h').textContent = h; el.querySelector('.mj-p').textContent = p; el.querySelector('.mj-body').innerHTML = ''; el.querySelector('.mj-btns').innerHTML = ''; return el.querySelector('.mj-body'); },
  btn(label, fn, cls = 'btn primary', box) { const b = document.createElement('button'); b.className = cls; b.textContent = label; b.addEventListener('click', () => { Audio.click && Audio.click(); fn(); }); (box || document.querySelector('#mj .mj-btns')).appendChild(b); return b; },
  endBtns(again) { const b = document.querySelector('#mj .mj-btns'); b.innerHTML = ''; this.btn(this.T.again, again, 'btn'); this.btn(this.T.close, () => this.close()); },
  say(t) { document.querySelector('#mj .mj-p').textContent = t; },
  // ------------------------------------------------------------ tiempo de reacción
  reaccion() {
    const body = this.ui(this.T.rH, this.T.rI); const gen = this.gen; const times = []; let state = 'idle', t0 = 0;
    const pad = document.createElement('button'); pad.className = 'mj-pad'; body.appendChild(pad); const out = document.createElement('p'); out.className = 'mj-out'; body.appendChild(out);
    const arm = () => { if (gen !== this.gen) return; state = 'wait'; pad.className = 'mj-pad wait'; pad.textContent = this.T.rWait; this.tm = setTimeout(() => { if (gen !== this.gen) return; state = 'go'; pad.className = 'mj-pad go'; pad.textContent = this.T.rGo; t0 = performance.now(); }, 1500 + Math.random() * 2500); };
    pad.addEventListener('pointerdown', () => {
      if (state === 'wait') { clearTimeout(this.tm); out.textContent = this.T.rEarly; Audio.wrong && Audio.wrong(); arm(); return; }
      if (state !== 'go') return; const ms = Math.round(performance.now() - t0); times.push(ms); out.textContent = this.T.rMs(ms); Audio.click && Audio.click(); state = 'idle';
      if (times.length < 5) { pad.className = 'mj-pad'; pad.textContent = `${times.length} / 5`; setTimeout(arm, 700); }
      else { const avg = Math.round(times.reduce((a, b) => a + b, 0) / times.length); pad.className = 'mj-pad'; pad.textContent = `⚡ ${avg} ms`; this.say(this.T.rEnd(avg)); this.done('reaccion', 40); this.endBtns(() => this.reaccion()); }
    });
    pad.textContent = this.T.start; pad.addEventListener('click', () => { if (state === 'idle' && times.length === 0) arm(); }, { once: true });
  },
  // ------------------------------------------------------------ efecto Stroop
  stroop() {
    const body = this.ui(this.T.sH, this.T.sI); const C = this.COLORES; const N = 12; let i = 0, ok = 0; const tc = [], ti = []; let t0 = 0, cur = null;
    const word = document.createElement('div'); word.className = 'mj-word'; body.appendChild(word);
    const opts = document.createElement('div'); opts.className = 'mj-colors'; body.appendChild(opts);
    for (const [n, hex] of C) { const b = document.createElement('button'); b.className = 'mj-col'; b.style.background = hex; b.setAttribute('aria-label', n); b.addEventListener('click', () => pick(hex)); opts.appendChild(b); }
    const show = () => { const w = C[Math.floor(Math.random() * 4)]; const congr = Math.random() < 0.4; const ink = congr ? w : C.filter((x) => x !== w)[Math.floor(Math.random() * 3)]; cur = { ink: ink[1], congr }; word.textContent = w[0]; word.style.color = ink[1]; t0 = performance.now(); };
    const pick = (hex) => { if (!cur) return; const ms = performance.now() - t0; const good = hex === cur.ink; if (good) { ok++; (cur.congr ? tc : ti).push(ms); Audio.correct && Audio.correct(); } else Audio.wrong && Audio.wrong(); i++;
      if (i < N) show(); else { cur = null; word.textContent = '✓'; word.style.color = '#fff'; const av = (L) => (L.length ? Math.round(L.reduce((a, b) => a + b, 0) / L.length) : 0); this.say(this.T.sEnd(av(tc), av(ti), ok, N)); this.done('stroop', 40); this.endBtns(() => this.stroop()); } };
    show();
  },
  // ------------------------------------------------------------ memoria de dígitos
  memoria() {
    const body = this.ui(this.T.mH, this.T.mI); const gen = this.gen; let len = 3, best = 0, fails = 0;
    const scr = document.createElement('div'); scr.className = 'mj-digit'; body.appendChild(scr);
    const inp = document.createElement('div'); inp.className = 'mj-typed'; body.appendChild(inp);
    const pad = document.createElement('div'); pad.className = 'mj-keys'; body.appendChild(pad); let typed = '', seq = '';
    for (const k of ['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', '✓']) { const b = document.createElement('button'); b.className = 'mj-key'; b.textContent = k; b.addEventListener('click', () => key(k)); pad.appendChild(b); }
    const lock = (v) => pad.querySelectorAll('button').forEach((b) => { b.disabled = v; });
    const round = () => { seq = Array.from({ length: len }, () => Math.floor(Math.random() * 10)).join(''); typed = ''; inp.textContent = ''; lock(true); let k = 0;
      const step = () => { if (gen !== this.gen) return; if (k < seq.length) { scr.textContent = seq[k++]; scr.classList.remove('pop'); void scr.offsetWidth; scr.classList.add('pop'); this.tm = setTimeout(() => { scr.textContent = ''; this.tm = setTimeout(step, 250); }, 750); } else { scr.textContent = '?'; this.say(this.T.mType); lock(false); } };
      step(); };
    const key = (k) => { if (k === '⌫') typed = typed.slice(0, -1); else if (k === '✓') return check(); else if (typed.length < seq.length) typed += k; inp.textContent = typed; if (typed.length === seq.length) check(); };
    const check = () => { lock(true); if (typed === seq) { best = Math.max(best, len); len++; scr.textContent = this.T.mOk; Audio.correct && Audio.correct(); this.tm = setTimeout(round, 900); }
      else { fails++; scr.textContent = '✗'; this.say(this.T.mNo(seq)); Audio.wrong && Audio.wrong(); if (fails >= 2) { this.say(this.T.mEnd(best)); this.done('memoria', 50); this.endBtns(() => this.memoria()); } else this.tm = setTimeout(round, 1600); } };
    this.btn(this.T.start, () => { document.querySelector('#mj .mj-btns').innerHTML = ''; round(); });
  },
  // ------------------------------------------------------------ ilusiones visuales
  ilusiones() {
    const body = this.ui(this.T.iH, this.T.iI); const L = this.ILUS; let i = 0, ok = 0;
    const cv = document.createElement('canvas'); cv.width = 600; cv.height = 340; cv.className = 'mj-cv'; body.appendChild(cv); const q = document.createElement('p'); q.className = 'mj-q'; body.appendChild(q);
    const ans = document.createElement('div'); ans.className = 'mj-ans'; body.appendChild(ans); const fb = document.createElement('p'); fb.className = 'mj-fb'; body.appendChild(fb);
    const show = () => { const it = L[i]; this.draw(cv, it.d, false); q.textContent = it.q; fb.textContent = ''; ans.innerHTML = ''; document.querySelector('#mj .mj-btns').innerHTML = '';
      shuffle([...it.a]).forEach((t) => { const b = document.createElement('button'); b.className = 'ans'; b.textContent = t; b.addEventListener('click', () => {
        const good = t === it.a[0]; if (good) { ok++; Audio.correct && Audio.correct(); } else Audio.wrong && Audio.wrong();
        ans.querySelectorAll('.ans').forEach((x) => { x.disabled = true; if (x.textContent === it.a[0]) x.classList.add('right'); else if (x === b) x.classList.add('wrong'); });
        this.draw(cv, it.d, true); fb.textContent = it.e;
        this.btn(i < L.length - 1 ? this.T.next : '✓', () => { i++; if (i < L.length) show(); else { this.say(`${ok} / ${L.length}`); this.done('ilusiones', 40); this.endBtns(() => this.ilusiones()); } });
      }); ans.appendChild(b); }); };
    show();
  },
  draw(cv, d, reveal) {
    const c = cv.getContext('2d'); c.fillStyle = '#fbf6ff'; c.fillRect(0, 0, 600, 340); c.lineCap = 'round'; c.strokeStyle = '#1a1030'; c.fillStyle = '#1a1030'; c.lineWidth = 5;
    const line = (x1, y1, x2, y2) => { c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); };
    if (d === 'muller') { const L = 160; for (const [y, out] of [[110, true], [240, false]]) { line(300 - L, y, 300 + L, y); for (const ex of [-1, 1]) { const x = 300 + ex * L; const dx = out ? -ex * 40 : ex * 40; line(x, y, x + dx, y - 30); line(x, y, x + dx, y + 30); } }
      if (reveal) { c.strokeStyle = '#e83a8a'; c.setLineDash([8, 8]); c.lineWidth = 3; line(300 - L, 60, 300 - L, 290); line(300 + L, 60, 300 + L, 290); c.setLineDash([]); } }
    if (d === 'ebbinghaus') { const circ = (x, y, r, col) => { c.fillStyle = col; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); };
      circ(160, 170, 26, '#f08a2a'); for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; circ(160 + Math.cos(a) * 92, 170 + Math.sin(a) * 92, 44, '#7a8ab8'); }
      circ(440, 170, 26, '#f08a2a'); for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; circ(440 + Math.cos(a) * 48, 170 + Math.sin(a) * 48, 11, '#7a8ab8'); }
      if (reveal) { c.strokeStyle = '#e83a8a'; c.lineWidth = 3; c.setLineDash([6, 6]); line(134, 140, 466, 140); line(134, 200, 466, 200); c.setLineDash([]); } }
    if (d === 'kanizsa') { const pts = [[300, 60], [180, 270], [420, 270]];
      for (const [x, y] of pts) { const ang = Math.atan2(190 - y, 300 - x); c.fillStyle = '#1a1030'; c.beginPath(); c.moveTo(x, y); c.arc(x, y, 50, ang - 0.52, ang + 0.52, true); c.closePath(); c.fill(); }
      c.strokeStyle = '#1a1030'; c.lineWidth = 4; const inv = [[300, 290], [180, 80], [420, 80]]; for (let k = 0; k < 3; k++) { const a = inv[k], b = inv[(k + 1) % 3]; const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2; line(a[0], a[1], a[0] + (mx - a[0]) * 0.55, a[1] + (my - a[1]) * 0.55); line(b[0], b[1], b[0] + (mx - b[0]) * 0.55, b[1] + (my - b[1]) * 0.55); }
      if (reveal) { c.strokeStyle = '#e83a8a'; c.setLineDash([6, 6]); c.lineWidth = 2; c.beginPath(); c.moveTo(300, 60); c.lineTo(180, 270); c.lineTo(420, 270); c.closePath(); c.stroke(); c.setLineDash([]); } }
    if (d === 'cafe') { const H = 34; for (let row = 0; row < 8; row++) { const off = [0, 14, 28, 14][row % 4]; for (let k = -1; k < 12; k++) { c.fillStyle = (k % 2 === 0) ? '#111' : '#fff'; c.fillRect(k * 56 + off, 20 + row * (H + 4), 56, H); } c.fillStyle = '#888'; c.fillRect(0, 20 + row * (H + 4) + H, 600, 4); }
      if (reveal) { c.strokeStyle = '#e83a8a'; c.lineWidth = 3; for (let row = 0; row < 8; row++) line(0, 20 + row * (H + 4) + H + 2, 600, 20 + row * (H + 4) + H + 2); } }
  },
  // ------------------------------------------------------------ experimento de Asch
  asch() {
    const body = this.ui(this.T.aH, this.T.aI); const NOMBRES = ['Ana', 'Luis', 'Sofía', 'Diego', 'Elena', 'Tomás']; const N = 6; const fake = new Set([1, 2, 4, 5]); let i = 0, conf = 0, trials = 0;
    const cv = document.createElement('canvas'); cv.width = 600; cv.height = 260; cv.className = 'mj-cv'; body.appendChild(cv); const said = document.createElement('div'); said.className = 'mj-said'; body.appendChild(said);
    const ans = document.createElement('div'); ans.className = 'mj-ans row'; body.appendChild(ans);
    const show = () => { const ref = 90 + Math.floor(Math.random() * 60); const right = Math.floor(Math.random() * 3); const lens = [0, 1, 2].map((k) => (k === right ? ref : ref + (k < right ? -1 : 1) * (28 + Math.floor(Math.random() * 20)) * (Math.random() < 0.5 ? 1 : 1)));
      const c = cv.getContext('2d'); c.fillStyle = '#fbf6ff'; c.fillRect(0, 0, 600, 260); c.fillStyle = '#1a1030'; c.font = 'bold 22px sans-serif'; c.textAlign = 'center';
      c.fillRect(80 - 4, 220 - ref, 8, ref); c.fillText('Modelo', 80, 248); ['A', 'B', 'C'].forEach((l, k) => { c.fillRect(260 + k * 120 - 4, 220 - lens[k], 8, lens[k]); c.fillText(l, 260 + k * 120, 248); });
      const groupWrong = fake.has(i); const groupAns = groupWrong ? ['A', 'B', 'C'][(right + 1 + Math.floor(Math.random() * 2)) % 3] : ['A', 'B', 'C'][right];
      said.innerHTML = ''; ans.innerHTML = ''; let k = 0; const gen = this.gen;
      const next = () => { if (gen !== this.gen) return; if (k < NOMBRES.length) { const p = document.createElement('span'); p.textContent = this.T.aSay(NOMBRES[k++], groupAns); said.appendChild(p); this.tm = setTimeout(next, 450); } else {
        ['A', 'B', 'C'].forEach((l, kk) => { const b = document.createElement('button'); b.className = 'ans'; b.textContent = l; b.addEventListener('click', () => {
          if (groupWrong) { trials++; if (l === groupAns) conf++; } ans.querySelectorAll('button').forEach((x) => { x.disabled = true; if (kk === right && x === b) x.classList.add('right'); });
          ans.querySelectorAll('button')[right].classList.add('right'); i++; this.tm = setTimeout(() => { if (i < N) show(); else { this.say(this.T.aEnd(conf, trials)); this.done('asch', 50); this.endBtns(() => this.asch()); } }, 900); }); ans.appendChild(b); }); } };
      next(); };
    show();
  },
  // ------------------------------------------------------------ heurísticos y sesgos
  sesgos() {
    const body = this.ui(this.T.bH, this.T.bI); const L = this.SESGOS; let i = 0, ok = 0;
    const q = document.createElement('p'); q.className = 'mj-q'; body.appendChild(q); const ans = document.createElement('div'); ans.className = 'mj-ans'; body.appendChild(ans); const fb = document.createElement('p'); fb.className = 'mj-fb'; body.appendChild(fb);
    const show = () => { const it = L[i]; q.textContent = it.q; fb.textContent = ''; ans.innerHTML = ''; document.querySelector('#mj .mj-btns').innerHTML = '';
      shuffle([...it.a]).forEach((t) => { const b = document.createElement('button'); b.className = 'ans'; b.textContent = t; b.addEventListener('click', () => {
        const good = t === it.a[0]; if (good) { ok++; Audio.correct && Audio.correct(); } else Audio.wrong && Audio.wrong();
        ans.querySelectorAll('.ans').forEach((x) => { x.disabled = true; if (x.textContent === it.a[0]) x.classList.add('right'); else if (x === b) x.classList.add('wrong'); }); fb.textContent = it.e;
        this.btn(i < L.length - 1 ? this.T.next : '✓', () => { i++; if (i < L.length) show(); else { this.say(this.T.bEnd(ok, L.length)); body.innerHTML = ''; this.done('sesgos', 50); this.endBtns(() => this.sesgos()); } });
      }); ans.appendChild(b); }); };
    show();
  },
  // ------------------------------------------------------------ manchas de tinta (pareidolia)
  manchas() {
    const body = this.ui(this.T.kH, this.T.kI); let n = 0;
    const cv = document.createElement('canvas'); cv.width = 600; cv.height = 360; cv.className = 'mj-cv'; body.appendChild(cv); const ans = document.createElement('div'); ans.className = 'mj-ans grid'; body.appendChild(ans); const fb = document.createElement('p'); fb.className = 'mj-fb'; body.appendChild(fb);
    const blot = () => { const c = cv.getContext('2d'); c.fillStyle = '#fbf8f2'; c.fillRect(0, 0, 600, 360); const R = mulberry32((Math.random() * 1e9) | 0); const hue = R() * 360; const multi = R() < 0.5;
      for (let k = 0; k < 26; k++) { const x = 300 - 20 - R() * 220, y = 40 + R() * 280, r = 8 + R() * 46; c.fillStyle = multi ? `hsla(${(hue + R() * 120) % 360},70%,${30 + R() * 25}%,0.85)` : `rgba(20,10,30,${0.6 + R() * 0.4})`;
        c.beginPath(); for (let a = 0; a <= Math.PI * 2 + 0.01; a += Math.PI / 10) { const rr = r * (0.7 + R() * 0.5); const px = x + Math.cos(a) * rr, py = y + Math.sin(a) * rr; a === 0 ? c.moveTo(px, py) : c.lineTo(px, py); } c.fill(); }
      c.save(); c.translate(600, 0); c.scale(-1, 1); c.drawImage(cv, 0, 0, 300, 360, 0, 0, 300, 360); c.restore(); };
    const show = () => { blot(); ans.innerHTML = ''; fb.textContent = ''; this.T.kOpts.forEach((t) => { const b = document.createElement('button'); b.className = 'ans'; b.textContent = t; b.addEventListener('click', () => {
      n++; Audio.click && Audio.click(); ans.querySelectorAll('.ans').forEach((x) => { x.disabled = true; }); b.classList.add('right'); fb.textContent = this.T.kSeen(t.toLowerCase());
      document.querySelector('#mj .mj-btns').innerHTML = ''; this.btn(this.T.kNew, show, 'btn'); if (n >= 2) { this.say(this.T.kEnd); this.done('manchas', 30); } this.btn(this.T.close, () => this.close()); }); ans.appendChild(b); }); };
    show();
  },
  menu() {
    const body = this.ui(this.T.menu, '');
    for (const g of ['reaccion', 'stroop', 'memoria', 'ilusiones', 'asch', 'sesgos', 'manchas']) { const b = document.createElement('button'); b.className = 'vs-item mj-m' + (this.st()[g] ? ' done' : ''); b.textContent = this.T[g]; b.addEventListener('click', () => { Audio.click && Audio.click(); this.gen++; this[g](); }); body.appendChild(b); }
  },
};
// botones de juego en los lugares del laberinto, y en la pausa
{
  const GAMES = ['reaccion', 'stroop', 'memoria', 'ilusiones', 'asch', 'sesgos', 'manchas'];
  const o0 = Places.open.bind(Places);
  Places.open = function (poi) {
    const r = o0(poi); const foot = document.querySelector('#place .ls-foot'); if (!foot) return r; foot.querySelectorAll('.mj-play').forEach((b) => b.remove());
    for (const g of ((poi && poi.juego) || []).filter((x) => GAMES.includes(x))) { const b = document.createElement('button'); b.className = 'aid bj-play mj-play'; b.textContent = MJ.T[g]; b.addEventListener('click', () => { Audio.click && Audio.click(); Places.close(); setTimeout(() => MJ.open(g), 80); }); foot.prepend(b); }
    return r;
  };
  const btns = document.getElementById('b-pcodex') && document.getElementById('b-pcodex').parentNode;
  if (btns) { const b = document.createElement('button'); b.className = 'btn'; b.id = 'b-pmente'; b.hidden = true; b.textContent = MJ.T.menu; b.addEventListener('click', () => { Audio.click && Audio.click(); resumeGame(); setTimeout(() => MJ.open('menu'), 60); }); btns.insertBefore(b, document.getElementById('b-psettings') || null); }
  setInterval(() => { const b = document.getElementById('b-pmente'); if (b) b.hidden = !(world && ERAS[world.idx] && ERAS[world.idx].id === 'psicologia'); }, 700);
  const st = document.createElement('style');
  st.textContent = '#mj{z-index:66}.mj-card{max-height:92vh;overflow-y:auto;background:linear-gradient(160deg,rgba(58,18,96,.97),rgba(20,8,48,.98));border-color:#c87ae8;box-shadow:0 0 40px rgba(220,90,220,.35)}.mj-h{font-family:var(--display);font-weight:normal;color:#ffc8f0;margin:2px 34px 6px 0;font-size:1.25rem}.mj-p{line-height:1.5;color:#f3e6f4}'
    + '.mj-pad{display:block;width:100%;height:220px;border-radius:16px;border:2px solid #b07ae8;background:#2a1a4a;color:#fff;font:inherit;font-size:1.4rem;cursor:pointer;touch-action:manipulation}.mj-pad.wait{background:#7a1a3a}.mj-pad.go{background:#1ab84a;font-size:2rem}.mj-out{text-align:center;color:#ffd8f8}'
    + '.mj-word{font-family:var(--display);font-size:3rem;text-align:center;margin:14px 0;letter-spacing:.06em;font-weight:bold}.mj-colors{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.mj-col{height:64px;border-radius:14px;border:3px solid #fff3;cursor:pointer}'
    + '.mj-digit{font-family:var(--display);font-size:4rem;text-align:center;height:90px;line-height:90px;color:#ffe0ff}.mj-digit.pop{animation:mjPop .4s}@keyframes mjPop{from{transform:scale(1.5);opacity:.3}}.mj-typed{text-align:center;font-size:1.6rem;letter-spacing:.3em;min-height:2rem;color:#a8f0ff}'
    + '.mj-keys{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:320px;margin:8px auto}.mj-key{height:54px;border-radius:12px;border:1px solid #b07ae8;background:#2a1a4a;color:#fff;font:inherit;font-size:1.3rem;cursor:pointer}.mj-key:disabled{opacity:.4}'
    + '.mj-cv{width:100%;border-radius:12px;display:block}.mj-q{font-size:1.05rem;color:#fff4ff}.mj-ans .ans{width:100%;margin:4px 0;text-align:left}.mj-ans.row{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.mj-ans.row .ans{text-align:center;font-size:1.3rem}.mj-ans.grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}'
    + '.mj-fb{color:#f3e6f4;font-size:.92rem;line-height:1.5}.mj-said{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0;min-height:2rem}.mj-said span{background:rgba(255,255,255,.08);border-radius:999px;padding:4px 10px;font-size:.85rem;animation:mjPop .3s}.mj-m{display:block;width:100%;text-align:left;margin:6px 0}.mj-m.done::after{content:" ✓";color:#8ff0c4}';
  document.head.appendChild(st);
}
if (location.hash === '#debug') window.__mj = MJ;
