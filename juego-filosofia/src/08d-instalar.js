// ============================================================================
//  INSTALAR LA APP: una tarjeta bien visible bajo el botón JUGAR y, al tocar
//  JUGAR, una invitación a instalar (pantalla completa, sin conexión, acceso
//  directo). Sale como mucho una vez cada 3 días y nunca si la app ya está
//  instalada. En iPhone explica cómo agregarla a la pantalla de inicio.
// ============================================================================
const Instalar = {
  KEY: 'odisea-razon.instalar-visto',
  T: {
    card: 'Instala la app', cardS: 'Pantalla completa, sin conexión y con acceso directo', h: 'Instala Odisea de la Razón',
    p: 'Juega a pantalla completa, más rápido y sin conexión, con un acceso directo en tu teléfono como cualquier app. Es gratis y ocupa muy poco.',
    yes: 'Instalar la app', no: 'Ahora no, jugar', ios: 'En iPhone o iPad: toca el botón Compartir (el cuadrado con la flecha hacia arriba) y luego «Agregar a inicio».', ok: 'Entendido, jugar',
  },
  installed() { try { return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true || /android-app:\/\//.test(document.referrer); } catch (e) { return false; } },
  can() { return !this.installed() && typeof AppInstall !== 'undefined' && AppInstall.web && (!!AppInstall.evt || AppInstall.ios); },
  recent() { const t = +(store.get(this.KEY, 0) || 0); return Date.now() - t < 3 * 24 * 3600 * 1000; },
  async install() {
    if (AppInstall.evt) { const e = AppInstall.evt; e.prompt(); await e.userChoice.catch(() => {}); AppInstall.evt = null; this.paint(); return true; }
    return false;
  },
  // la invitación que sale al tocar JUGAR
  offer(then) {
    store.set(this.KEY, Date.now());
    let el = document.getElementById('inst'); if (el) el.remove();
    el = document.createElement('div'); el.id = 'inst'; el.className = 'nb';
    el.innerHTML = '<div class="nb-card inst-card" role="dialog"><div class="inst-ico">📲</div><h3></h3><p></p><p class="inst-ios" hidden></p><div class="btns"><button class="btn primary inst-y"></button><button class="btn inst-n"></button></div></div>';
    el.querySelector('h3').textContent = this.T.h; el.querySelector('p').textContent = this.T.p;
    const y = el.querySelector('.inst-y'), n = el.querySelector('.inst-n');
    const done = () => { el.remove(); then && then(); };
    if (AppInstall.evt) { y.textContent = this.T.yes; n.textContent = this.T.no; y.addEventListener('click', async () => { Audio.click && Audio.click(); await this.install(); done(); }); }
    else { const ios = el.querySelector('.inst-ios'); ios.hidden = false; ios.textContent = this.T.ios; y.textContent = this.T.ok; n.remove(); y.addEventListener('click', () => { Audio.click && Audio.click(); done(); }); }
    n.addEventListener('click', () => { Audio.click && Audio.click(); done(); });
    document.body.appendChild(el);
  },
  // la tarjeta visible en la portada, bajo JUGAR
  paint() {
    let c = document.getElementById('inst-card'); const play = document.getElementById('b-play');
    const show = this.can(); if (!show) { if (c) c.hidden = true; return; } if (!play) return;
    if (!c) {
      c = document.createElement('button'); c.id = 'inst-card'; c.innerHTML = '<b>📲</b><span><strong></strong><small></small></span>';
      c.querySelector('strong').textContent = this.T.card; c.querySelector('small').textContent = this.T.cardS;
      play.after(c); c.addEventListener('click', async () => { Audio.init && Audio.init(); Audio.click && Audio.click(); if (!(await this.install())) this.offer(null); });
    }
    c.hidden = false;
  },
};
{
  // al tocar JUGAR, primero la invitación (si se puede instalar y no se mostró hace poco)
  const play = document.getElementById('b-play');
  if (play) play.addEventListener('click', (e) => {
    if (!Instalar.can() || Instalar.recent()) return;
    e.stopImmediatePropagation(); e.preventDefault();
    Instalar.offer(() => openTravel('title'));
  }, true);
  window.addEventListener('beforeinstallprompt', () => setTimeout(() => Instalar.paint(), 0));
  window.addEventListener('appinstalled', () => Instalar.paint());
  setTimeout(() => Instalar.paint(), 300);
  const st = document.createElement('style');
  st.textContent = '#inst{z-index:80}.inst-card{text-align:center;max-width:420px}.inst-ico{font-size:3rem;line-height:1}.inst-card h3{font-family:var(--display);font-weight:normal;color:#ffe2a0;margin:6px 0}.inst-card p{color:#f3e6c4;line-height:1.5}.inst-ios{background:rgba(255,255,255,.06);border-radius:10px;padding:10px}'
    + '#inst-card{display:flex;align-items:center;gap:12px;width:min(440px,92vw);margin:10px auto 0;padding:12px 16px;border-radius:14px;border:2px solid #7ad09a;background:linear-gradient(150deg,rgba(30,90,60,.92),rgba(10,40,24,.95));color:#eafff2;font-family:var(--body,Georgia);text-align:left;cursor:pointer;box-shadow:0 0 22px rgba(122,208,154,.35);animation:instGlow 2.4s ease-in-out infinite}'
    + '#inst-card[hidden]{display:none}#inst-card b{font-size:1.8rem}#inst-card span{display:flex;flex-direction:column}#inst-card strong{font-size:1.08rem}#inst-card small{color:#bfe8cf}@keyframes instGlow{50%{box-shadow:0 0 34px rgba(122,208,154,.6)}}';
  document.head.appendChild(st);
}
if (location.hash === '#debug') window.__inst = Instalar;
