"""Vídeo «Así se juega», versión con emoción (~80 s): empieza como el tutorial (tomas largas del
juego con rótulo numerado y voz que explica) y le suma las escenas de cine habladas (Sócrates,
Hipatia, «¿Te atreves a pensar?») y los grandes experimentos a pantalla completa (la caverna de
Platón, la roca de Sísifo, el anillo de Giges). Todo unido con fundidos, sin cortes bruscos.
Uso: python3 montaje-v8.py <tomas (f/)> <voz (voz.json + wav)> <música.mp3> <logo.png> <tráiler I.mp4> <escenas de cine (carpeta con socrates.mp4…)> <salida.mp4>
Los fotogramas se leen de disco uno a uno: usa poca memoria."""
import json, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

FR, VOZ, MUSIC, LOGO, OLD, CINE, OUTF = sys.argv[1:8]
W, H, FPS = 1080, 1920, 30
BAND = 190; GW, GH = 973, 1730; GX, GY = (W - GW) // 2, BAND
XF = 14
TMP = OUTF + '.tmp'; os.makedirs(TMP, exist_ok=True)
F_BOLD = '/usr/share/fonts/opentype/inter/Inter-Bold.otf'
F_BLACK = '/usr/share/fonts/opentype/inter/Inter-Black.otf'
F_SERIF = '/usr/share/fonts/truetype/crosextra/Caladea-Regular.ttf'
F_SERIF_B = '/usr/share/fonts/truetype/crosextra/Caladea-Bold.ttf'
GOLD = (255, 205, 105); CREAM = (250, 242, 225); DARK = (14, 11, 8)
voz = json.load(open(os.path.join(VOZ, 'voz.json')))['dur']


def seq(name, take=None, start=0, hold=0):
    d = os.path.join(FR, name); fs = sorted(os.listdir(d))[start:]; fs = fs[:take] if take else fs
    out = [os.path.join(d, f) for f in fs]
    return out + [out[-1]] * hold


def old(tag, a, b):
    """Fotogramas del tráiler I (escenas de cine con sus subtítulos) entre a y b segundos, guardados en disco."""
    d = os.path.join(TMP, tag); os.makedirs(d, exist_ok=True)
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-ss', f'{a:.3f}', '-i', OLD, '-frames:v', str(int(round((b - a) * FPS))), '-vf', f'scale={W}:{H}', '-q:v', '2', os.path.join(d, '%04d.jpg')], check=True)
    return [os.path.join(d, f) for f in sorted(os.listdir(d))]


# (fotogramas, estilo, número, rótulo, subrótulo, voz del narrador, audio de la escena de cine)
#   estilo 'band': juego enmarcado con el paso arriba · 'full': juego a pantalla completa con rótulo grande · 'cine': escena de cine
SEGS = [
    (seq('title', hold=58), 'band', '', 'Así se juega', None, 'intro', None),
    (seq('chooser2'), 'band', '1', 'Elige una época', None, 'epoca', None),
    (seq('walk', take=195, start=35), 'band', '2', 'Camina y explora', None, 'caminar', None),
    (seq('talk', take=215), 'band', '3', 'Habla con los pensadores', None, 'hablar', None),
    (old('socrates', 0.0, 7.75), 'cine', '', '', None, None, 'socrates'),
    (seq('vs_socrates', hold=10), 'band', '4', 'Debate y gana', None, 'debate', None),
    (seq('dialog2'), 'band', '5', 'Da tus propias razones', None, 'dialogo', None),
    (seq('agora', take=150, start=40), 'band', '6', 'Vota en el ágora', None, 'agora', None),
    (seq('online'), 'band', '7', 'Juega en línea', None, 'online', None),
    (seq('cave1') + seq('cave2'), 'full', '', 'Baja a la caverna', 'de Platón', 'cueva', None),
    (seq('sisifo', hold=6), 'full', '', 'Empuja la roca', 'con Sísifo', 'sisifo', None),
    (seq('giges', take=70, start=8) + seq('mariposa', take=62), 'full', '', '¿Serías justo', 'si nadie te viera?', 'giges', None),
    (old('hipatia', 7.75, 14.9), 'cine', '', '', None, None, 'hipatia'),
    (old('atreves', 53.4, 54.9), 'cine', '', '', None, None, 'final'),
]
for fr, _, _, _, _, v, _ in SEGS:
    if v:
        need = int((voz[v] + 0.9) * FPS)
        if len(fr) < need: fr += [fr[-1]] * (need - len(fr))

