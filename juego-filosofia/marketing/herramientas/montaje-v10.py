"""Vídeo promocional v10 (vertical 1080x1920, ~75 s): ritmo de tráiler.
Arranca con cortes rápidos por los mundos y destellos, «¿Te atreves a pensar?», un mosaico con más de
doscientos retratos, y luego lo nuevo del juego a pantalla completa: debates, orbes que se alcanzan
saltando, la estrella fugaz, Diógenes en su tinaja, duelos de ideas, la caverna, Sísifo y el juego en
línea. Cierra con Sócrates, frases que invitan a jugar y la tarjeta final.
Uso: python3 montaje-v10.py <tomas v10 (f/)> <tomas antiguas (f/)> <voz> <música.mp3> <logo.png> <carpeta de retratos (img/)> <escenas de cine> <salida.mp4>"""
import glob, json, math, os, random, subprocess, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

FR, FR0, VOZ, MUSIC, LOGO, IMG, CINE, OUTF = sys.argv[1:9]
W, H, FPS = 1080, 1920, 30
TMP = OUTF + '.tmp'; os.makedirs(TMP, exist_ok=True)
F_BLACK = '/usr/share/fonts/opentype/inter/Inter-Black.otf'
F_BOLD = '/usr/share/fonts/opentype/inter/Inter-Bold.otf'
F_SERIF = '/usr/share/fonts/truetype/crosextra/Caladea-Regular.ttf'
F_SERIF_B = '/usr/share/fonts/truetype/crosextra/Caladea-Bold.ttf'
GOLD = (255, 205, 105); CREAM = (250, 242, 225); DARK = (10, 8, 6)
voz = json.load(open(os.path.join(VOZ, 'voz.json')))['dur']
random.seed(7)


def seq(root, name, take=None, start=0):
    d = os.path.join(root, name); fs = sorted(os.listdir(d))[start:]; fs = fs[:take] if take else fs
    return [os.path.join(d, f) for f in fs]


def load(p, zoom=1.0, cx=0.5, cy=0.5):
    im = Image.open(p).convert('RGB') if isinstance(p, str) else p
    if im.size != (W, H): im = im.resize((W, H), Image.BILINEAR)
    if zoom != 1.0:
        w, h = int(W / zoom), int(H / zoom); x = int((W - w) * cx); y = int((H - h) * cy)
        im = im.crop((x, y, x + w, y + h)).resize((W, H), Image.BILINEAR)
    return im


def fade(layer, a):
    if a >= 1: return layer
    b = layer.copy(); b.putalpha(b.getchannel('A').point(lambda v: int(v * max(0, a)))); return b


def wrap(draw, text, font, maxw):
    words, lines, cur = text.split(), [], ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if draw.textlength(t, font=font) > maxw and cur: lines.append(cur); cur = w
        else: cur = t
    if cur: lines.append(cur)
    return lines


def caption(head, sub=None, y=250, size=118, color=CREAM, bottom=False):
    """Rótulo grande arriba (o abajo, si la interfaz del juego ocupa el centro), con degradado oscuro, contorno y sombra."""
    img = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(img); sh = Image.new('RGBA', (W, H), (0, 0, 0, 0)); sd = ImageDraw.Draw(sh)
    grad = Image.new('RGBA', (W, 760), (0, 0, 0, 0)); gd = ImageDraw.Draw(grad)
    for i in range(760): gd.line((0, i, W, i), fill=(6, 4, 2, int((230 if bottom else 190) * (1 - i / 760) ** 1.3)))
    if bottom: grad = grad.transpose(Image.FLIP_TOP_BOTTOM); y = H - 330 if not sub else H - 400; size = min(size, 104)
    img.alpha_composite(grad, (0, H - 760 if bottom else 0))
    while True:
        f = ImageFont.truetype(F_BLACK, size); ls = wrap(d, head.upper(), f, W - 110)
        if len(ls) <= 2 or size <= 64: break
        size -= 6
    for l in ls:
        x = (W - d.textlength(l, font=f)) / 2; sd.text((x + 6, y + 9), l, font=f, fill=(0, 0, 0, 240)); d.text((x, y), l, font=f, fill=color + (255,), stroke_width=3, stroke_fill=(30, 18, 4, 255)); y += int(size * 1.08)
    if sub:
        fs = ImageFont.truetype(F_SERIF_B, 64); x = (W - d.textlength(sub, font=fs)) / 2; sd.text((x + 4, y + 18), sub, font=fs, fill=(0, 0, 0, 235)); d.text((x, y + 14), sub, font=fs, fill=GOLD + (255,))
    return Image.alpha_composite(sh.filter(ImageFilter.GaussianBlur(10)), img)


