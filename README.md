# Paso 2: crear la imagen preinstalada (sin usar tu PC)

Objetivo: una imagen Docker que ya trae PyTorch, la voz (Coqui XTTS-v2), el
lip-sync (LatentSync) y los modelos (~7 GB) dentro. Al alquilar una GPU no se
instala nada: el worker arranca en 1-2 minutos.

## A. Crear cuenta en Docker Hub (gratis)

1. Entra a https://hub.docker.com y crea la cuenta (anota tu usuario).
2. Account Settings > Personal access tokens > **Generate new token**
   (permiso Read & Write). Copia el token.

## B. Subir estos archivos a GitHub

1. Crea un repositorio nuevo (puede ser privado).
2. Sube la carpeta `gpu-image/` completa (`Dockerfile`, `start.sh`, `README.md`).
3. Copia `gpu-image/.github-workflow-docker-image.yml` a
   `.github/workflows/docker-image.yml` (borra la primera linea del archivo).

## C. Guardar las credenciales en GitHub

En el repositorio: Settings > Secrets and variables > Actions > New secret

- `DOCKERHUB_USERNAME` = tu usuario de Docker Hub
- `DOCKERHUB_TOKEN` = el token del paso A

## D. Construir la imagen

Pestaña **Actions** > `build-sofos-gpu-image` > **Run workflow**.
Tarda ~30-45 minutos (lo hacen los servidores de GitHub, gratis; tu PC no
participa). Si falla, el registro dice en que linea del Dockerfile.

Al terminar tendras la imagen: `TU_USUARIO/sofos-gpu:v1`

## E. Avisarme el nombre exacto

Dime `TU_USUARIO/sofos-gpu:v1` (nombre completo, con la etiqueta). Yo lo guardo como secreto
`RUNPOD_GPU_IMAGE` en la app. A partir de ahí la app dejará de usar el instalador en cada arranque y
alquilará GPUs directamente desde tu imagen preinstalada.
