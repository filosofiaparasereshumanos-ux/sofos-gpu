// ============================================================================
//  ESTADO GLOBAL
// ============================================================================
const SAVE_KEY = 'odisea-razon.save', SET_KEY = 'odisea-razon.settings', CODEX_KEY = 'odisea-razon.codex';
const G = {
  state: 'loading', prevScreen: null, eraIdx: 0, score: 0, frags: 0, hp: 100, maxHp: 100,
  stats: { correct: 0, wrong: 0, kills: 0, time: 0 }, eraStart: null,
  codex: new Set(store.get(CODEX_KEY, [])),
  settings: Object.assign({ sens: 1, music: 0.7, sfx: 0.85, quality: IS_TOUCH ? 'mid' : 'high', invertY: false, voices: true, autofire: true, vibrate: true }, store.get(SET_KEY, {})),
  streak: 0, bestStreak: 0,
  noLock: false, intentionalUnlock: false,
};

// ============================================================================
//  RENDER
// ============================================================================
const app = $('#app');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ antialias: !IS_TOUCH, powerPreference: 'high-performance' });
} catch (e) {
  $('#load-err').textContent = 'Tu navegador no tiene WebGL disponible. Prueba con Chrome, Firefox o Safari actualizados.';
  throw e;
}
renderer.setSize(app.clientWidth, app.clientHeight);
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.1;
app.prepend(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(72, app.clientWidth / app.clientHeight, 0.05, 1000);
scene.add(camera);
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(app.clientWidth, app.clientHeight), 0.45, 0.5, 0.95);
composer.addPass(bloom);
// gradación: viñeta, grano y aberración cromática al recibir daño
const grade = new ShaderPass({
  uniforms: { tDiffuse: { value: null }, time: { value: 0 }, hurt: { value: 0 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: `uniform sampler2D tDiffuse; uniform float time, hurt; varying vec2 vUv;
    void main(){ vec2 d = vUv - 0.5; float ca = 0.0015 + hurt * 0.014;
      vec3 c = vec3(texture2D(tDiffuse, vUv + d * ca).r, texture2D(tDiffuse, vUv).g, texture2D(tDiffuse, vUv - d * ca).b);
      float v = smoothstep(0.95, 0.3, length(d * vec2(1.1, 1.25))); c *= mix(0.62, 1.0, v);
      c = mix(c, c * vec3(1.35, 0.55, 0.55), hurt * 0.45);
      float n = fract(sin(dot(vUv * 913.7 + time, vec2(12.9898, 78.233))) * 43758.5453);
      c += (n - 0.5) * 0.03 * max(c, vec3(0.05));
      gl_FragColor = vec4(c, 1.0); }`,
});
composer.addPass(grade);
composer.addPass(new OutputPass());
const particles = new Particles(3000); scene.add(particles.points);

function applyQuality() {
  const q = G.settings.quality, hi = q === 'high';
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, hi ? 1.75 : q === 'mid' ? 1.35 : 1));
  renderer.shadowMap.enabled = hi;
  onResize();
  if (world) world.group.traverse((o) => { if (o.isDirectionalLight) o.castShadow = hi; });
  scene.traverse((o) => { if (o.material) { const ms = Array.isArray(o.material) ? o.material : [o.material]; ms.forEach((m) => (m.needsUpdate = true)); } });
}
function onResize() {
  const w = app.clientWidth, h = app.clientHeight;
  renderer.setSize(w, h); composer.setSize(w, h); camera.aspect = w / h; camera.fov = baseFov(); camera.updateProjectionMatrix();
  particles.mat.uniforms.scale.value = h * renderer.getPixelRatio() * 0.9;
}
window.addEventListener('resize', onResize);
// Campo de visión: en vertical se amplía para no ver "por un tubo"
function baseFov() { const hf = (80 * Math.PI) / 180; const v = (2 * Math.atan(Math.tan(hf / 2) / (camera.aspect || 1)) * 180) / Math.PI; return clamp(v, 70, 100); }

// ---------- utilidades para móvil: vibración, pantalla completa, pantalla encendida, voces
function buzz(p) { if (!IS_TOUCH || !G.settings.vibrate) return; try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) { /* no disponible */ } }
const FS_OK = !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
function toggleFS() {
  try {
    if (document.fullscreenElement || document.webkitFullscreenElement) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    else { const el = document.documentElement; const r = (el.requestFullscreen || el.webkitRequestFullscreen).call(el, { navigationUI: 'hide' }); if (r && r.catch) r.catch(() => {}); }
  } catch (e) { /* no disponible */ }
}
let wakeLock = null;
async function keepAwake() { try { if ('wakeLock' in navigator && !wakeLock) { wakeLock = await navigator.wakeLock.request('screen'); wakeLock.addEventListener('release', () => (wakeLock = null)); } } catch (e) { /* no disponible */ } }
const Voice = {
  v: null,
  pick() { try { const vs = speechSynthesis.getVoices(); this.v = vs.find((v) => /^es[-_]ES/i.test(v.lang)) || vs.find((v) => /^es/i.test(v.lang)) || null; } catch (e) { /* sin voces */ } },
  say(text, sage) {
    if (!G.settings.voices || !('speechSynthesis' in window)) return;
    try {
      speechSynthesis.cancel(); if (!this.v) this.pick();
      const u = new SpeechSynthesisUtterance(text); u.lang = 'es-ES'; if (this.v) u.voice = this.v;
      const h = sage ? [...sage.data.id].reduce((a, c) => a + c.charCodeAt(0), 0) : 0;
      u.pitch = sage ? (sage.boss ? 0.6 : 0.78 + (h % 5) * 0.09) : 1; u.rate = sage && sage.boss ? 0.9 : 1.02; u.volume = Math.min(1, 0.3 + G.settings.sfx);
      speechSynthesis.speak(u);
    } catch (e) { /* sin voz */ }
  },
  stop() { try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) { /* sin voz */ } },
};
try { if ('speechSynthesis' in window) speechSynthesis.onvoiceschanged = () => Voice.pick(); } catch (e) { /* sin voz */ }
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { if (G.state === 'play') pauseGame(); Voice.stop(); if (Audio.ctx) Audio.ctx.suspend(); }
  else if (Audio.ctx) Audio.ctx.resume();
});
function popup(html, cls = '') { const el = document.createElement('div'); el.className = 'pop ' + cls; el.innerHTML = html; $('#popups').appendChild(el); setTimeout(() => el.remove(), 1400); }
const streakMult = () => (G.streak >= 10 ? 4 : G.streak >= 6 ? 3 : G.streak >= 3 ? 2 : 1);

// ---------- lámpara de Diógenes (arma en primera persona)
const lamp = new THREE.Group();
{
  const brass = new THREE.MeshStandardMaterial({ color: 0xc8a050, metalness: 0.9, roughness: 0.3 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x2a2018, metalness: 0.6, roughness: 0.5 });
  lamp.add(mesh(new THREE.CylinderGeometry(0.075, 0.09, 0.03, 16), brass, 0, -0.1, 0, false, false));
  lamp.add(mesh(new THREE.CylinderGeometry(0.06, 0.075, 0.03, 16), brass, 0, 0.1, 0, false, false));
  lamp.add(mesh(new THREE.ConeGeometry(0.065, 0.06, 16), dark, 0, 0.14, 0, false, false));
  for (let i = 0; i < 4; i++) { const k = (i / 4) * TAU + Math.PI / 4; lamp.add(mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.2, 5), dark, Math.cos(k) * 0.07, 0, Math.sin(k) * 0.07, false, false)); }
  lamp.add(mesh(new THREE.CylinderGeometry(0.062, 0.062, 0.18, 16, 1, true), new THREE.MeshStandardMaterial({ color: 0xfff0d0, transparent: true, opacity: 0.08, roughness: 0.05, depthWrite: false }), 0, 0, 0, false, false));
  const handle = mesh(new THREE.TorusGeometry(0.05, 0.008, 6, 16, Math.PI), brass, 0, 0.17, 0, false, false); lamp.add(handle);
  lamp.userData.flame = mesh(new THREE.SphereGeometry(0.022, 10, 8), glow(0xffc070, 4), 0, -0.02, 0, false, false);
  lamp.userData.flame.scale.y = 1.6; lamp.add(lamp.userData.flame);
  lamp.userData.halo = mesh(new THREE.SphereGeometry(0.05, 10, 8), glow(0xffa040, 1.2, { transparent: true, opacity: 0.18, additive: true }), 0, -0.02, 0, false, false); lamp.add(lamp.userData.halo);
  const ll = new THREE.PointLight(0xffb060, 3.5, 12, 2); ll.position.set(0.25, 0.1, -1.4); camera.add(ll); lamp.userData.light = ll;
  lamp.scale.setScalar(0.72);
  lamp.position.set(0.3, -0.3, -0.55);
  lamp.traverse((o) => { if (o.isMesh) o.renderOrder = 5; });
}
camera.add(lamp);

// ============================================================================
//  JUGADOR Y CONTROLES
// ============================================================================
const player = { pos: new THREE.Vector3(), vel: new THREE.Vector3(), yaw: 0, pitch: 0, onGround: true, fireCd: 0, epojeCd: 0, bob: 0, stepT: 0, recoil: 0, shake: 0, dashT: 0, dashCd: 0, iframe: 0, dashDir: new THREE.Vector3(), roll: 0, airT: 0, land: 0, floor: null, coyote: 0, jumpHeld: false, safe: new THREE.Vector3() };
const input = { keys: {}, mdx: 0, mdy: 0, fire: false, locked: false, joy: { x: 0, y: 0 }, lookDX: 0, lookDY: 0, drag: false };
const EPOJE_CD = 7;

function lockPointer() {
  if (IS_TOUCH || G.noLock) return;
  const el = renderer.domElement;
  try {
    const p = el.requestPointerLock({ unadjustedMovement: true });
    if (p && p.catch) p.catch(() => { try { const p2 = el.requestPointerLock(); if (p2 && p2.catch) p2.catch(() => { G.noLock = true; showLockHint(); }); } catch (e) { G.noLock = true; showLockHint(); } });
  } catch (e) { G.noLock = true; showLockHint(); }
}
function unlockPointer() { if (document.pointerLockElement) { G.intentionalUnlock = true; document.exitPointerLock(); } }
function showLockHint() { const h = $('#lockhint'); h.textContent = 'Arrastra con el ratón para mirar · clic para disparar'; h.hidden = G.state !== 'play'; setTimeout(() => (h.hidden = true), 4000); }
document.addEventListener('pointerlockchange', () => {
  input.locked = document.pointerLockElement === renderer.domElement;
  if (input.locked) $('#lockhint').hidden = true;
  if (!input.locked && G.state === 'play' && !G.intentionalUnlock) pauseGame();
  G.intentionalUnlock = false;
});
document.addEventListener('pointerlockerror', () => { G.noLock = true; if (G.state === 'play') showLockHint(); });

