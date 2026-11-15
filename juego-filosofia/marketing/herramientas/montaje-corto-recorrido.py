"""Corto «Recorrido narrado» (vertical 1080x1920, ~30 s): el juego se juega solo mientras haces ejercicio.
Abre con una imagen (persona en la elíptica) y sigue con el recorrido real por varios mundos.
Uso: python3 montaje-corto-recorrido.py <tomas> <carpeta voz> <música.mp3> <logo.png> <salida.mp4> <imagen de apertura>"""
import json, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
TOMAS, VOZ, MUSIC, LOGO, OUTF, IMG = sys.argv[1:7]
W, H, FPS = 1080, 1920, 30
TMP = OUTF + '.tmp'; os.makedirs(TMP, exist_ok=True)
F_BLACK = '/usr/share/fonts/opentype/inter/Inter-Black.otf'
F_SERIF_B = '/usr/share/fonts/truetype/crosextra/Caladea-Bold.ttf'
F_SERIF = '/usr/share/fonts/truetype/crosextra/Caladea-Regular.ttf'
GOLD = (255, 205, 105); CREAM = (250, 242, 225); RED = (255, 110, 90); GREEN = (120, 235, 150)
folder = {d.split('-', 1)[1]: os.path.join(TOMAS, d) for d in os.listdir(TOMAS)}
frames = {k: sorted(os.path.join(v, f) for f in os.listdir(v)) for k, v in folder.items()}
# cuándo entra cada frase de la voz
VT = {'hook': 0.3, 'como': 3.9, 'guia': 7.7, 'pensadores': 10.1, 'historia': 14.3, 'cierre': 20.9}
END = 30.0
BLUE = (150, 210, 255)
# (toma, inicio, fin, rótulo, color, subrótulo); 'IMG' es la imagen de apertura
SEG = [
    ('IMG', 0, 3.7, '¿NO TIENES TIEMPO PARA JUGAR?', GOLD, 'Este juego juega por ti'),
    ('portada', 3.7, 5.9, 'RECORRIDO NARRADO', BLUE, 'Un toque y listo'),
    ('panel', 5.9, 7.6, 'CAMINA, CORRE O PEDALEA', BLUE, 'El juego avanza solo'),
    ('sumer-0', 7.6, 10.0, 'SIN TOCAR NADA', GOLD, 'La cámara camina por ti'),
    ('sumer-1', 10.0, 12.2, 'CADA PENSADOR TE HABLA', GOLD, 'con su propia voz'),
    ('atenas-0', 12.2, 14.3, 'VISITAS LOS LUGARES', GOLD, 'El Partenón, el zigurat de Ur…'),
    ('atenas-1', 14.3, 16.4, '37 MUNDOS', GOLD, 'De Sumer a nuestros días'),
    ('biblia-0', 16.4, 18.5, '+230 PENSADORES', GOLD, 'Filosofía, ciencia, arte y fe'),
    ('cosmos-0', 18.5, 20.7, 'CON SUBTÍTULOS', GOLD, 'Pausa · saltar · mundo siguiente'),
    ('IMG', 20.7, 24.6, 'APRENDE', GOLD, 'mientras haces ejercicio'),
]
def font(p, s): return ImageFont.truetype(p, s)
def fit(d, txt, path, size, maxw):
    f = font(path, size)
    while d.textlength(txt, font=f) > maxw and f.size > 30: f = font(path, f.size - 4)
    return f
def wrap(d, txt, path, size, maxw):
    """Parte el rótulo en dos líneas si no cabe."""
    f = font(path, size)
    if d.textlength(txt, font=f) <= maxw: return [txt], f
    f2 = font(path, int(size * 0.8))
    if len(txt) < 22 and d.textlength(txt, font=f2) <= maxw: return [txt], f2
    w = txt.split(); best = None
    for i in range(1, len(w)):
        a, b = ' '.join(w[:i]), ' '.join(w[i:]); m = max(d.textlength(a, font=f), d.textlength(b, font=f))
        if best is None or m < best[0]: best = (m, [a, b])
    lines = best[1]
    while max(d.textlength(x, font=f) for x in lines) > maxw: f = font(path, f.size - 4)
    return lines, f
def caption(im, big, col, small, k):
    im = im.convert('RGBA'); ov = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(ov); a = min(1, k * 5)
    for y in range(0, 560): d.line([(0, y), (W, y)], fill=(6, 4, 2, int(225 * (1 - y / 560) * a)))
    pop = 1 + 0.12 * max(0, 1 - k * 6)  # pequeño golpe de escala al entrar
    lines, fb = wrap(d, big, F_BLACK, int(104 * pop), W - 90); y = 175 if len(lines) == 1 else 130
    for ln in lines:
        d.text((W / 2, y), ln, font=fb, fill=col + (int(255 * a),), anchor='mm', stroke_width=5, stroke_fill=(15, 8, 2, int(255 * a))); y += int(fb.size * 1.12)
    if small:
        fs = fit(d, small, F_SERIF_B, 58, W - 120); d.text((W / 2, y + 30), small, font=fs, fill=CREAM + (int(240 * a),), anchor='mm', stroke_width=2, stroke_fill=(15, 8, 2, int(200 * a)))
    return Image.alpha_composite(im, ov).convert('RGB')
