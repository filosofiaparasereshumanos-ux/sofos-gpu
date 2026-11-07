// Une los archivos de src/ en un único index.html jugable (sin dependencias locales).
//   node build.mjs              -> genera index.html
//   node build.mjs --fragment X -> además genera X sin <html>/<head> (para incrustar)
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, 'src');
const parts = readdirSync(src).filter((f) => /^\d\d-.*\.js$/.test(f)).sort();
const code = parts.map((f) => `// ---- ${f} ----\n` + readFileSync(join(src, f), 'utf8')).join('\n');
const template = readFileSync(join(src, 'template.html'), 'utf8');
const fragment = template.replace('/*__GAME__*/', () => code);

const cut = fragment.indexOf('<div id="app">');
const head = fragment.slice(0, cut), body = fragment.slice(cut);
const full = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="Juego de filosofía en primera persona: de los presocráticos a Kant.">
${head}</head>
<body>
${body}</body>
</html>
`;
writeFileSync(join(here, 'index.html'), full);
console.log(`index.html: ${(full.length / 1024).toFixed(0)} KB (${parts.join(', ')})`);

const i = process.argv.indexOf('--fragment');
if (i > 0 && process.argv[i + 1]) { writeFileSync(process.argv[i + 1], fragment); console.log('fragmento:', process.argv[i + 1]); }
