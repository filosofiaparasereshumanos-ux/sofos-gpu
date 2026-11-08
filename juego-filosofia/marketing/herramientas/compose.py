"""Compone el tráiler vertical (1080x1920, 30 fps) de Odisea de la Razón."""
import os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

T = os.path.dirname(os.path.abspath(__file__))
VID = os.path.join(T, '..', 'kie', 'vid')
GAME = '/home/user/sofos-gpu/juego-filosofia'
OUT = os.path.join(T, 'seg'); os.makedirs(OUT, exist_ok=True)
W, H, FPS = 1080, 1920, 30
F_TITLE = '/usr/share/fonts/truetype/crosextra/Caladea-Regular.ttf'
F_BOLD = '/usr/share/fonts/truetype/crosextra/Caladea-Bold.ttf'
F_IT = '/usr/share/fonts/truetype/crosextra/Caladea-Italic.ttf'
F_CAPS = '/usr/share/fonts/truetype/freefont/FreeSerif.ttf'
GOLD = (236, 200, 120); CREAM = (246, 236, 214)
XF = 0.35  # duración de cada fundido


def font(p, s): return ImageFont.truetype(p, s)


def spaced(d, xy, text, f, fill, track, anchor='mm'):
    """Texto con espaciado entre letras (versalitas de inscripción)."""
    widths = [d.textlength(c, font=f) for c in text]
    total = sum(widths) + track * (len(text) - 1)
    x = xy[0] - total / 2
    for c, w in zip(text, widths):
        d.text((x, xy[1]), c, font=f, fill=fill, anchor='lm'); x += w + track


def wrap(d, text, f, maxw):
    lines, cur = [], ''
    for w in text.split():
        t = (cur + ' ' + w).strip()
        if d.textlength(t, font=f) > maxw and cur: lines.append(cur); cur = w
        else: cur = t
    return lines + [cur]


def overlay(name, items, bands=()):
    """items: (kind, text, y, size). bands: (y0, y1, alpha) degradados oscuros."""
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    g = ImageDraw.Draw(im)
    for y0, y1, a, up in bands:
        for y in range(y0, y1):
            k = (y - y0) / max(1, y1 - y0); k = 1 - k if up else k
            g.line([(0, y), (W, y)], fill=(8, 6, 4, int(a * k)))
    txt = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(txt)
    for kind, text, y, size in items:
        if kind == 'caps':
            spaced(d, (W / 2, y), text.upper(), font(F_CAPS, size), GOLD + (255,), size * 0.32)
        elif kind == 'rule':
            d.line([(W / 2 - size, y), (W / 2 + size, y)], fill=GOLD + (200,), width=2)
            d.polygon([(W / 2, y - 7), (W / 2 + 7, y), (W / 2, y + 7), (W / 2 - 7, y)], fill=GOLD + (255,))
        else:
            f = font({'title': F_TITLE, 'bold': F_BOLD, 'it': F_IT}[kind], size)
            col = CREAM if kind != 'bold' else GOLD
            for i, ln in enumerate(wrap(d, text, f, W - 140)):
                d.text((W / 2, y + i * size * 1.12), ln, font=f, fill=col + (255,), anchor='mm')
    sh = Image.new('RGBA', (W, H), (0, 0, 0, 0)); sh.putalpha(txt.getchannel('A').filter(ImageFilter.GaussianBlur(10)).point(lambda v: int(v * 0.9)))
    im = Image.alpha_composite(im, sh); im = Image.alpha_composite(im, sh); im = Image.alpha_composite(im, txt)
    p = os.path.join(OUT, name + '-ov.png'); im.save(p); return p


def run(args):
    r = subprocess.run(['ffmpeg', '-loglevel', 'error', '-y'] + args)
    if r.returncode: sys.exit('ffmpeg falló: ' + ' '.join(args[-1:]))


ENC = ['-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', str(FPS), '-an']
OVF = "[1:v]format=rgba,fade=in:st={st}:d=0.5:alpha=1[o];[v][o]overlay=0:0,format=yuv420p"


def seg_clip(name, src, dur, ov, ss=0.15, st=0.3):
    out = os.path.join(OUT, name + '.mp4')
    fc = ("[0:v]fps=30,setpts=PTS-STARTPTS,split[a][b];"
          "[a]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,gblur=sigma=40,eq=brightness=-0.22:saturation=0.75[bg];"
          "[b]scale=1080:1080:flags=lanczos[fg];[bg][fg]overlay=0:420[v];" + OVF.format(st=st))
    run(['-ss', str(ss), '-t', str(dur), '-i', src, '-loop', '1', '-t', str(dur), '-i', ov, '-filter_complex', fc, '-t', str(dur)] + ENC + [out])
    return out


