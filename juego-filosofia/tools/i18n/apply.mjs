// Escribe tools/i18n/build-en/ (src/*.js y template.html) con los textos traducidos de
// en.json (y las correcciones de en-fix.json, que mandan). Luego: node build.mjs --lang en
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, srcFiles, scan, scanHtml } from './common.mjs';
const D = join(ROOT, 'tools', 'i18n'); const OUT = join(D, 'build-en');
const EN = JSON.parse(readFileSync(join(D, 'en.json'), 'utf8'));
const FIX = existsSync(join(D, 'en-fix.json')) ? JSON.parse(readFileSync(join(D, 'en-fix.json'), 'utf8')) : {};
const GLOSS = JSON.parse(readFileSync(join(D, 'glosario.json'), 'utf8')).map(([a, b]) => [new RegExp(a, 'g'), b]);
const gloss = (t) => (t == null ? t : GLOSS.reduce((x, [re, b]) => x.replace(re, b), t));
const tr = (s) => (FIX[s] != null ? FIX[s] : gloss(EN[s]));
let used = 0, kept = 0;
const escLit = (s, q) => s.replace(/\\/g, '\\\\').replace(new RegExp(q, 'g'), '\\' + q).replace(/\n/g, '\\n').replace(/\r/g, '\\r');
const escTpl = (s) => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
function render(code, items, a, b) {
  // reemplaza los textos que están directamente dentro de [a, b)
  let out = '', pos = a;
  const top = items.filter((it) => it.start >= a && it.end <= b && !items.some((o) => o !== it && o.start <= it.start && o.end >= it.end && o.start >= a && o.end <= b && (o.start < it.start || o.end > it.end)));
  for (const it of top) {
    out += code.slice(pos, it.start); pos = it.end; const t = tr(it.text);
    if (it.kind === 'lit') { if (t && t !== it.text) { out += it.quote + escLit(t, it.quote) + it.quote; used++; } else { out += code.slice(it.start, it.end); kept++; } continue; }
    // plantilla: los huecos ⟦i⟧ deben seguir todos, una vez cada uno
    const ok = t && it.exprs.every((_, i) => t.split(`⟦${i}⟧`).length === 2);
    if (!ok) { out += '`'; let p = it.start + 1; for (const [s, e] of it.exprs) { out += code.slice(p, s) + render(code, items, s, e); p = e; } out += code.slice(p, it.end); kept++; continue; }
    let res = '`', rest = t; const parts = [];
    for (let i = 0; i < it.exprs.length; i++) { }
    res += escTpl(t).replace(/⟦(\d+)⟧/g, (_, i) => '${' + render(code, items, it.exprs[+i][0], it.exprs[+i][1]) + '}'); res += '`';
    out += res; used++;
  }
  return out + code.slice(pos, b);
}
mkdirSync(join(OUT, 'src'), { recursive: true });
for (const f of srcFiles()) {
  let code = readFileSync(join(ROOT, 'src', f), 'utf8'); const items = scan(code);
  code = render(code, items, 0, code.length);
  // voz, números y fechas en inglés
  code = code.replace(/\/\^es\[-_\]ES\/i/g, '/^en[-_](US|GB)/i').replace(/\/\^es\/i/g, '/^en/i').replace(/'es-ES'/g, "'en-US'").replace(/u\.lang = 'es-ES'/g, "u.lang = 'en-US'");
  writeFileSync(join(OUT, 'src', f), code);
}
let html = readFileSync(join(ROOT, 'src', 'template.html'), 'utf8'); const hi = scanHtml(html);
for (const it of hi.reverse()) { const t = tr(it.text); if (!t || t === it.text) { kept++; continue; } const v = it.kind === 'attr' ? t.replace(/"/g, '&quot;') : t.replace(/</g, '&lt;'); html = html.slice(0, it.start) + v + html.slice(it.end); used++; }
html = html.replace('content: "Nuevo"', 'content: "New"');
html = html.replace('id="b-lang" href="index-en.html">English<', 'id="b-lang" href="index.html">Español<');
html = html.replace('id="b-lang2" href="index-en.html" aria-label="English version">EN<', 'id="b-lang2" href="index.html" aria-label="Versión en español">ES<');
writeFileSync(join(OUT, 'src', 'template.html'), html);
console.log('traducidos', used, 'sin traducir', kept);
