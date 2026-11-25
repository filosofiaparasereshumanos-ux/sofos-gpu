// ============================================================================
//  JUEGOS DE ÉTICA (mundo XXXIX · La plaza de las decisiones). Siete juegos con
//  dilemas clásicos; cada decisión mueve tu «brújula ética» hacia una de las
//  cuatro grandes familias: las consecuencias, el deber, la virtud o el cuidado.
//  No hay respuestas correctas: hay razones mejores y peores.
//   · tranvia: el dilema del tranvía (Foot 1967, Thomson 1976–1985)   · estanque: el niño que se ahoga (Singer 1972)
//   · bentham: el cálculo de la felicidad                                · velo: el velo de la ignorancia (Rawls 1971)
//   · kant: la prueba de universalizar                                    · virtud: el término medio (Aristóteles)
//   · futuro: el coche sin conductor y la responsabilidad (Moral Machine 2018, Jonas 1979)
// ============================================================================
ACH.push({ id: 'etico', i: '⚖️', n: 'Brújula ética', d: 'Juega cinco de los juegos de ética de la plaza de las decisiones.' });
const EJ = {
  KEY: 'odisea-razon.juegos-etica', BKEY: 'odisea-razon.brujula',
  L: { con: ['Las consecuencias', '#d8a04a'], deb: ['El deber', '#5a8ad8'], vir: ['La virtud', '#5ab87a'], cui: ['El cuidado', '#d86a8a'] },
  T: {
    eye: 'La plaza de las decisiones', menu: '⚖️ Juegos de ética', again: 'Jugar otra vez', close: 'Cerrar', next: 'Siguiente', pts: (n) => `+${n} sabiduría`,
    tranvia: '🚋 Jugar: el dilema del tranvía', estanque: '🌊 Jugar: el niño en el estanque', bentham: '🧮 Jugar: la calculadora de la felicidad', velo: '🎭 Jugar: el velo de la ignorancia', kant: '📜 Jugar: ¿se puede universalizar?', virtud: '🏛️ Jugar: el término medio', futuro: '🚗 Jugar: el coche sin conductor',
    brujula: 'Tu brújula ética', brujulaP: 'Así se reparten tus decisiones entre las cuatro grandes familias de la ética. No hay una correcta: cada una ilumina algo que las otras olvidan.',
    nada: 'Todavía no has tomado decisiones. Juega a los dilemas de la plaza.',
    tH: 'El dilema del tranvía', tI: 'Cuatro versiones del dilema más famoso de la ética. Decide qué harías y fíjate en qué cambia de una versión a otra.',
    tEnd: 'Philippa Foot planteó el primer tranvía en 1967 para pensar la doctrina del doble efecto, que viene de Tomás de Aquino: no es lo mismo causar un daño como efecto secundario que usarlo como medio. Judith Jarvis Thomson inventó la palanca, el puente y el lazo. Casi todos mueven la palanca, pero casi nadie empuja al hombre del puente, aunque el resultado sea el mismo: cinco vidas por una. ¿Qué cambia? Para Kant, empujar es usar a una persona solo como medio.',
    eH: 'El niño en el estanque', eI: 'Peter Singer propuso este caso en 1972, en un artículo sobre el hambre en el mundo. Responde con sinceridad.',
    eEnd: 'Singer razona así: si puedes evitar algo muy malo sin sacrificar nada de importancia comparable, debes hacerlo; la distancia no cambia el deber. Sus críticos responden que el deber no puede ser ilimitado, que hay que mirar las causas del hambre y la justicia de las instituciones, y la ética del cuidado recuerda que nuestras obligaciones nacen de relaciones concretas. La pregunta sigue abierta.',
    bH: 'La calculadora de la felicidad', bI: 'Jeremy Bentham quiso medir el placer y el dolor para decidir. Tienes una tarde libre: puntúa cada plan según su intensidad, su duración y a cuántas personas hace felices.',
    bInt: 'Intensidad', bDur: 'Duración (horas)', bPer: 'Personas felices', bA: 'Plan A: ir a una fiesta con amigos', bB: 'Plan B: ayudar a tu abuela a mudarse',
    bCalc: 'Calcular', bWin: (a, b, w) => `Plan A: ${a} puntos de felicidad. Plan B: ${b}. Según el cálculo, gana ${w}.`,
    bEnd: 'Bentham propuso medir siete aspectos del placer: intensidad, duración, certeza, cercanía, fecundidad, pureza y extensión. Su discípulo John Stuart Mill objetó que no todos los placeres valen lo mismo: «es mejor ser un ser humano insatisfecho que un cerdo satisfecho». Otros críticos preguntan si se puede medir la felicidad y qué pasa con los derechos de las minorías cuando solo cuenta la suma.',
    vH: 'El velo de la ignorancia', vI: 'Vas a elegir cómo se reparte la riqueza en una sociedad, pero no sabes qué lugar ocuparás en ella. Elige un reparto.',
    vOpts: [['Reparto A: mucho para unos pocos, casi nada para el resto', [90, 40, 8, 2]], ['Reparto B: todos exactamente igual', [25, 25, 25, 25]], ['Reparto C: algo de desigualdad, pero el que menos tiene recibe lo más posible', [40, 32, 30, 28]]],
    vRoles: ['dueña de una gran empresa', 'médico', 'trabajadora del campo', 'persona sin empleo'],
    vYou: (r, n) => `Se levanta el velo: te tocó ser ${r}. Recibes ${n} monedas.`,
    vEnd: 'John Rawls propuso este experimento en «Teoría de la justicia» (1971). Sin saber quiénes seremos, elegiríamos principios justos: iguales libertades para todos y desigualdades solo si benefician a los que están peor (el principio de la diferencia). Sus críticos, como Robert Nozick, defienden que lo justo depende de cómo se adquirió la riqueza, no del reparto final.',
    kH: '¿Se puede universalizar?', kI: 'Kant propuso una prueba: «Obra solo según aquella máxima que puedas querer que se convierta en ley universal». Imagina que todos hicieran lo mismo: ¿funcionaría el mundo?',
    kYes: 'Sí, se puede universalizar', kNo: 'No, se destruye a sí misma',
    kEnd: 'Kant distingue dos fallos: máximas que ni siquiera se pueden pensar como ley para todos, como la promesa falsa (si todos mintieran, nadie creería una promesa), y máximas que se pueden pensar pero no querer, como no ayudar nunca a nadie (todos necesitamos ayuda alguna vez). Su otra fórmula pide tratar a la humanidad siempre como un fin y nunca solo como un medio.',
    aH: 'El término medio', aI: 'Para Aristóteles, la virtud es un término medio entre dos vicios, uno por exceso y otro por defecto. Elige la virtud que está entre ellos.',
    aEnd: 'Aristóteles no habla de un promedio matemático: el término medio depende de la situación y se aprende con la práctica, imitando a las personas sabias. Nos hacemos valientes haciendo actos valientes, como nos hacemos músicos tocando música. Desde 1958, filósofas como Elizabeth Anscombe y Philippa Foot renovaron esta ética de las virtudes.',
    fH: 'El coche sin conductor', fI: 'Un coche autónomo se queda sin frenos. Alguien tiene que programar de antemano qué hará. Decide tú.',
    fEnd: 'En 2018, el experimento Moral Machine del MIT reunió casi 40 millones de decisiones de personas de 233 países y territorios. En general se prefería salvar a más personas, a los humanos antes que a los animales y a los jóvenes antes que a los mayores, pero con diferencias entre culturas. Hans Jonas pidió una ética de la responsabilidad para la técnica: «Obra de tal modo que los efectos de tu acción sean compatibles con la permanencia de una vida humana auténtica en la Tierra».',
    fWho: '¿Y quién es responsable si el coche causa un daño?',
  },
  TRAN: [
    { q: 'La palanca. Un tranvía sin frenos va hacia cinco personas atadas a la vía. Estás junto a una palanca: si la mueves, el tranvía se desvía a otra vía donde hay una sola persona.', a: [['Muevo la palanca: muere una, se salvan cinco', 'con'], ['No toco nada: no quiero ser yo quien cause una muerte', 'deb']] },
    { q: 'El puente. Ahora estás en un puente sobre la vía. A tu lado hay un hombre muy corpulento: si lo empujas, su cuerpo detendrá el tranvía y salvará a las cinco personas.', a: [['Lo empujo: el resultado es el mismo, una vida por cinco', 'con'], ['No lo empujo: sería usarlo como un objeto', 'deb']] },
    { q: 'El cirujano. Un médico tiene cinco pacientes que morirán sin un trasplante. Entra un joven sano a hacerse un chequeo: con sus órganos se salvarían los cinco.', a: [['El médico debería hacerlo', 'con'], ['Jamás: nadie puede matar a un inocente para salvar a otros', 'deb'], ['Un médico que hiciera eso dejaría de ser un buen médico', 'vir']] },
    { q: 'El lazo. La vía lateral da la vuelta y vuelve a unirse con la principal. Si desvías el tranvía, solo lo detiene el cuerpo de la persona que está allí: sin ella, volvería y mataría a los cinco.', a: [['La desvío: no es tan distinto de la palanca', 'con'], ['No: aquí su muerte es el medio para salvar a los otros', 'deb']] },
  ],
  KANT: [
    { m: 'Prometo devolver un préstamo sabiendo que no lo haré, cuando me conviene.', ok: false, e: 'Si todos hicieran promesas falsas, nadie creería en las promesas y la máxima se destruiría a sí misma. Es el ejemplo del propio Kant.' },
    { m: 'Digo la verdad aunque me cueste.', ok: true, e: 'Puede querer que todos lo hagan sin contradicción: un mundo en que todos dicen la verdad es posible y deseable.' },
    { m: 'Nunca ayudo a nadie que lo necesite, aunque pueda hacerlo fácilmente.', ok: false, e: 'Un mundo así se puede pensar, pero no lo puedes querer: tú también necesitarás ayuda alguna vez.' },
    { m: 'Me hago amigo de alguien solo para que me pase las respuestas de la prueba.', ok: false, e: 'Tratas a una persona solo como un medio para tus fines, y eso choca con la fórmula de la humanidad.' },
    { m: 'Cumplo mis promesas aunque ya no me convenga.', ok: true, e: 'Es justo lo que hace posible que las promesas tengan valor para todos.' },
  ],
  VIRT: [
    { v: ['Cobardía', 'Temeridad'], a: ['Valentía', 'Prudencia', 'Fuerza', 'Obediencia'] },
    { v: ['Avaricia', 'Derroche'], a: ['Generosidad', 'Ahorro', 'Riqueza', 'Humildad'] },
    { v: ['Insensibilidad', 'Desenfreno'], a: ['Templanza', 'Tristeza', 'Alegría', 'Valentía'] },
    { v: ['Falsa modestia', 'Fanfarronería'], a: ['Sinceridad', 'Timidez', 'Orgullo', 'Silencio'] },
    { v: ['Apatía', 'Ira desmedida'], a: ['Calma (mansedumbre)', 'Indiferencia', 'Paciencia infinita', 'Venganza'] },
    { v: ['Aburrimiento (sin humor)', 'Payasería'], a: ['Ingenio (buen humor)', 'Seriedad', 'Ironía', 'Burla'] },
  ],
  FUT: [
    { q: 'El coche puede seguir recto y atropellar a tres peatones que cruzan con luz roja, o girar y chocar contra un muro, lo que mataría a su único pasajero.', a: [['Girar: tres vidas valen más que una', 'con'], ['Seguir: quien cruza con luz roja asume el riesgo', 'deb'], ['Ninguna máquina debería decidir esto sola', 'cui']] },
    { q: 'El coche puede atropellar a un perro o desviarse y rozar a una persona, que quedaría herida pero viva.', a: [['Atropellar al perro', 'con'], ['Desviarse: hay que intentar no matar a nadie', 'cui']] },
    { q: 'Seguir recto mataría a una anciana; desviarse mataría a un niño.', a: [['Salvar al niño: tiene toda la vida por delante', 'con'], ['No elegir por la edad: todas las vidas valen lo mismo', 'deb']] },
  ],
  st() { return store.get(this.KEY, {}) || {}; },
  b() { return Object.assign({ con: 0, deb: 0, vir: 0, cui: 0 }, store.get(this.BKEY, {}) || {}); },
  tag(k) { if (!this.L[k]) return; const b = this.b(); b[k]++; store.set(this.BKEY, b); },
  done(g, pts) {
    const s = this.st(); if (!s[g]) { s[g] = 1; store.set(this.KEY, s); try { addScore(pts); } catch (e) { /* fuera de partida */ } toast(this.T.pts(pts)); }
    if (Object.keys(this.st()).length >= 5) try { achieve('etico'); } catch (e) { /* nada */ }
  },
  voz(t) { try { if (t && typeof Narr !== 'undefined' && Narr.has('narr', t)) Voice.utter(t, null); } catch (e) { /* sin voz */ } },
  build() {
    if (document.getElementById('ej')) return;
    const el = document.createElement('div'); el.id = 'ej'; el.className = 'nb'; el.hidden = true;
    el.innerHTML = '<div class="nb-card ej-card" role="dialog"><button class="ls-x pn-x" id="ej-x" aria-label="✕">✕</button><div class="eyebrow"></div><h3 class="ej-h"></h3><p class="ej-p"></p><div class="ej-body"></div><div class="btns ej-btns"></div></div>';
    el.querySelector('.eyebrow').textContent = this.T.eye; document.body.appendChild(el); el.querySelector('#ej-x').addEventListener('click', () => this.close());
  },
  open(g) { this.build(); Panel.open('ej'); this.gen = (this.gen || 0) + 1; this[g](); },
  close() { this.gen = (this.gen || 0) + 1; Voice.stop(); Panel.close('ej'); },
  ui(h, p) { const el = document.getElementById('ej'); el.querySelector('.ej-h').textContent = h; el.querySelector('.ej-p').textContent = p; Voice.stop(); this.voz(p); el.querySelector('.ej-body').innerHTML = ''; el.querySelector('.ej-btns').innerHTML = ''; return el.querySelector('.ej-body'); },
  btn(label, fn, cls = 'btn primary') { const b = document.createElement('button'); b.className = cls; b.textContent = label; b.addEventListener('click', () => { Audio.click && Audio.click(); fn(); }); document.querySelector('#ej .ej-btns').appendChild(b); return b; },
  say(t) { document.querySelector('#ej .ej-p').textContent = t; Voice.stop(); this.voz(t); },
  // final de cada juego: la explicación y la brújula
  end(g, pts, text) { const body = document.querySelector('#ej .ej-body'); body.innerHTML = ''; this.say(text); this.compass(body); this.done(g, pts); const b = document.querySelector('#ej .ej-btns'); b.innerHTML = ''; this.btn(this.T.again, () => this[g](), 'btn'); this.btn(this.T.close, () => this.close()); },
  compass(box) {
    const b = this.b(); const tot = b.con + b.deb + b.vir + b.cui; const w = document.createElement('div'); w.className = 'ej-comp';
    const h = document.createElement('h4'); h.textContent = '🧭 ' + this.T.brujula; w.appendChild(h);
    if (!tot) { const p = document.createElement('p'); p.textContent = this.T.nada; w.appendChild(p); }
    for (const k of ['con', 'deb', 'vir', 'cui']) { const [n, c] = this.L[k]; const pc = tot ? Math.round((b[k] / tot) * 100) : 0; const r = document.createElement('div'); r.className = 'ej-bar'; r.style.setProperty('--c', c); r.innerHTML = '<span></span><i><b></b></i><em></em>'; r.querySelector('span').textContent = n; r.querySelector('b').style.width = pc + '%'; r.querySelector('em').textContent = pc + ' %'; w.appendChild(r); }
    box.appendChild(w);
  },
  // una pregunta con opciones etiquetadas; tras elegir, sigue
  choice(body, q, opts, after) {
    const p = document.createElement('p'); p.className = 'ej-q'; p.textContent = q; body.appendChild(p); Voice.stop(); this.voz(q);
    const box = document.createElement('div'); box.className = 'ej-ans'; body.appendChild(box);
    for (const [t, k] of opts) { const b = document.createElement('button'); b.className = 'ans'; b.textContent = t; b.addEventListener('click', () => { Audio.click && Audio.click(); this.tag(k); box.querySelectorAll('button').forEach((x) => { x.disabled = true; }); b.classList.add('right'); setTimeout(after, 650); }); box.appendChild(b); }
  },
  // ------------------------------------------------------------ el tranvía
  tranvia() { const body = this.ui(this.T.tH, this.T.tI); let i = 0; const step = () => { body.innerHTML = ''; if (i >= this.TRAN.length) return this.end('tranvia', 50, this.T.tEnd); const it = this.TRAN[i++]; this.choice(body, it.q, it.a, step); }; step(); },
  // ------------------------------------------------------------ el estanque
  estanque() {
    const body = this.ui(this.T.eH, this.T.eI); const steps = [
      ['Vas camino a clases con tus zapatos nuevos. En un estanque poco profundo, un niño pequeño se está ahogando. Si entras a salvarlo, arruinarás los zapatos.', [['Entro a salvarlo, claro', 'cui'], ['Lo salvo: una vida vale más que unos zapatos', 'con']]],
      ['Ahora piensa: con lo que cuestan esos zapatos, donado a una organización seria, se podría salvar la vida de un niño en un país lejano. ¿Estás igual de obligado?', [['Sí: la distancia no cambia el deber', 'con'], ['Es bueno donar, pero no es una obligación', 'deb'], ['Primero debo cuidar a quienes tengo cerca', 'cui'], ['Lo importante es llegar a ser una persona generosa', 'vir']]],
    ]; let i = 0; const step = () => { body.innerHTML = ''; if (i >= steps.length) return this.end('estanque', 40, this.T.eEnd); const [q, a] = steps[i++]; this.choice(body, q, a, step); }; step();
  },
  // ------------------------------------------------------------ Bentham
  bentham() {
    const body = this.ui(this.T.bH, this.T.bI); const V = { A: { i: 7, d: 4, p: 5 }, B: { i: 4, d: 6, p: 2 } };
    const col = (key, title) => { const c = document.createElement('div'); c.className = 'ej-plan'; const h = document.createElement('h4'); h.textContent = title; c.appendChild(h);
      for (const [f, lab, max] of [['i', this.T.bInt, 10], ['d', this.T.bDur, 8], ['p', this.T.bPer, 10]]) { const l = document.createElement('label'); l.className = 'ej-sl'; l.innerHTML = '<span></span><input type="range" min="1"><b></b>'; l.querySelector('span').textContent = lab; const r = l.querySelector('input'); r.max = max; r.value = V[key][f]; l.querySelector('b').textContent = r.value; r.addEventListener('input', () => { V[key][f] = +r.value; l.querySelector('b').textContent = r.value; }); c.appendChild(l); }
      body.appendChild(c); };
    col('A', this.T.bA); col('B', this.T.bB);
    const out = document.createElement('p'); out.className = 'ej-q'; body.appendChild(out);
    this.btn(this.T.bCalc, () => { const s = (v) => v.i * v.d * v.p; const a = s(V.A), b = s(V.B); const w = a === b ? '—' : a > b ? 'A' : 'B'; out.textContent = this.T.bWin(a, b, w); this.tag('con');
      document.querySelector('#ej .ej-btns').innerHTML = ''; this.btn(this.T.next, () => this.end('bentham', 40, this.T.bEnd)); });
  },
  // ------------------------------------------------------------ el velo de la ignorancia
  velo() {
    const body = this.ui(this.T.vH, this.T.vI); const box = document.createElement('div'); box.className = 'ej-ans'; body.appendChild(box);
    this.T.vOpts.forEach(([t, arr], k) => { const b = document.createElement('button'); b.className = 'ans'; b.textContent = t; b.addEventListener('click', () => {
      Audio.click && Audio.click(); box.querySelectorAll('button').forEach((x) => { x.disabled = true; }); b.classList.add('right'); this.tag(k === 0 ? 'con' : 'deb');
      const r = Math.floor(Math.random() * 4); const p = document.createElement('p'); p.className = 'ej-q'; p.textContent = this.T.vYou(this.T.vRoles[r], arr[r]); body.appendChild(p);
      const tb = document.createElement('div'); tb.className = 'ej-roles'; this.T.vRoles.forEach((n, j) => { const s = document.createElement('span'); s.className = j === r ? 'on' : ''; s.textContent = `${n}: ${arr[j]}`; tb.appendChild(s); }); body.appendChild(tb);
      this.btn(this.T.next, () => this.end('velo', 40, this.T.vEnd)); }); box.appendChild(b); });
  },
  // ------------------------------------------------------------ Kant
  kant() {
    const body = this.ui(this.T.kH, this.T.kI); let i = 0, ok = 0;
    const step = () => { body.innerHTML = ''; document.querySelector('#ej .ej-btns').innerHTML = ''; if (i >= this.KANT.length) return this.end('kant', 40, `${ok} / ${this.KANT.length}. ` + this.T.kEnd);
      const it = this.KANT[i++]; const q = document.createElement('p'); q.className = 'ej-q'; q.textContent = '«' + it.m + '»'; body.appendChild(q);
      const box = document.createElement('div'); box.className = 'ej-ans'; body.appendChild(box); const fb = document.createElement('p'); fb.className = 'ej-fb'; body.appendChild(fb);
      for (const [t, v] of [[this.T.kYes, true], [this.T.kNo, false]]) { const b = document.createElement('button'); b.className = 'ans'; b.textContent = t; b.addEventListener('click', () => {
        const good = v === it.ok; if (good) { ok++; Audio.correct && Audio.correct(); } else Audio.wrong && Audio.wrong(); this.tag('deb');
        box.querySelectorAll('button').forEach((x) => { x.disabled = true; }); b.classList.add(good ? 'right' : 'wrong'); fb.textContent = it.e; Voice.stop(); this.voz(it.e); this.btn(this.T.next, step); }); box.appendChild(b); } };
    step();
  },
  // ------------------------------------------------------------ el término medio
  virtud() {
    const body = this.ui(this.T.aH, this.T.aI); let i = 0, ok = 0;
    const step = () => { body.innerHTML = ''; document.querySelector('#ej .ej-btns').innerHTML = ''; if (i >= this.VIRT.length) return this.end('virtud', 40, `${ok} / ${this.VIRT.length}. ` + this.T.aEnd);
      const it = this.VIRT[i++]; const row = document.createElement('div'); row.className = 'ej-mean'; row.innerHTML = '<span></span><b>?</b><span></span>'; const sp = row.querySelectorAll('span'); sp[0].textContent = it.v[0]; sp[1].textContent = it.v[1]; body.appendChild(row);
      const box = document.createElement('div'); box.className = 'ej-ans grid'; body.appendChild(box);
      shuffle([...it.a]).forEach((t) => { const b = document.createElement('button'); b.className = 'ans'; b.textContent = t; b.addEventListener('click', () => { const good = t === it.a[0]; if (good) { ok++; Audio.correct && Audio.correct(); } else Audio.wrong && Audio.wrong(); this.tag('vir');
        box.querySelectorAll('button').forEach((x) => { x.disabled = true; if (x.textContent === it.a[0]) x.classList.add('right'); else if (x === b) x.classList.add('wrong'); }); row.querySelector('b').textContent = it.a[0]; setTimeout(step, 1100); }); box.appendChild(b); }); };
    step();
  },
  // ------------------------------------------------------------ el coche sin conductor
  futuro() {
    const body = this.ui(this.T.fH, this.T.fI); let i = 0;
    const who = [['El fabricante del coche', 'con'], ['Quien escribió el programa', 'deb'], ['La dueña del coche', 'vir'], ['Todos, cada uno en su parte: la responsabilidad se comparte', 'cui']];
    const step = () => { body.innerHTML = ''; if (i > this.FUT.length) return this.end('futuro', 50, this.T.fEnd); if (i === this.FUT.length) { i++; return this.choice(body, this.T.fWho, who, step); } const it = this.FUT[i++]; this.choice(body, it.q, it.a, step); };
    step();
  },
  menu() {
    const body = this.ui(this.T.menu, ''); for (const g of ['tranvia', 'estanque', 'bentham', 'velo', 'kant', 'virtud', 'futuro']) { const b = document.createElement('button'); b.className = 'vs-item ej-m' + (this.st()[g] ? ' done' : ''); b.textContent = this.T[g]; b.addEventListener('click', () => { Audio.click && Audio.click(); this.gen++; this[g](); }); body.appendChild(b); }
    this.compass(body);
  },
};
{
  const GAMES = ['tranvia', 'estanque', 'bentham', 'velo', 'kant', 'virtud', 'futuro'];
  const o0 = Places.open.bind(Places);
  Places.open = function (poi) {
    const r = o0(poi); const foot = document.querySelector('#place .ls-foot'); if (!foot) return r; foot.querySelectorAll('.ej-play').forEach((b) => b.remove());
    for (const g of ((poi && poi.juego) || []).filter((x) => GAMES.includes(x))) { const b = document.createElement('button'); b.className = 'aid bj-play ej-play'; b.textContent = EJ.T[g]; b.addEventListener('click', () => { Audio.click && Audio.click(); Places.close(); setTimeout(() => EJ.open(g), 80); }); foot.prepend(b); }
    return r;
  };
  const pc = document.getElementById('b-pcodex') && document.getElementById('b-pcodex').parentNode;
  if (pc) { const b = document.createElement('button'); b.className = 'btn'; b.id = 'b-petica'; b.hidden = true; b.textContent = EJ.T.menu; b.addEventListener('click', () => { Audio.click && Audio.click(); resumeGame(); setTimeout(() => EJ.open('menu'), 60); }); pc.insertBefore(b, document.getElementById('b-psettings') || null); }
  setInterval(() => { const b = document.getElementById('b-petica'); if (b) b.hidden = !(world && ERAS[world.idx] && ERAS[world.idx].id === 'etica'); }, 700);
  const st = document.createElement('style');
  st.textContent = '#ej{z-index:66}.ej-card{max-height:92vh;overflow-y:auto;max-width:620px;background:linear-gradient(160deg,rgba(44,34,18,.97),rgba(20,14,8,.98));border-color:#e8b04a}.ej-h{font-family:var(--display);font-weight:normal;color:#ffe2a0;margin:2px 34px 6px 0;font-size:1.25rem}.ej-p{line-height:1.5;color:#f3e6c4}'
    + '.ej-q{font-size:1.05rem;color:#fff8e8;line-height:1.5}.ej-ans .ans{width:100%;margin:4px 0;text-align:left}.ej-ans.grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}.ej-ans.grid .ans{text-align:center}.ej-fb{color:#f3e6c4;font-size:.92rem;line-height:1.5}'
    + '.ej-comp{margin-top:14px;padding:12px;border-radius:14px;background:rgba(255,255,255,.04);border:1px solid rgba(232,176,74,.35)}.ej-comp h4{margin:0 0 8px;font-family:var(--display);font-weight:normal;color:#ffe2a0}'
    + '.ej-bar{display:grid;grid-template-columns:150px 1fr 48px;align-items:center;gap:8px;margin:5px 0;font-size:.9rem}.ej-bar i{height:10px;border-radius:6px;background:rgba(255,255,255,.1);overflow:hidden}.ej-bar b{display:block;height:100%;background:var(--c)}.ej-bar em{font-style:normal;text-align:right;color:#fff}'
    + '.ej-plan{border:1px solid rgba(232,176,74,.35);border-radius:12px;padding:8px 12px;margin:8px 0}.ej-plan h4{margin:2px 0 6px;font-weight:normal;color:#ffe2a0}.ej-sl{display:grid;grid-template-columns:130px 1fr 30px;align-items:center;gap:8px;font-size:.88rem;margin:4px 0}.ej-sl input{width:100%}'
    + '.ej-roles{display:flex;flex-wrap:wrap;gap:6px}.ej-roles span{padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.06);font-size:.85rem}.ej-roles span.on{background:#e8b04a;color:#1a1006}'
    + '.ej-mean{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:10px;margin:14px 0;text-align:center}.ej-mean span{padding:10px;border-radius:12px;background:rgba(200,80,80,.18);border:1px solid rgba(220,100,100,.5)}.ej-mean b{font-family:var(--display);font-weight:normal;font-size:1.2rem;color:#8ff0c4;padding:10px 14px;border-radius:12px;border:2px solid #5ab87a}'
    + '.ej-m{display:block;width:100%;text-align:left;margin:6px 0}.ej-m.done::after{content:" ✓";color:#8ff0c4}@media(max-width:520px){.ej-bar{grid-template-columns:110px 1fr 42px}.ej-sl{grid-template-columns:100px 1fr 26px}}';
  document.head.appendChild(st);
}
if (location.hash === '#debug') window.__ej = EJ;
