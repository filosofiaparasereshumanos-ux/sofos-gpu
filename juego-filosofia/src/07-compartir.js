// ============================================================================
//  COMPARTIR POR WHATSAPP: enlaces que llevan directo a un pensador o a un mundo
//  · ?ir=protagoras  → abre la época de Protágoras y deja al viajero frente a él
//  · ?mundo=falacias → abre directamente ese mundo
//  · &de=Ana         → «Ana te invita…» (apodo de quien comparte)
//  Se comparte desde la conversación con un pensador y desde la pausa.
// ============================================================================
const Ir = {
  pend: null,
  T: {
    btnSage: '📲 Invitar a un amigo a conocerme', btnEra: '📲 Invitar a un amigo a esta época',
    title: 'Invitar a un amigo', wa: 'Enviar por WhatsApp', more: 'Más opciones', copy: 'Copiar enlace', copied: '¡Enlace copiado!', close: 'Cerrar',
    hint: 'Tu amigo entrará directo aquí, sin descargar nada.', online: 'Si los dos activan «Jugar en línea», se verán en el mismo mundo.',
    sageMsg: '🏛 Te invito a conversar con ⟦0⟧ en Odisea de la Razón: «⟦1⟧». Entra directo aquí:',
    eraMsg: '🌍 Estoy en «⟦0⟧» (⟦1⟧) en Odisea de la Razón. ¡Ven a explorarlo conmigo! Entra directo aquí:',
    arrSage: '👋 ⟦0⟧ te ha enviado a conversar con ⟦1⟧. Acércate y toca «Hablar».', arrSageAnon: '👋 Te han enviado a conversar con ⟦0⟧. Acércate y toca «Hablar».',
    arrEra: '👋 ⟦0⟧ te invita a explorar este mundo.', boss: 'Es el maestro de esta época: debate primero con los demás pensadores y después te estará esperando.',
  },
  f(s, ...a) { return s.replace(/⟦(\d)⟧/g, (_, i) => a[i] ?? ''); },
  base() { return GAME_URL; },
  me() { try { return Sala.clean(Juntos.look().n || '') || Sala.clean((typeof Fame !== 'undefined' && Fame.alias()) || '') || ''; } catch (e) { return ''; } },
  url(q) { const de = this.me(); return this.base() + '?' + q + (de ? '&de=' + encodeURIComponent(de) : ''); },
  sageLink(d) { const fr = typeof FRASES !== 'undefined' && FRASES[d.id] && FRASES[d.id][0] ? String(FRASES[d.id][0][0]).replace(/[.。]$/, '') : ''; return { url: this.url('ir=' + d.id), text: this.f(this.T.sageMsg, d.name || d.short, fr || (d.concept && d.concept.name) || d.epithet || '') }; },
  eraLink(i) { const e = ERAS[i]; return { url: this.url('mundo=' + e.id), text: this.f(this.T.eraMsg, e.name, e.place || e.years || '') }; },
  // ---------------------------------------------------------------- hoja para compartir
  sheet(L) {
    let d = document.getElementById('cp'); if (d) d.remove();
    d = document.createElement('div'); d.id = 'cp';
    const box = document.createElement('div'); box.className = 'cp-box'; d.appendChild(box);
    const h = document.createElement('h3'); h.textContent = this.T.title; box.appendChild(h);
    const p = document.createElement('p'); p.className = 'cp-msg'; p.textContent = L.text; box.appendChild(p);
    const u = document.createElement('p'); u.className = 'cp-url'; u.textContent = L.url; box.appendChild(u);
    const hi = document.createElement('p'); hi.className = 'cp-hint'; hi.textContent = this.T.hint + ' ' + this.T.online; box.appendChild(hi);
    const full = L.text + ' ' + L.url;
    const wa = document.createElement('a'); wa.className = 'cp-wa'; wa.href = 'https://wa.me/?text=' + encodeURIComponent(full); wa.target = '_blank'; wa.rel = 'noopener';
    wa.innerHTML = '<svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true"><path fill="#fff" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.4 6.4 0 0 0 1.3 3.4 14.7 14.7 0 0 0 5.7 5c2.1.9 2.9 1 4 .8a3.4 3.4 0 0 0 2.2-1.6 2.8 2.8 0 0 0 .2-1.6c-.1-.2-.3-.3-.6-.4z"/></svg>';
    wa.appendChild(document.createTextNode(this.T.wa)); box.appendChild(wa);
    wa.addEventListener('click', () => { try { Audio.pickup(); } catch (e) { /* nada */ } });
    const row = document.createElement('div'); row.className = 'cp-row'; box.appendChild(row);
    const mk = (t, fn, cls = '') => { const b = document.createElement('button'); b.className = 'cp-b ' + cls; b.textContent = t; b.addEventListener('click', fn); row.appendChild(b); return b; };
    if (navigator.share) mk(this.T.more, () => { navigator.share({ text: L.text, url: L.url }).catch(() => {}); });
    const cb = mk(this.T.copy, () => { const ok = () => { cb.textContent = this.T.copied; }; try { navigator.clipboard.writeText(full).then(ok, () => prompt('', full)); } catch (e) { prompt('', full); } });
    const x = document.createElement('button'); x.className = 'cp-x'; x.textContent = this.T.close; x.addEventListener('click', () => d.remove()); box.appendChild(x);
    d.addEventListener('click', (e) => { if (e.target === d) d.remove(); });
    document.body.appendChild(d);
  },
  // ---------------------------------------------------------------- al llegar con un enlace
  boot() {
    const P = new URLSearchParams(location.search); const ir = (P.get('ir') || '').toLowerCase(), mundo = (P.get('mundo') || '').toLowerCase(); if (!ir && !mundo) return;
    const de = Sala.clean(P.get('de') || '') || '';
    try { P.delete('ir'); P.delete('mundo'); P.delete('de'); const q = P.toString(); history.replaceState(null, '', location.pathname + (q ? '?' + q : '') + location.hash); } catch (e) { /* nada */ }
    let idx = -1, sage = '';
    if (/^[a-z0-9_-]{2,30}$/.test(ir)) { const S = SAGE_BY_ID()[ir]; if (S) { idx = S.idx; sage = ir; } }
    if (idx < 0 && /^[a-z0-9_-]{2,30}$/.test(mundo)) idx = ERAS.findIndex((e) => e.id === mundo);
    if (idx < 0) return;
    this.pend = { sage, de, idx };
    G.travelFrom = 'title'; G.explore = false; travelTo(idx);
  },
  arrive() {
    const P = this.pend; if (!P || G.eraIdx !== P.idx) { this.pend = null; return; } this.pend = null;
    if (!P.sage) { if (P.de) setTimeout(() => toast(this.f(this.T.arrEra, P.de)), 900); return; }
    const s = sages.find((x) => x.data.id === P.sage); if (!s) return;
    const dx = s.pos.x < 0 ? 2.8 : s.pos.x > 0 ? -2.8 : 0, dz = s.pos.x === 0 ? (s.boss ? 4.2 : 2.8) : 0.3;
    const x = s.pos.x + dx, z = s.pos.z + dz; let y = 0; try { const g = groundAt(world, x, z, s.pos.y + 2); y = g ? g.top : 0; } catch (e) { /* nada */ }
    player.pos.set(x, y, z); if (player.vel) player.vel.set(0, 0, 0); player.yaw = Math.atan2(-(s.pos.x - x), -(s.pos.z - z)); if ('pitch' in player) player.pitch = 0;
    setTimeout(() => { toast(P.de ? this.f(this.T.arrSage, P.de, s.data.short) : this.f(this.T.arrSageAnon, s.data.short)); if (s.state === 'sealed') toast('🏛 ' + this.T.boss); }, 900);
  },
};
// después de entrar en la época, si se llegó con un enlace, se coloca al viajero frente al pensador
{ const e0 = enterEra; enterEra = function () { const was = G.state; e0(); if (was === 'intro' && G.state === 'play' && Ir.pend) Ir.arrive(); }; }
// botón en la conversación con un pensador (justo antes de «Adiós»)
{
  const o0 = Talk.options;
  Talk.options = function () {
    o0.call(this);
    if (this.npc || !this.data) return;
    const box = $('#tk-ops'); if (!box) return; const d = this.data;
    const b = document.createElement('button'); b.className = 'tk-op share'; b.textContent = Ir.T.btnSage; b.addEventListener('click', () => { Audio.click(); Ir.sheet(Ir.sageLink(d)); });
    const bye = box.querySelector('.tk-op.bye'); if (bye) box.insertBefore(b, bye); else box.appendChild(b);
  };
}
// botón en la pausa
{
  const btns = document.querySelector('#pause .btns'); const q = document.getElementById('b-quit');
  if (btns) { const b = document.createElement('button'); b.className = 'btn'; b.id = 'b-pshare'; b.textContent = Ir.T.btnEra; b.addEventListener('click', () => { Audio.click(); Ir.sheet(Ir.eraLink(G.eraIdx)); }); btns.insertBefore(b, q || null); }
}
// estilos de la hoja para compartir
{
  const st = document.createElement('style');
  st.textContent = '#cp{position:fixed;inset:0;z-index:9000;background:rgba(8,6,3,.78);display:grid;place-items:center;padding:16px}'
    + '#cp .cp-box{width:min(440px,100%);box-sizing:border-box;background:linear-gradient(160deg,#2c1f10,#160f08);border:1.5px solid var(--gold,#d8b25a);border-radius:18px;padding:20px;color:#f6ead2;box-shadow:0 12px 40px #000c;text-align:center}'
    + '#cp h3{margin:0 0 10px;color:var(--gold-bright,#ffd36a);font-family:var(--display,Georgia);font-weight:normal;letter-spacing:.06em}'
    + '#cp .cp-msg{margin:0 0 8px;line-height:1.4;font-size:1rem}#cp .cp-url{margin:0 0 10px;font-size:.8rem;color:#e9c77a;word-break:break-all;background:#0005;border-radius:8px;padding:6px 8px}'
    + '#cp .cp-hint{margin:0 0 14px;font-size:.85rem;opacity:.85}'
    + '#cp .cp-wa{display:flex;align-items:center;justify-content:center;gap:10px;background:#25d366;color:#fff;font:700 1.1rem system-ui,sans-serif;padding:14px;border-radius:14px;text-decoration:none;box-shadow:0 4px 16px rgba(37,211,102,.35)}'
    + '#cp .cp-row{display:flex;gap:8px;margin-top:10px}#cp .cp-b{flex:1;padding:11px 8px;border-radius:12px;border:1px solid var(--line,#6a5530);background:rgba(255,255,255,.07);color:#f6ead2;font:inherit;cursor:pointer}'
    + '#cp .cp-x{margin-top:12px;background:none;border:0;color:#bfae8e;text-decoration:underline;font:inherit;cursor:pointer}'
    + '#tk-ops .tk-op.share{border-color:#25d366;color:#bff5d4}';
  document.head.appendChild(st);
}
