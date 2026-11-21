// ============================================================================
//  LA BATALLA DEL MAESTRO
//  Cuando el debate es contra el maestro de una época, el mundo responde: el
//  cielo se oscurece, caen relámpagos y un anillo de piedras rúnicas gira a su
//  alrededor. Cada piedra es un argumento suyo: cada acierto rompe una. La barra
//  «Voluntad del maestro» marca tres fases (en la segunda hay menos tiempo para
//  pensar; la tercera es el último argumento).
// ============================================================================
// factores que el ambiente (07g) aplica a la niebla y la exposición
const AMBK = { fog: 1, exp: 1 };
const Maestro = {
  on: false, s: null, g: null, stones: [], ph: 1, shake: 0, flashT: 4, k: 0,
  T: {
    will: 'Voluntad de', ph: 'Fase', p2: ['Fase II', 'El maestro se crece: tendrás menos tiempo para pensar.'], p3: ['Último argumento', 'Un acierto más y lo convences.'],
    p2s: ['Fase II', 'El maestro te exige más: tendrás menos tiempo para pensar.'], p3s: ['Último paso', 'Un acierto más y lo comprendes.'],
  },
  phase(s) { const r = s.conv / s.maxConv; return s.conv <= 1 ? 3 : r > 0.6 ? 1 : 2; },
  begin(s) {
    if (this.on && this.s === s) return; this.end(true);
    this.on = true; this.s = s; this.ph = this.phase(s); this.k = 0; this.flashT = 3 + Math.random() * 3;
    const acc = new THREE.Color(world.theme.accent); const g = new THREE.Group(); g.position.set(s.pos.x, 0.06, s.pos.z);
    const R = 1.9 * s.scale;
    const ring = new THREE.Mesh(new THREE.RingGeometry(R, R + 0.18, 72), new THREE.MeshBasicMaterial({ color: acc.clone().multiplyScalar(2.2), transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false, fog: false }));
    ring.rotation.x = -Math.PI / 2; g.add(ring);
    const ring2 = new THREE.Mesh(new THREE.RingGeometry(R * 0.72, R * 0.72 + 0.06, 6), ring.material.clone()); ring2.rotation.x = -Math.PI / 2; g.add(ring2);
    this.stones = [];
    const geo = new THREE.OctahedronGeometry(0.26, 0);
    for (let i = 0; i < s.conv; i++) {
      const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: acc.clone().multiplyScalar(2.4), transparent: true, opacity: 0.95, toneMapped: false, fog: false }));
      m.scale.set(0.8, 1.5, 0.8); g.add(m); this.stones.push(m);
    }
    this.geo = geo; this.ring = ring; this.ring2 = ring2; this.R = R; this.g = g; world.group.add(g);
    this.bar(true); this.paintBar();
    if (!this.raf) { let t0 = performance.now(); const loop = () => { const t = performance.now(); const dt = Math.min(0.1, (t - t0) / 1000); t0 = t; try { this.frame(dt); } catch (e) { console.warn('maestro', e); } this.raf = this.on || this.k > 0.001 ? requestAnimationFrame(loop) : 0; }; this.raf = requestAnimationFrame(loop); }
  },
  // el maestro ha perdido una piedra (o varias, con un golpe crítico)
  sync() {
    const s = this.s; if (!s || !this.g) return;
    while (this.stones.length > Math.max(0, s.conv)) {
      const m = this.stones.pop(); const p = m.getWorldPosition(new THREE.Vector3());
      particles.emit(p, 40, { color: 0xffd36a, speed: 6, life: 0.9, size: 0.35, intensity: 3 });
      particles.emit(p, 16, { color: world.theme.accent, speed: 3, life: 0.7, size: 0.5, intensity: 2.5 });
      this.g.remove(m); m.material.dispose(); Audio.kill && Audio.kill(); this.shake = Math.max(this.shake, 0.25);
    }
    this.paintBar();
  },
  bar(show) {
    let b = document.getElementById('mb-bar');
    if (!b && show) {
      b = document.createElement('div'); b.id = 'mb-bar'; b.innerHTML = '<div class="mb-l"><span class="mb-n"></span><span class="mb-p"></span></div><div class="mb-t"><i class="mb-f"></i><b></b><b></b></div>';
      const card = document.querySelector('#duel .duel-card'); const head = card && card.querySelector('.duel-head'); if (head) head.after(b); else return;
    }
    if (b) b.hidden = !show;
  },
  paintBar() {
    const s = this.s, b = document.getElementById('mb-bar'); if (!s || !b) return;
    b.querySelector('.mb-n').textContent = `${this.T.will} ${s.data.short}`;
    b.querySelector('.mb-p').textContent = `${this.T.ph} ${['I', 'II', 'III'][this.phase(s) - 1]}`;
    b.querySelector('.mb-f').style.transform = `scaleX(${Math.max(0, s.conv / s.maxConv)})`;
    b.className = 'ph' + this.phase(s);
  },
  banner(k) {
    const sac = ERAS[G.eraIdx] && ERAS[G.eraIdx].sacred; const t = k === 3 ? (sac ? this.T.p3s : this.T.p3) : (sac ? this.T.p2s : this.T.p2);
    let el = document.getElementById('mb-ban'); if (!el) { el = document.createElement('div'); el.id = 'mb-ban'; el.innerHTML = '<b></b><span></span>'; (document.getElementById('app') || document.body).appendChild(el); }
    el.querySelector('b').textContent = t[0]; el.querySelector('span').textContent = t[1];
    el.className = 'ph' + k; void el.offsetWidth; el.classList.add('on'); clearTimeout(this._bt); this._bt = setTimeout(() => el.classList.remove('on'), 2300);
    Audio.tone(k === 3 ? 98 : 73, 1.6, { type: 'sawtooth', vol: 0.12, slide: 0.5, filter: 900 }); Audio.gong && Audio.gong(); buzz([40, 40, 90]);
    this.thunder(); this.shake = 0.5;
  },
  thunder() {
    const f = document.getElementById('mb-flash') || (() => { const d = document.createElement('div'); d.id = 'mb-flash'; (document.getElementById('app') || document.body).appendChild(d); return d; })();
    f.classList.remove('on'); void f.offsetWidth; f.classList.add('on');
    if (Audio.ctx) { Audio.noise(0.25, { vol: 0.16, freq: 2400, q: 0.6 }); Audio.noise(1.8, { vol: 0.22, freq: 160, q: 0.5, type: 'lowpass', when: 0.15 }); }
    if (this.g) { const p = this.g.position; particles.emit(new THREE.Vector3(p.x + (Math.random() - 0.5) * 6, 9, p.z + (Math.random() - 0.5) * 6), 30, { color: 0xdfe8ff, speed: 7, life: 0.4, size: 0.4, intensity: 4 }); }
  },
  frame(dt) {
    const s = this.s; const want = this.on ? 1 : 0; this.k += (want - this.k) * Math.min(1, dt * (this.on ? 1.2 : 2.5));
    AMBK.fog = 1 + this.k * 0.7; AMBK.exp = 1 - this.k * 0.22;
    if (!this.g || !s) return;
    const t = performance.now() / 1000, ph = this.phase(s), n = this.stones.length;
    const sp = ph === 1 ? 0.7 : ph === 2 ? 1.25 : 1.9;
    this.stones.forEach((m, i) => { const a = t * sp + (i / Math.max(1, n)) * Math.PI * 2; m.position.set(Math.cos(a) * this.R, 2.1 * s.scale + Math.sin(t * 2 + i) * 0.25, Math.sin(a) * this.R); m.rotation.y = t * 2 + i; if (ph === 3) m.material.color.setRGB(2.6, 1.1 + Math.sin(t * 8) * 0.4, 0.5); });
    this.ring.material.opacity = Math.min(0.85, this.k) * (0.65 + Math.sin(t * 3) * 0.2); this.ring.rotation.z = t * 0.3;
    this.ring2.material.opacity = Math.min(0.6, this.k) * 0.7; this.ring2.rotation.z = -t * 0.5;
    if (G.state === 'duel' && Duel.sage === s && Duel.intro <= 0) {
      this.flashT -= dt; if (this.flashT <= 0) { this.flashT = (ph === 3 ? 3.5 : 6) + Math.random() * 5; this.thunder(); }
      if (Math.random() < dt * 10) particles.emit(new THREE.Vector3(s.pos.x + (Math.random() - 0.5) * this.R * 2, 0.2, s.pos.z + (Math.random() - 0.5) * this.R * 2), 1, { color: world.theme.accent, speed: 0.6, up: 1.4, life: 1.6, size: 0.25, intensity: 2.5 });
    }
    if (this.shake > 0) { this.shake = Math.max(0, this.shake - dt); const a = this.shake * 0.06; camera.position.x += (Math.random() - 0.5) * a; camera.position.y += (Math.random() - 0.5) * a; }
  },
  end(now) {
    this.on = false; this.bar(false);
    const g = this.g; this.g = null; this.s = null; this.stones = [];
    if (!g) return;
    const fade = () => { g.parent && g.parent.remove(g); g.traverse((o) => { if (o.material) o.material.dispose(); if (o.geometry && o.geometry !== this.geo) o.geometry.dispose(); }); };
    if (now) fade(); else { g.children.forEach((m) => { if (m.geometry === this.geo) particles.emit(m.getWorldPosition(new THREE.Vector3()), 30, { color: 0xffd36a, speed: 6, life: 1, size: 0.4, intensity: 3 }); }); fade(); }
  },
};
// enganches con el debate
{
  const a0 = Duel.ask.bind(Duel);
  Duel.ask = function () {
    const s = this.sage; const boss = s && s.boss && !this._oracle;
    if (boss && !(Maestro.on && Maestro.s === s)) Maestro.begin(s);
    const before = boss ? Maestro.ph : 0;
    a0();
    if (!boss) return;
    const ph = Maestro.phase(s);
    if (ph >= 2) { const cut = ph === 2 ? 3 : 4; this.maxTime = Math.max(9, this.maxTime - cut); this.time = this.maxTime; this.lastTick = Math.ceil(this.time); }
    if (ph > before && ph >= 2) Maestro.banner(ph);
    Maestro.ph = ph; Maestro.paintBar();
  };
  const an0 = Duel.answer.bind(Duel);
  Duel.answer = function (i) {
    const s = this.sage; const was = this.answered; an0(i);
    if (!s || !s.boss || !Maestro.on || was || !this.answered) return;
    const ok = i >= 0 && this.opts[i] && this.opts[i].ok;
    if (ok) Maestro.sync();
    else { Maestro.shake = 0.6; const from = _v1.copy(s.pos); from.y += 2.4 * s.scale; const to = camera.position; for (let k = 1; k <= 6; k++) particles.emit(_v2.copy(from).lerp(to, k / 8), 6, { color: world.theme.enemy.col, speed: 1.5, life: 0.5, size: 0.4, intensity: 3 }); }
  };
  const c0 = Duel.close.bind(Duel);
  Duel.close = function () { c0(); if (Maestro.on && G.state !== 'victory') Maestro.end(true); };
  const w0 = Duel.win.bind(Duel);
  Duel.win = function () { const boss = this.sage && this.sage.boss; w0(); if (boss) Maestro.end(false); };
}
{
  const st = document.createElement('style');
  st.textContent = '#mb-bar{margin:2px 0 8px}#mb-bar[hidden]{display:none}#mb-bar .mb-l{display:flex;justify-content:space-between;font-family:var(--display);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:#ffcf8a;margin-bottom:4px}#mb-bar .mb-p{color:#fff0c8}'
    + '#mb-bar .mb-t{position:relative;height:10px;border-radius:6px;background:rgba(0,0,0,.5);border:1px solid rgba(255,190,110,.55);overflow:hidden}#mb-bar .mb-f{position:absolute;inset:0;transform-origin:left;background:linear-gradient(90deg,#b0302a,#ff7a3a 60%,#ffd36a);box-shadow:0 0 12px rgba(255,120,60,.8);transition:transform .6s cubic-bezier(.3,1.4,.5,1)}'
    + '#mb-bar .mb-t b{position:absolute;top:0;bottom:0;width:2px;background:rgba(0,0,0,.6)}#mb-bar .mb-t b:nth-of-type(1){left:60%}#mb-bar .mb-t b:nth-of-type(2){left:20%}'
    + '#mb-bar.ph3 .mb-f{animation:mbPulse .8s ease-in-out infinite}@keyframes mbPulse{50%{filter:brightness(1.6)}}'
    + '#mb-ban{position:absolute;left:50%;top:22%;transform:translate(-50%,-50%) scale(.6);opacity:0;z-index:60;pointer-events:none;text-align:center;white-space:nowrap}#mb-ban.on{animation:mbBan 2.3s cubic-bezier(.2,1.3,.4,1) forwards}'
    + '#mb-ban b{display:block;font-family:var(--display,Georgia);font-size:clamp(2rem,9vw,3.6rem);letter-spacing:.12em;text-transform:uppercase;color:#ffe2a0;text-shadow:0 0 18px rgba(255,140,60,.9),0 3px 0 #5a2a08,0 0 40px rgba(255,90,40,.6)}#mb-ban.ph3 b{color:#fff;text-shadow:0 0 22px rgba(255,80,60,1),0 3px 0 #5a0a08,0 0 50px rgba(255,60,40,.8)}'
    + '#mb-ban span{display:inline-block;margin-top:6px;padding:6px 14px;border-radius:999px;background:rgba(20,8,4,.75);border:1px solid rgba(255,170,90,.6);color:#ffe9c8;font-size:clamp(.8rem,3.4vw,1rem);white-space:normal;max-width:86vw}'
    + '@keyframes mbBan{0%{opacity:0;transform:translate(-50%,-50%) scale(1.8)}12%{opacity:1;transform:translate(-50%,-50%) scale(1)}80%{opacity:1;transform:translate(-50%,-50%) scale(1.03)}100%{opacity:0;transform:translate(-50%,-60%) scale(1)}}'
    + '#mb-flash{position:absolute;inset:0;z-index:55;pointer-events:none;background:radial-gradient(circle at 50% 20%,rgba(235,240,255,.9),rgba(200,210,255,.35) 60%,rgba(0,0,0,0));opacity:0}#mb-flash.on{animation:mbFlash .7s ease-out}@keyframes mbFlash{0%{opacity:0}8%{opacity:.85}18%{opacity:.15}26%{opacity:.6}100%{opacity:0}}';
  document.head.appendChild(st);
}
if (location.hash === '#debug') window.__maestro = Maestro;
