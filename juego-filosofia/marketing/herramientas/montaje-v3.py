"""Tráiler IV (mezcla) de Odisea de la Razón: «el primer juego educativo completo de filosofía,
ciencia e historia». 1080x1920, 30 fps. Gancho de Sócrates (escena del tráiler anterior),
juego real capturado con captura-v2.cjs, rótulos animados, música épica y la firma final.
Mezcla el tráiler cinematográfico (Sócrates, Hipatia, Sor Juana, sabidurías del mundo, «¿te atreves a pensar?»
y la firma con el logo) con el juego real: enfrentamientos con los avatares, el arco-portal, los 21 mundos,
diálogos y experimentos. Uso: python3 montaje-v3.py <carpeta de trabajo> <tráiler anterior.mp4> <salida.mp4>"""
import json, os, subprocess, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WK, OLD, OUTF = sys.argv[1], sys.argv[2], sys.argv[3]
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


# ---------------------------------------------------------------- guion de la parte de juego
def name_label(name, sub):
    img = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
    grad = Image.new('L', (1, 520)); grad.putdata([int(220 * (i / 519) ** 1.4) for i in range(520)])
    img.paste(Image.new('RGBA', (W, 520), (8, 6, 4, 255)), (0, H - 520), grad.resize((W, 520)))
    fn = ImageFont.truetype(F_SERIF_B, 74); fy = ImageFont.truetype(F_BOLD, 36)
    d.text(((W - d.textlength(name.upper(), font=fn)) / 2, H - 300), name.upper(), font=fn, fill=GOLD + (255,))
    d.text(((W - d.textlength(sub.upper(), font=fy)) / 2, H - 205), sub.upper(), font=fy, fill=CREAM + (255,))
    return img

SEG = []
def add(frames, head=None, sub=None, pos='top', label=None, size=92):
    SEG.append((frames, caption(head, sub, pos, size) if head else None, label))

add(frames_of('title') + [frames_of('title')[-1]] * 50, 'El primer juego educativo completo', 'de filosofía, ciencia e historia', 'bottom', size=80)
add(frames_of('chooser') + [frames_of('chooser')[-1]] * 20, 'Empieza en Sumer, hace 4.500 años', 'o viaja a la época que quieras', 'top', size=80)
VS = [('socrates', 'Sócrates', 'Atenas · siglo V a. C.', False), ('hipatia', 'Hipatia', 'Alejandría · siglo IV', False),
      ('laozi', 'Laozi', 'China · siglo VI a. C.', False), ('sorjuana', 'Sor Juana', 'Nueva España · siglo XVII', False),
      ('enheduanna', 'Enheduanna', 'Sumer · siglo XXIII a. C.', False), ('pachacutec', 'Pachacútec', 'Maestro de los Incas', True)]
VCAP = [('Enfréntate a ellos', 'cara a cara'), ('Enfréntate a ellos', 'cara a cara'), ('Gana el debate', 'con argumentos, no con fuerza'),
        ('Gana el debate', 'con argumentos, no con fuerza'), ('101 pensadoras y pensadores', 'te esperan'), ('Vence al maestro de la época', 'y se abre el portal')]
for k, (sid, nm, sub, boss) in enumerate(VS):
    A = 34 + (86 if boss else 0)
    fr = frames_of('vs_' + sid, take=30, start=4)                       # acercamiento al avatar
    if boss: fr += frames_of('vs_' + sid, take=40, start=36, step=2.0)  # presentación del maestro
    fr += frames_of('vs_' + sid, take=14, start=A + 16)                 # la respuesta correcta
    fr += frames_of('vs_' + sid, take=30, start=A + 44, step=1.5)                 # estallido de luz: vencido
    add(fr, VCAP[k][0], VCAP[k][1], 'top', label=name_label(nm, sub), size=86)