window.addEventListener('keydown', (e) => {
  if (e.repeat && !['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) return;
  input.keys[e.code] = true;
  if (G.state === 'oracle') { Oracle.key(e); return; }
  if (G.state === 'play') {
    if (e.code === 'KeyE' || e.code === 'KeyF') tryInteract();
    if (e.code === 'KeyQ') epoje();
    if (e.code === 'KeyL') tryLesson();
    if (e.code === 'KeyC' || e.code === 'ControlLeft') input.dashReq = true;
    if (e.code === 'KeyP' || (e.code === 'Escape' && !input.locked)) pauseGame();
    if (e.code === 'Space') e.preventDefault();
  } else if (G.state === 'duel') {
    if (e.repeat) return;
    const n = { Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3, Numpad1: 0, Numpad2: 1, Numpad3: 2, Numpad4: 3, KeyA: 0, KeyB: 1, KeyC: 2, KeyD: 3 }[e.code];
    if (n !== undefined && performance.now() - Duel.askedAt > 500) Duel.answer(n);
    if ((e.code === 'Enter' || e.code === 'Space' || e.code === 'NumpadEnter') && Duel.answered) { e.preventDefault(); Duel.next(); }
  } else if (G.state === 'concept' && (e.code === 'Enter' || e.code === 'Space')) { e.preventDefault(); closeConcept(); }
  else if (G.state === 'intro' && (e.code === 'Enter' || e.code === 'Space')) { e.preventDefault(); enterEra(); }
  else if (G.state === 'paused' && (e.code === 'Escape' || e.code === 'KeyP') && !$('#pause').hidden) resumeGame();
});
window.addEventListener('keyup', (e) => { input.keys[e.code] = false; });
window.addEventListener('blur', () => { input.keys = {}; input.fire = false; });
renderer.domElement.addEventListener('mousedown', (e) => {
  if (G.state !== 'play' || IS_TOUCH) return;
  if (!input.locked && !G.noLock) { lockPointer(); return; }
  if (e.button === 0) { input.fire = true; input.drag = true; }
  if (e.button === 2) epoje();
});
window.addEventListener('mouseup', (e) => { if (e.button === 0) { input.fire = false; input.drag = false; } });
window.addEventListener('mousemove', (e) => {
  if (G.state !== 'play') return;
  if (input.locked || (G.noLock && input.drag)) { input.mdx += e.movementX || 0; input.mdy += e.movementY || 0; }
});
window.addEventListener('contextmenu', (e) => e.preventDefault());

// ---------- táctil
function setupTouch() {
  document.body.classList.add('touch');
  const zone = $('#joyzone'), joy = $('#joy'), knob = joy.querySelector('i'); let joyId = null, cx = 0, cy = 0; const R = 56;
  const home = () => { joy.style.left = joy.style.top = joy.style.bottom = ''; joy.classList.remove('active'); knob.style.transform = ''; };
  // joystick flotante: aparece donde apoyas el pulgar
  zone.addEventListener('touchstart', (e) => {
    e.preventDefault(); if (joyId !== null) return;
    const t = e.changedTouches[0]; joyId = t.identifier; cx = t.clientX; cy = t.clientY;
    const r = app.getBoundingClientRect(); joy.style.left = (cx - r.left - 66) + 'px'; joy.style.top = (cy - r.top - 66) + 'px'; joy.style.bottom = 'auto'; joy.classList.add('active');
  }, { passive: false });
  const lookTouches = new Map();
  window.addEventListener('touchmove', (e) => {
    for (const t of e.changedTouches) {
      if (t.identifier === joyId) {
        let dx = t.clientX - cx, dy = t.clientY - cy; const l = Math.hypot(dx, dy); if (l > R) { dx *= R / l; dy *= R / l; }
        knob.style.transform = `translate(${dx}px, ${dy}px)`;
        // zona muerta pequeña y respuesta progresiva
        const k = Math.hypot(dx, dy) / R; const f = k < 0.12 ? 0 : (k - 0.12) / 0.88 / (k || 1);
        input.joy.x = (dx / R) * f; input.joy.y = (dy / R) * f;
      } else if (lookTouches.has(t.identifier)) {
        const p = lookTouches.get(t.identifier); const dx = t.clientX - p.x, dy = t.clientY - p.y;
        const acc = 1 + Math.min(1.2, Math.hypot(dx, dy) / 40); // aceleración suave en giros rápidos
        input.lookDX += dx * acc; input.lookDY += dy * acc; p.x = t.clientX; p.y = t.clientY;
      }
    }
    if (G.state === 'play') e.preventDefault();
  }, { passive: false });
  const end = (e) => { for (const t of e.changedTouches) { if (t.identifier === joyId) { joyId = null; input.joy.x = input.joy.y = 0; home(); } lookTouches.delete(t.identifier); } };
  window.addEventListener('touchend', end); window.addEventListener('touchcancel', end);
  renderer.domElement.addEventListener('touchstart', (e) => { if (G.state !== 'play') return; for (const t of e.changedTouches) lookTouches.set(t.identifier, { x: t.clientX, y: t.clientY }); }, { passive: true });
  const hold = (id, on, off) => {
    const b = $(id);
    b.addEventListener('touchstart', (e) => { e.preventDefault(); e.stopPropagation(); b.classList.add('down'); on(); }, { passive: false });
    const up = (e) => { e.preventDefault(); b.classList.remove('down'); off && off(); };
    b.addEventListener('touchend', up, { passive: false }); b.addEventListener('touchcancel', up, { passive: false });
  };
  hold('#t-fire', () => (input.fire = true), () => (input.fire = false));
  hold('#t-act', () => tryInteract());
  hold('#t-lesson', () => tryLesson());
  hold('#t-epoje', () => epoje());
  hold('#t-dash', () => (input.dashReq = true));
  hold('#t-jump', () => (input.jumpReq = true));
  $('#tpause').addEventListener('click', () => pauseGame());
  if (FS_OK) { $('#tfs').hidden = false; $('#tfs').addEventListener('click', toggleFS); }
}

function forwardVec(out = new THREE.Vector3()) { return out.set(-Math.sin(player.yaw) * Math.cos(player.pitch), Math.sin(player.pitch), -Math.cos(player.yaw) * Math.cos(player.pitch)); }
const _v1 = new THREE.Vector3(), _v2 = new THREE.Vector3(), _v3 = new THREE.Vector3();

function collide(p, r) {
  const cs = world.colliders;
  for (let i = 0; i < cs.length; i++) {
    const c = cs[i];
    if (c.t === 0) {
      const cx = clamp(p.x, c.x0, c.x1), cz = clamp(p.z, c.z0, c.z1); const dx = p.x - cx, dz = p.z - cz; const d2 = dx * dx + dz * dz;
      if (d2 < r * r) {
        if (d2 > 1e-8) { const d = Math.sqrt(d2); p.x += (dx / d) * (r - d); p.z += (dz / d) * (r - d); }
        else { const pen = [p.x - c.x0, c.x1 - p.x, p.z - c.z0, c.z1 - p.z]; const m = Math.min(...pen); if (m === pen[0]) p.x = c.x0 - r; else if (m === pen[1]) p.x = c.x1 + r; else if (m === pen[2]) p.z = c.z0 - r; else p.z = c.z1 + r; }
      }
    } else {
      const dx = p.x - c.x, dz = p.z - c.z; const rr = r + c.r; const d2 = dx * dx + dz * dz;
      if (d2 < rr * rr && d2 > 1e-8) { const d = Math.sqrt(d2); p.x += (dx / d) * (rr - d); p.z += (dz / d) * (rr - d); }
    }
  }
  // las plataformas altas actúan como muros
  for (const f of world.floors) {
    if (!f.solid() || f.top <= p.y + 0.55 || f.top - f.th > p.y + 1.6) continue;
    if (f.kind === 'cyl') { const dx = p.x - f.x, dz = p.z - f.z; const rr = r + f.r; const d2 = dx * dx + dz * dz; if (d2 < rr * rr && d2 > 1e-8) { const d = Math.sqrt(d2); p.x += (dx / d) * (rr - d); p.z += (dz / d) * (rr - d); } }
    else {
      const cx = clamp(p.x, f.x - f.hw, f.x + f.hw), cz = clamp(p.z, f.z - f.hd, f.z + f.hd); const dx = p.x - cx, dz = p.z - cz; const d2 = dx * dx + dz * dz;
      if (d2 < r * r && d2 > 1e-8) { const d = Math.sqrt(d2); p.x += (dx / d) * (r - d); p.z += (dz / d) * (r - d); }
    }
  }
  for (const s of sages) { const dx = p.x - s.pos.x, dz = p.z - s.pos.z; const rr = r + s.radius; const d2 = dx * dx + dz * dz; if (d2 < rr * rr && d2 > 1e-8) { const d = Math.sqrt(d2); p.x += (dx / d) * (rr - d); p.z += (dz / d) * (rr - d); } }
}
function pointBlocked(p) {
  if (p.y < 0) return true;
  const cs = world.colliders;
  for (let i = 0; i < cs.length; i++) {
    const c = cs[i]; if (p.y > c.h) continue;
    if (c.t === 0) { if (p.x > c.x0 && p.x < c.x1 && p.z > c.z0 && p.z < c.z1) return true; }
    else { const dx = p.x - c.x, dz = p.z - c.z; if (dx * dx + dz * dz < c.r * c.r) return true; }
  }
  return false;
}

function updatePlayer(dt) {
  const s = G.settings.sens;
  const lx = input.mdx * 0.0022 * s + input.lookDX * 0.006 * s; const ly = (input.mdy * 0.0022 * s + input.lookDY * 0.006 * s) * (G.settings.invertY ? -1 : 1);
  input.mdx = input.mdy = input.lookDX = input.lookDY = 0;
  const k = input.keys;
  if (k.ArrowLeft) player.yaw += dt * 2.2; if (k.ArrowRight) player.yaw -= dt * 2.2;
  player.yaw -= lx; player.pitch = clamp(player.pitch - ly, -1.45, 1.45);
  let mx = 0, mz = 0;
  if (k.KeyW || k.ArrowUp) mz -= 1; if (k.KeyS || k.ArrowDown) mz += 1; if (k.KeyA) mx -= 1; if (k.KeyD) mx += 1;
  mx += input.joy.x; mz += input.joy.y;
  if (Math.abs(mx) + Math.abs(mz) > 0.05 || Math.abs(lx) + Math.abs(ly) > 0.02) input.auto = false; // el control manual cancela el paseo
  const aw = autoWalkDir(dt); if (aw) { mx = aw.mx; mz = aw.mz; }
  const ml = Math.hypot(mx, mz); if (ml > 1) { mx /= ml; mz /= ml; }
  const sprint = k.ShiftLeft || k.ShiftRight || (IS_TOUCH && ml > 0.95);
  const speed = sprint ? 8.8 : 5.4;
  const sy = Math.sin(player.yaw), cy = Math.cos(player.yaw);
  const wx = (mx * cy + mz * sy) * speed, wz = (-mx * sy + mz * cy) * speed;
  const accel = player.onGround ? 14 : 4;
  player.vel.x = damp(player.vel.x, wx, accel, dt); player.vel.z = damp(player.vel.z, wz, accel, dt);
  // impulso: ráfaga corta con invulnerabilidad
  player.dashCd -= dt; player.iframe -= dt;
  if (input.dashReq) {
    input.dashReq = false;
    if (player.dashCd <= 0) {
      const wl = Math.hypot(wx, wz);
      if (wl > 0.5) player.dashDir.set(wx / wl, 0, wz / wl); else player.dashDir.set(-sy, 0, -cy);
      player.dashT = 0.2; player.dashCd = 1.0; player.iframe = 0.32; Audio.dash(); buzz(20);
      particles.emit(_v1.copy(player.pos).setY(1), 24, { color: world.theme.lampCol, speed: 3, life: 0.5, size: 0.35, dir: player.dashDir.clone().negate(), spread: 0.8 });
    }
  }
  if (player.dashT > 0) {
    player.dashT -= dt; player.vel.x = player.dashDir.x * 23; player.vel.z = player.dashDir.z * 23;
    if (Math.random() < dt * 50) particles.emit(_v1.copy(player.pos).setY(0.9 + Math.random()), 1, { color: world.theme.lampCol, speed: 0.3, life: 0.4, size: 0.4, intensity: 1.6 });
  }
  // salto (con un instante de margen al salir de un borde)
  const wantJump = k.Space || input.jumpReq; input.jumpReq = false;
  if (wantJump && !player.jumpHeld && (player.onGround || player.coyote > 0)) { player.vel.y = 7.5; player.onGround = false; player.coyote = 0; player.floor = null; Audio.jump(); }
  player.jumpHeld = !!k.Space;
  // las plataformas móviles te llevan consigo
  if (player.onGround && player.floor) { player.pos.x += player.floor.dx; player.pos.z += player.floor.dz; if (player.floor.dy < 0) player.pos.y += player.floor.dy; }
  player.vel.y -= 22 * dt;
  player.pos.addScaledVector(player.vel, dt);
  const gnd = groundAt(world, player.pos.x, player.pos.z, player.pos.y);
  if (gnd && player.pos.y <= gnd.top + 0.03 && player.vel.y <= 0) {
    if (!player.onGround && player.airT > 0.3) { player.land = 1; Audio.step(); }
    player.pos.y = gnd.top; player.vel.y = 0; player.onGround = true; player.airT = 0; player.coyote = 0.12; player.floor = gnd.f;
    if (gnd.f && gnd.f.onStand) gnd.f.onStand();
    if (!gnd.f) player.safe.set(player.pos.x, 0, player.pos.z);
    else if (gnd.f.safe) player.safe.set(0, 0, gnd.f.respawnZ);
  } else {
    if (player.onGround) player.coyote = 0.12; else player.coyote -= dt;
    player.onGround = false; player.floor = null; player.airT += dt;
  }
  if (player.pos.y < -7) respawnPlayer('void');
  collide(player.pos, 0.45);
  // balanceo
  const hs = Math.hypot(player.vel.x, player.vel.z);
  if (player.onGround && hs > 0.5) {
    player.bob += dt * hs * 1.6; player.stepT -= dt * hs;
    if (player.stepT <= 0) { player.stepT = 2.6; Audio.step(); }
  }
  const bobY = Math.sin(player.bob * 2) * 0.045 * Math.min(1, hs / 5), bobX = Math.cos(player.bob) * 0.03 * Math.min(1, hs / 5);
  player.shake = Math.max(0, player.shake - dt * 3);
  const sh = player.shake * player.shake;
  player.land = Math.max(0, player.land - dt * 5);
  player.roll = damp(player.roll, -mx * 0.03 - (player.dashT > 0 ? (player.dashDir.x * cy - player.dashDir.z * sy) * 0.06 : 0), 6, dt);
  camera.position.set(player.pos.x, player.pos.y + 1.68 + bobY - Math.sin(player.land * Math.PI) * 0.12, player.pos.z);
  camera.rotation.set(player.pitch + (Math.random() - 0.5) * sh * 0.05, player.yaw + (Math.random() - 0.5) * sh * 0.05, player.roll, 'YXZ');
  const fovT = baseFov() + (sprint && hs > 6 ? 6 : 0) + (player.dashT > 0 ? 14 : 0);
  if (Math.abs(camera.fov - fovT) > 0.05) { camera.fov = damp(camera.fov, fovT, player.dashT > 0 ? 14 : 6, dt); camera.updateProjectionMatrix(); }
  // lámpara
  player.recoil = Math.max(0, player.recoil - dt * 6);
  lamp.position.set((IS_TOUCH ? 0.13 : 0.27) + bobX, (IS_TOUCH ? -0.31 : -0.25) + bobY * 0.6 - player.recoil * 0.025, -0.5 + player.recoil * 0.06);
  lamp.rotation.set(player.recoil * 0.3, 0, 0);
  const portrait = camera.aspect < 1; lamp.scale.setScalar(portrait ? 0.5 : 0.72); if (portrait) lamp.position.x -= 0.05;
  // disparo
  player.fireCd -= dt; player.epojeCd -= dt;
  const auto = IS_TOUCH && G.settings.autofire ? aimTarget(6) : null;
  if (IS_TOUCH) { const fb = $('#t-fire'); if (!!auto !== fb._auto) { fb._auto = !!auto; fb.classList.toggle('auto', !!auto); } }
  if ((input.fire || auto) && player.fireCd <= 0) fireLamp();
}
const _a1 = new THREE.Vector3(), _a2 = new THREE.Vector3();
function aimTarget(maxDeg) {
  const fwd = forwardVec(_a1); const c = Math.cos((maxDeg * Math.PI) / 180); let best = null, bd = -1;
  for (const e of enemies) {
    if (e.spawnT > 0 || e.dead) continue;
    const d = _a2.copy(e.pos).sub(camera.position); const L = d.length(); if (L > 34) continue;
    const dot = d.dot(fwd) / L; if (dot > c && dot > bd) { bd = dot; best = e; }
  }
  return best;
}
function fireLamp() {
  player.fireCd = 0.2; player.recoil = 1;
  const fwd = forwardVec(_v1);
  const from = _v2.set(0.3, -0.24, -0.7).applyQuaternion(camera.quaternion).add(camera.position);
  const target = _v3.copy(camera.position).addScaledVector(fwd, 30);
  const dir = target.sub(from).normalize();
  const tg = aimTarget(IS_TOUCH ? 12 : 4); if (tg) dir.copy(tg.pos).sub(from).normalize(); // asistencia de puntería
  spawnBolt(from.clone(), dir.clone(), 'player', 1, 38, world.theme.lampCol);
  particles.emit(from, 5, { color: world.theme.lampCol, speed: 2, life: 0.25, size: 0.25, dir, spread: 0.6 });
  Audio.shoot();
}
function epoje() {
  if (G.state !== 'play' || player.epojeCd > 0) return;
  player.epojeCd = EPOJE_CD; Audio.epoje(); player.shake = 0.6;
  const c = _v1.copy(player.pos); c.y += 1;
  for (let i = 0; i < 90; i++) { const a = (i / 90) * TAU; particles.emit(c, 1, { color: 0xffe0a0, speed: 14, life: 0.7, size: 0.5, dir: new THREE.Vector3(Math.cos(a), 0.05, Math.sin(a)), spread: 0.05, intensity: 3 }); }
  particles.emit(c, 40, { color: 0xffffff, speed: 4, life: 0.9, size: 0.6, intensity: 2 });
  let kills = 0;
  for (const e of enemies) { const d = e.pos.distanceTo(c); if (d < 8) { const dir = _v2.copy(e.pos).sub(c).setY(0).normalize(); if (e.damage(3, dir)) { killEnemy(e); kills++; } else e.recoil.addScaledVector(dir, 10); } }
  if (kills >= 3) achieve('epoje3');
  for (const b of bolts) if (b.owner === 'enemy' && b.pos.distanceTo(c) < 8) { particles.emit(b.pos, 8, { color: b.color, speed: 3, life: 0.4 }); b.kill(); }
}

// ============================================================================
//  MUNDO, ENTIDADES Y DIRECTOR
// ============================================================================
let world = null; let sages = []; let enemies = []; let bolts = []; let pickups = []; let tAcc = 0;
const director = { budget: 0, timer: 0, queue: [] };
const game = { player, particles, get eraIdx() { return G.eraIdx; }, spawnBolt, hurtPlayer };

function disposeWorld() {
  if (!world) return;
  scene.remove(world.group);
  world.group.traverse((o) => { if (o.geometry && !Object.values(SHELL_GEO).includes(o.geometry) && o.geometry !== BOLT_GEO) o.geometry.dispose(); });
  for (const b of bolts) b.kill(); for (const p of pickups) p.kill();
  world = null; sages = []; enemies = []; bolts = []; pickups = []; particles.clear();
}
function loadWorld(idx) {
  disposeWorld();
  world = buildWorld(idx); scene.add(world.group); player.safe.copy(world.start); $('#trialcard').hidden = true;
  const th = world.theme;
  scene.fog = new THREE.FogExp2(th.fog[0], th.fog[1]);
  scene.background = new THREE.Color(th.sky[1]);
  renderer.toneMappingExposure = th.exposure;
  lamp.userData.light.color.set(th.lampCol); lamp.userData.flame.material = glow(th.lampCol, 4);
  lamp.userData.light.intensity = th.indoor || th.stars ? 5 : 2.5;
  sages = world.stations.map((st, i) => new Sage(world, st, i));
  world.beam = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.8, 40, 20, 1, true), new THREE.MeshBasicMaterial({ color: new THREE.Color(world.theme.accent).multiplyScalar(1.6), transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false, fog: false }));
  world.beam.geometry.translate(0, 20, 0); world.beam.visible = false; world.group.add(world.beam); input.auto = false;
  director.budget = 9 + idx * 2; director.timer = 5; director.queue = [];
  player.pos.copy(world.start); player.vel.set(0, 0, 0); player.yaw = 0; player.pitch = 0;
}
function spawnBolt(pos, dir, owner, dmg, speed, color) { bolts.push(new Bolt(world.group, pos, dir, owner, dmg, speed, color)); }
function spawnEnemy(pos, summoned = false) {
  const kind = Math.random() < (G.eraIdx === 0 ? 0.25 : 0.38) ? 'charger' : 'wisp';
  const e = new Shade(world, pos, kind, G.eraIdx, summoned); enemies.push(e);
  particles.emit(_v1.copy(pos).setY(2), 30, { color: world.theme.enemy.col, speed: 5, life: 0.8, size: 0.5, intensity: 2 });
  return e;
}
function spawnFromPoints(n) {
  const fz = frontierZ() + 2;
  let cands = world.spawns.filter((s) => s.z > fz && s.distanceTo(player.pos) > 10 && s.distanceTo(player.pos) < 38);
  if (!cands.length) cands = world.spawns.filter((s) => s.z > fz && s.distanceTo(player.pos) > 6);
  shuffle(cands); for (let i = 0; i < n && i < cands.length; i++) director.queue.push({ pos: cands[i].clone(), t: i * 0.35 });
}
function updateDirector(dt) {
  for (let i = director.queue.length - 1; i >= 0; i--) { const q = director.queue[i]; q.t -= dt; if (q.t <= 0) { spawnEnemy(q.pos, q.summoned); director.queue.splice(i, 1); } }
  const alive = enemies.filter((e) => !e.summoned).length;
  director.timer -= dt;
  if (trialAt(player.pos.z)) director.timer = Math.max(director.timer, 2);
  if (director.timer <= 0) {
    director.timer = 7 - Math.min(3, G.eraIdx * 0.5) + Math.random() * 4;
    if (director.budget > 0 && alive < 3 + Math.min(3, G.eraIdx)) { director.budget--; spawnFromPoints(1); }
  }
}
function killEnemy(e) {
  if (e.dead) return; e.dead = true;
  Audio.kill(); G.stats.kills++; addScore(25); buzz(15); if (Stats.add('kills') >= 50) achieve('cazador'); popup('+25 · ' + ERAS[G.eraIdx].enemy.one, 'kill');
  particles.emit(e.pos, 50, { color: e.color, speed: 7, life: 0.9, size: 0.45, intensity: 2.5, gravity: 4 });
  particles.emit(e.pos, 20, { color: 0xffffff, speed: 3, life: 0.5, size: 0.3 });
  pickups.push(new Pickup(world.group, e.pos.clone(), 'frag'));
  if (Math.random() < 0.24) pickups.push(new Pickup(world.group, e.pos.clone().add(new THREE.Vector3(0.6, 0, 0.4)), 'heal'));
  e.dispose();
  enemies = enemies.filter((x) => x !== e);
  // ¿se rompe el escudo de un maestro?
  const shielded = sages.find((s) => s.state === 'shielded');
  if (shielded && !enemies.some((x) => x.summoned) && !director.queue.some((q) => q.summoned)) {
    shielded.setShield(false); Audio.shield();
    particles.emit(_v1.copy(shielded.pos).setY(2), 80, { color: world.theme.enemy.col, speed: 9, life: 1, size: 0.5, intensity: 2 });
    toast(`El escudo de ${shielded.data.short} se disipa. Vuelve a desafiarlo.`);
    Audio.mode = 'calm';
  }
}
function hurtPlayer(dmg, from) {
  if (G.state !== 'play') return;
  if (player.iframe > 0) { popup('¡Esquivado!', 'kill'); if (Stats.add('dodges') >= 10) achieve('esquiva'); return; }
  G.hurtFx = 1;
  G.hp = Math.max(0, G.hp - dmg); Audio.hurt(); player.shake = 0.8; buzz(40);
  const v = $('#vignette'); v.style.opacity = 1; setTimeout(() => (v.style.opacity = 0), 140);
  updateHud();
  if (G.hp <= 0) gameOver();
}
function updateBolts(dt) {
  for (const b of bolts) {
    if (b.dead) continue;
    b.life -= dt; if (b.life <= 0) { b.kill(); continue; }
    const steps = 2; let hit = false;
    for (let s = 0; s < steps && !hit; s++) {
      b.pos.addScaledVector(b.vel, dt / steps);
      if (b.owner === 'player') {
        for (const e of enemies) {
          if (e.spawnT > 0) continue;
          if (b.pos.distanceTo(e.pos) < e.radius + 0.15) {
            const dir = b.vel.clone().setY(0).normalize();
            if (e.damage(b.dmg, dir)) killEnemy(e); else Audio.hit();
            particles.emit(b.pos, 14, { color: b.color, speed: 4, life: 0.4, size: 0.3 }); flashCross(); hit = true; break;
          }
        }
        if (!hit) for (const sg of sages) {
          const c = _v1.copy(sg.pos); c.y += 1.1 * sg.scale;
          const r = sg.shield ? 1.9 * sg.scale : 0.6 * sg.scale;
          if (b.pos.distanceTo(c) < r || (Math.hypot(b.pos.x - sg.pos.x, b.pos.z - sg.pos.z) < 0.55 * sg.scale && b.pos.y < 2.3 * sg.scale)) {
            particles.emit(b.pos, 12, { color: sg.shield ? world.theme.enemy.col : 0xffffff, speed: 3, life: 0.5, size: 0.3 });
            if (!sg.shield && (!sg._quip || tAcc - sg._quip > 6)) { sg._quip = tAcc; toast(`${sg.data.short}: «Los argumentos no se refutan a golpes.»`); sg.gesture = 1; }
            hit = true; break;
          }
        }
      } else {
        const pc = _v1.copy(player.pos); pc.y += 1.1;
        if (Math.abs(b.pos.x - pc.x) < 0.5 && Math.abs(b.pos.z - pc.z) < 0.5 && Math.abs(b.pos.y - pc.y) < 0.95) { hurtPlayer(b.dmg, b.pos); particles.emit(b.pos, 16, { color: b.color, speed: 4, life: 0.4 }); hit = true; }
      }
      if (!hit && pointBlocked(b.pos)) { particles.emit(b.pos, 8, { color: b.color, speed: 2.5, life: 0.35, size: 0.25 }); hit = true; }
    }
    if (hit) b.kill();
  }
  bolts = bolts.filter((b) => !b.dead);
}
function updatePickups(dt) {
  for (const p of pickups) {
    p.update(dt);
    const d = Math.hypot(p.pos.x - player.pos.x, p.pos.z - player.pos.z);
    if (d < 3.2) { p.pos.x = damp(p.pos.x, player.pos.x, 6, dt); p.pos.z = damp(p.pos.z, player.pos.z, 6, dt); }
    if (d < 1) {
      if (p.kind === 'frag') { G.frags++; Audio.pickup(); }
      else { if (G.hp >= G.maxHp) continue; G.hp = Math.min(G.maxHp, G.hp + 22); Audio.heal(); toast('Ánfora de ambrosía: +22 razón'); }
      particles.emit(p.pos, 18, { color: p.kind === 'frag' ? 0x7fe6ff : 0xffd36a, speed: 3, life: 0.5 }); p.kill(); updateHud();
    } else if (p.life <= 0) p.kill();
  }
  pickups = pickups.filter((p) => !p.dead);
}
function updateEmitters(dt) {
  for (const em of world.emitters) {
    em.acc += dt * em.rate;
    while (em.acc >= 1) {
      em.acc--;
      const p = _v1.set(em.x, em.y, em.z); if (em.g) em.g.localToWorld(p);
      if (em.kind === 'flame') particles.emit(p, 1, { color: em.col, speed: em.big ? 1.2 : 0.6, up: em.big ? 2.6 : 1.6, life: em.big ? 0.9 : 0.7, size: em.big ? 0.7 : 0.4, jitter: em.big ? 0.8 : 0.3, drag: 1, intensity: 2.5 });
      else if (em.kind === 'water') particles.emit(p, 1, { color: em.col, speed: 1.5, up: 3.5, life: 1.1, size: 0.18, gravity: 7, drag: 0.3, intensity: 1.3 });
      else particles.emit(p, 1, { color: em.col, speed: 0.4, up: 0.6, life: 1.6, size: 0.5, jitter: 2, drag: 0.5, intensity: 0.8 });
    }
  }
}
function updateSages(dt, inDuel) {
  for (const s of sages) {
    s.update(dt, tAcc, player, inDuel && Duel.sage === s);
    if (s.state === 'shielded' && G.state === 'play') {
      s.shootCd -= dt;
      const d = s.pos.distanceTo(player.pos);
      if (s.shootCd <= 0 && d < 30) {
        s.shootCd = 2.4 - G.eraIdx * 0.12; s.gesture = 1;
        const from = _v1.copy(s.pos); from.y += 2.6 * s.scale;
        const to = _v2.copy(player.pos); to.y += 1.3;
        for (const off of [-0.18, 0, 0.18]) { const dir = to.clone().sub(from).normalize().applyAxisAngle(new THREE.Vector3(0, 1, 0), off); spawnBolt(from.clone(), dir, 'enemy', 9 + G.eraIdx, 10, world.theme.enemy.col); }
        Audio.enemyShot();
      }
    }
  }
}
function nearestSage() {
  let best = null, bd = 1e9; const fwd = forwardVec(_v1).setY(0).normalize();
  for (const s of sages) {
    const dx = s.pos.x - player.pos.x, dz = s.pos.z - player.pos.z; const d = Math.hypot(dx, dz);
    const reach = 3.6 + s.radius; if (d > reach) continue;
    const dot = (dx * fwd.x + dz * fwd.z) / (d || 1);
    if (dot < 0.2 && d > 1.8 + s.radius) continue;
    if (d < bd) { bd = d; best = s; }
  }
  return best;
}
// la puerta cerrada más cercana marca hasta dónde llega el camino abierto
function frontierZ() { const g = world.gates && world.gates.find((x) => !x.open); return g ? g.z : ARENA.z0; }
// el siguiente pensador del camino (o el portal si ya no queda ninguno)
function currentTarget() {
  const s = sages.find((x) => x.state !== 'defeated');
  if (s) return { sage: s, pos: s.pos, name: s.data.short, letter: s.data.short[0], reach: 2.9 + s.radius, h: 2.5 * s.scale + (s.boss ? 0.6 : 0) };
  if (world.portal.open) return { sage: null, pos: world.portal.group.position, name: 'el portal', letter: 'Ω', reach: 1.2, h: 5.4 };
  return null;
}
function autoWalkDir(dt) {
  // devuelve el movimiento (en ejes de cámara) para caminar hacia el objetivo, o null
  if (!input.auto) return null;
  let tg = currentTarget(); if (!tg) { input.auto = false; return null; }
  const tr = world.trials.find((t) => !t.done && player.pos.z > t.zE);
  if (tr && tg.pos.z < tr.zS) {
    if (player.pos.z < tr.zS + 0.3) { input.auto = false; return null; }
    tg = { pos: new THREE.Vector3(0, 0, tr.zS + 1.2), reach: 0.8, trialStop: tr };
  }
  const dx = tg.pos.x - player.pos.x, dz = tg.pos.z - player.pos.z; const d = Math.hypot(dx, dz);
  if (tg.trialStop && d < tg.reach) { input.auto = false; toast(`${tg.trialStop.cfg.name}: esta prueba la cruzas tú. ${IS_TOUCH ? 'Usa «Saltar».' : 'Salta con Espacio.'}`); return null; }
  if (d < tg.reach) { input.auto = false; if (tg.sage && tg.sage.state === 'idle') { toast(IS_TOUCH ? `Toca «Desafiar» para hablar con ${tg.name}.` : `Pulsa E para desafiar a ${tg.name}.`); buzz(15); } return null; }
  // girar la vista suavemente hacia el destino
  const want = Math.atan2(-dx, -dz); let dy = want - player.yaw; while (dy > Math.PI) dy -= TAU; while (dy < -Math.PI) dy += TAU;
  player.yaw += dy * Math.min(1, dt * 3.5); player.pitch = damp(player.pitch, 0, 3, dt);
  const sy = Math.sin(player.yaw), cy = Math.cos(player.yaw); const ux = dx / d, uz = dz / d;
  return { mx: ux * cy - uz * sy, mz: ux * sy + uz * cy };
}
// ---------- pruebas del camino ----------
function updateTrials(dt) {
  for (const tr of world.trials) {
    tr.near = Math.abs(player.pos.z - (tr.zS + tr.zE) / 2) < 24;
    const inside = player.pos.z < tr.zS && player.pos.z > tr.zE;
    if (inside && !tr.entered) { tr.entered = true; announceTrial(tr); }
    if (!tr.done && tr.entered && player.pos.z < tr.zE - 0.6 && player.onGround && player.pos.y > -0.5) completeTrial(tr);
    if (tr.near && tr.tick) {
      const r = tr.tick(dt, player);
      if (r === 'water') respawnPlayer('water', tr);
      else if (r && player.iframe <= 0) {
        G.hp = Math.max(0, G.hp - r.hurt); player.vel.copy(r.push); player.onGround = false; player.floor = null; player.iframe = 0.9; player.shake = 0.8; G.hurtFx = 1;
        Audio.hurt(); buzz(50); popup(`−${r.hurt} razón`, 'bad'); updateHud(); if (G.hp <= 0) gameOver();
      }
    }
  }
}
function trialAt(z) { return world.trials.find((t) => z < t.zS + 0.5 && z > t.zE - 0.5); }
let trialCardT = 0;
function announceTrial(tr) {
  const c = $('#trialcard'); $('#tc-kind').textContent = TRIAL_KIND[tr.cfg.type] || 'Prueba'; $('#tc-name').textContent = tr.cfg.name; $('#tc-hint').textContent = tr.cfg.hint;
  c.style.setProperty('--tc', '#' + new THREE.Color(tr.cfg.col).getHexString());
  c.hidden = true; void c.offsetWidth; c.hidden = false; document.body.classList.add('tc-on'); clearTimeout(trialCardT); trialCardT = setTimeout(() => { c.hidden = true; document.body.classList.remove('tc-on'); }, 6200);
  Music.sting('boss'); buzz([15, 30, 15]); input.auto = false;
}
function completeTrial(tr) {
  tr.done = true; const clean = tr.falls === 0; const pts = 150 + (clean ? 100 : 0); addScore(pts);
  popup(`+${pts}<small>${clean ? 'prueba superada sin caer' : 'prueba superada'}</small>`); Music.sting('victory'); Audio.correct(); buzz([20, 40, 60]);
  $('#trialcard').hidden = true;
  if (Stats.add('trials') >= 12) achieve('pruebas');
  if (tr.sage.id === 'tales' && clean) achieve('agua');
  if (clean && tr.cfg.type === 'rhythm') achieve('armonia');
  updateHud();
}
function respawnPlayer(kind, tr) {
  if (G.state !== 'play' || player.respawning) return;
  player.respawning = true; tr = tr || trialAt(player.pos.z); if (tr) tr.falls++;
  if (kind === 'water') Audio.splash(); else Audio.fall();
  const lost = Math.min(5, Math.max(0, G.hp - 10)); G.hp -= lost; buzz([40, 30, 40]);
  const f = $('#fade'); f.style.transition = 'opacity .25s'; f.classList.add('on');
  setTimeout(() => {
    player.pos.copy(player.safe); player.vel.set(0, 0, 0); player.yaw = 0; player.pitch = 0; player.iframe = 1.2; player.floor = null; player.onGround = false;
    f.classList.remove('on'); setTimeout(() => (f.style.transition = ''), 300); player.respawning = false;
    toast((kind === 'water' ? 'El agua te devuelve a la orilla.' : 'Caes al vacío… y despiertas en la última tierra firme.') + (lost ? ` −${lost} razón.` : ''));
    updateHud(); if (G.hp <= 0) gameOver();
  }, 280);
}
function regularsLeft() { return sages.filter((s) => !s.boss && s.state !== 'defeated').length; }
function updatePrompt() {
  const s = nearestSage(); const el = $('#prompt'); const ch = $('#crosshair');
  const tact = $('#t-act');
  let txt = '', can = false;
  if (s) {
    if (s.state === 'idle') { txt = IS_TOUCH ? `Desafiar a <b>${s.data.short}</b> o escuchar su lección` : `<b>E</b> · Desafiar a ${s.data.short} &nbsp;·&nbsp; <b>L</b> · Escuchar su lección`; can = true; }
    else if (s.state === 'sealed') { const n = regularsLeft(); txt = `Vence antes a ${n === 1 ? 'otro pensador' : n + ' pensadores'}`; }
    else if (s.state === 'shielded') txt = `Destruye a ${s.boss ? 'los ' + ERAS[G.eraIdx].enemy.many : 'sus defensores'}`;
    else if (s.state === 'defeated') txt = `${s.data.short} · <b>${s.data.concept.name}</b>${IS_TOUCH ? '' : ' &nbsp;·&nbsp; <b>L</b> · Su lección'}`;
  }
  const tg = currentTarget();
  if (!txt) {
    const gate = world.gates && world.gates.find((g) => !g.open && Math.abs(player.pos.z - g.z) < 3.5);
    if (gate) txt = `El paso se abrirá al vencer a <b>${sages[gate.i].data.short}</b>`;
  }
  el.hidden = !txt; if (txt && el.innerHTML !== txt) el.innerHTML = txt;
  ch.classList.toggle('talk', can);
  const tl = $('#t-lesson'); const showL = !!(s && (s.state === 'idle' || s.state === 'defeated')); if (tl && tl._on !== showL) { tl._on = showL; tl.hidden = !showL; }
  if (tact) {
    const label = can ? 'Desafiar' : input.auto ? 'Caminando…' : tg ? 'Ir a ' + tg.name.split(' ')[0] : 'Desafiar';
    if (tact._label !== label) { tact._label = label; tact.textContent = label; }
    const st = can ? 'ready' : tg ? 'go' : '';
    if (tact._st !== st) { tact._st = st; tact.classList.toggle('ready', st === 'ready'); tact.classList.toggle('go', st === 'go'); }
  }
  updateTargetMarker(tg, can);
}
// marcador flotante sobre el siguiente pensador (con distancia); en los bordes si está fuera de la vista
const _mk = new THREE.Vector3();
function updateTargetMarker(tg, near) {
  const el = $('#target');
  if (!tg || near || G.state !== 'play') { if (!el.hidden) el.hidden = true; if (world.beam) world.beam.visible = false; return; }
  const d = Math.hypot(tg.pos.x - player.pos.x, tg.pos.z - player.pos.z);
  if (world.beam) { world.beam.visible = true; world.beam.position.set(tg.pos.x, 0, tg.pos.z); world.beam.material.opacity = (0.03 + 0.11 * clamp((d - 5) / 14, 0, 1)) * (1 + Math.sin(tAcc * 3) * 0.3); }
  _mk.set(tg.pos.x, tg.h, tg.pos.z).project(camera);
  const W = app.clientWidth, H = app.clientHeight; let x = (_mk.x * 0.5 + 0.5) * W, y = (-_mk.y * 0.5 + 0.5) * H;
  const behind = _mk.z > 1; let edge = false;
  if (behind) { x = W - x; y = H - 90; }
  const m = 44; if (behind || x < m || x > W - m || y < m + 60 || y > H - m) edge = true;
  x = clamp(x, m, W - m); y = clamp(y, m + 60, H - 120);
  el.hidden = false; el.style.transform = `translate(${x}px, ${y}px)`; el.classList.toggle('edge', edge);
  const ang = Math.atan2(y - H / 2, x - W / 2); el.style.setProperty('--ang', ang + 'rad');
  const txt = `${tg.letter}|${tg.name}|${Math.round(d)}`; if (el._t !== txt) { el._t = txt; $('#tg-l').textContent = tg.letter; $('#tg-n').textContent = tg.name; $('#tg-d').textContent = Math.round(d) + ' m'; }
}
function tryInteract() {
  const s = nearestSage();
  if (!s || s.state === 'defeated') { if (currentTarget()) { input.auto = !input.auto; if (input.auto) Audio.click(); } return; }
  if (s.state === 'idle') Duel.start(s);
  else if (s.state === 'sealed') toast(`${s.data.short}: «Primero demuestra tu valía ante los demás.»`);
}
$('#target').addEventListener('click', (e) => { e.stopPropagation(); if (G.state !== 'play') return; input.auto = !input.auto; Audio.click(); buzz(10); });
function updatePortal(dt) {
  const P = world.portal; if (!P) return;
  P.disc.material.uniforms.t.value = tAcc;
  if (P.open) {
    P.k = Math.min(1, P.k + dt * 0.6); P.disc.material.uniforms.open.value = P.k; P.light.intensity = 25 * P.k;
    P.ring.material.emissiveIntensity = 0.05 + P.k * 2.2; P.ring.rotation.z += dt * 0.3;
    if (Math.random() < dt * 30) particles.emit(_v1.set(P.group.position.x + (Math.random() - 0.5) * 4, 2.9 + (Math.random() - 0.5) * 4, P.group.position.z), 1, { color: world.theme.accent, speed: 0.6, life: 1.2, size: 0.3, intensity: 2 });
    if (G.state === 'play' && Math.hypot(player.pos.x - P.group.position.x, player.pos.z - P.group.position.z) < 1.8) enterPortal();
  }
}
let fireHeldFrames = 0;
function updatePlay(dt) {
  G.stats.time += dt;
  updatePlayer(dt);
  updateSages(dt, false);
  for (const e of enemies) e.update(dt, game);
  updateTrials(dt); updateBolts(dt); updatePickups(dt); updateDirector(dt); updatePrompt(); updatePortal(dt);
  updateEpojeHud(); updatePathMe();
  Audio.mode = sages.some((s) => s.state === 'shielded') ? 'boss' : enemies.length > 1 ? 'combat' : 'calm';
  $('#lowhp').style.opacity = G.hp < 30 ? 0.6 + Math.sin(tAcc * 5) * 0.25 : 0;
}