def center_text(text, size, color=GOLD, y=None, sub=None):
    img = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
    f = ImageFont.truetype(F_BLACK, size); ls = wrap(d, text, f, W - 120); lh = int(size * 1.1)
    y = (H - lh * len(ls)) // 2 - 40 if y is None else y
    for l in ls:
        x = (W - d.textlength(l, font=f)) / 2; d.text((x, y), l, font=f, fill=color + (255,), stroke_width=4, stroke_fill=(20, 12, 2, 255)); y += lh
    if sub:
        fs = ImageFont.truetype(F_SERIF_B, 70); x = (W - d.textlength(sub, font=fs)) / 2; d.text((x, y + 20), sub, font=fs, fill=CREAM + (255,))
    glow = img.filter(ImageFilter.GaussianBlur(18)); out = Image.new('RGBA', (W, H), (0, 0, 0, 0)); out.alpha_composite(glow); out.alpha_composite(glow); out.alpha_composite(img)
    return out


def scale_layer(layer, s):
    """Escala un rótulo desde el centro (para que «golpee» al aparecer)."""
    if abs(s - 1) < 0.003: return layer
    w, h = int(W * s), int(H * s); r = layer.resize((w, h), Image.BILINEAR); out = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    out.alpha_composite(r.crop((max(0, (w - W) // 2), max(0, (h - H) // 2), max(0, (w - W) // 2) + min(W, w), max(0, (h - H) // 2) + min(H, h))), (max(0, (W - w) // 2), max(0, (H - h) // 2)))
    return out


# ---------------------------------------------------------------- segmentos: listas de fotogramas ya compuestos (generadores)
SEGS = []   # (generador de imágenes, n fotogramas, voz o None, sonidos [(segundo relativo, tipo)])


def seg_footage(frames, cap=None, voice=None, min_n=None, zoom0=1.06, zoom1=1.0, punch=False, sfx=(), bottom=False):
    n = max(len(frames), min_n or 0) if voice is None else max(len(frames), int((voz[voice] + 0.7) * FPS), min_n or 0)
    frames = frames + [frames[-1]] * (n - len(frames))
    lay = caption(*cap, bottom=bottom) if cap else None
    def gen():
        for i, p in enumerate(frames):
            k = i / max(1, n - 1); z = zoom0 + (zoom1 - zoom0) * k
            im = load(p, z).convert('RGBA')
            if lay is not None:
                a = min(1, i / 6); s = 1.18 - 0.18 * min(1, i / 7) if punch else 1.0
                im.alpha_composite(fade(scale_layer(lay, s), a))
            yield im.convert('RGB')
    SEGS.append((gen, n, voice, list(sfx)))


# 1 · ARRANQUE: cortes rápidos por los mundos con destellos y textos que golpean
def seg_hook():
    flies = [seq(FR, f'fly{i:02d}') for i in range(12)]; per = 14; n = max(len(flies) * per, int((voz['hook'] + 0.35) * FPS))
    texts = [('33 MUNDOS', 0.0), ('+200 PENSADORES', 0.36), ('UNA SOLA PREGUNTA', 0.72)]
    lays = [center_text(t, 132, CREAM if i < 2 else GOLD) for i, (t, _) in enumerate(texts)]
    def gen():
        for i in range(n):
            c = min(len(flies) - 1, i // per); j = i % per; fr = flies[c]; p = fr[min(len(fr) - 1, 8 + j * 2)]
            im = load(p, 1.14 - 0.06 * (j / per)); im = ImageEnhance.Contrast(im).enhance(1.08)
            im = Image.blend(im, Image.new('RGB', (W, H), (0, 0, 0)), 0.35).convert('RGBA')
            if j < 3 and i > 0: im = Image.blend(im.convert('RGB'), Image.new('RGB', (W, H), (255, 250, 235)), (3 - j) / 4).convert('RGBA')
            k = i / n; ti = max(q for q, (_, st) in enumerate(texts) if k >= st); t0 = int(texts[ti][1] * n); dt = i - t0
            im.alpha_composite(fade(scale_layer(lays[ti], 1.35 - 0.35 * min(1, dt / 5)), min(1, dt / 3)))
            yield im.convert('RGB')
    SEGS.append((gen, n, 'hook', [(q * per / FPS, 'hit') for q in range(0, len(flies), 2)]))


# 2 · «¿Te atreves a pensar?» sobre Sócrates, y el título
def cine_frames(tag, clip, a, n):
    d = os.path.join(TMP, tag); os.makedirs(d, exist_ok=True)
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-ss', f'{a:.3f}', '-i', clip, '-frames:v', str(n), '-vf', f'fps={FPS},scale={W}:{H}', '-q:v', '2', os.path.join(d, '%04d.jpg')], check=True)
    fs = [os.path.join(d, f) for f in sorted(os.listdir(d))]; return fs + [fs[-1]] * (n - len(fs))


def seg_atreves():
    n = int((voz['atreves'] + 1.3) * FPS); src = cine_frames('atr', os.path.join(CINE, 'final.mp4'), 1.0, n)
    lay = center_text('¿TE ATREVES A PENSAR?', 124, GOLD)
    def gen():
        for i, p in enumerate(src):
            im = load(p, 1.0 + 0.08 * i / n); im = ImageEnhance.Brightness(im).enhance(0.55).convert('RGBA')
            im.alpha_composite(fade(scale_layer(lay, 1.25 - 0.25 * min(1, i / 8)), min(1, i / 4))); yield im.convert('RGB')
    SEGS.append((gen, n, 'atreves', [(0.0, 'boom')]))


def seg_title():
    n = 40; bg = load(seq(FR, 'fly02')[30]).filter(ImageFilter.GaussianBlur(18)); bg = Image.blend(bg, Image.new('RGB', (W, H), DARK), 0.6)
    logo = Image.open(LOGO).convert('RGBA'); lh = 260; logo = logo.resize((int(logo.width * lh / logo.height), lh), Image.LANCZOS)
    card = bg.convert('RGBA'); d = ImageDraw.Draw(card)
    d.ellipse((W / 2 - 170, 560, W / 2 + 170, 900), fill=(22, 18, 12, 255), outline=GOLD + (255,), width=6); card.alpha_composite(logo, (int(W / 2 - logo.width / 2), 600))
    t = center_text('ODISEA DE LA RAZÓN', 108, CREAM, y=980, sub='El videojuego de filosofía'); card.alpha_composite(t)
    def gen():
        for i in range(n):
            im = scale_layer(card, 1.12 - 0.12 * min(1, i / 10)).convert('RGB') if i < 10 else card.convert('RGB')
            if i < 4: im = Image.blend(im, Image.new('RGB', (W, H), (255, 248, 230)), (4 - i) / 5)
            yield im
    SEGS.append((gen, n, None, [(0.0, 'hit')]))


# 3 · mosaico de retratos: más de doscientos pensadores
def seg_mosaic(n):
    files = sorted(glob.glob(os.path.join(IMG, 'p-*.jpg'))); random.shuffle(files)
    star = [os.path.join(IMG, f'p-{x}.jpg') for x in ('socrates', 'frida', 'gandhi', 'einstein')]
    cols, size = 8, 190; rows = 16; big = Image.new('RGB', (cols * size, rows * size), DARK)
    pics = (files * 3)[:cols * rows]
    for i, f in enumerate(pics):
        im = Image.open(f).convert('RGB').resize((size - 8, size - 8)); big.paste(im, ((i % cols) * size + 4, (i // cols) * size + 4))
    lay = caption('+200 pensadores', 'filósofas, poetas, científicos y sabios', y=210)
    stars = [Image.open(p).convert('RGB').resize((560, 560)) for p in star if os.path.exists(p)]
    def gen():
        for i in range(n):
            k = i / n; z = 1.0 + 0.5 * (1 - k); vw, vh = int(big.width / (1.5 * z) * 0.9), int(big.width / (1.5 * z) * 0.9 * H / W)
            x = int((big.width - vw) * (0.2 + 0.6 * k)); y = int((big.height - vh) * (0.3 + 0.4 * k))
            im = big.crop((x, y, x + vw, y + vh)).resize((W, H), Image.BILINEAR); im = Image.blend(im, Image.new('RGB', (W, H), DARK), 0.25).convert('RGBA')
            im.alpha_composite(fade(lay, min(1, i / 6)))
            if stars:   # los cuatro que nombra el narrador, uno tras otro, en grande
                si = min(len(stars) - 1, int(k * len(stars) * 1.0)); t = (k * len(stars)) % 1
                s = stars[si]; sc = 0.8 + 0.2 * min(1, t * 5); w = int(560 * sc)
                ph = s.resize((w, w)); m = Image.new('L', (w, w), 0); ImageDraw.Draw(m).ellipse((0, 0, w - 1, w - 1), fill=255)
                ring = Image.new('RGBA', (w + 24, w + 24), (0, 0, 0, 0)); ImageDraw.Draw(ring).ellipse((0, 0, w + 23, w + 23), fill=GOLD + (255,))
                im.alpha_composite(ring, ((W - w) // 2 - 12, 1060 - w // 2 - 12)); im.paste(ph, ((W - w) // 2, 1060 - w // 2), m)
            yield im.convert('RGB')
    return gen


def seg_pensadores():
    nv = int((voz['pensadores'] + 0.7) * FPS); nm = int(nv * 0.6); talk = seq(FR0, 'talk', start=60, take=nv - nm)
    g1 = seg_mosaic(nm); lay = caption('Habla con ellos', 'te responden con su propia voz')
    def gen():
        yield from g1()
        for i, p in enumerate(talk):
            im = load(p, 1.04 - 0.04 * i / len(talk)).convert('RGBA'); im.alpha_composite(fade(lay, min(1, i / 6))); yield im.convert('RGB')
    SEGS.append((gen, nm + len(talk), 'pensadores', [(0.0, 'whoosh')]))


# 4 · cierre con Sócrates y frases
FRASES = ['El juego en línea de sabiduría para estos tiempos', '10 minutos al día', '…y vas a pensar distinto']
CORTES = [0.42, 0.7, 1.0]


def seg_cierre():
    n = int((voz['cierre'] + 1.4) * FPS); src = cine_frames('fin', os.path.join(CINE, 'final.mp4'), 1.5, n)
    grad = Image.new('RGBA', (W, 900), (0, 0, 0, 0)); gd = ImageDraw.Draw(grad)
    for i in range(900): gd.line((0, i, W, i), fill=(6, 4, 2, int(225 * (i / 900) ** 1.3)))
    lays = [center_text(t, 96, CREAM if j < 2 else GOLD, y=1300) for j, t in enumerate(FRASES)]; cuts = [0] + [int(n * c) for c in CORTES]
    def gen():
        for i, p in enumerate(src):
            k = max(j for j in range(len(FRASES)) if i >= cuts[j]); t = i - cuts[k]
            im = load(p).convert('RGBA'); im.alpha_composite(grad, (0, H - 900)); im.alpha_composite(fade(scale_layer(lays[k], 1.15 - 0.15 * min(1, t / 6)), min(1, t / 5))); yield im.convert('RGB')
    SEGS.append((gen, n, 'cierre', []))


def seg_end():
    n = int((voz['final2'] + 2.2) * FPS)
    bg = load(seq(FR, 'fly03')[30]).filter(ImageFilter.GaussianBlur(26)); bg = Image.blend(bg, Image.new('RGB', (W, H), (8, 6, 4)), 0.62).convert('RGBA')
    d = ImageDraw.Draw(bg); logo = Image.open(LOGO).convert('RGBA'); lh = 300; logo = logo.resize((int(logo.width * lh / logo.height), lh), Image.LANCZOS)
    d.ellipse((W / 2 - 190, 360, W / 2 + 190, 740), fill=(22, 18, 12, 255), outline=GOLD + (255,), width=6); bg.alpha_composite(logo, (int(W / 2 - logo.width / 2), 400))
    def line(t, y, font, size, fill):
        f = ImageFont.truetype(font, size); d.text(((W - d.textlength(t, font=f)) / 2, y), t, font=f, fill=fill)
    line('ODISEA DE LA RAZÓN', 820, F_BLACK, 88, CREAM + (255,)); line('33 mundos · +200 pensadores', 950, F_BOLD, 58, GOLD + (255,))
    line('Gratis · en español y en inglés', 1040, F_SERIF, 54, CREAM + (255,)); line('Juega hoy · link en la bio', 1200, F_BLACK, 66, GOLD + (255,))
    line('Filosofía para Seres Humanos', 1420, F_SERIF, 50, (243, 230, 196, 255)); line('filosofiaparasereshumanos.com', 1490, F_SERIF, 44, (243, 230, 196, 220))
    card = bg.convert('RGB')
    def gen():
        for i in range(n): yield card
    SEGS.append((gen, n, 'final2', [(0.0, 'hit')]))


# ---------------------------------------------------------------- guion
seg_hook()
seg_atreves()
seg_title()
seg_footage(seq(FR, 'fly02', start=4) + seq(FR, 'fly03', start=4) + seq(FR, 'fly05', start=4) + seq(FR, 'fly06', start=4), ('33 mundos', 'de Sumer a la torre de los números'), 'mundos', sfx=[(0, 'whoosh')])
seg_pensadores()
seg_footage(seq(FR0, 'vs_socrates', start=45), ('Debate', 'y gánales con tus ideas'), 'debate', punch=True, sfx=[(0, 'hit')], bottom=True, zoom0=1.0)
seg_footage(seq(FR, 'orbe', take=150), ('¡Salta!', 'alcanza los orbes de sabiduría'), 'orbes', punch=True, sfx=[(1.75, 'whoosh')], bottom=True)
seg_footage(seq(FR, 'estrella', start=10), ('Estrella fugaz', 'atrápala antes de que se apague'), 'estrella', punch=True)
seg_footage(seq(FR, 'diogenes'), ('Diógenes', 'vive en su tinaja'), 'diogenes')
seg_footage(seq(FR, 'versus'), ('Duelos de ideas', '¿pueden pensar las máquinas?'), 'versus', zoom0=1.0, zoom1=1.0, sfx=[(0, 'hit')], bottom=True)
seg_footage(seq(FR0, 'cave2', start=10) + seq(FR0, 'sisifo', start=5), ('Vive la filosofía', 'la caverna de Platón · Sísifo'), 'experimentos')
seg_footage(seq(FR0, 'online', start=40), ('Juega en línea', 'con amigos, hijos y tu clase'), 'online')
seg_cierre()
seg_end()

# ---------------------------------------------------------------- vídeo: fundidos cortos entre segmentos
XF = 7
vid = OUTF + '.video.mp4'
enc = subprocess.Popen(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                        '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', vid], stdin=subprocess.PIPE)
t = 0; VO = []; FX = []; tail = []
for k, (gen, n, v, sfx) in enumerate(SEGS):
    if v: VO.append((t / FPS, v))
    for (s, kind) in sfx: FX.append((t / FPS + s, kind))
    last = k == len(SEGS) - 1; body = n if last else n - XF; nxt = []
    for i, im in enumerate(gen()):
        if i < len(tail): im = Image.blend(tail[i], im, (i + 1) / (len(tail) + 1))
        if i >= body: nxt.append(im); continue
        enc.stdin.write(im.tobytes()); t += 1
    tail = nxt
enc.stdin.close(); enc.wait(); total = t / FPS

# ---------------------------------------------------------------- sonido: música de tráiler, voz encima, golpes y barridos
sfxdir = os.path.join(TMP, 'sfx'); os.makedirs(sfxdir, exist_ok=True)
SFX = {'hit': 'sine=f=55:d=0.9,volume=3,afade=t=out:st=0.05:d=0.85[a];anoisesrc=d=0.25:c=pink:a=0.5,lowpass=f=900,afade=t=out:d=0.25[b];[a][b]amix=inputs=2',
       'boom': 'sine=f=42:d=1.6,volume=4,afade=t=out:st=0.1:d=1.5[a];anoisesrc=d=0.5:c=brown:a=0.7,lowpass=f=400,afade=t=out:d=0.5[b];[a][b]amix=inputs=2',
       'whoosh': 'anoisesrc=d=0.7:c=pink:a=0.6,bandpass=f=1800:w=1600,afade=t=in:d=0.45,afade=t=out:st=0.45:d=0.25'}
for kname, graph in SFX.items():
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-filter_complex', graph, '-ar', '44100', '-ac', '2', os.path.join(sfxdir, kname + '.wav')], check=True)
ins = ['-i', MUSIC]; filt = []; vo = []; fx = []; j = 2
for st, v in VO:
    ins += ['-i', os.path.join(VOZ, v + '.wav')]; d = int((st + 0.2) * 1000); filt.append(f'[{j}:a]adelay={d}|{d},apad[v{j}]'); vo.append(f'[v{j}]'); j += 1
for st, kind in FX:
    ins += ['-i', os.path.join(sfxdir, kind + '.wav')]; d = int(st * 1000); filt.append(f'[{j}:a]volume=0.55,adelay={d}|{d},apad[x{j}]'); fx.append(f'[x{j}]'); j += 1
filt.append(''.join(vo) + f'amix=inputs={len(vo)}:normalize=0,atrim=0:{total:.3f},asplit[vo][sc]')
filt.append(''.join(fx) + f'amix=inputs={len(fx)}:normalize=0,atrim=0:{total:.3f}[fx]')
filt.append(f'[1:a]apad,atrim=0:{total:.3f},volume=0.8,afade=t=in:d=0.3,afade=t=out:st={total - 2.0:.3f}:d=2.0[m]')
filt.append('[m][sc]sidechaincompress=threshold=0.04:ratio=6:attack=20:release=380[md]')
filt.append('[md][fx][vo]amix=inputs=3:normalize=0,alimiter=limit=0.95[a]')
r = subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', vid] + ins + ['-filter_complex', ';'.join(filt), '-map', '0:v', '-map', '[a]',
                    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-t', f'{total:.3f}', '-movflags', '+faststart', OUTF])
if r.returncode: sys.exit('ffmpeg falló al mezclar el sonido')
os.remove(vid); print(f'duración {total:.2f} s'); print('listo', OUTF)
