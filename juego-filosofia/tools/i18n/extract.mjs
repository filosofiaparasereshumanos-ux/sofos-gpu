// Junta todos los textos visibles en tools/i18n/strings.json (únicos).
//   node tools/i18n/extract.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, srcFiles, scan, scanHtml } from './common.mjs';
const set = new Map();
for (const f of srcFiles()) { for (const it of scan(readFileSync(join(ROOT, 'src', f), 'utf8'))) set.set(it.text, (set.get(it.text) || 0) + 1); }
for (const it of scanHtml(readFileSync(join(ROOT, 'src', 'template.html'), 'utf8'))) set.set(it.text, (set.get(it.text) || 0) + 1);
const list = [...set.keys()];
writeFileSync(join(ROOT, 'tools', 'i18n', 'strings.json'), JSON.stringify(list, null, 0));
console.log('textos únicos:', list.length, 'caracteres:', list.reduce((a, b) => a + b.length, 0));
