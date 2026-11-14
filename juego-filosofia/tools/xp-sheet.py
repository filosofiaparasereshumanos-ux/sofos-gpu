"""Agrupa las pinturas de los experimentos (tools/experimentos/x-<id>.jpg) en img/experimentos.jpg
y escribe src/00f-xp-art.js (id -> fila). Uso: python3 tools/xp-sheet.py"""
import os, json
from PIL import Image
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
d = os.path.join(root, 'tools', 'experimentos'); ids = sorted(f[2:-4] for f in os.listdir(d) if f.startswith('x-') and f.endswith('.jpg'))
W, H = 768, 432; sheet = Image.new('RGB', (W, H * len(ids)), (26, 18, 10))
for k, i in enumerate(ids): sheet.paste(Image.open(os.path.join(d, f'x-{i}.jpg')).convert('RGB').resize((W, H)), (0, k * H))
sheet.save(os.path.join(root, 'img', 'experimentos.jpg'), quality=80, optimize=True)
open(os.path.join(root, 'src', '00f-xp-art.js'), 'w').write('// Pinturas de los experimentos (lo genera tools/xp-sheet.py): id -> fila de img/experimentos.jpg\nconst XP_ART = ' + json.dumps({i: k for k, i in enumerate(ids)}) + ', XP_ART_ROWS = ' + str(len(ids)) + ';\n')
print(len(ids), 'pinturas')
