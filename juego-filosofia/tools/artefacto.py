# Prepara la carpeta del artefacto: une lección y frases de cada pensador en un solo mp3
# (para caber en el límite de archivos) y ajusta el índice de narración incrustado.
import json, os, re, shutil, subprocess, sys, wave
S = os.path.dirname(os.path.abspath(__file__)); G = '/home/user/sofos-gpu/juego-filosofia'; OUT = S + '/art'
shutil.rmtree(OUT, ignore_errors=True); os.makedirs(OUT + '/audio'); os.makedirs(OUT + '/img'); TMP = S + '/art-tmp'; os.makedirs(TMP, exist_ok=True)
html = open(S + '/odisea-viaje.html', encoding='utf-8').read()
m = re.search(r'const NARR_INDEX = (\{.*?\});\n', html, re.S); idx = json.loads(m.group(1))
def wav(src, dst): subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', src, '-ac', '1', '-ar', '22050', dst], check=True)
merged = 0
for k, packs in list(idx['spk'].items()):
    if packs != ['l-' + k, 'p-' + k]: continue
    pw, lw, cw = f'{TMP}/p.wav', f'{TMP}/l.wav', f'{TMP}/c.wav'
    wav(f'{G}/audio/p-{k}.mp3', pw); wav(f'{G}/audio/l-{k}.mp3', lw)
    with wave.open(pw) as a, wave.open(lw) as b:
        off = round(a.getnframes() / a.getframerate() * 100)
        with wave.open(cw, 'wb') as c: c.setparams(a.getparams()); c.writeframes(a.readframes(a.getnframes())); c.writeframes(b.readframes(b.getnframes()))
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', cw, '-c:a', 'libmp3lame', '-b:a', '24k', f'{OUT}/audio/p-{k}.mp3'], check=True)
    P = idx['p']['p-' + k]
    for h, (at, dur) in idx['p'].pop('l-' + k).items():
        if h not in P: P[h] = [at + off, dur]
    idx['spk'][k] = ['p-' + k]; merged += 1
used = set(p for v in idx['spk'].values() for p in v)
for f in sorted(os.listdir(G + '/audio')):
    if not f.endswith('.mp3'): continue
    n = f[:-4]
    if os.path.exists(f'{OUT}/audio/{f}'): continue
    if n.startswith('l-') and n not in used: continue
    if n.startswith('m-') or n in used: shutil.copy(f'{G}/audio/{f}', f'{OUT}/audio/{f}')
    else: print('sin usar:', f)
for f in sorted(os.listdir(G + '/img')):
    if re.match(r'(p-|icon|favicon|apple)', f): continue
    shutil.copy(f'{G}/img/{f}', f'{OUT}/img/{f}')
html = html[:m.start(1)] + json.dumps(idx, ensure_ascii=False, separators=(',', ':')) + html[m.end(1):]
open(OUT + '/odisea-viaje.html', 'w', encoding='utf-8').write(html)
files = [os.path.join(d, f)[len(OUT) + 1:] for d, _, fs in os.walk(OUT) for f in fs if f != 'odisea-viaje.html']
size = sum(os.path.getsize(OUT + '/' + f) for f in files)
print('unidos', merged, '| archivos', len(files), '| MB', round(size / 1e6, 1))
json.dump(sorted(files), open(S + '/art-files.json', 'w'))
