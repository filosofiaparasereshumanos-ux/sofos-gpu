"""Montaje del tráiler II de Odisea de la Razón (1080x1920, 30 fps).
1) Renderiza cada plano en 9:16.  2) Pega la voz de cada escena en su lugar.
3) Música con «ducking» bajo la voz + golpes graves.  4) Subtítulos palabra a palabra,
rótulos de nombre y cartón final, compuestos fotograma a fotograma."""
import json, os, subprocess, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

D = os.path.dirname(os.path.abspath(__file__))
TR = os.path.join(D, '..', 'trailer')
OUT = os.path.join(D, 'out'); os.makedirs(OUT, exist_ok=True)
W, H, FPS = 1080, 1920, 30
WORDS = json.load(open(os.path.join(D, 'words.json')))
F_CAP = '/usr/share/fonts/opentype/inter/Inter-Black.otf'
F_SERIF_B = '/usr/share/fonts/truetype/crosextra/Caladea-Bold.ttf'
F_SERIF = '/usr/share/fonts/truetype/crosextra/Caladea-Regular.ttf'
F_IT = '/usr/share/fonts/truetype/crosextra/Caladea-Italic.ttf'
F_CAPS = '/usr/share/fonts/truetype/freefont/FreeSerif.ttf'
GOLD = (255, 205, 105); CREAM = (250, 242, 225)


def ff(args):
    r = subprocess.run(['ffmpeg', '-loglevel', 'error', '-y'] + args)
    if r.returncode: sys.exit('ffmpeg falló')


# ---------------------------------------------------------------- escenas
# Cada escena: clip con voz, tramo de audio [0, dur] y lista de planos (desde, hasta, fuente).
GP = os.path.join(D, '..', 'gp', 'frames')
# (nombre, duración, planos, clip de audio, desde dónde se toma el audio, silencio previo)
SCENES = [
    ('socrates', 7.75, [(0, 7.75, 'vid:socrates')], 'socrates', 0, 0),
    ('hipatia', 7.15, [(0, 7.15, 'vid:hipatia')], 'hipatia', 0, 0),
    ('sorjuana', 7.55, [(0, 7.55, 'vid:sorjuana')], 'sorjuana', 0, 0),
    ('nietzsche', 4.95, [(0, 4.95, 'vid:nietzsche')], 'nietzsche', 0, 0),
    ('india', 7.45, [(0, 3.42, 'vid:india'), (3.42, 4.32, 'img:china'), (4.32, 5.3, 'img:inca'),
                     (5.3, 6.18, 'img:africa'), (6.18, 6.8, 'img:azteca'), (6.8, 7.45, 'img:mapuche')], 'india', 0, 0),
    ('phone', 7.4, [(0, 2.45, 'vid:phone'), (2.45, 3.2, 'ui:u-ask'), (3.2, 5.0, 'ui:u-answer'),
                    (5.0, 6.3, 'ui:u-duel'), (6.3, 7.4, 'ui:u-right')], 'phone', 0, 0),
    # portal de luz -> juego real: «Recorre quince mundos. Encuentra sus libros. Cumple sus misiones. Y gana cada debate.»
    ('montage', 7.6, [(0, 0.95, 'vidx:portal:2.0:1.75'), (0.95, 1.4, 'gp:g1_athens:6'), (1.4, 1.85, 'gp:g3_city:6'),
                      (1.85, 2.25, 'gp:g4_mex:8'), (2.25, 4.1, 'gp:b1_book:BOOK'), (4.1, 5.95, 'gp:c1_quest:QUEST'),
                      (5.95, 7.6, 'gp:d1_duel:DUEL')], 'portal', 0, 0),
    # ráfaga de mundos solo con música
    ('fly', 3.6, [(0, 0.6, 'gp:g2_alex:16'), (0.6, 1.2, 'gp:g7_cathedral:16'), (1.2, 1.8, 'gp:g5_china:16'),
                  (1.8, 2.4, 'gp:g6_india:16'), (2.4, 3.0, 'gp:g1_athens:26'), (3.0, 3.6, 'gp:g3_city:22')], None, 0, 0),
    ('final', 1.5, [(0, 1.5, 'vid:final')], 'final', 0, 0),
    ('endcard', 7.7, [(0, 7.7, 'end')], 'final2', 1.0, 0.95),
]
GP_START = json.load(open(os.path.join(D, 'gp_start.json'))) if os.path.exists(os.path.join(D, 'gp_start.json')) else {}
T0 = {}; t = 0.0
for sc in SCENES: T0[sc[0]] = t; t += sc[1]
TOTAL = t
UI_SPANS = [(T0['phone'] + 2.45, T0['phone'] + 7.4), (T0['montage'] + 0.95, T0['montage'] + 7.6)]
KINETIC = [(T0['fly'] + 0.0, T0['fly'] + 1.2, ['15', 'MUNDOS']), (T0['fly'] + 1.2, T0['fly'] + 2.4, ['68', 'PENSADORES']),
           (T0['fly'] + 2.4, T0['fly'] + 3.6, ['1', 'ODISEA'])]

