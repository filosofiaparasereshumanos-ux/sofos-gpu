// ============================================================================
//  AVISO PARA NAVEGADORES DENTRO DE APPS (Instagram, Facebook, TikTok…)
//  Esos navegadores internos suelen cortar el sonido, la pantalla completa y el
//  guardado del avance: se invita a abrir el juego en Chrome o Safari.
// ============================================================================
{
  const ua = navigator.userAgent || '';
  const inApp = /Instagram|FBAN|FBAV|FB_IAB|FBIOS|musical_ly|TikTok|Bytedance|\bLine\//i.test(ua) || /[?&]iab=1/.test(location.search);
  const KEY = 'odisea-razon.aviso-navegador';
  let seen = false; try { seen = sessionStorage.getItem(KEY) === '1'; } catch (e) {}
  if (inApp && !seen) {
    const android = /Android/i.test(ua);
    const url = location.href.replace(/[?&]iab=1/, '');
    const T = {
      tit: 'Ábrelo en tu navegador',
      txt: 'Estás dentro de Instagram. Para escuchar las voces, jugar a pantalla completa y que se guarde tu avance, abre el juego en Chrome o Safari.',
      ios: 'Toca los tres puntos (···) arriba a la derecha y elige «Abrir en el navegador externo».',
      andr: 'Abrir en Chrome',
      copy: 'Copiar enlace', copied: '¡Enlace copiado! Pégalo en tu navegador.', seguir: 'Seguir aquí',
    };
    if (!/Instagram/i.test(ua)) T.txt = T.txt.replace('Instagram', /TikTok|musical_ly|Bytedance/i.test(ua) ? 'TikTok' : 'Facebook');
    const st = document.createElement('style');
    st.textContent = '#iab{position:fixed;inset:0;z-index:99999;background:rgba(10,7,4,.86);display:grid;place-items:center;padding:16px;font-family:Georgia,serif}'
      + '#iab .bx{max-width:420px;background:linear-gradient(#2a1d10,#1a1209);border:1px solid #c9a45c;border-radius:16px;padding:22px 20px;color:#f4ead6;text-align:center;box-shadow:0 10px 40px #000a}'
      + '#iab h3{margin:0 0 10px;color:#e9c77a;font-size:22px}#iab p{margin:0 0 12px;line-height:1.45;font-size:16px}#iab .hint{background:#0006;border-radius:10px;padding:10px;font-size:15px}'
      + '#iab button,#iab a.bt{display:block;width:100%;box-sizing:border-box;margin:8px 0 0;padding:12px;border-radius:10px;border:0;font:600 16px Georgia,serif;cursor:pointer;text-decoration:none}'
      + '#iab .pri{background:#e9c77a;color:#1a1209}#iab .sec{background:#3a2a17;color:#f4ead6}#iab .ter{background:none;color:#bfae8e;font-weight:400;text-decoration:underline}';
    document.head.appendChild(st);
    const d = document.createElement('div'); d.id = 'iab';
    const intent = 'intent://' + url.replace(/^https?:\/\//, '') + '#Intent;scheme=https;package=com.android.chrome;end';
    d.innerHTML = '<div class="bx"><h3>🌐 ' + T.tit + '</h3><p>' + T.txt + '</p>'
      + (android ? '<a class="bt pri" href="' + intent.replace(/"/g, '&quot;') + '">' + T.andr + '</a>' : '<p class="hint">' + T.ios + '</p>')
      + '<button class="sec" data-k="copy">' + T.copy + '</button><button class="ter" data-k="close">' + T.seguir + '</button></div>';
    const close = () => { d.remove(); try { sessionStorage.setItem(KEY, '1'); } catch (e) {} };
    d.addEventListener('click', (e) => {
      const k = e.target.dataset && e.target.dataset.k;
      if (k === 'close') close();
      if (k === 'copy') {
        const done = () => { e.target.textContent = T.copied; };
        try { navigator.clipboard.writeText(url).then(done, () => { prompt('', url); }); } catch (er) { prompt('', url); }
      }
    });
    const add = () => document.body.appendChild(d);
    if (document.body) add(); else addEventListener('DOMContentLoaded', add);
  }
}