def kb(dur, z0=1.0, z1=1.07, w=W, h=H, px=0.5, py=0.5):
    n = int(round(dur * FPS))
    return (f"scale={w * 2}:{h * 2}:force_original_aspect_ratio=increase,crop={w * 2}:{h * 2},"
            f"zoompan=z='{z0}+({z1}-{z0})*on/{n}':x='(iw-iw/zoom)*{px}':y='(ih-ih/zoom)*{py}':d=1:s={w}x{h}:fps={FPS}")


def seg_shot(name, img, dur, ov, st=0.25):
    out = os.path.join(OUT, name + '.mp4')
    fc = f"[0:v]{kb(dur, 1.0, 1.06, py=0.35)}[v];" + OVF.format(st=st)
    run(['-framerate', str(FPS), '-loop', '1', '-t', str(dur), '-i', img, '-loop', '1', '-t', str(dur), '-i', ov, '-filter_complex', fc, '-t', str(dur)] + ENC + [out])
    return out


def panel_chain(i, dur, y, ph):
    return (f"[{i}:v]split[a{i}][b{i}];[a{i}]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,gblur=sigma=45,eq=brightness=-0.25:saturation=0.8[bg{i}];"
            f"[b{i}]{kb(dur, 1.0, 1.10, w=W, h=ph)}[fg{i}];[bg{i}]fps={FPS}[bgf{i}];[bgf{i}][fg{i}]overlay=0:{y}:shortest=1[p{i}]")


def seg_panels(name, imgs, each, ov, y=640, ph=617, st=0.3):
    out = os.path.join(OUT, name + '.mp4'); dur = each * len(imgs)
    args = []
    for im in imgs: args += ['-framerate', str(FPS), '-loop', '1', '-t', str(each), '-i', im]
    args += ['-loop', '1', '-t', str(dur), '-i', ov]
    fc = ';'.join(panel_chain(i, each, y, ph) for i in range(len(imgs)))
    fc += ';' + ''.join(f'[p{i}]' for i in range(len(imgs))) + f'concat=n={len(imgs)}:v=1:a=0[v];'
    fc += OVF.format(st=st).replace('[1:v]', f'[{len(imgs)}:v]')
    run(args + ['-filter_complex', fc, '-t', str(dur)] + ENC + [out])
    return out


def endcard(name, dur):
    """Fondo: ilustración de los presocráticos; fila de retratos; título y enlace."""
    bg = Image.open(f'{GAME}/img/e-0.jpg').convert('RGB')
    s = H / bg.height; bg = bg.resize((int(bg.width * s), H), Image.LANCZOS)
    x0 = (bg.width - W) // 2; bg = bg.crop((x0, 0, x0 + W, H)).filter(ImageFilter.GaussianBlur(6))
    bg = Image.blend(bg, Image.new('RGB', (W, H), (10, 7, 4)), 0.55)
    p = os.path.join(OUT, 'end-bg.png'); bg.save(p)
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ids = ['socrates', 'hipatia', 'sorjuana', 'confucio', 'beauvoir', 'buda', 'nietzsche']
    r = 120; gap = 14; total = len(ids) * r + (len(ids) - 1) * gap
    mask = Image.new('L', (r * 4, r * 4), 0); ImageDraw.Draw(mask).ellipse((0, 0, r * 4 - 1, r * 4 - 1), fill=255)
    mask = mask.resize((r, r), Image.LANCZOS)
    for i, pid in enumerate(ids):
        pim = Image.open(f'{GAME}/img/p-{pid}.jpg').convert('RGB').resize((r, r), Image.LANCZOS)
        x = (W - total) // 2 + i * (r + gap); y = 560 + (18 if i % 2 else 0)
        ring = Image.new('RGBA', (r + 8, r + 8), (0, 0, 0, 0)); ImageDraw.Draw(ring).ellipse((0, 0, r + 7, r + 7), fill=GOLD + (255,))
        im.alpha_composite(ring, (x - 4, y - 4)); im.paste(pim, (x, y), mask)
    pp = os.path.join(OUT, 'end-faces.png'); im.save(pp)
    ov = overlay('end', [
        ('caps', 'Un viaje de veintiséis siglos', 820, 34),
        ('bold', 'ODISEA', 930, 150),
        ('title', 'de la Razón', 1060, 84),
        ('rule', '', 1160, 150),
        ('it', '68 pensadores · 15 épocas y culturas', 1240, 46),
        ('title', 'Juega gratis en tu navegador', 1430, 58),
        ('caps', 'Link en la bio', 1530, 32),
    ])
    out = os.path.join(OUT, name + '.mp4')
    fc = (f"[0:v]{kb(dur, 1.0, 1.05)}[v0];[1:v]format=rgba,fade=in:st=0.1:d=0.6:alpha=1[f];[v0][f]overlay=0:0[v];"
          + OVF.format(st=0.5).replace('[1:v]', '[2:v]'))
    run(['-framerate', str(FPS), '-loop', '1', '-t', str(dur), '-i', p, '-loop', '1', '-t', str(dur), '-i', pp,
         '-loop', '1', '-t', str(dur), '-i', ov, '-filter_complex', fc, '-t', str(dur)] + ENC + [out])
    return out