// ============================================================================
//  DUELO DIALÉCTICO
// ============================================================================
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];
const Duel = {
  sage: null, q: null, opts: [], answered: false, time: 0, maxTime: 20, round: 0, used: { fifty: false, time: false }, lastTick: 0, resumed: false,
  start(s) {
    this.sage = s; G.state = 'duel'; unlockPointer(); input.fire = false; this.aidsUsed = false; s._wrongs = s._wrongs || 0;
    $('#duel').classList.remove('oracle');
    Audio.gong(); Audio.mode = s.boss ? 'boss' : 'duel';
    $('#hud').hidden = true; $('#touch').hidden = true; $('#duel').hidden = false;
    const d = s.data;
    $('#d-medal').textContent = d.short[0];
    $('#d-name').textContent = d.name;
    $('#d-meta').textContent = `${d.epithet} · ${d.dates}`;
    this.round = s._round || 0;
    const line = s._met ? (s.boss ? 'Tu fuerza no basta. Volvamos a la palabra.' : 'Continuemos donde lo dejamos.') : d.intro;
    this.renderPips(); s.gesture = 1;
    if (s.boss && !s._met) {
      // presentación cinematográfica del maestro
      this.intro = 2.8; this.introEnd = performance.now() + 2800; this.answered = true; this.introLine = line;
      $('#duel').hidden = true; $('#bc-eye').textContent = d.final ? 'El último maestro' : 'Maestro de la época';
      $('#bc-name').textContent = d.short; $('#bc-ep').textContent = d.epithet; $('#bosscard').hidden = false;
      Audio.tone(55, 2.6, { type: 'sine', vol: 0.4, slide: 0.5 }); Music.sting('boss'); buzz([20, 60, 120]);
    } else { this.intro = 0; this.say(line); this.ask(); }
    s._met = true;
  },
  say(t) { $('#d-say').textContent = '«' + t + '»'; Voice.say(t, this.sage); },
  renderPips() {
    const s = this.sage; $('#d-conv').innerHTML = Array.from({ length: s.maxConv }, (_, i) => `<i class="pip${i < s.conv ? '' : ' off'}"></i>`).join('');
    const m = streakMult(); const st = $('#d-streak'); st.className = 'streak' + (m > 1 ? ' hot' : '');
    st.innerHTML = G.streak > 0 ? `Racha ${G.streak}${m > 1 ? ` · <b>×${m}</b>` : ''}` : '';
    const hp = G.hp / G.maxHp; $('#d-hp').style.transform = `scaleX(${hp})`; $('#d-hp').classList.toggle('low', hp < 0.3); $('#d-hpn').textContent = Math.ceil(G.hp);
  },
  ask() {
    const s = this.sage; this.q = s.nextQuestion(); this.answered = false; this.used = { fifty: false, time: false }; this.askedAt = performance.now();
    this.round++; s._round = this.round;
    this.maxTime = (s.boss ? 22 : 26) - G.eraIdx * 0.5; this.time = this.maxTime; this.lastTick = Math.ceil(this.time);
    const opts = this.q.a.map((t, i) => ({ t, ok: i === 0 })); shuffle(opts); this.opts = opts;
    $('#d-qnum').textContent = 'Argumento ' + (ROMAN[this.round - 1] || this.round);
    $('#d-q').textContent = this.q.q;
    const box = $('#d-answers'); box.innerHTML = '';
    opts.forEach((o, i) => {
      const b = document.createElement('button'); b.className = 'ans'; b.innerHTML = `<span class="k">${'ABCD'[i]}</span><span></span>`; b.lastChild.textContent = o.t;
      b.addEventListener('click', () => this.answer(i)); box.appendChild(b);
    });
    $('#d-explain').hidden = true; $('#d-next').hidden = true;
    this.updateAids();
  },
  freeFifty() { return !!(G.lessonFree && this.sage && G.lessonFree[this.sage.data.id]); },
  updateAids() {
    const free = this.freeFifty(); const b = $('#aid-5050');
    b.innerHTML = free ? 'Mayéutica <em>gratis</em>' : 'Mayéutica <em>2◆</em>';
    b.disabled = this.answered || this.used.fifty || (!free && G.frags < 2);
    $('#aid-time').disabled = this.answered || this.used.time || G.frags < 1;
  },
  fifty() {
    const free = this.freeFifty();
    if (this.answered || this.used.fifty || (!free && G.frags < 2)) return;
    if (free) delete G.lessonFree[this.sage.data.id]; else G.frags -= 2;
    this.used.fifty = true; this.aidsUsed = true; Audio.pickup();
    const wrong = this.opts.map((o, i) => (o.ok ? -1 : i)).filter((i) => i >= 0); shuffle(wrong);
    const btns = $('#d-answers').children; wrong.slice(0, 2).forEach((i) => { btns[i].classList.add('gone'); btns[i].disabled = true; });
    this.say('Pregúntate bien, y lo verás tú mismo...'); this.updateAids(); updateHud();
  },
  moreTime() {
    if (this.answered || this.used.time || G.frags < 1) return;
    G.frags -= 1; this.used.time = true; this.aidsUsed = true; this.time = Math.min(this.time + 10, this.maxTime + 10); Audio.pickup(); this.updateAids(); updateHud();
  },
  answer(i) {
    if (this.answered || G.state !== 'duel' || this.intro > 0) return;
    const btns = $('#d-answers').children; if (i >= 0 && btns[i] && btns[i].disabled) return;
    this.answered = true; const s = this.sage; const ok = i >= 0 && this.opts[i].ok;
    [...btns].forEach((b, k) => { b.disabled = true; if (this.opts[k].ok) b.classList.add('right'); else if (k === i) b.classList.add('wrong'); else b.classList.add('dimmed'); });
    const head = _v1.copy(s.pos); head.y += 2 * s.scale;
    if (ok) {
      const fast = this.time > this.maxTime * 0.6;
      G.streak++; G.bestStreak = Math.max(G.bestStreak, G.streak); const mult = streakMult();
      const pts = (100 + Math.ceil(this.time * 8) + (fast ? 50 : 0)) * mult;
      s.conv--; G.stats.correct++; addScore(pts);
      popup(`+${pts}${mult > 1 ? `<small>racha ×${mult}</small>` : fast ? '<small>¡veloz!</small>' : ''}`, 'up');
      Audio.correct(); s.gesture = 1; buzz(25);
      if (mult > 1 && G.streak % 3 === 0) Audio.victory();
      if (this.maxTime - this.time < 3) achieve('veloz');
      if (G.streak >= 10) achieve('racha4');
      this.say(pick(fast ? LINES.fast : LINES.right));
      particles.emit(head, 50, { color: 0xffd36a, speed: 5, life: 0.9, size: 0.4, intensity: 2.5 });
    } else {
      const dmg = Math.round((s.boss ? 17 : 13) + G.eraIdx * 1.5);
      G.hp = Math.max(0, G.hp - dmg); G.stats.wrong++; Audio.wrong(); player.shake = 0.5; buzz([50, 40, 80]);
      s._wrongs++;
      popup(`−${dmg} razón${G.streak >= 3 ? '<small>racha perdida</small>' : ''}`, 'bad up'); G.streak = 0;
      const v = $('#vignette'); v.style.opacity = 0.8; setTimeout(() => (v.style.opacity = 0), 200);
      this.say(pick(i < 0 ? LINES.timeout : LINES.wrong));
      particles.emit(head, 30, { color: world.theme.enemy.col, speed: 4, life: 0.8, size: 0.4, intensity: 2 });
    }
    const ex = $('#d-explain');
    const right = this.opts.find((o) => o.ok).t;
    ex.innerHTML = `<b>${ok ? 'Correcto' : i < 0 ? 'Se acabó el tiempo' : 'Respuesta correcta'}</b>`;
    if (!ok) ex.append(document.createTextNode(right + '. '));
    if (this.q.e) ex.append(document.createTextNode(this.q.e));
    ex.hidden = false;
    this.renderPips(); this.updateAids(); updateHud();
    const nb = $('#d-next'); nb.hidden = false;
    nb.textContent = G.hp <= 0 ? 'Aceptar la derrota' : s.conv <= 0 ? 'Rematar el argumento' : 'Siguiente argumento';
    if (!IS_TOUCH) nb.focus({ preventScroll: true });
  },
  next() {
    if (!this.answered || this.intro > 0) return;
    const s = this.sage;
    if (G.hp <= 0) { this.close(); gameOver(); return; }
    if (s.conv <= 0) { this.win(); return; }
    if (s.breaks.includes(s.conv) && !(s._broken || []).includes(s.conv)) { (s._broken = s._broken || []).push(s.conv); this.breakPhase(); return; }
    this.ask();
  },
  update(dt) {
    // cámara hacia el filósofo
    const s = this.sage; const head = _v1.copy(s.pos); head.y += 1.95 * s.scale + (s.boss ? 0.25 : 0);
    const eye = _v2.set(player.pos.x, player.pos.y + 1.68, player.pos.z);
    const dir = head.sub(eye);
    const wantYaw = Math.atan2(-dir.x, -dir.z); const wantPitch = Math.atan2(dir.y, Math.hypot(dir.x, dir.z)) - 0.12;
    let dy = wantYaw - player.yaw; while (dy > Math.PI) dy -= TAU; while (dy < -Math.PI) dy += TAU;
    player.yaw += dy * Math.min(1, dt * 4); player.pitch = damp(player.pitch, wantPitch, 4, dt);
    camera.position.copy(eye); camera.rotation.set(player.pitch, player.yaw, 0, 'YXZ');
    camera.fov = damp(camera.fov, baseFov() * (this.intro > 0 ? 0.55 : 0.74), this.intro > 0 ? 1.2 : 3, dt); camera.updateProjectionMatrix();
    if (this.intro > 0) {
      this.intro = (this.introEnd - performance.now()) / 1000;
      if (Math.random() < dt * 40) particles.emit(_v3.copy(s.pos).setY(2.4 * s.scale), 1, { color: world.theme.accent, speed: 3, life: 1, size: 0.4, intensity: 2.5 });
      if (this.intro <= 0) { $('#bosscard').hidden = true; $('#duel').hidden = false; this.say(this.introLine); this.ask(); }
      return;
    }
    lamp.position.y = damp(lamp.position.y, -0.55, 4, dt);
    if (!this.answered) {
      this.time -= dt;
      const k = Math.max(0, this.time / this.maxTime);
      const tb = $('#d-timer'); tb.style.transform = `scaleX(${k})`; tb.classList.toggle('urgent', this.time < 5);
      $('#d-time').textContent = Math.max(0, Math.ceil(this.time));
      if (this.time < 5 && Math.ceil(this.time) !== this.lastTick) { this.lastTick = Math.ceil(this.time); Audio.tick(); }
      if (this.time <= 0) this.answer(-1);
    }
  },
  close() { $('#duel').hidden = true; $('#bosscard').hidden = true; this.intro = 0; camera.fov = baseFov(); camera.updateProjectionMatrix(); },
  resumePlay() {
    this.close(); G.state = 'play'; $('#hud').hidden = false; if (IS_TOUCH) $('#touch').hidden = false;
    input.keys = {}; input.fire = false; lockPointer(); updateHud(); this.sage = null;
  },
  breakPhase() {
    const s = this.sage;
    s.setShield(true); Audio.shield();
    const n = 3 + Math.floor(G.eraIdx / 2) + (s.data.final ? 1 : 0);
    for (let i = 0; i < n; i++) { const a = (i / n) * TAU; director.queue.push({ pos: new THREE.Vector3(s.pos.x + Math.cos(a) * 8, 0, clamp(s.pos.z + Math.sin(a) * 8 + 6, ARENA.z0 + 2, ARENA.z1 - 2)), t: 0.3 + i * 0.3, summoned: true }); }
    this.resumePlay();
    toast(`¡${s.data.short} se protege tras un escudo e invoca a los ${ERAS[G.eraIdx].enemy.many}!`);
    toast('Destrúyelos para romper el escudo.');
    s.shootCd = 3;
  },
  win() {
    const s = this.sage; s.defeat(); Audio.victory(); Music.sting('victory'); buzz([30, 50, 30, 50, 140]);
    achieve('primer'); if (s.data.id === 'socrates') achieve('tabano'); if (s.data.id === 'platon') achieve('caverna');
    if (!s._wrongs) achieve('perfecto'); if (s.boss && !this.aidsUsed) achieve('sincomodin');
    const bonus = s.boss ? 500 : 250; addScore(bonus); G.frags += 2; const heal = Math.min(25, G.maxHp - G.hp); G.hp += heal;
    G.codex.add(s.data.id); store.set(CODEX_KEY, [...G.codex]); if (G.codex.size >= 25) achieve('erudito');
    particles.emit(_v1.copy(s.pos).setY(2.5), 160, { color: 0xffd36a, speed: 9, life: 1.6, size: 0.55, intensity: 3, gravity: 2 });
    particles.emit(_v1.copy(s.pos).setY(1.2), 80, { color: 0xffffff, speed: 6, life: 1.2, size: 0.4, intensity: 2, flat: true });
    $('#duel').hidden = true; Voice.say(s.data.defeat, s);
    const f = $('#flash'); f.classList.remove('on'); void f.offsetWidth; f.classList.add('on');
    popup(`+${bonus}<small>${s.data.short} vencido</small>`);
    // cámara lenta antes de la tarjeta de concepto
    G.state = 'victory'; this.vicEnd = performance.now() + (s.boss ? 2000 : 1300); this._won = s; this._bonus = bonus; this._heal = heal;
  },
  showConcept() {
    const s = this._won, bonus = this._bonus, heal = this._heal; this.close();
    G.state = 'concept';
    $('#c-name').textContent = s.data.concept.name;
    $('#c-by').textContent = s.data.name + ' · ' + s.data.dates;
    $('#c-text').textContent = s.data.concept.text;
    $('#c-last').textContent = '«' + s.data.defeat + '»';
    $('#c-rew').innerHTML = `<span>+${bonus} sabiduría</span><span class="f">+2 fragmentos</span>${heal > 0 ? `<span class="h">+${heal} razón</span>` : ''}`;
    $('#concept').hidden = false;
    setTimeout(() => $('#b-concept').focus({ preventScroll: true }), 50);
    this._won = s;
  },
};
$('#aid-5050').addEventListener('click', () => Duel.fifty());
$('#aid-time').addEventListener('click', () => Duel.moreTime());
$('#d-next').addEventListener('click', () => (G.state === 'oracle' ? Oracle.next() : Duel.next()));

