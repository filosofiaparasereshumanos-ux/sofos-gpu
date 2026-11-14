// ============================================================================
//  MODO PROYECTOR DEL AULA: el avance de la clase, su mapa filosófico y la
//  pregunta que más la divide, en grande, para la pizarra o el proyector.
// ============================================================================
const PMAPA = {
  k: null, tab: 'avance', initials: false,
  data() {
    const all = store.get(AULA.KEY_CLASSES, {}); const c = all[this.k]; const d = c && AULA.decode(c.code); if (!d) return null;
    const tasks = AULA.tasksOf(d); const cols = d.items.map((x) => ({ x, ts: tasks.filter((t) => AULA.applies(x, t)) }));
    const subs = Object.values(c.subs || {}).map((s) => {
      let p = 0; const per = cols.map((c2) => { const seg = s.bits.slice(p, p + c2.ts.length); p += c2.ts.length; return [...seg].filter((b) => b === '1').length; });
      const ok = [...s.bits].filter((b) => b === '1').length; return { ...s, per, pct: s.bits.length ? Math.round((ok / s.bits.length) * 100) : 0 };
    });
    return { c, d, cols, subs };
  },
  who(n) { return this.initials ? n.split(/\s+/).map((w) => w[0] || '').join('').toUpperCase() + '.' : n; },
  open(k) {
    this.k = k; this.tab = 'avance'; $('#pmap').hidden = false; Audio.click();
    try { if (document.documentElement.requestFullscreen && !document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {}); } catch (e) { /* nada */ }
    this.render();
  },
  close() { $('#pmap').hidden = true; try { if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {}); } catch (e) { /* nada */ } },
  go(dir) { const T = ['avance', 'mapa', 'debate']; this.tab = T[(T.indexOf(this.tab) + dir + T.length) % T.length]; Audio.click(); this.render(); },
  render() {
    const D = this.data(); if (!D) return this.close();
    $('#pm-title').textContent = D.c.title;
    document.querySelectorAll('#pm-tabs button').forEach((b) => b.classList.toggle('on', b.dataset.v === this.tab));
    $('#pm-names').textContent = this.initials ? 'Nombres: solo iniciales' : 'Nombres: completos';
    const box = $('#pm-body'); box.innerHTML = '';
    if (!D.subs.length) { box.innerHTML = '<p class="pm-empty">Todavía no hay entregas en esta tarea.</p>'; return; }
    if (this.tab === 'avance') this.avance(D, box); else if (this.tab === 'mapa') this.mapa(D, box); else this.debate(D, box);
  },
  avance(D, box) {
    const avg = Math.round(D.subs.reduce((a, s) => a + s.pct, 0) / D.subs.length); const full = D.subs.filter((s) => s.pct === 100).length;
    const top = document.createElement('div'); top.className = 'pm-stats';
    top.innerHTML = `<div><b>${D.subs.length}</b><span>estudiantes</span></div><div><b>${avg} %</b><span>avance medio</span></div><div><b>${full}</b><span>terminaron</span></div>`;
    box.appendChild(top);
    const grid = document.createElement('div'); grid.className = 'pm-grid';
    const row = (label, pct, cls) => {
      const r = document.createElement('div'); r.className = 'pm-row';
      const n = document.createElement('span'); n.className = 'pm-n'; n.textContent = label;
      const bar = document.createElement('span'); bar.className = 'pm-bar' + (cls ? ' ' + cls : ''); bar.innerHTML = `<i style="width:${pct}%"></i>`;
      const p = document.createElement('b'); p.textContent = pct + ' %'; r.append(n, bar, p); return r;
    };
    const L = document.createElement('div'); L.className = 'pm-col'; L.innerHTML = '<h3>La clase</h3>';
    [...D.subs].sort((a, b) => b.pct - a.pct || a.name.localeCompare(b.name, 'es'))
      .forEach((s, i) => L.appendChild(row((i < 3 && s.pct > 0 ? ['🥇 ', '🥈 ', '🥉 '][i] : '') + this.who(s.name), s.pct)));
    const R = document.createElement('div'); R.className = 'pm-col'; R.innerHTML = '<h3>Pensadores</h3>';
    D.cols.forEach((c2, j) => {
      if (!c2.ts.length) return;
      R.appendChild(row(c2.x.s.short, Math.round((D.subs.reduce((a, s) => a + s.per[j], 0) / (D.subs.length * c2.ts.length)) * 100), 'th'));
    });
    grid.append(L, R); box.appendChild(grid);
  },
  mapa(D, box) {
    const subs = this.initials ? D.subs.map((s) => ({ ...s, name: this.who(s.name) })) : D.subs;
    if (!subs.some((s) => s.map && /[0-8]/.test(s.map))) { box.innerHTML = '<p class="pm-empty">Las entregas todavía no traen el mapa filosófico. Pide a tus estudiantes que dialoguen con los pensadores y vuelvan a entregar.</p>'; return; }
    AULA.renderClassMap(subs, box); const af = box.querySelector('.mp-af'); if (af) af.remove();
  },
  debate(D, box) {
    const withMap = D.subs.filter((s) => s.map && /[0-8]/.test(s.map)); let best = null;
    MAPA_EJES.forEach((e, i) => {
      const v = withMap.map((s) => s.map[i]).filter((c) => c && c !== '-').map((c) => +c / 4 - 1);
      const neg = v.filter((x) => x < -0.3).length, pos = v.filter((x) => x > 0.3).length, split = Math.min(neg, pos);
      if (v.length && (!best || split > best.split || (split === best.split && v.length > best.n))) best = { e, neg, pos, mid: v.length - neg - pos, split, n: v.length };
    });
    if (!best) { box.innerHTML = '<p class="pm-empty">Cuando las entregas traigan el mapa filosófico, aquí aparecerá la pregunta que más divide a la clase.</p>'; return; }
    const w = document.createElement('div'); w.className = 'pm-deb';
    w.innerHTML = `<small>${best.split ? 'La pregunta que más divide a la clase' : 'Pregunta para debatir'}</small><h2></h2>
      <div class="pm-sides"><div class="a"><b>${best.neg}</b><span></span></div><div class="m"><b>${best.mid}</b><span>intermedio</span></div><div class="z"><b>${best.pos}</b><span></span></div></div>
      <ol><li>Cada grupo prepara su mejor razón (2 minutos).</li><li>Un grupo la expone; el otro responde con una objeción.</li><li>¿Alguien cambió de opinión? ¿Por qué?</li></ol>`;
    w.querySelector('h2').textContent = best.e.q; w.querySelector('.a span').textContent = best.e.neg; w.querySelector('.z span').textContent = best.e.pos;
    box.appendChild(w);
  },
};
on('#au-pmap', () => { if (AULA.current) PMAPA.open(AULA.current); });
on('#pm-x', () => PMAPA.close());
on('#pm-prev', () => PMAPA.go(-1)); on('#pm-next', () => PMAPA.go(1));
on('#pm-names', () => { PMAPA.initials = !PMAPA.initials; PMAPA.render(); });
document.querySelectorAll('#pm-tabs button').forEach((b) => b.addEventListener('click', () => { PMAPA.tab = b.dataset.v; Audio.click(); PMAPA.render(); }));
window.addEventListener('keydown', (e) => {
  if ($('#pmap').hidden) return;
  if (e.key === 'Escape') PMAPA.close(); else if (e.key === 'ArrowRight') PMAPA.go(1); else if (e.key === 'ArrowLeft') PMAPA.go(-1); else return;
  e.preventDefault(); e.stopPropagation();
}, true);
