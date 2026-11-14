// ============================================================================
//  «DEBATE TÚ»: pestaña nueva en el panel de Debates. Eliges un pensador, te
//  plantea su tesis y en cada ronda respondes con uno de tres argumentos. Él
//  contesta a lo que dijiste (con su voz) y te dice si tu argumento fue sólido,
//  flojo o una falacia. Al final, un veredicto sobre la solidez de tu postura.
// ============================================================================
const PO_KEY = 'odisea-razon.posturas';
ACH.push({ id: 'polemista', i: '🗣', n: 'Polemista', d: 'Gana con una postura sólida un debate en el que participas tú.' });
const Postura = {
  T: {
    tabs: ['🎧 Escuchar debates', '🗣 Debate tú', '👥 Mesas redondas'], h: 'Debate tú', note: 'Un pensador defiende su idea y tú le respondes. Elige bien tus argumentos: cuidado con las falacias.',
    you: 'Tú', solidez: 'Solidez de tu postura', next: 'Siguiente', verdict: 'Ver el veredicto', again: 'Volver a intentarlo', back: '◂ Otros pensadores', round: (i, n) => `Ronda ${i} de ${n}`,
    ok: '✓ Argumento sólido', meh: '~ Argumento flojo', bad: (f) => `✗ Falacia: ${f}`, best: (s, m) => `Tu mejor resultado: ${s} de ${m}`, todo: 'Sin intentar',
    lv: { alto: 'Postura sólida', medio: 'Postura discutible', bajo: 'Postura débil' }, pick: 'Elige tu respuesta:', pts: (n) => `+${n} sabiduría`,
  },
  best() { return store.get(PO_KEY, {}) || {}; },
  who(P) { if (P.id === 'sofista') return { data: SOFISTA, boss: true }; const S = SAGE_BY_ID()[P.id]; return { data: S.d, boss: !!S.d.boss }; },
  // ---------------------------------------------------------------- pestañas
  ensure() {
    const card = document.querySelector('#vs .vs-card'); if (!card || document.getElementById('po')) return;
    const tabs = document.createElement('div'); tabs.id = 'vs-tabs'; tabs.innerHTML = '<button data-t="0"></button><button data-t="2"></button><button data-t="1"></button>';
    tabs.querySelectorAll('button').forEach((b) => { const i = +b.dataset.t; b.textContent = this.T.tabs[i]; b.addEventListener('click', () => { Audio.click && Audio.click(); this.tab(i); }); });
    card.insertBefore(tabs, card.querySelector('#vs-list'));
    const po = document.createElement('div'); po.id = 'po'; po.hidden = true;
    po.innerHTML = '<div id="po-list"><div class="eyebrow" style="text-align:center"></div><h3 class="av-h"></h3><p class="qd-note" style="text-align:center"></p><div id="po-items"></div></div>'
      + '<div id="po-play" hidden><button class="po-back"></button><div class="po-head"><i class="medal" id="po-m"></i><div><b id="po-n"></b><span id="po-q"></span></div></div>'
      + '<div class="po-meter"><span></span><div><i id="po-bar"></i></div><b id="po-sc"></b></div><small id="po-rd"></small>'
      + '<div id="po-log"></div><div id="po-opts"></div><div class="btns"><button class="btn primary" id="po-next" hidden></button></div></div>';
    card.appendChild(po);
    po.querySelector('#po-list .eyebrow').textContent = this.T.tabs[1].slice(3); po.querySelector('#po-list h3').textContent = this.T.h; po.querySelector('#po-list p').textContent = this.T.note;
    po.querySelector('.po-back').textContent = this.T.back; po.querySelector('.po-back').addEventListener('click', () => { Audio.click && Audio.click(); this.gen++; Voice.stop(); this.list(); });
    po.querySelector('.po-meter span').textContent = this.T.solidez;
    $('#po-next').addEventListener('click', () => this.next());
  },
  tab(i) {
    this.ensure(); this.gen++; Voice.stop(); this.mode = i;
    document.querySelectorAll('#vs-tabs button').forEach((b) => b.classList.toggle('on', +b.dataset.t === i));
    $('#vs-list').hidden = i !== 0; $('#vs-play').hidden = true; $('#po').hidden = i !== 1; if (typeof Mesa !== 'undefined') Mesa.show(i === 2);
    if (i === 0) Versus.list(); else if (i === 1) this.list();
  },
  list() {
    const S = SAGE_BY_ID(), B = this.best(); $('#po-list').hidden = false; $('#po-play').hidden = true; const box = $('#po-items'); box.innerHTML = '';
    for (const P of POSTURAS) {
      const d = S[P.id] && S[P.id].d; if (!d) continue; const m = P.rounds.length * 2, b = B[P.id];
      const el = document.createElement('button'); el.className = 'vs-item po-item'; el.innerHTML = '<i class="medal"></i><span><b></b><small></small><em></em></span><i class="po-st"></i>';
      setMedal(el.querySelector('.medal'), P.id, d.short[0]); el.querySelector('b').textContent = d.short; el.querySelector('small').textContent = P.q;
      el.querySelector('em').textContent = b == null ? this.T.todo : this.T.best(b, m); el.querySelector('.po-st').textContent = b == null ? '' : b >= m - 1 ? '★★★' : b >= m / 2 ? '★★' : '★';
      el.addEventListener('click', () => { Audio.click && Audio.click(); this.play(P); }); box.appendChild(el);
    }
  },
  // ---------------------------------------------------------------- partida
  open(P, onEnd) {
    if ($('#vs').hidden) Panel.open('vs'); this.ensure();
    document.getElementById('vs-tabs').hidden = !!P.final; $('#vs-list').hidden = true; $('#vs-play').hidden = true; $('#po').hidden = false;
    document.querySelectorAll('#vs-tabs button').forEach((b) => b.classList.toggle('on', b.dataset.t === '1')); if (typeof Mesa !== 'undefined') Mesa.show(false); this.play(P, onEnd);
  },
  play(P, onEnd) {
    this.P = P; this.i = 0; this.sc = 0; this.picks = []; this.onEnd = onEnd || null; this.W = this.who(P);
    $('#po-list').hidden = true; $('#po-play').hidden = false; $('#po-play').classList.toggle('final', !!P.final);
    document.querySelector('#po-play .po-back').hidden = !!P.final;
    const m = $('#po-m'); setMedal(m, P.id === 'sofista' ? '' : P.id, P.id === 'sofista' ? 'Σ' : this.W.data.short[0]); m.classList.toggle('po-sof', P.id === 'sofista');
    $('#po-n').textContent = this.W.data.short; $('#po-q').textContent = P.q; $('#po-log').innerHTML = ''; this.meter(); this.round();
  },
  meter() { const m = this.P.rounds.length * 2; $('#po-bar').style.width = Math.max(0, this.sc) / m * 100 + '%'; $('#po-sc').textContent = `${Math.max(0, this.sc)}/${m}`; },
  bubble(cls, name, text) {
    const b = document.createElement('div'); b.className = 'po-b ' + cls; b.innerHTML = '<b></b><p></p>'; b.querySelector('b').textContent = name; b.querySelector('p').textContent = text;
    const log = $('#po-log'); log.appendChild(b); requestAnimationFrame(() => { const card = document.querySelector('#vs .vs-card'); if (card) card.scrollTo({ top: card.scrollHeight, behavior: 'smooth' }); }); return b;
  },
  speak(text, after) { const gen = ++this.gen; const parts = narrSplit(text); let k = 0; const say = () => { if (gen !== this.gen) return; if (k >= parts.length) { if (after) after(); return; } Voice.utter(parts[k++], this.W, 1, say); }; say(); },
  round() {
    const R = this.P.rounds[this.i]; $('#po-rd').textContent = this.T.round(this.i + 1, this.P.rounds.length); $('#po-next').hidden = true;
    $('#po-log').innerHTML = ''; this.bubble('them', this.W.data.short, R.say); this.speak(R.say);
    const box = $('#po-opts'); box.innerHTML = ''; const lab = document.createElement('small'); lab.textContent = this.T.pick; box.appendChild(lab);
    const opts = shuffle([...R.opts]);
    opts.forEach((o, k) => { const b = document.createElement('button'); b.className = 'ans po-o'; b.innerHTML = `<span class="k">${'ABC'[k]}</span><span></span>`; b.lastChild.textContent = o.t; b.addEventListener('click', () => this.pick(o)); box.appendChild(b); });
  },
  pick(o) {
    if ($('#po-opts').dataset.done === String(this.i)) return; $('#po-opts').dataset.done = String(this.i);
    Voice.stop(); this.gen++; $('#po-opts').innerHTML = '';
    const d = o.k === 'bueno' ? 2 : o.k === 'flojo' ? 0 : -1; this.sc += d; this.picks.push(o); this.meter();
    if (o.k === 'bueno') { Audio.correct && Audio.correct(); buzz(20); } else if (o.k === 'falacia') { Audio.wrong && Audio.wrong(); buzz([40, 30, 60]); } else Audio.click && Audio.click();
    this.bubble('me', this.T.you, o.t);
    const r = this.bubble('them', this.W.data.short, o.r);
    const chip = document.createElement('div'); chip.className = 'po-chip ' + o.k; chip.innerHTML = '<b></b><span></span>'; chip.querySelector('b').textContent = o.k === 'bueno' ? this.T.ok : o.k === 'flojo' ? this.T.meh : this.T.bad(o.f); chip.querySelector('span').textContent = o.why; r.after(chip);
    const nb = $('#po-next'); nb.hidden = false; nb.textContent = this.i < this.P.rounds.length - 1 ? this.T.next : this.T.verdict;
    this.speak(o.r);
  },
  next() {
    Audio.click && Audio.click(); Voice.stop(); this.gen++;
    if (this.i < this.P.rounds.length - 1) { this.i++; delete $('#po-opts').dataset.done; this.round(); return; }
    this.end();
  },
  end() {
    const P = this.P, m = P.rounds.length * 2, s = Math.max(0, this.sc); const lv = s >= m - 1 ? 'alto' : s >= m / 2 ? 'medio' : 'bajo';
    $('#po-rd').textContent = ''; $('#po-opts').innerHTML = ''; $('#po-log').innerHTML = '';
    const v = document.createElement('div'); v.className = 'po-verdict ' + lv; v.innerHTML = '<span></span><b></b>'; v.querySelector('span').textContent = this.T.lv[lv]; v.querySelector('b').textContent = `${s} / ${m}`; $('#po-log').appendChild(v);
    this.bubble('them', this.W.data.short, P.fin[lv]); this.speak(P.fin[lv]);
    const sum = document.createElement('div'); sum.className = 'po-sum';
    this.picks.forEach((o, k) => { const r = document.createElement('div'); r.className = 'po-chip ' + o.k; r.innerHTML = '<b></b><span></span>'; r.querySelector('b').textContent = `${k + 1}. ` + (o.k === 'bueno' ? this.T.ok : o.k === 'flojo' ? this.T.meh : this.T.bad(o.f)); r.querySelector('span').textContent = o.why; sum.appendChild(r); });
    $('#po-log').appendChild(sum);
    const B = this.best(); const prev = B[P.id]; if (prev == null || s > prev) { const gain = (s - Math.max(0, prev || 0)) * 25; B[P.id] = s; store.set(PO_KEY, B); if (gain > 0) { try { addScore(gain); } catch (e) { /* fuera de una partida */ } toast(this.T.pts(gain)); } }
    if (lv === 'alto') achieve('polemista'); try { Mision.hit('versus'); } catch (e) { /* nada */ }
    if (typeof Metricas !== 'undefined') Metricas.hit('postura_' + lv, P.id === 'sofista' ? 'sofista' : '');
    const nb = $('#po-next'); nb.hidden = true;
    const btns = document.createElement('div'); btns.className = 'btns';
    const again = document.createElement('button'); again.className = 'btn ghost'; again.textContent = this.T.again; again.addEventListener('click', () => { Audio.click && Audio.click(); this.play(P, this.onEnd); }); btns.appendChild(again);
    if (!P.final) { const back = document.createElement('button'); back.className = 'btn'; back.textContent = this.T.back; back.addEventListener('click', () => { Audio.click && Audio.click(); Voice.stop(); this.list(); }); btns.appendChild(back); }
    $('#po-log').appendChild(btns);
    if (this.onEnd) { const f = this.onEnd; setTimeout(() => f(lv, s, m), 300); }
  },
};
// al abrir el panel de debates, se muestran las dos pestañas
{
  const o0 = Versus.open.bind(Versus);
  Versus.open = function () { o0(); Postura.ensure(); const t = document.getElementById('vs-tabs'); if (t) t.hidden = false; Postura.tab(Postura.mode || 0); };
}
{
  const st = document.createElement('style');
  st.textContent = '#vs-tabs{display:flex;gap:5px;margin:0 34px 10px 0}#vs-tabs[hidden]{display:none}#vs-tabs button{flex:1;border:1px solid var(--line);background:rgba(255,255,255,.04);color:var(--parchment);border-radius:10px;padding:7px 4px;font:inherit;font-size:.78rem;line-height:1.2;cursor:pointer}#vs-tabs button.on{background:linear-gradient(180deg,#ffe9a8,#e2b04e);color:#1a1206;border-color:#ffe9a8}'
    + '#po[hidden],#po-list[hidden],#po-play[hidden]{display:none}.po-item em{display:block;font-style:normal;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--gold,#d8b25a)}.po-item .po-st{font-style:normal;color:#ffd36a;font-size:.9rem;letter-spacing:-.05em}'
    + '.po-back{border:0;background:none;color:var(--gold,#d8b25a);font:inherit;font-size:.85rem;cursor:pointer;padding:0 0 6px}.po-back[hidden]{display:none}'
    + '.po-head{display:flex;align-items:center;gap:12px;margin:0 30px 8px 0}.po-head .medal{width:54px;height:54px;flex:none;font-size:1.3rem}.po-head b{display:block;font-family:var(--display);font-weight:normal;color:var(--gold-bright,#ffd36a);font-size:1.15rem}.po-head span{display:block;font-size:.95rem;color:#f3e6c4}'
    + '.medal.po-sof{background:radial-gradient(circle at 40% 35%,#5a4a6a,#1a1222 70%);color:#d8c8ff;border-color:#8a6ab0;box-shadow:0 0 14px rgba(140,100,200,.6)}#po-play.final .po-head b{color:#d8c8ff}'
    + '.po-meter{display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:#f3e6c4}.po-meter div{height:8px;border-radius:5px;background:rgba(255,255,255,.08);overflow:hidden}.po-meter i{display:block;height:100%;width:0;background:linear-gradient(90deg,#5cc49a,#ffd36a);transition:width .5s}.po-meter b{font-weight:normal;color:#ffd36a}'
    + '#po-rd{display:block;margin:4px 0 6px;color:var(--parchment-dim,#bfae8e);font-size:.78rem}'
    + '.po-b{margin:8px 0;padding:10px 12px;border-radius:12px;max-width:92%;animation:poIn .3s ease}.po-b b{display:block;font-family:var(--display);font-weight:normal;font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;margin-bottom:2px}.po-b p{margin:0;line-height:1.45}'
    + '.po-b.them{background:rgba(216,178,90,.1);border:1px solid rgba(216,178,90,.35)}.po-b.them b{color:#ffd36a}.po-b.me{margin-left:auto;background:rgba(92,196,154,.12);border:1px solid rgba(92,196,154,.45)}.po-b.me b{color:#8ff0c4}@keyframes poIn{from{opacity:0;transform:translateY(6px)}}'
    + '.po-chip{margin:4px 0 8px;padding:7px 10px;border-radius:10px;font-size:.86rem;line-height:1.35;border-left:3px solid}.po-chip b{display:block;font-weight:normal;font-family:var(--display);font-size:.78rem;letter-spacing:.06em}.po-chip.bueno{border-color:#5cc49a;background:rgba(92,196,154,.08)}.po-chip.bueno b{color:#8ff0c4}.po-chip.flojo{border-color:#d8b25a;background:rgba(216,178,90,.07)}.po-chip.flojo b{color:#ffd36a}.po-chip.falacia{border-color:#e06a5a;background:rgba(224,106,90,.08)}.po-chip.falacia b{color:#ff9a8a}'
    + '#po-opts small{display:block;margin:8px 0 4px;color:var(--parchment-dim,#bfae8e);font-size:.8rem}#po-opts .po-o{width:100%;margin:5px 0;text-align:left}'
    + '.po-verdict{text-align:center;padding:12px;border-radius:12px;margin:6px 0 4px;border:1px solid}.po-verdict span{display:block;font-family:var(--display);letter-spacing:.14em;text-transform:uppercase;font-size:1rem}.po-verdict b{font-size:1.6rem;font-weight:normal}.po-verdict.alto{border-color:#5cc49a;color:#8ff0c4;background:rgba(92,196,154,.1)}.po-verdict.medio{border-color:#d8b25a;color:#ffd36a;background:rgba(216,178,90,.08)}.po-verdict.bajo{border-color:#e06a5a;color:#ff9a8a;background:rgba(224,106,90,.08)}.po-sum{margin-top:6px}';
  document.head.appendChild(st);
}
if (location.hash === '#debug') window.__postura = Postura;
