// Frases que se graban con ElevenLabs (lo que más se oye): la bienvenida del guía en cada mundo y la
// presentación y despedida de cada maestro final. Salen paquetes «e-…» con el mismo formato que
// narration-text.mjs; narration-index los pone delante, así que tienen prioridad sobre Kokoro.
//   node tools/eleven-text.mjs > eleven-jobs.json
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'tools/narration-text.mjs'), 'utf8'); const files = eval(src.match(/const files = (\[[^\]]*\])/)[1]);
const FEMALE = eval(src.match(/const FEMALE = new Set\((\[[^\]]*\])/)[1]);
const ctx = {}; vm.createContext(ctx);
vm.runInContext(files.map((f) => readFileSync(join(root, f), 'utf8')).join('\n') + '\n;globalThis.__o = { ERAS, NPCS, narrSplit };', ctx);
const { ERAS, NPCS, narrSplit } = ctx.__o;
const MALE = ['George', 'Bill', 'Daniel', 'Roger', 'Callum', 'Eric'], FEM = ['Charlotte', 'Alice', 'Matilda'];
const packs = []; let m = 0, f = 0;
NPCS.forEach((list, i) => { const g = list.find((n) => n.greeter); if (g) packs.push({ name: 'e-' + g.id, voice: 'Brian', speaker: g.id, sentences: g.lines.slice(0, 2).flatMap(narrSplit) }); });
for (const e of ERAS) { const b = e.sages.find((s) => s.boss); if (!b) continue;
  const fem = FEMALE.includes(b.id); packs.push({ name: 'e-' + b.id, voice: fem ? FEM[f++ % FEM.length] : MALE[m++ % MALE.length], speaker: b.id, sentences: [...narrSplit(b.intro), ...narrSplit(b.defeat)] }); }
process.stdout.write(JSON.stringify(packs));
