// ============================================================================
//  MI AVATAR Y MUNDO EN LÍNEA: un solo panel sencillo, con el avatar girando,
//  flechas para cambiar cada parte y un interruptor para jugar en línea.
//  Se abre desde la portada, desde el letrero de arriba mientras juegas y desde
//  la pantalla «En vivo».
// ============================================================================
const Avatar = {
  draft: null, pv: null, fromPlay: false,
  PARTS: [['r', 'Túnica', () => AV_ROBES], ['s', 'Piel', () => AV_SKINS], ['h', 'Pelo', () => AV_HAIRS], ['t', 'Cabeza', () => AV_HATS]],
  got() { return new Set(store.get(ACH_KEY, [])); },
  need(key, i) { return key === 't' ? AV_HATS[i][2] : key === 'r' ? AV_ROBE_LOCK[i] : null; },
  locked(key, i) { const n = this.need(key, i); return n && !this.got().has(n) ? n : null; },
  online() { return G.settings.mundo === true; },
  open() {
    if (!$('#av').hidden) return;
    this.draft = { ...Juntos.look() }; $('#av-name').value = this.draft.n || ''; $('#av-name').placeholder = Juntos.myName();
    this.fromPlay = G.state === 'play';
    if (this.fromPlay) { G.state = 'place'; unlockPointer(); input.keys = {}; input.walk = null; input.auto = false; $('#hud').hidden = true; $('#touch').hidden = true; }
    $('#av').hidden = false; this.paint(); this.preview();
  },
  close() {
    this.commit(); $('#av').hidden = true; this.stopPreview(); this.paintTitle();
    if (this.fromPlay && G.state === 'place') { this.fromPlay = false; G.state = 'play'; $('#hud').hidden = false; if (IS_TOUCH) $('#touch').hidden = false; lockPointer(); updateHud(); }
  },
  // se guarda solo lo desbloqueado; lo bloqueado se puede mirar, pero no llevar
  commit() {
    if (!this.draft) return; const cur = Juntos.look(); const n = { ...cur };
    for (const [key] of this.PARTS) if (!this.locked(key, this.draft[key])) n[key] = this.draft[key];
    const raw = $('#av-name').value.trim(); const name = Sala.clean(raw); if (raw && !name) toast('Ese apodo no sirve: usa de 2 a 16 letras, sin palabras ofensivas.'); else n.n = name;
    try { localStorage.setItem(AVATAR_KEY, JSON.stringify(n)); } catch (e) { /* nada */ } Juntos.last = null; Juntos.sendT = 0;
  },
  step(key, d) { const list = this.PARTS.find((p) => p[0] === key)[2](); this.draft[key] = (this.draft[key] + d + list.length) % list.length; Audio.click(); this.paint(); this.figure(); this.commit(); },
  random() { for (const [key, , list] of this.PARTS) { const ok = list().map((_, i) => i).filter((i) => !this.locked(key, i)); this.draft[key] = ok[Math.floor(Math.random() * ok.length)]; } Audio.click(); this.paint(); this.figure(); this.commit(); },
  setOnline(v) {
    G.settings.mundo = !!v; saveSettings(); syncSettings(); Juntos.asked = true;
    if (!v && Juntos.mode !== 'grupo') Juntos.stop();
    if (v) { Juntos.welcomed = true; toast(Sala.ok() ? '🌍 Mundo en línea activado: al entrar a una época verás a otros viajeros.' : 'El mundo en línea funciona en la versión web del juego.'); }
    this.paint(); this.paintTitle();
  },
  paint() {
    const box = $('#av-opts'); box.innerHTML = '';
    for (const [key, label, list] of this.PARTS) {
      const L = list(), i = this.draft[key], lock = this.locked(key, i); const row = document.createElement('div'); row.className = 'av-row';
      const prev = document.createElement('button'); prev.className = 'av-arrow'; prev.textContent = '◀'; prev.setAttribute('aria-label', label + ' anterior'); prev.addEventListener('click', () => this.step(key, -1));
      const next = document.createElement('button'); next.className = 'av-arrow'; next.textContent = '▶'; next.setAttribute('aria-label', label + ' siguiente'); next.addEventListener('click', () => this.step(key, 1));
      const mid = document.createElement('div'); mid.className = 'av-mid' + (lock ? ' lock' : '');
      const t = document.createElement('b'); t.textContent = label; mid.appendChild(t);
      const v = document.createElement('span');
      if (key === 't') v.textContent = (lock ? '🔒 ' : '') + L[i][1]; else { const sw = document.createElement('i'); sw.style.background = '#' + L[i].toString(16).padStart(6, '0'); v.appendChild(sw); v.appendChild(document.createTextNode(`${lock ? '🔒 ' : ''}${i + 1} de ${L.length}`)); }
      mid.appendChild(v);
      if (lock) { const a = ACH.find((x) => x.id === lock); const h = document.createElement('small'); h.textContent = `Se gana con el logro «${a ? a.n : lock}»`; mid.appendChild(h); }
      row.append(prev, mid, next); box.appendChild(row);
    }
    const sw = $('#av-online'); sw.classList.toggle('on', this.online()); sw.setAttribute('aria-checked', this.online() ? 'true' : 'false');
    $('#av-online-s').textContent = Juntos.mode === 'grupo' ? `Estás en el grupo privado ${Juntos.code}: solo se ven quienes tienen el código.` : this.online() ? 'Activado: verás a otros viajeros en cada época. Sin chat, solo gestos.' : 'Desactivado: juegas solo. Actívalo para encontrarte con otros viajeros.';
    $('#av-group').hidden = Juntos.mode !== 'grupo';
    const n = Juntos.muted().size; $('#av-unmute').hidden = !n; $('#av-unmute').textContent = `Quitar el silencio a ${n} ${n === 1 ? 'viajero' : 'viajeros'}`;
  },
  paintTitle() {
    const s = $('#b-avatar-s'); if (s) s.textContent = Juntos.myName();
    const b = $('#b-online'); if (b) { b.classList.toggle('on', this.online()); b.setAttribute('aria-checked', this.online() ? 'true' : 'false'); $('#b-online-s').textContent = this.online() ? 'Activado' : 'Desactivado'; }
  },
  // -------- vista previa en 3D (un lienzo pequeño aparte del juego)
  preview() {
    try {
      const c = $('#av-prev'); const r = new THREE.WebGLRenderer({ canvas: c, alpha: true, antialias: true }); r.setPixelRatio(Math.min(2, window.devicePixelRatio || 1)); r.setSize(c.clientWidth || 220, c.clientHeight || 260, false);
      const sc = new THREE.Scene(); sc.add(new THREE.HemisphereLight(0xfff4e0, 0x40342a, 1.6)); const d = new THREE.DirectionalLight(0xffffff, 2.2); d.position.set(2, 4, 3); sc.add(d);
      const cam = new THREE.PerspectiveCamera(32, (c.clientWidth || 220) / (c.clientHeight || 260), 0.1, 30); cam.position.set(0, 1.4, 4.1); cam.lookAt(0, 1.2, 0);
      this.pv = { r, sc, cam, fig: null, t0: performance.now() }; this.figure();
      const loop = () => { const P = this.pv; if (!P || P.r !== r) return; const t = (performance.now() - P.t0) / 1000; if (P.fig) { P.fig.group.rotation.y = Math.sin(t * 0.7) * 0.9; P.fig.group.position.y = Math.sin(t * 2) * 0.015; } r.render(sc, cam); requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    } catch (e) { this.pv = null; $('#av-prev').hidden = true; }
  },
  figure() {
    const P = this.pv; if (!P) return; if (P.fig) { P.sc.remove(P.fig.group); P.fig.group.traverse((o) => { if (o.geometry) o.geometry.dispose(); }); }
    const l = this.draft; const fig = buildFigure({ robe: AV_ROBES[l.r] ?? AV_ROBES[0], robe2: 0x2a2620, skin: AV_SKINS[l.s] ?? AV_SKINS[2], hair: AV_HAIRS[l.h] ?? AV_HAIRS[0], beard: false, hat: (AV_HATS[l.t] || AV_HATS[0])[0], acc: 'none' }, 0xffffff);
    fig.halo.visible = false; P.sc.add(fig.group); P.fig = fig;
  },
  stopPreview() { const P = this.pv; this.pv = null; if (!P) return; try { if (P.fig) P.fig.group.traverse((o) => { if (o.geometry) o.geometry.dispose(); }); P.r.dispose(); } catch (e) { /* nada */ } },
};
on('#av-ok', () => Avatar.close());
on('#av-rand', () => Avatar.random());
on('#av-online', () => Avatar.setOnline(!Avatar.online()));
on('#av-group', () => { if (confirm(`¿Salir del grupo ${Juntos.code}?`)) { Juntos.stop(); toast('Saliste del grupo.'); Avatar.paint(); } });
on('#b-avatar', () => Avatar.open());
on('#b-online', () => Avatar.setOnline(!Avatar.online()));
on('#sl-avatar', () => Avatar.open());
$('#av').addEventListener('click', (e) => { if (e.target === $('#av')) Avatar.close(); });
window.addEventListener('keydown', (e) => { if (e.code === 'Escape' && !$('#av').hidden) { e.stopPropagation(); Avatar.close(); } }, true);
setTimeout(() => Avatar.paintTitle(), 600);
