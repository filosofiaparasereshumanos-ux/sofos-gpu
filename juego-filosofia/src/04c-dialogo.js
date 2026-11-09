// ============================================================================
//  DIÁLOGO SOCRÁTICO: postura → razón → objeción → respuesta → cierre.
//  Usa la misma tarjeta de conversación. Superarlo cuenta como vencer al
//  pensador (igual que el debate de preguntas).
// ============================================================================
const POSTURA_KEY = 'odisea-razon.posturas';
const DLG_OPEN = 'Te propongo una idea, para que la examinemos juntos.';
const DLG_WHY = 'Interesante. ¿Por qué lo piensas? Dame tu mejor razón.';
const DLG_OK = 'Has dialogado de verdad: has tomado postura, has dado razones y has respondido a la objeción.';
const DLG_RETRY = 'Pero todavía no me has dado razones firmes. Pensémoslo otra vez, sin prisa.';
Object.assign(Talk, {
  hasDialogo() { return typeof DIALOGOS !== 'undefined' && !!DIALOGOS[this.data.id]; },
  dialogo() {
    const D = DIALOGOS[this.data.id]; this.mode = 'dialogo'; this.dlg = { D, pts: 0 };
    const ul = $('#tk-quest'); ul.innerHTML = ''; ul.hidden = true; $('#tk-you').textContent = '';
    this.say(`${DLG_OPEN} «${D.tesis}» ¿Qué piensas tú?`);
    const ops = D.posturas.map((p, i) => [p.t, () => this.dlgPostura(i), 'ans dlg']);
    ops.push(['Todavía no lo sé', () => this.options(), 'bye']); this.renderOps(ops);
  },
  dlgPostura(i) {
    const p = this.dlg.D.posturas[i]; this.dlg.p = p;
    $('#tk-you').textContent = 'Tú: ' + p.t; this.say(DLG_WHY);
    this.renderOps(shuffle(p.razones.slice()).map((r) => [r.t, () => this.dlgRazon(r), 'ans dlg']));
  },
  dlgPts(r) { return r.k === 'b' ? 2 : r.k === 'f' ? -1 : 0; },
  dlgNote(r, label) {
    const ul = $('#tk-quest'); const li = document.createElement('li');
    li.className = r.k === 'b' ? 'ok' : r.k === 'f' ? 'bad' : 'meh';
    li.textContent = `${r.k === 'b' ? '✓' : r.k === 'f' ? '✗' : '·'} ${label}: ${r.f ? `cuidado, ${r.f}. ` : ''}${r.e}`;
    ul.appendChild(li); ul.hidden = false;
  },
  dlgRazon(r) {
    const g = this.dlg; g.pts += this.dlgPts(r); g.razon = r;
    $('#tk-quest').innerHTML = ''; this.dlgNote(r, 'Tu razón'); $('#tk-you').textContent = 'Tú: ' + r.t;
    this.say(g.p.objecion);
    this.renderOps(shuffle(g.p.respuestas.slice()).map((x) => [x.t, () => this.dlgResp(x), 'ans dlg']));
  },
  dlgResp(x) {
    const g = this.dlg; const s = this.sage, d = this.data; g.pts += this.dlgPts(x); g.resp = x;
    this.dlgNote(x, 'Tu respuesta'); $('#tk-you').textContent = 'Tú: ' + x.t;
    const ok = g.pts >= 3; this.dlgSave(ok);
    if (ok) {
      Audio.correct(); this.say(`${g.p.cierre} ${DLG_OK}`);
      const ops = [];
      if (s.state === 'idle') ops.push(['Recibir su reconocimiento', () => this.dlgWin(), 'duel']);
      ops.push(['📓 Escribir en mi cuaderno', () => Cuaderno.open(d)]);
      if (s.state !== 'idle') ops.push(['Volver', () => this.options(), 'bye']);
      this.renderOps(ops);
    } else {
      Audio.wrong(); this.say(`${g.p.cierre} ${DLG_RETRY}`);
      this.renderOps([['Volver a pensarlo', () => this.dialogo(), 'quest'], ['Volver', () => this.options(), 'bye']]);
    }
  },
  dlgSave(ok) {
    const g = this.dlg; const all = store.get(POSTURA_KEY, {}) || {}; const prev = all[this.data.id];
    all[this.data.id] = { who: this.data.name, tesis: g.D.tesis, postura: g.p.t, eje: g.p.eje, razon: g.razon.t, rk: g.razon.k, rf: g.razon.f || '', resp: g.resp.t, xk: g.resp.k, xf: g.resp.f || '', pts: g.pts, ok, t: Date.now(), n: (prev ? prev.n : 0) + 1 };
    store.set(POSTURA_KEY, all);
  },
  dlgWin() {
    const s = this.sage; const g = this.dlg; this.close(true); $('#tk-quest').innerHTML = '';
    s._wrongs = g.razon.k === 'b' && g.resp.k === 'b' ? 0 : 1;
    Duel.sage = s; Duel.aidsUsed = true; Duel.win(); achieve('dialogo');
  },
});