function closeConcept() {
  if (G.state !== 'concept') return;
  $('#concept').hidden = true; const s = Duel._won; Duel.sage = s; Duel.resumePlay();
  if (s.boss) {
    world.portal.open = true; Audio.portal();
    toast(s.data.final ? 'Se abre el último portal: la salida de la caverna.' : 'Se abre el portal hacia la siguiente época.');
  } else {
    const left = regularsLeft();
    openGate(world, s.idx); Audio.portal(); player.shake = 0.3;
    const nx = sages[s.idx + 1];
    if (left === 0) { const b = sages.find((x) => x.boss); b.state = 'idle'; toast(`Se abre el último paso: ${b.data.short}, el maestro, te espera.`); }
    else toast(`Se abre el camino hacia ${nx.data.short}. Quedan ${left} antes del maestro.`);
    spawnFromPoints(2 + Math.floor(G.eraIdx / 2));
  }
  updateHud();
}
$('#b-concept').addEventListener('click', closeConcept);
$('#b-clesson').addEventListener('click', () => { const s = Duel._won; closeConcept(); if (s) Lesson.open(s.data, s); });

// ============================================================================
//  HUD Y AVISOS
// ============================================================================
function addScore(n) { G.score += n; }
function toast(msg) {
  const box = $('#toasts'); const el = document.createElement('div'); el.className = 'toast'; el.textContent = msg; box.appendChild(el);
  while (box.children.length > 3) box.firstChild.remove();
  setTimeout(() => el.classList.add('fade'), 3800); setTimeout(() => el.remove(), 4500);
}
let crossT = 0;
function flashCross() { const c = $('#crosshair'); c.classList.add('hit'); clearTimeout(crossT); crossT = setTimeout(() => c.classList.remove('hit'), 90); }
function updateHud() {
  $('#h-score').textContent = G.score.toLocaleString('es-ES');
  $('#h-frags').textContent = '◆ ' + G.frags;
  const hp = G.hp / G.maxHp; const bar = $('#h-hp'); bar.style.transform = `scaleX(${hp})`; bar.classList.toggle('low', hp < 0.3);
  $('#h-hpn').textContent = Math.ceil(G.hp);
  if (!world) return;
  const era = ERAS[G.eraIdx];
  $('#h-era').textContent = `${era.num} · ${era.name}`;
  const left = regularsLeft(); const boss = sages.find((s) => s.boss);
  let obj;
  if (world.portal.open) obj = 'Cruza el portal del fondo.';
  else if (boss.state === 'shielded') obj = `Destruye a los ${era.enemy.many} que protegen a ${boss.data.short}.`;
  else if (left > 0) obj = `Desafía a los pensadores: quedan ${left}.`;
  else obj = `Desafía a ${boss.data.short}, el maestro de esta época.`;
  $('#h-obj').textContent = obj;
  buildPathHud();
}
// barra del camino: nodos en el orden real del recorrido y tu posición
const pathT = (z) => clamp((world.start.z - z) / (world.start.z - world.bossPos.z), 0, 1);
function buildPathHud() {
  const tg = currentTarget();
  $('#p-era').textContent = ERAS[G.eraIdx].num;
  const nodes = sages.map((s) => `<div class="node${s.boss ? ' boss' : ''}${s.state === 'defeated' ? ' done' : ''}${tg && tg.sage === s ? ' now' : ''}" style="left:${(pathT(s.pos.z) * 100).toFixed(2)}%"><b>${s.data.short[0]}</b><span>${s.data.short}</span></div>`).join('');
  $('#p-nodes').innerHTML = nodes;
  const done = sages.filter((s) => s.state === 'defeated').pop(); $('#p-fill').style.width = (done ? pathT(done.pos.z) * 100 : 0) + '%';
}
function updatePathMe() { const el = $('#p-me'); if (!world) return; const v = (pathT(player.pos.z) * 100).toFixed(1) + '%'; if (el._v !== v) { el._v = v; el.style.left = v; } }
let lastEp = -1;
function updateEpojeHud() {
  const k = clamp(1 - player.epojeCd / EPOJE_CD, 0, 1); if (Math.abs(k - lastEp) < 0.01) return; lastEp = k;
  $('#h-epoje-c').setAttribute('stroke-dashoffset', String(163.4 * (1 - k)));
  $('#h-epoje').classList.toggle('ready', k >= 1);
  const t = $('#t-epoje'); if (t) t.style.opacity = k >= 1 ? 1 : 0.4;
}

