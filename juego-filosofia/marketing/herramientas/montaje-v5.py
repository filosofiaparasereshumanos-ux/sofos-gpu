"""Tráiler para docentes (~45 s): intercala las escenas de cine habladas (Sócrates, Hipatia,
Sor Juana, sabidurías del mundo, «hoy puedes hablar con ellos», «¿te atreves a pensar?») con golpes
de juego real: enfrentamientos con los avatares, mundos, experimentos, mapa y aula. Una sola música
continua bajo las voces (con «ducking») y la firma con logo y web.
Escenas habladas de un aula (Veo) intercaladas con el modo «En vivo», los diálogos, los experimentos y el mapa de la clase.
Uso: python3 montaje-v5.py <carpeta de trabajo> <carpeta de escenas del aula (vid/, capturas)> <tráiler I.mp4> <salida.mp4>"""
import json, os, subprocess, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WK, T1, OLD, OUTF = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
FR = os.path.join(WK, 'f'); TMP = os.path.join(WK, 'tmp'); os.makedirs(TMP, exist_ok=True)
ESC = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'escenas')
MUSIC = os.path.join(WK, 'm1.mp3')
W, H, FPS = 1080, 1920, 30
F_BLACK = '/usr/share/fonts/opentype/inter/Inter-Black.otf'
F_BOLD = '/usr/share/fonts/opentype/inter/Inter-Bold.otf'
F_SERIF = '/usr/share/fonts/truetype/crosextra/Caladea-Regular.ttf'
F_SERIF_B = '/usr/share/fonts/truetype/crosextra/Caladea-Bold.ttf'
GOLD = (255, 205, 105); CREAM = (250, 242, 225)
ERAS = json.load(open(os.path.join(WK, 'eras.json')))


def ff(args):
    r = subprocess.run(['ffmpeg', '-loglevel', 'error', '-y'] + args)
    if r.returncode: sys.exit('ffmpeg falló: ' + ' '.join(args[:6]))


def wrap(draw, text, font, maxw):
    words, lines, cur = text.split(), [], ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if draw.textlength(t, font=font) > maxw and cur: lines.append(cur); cur = w
        else: cur = t
    if cur: lines.append(cur)
    return lines


def caption(head, sub=None, pos='top', size=92):
    """Capa RGBA con titular grande (mayúsculas) y subtítulo, con sombra suave."""
    img = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
    fh = ImageFont.truetype(F_BLACK, size); fs = ImageFont.truetype(F_SERIF_B, 50)
    hl = wrap(d, head.upper(), fh, W - 120); sl = wrap(d, sub, fs, W - 160) if sub else []
    lh, ls = int(size * 1.08), 62
    total = len(hl) * lh + (18 + len(sl) * ls if sl else 0)
    y0 = 250 if pos == 'top' else (H - total) // 2 if pos == 'mid' else H - total - 330
    sh = Image.new('RGBA', (W, H), (0, 0, 0, 0)); sd = ImageDraw.Draw(sh)
    # banda oscura detrás del rótulo para que se lea sobre cualquier pantalla del juego
    bw = max([d.textlength(l, font=fh) for l in hl] + [d.textlength(l, font=fs) for l in sl]) + 90
    box = Image.new('RGBA', (W, H), (0, 0, 0, 0)); ImageDraw.Draw(box).rounded_rectangle(((W - bw) / 2, y0 - 34, (W + bw) / 2, y0 + total + 30), radius=36, fill=(10, 8, 5, 190), outline=(214, 168, 74, 150), width=3)
    img = Image.alpha_composite(box, img); d = ImageDraw.Draw(img)
    y = y0
    for l in hl:
        x = (W - d.textlength(l, font=fh)) / 2
        sd.text((x + 4, y + 6), l, font=fh, fill=(0, 0, 0, 230)); d.text((x, y), l, font=fh, fill=CREAM + (255,), stroke_width=2, stroke_fill=(40, 25, 5, 255)); y += lh
    y += 18
    for l in sl:
        x = (W - d.textlength(l, font=fs)) / 2
        sd.text((x + 3, y + 4), l, font=fs, fill=(0, 0, 0, 230)); d.text((x, y), l, font=fs, fill=GOLD + (255,)); y += ls
    sh = sh.filter(ImageFilter.GaussianBlur(9))
    return Image.alpha_composite(sh, img)


