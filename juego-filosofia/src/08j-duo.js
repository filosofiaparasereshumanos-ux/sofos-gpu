// ============================================================================
//  PONER A DEBATIR A DOS ESCUELAS: desde la conversación con un pensador, eliges a
//  otro de otra escuela y los escuchas debatir: cómo ve cada escuela la vida buena,
//  el conocimiento, lo real, la sociedad o lo sagrado, qué pone cada una en el
//  centro y qué las une. Se arma con los perfiles de las escuelas (08j-duo-datos.js)
//  y usa el escenario de «Debates entre pensadores» (con la voz de cada uno).
// ============================================================================
const Duo = {
  T: {
    btn: '🗣️ Ponerme a debatir con otro pensador', title: '¿Con quién debato?', sub: 'Elige a un pensador de otra escuela: verás en qué se diferencian sus escuelas y qué las une.',
    here: 'De esta época', all: 'Todas las escuelas', search: 'Buscar por nombre…', q: (a, b) => `${a} frente a ${b}: ¿qué los separa y qué los une?`,
    ejes: { vida: 'la vida buena', saber: 'cómo conocemos', real: 'qué es lo real', sociedad: 'cómo vivir juntos', sagrado: 'Dios y lo sagrado' },
    cierre: (A, sA, B, sB, ej, com) => `Lo que los separa: para ${A} (${sA.n}) lo más importante es ${sA.p.valor}; para ${B} (${sB.n}), ${sB.p.valor}. Hablaron de ${ej}. Lo que los une: ${com}`,
    nada: 'los dos se preguntaron cómo vivir bien.',
  },
  ok(d) { return d && !['jesus'].includes(d.id) && typeof ESCUELAS !== 'undefined' && ESCUELAS.map[d.id] && PERFILES[ESCUELAS.map[d.id]]; },
  sacred(ei) { return !!(ERAS[ei] && ERAS[ei].sacred); },
  school(d) { const s = Escuelas.of(d.id); return s ? { ...s, p: PERFILES[s.id] } : null; },
  // arma el guion del debate entre dos pensadores de escuelas distintas
  script(A, B) {
    const sA = this.school(A), sB = this.school(B); const pA = sA.p, pB = sB.p; const C = PERFILES._comun || {};
    const ax = ['vida', 'saber', 'real', 'sociedad', 'sagrado'].filter((k) => pA.ejes[k] && pB.ejes[k]);
    const pick = shuffle([...ax]).slice(0, 2).sort((x, y) => ax.indexOf(x) - ax.indexOf(y));
    const turns = [['a', pA.yo], ['b', pB.yo]];
    pick.forEach((k, i) => { turns.push(['a', pA.ejes[k]]); turns.push(['b', (i === 0 ? (PERFILES._distinto || '') + ' ' : '') + pB.ejes[k]]); });
    const V = (v) => (PERFILES._valor || '').replace('{v}', v); turns.push(['a', V(pA.valor)]); turns.push(['b', V(pB.valor)]);
    const shared = (pA.tags || []).filter((t) => (pB.tags || []).includes(t) && C[t]);
    const tag = shared.length ? shared[Math.floor(Math.random() * shared.length)] : null;
    const fem = (PERFILES._mujeres || []).includes(A.id) && (PERFILES._mujeres || []).includes(B.id); const g = (x) => (fem ? x.replace(/\blos dos\b/g, 'las dos') : x);
    turns.push(['a', g(tag ? C[tag] : (PERFILES._nada || ''))]);
    const com = tag ? C[tag].replace(/^[^:]*:\s*/, '') : this.T.nada;
    return { id: 'duo-' + [A.id, B.id].sort().join('-'), a: A.id, b: B.id, q: this.T.q(A.short, B.short), turns: turns.filter((t) => t[1] && t[1].trim()), cierre: this.T.cierre(A.short, sA, B.short, sB, pick.map((k) => this.T.ejes[k]).join(' y '), com) };
  },
  start(A, B) { try { Talk.close(true); } catch (e) { /* nada */ } this.close(); setTimeout(() => Versus.play(this.script(A, B)), 80); },
  build() {
    if (document.getElementById('duo')) return;
    const el = document.createElement('div'); el.id = 'duo'; el.className = 'nb'; el.hidden = true;
    el.innerHTML = '<div class="nb-card duo-card" role="dialog"><button class="ls-x pn-x" id="duo-x" aria-label="✕">✕</button><div class="eyebrow"></div><h3 class="duo-h"></h3><p class="duo-p"></p><input class="duo-s" type="search" autocomplete="off"><div class="duo-list"></div></div>';
    document.body.appendChild(el); el.querySelector('#duo-x').addEventListener('click', () => this.close());
    el.querySelector('.duo-s').addEventListener('input', (e) => this.paint(e.target.value));
  },
  open(A) {
    if (!this.ok(A)) return; this.A = A; this.build(); const el = document.getElementById('duo'); const s = Escuelas.of(A.id);
    el.querySelector('.eyebrow').textContent = `${s.i} ${A.short} · ${s.n}`; el.querySelector('.duo-h').textContent = this.T.title; el.querySelector('.duo-p').textContent = this.T.sub;
    const inp = el.querySelector('.duo-s'); inp.placeholder = this.T.search; inp.value = '';
    el.hidden = false; this.paint('');
  },
  close() { const el = document.getElementById('duo'); if (el) el.hidden = true; },
  paint(f) {
    const box = document.querySelector('#duo .duo-list'); box.innerHTML = ''; const A = this.A; const mine = ESCUELAS.map[A.id]; const norm = (x) => x.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); const ff = norm(f || '');
    const all = []; ERAS.forEach((e, ei) => { if (this.sacred(ei)) return; e.sages.forEach((d) => { if (d.id !== A.id && this.ok(d) && ESCUELAS.map[d.id] !== mine && !all.some((x) => x.d.id === d.id)) all.push({ d, ei }); }); });
    const match = (x) => !ff || norm(x.d.name).includes(ff) || norm(x.d.short).includes(ff) || norm(Escuelas.of(x.d.id).n).includes(ff);
    const row = (x) => { const s = Escuelas.of(x.d.id); const b = document.createElement('button'); b.className = 'duo-it'; b.style.setProperty('--c', s.c); b.innerHTML = '<i class="medal"></i><span><b></b><small></small></span>';
      setMedal(b.querySelector('.medal'), x.d.id, x.d.short[0]); b.querySelector('b').textContent = x.d.name; b.querySelector('small').textContent = `${s.i} ${s.n} · ${ERAS[x.ei].name}`;
      b.addEventListener('click', () => { Audio.click && Audio.click(); this.start(A, x.d); }); return b; };
    const here = world ? all.filter((x) => x.ei === world.idx && match(x)) : [];
    if (here.length) { const h = document.createElement('h4'); h.textContent = this.T.here; box.appendChild(h); here.forEach((x) => box.appendChild(row(x))); }
    for (const s of ESCUELAS.schools) {
      if (s.id === mine) continue; const L = all.filter((x) => ESCUELAS.map[x.d.id] === s.id && match(x) && !(here.includes(x))); if (!L.length) continue;
      const h = document.createElement('h4'); h.style.setProperty('--c', s.c); h.textContent = `${s.i} ${s.n}`; box.appendChild(h); L.forEach((x) => box.appendChild(row(x)));
    }
  },
};
{
  // el botón nuevo en la conversación con un pensador
  const o0 = Talk.options.bind(Talk);
  Talk.options = function () {
    o0(); if (this.npc || !this.data || !Duo.ok(this.data) || (world && Duo.sacred(world.idx))) return;
    const box = document.getElementById('tk-ops'); if (!box || box.querySelector('.duo-op')) return;
    const b = document.createElement('button'); b.className = 'tk-op duo-op'; b.textContent = Duo.T.btn; const d = this.data;
    b.addEventListener('click', () => { Audio.click && Audio.click(); Voice.stop(); Duo.open(d); });
    const bye = [...box.querySelectorAll('button')].pop(); box.insertBefore(b, bye && /Adi/.test(bye.textContent) ? bye : null);
  };
  const st = document.createElement('style');
  st.textContent = '#duo{z-index:67}.duo-card{max-height:92vh;overflow-y:auto;max-width:600px}.duo-h{font-family:var(--display);font-weight:normal;color:#ffe2a0;margin:2px 34px 4px 0}.duo-p{color:#e8dcc0;margin:0 0 10px;line-height:1.45}'
    + '.duo-s{width:100%;box-sizing:border-box;padding:10px 14px;border-radius:12px;border:1px solid rgba(214,168,74,.5);background:rgba(0,0,0,.35);color:#fff;font:inherit;font-size:1rem;margin-bottom:6px}'
    + '.duo-list h4{margin:14px 0 6px;font-family:var(--display);font-weight:normal;color:var(--c,#d6a84a);font-size:.95rem;letter-spacing:.06em}'
    + '.duo-it{display:flex;align-items:center;gap:10px;width:100%;text-align:left;padding:8px 10px;margin:4px 0;border-radius:12px;border:1px solid rgba(255,255,255,.1);border-left:5px solid var(--c);background:rgba(255,255,255,.04);color:#fff;cursor:pointer;font:inherit}.duo-it:hover{background:rgba(255,255,255,.09)}'
    + '.duo-it .medal{flex:0 0 44px;width:44px;height:44px}.duo-it span{display:flex;flex-direction:column;min-width:0}.duo-it b{font-weight:normal;font-size:1.02rem}.duo-it small{color:#c8b890;font-size:.82rem}'
    + '.duo-op{border-color:#8fb8ff !important}';
  document.head.appendChild(st);
}
if (location.hash === '#debug') window.__duo = Duo;
