"""Vídeo «Así se juega» (~1 min): tomas largas del juego real unidas con fundidos (sin cortes
bruscos ni destellos), un rótulo fijo con el paso en la franja superior y una voz que explica
cómo se juega, sobre una sola música continua.
Uso: python3 montaje-v7.py <carpeta de tomas (f/)> <carpeta de voz (voz.json + wav)> <música.mp3> <logo.png> <salida.mp4>
Los fotogramas se leen de disco uno a uno: usa poca memoria."""
import json, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

FR, VOZ, MUSIC, LOGO, OUTF = sys.argv[1:6]
W, H, FPS = 1080, 1920, 30
BAND = 190                      # franja superior para el rótulo
GW, GH = 973, 1730              # el juego, un poco más pequeño, debajo de la franja
GX, GY = (W - GW) // 2, BAND
XF = 14                         # fotogramas de fundido entre tomas
F_BOLD = '/usr/share/fonts/opentype/inter/Inter-Bold.otf'
F_BLACK = '/usr/share/fonts/opentype/inter/Inter-Black.otf'
F_SERIF = '/usr/share/fonts/truetype/crosextra/Caladea-Regular.ttf'
GOLD = (255, 205, 105); CREAM = (250, 242, 225); DARK = (14, 11, 8)
voz = json.load(open(os.path.join(VOZ, 'voz.json')))['dur']


def seq(name, take=None, start=0, hold=0, slow=1):
    d = os.path.join(FR, name); fs = sorted(os.listdir(d))[start:]; fs = fs[:take] if take else fs
    out = [os.path.join(d, f) for f in fs for _ in range(slow)]
    return out + [out[-1]] * hold


# (toma, número de paso, rótulo, voz)
SEGS = [
    (seq('title', hold=58), '', 'Así se juega', 'intro'),
    (seq('chooser2'), '1', 'Elige una época', 'epoca'),
    (seq('walk'), '2', 'Camina y explora', 'caminar'),
    (seq('talk'), '3', 'Habla con los pensadores', 'hablar'),
    (seq('vs_socrates', hold=10), '4', 'Debate y gana', 'debate'),
    (seq('dialog2'), '5', 'Da tus propias razones', 'dialogo'),
    (seq('agora'), '6', 'Vota en el ágora', 'agora'),
    (seq('online'), '7', 'Juega en línea', 'online'),
    (seq('meet'), '7', 'Reta a otros viajeros', 'reto'),
    (seq('desc'), '8', 'Vive los experimentos', 'experimento'),
]
for fr, _, _, v in SEGS:
    need = int((voz[v] + 0.9) * FPS)
    if len(fr) < need: fr += [fr[-1]] * (need - len(fr))     # ninguna toma dura menos que su frase

# ---------------------------------------------------------------- piezas gráficas
base = Image.new('RGB', (W, H), DARK)
mask = Image.new('L', (GW, GH), 0); ImageDraw.Draw(mask).rounded_rectangle((0, 0, GW - 1, GH - 1), radius=34, fill=255)
ring = Image.new('RGBA', (W, H), (0, 0, 0, 0)); ImageDraw.Draw(ring).rounded_rectangle((GX - 3, GY - 3, GX + GW + 2, GY + GH + 2), radius=36, outline=(214, 168, 74, 255), width=3)


def band(num, text):
    im = Image.new('RGBA', (W, BAND), (0, 0, 0, 0)); d = ImageDraw.Draw(im); f = ImageFont.truetype(F_BLACK, 64); tw = d.textlength(text.upper(), font=f)
    cw = 96 if num else 0; x = (W - (tw + (cw + 26 if num else 0))) / 2; cy = BAND // 2 + 4
    if num:
        d.ellipse((x, cy - 48, x + 96, cy + 48), fill=GOLD + (255,)); fn = ImageFont.truetype(F_BLACK, 62); nw = d.textlength(num, font=fn)
        d.text((x + 48 - nw / 2, cy - 38), num, font=fn, fill=(40, 26, 8, 255)); x += cw + 26
    d.text((x, cy - 36), text.upper(), font=f, fill=CREAM + (255,))
    return im


def compose(path, bnd, alpha=1.0):
    g = Image.open(path).convert('RGB').resize((GW, GH), Image.BILINEAR); im = base.copy(); im.paste(g, (GX, GY), mask)
    im = Image.alpha_composite(im.convert('RGBA'), ring)
    if alpha < 1: b = bnd.copy(); b.putalpha(b.getchannel('A').point(lambda v: int(v * alpha))); bnd = b
    im.alpha_composite(bnd, (0, 0)); return im.convert('RGB')


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
t = 0; STARTS = []; prev_tail = []
END_N = int((voz['final'] + 1.6) * FPS)
pieces = [(fr, band(num, text), v) for fr, num, text, v in SEGS] + [(endcard(SEGS[0][0][0], END_N), None, 'final')]
for k, (fr, bnd, v) in enumerate(pieces):
    STARTS.append((t / FPS, v)); n = len(fr); last = k == len(pieces) - 1
    body = n if last else n - XF                      # los últimos XF fotogramas se funden con la toma siguiente
    for i in range(n):
        im = fr[i] if not isinstance(fr[i], str) else compose(fr[i], bnd, min(1, (i + 1) / 8))
        if i < len(prev_tail): im = Image.blend(prev_tail[i], im, (i + 1) / (len(prev_tail) + 1))
        if i >= body: continue
        enc.stdin.write(im.tobytes()); t += 1
    prev_tail = [] if last else [compose(fr[i], bnd) for i in range(body, n)]
enc.stdin.close(); enc.wait(); total = t / FPS

# ---------------------------------------------------------------- sonido: música continua que baja bajo la voz
ins = ['-stream_loop', '-1', '-i', MUSIC]; filt = []; mix = []
for j, (st, v) in enumerate(STARTS):
    ins += ['-i', os.path.join(VOZ, v + '.wav')]; d = int((st + (0.25 if j == 0 else 0.55)) * 1000)
    filt.append(f'[{j + 2}:a]adelay={d}|{d},apad[v{j}]'); mix.append(f'[v{j}]')
filt.append(''.join(mix) + f'amix=inputs={len(mix)}:normalize=0,atrim=0:{total:.3f},asplit[vo][sc]')
filt.append(f'[1:a]atrim=0:{total:.3f},volume=0.5,afade=t=in:d=0.6,afade=t=out:st={total - 1.6:.3f}:d=1.6[m]')
filt.append('[m][sc]sidechaincompress=threshold=0.03:ratio=9:attack=25:release=420[md]')
filt.append('[md][vo]amix=inputs=2:normalize=0,alimiter=limit=0.95[a]')
r = subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', vid] + ins + ['-filter_complex', ';'.join(filt), '-map', '0:v', '-map', '[a]',
                    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-t', f'{total:.3f}', '-movflags', '+faststart', OUTF])
if r.returncode: sys.exit('ffmpeg falló al mezclar el sonido')
os.remove(vid); print(f'duración {total:.2f} s'); print('listo', OUTF)
