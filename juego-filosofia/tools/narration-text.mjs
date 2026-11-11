// Extrae todas las frases narrables del juego, agrupadas en paquetes de audio.
//   node tools/narration-text.mjs > narr-jobs.json
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
// LANG_GAME=en: lee los textos traducidos (tools/i18n/build-en) y usa voces inglesas; los paquetes van a audio/en/
const EN = process.env.LANG_GAME === 'en'; const SRC = EN ? join(root, 'tools', 'i18n', 'build-en') : root; const PFX = EN ? 'en/' : '';
const FEMALE = new Set(['teano', 'hipatia', 'hildegarda', 'pizan', 'sorjuana', 'castellanos', 'beauvoir', 'arendt', 'enheduanna', 'rabia', 'safo', 'mistral', 'curie', 'lovelace', 'murasaki', 'volva', 'aud', 'banzhao', 'gargi', 'maathai', 'macuilxochitzin', 'janequeo', 'machi', 'dickinson']);
const ENV = (v, id, female) => (!EN ? v : { voice: female ? 'lessac' : 'ryan', pitch: v.pitch });
const files = ['src/01-data.js', 'src/01a-lessons.js', 'src/01c-contemporanea.js', 'src/01d-pensadoras.js', 'src/01e-latinoamerica.js', 'src/01f-mundo.js', 'src/01g-sumer.js', 'src/01h-islam.js', 'src/01i-poetas.js', 'src/01j-ciencia.js', 'src/01k-japon.js', 'src/01l-vikingos.js', 'src/01m-persia.js', 'src/01n-mas-pensadores.js', 'src/01o-sabios.js', 'src/02b-places.js', 'src/02c-polis.js', 'src/02d-narration.js', 'src/02e-books.js', 'src/02f-contemporanea.js', 'src/02g-latinoamerica.js', 'src/02h-mundo.js', 'src/02i-sumer.js', 'src/02j-islam.js', 'src/02k-poetas.js', 'src/02l-ciencia.js', 'src/02n-japon.js', 'src/02o-vikingos.js', 'src/02t-persia.js', 'src/02w-mas-pensadores.js', 'src/02p-dialogos.js', 'src/02q-caverna.js', 'src/02z-guia.js', 'src/02x-versus.js'];
const code = files.map((f) => readFileSync(join(SRC, f), 'utf8')).join('\n') +
  '\n;globalThis.__out = { ERAS, LESSONS, POIS, NPCS, sageSpeech, NPC_GENERIC, NARR_GENERIC, narrSplit, narrHash, SAGE_VOICE, BOOKS, bookPartText, DIALOGOS, VERSUS };';
const ctx = { console }; vm.createContext(ctx); vm.runInContext(code, ctx);
const { ERAS, LESSONS, POIS, NPCS, sageSpeech, NPC_GENERIC, NARR_GENERIC, narrSplit, SAGE_VOICE, BOOKS, bookPartText, DIALOGOS, VERSUS } = ctx.__out;
const packs = [];
const pack = (name, voice, pitch, speaker, texts) => {
  const seen = new Set(); const sentences = [];
  for (const t of texts) for (const s of narrSplit(t)) if (!seen.has(s)) { seen.add(s); sentences.push(s); }
  packs.push({ name: PFX + name, voice, pitch, speaker, sentences });
};
// diálogos socráticos: sus frases van en el paquete p- del pensador (frases fijas: deben coincidir con src/04c-dialogo.js)
const DLG_FIXED = ['Te propongo una idea, para que la examinemos juntos.', 'Interesante. ¿Por qué lo piensas? Dame tu mejor razón.', 'Has dialogado de verdad: has tomado postura, has dado razones y has respondido a la objeción.', 'Pero todavía no me has dado razones firmes. Pensémoslo otra vez, sin prisa.'];
const dlgTexts = (D) => (D ? [...DLG_FIXED, `${DLG_FIXED[0]} «${D.tesis}» ¿Qué piensas tú?`, ...D.posturas.flatMap((p) => [p.objecion, p.cierre])] : []);
ERAS.forEach((era) => era.sages.forEach((d) => {
  const v = ENV(SAGE_VOICE(d), d.id, FEMALE.has(d.id));
  pack('l-' + d.id, v.voice, v.pitch, d.id, LESSONS[d.id] || []);
  const lesson = new Set((LESSONS[d.id] || []).flatMap(narrSplit));
  pack('p-' + d.id, v.voice, v.pitch, d.id, [...sageSpeech(d).flatMap(narrSplit).filter((s) => !lesson.has(s)), ...dlgTexts(DIALOGOS[d.id])]);
}));
// textos de las tarjetas de los experimentos jugables (cadenas largas de esos archivos), con la voz del narrador
const zoneTexts = ['src/02r-zonas.js', 'src/02s-zonas2.js', 'src/02u-zonas3.js'].flatMap((f) => [...readFileSync(join(SRC, f), 'utf8').matchAll(/'([«¿¡A-ZÁÉÍÓÚÑ](?:[^'\\\n]|\\.){59,})'/g)].map((m) => m[1].replace(/\\'/g, "'")).filter((t) => !/[{}=$]|=>/.test(t)));
pack('x-zonas', EN ? 'alan' : 'carlfm', 1, 'narr', zoneTexts);
POIS.forEach((list, i) => pack('n-' + i, EN ? 'alan' : 'carlfm', 1, 'narr', [...list.flatMap((p) => [p.name + '. ' + p.text, p.text + ' ' + p.fact]), ...(i === 0 ? NARR_GENERIC : [])]));
NPCS.forEach((list, i) => list.forEach((n) => {
  let v = n.id.startsWith('guia') ? { voice: 'carlfm', pitch: 0.93 } : n.female ? { voice: 'carlfm', pitch: 1.12 } : { voice: 'carlfm', pitch: [1.08, 0.97, 1.14, 1.02][n.id.length % 4] };
  if (EN) v = n.id.startsWith('guia') ? { voice: 'alan', pitch: 0.95 } : { voice: n.female ? 'amy' : 'joe', pitch: n.female ? 1 : [1.03, 0.97, 1.06, 1.0][n.id.length % 4] };
  pack('c-' + n.id, v.voice, v.pitch, n.id, [...n.lines, ...NPC_GENERIC]);
}));
BOOKS.flat().forEach((b) => pack('b-' + b.id, EN ? 'alan' : 'carlfm', 1, 'narr', [...b.parts.map(bookPartText), 'Una cita para recordar. ' + b.quote]));
// debates entre pensadores: los turnos de cada uno, con su voz
{ const S = {}; for (const e of ERAS) for (const d of e.sages) S[d.id] = d; const by = {};
  for (const v of VERSUS) for (const [who, t] of v.turns) (by[v[who]] = by[v[who]] || []).push(t);
  for (const [id, texts] of Object.entries(by)) { const vo = ENV(SAGE_VOICE(S[id]), id, FEMALE.has(id)); pack('v-' + id, vo.voice, vo.pitch, id, texts); } }
process.stdout.write(JSON.stringify(packs));
