"""Agrupa las pinturas de los lugares (tools/lugares/l-<id>.jpg) en una hoja por época (img/lugares-<i>.jpg)
y escribe src/00d-place-art.js con dónde está cada una. Uso: python3 tools/place-sheets.py"""
import json, os, subprocess
from PIL import Image
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = open(os.path.join(root, 'tools/narration-text.mjs')).read()
code = """import { readFileSync } from 'node:fs'; import vm from 'node:vm';
const src = readFileSync('tools/narration-text.mjs','utf8'); const files = eval(src.match(/const files = (\\[[^\\]]*\\])/)[1]);
const ctx = {}; vm.createContext(ctx); vm.runInContext(files.map((f) => readFileSync(f,'utf8')).join('\\n') + ';globalThis.__o=POIS.map((l)=>l.map((p)=>p.id));', ctx);
process.stdout.write(JSON.stringify(ctx.__o));"""
P = json.loads(subprocess.run(['node', '--input-type=module', '-e', code], cwd=root, capture_output=True, text=True, check=True).stdout)
W, H = 768, 432; art = {}
for i, ids in enumerate(P):
    have = [p for p in ids if os.path.exists(os.path.join(root, 'tools', 'lugares', f'l-{p}.jpg'))]
    if not have: continue
    sheet = Image.new('RGB', (W, H * len(have)), (26, 18, 10))
    for k, p in enumerate(have):
        sheet.paste(Image.open(os.path.join(root, 'tools', 'lugares', f'l-{p}.jpg')).convert('RGB').resize((W, H)), (0, k * H)); art[p] = [i, k, len(have)]
    sheet.save(os.path.join(root, 'img', f'lugares-{i}.jpg'), quality=80, optimize=True)
open(os.path.join(root, 'src/00d-place-art.js'), 'w').write('// Pinturas de los lugares agrupadas por época (lo genera tools/place-sheets.py): id -> [época, fila, filas]\nconst PLACE_ART = ' + json.dumps(art, separators=(',', ':')) + ';\n')
print(len(art), 'pinturas en', len(set(v[0] for v in art.values())), 'hojas')
