// ============================================================================
//  ESTADÍSTICAS ANÓNIMAS
//  Solo contadores por día: cuántas veces se entra en cada época, cuántos debates
//  se ganan o se pierden en ella, cuántos completan la guía inicial… Sin ningún
//  identificador del jugador, sin apodos ni respuestas: no se puede saber quién
//  hizo qué. Sirven para ver dónde se atasca la gente y mejorar esas partes.
//  Se envían agrupados cada minuto. Se pueden desactivar en Ajustes y respetan
//  «No rastrear» del navegador. Sin la función en Supabase (tools/cuentas4.sql)
//  no hacen nada.
// ============================================================================
const Metricas = {
  q: new Map(), off: false,
  ok() { return !this.off && G.settings.metricas !== false && typeof CUENTA_CFG !== 'undefined' && location.protocol === 'https:'; },
  hit(ev, era) {
    if (G.settings.metricas === false) return;
    const e = String(era == null ? (world ? ERAS[world.idx].id : '') : era); const k = ev + '|' + e; this.q.set(k, (this.q.get(k) || 0) + 1);
    if (this.q.size > 40) this.flush();
  },
  flush(beacon) {
    if (!this.q.size) return; if (!this.ok()) { this.q.clear(); return; }
    const lote = [...this.q].map(([k, n]) => { const [e, era] = k.split('|'); return { e, era, n }; }); this.q.clear();
    try {
      fetch(CUENTA_CFG.url + '/rest/v1/rpc/odisea_metricas_sumar', { method: 'POST', keepalive: !!beacon, headers: { apikey: CUENTA_CFG.key, Authorization: 'Bearer ' + CUENTA_CFG.key, 'Content-Type': 'application/json' }, body: JSON.stringify({ p_lote: lote }) })
        .then((r) => { if (r.status === 404) this.off = true; }).catch(() => {});
    } catch (e) { /* sin red */ }
  },
};
setInterval(() => Metricas.flush(), 60000);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') Metricas.flush(true); });
// qué se cuenta
Metricas.hit('sesion', '');
{
  const e0 = enterEra; enterEra = function () { const was = G.state; e0(); if (was === 'intro' && G.state === 'play') Metricas.hit('entra'); };
  const w0 = Duel.win.bind(Duel); Duel.win = function () { const s = this.sage; w0(); if (s) Metricas.hit(s.boss ? 'maestro' : 'vence'); };
  const g0 = gameOver; gameOver = function () { g0(); Metricas.hit('derrota'); };
  const a0 = Duel.answer.bind(Duel); Duel.answer = function (i) { const was = this.answered; a0(i); if (!was && this.answered && !this._oracle) Metricas.hit(i < 0 ? 'tiempo' : this.opts[i] && this.opts[i].ok ? 'acierto' : 'fallo'); };
  const f0 = Guia.finish.bind(Guia); Guia.finish = function (win) { if (Guia.step >= 0) Metricas.hit(win ? 'guia_fin' : 'guia_salta', ''); f0(win); };
  const p0 = enterPortal; enterPortal = function () { Metricas.hit('portal'); p0(); };
  if (typeof Trivia !== 'undefined' && Trivia.start) { const t0 = Trivia.start.bind(Trivia); Trivia.start = function () { Metricas.hit('torneo', ''); return t0(); }; }
}
if (location.hash === '#debug') window.__metricas = Metricas;
