// ============================================================================
//  LECCIONES HABLADAS
//  Cada filósofo puede dar una clase de su pensamiento, narrada frase a frase
//  con la voz del sistema (si existe) y con subtítulos que se resaltan.
// ============================================================================
const LESSON_KEY = 'odisea-razon.lecciones';
const Lesson = {
  data: null, sage: null, parts: [], i: 0, s: 0, sentences: [], playing: false, from: 'world', rate: 1, gen: 0, timer: 0, prevState: null,
  hasVoice() { return 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined'; },
  // abre la lección de un filósofo (data de ERAS); sage = objeto 3D si estamos junto a él
  open(data, sage) {
    this.data = data; this.sage = sage || null; this.parts = LESSONS[data.id] || []; this.i = 0; this.s = 0;
    this.from = sage ? 'world' : 'menu'; this.prevState = G.state;
    if (this.from === 'world') {
      G.state = 'lesson'; unlockPointer(); input.fire = false; input.auto = false; input.keys = {};
      $('#hud').hidden = true; $('#touch').hidden = true; Duel.sage = sage; sage.gesture = 1;
    } else { this.prevScreen = SCREENS.find((s) => !$('#' + s).hidden) || 'title'; hideAll(); G.lessonMenu = true; }
    $('#ls-medal').textContent = data.short[0]; $('#ls-name').textContent = 'Lección de ' + data.short; $('#ls-meta').textContent = `${data.epithet} · ${data.dates}`;
    $('#ls-reward').hidden = true;
    const note = $('#ls-note');
    note.hidden = this.hasVoice(); note.textContent = 'Tu navegador no tiene voz sintética: la lección avanzará sola a ritmo de lectura.';
    $('#lesson').hidden = false;
    this.duck(true); this.render(); this.play();
    Audio.click();
  },
  duck(on) { if (!Audio.ctx) return; const t = Audio.ctx.currentTime; Audio.music.gain.setTargetAtTime(on ? 0.55 * G.settings.music * 0.18 : 0.55 * G.settings.music, t, 0.4); },
  split(text) { return (text.match(/[^.!?¿¡]*(?:[¿¡][^?!]*[?!]|[^.!?]+[.!?]+)\s*|[^.!?]+$/g) || [text]).map((x) => x.trim()).filter(Boolean); },
  render() {
    const p = this.parts[this.i] || ''; this.sentences = this.split(p);
    const box = $('#ls-text'); box.innerHTML = '';
    this.sentences.forEach((t, k) => { const sp = document.createElement('span'); sp.textContent = t + ' '; if (k === this.s) sp.className = 'on'; box.appendChild(sp); });
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
    if (this.hasVoice()) {
      Voice.utter(text, this.sage || { data: this.data, boss: !!this.data.boss }, this.rate, after);
      // seguridad: si el navegador no avisa del final, avanzamos igualmente
      this.timer = setTimeout(after, (text.length / 11 + 3) * 1000 / this.rate);
    } else this.timer = setTimeout(after, Math.max(2200, text.length * 62) / this.rate);
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
    const heard = new Set(store.get(LESSON_KEY, [])); const first = !heard.has(this.data.id); heard.add(this.data.id); store.set(LESSON_KEY, [...heard]);
    achieve('discipulo'); if (heard.size >= 10) achieve('academia'); if (heard.size >= 25) achieve('liceo');
    const rew = $('#ls-reward'); rew.hidden = false;
    const s = this.sage;
    if (s && s.state !== 'defeated') {
      G.lessonFree = G.lessonFree || {}; G.lessonFree[this.data.id] = true;
      rew.textContent = `Has escuchado a ${this.data.short}. En su duelo tendrás una Mayéutica gratis.`;
    } else rew.textContent = first ? `Lección completada. ${heard.size} de 25 lecciones escuchadas.` : 'Lección completada.';
    if (first && this.from === 'world') { G.frags += 1; rew.textContent += ' +1 fragmento.'; }
    Music.sting('achievement'); buzz([20, 40]);
    $('#ls-next').textContent = 'Cerrar'; $('#ls-play').textContent = 'Repetir';
    this.done = true;
  },
  close() {
    this.pause(); this.done = false; $('#lesson').hidden = true; this.duck(false);
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
// voz por frases, con aviso al terminar
Voice.utter = function (text, sage, rate, onend) {
  try {
    speechSynthesis.cancel(); if (!this.v) this.pick();
    const u = new SpeechSynthesisUtterance(text); u.lang = 'es-ES'; if (this.v) u.voice = this.v;
    const id = sage && sage.data ? sage.data.id : ''; const h = [...id].reduce((a, c) => a + c.charCodeAt(0), 0);
    const boss = sage && (sage.boss || (sage.data && sage.data.boss));
    u.pitch = boss ? 0.62 : 0.8 + (h % 5) * 0.08; u.rate = (boss ? 0.92 : 0.98) * rate; u.volume = Math.min(1, 0.4 + G.settings.sfx);
    u.onend = onend; u.onerror = () => {};
    speechSynthesis.speak(u);
  } catch (e) { /* sin voz */ }
};
$('#ls-play').addEventListener('click', () => { if (Lesson.done) { Lesson.done = false; $('#ls-reward').hidden = true; Lesson.i = 0; Lesson.s = 0; Lesson.render(); Lesson.play(); } else Lesson.toggle(); });
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
