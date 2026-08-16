#!/usr/bin/env bash
# Arranque de la imagen preinstalada: no instala nada, solo baja el worker y corre.
set -euo pipefail

if [[ -z "${STUDIO_URL:-}" || -z "${WORKER_TOKEN:-}" ]]; then
  echo "Falta STUDIO_URL o WORKER_TOKEN." >&2
  exit 1
fi

STUDIO_URL="${STUDIO_URL%/}"
mkdir -p /workspace/sofos
cd /workspace/sofos

# Consola remota: todo lo que se imprima aqui se ve en la app.
BOOT_LOG=/workspace/sofos/boot.log
: > "$BOOT_LOG"
cat > /workspace/sofos/log_shipper.py <<'SHIP'
import os, time, requests
base = os.environ["STUDIO_URL"].rstrip("/")
url, hb = base + "/api/public/worker/log", base + "/api/public/worker/heartbeat"
token = os.environ["WORKER_TOKEN"]
buf, last = [], 0.0
with open("/workspace/sofos/boot.log", "r", errors="replace") as fh:
    while True:
        line = fh.readline()
        if line:
            buf.append(line.rstrip())
        else:
            time.sleep(1)
        now = time.time()
        if buf and (len(buf) >= 40 or now - last > 5):
            try:
                requests.post(url, json={"token": token, "lines": buf[-200:]}, timeout=30)
                buf = []
            except Exception:
                buf = buf[-400:]
            last = now
        if now - last > 20:
            try:
                requests.post(hb, json={"token": token}, timeout=20)
            except Exception:
                pass
SHIP
python /workspace/sofos/log_shipper.py >/dev/null 2>&1 &

stamp() { while IFS= read -r line; do printf '%s %s\n' "$(date -u +%H:%M:%S)" "$line"; done; }
exec > >(stdbuf -oL stamp | stdbuf -oL tee -a "$BOOT_LOG") 2>&1

echo "== Imagen preinstalada de Estudio Sofos =="
nvidia-smi -L || { echo "!! Esta maquina no tiene GPU utilizable. Apaga y vuelve a encender."; sleep 45; exit 1; }
python -c "import torch; print('torch', torch.__version__, 'cuda', torch.cuda.is_available())"
python -c "import diffusers, kornia, insightface; from TTS.api import TTS; print('voz y lip-sync listos')"

export LATENTSYNC_DIR=/opt/LatentSync
export COQUI_TOS_AGREED=1
export HF_HOME=/opt/hf

# La imagen trae los modelos, pero el worker.py puede cambiar sin que la imagen
# se reconstruya. Lo descargamos con anti-caché para asegurar la última versión.
echo "== Descargando worker (anti-caché) =="
curl -fsSL -H "Cache-Control: no-cache" "${STUDIO_URL}/gpu-worker/worker.py?ts=$(date +%s)" -o worker.py
python - <<'PY'
import hashlib, pathlib
path = pathlib.Path("/workspace/sofos/worker.py")
print("Worker hash:", hashlib.sha256(path.read_bytes()).hexdigest()[:12], f"({path.stat().st_size} bytes)")
PY

echo "== Worker en marcha =="
exec python -u worker.py