def end_card(bg_path, k):
    bg = Image.open(bg_path).convert('RGB').resize((W, H)).filter(ImageFilter.GaussianBlur(20)); bg = ImageEnhance.Brightness(bg).enhance(0.32); d = ImageDraw.Draw(bg)
    lg = Image.open(LOGO).convert('RGBA'); lg.thumbnail((300, 300)); bg.paste(lg, ((W - lg.width) // 2, 300), lg)
    a = min(1, k * 3)
    rows = [('ODISEA', F_BLACK, 130, GOLD), ('DE LA RAZÓN', F_BLACK, 110, GOLD), ('Recorrido narrado · gratis', F_SERIF_B, 64, CREAM), ('', F_SERIF, 30, CREAM), ('Aprende mientras te mueves', F_BLACK, 62, CREAM), ('Gratis · en el navegador · link en la bio', F_SERIF, 46, CREAM)]
    y = 820
    for txt, f, s, col in rows:
        if txt: fo = fit(d, txt, f, s, W - 100); d.text((W / 2, y), txt, font=fo, fill=tuple(int(c * a) for c in col), anchor='mm', stroke_width=3 if f == F_BLACK else 0, stroke_fill=(10, 6, 2))
        y += int(s * 1.35)
    return bg
n = int(END * FPS); last = frames['atenas-1'][-1]
IMGF = Image.open(IMG).convert('RGB')
def img_frame(k):
    im = IMGF.resize((W, int(IMGF.height * W / IMGF.width)), Image.BILINEAR)
    if im.height < H: im = IMGF.resize((int(IMGF.width * H / IMGF.height), H), Image.BILINEAR)
    z = 1.0 + 0.08 * k; cw, ch = int(W / z), int(H / z); x0, y0 = (im.width - cw) // 2, (im.height - ch) // 2 + int(30 * k)
    return im.crop((x0, y0, x0 + cw, y0 + ch)).resize((W, H), Image.BILINEAR)
for i in range(n):
    tt = i / FPS; seg = next((s for s in SEG if s[1] <= tt < s[2]), None)
    if seg:
        name, a, b, big, col, small = seg; k = (tt - a) / max(0.01, b - a)
        if name == 'IMG': im = img_frame(k if a == 0 else 0.5 + k * 0.5)
        else: L = frames[name]; im = Image.open(L[min(len(L) - 1, int(k * len(L)))]).convert('RGB').resize((W, H), Image.BILINEAR)
        z = 1 + 0.06 * k  # acercamiento lento (Ken Burns)
        cw, ch = int(W / z), int(H / z); im = im.crop(((W - cw) // 2, (H - ch) // 2, (W + cw) // 2, (H + ch) // 2)).resize((W, H), Image.BILINEAR)
        im = caption(im, big, col, small, tt - a)
        if name in ('portada',) and tt - a < 0.3:
            fl = (150, 210, 255); im = Image.blend(im, Image.new('RGB', (W, H), fl), 0.45 * (1 - (tt - a) / 0.3))
        if tt - a < 0.12 and a > 0: im = Image.blend(im, Image.new('RGB', (W, H), (255, 240, 200)), 0.5 * (1 - (tt - a) / 0.12))
    else:
        im = end_card(last, tt - 24.6)
    im.save(os.path.join(TMP, f'{i:05d}.jpg'), quality=90)
V = json.load(open(os.path.join(VOZ, 'voz.json'))); ins = []; fl = []
for j, (name, _) in enumerate(V['lines']):
    ins += ['-i', os.path.join(VOZ, name + '.wav')]; ms = int(VT[name] * 1000); fl.append(f'[{j + 2}:a]aresample=44100,volume=1.9,adelay={ms}|{ms}[v{j}]')
nv = len(V['lines']); mix = ''.join(f'[v{j}]' for j in range(nv))
filt = ';'.join(fl) + f';{mix}amix=inputs={nv}:duration=longest:normalize=0[voz];[1:a]volume=0.30,afade=t=in:d=0.5,afade=t=out:st={END - 2.2}:d=2.2[m];[voz][m]amix=inputs=2:duration=longest:normalize=0,atrim=0:{END},loudnorm=I=-14:TP=-1.5[a]'
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-framerate', str(FPS), '-i', os.path.join(TMP, '%05d.jpg'), '-i', MUSIC, *ins, '-filter_complex', filt,
    '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-preset', 'medium', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', '-t', f'{END}', OUTF], check=True)
print('listo', OUTF, END, 's')
