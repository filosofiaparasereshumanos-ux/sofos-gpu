// ============================================================================
//  CUENTAS «a la antigua»: usuario y contraseña (Supabase, tabla odisea_viajeros).
//  El camino de cada jugador se guarda en su cuenta y se recupera en cualquier aparato.
//  Solo en la versión web (dominio propio); en Claude el botón no aparece.
//  La base de datos se prepara con tools/cuentas.sql.
// ============================================================================
const CUENTA_CFG = {
  url: 'https://xmslbqzmztcaoddchzsz.supabase.co',
  key: 'sb_publishable_5yoU56-AIWpkIelBPgeqPw_ydkMGEdk', // clave pública: las funciones de la base protegen los datos
};
const CUENTA_KEY = 'odisea-cuenta'; // sesión de este aparato (no se sincroniza)
const Cuenta = {
  ses: null, timer: null, busy: false, mode: 'nueva',
  on() { return !!(CUENTA_CFG.url && CUENTA_CFG.key) && typeof AppInstall !== 'undefined' && AppInstall.web; },
  async rpc(fn, args) {
    const r = await fetch(CUENTA_CFG.url + '/rest/v1/rpc/' + fn, { method: 'POST', headers: { apikey: CUENTA_CFG.key, Authorization: 'Bearer ' + CUENTA_CFG.key, 'Content-Type': 'application/json' }, body: JSON.stringify(args) });
    const txt = await r.text(); let j = null; try { j = txt ? JSON.parse(txt) : null; } catch (e) { /* nada */ }
    if (!r.ok) { const m = (j && (j.message || j.hint)) || txt || r.status; throw new Error(String(m)); }
    return j;
  },
  // todo lo que el juego guarda empieza por «odisea-razon.»
  snapshot() {
    const d = {};
    for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith('odisea-razon.') && k !== 'odisea-razon.settings') d[k] = localStorage.getItem(k); }
    return d;
  },
  weight(d) { // cuánto camino hay en una copia, para no pisar la buena con una vacía
    const j = (k, def) => { try { return JSON.parse(d[k]) ?? def; } catch (e) { return def; } };
    const sv = j('odisea-razon.save', {}) || {}; const cx = j('odisea-razon.codex', []) || [];
    return cx.length * 1000 + (sv.eraIdx || 0) * 100 + (sv.beaten || []).length * 10 + Math.min(9, Math.floor((sv.score || 0) / 1000));
  },
  init() {
    if (!this.on()) return;
    $('#b-login').hidden = false;
    try { this.ses = JSON.parse(localStorage.getItem(CUENTA_KEY) || 'null'); } catch (e) { this.ses = null; }
    this.paint();
    if (this.ses) this.rpc('odisea_cargar', { p_usuario: this.ses.usuario, p_token: this.ses.token }).then((d) => { if (d === null) this.forget('Tu sesión terminó. Vuelve a entrar.'); }).catch(() => {});
  },
  paint() {
    const u = this.ses && this.ses.usuario;
    $('#b-login').textContent = u ? 'Mi cuenta · ' + u : 'Crear cuenta / Entrar';
    $('#ct-out').hidden = !!u; $('#ct-in').hidden = !u; if (u) $('#ct-who').textContent = u;
  },
  setMode(m) {
    this.mode = m; document.querySelectorAll('#ct-tabs button').forEach((b) => b.classList.toggle('on', b.dataset.v === m));
    $('#ct-pass2').hidden = m !== 'nueva'; $('#ct-go').textContent = m === 'nueva' ? 'Crear mi cuenta' : 'Entrar';
    $('#ct-pass').autocomplete = m === 'nueva' ? 'new-password' : 'current-password'; this.msg('');
  },
  errText(e) {
    const m = String(e && e.message || e);
    if (/usuario_ocupado/.test(m)) return 'Ese nombre de usuario ya existe. Elige otro o entra con él.';
    if (/usuario_invalido/.test(m)) return 'El usuario debe tener entre 3 y 24 letras o números, sin espacios.';
    if (/clave_corta/.test(m)) return 'La contraseña debe tener al menos 6 caracteres.';
    if (/datos_incorrectos/.test(m)) return 'Usuario o contraseña incorrectos.';
    if (/PGRST202|Could not find the function/.test(m)) return 'Las cuentas aún se están preparando. Inténtalo más tarde; mientras, tu camino se guarda en este aparato.';
    if (/Failed to fetch|NetworkError|Load failed/i.test(m)) return 'Sin conexión. Inténtalo otra vez en un momento.';
    return 'No se pudo completar: ' + m;
  },
  async go() {
    const u = $('#ct-user').value.trim().toLowerCase(), p = $('#ct-pass').value;
    if (!/^[a-z0-9_.ñáéíóúü-]{3,24}$/.test(u)) return this.msg('El usuario debe tener entre 3 y 24 letras o números, sin espacios.');
    if (p.length < 6) return this.msg('La contraseña debe tener al menos 6 caracteres.');
    if (this.mode === 'nueva' && p !== $('#ct-pass2').value) return this.msg('Las dos contraseñas no coinciden.');
    this.msg(this.mode === 'nueva' ? 'Creando tu cuenta…' : 'Entrando…'); $('#ct-go').disabled = true;
    try {
      const r = await this.rpc(this.mode === 'nueva' ? 'odisea_registrar' : 'odisea_entrar', { p_usuario: u, p_clave: p });
      this.ses = { usuario: r.usuario, token: r.token }; localStorage.setItem(CUENTA_KEY, JSON.stringify(this.ses));
      $('#ct-pass').value = ''; $('#ct-pass2').value = ''; this.paint();
      await this.merge(r.datos || {});
    } catch (e) { this.msg(this.errText(e)); }
    $('#ct-go').disabled = false;
  },
  // al entrar: si la cuenta tiene más camino que este aparato, se recupera; si no, se sube
  async merge(remote) {
    const local = this.snapshot();
    if (this.weight(remote) > this.weight(local)) {
      for (const k of Object.keys(local)) localStorage.removeItem(k);
      for (const [k, v] of Object.entries(remote)) if (k.startsWith('odisea-razon.')) localStorage.setItem(k, v);
      this.msg('Recuperamos tu odisea. Cargando…'); setTimeout(() => location.reload(), 900);
    } else { await this.push(); this.msg('¡Listo! Tu camino se guarda en tu cuenta.'); }
  },
  async push() {
    if (!this.ses || this.busy) return; this.busy = true;
    const d = this.snapshot(); let sv = {}; try { sv = JSON.parse(d['odisea-razon.save'] || '{}') || {}; } catch (e) { /* nada */ }
    try {
      const ok = await this.rpc('odisea_guardar', { p_usuario: this.ses.usuario, p_token: this.ses.token, p_datos: d, p_sabiduria: sv.score || 0 });
      if (ok === false) this.forget('Tu sesión terminó. Vuelve a entrar para seguir guardando.');
      else $('#ct-state').textContent = 'Última copia en tu cuenta: ' + new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }) + '.';
    } catch (e) { $('#ct-state').textContent = 'No se pudo guardar ahora; se intentará otra vez.'; }
    this.busy = false;
  },
  forget(m) { this.ses = null; try { localStorage.removeItem(CUENTA_KEY); } catch (e) { /* nada */ } this.paint(); if (m) this.msg(m); },
  dirty() { if (!this.ses) return; clearTimeout(this.timer); this.timer = setTimeout(() => this.push(), 3000); },
  msg(t) { $('#ct-msg').textContent = t; },
};
// cada vez que el juego guarda algo, se programa una copia en la cuenta
{ const set0 = store.set.bind(store); store.set = (k, v) => { set0(k, v); if (String(k).startsWith('odisea-razon.')) Cuenta.dirty(); }; }
document.addEventListener('visibilitychange', () => { if (document.hidden && Cuenta.timer) { clearTimeout(Cuenta.timer); Cuenta.timer = null; Cuenta.push(); } });
on('#b-login', () => { Cuenta.msg(''); show('cuenta'); });
document.querySelectorAll('#ct-tabs button').forEach((b) => b.addEventListener('click', () => { Audio.click(); Cuenta.setMode(b.dataset.v); }));
on('#ct-go', () => Cuenta.go());
['#ct-user', '#ct-pass', '#ct-pass2'].forEach((s) => $(s).addEventListener('keydown', (e) => { if (e.key === 'Enter') Cuenta.go(); }));
on('#ct-sync', () => Cuenta.push());
on('#ct-logout', async () => { const s = Cuenta.ses; Cuenta.forget('Sesión cerrada. Tu camino sigue guardado en tu cuenta y en este aparato.'); if (s) Cuenta.rpc('odisea_salir', { p_usuario: s.usuario, p_token: s.token }).catch(() => {}); });
Cuenta.init();
