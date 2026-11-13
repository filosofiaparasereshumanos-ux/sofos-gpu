// ============================================================================
//  MUNDOS SAGRADOS (la Biblia y el Corán)
//  · Aquí no se vence a nadie: el debate se convierte en «Pon a prueba lo que
//    aprendiste», el pensador queda «✓ Comprendido» y no hay burlas, apuestas,
//    dilemas, revanchas, golpes críticos ni coronas de victoria.
//  · Estaciones sin figura (aniconic): por respeto a la tradición islámica, en el
//    jardín del Corán no se representa a ningún profeta: cada estación es un atril
//    con un libro abierto y su medallón geométrico flotando encima.
// ============================================================================
const SACRED_TXT = {
  ok: ['Así es.', 'Correcto.', 'Bien aprendido.', 'Lo has comprendido.'],
  no: ['No es así. Vuelve a pensarlo con calma.', 'Repasa la historia y vuelve a intentarlo.', 'Casi: escucha otra vez.'],
  test: 'Pon a prueba lo que aprendiste', qn: 'Pregunta', comp: 'Comprensión', conv: 'Convicción', done: 'Comprendido', nextQ: 'Siguiente pregunta', finish: 'Completar',
};
const isSacred = () => !!(ERAS[G.eraIdx] && ERAS[G.eraIdx].sacred);
// ---------- conversación: la invitación al debate cambia de nombre
{
  const o0 = Talk.options;
  Talk.options = function () {
    o0.call(this);
    if (!isSacred()) return;
    for (const b of document.querySelectorAll('#tk-ops button')) if (/desaf|challenge/i.test(b.textContent)) b.textContent = SACRED_TXT.test;
  };
}
// ---------- el duelo, en modo comprensión
{
  const start0 = Duel.start.bind(Duel), ask0 = Duel.ask.bind(Duel), answer0 = Duel.answer.bind(Duel), next0 = Duel.next.bind(Duel), crit0 = Debate.crit.bind(Debate);
  Duel.start = function (s) {
    const sac = isSacred(); $('#duel').classList.toggle('sacred', sac);
    const lbl = document.querySelector('#duel .conv .lbl'); if (lbl) lbl.textContent = sac ? SACRED_TXT.comp : SACRED_TXT.conv;
    if (sac) { const R = Debate.rivals(); if (R[s.data.id]) { delete R[s.data.id]; store.set(DEB_RIVAL_KEY, R); } s._betAsked = true; s._dilDone = true; s._rivalSaid = true; }
    start0(s);
  };
  Duel.ask = function () { if (isSacred() && this.sage) { this.sage._betAsked = true; this.sage._dilDone = true; } ask0(); if (isSacred()) { const q = $('#d-qnum'); q.textContent = q.textContent.replace(/^[^·]*/, SACRED_TXT.qn + ' ' + (ROMAN[this.round - 1] || this.round) + ' '); } };
  Duel.answer = function (i) {
    const sac = isSacred(); const was = this.answered;
    answer0(i);
    if (!sac || was || !this.answered || !this.sage) return;
    const ok = i >= 0 && this.opts[i] && this.opts[i].ok; const s = this.sage;
    Debate.speak(pick(ok ? SACRED_TXT.ok : SACRED_TXT.no), Math.random() < 0.5 ? Debate.quote(s.data.id) : null);
    $('#d-next').textContent = G.hp <= 0 ? $('#d-next').textContent : s.conv <= 0 ? SACRED_TXT.finish : SACRED_TXT.nextQ;
  };
  Duel.next = function () {
    const s = this.sage; const sac = isSacred() && s && G.hp <= 0;
    next0();
    if (sac) { const R = Debate.rivals(); if (R[s.data.id]) { delete R[s.data.id]; store.set(DEB_RIVAL_KEY, R); } }
  };
  Debate.crit = function () { if (isSacred()) return; crit0(); };
}
// ---------- al comprender: letrero «Comprendido», sin corona de victoria
{
  const d0 = Sage.prototype.defeat;
  Sage.prototype.defeat = function () {
    d0.call(this);
    if (!(ERAS[G.eraIdx] && ERAS[G.eraIdx].sacred)) return;
    this.label.material.map = labelTexture(this.data.short, '✓ ' + SACRED_TXT.done + ' · ' + this.data.concept.name, '#ffe8b0'); this.label.material.needsUpdate = true;
    if (this._crown) this._crown.visible = false;
  };
}
// ---------- estaciones sin figura: atril, libro abierto y medallón geométrico
{
  const u0 = Sage.prototype.update;
  Sage.prototype.update = function (...a) {
    if (this.data.aniconic && !this._anic) {
      this._anic = true; this.fig.group.visible = false;
      const g = new THREE.Group(); this.group.add(g); this._orn = g;
      const wood = std(0x6a4a2a, { roughness: 0.8 }), gold = std(0xd8a838, { metalness: 0.7, roughness: 0.3 });
      g.add(mesh(new THREE.CylinderGeometry(0.12, 0.2, 1.1, 8), wood, 0, 0.55, 0));
      const top = mesh(new THREE.BoxGeometry(0.9, 0.06, 0.6), wood, 0, 1.15, 0); top.rotation.x = -0.35; g.add(top);
      for (const sx of [-1, 1]) { const p = mesh(new THREE.BoxGeometry(0.4, 0.02, 0.5), std(0xf4ecd8, { roughness: 0.7 }), sx * 0.21, 1.2, 0.02); p.rotation.set(-0.35, 0, sx * -0.08); g.add(p); }
      g.add(mesh(new THREE.CylinderGeometry(0.45, 0.55, 0.12, 16), gold, 0, 0.06, 0));
      // el medallón de la sura flota y gira despacio sobre el atril
      const tex = new THREE.TextureLoader().load(ART.portrait(this.data.id)); tex.colorSpace = THREE.SRGBColorSpace;
      const med = new THREE.Mesh(new THREE.CircleGeometry(0.62, 40), new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide, toneMapped: false }));
      med.position.y = 2.15; g.add(med); this._med = med;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.035, 8, 48), gold); ring.position.y = 2.15; g.add(ring); this._ring = ring;
      const light = new THREE.PointLight(0xffd8a0, 3, 6, 1.6); light.position.y = 2.2; g.add(light);
    }
    u0.apply(this, a);
    if (this._med) { const t = performance.now() / 1000; this._med.position.y = this._ring.position.y = 2.15 + Math.sin(t * 1.2 + this.idx) * 0.06; this._med.rotation.y = this._ring.rotation.y = Math.sin(t * 0.5 + this.idx) * 0.5; }
  };
}
