"""Trailer in English, «Odyssey of Reason» (vertical 1080x1920, ~62 s), in the style of big game trailers:
cinematic cold open with Socrates, title slam, rapid cuts through the worlds, the main features (debate, trial,
tournament, family trivia on TV, narrated tour on a treadmill, thinkers), the climax «Dare to think?» and the end card.
Kinetic word-by-word captions synced to the narrator, flashes and impacts on the beat.
Use: python3 montaje-trailer-en.py <work dir> <logo.png> <out.mp4>
The work dir holds: voz/ (voz.json + .wav), musica-a.mp3, cine/<clip>/ (frames at 30 fps), mundos/, socrates/, juicio/,
torneo/, recorrido/ (shots from the capture tools run on index-en.html), img/hombre.jpg and img/familia.jpg."""
import json, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
D, LOGO, OUTF = sys.argv[1:4]
W, H, FPS = 1080, 1920, 30
TMP = OUTF + '.tmp'; os.makedirs(TMP, exist_ok=True)
F_BLACK = '/usr/share/fonts/opentype/inter/Inter-Black.otf'
F_SERIF_B = '/usr/share/fonts/truetype/crosextra/Caladea-Bold.ttf'
F_SERIF = '/usr/share/fonts/truetype/crosextra/Caladea-Regular.ttf'
GOLD = (255, 205, 105); CREAM = (250, 242, 225); RED = (255, 110, 90); GREEN = (120, 235, 150); BLUE = (150, 210, 255)
def shots(sub):
    p = os.path.join(D, sub); return {d.split('-', 1)[1]: sorted(os.path.join(p, d, f) for f in os.listdir(os.path.join(p, d))) for d in sorted(os.listdir(p)) if os.path.isdir(os.path.join(p, d))}
CINE = {c: sorted(os.path.join(D, 'cine', c, f) for f in os.listdir(os.path.join(D, 'cine', c))) for c in os.listdir(os.path.join(D, 'cine')) if os.path.isdir(os.path.join(D, 'cine', c))}
MUN = shots('mundos'); SOC = shots('socrates'); JUI = shots('juicio'); TOR = shots('torneo'); REC = shots('recorrido')
VT = {'v1': 0.5, 'v2': 7.0, 'v3': 9.3, 'v4': 15.2, 'v5': 19.9, 'v6': 25.3, 'v7': 29.0, 'v8': 32.7, 'v9': 37.6, 'v10': 46.0, 'v11': 49.2, 'v12': 52.0}
END = 62.0
# (fuente, inicio, fin, rótulo, color, subrótulo). Fuente: lista de tomas (se reparten el tramo), 'TITLE', 'DARE', 'FAM', 'RUN'
WORLDS = [MUN[k] for k in MUN]
SEG = [
    ([CINE['socrates']], 0.0, 6.6, 'ATHENS · 399 BC', GOLD, 'Sentenced to death for asking questions'),
    ('TITLE', 6.6, 9.2, '', GOLD, ''),
    (WORLDS, 9.2, 15.0, '37 WORLDS', GOLD, 'From Sumer to the edge of the cosmos'),
    ([SOC['pregunta']], 15.0, 16.6, 'DEBATE SOCRATES', GOLD, 'He asks. You answer.'),
    ([SOC['falacia']], 16.6, 18.2, 'FALLACY!', RED, 'He catches you'),
    ([SOC['bueno']], 18.2, 19.8, 'SOLID ARGUMENT', GREEN, 'Win with reason'),
    ([JUI['acusacion']], 19.8, 21.4, 'STAND TRIAL', GOLD, 'in his place'),
    ([JUI['votacion']], 21.4, 23.5, '500 ATHENIANS VOTE', GOLD, ''),
    ([JUI['muerte']], 23.5, 25.2, 'GUILTY', RED, ''),
    ([TOR['llena']], 25.2, 27.0, 'LIVE TOURNAMENTS', GOLD, 'Up to 8 friends'),
    ([TOR['pregunta2']], 27.0, 28.9, 'FASTEST MIND WINS', GOLD, ''),
    ('FAM', 28.9, 32.5, 'FAMILY GAME NIGHT', GOLD, 'Trivia on the big screen'),
    ('RUN', 32.5, 37.4, 'THE GAME PLAYS ITSELF', BLUE, 'Narrated tour'),
    ([REC['sumer-1'], CINE['hipatia'], REC['atenas-1'], CINE['sorjuana'], REC['biblia-0']], 37.4, 43.2, '230+ THINKERS', GOLD, 'In their own voices'),
    ([TOR['museo'], REC['cosmos-0']], 43.2, 45.6, 'ART · SCIENCE · FAITH', GOLD, 'Masterpieces museum · the cosmos'),
    ('NIETZ', 45.6, 48.9, '', GOLD, ''),
    ('DARE', 48.9, 51.6, '', GOLD, ''),
]
def font(p, s): return ImageFont.truetype(p, s)
def fit(d, txt, path, size, maxw):
    f = font(path, size)
    while d.textlength(txt, font=f) > maxw and f.size > 30: f = font(path, f.size - 4)
    return f
