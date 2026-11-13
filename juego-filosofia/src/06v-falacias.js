// ============================================================================
//  CAZADOR DE FALACIAS Y BESTIARIO
//  · En el mercado de los sofistas, cada puesto esconde un pregón tramposo:
//    acércate, «Analizar», y elige qué falacia es. Si aciertas, la cazas.
//  · El bestiario (Inicio → Falacias) explica las 26 falacias con ejemplos y
//    cómo responder a cada una, y tiene un entrenamiento con todos los ejemplos,
//    para aprender en cualquier momento, también fuera del juego.
// ============================================================================
const FAL_KEY = 'odisea-razon.falacias', FAL_BEST_KEY = 'odisea-razon.falacias-racha';
ACH.push(
  { id: 'cazador1', i: '🔎', n: 'Primera falacia', d: 'Caza tu primera falacia en el mercado de los sofistas.' },
  { id: 'cazador10', i: '🕵', n: 'Cazador de falacias', d: 'Caza 10 falacias distintas.' },
  { id: 'cazadortodas', i: '🏛', n: 'Bestiario completo', d: 'Caza todas las falacias del bestiario.' },
  { id: 'entrenado', i: '🎯', n: 'Mente clara', d: 'Acierta 10 falacias seguidas en el entrenamiento.' },
);
const Falacias = {
  caught: new Set(store.get(FAL_KEY, []) || []),
  // tres opciones falsas, preferentemente del mismo grupo (para que pensar valga la pena)
  options(f) {
    const same = shuffle(FALACIAS.filter((x) => x.id !== f.id && x.g === f.g)); const other = shuffle(FALACIAS.filter((x) => x.id !== f.id && x.g !== f.g));
    return shuffle([f, ...[...same.slice(0, 2), ...other].slice(0, 3)]);
  },
  catch(f) {
    if (this.caught.has(f.id)) return false; this.caught.add(f.id); store.set(FAL_KEY, [...this.caught]);
    achieve('cazador1'); if (this.caught.size >= 10) achieve('cazador10'); if (this.caught.size >= FALACIAS.length) achieve('cazadortodas');
    return true;
  },
  art(f) { requestAnimationFrame(() => { const a = $('#xp-art'); if (!a) return; a.hidden = false; a.style.backgroundImage = `url(img/fal-${f.id}.jpg)`; a.style.backgroundSize = 'cover'; a.style.backgroundPosition = 'center'; }); },
  explain(f) { return `${f.d} Cómo responder: ${f.r}`; },
  // ---------- los puestos del mercado
  build(W) {
    if (!W.falStalls || !W.falStalls.length) return;
    const order = shuffle([...FALACIAS]); let n = 0;
    const next = () => { const f = order[n++ % order.length]; return { f, ej: pick(f.ej) }; };
    W.spots = W.spots || [];
    W.falStalls.forEach((p, i) => {
      const st = { ...next(), done: false };
      const sign = new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true, depthWrite: false, toneMapped: false }));
      sign.scale.set(2.4, 0.6, 1); sign.position.set(p.sx, 3.9, p.sz); W.group.add(sign);
      const paint = () => { sign.material.map = labelTexture(st.done ? '✓ ' + st.f.n : '❓ Pregón tramposo', st.done ? 'Falacia cazada' : 'Analiza su argumento', st.done ? '#b8f0c8' : '#ffe3a3'); sign.material.needsUpdate = true; };
      paint();
      const ask = () => {
        const ops = this.options(st.f).map((o) => [o.n, () => this.answer(st, o, paint)]);
        XP.open('🔎 Cazador de falacias · puesto ' + (i + 1), '«' + st.ej + '»', 'El pregonero grita esto para convencerte. ¿Qué falacia esconde su argumento?', ops.map(([a, b]) => [a, b, 'ghost']));
        Voice.say(st.ej);
      };
      W.spots.push({ x: p.x, z: p.z, r: 2.2, verb: 'Analizar', get label() { return st.done ? 'Ya cazaste esta falacia' : 'El pregón del puesto ' + (i + 1); }, on: () => !st.done && !W.zoneIn, act: ask });
    });
    const ex = (W.falStalls || []).length; if (ex) setTimeout(() => { if (world === W) toast(`🔎 Hay ${ex} puestos con pregones tramposos. Acércate y caza sus falacias.`); }, 4000);
  },
  answer(st, o, paint) {
    const ok = o.id === st.f.id; const f = st.f;
    if (ok) {
      const nueva = this.catch(f); st.done = true; paint(); const pts = nueva ? 150 : 80; addScore(pts); updateHud();
      Audio.correct(); buzz([20, 30]); popup(`+${pts}<small>falacia cazada</small>`, 'up');
      setTimeout(() => XP.open('✓ ¡Falacia cazada!' + (nueva ? ' · nueva en tu bestiario' : ''), f.n + ' (' + f.l + ')', this.explain(f), [['Seguir', null], ['Abrir el bestiario', () => this.open()]]) || this.art(f), 60);
    } else {
      Audio.wrong && Audio.wrong(); buzz([50, 40]);
      const was = st.f; st.ej = pick(was.ej.filter((e) => e !== st.ej)) || st.ej;
      setTimeout(() => XP.open('✗ No era esa', `Era: ${was.n}`, `«${o.n}» no encaja aquí. ${this.explain(was)} El pregonero tiene otro ejemplo: vuelve a analizarlo.`, [['Seguir', null]]) || this.art(was), 60);
    }
  },
  // ---------- el bestiario
  open() { Panel.open('fa'); this.tab = this.tab || 'lista'; this.paint(); },
  close() { Panel.close('fa'); },
  paint() {
    $('#fa-count').textContent = `${this.caught.size} de ${FALACIAS.length} falacias cazadas en el mercado de los sofistas`;
    document.querySelectorAll('#fa-tabs button').forEach((b) => b.classList.toggle('on', b.dataset.t === this.tab));
    $('#fa-items').hidden = this.tab !== 'lista'; $('#fa-train').hidden = this.tab !== 'entrena';
    if (this.tab === 'lista') this.paintList(); else this.paintTrain();
  },
  paintList() {
    const box = $('#fa-items'); box.innerHTML = '';
    const groups = [...new Set(FALACIAS.map((f) => f.g))];
    for (const g of groups) {
      const h = document.createElement('h4'); h.className = 'fa-gh'; h.textContent = g; box.appendChild(h);
      for (const f of FALACIAS.filter((x) => x.g === g)) {
        const on = this.caught.has(f.id); const it = document.createElement('details'); it.className = 'fa-it' + (on ? ' got' : '');
        it.innerHTML = '<summary><b></b><i></i><span class="fa-ok"></span></summary><div class="fa-img"></div><p class="fa-d"></p><p class="fa-ex"></p><p class="fa-r"></p>'; it.querySelector('.fa-img').style.backgroundImage = `url(img/fal-${f.id}.jpg)`;
        it.querySelector('b').textContent = f.n; it.querySelector('i').textContent = f.l; it.querySelector('.fa-ok').textContent = on ? '✓ cazada' : '';
        it.querySelector('.fa-d').textContent = f.d; it.querySelector('.fa-ex').textContent = '«' + f.ej[0] + '»'; it.querySelector('.fa-r').textContent = 'Cómo responder: ' + f.r;
        box.appendChild(it);
      }
    }
  },
  // ---------- entrenamiento: ejemplos al azar de todas las falacias
  paintTrain() {
    const t = this.tr || (this.tr = { streak: 0 }); const box = $('#fa-train'); const best = store.get(FAL_BEST_KEY, 0) || 0;
    if (!t.cur || t.answered === true && t.go) { const f = pick(FALACIAS); t.cur = { f, ej: pick(f.ej), ops: this.options(f) }; t.answered = false; t.go = false; }
    const c = t.cur;
    box.innerHTML = '<p class="fa-stk"></p><blockquote class="fa-q"></blockquote><p class="qd-note">¿Qué falacia es?</p><div class="fa-ops"></div><div class="fa-fb" hidden></div>';
    box.querySelector('.fa-stk').textContent = `Racha: ${t.streak} · Mejor racha: ${best}`;
    box.querySelector('.fa-q').textContent = '«' + c.ej + '»';
    const ops = box.querySelector('.fa-ops');
    c.ops.forEach((o) => { const b = document.createElement('button'); b.className = 'btn ghost'; b.textContent = o.n; b.addEventListener('click', () => this.trainAnswer(o, b)); ops.appendChild(b); });
  },
  trainAnswer(o, btn) {
    const t = this.tr; if (t.answered) return; t.answered = true; const c = t.cur; const ok = o.id === c.f.id;
    const box = $('#fa-train'); box.querySelectorAll('.fa-ops button').forEach((b) => { b.disabled = true; if (b.textContent === c.f.n) b.classList.add('right'); });
    if (ok) { t.streak++; Audio.correct(); const best = store.get(FAL_BEST_KEY, 0) || 0; if (t.streak > best) store.set(FAL_BEST_KEY, t.streak); if (t.streak >= 10) achieve('entrenado'); }
    else { btn.classList.add('wrong'); t.streak = 0; Audio.wrong && Audio.wrong(); }
    const fb = box.querySelector('.fa-fb'); fb.hidden = false; fb.innerHTML = '<div class="fa-img"></div><b></b><p></p><button class="btn primary">Siguiente</button>'; fb.querySelector('.fa-img').style.backgroundImage = `url(img/fal-${c.f.id}.jpg)`;
    fb.querySelector('b').textContent = (ok ? '✓ Correcto: ' : '✗ Era: ') + c.f.n + ' (' + c.f.l + ')'; fb.querySelector('p').textContent = this.explain(c.f);
    fb.querySelector('button').addEventListener('click', () => { Audio.click(); t.go = true; this.paintTrain(); });
    box.querySelector('.fa-stk').textContent = `Racha: ${t.streak} · Mejor racha: ${store.get(FAL_BEST_KEY, 0) || 0}`;
  },
};
on('#b-falacias', () => { Audio.click(); Falacias.open(); });
on('#fa-x', () => Falacias.close());
document.querySelectorAll('#fa-tabs button').forEach((b) => b.addEventListener('click', () => { Audio.click(); Falacias.tab = b.dataset.t; Falacias.paint(); }));
