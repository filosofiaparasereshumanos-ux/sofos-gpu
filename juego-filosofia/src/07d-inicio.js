// ============================================================================
//  EL PRIMER MINUTO: una guía de cuatro pasos para quien juega por primera vez
//  (moverse → ir al primer pensador → hablar y desafiarlo → ganar el debate).
//  Una tarjeta pequeña, abajo, que avanza sola al cumplir cada paso, señala el
//  botón que hay que tocar y termina con la primera victoria. Se puede saltar.
// ============================================================================
const Guia = {
  KEY: 'odisea-razon.guia-inicial', step: -1, el: null, t: null,
  T: {
    title: 'Primeros pasos', skip: 'Saltar', done: '🏛 ¡Tu primer pensador! Ya sabes jugar: explora, descubre lugares y debate con todos.',
    s: [
      ['Camina', 'Mueve el joystick de la izquierda o toca el suelo donde quieras ir.', 'Camina con W A S D y mira con el ratón.'],
      ['Busca a un pensador', 'Toca el botón dorado «Ir a…»: te lleva caminando hasta el primero.', 'Pulsa E para caminar solo hasta el primero, o sigue la luz dorada.'],
      ['Habla y desafíalo', 'Cuando estés cerca, toca «Hablar» y elige «Te desafío a un debate».', 'Cuando estés cerca, pulsa E y elige «Te desafío a un debate».'],
      ['Gana el debate', 'Elige la respuesta correcta para convencerlo. ¡Tú puedes!', 'Elige la respuesta correcta para convencerlo. ¡Tú puedes!'],
    ],
  },
  want() { try { if (localStorage.getItem(this.KEY)) return false; } catch (e) { return false; } return G.codex.size === 0; },
  finish(win) {
    try { localStorage.setItem(this.KEY, '1'); } catch (e) { /* nada */ } clearInterval(this.t); this.t = null; this.step = -1; this.mark(null);
    if (this.el) { this.el.classList.add('out'); setTimeout(() => { if (this.el) this.el.hidden = true; }, 400); }
    if (win) setTimeout(() => toast(this.T.done), 900);
  },
  build() {
    if (this.el) return; const el = document.createElement('div'); el.id = 'guia'; el.hidden = true;
    el.innerHTML = '<div class="g-top"><span class="g-k"></span><span class="g-dots"><i></i><i></i><i></i><i></i></span><button class="g-skip"></button></div><b class="g-t"></b><p class="g-d"></p>';
    el.querySelector('.g-skip').textContent = this.T.skip; el.querySelector('.g-skip').addEventListener('click', () => { Audio.click && Audio.click(); this.finish(false); });
    el.querySelector('.g-k').textContent = this.T.title; (document.getElementById('app') || document.body).appendChild(el); this.el = el;
  },
  start() {
    if (!this.want() || this.t) return; this.build(); this.p0 = player.pos.clone(); this.go(0);
    this.t = setInterval(() => this.check(), 300);
  },
  go(k) {
    this.step = k; const S = this.T.s[k]; const el = this.el;
    el.querySelector('.g-t').textContent = `${k + 1}. ${S[0]}`; el.querySelector('.g-d').textContent = IS_TOUCH ? S[1] : S[2];
    el.querySelectorAll('.g-dots i').forEach((d, j) => { d.className = j < k ? 'ok' : j === k ? 'on' : ''; });
    el.classList.remove('gpop'); void el.offsetWidth; el.classList.add('gpop'); if (k > 0) { Audio.pickup && Audio.pickup(); buzz(15); }
    this.mark(k === 1 || k === 2 ? document.getElementById('t-act') : null);
  },
  mark(b) { if (this._m && this._m !== b) this._m.classList.remove('g-glow'); this._m = b; if (b) b.classList.add('g-glow'); },
  check() {
    if (!this.el) return; const playing = G.state === 'play';
    // la tarjeta solo se ve mientras se camina por el mundo (no en conversaciones, debates ni menús)
    const show = playing; if (this.el.hidden === show) this.el.hidden = !show;
    if (G.codex.size > 0 && this.step >= 0) return this.finish(true);
    const near = sages.reduce((m, s) => (s.state !== 'sealed' && s.group.visible ? Math.min(m, Math.hypot(s.pos.x - player.pos.x, s.pos.z - player.pos.z)) : m), 1e9);
    if (this.step === 0 && (Math.hypot(player.pos.x - this.p0.x, player.pos.z - this.p0.z) > 2.5 || input.auto)) this.go(near < 6 ? 2 : 1);
    else if (this.step === 1 && (near < 6 || G.state === 'talk')) this.go(2);
    else if (this.step === 2 && G.state === 'duel') this.go(3);
    else if (this.step === 3 && playing && near > 9) this.go(1); // salió del debate sin terminar
  },
};
// al entrar por primera vez en una época: la guía sustituye a los consejos sueltos
{
  const e0 = enterEra;
  enterEra = function () { const was = G.state; const first = was === 'intro' && Guia.want(); if (first) G.tipsShown = true; e0(); if (first && G.state === 'play') setTimeout(() => Guia.start(), 700); };
}
{
  const st = document.createElement('style');
  st.textContent = '#guia{position:absolute;white-space:normal;font-family:var(--body,Georgia);text-transform:none;left:50%;bottom:calc(var(--sab,0px) + 118px);transform:translateX(-50%);z-index:35;width:min(380px,calc(100% - 32px));box-sizing:border-box;padding:10px 14px 12px;border-radius:16px;background:linear-gradient(160deg,rgba(52,36,14,.95),rgba(20,14,7,.95));border:1.5px solid var(--gold,#d8b25a);box-shadow:0 8px 26px rgba(0,0,0,.55),0 0 18px rgba(255,200,90,.25);color:#fff4dc;transition:opacity .35s,transform .35s}'
    + 'body.touch #guia{bottom:calc(var(--sab,0px) + 318px)}#guia[hidden]{display:none}#guia.out{opacity:0;transform:translate(-50%,12px)}#guia.gpop{animation:gPop .45s cubic-bezier(.2,1.5,.4,1)}@keyframes gPop{from{transform:translate(-50%,10px) scale(.94);opacity:.4}to{transform:translateX(-50%);opacity:1}}'
    + '#guia .g-top{display:flex;align-items:center;gap:8px;margin-bottom:4px}#guia .g-k{font-family:var(--display,Georgia);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold-bright,#ffd36a)}'
    + '#guia .g-dots{display:flex;gap:4px;flex:1}#guia .g-dots i{width:18px;height:4px;border-radius:2px;background:rgba(255,224,160,.25)}#guia .g-dots i.ok{background:#8fd36a}#guia .g-dots i.on{background:var(--gold-bright,#ffd36a)}'
    + '#guia .g-skip{border:0;background:none;color:#bfae8e;font:inherit;font-size:.78rem;text-decoration:underline;cursor:pointer;padding:2px}'
    + '#guia .g-t{display:block;font-size:1.05rem;color:#ffe9b0}#guia .g-d{margin:2px 0 0;font-size:.92rem;line-height:1.35;opacity:.95}'
    + '.g-glow{animation:gGlow 1.1s ease-in-out infinite !important}@keyframes gGlow{0%,100%{box-shadow:0 0 0 0 rgba(255,211,106,.0),0 0 12px rgba(255,211,106,.5)}50%{box-shadow:0 0 0 10px rgba(255,211,106,.25),0 0 28px rgba(255,211,106,.9)}}';
  document.head.appendChild(st);
}
if (location.hash === '#debug') window.__guia = Guia;
