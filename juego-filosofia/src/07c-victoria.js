// ============================================================================
//  VICTORIA DE CINE Y TARJETA PARA HISTORIAS
//  · Al vencer a un pensador: franjas de cine, la cámara gira a su alrededor,
//    se alza una columna de luz dorada, una onda recorre el suelo, el pensador
//    dice su última frase y una medalla con su retrato baja girando hasta ti.
//    Se puede saltar tocando la pantalla.
//  · En la tarjeta del concepto: «Compartir mi victoria», una imagen vertical
//    (1080×1920) para historias de Instagram o WhatsApp con tu avatar.
// ============================================================================
const Cine = {
  on: false, T: {
    beaten: '¡Venciste a ⟦0⟧!', understood: '¡Comprendiste a ⟦0⟧!', tap: 'Toca para continuar', medal: 'Medalla de ⟦0⟧',
    shareBtn: '📲 Comparte tu victoria', making: 'Preparando tu tarjeta…', saved: 'Tarjeta guardada: súbela a tu historia de Instagram o envíala por WhatsApp.',
    cardTop: '¡VENCÍ A', cardTopSac: 'COMPRENDÍ A', cardConcept: 'Concepto: ⟦0⟧', cardDare: '¿Te atreves a debatir con ⟦0⟧?', you: 'Tú',
    shareText: '🏛 ¡Vencí a ⟦0⟧ en Odisea de la Razón! ¿Te atreves? Entra directo aquí:', shareTextSac: '📜 Comprendí a ⟦0⟧ en Odisea de la Razón. Entra directo aquí:',
  },
  f(s, ...a) { return s.replace(/⟦(\d)⟧/g, (_, i) => a[i] ?? ''); },
  sacred() { return !!(ERAS[G.eraIdx] && ERAS[G.eraIdx].sacred); },
  gradTex() {
    if (this._g) return this._g; const c = document.createElement('canvas'); c.width = 4; c.height = 256; const x = c.getContext('2d');
    const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.55, 'rgba(255,255,255,0.55)'); g.addColorStop(0.92, 'rgba(255,255,255,1)'); g.addColorStop(1, 'rgba(255,255,255,0.2)');
    x.fillStyle = g; x.fillRect(0, 0, 4, 256); this._g = new THREE.CanvasTexture(c); return this._g;
  },
  start(s) {
    if (this.on) this.end(true);
    this.on = true; this.s = s; this.t0 = performance.now(); this.dur = s.boss ? 6200 : 4600; this.done = false;
    Duel.vicEnd = Infinity; // la tarjeta del concepto espera al final de la escena
    // las chispas del golpe de victoria duran poco: en cámara lenta llenarían la pantalla de blanco
    try { for (let i = 0; i < particles.n; i++) particles.life[i] = Math.min(particles.life[i], 0.32); } catch (e) { /* nada */ }
    const sc = s.scale || 1; this.c = new THREE.Vector3(s.pos.x, s.pos.y + 1.45 * sc, s.pos.z);
    const dx = camera.position.x - s.pos.x, dz = camera.position.z - s.pos.z; this.r = Math.max(3.7, Math.min(5.6, Math.hypot(dx, dz) + 0.6)) * (s.boss ? 1.25 : 1); this.a0 = (typeof s.yaw === 'number' ? s.yaw : s.group.rotation.y) - (s.boss ? 0.9 : 0.62); // la cámara gira por delante de su cara
    this.cam0 = { p: camera.position.clone(), q: camera.quaternion.clone() };
    const g = new THREE.Group(); scene.add(g); this.g = g;
    // columna de luz
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.75, 46, 28, 1, true), new THREE.MeshBasicMaterial({ map: this.gradTex(), color: 0xffd36a, transparent: true, opacity: 0.0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }));
    beam.position.set(s.pos.x, s.pos.y + 23, s.pos.z); beam.scale.set(0.01, 1, 0.01); g.add(beam); this.beam = beam;
    const core = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.18, 46, 16, 1, true), new THREE.MeshBasicMaterial({ map: this.gradTex(), color: 0xffffff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
    core.position.copy(beam.position); g.add(core); this.core = core;
    // onda en el suelo
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.6, 0.85, 64), new THREE.MeshBasicMaterial({ color: 0xffe08a, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }));
    ring.rotation.x = -Math.PI / 2; ring.position.set(s.pos.x, s.pos.y + 0.06, s.pos.z); g.add(ring); this.ring = ring;
    // medalla con su retrato
    const med = new THREE.Group(); const tex = new THREE.TextureLoader().load(ART.portrait(s.data.id)); tex.colorSpace = THREE.SRGBColorSpace;
    const gold = new THREE.MeshStandardMaterial({ color: 0xe0b040, metalness: 0.9, roughness: 0.25, emissive: 0x6a4a10, emissiveIntensity: 0.6 });
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.06, 48), gold); disc.rotation.x = Math.PI / 2; med.add(disc);
    for (const sgn of [1, -1]) { const face = new THREE.Mesh(new THREE.CircleGeometry(0.34, 40), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); face.position.z = sgn * 0.032; if (sgn < 0) face.rotation.y = Math.PI; med.add(face); }
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.035, 10, 48), gold); med.add(rim);
    const glow = new THREE.PointLight(0xffd36a, 4, 5, 1.6); med.add(glow);
    med.visible = false; g.add(med); this.med = med;
    // franjas de cine y rótulo
    let ov = document.getElementById('cine'); if (!ov) { ov = document.createElement('div'); ov.id = 'cine'; ov.innerHTML = '<i class="bar t"></i><i class="bar b"></i><div class="cap"><b></b><q></q><small></small></div>'; document.getElementById('app').appendChild(ov); ov.addEventListener('pointerdown', () => this.skip()); }
    ov.querySelector('b').textContent = this.f(this.sacred() ? this.T.understood : this.T.beaten, s.data.short); ov.querySelector('q').textContent = s.data.defeat || ''; ov.querySelector('small').textContent = this.T.tap;
    ov.classList.remove('on', 'cap-on', 'tap-on'); ov.hidden = false; void ov.offsetWidth; ov.classList.add('on'); this.ov = ov;
    setTimeout(() => { if (this.on && this.s === s) ov.classList.add('cap-on'); }, 700); setTimeout(() => { if (this.on && this.s === s) ov.classList.add('tap-on'); }, 1600);
    try { $('#hud').hidden = true; $('#touch').hidden = true; } catch (e) { /* nada */ }
    this.key = (e) => { if (['Enter', 'Space', 'Escape'].includes(e.code)) { e.preventDefault(); this.skip(); } }; window.addEventListener('keydown', this.key, true);
    this.lastBurst = 0; this.loop = () => { if (!this.on) return; this.frame(); requestAnimationFrame(this.loop); }; requestAnimationFrame(this.loop);
  },
  ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; },
  frame() {
    if (G.state !== 'victory') return this.end(true);
    const now = performance.now(), t = (now - this.t0) / this.dur, s = this.s; const e = this.ease(Math.min(1, t));
    // cámara: gira alrededor del pensador y se eleva un poco
    const a = this.a0 + e * (s.boss ? 1.8 : 1.25), r = this.r * (1 - 0.18 * e);
    camera.position.set(this.c.x + Math.sin(a) * r, this.c.y + 0.25 + e * 1.1, this.c.z + Math.cos(a) * r); camera.lookAt(this.c.x, this.c.y + 0.15 + e * 0.35, this.c.z);
    // columna de luz que se abre y late
    const bo = Math.min(1, t * 3.2); const pul = 1 + Math.sin(now / 140) * 0.06; this.beam.scale.set(bo * pul, 1, bo * pul); this.beam.material.opacity = 0.32 * bo * (t > 0.88 ? (1 - t) / 0.12 : 1); this.core.scale.set(bo, 1, bo); this.core.material.opacity = 0.5 * bo * (t > 0.88 ? (1 - t) / 0.12 : 1);
    this.beam.rotation.y += 0.01;
    // onda en el suelo
    const rt = (t * 2.2) % 1; this.ring.scale.setScalar(1 + rt * 16); this.ring.material.opacity = 0.6 * (1 - rt);
    // chispas que suben por la columna
    if (now - this.lastBurst > 230 && t < 0.8) { this.lastBurst = now; particles.emit(_v1.set(s.pos.x + (Math.random() - 0.5) * 1.4, s.pos.y + 0.3, s.pos.z + (Math.random() - 0.5) * 1.4), 7, { color: Math.random() < 0.6 ? 0xffd36a : 0xffffff, speed: 1.2, life: 0.45, size: 0.18, intensity: 1.4, gravity: -3 }); }
    // la medalla baja girando hasta quedar frente a ti
    const m0 = 0.42; if (t >= m0) {
      const mt = this.ease(Math.min(1, (t - m0) / (0.9 - m0))); this.med.visible = true;
      const fwd = new THREE.Vector3(); camera.getWorldDirection(fwd); const target = camera.position.clone().addScaledVector(fwd, 2.3).add(new THREE.Vector3(0, 0.28, 0));
      const from = new THREE.Vector3(this.c.x, this.c.y + 3.2, this.c.z); this.med.position.lerpVectors(from, target, mt);
      this.med.rotation.y = (1 - mt) * 14 + Math.sin(now / 300) * 0.15 * mt; this.med.lookAt && mt > 0.98 && this.med.quaternion.copy(camera.quaternion); this.med.scale.setScalar(0.7 + mt * 0.15);
      if (!this.ding && mt > 0.97) { this.ding = true; Audio.pickup && Audio.pickup(); buzz([20, 30, 60]); }
    }
    if (t >= 1) this.end(false);
  },
  skip() { if (!this.on) return; if (performance.now() - this.t0 < 500) return; this.end(false); },
  end(silent) {
    if (!this.on) return; this.on = false; this.ding = false; window.removeEventListener('keydown', this.key, true);
    if (this.g) { scene.remove(this.g); this.g.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material && o.material !== this._keep) { if (o.material.map && o.material.map !== this._g) o.material.map.dispose(); o.material.dispose(); } }); this.g = null; }
    if (this.ov) { this.ov.classList.remove('on', 'cap-on', 'tap-on'); setTimeout(() => { if (!this.on && this.ov) this.ov.hidden = true; }, 450); }
    if (this.cam0) { camera.position.copy(this.cam0.p); camera.quaternion.copy(this.cam0.q); }
    if (!silent && G.state === 'victory') Duel.vicEnd = performance.now();
  },
  // ---------------------------------------------------------------- tarjeta vertical para historias
  async avatarImg(w, h) {
    try {
      const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
      const r = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true, preserveDrawingBuffer: true }); r.setPixelRatio(1); r.setSize(w, h, false); r.outputColorSpace = THREE.SRGBColorSpace;
      const sc = new THREE.Scene(); sc.add(new THREE.HemisphereLight(0xfff4e0, 0x40342a, 1.8)); const d = new THREE.DirectionalLight(0xffffff, 2.4); d.position.set(2, 4, 3); sc.add(d);
      const fig = buildFigure(avLook(Juntos.look()), 0xffffff); fig.halo.visible = false; fig.group.rotation.y = -0.45; fig.armR.rotation.z = 2.55; fig.armR.rotation.x = -0.15; sc.add(fig.group); // brazo en alto: victoria
      const cam = new THREE.PerspectiveCamera(30, w / h, 0.1, 30); cam.position.set(0, 1.25, 5.2); cam.lookAt(0, 1.2, 0);
      r.render(sc, cam); const out = document.createElement('canvas'); out.width = w; out.height = h; out.getContext('2d').drawImage(cv, 0, 0);
      fig.group.traverse((o) => { if (o.geometry) o.geometry.dispose(); }); r.dispose(); return out;
    } catch (e) { return null; }
  },
  async card(s) {
    const W = 1080, H = 1920; const cv = document.createElement('canvas'); cv.width = W; cv.height = H; const x = cv.getContext('2d');
    const disp = '"Marcellus SC", "Marcellus", Georgia, serif', body = '"EB Garamond", Georgia, serif';
    const [bg, por, logo, av] = await Promise.all([Share.img(ART.era(G.eraIdx)), Share.portrait(s.data.id), Share.loadLogo(), this.avatarImg(560, 900)]);
    // fondo: el paisaje de la época, oscurecido
    x.fillStyle = '#120c06'; x.fillRect(0, 0, W, H);
    if (bg) { const k = Math.max(W / bg.width, H / bg.height) * 1.05; const bw = bg.width * k, bh = bg.height * k; x.filter = 'blur(3px) saturate(1.1)'; x.drawImage(bg, (W - bw) / 2, (H - bh) / 2, bw, bh); x.filter = 'none'; }
    let gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, 'rgba(10,6,2,0.78)'); gr.addColorStop(0.32, 'rgba(10,6,2,0.25)'); gr.addColorStop(0.62, 'rgba(10,6,2,0.45)'); gr.addColorStop(1, 'rgba(10,6,2,0.95)'); x.fillStyle = gr; x.fillRect(0, 0, W, H);
    // rayos de luz detrás del retrato
    const cx = W / 2, cy = 760; x.save(); x.translate(cx, cy); for (let i = 0; i < 24; i++) { x.rotate(Math.PI / 12); const rg = x.createLinearGradient(0, 0, 0, -820); rg.addColorStop(0, 'rgba(255,214,120,0.35)'); rg.addColorStop(1, 'rgba(255,214,120,0)'); x.fillStyle = rg; x.beginPath(); x.moveTo(-28, 0); x.lineTo(28, 0); x.lineTo(0, -820); x.closePath(); x.fill(); } x.restore();
    const halo = x.createRadialGradient(cx, cy, 120, cx, cy, 460); halo.addColorStop(0, 'rgba(255,205,100,0.55)'); halo.addColorStop(1, 'rgba(255,205,100,0)'); x.fillStyle = halo; x.fillRect(0, 200, W, 1100);
    // titular
    x.textAlign = 'center'; x.textBaseline = 'alphabetic'; x.shadowColor = 'rgba(0,0,0,0.85)'; x.shadowBlur = 18;
    x.fillStyle = '#ffffff'; x.font = `600 74px ${disp}`; x.fillText(this.sacred() ? this.T.cardTopSac : this.T.cardTop, cx, 200);
    let fs = 132; x.font = `${fs}px ${disp}`; while (x.measureText(s.data.short.toUpperCase()).width > W - 120 && fs > 60) { fs -= 6; x.font = `${fs}px ${disp}`; }
    x.fillStyle = '#ffd36a'; x.fillText(s.data.short.toUpperCase() + '!', cx, 200 + fs + 6); x.shadowBlur = 0;
    // retrato en medalla dorada
    const R = 250; x.save(); x.beginPath(); x.arc(cx, cy, R + 22, 0, Math.PI * 2); const mg = x.createLinearGradient(cx - R, cy - R, cx + R, cy + R); mg.addColorStop(0, '#fff0b0'); mg.addColorStop(0.5, '#d8a838'); mg.addColorStop(1, '#8a5a18'); x.fillStyle = mg; x.shadowColor = 'rgba(255,200,90,0.7)'; x.shadowBlur = 50; x.fill(); x.restore();
    if (por) { x.save(); x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.clip(); x.drawImage(por, cx - R, cy - R, R * 2, R * 2); x.restore(); }
    x.strokeStyle = 'rgba(255,240,190,0.9)'; x.lineWidth = 4; x.beginPath(); x.arc(cx, cy, R + 4, 0, Math.PI * 2); x.stroke();
    // laurel: dos ramas que suben desde abajo por los lados de la medalla
    x.fillStyle = '#ffd36a'; for (const sg of [-1, 1]) for (let i = 0; i < 9; i++) { const th = Math.PI / 2 + sg * (0.32 + i * 0.21); const rr = R + 52; x.save(); x.translate(cx + Math.cos(th) * rr, cy + Math.sin(th) * rr); x.rotate(th + sg * 0.45); x.beginPath(); x.ellipse(0, 0, 10, 24, 0, 0, Math.PI * 2); x.fill(); x.restore(); }
    // tu avatar con el brazo en alto
    if (av) { x.save(); x.shadowColor = 'rgba(0,0,0,0.6)'; x.shadowBlur = 30; x.drawImage(av, W - 470, 870, 430, 690); x.restore(); }
    const name = Juntos.myName(); const RI = typeof Rango !== 'undefined' ? Rango.info() : null;
    x.textAlign = 'right'; x.fillStyle = '#fff4dc'; x.font = `44px ${disp}`; x.shadowColor = 'rgba(0,0,0,0.9)'; x.shadowBlur = 12; x.fillText(name, W - 70, 1600);
    if (RI) { x.fillStyle = RI.r.c || '#ffd36a'; x.font = `34px ${body}`; x.fillText(`${RI.r.i} ${RI.r.n}`, W - 70, 1645); } x.shadowBlur = 0;
    // frase y concepto
    x.textAlign = 'left'; const L = 70, maxW = W - 560; const wrap = (t, y, font, color, lh, maxLines) => { x.font = font; x.fillStyle = color; const ws = t.split(' '); let line = '', n = 0; for (const w of ws) { const tt = line ? line + ' ' + w : w; if (x.measureText(tt).width > maxW && line) { x.fillText(line, L, y); y += lh; line = w; if (++n >= maxLines - 1) { const rest = ws.slice(ws.indexOf(w)).join(' '); let r2 = rest; while (x.measureText(r2 + '…').width > maxW && r2.length > 3) r2 = r2.slice(0, -2); x.fillText(r2 + (r2 !== rest ? '…' : ''), L, y); return y + lh; } } else line = tt; } if (line) x.fillText(line, L, y); return y + lh; };
    x.shadowColor = 'rgba(0,0,0,0.9)'; x.shadowBlur = 10;
    let y = 1130; y = wrap('«' + (s.data.defeat || s.data.concept.name) + '»', y, `italic 46px ${body}`, '#fff4dc', 58, 6);
    y += 16; wrap(this.f(this.T.cardConcept, s.data.concept.name), y, `36px ${disp}`, '#ffd36a', 46, 3);
    x.fillStyle = 'rgba(255,233,176,0.85)'; x.font = `32px ${body}`; x.fillText(`${ERAS[G.eraIdx].num} · ${ERAS[G.eraIdx].name}`, L, 1645); x.shadowBlur = 0;
    // reto y pie
    x.fillStyle = 'rgba(255,211,106,0.16)'; x.strokeStyle = '#d8b25a'; x.lineWidth = 3; x.beginPath(); x.roundRect ? x.roundRect(60, 1690, W - 120, 84, 42) : x.rect(60, 1690, W - 120, 84); x.fill(); x.stroke();
    x.textAlign = 'center'; x.fillStyle = '#ffffff'; x.font = `600 40px ${body}`; x.fillText(this.f(this.T.cardDare, s.data.short), cx, 1745);
    Share.foot(x, W, 1850, logo);
    return cv;
  },
  async share(s) {
    if (!s || this.busy) return; this.busy = true; const b = document.getElementById('b-cshare'); const t0 = b ? b.textContent : ''; if (b) { b.textContent = this.T.making; b.disabled = true; }
    try {
      try { await document.fonts.ready; } catch (e) { /* nada */ }
      const cv = await this.card(s); const link = typeof Ir !== 'undefined' ? Ir.url('ir=' + s.data.id) : GAME_URL;
      await Share.send(cv, `victoria-${s.data.id}.jpg`, this.f(this.sacred() ? this.T.shareTextSac : this.T.shareText, s.data.short) + ' ' + link, this.T.saved);
      achieve && achieve('foto');
    } catch (e) { console.warn(e); }
    this.busy = false; if (b) { b.textContent = t0; b.disabled = false; }
  },
};
// enganche: la victoria del duelo dispara la escena de cine
{
  const w0 = Duel.win.bind(Duel);
  Duel.win = function () { w0(); if (G.state === 'victory' && this._won) try { Cine.start(this._won); } catch (e) { console.warn(e); Duel.vicEnd = performance.now(); } };
  const sc0 = Duel.showConcept.bind(Duel);
  Duel.showConcept = function () { if (Cine.on) Cine.end(true); sc0(); const s = this._won;
    let b = document.getElementById('b-cshare'); if (!b) { b = document.createElement('button'); b.id = 'b-cshare'; b.className = 'btn cshare'; const box = document.querySelector('#concept .btns'); box.insertBefore(b, document.getElementById('b-clesson')); b.addEventListener('click', () => { Audio.click(); Cine.share(Duel._won); }); }
    b.textContent = Cine.T.shareBtn; b.disabled = false; b.hidden = !s; };
}
if (location.hash === '#debug') window.__cine = Cine;
{
  const st = document.createElement('style');
  st.textContent = '#cine{position:absolute;inset:0;z-index:60;pointer-events:auto;cursor:pointer}#cine[hidden]{display:none}'
    + '#cine .bar{position:absolute;left:0;right:0;height:12vh;background:#000;transition:transform .5s cubic-bezier(.2,.8,.2,1)}#cine .bar.t{top:0;transform:translateY(-100%)}#cine .bar.b{bottom:0;transform:translateY(100%)}'
    + '#cine.on .bar{transform:none}'
    + '#cine .cap{position:absolute;left:0;right:0;bottom:calc(12vh + 18px);text-align:center;padding:0 20px;opacity:0;transform:translateY(14px);transition:opacity .6s,transform .6s;text-shadow:0 2px 10px #000}'
    + '#cine.cap-on .cap{opacity:1;transform:none}#cine .cap b{display:block;font-family:var(--display,Georgia);font-weight:normal;font-size:clamp(1.7rem,6vw,3rem);color:#ffd36a;letter-spacing:.06em;filter:drop-shadow(0 0 18px rgba(255,200,90,.6))}'
    + '#cine .cap q{display:block;max-width:760px;margin:8px auto 0;font-style:italic;font-size:clamp(1rem,3.6vw,1.35rem);color:#fff4dc;line-height:1.35}'
    + '#cine .cap small{display:block;margin-top:12px;font-size:.8rem;opacity:0;color:#e9d8b0;letter-spacing:.12em;text-transform:uppercase;transition:opacity .6s}#cine.tap-on .cap small{opacity:.75}'
    + '#concept .btn.cshare{background:linear-gradient(90deg,#f9a03f,#e1306c 55%,#833ab4);color:#fff;border:0;box-shadow:0 6px 20px rgba(225,48,108,.35)}';
  document.head.appendChild(st);
}
