// ============================================================================
//  MODO AULA
//  Funciona sin servidor: el docente crea un código de clase con los pensadores
//  y las tareas; cada estudiante lo introduce, juega y entrega un texto con su
//  progreso, que el docente pega en su panel. También: debate por equipos en el
//  proyector y fichas imprimibles con solucionario.
// ============================================================================
const AULA = {
  KEY_TASK: 'odisea-razon.aula.tarea', KEY_CLASSES: 'odisea-razon.aula.clases',
  ALPHA: '23456789ABCDEFGHJKLMNPQRSTUVWXYZ',
  TASKS: [
    { k: 'lesson', bit: 1, n: 'Escuchar su lección', short: 'Lección', icon: '🎧' },
    { k: 'quest', bit: 2, n: 'Cumplir su encargo', short: 'Encargo', icon: '🗝' },
    { k: 'debate', bit: 4, n: 'Ganarle el debate', short: 'Debate', icon: '⚔' },
    { k: 'book', bit: 8, n: 'Estudiar su libro (si tiene)', short: 'Libro', icon: '📖' },
  ],
  all() { return ERAS.flatMap((e, ei) => e.sages.map((s) => ({ s, ei }))); },
  token(id) { let h = 0x811c9dc5; for (const ch of '0:' + id) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } h = (h >>> 0) % 1024; return this.ALPHA[h >> 5] + this.ALPHA[h & 31]; },
  check(str) { let h = 7; for (const ch of str) h = (Math.imul(h, 31) + ch.charCodeAt(0)) >>> 0; return this.ALPHA[h % 32]; },
  // código de clase: 2 caracteres por pensador + 1 de tareas + 1 de control, en grupos de 4
  encode(ids, mask) { const body = ids.map((id) => this.token(id)).join('') + this.ALPHA[mask & 31]; return (body + this.check(body)).match(/.{1,4}/g).join('-'); },
  decode(code) {
    const raw = String(code || '').toUpperCase().replace(/[^0-9A-Z]/g, '');
    if (raw.length < 4 || raw.length % 2) return null;
    const body = raw.slice(0, -1); if (this.check(body) !== raw.slice(-1)) return null;
    const mask = this.ALPHA.indexOf(body.slice(-1)); if (mask < 1) return null;
    const map = new Map(this.all().map((x) => [this.token(x.s.id), x]));
    const items = []; for (let i = 0; i < body.length - 1; i += 2) { const x = map.get(body.slice(i, i + 2)); if (!x) return null; items.push(x); }
    return items.length ? { code: (raw).match(/.{1,4}/g).join('-'), raw, items, mask } : null;
  },
  // ¿qué tareas tienen sentido para este pensador?
  applies(x, t) { if (t.k === 'quest') return !x.s.boss && !!QUESTS[x.s.id]; if (t.k === 'book') return BOOKS.flat().some((b) => b.author === x.s.id); return true; },
  done(x, t) {
    if (t.k === 'lesson') return store.get(LESSON_KEY, []).includes(x.s.id);
    if (t.k === 'quest') return store.get(QUEST_KEY, []).includes(x.s.id);
    if (t.k === 'debate') return new Set(store.get(CODEX_KEY, [])).has(x.s.id);
    if (t.k === 'book') { const st = new Set(store.get(BOOK_KEY, [])); return BOOKS.flat().some((b) => b.author === x.s.id && st.has(b.id)); }
    return false;
  },
  tasksOf(cls) { return this.TASKS.filter((t) => cls.mask & t.bit); },
  progress(cls) {
    const rows = cls.items.map((x) => ({ x, cells: this.tasksOf(cls).map((t) => (this.applies(x, t) ? this.done(x, t) : null)) }));
    let ok = 0, tot = 0; rows.forEach((r) => r.cells.forEach((c) => { if (c !== null) { tot++; if (c) ok++; } }));
    return { rows, ok, tot };
  },
  // ---------- pantallas
  open(tab) {
    G.prevScreen = 'title'; this.tab = tab || (store.get(this.KEY_TASK, null) ? 'student' : this.tab || 'student');
    this.render(); show('aula');
  },
  render() {
    document.querySelectorAll('#au-tabs button').forEach((b) => b.classList.toggle('on', b.dataset.v === this.tab));
    $('#au-student').hidden = this.tab !== 'student'; $('#au-teacher').hidden = this.tab !== 'teacher'; $('#au-tools').hidden = this.tab !== 'tools';
    if (this.tab === 'student') this.renderStudent(); else if (this.tab === 'teacher') this.renderTeacher(); else this.renderTools();
  },
  // ---------- estudiante
  renderStudent() {
    const t = store.get(this.KEY_TASK, null); const cls = t && this.decode(t.code);
    $('#au-join').hidden = !!cls; $('#au-mytask').hidden = !cls;
    if (!cls) { $('#au-name').value = (t && t.name) || store.get(ALIAS_KEY, '') || ''; return; }
    $('#au-who').textContent = `${t.name} · clase ${cls.code}`;
    const pr = this.progress(cls); const pct = pr.tot ? Math.round((pr.ok / pr.tot) * 100) : 0;
    $('#au-bar').style.width = pct + '%'; $('#au-pct').textContent = `${pr.ok} de ${pr.tot} tareas · ${pct} %`;
    const box = $('#au-list'); box.innerHTML = '';
    const tasks = this.tasksOf(cls);
    for (const r of pr.rows) {
      const li = document.createElement('div'); li.className = 'au-row';
      const name = document.createElement('div'); name.className = 'au-n'; name.innerHTML = '<b></b><small></small>';
      const md = document.createElement('span'); md.className = 'medal sm'; setMedal(md, r.x.s.id, r.x.s.short[0]); const tx = document.createElement('div'); tx.append(name.querySelector('b'), name.querySelector('small')); name.append(md, tx);
      tx.querySelector('b').textContent = r.x.s.short; tx.querySelector('small').textContent = `${ERAS[r.x.ei].num} · ${ERAS[r.x.ei].name}`;
      const cells = document.createElement('div'); cells.className = 'au-cells';
      r.cells.forEach((c, i) => { const sp = document.createElement('span'); sp.className = 'au-c' + (c === null ? ' na' : c ? ' ok' : ''); sp.title = tasks[i].n; sp.textContent = c === null ? '–' : c ? '✓' : tasks[i].icon; cells.appendChild(sp); });
      const go = document.createElement('button'); go.className = 'mini-b'; go.textContent = 'Ir';
      go.addEventListener('click', () => { Audio.init(); Audio.click(); G.travelFrom = 'title'; G.aulaTarget = r.x.s.id; travelTo(r.x.ei); });
      li.append(name, cells, go); box.appendChild(li);
    }
    $('#au-legend').textContent = tasks.map((x) => `${x.icon} ${x.n}`).join(' · ');
    $('#au-deliver').hidden = true; refreshAulaButton();
  },
  join() {
    const cls = this.decode($('#au-code').value); const name = $('#au-name').value.replace(/\s+/g, ' ').trim().slice(0, 40);
    if (!cls) { toast('Ese código de clase no es válido. Revísalo con tu docente.'); Audio.wrong(); return; }
    if (!name) { toast('Escribe tu nombre para que tu docente sepa quién eres.'); $('#au-name').focus(); return; }
    store.set(this.KEY_TASK, { code: cls.code, name, t: Date.now() }); Audio.correct(); achieve('aula');
    toast(`¡Te has unido a la clase! Tienes ${cls.items.length} pensadores en tu tarea.`); this.renderStudent(); refreshAulaButton();
  },
  deliver() {
    const t = store.get(this.KEY_TASK, null); const cls = t && this.decode(t.code); if (!cls) return;
    const pr = this.progress(cls); const bits = pr.rows.flatMap((r) => r.cells.filter((c) => c !== null).map((c) => (c ? '1' : '0'))).join('');
    const hex = BigInt('0b' + (bits || '0')).toString(36).toUpperCase();
    const ds = Oracle.today().replace(/-/g, ''); const name = t.name.replace(/[:|\n]/g, ' ');
    const line = `ENTREGA:${cls.raw}:${name}:${bits.length}.${hex}:${ds}`; const sig = this.check(line) + this.check(line.split('').reverse().join(''));
    const pct = pr.tot ? Math.round((pr.ok / pr.tot) * 100) : 0;
    const txt = `Odisea de la Razón · Entrega de tarea\n${t.name} · clase ${cls.code}\n${pr.ok} de ${pr.tot} tareas completadas (${pct} %)\n${line}:${sig}`;
    $('#au-deltext').value = txt; $('#au-deliver').hidden = false;
    $('#au-delbtn').textContent = navigator.share ? 'Enviar a mi docente' : 'Copiar para enviar a mi docente';
    if (pct === 100) achieve('aula100');
  },
  leave() { store.set(this.KEY_TASK, null); Audio.click(); toast('Has salido de la clase.'); this.renderStudent(); refreshAulaButton(); },
  // ---------- docente
  sel: new Set(), mask: 5,
  renderTeacher() {
    const box = $('#au-pick'); box.innerHTML = '';
    ERAS.forEach((e, ei) => {
      const wrap = document.createElement('div'); wrap.className = 'au-era';
      const h = document.createElement('button'); h.className = 'au-erah'; const allOn = e.sages.every((s) => this.sel.has(s.id));
      h.textContent = `${allOn ? '☑' : '☐'} ${e.num} · ${e.name}`; h.addEventListener('click', () => { Audio.click(); e.sages.forEach((s) => (allOn ? this.sel.delete(s.id) : this.sel.add(s.id))); this.renderTeacher(); });
      const row = document.createElement('div'); row.className = 'qd-row';
      for (const s of e.sages) { const b = document.createElement('button'); b.className = 'chip' + (this.sel.has(s.id) ? ' on' : ''); b.textContent = s.short; b.addEventListener('click', () => { Audio.click(); if (this.sel.has(s.id)) this.sel.delete(s.id); else this.sel.add(s.id); this.renderTeacher(); }); row.appendChild(b); }
      wrap.append(h, row); box.appendChild(wrap);
    });
    const tb = $('#au-tasks'); tb.innerHTML = '';
    for (const t of this.TASKS) { const b = document.createElement('button'); b.className = 'chip' + (this.mask & t.bit ? ' on' : ''); b.textContent = `${t.icon} ${t.n}`; b.addEventListener('click', () => { Audio.click(); this.mask ^= t.bit; if (!this.mask) this.mask = t.bit; this.renderTeacher(); }); tb.appendChild(b); }
    $('#au-count').textContent = `${this.sel.size} ${this.sel.size === 1 ? 'pensador elegido' : 'pensadores elegidos'}`;
    this.renderClasses();
  },
  create() {
    if (!this.sel.size) { toast('Elige al menos un pensador.'); return; }
    if (this.sel.size > 24) { toast('Para que el código sea manejable, elige como máximo 24 pensadores por tarea.'); return; }
    const ids = this.all().map((x) => x.s.id).filter((id) => this.sel.has(id));
    const code = this.encode(ids, this.mask); const title = $('#au-title').value.replace(/\s+/g, ' ').trim().slice(0, 60) || 'Tarea de filosofía';
    const cls = store.get(this.KEY_CLASSES, {}); cls[code.replace(/-/g, '')] = { title, code, created: Date.now(), subs: (cls[code.replace(/-/g, '')] || {}).subs || {} }; store.set(this.KEY_CLASSES, cls);
    this.current = code.replace(/-/g, ''); Audio.correct(); achieve('docente');
    this.renderTeacher(); this.showClass(this.current); $('#au-classbox').scrollIntoView({ behavior: 'smooth', block: 'start' });
  },
  renderClasses() {
    const cls = store.get(this.KEY_CLASSES, {}); const keys = Object.keys(cls).sort((a, b) => cls[b].created - cls[a].created);
    const box = $('#au-classes'); box.innerHTML = '';
    if (!keys.length) { box.innerHTML = '<p class="qd-note">Aún no has creado ninguna tarea.</p>'; $('#au-classbox').hidden = true; return; }
    for (const k of keys) { const b = document.createElement('button'); b.className = 'chip' + (k === this.current ? ' on' : ''); b.textContent = `${cls[k].title} · ${cls[k].code}`; b.addEventListener('click', () => { Audio.click(); this.current = k; this.renderClasses(); this.showClass(k); }); box.appendChild(b); }
    if (this.current && cls[this.current]) this.showClass(this.current); else $('#au-classbox').hidden = true;
  },
  showClass(k) {
    const all = store.get(this.KEY_CLASSES, {}); const c = all[k]; const d = c && this.decode(c.code); if (!d) return;
    $('#au-classbox').hidden = false; $('#au-ctitle').textContent = c.title; $('#au-ccode').textContent = c.code;
    $('#au-cinfo').textContent = `${d.items.length} pensadores: ${d.items.map((x) => x.s.short).join(', ')}. Cuenta: ${this.tasksOf(d).map((t) => t.short.toLowerCase()).join(', ')}.`;
    $('#au-invite').value = `Tarea de filosofía: ${c.title}\n1. Entra en Odisea de la Razón: https://claude.ai/artifact/5C4Rz4jpDYiEaEYcdbUJew\n2. Toca «Modo aula» → «Soy estudiante».\n3. Escribe el código de clase: ${c.code}\n4. Al terminar, toca «Entregar mi tarea» y envíame el texto.`;
    this.renderSubs(k);
  },
  parseSubs(text, k) {
    const all = store.get(this.KEY_CLASSES, {}); const c = all[k]; if (!c) return 0; const d = this.decode(c.code);
    let n = 0, bad = 0;
    for (const m of String(text).matchAll(/ENTREGA:([0-9A-Z]+):([^:\n]{1,40}):(\d+)\.([0-9A-Z]+):(\d{8}):([0-9A-Z]{2})/g)) {
      const line = `ENTREGA:${m[1]}:${m[2]}:${m[3]}.${m[4]}:${m[5]}`; const sig = this.check(line) + this.check(line.split('').reverse().join(''));
      if (sig !== m[6] || m[1] !== d.raw) { bad++; continue; }
      let bits; try { bits = [...m[4].toLowerCase()].reduce((acc, ch) => acc * 36n + BigInt(parseInt(ch, 36)), 0n); } catch (e) { bad++; continue; }
      const str = bits.toString(2).padStart(+m[3], '0'); const name = m[2].trim();
      const prev = c.subs[name.toLowerCase()]; if (!prev || prev.date <= m[5]) c.subs[name.toLowerCase()] = { name, bits: str, date: m[5] };
      n++;
    }
    store.set(this.KEY_CLASSES, all);
    if (bad) toast(`${bad} ${bad === 1 ? 'entrega no corresponde' : 'entregas no corresponden'} a esta clase o fueron modificadas.`);
    return n;
  },
  renderSubs(k) {
    const all = store.get(this.KEY_CLASSES, {}); const c = all[k]; const d = c && this.decode(c.code); const box = $('#au-table'); box.innerHTML = '';
    const subs = Object.values(c.subs || {}).sort((a, b) => a.name.localeCompare(b.name, 'es'));
    if (!subs.length) { box.innerHTML = '<p class="qd-note">Todavía no has pegado entregas. Cuando tus estudiantes te envíen su texto, pégalo arriba (puedes pegar muchas a la vez).</p>'; $('#au-csv').hidden = true; return; }
    const tasks = this.tasksOf(d); const cols = d.items.map((x) => ({ x, ts: tasks.filter((t) => this.applies(x, t)) }));
    const tbl = document.createElement('table'); tbl.className = 'au-tbl';
    const head = document.createElement('tr'); head.innerHTML = '<th>Estudiante</th><th>%</th>' + cols.map((c2) => `<th title="${c2.x.s.name}">${c2.x.s.short}</th>`).join('') + '<th>Fecha</th>'; tbl.appendChild(head);
    const csv = [['Estudiante', 'Porcentaje', ...cols.map((c2) => c2.x.s.short), 'Fecha'].join(';')];
    for (const s of subs) {
      let p = 0; const per = cols.map((c2) => { const seg = s.bits.slice(p, p + c2.ts.length); p += c2.ts.length; return { seg, n: c2.ts.length }; });
      const ok = [...s.bits].filter((b) => b === '1').length; const pct = s.bits.length ? Math.round((ok / s.bits.length) * 100) : 0;
      const tr = document.createElement('tr'); const tdn = document.createElement('td'); tdn.textContent = s.name; tr.appendChild(tdn);
      const tdp = document.createElement('td'); tdp.className = 'pct' + (pct === 100 ? ' full' : pct >= 50 ? ' mid' : ''); tdp.textContent = pct + ' %'; tr.appendChild(tdp);
      per.forEach(({ seg, n }) => { const td = document.createElement('td'); td.textContent = n ? [...seg].map((b) => (b === '1' ? '●' : '○')).join('') : '–'; td.title = `${[...seg].filter((b) => b === '1').length} de ${n}`; tr.appendChild(td); });
      const tdd = document.createElement('td'); tdd.textContent = `${s.date.slice(6, 8)}/${s.date.slice(4, 6)}`; tr.appendChild(tdd);
      tbl.appendChild(tr);
      csv.push([s.name, pct, ...per.map(({ seg, n }) => (n ? `${[...seg].filter((b) => b === '1').length}/${n}` : '-')), `${s.date.slice(6, 8)}/${s.date.slice(4, 6)}/${s.date.slice(0, 4)}`].join(';'));
    }
    const wrap = document.createElement('div'); wrap.className = 'au-tblwrap'; wrap.appendChild(tbl); box.appendChild(wrap);
    const leg = document.createElement('p'); leg.className = 'qd-note'; leg.textContent = `Cada punto es una tarea por pensador (${tasks.map((t) => t.short.toLowerCase()).join(', ')}): ● hecha, ○ pendiente.`; box.appendChild(leg);
    $('#au-csv').hidden = false; $('#au-csvtext').value = csv.join('\n');
  },
  deleteClass() { if (!this.current) return; const all = store.get(this.KEY_CLASSES, {}); if (!confirm(`¿Borrar la tarea «${all[this.current].title}» y sus entregas de este dispositivo?`)) return; delete all[this.current]; store.set(this.KEY_CLASSES, all); this.current = null; this.renderTeacher(); },
  // ---------- herramientas: proyector y fichas
  renderTools() {
    const all = store.get(this.KEY_CLASSES, {}); const keys = Object.keys(all);
    const sel = $('#au-toolcls'); sel.innerHTML = '';
    const t = store.get(this.KEY_TASK, null);
    const opts = keys.map((k) => [all[k].code, all[k].title]); if (t && !opts.some((o) => o[0] === t.code)) opts.push([t.code, 'Mi tarea de clase']);
    if (!opts.length) { sel.innerHTML = '<option value="">Primero crea una tarea en «Soy docente»</option>'; } else for (const [code, title] of opts) { const o = document.createElement('option'); o.value = code; o.textContent = `${title} · ${code}`; sel.appendChild(o); }
  },
  toolClass() { const d = this.decode($('#au-toolcls').value); if (!d) toast('Primero crea una tarea en «Soy docente».'); return d; },
};

