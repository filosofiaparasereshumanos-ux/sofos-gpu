// ============================================================================
//  MUSEO DE OBRAS MAESTRAS: las obras de arte más famosas del mundo, con su
//  imagen (de Wikimedia Commons, con su crédito y su licencia), ficha y un
//  juego de preguntas. Se entra desde «El taller de la belleza» y desde la
//  portada. Las obras que aún tienen derechos de autor se muestran sin imagen.
// ============================================================================
ACH.push({ id: 'museo', i: '🖼', n: 'Visitante del museo', d: 'Mira de cerca todas las obras del museo de obras maestras.' });
const Museo = {
  T: {
    eye: 'Museo de obras maestras', h: 'Las obras más famosas del arte', sub: (n) => `${n} obras de todas las épocas. Toca una para verla de cerca.`,
    all: 'Todas', quiz: '🎯 Ponte a prueba con las obras', back: '← Volver al museo', read: 'Leer en voz alta', noimg: 'Esta obra todavía tiene derechos de autor, así que no podemos mostrarla aquí. Búscala en el sitio web del museo.',
    autor: 'Autor', fecha: 'Fecha', tecnica: 'Técnica', lugar: 'Dónde está', foto: 'Imagen', fuente: 'ver en Wikimedia Commons',
    qH: 'Ponte a prueba', qOf: (a, b) => `Pregunta ${a} de ${b}`, next: 'Siguiente', end: (a, b) => `Has acertado ${a} de ${b}.`, again: 'Otra ronda', pts: (n) => `+${n} sabiduría`,
    card: 'Museo de obras maestras', cardS: 'El David, La Gioconda, La noche estrellada…', poi: '🖼 Entrar al museo', seen: (a, b) => `Has visto ${a} de ${b}`,
    E: { antiguedad: 'Antigüedad', oriente: 'Asia y América', renacimiento: 'Renacimiento', barroco: 'Barroco', 'siglo-xviii-xix': 'Siglos XVIII y XIX', 'siglo-xx': 'Siglo XX' },
  },
  KEY: 'odisea-razon.museo',
  filt: '', st: null,
  state() { if (!this.st) this.st = store.get(this.KEY, { seen: {}, best: 0 }) || { seen: {}, best: 0 }; return this.st; },
  save() { store.set(this.KEY, this.st); },
  img(o) { return o.img ? 'img/obras/' + o.img : ''; },
  build() {
    if (document.getElementById('mu')) return;
    const el = document.createElement('div'); el.id = 'mu'; el.className = 'nb'; el.hidden = true;
    el.innerHTML = '<div class="nb-card mu-card" role="dialog"><button class="ls-x pn-x" id="mu-x" aria-label="✕">✕</button><div class="eyebrow"></div><div class="mu-in"></div></div>';
    el.querySelector('.eyebrow').textContent = this.T.eye;
    document.body.appendChild(el); el.querySelector('#mu-x').addEventListener('click', () => this.close());
  },
  open(id) { this.build(); Panel.open('mu'); Audio.init && Audio.init(); if (id) this.detail(OBRAS.find((o) => o.id === id)); else this.list(); },
  close() { Voice.stop(); Panel.close('mu'); this.paintCard(); },
  box() { const b = document.querySelector('#mu .mu-in'); b.innerHTML = ''; document.querySelector('#mu .mu-card').scrollTop = 0; return b; },
  list() {
    Voice.stop(); const b = this.box(); const s = this.state(); const seen = Object.keys(s.seen).length;
    b.innerHTML = '<h3 class="mu-h"></h3><p class="mu-s"></p><div class="mu-top"><button class="btn primary mu-q"></button><small class="mu-seen"></small></div><div class="mu-chips"></div><div class="mu-grid"></div>';
    b.querySelector('.mu-h').textContent = this.T.h; b.querySelector('.mu-s').textContent = this.T.sub(OBRAS.length);
    b.querySelector('.mu-q').textContent = this.T.quiz; b.querySelector('.mu-q').addEventListener('click', () => { Audio.click && Audio.click(); this.quiz(); });
    b.querySelector('.mu-seen').textContent = this.T.seen(seen, OBRAS.length);
    const chips = b.querySelector('.mu-chips');
    for (const [k, t] of [['', this.T.all], ...Object.entries(this.T.E)]) { if (k && !OBRAS.some((o) => o.epoca === k)) continue; const c = document.createElement('button'); c.className = 'mu-chip' + (this.filt === k ? ' on' : ''); c.textContent = t; c.addEventListener('click', () => { this.filt = k; Audio.click && Audio.click(); this.list(); }); chips.appendChild(c); }
    const grid = b.querySelector('.mu-grid');
    for (const o of OBRAS) {
      if (this.filt && o.epoca !== this.filt) continue;
      const c = document.createElement('button'); c.className = 'mu-it' + (s.seen[o.id] ? ' seen' : '');
      c.innerHTML = '<span class="mu-th"></span><b></b><small></small>';
      const th = c.querySelector('.mu-th'); if (o.img) { const im = new Image(); im.loading = 'lazy'; im.alt = o.titulo; im.src = this.img(o); th.appendChild(im); } else th.textContent = '©';
      c.querySelector('b').textContent = o.titulo; c.querySelector('small').textContent = o.autor;
      c.addEventListener('click', () => { Audio.click && Audio.click(); this.detail(o); }); grid.appendChild(c);
    }
  },
  detail(o) {
    if (!o) return this.list(); Voice.stop(); const b = this.box(); const s = this.state(); if (!s.seen[o.id]) { s.seen[o.id] = 1; this.save(); if (Object.keys(s.seen).length >= OBRAS.length) try { achieve('museo'); } catch (e) { /* sin logros */ } }
    b.innerHTML = '<button class="aid mu-back"></button><figure class="mu-fig"></figure><h3 class="mu-h"></h3><dl class="mu-dl"></dl><p class="mu-t"></p><p class="mu-cred"></p><div class="btns"><button class="aid mu-read"></button><button class="btn mu-nx">→</button></div>';
    b.querySelector('.mu-back').textContent = this.T.back; b.querySelector('.mu-back').addEventListener('click', () => { Audio.click && Audio.click(); this.list(); });
    const fig = b.querySelector('.mu-fig');
    if (o.img) { const im = new Image(); im.alt = o.titulo; im.src = this.img(o); im.addEventListener('click', () => fig.classList.toggle('big')); fig.appendChild(im); } else { fig.classList.add('noimg'); fig.textContent = this.T.noimg; }
    b.querySelector('.mu-h').textContent = o.titulo;
    const dl = b.querySelector('.mu-dl'); for (const k of ['autor', 'fecha', 'tecnica', 'lugar']) { if (!o[k]) continue; const dt = document.createElement('dt'); dt.textContent = this.T[k]; const dd = document.createElement('dd'); dd.textContent = o[k]; dl.append(dt, dd); }
    b.querySelector('.mu-t').textContent = o.texto;
    const cr = b.querySelector('.mu-cred'); if (o.img && o.credito) { cr.textContent = this.T.foto + ': ' + o.credito + ' · '; if (o.fuente) { const a = document.createElement('a'); a.href = o.fuente; a.target = '_blank'; a.rel = 'noopener'; a.textContent = this.T.fuente; cr.appendChild(a); } } else cr.remove();
    b.querySelector('.mu-read').textContent = this.T.read; b.querySelector('.mu-read').addEventListener('click', () => Voice.say(`${o.titulo}. ${o.texto}`));
    const L = this.filt ? OBRAS.filter((x) => x.epoca === this.filt) : OBRAS; const nx = L[(L.indexOf(o) + 1) % L.length];
    b.querySelector('.mu-nx').textContent = '→ ' + nx.titulo; b.querySelector('.mu-nx').addEventListener('click', () => { Audio.click && Audio.click(); this.detail(nx); });
  },
  quiz() {
    Voice.stop(); const N = 8; const Q = shuffle(OBRAS.filter((o) => o.q && o.q.a && o.q.a.length === 4)).slice(0, N); let i = 0, ok = 0;
    const show = () => {
      const o = Q[i]; const b = this.box();
      b.innerHTML = '<button class="aid mu-back"></button><h3 class="mu-h"></h3><small class="mu-n"></small><figure class="mu-fig mu-qf"></figure><p class="mu-qq"></p><div class="mu-ans"></div><p class="mu-fb" hidden></p><div class="btns mu-qb"></div>';
      b.querySelector('.mu-back').textContent = this.T.back; b.querySelector('.mu-back').addEventListener('click', () => { Audio.click && Audio.click(); this.list(); });
      b.querySelector('.mu-h').textContent = this.T.qH; b.querySelector('.mu-n').textContent = this.T.qOf(i + 1, Q.length);
      const fig = b.querySelector('.mu-fig'); if (o.img) { const im = new Image(); im.alt = ''; im.src = this.img(o); fig.appendChild(im); } else fig.remove();
      b.querySelector('.mu-qq').textContent = o.q.q; const right = o.q.a[0];
      for (const t of shuffle([...o.q.a])) {
        const a = document.createElement('button'); a.className = 'ans'; a.textContent = t;
        a.addEventListener('click', () => {
          const good = t === right; if (good) { ok++; Audio.correct && Audio.correct(); } else { Audio.wrong && Audio.wrong(); }
          b.querySelectorAll('.mu-ans .ans').forEach((x) => { x.disabled = true; if (x.textContent === right) x.classList.add('right'); else if (x === a) x.classList.add('wrong'); });
          const fb = b.querySelector('.mu-fb'); fb.hidden = false; fb.textContent = `${good ? '✓' : '✗'} ${o.titulo} · ${o.autor}${o.fecha ? ' · ' + o.fecha : ''}`;
          const nb = document.createElement('button'); nb.className = 'btn primary'; nb.textContent = i < Q.length - 1 ? this.T.next : this.T.end(ok, Q.length);
          nb.addEventListener('click', () => { Audio.click && Audio.click(); i++; if (i < Q.length) show(); else end(); }); b.querySelector('.mu-qb').appendChild(nb);
        });
        b.querySelector('.mu-ans').appendChild(a);
      }
    };
    const end = () => {
      const s = this.state(); const first = ok > (s.best || 0); s.best = Math.max(s.best || 0, ok); this.save();
      if (first && ok >= 6) { try { addScore(10 * ok); } catch (e) { /* fuera de partida */ } toast(this.T.pts(10 * ok)); }
      const b = this.box(); b.innerHTML = '<h3 class="mu-h"></h3><p class="mu-s"></p><div class="btns"><button class="btn mu-a"></button><button class="btn primary mu-l"></button></div>';
      b.querySelector('.mu-h').textContent = this.T.qH; b.querySelector('.mu-s').textContent = this.T.end(ok, Q.length);
      b.querySelector('.mu-a').textContent = this.T.again; b.querySelector('.mu-a').addEventListener('click', () => this.quiz());
      b.querySelector('.mu-l').textContent = this.T.back; b.querySelector('.mu-l').addEventListener('click', () => this.list());
    };
    show();
  },
  paintCard() {
    let c = document.getElementById('mu-tcard'); const anchor = document.getElementById('lib-card') || document.getElementById('sem-card') || document.getElementById('fr-dia'); if (!anchor) return;
    if (!c) { c = document.createElement('button'); c.id = 'mu-tcard'; c.innerHTML = '<b>🖼</b><span><strong></strong><small></small></span>'; anchor.after(c); c.addEventListener('click', () => { Audio.init && Audio.init(); Audio.click && Audio.click(); this.open(); }); }
    c.querySelector('strong').textContent = this.T.card; const n = Object.keys(this.state().seen).length;
    c.querySelector('small').textContent = n ? this.T.seen(n, OBRAS.length) : this.T.cardS;
  },
};
// el museo en «El taller de la belleza»: un lugar con botón y una pared de cuadros
{
  const o0 = Places.open.bind(Places);
  Places.open = function (poi) {
    o0(poi); if (!poi || !poi.museo) return; const foot = document.querySelector('#place .ls-foot'); if (!foot) return;
    const b = document.createElement('button'); b.className = 'aid bj-play'; b.textContent = Museo.T.poi; b.addEventListener('click', () => { Audio.click && Audio.click(); Places.close(); setTimeout(() => Museo.open(), 80); }); foot.prepend(b);
  };
  // una pared con seis cuadros famosos junto al lugar del museo
  const bw0 = typeof buildPois === 'function' ? buildPois : null;
  if (bw0) {
    buildPois = function (W) {
      bw0(W); if (!ERAS[W.idx] || ERAS[W.idx].id !== 'belleza') return;
      try {
        const pics = OBRAS.filter((o) => o.img && o.cuadro).slice(0, 6); if (!pics.length) return;
        const g = new THREE.Group(); g.position.set(-21.2, 0, -31); g.rotation.y = Math.PI / 2;
        const wall = mesh(new THREE.BoxGeometry(15, 4.6, 0.4), std(0x6a2a24, { roughness: 0.9 }), 0, 2.3, -0.25, true, true); g.add(wall);
        const gold = std(0xc8a050, { metalness: 0.85, roughness: 0.35 }); const L = new THREE.TextureLoader();
        pics.forEach((o, k) => {
          const x = -6.25 + k * 2.5; const tex = L.load(Museo.img(o), (t) => { const r = t.image.width / t.image.height; const h = Math.min(1.9, 2.1 / r), w = h * r; pic.scale.set(w, h, 1); fr.scale.set(w + 0.16, h + 0.16, 1); }); tex.colorSpace = THREE.SRGBColorSpace;
          const pic = mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.3 }), x, 2.4, 0.03, false, false);
          const fr = mesh(new THREE.BoxGeometry(1, 1, 0.06), gold, x, 2.4, -0.02, false, false); pic.scale.set(1.5, 1.5, 1); fr.scale.set(1.66, 1.66, 1); g.add(fr, pic);
        });
        W.group.add(g); W.colliders.push({ x0: -21.6, x1: -20.8, z0: -38.5, z1: -23.5 });
      } catch (e) { /* sin pared */ }
    };
  }
  setTimeout(() => Museo.paintCard(), 0);
  const st = document.createElement('style');
  st.textContent = '#mu{z-index:66}.mu-card{box-sizing:border-box;max-height:92vh;overflow-y:auto;overflow-x:hidden;width:min(760px,96vw);max-width:96vw}.mu-in{min-width:0;overflow-wrap:anywhere}.mu-h{font-family:var(--display);font-weight:normal;color:#ffe2a0;margin:2px 34px 4px 0;font-size:1.3rem}.mu-s{color:#f3e6c4;margin:0 0 8px}'
    + '.mu-top{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:6px 0}.mu-seen{color:var(--parchment-dim,#bfae8e)}.mu-chips{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}.mu-chip{padding:5px 11px;border-radius:999px;border:1px solid var(--line);background:rgba(255,255,255,.04);color:var(--parchment);font:inherit;font-size:.82rem;cursor:pointer}.mu-chip.on{background:#d8b25a;color:#1a1206;border-color:#d8b25a}'
    + '.mu-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px}.mu-it{display:flex;flex-direction:column;gap:4px;padding:6px;border-radius:10px;border:1px solid var(--line);background:rgba(255,255,255,.03);color:var(--parchment);font:inherit;text-align:left;cursor:pointer}.mu-it.seen{border-color:rgba(216,178,90,.6)}'
    + '.mu-th{display:flex;align-items:center;justify-content:center;aspect-ratio:1;border-radius:6px;overflow:hidden;background:#120c06;color:#8a7a5a;font-size:2rem}.mu-th img{width:100%;height:100%;object-fit:cover}.mu-it b{font-weight:normal;font-size:.86rem;line-height:1.2}.mu-it small{color:var(--parchment-dim,#bfae8e);font-size:.72rem}'
    + '.mu-fig{margin:8px 0;text-align:center}.mu-fig img{max-width:100%;max-height:52vh;border-radius:6px;box-shadow:0 0 0 6px #3a2810,0 0 0 8px #c8a050,0 8px 30px rgba(0,0,0,.6);cursor:zoom-in}.mu-fig.big img{max-height:none;cursor:zoom-out}.mu-fig.noimg{padding:28px 16px;border:1px dashed var(--line);border-radius:8px;color:#d8c8a0;font-style:italic}.mu-qf img{max-height:34vh}'
    + '.mu-dl{display:grid;grid-template-columns:auto 1fr;gap:3px 12px;margin:6px 0;font-size:.9rem}.mu-dl dt{color:#d8b25a}.mu-dl dd{margin:0;color:#f3e6c4}.mu-t{line-height:1.55;color:#fff4dc}.mu-cred{font-size:.72rem;color:var(--parchment-dim,#bfae8e)}.mu-cred a{color:#d8b25a}'
    + '.mu-qq{font-size:1.05rem;color:#fff4dc}.mu-ans .ans{width:100%;margin:4px 0;text-align:left}.mu-fb{color:#f3e6c4;font-size:.9rem}.mu-n{color:var(--parchment-dim,#bfae8e)}.mu-back{margin-bottom:4px}'
    + '#mu-tcard{display:flex;align-items:center;gap:10px;width:min(440px,92vw);margin:8px auto 0;padding:9px 14px;border-radius:12px;border:1px solid rgba(216,178,90,.55);background:linear-gradient(150deg,rgba(60,40,14,.8),rgba(24,16,8,.85));color:#fff4dc;font-family:var(--body,Georgia);text-align:left;cursor:pointer}#mu-tcard b{font-size:1.5rem}#mu-tcard span{display:flex;flex-direction:column}#mu-tcard small{color:#d8c8a0}';
  document.head.appendChild(st);
}
if (location.hash === '#debug') window.__museo = Museo;
