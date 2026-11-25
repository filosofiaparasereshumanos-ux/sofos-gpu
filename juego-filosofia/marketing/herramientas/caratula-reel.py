import sys, math
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
G = '/home/user/sofos-gpu/juego-filosofia/'
OUT = sys.argv[1]; BG = sys.argv[2] if len(sys.argv) > 2 else 'e-0'
W, H = 1080, 1920
GOLD = (246, 200, 100); CREAM = (250, 238, 214)
F = lambda p, s: ImageFont.truetype(p, s)
SERIF_B = '/usr/share/fonts/truetype/crosextra/Caladea-Bold.ttf'; SERIF_I = '/usr/share/fonts/truetype/crosextra/Caladea-Italic.ttf'
INTER_K = '/usr/share/fonts/opentype/inter/Inter-Black.otf'; INTER_B = '/usr/share/fonts/opentype/inter/Inter-Bold.otf'
# fondo: escena del juego, recortada en vertical, oscurecida y con viñeta cálida
bg = Image.open(G + 'img/' + BG + '.jpg').convert('RGB'); s = H / bg.height; bg = bg.resize((int(bg.width * s), H), Image.LANCZOS)
x0 = (bg.width - W) // 2; bg = bg.crop((x0, 0, x0 + W, H)).filter(ImageFilter.GaussianBlur(3)); bg = ImageEnhance.Brightness(bg).enhance(0.55)
im = bg.convert('RGBA')
ov = Image.new('RGBA', (W, H)); d = ImageDraw.Draw(ov)
for y in range(H):
    t = abs(y - H * 0.47) / (H * 0.53); a = int(40 + 190 * t ** 1.6); d.line([(0, y), (W, y)], fill=(14, 9, 4, min(235, a)))
im = Image.alpha_composite(im, ov)
# halo dorado detrás del retrato central
glow = Image.new('RGBA', (W, H)); gd = ImageDraw.Draw(glow); cx, cy = W // 2, 945
for r in range(420, 0, -6): gd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 196, 90, int(3 + 70 * (1 - r / 420) ** 2)))
im = Image.alpha_composite(im, glow.filter(ImageFilter.GaussianBlur(30)))
def medal(pid, size, ring=6):
    p = Image.open(G + 'img/p-' + pid + '.jpg').convert('RGB').resize((size, size), Image.LANCZOS)
    m = Image.new('L', (size, size)); ImageDraw.Draw(m).ellipse([0, 0, size - 1, size - 1], fill=255)
    out = Image.new('RGBA', (size + ring * 2, size + ring * 2)); od = ImageDraw.Draw(out)
    od.ellipse([0, 0, size + ring * 2 - 1, size + ring * 2 - 1], fill=GOLD + (255,))
    out.paste(p, (ring, ring), m); return out
def shadow(img, r=18):
    sh = Image.new('RGBA', (img.width + 80, img.height + 80)); a = img.split()[3]
    sh.paste((0, 0, 0, 200), (40, 52), a); return sh.filter(ImageFilter.GaussianBlur(r))
def put(img, x, y):
    global im
    sh = shadow(img); im.alpha_composite(sh, (int(x - sh.width / 2), int(y - sh.height / 2 + 6))); im.alpha_composite(img, (int(x - img.width / 2), int(y - img.height / 2)))
# corona de pensadores alrededor de Sócrates
ring = ['hipatia', 'confucio', 'sorjuana', 'kant', 'beauvoir', 'laozi', 'nietzsche', 'hawking', 'buda', 'arendt']
R = 305
for i, pid in enumerate(ring):
    a = math.pi * (-0.5 + (i + 0.5) / len(ring) * 2)
    put(medal(pid, 158, 5), cx + math.cos(a) * R, cy + math.sin(a) * R * 1.0)
put(medal('socrates', 380, 9), cx, cy)
d = ImageDraw.Draw(im)
def text(t, y, font, fill, stroke=0, sfill=(0, 0, 0), spacing=0):
    w = d.textlength(t, font=font) + spacing * (len(t) - 1)
    if spacing:
        x = (W - w) / 2
        for ch in t: d.text((x, y), ch, font=font, fill=fill, stroke_width=stroke, stroke_fill=sfill); x += d.textlength(ch, font=font) + spacing
    else: d.text(((W - w) / 2, y), t, font=font, fill=fill, stroke_width=stroke, stroke_fill=sfill)
# gancho arriba
text('¿TE ATREVES', 262, F(INTER_K, 92), (255, 255, 255), 4, (20, 10, 0))
text('A PENSAR?', 362, F(INTER_K, 92), GOLD, 4, (20, 10, 0))
# título debajo de la corona
text('ODISEA', 1352, F(SERIF_B, 150), GOLD, 3, (30, 16, 4))
text('de la Razón', 1505, F(SERIF_I, 70), CREAM, 2, (30, 16, 4))
d.line([(W / 2 - 170, 1606), (W / 2 + 170, 1606)], fill=GOLD, width=3); d.polygon([(W / 2, 1596), (W / 2 + 10, 1606), (W / 2, 1616), (W / 2 - 10, 1606)], fill=GOLD)
text('Debate con 231 pensadores · 37 épocas', 1630, F(INTER_B, 44), (255, 255, 255), 2, (10, 5, 0))
# botón
bw, bh, by = 620, 100, 1712
btn = Image.new('RGBA', (W, H)); bd = ImageDraw.Draw(btn)
bd.rounded_rectangle([(W - bw) / 2, by, (W + bw) / 2, by + bh], 54, fill=(246, 200, 100, 255))
im = Image.alpha_composite(im, shadow(Image.new('RGBA', (1, 1))).resize((1, 1)) if False else im); im.alpha_composite(btn)
d = ImageDraw.Draw(im)
text('▶  JUEGA GRATIS', by + 20, F(INTER_K, 52), (30, 18, 4))
text('Link en la bio · sin descargar', by + bh + 18, F(INTER_B, 32), CREAM)
im.convert('RGB').save(OUT, quality=93)
print('ok', OUT)
