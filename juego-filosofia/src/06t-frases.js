// ============================================================================
//  FRASES CÉLEBRES
//  · En la conversación, «Una frase célebre»: el pensador la dice con su voz y
//    debajo aparece de dónde viene.
//  · Cada frase escuchada se guarda en tu colección (Inicio → Frases célebres),
//    donde puedes volver a leerlas y compartirlas como tarjeta con su retrato.
//  · En la pantalla de inicio aparece una frase del día.
// ============================================================================
const FRASE_KEY = 'odisea-razon.frases';
ACH.push({ id: 'frases25', i: '❝', n: 'Coleccionista de frases', d: 'Reúne 25 frases célebres hablando con los pensadores.' });
const Frases = {
  heard: new Set(store.get(FRASE_KEY, []) || []), next: {},
  all() { const S = SAGE_BY_ID(); return Object.entries(FRASES).filter(([id]) => S[id]).flatMap(([id, L]) => L.map((f, i) => ({ id, i, t: f[0], o: f[1], d: S[id].d }))); },
  mark(id, i) {
    const k = id + '|' + i; if (this.heard.has(k)) return; this.heard.add(k); store.set(FRASE_KEY, [...this.heard]);
    if (this.heard.size === 1) toast('❝ Guardaste tu primera frase célebre. Encuéntrala en Inicio → Frases célebres.');
    if (this.heard.size >= 25) achieve('frases25');
  },
  // el pensador dice una de sus frases (una distinta cada vez)
  say(d) {
    const L = FRASES[d.id]; if (!L) return; const i = (this.next[d.id] = ((this.next[d.id] ?? -1) + 1) % L.length); const [t, o] = L[i];
    Talk.say(t); const s = document.createElement('small'); s.className = 'fr-src'; s.textContent = '— ' + d.short + (o ? ' · ' + o : ''); $('#tk-text').appendChild(s);
    this.mark(d.id, i);
  },
  // frase del día: la misma para todos ese día
  daily() { const A = this.all(); const day = Math.floor(Date.now() / 864e5); return A[(day * 7919) % A.length]; },
  paintDaily() {
    const el = $('#fr-dia'); if (!el) return; const f = this.daily(); if (!f) { el.hidden = true; return; }
    el.innerHTML = '<span class="fr-eye">Frase del día</span><q></q><small></small>'; el.querySelector('q').textContent = f.t; el.querySelector('small').textContent = '— ' + f.d.short; el.hidden = false;
  },
  // ---------- la colección
  open() { Panel.open('fr'); this.paint(); },
  close() { Panel.close('fr'); },
  paint() {
    const box = $('#fr-items'); box.innerHTML = ''; const A = this.all(); const have = A.filter((f) => this.heard.has(f.id + '|' + f.i)).length;
    $('#fr-count').textContent = `${have} de ${A.length} frases descubiertas`;
    const by = {}; for (const f of A) (by[f.id] = by[f.id] || []).push(f);
    const order = Object.values(by).sort((a, b) => b.filter((f) => this.heard.has(f.id + '|' + f.i)).length - a.filter((f) => this.heard.has(f.id + '|' + f.i)).length);
    for (const list of order) {
      const d = list[0].d; const g = document.createElement('div'); g.className = 'fr-g';
      g.innerHTML = '<div class="fr-h"><i class="medal sm"></i><b></b></div>'; setMedal(g.querySelector('.medal'), d.id, d.short[0]); g.querySelector('b').textContent = d.short;
      for (const f of list) {
        const on = this.heard.has(f.id + '|' + f.i); const it = document.createElement('div'); it.className = 'fr-it' + (on ? '' : ' off');
        if (on) { it.innerHTML = '<q></q><small></small><button class="aid">Compartir</button>'; it.querySelector('q').textContent = f.t; it.querySelector('small').textContent = f.o || ''; it.querySelector('button').addEventListener('click', () => { Audio.click(); this.share(f); }); }
        else { it.textContent = `🔒 Habla con ${d.short} para descubrirla`; }
        g.appendChild(it);
      }
      box.appendChild(g);
    }
  },
  // tarjeta para compartir: retrato, frase y autor
  async share(f) {
    const W = 1080, H = 1350; const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d');
    const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#1d150c'); g.addColorStop(1, '#0c0906'); x.fillStyle = g; x.fillRect(0, 0, W, H);
    x.strokeStyle = '#d8b25a'; x.lineWidth = 4; x.strokeRect(40, 40, W - 80, H - 80);
    const p = await Share.portrait(f.id);
    if (p) { x.save(); x.beginPath(); x.arc(W / 2, 270, 160, 0, Math.PI * 2); x.clip(); x.drawImage(p, W / 2 - 160, 110, 320, 320); x.restore(); x.beginPath(); x.arc(W / 2, 270, 162, 0, Math.PI * 2); x.lineWidth = 6; x.stroke(); }
    const disp = '"Marcellus SC", "Marcellus", Georgia, serif', body = '"EB Garamond", Georgia, serif';
    x.textAlign = 'center'; x.fillStyle = '#d8b25a'; x.font = `140px ${body}`; x.fillText('“', W / 2, 560);
    let size = 64; let lines;
    const wrap = (s) => { x.font = `italic ${size}px ${body}`; const ws = f.t.split(' '); const out = []; let cur = ''; for (const w of ws) { const t = (cur + ' ' + w).trim(); if (x.measureText(t).width > W - 200 && cur) { out.push(cur); cur = w; } else cur = t; } if (cur) out.push(cur); return out; };
    while ((lines = wrap()).length > 7 && size > 40) size -= 4;
    x.fillStyle = '#f6ecd2'; let y = 640; for (const l of lines) { x.fillText(l, W / 2, y); y += size * 1.25; }
    x.fillStyle = '#ffe9b0'; x.font = `48px ${disp}`; x.fillText(f.d.name.toUpperCase().slice(0, 40), W / 2, y + 50);
    if (f.o) { x.fillStyle = 'rgba(243,230,196,0.75)'; x.font = `italic 34px ${body}`; x.fillText(f.o.slice(0, 70), W / 2, y + 100); }
    Share.foot(x, W, H - 110, await Share.loadLogo());
    this.canvas = c; Share.send(c, 'frase-' + f.id + '.jpg', `«${f.t}» — ${f.d.short}. Juega gratis a Odisea de la Razón.`, 'Tarjeta descargada. ¡Compártela!');
  },
};
// botón en la conversación con cada pensador
{
  const o0 = Talk.options;
  Talk.options = function () {
    o0.call(this);
    if (this.npc || !this.data || !FRASES[this.data.id]) return;
    const box = $('#tk-ops'); const b = document.createElement('button'); b.className = 'tk-op'; b.textContent = '❝ Una frase célebre';
    b.addEventListener('click', () => { Audio.click(); Frases.say(this.data); });
    const ref = [...box.children].find((x) => /Escuchar tu lección/.test(x.textContent)); box.insertBefore(b, ref || null);
  };
}
on('#b-frases', () => Frases.open());
on('#fr-x', () => Frases.close());
on('#fr-dia', () => Frases.open());
Frases.paintDaily();