# ---------------------------------------------------------------- piezas gráficas
base = Image.new('RGB', (W, H), DARK)
mask = Image.new('L', (GW, GH), 0); ImageDraw.Draw(mask).rounded_rectangle((0, 0, GW - 1, GH - 1), radius=34, fill=255)
ring = Image.new('RGBA', (W, H), (0, 0, 0, 0)); ImageDraw.Draw(ring).rounded_rectangle((GX - 3, GY - 3, GX + GW + 2, GY + GH + 2), radius=36, outline=(214, 168, 74, 255), width=3)


def band(num, text):
    im = Image.new('RGBA', (W, BAND), (0, 0, 0, 0)); d = ImageDraw.Draw(im); size = 64
    while True:
        f = ImageFont.truetype(F_BLACK, size); tw = d.textlength(text.upper(), font=f)
        if tw + (122 if num else 0) <= W - 70 or size <= 40: break
        size -= 2
    cw = 96 if num else 0; x = (W - (tw + (cw + 26 if num else 0))) / 2; cy = BAND // 2 + 4
    if num:
        d.ellipse((x, cy - 48, x + 96, cy + 48), fill=GOLD + (255,)); fn = ImageFont.truetype(F_BLACK, 62); nw = d.textlength(num, font=fn)
        d.text((x + 48 - nw / 2, cy - 38), num, font=fn, fill=(40, 26, 8, 255)); x += cw + 26
    d.text((x, cy - int(size * 0.56)), text.upper(), font=f, fill=CREAM + (255,))
    return im


def big(head, sub):
    """Rótulo grande para las tomas a pantalla completa, con sombra suave."""
    img = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(img); sh = Image.new('RGBA', (W, H), (0, 0, 0, 0)); sd = ImageDraw.Draw(sh)
    fh = ImageFont.truetype(F_BLACK, 104); fs = ImageFont.truetype(F_SERIF_B, 66); y = 300
    grad = Image.new('RGBA', (W, 620), (0, 0, 0, 0)); gd = ImageDraw.Draw(grad)
    for i in range(620): gd.line((0, i, W, i), fill=(6, 4, 2, int(170 * (1 - i / 620) ** 1.4)))
    img.alpha_composite(grad, (0, 0))
    x = (W - d.textlength(head.upper(), font=fh)) / 2; sd.text((x + 5, y + 7), head.upper(), font=fh, fill=(0, 0, 0, 235)); d.text((x, y), head.upper(), font=fh, fill=CREAM + (255,), stroke_width=2, stroke_fill=(40, 25, 5, 255))
    if sub: x = (W - d.textlength(sub, font=fs)) / 2; sd.text((x + 4, y + 132), sub, font=fs, fill=(0, 0, 0, 235)); d.text((x, y + 128), sub, font=fs, fill=GOLD + (255,))
    return Image.alpha_composite(sh.filter(ImageFilter.GaussianBlur(9)), img)


def fade(layer, alpha):
    if alpha >= 1: return layer
    b = layer.copy(); b.putalpha(b.getchannel('A').point(lambda v: int(v * alpha))); return b


def compose(path, style, layer, alpha=1.0):
    if style == 'band':
        g = Image.open(path).convert('RGB').resize((GW, GH), Image.BILINEAR); im = base.copy(); im.paste(g, (GX, GY), mask)
        im = Image.alpha_composite(im.convert('RGBA'), ring); im.alpha_composite(fade(layer, alpha), (0, 0)); return im.convert('RGB')
    im = Image.open(path).convert('RGB'); im = im if im.size == (W, H) else im.resize((W, H), Image.BILINEAR)
    if style == 'full': im = Image.alpha_composite(im.convert('RGBA'), fade(layer, alpha)).convert('RGB')
    return im


