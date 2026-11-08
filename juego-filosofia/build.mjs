// Empaqueta el juego en archivos HTML autocontenidos.
//   node build.mjs              -> index.html (viaje 3D) y cartas.html (duelo de cartas)
//   node build.mjs --fragment X -> además genera X (viaje 3D) sin <html>/<head>, para incrustar
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const read = (p) => readFileSync(join(here, p), 'utf8');

function page(template, code, description) {
  const fragment = template.replace('/*__GAME__*/', () => code);
  const cut = fragment.search(/<canvas id="bg"|<div id="app">/);
  const head = fragment.slice(0, cut), body = fragment.slice(cut);
  const full = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="${description}">
${head}</head>
<body>
${body}</body>
</html>
`;
  return { fragment, full };
}
const join_ = (files) => files.map((f) => `// ---- ${f} ----\n` + read(f)).join('\n');

// --- Duelo de cartas (juego principal)
const cartas = ['cartas/base.js', 'src/00b-audio.js', 'src/01-data.js', 'src/01a-lessons.js', 'src/03a-music.js', 'cartas/cards.js', 'cartas/game.js'];
const c = page(read('cartas/template.html'), join_(cartas), 'Duelo de filósofos: vence a 25 pensadores, de Tales a Kant, y colecciona sus ideas como cartas.');
writeFileSync(join(here, 'cartas.html'), c.full);
console.log(`cartas.html (duelo de cartas): ${(c.full.length / 1024).toFixed(0)} KB`);

// --- Aventura 3D (versión anterior)
const parts3d = readdirSync(join(here, 'src')).filter((f) => /^\d\d[a-z]?-.*\.js$/.test(f)).sort().map((f) => 'src/' + f);
let narr = '{}'; try { narr = read('audio/index.json'); } catch (e) { console.log('(sin audio/index.json: solo voz del sistema)'); }
const a = page(read('src/template.html'), `const NARR_INDEX = ${narr};\n` + join_(parts3d), 'Aventura 3D de filosofía en primera persona: de los presocráticos a Kant.');
writeFileSync(join(here, 'index.html'), a.full);
console.log(`index.html (viaje 3D): ${(a.full.length / 1024).toFixed(0)} KB`);

const i = process.argv.indexOf('--fragment');
if (i > 0 && process.argv[i + 1]) { writeFileSync(process.argv[i + 1], a.fragment); console.log('fragmento:', process.argv[i + 1]); }
