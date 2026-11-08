// ============================================================================
//  LECCIONES HABLADAS
//  Cada filósofo puede dar una clase de su pensamiento, narrada frase a frase
//  con la voz del sistema (si existe) y con subtítulos que se resaltan.
// ============================================================================
const LESSON_KEY = 'odisea-razon.lecciones';
const Lesson = {
  data: null, sage: null, parts: [], i: 0, s: 0, sentences: [], playing: false, from: 'world', rate: 1, gen: 0, timer: 0, prevState: null,
  hasVoice() { return Narr.has(this.book ? 'narr' : this.data.id, this.parts[0] || '') || ('speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined'); },
  // abre la lección de un filósofo (data de ERAS); sage = objeto 3D si estamos junto a él
  open(data, sage) {
    this.book = null; this.data = data; this.parts = LESSONS[data.id] || [];
    this.begin(sage ? 'world' : 'menu', sage);
    $('#ls-medal').textContent = data.short[0]; $('#ls-name').textContent = 'Lección de ' + data.short; $('#ls-meta').textContent = `${data.epithet} · ${data.dates}`;
    this.show();
  },
  // abre un libro (BOOKS) para estudiarlo, junto a su atril o desde la biblioteca del códice
  openBook(b, inWorld) {
    this.book = b; this.data = { id: b.author, short: b.by };
    this.parts = [...b.parts.map(bookPartText), 'Una cita para recordar. ' + b.quote];
    this.begin(inWorld ? 'world' : 'menu', null);
    $('#ls-medal').textContent = '❦'; $('#ls-name').textContent = b.title; $('#ls-meta').textContent = `${b.by} · ${b.year} · ${b.kind}`;
    this.show();
  },
  begin(from, sage) {
    this.sage = sage || null; this.i = 0; this.s = 0; this.from = from; this.prevState = G.state; this.done = false;
    if (from === 'world') {
      G.state = 'lesson'; unlockPointer(); input.fire = false; input.auto = false; input.keys = {}; input.walk = null;
      $('#hud').hidden = true; $('#touch').hidden = true; if (sage) { Duel.sage = sage; sage.gesture = 1; }
    } else { this.prevScreen = SCREENS.find((s) => !$('#' + s).hidden) || 'title'; hideAll(); G.lessonMenu = true; }
    $('#lesson').classList.toggle('book', !!this.book);
  },
  show() {
    $('#ls-reward').hidden = true; $('#lesson').classList.remove('quiz'); $('#ls-next').textContent = 'Siguiente';
    const note = $('#ls-note');
    note.hidden = this.hasVoice(); note.textContent = 'Tu navegador no tiene voz sintética: la lección avanzará sola a ritmo de lectura.';
    $('#lesson').hidden = false;
    this.duck(true); this.render(); this.play();
    Audio.click();
  },
  duck(on) { if (!Audio.ctx) return; const t = Audio.ctx.currentTime; Audio.music.gain.setTargetAtTime(on ? 0.55 * G.settings.music * 0.18 : 0.55 * G.settings.music, t, 0.4); },
  split(text) { return narrSplit(text); },
  render() {
    const p = this.parts[this.i] || ''; this.sentences = this.split(p);
    const box = $('#ls-text'); box.innerHTML = '';
    this.sentences.forEach((t, k) => { const sp = document.createElement('span'); sp.textContent = t + ' '; if (k === this.s) sp.className = 'on'; if (this.book && k === 0) { sp.classList.add('ttl'); } box.appendChild(sp); });
    $('#ls-dots').innerHTML = this.parts.map((_, k) => `<i class="${k < this.i ? 'done' : k === this.i ? 'now' : ''}"></i>`).join('');
    $('#ls-count').textContent = `${this.i + 1} de ${this.parts.length}`;
    $('#ls-play').textContent = this.playing ? 'Pausa' : 'Escuchar';
    $('#ls-prev').disabled = this.i === 0 && this.s === 0;
    $('#ls-next').textContent = this.i >= this.parts.length - 1 ? 'Terminar' : 'Siguiente';
  },
  mark() { [...$('#ls-text').children].forEach((sp, k) => sp.classList.toggle('on', k === this.s)); },
  play() { this.playing = true; this.render(); this.speak(); },
  pause() { this.playing = false; this.gen++; clearTimeout(this.timer); Voice.stop(); this.render(); },
  toggle() { if (this.playing) this.pause(); else this.play(); },
  speak() {
    const gen = ++this.gen; clearTimeout(this.timer);
    const text = this.sentences[this.s]; if (!text) return;
    this.mark();
    const after = () => { if (gen !== this.gen || !this.playing) return; this.advance(true); };
    Voice.utter(text, this.book ? null : this.sage || { data: this.data, boss: !!this.data.boss }, this.rate, after);
    if (this.sage) this.sage.gesture = Math.max(this.sage.gesture, 0.6);
  },
  advance(auto) {
    if (this.s < this.sentences.length - 1) { this.s++; if (this.playing) this.speak(); else this.mark(); this.render(); return; }
    if (this.i < this.parts.length - 1) {
      this.i++; this.s = 0; this.render();
      if (this.playing) { this.gen++; this.timer = setTimeout(() => this.speak(), auto ? 450 : 50); }
      return;
    }
    this.finish();
  },
  next() { Voice.stop(); this.gen++; if (this.i < this.parts.length - 1) { this.i++; this.s = 0; this.render(); if (this.playing) this.speak(); } else this.finish(); },
  prev() { Voice.stop(); this.gen++; if (this.s > 0) this.s = 0; else if (this.i > 0) { this.i--; this.s = 0; } this.render(); if (this.playing) this.speak(); },
  speed() { this.rate = this.rate === 1 ? 1.2 : this.rate === 1.2 ? 0.9 : 1; $('#ls-speed').textContent = `${this.rate}×`.replace('.', ','); if (this.playing) this.speak(); },
  finish() {
    this.pause();
    if (this.book) return this.bookQuiz();
    const heard = new Set(store.get(LESSON_KEY, [])); const first = !heard.has(this.data.id); heard.add(this.data.id); store.set(LESSON_KEY, [...heard]);
    achieve('discipulo'); if (heard.size >= 10) achieve('academia'); if (heard.size >= ERAS.flatMap((e) => e.sages).length) achieve('liceo');
    const rew = $('#ls-reward'); rew.hidden = false;
    const s = this.sage;
    if (s && s.state !== 'defeated') {
      G.lessonFree = G.lessonFree || {}; G.lessonFree[this.data.id] = true;
      rew.textContent = `Has escuchado a ${this.data.short}. En su duelo tendrás una Mayéutica gratis.`;
    } else rew.textContent = first ? `Lección completada. ${heard.size} de ${ERAS.flatMap((e) => e.sages).length} lecciones escuchadas.` : 'Lección completada.';
    if (first && this.from === 'world') { G.frags += 1; rew.textContent += ' +1 fragmento.'; }
    Music.sting('achievement'); buzz([20, 40]);
    $('#ls-next').textContent = 'Cerrar'; $('#ls-play').textContent = 'Repetir';
    this.done = true;
  },
  // al terminar un libro: pregunta de estudio
  bookQuiz() {
    const b = this.book; const studied = store.get(BOOK_KEY, []); const already = studied.includes(b.id);
    const rew = $('#ls-reward'); rew.hidden = false; rew.innerHTML = ''; $('#lesson').classList.add('quiz');
    const p = document.createElement('p'); p.className = 'bq-q'; p.textContent = (already ? 'Repaso · ' : 'Pregunta de estudio · ') + b.q.q; rew.appendChild(p);
    const box = document.createElement('div'); box.className = 'bq-ops'; rew.appendChild(box);
    const opts = shuffle(b.q.a.map((t, k) => ({ t, ok: k === 0 })));
    for (const o of opts) {
      const btn = document.createElement('button'); btn.className = 'tk-op ans'; btn.textContent = o.t; box.appendChild(btn);
      btn.addEventListener('click', () => {
        if (box.dataset.done) return;
        if (!o.ok) {
          btn.classList.add('bad'); btn.disabled = true; Audio.wrong(); buzz([40, 30, 60]);
          if (this.from === 'world' && !already) { G.hp = Math.max(1, G.hp - 5); popup('−5 razón', 'bad'); }
          return;
        }
        box.dataset.done = '1'; btn.classList.add('good'); Audio.correct();
        const msg = document.createElement('p'); msg.className = 'bq-msg'; rew.appendChild(msg);
        if (!already) {
          studied.push(b.id); store.set(BOOK_KEY, studied);
          G.frags += 1; addScore(80); Music.sting('achievement'); buzz([20, 40, 60]);
          G.lessonFree = G.lessonFree || {}; G.lessonFree[b.author] = true;
          const here = typeof sages !== 'undefined' && sages.some((s) => s.data.id === b.author && s.state !== 'defeated');
          msg.textContent = `¡Libro estudiado! +1 fragmento.${here ? ` En el debate con ${(ERAS.flatMap((e) => e.sages).find((s) => s.id === b.author) || {}).short} tendrás una Mayéutica gratis.` : ''} ${b.q.e}`;
          achieve('lector'); if (studied.length >= 5) achieve('biblioteca'); if (studied.length >= BOOKS.flat().length) achieve('alejandria');
          if (typeof world !== 'undefined' && world && world.books) { const wb = world.books.find((x) => x.id === b.id); if (wb) markBookRead(wb); }
          updateHud();
        } else msg.textContent = b.q.e;
      });
    }
    $('#ls-next').textContent = 'Cerrar'; $('#ls-play').textContent = 'Releer';
    this.done = true;
  },
  close() {
    this.pause(); this.done = false; $('#lesson').classList.remove('book', 'quiz'); $('#lesson').hidden = true; this.duck(false);
    if (this.from === 'world') {
      Duel.sage = null; G.state = 'play'; $('#hud').hidden = false; if (IS_TOUCH) $('#touch').hidden = false;
      camera.fov = baseFov(); camera.updateProjectionMatrix(); lockPointer(); updateHud();
    } else { G.lessonMenu = false; show(this.prevScreen || 'title'); if (this.prevScreen === 'codex') renderCodex(); }
  },
  // cámara hacia el filósofo durante la lección
  update(dt) {
    const s = this.sage; if (!s) return;
    const head = _v1.copy(s.pos); head.y += 1.95 * s.scale + (s.boss ? 0.25 : 0);
    const eye = _v2.set(player.pos.x, player.pos.y + 1.68, player.pos.z); const dir = head.sub(eye);
    const wantYaw = Math.atan2(-dir.x, -dir.z); const wantPitch = Math.atan2(dir.y, Math.hypot(dir.x, dir.z)) - 0.1;
    let dy = wantYaw - player.yaw; while (dy > Math.PI) dy -= TAU; while (dy < -Math.PI) dy += TAU;
    player.yaw += dy * Math.min(1, dt * 3); player.pitch = damp(player.pitch, wantPitch, 3, dt);
    camera.position.copy(eye); camera.rotation.set(player.pitch, player.yaw, 0, 'YXZ');
    camera.fov = damp(camera.fov, baseFov() * 0.8, 2, dt); camera.updateProjectionMatrix();
  },
};
$('#ls-play').addEventListener('click', () => { if (Lesson.done) { Lesson.done = false; $('#ls-reward').hidden = true; $('#lesson').classList.remove('quiz'); Lesson.i = 0; Lesson.s = 0; Lesson.render(); Lesson.play(); } else Lesson.toggle(); });
$('#ls-next').addEventListener('click', () => { if (Lesson.done) Lesson.close(); else Lesson.next(); });
$('#ls-prev').addEventListener('click', () => Lesson.prev());
$('#ls-speed').addEventListener('click', () => Lesson.speed());
$('#ls-close').addEventListener('click', () => Lesson.close());
window.addEventListener('keydown', (e) => {
  if ($('#lesson').hidden || e.repeat) return;
  if (e.code === 'Space') { e.preventDefault(); $('#ls-play').click(); }
  else if (e.code === 'ArrowRight' || e.code === 'Enter') { e.preventDefault(); $('#ls-next').click(); }
  else if (e.code === 'ArrowLeft') Lesson.prev();
  else if (e.code === 'Escape') Lesson.close();
});
document.addEventListener('visibilitychange', () => { if (document.hidden && !$('#lesson').hidden) Lesson.pause(); });
// abrir la lección del filósofo que tienes delante
function tryLesson() {
  const s = nearestSage(); if (!s || s.state === 'shielded' || s.state === 'sealed') return;
  Lesson.open(s.data, s);
}
