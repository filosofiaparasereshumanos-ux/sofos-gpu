// ============================================================================
//  EL VIAJE EN EL TIEMPO
//  Al cambiar de época (desde la rueda de mundos, el portal o un enlace) se
//  atraviesa un túnel de luz: estrellas que se estiran, un reloj que gira y los
//  años que corren hasta la época de destino. Mientras tanto se construye el
//  mundo nuevo, así la espera se convierte en parte del viaje.
// ============================================================================
const Tunel = {
  el: null, on: false, built: false,
  T: { k: 'Viajando en el tiempo', to: 'Rumbo a' },
  build() {
    if (this.el) return; const el = document.createElement('div'); el.id = 'tunel'; el.hidden = true;
    el.innerHTML = '<canvas></canvas><div class="tn-c"><div class="tn-clock"><i></i><i class="m"></i></div><span class="tn-k"></span><b class="tn-y"></b><span class="tn-n"></span></div>';
    (document.getElementById('app') || document.body).appendChild(el); this.el = el; this.cv = el.querySelector('canvas');
  },
  play(to, go) {
    if (this.on || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) { go(); return; }
    this.build(); const el = this.el; const from = world ? world.idx : -1; const E = ERAS[to]; if (!E) { go(); return; }
    this.on = true; this.built = false; this.t0 = performance.now(); this.from = from; this.to = to; this.called = false; this.go = go;
    el.querySelector('.tn-k').textContent = this.T.k; el.querySelector('.tn-n').textContent = `${this.T.to} ${E.num} · ${E.name}`;
    this.yFrom = from >= 0 && ERAS[from] ? ERAS[from].years : ''; this.yTo = E.years; el.querySelector('.tn-y').textContent = this.yFrom || this.yTo;
    // estrellas del túnel con el color de la época de destino
    const th = (typeof THEMES !== 'undefined' && THEMES[to]) || null; this.acc = th ? '#' + new THREE.Color(th.accent).getHexString() : '#ffd36a';
    this.stars = Array.from({ length: 260 }, () => ({ a: Math.random() * Math.PI * 2, z: Math.random(), s: 0.4 + Math.random() * 1.2, c: Math.random() < 0.3 }));
    el.hidden = false; el.classList.remove('out'); void el.offsetWidth; el.classList.add('in');
    Audio.init && Audio.init(); Audio.portal && Audio.portal(); buzz([15, 40, 15, 40, 60]);
    const loop = () => { if (!this.on) return; try { this.frame(); } catch (e) { console.warn('túnel', e); this.finish(); return; } requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  },
  frame() {
    const el = performance.now() - this.t0, cv = this.cv, c = cv.getContext('2d');
    const W = cv.clientWidth || innerWidth, H = cv.clientHeight || innerHeight, dpr = Math.min(2, devicePixelRatio || 1);
    if (cv.width !== Math.round(W * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    const k = Math.min(1, el / 1200); const speed = 0.004 + k * k * 0.03;
    c.fillStyle = 'rgba(6,5,14,0.32)'; c.fillRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2, R = Math.hypot(W, H) * 0.6;
    const g = c.createRadialGradient(cx, cy, 0, cx, cy, R * 0.5); g.addColorStop(0, `rgba(255,236,190,${0.25 + k * 0.35})`); g.addColorStop(0.4, 'rgba(120,90,200,0.08)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    c.lineCap = 'round';
    for (const s of this.stars) {
      const z0 = s.z; s.z += speed * (0.6 + s.z * 2); if (s.z > 1) { s.z = 0.02; s.a = Math.random() * Math.PI * 2; }
      const r0 = Math.pow(z0, 2.2) * R, r1 = Math.pow(s.z, 2.2) * R; const ca = Math.cos(s.a), sa = Math.sin(s.a);
      c.strokeStyle = s.c ? this.acc : `rgba(255,${230 - s.z * 60 | 0},${200 - s.z * 80 | 0},${0.4 + s.z * 0.6})`; c.lineWidth = s.s * (0.5 + s.z * 2.5);
      c.beginPath(); c.moveTo(cx + ca * r0, cy + sa * r0); c.lineTo(cx + ca * (r1 + 2), cy + sa * (r1 + 2)); c.stroke();
    }
    // las agujas del reloj giran cada vez más deprisa
    const hand = this.el.querySelectorAll('.tn-clock i'); const rot = (el / 1000) ** 2 * 720; hand[0].style.transform = `rotate(${rot}deg)`; hand[1].style.transform = `rotate(${rot * 12}deg)`;
    if (el > 700) this.el.querySelector('.tn-y').textContent = this.yTo;
    else if (this.yFrom && el > 250) this.el.querySelector('.tn-y').textContent = Math.random() < 0.5 ? this.yFrom : this.yTo;
    if (!this.called && el > 650) { this.called = true; const f = this.go; this.go = null; setTimeout(() => { try { f(); } catch (e) { console.warn(e); this.finish(); } }, 0); }
    const ready = this.built || (this.called && el > 3200 && G.state !== 'transition');
    if ((ready && el > 1500) || el > 9000) this.finish();
  },
  finish() {
    if (!this.on) return; this.on = false; const el = this.el; el.classList.remove('in'); el.classList.add('out');
    setTimeout(() => { if (!this.on) el.hidden = true; }, 650);
  },
};
// el mundo nuevo ya está listo: el túnel puede abrirse
{ const s0 = startEra; startEra = function (idx, fresh) { s0(idx, fresh); if (Tunel.on) setTimeout(() => { Tunel.built = true; }, 120); }; }
{
  const so = startOdyssey;
  startOdyssey = function (idx) {
    const sv = store.get(SAVE_KEY, null);
    if (sv && sv.eraIdx !== idx && ((sv.beaten && sv.beaten.length) || sv.score > 0) && !confirm(`Tienes una odisea en curso en «${ERAS[sv.eraIdx].name}». ¿Quieres viajar ahora a «${ERAS[idx].name}»? Tu códice, tu cuaderno y tus logros se conservan.`)) return;
    Tunel.play(idx, () => { const c = window.confirm; window.confirm = () => true; try { so(idx); } finally { window.confirm = c; } });
  };
  const tt = travelTo;
  travelTo = function (idx) { if (G.state === 'loading') return tt(idx); Tunel.play(idx, () => tt(idx)); };
  const ep = enterPortal;
  enterPortal = function () { const nx = nextEra(G.eraIdx); if (G.explore || nx < 0) return ep(); Tunel.play(nx, () => {}); Tunel.called = true; ep(); };
}
{
  const st = document.createElement('style');
  st.textContent = '#tunel{position:fixed;inset:0;z-index:200;background:#06050e;opacity:0;transition:opacity .45s ease}#tunel[hidden]{display:none}#tunel.in{opacity:1}#tunel.out{opacity:0;transition:opacity .6s ease}#tunel canvas{position:absolute;inset:0;width:100%;height:100%}'
    + '#tunel .tn-c{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);text-align:center;color:#fff3d6;width:min(92vw,560px);text-shadow:0 2px 12px rgba(0,0,0,.8)}'
    + '#tunel .tn-clock{position:relative;width:74px;height:74px;margin:0 auto 14px;border-radius:50%;border:2px solid rgba(255,211,106,.85);box-shadow:0 0 24px rgba(255,211,106,.55),inset 0 0 18px rgba(255,211,106,.35);background:radial-gradient(circle,rgba(40,28,10,.6),rgba(10,8,4,.2))}'
    + '#tunel .tn-clock i{position:absolute;left:50%;bottom:50%;width:3px;height:24px;margin-left:-1.5px;border-radius:2px;background:#ffd36a;transform-origin:50% 100%}#tunel .tn-clock i.m{height:32px;width:2px;margin-left:-1px;background:#fff4dc}'
    + '#tunel .tn-k{display:block;font-family:var(--display,Georgia);font-size:.78rem;letter-spacing:.3em;text-transform:uppercase;color:#ffd36a}'
    + '#tunel .tn-y{display:block;margin:8px 0 6px;font-family:var(--display,Georgia);font-size:clamp(1.6rem,7vw,2.8rem);letter-spacing:.06em;color:#fff}'
    + '#tunel .tn-n{display:block;font-size:clamp(.95rem,3.6vw,1.2rem);font-style:italic;color:#ffe9b8}';
  document.head.appendChild(st);
}
if (location.hash === '#debug') window.__tunel = Tunel;
