"""Corto «¿Quién sabe más: tú o tus amigos?» (vertical 1080x1920, ~26 s): el torneo de trivia con amigos,
desde la tarjeta de la portada hasta el podio, y cierre con reto.
Uso: python3 montaje-corto-torneo.py <tomas> <carpeta voz (voz.json + .wav)> <música.mp3> <logo.png> <salida.mp4>"""
import json, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
TOMAS, VOZ, MUSIC, LOGO, OUTF = sys.argv[1:6]
W, H, FPS = 1080, 1920, 30
TMP = OUTF + '.tmp'; os.makedirs(TMP, exist_ok=True)
F_BLACK = '/usr/share/fonts/opentype/inter/Inter-Black.otf'
F_SERIF_B = '/usr/share/fonts/truetype/crosextra/Caladea-Bold.ttf'
F_SERIF = '/usr/share/fonts/truetype/crosextra/Caladea-Regular.ttf'
GOLD = (255, 205, 105); CREAM = (250, 242, 225); RED = (255, 110, 90); GREEN = (120, 235, 150)
folder = {d.split('-', 1)[1]: os.path.join(TOMAS, d) for d in os.listdir(TOMAS)}
frames = {k: sorted(os.path.join(v, f) for f in os.listdir(v)) for k, v in folder.items()}
# cuándo entra cada frase de la voz
VT = {'hook': 0.25, 'crear': 2.9, 'invitar': 5.8, 'jugar': 9.7, 'cultura': 18.6, 'cierre': 23.0}
END = 26.6
# (toma, inicio, fin, rótulo, color, subrótulo)
SEG = [
    ('portada', 0, 2.7, '¿QUIÉN SABE MÁS: TÚ O TUS AMIGOS?', GOLD, ''),
    ('mesa', 2.7, 5.5, 'CREA UN TORNEO', GOLD, 'Desde la portada, en un toque'),
    ('llena', 5.5, 8.2, 'INVITA AMIGOS', GOLD, '2, 4 u 8 jugadores'),
    ('whatsapp', 8.2, 9.6, 'POR WHATSAPP', GREEN, ''),
    ('pregunta2', 9.6, 16.6, '¡TODOS A LA VEZ!', GOLD, 'Gana quien sabe más… y más rápido'),
    ('podio', 16.6, 18.6, '¡CAMPEÓN!', GOLD, ''),
    ('museo', 18.6, 22.6, 'CULTURA GENERAL', GOLD, 'Filosofía · arte · historia · ciencia'),
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
    lines, fb = wrap(d, big, F_BLACK, int(104 * pop), W - 90); y = (175 if len(lines) == 1 else 130) - int(60 * max(0, 1 - k * 4) ** 2)
    for ln in lines:
        d.text((W / 2, y), ln, font=fb, fill=col + (int(255 * a),), anchor='mm', stroke_width=5, stroke_fill=(15, 8, 2, int(255 * a))); y += int(fb.size * 1.12)
    if small:
        fs = fit(d, small, F_SERIF_B, 58, W - 120); d.text((W / 2, y + 30), small, font=fs, fill=CREAM + (int(240 * a),), anchor='mm', stroke_width=2, stroke_fill=(15, 8, 2, int(200 * a)))
    return Image.alpha_composite(im, ov).convert('RGB')
# ---------------------------------------------------------------- texto dinámico (palabra a palabra, al ritmo de la voz)
VJ = json.load(open(os.path.join(VOZ, 'voz.json')))
WORDS = []  # (inicio, fin, palabra)
for name, text in VJ['lines']:
    t0 = VT[name] + 0.08; dur = max(0.5, VJ['dur'][name] - 0.25); ws = text.replace('…', ' ').split()
    tot = sum(len(w) + 2 for w in ws); t = t0
    for w in ws:
        d = dur * (len(w) + 2) / tot; WORDS.append((t, t + d, w)); t += d
KEY = {'sócrates', 'falacia', 'razones', 'ganas', 'justicia', 'torneo', 'amigos', 'whatsapp', 'rápido', 'mundos', 'pensadores', 'gratis', 'muerte', 'preguntas', 'jóvenes', 'dioses', 'quinientos', 'clemencia', 'huir', 'cárcel', 'final', 'puntaje', 'rival', 'filosofía', 'arte', 'historia', 'ciencia', 'atreves'}
def hyper(im, tt):
    cur = [i for i, (a, b, w) in enumerate(WORDS) if a <= tt < b + 0.15]
    if not cur: return im
    i = cur[-1]; g0 = (i // 3) * 3; grp = WORDS[g0:g0 + 3]
    im = im.convert('RGBA'); ov = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    f = font(F_BLACK, 104); sp = 40
    clean = lambda w: w.strip('«»¿?¡!.,:;').upper()
    widths = [d.textlength(clean(w), font=f) for _, _, w in grp]; total = sum(widths) + sp * (len(grp) - 1)
    scale = min(1, (W - 170) / max(1, total)); f = font(F_BLACK, int(104 * scale)); widths = [d.textlength(clean(w), font=f) for _, _, w in grp]; total = sum(widths) + sp * (len(grp) - 1)
    x = (W - total) / 2; y = 500
    for j, (a, b, w) in enumerate(grp):
        if tt < a: break  # las palabras aparecen cuando se dicen
        k = min(1, (tt - a) / 0.14); pop = 1 + 0.12 * (1 - k) ** 2; live = a <= tt < b
        word = clean(w); hot = live or word.lower() in KEY
        col = (255, 214, 90, 255) if live else ((255, 255, 255, 255) if not hot else (150, 225, 255, 255))
        ff = font(F_BLACK, int(f.size * (pop if live else 1)))
        cx = x + widths[j] / 2; dy = int(18 * (1 - k))
        if live:  # caja de color detrás de la palabra que suena
            bw = d.textlength(word, font=ff) + 34; d.rounded_rectangle([cx - bw / 2, y - ff.size * 0.62 + dy, cx + bw / 2, y + ff.size * 0.62 + dy], radius=18, fill=(20, 12, 4, 170))
        d.text((cx + 5, y + 6 + dy), word, font=ff, fill=(0, 0, 0, 160), anchor='mm')
        d.text((cx, y + dy), word, font=ff, fill=col, anchor='mm', stroke_width=7, stroke_fill=(10, 6, 2, 255))
        x += widths[j] + sp
    return Image.alpha_composite(im, ov).convert('RGB')
def end_card(bg_path, k):
    bg = Image.open(bg_path).convert('RGB').resize((W, H)).filter(ImageFilter.GaussianBlur(20)); bg = ImageEnhance.Brightness(bg).enhance(0.32); d = ImageDraw.Draw(bg)
    lg = Image.open(LOGO).convert('RGBA'); lg.thumbnail((300, 300)); bg.paste(lg, ((W - lg.width) // 2, 300), lg)
    a = min(1, k * 3)
    rows = [('¿QUIÉN GANA', F_BLACK, 120, GOLD), ('EN TU GRUPO?', F_BLACK, 120, GOLD), ('Etiqueta a tu rival', F_SERIF_B, 70, CREAM), ('', F_SERIF, 30, CREAM), ('Odisea de la Razón', F_BLACK, 74, CREAM), ('Gratis · en el navegador · link en la bio', F_SERIF, 46, CREAM)]
    y = 820
    for txt, f, s, col in rows:
        if txt: fo = fit(d, txt, f, s, W - 100); d.text((W / 2, y), txt, font=fo, fill=tuple(int(c * a) for c in col), anchor='mm', stroke_width=3 if f == F_BLACK else 0, stroke_fill=(10, 6, 2))
        y += int(s * 1.35)
    return bg
n = int(END * FPS); last = frames['podio'][-1]
for i in range(n):
    tt = i / FPS; seg = next((s for s in SEG if s[1] <= tt < s[2]), None)
    if seg:
        name, a, b, big, col, small = seg; L = frames[name]; k = (tt - a) / max(0.01, b - a)
        im = Image.open(L[min(len(L) - 1, int(k * len(L)))]).convert('RGB').resize((W, H), Image.BILINEAR)
        z = 1 + 0.06 * k  # acercamiento lento (Ken Burns)
        cw, ch = int(W / z), int(H / z); im = im.crop(((W - cw) // 2, (H - ch) // 2, (W + cw) // 2, (H + ch) // 2)).resize((W, H), Image.BILINEAR)
        im = caption(im, big, col, small, tt - a)
        if name in ('podio', 'whatsapp') and tt - a < 0.3:
            fl = (255, 220, 120) if name == 'podio' else (90, 255, 140); im = Image.blend(im, Image.new('RGB', (W, H), fl), 0.45 * (1 - (tt - a) / 0.3))
        if tt - a < 0.12 and a > 0: im = Image.blend(im, Image.new('RGB', (W, H), (255, 240, 200)), 0.5 * (1 - (tt - a) / 0.12))
    else:
        im = end_card(last, tt - 22.6)
    im = hyper(im, tt)
    im.save(os.path.join(TMP, f'{i:05d}.jpg'), quality=90)
V = json.load(open(os.path.join(VOZ, 'voz.json'))); ins = []; fl = []
for j, (name, _) in enumerate(V['lines']):
    ins += ['-i', os.path.join(VOZ, name + '.wav')]; ms = int(VT[name] * 1000); fl.append(f'[{j + 2}:a]aresample=44100,volume=1.9,adelay={ms}|{ms}[v{j}]')
nv = len(V['lines']); mix = ''.join(f'[v{j}]' for j in range(nv))
filt = ';'.join(fl) + f';{mix}amix=inputs={nv}:duration=longest:normalize=0[voz];[1:a]volume=0.30,afade=t=in:d=0.5,afade=t=out:st={END - 2.2}:d=2.2[m];[voz][m]amix=inputs=2:duration=longest:normalize=0,atrim=0:{END},loudnorm=I=-14:TP=-1.5[a]'
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-framerate', str(FPS), '-i', os.path.join(TMP, '%05d.jpg'), '-i', MUSIC, *ins, '-filter_complex', filt,
    '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-preset', 'medium', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', '-t', f'{END}', OUTF], check=True)
print('listo', OUTF, END, 's')
