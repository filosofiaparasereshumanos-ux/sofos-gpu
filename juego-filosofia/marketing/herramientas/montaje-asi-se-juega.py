"""Vídeo «Así se juega» (vertical 1080x1920, ~48 s): portada, épocas, paseo, conversación, lección, debate,
orbes, falacias, planetario e Inicio, con narración.
Uso: python3 montaje-asi-se-juega.py <tomas> <voz.mp3> <tiempos.json> <música.mp3> <logo.png> <salida.mp4>"""
import json, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

TOMAS, VOZ, TIM, MUSIC, LOGO, OUTF = sys.argv[1:7]
W, H, FPS = 1080, 1920, 30
TMP = OUTF + '.tmp'; os.makedirs(TMP, exist_ok=True)
F_BLACK = '/usr/share/fonts/opentype/inter/Inter-Black.otf'
F_SERIF_B = '/usr/share/fonts/truetype/crosextra/Caladea-Bold.ttf'
F_SERIF = '/usr/share/fonts/truetype/crosextra/Caladea-Regular.ttf'
GOLD = (255, 205, 105); CREAM = (250, 242, 225)
t = [a for a, b in json.load(open(TIM))['asj']]
END = t[-1] + 3.2
folder = {d.split('-', 1)[1]: os.path.join(TOMAS, d) for d in os.listdir(TOMAS)}
frames = {k: sorted(os.path.join(v, f) for f in os.listdir(v)) for k, v in folder.items()}
# (toma, inicio, fin, rótulo grande, rótulo pequeño)
SEG = [
    ('portada', 0, t[2], 'ASÍ SE JUEGA', 'Odisea de la Razón'),
    ('epocas', t[2], t[4], 'Elige tu época', '35 épocas, de Sumer al borde del universo'),
    ('caminar', t[4], t[6], 'Camina y explora', 'Lugares, libros y personajes'),
    ('hablar', t[6], t[8], 'Habla con los pensadores', 'Cada uno con su propia voz'),
    ('leccion', t[8], t[9], 'Escucha su lección', 'Narrada e ilustrada'),
    ('debate', t[9], t[10], 'Desafíalo a un debate', 'Elige cómo argumentar'),
    ('acierto', t[10], t[11], '¡Gánale!', ''),
    ('orbe', t[11], t[12], 'Salta', 'Orbes de sabiduría'),
    ('falacia', t[12], t[12] + 1.5, 'Caza falacias', 'El mercado de los sofistas'),
    ('cazada', t[12] + 1.5, t[13], '¡Cazada!', ''),
    ('planetario', t[13], t[14], 'Camina entre los planetas', 'El observatorio del cosmos'),
    ('inicio', t[14], t[15], 'Y mucho más', 'Frases célebres · falacias · cosmos'),
]
INSET = {'falacia', 'cazada', 'leccion', 'hablar', 'epocas', 'inicio', 'portada'}
def font(p, s): return ImageFont.truetype(p, s)
def caption(im, big, small, k):
    """Banda superior oscura con el rótulo; entra con un pequeño fundido."""
    if not big: return im
    im = im.convert('RGBA'); ov = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    a = min(1, k * 4)
    for y in range(0, 460): d.line([(0, y), (W, y)], fill=(6, 4, 2, int(210 * (1 - y / 460) * a)))
    fb = font(F_BLACK if big.isupper() else F_SERIF_B, 96 if big.isupper() else 86)
    while d.textlength(big, font=fb) > W - 120: fb = font(fb.path, fb.size - 6)
    d.text((W / 2, 170), big, font=fb, fill=GOLD + (int(255 * a),), anchor='mm', stroke_width=3, stroke_fill=(20, 12, 4, int(255 * a)))
    if small:
        fs = font(F_SERIF, 46)
        while d.textlength(small, font=fs) > W - 120: fs = font(F_SERIF, fs.size - 3)
        d.text((W / 2, 270), small, font=fs, fill=CREAM + (int(235 * a),), anchor='mm')
    return Image.alpha_composite(im, ov).convert('RGB')
def card(last, k, lines, logo=True):
    bg = Image.open(last).convert('RGB').resize((W, H)).filter(ImageFilter.GaussianBlur(18)); bg = ImageEnhance.Brightness(bg).enhance(0.35)
    d = ImageDraw.Draw(bg)
    if logo:
        lg = Image.open(LOGO).convert('RGBA'); lg.thumbnail((360, 360)); bg.paste(lg, ((W - lg.width) // 2, 330), lg)
    y = 800
    for txt, f, s, col in lines:
        fo = font(f, s)
        while d.textlength(txt, font=fo) > W - 100: fo = font(f, fo.size - 4)
        d.text((W / 2, y), txt, font=fo, fill=col, anchor='mm'); y += int(s * 1.45)
    return bg
n = int(END * FPS); last_cal = frames['planetario'][-1]
for i in range(n):
    tt = i / FPS
    seg = next((s for s in SEG if s[1] <= tt < s[2]), None)
    if seg:
        name, a, b, big, small = seg; L = frames[name]; k = (tt - a) / max(0.01, b - a)
        im = Image.open(L[min(len(L) - 1, int(k * len(L)))]).convert('RGB').resize((W, H), Image.BILINEAR)
        if name in INSET:  # paneles: la toma reducida bajo el rótulo, sobre su propio fondo desenfocado
            bg = ImageEnhance.Brightness(im.resize((W // 8, H // 8)).filter(ImageFilter.GaussianBlur(3)).resize((W, H))).enhance(0.45)
            sm = im.resize((int(W * 0.8), int(H * 0.8)), Image.BILINEAR); bg.paste(sm, ((W - sm.width) // 2, H - sm.height - 40)); im = bg
        im = caption(im, big, small, (tt - a))
        if name == 'acierto' and tt - a < 0.25: im = Image.blend(im, Image.new('RGB', (W, H), (255, 236, 180)), 0.6 * (1 - (tt - a) / 0.25))
    elif tt < t[16]:
        im = card(last_cal, 0, [('Diez minutos al día', F_SERIF_B, 100, GOLD), ('y vas a pensar distinto', F_SERIF, 70, CREAM), ('35 épocas · 217 pensadoras y pensadores', F_SERIF, 46, CREAM)])
    else:
        im = card(last_cal, 0, [('Odisea de la Razón', F_BLACK, 90, CREAM), ('Gratis · en el navegador y en Android', F_SERIF, 52, GOLD), ('filosofiaparasereshumanos-ux.github.io/sofos-gpu', F_SERIF, 40, CREAM)])
    im.save(os.path.join(TMP, f'{i:05d}.jpg'), quality=90)
# audio: la voz al frente, la música detrás con fundido final
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-framerate', str(FPS), '-i', os.path.join(TMP, '%05d.jpg'), '-i', VOZ, '-i', MUSIC,
    '-filter_complex', f'[1:a]adelay=0|0,volume=1.6[v];[2:a]volume=0.32,afade=t=out:st={END - 2.5}:d=2.5[m];[v][m]amix=inputs=2:duration=longest:normalize=0,atrim=0:{END}[a]',
    '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '21', '-preset', 'medium', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', '-t', f'{END}', OUTF], check=True)
print('listo', OUTF, round(END, 1), 's')
