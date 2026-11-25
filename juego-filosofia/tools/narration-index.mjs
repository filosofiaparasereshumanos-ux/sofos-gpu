// Crea audio/index.json (dónde está cada frase) a partir de los trabajos y los tiempos de narrate.py
//   node tools/narration-index.mjs narr-jobs.json narr-timings.json
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import vm from 'node:vm';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ctx = {}; vm.createContext(ctx); vm.runInContext(readFileSync(join(root, 'src/02d-narration.js'), 'utf8').split('// reproductor')[0] + ';globalThis.h = narrHash;', ctx);
const jobs = JSON.parse(readFileSync(process.argv[2], 'utf8')), tm = JSON.parse(readFileSync(process.argv[3], 'utf8'));
const EN = process.env.LANG_GAME === 'en'; const AD = join(root, 'audio', EN ? 'en' : '');
const have = new Set(readdirSync(AD).filter((f) => f.endsWith('.mp3')).map((f) => (EN ? 'en/' : '') + f.slice(0, -4)));
const idx = { spk: {}, p: {} };
for (const j of jobs) {
  const t = tm[j.name]; if (!t || !have.has(j.name)) { console.error('falta', j.name); continue; }
  if (t.length !== j.sentences.length) { console.error('desfasado', j.name); continue; }
  const m = {}; j.sentences.forEach((s, k) => { m[ctx.h(s)] = [Math.round(t[k][0] * 100), Math.round(t[k][1] * 100)]; });
  idx.p[j.name] = m; (idx.spk[j.speaker] = idx.spk[j.speaker] || []).push(j.name);
}
// frases comunes de los debates (d-<voz>): se añaden a cada pensador que habla con esa voz
for (const j of jobs) if (/^(en\/)?p-/.test(j.name) && idx.spk[j.speaker]) { const g = (EN ? 'en/' : '') + 'd-' + j.voice; if (idx.p[g] && !idx.spk[j.speaker].includes(g)) idx.spk[j.speaker].push(g); }
writeFileSync(join(AD, 'index.json'), JSON.stringify(idx));
console.log('paquetes:', Object.keys(idx.p).length, 'bytes:', JSON.stringify(idx).length);
