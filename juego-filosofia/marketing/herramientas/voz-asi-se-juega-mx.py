"""Narración del vídeo «Así se juega» con una voz masculina mexicana de Piper (es_MX-ald-medium),
bajada de tono y con un poco de saturación para que suene más grave y ronca.
Uso: python voz-asi-se-juega-mx.py <carpeta con es_MX-ald-medium.onnx> <salida>"""
import json, os, subprocess, sys
from piper import PiperVoice, SynthesisConfig
V, OUT = sys.argv[1], sys.argv[2]; os.makedirs(OUT, exist_ok=True)
LINES = [
  ('intro', '¿Y si pudieras debatir con Sócrates? Así se juega Odisea de la Razón.'),
  ('epoca', 'Primero, elige tu época. Hay veintidós: de Sumer hasta hoy.'),
  ('caminar', 'Entra, camina y explora. Cada rincón guarda una historia.'),
  ('hablar', 'Acércate a un pensador y háblale. Te responde con su propia voz.'),
  ('debate', '¿Te sientes listo? Desafíalo a un debate… ¡y gánale!'),
  ('dialogo', 'Aquí no hay respuesta correcta: tú eliges tu postura y defiendes tus razones.'),
  ('agora', 'Vota la pregunta del día y descubre cuántos piensan como tú.'),
  ('online', 'Y si quieres, juega en línea: encuéntrate con otros viajeros y escuchen juntos a un pensador.'),
  ('cueva', 'Baja a la caverna de Platón… y sal a la luz.'),
  ('sisifo', 'Empuja la roca con Sísifo.'),
  ('giges', '¿Serías justo si nadie te viera?'),
  ('cierre', 'El juego en línea de sabiduría para estos tiempos. Juega con tus hijos, con tus amigos, con tu clase. Diez minutos al día… y vas a pensar distinto.'),
  ('final2', 'Odisea de la Razón. Gratis. Entra y pruébalo hoy.'),
]
v = PiperVoice.load(os.path.join(V, 'es_MX-ald-medium.onnx')); sr = v.config.sample_rate
cfg = SynthesisConfig(length_scale=0.98, noise_scale=0.8, noise_w_scale=0.9); P = 0.86; out = {}
# más grave (tono ×0.86 sin cambiar la velocidad), cuerpo en graves, un poco de saturación (ronquera) y compresión
FX = (f'asetrate={int(sr * P)},aresample={sr},atempo={1 / P:.5f},highpass=f=60,equalizer=f=140:t=q:w=1.0:g=4,equalizer=f=2800:t=q:w=1.2:g=2.5,'
      'volume=2.2,asoftclip=type=tanh:threshold=0.55,acompressor=threshold=-20dB:ratio=3.5:attack=5:release=90,volume=1.5,alimiter=limit=0.93')
for name, text in LINES:
    pcm = bytearray()
    for ch in v.synthesize(text, syn_config=cfg): pcm += ch.audio_int16_bytes
    f = os.path.join(OUT, name + '.wav')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 's16le', '-ar', str(sr), '-ac', '1', '-i', '-', '-af', FX, '-ar', '44100', f], input=bytes(pcm), check=True)
    d = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout)
    out[name] = round(d, 2); print(name, out[name])
json.dump({'lines': LINES, 'dur': out}, open(os.path.join(OUT, 'voz.json'), 'w'), ensure_ascii=False)
