// ============================================================================
//  IDIOMA: español (index.html) o inglés (index-en.html). Se recuerda la elección;
//  la primera vez, un navegador en inglés abre la versión en inglés.
// ============================================================================
{
  const L = document.documentElement.lang === 'en' ? 'en' : 'es'; const KEY = 'odisea-razon.lang';
  try {
    let pref = localStorage.getItem(KEY);
    if (!pref) { const nav = (navigator.language || 'es').toLowerCase(); pref = nav.startsWith('en') ? 'en' : 'es'; localStorage.setItem(KEY, pref); }
    if (pref !== L && !/debug/.test(location.hash)) location.replace((pref === 'en' ? 'index-en.html' : 'index.html') + location.search + location.hash);
  } catch (e) { /* sin almacenamiento */ }
  for (const id of ['#b-lang', '#b-lang2']) { const a = document.querySelector(id); if (a) a.addEventListener('click', () => { try { localStorage.setItem(KEY, L === 'es' ? 'en' : 'es'); } catch (e) { /* nada */ } }); }
}
