// Extrae todas las frases narrables del juego, agrupadas en paquetes de audio.
//   node tools/narration-text.mjs > narr-jobs.json
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const files = ['src/01-data.js', 'src/01a-lessons.js', 'src/01c-contemporanea.js', 'src/01d-pensadoras.js', 'src/01e-latinoamerica.js', 'src/02b-places.js', 'src/02c-polis.js', 'src/02d-narration.js', 'src/02e-books.js', 'src/02f-contemporanea.js', 'src/02g-latinoamerica.js'];
const code = files.map((f) => readFileSync(join(root, f), 'utf8')).join('\n') +
  '\n;globalThis.__out = { ERAS, LESSONS, POIS, NPCS, sageSpeech, NPC_GENERIC, NARR_GENERIC, narrSplit, narrHash, SAGE_VOICE, BOOKS, bookPartText };';
const ctx = { console }; vm.createContext(ctx); vm.runInContext(code, ctx);
const { ERAS, LESSONS, POIS, NPCS, sageSpeech, NPC_GENERIC, NARR_GENERIC, narrSplit, SAGE_VOICE, BOOKS, bookPartText } = ctx.__out;
const packs = [];
const pack = (name, voice, pitch, speaker, texts) => {
  const seen = new Set(); const sentences = [];
  for (const t of texts) for (const s of narrSplit(t)) if (!seen.has(s)) { seen.add(s); sentences.push(s); }
  packs.push({ name, voice, pitch, speaker, sentences });
};
ERAS.forEach((era) => era.sages.forEach((d) => {
  const v = SAGE_VOICE(d);
  pack('l-' + d.id, v.voice, v.pitch, d.id, LESSONS[d.id] || []);
  const lesson = new Set((LESSONS[d.id] || []).flatMap(narrSplit));
  pack('p-' + d.id, v.voice, v.pitch, d.id, sageSpeech(d).flatMap(narrSplit).filter((s) => !lesson.has(s)));
}));
POIS.forEach((list, i) => pack('n-' + i, 'carlfm', 1, 'narr', [...list.flatMap((p) => [p.name + '. ' + p.text, p.text + ' ' + p.fact]), ...(i === 0 ? NARR_GENERIC : [])]));
NPCS.forEach((list, i) => list.forEach((n) => {
  const v = n.female ? { voice: 'carlfm', pitch: 1.12 } : { voice: 'carlfm', pitch: [1.08, 0.97, 1.14, 1.02][n.id.length % 4] };
  pack('c-' + n.id, v.voice, v.pitch, n.id, [...n.lines, ...NPC_GENERIC]);
}));
BOOKS.flat().forEach((b) => pack('b-' + b.id, 'carlfm', 1, 'narr', [...b.parts.map(bookPartText), 'Una cita para recordar. ' + b.quote]));
process.stdout.write(JSON.stringify(packs));
