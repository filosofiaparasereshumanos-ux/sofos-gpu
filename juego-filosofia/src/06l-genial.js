// ============================================================================
//  TARJETA DE PERFIL, ÁGORA DEL DÍA Y MODO FOTO
//  · Perfil: una imagen para compartir con los pensadores a los que te pareces.
//  · Ágora: una estela en cada época con la pregunta del día; cada viajero vota
//    y ve cuántos piensan como él. Con el SQL de tools/cuentas3.sql los votos del
//    día se guardan y aparecen las siluetas de quienes pasaron antes.
//  · Foto: una imagen de tu avatar junto al pensador más cercano.
// ============================================================================
const Share = {
  logo: null,
  async loadLogo() { if (!this.logo) this.logo = await this.img('img/logo-fpsh.png'); return this.logo; },
  img(src) { return new Promise((res) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src; }); },
  url() { return GAME_URL.replace(/^https?:\/\//, '').replace(/\/$/, ''); },
  async send(canvas, fname, text, okMsg) {
    const blob = await new Promise((r) => canvas.toBlob(r, 'image/jpeg', 0.9));
    try { const f = new File([blob], fname, { type: 'image/jpeg' }); if (IS_TOUCH && navigator.canShare && navigator.canShare({ files: [f] })) { await navigator.share({ files: [f], text }); return; } } catch (e) { if (e && e.name === 'AbortError') return; }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = fname; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    toast(okMsg);
  },
  // pie común: logo, nombre del juego y dirección
  foot(x, W, y, logo) {
    const disp = '"Marcellus SC", "Marcellus", Georgia, serif', body = '"EB Garamond", Georgia, serif';
    if (logo) { const h = 86, w = (logo.width / logo.height) * h; x.fillStyle = '#16120c'; x.beginPath(); x.arc(70 + 52, y, 56, 0, Math.PI * 2); x.fill(); x.strokeStyle = '#d8b25a'; x.lineWidth = 3; x.stroke(); x.drawImage(logo, 122 - w / 2, y - h / 2, w, h); }
    x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = '#ffe9b0'; x.font = `44px ${disp}`; x.fillText('Odisea de la Razón', 200, y - 6);
    x.fillStyle = 'rgba(243,230,196,0.85)'; x.font = `30px ${body}`; x.fillText('Juega gratis · ' + this.url(), 200, y + 36);
  },
};

// ---------------------------------------------------------------- tarjeta «Mi perfil filosófico»
const Perfil = {
  async draw() {
    const ejes = Mapa.calc(); const af = Mapa.afinidades(ejes);
    const W = 1080, H = 1350; const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d');
    try { await document.fonts.ready; } catch (e) { /* nada */ }
    const disp = '"Marcellus SC", "Marcellus", Georgia, serif', body = '"EB Garamond", Georgia, serif';
    const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#1a1730'); g.addColorStop(0.55, '#141222'); g.addColorStop(1, '#0c0a12'); x.fillStyle = g; x.fillRect(0, 0, W, H);
    const halo = x.createRadialGradient(W / 2, 430, 40, W / 2, 430, 620); halo.addColorStop(0, 'rgba(216,178,90,0.28)'); halo.addColorStop(1, 'rgba(216,178,90,0)'); x.fillStyle = halo; x.fillRect(0, 0, W, H);
    x.strokeStyle = '#d8b25a'; x.lineWidth = 4; x.strokeRect(28, 28, W - 56, H - 56); x.strokeStyle = 'rgba(216,178,90,0.45)'; x.lineWidth = 1.5; x.strokeRect(42, 42, W - 84, H - 84);
    x.textAlign = 'center'; x.textBaseline = 'alphabetic';
    x.fillStyle = '#d8b25a'; x.font = `30px ${disp}`; x.fillText('MI PERFIL FILOSÓFICO', W / 2, 112);
    const top = af.con[0];
    x.fillStyle = '#fff3d0'; x.font = `74px ${disp}`; x.fillText(`Pienso como ${top.short}`, W / 2, 200, W - 140);
    x.fillStyle = 'rgba(243,230,196,0.8)'; x.font = `italic 34px ${body}`; x.fillText(top.epithet || '', W / 2, 250, W - 160);
    // retratos de los pensadores afines
    const n = af.con.length; const R = n === 1 ? 150 : 118; const gap = 300; const x0 = W / 2 - ((n - 1) * gap) / 2; const cy = 430;
    const ims = await Promise.all(af.con.map((s) => Share.img(`img/p-${s.id}.jpg`)));
    af.con.forEach((s, i) => {
      const cx = x0 + i * gap, r = i === 0 && n > 1 ? R + 14 : R;
      x.save(); x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.closePath(); x.fillStyle = '#2a2438'; x.fill(); x.clip();
      const im = ims[i]; if (im) { const k = Math.max((2 * r) / im.width, (2 * r) / im.height); x.drawImage(im, cx - (im.width * k) / 2, cy - (im.height * k) / 2, im.width * k, im.height * k); }
      else { x.fillStyle = '#d8b25a'; x.font = `120px ${disp}`; x.textBaseline = 'middle'; x.fillText(s.short[0], cx, cy + 6); x.textBaseline = 'alphabetic'; }
      x.restore(); x.strokeStyle = '#d8b25a'; x.lineWidth = 5; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke();
      x.fillStyle = '#ffe9b0'; x.font = `36px ${disp}`; x.fillText(s.short, cx, cy + r + 48, gap - 20);
    });
    // las seis grandes preguntas
    let y = 706; x.fillStyle = '#d8b25a'; x.font = `26px ${disp}`; x.fillText('DÓNDE ME SITÚO', W / 2, y - 56);
    for (const e of ejes) {
      x.textAlign = 'center'; x.fillStyle = e.v === null ? 'rgba(243,230,196,0.4)' : '#fff3d0'; x.font = `32px ${body}`; x.fillText(e.q, W / 2, y);
      const bx = 330, bw = W - 660, by = y + 26; x.strokeStyle = 'rgba(216,178,90,0.5)'; x.lineWidth = 3; x.beginPath(); x.moveTo(bx, by); x.lineTo(bx + bw, by); x.stroke();
      x.font = `italic 22px ${body}`; x.fillStyle = 'rgba(243,230,196,0.7)'; x.textAlign = 'right'; x.fillText(e.neg, bx - 16, by + 7, 270); x.textAlign = 'left'; x.fillText(e.pos, bx + bw + 16, by + 7, 270);
      if (e.v !== null) { const px = bx + ((e.v + 1) / 2) * bw; x.fillStyle = '#ffd36a'; x.beginPath(); x.arc(px, by, 12, 0, Math.PI * 2); x.fill(); x.strokeStyle = '#1a1730'; x.lineWidth = 3; x.stroke(); }
      y += 72;
    }
    x.textAlign = 'center';
    if (af.contra.length) { x.fillStyle = 'rgba(243,230,196,0.9)'; x.font = `32px ${body}`; x.fillText(`Me desafían: ${af.contra.map((s) => s.short).join(', ')}`, W / 2, y + 8, W - 140); }
    x.fillStyle = '#ffd36a'; x.font = `italic 38px ${body}`; x.fillText('¿Y tú, cómo piensas?', W / 2, 1196);
    Share.foot(x, W, 1252, await Share.loadLogo());
    return c;
  },
  async share() {
    const af = Mapa.afinidades(Mapa.calc());
    if (!af.con.length) return toast('Todavía no hay perfil: toma postura en algunos diálogos («Dialoguemos») o en los experimentos y vuelve aquí.');
    const c = await this.draw();
    await Share.send(c, 'mi-perfil-filosofico.jpg', `Según la Odisea de la Razón, pienso como ${af.con[0].short}. ¿Y tú? ${GAME_URL}`, 'Imagen de tu perfil descargada. ¡Compártela!');
    achieve('perfil');
  },
};
on('#cu-share', () => Perfil.share());

// ---------------------------------------------------------------- ágora: la pregunta del día de cada época
const AGORA_KEY = 'odisea-razon.agora';
const Agora = {
  data: {}, // por época: { si, no, ult } del servidor
  day() { return new Date().toISOString().slice(0, 10); },
  question(idx) {
    const e = ERAS[idx]; const list = [];
    for (const s of e.sages) { const D = typeof DIALOGOS !== 'undefined' && DIALOGOS[s.id]; if (D && D.tesis) list.push({ q: `«${D.tesis}»`, who: s.short, a: 'De acuerdo', b: 'En desacuerdo' }); }
    for (const m of MAPA_EJES) list.push({ q: m.q, who: '', a: m.pos, b: m.neg });
    const h = Juntos.hash(this.day() + e.id); return list[h % list.length];
  },
  mine(idx) { const o = store.get(AGORA_KEY, {}) || {}; return o.day === this.day() ? (o.v || {})[ERAS[idx].id] || 0 : 0; },
  setMine(idx, v) { let o = store.get(AGORA_KEY, {}) || {}; if (o.day !== this.day()) o = { day: this.day(), v: {} }; o.v[ERAS[idx].id] = v; store.set(AGORA_KEY, o); },
  // votos: los guardados del día (si el servidor los tiene) + los viajeros conectados ahora + el mío
  counts(idx) {
    const d = this.data[ERAS[idx].id] || { si: 0, no: 0, ids: [] }; let si = d.si, no = d.no; const seen = new Set(d.ids || []);
    const mine = this.mine(idx); if (mine && !seen.has(Juntos.myId())) { if (mine > 0) si++; else no++; }
    for (const [id, r] of Juntos.R) if (r.e === idx && r.v && !seen.has(id)) { if (r.v > 0) si++; else no++; }
    return { si, no };
  },
  async fetch(idx, vote) {
    const era = ERAS[idx].id;
    try {
      const d = vote ? await Cuenta.rpc('odisea_agora_votar', { p_dia: this.day(), p_era: era, p_jugador: Juntos.myId(), p_apodo: Juntos.myName(), p_aspecto: Juntos.lookStr(), p_voto: vote })
        : await Cuenta.rpc('odisea_agora_ver', { p_dia: this.day(), p_era: era });
      if (d && typeof d === 'object') { this.data[era] = { si: d.si | 0, no: d.no | 0, ids: (d.ultimos || []).map((u) => u.jugador), ult: d.ultimos || [] }; if (world && world.idx === idx) { this.ghosts(world); this.paint(world); } }
    } catch (e) { /* sin el SQL del ágora solo se cuentan los viajeros conectados */ }
  },
  build(W) {
    const idx = W.idx; if (!ERAS[idx]) return;
    // un sitio libre cerca de la entrada
    const busy = [...(POIS[idx] || []), ...(NPCS[idx] || [])].map((p) => p.at).filter(Boolean).concat(W.stations.map((s) => [s.pos.x, s.pos.z]));
    for (const Z of typeof ZONES !== 'undefined' ? ZONES : []) if (Z.era === idx && Z.mouth) busy.push([Z.mouth.x, Z.mouth.z]);
    // se prueba una cuadrícula entre la entrada y la plaza: lejos de lugares, personajes y muros, y cerca de la entrada
    const free = (c) => Math.min(99, ...busy.map((q) => Math.hypot(q[0] - c[0], q[1] - c[1])));
    const wall = (c) => Math.min(99, ...W.colliders.map((k) => (k.t === 1 ? Math.hypot(k.x - c[0], k.z - c[1]) - k.r : Math.hypot(Math.max(k.x0 - c[0], 0, c[0] - k.x1), Math.max(k.z0 - c[1], 0, c[1] - k.z1)))));
    let at = [5.5, 26.5], bs = -1e9;
    for (let cx = -9; cx <= 9; cx += 1.5) for (let cz = 12; cz <= 28; cz += 1) { if (Math.abs(cx) < 2.5) continue; const c = [cx, cz]; const sc = Math.min(free(c), 7) + Math.min(wall(c), 4) * 1.5 - Math.hypot(cx, cz - W.start.z) * 0.12; if (sc > bs) { bs = sc; at = c; } }
    const g = new THREE.Group(); g.position.set(at[0], 0, at[1]); W.group.add(g);
    const stone = std(0xcfc6b4, { roughness: 0.8 }), acc = new THREE.Color(W.theme.accent);
    g.add(mesh(new THREE.BoxGeometry(1.5, 0.3, 0.9), stone, 0, 0.15, 0)); g.add(mesh(new THREE.BoxGeometry(1.1, 1.9, 0.3), stone, 0, 1.25, 0));
    const top = mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.3, 20, 1, false, 0, Math.PI), stone, 0, 2.2, 0); top.rotation.z = Math.PI / 2; top.rotation.y = Math.PI / 2; g.add(top);
    g.add(mesh(new THREE.PlaneGeometry(0.9, 1.5), new THREE.MeshBasicMaterial({ color: acc.clone().multiplyScalar(1.5), transparent: true, opacity: 0.35, toneMapped: false }), 0, 1.25, 0.16, false, false));
    // los dos lados: de acuerdo (verde, a la derecha) y en desacuerdo (ámbar, a la izquierda)
    for (const [sx, col] of [[1, 0x7fd08a], [-1, 0xf0a860]]) { const r = mesh(new THREE.RingGeometry(1.3, 1.45, 40), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.7, side: THREE.DoubleSide, toneMapped: false }), sx * 2.6, 0.05, 1.2, false, false); r.rotation.x = -Math.PI / 2; g.add(r); }
    W.colliders.push({ t: 0, x0: at[0] - 0.8, x1: at[0] + 0.8, z0: at[1] - 0.5, z1: at[1] + 0.5, h: 3 });
    const label = new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true, depthWrite: false, toneMapped: false })); label.scale.set(3.4, 0.85, 1); label.position.set(0, 3.25, 0); g.add(label);
    W.agora = { g, at, label, ghosts: [] };
    W.spots = W.spots || [];
    W.spots.push({ x: at[0], z: at[1] + 1.2, r: 2.6, verb: 'Votar', label: 'La pregunta del día', on: () => !W.zoneIn && !(W.cave && W.cave.in), act: () => this.open(idx) });
    this.paint(W); this.fetch(idx, 0);
    W.anim.push((t) => { for (const gh of W.agora.ghosts) gh.fig.group.position.y = Math.sin(t * 1.3 + gh.ph) * 0.04; });
  },
  paint(W) {
    if (!W || !W.agora) return; const c = this.counts(W.idx); const n = c.si + c.no; const q = this.question(W.idx);
    const key = `${n}|${c.si}`; if (W.agora.key === key) return; W.agora.key = key;
    const m = W.agora.label.material; if (m.map) m.map.dispose();
    m.map = labelTexture('Pregunta del día', n ? `${c.si} ${q.a.toLowerCase().slice(0, 22)} · ${c.no} ${q.b.toLowerCase().slice(0, 22)}` : 'Sé el primero en votar hoy'); m.needsUpdate = true;
  },
  // siluetas de quienes votaron hoy antes que tú (no están conectados ahora)
  ghosts(W) {
    if (!W.agora) return; for (const gh of W.agora.ghosts) { W.agora.g.remove(gh.g); gh.g.traverse((o) => { if (o.geometry) o.geometry.dispose(); }); } W.agora.ghosts = [];
    const d = this.data[ERAS[W.idx].id]; if (!d) return; const cnt = { 1: 0, '-1': 0 };
    for (const u of d.ult) {
      const id = String(u.jugador || ''); if (id === Juntos.myId() || Juntos.R.has(id) || Juntos.muted().has(id)) continue;
      const v = u.voto > 0 ? 1 : -1; const k = cnt[v]++; if (k >= 5) continue;
      const [r, s, h, t] = String(u.aspecto || '').split(',').map((n) => n | 0);
      const fig = buildFigure({ robe: AV_ROBES[r] ?? AV_ROBES[0], robe2: 0x2a2620, skin: AV_SKINS[s] ?? AV_SKINS[2], hair: AV_HAIRS[h] ?? AV_HAIRS[0], beard: false, hat: (AV_HATS[t] || AV_HATS[0])[0], acc: 'none' }, 0xffffff);
      fig.halo.visible = false; fig.group.traverse((o) => { if (o.material && !o.isSprite) { o.material = o.material.clone(); o.material.transparent = true; o.material.opacity = 0.38; o.material.depthWrite = false; o.castShadow = false; } });
      const g = new THREE.Group(); g.add(fig.group); const a = (k / 5) * Math.PI * 1.4 + 0.5; g.position.set(v * 2.6 + Math.cos(a) * 0.85 * v, 0, 1.2 + Math.sin(a) * 0.85); g.rotation.y = Math.atan2(-g.position.x, 1.4 - g.position.z);
      const l = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture(Sala.clean(u.apodo) || 'Viajero', 'pasó hoy'), transparent: true, opacity: 0.75, depthWrite: false, toneMapped: false })); l.scale.set(1.7, 0.42, 1); l.position.y = 2.6; g.add(l);
      W.agora.g.add(g); W.agora.ghosts.push({ g, fig, ph: k * 1.7 });
    }
  },
  open(idx) {
    const q = this.question(idx), mine = this.mine(idx), c = this.counts(idx); const n = c.si + c.no;
    const res = n ? `Hoy en esta época: ${c.si} ${c.si === 1 ? 'viajero elige' : 'viajeros eligen'} «${q.a}» y ${c.no} «${q.b}».` : 'Nadie ha votado todavía hoy en esta época.';
    const head = q.who ? `${q.who} sostiene: ${q.q} ¿Y tú?` : q.q;
    if (mine) return XP.open('Ágora · la pregunta del día', head, `Tu voto de hoy: «${mine > 0 ? q.a : q.b}». ${res} Mañana habrá una pregunta nueva.`, [['Seguir explorando'], ['Cambiar mi voto', () => { this.setMine(idx, 0); this.open(idx); }, 'ghost']]);
    XP.open('Ágora · la pregunta del día', head, `Elige tu postura. No hay respuesta correcta: después verás cuántos viajeros piensan como tú. ${res}`, [[q.a, () => this.vote(idx, 1)], [q.b, () => this.vote(idx, -1), 'primary'], ['Ahora no', null, 'ghost']]);
  },
  vote(idx, v) {
    this.setMine(idx, v); Juntos.sendT = 0; Juntos.last = null; if (world && world.agora) { world.agora.key = ''; this.paint(world); }
    const q = this.question(idx); addScore(40); popup('+40<small>voto en el ágora</small>', 'up'); achieve('agora');
    this.fetch(idx, v).then(() => { const c = this.counts(idx); const same = v > 0 ? c.si : c.no, tot = c.si + c.no; toast(tot > 1 ? `🏛 ${same} de ${tot} viajeros eligieron «${v > 0 ? q.a : q.b}» hoy.` : '🏛 Eres el primer voto de hoy en esta época. ¡Invita a alguien a votar!'); });
  },
};
// el conteo de la estela se actualiza con los viajeros conectados
setInterval(() => { try { if (world && world.agora && G.state === 'play') Agora.paint(world); } catch (e) { /* nada */ } }, 2000);

