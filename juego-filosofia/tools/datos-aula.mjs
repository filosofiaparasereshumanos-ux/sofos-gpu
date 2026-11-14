// Exporta los debates, mesas redondas y «Debate tú» para las páginas del docente
// (estadisticas.html y fichas.html):  node tools/datos-aula.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import vm from 'node:vm';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'tools/narration-text.mjs'), 'utf8');
const files = [...src.match(/const files = \[([^\]]*)\]/)[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
const ctx = { console }; vm.createContext(ctx);
vm.runInContext(files.map((f) => readFileSync(join(root, f), 'utf8')).join('\n') + ';globalThis.__o={ERAS,VERSUS,MESAS,POSTURAS,VS_TEMAS,OBRAS};', ctx);
const { ERAS, VERSUS, MESAS, POSTURAS, VS_TEMAS, OBRAS } = ctx.__o; const S = {}; ERAS.forEach((e) => e.sages.forEach((s) => { S[s.id] = { n: s.short, f: s.name, era: e.name, d: s.dates }; }));
const out = {
  temas: Object.fromEntries(VS_TEMAS),
  sabios: S,
  versus: VERSUS.map((v) => ({ id: v.id, a: v.a, b: v.b, q: v.q, tema: v.tema, turns: v.turns.map(([w, t]) => [v[w], t]), cierre: v.cierre })),
  mesas: MESAS.map((m) => ({ id: m.id, q: m.q, tema: m.tema, sabios: m.sabios, posturas: m.posturas, turns: m.turns, cierre: m.cierre })),
  obras: OBRAS.map((o) => ({ id: o.id, img: o.img, epoca: o.epoca, titulo: o.titulo, autor: o.autor, fecha: o.fecha, tecnica: o.tecnica, lugar: o.lugar, texto: o.texto, q: o.q, credito: o.credito || '' })),
  posturas: POSTURAS.map((p) => ({ id: p.id, q: p.q, rounds: p.rounds, fin: p.fin })),
};
writeFileSync(join(root, 'aula-datos.js'), '// Generado por tools/datos-aula.mjs: no editar a mano\nconst AULA_DATOS = ' + JSON.stringify(out) + ';\n');
console.log('aula-datos.js', out.versus.length, 'debates,', out.mesas.length, 'mesas,', out.posturas.length, 'posturas,', out.obras.length, 'obras');
