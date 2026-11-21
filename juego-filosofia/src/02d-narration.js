// ============================================================================
//  VOZ GRABADA: frases sintetizadas de antemano (tools/narrate.py) y empaquetadas
//  en audio/*.mp3. NARR_INDEX (lo añade build.mjs) dice dónde está cada frase.
// ============================================================================
// trocea un texto en frases (igual al generar el audio y al reproducirlo)
function narrSplit(text) {
  return (String(text).match(/[^.!?¿¡…]*(?:[¿¡][^?!]*[?!]|[^.!?…]+[.!?…]+)\s*|[^.!?…]+$/g) || [text]).map((x) => x.trim()).filter(Boolean);
}
// huella corta de una frase (FNV-1a de 32 bits)
function narrHash(s) {
  let h = 0x811c9dc5; s = s.normalize('NFC');
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return (h >>> 0).toString(36);
}
// voz de cada pensador: la misma voz grave con distinto tono; los maestros, más graves
function SAGE_VOICE(d) {
  const h = [...d.id].reduce((a, c) => a + c.charCodeAt(0), 0);
  return { voice: 'carlfm', pitch: d.boss ? (d.final ? 0.86 : 0.9) : [0.96, 1.0, 1.05, 0.93, 1.09][h % 5] };
}

// reproductor: descarga el paquete, lo decodifica y toca las frases seguidas
const Narr = {
  bufs: new Map(), gen: 0, src: null, out: null,
  ok() { return typeof NARR_INDEX !== 'undefined' && !!NARR_INDEX.p && typeof fetch === 'function' && location.protocol !== 'file:'; },
  find(spk, s) {
    const packs = NARR_INDEX.spk[spk]; if (!packs) return null; const h = narrHash(s);
    for (const p of packs) { const t = NARR_INDEX.p[p] && NARR_INDEX.p[p][h]; if (t) return { p, at: t[0] / 100, dur: t[1] / 100 }; }
    return null;
  },
  has(spk, text) { return this.plan(spk, text) !== null; },
  plan(spk, text) {
    if (!this.ok()) return null;
    const segs = narrSplit(text).map((s) => this.find(spk, s));
    return segs.length && segs.every(Boolean) ? segs : null;
  },
  decode(ab) { const c = Audio.ctx; return new Promise((res, rej) => { const p = c.decodeAudioData(ab, res, rej); if (p && p.then) p.then(res, rej); }); },
  load(p) {
    let e = this.bufs.get(p);
    if (e) { this.bufs.delete(p); this.bufs.set(p, e); return e; } // más reciente al final
    e = fetch('audio/' + p + '.mp3').then((r) => { if (!r.ok) throw new Error('audio ' + r.status); return r.arrayBuffer(); }).then((ab) => this.decode(ab));
    e.catch(() => this.bufs.delete(p));
    this.bufs.set(p, e);
    while (this.bufs.size > 3) this.bufs.delete(this.bufs.keys().next().value); // poca memoria en el móvil
    return e;
  },
  prefetch(spk) { if (this.ok() && Audio.ctx) for (const p of NARR_INDEX.spk[spk] || []) if (p.startsWith('p-') || p.startsWith('c-')) this.load(p); },
  // reproduce text con la voz de spk; devuelve false si no hay grabación (usa entonces la voz del sistema)
  play(spk, text, o = {}) {
    const segs = this.plan(spk, text); if (!segs || !Audio.ctx) return false;
    this.stop(); const gen = this.gen; const c = Audio.ctx; if (c.state === 'suspended') c.resume();
    if (!this.out) { this.out = c.createGain(); this.out.connect(c.destination); }
    this.out.gain.value = Math.min(1.2, 0.55 + G.settings.sfx * 0.8);
    const rate = o.rate || 1; let i = 0; let done = false;
    const end = () => { if (done || gen !== this.gen) return; done = true; this.src = null; o.onend && o.onend(); };
    const fail = () => { if (gen !== this.gen) return; done = true; this.src = null; o.fallback ? o.fallback() : o.onend && o.onend(); };
    const next = () => {
      if (gen !== this.gen) return;
      if (i >= segs.length) return end();
      const s = segs[i++];
      this.load(s.p).then((buf) => {
        if (gen !== this.gen) return;
        const src = c.createBufferSource(); src.buffer = buf; src.playbackRate.value = rate; src.connect(this.out);
        src.onended = () => { if (gen === this.gen) setTimeout(next, 140 / rate); };
        o.onseg && o.onseg(i - 1);
        src.start(0, Math.max(0, s.at - 0.03), s.dur + 0.08); this.src = src;
      }, fail);
    };
    next();
    return true;
  },
  stop() { this.gen++; if (this.src) { try { this.src.onended = null; this.src.stop(); } catch (e) { /* ya parado */ } this.src = null; } },
};