// ---------- debate en el aula (proyector, por equipos)
const Proj = {
  qs: [], i: 0, teams: [], time: 0, timer: 0, revealed: false,
  start() {
    const d = AULA.toolClass(); if (!d) return;
    const n = Math.max(2, Math.min(4, +$('#au-teams').value || 2));
    this.teams = Array.from({ length: n }, (_, k) => ({ name: ['Academia', 'Liceo', 'Jardín', 'Stoa'][k], pts: 0 }));
    this.qs = shuffle(d.items.flatMap((x) => x.s.q.map((q) => ({ x, q })))).slice(0, Math.max(5, Math.min(20, +$('#au-nq').value || 10)));
    this.i = 0; hideAll(); $('#proj').hidden = false; G.state = 'proj'; Audio.mode = 'duel'; this.ask();
  },
  ask() {
    clearInterval(this.timer); this.revealed = false; const it = this.qs[this.i];
    $('#pj-num').textContent = `Pregunta ${this.i + 1} de ${this.qs.length}`; $('#pj-who').textContent = `${it.x.s.name} · ${ERAS[it.x.ei].name}`;
    $('#pj-q').textContent = it.q.q; it.opts = it.opts || shuffle(it.q.a.map((t, k) => ({ t, ok: k === 0 })));
    const box = $('#pj-ans'); box.innerHTML = '';
    it.opts.forEach((o, k) => { const d = document.createElement('div'); d.className = 'pj-a'; d.innerHTML = `<span class="k">${'ABCD'[k]}</span><span></span>`; d.lastChild.textContent = o.t; box.appendChild(d); });
    $('#pj-exp').hidden = true; $('#pj-reveal').hidden = false; $('#pj-next').hidden = true;
    this.time = 30; $('#pj-time').textContent = this.time;
    this.timer = setInterval(() => { this.time--; $('#pj-time').textContent = Math.max(0, this.time); if (this.time <= 5 && this.time > 0) Audio.tick(); if (this.time <= 0) this.reveal(); }, 1000);
    this.renderTeams();
  },
  reveal() {
    if (this.revealed) return; this.revealed = true; clearInterval(this.timer); const it = this.qs[this.i];
    [...$('#pj-ans').children].forEach((d, k) => d.classList.add(it.opts[k].ok ? 'right' : 'dim'));
    const ex = $('#pj-exp'); ex.textContent = it.q.e || ''; ex.hidden = !it.q.e; Audio.correct();
    $('#pj-reveal').hidden = true; $('#pj-next').hidden = false; $('#pj-next').textContent = this.i + 1 >= this.qs.length ? 'Ver la clasificación final' : 'Siguiente pregunta';
  },
  next() { if (this.i + 1 >= this.qs.length) return this.end(); this.i++; this.ask(); },
  renderTeams() {
    const box = $('#pj-teams'); box.innerHTML = '';
    this.teams.forEach((t) => { const d = document.createElement('div'); d.className = 'pj-team'; d.innerHTML = '<b></b><span></span><div><button aria-label="Quitar punto">−</button><button aria-label="Sumar punto">+1</button></div>'; d.querySelector('b').textContent = t.name; d.querySelector('span').textContent = t.pts;
      const [m, p] = d.querySelectorAll('button'); m.addEventListener('click', () => { t.pts = Math.max(0, t.pts - 1); this.renderTeams(); }); p.addEventListener('click', () => { t.pts++; Audio.pickup(); this.renderTeams(); }); box.appendChild(d); });
  },
  end() {
    clearInterval(this.timer); const best = Math.max(...this.teams.map((t) => t.pts)); const win = this.teams.filter((t) => t.pts === best).map((t) => t.name);
    $('#pj-num').textContent = 'Clasificación final'; $('#pj-who').textContent = '';
    $('#pj-q').textContent = best > 0 ? (win.length > 1 ? `¡Empate entre ${win.join(' y ')}!` : `¡Gana ${win[0]}!`) : 'Fin del debate';
    $('#pj-ans').innerHTML = ''; $('#pj-exp').hidden = true; $('#pj-reveal').hidden = true; $('#pj-next').hidden = true; $('#pj-time').textContent = '';
    this.renderTeams(); Audio.victory(); Music.sting('victory');
  },
  close() { clearInterval(this.timer); $('#proj').hidden = true; G.state = 'title'; Audio.mode = 'calm'; AULA.open('tools'); },
};