// ============================================================================
//  FLUJO DE PANTALLAS
// ============================================================================
const SCREENS = ['title', 'howto', 'intro', 'pause', 'codex', 'settings', 'gameover', 'ending', 'concept', 'oracle', 'oracle-end', 'fame', 'logros'];
function show(id) { SCREENS.forEach((s) => ($('#' + s).hidden = s !== id)); if (id) { const b = $('#' + id).querySelector('.btn.primary, .btn'); if (b && !IS_TOUCH) setTimeout(() => b.focus({ preventScroll: true }), 30); } }
function hideAll() { SCREENS.forEach((s) => ($('#' + s).hidden = true)); }

function saveProgress() { store.set(SAVE_KEY, { eraIdx: G.eraIdx, score: G.score, frags: G.frags, stats: G.stats }); }
function titleScreen() {
  G.state = 'title'; unlockPointer(); Duel.close(); Voice.stop();
  $('#b-fs').hidden = !(FS_OK && IS_TOUCH); if (typeof refreshTitleExtras === 'function') refreshTitleExtras();
  $('#hud').hidden = true; $('#touch').hidden = true; $('#duel').hidden = true;
  const sv = store.get(SAVE_KEY, null);
  const bc = $('#b-continue');
  if (sv && sv.eraIdx > 0) { bc.hidden = false; $('#b-continue-s').textContent = `Etapa ${ERAS[sv.eraIdx].num} · ${ERAS[sv.eraIdx].name}`; } else bc.hidden = true;
  const reached = sv ? sv.eraIdx : -1;
  $('#t-timeline').innerHTML = ERAS.map((e, i) => `<span class="${i < reached || G.codex.has(e.sages.find((s) => s.boss).id) ? 'done' : ''}">${e.num}</span>`).join('');
  const bg = clamp(reached, 0, 5);
  if (!world || world.idx !== bg) loadWorld(bg);
  Audio.startMusic(bg);
  show('title');
}
function startEra(idx, fresh) {
  G.eraIdx = idx;
  if (fresh) { G.score = 0; G.frags = 0; G.stats = { correct: 0, wrong: 0, kills: 0, time: 0 }; G.streak = 0; G.bestStreak = 0; }
  G.hp = G.maxHp;
  G.eraStart = { score: G.score, frags: G.frags, stats: { ...G.stats } };
  saveProgress();
  loadWorld(idx); Audio.startMusic(idx);
  const e = ERAS[idx];
  $('#i-eyebrow').textContent = `Etapa ${idx + 1} de ${ERAS.length} · ${e.years}`;
  $('#i-num').textContent = e.num; $('#i-name').textContent = e.name; $('#i-meta').textContent = e.place;
  $('#i-story').textContent = e.story;
  $('#i-quote').innerHTML = ''; $('#i-quote').append(document.createTextNode('«' + e.quote.t + '»')); const c = document.createElement('cite'); c.textContent = e.quote.a; $('#i-quote').append(c);
  $('#i-roster').innerHTML = e.sages.map((s) => `<span class="${s.boss ? 'boss' : ''}">${s.short}</span>`).join('<span aria-hidden="true">·</span>');
  G.state = 'intro'; $('#hud').hidden = true; $('#touch').hidden = true;
  show('intro');
}
function enterEra() {
  if (G.state !== 'intro') return;
  hideAll(); G.state = 'play'; $('#hud').hidden = false; if (IS_TOUCH) $('#touch').hidden = false;
  input.keys = {}; lockPointer(); updateHud(); keepAwake();
  if (G.eraIdx === 0) {
    toast(IS_TOUCH ? 'Acércate a un filósofo y toca «Desafiar».' : 'Acércate a un filósofo y pulsa E para desafiarlo.');
    toast(IS_TOUCH ? 'La lámpara dispara sola cuando apuntas a una Quimera del Mito.' : 'Dispara la lámpara con clic contra las Quimeras del Mito.');
  } else toast(`Llegas a ${ERAS[G.eraIdx].place}.`);
}
function pauseGame() {
  if (G.state !== 'play') return;
  G.state = 'paused'; input.fire = false; input.keys = {};
  $('#p-era').textContent = `${ERAS[G.eraIdx].num} · ${ERAS[G.eraIdx].name}`;
  show('pause');
}
function resumeGame() { hideAll(); G.state = 'play'; lockPointer(); keepAwake(); }
function gameOver() {
  G.state = 'gameover'; unlockPointer(); input.fire = false; Voice.stop(); G.diedEra = G.eraIdx; G.streak = 0; buzz([100, 60, 300]);
  $('#hud').hidden = true; $('#touch').hidden = true; Audio.mode = 'calm';
  Audio.tone(220, 1.5, { type: 'sawtooth', vol: 0.12, slide: 0.3, filter: 800 });
  show('gameover');
}
function retryEra() { G.score = G.eraStart.score; G.frags = G.eraStart.frags; G.stats = { ...G.eraStart.stats }; startEra(G.eraIdx, false); }
function enterPortal() {
  G.state = 'transition'; Audio.portal(); unlockPointer();
  if (G.diedEra !== G.eraIdx) achieve('logos'); G.diedEra = -1;
  const f = $('#fade'); f.classList.add('on');
  setTimeout(() => {
    if (G.eraIdx >= ERAS.length - 1) { showEnding(); f.classList.remove('on'); return; }
    startEra(G.eraIdx + 1, false); f.classList.remove('on');
  }, 900);
}
function showEnding() {
  G.state = 'ending'; $('#hud').hidden = true; $('#touch').hidden = true;
  store.set(SAVE_KEY, null);
  const tot = G.stats.correct + G.stats.wrong; const acc = tot ? G.stats.correct / tot : 0;
  const r = RANKS.find((x) => acc >= x.min);
  achieve('kant'); if (r === RANKS[0]) achieve('rey');
  Fame.submitOdyssey(G.score, r.name, Math.round(acc * 100));
  $('#e-rank').textContent = r.name; $('#e-rtext').textContent = r.text;
  const mins = Math.floor(G.stats.time / 60);
  $('#e-stats').innerHTML = `<div><b>${G.score.toLocaleString('es-ES')}</b><span>Sabiduría</span></div><div><b>${Math.round(acc * 100)}%</b><span>Aciertos</span></div><div><b>${G.bestStreak}</b><span>Mejor racha</span></div><div><b>${mins} min</b><span>Tiempo</span></div>`;
  Audio.victory(); show('ending');
}
function renderCodex() {
  const body = $('#cx-body'); body.innerHTML = '';
  let have = 0, total = 0;
  ERAS.forEach((e) => {
    const sec = document.createElement('div'); sec.className = 'codex-era';
    const h = document.createElement('h3'); h.textContent = `${e.num} · ${e.name} · ${e.years}`; sec.appendChild(h);
    const grid = document.createElement('div'); grid.className = 'codex-grid';
    e.sages.forEach((s) => {
      total++; const ok = G.codex.has(s.id); if (ok) have++;
      const c = document.createElement('div'); c.className = 'cc' + (ok ? '' : ' locked');
      const h4 = document.createElement('h4'); h4.textContent = ok ? s.concept.name : '· · ·';
      const by = document.createElement('div'); by.className = 'by'; by.textContent = s.name;
      const p = document.createElement('p'); p.textContent = ok ? s.concept.text : 'Vence a este pensador en un duelo para comprender su idea central.';
      const lb = document.createElement('button'); lb.className = 'mini-b lesson-b'; lb.textContent = '▶ Escuchar su lección';
      lb.addEventListener('click', () => { Audio.init(); Lesson.open(s, null); });
      c.append(h4, by, p, lb); grid.appendChild(c);
    });
    sec.appendChild(grid); body.appendChild(sec);
  });
  $('#cx-count').textContent = `${have} de ${total} conceptos comprendidos`;
}
function openSub(id) { G.prevScreen = SCREENS.find((s) => !$('#' + s).hidden) || 'title'; if (id === 'codex') renderCodex(); if (id === 'settings') syncSettings(); show(id); }
document.querySelectorAll('[data-back]').forEach((b) => b.addEventListener('click', () => { Audio.click(); show(G.prevScreen || 'title'); }));

