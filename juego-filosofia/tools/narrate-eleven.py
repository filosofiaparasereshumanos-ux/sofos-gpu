"""Graba con ElevenLabs (a través de kie.ai) los paquetes de eleven-text.mjs y crea audio/<paquete>.mp3
con sus tiempos, como narrate.py. Junta las frases de una misma voz en pocas llamadas (con pausas
largas entre frases) y las corta por los silencios; si un grupo no cuadra, lo parte y lo repite.
uso: python3 narrate-eleven.py eleven-jobs.json salida_dir timings.json
La clave de kie la pone el proxy del entorno (cabecera Authorization)."""
import json, os, re, subprocess, sys, time
JOBS, OUT, TIMINGS = sys.argv[1:4]; TMP = TIMINGS + '.d'; os.makedirs(TMP, exist_ok=True)
A = ['-H', 'Authorization: Bearer proxy-injected', '-H', 'Content-Type: application/json']
FX = 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120,volume=1.3,alimiter=limit=0.95'

def curl(*args): return subprocess.run(['curl', '-s', *args], capture_output=True, text=True).stdout

def tts(text, voice, tag):
    """Una llamada a ElevenLabs; devuelve el archivo mp3 (reintenta si el servicio falla)."""
    path = os.path.join(TMP, tag + '.mp3')
    if os.path.exists(path): return path
    for attempt in range(6):
        body = {'model': 'elevenlabs/text-to-speech-multilingual-v2', 'input': {'text': text, 'voice': voice, 'stability': 0.45, 'similarity_boost': 0.8, 'style': 0.45, 'speed': 0.97}}
        try: tid = json.loads(curl('-X', 'POST', 'https://api.kie.ai/api/v1/jobs/createTask', *A, '-d', json.dumps(body, ensure_ascii=False)))['data']['taskId']
        except Exception as e: print('  error al crear', e, flush=True); time.sleep(20); continue
        for _ in range(90):
            time.sleep(6)
            try: d = json.loads(curl(f'https://api.kie.ai/api/v1/jobs/recordInfo?taskId={tid}', *A))['data']
            except Exception: continue
            if d['state'] in ('success', 'fail'): break
        if d['state'] == 'success':
            curl('-o', path, json.loads(d['resultJson'])['resultUrls'][0]); return path
        print('  falló', tag, d.get('failMsg'), '· reintento', attempt + 1, flush=True); time.sleep(30 * (attempt + 1))
    raise SystemExit('ElevenLabs no responde: ' + tag)

def split(path, n):
    err = subprocess.run(['ffmpeg', '-i', path, '-af', 'silencedetect=noise=-40dB:d=1.1', '-f', 'null', '-'], capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([0-9.]+)', err)]; en = [float(x) for x in re.findall(r'silence_end: ([0-9.]+)', err)]
    total = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path], capture_output=True, text=True).stdout)
    if st and st[0] < 0.05: st, en = st[1:], en[1:]          # silencio al principio
    if len(st) > len(en): en.append(total)
    if len(st) and abs(st[-1] - total) < 0.3 and en[-1] >= total - 0.05: st, en = st[:-1], en[:-1]   # silencio al final
    starts, ends = [0] + en, st + [total]
    return list(zip(starts, ends)) if len(starts) == n else None

def record(items, voice, tag):
    """items: lista de frases; devuelve [(archivo, a, b)] por frase."""
    text = ' <break time="2.0s" /> '.join(items); path = tts(text, voice, tag); cuts = split(path, len(items))
    if cuts: return [(path, max(0, a - 0.06), b + 0.1) for a, b in cuts]
    if len(items) == 1: return [(path, 0, None)]
    print('  no cuadra', tag, '· lo parto', flush=True); h = len(items) // 2
    return record(items[:h], voice, tag + 'a') + record(items[h:], voice, tag + 'b')

if __name__ == '__main__':
    jobs = json.load(open(JOBS)); old = json.load(open(TIMINGS)) if os.path.exists(TIMINGS) else {}
    by = {}
    for j in jobs: by.setdefault(j['voice'], []).append(j)
    for voice, js in by.items():
        todo = [j for j in js if j['name'] not in old]
        flat = [(j['name'], s) for j in todo for s in j['sentences']]; groups = []; cur = []; size = 0
        for it in flat:
            if cur and size + len(it[1]) > 2300: groups.append(cur); cur = []; size = 0
            cur.append(it); size += len(it[1]) + 30
        if cur: groups.append(cur)
        clips = {}
        for gi, g in enumerate(groups):
            res = record([s for _, s in g], voice, f'{voice}-{gi}'); print(voice, gi, len(g), 'frases', flush=True)
            for (name, s), c in zip(g, res): clips.setdefault(name, []).append(c)
        for j in todo:
            sr = 44100; parts = []; spans = []; pos = 0.15
            listf = os.path.join(TMP, j['name'].replace('/', '_') + '.txt'); segs = []
            for k, (f, a, b) in enumerate(clips[j['name']]):
                seg = os.path.join(TMP, f"{j['name'].replace('/', '_')}-{k}.wav")
                cmd = ['ffmpeg', '-v', 'error', '-y', '-ss', f'{a:.3f}'] + (['-to', f'{b:.3f}'] if b else []) + ['-i', f, '-ar', str(sr), '-ac', '1', seg]
                subprocess.run(cmd, check=True); d = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', seg], capture_output=True, text=True).stdout)
                spans.append([pos, d]); pos += d + 0.3; segs.append(seg)
            # se unen con silencios de 0.3 s y una entrada de 0.15 s
            inputs = []; flt = []
            for k, seg in enumerate(segs): inputs += ['-i', seg]; flt.append(f'[{k}:a]apad=pad_dur=0.3[s{k}]')
            flt.append(''.join(f'[s{k}]' for k in range(len(segs))) + f'concat=n={len(segs)}:v=0:a=1,adelay=150,{FX}[o]')
            out = os.path.join(OUT, j['name'] + '.mp3')
            subprocess.run(['ffmpeg', '-v', 'error', '-y', *inputs, '-filter_complex', ';'.join(flt), '-map', '[o]', '-ar', '22050', '-ac', '1', '-b:a', '32k', '-codec:a', 'libmp3lame', out], check=True)
            old[j['name']] = spans; json.dump(old, open(TIMINGS, 'w')); print(j['name'], len(spans), flush=True)