def wrap(d, txt, path, size, maxw):
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
    if not big: return im
    im = im.convert('RGBA'); ov = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(ov); a = min(1, k * 5)
    for y in range(0, 560): d.line([(0, y), (W, y)], fill=(6, 4, 2, int(225 * (1 - y / 560) * a)))
    pop = 1 + 0.12 * max(0, 1 - k * 6)
    lines, fb = wrap(d, big, F_BLACK, int(104 * pop), W - 90); y = (175 if len(lines) == 1 else 130) - int(60 * max(0, 1 - k * 4) ** 2)
    for ln in lines:
        d.text((W / 2, y), ln, font=fb, fill=col + (int(255 * a),), anchor='mm', stroke_width=5, stroke_fill=(15, 8, 2, int(255 * a))); y += int(fb.size * 1.12)
    if small:
        fs = fit(d, small, F_SERIF_B, 58, W - 120); d.text((W / 2, y + 30), small, font=fs, fill=CREAM + (int(240 * a),), anchor='mm', stroke_width=2, stroke_fill=(15, 8, 2, int(200 * a)))
    return Image.alpha_composite(im, ov).convert('RGB')
# ---------------------------------------------------------------- kinetic captions, word by word with the narrator
VJ = json.load(open(os.path.join(D, 'voz', 'voz.json')))
WORDS = []
for li, (name, text) in enumerate(VJ['lines']):
    t0 = VT[name] + 0.08; dur = max(0.5, VJ['dur'][name] - 0.3); ws = text.replace('…', ' ').split()
    tot = sum(len(w) + 2 for w in ws); t = t0
    for w in ws:
        dd = dur * (len(w) + 2) / tot; WORDS.append((t, t + dd, w, li)); t += dd