function syncSettings() {
  $('#s-sens').value = G.settings.sens; $('#s-music').value = G.settings.music; $('#s-sfx').value = G.settings.sfx;
  document.querySelectorAll('#s-quality button').forEach((b) => b.classList.toggle('on', b.dataset.v === G.settings.quality));
  document.querySelectorAll('#s-invert button').forEach((b) => b.classList.toggle('on', (b.dataset.v === '1') === !!G.settings.invertY));
  for (const [id, k] of TOGGLES) document.querySelectorAll(id + ' button').forEach((b) => b.classList.toggle('on', (b.dataset.v === '1') === !!G.settings[k]));
}
const TOGGLES = [['#s-voices', 'voices'], ['#s-auto', 'autofire'], ['#s-vib', 'vibrate']];
for (const [id, k] of TOGGLES) document.querySelectorAll(id + ' button').forEach((b) => b.addEventListener('click', () => {
  G.settings[k] = b.dataset.v === '1'; saveSettings(); syncSettings();
  if (k === 'voices') { if (G.settings.voices) Voice.say('La filosofía comienza con el asombro.'); else Voice.stop(); }
  if (k === 'vibrate' && G.settings.vibrate) buzz(40);
}));
function saveSettings() { store.set(SET_KEY, G.settings); Audio.applyVolumes(); }
$('#s-sens').addEventListener('input', (e) => { G.settings.sens = +e.target.value; saveSettings(); });
$('#s-music').addEventListener('input', (e) => { G.settings.music = +e.target.value; saveSettings(); });
$('#s-sfx').addEventListener('input', (e) => { G.settings.sfx = +e.target.value; saveSettings(); Audio.click(); });
document.querySelectorAll('#s-quality button').forEach((b) => b.addEventListener('click', () => { G.settings.quality = b.dataset.v; saveSettings(); syncSettings(); applyQuality(); }));
document.querySelectorAll('#s-invert button').forEach((b) => b.addEventListener('click', () => { G.settings.invertY = b.dataset.v === '1'; saveSettings(); syncSettings(); }));