add(frames_of('portal', take=64) + frames_of('portal', take=56, start=64, step=1.6), 'Cruza el arco', 'y avanza a la siguiente época', 'top', size=88)
groups = [('22 épocas', 'una sola odisea por la historia'), ('De Bagdad a Tenochtitlan', 'de Kioto a los Andes'), ('Filosofía, ciencia e historia', 'en un solo viaje')]
for k, e in enumerate(ERAS):
    g = groups[min(2, k // 7)]
    add(frames_of('w%02d' % e['idx'], take=30, start=8), g[0], g[1], 'top', label=world_label(e), size=88)
add(frames_of('dialog', step=1.0), 'Aprende a argumentar', 'y a detectar falacias')
add(frames_of('cave1', take=50) + frames_of('cave2', take=80, step=1.15), 'Baja a la caverna de Platón', 'y descubre qué son las sombras')
add(frames_of('sisifo'), 'Empuja la roca de Sísifo', '¿puede ser feliz?')
add(frames_of('giges', take=72), '¿Serías justo si nadie te viera?', 'El anillo de Giges')
add(frames_of('desc', step=1.6), 'Duda de todo con Descartes', 'hasta llegar a «pienso, luego existo»')
add(frames_of('mariposa', take=78), '¿Quién sueña a quién?', 'Zhuangzi y la mariposa')
add(frames_of('book', take=95), 'Ciencia, historia y grandes libros', 'de Arquímedes a Einstein')
add(kenburns(os.path.join(WK, 'mapa.png'), 96), 'Descubre cómo piensas tú', 'tu mapa filosófico', 'bottom')
add(kenburns(os.path.join(WK, 'aula.png'), 96, bg=Image.open(os.path.join(WK, 'mapa.png'))), 'Para docentes', 'toda tu clase en un mapa, lista para debatir', 'top', size=86)
bgc = sorted(os.listdir(os.path.join(FR, 'w15')))[20]
add(card([('22 épocas', 'b'), ('101 pensadoras y pensadores', 'm'), ('25 diálogos socráticos', 'm'), ('11 experimentos mentales', 'm'), ('Gratis · en tu celular', 'b')], 120, os.path.join(FR, 'w15', bgc)))

# ---------------------------------------------------------------- render de la parte central
mid = os.path.join(TMP, 'mid3.mp4')
p = subprocess.Popen(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                      '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', mid], stdin=subprocess.PIPE)
total = 0
for si, (frames, cap, lab) in enumerate(SEG):
    n = len(frames)
    for i, fr in enumerate(frames):
        im = load(fr) if isinstance(fr, str) else fr
        if si > 0 and i < 3:  # destello blanco breve en cada corte
            im = Image.blend(im, Image.new('RGB', (W, H), (255, 245, 225)), 0.35 * (3 - i) / 3)
        im = im.convert('RGBA')
        if lab is not None: im = Image.alpha_composite(im, lab)
        if cap is not None:
            # el rótulo entra con un deslizamiento suave y sale al final (en los mundos se mantiene por grupo)
            a = min(1.0, (i + 1) / 7) if not lab or si == 0 else 1.0
            if lab is not None:
                k = [j for j, s in enumerate(SEG) if s[2] is not None].index(si) if False else None
            layer = cap if a >= 1 else Image.blend(Image.new('RGBA', (W, H), (0, 0, 0, 0)), cap, a)
            im = Image.alpha_composite(im, layer)
        p.stdin.write(im.convert('RGB').tobytes()); total += 1
    print('segmento', si, n, 'fotogramas', flush=True)
p.stdin.close(); p.wait()
DMID = total / FPS; print('parte central', round(DMID, 2), 's')
cta = os.path.join(TMP, 'cta3.mp4')
p = subprocess.Popen(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                      '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', cta], stdin=subprocess.PIPE)
CF = card([('Únete a la odisea', 'b'), ('Odisea de la Razón', 'm'), ('Gratis · link en la bio', 'm'), ('RETO: sal de la caverna de Platón y comenta tu mapa filosófico ↓', 'm')], 135, os.path.join(FR, 'cave2', sorted(os.listdir(os.path.join(FR, 'cave2')))[60]))
for im in CF: p.stdin.write(im.tobytes())
p.stdin.close(); p.wait(); DCTA = len(CF) / FPS

# ---------------------------------------------------------------- montaje final
# tramos del tráiler cinematográfico anterior (con su voz, subtítulos y música): (desde, hasta)
OLD_A = (0.0, 22.25)    # Sócrates, Hipatia y Sor Juana (Nietzsche queda fuera)
OLD_B = (27.35, 42.0)   # «Durante 26 siglos…» y «Hoy puedes hablar con ellos…»
OLD_C = (53.4, 54.9)  # Sócrates: «¿Te atreves a pensar?»
OLD_D = (62.6, None)   # firma: «Una más de… Filosofía para Seres Humanos», logo y web
def oseg(i, a, b, lab):
    t = f"trim={a}" + (f":{b}" if b else '')
    at = f"atrim={a}" + (f":{b}" if b else '')
    return (f"[{i}:v]{t},setpts=PTS-STARTPTS,fps={FPS},setsar=1[{lab}v];"
            f"[{i}:a]{at},asetpts=PTS-STARTPTS,aresample=48000,afade=t=in:d=0.04,afade=t=out:st={(b or 67.55) - a - 0.12}:d=0.12[{lab}a];")
fc = (oseg(0, *OLD_A, 'A') + oseg(0, *OLD_B, 'B') + oseg(0, *OLD_C, 'C') + oseg(0, *OLD_D, 'D') +
      f"[1:v]setpts=PTS-STARTPTS,fps={FPS},setsar=1[Mv];[2:v]setpts=PTS-STARTPTS,fps={FPS},setsar=1[Ev];"
      f"[3:a]atrim=0:{DMID},asetpts=PTS-STARTPTS,aresample=48000,afade=t=in:d=0.3,afade=t=out:st={DMID - 0.6}:d=0.6,volume=0.85[Ma];"
      f"[3:a]atrim={DMID + 4}:{DMID + 4 + DCTA},asetpts=PTS-STARTPTS,aresample=48000,afade=t=in:d=0.2,afade=t=out:st={DCTA - 0.5}:d=0.5,volume=0.8[Ea];"
      "[Av][Aa][Bv][Ba][Mv][Ma][Cv][Ca][Ev][Ea][Dv][Da]concat=n=6:v=1:a=1[v][a0];[a0]loudnorm=I=-14:TP=-1.5:LRA=11[a]")
ff(['-i', OLD, '-i', mid, '-i', cta, '-i', MUSIC, '-filter_complex', fc,
    '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', OUTF])
print('listo', OUTF)
