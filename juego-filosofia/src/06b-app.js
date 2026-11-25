// ============================================================================
//  APP INSTALABLE (solo en la versión web publicada en un dominio propio)
// ============================================================================
const AppInstall = {
  evt: null,
  web: (location.protocol === 'https:' || location.hostname === 'localhost') && window.top === window.self && !/claude/i.test(location.hostname),
  ios: /iPhone|iPad|iPod/i.test(navigator.userAgent) && !navigator.standalone,
};
if (AppInstall.web) {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); AppInstall.evt = e; $('#b-install').hidden = false; });
  window.addEventListener('appinstalled', () => { $('#b-install').hidden = true; });
  if (AppInstall.ios) $('#b-install').hidden = false;
}
on('#b-install', async () => {
  if (AppInstall.evt) { AppInstall.evt.prompt(); await AppInstall.evt.userChoice.catch(() => {}); AppInstall.evt = null; $('#b-install').hidden = true; return; }
  if (AppInstall.ios) toast('En iPhone: toca el botón Compartir y luego «Agregar a inicio».');
});