def world_label(e):
    img = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
    # franja inferior oscura
    grad = Image.new('L', (1, 520)); grad.putdata([int(220 * (i / 519) ** 1.4) for i in range(520)])
    img.paste(Image.new('RGBA', (W, 520), (8, 6, 4, 255)), (0, H - 520), grad.resize((W, 520)))
    fn = ImageFont.truetype(F_SERIF_B, 54); fy = ImageFont.truetype(F_BOLD, 34); ft = ImageFont.truetype(F_SERIF, 40)
    t1 = f"{e['num']} · {e['name']}"; y = H - 330
    for l in wrap(d, t1, fn, W - 120):
        d.text(((W - d.textlength(l, font=fn)) / 2, y), l, font=fn, fill=GOLD + (255,)); y += 64
    y += 4; t2 = e['years'].upper(); d.text(((W - d.textlength(t2, font=fy)) / 2, y), t2, font=fy, fill=(220, 210, 190, 255)); y += 52
    t3 = ' · '.join(e['sages']);
    for l in wrap(d, t3, ft, W - 140):
        d.text(((W - d.textlength(l, font=ft)) / 2, y), l, font=ft, fill=CREAM + (255,)); y += 50
    return img


def frames_of(name, take=None, step=1.0, start=0):
    fs = sorted(os.listdir(os.path.join(FR, name)))[start:]
    out, t = [], 0.0
    while int(t) < len(fs) and (take is None or len(out) < take): out.append(os.path.join(FR, name, fs[int(t)])); t += step
    return out


def load(path):
    return Image.open(path).convert('RGB').resize((W, H), Image.BILINEAR)


