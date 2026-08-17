
# Imagen lista para Estudio Sofos: voz (Coqui XTTS) + lip-sync (LatentSync).
# Todo queda preinstalado y los modelos ya vienen dentro, asi que al alquilar
# una GPU no hay instalaciones: el worker arranca en 1-2 minutos.
FROM pytorch/pytorch:2.5.1-cuda12.4-cudnn9-devel

ENV DEBIAN_FRONTEND=noninteractive \
    PIP_NO_CACHE_DIR=1 \
    HF_HOME=/opt/hf \
    COQUI_TOS_AGREED=1 \
    LATENTSYNC_DIR=/opt/LatentSync \
    SOFOS_MODELS=/opt/models

RUN apt-get update -y \
 && apt-get install -y --no-install-recommends ffmpeg git curl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# --- Dependencias de Python (en tandas para que la build sea legible) ---
RUN pip install requests "coqui-tts==0.26.2"
RUN pip install "huggingface_hub==0.30.2" "omegaconf==2.3.0" "einops==0.7.0" python-dotenv
RUN pip install "diffusers==0.32.2" "transformers==4.48.0" "accelerate==0.26.1"
RUN pip install "numpy==1.26.4" "librosa==0.10.1" "opencv-python-headless==4.9.0.80" \
    "mediapipe==0.10.11" "decord==0.6.0" python_speech_features scenedetect \
    ffmpeg-python imageio imageio-ffmpeg lpips
RUN pip install face-alignment "kornia==0.8.1" "onnxruntime-gpu==1.21.0"
RUN pip install cython "numpy==1.26.4" && MAX_JOBS=1 pip install "insightface==0.7.3"

# --- Codigo y modelos de LatentSync dentro de la imagen ---
RUN git clone --depth 1 https://github.com/bytedance/LatentSync /opt/LatentSync
RUN mkdir -p /opt/models /opt/LatentSync/checkpoints/whisper && python - <<'PY'
from huggingface_hub import hf_hub_download
import pathlib, shutil
dest = pathlib.Path("/opt/models")
for repo, name in [("ByteDance/LatentSync-1.5", "latentsync_unet.pt"),
                   ("ByteDance/LatentSync-1.5", "whisper/tiny.pt")]:
    p = hf_hub_download(repo_id=repo, filename=name)
    shutil.copy(p, dest / pathlib.Path(name).name)
PY
RUN ln -sf /opt/models/latentsync_unet.pt /opt/LatentSync/checkpoints/latentsync_unet.pt \
 && ln -sf /opt/models/tiny.pt /opt/LatentSync/checkpoints/whisper/tiny.pt

# --- Voz XTTS-v2 precargada (evita ~2 GB de descarga en cada arranque) ---
# Si la descarga falla durante el build (red/licencia), no rompemos la imagen:
# el modelo se descargara la primera vez que arranque el worker.
RUN python - <<'PY' || echo "XTTS no precargado; se descargara en el primer arranque"
import os
os.environ["COQUI_TOS_AGREED"] = "1"
from TTS.utils.manage import ModelManager
from TTS.utils.generic_utils import get_user_data_dir
import TTS
path = os.path.join(os.path.dirname(TTS.__file__), ".models.json")
ModelManager(path, progress_bar=False).download_model("tts_models/multilingual/multi-dataset/xtts_v2")
print("XTTS-v2 precargado en", get_user_data_dir("tts"))
PY


# --- Comprobacion en tiempo de build: si algo falta, la imagen no se publica ---
RUN python -c "import torch, torchaudio, torchvision, diffusers, kornia, insightface; from TTS.api import TTS; print('OK', torch.__version__, torchaudio.__version__, torchvision.__version__)"

COPY start.sh /opt/start.sh
RUN chmod +x /opt/start.sh
CMD ["/opt/start.sh"]


Copia eso, pégalo en GitHub (`gpu-image/Dockerfile`) y haz Commit changes.
