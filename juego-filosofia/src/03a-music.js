// ============================================================================
//  MÚSICA: secuenciador con acordes, bajo, arpegios, melodía y percusión.
//  Cada época tiene su tema; las capas suben y bajan según la situación:
//  title · calm (explorar) · combat · duel · boss
// ============================================================================
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
const SONGS = [
  // I · Jonia: lira y tambor de marco, modo dórico
  { bpm: 86, root: 50, scale: [0, 2, 3, 5, 7, 9, 10], prog: [0, 6, 2, 3], pad: 'warm', arp: 'lyre', arpPat: [0, 2, 1, 2, 0, 2, 1, 3], lead: 'flute', kit: 'frame', seed: 11 },
  // II · Atenas: modo frigio, aulós y lira
  { bpm: 92, root: 52, scale: [0, 1, 3, 5, 7, 8, 10], prog: [0, 1, 6, 0], pad: 'warm', arp: 'lyre', arpPat: [0, 1, 2, 1, 0, 1, 2, 3], lead: 'aulos', kit: 'frame', seed: 23 },
  // III · Roma: marcial, menor natural, metales
  { bpm: 100, root: 45, scale: [0, 2, 3, 5, 7, 8, 10], prog: [0, 5, 6, 4], pad: 'brass', arp: 'horn', arpPat: [0, -1, 2, -1, 1, -1, 2, -1], lead: 'brass', kit: 'march', seed: 37 },
  // IV · Catedral: canto llano y órgano, lento
  { bpm: 64, root: 50, scale: [0, 2, 3, 5, 7, 9, 10], prog: [0, 3, 0, 4], pad: 'organ', arp: 'bell', arpPat: [0, -1, -1, -1, 2, -1, -1, -1], lead: 'choir', kit: 'toll', seed: 41 },
  // V · Florencia: laúd y pandero, mayor luminoso
  { bpm: 108, root: 55, scale: [0, 2, 4, 5, 7, 9, 11], prog: [0, 4, 5, 3], pad: 'strings', arp: 'lute', arpPat: [0, 1, 2, 1, 3, 1, 2, 1], lead: 'recorder', kit: 'tambourine', seed: 53 },
  // VI · Ilustración: clave en bajo de Alberti, menor armónica
  { bpm: 116, root: 57, scale: [0, 2, 3, 5, 7, 8, 11], prog: [0, 5, 3, 4], pad: 'strings', arp: 'harpsi', arpPat: [0, 2, 1, 2, 0, 2, 1, 2], lead: 'harpsi', kit: 'clock', seed: 67 },
  // VII · Siglo XIX: romántico, cuerdas y piano de campanas, menor
  { bpm: 76, root: 50, scale: [0, 2, 3, 5, 7, 8, 10], prog: [0, 5, 2, 6], pad: 'strings', arp: 'bell', arpPat: [0, 1, 2, 3, 2, 1, 2, 1], lead: 'flute', kit: 'toll', seed: 79 },
  // VIII · Contemporánea: lidio onírico, campanas y coro suave
  { bpm: 84, root: 53, scale: [0, 2, 4, 6, 7, 9, 11], prog: [0, 4, 5, 3], pad: 'warm', arp: 'bell', arpPat: [0, 2, 1, 3, 0, 2, 1, 2], lead: 'choir', kit: 'clock', seed: 97 },
  // IX · América Latina: pentatónica andina, quena y charango
  { bpm: 96, root: 52, scale: [0, 3, 5, 7, 10, 12, 15], prog: [0, 3, 4, 0], pad: 'warm', arp: 'lute', arpPat: [0, 2, 1, 2, 3, 2, 1, 2], lead: 'flute', kit: 'frame', seed: 109 },
  // X · Mexicas: flautas de barro y huéhuetl
  { bpm: 92, root: 50, scale: [0, 2, 4, 7, 9, 12, 14], prog: [0, 3, 4, 0], pad: 'warm', arp: 'lyre', arpPat: [0, 2, 1, 3, 0, 2, 3, 1], lead: 'flute', kit: 'frame', seed: 121 },
  // XI · Incas: quena y charango
  { bpm: 88, root: 55, scale: [0, 3, 5, 7, 10, 12, 15], prog: [0, 4, 3, 0], pad: 'warm', arp: 'lute', arpPat: [0, 1, 2, 3, 2, 1, 0, 2], lead: 'flute', kit: 'frame', seed: 131 },
  // XII · Mapuche: kultrún pausado
  { bpm: 78, root: 48, scale: [0, 2, 3, 5, 7, 8, 10], prog: [0, 6, 5, 6], pad: 'strings', arp: 'bell', arpPat: [0, -1, 2, -1, 1, -1, 3, -1], lead: 'flute', kit: 'frame', seed: 141 },
  // XIII · China: pentatónica y guzheng
  { bpm: 76, root: 57, scale: [0, 2, 4, 7, 9, 12, 14], prog: [0, 4, 5, 3], pad: 'warm', arp: 'lute', arpPat: [0, 2, 4, 2, 3, 1, 2, 1], lead: 'flute', kit: 'clock', seed: 151 },
  // XIV · India: bordón y modo bhairav
  { bpm: 84, root: 50, scale: [0, 1, 4, 5, 7, 8, 11], prog: [0, 0, 3, 4], pad: 'organ', arp: 'lute', arpPat: [0, 1, 2, 1, 3, 2, 1, 2], lead: 'aulos', kit: 'tambourine', seed: 161 },
  // XV · África: kora y tambores
  { bpm: 104, root: 45, scale: [0, 2, 4, 7, 9, 12, 14], prog: [0, 3, 4, 3], pad: 'warm', arp: 'lyre', arpPat: [0, 2, 1, 2, 3, 2, 1, 2], lead: 'flute', kit: 'frame', seed: 171 },
  // XVI · Sumer: la lira de Ur y el tambor de marco, modo frigio
  { bpm: 80, root: 48, scale: [0, 1, 3, 5, 7, 8, 10], prog: [0, 6, 5, 6], pad: 'warm', arp: 'lyre', arpPat: [0, 2, 1, 3, 0, 2, 3, 1], lead: 'aulos', kit: 'frame', seed: 181 },
  // XVII · Bagdad: laúd y ney, maqam hiyaz
  { bpm: 88, root: 50, scale: [0, 1, 4, 5, 7, 8, 10], prog: [0, 5, 6, 0], pad: 'warm', arp: 'lute', arpPat: [0, 1, 2, 1, 3, 2, 1, 2], lead: 'aulos', kit: 'tambourine', seed: 191 },
  // XVIII · Jardín de los poetas: arpa y flauta, mayor lidio
  { bpm: 72, root: 53, scale: [0, 2, 4, 6, 7, 9, 11], prog: [0, 3, 5, 4], pad: 'warm', arp: 'lyre', arpPat: [0, 2, 4, 2, 1, 3, 2, 1], lead: 'flute', kit: 'none', seed: 201 },
  // XIX · Taller de los científicos: pulso de clave, curioso
  { bpm: 96, root: 48, scale: [0, 2, 4, 5, 7, 9, 11], prog: [0, 4, 5, 3], pad: 'organ', arp: 'lute', arpPat: [0, 1, 2, 3, 2, 1, 0, 1], lead: 'flute', kit: 'frame', seed: 211 },
  // XX · Japón del zen: koto y shakuhachi, escala in
  { bpm: 66, root: 50, scale: [0, 1, 5, 7, 8, 12, 13], prog: [0, 3, 4, 0], pad: 'warm', arp: 'lyre', arpPat: [0, 2, 4, 2, 1, 3, 4, 2], lead: 'flute', kit: 'none', seed: 221 },
  // XXI · El Norte vikingo: tambor y lira nórdica, modo dórico
  { bpm: 84, root: 45, scale: [0, 2, 3, 5, 7, 9, 10], prog: [0, 6, 3, 4], pad: 'warm', arp: 'lyre', arpPat: [0, 2, 4, 2, 0, 3, 2, 1], lead: 'flute', kit: 'frame', seed: 231 },
  // XXII · Persia: modo con segunda aumentada, santur y tombak
  { bpm: 80, root: 50, scale: [0, 1, 4, 5, 7, 8, 11], prog: [0, 3, 4, 0], pad: 'warm', arp: 'lute', arpPat: [0, 2, 1, 3, 2, 1, 0, 2], lead: 'flute', kit: 'frame', seed: 241 },
  // XXIII · Los librepensadores: salón ilustrado bajo las estrellas
  { bpm: 76, root: 50, scale: [0, 2, 4, 5, 7, 9, 11], prog: [0, 5, 3, 4], pad: 'warm', arp: 'lyre', arpPat: [0, 2, 4, 6, 4, 2, 0, 2], lead: 'flute', kit: 'none', seed: 251 },
  // XXIV · La casa de la fe: órgano y coro suave, modo mixolidio
  { bpm: 64, root: 48, scale: [0, 2, 4, 5, 7, 9, 10], prog: [0, 3, 0, 4], pad: 'organ', arp: 'lyre', arpPat: [0, 2, 4, 2, 0, 4, 2, 0], lead: 'flute', kit: 'none', seed: 261 },
  // XXV · Las pensadoras: salón de cámara en primavera
  { bpm: 84, root: 53, scale: [0, 2, 4, 5, 7, 9, 11], prog: [0, 3, 4, 5], pad: 'strings', arp: 'harpsi', arpPat: [0, 2, 4, 2, 5, 4, 2, 1], lead: 'recorder', kit: 'none', seed: 271 },
  // XXVI · La asamblea de la justicia: himno solemne de metales
  { bpm: 72, root: 46, scale: [0, 2, 4, 5, 7, 9, 11], prog: [0, 4, 5, 3], pad: 'brass', arp: 'horn', arpPat: [0, 4, 2, 4, 0, 4, 2, 4], lead: 'brass', kit: 'march', seed: 281 },
  // XXVII · La montaña de los místicos: campanas y flauta sobre un bordón
  { bpm: 58, root: 50, scale: [0, 2, 3, 7, 9, 12, 14], prog: [0, 0, 3, 0], pad: 'warm', arp: 'bell', arpPat: [0, 2, 4, 2, 1, 3, 2, 0], lead: 'flute', kit: 'none', seed: 291 },
];
// volumen de cada capa según el modo
const MIX = {
  title:  { pad: 0.9, bass: 0.5, arp: 0.7, lead: 1.0, drums: 0.25, tension: 0 },
  calm:   { pad: 0.8, bass: 0.55, arp: 0.75, lead: 0.7, drums: 0.35, tension: 0 },
  combat: { pad: 0.7, bass: 1.0, arp: 0.9, lead: 0.55, drums: 1.0, tension: 0 },
  duel:   { pad: 0.6, bass: 0.6, arp: 0.35, lead: 0.2, drums: 0.15, tension: 1 },
  boss:   { pad: 0.85, bass: 1.0, arp: 0.7, lead: 0.6, drums: 1.0, tension: 0.6 },
};