const on = (id, fn) => $(id).addEventListener('click', () => { Audio.init(); Audio.click(); fn(); });
on('#b-new', () => { G.codexRun = new Set(); startEra(0, true); });
on('#b-continue', () => { const sv = store.get(SAVE_KEY, null); if (!sv) return startEra(0, true); G.score = sv.score || 0; G.frags = sv.frags || 0; G.stats = sv.stats || { correct: 0, wrong: 0, kills: 0, time: 0 }; startEra(sv.eraIdx, false); });
on('#b-howto', () => openSub('howto'));
on('#b-fs', () => toggleFS());
on('#b-codex', () => openSub('codex'));
on('#b-settings', () => openSub('settings'));
on('#b-enter', () => enterEra());
on('#b-resume', () => resumeGame());
on('#b-pcodex', () => openSub('codex'));
on('#b-psettings', () => openSub('settings'));
on('#b-quit', () => { saveProgress(); titleScreen(); });
on('#b-retry', () => retryEra());
on('#b-gomenu', () => titleScreen());
on('#b-again', () => startEra(0, true));
on('#b-ecodex', () => openSub('codex'));

// ============================================================================
//  BUCLE PRINCIPAL
// ============================================================================
const clock = new THREE.Clock();
tAccW = () => tAcc;
let fpsAcc = 0, fpsN = 0, autoChecked = false;
function titleCam() {
  const a = tAcc * 0.05; camera.position.set(Math.sin(a) * 26, 7 + Math.sin(tAcc * 0.2) * 1.5, -6 + Math.cos(a) * 26);
  camera.lookAt(0, 3, -10); camera.fov = baseFov(); camera.updateProjectionMatrix(); lamp.visible = false;
}
// partículas ambientales de cada época: polvo dorado, polen, ascuas, motas en la luz, pétalos, luciérnagas
const MOTES = [
  { c: 0xffd9a0, up: 0.08, g: 0, i: 1.4, s: 0.12 }, { c: 0xfff6e0, up: 0.05, g: 0, i: 1.1, s: 0.1 },
  { c: 0xff8a40, up: 0.9, g: 0, i: 2.4, s: 0.13 }, { c: 0xc8d4ff, up: 0.02, g: 0, i: 1.3, s: 0.1 },
  { c: 0xffb6c8, up: 0, g: 0.25, i: 1.2, s: 0.16 }, { c: 0xb8ff9a, up: 0.1, g: 0, i: 3, s: 0.12 },
];
let moteAcc = 0;
function ambientMotes(dt) {
  const m = MOTES[world.idx]; moteAcc += dt * (G.settings.quality === 'low' ? 7 : 14);
  while (moteAcc >= 1) {
    moteAcc--; const a = Math.random() * TAU, r = 2 + Math.random() * 13;
    _v1.set(camera.position.x + Math.cos(a) * r, 0.3 + Math.random() * 5, camera.position.z + Math.sin(a) * r);
    particles.emit(_v1, 1, { color: m.c, speed: 0.35, up: m.up, gravity: m.g, life: 4.5, size: m.s, drag: 0.15, intensity: m.i });
  }
}
function frame() {
  requestAnimationFrame(frame);
  const raw = Math.min(clock.getDelta(), 0.05); const dt = G.state === 'victory' ? raw * 0.22 : raw; tAcc += dt;
  if (world) {
    for (const a of world.anim) a(tAcc, dt);
    updateEmitters(dt);
    world.sky.position.copy(camera.position); if (world.stars) world.stars.position.copy(camera.position);
  }
  if (G.state === 'play') updatePlay(dt);
  else if (G.state === 'duel') { Duel.update(dt); updateSages(dt, true); }
  else if (G.state === 'oracle') { Oracle.update(raw); titleCam(); }
  else if (G.state === 'lesson') { Lesson.update(raw); updateSages(dt, true); }
  else if (G.state === 'victory') { updateSages(dt, true); camera.fov = damp(camera.fov, baseFov() * 0.62, 2, raw); camera.updateProjectionMatrix(); if (performance.now() >= Duel.vicEnd) Duel.showConcept(); }
  else if (world && (G.state === 'title' || G.state === 'intro' || G.state === 'ending')) { titleCam(); updateSages(dt, false); }
  if (world && ['play', 'duel', 'title', 'intro', 'oracle', 'victory', 'ending'].includes(G.state)) ambientMotes(raw);
  G.hurtFx = Math.max(0, (G.hurtFx || 0) - raw * 2.5); grade.uniforms.hurt.value = G.hurtFx; grade.uniforms.time.value = tAcc % 100;
  if (G.state === 'play' || G.state === 'duel' || G.state === 'victory') lamp.visible = true;
  // llama de la lámpara
  const fl = lamp.userData.flame; fl.scale.set(1 + Math.sin(tAcc * 23) * 0.08, 1.6 + Math.sin(tAcc * 17) * 0.2, 1);
  lamp.userData.light.intensity = (world && (world.theme.indoor || world.theme.stars) ? 5 : 2.5) * (0.9 + Math.sin(tAcc * 19) * 0.1);
  particles.update(dt);
  Audio.updateMusic();
  if (G.settings.quality !== 'low') composer.render(); else renderer.render(scene, camera);
  // calidad automática: si va muy lento al principio, bajar
  if (G.state !== 'play' && !$('#target').hidden) $('#target').hidden = true;
  if (world && world.sun) { world.sun.target.position.set(camera.position.x, 0, camera.position.z - 4); world.sun.position.copy(world.sun.target.position).add(world.sunOff); }
  if (!autoChecked && G.state === 'play') {
    fpsAcc += raw; fpsN++;
    if (fpsAcc > 4) {
      const fps = fpsN / fpsAcc; fpsAcc = fpsN = 0;
      if (fps < 28 && G.settings.quality !== 'low') { G.settings.quality = G.settings.quality === 'high' ? 'mid' : 'low'; saveSettings(); applyQuality(); toast('Calidad gráfica ajustada para que el juego vaya más fluido.'); }
      else autoChecked = true;
    }
  }
}

// ============================================================================
//  ARRANQUE
// ============================================================================
async function boot() {
  if (IS_TOUCH) setupTouch();
  try { await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 2500))]); } catch (e) { /* sin fuentes */ }
  applyQuality();
  titleScreen();
  $('#loading').style.display = 'none';
  frame();
  // el audio necesita un gesto del usuario
  const unlock = () => { Audio.init(); Audio.startMusic(world ? world.idx : 0); window.removeEventListener('pointerdown', unlock); window.removeEventListener('keydown', unlock); };
  window.addEventListener('pointerdown', unlock); window.addEventListener('keydown', unlock);
}

// Gancho de pruebas automáticas (solo con #debug en la URL)
if (location.hash === '#debug') window.__dbg = { G, player, Duel, startEra, enterEra, loadWorld, get sages() { return sages; }, get enemies() { return enemies; }, get world() { return world; }, camera, renderer, spawnFromPoints, tryInteract, closeConcept, killEnemy, get Oracle() { return Oracle; }, get Fame() { return Fame; }, achieve, Music, updatePlayer, updateTrials, input, setT: (t) => (tAcc = t), getT: () => tAcc };
