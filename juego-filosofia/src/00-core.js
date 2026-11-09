import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// ============================================================================
//  UTILIDADES
// ============================================================================
const TAU = Math.PI * 2;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const damp = (a, b, l, dt) => lerp(a, b, 1 - Math.exp(-l * dt));
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffle(arr, r = Math.random) {
  for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }
  return arr;
}
const pick = (arr, r = Math.random) => arr[Math.floor(r() * arr.length)];
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } },
};
const $ = (s) => document.querySelector(s);
const IS_TOUCH = matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window && navigator.maxTouchPoints > 0);

// ============================================================================
//  TEXTURAS PROCEDURALES (canvas)
// ============================================================================
function makeNoise(seed) {
  const r = mulberry32(seed); const g = new Float32Array(65536);
  for (let i = 0; i < 65536; i++) g[i] = r();
  return function (x, y, p) {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const w = (a) => ((a % p) + p) % p;
    const x0 = w(xi), x1 = w(xi + 1), y0 = w(yi), y1 = w(yi + 1);
    const at = (a, b) => g[(a & 255) | ((b & 255) << 8)];
    return lerp(lerp(at(x0, y0), at(x1, y0), u), lerp(at(x0, y1), at(x1, y1), u), v);
  };
}
const NOISE = makeNoise(1337);
function fbm(x, y, p, oct = 4) {
  let a = 0, amp = 0.5, f = 1, n = 0;
  for (let i = 0; i < oct; i++) { a += amp * NOISE(x * f, y * f, p * f); n += amp; f *= 2; amp *= 0.5; }
  return a / n;
}
const hex2rgb = (h) => [(h >> 16) & 255, (h >> 8) & 255, h & 255];
function mixc(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }

function pixelCanvas(size, fn) {
  const c = document.createElement('canvas'); c.width = c.height = size;
  const ctx = c.getContext('2d'); const img = ctx.createImageData(size, size); const d = img.data;
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const col = fn(x / size, y / size); const i = (y * size + x) * 4;
    d[i] = col[0]; d[i + 1] = col[1]; d[i + 2] = col[2]; d[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0); return c;
}
function toTex(canvas, rx = 1, ry = 1, srgb = true) {
  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8; return t;
}
const TEXCACHE = {};
function cachedTex(key, make) {
  if (TEXCACHE[key]) return TEXCACHE[key];
  let r = make(); if (r instanceof HTMLCanvasElement) r = toTex(r);
  return (TEXCACHE[key] = r);
}

