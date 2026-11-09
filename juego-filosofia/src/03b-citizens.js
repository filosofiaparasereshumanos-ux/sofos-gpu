// ============================================================================
//  CIUDADANOS: gente de cada época que pasea por la plaza y conversa contigo
// ============================================================================
const NPC_KEY = 'odisea-razon.ciudadanos';
const npcHeard = (id) => (store.get(NPC_KEY, {})[id] || 0);
const npcDone = (n) => npcHeard(n.id) >= n.lines.length;
class Citizen {
  constructor(world, npc) {
    this.npc = npc; this.data = { id: npc.id, short: npc.name }; this.boss = false; this.isCitizen = true;
    this.fig = buildFigure(npc.look, 0xffffff); this.fig.halo.visible = false;
    this.scale = npc.female ? 0.94 : 1; this.fig.group.scale.setScalar(this.scale);
    this.a = new THREE.Vector3(npc.at[0], 0.02, npc.at[1]);
    this.b = new THREE.Vector3(npc.at[0] + npc.path[0], 0.02, npc.at[1] + npc.path[1]);
    this.len = Math.max(0.1, this.a.distanceTo(this.b));
    this.k = Math.random(); this.dir = Math.random() < 0.5 ? 1 : -1; this.wait = Math.random() * 3;
    this.group = new THREE.Group(); this.group.add(this.fig.group); this.group.position.lerpVectors(this.a, this.b, this.k);
    this.yaw = Math.atan2(this.b.x - this.a.x, this.b.z - this.a.z) * (this.dir > 0 ? 1 : -1); this.group.rotation.y = this.yaw;
    this.label = new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true, depthWrite: false, toneMapped: false }));
    this.label.scale.set(2.1, 0.52, 1); this.label.position.y = 2.55; this.group.add(this.label); this.relabel();
    world.group.add(this.group);
    this.t = Math.random() * 10; this.gesture = 0; this.radius = 0.55; this.walking = 0;
  }
  get pos() { return this.group.position; }
  relabel() {
    const done = npcDone(this.npc);
    this.label.material.map = labelTexture(this.npc.name, (done ? '✓ ' : '') + this.npc.role, done ? '#cfd8e0' : '#ffe3a3'); this.label.material.needsUpdate = true;
  }
  update(dt, player, talking) {
    this.t += dt; const f = this.fig;
    const dx = player.pos.x - this.pos.x, dz = player.pos.z - this.pos.z; const d = Math.hypot(dx, dz);
    let want = this.yaw, moving = false;
    if (talking || d < 3.6 || (this.npc.greeter && d < 22)) { want = Math.atan2(dx, dz); this.wait = Math.max(this.wait, 1.5); }
    else if (this.npc.greeter) { /* el guía espera quieto */ }
    else if (this.wait > 0) this.wait -= dt;
    else {
      this.k += this.dir * 1.05 * dt / this.len;
      if (this.k >= 1 || this.k <= 0) { this.k = clamp(this.k, 0, 1); this.dir *= -1; this.wait = 2 + Math.random() * 4; }
      this.group.position.lerpVectors(this.a, this.b, this.k);
      want = Math.atan2((this.b.x - this.a.x) * this.dir, (this.b.z - this.a.z) * this.dir); moving = true;
    }
    let diff = want - this.yaw; while (diff > Math.PI) diff -= TAU; while (diff < -Math.PI) diff += TAU;
    this.yaw += diff * Math.min(1, dt * 4); this.group.rotation.y = this.yaw;
    this.walking = damp(this.walking, moving ? 1 : 0, 6, dt);
    const w = this.walking, ph = this.t * 7.5;
    f.group.position.y = Math.abs(Math.sin(ph)) * 0.05 * w;
    f.body.rotation.z = Math.sin(ph) * 0.03 * w;
    this.gesture = Math.max(0, this.gesture - dt);
    const g = this.gesture > 0 ? Math.sin((1 - this.gesture) * Math.PI) : 0;
    f.armR.rotation.x = Math.sin(ph) * 0.45 * w - g * 1.3 - 0.1;
    f.armL.rotation.x = -Math.sin(ph) * 0.45 * w - 0.05;
    f.head.rotation.y = damp(f.head.rotation.y, d < 6 && !moving ? 0 : Math.sin(this.t * 0.4) * 0.3, 3, dt);
    f.head.rotation.x = Math.sin(this.t * 0.8) * 0.04;
    this.label.visible = !talking && d > 3 && d < 26;
  }
}
