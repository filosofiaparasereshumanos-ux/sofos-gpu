// Voces de los debates entre escuelas (src/08j-duo.js): un paquete por escuela y voz (ellos / ellas).
//   node tools/escuelas-voz.mjs jobs > jobs.json        (LANG_GAME=en: lee tools/i18n/build-en y usa voces inglesas)
//   node tools/escuelas-voz.mjs link audio/index.json   (añade cada paquete a los pensadores de su escuela)
import { readFileSync, writeFileSync } from 'node:fs';
import vm from 'node:vm';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const EN = process.env.LANG_GAME === 'en'; const SRC = EN ? join(root, 'tools', 'i18n', 'build-en') : root; const PFX = EN ? 'en/' : '';
const ctx = {}; vm.createContext(ctx);
vm.runInContext(readFileSync(join(root, 'src/02d-narration.js'), 'utf8').split('// reproductor')[0] + ';globalThis.S=narrSplit;', ctx);
vm.runInContext(readFileSync(join(SRC, 'src/08h-escuelas-datos.js'), 'utf8') + readFileSync(join(SRC, 'src/08j-duo-datos.js'), 'utf8') + ';globalThis.E=ESCUELAS;globalThis.P=PERFILES;', ctx);
const { E, P, S } = ctx; const FEM = new Set(P._mujeres || []);
const VOICE = EN ? { m: 'am_michael', f: 'af_heart' } : { m: 'santa', f: 'dora' };
const packs = [];
for (const sc of E.schools) {
  const p = P[sc.id]; if (!p) continue; const mem = Object.keys(E.map).filter((id) => E.map[id] === sc.id);
  for (const g of ['m', 'f']) {
    if (!mem.some((id) => (g === 'f') === FEM.has(id))) continue;
    const texts = [p.yo, ...Object.values(p.ejes).filter(Boolean), (P._valor || '').replace('{v}', p.valor), P._distinto, P._nada, ...(p.tags || []).map((t) => P._comun[t]).filter(Boolean)];
    if (g === 'f') for (const t of [P._nada, ...(p.tags || []).map((t) => P._comun[t])]) if (t) texts.push(t.replace(/\blos dos\b/g, 'las dos').replace(/\bboth of us\b/g, 'both of us'));
    const seen = new Set(); const sentences = []; for (const t of texts) for (const s of S(t || '')) if (!seen.has(s)) { seen.add(s); sentences.push(s); }
    packs.push({ name: PFX + 'e-' + sc.id + '-' + g, voice: VOICE[g], pitch: 1, speaker: 'esc-' + sc.id + '-' + g, sentences, members: mem.filter((id) => (g === 'f') === FEM.has(id)) });
  }
}
if (process.argv[2] === 'link') {
  const f = process.argv[3]; const idx = JSON.parse(readFileSync(f, 'utf8')); let n = 0;
  for (const pk of packs) { if (!idx.p[pk.name]) continue; for (const id of pk.members) { const L = (idx.spk[id] = idx.spk[id] || []); if (!L.includes(pk.name)) { L.push(pk.name); n++; } } delete idx.spk[pk.speaker]; }
  writeFileSync(f, JSON.stringify(idx)); console.log('enlaces', n);
} else console.log(JSON.stringify(packs.map(({ members, ...x }) => x), null, 1));
