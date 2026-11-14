// Extrae todas las frases narrables del juego, agrupadas en paquetes de audio.
//   node tools/narration-text.mjs > narr-jobs.json
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
// LANG_GAME=en: lee los textos traducidos (tools/i18n/build-en) y usa voces inglesas; los paquetes van a audio/en/
const EN = process.env.LANG_GAME === 'en'; const SRC = EN ? join(root, 'tools', 'i18n', 'build-en') : root; const PFX = EN ? 'en/' : '';
const FEMALE = new Set(['cherschel', 'leavitt', 'payne', 'rubin', 'stebbing', 'teano', 'hipatia', 'hildegarda', 'pizan', 'sorjuana', 'castellanos', 'beauvoir', 'arendt', 'enheduanna', 'rabia', 'safo', 'mistral', 'curie', 'lovelace', 'murasaki', 'volva', 'aud', 'banzhao', 'gargi', 'maathai', 'macuilxochitzin', 'janequeo', 'machi', 'dickinson', 'ernestinerose', 'teresa', 'weil', 'chatelet', 'wollstonecraft', 'gouges', 'truth', 'tristan', 'stein', 'zambrano', 'mirabai', 'montessori', 'carson', 'caceres', 'noether', 'frida', 'liliuokalani', 'nightingale']);
// en español, Kokoro: Santa para ellos, Dora para ellas; el tono de cada pensador varía un poco
const ENV = (v, id, female) => (!EN ? { voice: female ? 'dora' : 'santa', pitch: +(1 + (v.pitch - 1) * 0.5).toFixed(3) } : { voice: female ? 'af_heart' : 'am_michael', pitch: +(1 + (v.pitch - 1) * 0.5).toFixed(3) });
const files = ['src/01-data.js', 'src/01a-lessons.js', 'src/01c-contemporanea.js', 'src/01d-pensadoras.js', 'src/01e-latinoamerica.js', 'src/01f-mundo.js', 'src/01g-sumer.js', 'src/01h-islam.js', 'src/01i-poetas.js', 'src/01j-ciencia.js', 'src/01k-japon.js', 'src/01l-vikingos.js', 'src/01m-persia.js', 'src/01n-mas-pensadores.js', 'src/01o-sabios.js', 'src/01p-fe-y-duda.js', 'src/01q-tres-mundos.js', 'src/01r-mente-tierra-numeros.js', 'src/01s-belleza-pueblos-cuidado.js', 'src/01t-frases.js', 'src/01v-falacias.js', 'src/01w-cosmos.js', 'src/01x-biblia.js', 'src/01y-coran.js', 'src/02b-places.js', 'src/02c-polis.js', 'src/02d-narration.js', 'src/02e-books.js', 'src/02f-contemporanea.js', 'src/02g-latinoamerica.js', 'src/02h-mundo.js', 'src/02i-sumer.js', 'src/02j-islam.js', 'src/02k-poetas.js', 'src/02l-ciencia.js', 'src/02n-japon.js', 'src/02o-vikingos.js', 'src/02t-persia.js', 'src/02w-mas-pensadores.js', 'src/02x-versus.js', 'src/02y-fe-y-duda.js', 'src/02p-dialogos.js', 'src/02q-caverna.js', 'src/02z-guia.js', 'src/01u-debate.js'];
const code = files.map((f) => readFileSync(join(SRC, f), 'utf8')).join('\n') +
  '\n;globalThis.__out = { FRASES, ERAS, LESSONS, POIS, NPCS, sageSpeech, NPC_GENERIC, NARR_GENERIC, narrSplit, narrHash, SAGE_VOICE, BOOKS, bookPartText, DIALOGOS, VERSUS, DEB_LINES, FALACIAS: typeof FALACIAS !== \'undefined\' ? FALACIAS : [], PLANETAS: typeof PLANETAS !== \'undefined\' ? PLANETAS : [], COSMOS_ESCALAS: typeof COSMOS_ESCALAS !== \'undefined\' ? COSMOS_ESCALAS : [] };';
