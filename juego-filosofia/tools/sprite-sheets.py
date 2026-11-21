#!/usr/bin/env python3
"""Une los retratos de ciudadanos (c-*) y las portadas (b-*) de tools/sprites/,
y los retratos de pensadores (img/p-*.jpg), en tres hojas: img/ciudadanos.jpg, img/portadas.jpg
e img/retratos.jpg, y genera
src/00e-sprites.js con  SPRITES['c-<npc>'] = [hoja, col, fila, cols, filas]."""
import glob, os, json, math
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'tools', 'sprites')
out = {}
def sheet(prefix, name, cw, ch, src=SRC, cols=8):
    files = sorted(glob.glob(os.path.join(src, prefix + '-*.jpg')) + glob.glob(os.path.join(src, prefix + '-*.png')))
    rows = math.ceil(len(files) / cols)
    img = Image.new('RGB', (cols * cw, rows * ch), (20, 16, 10))
    for i, f in enumerate(files):
        im = Image.open(f).convert('RGB'); w, h = im.size
        s = min(w / cw, h / ch); tw, th = cw * s, ch * s
        im = im.crop(((w - tw) / 2, (h - th) / 2 * (0.6 if prefix == 'c' else 1), (w + tw) / 2, (h - th) / 2 * (0.6 if prefix == 'c' else 1) + th)).resize((cw, ch), Image.LANCZOS)
        c, r = i % cols, i // cols; img.paste(im, (c * cw, r * ch))
        out[os.path.splitext(os.path.basename(f))[0]] = ['img/' + name + '.jpg', c, r, cols, rows]
    img.save(os.path.join(ROOT, 'img', name + '.jpg'), quality=82, optimize=True, progressive=True)
    print(name, len(files), img.size)
sheet('c', 'ciudadanos', 192, 192)
sheet('b', 'portadas', 192, 256)
# retratos al óleo de los pensadores (img/p-*.jpg): una sola descarga en vez de noventa
sheet('p', 'retratos', 224, 224, os.path.join(ROOT, 'img'), 10)
with open(os.path.join(ROOT, 'src', '00e-sprites.js'), 'w') as fh:
    fh.write('// Generado por tools/sprite-sheets.py: retratos de ciudadanos y portadas de libros.\n')
    fh.write('const SPRITES = ' + json.dumps(out, separators=(',', ':')) + ';\n')
