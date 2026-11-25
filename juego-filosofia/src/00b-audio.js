// ============================================================================
//  AUDIO PROCEDURAL (WebAudio)
// ============================================================================
const Audio = {
  ctx: null, master: null, music: null, sfx: null, reverb: null, musicTimer: 0, era: 0, mode: 'calm', nextNote: 0, step: 0, drone: null,
  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    try {
      const AC = window.AudioContext || window.webkitAudioContext; this.ctx = new AC();
    } catch (e) { return; }
    const c = this.ctx;
    this.master = c.createGain(); this.master.gain.value = 0.9; this.master.connect(c.destination);
    this.music = c.createGain(); this.sfx = c.createGain();
    this.reverb = c.createConvolver(); this.reverb.buffer = this.impulse(3.2, 2.2);
    const rv = c.createGain(); rv.gain.value = 0.55; this.reverb.connect(rv); rv.connect(this.master);
    this.music.connect(this.master); this.sfx.connect(this.master);
    this.musicSend = c.createGain(); this.musicSend.gain.value = 0.8; this.music.connect(this.musicSend); this.musicSend.connect(this.reverb);
    this.sfxSend = c.createGain(); this.sfxSend.gain.value = 0.25; this.sfx.connect(this.sfxSend); this.sfxSend.connect(this.reverb);
    this.applyVolumes();
    this.noiseBuf = c.createBuffer(1, c.sampleRate, c.sampleRate);
    const d = this.noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  },
  applyVolumes() {
    if (!this.ctx) return;
    this.music.gain.value = 0.55 * G.settings.music; this.sfx.gain.value = 0.8 * G.settings.sfx;
  },
  impulse(sec, decay) {
    const c = this.ctx, len = c.sampleRate * sec, b = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) { const d = b.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay); }
    return b;
  },
  tone(freq, dur, { type = 'sine', vol = 0.2, attack = 0.005, out = 'sfx', slide = 0, when = 0, filter = 0 } = {}) {
    if (!this.ctx) return;
    const c = this.ctx, t = c.currentTime + when;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq * slide), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    let node = o;
    if (filter) { const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = filter; o.connect(f); node = f; }
    node.connect(g); g.connect(out === 'sfx' ? this.sfx : this.music);
    o.start(t); o.stop(t + dur + 0.05);
  },
  noise(dur, { vol = 0.2, freq = 1200, q = 1, type = 'bandpass', slide = 0, when = 0 } = {}) {
    if (!this.ctx) return;
    const c = this.ctx, t = c.currentTime + when;
    const s = c.createBufferSource(); s.buffer = this.noiseBuf; s.loop = true;
    const f = c.createBiquadFilter(); f.type = type; f.frequency.setValueAtTime(freq, t); f.Q.value = q;
    if (slide) f.frequency.exponentialRampToValueAtTime(Math.max(30, freq * slide), t + dur);
    const g = c.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(this.sfx); s.start(t); s.stop(t + dur + 0.05);
  },
  // ---- efectos
  shoot() { this.tone(880, 0.12, { type: 'triangle', vol: 0.12, slide: 1.8 }); this.noise(0.08, { vol: 0.05, freq: 4000 }); },
  hit() { this.tone(520, 0.08, { type: 'square', vol: 0.05, slide: 0.5, filter: 2000 }); },
  kill() { this.noise(0.45, { vol: 0.18, freq: 1800, slide: 0.15 }); this.tone(330, 0.4, { type: 'sawtooth', vol: 0.06, slide: 0.25, filter: 1500 }); },
  hurt() { this.tone(110, 0.3, { type: 'sawtooth', vol: 0.18, slide: 0.5, filter: 600 }); this.noise(0.2, { vol: 0.12, freq: 400 }); },
  enemyShot() { this.tone(240, 0.25, { type: 'sine', vol: 0.06, slide: 0.6 }); },
  pickup() { [0, 4, 7].forEach((s, i) => this.tone(880 * Math.pow(2, s / 12), 0.25, { type: 'sine', vol: 0.1, when: i * 0.05 })); },
  heal() { [0, 5, 9, 12].forEach((s, i) => this.tone(523 * Math.pow(2, s / 12), 0.4, { type: 'triangle', vol: 0.09, when: i * 0.07 })); },
  epoje() { this.tone(160, 0.9, { type: 'sine', vol: 0.3, slide: 3 }); this.noise(0.8, { vol: 0.15, freq: 600, slide: 6 }); },
  correct() { [0, 4, 7, 12].forEach((s, i) => this.tone(587 * Math.pow(2, s / 12), 0.6, { type: 'triangle', vol: 0.12, when: i * 0.07 })); },
  wrong() { this.tone(196, 0.6, { type: 'sawtooth', vol: 0.1, filter: 900 }); this.tone(207.6, 0.6, { type: 'sawtooth', vol: 0.1, filter: 900 }); },
  tick() { this.tone(1800, 0.04, { type: 'square', vol: 0.03 }); },
  gong() { [1, 2.76, 5.4].forEach((m, i) => this.tone(98 * m, 3 - i * 0.6, { type: 'sine', vol: 0.18 / (i + 1), attack: 0.01 })); this.noise(1.2, { vol: 0.06, freq: 300 }); },
  portal() { for (let i = 0; i < 6; i++) this.tone(220 * Math.pow(2, i / 3), 1.4, { type: 'sine', vol: 0.06, when: i * 0.12, slide: 1.5 }); },
  shield() { this.tone(300, 0.8, { type: 'triangle', vol: 0.1, slide: 0.5 }); this.noise(0.6, { vol: 0.1, freq: 2500, slide: 0.2 }); },
  victory() { [0, 4, 7, 12, 16, 19, 24].forEach((s, i) => this.tone(392 * Math.pow(2, s / 12), 1.2, { type: 'triangle', vol: 0.1, when: i * 0.09 })); },
  click() { this.tone(1200, 0.05, { type: 'triangle', vol: 0.05 }); },
  step() { this.noise(0.07, { vol: 0.025, freq: 500, q: 0.7 }); },
  jump() { this.tone(260, 0.18, { type: 'triangle', vol: 0.07, slide: 1.6 }); },
  splash() { this.noise(0.8, { vol: 0.3, freq: 900, q: 0.5, slide: 0.3 }); this.tone(140, 0.4, { type: 'sine', vol: 0.15, slide: 0.5 }); },
  fall() { this.tone(500, 1.0, { type: 'sine', vol: 0.12, slide: 0.15 }); },
  dash() { this.noise(0.35, { vol: 0.2, freq: 900, q: 0.6, slide: 3 }); this.tone(180, 0.3, { type: 'sine', vol: 0.12, slide: 2.2 }); },

  // ---- música generativa por etapa
  SCALES: [
    { root: 146.83, scale: [0, 2, 3, 5, 7, 9, 10], inst: 'lyre', tempo: 0.42 },     // I  dórico
    { root: 164.81, scale: [0, 1, 3, 5, 7, 8, 10], inst: 'lyre', tempo: 0.38 },     // II frigio (dórico griego)
    { root: 130.81, scale: [0, 2, 4, 5, 7, 9, 10], inst: 'horn', tempo: 0.5 },      // III mixolidio
    { root: 146.83, scale: [0, 2, 3, 5, 7, 9, 10], inst: 'organ', tempo: 0.9 },     // IV canto llano
    { root: 196.0, scale: [0, 2, 4, 5, 7, 9, 11], inst: 'lute', tempo: 0.3 },       // V jónico
    { root: 220.0, scale: [0, 2, 3, 5, 7, 8, 11], inst: 'harpsi', tempo: 0.22 },    // VI menor armónica
  ],
  startMusic(era) {
    if (!this.ctx) return;
    this.era = era; this.stopDrone();
    const c = this.ctx, s = this.SCALES[era];
    const g = c.createGain(); g.gain.value = 0; g.gain.linearRampToValueAtTime(0.06, c.currentTime + 3);
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 500;
    const lfo = c.createOscillator(); lfo.frequency.value = 0.07; const lg = c.createGain(); lg.gain.value = 250; lfo.connect(lg); lg.connect(f.frequency); lfo.start();
    const oscs = [s.root / 2, s.root * 0.75, s.root / 2 * 1.003].map((fr) => { const o = c.createOscillator(); o.type = era === 3 ? 'triangle' : 'sawtooth'; o.frequency.value = fr; o.connect(f); o.start(); return o; });
    f.connect(g); g.connect(this.music);
    this.drone = { g, oscs, lfo };
    this.nextNote = c.currentTime + 1; this.step = 0; this.melIdx = 7;
  },
  stopDrone() {
    if (!this.drone || !this.ctx) return;
    const d = this.drone, t = this.ctx.currentTime;
    d.g.gain.cancelScheduledValues(t); d.g.gain.setValueAtTime(d.g.gain.value, t); d.g.gain.linearRampToValueAtTime(0, t + 1.5);
    setTimeout(() => { d.oscs.forEach((o) => o.stop()); d.lfo.stop(); }, 1700);
    this.drone = null;
  },
  note(freq, when, inst, vol) {
    const o = { out: 'music', when };
    switch (inst) {
      case 'lyre': this.tone(freq, 1.6, { ...o, type: 'triangle', vol: vol, attack: 0.004 }); this.tone(freq * 2, 0.6, { ...o, type: 'sine', vol: vol * 0.3 }); break;
      case 'horn': this.tone(freq, 1.2, { ...o, type: 'sawtooth', vol: vol * 0.5, attack: 0.08, filter: 900 }); break;
      case 'organ': this.tone(freq, 2.2, { ...o, type: 'sine', vol: vol * 0.9, attack: 0.25 }); this.tone(freq * 2, 2.2, { ...o, type: 'sine', vol: vol * 0.35, attack: 0.25 }); this.tone(freq * 3, 2.2, { ...o, type: 'sine', vol: vol * 0.15, attack: 0.25 }); break;
      case 'lute': this.tone(freq, 1.1, { ...o, type: 'triangle', vol: vol, attack: 0.003 }); this.tone(freq * 1.002, 1.1, { ...o, type: 'square', vol: vol * 0.12, attack: 0.003, filter: 1800 }); break;
      case 'harpsi': this.tone(freq, 0.7, { ...o, type: 'square', vol: vol * 0.35, attack: 0.002, filter: 3200 }); this.tone(freq * 2, 0.4, { ...o, type: 'sawtooth', vol: vol * 0.12, attack: 0.002, filter: 4000 }); break;
    }
  },
  updateMusic() {
    if (!this.ctx || !this.drone) return;
    const c = this.ctx, s = this.SCALES[this.era];
    const tense = this.mode !== 'calm';
    while (this.nextNote < c.currentTime + 0.3) {
      const tempo = s.tempo * (tense ? 0.7 : 1);
      const rest = Math.random() < (tense ? 0.15 : 0.35);
      if (!rest) {
        this.melIdx = clamp(this.melIdx + Math.floor(Math.random() * 5) - 2, 0, 13);
        const deg = this.melIdx % 7, oct = Math.floor(this.melIdx / 7);
        const fr = s.root * Math.pow(2, (s.scale[deg] + 12 * oct) / 12);
        this.note(fr, this.nextNote - c.currentTime, s.inst, 0.07);
        if (this.step % 8 === 0) this.note(s.root / (s.inst === 'organ' ? 1 : 2) * (this.step % 16 === 0 ? 1 : 1.5), this.nextNote - c.currentTime, s.inst, 0.05);
      }
      if (tense && this.step % 2 === 0) {
        const w = this.nextNote - c.currentTime;
        this.tone(s.root / 4, 0.25, { type: 'sine', vol: this.mode === 'boss' ? 0.22 : 0.12, out: 'music', when: w, slide: 0.6 });
        if (this.mode === 'boss' && this.step % 4 === 2) this.noise(0.12, { vol: 0.05, freq: 3000, when: w });
      }
      this.step++; this.nextNote += tempo * (0.75 + Math.random() * 0.5 * (tense ? 0.3 : 1));
    }
  },
};