# Rótulos: (escena, desde, hasta, lugar, nombre)
CARDS = [
    ('socrates', 6.0, 7.75, 'Atenas · 399 a. C.', 'SÓCRATES'),
    ('hipatia', 5.1, 7.15, 'Alejandría · siglo IV', 'HIPATIA'),
    ('sorjuana', 3.7, 7.55, 'Nueva España · siglo XVII', 'SOR JUANA INÉS DE LA CRUZ'),
    ('nietzsche', 0.0, 1.9, 'Alpes suizos · siglo XIX', 'NIETZSCHE'),
    ('india', 0.3, 3.42, 'India · siglo VIII a. C.', 'GARGI'),
    ('india', 3.42, 4.32, 'China', 'CONFUCIO'),
    ('india', 4.32, 5.3, 'Los Andes', 'PACHACÚTEC'),
    ('india', 5.3, 6.18, 'Antiguo Egipto', 'PTAHHOTEP'),
    ('india', 6.18, 6.8, 'Texcoco', 'NEZAHUALCÓYOTL'),
    ('india', 6.8, 7.45, 'Wallmapu', 'LA MACHI'),
    ('final', 0.0, 1.5, 'Atenas', 'SÓCRATES'),
]
BIG = {('nietzsche', 'Dios'), ('nietzsche', 'ha'), ('nietzsche', 'muerto'), ('final', '¿Te'), ('final', 'atreves'), ('final', 'a'), ('final', 'pensar?')}
FIX = {('socrates', 'Muert'): 'muerte', ('socrates', '.C.,'): 'a. C.', ('india', 'Los'): 'los',
       ('hipatia', 'defiende'): 'Defiende', ('sorjuana', 'nueva'): 'Nueva', ('hipatia', 'enseñar'): 'enseñar.',
       ('hipatia', 'Alejandría'): 'Alejandría.', ('hipatia', 'pensar'): 'pensar.'}


