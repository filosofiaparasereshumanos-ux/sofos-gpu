// ============================================================================
//  MÁS CAMINO DE LA BIBLIA: tres lugares nuevos (el valle de Elá, Belén y la
//  tumba vacía) y tres juegos: la honda de David, la historia de David en orden
//  y «La tumba vacía»: comparar lo que cuenta cada uno de los cuatro evangelios.
//  Las citas siguen las referencias de la Biblia de Jerusalén.
// ============================================================================
const BJ = {
  T: {
    honda: '🎯 Jugar: la honda de David', orden: '📜 Jugar: la historia de David en orden', tumba: '🕯 Jugar: la tumba vacía en los cuatro evangelios', menu: '🎮 Juegos de la Biblia',
    hH: 'La honda de David', hIntro: 'Goliat avanza por el valle. Toca «Lanzar» cuando la marca blanca pase por la franja dorada. Tienes cinco piedras, como David en 1 Samuel 17,40.', throw: 'Lanzar', hit: '¡Justo en la frente!', miss: 'Demasiado pronto o demasiado tarde.', stones: (n) => `Piedras: ${n}`,
    hWin: 'Según el relato, David le dijo: «Tú vienes contra mí con espada, lanza y jabalina, pero yo voy contra ti en nombre de Yahveh Sebaot» (1 Samuel 17,45). La historia se volvió el símbolo del pequeño que vence al poderoso.', hLose: 'Se acabaron las piedras. ¡Inténtalo otra vez!',
    oH: 'La historia de David en orden', oIntro: 'Toca los momentos de la vida de David en el orden en que los cuentan los libros de Samuel y de los Reyes.', oOk: '¡Bien ordenado!', oNo: 'Ese momento va más adelante. Prueba otro.', oWin: '¡Has ordenado la vida de David! Pastor, guerrero, rey, pecador arrepentido y poeta: la Biblia lo presenta con sus luces y sus sombras.',
    tH: 'La tumba vacía en los cuatro evangelios', tIntro: 'Los cuatro evangelios cuentan que el sepulcro estaba vacío, pero cada uno con sus propios detalles. ¿Sabes qué dice cada uno?', tEnd: 'Los cuatro relatos coinciden en lo esencial: el sepulcro vacío el primer día de la semana y unas mujeres como primeras testigos. Difieren en los detalles, y los estudiosos comparan esas diferencias para entender cómo se transmitieron los recuerdos de las primeras comunidades.',
    pH: 'Las diez plagas en orden', pIntro: 'Ordena las diez plagas de Egipto tal como las cuenta el libro del Éxodo, en los capítulos 7 a 12.', pWin: '¡Las diez plagas en orden! Según el relato, después de la última el faraón dejó salir a los israelitas. Los judíos recuerdan cada año esa liberación en la fiesta de Pascua (Pésaj).',
    jH: 'Jonás y el gran pez', jIntro: 'El libro de Jonás tiene solo cuatro capítulos. ¿Recuerdas lo que cuenta?', jEnd: 'El libro de Jonás es un relato breve y lleno de ironía: el profeta huye, los extranjeros se convierten y Dios se muestra compasivo con todos. Muchos estudiosos lo leen como una narración que enseña sobre la misericordia, más que como una crónica.',
    rH: 'La historia de Rut', rIntro: 'Rut era una extranjera que no quiso abandonar a su suegra. ¿Recuerdas su historia?', rEnd: 'El libro de Rut cuenta la lealtad de una extranjera que llega a ser antepasada del rey David. El evangelio de Mateo la nombra en la genealogía de Jesús (Mateo 1,5).',
    plagas: '🐸 Jugar: las diez plagas en orden', jonas: '🐋 Jugar: Jonás y el gran pez', rut: '🌾 Jugar: la historia de Rut',
    again: 'Jugar otra vez', close: 'Cerrar', next: 'Siguiente', score: (a, b) => `${a} de ${b}`, pts: (n) => `+${n} sabiduría`,
  },
  ORDEN: [
    ['El profeta Samuel unge al joven pastor David', '1 Samuel 16'],
    ['David vence al gigante Goliat', '1 Samuel 17'],
    ['Amistad con Jonatán y huida del rey Saúl', '1 Samuel 18–26'],
    ['David es proclamado rey de Judá y luego de todo Israel', '2 Samuel 2–5'],
    ['Conquista Jerusalén y lleva allí el arca de la alianza', '2 Samuel 5–6'],
    ['Peca con Betsabé y el profeta Natán se lo reprocha', '2 Samuel 11–12'],
    ['Su hijo Absalón se rebela contra él', '2 Samuel 15–18'],
    ['Salomón sucede a David como rey', '1 Reyes 1–2'],
  ],
  TUMBA: [
    ['Según Marcos, ¿quiénes fueron al sepulcro?', 'María Magdalena, María la de Santiago y Salomé', ['Solo María Magdalena', 'Pedro y Juan', 'María Magdalena y la otra María'], 'Marcos 16,1.'],
    ['Según Marcos, ¿a quién encontraron dentro del sepulcro?', 'A un joven vestido con una túnica blanca', ['A dos hombres con vestidos resplandecientes', 'A un ángel sentado sobre la piedra', 'A Jesús, que parecía el jardinero'], 'Marcos 16,5.'],
    ['Según Mateo, ¿qué ocurrió cuando llegaron las mujeres?', 'Un terremoto, y un ángel removió la piedra y se sentó encima', ['Los discípulos ya estaban allí', 'La piedra estaba sellada', 'Nada: todo estaba en silencio'], 'Mateo 28,2.'],
    ['Según Mateo, ¿qué mujeres fueron a ver el sepulcro?', 'María Magdalena y la otra María', ['Juana y Susana', 'Marta y María de Betania', 'Salomé y María, la madre de Jesús'], 'Mateo 28,1.'],
    ['Según Lucas, ¿qué les preguntaron los dos hombres a las mujeres?', '«¿Por qué buscáis entre los muertos al que está vivo?»', ['«¿Adónde vais tan temprano?»', '«¿Quién movió la piedra?»', '«¿Dónde están los discípulos?»'], 'Lucas 24,5.'],
    ['Según Lucas, ¿qué discípulo corrió al sepulcro después de oír a las mujeres?', 'Pedro', ['Tomás', 'Judas', 'Mateo'], 'Lucas 24,12.'],
    ['Según Juan, ¿quién fue sola al sepulcro cuando todavía estaba oscuro?', 'María Magdalena', ['Salomé', 'Juana', 'María, la madre de Jesús'], 'Juan 20,1.'],
    ['Según Juan, ¿con quién confundió María Magdalena a Jesús?', 'Con el encargado del huerto', ['Con un soldado', 'Con un ángel', 'Con Pedro'], 'Juan 20,15-16: al oír su nombre lo reconoce y le dice «¡Rabbuní!», que quiere decir «Maestro».'],
  ],
  build() {
    if (document.getElementById('bj')) return;
    const el = document.createElement('div'); el.id = 'bj'; el.className = 'nb'; el.hidden = true;
    el.innerHTML = '<div class="nb-card bj-card" role="dialog"><button class="ls-x pn-x" id="bj-x" aria-label="✕">✕</button><div class="eyebrow">El camino de la Biblia</div><h3 class="bj-h"></h3><p class="bj-p"></p><div class="bj-body"></div><div class="btns bj-btns"></div></div>';
    document.body.appendChild(el); el.querySelector('#bj-x').addEventListener('click', () => this.close());
  },
  open(game) { this.build(); Panel.open('bj'); Audio.init && Audio.init(); this.game = game; this[game](); },
  close() { this.stop = true; Panel.close('bj'); },
  ui(h, p) { const el = document.getElementById('bj'); el.querySelector('.bj-h').textContent = h; el.querySelector('.bj-p').textContent = p; el.querySelector('.bj-body').innerHTML = ''; el.querySelector('.bj-btns').innerHTML = ''; return el; },
  btn(label, fn, cls = 'btn primary') { const b = document.createElement('button'); b.className = cls; b.textContent = label; b.addEventListener('click', () => { Audio.click && Audio.click(); fn(); }); document.querySelector('#bj .bj-btns').appendChild(b); return b; },
  reward(key, n) { const k = 'odisea-razon.biblia-juegos'; const s = store.get(k, {}) || {}; if (s[key]) return; s[key] = 1; store.set(k, s); try { addScore(n); } catch (e) { /* fuera de una partida */ } toast(this.T.pts(n)); },
  // --------------------------------------------------------- la honda de David
  honda() {
    const el = this.ui(this.T.hH, this.T.hIntro); const body = el.querySelector('.bj-body');
    body.innerHTML = '<canvas class="bj-cv" width="600" height="320"></canvas><div class="bj-stat"><span class="bj-st"></span><b class="bj-msg"></b></div>';
    const cv = body.querySelector('canvas'), c = cv.getContext('2d'); let stones = 5, phase = 0, flying = null, done = false; this.stop = false;
    const zone = () => [0.42 - 0.06 * (5 - stones) * 0.3, 0.58 + 0.06 * (5 - stones) * 0.3].map((v, i) => i ? Math.min(0.62, v) : Math.max(0.38, v));
    const st = () => { body.querySelector('.bj-st').textContent = this.T.stones(stones); };
    const msg = (t, ok) => { const m = body.querySelector('.bj-msg'); m.textContent = t; m.className = 'bj-msg ' + (ok ? 'ok' : 'no'); };
    const draw = (t) => {
      c.clearRect(0, 0, 600, 320); const g = c.createLinearGradient(0, 0, 0, 320); g.addColorStop(0, '#e9c98a'); g.addColorStop(1, '#a8834a'); c.fillStyle = g; c.fillRect(0, 0, 600, 320);
      c.fillStyle = '#8a6a3a'; c.beginPath(); c.moveTo(0, 250); c.quadraticCurveTo(300, 200, 600, 250); c.lineTo(600, 320); c.lineTo(0, 320); c.fill();
      // Goliat (silueta) que se acerca poco a poco
      const gx = 470 - (5 - stones) * 18, gs = 1 + (5 - stones) * 0.06; c.save(); c.translate(gx, 250); c.scale(gs, gs); c.fillStyle = '#3a2a1a';
      c.fillRect(-22, -150, 44, 110); c.beginPath(); c.arc(0, -168, 20, 0, Math.PI * 2); c.fill(); c.fillRect(-30, -40, 22, 40); c.fillRect(8, -40, 22, 40); c.fillStyle = '#b8a070'; c.fillRect(-24, -192, 48, 10); c.fillRect(30, -190, 6, 150); c.restore();
      // David
      c.fillStyle = '#5a4a2a'; c.fillRect(80, 190, 20, 50); c.beginPath(); c.arc(90, 180, 11, 0, Math.PI * 2); c.fill();
      // la honda gira; la «fase» marca el punto de suelta
      const a = t * 7; c.strokeStyle = '#2a1a0a'; c.lineWidth = 2; c.beginPath(); c.moveTo(98, 195); c.lineTo(98 + Math.cos(a) * 34, 175 + Math.sin(a) * 34); c.stroke();
      c.fillStyle = '#ddd'; c.beginPath(); c.arc(98 + Math.cos(a) * 34, 175 + Math.sin(a) * 34, 5, 0, Math.PI * 2); c.fill();
      // barra de precisión
      phase = (Math.sin(t * 2.6) + 1) / 2; const [z0, z1] = zone();
      c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(150, 22, 300, 16); c.fillStyle = '#ffd36a'; c.fillRect(150 + z0 * 300, 22, (z1 - z0) * 300, 16); c.fillStyle = '#fff'; c.fillRect(150 + phase * 300 - 2, 16, 4, 28);
      if (flying) { const k = Math.min(1, (performance.now() - flying.t0) / 600); const x = 110 + (flying.x - 110) * k, y = 170 + (flying.y - 170) * k - Math.sin(k * Math.PI) * 60; c.fillStyle = '#eee'; c.beginPath(); c.arc(x, y, 5, 0, Math.PI * 2); c.fill(); if (k >= 1) flying = null; }
    };
    const loop = () => { if (this.stop || this.game !== 'honda' || document.getElementById('bj').hidden) return; draw(performance.now() / 1000); requestAnimationFrame(loop); };
    st(); loop();
    const shoot = () => {
      if (done || flying || stones <= 0) return; const [z0, z1] = zone(); const ok = phase >= z0 && phase <= z1; stones--; st();
      const gx = 470 - (4 - stones) * 18; flying = { t0: performance.now(), x: ok ? gx : gx + (phase < z0 ? -60 : 40), y: ok ? 82 : 140 };
      if (ok) { done = true; Audio.correct && Audio.correct(); buzz([30, 40, 80]); msg(this.T.hit, true); setTimeout(() => { el.querySelector('.bj-p').textContent = this.T.hWin; this.reward('honda', 60); el.querySelector('.bj-btns').innerHTML = ''; this.btn(this.T.again, () => this.honda(), 'btn'); this.btn(this.T.close, () => this.close()); }, 900); }
      else { Audio.wrong && Audio.wrong(); msg(this.T.miss, false); if (stones <= 0) { done = true; setTimeout(() => { msg(this.T.hLose, false); el.querySelector('.bj-btns').innerHTML = ''; this.btn(this.T.again, () => this.honda()); }, 700); } }
    };
    this.btn(this.T.throw, shoot); cv.addEventListener('pointerdown', shoot);
  },
  // --------------------------------------------------------- la historia de David en orden
  orden(S) {
    S = S || { k: 'orden', h: this.T.oH, intro: this.T.oIntro, win: this.T.oWin, data: this.ORDEN }; const D = S.data;
    const el = this.ui(S.h, S.intro); const body = el.querySelector('.bj-body'); let next = 0, errors = 0;
    const box = document.createElement('div'); box.className = 'bj-cards'; body.appendChild(box);
    const done = document.createElement('ol'); done.className = 'bj-done'; body.prepend(done);
    shuffle(D.map((x, i) => [x, i])).forEach(([[t, ref], i]) => {
      const b = document.createElement('button'); b.className = 'bj-c'; b.innerHTML = '<b></b><small></small>'; b.querySelector('b').textContent = t; b.querySelector('small').textContent = ref;
      b.addEventListener('click', () => {
        if (i === next) { next++; Audio.correct && Audio.correct(); const li = document.createElement('li'); li.textContent = `${t} (${ref})`; done.appendChild(li); b.remove();
          if (next === D.length) { el.querySelector('.bj-p').textContent = S.win + (errors ? '' : ' ✓'); this.reward(S.k, 60); this.btn(this.T.again, () => this.orden(S), 'btn'); this.btn(this.T.close, () => this.close()); } }
        else { errors++; Audio.wrong && Audio.wrong(); b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake'); toast(this.T.oNo); }
      });
      box.appendChild(b);
    });
  },
  // --------------------------------------------------------- la tumba vacía
  tumba(S) {
    S = S || { k: 'tumba', h: this.T.tH, intro: this.T.tIntro, end: this.T.tEnd, data: this.TUMBA }; const Q = S.data;
    const el = this.ui(S.h, S.intro); let i = 0, ok = 0;
    const show = () => {
      const [q, right, wrong, ref] = Q[i]; const body = el.querySelector('.bj-body'); body.innerHTML = `<p class="bj-q"></p><div class="bj-ans"></div><p class="bj-fb" hidden></p><small class="bj-n"></small>`;
      body.querySelector('.bj-q').textContent = q; body.querySelector('.bj-n').textContent = this.T.score(i + 1, Q.length); el.querySelector('.bj-btns').innerHTML = '';
      shuffle([right, ...wrong]).forEach((t) => { const b = document.createElement('button'); b.className = 'ans'; b.textContent = t; b.addEventListener('click', () => {
        const good = t === right; if (good) { ok++; Audio.correct && Audio.correct(); } else { Audio.wrong && Audio.wrong(); }
        body.querySelectorAll('.ans').forEach((x) => { x.disabled = true; if (x.textContent === right) x.classList.add('right'); else if (x === b) x.classList.add('wrong'); });
        const fb = body.querySelector('.bj-fb'); fb.hidden = false; fb.textContent = (good ? '✓ ' : '✗ ') + `${right}. ${ref}`;
        this.btn(i < Q.length - 1 ? this.T.next : this.T.score(ok, Q.length), () => { i++; if (i < Q.length) show(); else end(); });
      }); body.querySelector('.bj-ans').appendChild(b); });
    };
    const end = () => { const body = el.querySelector('.bj-body'); body.innerHTML = ''; el.querySelector('.bj-p').textContent = `${this.T.score(ok, Q.length)}. ${S.end}`; if (ok >= Math.ceil(Q.length * 0.7)) this.reward(S.k, 80); el.querySelector('.bj-btns').innerHTML = ''; this.btn(this.T.again, () => this.tumba(S), 'btn'); this.btn(this.T.close, () => this.close()); };
    show();
  },
  plagas() { this.orden({ k: 'plagas', h: this.T.pH, intro: this.T.pIntro, win: this.T.pWin, data: this.PLAGAS }); },
  jonas() { this.tumba({ k: 'jonas', h: this.T.jH, intro: this.T.jIntro, end: this.T.jEnd, data: this.JONAS }); },
  rut() { this.tumba({ k: 'rut', h: this.T.rH, intro: this.T.rIntro, end: this.T.rEnd, data: this.RUT }); },
  PLAGAS: [
    ['El agua del Nilo se convierte en sangre', 'Éxodo 7'], ['Las ranas', 'Éxodo 7–8'], ['Los mosquitos', 'Éxodo 8'], ['Los tábanos', 'Éxodo 8'], ['La peste del ganado', 'Éxodo 9'],
    ['Las úlceras', 'Éxodo 9'], ['El granizo', 'Éxodo 9'], ['Las langostas', 'Éxodo 10'], ['Las tinieblas', 'Éxodo 10'], ['La muerte de los primogénitos', 'Éxodo 11–12'],
  ],
  JONAS: [
    ['¿Adónde mandó Dios a Jonás a predicar?', 'A Nínive, la gran ciudad', ['A Jerusalén', 'A Babilonia', 'A Tarsis'], 'Jonás 1,2.'],
    ['¿Hacia dónde huyó Jonás en un barco?', 'Hacia Tarsis', ['Hacia Nínive', 'Hacia Egipto', 'Hacia Damasco'], 'Jonás 1,3: huyó en dirección contraria.'],
    ['¿Qué pasó en medio de la gran tormenta?', 'Los marineros lo echaron al mar, como él mismo les pidió', ['Jonás calmó el mar con su bastón', 'El barco se hundió con todos', 'Jonás se escondió y nadie lo encontró'], 'Jonás 1,12-15.'],
    ['¿Cuánto tiempo pasó Jonás en el vientre del gran pez?', 'Tres días y tres noches', ['Cuarenta días', 'Siete días', 'Un año'], 'Jonás 2.'],
    ['¿Qué hicieron los habitantes de Nínive al oír a Jonás?', 'Creyeron, ayunaron y se vistieron de sayal', ['Lo expulsaron de la ciudad', 'Se burlaron de él', 'Huyeron al desierto'], 'Jonás 3,5.'],
    ['¿Por qué se enfadó Jonás al final?', 'Porque Dios tuvo compasión de Nínive y no la destruyó', ['Porque el pez lo devolvió a la playa', 'Porque nadie lo escuchó', 'Porque perdió su barco'], 'Jonás 4,1-2.'],
    ['¿Con qué planta le dio Dios una lección a Jonás?', 'Con un ricino que creció y se secó', ['Con una higuera', 'Con una vid', 'Con un olivo'], 'Jonás 4,6-10.'],
    ['¿Cómo termina el libro de Jonás?', 'Con una pregunta de Dios sobre su compasión por Nínive', ['Con la muerte de Jonás', 'Con una gran fiesta en Nínive', 'Con el regreso de Jonás a Jerusalén'], 'Jonás 4,11.'],
  ],
  RUT: [
    ['¿De qué pueblo era Rut?', 'Era moabita', ['Era filistea', 'Era egipcia', 'Era israelita'], 'Rut 1,4.'],
    ['¿Quién era Noemí para Rut?', 'Su suegra', ['Su madre', 'Su hermana', 'Su tía'], 'Rut 1.'],
    ['¿Qué respondió Rut cuando Noemí le pidió que volviera con su pueblo?', 'Que iría adonde ella fuera y que su pueblo sería su pueblo', ['Que volvería a Moab', 'Que buscaría otro marido allí mismo', 'Que no sabía qué hacer'], 'Rut 1,16.'],
    ['¿Adónde llegaron las dos mujeres?', 'A Belén', ['A Nínive', 'A Egipto', 'A Jericó'], 'Rut 1,19.'],
    ['¿Qué hacía Rut en los campos?', 'Espigaba: recogía las espigas que dejaban los segadores', ['Araba la tierra', 'Cuidaba ovejas', 'Vendía trigo en el mercado'], 'Rut 2.'],
    ['¿Con quién se casó Rut?', 'Con Booz', ['Con Obed', 'Con Elimélec', 'Con Saúl'], 'Rut 4,13.'],
    ['¿De qué rey fue bisabuela Rut?', 'Del rey David', ['Del rey Salomón', 'Del rey Saúl', 'Del rey Ezequías'], 'Rut 4,17: su hijo Obed fue el padre de Jesé, el padre de David.'],
  ],
  menu() {
    const el = this.ui(this.T.menu, ''); const body = el.querySelector('.bj-body');
    for (const g of ['honda', 'orden', 'tumba', 'plagas', 'jonas', 'rut']) { const b = document.createElement('button'); b.className = 'vs-item bj-m'; b.textContent = this.T[g]; b.addEventListener('click', () => { Audio.click && Audio.click(); this.game = g; this[g](); }); body.appendChild(b); }
  },
};
// botones de juego en los lugares y en la pausa (solo en el camino de la Biblia)
{
  const o0 = Places.open.bind(Places);
  Places.open = function (poi) {
    o0(poi); const foot = document.querySelector('#place .ls-foot'); if (!foot) return; foot.querySelectorAll('.bj-play').forEach((b) => b.remove());
    for (const g of (poi && poi.juego) || []) { const b = document.createElement('button'); b.className = 'aid bj-play'; b.textContent = BJ.T[g]; b.addEventListener('click', () => { Audio.click && Audio.click(); Places.close(); setTimeout(() => BJ.open(g), 80); }); foot.prepend(b); }
  };
  const btns = document.getElementById('b-pcodex') && document.getElementById('b-pcodex').parentNode;
  if (btns) { const b = document.createElement('button'); b.className = 'btn'; b.id = 'b-pbiblia'; b.hidden = true; b.textContent = BJ.T.menu; b.addEventListener('click', () => { Audio.click && Audio.click(); resumeGame(); setTimeout(() => BJ.open('menu'), 60); }); btns.insertBefore(b, document.getElementById('b-psettings') || null); }
  setInterval(() => { const b = document.getElementById('b-pbiblia'); if (b) b.hidden = !(world && ERAS[world.idx] && ERAS[world.idx].id === 'biblia'); }, 700);
}
{
  const st = document.createElement('style');
  st.textContent = '#bj{z-index:66}.bj-h{font-family:var(--display);font-weight:normal;color:#ffe2a0;margin:2px 34px 6px 0;font-size:1.25rem}.bj-p{line-height:1.5;color:#f3e6c4}'
    + '.bj-cv{width:100%;border-radius:10px;display:block;touch-action:manipulation;cursor:pointer}.bj-stat{display:flex;justify-content:space-between;margin:6px 0;font-size:.9rem}.bj-msg.ok{color:#8ff0c4}.bj-msg.no{color:#ff9a8a}'
    + '.bj-cards{display:grid;gap:6px;margin-top:8px}.bj-c{text-align:left;padding:8px 10px;border-radius:10px;border:1px solid var(--line);background:rgba(255,255,255,.04);color:var(--parchment);font:inherit;cursor:pointer}.bj-c b{display:block;font-weight:normal}.bj-c small{color:var(--gold,#d8b25a);font-size:.75rem}'
    + '.bj-c.shake{animation:bjShake .35s}@keyframes bjShake{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}.bj-done{margin:6px 0;padding-left:22px;color:#8ff0c4;font-size:.9rem}.bj-done li{margin:3px 0}'
    + '.bj-q{font-size:1.05rem;color:#fff4dc}.bj-ans .ans{width:100%;margin:4px 0;text-align:left}.bj-fb{margin:8px 0;color:#f3e6c4;font-size:.92rem}.bj-n{color:var(--parchment-dim,#bfae8e)}.bj-m{display:block;width:100%;text-align:left;margin:6px 0}';
  document.head.appendChild(st);
}
if (location.hash === '#debug') window.__bj = BJ;
