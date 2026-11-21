// ============================================================================
//  LOS PENSADORES PASEAN
//  Mientras nadie se les acerca, los filósofos no se quedan quietos: bajan de su
//  tarima, dan unos pasos pensativos por el camino, se detienen a mirar algo y
//  vuelven. Cuando el jugador se acerca, se paran y lo miran. El maestro de la
//  época espera en su sitio.
// ============================================================================
const Paseo = {
  NEAR: 7.5, SPEED: 0.75,
  pick(s) {
    const h = s.st.pos, side = Math.sign(h.x) || 1;
    if (Math.hypot(s.pos.x - h.x, s.pos.z - h.z) > 1 && Math.random() < 0.45) return { x: h.x, z: h.z }; // vuelve a su tarima
    return { x: h.x - side * (0.8 + Math.random() * 3.2), z: clamp(h.z + (Math.random() * 2 - 1) * 3.4, ARENA.z0 + 2, ARENA.z1 - 2) };
  },
  step(s, dt, player, inDuel, y0) {
    if (s.boss || inDuel || !s.group.visible || !s.fig.group.visible || (s.state !== 'idle' && s.state !== 'defeated')) { s._walk = 0; return; }
    const f = s.fig, d = Math.hypot(player.pos.x - s.pos.x, player.pos.z - s.pos.z);
    const free = G.state === 'play' && d > this.NEAR;
    let moving = false;
    if (free) {
      if (s._wait == null) s._wait = 0.5 + Math.random() * 3;
      if (!s._wt) { s._wait -= dt; if (s._wait <= 0) s._wt = this.pick(s); }
      else {
        const dx = s._wt.x - s.pos.x, dz = s._wt.z - s.pos.z, L = Math.hypot(dx, dz);
        if (L < 0.15) { s._wt = null; s._wait = 2 + Math.random() * 5; }
        else {
          s.yaw = y0;
          const v = Math.min(L, this.SPEED * dt); s.pos.x += (dx / L) * v; s.pos.z += (dz / L) * v; moving = true;
          const want = Math.atan2(dx, dz); let df = want - s.yaw; while (df > Math.PI) df -= TAU; while (df < -Math.PI) df += TAU;
          s.yaw += df * Math.min(1, dt * 4); s.group.rotation.y = s.yaw;
        }
      }
    }
    // sobre la tarima o en el suelo
    const r = Math.hypot(s.pos.x - s.st.pos.x, s.pos.z - s.st.pos.z);
    s.pos.y = damp(s.pos.y, r < 2.5 ? 0.14 : 0, 10, dt);
    s._walk = damp(s._walk || 0, moving ? 1 : 0, 6, dt);
    const w = s._walk; if (w > 0.01) { const ph = s.t * 6.5; f.group.position.y += Math.abs(Math.sin(ph)) * 0.05 * w; f.body.rotation.z = Math.sin(ph) * 0.03 * w; f.armR.rotation.x += Math.sin(ph) * 0.35 * w; f.armL.rotation.x -= Math.sin(ph) * 0.35 * w; f.head.rotation.x += 0.12 * w; }
    else f.body.rotation.z = 0;
  },
};
{
  const u0 = Sage.prototype.update;
  Sage.prototype.update = function (dt, t, player, inDuel) { const y0 = this.yaw; u0.call(this, dt, t, player, inDuel); try { Paseo.step(this, dt, player, inDuel, y0); } catch (e) { if (!Paseo._err) { Paseo._err = true; console.warn('paseo', e); } } };
}
