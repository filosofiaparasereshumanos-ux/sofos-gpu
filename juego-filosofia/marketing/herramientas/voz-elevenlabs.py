"""Narración de los vídeos con una voz profesional de ElevenLabs (a través de kie.ai).
Pide todo el guion en una sola llamada, con pausas largas entre frases (cuesta menos), y lo corta por los
silencios en un .wav por frase, con un poco de ecualización y compresión de radio. Escribe voz.json como
los otros scripts de voz, así que sirve para montaje-v9.py y montaje-v10.py.
Uso: python3 voz-elevenlabs.py <guion.json: [[nombre, texto], ...]> <salida> [voz=Brian]
La clave de kie la pone el proxy del entorno (cabecera Authorization)."""
import json, os, re, subprocess, sys, time
SRC, OUT = sys.argv[1], sys.argv[2]; VOICE = sys.argv[3] if len(sys.argv) > 3 else 'Brian'; os.makedirs(OUT, exist_ok=True)
L = json.load(open(SRC)); text = ' <break time="1.8s" /> '.join(t for _, t in L)
A = ['-H', 'Authorization: Bearer proxy-injected', '-H', 'Content-Type: application/json']
body = {'model': 'elevenlabs/text-to-speech-multilingual-v2', 'input': {'text': text, 'voice': VOICE, 'stability': 0.42, 'similarity_boost': 0.8, 'style': 0.55, 'speed': 0.98}}
tid = json.loads(subprocess.run(['curl', '-s', '-X', 'POST', 'https://api.kie.ai/api/v1/jobs/createTask', *A, '-d', json.dumps(body, ensure_ascii=False)], capture_output=True, text=True).stdout)['data']['taskId']
while True:
    d = json.loads(subprocess.run(['curl', '-s', f'https://api.kie.ai/api/v1/jobs/recordInfo?taskId={tid}', *A], capture_output=True, text=True).stdout)['data']
    if d['state'] in ('success', 'fail'): break
    time.sleep(8)
if d['state'] != 'success': sys.exit('falló: ' + str(d.get('failMsg')))
full = os.path.join(OUT, 'completa.mp3'); subprocess.run(['curl', '-s', '-o', full, json.loads(d['resultJson'])['resultUrls'][0]], check=True)
err = subprocess.run(['ffmpeg', '-i', full, '-af', 'silencedetect=noise=-40dB:d=1.0', '-f', 'null', '-'], capture_output=True, text=True).stderr
st = [float(x) for x in re.findall(r'silence_start: ([0-9.]+)', err)]; en = [float(x) for x in re.findall(r'silence_end: ([0-9.]+)', err)]
total = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', full], capture_output=True, text=True).stdout)
starts, ends = [0] + en, st + [total]
if len(starts) != len(L): sys.exit(f'se esperaban {len(L)} frases y salieron {len(starts)}: revisa las pausas')
FX = 'highpass=f=70,equalizer=f=120:t=q:w=1.0:g=2.5,equalizer=f=3200:t=q:w=1.2:g=2,acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120,volume=1.4,alimiter=limit=0.93'
dur = {}
for (name, _), a, b in zip(L, starts, ends):
    a, b = max(0, a - 0.08), min(total, b + 0.12)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{a:.3f}', '-to', f'{b:.3f}', '-i', full, '-af', FX, '-ar', '44100', '-ac', '1', os.path.join(OUT, name + '.wav')], check=True)
    dur[name] = round(b - a, 2); print(name, dur[name])
json.dump({'lines': L, 'dur': dur}, open(os.path.join(OUT, 'voz.json'), 'w'), ensure_ascii=False)
