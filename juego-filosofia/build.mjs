// Empaqueta el juego en archivos HTML autocontenidos.
//   node build.mjs              -> index.html (viaje 3D) y cartas.html (duelo de cartas)
//   node build.mjs --fragment X -> además genera X (viaje 3D) sin <html>/<head>, para incrustar
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
// --lang en: usa los textos traducidos de tools/i18n/build-en/ (ver tools/i18n/apply.mjs) y escribe index-en.html
const EN = process.argv.includes('--lang') && process.argv[process.argv.indexOf('--lang') + 1] === 'en';
const read = (p) => readFileSync(join(here, EN && /^src\/(\d\d[a-z]?-.*\.js|template\.html)$/.test(p) ? 'tools/i18n/build-en/' + p : p), 'utf8');

function page(template, code, description, extraHead = '') {
  const fragment = template.replace('/*__GAME__*/', () => code);
  const cut = fragment.search(/<canvas id="bg"|<div id="app">/);
  const head = fragment.slice(0, cut), body = fragment.slice(cut);
  const full = `<!doctype html>
<html lang="${EN ? 'en' : 'es'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="${description}">
${extraHead}${head}</head>
<body>
${body}</body>
</html>
`;
  return { fragment, full };
}
const join_ = (files) => files.map((f) => `// ---- ${f} ----\n` + read(f)).join('\n');

// --- Duelo de cartas (juego principal)
if (!EN) {
const cartas = ['cartas/base.js', 'src/00b-audio.js', 'src/01-data.js', 'src/01a-lessons.js', 'src/03a-music.js', 'cartas/cards.js', 'cartas/game.js'];
const c = page(read('cartas/template.html'), join_(cartas), 'Duelo de filósofos: vence a 25 pensadores, de Tales a Kant, y colecciona sus ideas como cartas.');
writeFileSync(join(here, 'cartas.html'), c.full);
console.log(`cartas.html (duelo de cartas): ${(c.full.length / 1024).toFixed(0)} KB`);
}

// --- Aventura 3D (versión anterior)
const parts3d = readdirSync(join(here, 'src')).filter((f) => /^\d\d[a-z]?-.*\.js$/.test(f)).sort().map((f) => 'src/' + f);
let narr = '{}'; try { narr = read(EN ? 'audio/en/index.json' : 'audio/index.json'); } catch (e) { console.log('(sin audio/index.json: solo voz del sistema)'); }
// voces grabadas aparte (p. ej. el filósofo guía), que no salen de tools/narrate.py
if (!EN) try { const n = JSON.parse(narr), x = JSON.parse(read('audio/extra-index.json')); Object.assign(n.spk, x.spk); Object.assign(n.p, x.p); narr = JSON.stringify(n); } catch (e) { /* sin extras */ }
// Cabecera de la versión web: app instalable y vista previa al compartir el enlace
const APP_HEAD = `<meta name="theme-color" content="#120d07">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" type="image/png" href="img/favicon.png">
<link rel="apple-touch-icon" href="img/apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Odisea">
<meta property="og:type" content="website">
<meta property="og:title" content="Odisea de la Razón · ¿Te atreves a pensar?">
<meta property="og:description" content="Conversa y debate con Sócrates, Hipatia, Sor Juana y 214 pensadores más en 35 épocas, de Sumer a nuestros días. Explora el mundo junto a otros viajeros y debate con ellos. Gratis, en el navegador.">
<meta property="og:image" content="https://filosofiaparasereshumanos-ux.github.io/sofos-gpu/juego-filosofia/marketing/portada-titulo.jpg">
<meta name="twitter:card" content="summary_large_image">
`;
const a = page(read('src/template.html'), `const NARR_INDEX = ${narr};\n` + join_(parts3d), 'El primer juego educativo completo de filosofía, ciencia e historia: conversa y debate con 217 pensadoras y pensadores en 35 épocas, de Sumer a nuestros días. Gratis, en el navegador.', APP_HEAD);
let full = a.full;
if (EN) full = full.replace('<meta property="og:title" content="Odisea de la Razón · ¿Te atreves a pensar?">', '<meta property="og:title" content="Odyssey of Reason · Dare to think?">')
  .replace(/<meta property="og:description" content="[^"]*">/, '<meta property="og:description" content="Talk and debate with Socrates, Hypatia, Sor Juana and 214 more thinkers across 35 eras, from Sumer to today. Explore the world with other travelers. Free, in your browser.">')
  .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="The first complete educational game of philosophy, science and history: talk and debate with 217 thinkers across 35 eras, from Sumer to today. Free.">');
writeFileSync(join(here, EN ? 'index-en.html' : 'index.html'), full);
console.log(`${EN ? 'index-en.html' : 'index.html'} (viaje 3D): ${(full.length / 1024).toFixed(0)} KB`);

const i = process.argv.indexOf('--fragment');
if (i > 0 && process.argv[i + 1]) { writeFileSync(process.argv[i + 1], a.fragment); console.log('fragmento:', process.argv[i + 1]); }