// ---------- fichas imprimibles
function aulaSheet() {
  const d = AULA.toolClass(); if (!d) return;
  const all = store.get(AULA.KEY_CLASSES, {}); const title = (all[d.raw] && all[d.raw].title) || 'Ficha de filosofía';
  const box = $('#print-sheet'); box.innerHTML = '';
  const h = document.createElement('h1'); h.textContent = title; box.appendChild(h);
  const sub = document.createElement('p'); sub.className = 'ps-sub'; sub.textContent = 'Odisea de la Razón · Nombre: ______________________________  Curso: ________  Fecha: __________'; box.appendChild(sub);
  const key = [];
  d.items.forEach((x, n) => {
    const sec = document.createElement('section'); const h2 = document.createElement('h2'); h2.textContent = `${n + 1}. ${x.s.name} (${x.s.dates})`; sec.appendChild(h2);
    const meta = document.createElement('p'); meta.className = 'ps-meta'; meta.textContent = `${ERAS[x.ei].name} · ${x.s.epithet}`; sec.appendChild(meta);
    const c = document.createElement('p'); c.innerHTML = '<b></b> '; c.querySelector('b').textContent = x.s.concept.name + ':'; c.append(document.createTextNode(x.s.concept.text)); sec.appendChild(c);
    const qs = x.s.q.slice(0, 3); const ol = document.createElement('ol');
    qs.forEach((q, qi) => { const li = document.createElement('li'); li.textContent = q.q; const opts = shuffle(q.a.map((t, k) => ({ t, ok: k === 0 }))); const ul = document.createElement('ul'); opts.forEach((o, k) => { const it = document.createElement('li'); it.textContent = `${'abcd'[k]}) ${o.t}`; ul.appendChild(it); if (o.ok) key.push(`${n + 1}.${qi + 1}: ${'abcd'[k]}) ${o.t}`); }); li.appendChild(ul); ol.appendChild(li); });
    sec.appendChild(ol);
    const quest = QUESTS[x.s.id]; const think = document.createElement('p'); think.className = 'ps-think'; think.textContent = `Para pensar y debatir: ${quest && quest.riddle ? quest.riddle.q : '¿Estás de acuerdo con su idea central? Da un argumento a favor y otro en contra.'}`; sec.appendChild(think);
    box.appendChild(sec);
  });
  const ks = document.createElement('section'); ks.className = 'ps-key'; const kh = document.createElement('h2'); kh.textContent = 'Solucionario (para el docente)'; ks.appendChild(kh); const kp = document.createElement('p'); kp.textContent = key.join(' · '); ks.appendChild(kp); box.appendChild(ks);
  $('#print-wrap').hidden = false;
  $('#au-sheettext').value = [...box.querySelectorAll('h1, h2, p, li')].filter((el) => el.tagName !== 'LI' || !el.querySelector('ul')).map((el) => (el.tagName === 'H2' ? '\n' + el.textContent : el.textContent)).join('\n');
}
function refreshAulaButton() {
  const t = store.get(AULA.KEY_TASK, null); const cls = t && AULA.decode(t.code); const b = $('#b-aula-s');
  if (!b) return;
  if (cls) { const pr = AULA.progress(cls); b.textContent = `Mi tarea: ${pr.ok}/${pr.tot} · ${t.name}`; } else b.textContent = 'Para docentes y estudiantes';
}
document.querySelectorAll('#au-tabs button').forEach((b) => b.addEventListener('click', () => { Audio.click(); AULA.tab = b.dataset.v; AULA.render(); }));
on('#b-aula', () => AULA.open());
on('#au-joinbtn', () => AULA.join());
on('#au-delbtn0', () => AULA.deliver());
on('#au-leave', () => AULA.leave());
$('#au-delbtn').addEventListener('click', () => shareOrCopy($('#au-deltext').value, $('#au-delbtn'), $('#au-deltext')));
on('#au-create', () => AULA.create());
on('#au-invbtn', () => shareOrCopy($('#au-invite').value, $('#au-invbtn'), $('#au-invite')));
on('#au-addsubs', () => { const n = AULA.parseSubs($('#au-subs').value, AULA.current); $('#au-subs').value = ''; toast(n ? `${n} ${n === 1 ? 'entrega añadida' : 'entregas añadidas'}.` : 'No encontré entregas válidas en el texto.'); AULA.renderSubs(AULA.current); });
on('#au-csvbtn', () => copyText($('#au-csvtext').value, $('#au-csvbtn'), $('#au-csvtext')));
on('#au-del', () => AULA.deleteClass());
on('#au-proj', () => Proj.start());
on('#au-sheet', () => aulaSheet());
on('#pj-reveal', () => Proj.reveal());
on('#pj-next', () => Proj.next());
on('#pj-x', () => Proj.close());
on('#ps-print', () => { try { window.print(); } catch (e) { toast('Tu navegador no permite imprimir desde aquí: copia la ficha como texto.'); } });
on('#ps-copy', () => copyText($('#au-sheettext').value, $('#ps-copy'), $('#au-sheettext')));
on('#ps-close', () => { $('#print-wrap').hidden = true; });
['#au-code', '#au-name', '#au-title', '#au-subs'].forEach((s) => $(s).addEventListener('keydown', (e) => e.stopPropagation()));
refreshAulaButton();