def caption_chunks():
    """Subtítulos a partir de los tiempos medidos por Whisper sobre la mezcla final."""
    raw = json.load(open(os.path.join(D, 'words_mix.json')))
    fix = {'Muert': 'muerte', 'sigles,': 'siglos,', 'Los': 'los', 'desafiarlo.': 'desafiarlos.', 'Te': '¿Te', 'Alejandría,': 'Alejandría.'}
    ws, k = [], 0
    while k < len(raw):
        w, a, b = raw[k]
        if w == 'a' and k + 1 < len(raw) and raw[k + 1][0].startswith('.C'):
            w, b = 'a. C.', raw[k + 1][2]; k += 1
        k += 1
        if a >= T0['endcard'] - 0.05 or T0['fly'] <= a < T0['final'] - 0.1: continue
        big = T0['nietzsche'] - 0.1 <= a <= T0['nietzsche'] + 1.25 or T0['final'] - 0.1 <= a <= T0['final'] + 1.4
        ws.append([fix.get(w, w), a, min(b, a + 1.0), big])
    for i, wd in enumerate(ws):  # palabra corta suelta antes de una pausa: se pega a la siguiente
        if len(wd[0]) <= 2 and i + 1 < len(ws) and ws[i + 1][1] - wd[2] > 0.5:
            wd[1] = ws[i + 1][1] - 0.22; wd[2] = ws[i + 1][1] - 0.02; wd[3] = ws[i + 1][3]
    for i, wd in enumerate(ws):  # Whisper a veces se come el «¿Te» inicial de Sócrates
        if wd[0] == 'atreves' and (i == 0 or 'Te' not in ws[i - 1][0]):
            ws.insert(i, ['¿Te', max(T0['final'] + 0.02, wd[1] - 0.25), wd[1], True]); break
    chunks, cur = [], []
    for k, wd in enumerate(ws):
        cur.append(wd)
        nxt = ws[k + 1] if k + 1 < len(ws) else None
        brk = (wd[0][-1] in '.,?!' or len(cur) >= (2 if wd[3] else 3) or nxt is None
               or nxt[1] - wd[2] > 0.5 or nxt[3] != wd[3])
        if brk: chunks.append(cur); cur = []
    for i, c in enumerate(chunks):
        end = c[-1][2] + 0.7
        if i + 1 < len(chunks): end = min(end, chunks[i + 1][0][1])
        if c[0][1] < T0['fly']: end = min(end, T0['fly'])
        c.append(end)
    for a, b, ws2 in KINETIC: chunks.append([[w, a, b, True] for w in ws2] + [b])
    chunks.sort(key=lambda c: c[0][1])
    return chunks


# ---------------------------------------------------------------- planos
def render_shot(i, src, dur):
    out = os.path.join(OUT, f'shot{i:02d}.mp4'); n = int(round(dur * FPS))
    kind, _, key = src.partition(':'); key = key.replace(':', '|')
    grade = 'eq=contrast=1.06:saturation=1.05,noise=alls=3:allf=t'
    if kind == 'vid':
        name, ss = key, SHOT_SS[i]
        ff(['-ss', f'{ss:.3f}', '-t', f'{dur:.3f}', '-i', f'{D}/vid/{name}.mp4', '-vf',
            f'fps={FPS},scale={W}:{H}:flags=lanczos,unsharp=5:5:0.6,{grade}', '-frames:v', str(n), '-an',
            '-c:v', 'libx264', '-crf', '14', '-preset', 'fast', '-pix_fmt', 'yuv420p', out])
    elif kind in ('img', 'ui'):
        p = f'{D}/img/{key}.png' if kind == 'img' else f'{TR}/{key}.png'
        z1 = 1.14 if kind == 'img' else 1.06
        g = grade if kind == 'img' else 'null'
        ff(['-framerate', str(FPS), '-loop', '1', '-t', f'{dur:.3f}', '-i', p, '-vf',
            f"scale={W * 2}:{H * 2}:force_original_aspect_ratio=increase,crop={W * 2}:{H * 2},"
            f"zoompan=z='1+({z1}-1)*on/{n}':x='(iw-iw/zoom)/2':y='(ih-ih/zoom)*0.42':d=1:s={W}x{H}:fps={FPS},{g}",
            '-frames:v', str(n), '-c:v', 'libx264', '-crf', '14', '-preset', 'fast', '-pix_fmt', 'yuv420p', out])
    elif kind == 'vidx':
        name, ss, sp = key.split('|')
        ff(['-ss', ss, '-i', f'{D}/vid/{name}.mp4', '-vf',
            f'setpts=PTS/{sp},fps={FPS},scale={W}:{H}:flags=lanczos,unsharp=5:5:0.6,{grade}', '-frames:v', str(n), '-an',
            '-c:v', 'libx264', '-crf', '14', '-preset', 'fast', '-pix_fmt', 'yuv420p', out])
    elif kind == 'gp':
        folder, st = key.split('|'); st = int(GP_START.get(st, st))
        ff(['-framerate', str(FPS), '-start_number', str(st), '-i', f'{GP}/{folder}/%04d.png', '-vf',
            f'scale={W}:{H}:flags=lanczos', '-frames:v', str(n), '-c:v', 'libx264', '-crf', '14', '-preset', 'fast', '-pix_fmt', 'yuv420p', out])
    elif kind == 'end':
        ff(['-ss', '2.2', '-i', f'{D}/vid/final.mp4', '-frames:v', '1', os.path.join(OUT, 'endsrc.png')])
        bg = Image.open(os.path.join(OUT, 'endsrc.png')).convert('RGB').resize((W, H), Image.LANCZOS).filter(ImageFilter.GaussianBlur(14))
        bg = Image.blend(bg, Image.new('RGB', (W, H), (8, 6, 3)), 0.62); bg.save(os.path.join(OUT, 'endbg.png'))
        ff(['-framerate', str(FPS), '-loop', '1', '-t', f'{dur:.3f}', '-i', os.path.join(OUT, 'endbg.png'), '-vf',
            f"scale={W * 2}:{H * 2},zoompan=z='1+0.05*on/{n}':x='(iw-iw/zoom)/2':y='(ih-ih/zoom)/2':d=1:s={W}x{H}:fps={FPS},noise=alls=4:allf=t",
            '-frames:v', str(n), '-c:v', 'libx264', '-crf', '14', '-preset', 'fast', '-pix_fmt', 'yuv420p', out])
    return out


