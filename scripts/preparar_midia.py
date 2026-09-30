"""Prepara as mídias da pasta Imagens/ para a landing page.

- Remove o quadriculado gravado na logo e gera um PNG transparente.
- Converte as fotos para WebP (mais leve no celular).
- Recomprime os vídeos (H.264, faststart) e gera uma capa (poster) para cada um.

Os arquivos originais em Imagens/ não são alterados.
Uso: python scripts/preparar_midia.py
"""

import subprocess
from pathlib import Path

import imageio_ffmpeg
import numpy as np
from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
ORIGEM = RAIZ / "Imagens"
DESTINO = RAIZ / "frontend" / "public" / "media"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

FOTOS = {
    "foto de perfil.jpg": "deusmar-perfil",
    "corpo do proprio personal.jpg": "deusmar-shape",
    "aplicativo.jpg": "app-dpj",
    "antes e depois pessoa 1/frente.jpg": "aluno-frente",
    "antes e depois pessoa 1/costas.jpg": "aluno-costas",
    "antes e depois pessoa 1/lado.jpg": "aluno-lado",
}

VIDEOS = {
    "Treino Híbrido.mp4": "treino-hibrido",
    "Antes e Depois.mp4": "antes-depois",
    "antes e depois pessoa 1/antes e depois do próprio personal.mp4": "antes-depois-deusmar",
    "Video aulas/Como usar o strap do jeito certo.mp4": "aula-strap",
    "Video aulas/Tudo sobre o terra sumô em 1 minuto.mp4": "aula-terra-sumo",
    "Video aulas/3 maneiras de falhar no supino.mp4": "aula-supino",
    "Video aulas/Tudo sobre o puxador aberto.mp4": "aula-puxador",
    "Video aulas/Macetes da barra para elevação pélvica.mp4": "aula-elevacao-pelvica",
    "Video aulas/Tudo sobre o tríceps testa.mp4": "aula-triceps-testa",
    "Video aulas/Tríceps cross corretamente.mp4": "aula-triceps-cross",
    "Video aulas/Como substituir a máquina de elevação lateral.mp4": "aula-elevacao-lateral",
}


def limpar_logo() -> None:
    """O logo.jpg tem o fundo quadriculado (cinza 64/95) gravado nos pixels."""
    rgb = np.asarray(Image.open(ORIGEM / "logo.jpg").convert("RGB")).astype(np.float32)
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    lum = rgb.mean(axis=2)
    sat = r - (g + b) / 2

    alpha_claro = np.clip((lum - 115) / 60, 0, 1)  # branco e prata
    alpha_vermelho = np.clip((sat - 25) / 110, 0, 1)  # boneco e "TRAINER"
    alpha = np.maximum(alpha_claro, alpha_vermelho)

    saida = rgb.copy()
    vermelho = alpha_vermelho > alpha_claro
    saida[vermelho] = (183, 18, 22)
    # clareia as bordas antialiased dos elementos claros para não ficarem acinzentadas
    claro = ~vermelho & (alpha > 0)
    saida[claro] = np.maximum(saida[claro], 190)

    rgba = np.dstack([saida, alpha * 255]).astype(np.uint8)
    img = Image.fromarray(rgba, "RGBA")
    img = img.crop(img.getbbox())
    img.save(DESTINO / "logo-dpj.png", optimize=True)
    img.save(DESTINO / "logo-dpj.webp", quality=92)

    # ícone (só o escudo) para favicon
    escudo = img.crop((0, 0, int(img.height * 0.98), img.height))
    lado = max(escudo.size)
    quadrado = Image.new("RGBA", (lado, lado))
    quadrado.paste(escudo, ((lado - escudo.width) // 2, (lado - escudo.height) // 2))
    quadrado.resize((256, 256), Image.LANCZOS).save(DESTINO / "icone-dpj.png")


def converter_fotos() -> None:
    for origem, nome in FOTOS.items():
        img = Image.open(ORIGEM / origem).convert("RGB")
        img.thumbnail((1400, 1400), Image.LANCZOS)
        img.save(DESTINO / f"{nome}.webp", quality=82, method=6)
    # imagem de compartilhamento (Open Graph) 1200x630
    perfil = Image.open(ORIGEM / "foto de perfil.jpg").convert("RGB")
    og = Image.new("RGB", (1200, 630), (15, 15, 17))
    retrato = perfil.resize((630, 630), Image.LANCZOS)
    og.paste(retrato, (570, 0))
    logo = Image.open(DESTINO / "logo-dpj.png")
    logo.thumbnail((500, 200), Image.LANCZOS)
    og.paste(logo, (50, 215), logo)
    og.save(DESTINO / "og-image.jpg", quality=85)


def ffmpeg(*args: str) -> None:
    subprocess.run([FFMPEG, "-hide_banner", "-loglevel", "error", "-y", *args], check=True)


def converter_videos() -> None:
    for origem, nome in VIDEOS.items():
        entrada = str(ORIGEM / origem)
        ffmpeg(
            "-i", entrada,
            "-c:v", "libx264", "-preset", "slow", "-crf", "27",
            "-vf", "scale=720:-2", "-pix_fmt", "yuv420p",
            "-c:a", "aac", "-b:a", "96k",
            "-movflags", "+faststart",
            str(DESTINO / f"{nome}.mp4"),
        )
        ffmpeg("-ss", "1.5", "-i", entrada, "-frames:v", "1", "-vf", "scale=540:-2",
               "-q:v", "4", str(DESTINO / f"{nome}.jpg"))
        print(f"ok  {nome}")


if __name__ == "__main__":
    DESTINO.mkdir(parents=True, exist_ok=True)
    limpar_logo()
    converter_fotos()
    converter_videos()
