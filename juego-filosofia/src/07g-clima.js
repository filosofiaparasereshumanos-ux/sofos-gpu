// ============================================================================
//  DÍA, NOCHE Y CLIMA
//  En los mundos al aire libre el día avanza: atardecer, noche con estrellas
//  (el farol cobra sentido) y amanecer, en un ciclo de unos ocho minutos. Y el
//  tiempo cambia según el lugar: lluvia, nieve, niebla, viento con hojas o
//  arena del desierto. Aquí también se aplican los cambios de luz que piden
//  otros momentos del juego (la batalla del maestro, en AMBK).
// ============================================================================
const CLIMA_DE = {
  snow: ['vikingos', 'incas', 'japon', 'mapuche'],
  sand: ['sumer', 'islam', 'persia', 'coran', 'biblia', 'africa', 'mexicas'],
  none: ['cosmos'],
};
const Clima = {
  lampK: 1, P: 480, NMAX: 0.78, w: null, wx: 'clear', wk: 0, wNext: 0, fogRef: null, base: null, t0: 0, toldNight: false, rainSnd: null,
  I: { rain: '🌧', snow: '❄', fog: '🌫', wind: '🍃', sand: '🏜', clear: '☀', night: '🌙', dawn: '🌅' },
  T: {
    rain: 'Empieza a llover.', snow: 'Empieza a nevar.', fog: 'Se levanta la niebla.', wind: 'Sopla el viento.', sand: 'Se levanta el viento del desierto.',
    clear: 'El cielo se despeja.', night: 'Cae la noche: tu farol ilumina el camino.', dawn: 'Amanece un nuevo día.',
  },
  outdoor() { const th = world && world.theme; return G.settings.clima !== false && !!(th && !th.indoor && !th.stars && !CLIMA_DE.none.includes(ERAS[world.idx].id)); },
  options() {
    const id = ERAS[world.idx].id; const o = [['clear', 3], ['fog', 0.8], ['wind', 1]];
    if (CLIMA_DE.sand.includes(id)) o.push(['sand', 1.3]); else o.push(['rain', 1.3]);
    if (CLIMA_DE.snow.includes(id)) o.push(['snow', 1.6]);
    return o;
  },
  pick() { const o = this.options(); let t = o.reduce((a, b) => a + b[1], 0) * Math.random(); for (const [k, p] of o) { if ((t -= p) <= 0) return k; } return 'clear'; },
  // un mundo recién construido: se guardan sus luces originales
  attach() {
    const W = world; this.w = W; this.t0 = performance.now() / 1000 - Math.random() * 60; this.toldNight = false;
    const u = W.sky.material.uniforms; const hemi = W.group.children.find((o) => o.isHemisphereLight);
    this.base = { top: u.top.value.clone(), hor: u.hor.value.clone(), bot: u.bot.value.clone(), disc: u.sunCol.value.clone(), sun: W.sun ? W.sun.intensity : 0, hemi, hemiI: hemi ? hemi.intensity : 0 };
    this.wx = Math.random() < 0.6 ? 'clear' : this.pick(); this.wk = this.wx === 'clear' ? 0 : 1; this.want = this.wx; this.wNext = performance.now() / 1000 + 150 + Math.random() * 110;
    this.fogRef = null; this.ensureFx();
  },
  ensureFx() {
    if (this.fx && this.fx.parent === world.group) return;
    const N = G.settings.quality === 'low' ? 260 : 620; const R = 16, H = 14;
    const pos = new Float32Array(N * 6); for (let i = 0; i < N; i++) { const x = (Math.random() * 2 - 1) * R, y = Math.random() * H, z = (Math.random() * 2 - 1) * R; pos.set([x, y, z, x, y, z], i * 6); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const lines = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0xb8c8e0, transparent: true, opacity: 0, depthWrite: false, fog: false }));
    const pp = new Float32Array(N * 3); for (let i = 0; i < N; i++) pp.set([(Math.random() * 2 - 1) * R, Math.random() * H, (Math.random() * 2 - 1) * R], i * 3);
    const g2 = new THREE.BufferGeometry(); g2.setAttribute('position', new THREE.BufferAttribute(pp, 3));
    const dc = document.createElement('canvas'); dc.width = dc.height = 32; { const c = dc.getContext('2d'); const gr = c.createRadialGradient(16, 16, 0, 16, 16, 16); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.45, 'rgba(255,255,255,0.7)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = gr; c.fillRect(0, 0, 32, 32); }
    const dot = new THREE.CanvasTexture(dc);
    const pts = new THREE.Points(g2, new THREE.PointsMaterial({ color: 0xffffff, map: dot, size: 0.12, transparent: true, opacity: 0, depthWrite: false, fog: false }));
    lines.frustumCulled = pts.frustumCulled = false; lines.visible = pts.visible = false;
    const fx = new THREE.Group(); fx.add(lines); fx.add(pts); world.group.add(fx); this.fx = fx; this.lines = lines; this.pts = pts; this.N = N; this.R = R; this.H = H;
  },
  night(now) {
    if (!this.outdoor()) return 0;
    const p = (((now - this.t0) / this.P) % 1 + 1) % 1; const sm = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
    return p < 0.6 ? 0 : p < 0.7 ? sm(0.6, 0.7, p) : p < 0.9 ? 1 : 1 - sm(0.9, 1, p);
  },
  rain(on) {
    if (!Audio.ctx) return; const c = Audio.ctx;
    if (!this.rainSnd) {
      const b = c.createBuffer(1, c.sampleRate * 2, c.sampleRate); const d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      const src = c.createBufferSource(); src.buffer = b; src.loop = true; const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1500; const gn = c.createGain(); gn.gain.value = 0;
      src.connect(f); f.connect(gn); gn.connect(Audio.sfx || c.destination); src.start(); this.rainSnd = { gn, f };
    }
    this.rainSnd.gn.gain.setTargetAtTime(on, c.currentTime, 0.6);
  },
  frame(dt) {
    if (!world || !world.sky) return;
    if (this.w !== world) this.attach();
    const now = performance.now() / 1000, th = world.theme, B = this.base;
    // tiempo: cambia cada pocos minutos, con transición suave
    if (this.outdoor() && now > this.wNext && G.state === 'play') {
      this.wNext = now + 150 + Math.random() * 120; const nx = this.wx === 'clear' ? this.pick() : (Math.random() < 0.6 ? 'clear' : this.pick());
      if (nx !== this.wx) { this.want = nx; toast(this.I[nx] + ' ' + this.T[nx]); }
    }
    if (!this.outdoor()) this.want = 'clear';
    if (this.want !== this.wx) { this.wk = Math.max(0, this.wk - dt / 8); if (this.wk <= 0) { this.wx = this.want; } }
    else if (this.wx !== 'clear') this.wk = Math.min(1, this.wk + dt / 10);
    const w = this.wx === 'clear' ? 0 : this.wk, wx = this.wx;
    const n = this.night(now) * this.NMAX;
    if (G.state === 'play' && this.outdoor()) {
      if (n > 0.6 && !this.toldNight) { this.toldNight = true; toast(this.I.night + ' ' + this.T.night); }
      if (n < 0.05 && this.toldNight) { this.toldNight = false; toast(this.I.dawn + ' ' + this.T.dawn); }
    }
    const wet = wx === 'rain' ? w : 0, haze = (wx === 'fog' ? w * 1.6 : 0) + wet * 0.6 + (wx === 'sand' ? w * 0.9 : 0) + (wx === 'snow' ? w * 0.5 : 0);
    // cielo
    const u = world.sky.material.uniforms, dusk = 4 * (n / this.NMAX) * (1 - n / this.NMAX) * 0.55;
    const gray = new THREE.Color(wx === 'sand' ? 0xc8a878 : 0x8a929e), k = Math.min(1, wet * 0.7 + (wx === 'fog' ? w * 0.5 : 0) + (wx === 'sand' ? w * 0.55 : 0) + (wx === 'snow' ? w * 0.45 : 0));
    u.top.value.copy(B.top).lerp(gray, k).lerp(_cN.top, n); u.hor.value.copy(B.hor).lerp(gray, k).lerp(_cN.dusk, dusk).lerp(_cN.hor, n); u.bot.value.copy(B.bot).lerp(_cN.bot, n);
    u.sunCol.value.copy(B.disc).multiplyScalar((1 - n * 1.2) * (1 - k * 0.8));
    if (world.sun) world.sun.intensity = B.sun * (1 - n * 0.85) * (1 - k * 0.5);
    if (B.hemi) B.hemi.intensity = B.hemiI * (1 - n * 0.55) * (1 - k * 0.15);
    this.lampK = 1 + n * 1.6;
    // estrellas de noche
    if (n > 0.02 && !world.stars && this.outdoor()) { world.stars = makeStars(900, world.idx + 3); world.stars.material.opacity = 0; world.group.add(world.stars); world._nightStars = true; }
    if (world._nightStars && world.stars) world.stars.material.opacity = Math.max(0, n / this.NMAX - k) ;
    // niebla y exposición (también los factores de otros momentos, AMBK)
    const fog = scene.fog;
    if (fog && fog !== this.fogRef) { this.fogRef = fog; this.fb = { d: fog.density, c: fog.color.clone(), e: renderer.toneMappingExposure, world: fog.color.getHex() === new THREE.Color(th.fog[0]).getHex() && Math.abs(fog.density - th.fog[1]) < 1e-6, bg: scene.background && scene.background.isColor ? scene.background.clone() : null }; }
    if (fog && this.fb) {
      const F = this.fb, isW = F.world && this.outdoor();
      fog.density = F.d * (isW ? 1 + haze * 1.4 : 1) * AMBK.fog;
      if (isW) { fog.color.copy(F.c).lerp(gray, k * 0.8).lerp(_cN.fog, n * 0.85); if (F.bg && scene.background && scene.background.isColor) scene.background.copy(F.bg).lerp(gray, k * 0.8).lerp(_cN.fog, n * 0.85); }
      renderer.toneMappingExposure = F.e * (isW ? (1 - n * 0.1) * (1 - k * 0.06) : 1) * AMBK.exp;
    }
    // partículas: lluvia, nieve, viento, arena
    this.ensureFx(); const cam = camera.position; this.fx.position.set(cam.x, Math.max(0, cam.y - 4), cam.z);
    const L = this.lines, Pt = this.pts, R = this.R, H = this.H;
    L.visible = wet > 0.01; Pt.visible = (wx === 'snow' || wx === 'wind' || wx === 'sand') && w > 0.01;
    { const v = ['play', 'duel', 'talk', 'victory'].includes(G.state) ? Math.round(wet * 70) / 1000 : 0; if (v !== this._rv) { this._rv = v; this.rain(v); } }
    if (L.visible) {
      L.material.opacity = 0.42 * wet; const a = L.geometry.attributes.position.array; const sp = 20 * dt;
      for (let i = 0; i < this.N; i++) { const j = i * 6; let y = a[j + 1] - sp; if (y < 0) { y += H; a[j] = (Math.random() * 2 - 1) * R; a[j + 2] = (Math.random() * 2 - 1) * R; } a[j + 1] = y; a[j + 3] = a[j] + 0.08; a[j + 4] = y + 0.7; a[j + 5] = a[j + 2]; }
      L.geometry.attributes.position.needsUpdate = true;
    }
    if (Pt.visible) {
      const m = Pt.material; m.color.set(wx === 'snow' ? 0xffffff : wx === 'sand' ? 0xe0c088 : 0x9ac870); m.size = wx === 'snow' ? 0.11 : wx === 'sand' ? 0.06 : 0.13; m.opacity = (wx === 'sand' ? 0.55 : 0.85) * w;
      const a = Pt.geometry.attributes.position.array; const t = now;
      for (let i = 0; i < this.N; i++) {
        const j = i * 3;
        if (wx === 'snow') { a[j + 1] -= (0.9 + (i % 5) * 0.12) * dt; a[j] += Math.sin(t * 0.8 + i) * 0.3 * dt; }
        else { a[j] += (wx === 'sand' ? 9 : 4.5) * dt; a[j + 1] += Math.sin(t * 2 + i) * (wx === 'sand' ? 0.3 : 0.9) * dt - (wx === 'wind' ? 0.25 * dt : 0); }
        if (a[j + 1] < 0) { a[j + 1] += H; } if (a[j + 1] > H) a[j + 1] -= H; if (a[j] > R) { a[j] -= 2 * R; a[j + 2] = (Math.random() * 2 - 1) * R; }
      }
      Pt.geometry.attributes.position.needsUpdate = true;
    }
  },
};
const _cN = { top: new THREE.Color(0x040818), hor: new THREE.Color(0x182246), bot: new THREE.Color(0x04050a), dusk: new THREE.Color(0xff8a50), fog: new THREE.Color(0x10162c) };
{ let t0 = performance.now(); const loop = () => { const t = performance.now(); const dt = Math.min(0.1, (t - t0) / 1000); t0 = t; try { Clima.frame(dt); } catch (e) { if (!Clima._err) { Clima._err = true; console.warn('clima', e); } } requestAnimationFrame(loop); }; requestAnimationFrame(loop); }
if (location.hash === '#debug') window.__clima = Clima;