SHOT_SS = {}


def build_video():
    shots, i = [], 0
    for name, dur, plan, *_ in SCENES:
        for a, b, src in plan:
            SHOT_SS[i] = a
            shots.append(render_shot(i, src, b - a)); i += 1
    lst = os.path.join(OUT, 'list.txt')
    open(lst, 'w').write(''.join(f"file '{s}'\n" for s in shots))
    base = os.path.join(OUT, 'base.mp4')
    ff(['-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', base])
    return base


# ---------------------------------------------------------------- audio
def build_audio():
    voice_in, parts, k = [], [], 0
    for name, dur, _, asrc, ass, pre in SCENES:
        if not asrc: continue
        voice_in += ['-i', f'{D}/vid/{asrc}.mp4']
        ms = int((T0[name] + pre) * 1000); dd = dur - pre
        parts.append(f"[{k}:a]atrim={ass}:{ass + dd},asetpts=PTS-STARTPTS,aresample=48000,afade=in:d=0.03,afade=out:st={dd - 0.05}:d=0.05,adelay={ms}|{ms}[v{k}]")
        k += 1
    nv = k
    voice = ';'.join(parts) + ';' + ''.join(f'[v{k}]' for k in range(nv)) + f'amix=inputs={nv}:normalize=0,apad=whole_dur={TOTAL}[voice]'
    m = f'{D}/m1.mp3'
    tN = T0['nietzsche']; hit2 = tN + 2.05; tF = T0['final']; hit3 = T0['endcard']; hitF = T0['fly']
    sec1_end = tN + 0.05
    music = (
        f"[{nv}:a]atrim=1.8:{1.8 + sec1_end},asetpts=PTS-STARTPTS,aresample=48000,afade=out:st={sec1_end - 0.5}:d=0.5[m1];"
        f"[{nv + 1}:a]atrim=84.2:{84.2 + (tF - hit2)},asetpts=PTS-STARTPTS,aresample=48000,afade=in:d=0.02,afade=out:st={tF - hit2 - 0.45}:d=0.45,adelay={int(hit2 * 1000)}|{int(hit2 * 1000)}[m2];"
        f"[{nv + 2}:a]atrim=1.8:{1.8 + (TOTAL - hit3)},asetpts=PTS-STARTPTS,aresample=48000,volume=eval=frame:volume='if(lt(t,0.3),1,0.35)',afade=out:st={TOTAL - hit3 - 1.6}:d=1.6,adelay={int(hit3 * 1000)}|{int(hit3 * 1000)}[m3];"
        f"[m1][m2][m3]amix=inputs=3:normalize=0,volume=0.8,apad=whole_dur={TOTAL}[mus]"
    )
    # golpes graves sintetizados (sub + ruido filtrado) en los tres momentos clave
    booms = []
    for j, tt in enumerate([0.0, hit2, hitF, hit3]):
        ms = int(tt * 1000)
        booms.append(f"[{nv + 3 + j}:a]aresample=48000,adelay={ms}|{ms}[b{j}]")
    sfx = ';'.join(booms) + ';[b0][b1][b2][b3]amix=inputs=4:normalize=0,volume=0.9,apad=whole_dur=' + f'{TOTAL}[sfx]'
    boom_src = ("aevalsrc='0.9*sin(2*PI*(38+70*exp(-6*t))*t)*exp(-2.2*t)+0.25*(random(0)-0.5)*exp(-14*t)':s=48000:d=2.5,"
                "lowpass=f=900,pan=stereo|c0=c0|c1=c0")
    args = voice_in + ['-i', m, '-i', m, '-i', m]
    for _ in range(4): args += ['-f', 'lavfi', '-i', boom_src]
    fc = (voice + ';' + music + ';' + sfx + ';'
          "[voice]asplit[vk][vo];[mus][sfx]amix=inputs=2:normalize=0[ms];[ms][vk]sidechaincompress=threshold=0.02:ratio=8:attack=15:release=350:makeup=1[duck];"
          "[vo]volume=1.35,highpass=f=70[vo2];"
          f"[vo2][duck]amix=inputs=2:normalize=0,atrim=0:{TOTAL},loudnorm=I=-14:TP=-1.2:LRA=9[aout]")
    out = os.path.join(OUT, 'mix.wav')
    ff(args + ['-filter_complex', fc, '-map', '[aout]', '-ar', '48000', out])
    return out


