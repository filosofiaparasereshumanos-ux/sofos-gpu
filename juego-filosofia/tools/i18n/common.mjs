// Utilidades de la traducción: encuentra los textos visibles en el código (con acorn)
// y en la plantilla HTML, sin tocar identificadores, selectores ni claves.
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const acorn = require(process.env.ACORN || 'acorn'); const walk = require(process.env.ACORN_WALK || 'acorn-walk');
export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const srcFiles = () => readdirSync(join(ROOT, 'src')).filter((f) => /^\d\d[a-z]?-.*\.js$/.test(f)).sort();
const NOCALL = /^(\$|\$\$|querySelector|querySelectorAll|getElementById|addEventListener|removeEventListener|setAttribute|getAttribute|removeAttribute|toggle|add|remove|contains|get|set|has|delete|getItem|setItem|removeItem|fetch|rpc|send|createElement|on|toLocaleString|toLocaleDateString|Image|RegExp|matchMedia|postMessage|split|join|replace|startsWith|endsWith|includes|indexOf|achieve|Mision\.hit|hit|mapaAviso|find|findIndex|dispatchEvent|Event|CustomEvent|showView|setView|openSub|show|connect|play|load|prefetch|encode|decode|atob|btoa|parse|stringify|Audio|tone|sting|store)$/;
const SPANISH = /[áéíóúñü¿¡«»]|\b(el|la|los|las|de|del|que|y|en|un|una|es|por|con|para|tu|tus|te|se|lo|su|sus|no|al|más|como|qué|cómo|hay|este|esta|eres|soy|son|fue|era)\b/i;
export function isText(s) {
  const t = s.replace(/<[^>]+>/g, ' ').replace(/⟦\d+⟧/g, ' ').trim();
  if (!/[A-Za-zÁÉÍÓÚÑáéíóúñ]/.test(t) || t.length < 2) return false;
  if (/\b(uniform|varying|attribute|vec[234]|mat[34]|gl_\w+|void\s+main|precision|texture2D|sampler2D)\b|;\s*\n|^\s*(float|int)\s/.test(s)) return false; // código GLSL
  if (/[a-z-]+\s*:\s*[^;]+;/.test(s) && !/[.!?¿¡]\s/.test(s)) return false; // CSS en línea
  if (/^[#.\[]|^[a-z0-9_\-:\/.%]+$|https?:|\.(mp3|jpg|png|webp|js|json|html)\b|=>|\bfunction\b|rgba?\(|\d+px|^[a-z-]+:/.test(s)) return false;
  if (/^[A-Za-z0-9_-]+$/.test(t)) return /^[A-ZÁÉÍÓÚÑ¿¡]/.test(t) && t.length > 2; // una palabra: solo si empieza con mayúscula
  return SPANISH.test(t) || /^[A-ZÁÉÍÓÚÑ¿¡«]/.test(t);
}
const calleeName = (c) => (c.type === 'Identifier' ? c.name : c.type === 'MemberExpression' && !c.computed ? (c.object.type === 'Identifier' && c.object.name === 'Mision' ? 'Mision.hit' : c.property.name) : '');
// devuelve [{start, end, kind:'lit'|'tpl', text, quote, exprs:[[start,end]]}]
export function scan(code) {
  const ast = acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module', allowReturnOutsideFunction: true, allowHashBang: true });
  const out = [];
  walk.fullAncestor(ast, (node, _st, anc) => {
    const parent = anc[anc.length - 2];
    if (node.type === 'Literal' && typeof node.value === 'string') {
      if (parent && parent.type === 'Property' && parent.key === node) return;
      if (parent && parent.type === 'CallExpression' && parent.arguments[0] === node && NOCALL.test(calleeName(parent.callee))) return;
      if (parent && parent.type === 'BinaryExpression' && /^(===|!==|==|!=)$/.test(parent.operator)) return;
      if (parent && parent.type === 'SwitchCase') return;
      if (parent && parent.type === 'MemberExpression' && parent.property === node) return;
      if (!isText(node.value)) return;
      out.push({ start: node.start, end: node.end, kind: 'lit', text: node.value, quote: code[node.start] });
    } else if (node.type === 'TemplateLiteral') {
      if (parent && parent.type === 'TaggedTemplateExpression') return;
      let text = ''; node.quasis.forEach((q, i) => { text += q.value.cooked; if (i < node.expressions.length) text += `⟦${i}⟧`; });
      if (!isText(text)) return;
      out.push({ start: node.start, end: node.end, kind: 'tpl', text, exprs: node.expressions.map((e) => [e.start, e.end]) });
    }
  });
  return out.sort((a, b) => a.start - b.start);
}
// la plantilla HTML: textos entre etiquetas y atributos visibles
export function scanHtml(html) {
  const out = []; const cut = html.indexOf('<script'); const body = cut > 0 ? html.slice(0, cut) : html;
  const styleRanges = [...body.matchAll(/<style[\s\S]*?<\/style>/g)].map((m) => [m.index, m.index + m[0].length]);
  const inStyle = (i) => styleRanges.some(([a, b]) => i >= a && i < b);
  for (const m of body.matchAll(/>([^<>]+)</g)) { const t = m[1]; const s = m.index + 1; if (inStyle(s) || !isText(t.trim())) continue; const lead = t.match(/^\s*/)[0].length, trail = t.match(/\s*$/)[0].length; out.push({ start: s + lead, end: s + t.length - trail, kind: 'html', text: t.trim() }); }
  for (const m of body.matchAll(/\b(aria-label|placeholder|title|alt|data-tip)="([^"]+)"/g)) { const s = m.index + m[0].indexOf('"') + 1; if (inStyle(s) || !isText(m[2])) continue; out.push({ start: s, end: s + m[2].length, kind: 'attr', text: m[2] }); }
  return out.sort((a, b) => a.start - b.start);
}
