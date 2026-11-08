"""Sintetiza las frases de narr-jobs.json con Piper y crea audio/<paquete>.mp3.
uso: python narrate.py narr-jobs.json voces_dir salida_dir timings.json
voces_dir contiene voice-es-<voz>-*/es-<voz>-*.onnx"""
import json, sys, os, glob, subprocess, wave, io
from concurrent.futures import ProcessPoolExecutor
from piper import PiperVoice, SynthesisConfig

JOBS, VOICES, OUT, TIMINGS = sys.argv[1:5]
GAP = 0.32  # silencio entre frases (s)
_cache = {}

def voice(name):
    if name not in _cache:
        path = glob.glob(os.path.join(VOICES, f'voice-es-{name}-*', '*.onnx'))[0]
        _cache[name] = PiperVoice.load(path)
    return _cache[name]

def run(job):
    v = voice(job['voice']); sr = v.config.sample_rate
    cfg = SynthesisConfig(length_scale=1.2 if job['voice'] == 'carlfm' else 0.8, noise_scale=0.6, noise_w_scale=0.7)
    pcm = bytearray(b'\0\0' * int(sr * 0.15)); spans = []
    for s in job['sentences']:
        start = len(pcm) // 2
        for ch in v.synthesize(s, syn_config=cfg): pcm += ch.audio_int16_bytes
        spans.append([start / sr, (len(pcm) // 2 - start) / sr])
        pcm += b'\0\0' * int(sr * GAP)
    f = job['pitch']
    filt = f'asetrate={int(sr * f)},aresample={sr},atempo={1 / f:.5f},' if abs(f - 1) > 1e-3 else ''
    filt += 'highpass=f=70,acompressor=threshold=-18dB:ratio=3:attack=5:release=80,volume=1.6'
    out = os.path.join(OUT, job['name'] + '.mp3')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 's16le', '-ar', str(sr), '-ac', '1', '-i', '-', '-af', filt,
                    '-ar', '22050', '-ac', '1', '-b:a', '24k', '-codec:a', 'libmp3lame', out], input=bytes(pcm), check=True)
    return job['name'], spans

if __name__ == '__main__':
    jobs = json.load(open(JOBS)); os.makedirs(OUT, exist_ok=True)
    only = set(sys.argv[5].split(',')) if len(sys.argv) > 5 else None
    if only: jobs = [j for j in jobs if j['name'] in only]
    res = {}
    with ProcessPoolExecutor(max_workers=os.cpu_count()) as ex:
        for name, spans in ex.map(run, jobs):
            res[name] = spans; print(name, len(spans), flush=True)
    old = json.load(open(TIMINGS)) if os.path.exists(TIMINGS) else {}
    old.update(res); json.dump(old, open(TIMINGS, 'w'))
