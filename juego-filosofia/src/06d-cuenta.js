// ============================================================================
//  CUENTAS (Supabase): inicio de sesión con Google o enlace por correo, y el camino
//  de cada jugador guardado en su cuenta para seguir en cualquier aparato.
//  Solo en la versión web (dominio propio); en Claude el botón no aparece.
// ============================================================================
const CUENTA_CFG = {
  url: 'https://xmslbqzmztcaoddchzsz.supabase.co',
  key: 'sb_publishable_5yoU56-AIWpkIelBPgeqPw_ydkMGEdk', // clave pública «anon» del proyecto (es pública: la protegen las reglas RLS)
};
const Cuenta = {
  sb: null, user: null, timer: null, busy: false,
  on() { return !!(CUENTA_CFG.url && CUENTA_CFG.key) && typeof AppInstall !== 'undefined' && AppInstall.web; },
  // todo lo que el juego guarda empieza por «odisea-razon.»
  snapshot() {
    const d = {};
    for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith('odisea-razon.') && k !== 'odisea-razon.settings') d[k] = localStorage.getItem(k); }
    return d;
  },
  weight(d) { // cuánto camino hay en una copia: para no pisar la buena con una vacía
    const j = (k, def) => { try { return JSON.parse(d[k]) ?? def; } catch (e) { return def; } };
    const sv = j('odisea-razon.save', {}) || {}; const cx = j('odisea-razon.codex', []) || [];
    return cx.length * 1000 + (sv.eraIdx || 0) * 100 + (sv.beaten || []).length * 10 + Math.min(9, Math.floor((sv.score || 0) / 1000));
  },
  async init() {
    if (!this.on()) return;
    $('#b-login').hidden = false;
    try {
      const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/+esm');
      this.sb = createClient(CUENTA_CFG.url, CUENTA_CFG.key, { auth: { persistSession: true, detectSessionInUrl: true, flowType: 'pkce' } });
      this.sb.auth.onAuthStateChange((ev, s) => this.setUser(s ? s.user : null, ev));
      const { data } = await this.sb.auth.getSession(); this.setUser(data.session ? data.session.user : null, 'INITIAL');
    } catch (e) { $('#b-login').hidden = true; }
  },
  name(u) { const m = (u && u.user_metadata) || {}; return m.full_name || m.name || (u && u.email) || 'viajero'; },
  async setUser(u, ev) {
    const had = this.user && u && this.user.id === u.id; this.user = u;
    $('#b-login').textContent = u ? 'Mi cuenta · ' + this.name(u).split(' ')[0] : 'Iniciar sesión';
    $('#ct-out').hidden = !!u; $('#ct-in').hidden = !u; if (u) $('#ct-who').textContent = this.name(u);
    if (u && !had) await this.pull();
  },
  // al entrar: si la cuenta tiene más camino que este aparato, se recupera; si no, se sube
  async pull() {
    if (!this.sb || !this.user) return;
    const { data, error } = await this.sb.from('progreso').select('datos').eq('user_id', this.user.id).maybeSingle();
    if (error) { this.msg('No se pudo leer tu cuenta. Tu camino sigue guardado en este aparato.'); return; }
    const local = this.snapshot(), remote = (data && data.datos) || {};
    if (this.weight(remote) > this.weight(local)) {
      for (const k of Object.keys(local)) localStorage.removeItem(k);
      for (const [k, v] of Object.entries(remote)) if (k.startsWith('odisea-razon.')) localStorage.setItem(k, v);
      this.msg('Recuperamos tu odisea desde tu cuenta.'); setTimeout(() => location.reload(), 900);
    } else { await this.push(); this.msg('Tu camino quedó guardado en tu cuenta.'); }
  },
  async push() {
    if (!this.sb || !this.user || this.busy) return; this.busy = true;
    const d = this.snapshot(); let sv = {}; try { sv = JSON.parse(d['odisea-razon.save'] || '{}') || {}; } catch (e) { /* nada */ }
    const { error } = await this.sb.from('progreso').upsert({ user_id: this.user.id, nombre: this.name(this.user), datos: d, sabiduria: sv.score || 0, actualizado: new Date().toISOString() });
    this.busy = false;
    $('#ct-state').textContent = error ? 'No se pudo guardar ahora; se intentará otra vez.' : 'Última copia en tu cuenta: ' + new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }) + '.';
  },
  dirty() { if (!this.user) return; clearTimeout(this.timer); this.timer = setTimeout(() => this.push(), 4000); },
  msg(t) { $('#ct-msg').textContent = t; },
};
// cada vez que el juego guarda algo, se programa una copia en la cuenta
{ const set0 = store.set.bind(store); store.set = (k, v) => { set0(k, v); if (String(k).startsWith('odisea-razon.')) Cuenta.dirty(); }; }
window.addEventListener('pagehide', () => { if (Cuenta.timer) { clearTimeout(Cuenta.timer); Cuenta.push(); } });
on('#b-login', () => { Cuenta.msg(''); show('cuenta'); });
on('#ct-google', async () => {
  if (!Cuenta.sb) return; Cuenta.msg('Abriendo Google…');
  const { error } = await Cuenta.sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: location.href.split('#')[0] } });
  if (error) Cuenta.msg('No se pudo abrir Google: ' + error.message);
});
on('#ct-send', async () => {
  const mail = $('#ct-mail').value.trim(); if (!/^\S+@\S+\.\S+$/.test(mail)) return Cuenta.msg('Escribe un correo válido.');
  if (!Cuenta.sb) return; Cuenta.msg('Enviando…');
  const { error } = await Cuenta.sb.auth.signInWithOtp({ email: mail, options: { emailRedirectTo: location.href.split('#')[0] } });
  Cuenta.msg(error ? 'No se pudo enviar: ' + error.message : 'Listo. Abre el enlace que te llegó a ' + mail + ' en este mismo aparato.');
});
on('#ct-sync', () => Cuenta.push());
on('#ct-logout', async () => { if (Cuenta.sb) await Cuenta.sb.auth.signOut(); Cuenta.msg('Sesión cerrada. Tu camino sigue guardado en este aparato.'); });
Cuenta.init();
