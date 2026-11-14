// ============================================================================
//  ELEGIR EL MUNDO: un carrusel circular e inmersivo. El mundo elegido queda en
//  el centro, los vecinos giran en 3D a los lados y su paisaje llena el fondo.
//  Se pasa deslizando el dedo, con las flechas, el teclado, la rueda del ratón o
//  tocando la línea del tiempo. La lista de siempre sigue disponible.
// ============================================================================
const Viaje = {
  cur: 0, pos: 0, vel: 0, drag: null, list: false, el: null, raf: 0, bgK: 0, lastIdx: -1,
  T: { trip: 'Tu viaje', of: 'Época ⟦0⟧ de ⟦1⟧', go: 'Viajar aquí', cont: 'Continuar mi odisea', start: 'Empezar desde el principio', list: '☰ Ver como lista', wheel: '◎ Ver la rueda', back: 'Volver',
    here: '● Aquí vas', done: '✓ Completada', beaten: '🏛 ⟦0⟧ de ⟦1⟧ vencidos', swipe: 'Desliza para recorrer las épocas', sages: 'Pensadores de esta época' },
  f(s, ...a) { return s.replace(/⟦(\d)⟧/g, (_, i) => a[i] ?? ''); },
  n() { return CHRONO.length; },
  idx(k) { const n = this.n(); return CHRONO[((k % n) + n) % n]; },
  // ---------------------------------------------------------------- construir la escena (una vez)
  build() {
    if (this.el) return this.el;
    const sec = document.getElementById('travel'); const el = document.createElement('div'); el.id = 'wv';
    el.innerHTML = '<div class="wv-bg"></div><div class="wv-bg"></div><div class="wv-shade"></div><div class="wv-dust"></div>'
      + '<div class="wv-top"><button class="wv-x" data-a="back" aria-label=""></button><div class="wv-eye"></div><button class="wv-mode" data-a="list"></button></div>'
      + '<div class="wv-quick"></div>'
      + '<div class="wv-stage"><button class="wv-arr l" data-a="prev" aria-label="◀">‹</button><div class="wv-ring"></div><button class="wv-arr r" data-a="next" aria-label="▶">›</button></div>'
      + '<div class="wv-info"><div class="wv-num"></div><h2 class="wv-name"></h2><div class="wv-place"></div><p class="wv-hook"></p><div class="wv-sages"></div><div class="wv-st"></div><button class="wv-go" data-a="go"></button></div>'
      + '<div class="wv-line"><div class="wv-dots"></div><div class="wv-hint"></div></div>';
    sec.appendChild(el); this.el = el;
    el.querySelector('.wv-x').textContent = '✕ ' + this.T.back; el.querySelector('.wv-x').setAttribute('aria-label', this.T.back);
    el.querySelector('.wv-hint').textContent = this.T.swipe;
    // tarjetas del carrusel (una por época, en orden cronológico)
    const ring = el.querySelector('.wv-ring'); const dots = el.querySelector('.wv-dots');
    this.cards = CHRONO.map((i, k) => {
      const c = document.createElement('div'); c.className = 'wv-card'; c.dataset.k = k; c.innerHTML = '<div class="wv-img"></div><div class="wv-cap"><b></b><span></span></div><i class="wv-badge"></i>';
      c.querySelector('b').textContent = ERAS[i].num; c.querySelector('span').textContent = ERAS[i].name; ring.appendChild(c);
      const d = document.createElement('button'); d.className = 'wv-dot'; d.dataset.k = k; d.title = ERAS[i].name; d.setAttribute('aria-label', ERAS[i].name); dots.appendChild(d);
      return c;
    });
    this.dots = [...dots.children];
    // gestos
    const stage = el.querySelector('.wv-stage');
    stage.addEventListener('pointerdown', (e) => { if (e.target.closest('.wv-arr')) return; this.drag = { x: e.clientX, y: e.clientY, p: this.pos, t: performance.now(), moved: false, last: e.clientX, lt: performance.now() }; this.vel = 0; try { stage.setPointerCapture(e.pointerId); } catch (er) { /* nada */ } });
    stage.addEventListener('pointermove', (e) => { const D = this.drag; if (!D) return; const w = this.cardW(); const dx = e.clientX - D.x; if (Math.abs(dx) > 6) D.moved = true; this.pos = D.p - dx / w; const now = performance.now(); const dt = Math.max(1, now - D.lt); this.vel = -(e.clientX - D.last) / w / dt * 16; D.last = e.clientX; D.lt = now; this.kick(); });
    const up = (e) => { const D = this.drag; if (!D) return; this.drag = null;
      if (!D.moved) { const c = e.target.closest && e.target.closest('.wv-card'); if (c) { const k = +c.dataset.k; const d = this.wrap(k - Math.round(this.pos)); if (d === 0) return this.travel(); return this.to(Math.round(this.pos) + d); } }
      this.to(Math.round(this.pos + Math.max(-3, Math.min(3, this.vel * 7)))); };
    stage.addEventListener('pointerup', up); stage.addEventListener('pointercancel', up);
    stage.addEventListener('wheel', (e) => { e.preventDefault(); const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY; if (Math.abs(d) < 4) return; const now = performance.now(); if (now - (this.wheelT || 0) < 180) return; this.wheelT = now; this.step(d > 0 ? 1 : -1); }, { passive: false });
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-a]'); if (b) { const a = b.dataset.a; Audio.init && Audio.init();
      if (a === 'prev') this.step(-1); else if (a === 'next') this.step(1); else if (a === 'go') this.travel(); else if (a === 'list') this.setList(!this.list); else if (a === 'back') { Audio.click(); $('#tv-back').click(); } else if (a === 'cont') { Audio.click(); $('#b-continue').click(); } else if (a === 'start') { Audio.click(); if (this.hasSave) store.set(ERA_PROG_KEY, {}); startOdyssey(CHRONO[0]); } return; }
      const d = e.target.closest('.wv-dot'); if (d) { Audio.click && Audio.click(); this.to(Math.round(this.pos) + this.wrap(+d.dataset.k - Math.round(this.pos))); } });
    window.addEventListener('keydown', (e) => { if (document.getElementById('travel').hidden || this.list || !this.el) return; if (e.code === 'ArrowRight') { e.preventDefault(); this.step(1); } else if (e.code === 'ArrowLeft') { e.preventDefault(); this.step(-1); } else if (e.code === 'Enter' && !e.target.closest('button')) { e.preventDefault(); this.travel(); } });
    window.addEventListener('resize', () => this.kick());
    return el;
  },
  wrap(d) { const n = this.n(); d = ((d % n) + n) % n; return d > n / 2 ? d - n : d; },
  cardW() { const c = this.cards && this.cards[0]; return Math.max(120, (c && c.offsetWidth) || 300) * 0.62; },
  step(d) { Audio.click && Audio.click(); buzz(8); this.to(Math.round(this.pos) + d); },
  to(k) { this.target = k; this.kick(); },
  kick() { if (!this.raf) { if (!this.target && !this.drag) this.lt = 0; this.raf = requestAnimationFrame(() => this.tick()); } },
  tick() {
    this.raf = 0; if (!this.el || document.getElementById('travel').hidden) return;
    const now = performance.now(); const dt = Math.min(0.06, Math.max(0.001, (now - (this.lt || now)) / 1000)) || 0.016; this.lt = now;
    if (!this.drag && this.target != null) { const d = this.target - this.pos; this.pos += d * (1 - Math.exp(-dt * 11)); if (Math.abs(d) < 0.003) { this.pos = this.target; this.target = null; } }
    this.paint(); if (this.drag || this.target != null) this.kick();
  },
  // ---------------------------------------------------------------- dibujar
  paint() {
    const n = this.n(); const w = this.cardW(); const narrow = innerWidth < 640;
    this.cards.forEach((c, k) => {
      const d = this.wrap(k - this.pos); const ad = Math.abs(d); const vis = ad < 3.6;
      if (!vis) { if (c.style.visibility !== 'hidden') c.style.visibility = 'hidden'; return; }
      c.style.visibility = ''; if (!c._img) { c._img = true; c.querySelector('.wv-img').style.backgroundImage = `url('${ART.era(CHRONO[k])}')`; }
      const x = Math.sign(d) * (ad < 1 ? ad : 1 + (ad - 1) * 0.62) * w * (narrow ? 0.9 : 1.05); const z = -ad * (narrow ? 150 : 210); const ry = -Math.max(-1, Math.min(1, d)) * 42 - (ad > 1 ? Math.sign(d) * (ad - 1) * 8 : 0);
      c.style.transform = `translate(-50%,-50%) translateX(${x.toFixed(1)}px) translateZ(${z.toFixed(1)}px) rotateY(${ry.toFixed(1)}deg) scale(${(1 - Math.min(ad, 3) * 0.06).toFixed(3)})`;
      c.style.opacity = String(Math.max(0, 1 - Math.max(0, ad - 1.6) * 0.55)); c.style.zIndex = String(100 - Math.round(ad * 10)); c.classList.toggle('on', ad < 0.5);
      c.style.filter = ad < 0.5 ? '' : `brightness(${(1 - Math.min(ad, 3) * 0.17).toFixed(2)}) saturate(${(1 - Math.min(ad, 3) * 0.12).toFixed(2)})`;
    });
    const k = ((Math.round(this.pos) % n) + n) % n; if (k !== this.lastK) { this.lastK = k; this.info(k); }
  },
  info(k) {
    const i = CHRONO[k], e = ERAS[i], el = this.el; this.cur = k;
    // fondo: el paisaje de la época, con fundido y un zoom lento
    const bgs = el.querySelectorAll('.wv-bg'); this.bgK ^= 1; const a = bgs[this.bgK], b = bgs[this.bgK ^ 1];
    a.style.backgroundImage = `url('${ART.era(i)}')`; a.classList.remove('on'); void a.offsetWidth; a.classList.add('on'); b.classList.remove('on');
    el.querySelector('.wv-eye').textContent = this.f(this.T.of, e.pos + 1, this.n());
    el.querySelector('.wv-num').textContent = e.num + ' · ' + e.years; el.querySelector('.wv-name').textContent = e.name; el.querySelector('.wv-place').textContent = e.place || '';
    el.querySelector('.wv-hook').textContent = ERA_HOOK[e.id] || e.story || '';
    const box = el.querySelector('.wv-sages'); box.innerHTML = ''; box.setAttribute('aria-label', this.T.sages);
    for (const s of e.sages) { const m = document.createElement('span'); m.className = 'wv-sg' + (G.codex.has(s.id) ? ' got' : '') + (s.boss ? ' boss' : ''); m.title = s.name; m.style.backgroundImage = `url('${ART.portrait(s.id)}')`; box.appendChild(m); }
    const boss = e.sages.find((x) => x.boss); const got = e.sages.filter((x) => G.codex.has(x.id)).length; const done = boss && G.codex.has(boss.id);
    el.querySelector('.wv-st').textContent = (i === this.here ? this.T.here + ' · ' : '') + (done && got === e.sages.length ? this.T.done : got ? this.f(this.T.beaten, got, e.sages.length) : e.sages.map((x) => x.short).join(' · '));
    el.querySelector('.wv-go').textContent = this.T.go + ' ▶';
    this.dots.forEach((d, j) => d.classList.toggle('on', j === k)); const on = this.dots[k]; if (on && on.scrollIntoView) { const L = on.parentElement; L.scrollTo({ left: on.offsetLeft - L.clientWidth / 2 + on.offsetWidth / 2, behavior: 'smooth' }); }
    // la información aparece con un pequeño movimiento
    const inf = el.querySelector('.wv-info'); inf.classList.remove('in'); void inf.offsetWidth; inf.classList.add('in');
    for (const j of [k - 1, k + 1]) { const c = this.cards[(j + this.n()) % this.n()]; if (c && !c._img) { c._img = true; c.querySelector('.wv-img').style.backgroundImage = `url('${ART.era(CHRONO[(j + this.n()) % this.n()])}')`; } }
  },
  travel() { Audio.click && Audio.click(); buzz([10, 30, 20]); if (this.target != null) { this.pos = this.target; this.target = null; this.paint(); } const i = CHRONO[this.cur]; const c = this.cards[this.cur]; if (c) c.classList.add('fly'); setTimeout(() => { if (c) c.classList.remove('fly'); startOdyssey(i); }, 380); },
  setList(v) { this.list = !!v; this.el.classList.toggle('hide', this.list); document.querySelector('#travel .tv-wrap').classList.toggle('show', this.list); this.el.querySelector('.wv-mode').textContent = this.T.list; const w = document.getElementById('wv-wheel'); if (w) w.hidden = !this.list; try { localStorage.setItem('odisea-razon.viaje-lista', this.list ? '1' : ''); } catch (e) { /* nada */ } if (!this.list) this.kick(); },
  open() {
    this.build(); const sv = store.get(SAVE_KEY, null); this.here = sv ? sv.eraIdx : -1;
    this.hasSave = !!(sv && (sv.eraIdx !== CHRONO[0] || (sv.beaten && sv.beaten.length) || sv.score > 0));
    const q = this.el.querySelector('.wv-quick'); q.innerHTML = '';
    if (this.hasSave && G.travelFrom !== 'pause') { const b = document.createElement('button'); b.className = 'wv-pill gold'; b.dataset.a = 'cont'; b.textContent = '▶ ' + this.T.cont + ': ' + ERAS[sv.eraIdx].name; q.appendChild(b); }
    { const b = document.createElement('button'); b.className = 'wv-pill'; b.dataset.a = 'start'; b.textContent = '⟲ ' + this.T.start; q.appendChild(b); }
    const k0 = Math.max(0, CHRONO.indexOf(this.here >= 0 ? this.here : CHRONO[0])); this.pos = k0; this.target = null; this.lastK = -1; this.cards.forEach((c, k) => c.classList.toggle('here', CHRONO[k] === this.here));
    let lst = false; try { lst = localStorage.getItem('odisea-razon.viaje-lista') === '1'; } catch (e) { /* nada */ }
    this.setList(lst); this.paint();
  },
};
// renderTravel dibuja la lista de siempre; además se prepara el carrusel
{
  const r0 = renderTravel;
  renderTravel = function () { r0(); try { Viaje.open(); } catch (e) { console.warn(e); } };
  // en la vista de lista, un botón para volver a la rueda
  const wrap = document.querySelector('#travel .tv-wrap');
  if (wrap) { const b = document.createElement('button'); b.className = 'btn'; b.id = 'wv-wheel'; b.hidden = true; b.textContent = Viaje.T.wheel; b.addEventListener('click', () => { Audio.click(); Viaje.setList(false); }); wrap.insertBefore(b, wrap.firstChild); }
}
{
  const st = document.createElement('style');
  st.textContent = '#travel .tv-wrap{display:none}#travel .tv-wrap.show{display:block}#travel{overflow:hidden}'
    + '#wv{position:absolute;inset:0;z-index:5;display:flex;flex-direction:column;align-items:center;overflow:hidden;background:#0d0905;color:#f6ead2;touch-action:pan-y;user-select:none;-webkit-user-select:none}#wv.hide{display:none}'
    + '.wv-bg{position:absolute;inset:-4%;background:#0d0905 center/cover no-repeat;opacity:0;transition:opacity 1.1s ease;filter:saturate(1.1)}.wv-bg.on{opacity:1;animation:wvKen 22s ease-in-out infinite alternate}'
    + '@keyframes wvKen{from{transform:scale(1.04) translate(0,0)}to{transform:scale(1.16) translate(-2%,-1.5%)}}'
    + '.wv-shade{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 38%,rgba(10,7,3,.05),rgba(10,7,3,.55) 60%,rgba(8,5,2,.92)),linear-gradient(180deg,rgba(8,5,2,.55),rgba(8,5,2,0) 22%,rgba(8,5,2,0) 45%,rgba(8,5,2,.9) 78%)}'
    + '.wv-dust{position:absolute;inset:0;pointer-events:none;opacity:.55;background-image:radial-gradient(2px 2px at 20% 30%,#ffe6a8,transparent),radial-gradient(1.5px 1.5px at 70% 20%,#fff2cf,transparent),radial-gradient(2px 2px at 40% 70%,#ffd98a,transparent),radial-gradient(1.5px 1.5px at 85% 60%,#fff,transparent),radial-gradient(1.5px 1.5px at 10% 80%,#ffe6a8,transparent),radial-gradient(2px 2px at 55% 45%,#fff2cf,transparent);background-size:100% 100%;animation:wvDust 14s linear infinite}'
    + '@keyframes wvDust{from{transform:translateY(0)}to{transform:translateY(-40px)}}'
    + '.wv-top{position:relative;z-index:3;width:100%;box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:calc(10px + var(--sat,0px)) 14px 0}'
    + '.wv-eye{font-family:var(--display,Georgia);letter-spacing:.14em;font-size:.78rem;color:var(--gold-bright,#ffd36a);text-transform:uppercase;text-align:center;flex:1;text-shadow:0 1px 4px #000}'
    + '.wv-x,.wv-mode{border:1px solid rgba(255,224,160,.35);background:rgba(10,7,3,.55);color:#f6ead2;border-radius:999px;padding:7px 12px;font:inherit;font-size:.82rem;cursor:pointer;backdrop-filter:blur(6px);white-space:nowrap}'
    + '.wv-quick{position:relative;z-index:3;display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:8px;padding:0 12px}'
    + '.wv-pill{border:1px solid rgba(255,224,160,.4);background:rgba(10,7,3,.55);color:#f6ead2;border-radius:999px;padding:7px 14px;font:inherit;font-size:.85rem;cursor:pointer;backdrop-filter:blur(6px)}.wv-pill.gold{background:linear-gradient(#ffe08a,#d8a83a);color:#2a1a08;border-color:#ffe08a;font-weight:600}'
    + '.wv-stage{position:relative;z-index:2;width:100%;flex:0 0 auto;height:min(42vh,340px);perspective:1100px;cursor:grab;touch-action:pan-y;margin-top:6px}.wv-stage:active{cursor:grabbing}'
    + '.wv-ring{position:absolute;inset:0;transform-style:preserve-3d}'
    + '.wv-card{position:absolute;left:50%;top:50%;width:min(470px,66vw);aspect-ratio:16/10;border-radius:18px;overflow:hidden;transform-style:preserve-3d;transition:box-shadow .3s;box-shadow:0 20px 50px rgba(0,0,0,.6);border:1px solid rgba(255,224,160,.25);background:#1a120a;will-change:transform}'
    + '.wv-card.on{border:2px solid var(--gold-bright,#ffd36a);box-shadow:0 24px 60px rgba(0,0,0,.7),0 0 40px rgba(255,200,90,.45)}'
    + '.wv-img{position:absolute;inset:0;background:#1a120a center/cover no-repeat}.wv-card.on .wv-img{animation:wvCard 9s ease-in-out infinite alternate}@keyframes wvCard{from{transform:scale(1)}to{transform:scale(1.07)}}'
    + '.wv-cap{position:absolute;left:0;right:0;bottom:0;padding:22px 12px 9px;background:linear-gradient(transparent,rgba(8,5,2,.88));display:flex;align-items:baseline;gap:8px}.wv-cap b{font-family:var(--display,Georgia);color:var(--gold-bright,#ffd36a);font-size:1.1rem}.wv-cap span{font-size:.92rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
    + '.wv-card.on .wv-cap{opacity:0}.wv-badge{position:absolute;top:8px;right:8px;font-style:normal;font-size:.72rem;padding:3px 8px;border-radius:999px;background:rgba(10,7,3,.7);display:none}.wv-card.here .wv-badge{display:block}.wv-card.here .wv-badge::after{content:"●";color:#ffd36a}'
    + '.wv-card.fly{transition:transform .38s ease-in,opacity .38s;transform:translate(-50%,-50%) translateZ(380px) scale(1.25) !important;opacity:0 !important}'
    + '.wv-arr{position:absolute;top:50%;transform:translateY(-50%);z-index:200;width:46px;height:46px;border-radius:50%;border:1px solid rgba(255,224,160,.5);background:rgba(10,7,3,.55);color:#ffe0a0;font-size:2rem;line-height:1;cursor:pointer;backdrop-filter:blur(6px)}.wv-arr.l{left:max(10px,calc(50% - 360px))}.wv-arr.r{right:max(10px,calc(50% - 360px))}'
    + '.wv-info{position:relative;z-index:3;width:min(620px,calc(100% - 32px));text-align:center;margin-top:4px}.wv-info.in{animation:wvIn .45s ease-out}@keyframes wvIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}'
    + '.wv-num{font-family:var(--display,Georgia);color:var(--gold,#d8b25a);letter-spacing:.2em;font-size:.95rem}.wv-name{margin:2px 0 2px;font-family:var(--display,Georgia);font-weight:normal;font-size:clamp(1.5rem,5.4vw,2.4rem);line-height:1.1;color:#fff4dc;text-shadow:0 2px 14px rgba(0,0,0,.8)}'
    + '.wv-place{font-style:italic;opacity:.85;font-size:.95rem}.wv-hook{margin:8px auto 8px;max-width:520px;line-height:1.4;font-size:.98rem;opacity:.95;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}'
    + '.wv-sages{display:flex;justify-content:center;gap:6px;flex-wrap:wrap;margin:6px 0 4px}.wv-sg{width:40px;height:40px;border-radius:50%;background:#2a1d10 center/cover;border:2px solid rgba(255,224,160,.35);filter:grayscale(.55) brightness(.85)}.wv-sg.got{filter:none;border-color:var(--gold-bright,#ffd36a);box-shadow:0 0 10px rgba(255,211,106,.5)}.wv-sg.boss{width:46px;height:46px}'
    + '.wv-st{font-size:.85rem;color:#ffe0a0;min-height:1.2em;margin-bottom:10px}'
    + '.wv-go{border:0;border-radius:999px;padding:14px 34px;font-family:var(--display,Georgia);letter-spacing:.14em;font-size:1.05rem;color:#1a1206;background:linear-gradient(#ffe9a8,#d8a83a);box-shadow:0 8px 26px rgba(0,0,0,.5),0 0 24px rgba(255,200,90,.45);cursor:pointer;animation:wvPulse 2.4s ease-in-out infinite}@keyframes wvPulse{50%{box-shadow:0 8px 26px rgba(0,0,0,.5),0 0 38px rgba(255,200,90,.75)}}'
    + '.wv-line{position:relative;z-index:3;width:100%;margin-top:auto;padding:10px 0 calc(12px + var(--sab,0px))}.wv-dots{display:flex;gap:7px;overflow-x:auto;padding:6px 50%;scrollbar-width:none}.wv-dots::-webkit-scrollbar{display:none}'
    + '.wv-dot{flex:0 0 auto;width:10px;height:10px;border-radius:50%;border:0;padding:0;background:rgba(255,224,160,.35);cursor:pointer;transition:transform .25s,background .25s}.wv-dot.on{background:var(--gold-bright,#ffd36a);transform:scale(1.7);box-shadow:0 0 10px rgba(255,211,106,.8)}'
    + '.wv-hint{text-align:center;font-size:.75rem;opacity:.6;margin-top:4px}'
    + '@media (max-width:640px){.wv-stage{height:min(40vh,330px);margin-top:14px}.wv-card{width:78vw}.wv-num{font-size:.8rem;letter-spacing:.12em}.wv-arr{width:38px;height:38px;font-size:1.6rem}.wv-hook{-webkit-line-clamp:2;font-size:.92rem}.wv-sg{width:34px;height:34px}.wv-sg.boss{width:40px;height:40px}.wv-go{padding:13px 28px}}'
    + '@media (max-height:640px){.wv-hook{display:none}.wv-stage{height:30vh}}'
    + '#wv-wheel{display:block;margin:0 auto 10px}';
  document.head.appendChild(st);
}
if (location.hash === '#debug') window.__viaje = Viaje;
