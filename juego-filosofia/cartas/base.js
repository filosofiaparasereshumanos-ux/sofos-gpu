// ============================================================================
//  UTILIDADES BÁSICAS (versión de cartas: sin 3D)
// ============================================================================
const TAU = Math.PI * 2;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffle(arr, r = Math.random) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }
const pick = (arr, r = Math.random) => arr[Math.floor(r() * arr.length)];
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } },
};
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const IS_TOUCH = matchMedia('(pointer: coarse)').matches;
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const fmt = (n) => Number(n).toLocaleString('es-ES');

// estado global (lo usan también el audio y la música compartidos)
const KEY = 'odisea-cartas.';
const G = {
  state: 'title',
  settings: Object.assign({ music: 0.6, sfx: 0.85, voices: true, vibrate: true, timer: 30 }, store.get(KEY + 'ajustes', {})),
};
function saveSettings() { store.set(KEY + 'ajustes', G.settings); Audio.applyVolumes(); }
function buzz(p) { if (!IS_TOUCH || !G.settings.vibrate) return; try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) { /* no disponible */ } }

// ---------- voz sintética (frases de los filósofos y lecciones)
const Voice = {
  v: null,
  ok() { return 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined'; },
  pick() { try { const vs = speechSynthesis.getVoices(); this.v = vs.find((v) => /^es[-_]ES/i.test(v.lang)) || vs.find((v) => /^es/i.test(v.lang)) || null; } catch (e) { /* sin voces */ } },
  pitchFor(sage) { if (!sage) return 1; const h = [...sage.id].reduce((a, c) => a + c.charCodeAt(0), 0); return sage.boss ? 0.62 : 0.8 + (h % 5) * 0.08; },
  utter(text, sage, rate = 1, onend) {
    if (!this.ok()) return false;
    try {
      speechSynthesis.cancel(); if (!this.v) this.pick();
      const u = new SpeechSynthesisUtterance(text); u.lang = 'es-ES'; if (this.v) u.voice = this.v;
      u.pitch = this.pitchFor(sage); u.rate = (sage && sage.boss ? 0.92 : 1) * rate; u.volume = Math.min(1, 0.4 + G.settings.sfx);
      if (onend) u.onend = onend; u.onerror = () => {};
      speechSynthesis.speak(u); return true;
    } catch (e) { return false; }
  },
  say(text, sage) { if (G.settings.voices) this.utter(text, sage); },
  stop() { try { if (this.ok()) speechSynthesis.cancel(); } catch (e) { /* sin voz */ } },
};
try { if ('speechSynthesis' in window) speechSynthesis.onvoiceschanged = () => Voice.pick(); } catch (e) { /* sin voz */ }
