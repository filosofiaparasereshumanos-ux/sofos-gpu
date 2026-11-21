import glob, json, os, subprocess, sys, wave
from piper import PiperVoice, SynthesisConfig
S = os.path.dirname(os.path.abspath(__file__)); V = os.path.join(S, '..', 'tts')
LINES = [
  ('intro', 'Odisea de la Razón. Así se juega.'),
  ('epoca', 'Primero, elige una época. Hay veintidós, de Sumer a nuestros días.'),
  ('caminar', 'Camina por el mundo con el joystick y explora sus lugares.'),
  ('hablar', 'Acércate a un pensador y habla con él. Te cuenta sus ideas con su propia voz.'),
  ('debate', 'Cuando estés listo, desafíalo a un debate y responde sus preguntas.'),
  ('dialogo', 'En los diálogos no hay respuesta correcta. Tú tomas postura y das tus razones.'),
  ('agora', 'Vota en la pregunta del día y descubre cuántos piensan como tú.'),
  ('online', 'Si quieres, juega en línea. Verás a otros viajeros y podrán escuchar juntos a un pensador.'),
  ('reto', 'Cuando te encuentres con alguien, rétalo a un duelo o a un debate.'),
  ('experimento', 'Y vive los grandes experimentos de la filosofía, como la duda de Descartes.'),
  ('final', 'Gratis, en tu celular o en tu computador. ¿Te atreves a pensar?'),
  ('cueva', 'Baja a la caverna de Platón, y sal a la luz.'),
  ('sisifo', 'Empuja la roca con Sísifo.'),
  ('giges', '¿Serías justo si nadie te viera? ¿Y si todo fuera un sueño?'),
  ('final2', 'Odisea de la Razón. Gratis, en tu celular o en tu computador.'),
]
v = PiperVoice.load(glob.glob(os.path.join(V, 'voice-es-carlfm-*', '*.onnx'))[0]); sr = v.config.sample_rate
cfg = SynthesisConfig(length_scale=1.12, noise_scale=0.6, noise_w_scale=0.7); out = {}
for name, text in LINES:
    pcm = bytearray()
    for ch in v.synthesize(text, syn_config=cfg): pcm += ch.audio_int16_bytes
    f = os.path.join(S, name + '.wav')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 's16le', '-ar', str(sr), '-ac', '1', '-i', '-', '-af', 'highpass=f=70,acompressor=threshold=-18dB:ratio=3:attack=5:release=80,volume=1.7', '-ar', '44100', f], input=bytes(pcm), check=True)
    out[name] = round(len(pcm) / 2 / sr, 2); print(name, out[name])
json.dump({'lines': LINES, 'dur': out}, open(os.path.join(S, 'voz.json'), 'w'), ensure_ascii=False)
