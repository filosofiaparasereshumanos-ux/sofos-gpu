// Voz del narrador para los paneles: explicaciones de los juegos de la mente (08f) y la idea de cada escuela (08h).
//   node tools/paneles-voz.mjs > jobs.json   (LANG_GAME=en: lee tools/i18n/build-en y usa la voz inglesa)
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const EN = process.env.LANG_GAME === 'en'; const SRC = EN ? join(root, 'tools', 'i18n', 'build-en') : root; const PFX = EN ? 'en/' : '';
const ctx = { ACH: [] }; vm.createContext(ctx);
vm.runInContext(readFileSync(join(root, 'src/02d-narration.js'), 'utf8').split('// reproductor')[0] + ';globalThis.S=narrSplit;', ctx);
const mj = readFileSync(join(SRC, 'src/08f-juegos-mente.js'), 'utf8'); vm.runInContext(mj.slice(0, mj.indexOf('// botones de juego')) + ';globalThis.M=MJ;', ctx);
vm.runInContext(readFileSync(join(SRC, 'src/08h-escuelas-datos.js'), 'utf8') + ';globalThis.E=ESCUELAS;', ctx);
const { M, E, S } = ctx; const T = M.T;
const mente = [T.rI, T.sI, T.mI, T.iI, T.aI, T.bI, T.kI, T.kEnd, ...M.ILUS.flatMap((x) => [x.q, x.e]), ...M.SESGOS.flatMap((x) => [x.q, x.e])];
const esc = E.schools.map((s) => s.d);
const V = EN ? 'am_fenrir' : 'santa'; const out = [];
for (const [name, texts] of [['x-mente', mente], ['x-escuelas', esc]]) { const seen = new Set(); const sentences = []; for (const t of texts) for (const s of S(t || '')) if (!seen.has(s)) { seen.add(s); sentences.push(s); } out.push({ name: PFX + name, voice: V, pitch: 1, speaker: 'narr', sentences }); }
console.log(JSON.stringify(out, null, 1));