KEY = {'death', 'questions', 'turn', 'worlds', 'sumer', 'cosmos', 'socrates', 'fallacy', 'catch', 'trial', 'fate', 'friends', 'tournament', 'family', 'screen', 'time', 'itself', 'thinkers', 'voice', 'question', 'dare', 'think', 'free', 'odyssey', 'reason'}
NO_WORDS = {'v2', 'v11', 'v12'}  # these lines get their own big typography
def hyper(im, tt, y=1180):
    cur = [i for i, (a, b, w, li) in enumerate(WORDS) if a <= tt < b + 0.15 and VJ['lines'][li][0] not in NO_WORDS]
    if not cur: return im
    i = cur[-1]; li = WORDS[i][3]; first = next(j for j, x in enumerate(WORDS) if x[3] == li)
    g0 = first + ((i - first) // 3) * 3; grp = [x for x in WORDS[g0:g0 + 3] if x[3] == li]
    im = im.convert('RGBA'); ov = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    clean = lambda w: w.strip('«»¿?¡!.,:;"').upper()
    f = font(F_BLACK, 104); sp = 40
    widths = [d.textlength(clean(w), font=f) for _, _, w, _ in grp]; total = sum(widths) + sp * (len(grp) - 1)
    scale = min(1, (W - 170) / max(1, total)); f = font(F_BLACK, int(104 * scale)); widths = [d.textlength(clean(w), font=f) for _, _, w, _ in grp]; total = sum(widths) + sp * (len(grp) - 1)
    x = (W - total) / 2
    for j, (a, b, w, _) in enumerate(grp):
        if tt < a: break
        k = min(1, (tt - a) / 0.14); pop = 1 + 0.12 * (1 - k) ** 2; live = a <= tt < b
        word = clean(w); hot = word.lower().strip("'s") in KEY or word.lower() in KEY
        col = (255, 214, 90, 255) if live else ((150, 225, 255, 255) if hot else (255, 255, 255, 255))
        ff = font(F_BLACK, int(f.size * (pop if live else 1))); cx = x + widths[j] / 2; dy = int(18 * (1 - k))
        if live:
            bw = d.textlength(word, font=ff) + 34; d.rounded_rectangle([cx - bw / 2, y - ff.size * 0.62 + dy, cx + bw / 2, y + ff.size * 0.62 + dy], radius=18, fill=(20, 12, 4, 170))
        d.text((cx + 5, y + 6 + dy), word, font=ff, fill=(0, 0, 0, 160), anchor='mm')
        d.text((cx, y + dy), word, font=ff, fill=col, anchor='mm', stroke_width=7, stroke_fill=(10, 6, 2, 255))
        x += widths[j] + sp
    return Image.alpha_composite(im, ov).convert('RGB')
# ---------------------------------------------------------------- movimiento suave
_CACHE = {}
def _load(p):
    im = _CACHE.get(p)
    if im is None:
        im = Image.open(p).convert('RGB')
        if im.size != (W, H): im = im.resize((W, H), Image.BICUBIC)
        if len(_CACHE) > 24: _CACHE.pop(next(iter(_CACHE)))
        _CACHE[p] = im
    return im
def sample(L, kk):
    """Cuadro en la posición kk (0..1) de la toma, fundiendo los dos cuadros vecinos: movimiento continuo."""
    f = max(0.0, min(1.0, kk)) * (len(L) - 1); i = int(f); fr = f - i
    a = _load(L[i]); return a if fr < 0.02 or i + 1 >= len(L) else Image.blend(a, _load(L[i + 1]), fr)
def zoom(im, z, dy=0.0):
    """Acercamiento con precisión de subpíxel (sin saltos): escala z alrededor del centro, desplazado dy píxeles."""
    w, h = im.size; c = 1 / z
    return im.transform((W, H), Image.AFFINE, (c * w / W, 0, (w - w * c) / 2, 0, c * h / H, (h - h * c) / 2 + dy), resample=Image.BICUBIC)
# ---------------------------------------------------------------- special scenes
NIE = Image.open(os.path.join(D, 'img', 'nietzsche3.jpg')).convert('RGB')  # hecho a partir de su fotografía real (dominio público)
def nietz(k):
    im = cover(NIE, k * 1.6, drift=-20); fl = max(0, 1 - abs(k - 0.25) * 14) + 0.7 * max(0, 1 - abs(k - 0.62) * 18)  # relámpagos
    if fl > 0: im = Image.blend(im, ImageEnhance.Brightness(im).enhance(2.2), min(1, fl))
    d = ImageDraw.Draw(im); d.rectangle([0, H - 110, W, H], fill=(0, 0, 0)); return im
HOM = Image.open(os.path.join(D, 'img', 'hombre.jpg')).convert('RGB'); FAMI = Image.open(os.path.join(D, 'img', 'familia.jpg')).convert('RGB')
TV_RECT = (270, 392, 546, 563)
PIP = [p for n in ('sumer-1', 'atenas-1', 'biblia-0', 'cosmos-0') for p in REC[n]]
def cover(src, k, drift=30):
    im = src.resize((int(src.width * H / src.height), H), Image.BICUBIC) if src.width / src.height < W / H else src.resize((W, int(src.height * W / src.width)), Image.BICUBIC)
    if im.size != (W, H): im = im.crop(((im.width - W) // 2, (im.height - H) // 2, (im.width - W) // 2 + W, (im.height - H) // 2 + H))
    return zoom(im, 1.0 + 0.08 * k, drift * k * 0.5)
def fam(k):
    bg = FAMI.copy(); x0, y0, x1, y1 = TV_RECT; L = TOR['pregunta2']; t = sample(L, k)
    t = ImageEnhance.Brightness(t.crop((0, 600, 1080, 1270)).resize((x1 - x0, y1 - y0), Image.BILINEAR)).enhance(1.12); bg.paste(t, (x0, y0)); return cover(bg, k * 0.6)
def run(k):
    im = cover(HOM, k); p = sample(PIP, k).resize((330, 586), Image.BILINEAR)
    fr = Image.new('RGB', (354, 610), (20, 20, 24)); fr.paste(p, (12, 12)); m = Image.new('L', fr.size, 0); ImageDraw.Draw(m).rounded_rectangle([0, 0, fr.width - 1, fr.height - 1], radius=34, fill=255)
    im.paste(fr, (W - fr.width - 40, H - fr.height - 150), m); d = ImageDraw.Draw(im); d.text((W - fr.width / 2 - 40, H - 120), 'ON HIS SCREEN', font=font(F_BLACK, 34), fill=(255, 214, 90), anchor='mm', stroke_width=4, stroke_fill=(10, 6, 2)); return im
def blackcard(bg, k, dark=0.25):
    return ImageEnhance.Brightness(bg.filter(ImageFilter.GaussianBlur(14))).enhance(dark)
def title(tt, a):
    k = tt - a; src = CINE['portal']; im = sample(src, min(1, (k * 30 + 60) / (len(src) - 1)))
    im = ImageEnhance.Brightness(im).enhance(0.75); d = ImageDraw.Draw(im)
    s = 1 + 0.35 * max(0, 1 - k * 3) ** 2; al = min(1, k * 4)
    f1 = font(F_BLACK, int(150 * s)); f2 = font(F_BLACK, int(118 * s))
    for txt, ff, y in (('ODYSSEY', f1, 820), ('OF REASON', f2, 975)):
        d.text((W / 2 + 6, y + 8), txt, font=ff, fill=(0, 0, 0), anchor='mm')
        d.text((W / 2, y), txt, font=ff, fill=tuple(int(c * al) for c in GOLD), anchor='mm', stroke_width=6, stroke_fill=(20, 10, 2))
    if k > 1.0:
        fv = font(F_SERIF_B, 70); d.text((W / 2, 1180), "Now… it's your turn.", font=fv, fill=CREAM, anchor='mm', stroke_width=3, stroke_fill=(10, 6, 2))
    if k < 0.18: im = Image.blend(im, Image.new('RGB', (W, H), (255, 240, 200)), 0.8 * (1 - k / 0.18))
    return im
def dare(tt, a):
    k = tt - a; src = CINE['socrates']; bg = sample(src, min(1, (150 + k * 20) / (len(src) - 1)))
    im = ImageEnhance.Brightness(bg).enhance(0.45); d = ImageDraw.Draw(im); s = 1 + 0.5 * max(0, 1 - k * 4) ** 2
    for txt, y in (('DARE', 800), ('TO THINK?', 960)):
        ff = font(F_BLACK, int(170 * s)); d.text((W / 2 + 7, y + 9), txt, font=ff, fill=(0, 0, 0), anchor='mm'); d.text((W / 2, y), txt, font=ff, fill=GOLD, anchor='mm', stroke_width=7, stroke_fill=(20, 10, 2))
    if k < 0.15: im = Image.blend(im, Image.new('RGB', (W, H), (255, 245, 220)), 0.85 * (1 - k / 0.15))
    return im
def ending(tt):
    k = tt - 51.6; src = CINE['socrates']; bg = blackcard(Image.open(src[200]).convert('RGB'), k, 0.22); d = ImageDraw.Draw(bg); a = min(1, k * 2)
    lg = Image.open(LOGO).convert('RGBA'); lg.thumbnail((300, 300)); bg.paste(lg, ((W - lg.width) // 2, 300), lg)
    rows = [('ODYSSEY', F_BLACK, 140, GOLD), ('OF REASON', F_BLACK, 112, GOLD), ('', F_SERIF, 40, CREAM), ('230+ thinkers · 37 worlds', F_SERIF_B, 62, CREAM), ('Free · in your browser', F_SERIF_B, 62, CREAM), ('', F_SERIF, 40, CREAM), ('Link in bio', F_BLACK, 66, BLUE), ('A Filosofía para Seres Humanos project', F_SERIF, 40, CREAM)]
    y = 800
    for txt, f, s, col in rows:
        if txt: fo = fit(d, txt, f, s, W - 100); d.text((W / 2, y), txt, font=fo, fill=tuple(int(c * a) for c in col), anchor='mm', stroke_width=3 if f == F_BLACK else 0, stroke_fill=(10, 6, 2))
        y += int(s * 1.3)
    return bg
# ---------------------------------------------------------------- render
n = int(END * FPS)
for i in range(n):
    tt = i / FPS; seg = next((s for s in SEG if s[1] <= tt < s[2]), None)
    if seg is None: im = ending(tt)
    else:
        src, a, b, big, col, small = seg; k = (tt - a) / max(0.01, b - a)
        if src == 'TITLE': im = title(tt, a)
        elif src == 'DARE': im = dare(tt, a)
        elif src == 'NIETZ': im = nietz(k)
        elif src == 'FAM': im = caption(fam(k), big, col, small, tt - a)
        elif src == 'RUN': im = caption(run(k), big, col, small, tt - a)
        else:
            m = len(src); j = min(m - 1, int(k * m)); kk = k * m - j; L = src[j]
            im = zoom(sample(L, kk), 1 + 0.07 * kk)
            if m > 1 and kk < 0.08: im = Image.blend(im, Image.new('RGB', (W, H), (255, 240, 210)), 0.45 * (1 - kk / 0.08))  # flash on each cut
            if src[0] is CINE.get('nietzsche'): im = ImageEnhance.Contrast(im).enhance(1.1)
            im = caption(im, big, col, small, tt - a if m == 1 else tt - a)
            if big in ('FALLACY!', 'GUILTY') and tt - a < 0.3: im = Image.blend(im, Image.new('RGB', (W, H), (255, 40, 30)), 0.4 * (1 - (tt - a) / 0.3))
            if big == 'SOLID ARGUMENT' and tt - a < 0.3: im = Image.blend(im, Image.new('RGB', (W, H), (90, 255, 140)), 0.35 * (1 - (tt - a) / 0.3))
        if tt - a < 0.1 and a > 0 and src not in ('TITLE', 'DARE', 'NIETZ'): im = Image.blend(im, Image.new('RGB', (W, H), (255, 240, 200)), 0.5 * (1 - (tt - a) / 0.1))
    # in the panels the words go just under the headline; on full-screen scenes, lower
    panel = seg is not None and isinstance(seg[0], list) and (seg[0][0] in (SOC.get('pregunta'), SOC.get('falacia'), SOC.get('bueno'), JUI.get('acusacion'), JUI.get('votacion'), JUI.get('muerte'), TOR.get('llena'), TOR.get('pregunta2'), TOR.get('museo')))
    im = hyper(im, tt, 500 if panel else 1180)
    # cinematic letterbox on the film scenes
    if seg is not None and isinstance(seg[0], list) and seg[0][0] in (CINE['socrates'], CINE['nietzsche']):
        d = ImageDraw.Draw(im); d.rectangle([0, H - 110, W, H], fill=(0, 0, 0))
    im.save(os.path.join(TMP, f'{i:05d}.jpg'), quality=90)
ins = []; fl = []
for j, (name, _) in enumerate(VJ['lines']):
    ins += ['-i', os.path.join(D, 'voz', name + '.wav')]; ms = int(VT[name] * 1000); fl.append(f'[{j + 2}:a]aresample=44100,volume=1.0,adelay={ms}|{ms}[v{j}]')
nv = len(VJ['lines']); mix = ''.join(f'[v{j}]' for j in range(nv))
filt = ';'.join(fl) + f';{mix}amix=inputs={nv}:duration=longest:normalize=0[voz];[voz]apad=whole_dur={END},asplit=2[vz][sc];[1:a]volume=0.42,afade=t=in:d=0.3,afade=t=out:st={END - 3}:d=3[m0];[m0][sc]sidechaincompress=threshold=0.015:ratio=10:attack=15:release=350:makeup=1[m];[vz][m]amix=inputs=2:duration=longest:normalize=0,atrim=0:{END},alimiter=limit=0.95[a]'
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-framerate', str(FPS), '-i', os.path.join(TMP, '%05d.jpg'), '-i', os.path.join(D, 'musica-a.mp3'), *ins, '-filter_complex', filt,
    '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '19', '-preset', 'medium', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', '-t', f'{END}', OUTF], check=True)
print('done', OUTF, END, 's')