const Music = {
  song: null, step: 0, nextT: 0, layers: null, melody: [], on: false,
  setup() {
    const c = Audio.ctx; if (!c || this.layers) return;
    this.layers = {};
    for (const k of Object.keys(MIX.calm)) { const g = c.createGain(); g.gain.value = 0; g.connect(Audio.music); this.layers[k] = g; }
    // salida de batería algo más seca (menos reverb)
  },
  start(era) {
    if (!Audio.ctx) return; this.setup(); Track.play(era);
    this.song = SONGS[clamp(era, 0, SONGS.length - 1)];
    const r = mulberry32(this.song.seed);
    // motivo melódico de 2 compases (16 corcheas), en grados de la escala
    const mel = []; let d = 4;
    for (let i = 0; i < 16; i++) {
      if (i % 2 === 1 && r() < 0.45) { mel.push(null); continue; }
      d = clamp(d + Math.round((r() - 0.5) * 4), 0, 11); mel.push(d);
    }
    mel[0] = 4; mel[8] = 2; mel[14] = 0; mel[15] = null; // cadencias reconocibles
    this.melody = mel;
    this.step = 0; this.nextT = Audio.ctx.currentTime + 0.15; this.on = true;
    this.applyMix(true);
  },
  stop() {
    this.on = false; if (!this.layers) return;
    const t = Audio.ctx.currentTime; for (const g of Object.values(this.layers)) { g.gain.cancelScheduledValues(t); g.gain.setTargetAtTime(0, t, 0.4); }
  },
  applyMix(fast) {
    if (!this.layers) return; const m = Track.ready && (this.mode === 'title' || this.mode === 'calm') ? {} : MIX[this.mode] || MIX.calm; const t = Audio.ctx.currentTime;
    for (const [k, g] of Object.entries(this.layers)) g.gain.setTargetAtTime(m[k] ?? 0, t, fast ? 0.05 : 0.8);
    this._mixed = this.mode;
  },
  get mode() { return G.state === 'title' || G.state === 'intro' || G.state === 'ending' ? 'title' : ({ calm: 'calm', duel: 'duel', boss: 'boss', combat: 'combat' }[Audio.mode] || 'calm'); },
  // ---- instrumentos ----
  osc(type, f, t, dur, vol, out, o = {}) {
    const c = Audio.ctx; const os = c.createOscillator(); const g = c.createGain();
    os.type = type; os.frequency.setValueAtTime(f, t); if (o.detune) os.detune.value = o.detune;
    if (o.slide) os.frequency.exponentialRampToValueAtTime(Math.max(20, f * o.slide), t + (o.slideT || dur));
    if (o.vib) { const l = c.createOscillator(); const lg = c.createGain(); l.frequency.value = o.vib; lg.gain.value = f * 0.012; l.connect(lg); lg.connect(os.frequency); l.start(t); l.stop(t + dur + 0.1); }
    const a = o.attack ?? 0.005, rel = o.release ?? dur;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + a);
    if (o.sustain) { g.gain.setValueAtTime(vol, t + dur - Math.min(rel, dur) * 0.5); }
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    let node = os;
    if (o.lp) { const f2 = c.createBiquadFilter(); f2.type = 'lowpass'; f2.frequency.setValueAtTime(o.lp, t); if (o.lpEnv) f2.frequency.exponentialRampToValueAtTime(Math.max(80, o.lp * o.lpEnv), t + dur); f2.Q.value = o.q || 0.7; os.connect(f2); node = f2; }
    node.connect(g); g.connect(out); os.start(t); os.stop(t + dur + 0.05);
  },
  noise(t, dur, vol, out, o = {}) {
    const c = Audio.ctx; const s = c.createBufferSource(); s.buffer = Audio.noiseBuf; s.loop = true;
    const f = c.createBiquadFilter(); f.type = o.type || 'bandpass'; f.frequency.setValueAtTime(o.freq || 2000, t); f.Q.value = o.q || 1;
    if (o.slide) f.frequency.exponentialRampToValueAtTime(Math.max(40, (o.freq || 2000) * o.slide), t + dur);
    const g = c.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(out); s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.05);
  },
  inst(name, f, t, dur, vol, out) {
    switch (name) {
      case 'lyre': this.osc('triangle', f, t, Math.max(0.6, dur * 2), vol, out); this.osc('sine', f * 2, t, 0.4, vol * 0.25, out); break;
      case 'lute': this.osc('triangle', f, t, 0.9, vol, out); this.osc('sawtooth', f, t, 0.25, vol * 0.18, out, { lp: 2400, lpEnv: 0.3 }); break;
      case 'harpsi': this.osc('sawtooth', f, t, 0.5, vol * 0.45, out, { lp: 4200, lpEnv: 0.25 }); this.osc('square', f * 2, t, 0.25, vol * 0.12, out, { lp: 5000 }); break;
      case 'horn': this.osc('sawtooth', f, t, dur * 1.6, vol * 0.5, out, { attack: 0.06, lp: 900, q: 1.2 }); break;
      case 'bell': this.osc('sine', f * 2, t, 3, vol * 0.7, out); this.osc('sine', f * 5.4, t, 1.2, vol * 0.18, out); this.osc('sine', f * 2.76, t, 2, vol * 0.25, out); break;
      case 'flute': this.osc('sine', f * 2, t, dur, vol, out, { attack: 0.06, vib: 5, sustain: true }); this.noise(t, 0.08, vol * 0.25, out, { freq: f * 4, q: 3 }); break;
      case 'aulos': this.osc('square', f * 2, t, dur, vol * 0.45, out, { attack: 0.04, lp: 1600, vib: 6, sustain: true }); this.osc('sawtooth', f * 2.003, t, dur, vol * 0.2, out, { attack: 0.04, lp: 1300 }); break;
      case 'brass': this.osc('sawtooth', f * 2, t, dur, vol * 0.5, out, { attack: 0.07, lp: 1400, lpEnv: 1.6, sustain: true }); this.osc('sawtooth', f * 2 * 1.005, t, dur, vol * 0.3, out, { attack: 0.07, lp: 1200 }); break;
      case 'choir': for (const dt of [-6, 0, 7]) this.osc('sawtooth', f * 2, t, dur, vol * 0.22, out, { attack: 0.35, lp: 1100, detune: dt, vib: 4.5, sustain: true }); break;
      case 'recorder': this.osc('triangle', f * 4, t, dur, vol * 0.8, out, { attack: 0.03, vib: 5.5, sustain: true }); break;
    }
  },
  pad(kind, freqs, t, dur, vol, out) {
    for (const f of freqs) {
      if (kind === 'organ') { this.osc('sine', f, t, dur, vol * 0.5, out, { attack: 0.25, sustain: true }); this.osc('sine', f * 2, t, dur, vol * 0.25, out, { attack: 0.25, sustain: true }); this.osc('sine', f * 3, t, dur, vol * 0.1, out, { attack: 0.25, sustain: true }); }
      else if (kind === 'brass') this.osc('sawtooth', f, t, dur, vol * 0.3, out, { attack: 0.4, lp: 700, sustain: true });
      else if (kind === 'strings') { this.osc('sawtooth', f, t, dur, vol * 0.22, out, { attack: 0.5, lp: 1500, detune: -7, sustain: true }); this.osc('sawtooth', f, t, dur, vol * 0.22, out, { attack: 0.5, lp: 1500, detune: 7, sustain: true }); }
      else { this.osc('triangle', f, t, dur, vol * 0.4, out, { attack: 0.6, sustain: true }); this.osc('sawtooth', f, t, dur, vol * 0.12, out, { attack: 0.8, lp: 600, detune: 5, sustain: true }); }
    }
  },
  drum(kind, t, vol, out) {
    switch (kind) {
      case 'kick': this.osc('sine', 130, t, 0.32, vol, out, { slide: 0.3, slideT: 0.12 }); break;
      case 'dum': this.osc('sine', 150, t, 0.35, vol * 0.8, out, { slide: 0.55, slideT: 0.2 }); this.noise(t, 0.05, vol * 0.2, out, { freq: 600 }); break;
      case 'tek': this.noise(t, 0.06, vol * 0.45, out, { freq: 3200, q: 2 }); break;
      case 'snare': this.noise(t, 0.16, vol * 0.5, out, { freq: 1800, q: 0.8 }); this.osc('triangle', 220, t, 0.08, vol * 0.3, out); break;
      case 'hat': this.noise(t, 0.035, vol * 0.25, out, { type: 'highpass', freq: 7000 }); break;
      case 'taiko': this.osc('sine', 85, t, 1.0, vol * 1.1, out, { slide: 0.6, slideT: 0.5 }); this.noise(t, 0.25, vol * 0.35, out, { type: 'lowpass', freq: 300 }); break;
      case 'tamb': this.noise(t, 0.12, vol * 0.3, out, { type: 'highpass', freq: 6000 }); break;
      case 'tick': this.osc('square', 2400, t, 0.02, vol * 0.12, out); break;
      case 'tock': this.osc('square', 1600, t, 0.025, vol * 0.12, out); break;
      case 'toll': this.osc('sine', 98, t, 4, vol * 0.5, out); this.osc('sine', 98 * 2.4, t, 2.5, vol * 0.15, out); break;
    }
  },
  // nota de la escala por grado (puede pasar de octava)
  deg(d, oct = 0) { const s = this.song.scale; const n = ((d % 7) + 7) % 7; const o = Math.floor(d / 7); return mtof(this.song.root + s[n] + 12 * (o + oct)); },
  update() {
    Track.update();
    if (!this.on || !Audio.ctx || !this.song) return;
    const c = Audio.ctx; if (this._mixed !== this.mode || this._trk !== Track.ready) { this._trk = Track.ready; this.applyMix(false); }
    const S = this.song, L = this.layers, mode = this.mode; const sd = 60 / S.bpm / 4; // semicorchea
    while (this.nextT < c.currentTime + 0.25) {
      const t = this.nextT, st = this.step % 16, bar = Math.floor(this.step / 16);
      const chord = S.prog[bar % S.prog.length];
      // acordes: uno por compás
      if (st === 0) this.pad(S.pad, [this.deg(chord, -1), this.deg(chord + 2, -1), this.deg(chord + 4, -1)], t, sd * 16 + 0.3, 0.05, L.pad);
      // bajo
      const bassPat = mode === 'combat' || mode === 'boss' ? [0, 6, 8, 12, 14] : [0, 8];
      if (bassPat.includes(st)) this.osc(S.pad === 'organ' ? 'sine' : 'triangle', this.deg(chord, -2), t, sd * (st === 0 ? 6 : 3), 0.16, L.bass, { lp: 500 });
      // arpegio (corcheas)
      if (st % 2 === 0) {
        const p = S.arpPat[(st / 2) % S.arpPat.length];
        if (p >= 0) this.inst(S.arp, this.deg(chord + p * 2, 0), t, sd * 2, 0.07, L.arp);
      }
      // melodía: suena 2 de cada 4 compases (más presente en el título)
      const phrase = bar % 4;
      if ((phrase === 1 || phrase === 3 || mode === 'title' && phrase !== 0) && st % 2 === 0) {
        const m = this.melody[((bar % 2) * 8) + st / 2];
        if (m !== null && m !== undefined) this.inst(S.lead, this.deg(m + (phrase === 3 ? 0 : 0), 0) , t, sd * 3, 0.06, L.lead);
      }
      // percusión
      this.drums(S.kit, st, bar, t, mode, L.drums);
      // tensión de duelo: latido y reloj
      if (mode === 'duel' || mode === 'boss') {
        if (st === 0 || st === 3) this.drum('kick', t, st === 0 ? 0.35 : 0.22, L.tension);
        if (st % 4 === 0) this.drum(st % 8 === 0 ? 'tick' : 'tock', t, 1, L.tension);
        if (st === 8 && bar % 2 === 1) this.osc('sine', this.deg(chord + 1, 1), t, sd * 8, 0.03, L.tension, { attack: 0.5, vib: 3 });
      }
      this.step++; this.nextT += sd * (st % 2 === 1 && S.kit === 'frame' ? 1.04 : st % 2 === 1 ? 1.0 : 1.0);
    }
  },
  drums(kit, st, bar, t, mode, out) {
    const heavy = mode === 'combat' || mode === 'boss';
    if (mode === 'boss' && (st === 0 || st === 10)) this.drum('taiko', t, 0.5, out);
    switch (kit) {
      case 'frame':
        if (st === 0 || st === 10) this.drum('dum', t, 0.4, out);
        if ([4, 6, 12, 14].includes(st)) this.drum('tek', t, 0.3, out);
        if (heavy && st % 2 === 1) this.drum('tek', t, 0.12, out);
        break;
      case 'march':
        if (st === 0 || st === 8) this.drum('kick', t, 0.4, out);
        if (st === 4 || st === 12) this.drum('snare', t, 0.35, out);
        if (heavy && st >= 12) this.drum('snare', t, 0.15, out);
        if (st % 2 === 0) this.drum('hat', t, 0.2, out);
        break;
      case 'toll':
        if (st === 0 && bar % 2 === 0) this.drum('toll', t, 0.35, out);
        if (heavy && (st === 0 || st === 6 || st === 8)) this.drum('taiko', t, 0.35, out);
        break;
      case 'tambourine':
        if (st === 0 || st === 8) this.drum('kick', t, 0.3, out);
        if (st % 4 === 2) this.drum('tamb', t, 0.4, out);
        if (heavy && (st === 4 || st === 12)) this.drum('snare', t, 0.3, out);
        break;
      case 'clock':
        if (st % 4 === 0) this.drum(st % 8 === 0 ? 'tick' : 'tock', t, 1.2, out);
        if (st === 0 || st === 8) this.drum('kick', t, 0.3, out);
        if (heavy && (st === 4 || st === 12)) this.drum('snare', t, 0.3, out);
        if (heavy && st % 2 === 0) this.drum('hat', t, 0.2, out);
        break;
    }
  },
  sting(kind) {
    // fanfarrias cortas sobre la música
    if (!Audio.ctx || !this.song) return; const t = Audio.ctx.currentTime + 0.02; const out = Audio.music;
    if (kind === 'victory') { [0, 2, 4, 7].forEach((d, i) => this.inst('brass', this.deg(d, 0), t + i * 0.12, 0.5, 0.09, out)); this.drum('taiko', t, 0.5, out); }
    if (kind === 'boss') { this.drum('taiko', t, 0.7, out); this.drum('taiko', t + 0.45, 0.6, out); [0, 1, 0].forEach((d, i) => this.inst('brass', this.deg(d, -1), t + i * 0.45, 0.6, 0.1, out)); }
    if (kind === 'achievement') [4, 7, 11].forEach((d, i) => this.inst('bell', this.deg(d, 0), t + i * 0.09, 1, 0.08, out));
  },
};
// La música nueva sustituye a la antigua
// ---- banda sonora grabada de cada época (Suno, en audio/m-<época>.mp3)
// Suena en la exploración y el menú; en los debates baja y entra la música de tensión.
const TRACK_PAIRS = new Set([...Array(ERAS.length).keys()]); // épocas con segunda canción (audio/m-<i>b.mp3)
const Track = {
  el: null, idx: -1, ready: false, vol: 0, lastT: 0,
  play(idx) {
    if (idx === this.idx && this.el) { this.resume(); return; }
    this.idx = idx; this.ready = false;
    if (this.el) { try { this.el.pause(); } catch (e) { /* nada */ } this.el.removeAttribute('src'); }
    const el = document.createElement('audio'); el.loop = true; el.preload = 'auto'; el.volume = 0; this.vol = 0; this.el = el;
    el.addEventListener('playing', () => { if (this.el === el) this.ready = true; });
    // las épocas con dos canciones las alternan: al terminar una, empieza la otra
    let pair = TRACK_PAIRS.has(idx) ? ['audio/m-' + idx + '.mp3', 'audio/m-' + idx + 'b.mp3'] : null;
    // si falta la segunda canción (por ejemplo, en la versión dentro de Claude), suena solo la primera
    el.addEventListener('error', () => { if (this.el !== el) return; if (pair && !el._fb) { el._fb = true; pair = null; el.loop = true; el.src = 'audio/m-' + idx + '.mp3'; this.resume(); return; } this.ready = false; this.el = null; });
    if (pair) { el.loop = false; let k = Math.random() < 0.5 ? 0 : 1; el.src = pair[k];
      el.addEventListener('ended', () => { if (this.el !== el || !pair) return; k = 1 - k; el.src = pair[k]; this.resume(); }); }
    else el.src = 'audio/m-' + idx + '.mp3';
    // en iOS el volumen del elemento es fijo: lo controlamos con una ganancia de WebAudio
    this.gain = null; const c = Audio.ctx;
    if (c && location.protocol !== 'file:') { try { const src = c.createMediaElementSource(el); const g = c.createGain(); g.gain.value = 0; src.connect(g); g.connect(Audio.master || c.destination); this.gain = g; } catch (e) { this.gain = null; } }
    this.resume();
  },
  resume() { const el = this.el; if (!el || document.hidden) return; const p = el.play(); if (p && p.catch) p.catch(() => { const once = () => { window.removeEventListener('pointerdown', once); this.resume(); }; window.addEventListener('pointerdown', once); }); },
  pause() { if (this.el) try { this.el.pause(); } catch (e) { /* nada */ } },
  update() {
    const el = this.el; if (!el) return;
    const now = performance.now(); const dt = Math.min(0.1, (now - (this.lastT || now)) / 1000); this.lastT = now;
    const m = Music.mode; const st = G.state;
    let k = m === 'duel' ? 0.22 : m === 'boss' ? 0.3 : m === 'combat' ? 0.6 : 1;
    if (st === 'talk' || st === 'lesson' || st === 'place' || G.lessonMenu) k *= 0.35; // la voz manda
    if (st === 'paused' || st === 'gameover') k *= 0.5;
    const target = Math.min(1, 0.7 * G.settings.music * k);
    this.vol += (target - this.vol) * Math.min(1, dt * 2.2);
    const v = Math.max(0, Math.min(1, this.vol));
    if (this.gain) { this.gain.gain.value = v; if (el.volume !== 1) el.volume = 1; } else try { el.volume = v; } catch (e) { /* sin control de volumen */ }
  },
};
document.addEventListener('visibilitychange', () => { if (document.hidden) Track.pause(); else Track.resume(); });
Audio.startMusic = function (era) { if (!this.ctx) return; if (this.drone) this.stopDrone(); Music.start(era); };
Audio.updateMusic = function () { Music.update(); };