function texMarble(key, base, vein, size = 256) {
  return cachedTex('marble' + key, () => {
    const b = hex2rgb(base), v = hex2rgb(vein);
    return pixelCanvas(size, (u, w) => {
      const n = fbm(u * 4, w * 4, 4, 5);
      const t = Math.abs(Math.sin((u * 2 + w * 3 + n * 4) * Math.PI));
      const veinAmt = Math.pow(1 - t, 10) * 0.85;
      const c = mixc(b, v, veinAmt);
      const s = 0.92 + 0.12 * n;
      return [c[0] * s, c[1] * s, c[2] * s];
    });
  });
}
function texTiles(key, base, grout, tiles = 4, varAmt = 0.12, size = 256) {
  return cachedTex('tiles' + key, () => {
    const b = hex2rgb(base), g = hex2rgb(grout); const r = mulberry32(tiles * 97 + base);
    const tv = []; for (let i = 0; i < tiles * tiles; i++) tv.push(1 - varAmt + r() * varAmt * 2);
    return pixelCanvas(size, (u, w) => {
      const tx = Math.floor(u * tiles), ty = Math.floor(w * tiles);
      const fx = u * tiles - tx, fy = w * tiles - ty;
      const edge = Math.min(fx, fy, 1 - fx, 1 - fy);
      const n = fbm(u * 8, w * 8, 8, 4);
      if (edge < 0.025) return mixc(g, b, 0.15 * n);
      const s = tv[ty * tiles + tx] * (0.85 + 0.25 * n) * (edge < 0.06 ? 0.9 : 1);
      return [b[0] * s, b[1] * s, b[2] * s];
    });
  });
}
function texChecker(key, c1, c2, c3, size = 256) {
  return cachedTex('check' + key, () => {
    const a = hex2rgb(c1), b = hex2rgb(c2), c = hex2rgb(c3);
    return pixelCanvas(size, (u, w) => {
      const n = fbm(u * 6, w * 6, 6, 4);
      const vein = Math.pow(1 - Math.abs(Math.sin((u * 4 + w * 2 + n * 3) * Math.PI)), 12) * 0.5;
      const cx = Math.floor(u * 4), cy = Math.floor(w * 4);
      const fx = u * 4 - cx - 0.5, fy = w * 4 - cy - 0.5;
      let col = (cx + cy) % 2 === 0 ? a : b;
      if (Math.abs(fx) + Math.abs(fy) < 0.28) col = c; // rombo florentino
      const edge = Math.min(0.5 - Math.abs(fx), 0.5 - Math.abs(fy));
      const s = (0.9 + 0.15 * n) * (edge < 0.02 ? 0.7 : 1);
      const m = mixc(col, [255, 255, 255], vein);
      return [m[0] * s, m[1] * s, m[2] * s];
    });
  });
}
function texSand(key, base, size = 256) {
  return cachedTex('sand' + key, () => {
    const b = hex2rgb(base);
    return pixelCanvas(size, (u, w) => {
      const n = fbm(u * 8, w * 8, 8, 5);
      const rip = Math.sin((w * 24 + n * 6) * Math.PI) * 0.04;
      const s = 0.82 + 0.3 * n + rip;
      return [b[0] * s, b[1] * s, b[2] * s];
    });
  });
}
function texWood(key, base, size = 256) {
  return cachedTex('wood' + key, () => {
    const b = hex2rgb(base); const planks = 6; const r = mulberry32(base);
    const pv = []; for (let i = 0; i < planks; i++) pv.push([0.8 + r() * 0.35, r()]);
    return pixelCanvas(size, (u, w) => {
      const p = Math.floor(w * planks); const f = w * planks - p;
      const off = pv[p][1];
      const grain = fbm((u + off) * 2, w * 40, 2, 3);
      const ring = Math.sin((grain * 10 + u * 2) * Math.PI) * 0.08;
      const seam = f < 0.04 || f > 0.96 ? 0.55 : 1;
      const endSeam = Math.abs(((u + off) % 0.5) - 0.0) < 0.006 ? 0.6 : 1;
      const s = pv[p][0] * (0.8 + 0.3 * grain + ring) * seam * endSeam;
      return [b[0] * s, b[1] * s, b[2] * s];
    });
  });
}
function texStone(key, base, size = 256) {
  return cachedTex('stone' + key, () => {
    const b = hex2rgb(base);
    return pixelCanvas(size, (u, w) => {
      const n = fbm(u * 6, w * 6, 6, 5);
      const row = Math.floor(w * 8); const fy = w * 8 - row;
      const bu = u * 4 + (row % 2) * 0.5; const fx = bu - Math.floor(bu);
      const mortar = fy < 0.06 || fx < 0.03 ? 0.55 : 1;
      const s = (0.78 + 0.35 * n) * mortar;
      return [b[0] * s, b[1] * s, b[2] * s];
    });
  });
}
function texStainedGlass(seed) {
  return cachedTex('glass' + seed, () => {
    const c = document.createElement('canvas'); c.width = 128; c.height = 256; const ctx = c.getContext('2d');
    const r = mulberry32(seed);
    const pal = ['#b3122e', '#1d3fa8', '#e2b007', '#1f7a3a', '#6a1b9a', '#d35400', '#1565c0'];
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 128, 256);
    const cell = 16;
    for (let y = 0; y < 256; y += cell) for (let x = 0; x < 128; x += cell) {
      ctx.fillStyle = pal[Math.floor(r() * pal.length)];
      ctx.globalAlpha = 0.65 + r() * 0.35; ctx.fillRect(x + 1.5, y + 1.5, cell - 3, cell - 3);
    }
    ctx.globalAlpha = 1;
    // figura central: medallones
    for (let i = 0; i < 3; i++) {
      const cy = 50 + i * 75;
      ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(64, cy, 30, 0, TAU); ctx.fill();
      ctx.fillStyle = pal[(i * 3 + seed) % pal.length]; ctx.beginPath(); ctx.arc(64, cy, 27, 0, TAU); ctx.fill();
      ctx.fillStyle = '#f5e6b8'; ctx.beginPath(); ctx.arc(64, cy, 11, 0, TAU); ctx.fill();
      ctx.strokeStyle = '#000'; ctx.lineWidth = 3;
      for (let k = 0; k < 8; k++) { const a = k / 8 * TAU; ctx.beginPath(); ctx.moveTo(64 + Math.cos(a) * 11, cy + Math.sin(a) * 11); ctx.lineTo(64 + Math.cos(a) * 27, cy + Math.sin(a) * 27); ctx.stroke(); }
    }
    // arco apuntado
    ctx.strokeStyle = '#000'; ctx.lineWidth = 6; ctx.strokeRect(0, 0, 128, 256);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  });
}
function texRose() {
  return cachedTex('rose', () => {
    const c = document.createElement('canvas'); c.width = c.height = 512; const ctx = c.getContext('2d');
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 512, 512);
    const pal = ['#b3122e', '#1d3fa8', '#e2b007', '#1f7a3a', '#6a1b9a', '#1565c0'];
    const rings = [[250, 24], [190, 16], [120, 12], [60, 8]];
    rings.forEach(([rad, n], ri) => {
      for (let i = 0; i < n; i++) {
        const a0 = i / n * TAU, a1 = (i + 1) / n * TAU;
        ctx.beginPath(); ctx.moveTo(256, 256); ctx.arc(256, 256, rad, a0 + 0.02, a1 - 0.02); ctx.closePath();
        ctx.fillStyle = pal[(i + ri) % pal.length]; ctx.fill();
      }
      ctx.strokeStyle = '#000'; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(256, 256, rad, 0, TAU); ctx.stroke();
    });
    for (let i = 0; i < 12; i++) {
      const a = i / 12 * TAU; ctx.fillStyle = '#f6e7b0';
      ctx.beginPath(); ctx.arc(256 + Math.cos(a) * 155, 256 + Math.sin(a) * 155, 14, 0, TAU); ctx.fill();
    }
    ctx.fillStyle = '#f6e7b0'; ctx.beginPath(); ctx.arc(256, 256, 26, 0, TAU); ctx.fill();
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  });
}
function texBooks(seed) {
  return cachedTex('books' + seed, () => {
    const c = document.createElement('canvas'); c.width = 256; c.height = 256; const ctx = c.getContext('2d');
    const r = mulberry32(seed);
    const pal = ['#5b1a1a', '#1d3a2a', '#2a2a4a', '#6b4a1a', '#3a1a3a', '#4a2a14', '#1a2a3a', '#704020'];
    ctx.fillStyle = '#1a120c'; ctx.fillRect(0, 0, 256, 256);
    const shelves = 4, sh = 256 / shelves;
    for (let s = 0; s < shelves; s++) {
      let x = 2;
      while (x < 254) {
        const w = 6 + r() * 10, h = sh * (0.62 + r() * 0.3);
        ctx.fillStyle = pal[Math.floor(r() * pal.length)];
        ctx.fillRect(x, s * sh + sh - h - 4, w, h);
        ctx.fillStyle = 'rgba(214,168,74,0.75)';
        ctx.fillRect(x + 1, s * sh + sh - h + 4, w - 2, 2);
        ctx.fillRect(x + 1, s * sh + sh - 14, w - 2, 2);
        x += w + 1;
      }
      ctx.fillStyle = '#3b2616'; ctx.fillRect(0, s * sh + sh - 4, 256, 4);
    }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
  });
}
function labelTexture(title, sub, color = '#f3e6c4') {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 256; const ctx = c.getContext('2d');
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = 18;
  ctx.fillStyle = color; ctx.font = '600 92px "Marcellus SC", "Marcellus", Georgia, serif';
  ctx.fillText(title.toUpperCase(), 512, 100);
  ctx.font = 'italic 54px "EB Garamond", Georgia, serif'; ctx.fillStyle = 'rgba(243,230,196,0.85)';
  ctx.fillText(sub, 512, 190);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

// ============================================================================
//  MATERIALES
// ============================================================================
const MATCACHE = {};
function std(color, o = {}) {
  const key = color + JSON.stringify(o, (k, v) => (v && v.isTexture ? v.uuid : v));
  if (MATCACHE[key]) return MATCACHE[key];
  const m = new THREE.MeshStandardMaterial({ color, roughness: o.roughness ?? 0.8, metalness: o.metalness ?? 0, flatShading: !!o.flat });
  if (o.map) m.map = o.map;
  if (o.bump) { m.bumpMap = o.bump; m.bumpScale = o.bumpScale ?? 1.5; }
  if (o.emissive !== undefined) { m.emissive = new THREE.Color(o.emissive); m.emissiveIntensity = o.ei ?? 1; }
  if (o.emissiveMap) m.emissiveMap = o.emissiveMap;
  if (o.transparent) { m.transparent = true; m.opacity = o.opacity ?? 0.5; m.depthWrite = false; }
  if (o.side) m.side = o.side;
  return (MATCACHE[key] = m);
}
function glow(color, intensity = 3, o = {}) {
  const key = 'glow' + color + intensity + JSON.stringify(o);
  if (MATCACHE[key]) return MATCACHE[key];
  const c = new THREE.Color(color).multiplyScalar(intensity);
  const m = new THREE.MeshBasicMaterial({ color: c, toneMapped: false, transparent: !!o.transparent, opacity: o.opacity ?? 1, depthWrite: !o.transparent, blending: o.additive ? THREE.AdditiveBlending : THREE.NormalBlending, side: o.side ?? THREE.FrontSide });
  return (MATCACHE[key] = m);
}
function put(parent, obj) { parent.add(obj); return obj; }
function mesh(geo, mat, x = 0, y = 0, z = 0, cast = true, recv = true) {
  const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = cast; m.receiveShadow = recv; return m;
}