// ---------------------------------------------------------------- modo foto
const Foto = {
  canvas: null, text: '',
  async take() {
    if (G.state !== 'play' || !world) return;
    const p = player.pos; let best = null, bd = 9;
    if (!world.zoneIn && !(world.cave && world.cave.in)) for (const s of sages) { if (s.state === 'sealed' || !s.group.visible) continue; const d = Math.hypot(s.pos.x - p.x, s.pos.z - p.z); if (d < bd) { bd = d; best = s; } }
    // mi avatar, sin etiqueta
    const l = Juntos.look(); const fig = buildFigure({ robe: AV_ROBES[l.r] ?? AV_ROBES[0], robe2: 0x2a2620, skin: AV_SKINS[l.s] ?? AV_SKINS[2], hair: AV_HAIRS[l.h] ?? AV_HAIRS[0], beard: false, hat: (AV_HATS[l.t] || AV_HATS[0])[0], acc: 'none' }, 0xffffff);
    fig.halo.visible = false; const me = new THREE.Group(); me.add(fig.group); scene.add(me);
    const cam0 = camera.position.clone(), q0 = camera.quaternion.clone(), fov0 = camera.fov, asp0 = camera.aspect; const hidden = [];
    const hide = (o) => { if (o && o.visible) { o.visible = false; hidden.push(o); } };
    try {
      let eye, look;
      if (best) {
        const sp = best.pos; let dx = p.x - sp.x, dz = p.z - sp.z; const d = Math.hypot(dx, dz) || 1; dx /= d; dz /= d; // del pensador hacia mí
        const side = 1.25 * (best.boss ? 1.3 : 1); me.position.set(sp.x - dz * side + dx * 0.25, p.y, sp.z + dx * side + dz * 0.25); fig.group.rotation.y = Math.atan2(dx, dz); fig.armR.rotation.z = -0.5;
        const mx = (sp.x + me.position.x) / 2, mz = (sp.z + me.position.z) / 2; const back = best.boss ? 6.6 : 5.4;
        eye = new THREE.Vector3(mx + dx * back, p.y + 1.55, mz + dz * back); look = new THREE.Vector3(mx, p.y + (best.boss ? 1.7 : 1.3), mz);
        best.group.rotation.y = Math.atan2(dx, dz);
      } else {
        const dx = -Math.sin(player.yaw), dz = -Math.cos(player.yaw); me.position.set(p.x + dx * 4.6, p.y, p.z + dz * 4.6); fig.group.rotation.y = Math.atan2(-dx, -dz); fig.armR.rotation.z = -0.5;
        eye = new THREE.Vector3(p.x, p.y + 1.55, p.z); look = new THREE.Vector3(me.position.x, p.y + 1.3, me.position.z);
      }
      hide(lamp);
      camera.position.copy(eye); camera.lookAt(look); camera.fov = 42; camera.aspect = 0.8; camera.updateProjectionMatrix(); camera.updateMatrixWorld(true);
      if (G.settings.quality !== 'low') composer.render(); else renderer.render(scene, camera);
      const src = renderer.domElement; const W = 1080, H = 1350; const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d');
      x.imageSmoothingQuality = 'high'; x.drawImage(src, 0, 0, W, H);
      const g = x.createLinearGradient(0, H - 420, 0, H); g.addColorStop(0, 'rgba(8,6,12,0)'); g.addColorStop(0.55, 'rgba(8,6,12,0.82)'); g.addColorStop(1, 'rgba(8,6,12,0.96)'); x.fillStyle = g; x.fillRect(0, H - 420, W, 420);
      x.strokeStyle = '#d8b25a'; x.lineWidth = 4; x.strokeRect(22, 22, W - 44, H - 44);
      const e = ERAS[G.eraIdx]; const title = best ? `Con ${best.data.short}` : e.name; const sub = best ? `${e.name} · ${e.years}` : e.years;
      try { await document.fonts.ready; } catch (err) { /* nada */ }
      x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = '#fff3d0'; x.font = '78px "Marcellus SC", "Marcellus", Georgia, serif'; x.fillText(title, 70, H - 226, W - 140);
      x.fillStyle = 'rgba(243,230,196,0.9)'; x.font = 'italic 38px "EB Garamond", Georgia, serif'; x.fillText(sub, 70, H - 176, W - 140);
      Share.foot(x, W, H - 96, await Share.loadLogo());
      this.canvas = c; this.text = best ? `Estuve con ${best.data.short} en la Odisea de la Razón. ${GAME_URL}` : `Viajando por «${e.name}» en la Odisea de la Razón. ${GAME_URL}`;
    } finally {
      scene.remove(me); me.traverse((o) => { if (o.geometry) o.geometry.dispose(); }); for (const o of hidden) o.visible = true;
      camera.position.copy(cam0); camera.quaternion.copy(q0); camera.fov = fov0; camera.aspect = asp0; camera.updateProjectionMatrix();
    }
    if (!this.canvas) return;
    G.state = 'place'; unlockPointer(); input.keys = {}; input.walk = null; input.auto = false; $('#hud').hidden = true; $('#touch').hidden = true;
    $('#foto-img').src = this.canvas.toDataURL('image/jpeg', 0.85); $('#foto').hidden = false; Audio.click(); achieve('foto');
  },
  close() { $('#foto').hidden = true; if (G.state === 'place') { G.state = 'play'; $('#hud').hidden = false; if (IS_TOUCH) $('#touch').hidden = false; lockPointer(); updateHud(); } },
  share() { if (this.canvas) Share.send(this.canvas, 'odisea-de-la-razon.jpg', this.text, 'Foto descargada. ¡Compártela!'); },
};
on('#b-foto', () => Foto.take());
on('#foto-share', () => Foto.share());
on('#foto-close', () => Foto.close());
window.addEventListener('keydown', (e) => { if (e.code === 'KeyP' && G.state === 'play' && !e.repeat && !/INPUT|TEXTAREA/.test((e.target && e.target.tagName) || '')) Foto.take(); });
setInterval(() => { const b = $('#b-foto'); if (b) { const show = G.state === 'play'; if (b.hidden === show) b.hidden = !show; } }, 400);