# ---------------------------------------------------------------- grafismos
def font(p, s): return ImageFont.truetype(p, s)


def stroke_text(d, xy, text, f, fill, sw, anchor='mm'):
    d.text(xy, text, font=f, fill=fill, anchor=anchor, stroke_width=sw, stroke_fill=(0, 0, 0, 255))


CAP_CACHE = {}


def caption_img(chunk_idx, chunk, active):
    key = (chunk_idx, active)
    if key in CAP_CACHE: return CAP_CACHE[key]
    big = any(w[3] for w in chunk[:-1])
    size = 112 if big else 78
    f = font(F_CAP, size)
    words = [w[0] for w in chunk[:-1]]
    im = Image.new('RGBA', (W, 420), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    sp = d.textlength(' ', font=f)
    # reparto en líneas de 900 px como máximo
    lines, cur, cw = [], [], 0
    for k, w in enumerate(words):
        ww = d.textlength(w, font=f)
        if cur and cw + sp + ww > 900: lines.append(cur); cur, cw = [], 0
        cur.append((k, w, ww)); cw += (sp if len(cur) > 1 else 0) + ww
    lines.append(cur)
    lh = size * 1.12; y0 = 210 - (len(lines) - 1) * lh / 2
    sh = Image.new('RGBA', im.size, (0, 0, 0, 0)); sd = ImageDraw.Draw(sh)
    for li, ln in enumerate(lines):
        tw = sum(x[2] for x in ln) + sp * (len(ln) - 1); x = (W - tw) / 2; y = y0 + li * lh
        for k, w, ww in ln:
            col = GOLD if k == active else (255, 255, 255)
            sd.text((x + 4, y + 6), w, font=f, fill=(0, 0, 0, 170), anchor='lm')
            stroke_text(d, (x, y), w, f, col + (255,), 7 if big else 6, anchor='lm'); x += ww + sp
    sh = sh.filter(ImageFilter.GaussianBlur(6)); out = Image.alpha_composite(sh, im)
    CAP_CACHE[key] = out
    return out


def spaced(d, xy, text, f, fill, track):
    widths = [d.textlength(c, font=f) for c in text]; total = sum(widths) + track * (len(text) - 1)
    x = xy[0] - total / 2
    for c, w in zip(text, widths): d.text((x, xy[1]), c, font=f, fill=fill, anchor='lm'); x += w + track


CARD_CACHE = {}


def card_img(place, name):
    if (place, name) in CARD_CACHE: return CARD_CACHE[(place, name)]
    im = Image.new('RGBA', (W, 300), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    fs = 74 if len(name) < 14 else 52
    spaced(d, (W / 2, 110), name, font(F_SERIF_B, fs), CREAM + (255,), fs * 0.12)
    d.line([(W / 2 - 120, 165), (W / 2 + 120, 165)], fill=GOLD + (220,), width=2)
    spaced(d, (W / 2, 210), place.upper(), font(F_SERIF_B, 36), GOLD + (255,), 6)
    sh = Image.new('RGBA', im.size, (0, 0, 0, 0)); sh.putalpha(im.getchannel('A').filter(ImageFilter.GaussianBlur(9)))
    sh = Image.merge('RGBA', (*Image.new('RGB', im.size, (0, 0, 0)).split(), sh.getchannel('A')))
    out = Image.alpha_composite(Image.alpha_composite(sh, sh), im); CARD_CACHE[(place, name)] = out
    return out


def end_layers():
    L = {}
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    spaced(d, (W / 2, 470), 'UN VIAJE DE VEINTISÉIS SIGLOS', font(F_CAPS, 34), GOLD + (255,), 10)
    d.text((W / 2, 620), 'ODISEA', font=font(F_SERIF_B, 190), fill=GOLD + (255,), anchor='mm')
    d.text((W / 2, 770), 'de la Razón', font=font(F_SERIF, 104), fill=CREAM + (255,), anchor='mm')
    d.line([(W / 2 - 170, 870), (W / 2 + 170, 870)], fill=GOLD + (200,), width=2)
    d.polygon([(W / 2, 861), (W / 2 + 9, 870), (W / 2, 879), (W / 2 - 9, 870)], fill=GOLD + (255,))
    d.text((W / 2, 940), 'Conversa · Debate · Viaja en el tiempo', font=font(F_IT, 50), fill=CREAM + (235,), anchor='mm')
    L['title'] = im
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    stroke_text(d, (W / 2, 1040), 'GRATIS · EN TU CELULAR · SIN DESCARGAR', font(F_CAP, 40), (255, 255, 255, 255), 4)
    L['free'] = im
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((W / 2 - 380, 1110, W / 2 + 380, 1250), 70, fill=GOLD + (255,))
    d.text((W / 2, 1180), 'ÚNETE A LA ODISEA', font=font(F_CAP, 66), fill=(30, 20, 8, 255), anchor='mm')
    d.text((W / 2, 1310), 'link en la bio', font=font(F_IT, 48), fill=CREAM + (255,), anchor='mm')
    L['cta'] = im
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((W / 2 - 440, 1385, W / 2 + 440, 1525), 28, fill=(0, 0, 0, 150), outline=GOLD + (230,), width=3)
    stroke_text(d, (W / 2, 1425), 'RETO: vence a Sócrates en un debate', font(F_CAP, 42), (255, 255, 255, 255), 3)
    stroke_text(d, (W / 2, 1485), 'y comenta tu puntaje ↓', font(F_CAP, 42), GOLD + (255,), 3)
    L['reto'] = im
    for k in L:
        sh = L[k].getchannel('A').filter(ImageFilter.GaussianBlur(12))
        shim = Image.merge('RGBA', (*Image.new('RGB', (W, H), (0, 0, 0)).split(), sh))
        L[k] = Image.alpha_composite(shim, L[k])
    return L


def fade(t, a, b, fi=0.18, fo=0.18):
    if t < a or t > b: return 0.0
    return max(0.0, min(1.0, (t - a) / fi if fi else 1, (b - t) / fo if fo else 1))


def paste(frame, layer, y, alpha, scale=1.0):
    if alpha <= 0: return
    lw, lh = layer.size
    if scale != 1.0: layer = layer.resize((int(lw * scale), int(lh * scale)), Image.BILINEAR)
    if alpha < 1:
        layer = layer.copy(); layer.putalpha(layer.getchannel('A').point(lambda v: int(v * alpha)))
    nw, nh = layer.size
    frame.alpha_composite(layer, ((W - nw) // 2, int(y + (lh - nh) / 2)))


def graphics_pass(base, audio):
    chunks = caption_chunks()
    cards = [(T0[s] + a, T0[s] + b, p, n) for s, a, b, p, n in CARDS]
    E = end_layers(); tEnd = T0['endcard']; tTitle = tEnd + 0.95; tFree = tEnd + 0.95 + 2.4; tCta = tEnd + 0.95 + 4.5; tReto = tCta + 0.9
    flashes = [T0['nietzsche'] + 2.05, T0['montage'] + 0.95, T0['fly'], tEnd]
    dec = subprocess.Popen(['ffmpeg', '-loglevel', 'error', '-i', base, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
    out = os.path.join(D, 'odisea-trailer-iii.mp4')
    enc = subprocess.Popen(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                            '-i', audio, '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-preset', 'slow', '-crf', '21', '-maxrate', '14M', '-bufsize', '28M', '-pix_fmt', 'yuv420p',
                            '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', '-shortest', out], stdin=subprocess.PIPE)
    fsz = W * H * 3; n = 0
    while True:
        buf = dec.stdout.read(fsz)
        if len(buf) < fsz: break
        t = n / FPS; n += 1
        fr = Image.frombuffer('RGB', (W, H), buf).convert('RGBA')
        # viñeta inferior suave para leer los subtítulos
        for a, b, p, nm in cards:
            al = fade(t, a, b, 0.2, 0.2)
            if al: paste(fr, card_img(p, nm), 250, al)
        if t < tEnd:
            for ci, c in enumerate(chunks):
                if c[0][1] - 0.05 <= t < c[-1]:
                    act = max([k for k, w in enumerate(c[:-1]) if w[1] - 0.03 <= t] or [0])
                    pop = 1.0 + 0.08 * max(0, 1 - (t - c[0][1]) / 0.12)
                    ui = any(a <= t < b for a, b in UI_SPANS); fly = T0['fly'] <= t < T0['final']
                    paste(fr, caption_img(ci, c, act), 30 if ui else (640 if fly else 1150), 1.0, pop)
                    break
        else:
            al = fade(t, tTitle, 99, 0.35, 1); sc = 1.0 + 0.06 * (1 - min(1, (t - tTitle) / 0.6)) if t >= tTitle else 1
            if al: paste(fr, E['title'], 0, al, sc)
            for key, tt in (('free', tFree), ('cta', tCta), ('reto', tReto)):
                al = fade(t, tt, 99, 0.25, 1)
                if al: paste(fr, E[key], 0, al, 1.0 + 0.08 * max(0, 1 - (t - tt) / 0.15))
        for ft in flashes:
            if ft <= t < ft + 0.2:
                k = 1 - (t - ft) / 0.2
                fr = Image.blend(fr, Image.new('RGBA', (W, H), (255, 250, 235, 255)), 0.75 * k)
        # fundido a negro de los últimos 0,4 s
        if t > TOTAL - 0.4: fr = Image.blend(fr, Image.new('RGBA', (W, H), (0, 0, 0, 255)), min(1, (t - (TOTAL - 0.4)) / 0.4))
        enc.stdin.write(fr.convert('RGB').tobytes())
    enc.stdin.close(); enc.wait(); dec.wait()
    print('listo', out, round(TOTAL, 2), 's', n, 'fotogramas')


if __name__ == '__main__':
    for c in caption_chunks(): print(round(c[0][1], 2), round(c[-1], 2), ' '.join(w[0] for w in c[:-1]))
    if '--dry' in sys.argv: sys.exit()
    if '--graphics' in sys.argv: base, audio = os.path.join(OUT, 'base.mp4'), os.path.join(OUT, 'mix.wav')
    else: base = build_video(); audio = build_audio()
    spans = json.dumps([[T0[sc[0]], T0[sc[0]] + sc[1]] for sc in SCENES if sc[3] and sc[0] != 'endcard'])
    subprocess.run([os.path.join(D, '..', 'fw', 'bin', 'python'), os.path.join(D, '..', 'trseg.py'), audio, os.path.join(D, 'words_mix.json'), spans],
                   env={**os.environ, 'HF_HUB_DISABLE_XET': '1'}, stderr=subprocess.DEVNULL)
    for c in caption_chunks(): print(round(c[0][1], 2), round(c[-1], 2), ' '.join(w[0] for w in c[:-1]))
    graphics_pass(base, audio)