def kenburns(path, n, z0=1.0, z1=1.07, bg=None):
    src = Image.open(path).convert('RGB'); out = []
    if bg is None:
        base = src.resize((W, H), Image.BILINEAR)
    else:
        base = Image.new('RGB', (W, H)); b = bg.resize((W, H)).filter(ImageFilter.GaussianBlur(30)); base.paste(b); base = Image.blend(base, Image.new('RGB', (W, H), (8, 6, 4)), 0.45)
        sw = W - 80; sh = int(src.size[1] * sw / src.size[0]); fg = src.resize((sw, sh), Image.LANCZOS); base.paste(fg, ((W - sw) // 2, max(60, (H - sh) // 2 + 80)))
    for i in range(n):
        z = z0 + (z1 - z0) * i / max(1, n - 1); cw, ch = int(W / z), int(H / z)
        out.append(base.crop(((W - cw) // 2, (H - ch) // 2, (W - cw) // 2 + cw, (H - ch) // 2 + ch)).resize((W, H), Image.BILINEAR))
    return out


def card(lines, n, bgpath, big=None):
    bg = Image.open(bgpath).convert('RGB').resize((W, H)).filter(ImageFilter.GaussianBlur(24)); bg = Image.blend(bg, Image.new('RGB', (W, H), (8, 6, 4)), 0.6)
    fb = ImageFont.truetype(F_BLACK, 86); fm = ImageFont.truetype(F_SERIF_B, 52)
    frames = []
    for i in range(n):
        im = bg.copy(); d = ImageDraw.Draw(im); y = 520
        for j, (txt, kind) in enumerate(lines):
            appear = 6 + j * 9; a = max(0.0, min(1.0, (i - appear) / 8))
            if a <= 0: y += 120 if kind == 'b' else 80; continue
            f = fb if kind == 'b' else fm; col = GOLD if kind == 'b' else CREAM
            for l in wrap(d, txt, f, W - 140):
                x = (W - d.textlength(l, font=f)) / 2; dy = int((1 - a) * 30)
                c = tuple(int(cc * a + 10 * (1 - a)) for cc in col)
                d.text((x, y + dy), l, font=f, fill=c); y += 100 if kind == 'b' else 66
            y += 22
        frames.append(im)
    return frames



def name_label(name, sub):
    img = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
    grad = Image.new('L', (1, 520)); grad.putdata([int(220 * (i / 519) ** 1.4) for i in range(520)])
    img.paste(Image.new('RGBA', (W, 520), (8, 6, 4, 255)), (0, H - 520), grad.resize((W, 520)))
    fn = ImageFont.truetype(F_SERIF_B, 74); fy = ImageFont.truetype(F_BOLD, 36)
    d.text(((W - d.textlength(name.upper(), font=fn)) / 2, H - 300), name.upper(), font=fn, fill=GOLD + (255,))
    d.text(((W - d.textlength(sub.upper(), font=fy)) / 2, H - 205), sub.upper(), font=fy, fill=CREAM + (255,))
    return img


def subtitle(text, gold):
    """Subtítulo al estilo del tráiler I (Inter Black, borde negro, palabra clave dorada)."""
    img = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(img); f = ImageFont.truetype(F_BLACK, 84)
    sh = Image.new('RGBA', (W, H), (0, 0, 0, 0)); sd = ImageDraw.Draw(sh)
    words = text.split(); sp = d.textlength(' ', font=f); tw = sum(d.textlength(w, font=f) for w in words) + sp * (len(words) - 1)
    x = (W - tw) / 2; y = 1360
    for w in words:
        sd.text((x + 4, y + 6), w, font=f, fill=(0, 0, 0, 180), anchor='lm')
        d.text((x, y), w, font=f, fill=(GOLD if w.strip('.,') == gold else (255, 255, 255)) + (255,), anchor='lm', stroke_width=7, stroke_fill=(0, 0, 0, 255))
        x += d.textlength(w, font=f) + sp
    return Image.alpha_composite(sh.filter(ImageFilter.GaussianBlur(6)), img)


def big(text, sub=None):
    return caption(text, sub, 'top', 104)


def old_frames(a, b):
    """Fotogramas del tráiler I (con sus subtítulos y rótulos) entre a y b segundos."""
    n = int(round((b - a) * FPS))
    p = subprocess.Popen(['ffmpeg', '-loglevel', 'error', '-ss', f'{a:.3f}', '-i', OLD, '-frames:v', str(n), '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
    out = []
    for _ in range(n):
        buf = p.stdout.read(W * H * 3)
        if len(buf) < W * H * 3: break
        out.append(Image.frombuffer('RGB', (W, H), buf).copy())
    p.wait()
    while len(out) < n: out.append(out[-1])
    return out


def vs(sid, boss=False, slow=False):
    A = 34 + (86 if boss else 0)
    fr = frames_of('vs_' + sid, take=12, start=12, step=1.8)
    if boss: fr += frames_of('vs_' + sid, take=14, start=50, step=2.5)
    fr += frames_of('vs_' + sid, take=9, start=A + 20)
    fr += frames_of('vs_' + sid, take=22, start=A + 44, step=1.6)
    return fr



def clip_frames(path, a, b):
    n = int(round((b - a) * FPS))
    p = subprocess.Popen(['ffmpeg', '-loglevel', 'error', '-ss', f'{a:.3f}', '-i', path, '-vf', f'fps={FPS},scale={W}:{H}:flags=lanczos', '-frames:v', str(n), '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
    out = []
    for _ in range(n):
        buf = p.stdout.read(W * H * 3)
        if len(buf) < W * H * 3: break
        out.append(Image.frombuffer('RGB', (W, H), buf).copy())
    p.wait()
    while len(out) < n: out.append(out[-1])
    return out

def wide(path, n, z1=1.06):  # captura 16:9 del proyector sobre fondo desenfocado
    return kenburns(path, n, 1.0, z1, bg=Image.open(path))

P = []
def piece(frames, layers=None, voice=None, boom=False, flash=True):
    P.append(dict(frames=frames, layers=layers, voice=voice, boom=boom, flash=flash))
V = lambda n: os.path.join(T1, 'vid', n + '.mp4')
C = lambda n: os.path.join(T1, 'capturas', n)

piece(clip_frames(V('aula1'), 0, 7.6), voice=(V('aula1'), 0.0), flash=False)
piece(wide(C('lobby.png'), 54), [big('Un código de 4 letras', 'proyectado en la pizarra')], boom=True)
piece(kenburns(C('iphone-pregunta.png'), 48, 1.0, 1.05), [big('Cada uno responde', 'desde su celular')])
piece(wide(C('respuesta.png'), 48), [big('Puntos y ranking', 'en tiempo real')])
piece(clip_frames(V('aula2'), 0, 7.6), voice=(V('aula2'), 0.0))
piece(wide(C('podio.png'), 48), [big('¡Podio!', 'hasta 25 o más jugadores')], boom=True)
piece(frames_of('vs_socrates', take=30, start=12, step=1.4), [big('36 diálogos socráticos', 'aprende a argumentar')])
piece(kenburns(C('xp-tranvia.png'), 42, 1.0, 1.05), [big('11 experimentos mentales', 'de la caverna al tranvía')])
piece(wide(C('mapa-clase.png'), 48), [big('El mapa filosófico', 'de toda tu clase')])
piece(kenburns(C('guia.png'), 42, 1.0, 1.04, bg=Image.open(C('guia.png'))), [big('Guía para docentes', 'gratis, en PDF')])
piece(clip_frames(V('casa'), 0, 7.6), voice=(V('casa'), 0.0), boom=True)
bgc = os.path.join(FR, 'w15', sorted(os.listdir(os.path.join(FR, 'w15')))[20])
piece(card([('Odisea de la Razón', 'b'), ('Filosofía, ciencia e historia', 'm'), ('Gratis · en el celular · sin instalar', 'm'), ('Pruébalo con tu clase ↓', 'b')], 105, bgc), boom=True)
OUTRO_T = sum(len(p['frames']) for p in P) / FPS
piece(old_frames(62.6, 67.55), flash=False)

# ---------------------------------------------------------------- vídeo
vid = os.path.join(TMP, 'v5.mp4')
enc = subprocess.Popen(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                        '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', vid], stdin=subprocess.PIPE)
t = 0; STARTS = []
for k, p in enumerate(P):
    STARTS.append(t / FPS)
    for i, fr in enumerate(p['frames']):
        im = load(fr) if isinstance(fr, str) else fr
        if p['flash'] and k > 0 and i < 3: im = Image.blend(im, Image.new('RGB', (W, H), (255, 245, 225)), 0.45 * (3 - i) / 3)
        if p['layers']:
            im = im.convert('RGBA')
            for L in p['layers']:
                a = min(1.0, (i + 1) / 4)
                im = Image.alpha_composite(im, L if a >= 1 else Image.blend(Image.new('RGBA', (W, H), (0, 0, 0, 0)), L, a))
            im = im.convert('RGB')
        enc.stdin.write(im.tobytes()); t += 1
enc.stdin.close(); enc.wait()
TOTAL = t / FPS; print('duración', round(TOTAL, 2), 's')

# ---------------------------------------------------------------- audio: voces + música continua con ducking + golpes + firma
ins, vparts, nv = [], [], 0
for k, p in enumerate(P):
    if not p['voice']: continue
    f, ss = p['voice']; d = len(p['frames']) / FPS; ms = int(STARTS[k] * 1000)
    ins += ['-i', f]
    vparts.append(f"[{nv}:a]atrim={ss}:{ss + d},asetpts=PTS-STARTPTS,aresample=48000,afade=in:d=0.03,afade=out:st={d - 0.06}:d=0.06,adelay={ms}|{ms}[v{nv}]"); nv += 1
iM = nv; ins += ['-i', MUSIC]; iO = nv + 1; ins += ['-ss', '62.6', '-i', OLD]
booms = [STARTS[k] for k, p in enumerate(P) if p['boom']]
boom_src = ("aevalsrc='0.9*sin(2*PI*(38+70*exp(-6*t))*t)*exp(-2.2*t)+0.25*(random(0)-0.5)*exp(-14*t)':s=48000:d=2.5,lowpass=f=900,pan=stereo|c0=c0|c1=c0")
for _ in booms: ins += ['-f', 'lavfi', '-i', boom_src]
fc = ';'.join(vparts) + ';' + ''.join(f'[v{i}]' for i in range(nv)) + f'amix=inputs={nv}:normalize=0,apad=whole_dur={TOTAL}[voice];'
fc += f"[{iM}:a]atrim=1.8:{1.8 + OUTRO_T},asetpts=PTS-STARTPTS,aresample=48000,afade=out:st={OUTRO_T - 0.5}:d=0.5,volume=0.75,apad=whole_dur={TOTAL}[mus];"
fc += ';'.join(f"[{iO + 1 + j}:a]aresample=48000,adelay={int(b * 1000)}|{int(b * 1000)}[b{j}]" for j, b in enumerate(booms))
fc += ';' + ''.join(f'[b{j}]' for j in range(len(booms))) + f'amix=inputs={len(booms)}:normalize=0,volume=0.8,apad=whole_dur={TOTAL}[sfx];'
fc += f"[{iO}:a]asetpts=PTS-STARTPTS,aresample=48000,adelay={int(OUTRO_T * 1000)}|{int(OUTRO_T * 1000)},apad=whole_dur={TOTAL}[sig];"
fc += ("[voice]asplit[vk][vo];[mus][sfx]amix=inputs=2:normalize=0[ms];[ms][vk]sidechaincompress=threshold=0.02:ratio=8:attack=15:release=300:makeup=1[duck];"
       "[vo]volume=1.35,highpass=f=70[vo2];"
       f"[vo2][duck][sig]amix=inputs=3:normalize=0,atrim=0:{TOTAL},loudnorm=I=-14:TP=-1.2:LRA=9[a]")
ff(ins + ['-i', vid, '-filter_complex', fc, '-map', f'{iO + 1 + len(booms)}:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', OUTF])
print('listo', OUTF)
