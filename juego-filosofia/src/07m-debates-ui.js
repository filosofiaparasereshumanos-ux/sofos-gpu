// ============================================================================
//  DEBATES POR TEMA: una fila de temas (Dios y fe, Amor, Amistad…) para filtrar
//  la lista, el tema bajo cada debate y la etiqueta «Nuevo» en los recién
//  llegados. Los debates nuevos también mueven el mapa filosófico.
// ============================================================================
const VS_TEMA_KEY = 'odisea-razon.vs-tema';
{
  // reglas del mapa filosófico para los debates añadidos después de 06o
  const S = SAGE_BY_ID(); const have = new Set(MAPA_REGLAS.map((r) => r[0]));
  for (const v of VERSUS) if (v.eje && !have.has('vs-' + v.id) && S[v.a] && S[v.b]) MAPA_REGLAS.push(['vs-' + v.id, 'Me convence ' + S[v.a].d.short, v.eje, v.va], ['vs-' + v.id, 'Me convence ' + S[v.b].d.short, v.eje, v.vb]);
}
{
  const T = { all: 'Todos', nuevo: 'Nuevo', turns: (n) => `${n} turnos de palabra` };
  const temaName = (id) => (VS_TEMAS.find((t) => t[0] === id) || [id, ''])[1];
  let cur = 'all'; try { cur = localStorage.getItem(VS_TEMA_KEY) || 'all'; } catch (e) { /* nada */ }
  const l0 = Versus.list.bind(Versus);
  Versus.list = function () {
    l0();
    const box = $('#vs-items'); if (!box) return;
    let bar = document.getElementById('vs-temas');
    if (!bar) { bar = document.createElement('div'); bar.id = 'vs-temas'; box.before(bar); }
    const count = (id) => VERSUS.filter((v) => id === 'all' || v.tema === id).length;
    bar.innerHTML = '';
    for (const [id, name] of [['all', T.all], ...VS_TEMAS]) {
      if (id !== 'all' && !count(id)) continue;
      const b = document.createElement('button'); b.className = 'vs-tm' + (cur === id ? ' on' : ''); b.textContent = `${name} · ${count(id)}`;
      b.addEventListener('click', () => { Audio.click && Audio.click(); cur = id; try { localStorage.setItem(VS_TEMA_KEY, id); } catch (e) { /* nada */ } Versus.list(); });
      bar.appendChild(b);
    }
    // cada botón corresponde a VERSUS[i]
    [...box.children].forEach((el, i) => {
      const v = VERSUS[i]; if (!v) return; el.hidden = !(cur === 'all' || v.tema === cur);
      const sm = el.querySelector('small'); if (sm && !sm.querySelector('.vs-tg')) { const tg = document.createElement('span'); tg.className = 'vs-tg'; tg.textContent = `${temaName(v.tema)} · ${T.turns(v.turns.length)}`; sm.append(document.createElement('br'), tg); }
      if (v.nuevo && !el.querySelector('.vs-new') && !Versus.voted(v)) { const n = document.createElement('em'); n.className = 'vs-new'; n.textContent = T.nuevo; el.querySelector('b').append(' ', n); }
    });
  };
  const st = document.createElement('style');
  st.textContent = '#vs-temas{display:flex;gap:6px;overflow-x:auto;padding:4px 2px 8px;margin:0 -2px 4px;scrollbar-width:thin}#vs-temas .vs-tm{flex:none;border:1px solid var(--line);background:rgba(255,255,255,.05);color:var(--parchment);border-radius:999px;padding:5px 11px;font:inherit;font-size:.8rem;cursor:pointer;white-space:nowrap}'
    + '#vs-temas .vs-tm.on{background:linear-gradient(180deg,#ffe9a8,#e2b04e);color:#1a1206;border-color:#ffe9a8}.vs-item .vs-tg{font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--gold,#d8b25a);opacity:.85}'
    + '.vs-item .vs-new{font-style:normal;font-family:var(--body);font-size:.66rem;letter-spacing:.08em;text-transform:uppercase;padding:1px 6px;border-radius:999px;background:#c0392b;color:#fff;vertical-align:middle}.vs-item[hidden]{display:none}';
  document.head.appendChild(st);
}