const ctx = { console }; vm.createContext(ctx); vm.runInContext(code, ctx);
const { FRASES, ERAS, LESSONS, POIS, NPCS, sageSpeech, NPC_GENERIC, NARR_GENERIC, narrSplit, SAGE_VOICE, BOOKS, bookPartText, DIALOGOS, VERSUS, DEB_LINES, FALACIAS, PLANETAS, COSMOS_ESCALAS } = ctx.__out;
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
  if (FRASES[d.id]) pack('f-' + d.id, v.voice, v.pitch, d.id, FRASES[d.id].map((f) => f[0]));
  pack('p-' + d.id, v.voice, v.pitch, d.id, [...sageSpeech(d).flatMap(narrSplit).filter((s) => !lesson.has(s)), ...dlgTexts(DIALOGOS[d.id])]);
}));
// textos de las tarjetas de los experimentos jugables (cadenas largas de esos archivos), con la voz del narrador
const zoneTexts = ['src/02r-zonas.js', 'src/02s-zonas2.js', 'src/02u-zonas3.js'].flatMap((f) => [...readFileSync(join(SRC, f), 'utf8').matchAll(/'([«¿¡A-ZÁÉÍÓÚÑ](?:[^'\\\n]|\\.){59,})'/g)].map((m) => m[1].replace(/\\'/g, "'")).filter((t) => !/[{}=$]|=>/.test(t)));
pack('x-zonas', EN ? 'am_fenrir' : 'santa', 1, 'narr', zoneTexts);
POIS.forEach((list, i) => pack('n-' + i, EN ? 'am_fenrir' : 'santa', 1, 'narr', [...list.flatMap((p) => [p.name + '. ' + p.text, p.text + ' ' + p.fact]), ...(i === 0 ? NARR_GENERIC : [])]));
NPCS.forEach((list, i) => list.forEach((n) => {
  let v = n.id.startsWith('guia') ? { voice: 'santa', pitch: 0.97 } : n.female ? { voice: 'dora', pitch: [1.0, 0.97, 1.03, 1.0][n.id.length % 4] } : { voice: 'santa', pitch: [1.04, 0.98, 1.07, 1.01][n.id.length % 4] };
  if (EN) v = n.id.startsWith('guia') ? { voice: 'am_fenrir', pitch: 0.97 } : { voice: n.female ? 'af_bella' : 'am_puck', pitch: n.female ? 1 : [1.03, 0.98, 1.05, 1.0][n.id.length % 4] };
  pack('c-' + n.id, v.voice, v.pitch, n.id, [...n.lines, ...NPC_GENERIC]);
}));
BOOKS.flat().forEach((b) => pack('b-' + b.id, EN ? 'am_fenrir' : 'santa', 1, 'narr', [...b.parts.map(bookPartText), (EN ? 'A quote to remember. ' : 'Una cita para recordar. ') + b.quote]));
// debates entre pensadores: los turnos de cada uno, con su voz
{ const S = {}; for (const e of ERAS) for (const d of e.sages) S[d.id] = d; const by = {};
  for (const v of VERSUS) for (const [who, t] of v.turns) (by[v[who]] = by[v[who]] || []).push(t);
  for (const [id, texts] of Object.entries(by)) { const vo = ENV(SAGE_VOICE(S[id]), id, FEMALE.has(id)); pack('v-' + id, vo.voice, vo.pitch, id, texts); } }
// cazador de falacias: los pregones y las explicaciones, con la voz del narrador
pack('x-falacias', EN ? 'am_fenrir' : 'santa', 1, 'narr', [EN ? 'The crier shouts this to convince you. What fallacy is hidden in the argument?' : 'El pregonero grita esto para convencerte. ¿Qué falacia esconde su argumento?', ...FALACIAS.flatMap((f) => [...f.ej, f.d + (EN ? ' How to respond: ' : ' Cómo responder: ') + f.r])]);
// cosmos: fichas de los planetas (sin peso propio) y escalas del atlas, con la voz del narrador (deben coincidir con 06w-cosmos.js)
pack('x-cosmos', EN ? 'am_fenrir' : 'santa', 1, 'narr', [...PLANETAS.map((p) => EN
  ? `${p.tipo}. Diameter: ${p.diam}. Distance from the Sun: ${p.dist}. Day: ${p.dia}. Year: ${p.ano}. Moons: ${p.lunas}. Temperature: ${p.temp}. ${p.datos.join(' ')} The gravity here is ${p.g} times that of Earth.`
  : `${p.tipo}. Diámetro: ${p.diam}. Distancia al Sol: ${p.dist}. Día: ${p.dia}. Año: ${p.ano}. Lunas: ${p.lunas}. Temperatura: ${p.temp}. ${p.datos.join(' ')} La gravedad aquí es ${String(p.g).replace('.', ',')} veces la de la Tierra.`),
  ...COSMOS_ESCALAS.map((e) => e.n + '. ' + e.d)]);
// debates: frases cortas comunes a todos los pensadores, una grabación por voz (el índice las añade a cada pensador)
for (const v of EN ? ['am_michael', 'af_heart'] : ['santa', 'dora']) pack('d-' + v, v, 1, 'gen-' + v, Object.values(DEB_LINES).flat());
process.stdout.write(JSON.stringify(packs));
