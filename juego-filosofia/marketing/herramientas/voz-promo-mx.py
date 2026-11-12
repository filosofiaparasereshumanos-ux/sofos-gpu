"""Narración del vídeo promocional v10 con una voz masculina mexicana de Piper (es_MX-ald-medium),
bajada de tono y con un poco de saturación para que suene más grave y ronca.
Uso: python voz-asi-se-juega-mx.py <carpeta con es_MX-ald-medium.onnx> <salida>"""
import json, os, subprocess, sys
from piper import PiperVoice, SynthesisConfig
V, OUT = sys.argv[1], sys.argv[2]; os.makedirs(OUT, exist_ok=True)
LINES = [
  ('hook', 'Treinta y tres mundos. Más de doscientos pensadores. Una sola pregunta:'),
  ('atreves', '¿Te atreves a pensar?'),
  ('mundos', 'Viaja de Sumer a la torre de los números, de la casa de la fe al bosque de la Tierra.'),
  ('pensadores', 'Habla con Sócrates, Frida Kahlo, Gandhi o Einstein. Cada uno te responde con su propia voz.'),
  ('debate', 'Desafíalos a un debate… y gánales con tus ideas.'),
  ('orbes', '¡Salta! Alcanza los orbes de sabiduría…'),
  ('estrella', '…y atrapa la estrella fugaz antes de que se apague.'),
  ('diogenes', 'Visita a Diógenes en su tinaja.'),
  ('versus', 'Mira a los grandes discutir: ¿pueden pensar las máquinas? Tú decides quién te convence.'),
  ('experimentos', 'Sal de la caverna de Platón. Empuja la roca con Sísifo.'),
  ('online', 'Y juega en línea con tus amigos, con tus hijos, con tu clase.'),
  ('cierre', 'El juego en línea de sabiduría para estos tiempos. Diez minutos al día… y vas a pensar distinto.'),
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