def clip_ov(name, label, title, sub, hook=None):
    items = []
    if hook: items += [('bold', hook, 200, 74)]
    elif label: items += [('caps', label, 330, 30)]
    items += [('bold', title, 1600, 72), ('it', sub, 1700, 44)] if title else []
    return overlay(name, items, bands=[(0, 460, 200, True), (1440, H, 230, False)])


def shot_ov(name, title, sub, y=210):
    return overlay(name, [('bold', title, y, 76), ('it', sub, y + 95, 44)], bands=[(0, y + 260, 235, True)])


def build():
    segs = []
    segs.append((seg_clip('01-socrates', f'{VID}/socrates.mp4', 4.2,
                          clip_ov('01', None, 'Sócrates', 'Atenas, siglo V a. C.', hook='¿Y si pudieras conversar con Sócrates?'), st=0.15), 4.2))
    ov = overlay('02', [('bold', 'Camina por la Atenas clásica', 380, 70), ('it', 'el ágora, la Academia, sus jardines', 480, 44),
                        ('caps', 'Mundos en 3D', 1400, 30)], bands=[(0, 640, 190, True), (1257, H, 190, False)])
    segs.append((seg_panels('02-atenas', [f'{T}/l-athens.png', f'{T}/l-athens2.png'], 1.6, ov, y=640, ph=617), 3.2))
    segs.append((seg_shot('03-talk', f'{T}/g-talk.png', 3.0, shot_ov('03', 'Pregúntales lo que quieras', 'y te responden con su propia voz')), 3.0))
    segs.append((seg_clip('04-hipatia', f'{VID}/hipatia.mp4', 3.0, clip_ov('04', 'Alejandría · siglo IV', 'Hipatia', 'matemática y filósofa')), 3.0))
    segs.append((seg_shot('05-duel', f'{T}/g-duel.png', 3.0, shot_ov('05', 'Desafíalos a un debate', 'y gana su sabiduría', y=170)), 3.0))
    segs.append((seg_clip('06-nietzsche', f'{VID}/nietzsche.mp4', 3.0, clip_ov('06', 'Basilea · siglo XIX', 'Nietzsche', '«Llega a ser el que eres»')), 3.0))
    ov = overlay('07', [('bold', 'De Tales a nuestros días', 380, 70), ('it', 'nueve épocas de la filosofía', 480, 44)],
                 bands=[(0, 640, 200, True)])
    segs.append((seg_panels('07-eras', [f'{GAME}/img/e-{i}.jpg' for i in (3, 4, 6, 7)], 1.0, ov), 4.0))
    segs.append((seg_clip('08-sorjuana', f'{VID}/sorjuana.mp4', 3.0, clip_ov('08', 'Nueva España · siglo XVII', 'Sor Juana Inés de la Cruz', 'la Décima Musa')), 3.0))
    segs.append((seg_clip('09-buda', f'{VID}/buda.mp4', 3.2, clip_ov('09', 'India · siglo V a. C.', 'Y las sabidurías del mundo', 'Mexicas · Incas · Mapuche · China · India · África')), 3.2))
    segs.append((endcard('10-end', 5.6), 5.6))
    return segs


def assemble(segs, music):
    args, fc, prev, off = [], [], '0:v', 0.0
    for p, _ in segs: args += ['-i', p]
    for i in range(1, len(segs)):
        off += segs[i - 1][1] - XF
        tr = 'fadeblack' if i == len(segs) - 1 else 'fade'
        fc.append(f"[{prev}][{i}:v]xfade=transition={tr}:duration={XF}:offset={off:.3f}[x{i}]"); prev = f'x{i}'
    total = sum(d for _, d in segs) - XF * (len(segs) - 1)
    fc.append(f"[{prev}]fade=out:st={total - 0.6:.3f}:d=0.6[vout]")
    n = len(segs)
    fc.append(f"[{n}:a]atrim=0:{total:.3f},asetpts=PTS-STARTPTS,afade=in:d=0.3,afade=out:st={total - 1.2:.3f}:d=1.2,loudnorm=I=-14:TP=-1.5:LRA=11[aout]")
    out = os.path.join(T, 'odisea-trailer.mp4')
    run(args + ['-i', music, '-filter_complex', ';'.join(fc), '-map', '[vout]', '-map', '[aout]',
                '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', str(FPS), '-movflags', '+faststart',
                '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-t', f'{total:.3f}', out])
    print('total', round(total, 2), out)


if __name__ == '__main__':
    assemble(build(), os.path.join(T, 'tb.mp3'))
