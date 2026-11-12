"""Sintetiza las frases de narr-jobs.json con Kokoro (voces de alta calidad, gratis y locales) y crea
audio/<paquete>.mp3 con sus tiempos, igual que narrate.py.
uso: python narrate-kokoro.py narr-jobs.json kokoro_dir salida_dir timings.json [paquetes]
kokoro_dir contiene kokoro-v1.0.onnx y voices-v1.0.bin (github.com/thewh1teagle/kokoro-onnx).
Voces: santa / dora / alex en español; en inglés, cualquier voz de Kokoro (am_*, af_*, bm_*, bf_*).
RESUME=1 salta los paquetes ya grabados."""
import json, os, subprocess, sys
import numpy as np
from kokoro_onnx import Kokoro

JOBS, KDIR, OUT, TIMINGS = sys.argv[1:5]
GAP = 0.3
VOICES = {'santa': ('em_santa', 'es'), 'dora': ('ef_dora', 'es'), 'alex': ('em_alex', 'es')}

if __name__ == '__main__':
    jobs = json.load(open(JOBS)); os.makedirs(OUT, exist_ok=True)
    only = set(sys.argv[5].split(',')) if len(sys.argv) > 5 else None
    if only: jobs = [j for j in jobs if j['name'] in only]
    old = json.load(open(TIMINGS)) if os.path.exists(TIMINGS) else {}
    if os.environ.get('RESUME'):
        jobs = [j for j in jobs if not (j['name'] in old and len(old[j['name']]) == len(j['sentences']) and os.path.exists(os.path.join(OUT, j['name'] + '.mp3')))]
    print('pendientes', len(jobs), flush=True)
    k = Kokoro(os.path.join(KDIR, 'kokoro-v1.0.onnx'), os.path.join(KDIR, 'voices-v1.0.bin'))
    for job in jobs:
        vname, lang = VOICES.get(job['voice'], (job['voice'], 'en-us'))
        sr = 24000; parts = [np.zeros(int(sr * 0.15), dtype=np.float32)]; pos = len(parts[0]); spans = []
        for s in job['sentences']:
            a, sr = k.create(s, voice=vname, speed=job.get('speed', 1.0), lang=lang)
            a = a.astype(np.float32); spans.append([pos / sr, len(a) / sr]); parts += [a, np.zeros(int(sr * GAP), dtype=np.float32)]; pos += len(a) + int(sr * GAP)
        pcm = (np.clip(np.concatenate(parts), -1, 1) * 32767).astype('<i2').tobytes()
        f = job.get('pitch', 1.0)
        filt = f'asetrate={int(sr * f)},aresample={sr},atempo={1 / f:.5f},' if abs(f - 1) > 1e-3 else ''
        filt += 'highpass=f=70,acompressor=threshold=-18dB:ratio=2.5:attack=5:release=80,volume=1.5,alimiter=limit=0.95'
        out = os.path.join(OUT, job['name'] + '.mp3'); os.makedirs(os.path.dirname(out), exist_ok=True)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 's16le', '-ar', str(sr), '-ac', '1', '-i', '-', '-af', filt,
                        '-ar', '22050', '-ac', '1', '-b:a', '24k', '-codec:a', 'libmp3lame', out], input=pcm, check=True)
        old[job['name']] = spans; print(job['name'], len(spans), flush=True)
        json.dump(old, open(TIMINGS, 'w'))