def endcard(bgpath, n):
    bg = Image.open(bgpath).convert('RGB').resize((W, H)).filter(ImageFilter.GaussianBlur(26)); bg = Image.blend(bg, Image.new('RGB', (W, H), (8, 6, 4)), 0.62).convert('RGBA')
    d = ImageDraw.Draw(bg); logo = Image.open(LOGO).convert('RGBA'); lh = 300; logo = logo.resize((int(logo.width * lh / logo.height), lh), Image.LANCZOS)
    d.ellipse((W / 2 - 190, 420, W / 2 + 190, 800), fill=(22, 18, 12, 255), outline=GOLD + (255,), width=6); bg.alpha_composite(logo, (int(W / 2 - logo.width / 2), 460))
    def line(t, y, font, size, fill):
        f = ImageFont.truetype(font, size); d.text(((W - d.textlength(t, font=f)) / 2, y), t, font=f, fill=fill)
    line('ODISEA DE LA RAZÓN', 880, F_BLACK, 84, CREAM + (255,)); line('Juega gratis', 1010, F_BOLD, 66, GOLD + (255,))
    line('en tu celular o computador', 1100, F_SERIF, 54, CREAM + (255,)); line('Link en la bio', 1250, F_BOLD, 60, GOLD + (255,))
    line('Filosofía para Seres Humanos', 1420, F_SERIF, 50, (243, 230, 196, 255)); line('filosofiaparasereshumanos.com', 1490, F_SERIF, 44, (243, 230, 196, 220))
    return [bg.convert('RGB')] * n


# ---------------------------------------------------------------- vídeo
vid = OUTF + '.video.mp4'
enc = subprocess.Popen(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                        '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', vid], stdin=subprocess.PIPE)
t = 0; VO = []; CI = []; prev_tail = []
pieces = [(fr, st, band(num, text) if st == 'band' else big(text, sub) if st == 'full' else None, v, c) for fr, st, num, text, sub, v, c in SEGS]
pieces.append((endcard(SEGS[0][0][0], int((voz['final2'] + 1.8) * FPS)), 'card', None, 'final2', None))
for k, (fr, st, layer, v, c) in enumerate(pieces):
    if v: VO.append((t / FPS, v))
    if c: CI.append((t / FPS, c, len(fr) / FPS))
    n = len(fr); last = k == len(pieces) - 1; body = n if last else n - XF
    for i in range(n):
        im = fr[i] if not isinstance(fr[i], str) else compose(fr[i], st, layer, min(1, (i + 1) / 8))
        if i < len(prev_tail): im = Image.blend(prev_tail[i], im, (i + 1) / (len(prev_tail) + 1))
        if i >= body: continue
        enc.stdin.write(im.tobytes()); t += 1
    prev_tail = [] if last else [compose(fr[i], st, layer) for i in range(body, n)]
enc.stdin.close(); enc.wait(); total = t / FPS

# ---------------------------------------------------------------- sonido: música continua que baja bajo las voces
ins = ['-stream_loop', '-1', '-i', MUSIC]; filt = []; mix = []; j = 2
for st, v in VO:
    ins += ['-i', os.path.join(VOZ, v + '.wav')]; d = int((st + (0.25 if st == 0 else 0.55)) * 1000)
    filt.append(f'[{j}:a]adelay={d}|{d},apad[v{j}]'); mix.append(f'[v{j}]'); j += 1
for st, c, dur in CI:                                # el sonido propio de cada escena de cine (narrador y personaje)
    ins += ['-i', os.path.join(CINE, c + '.mp4')]; d = int(st * 1000)
    filt.append(f'[{j}:a]atrim=0:{dur:.3f},afade=t=out:st={max(0, dur - 0.35):.3f}:d=0.35,volume=1.25,adelay={d}|{d},apad[v{j}]'); mix.append(f'[v{j}]'); j += 1
filt.append(''.join(mix) + f'amix=inputs={len(mix)}:normalize=0,atrim=0:{total:.3f},asplit[vo][sc]')
filt.append(f'[1:a]atrim=0:{total:.3f},volume=0.55,afade=t=in:d=0.6,afade=t=out:st={total - 1.6:.3f}:d=1.6[m]')
filt.append('[m][sc]sidechaincompress=threshold=0.03:ratio=9:attack=25:release=420[md]')
filt.append('[md][vo]amix=inputs=2:normalize=0,alimiter=limit=0.95[a]')
r = subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', vid] + ins + ['-filter_complex', ';'.join(filt), '-map', '0:v', '-map', '[a]',
                    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-t', f'{total:.3f}', '-movflags', '+faststart', OUTF])
if r.returncode: sys.exit('ffmpeg falló al mezclar el sonido')
os.remove(vid); print(f'duración {total:.2f} s'); print('listo', OUTF)
